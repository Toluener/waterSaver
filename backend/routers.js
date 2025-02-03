const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const {userModel, calculatorInputsModel, dailyWaterUsageModel, subscriptionModel} = require(path.join(__dirname, './db/Schema.js'));
const isAuthenticated = require(path.join(__dirname, './middleware/auth.js'));
require(path.join(__dirname, './utilities/notifications.js'));
require(path.join(__dirname, './utilities/mailer.js'));
const {flowRate, formatDate} = require(path.join(__dirname, './utilities/utilityFunctions.js'));
const sendWelcomeEmail = require(path.join(__dirname, './utilities/mailer.js'))
const mongoStore = require('connect-mongo');
require('dotenv').config({path: './configurations/Env.env'});



router.use(cors({}));
router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.json());
router.use(express.static(path.join(__dirname, '../frontend')));
router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: true, sameSite: 'strict', maxAge: 7200000},
    name: 'waterSaverC',
    store: mongoStore.create({
        mongoUrl: `mongodb+srv://toluehinmosan51:${process.env.DB_PASSWORD}@cluster0.ofefc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
        collection: 'waterSaverSessions',
        dbName: 'waterSaverDB',
        ttl: 7200000,
        autoRemove: 'native'
    })
}))





//route to get users' registration details (tested)]
router.post('/register', async (req, res)=>{
    console.log(req.body);
    try{
        let {email, password, username} = req.body; 
        let user = await userModel.findOne({email});

        if(user){
            console.log('user already exists, returning');
           return res.status(409).json({message: 'User already exists'}); 
         }
         else {
            await userModel.create({email: email, password: password, username: username});
         await sendWelcomeEmail('waterSaver Welcome Message', 'Welcome to waterSaver!. <br> We are exicited to be part of your water saving journey, please check out the application for details on how to use the calculator. <br> Wishing you a pleasant and fulfilling journey with us.<br><br>-Ibekwe Gozie from waterSaver App.');
         console.log('done');
         res.status(201).json({message: 'User has been sucessfully registered, please log in'});
         }
    } catch(err){console.log(err);
        res.status(500).json({message: err});
    }
})



//route to check if the user exists and the password matches (tested)]
router.post('/signin', async (req, res)=>{
   try{
    let {email, password} = req.body;
   let user = await userModel.findOne({email});

   if(!user){
    return res.status(404).json({message:'user does not exist, please register'});;
   } else if(user && user.password != password){
    console.log('password mismatch, please try again');
    return res.status(401).json({message:'password does not match'}); 
   }else{
    req.session.email = user.email;
    return res.status(200).json({
        message: "you're logged in",
        cookie: req.session.cookie
    });
   }
   } catch(err){
    console.log(err);
    res.status(500).json({message: err});
   } 
})


//checking for user session before allowing API calls]
router.get('/checkSession', (req, res)=>{
    if(req.session.email){
        res.json({loggedIn: true});
    }else{ res.json({loggedIn: false});}
})



//route to obtain user's subscription (tested)]
router.post('/subscribe', isAuthenticated, async (req, res)=>{
    let subscription = req.body;
    //check for existing subscription
    const existingSubscription = await subscriptionModel.findOne({ endpoint: subscription.endpoint});

    if(!existingSubscription){
        try{
            await subscriptionModel.create(subscription);
           return res.status(201).json({message: 'User has successfully subscribed'});
        }catch(err){
            console.log(err);
            return res.status(500).json({message: err});
        }
    } else{ return res.status(409).json({message: 'You already have an existing subscription'});}
})



//route to obtain basic info (tested)
router.post('/basicInfo', isAuthenticated, async (req, res)=>{
    let {occupants} = req.body;
    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        //check if user has already entered their inputs for that day, if no, then create a new document to save the inputs, else update the already existing document
        if(!dailyInput && occupants){
            console.log('creating document');
            await calculatorInputsModel.create({
                user: req.session.email,
                occupants: occupants
            });
            console.log('calculator inputs created');
           return res.status(201).json({message: 'calculator inputs created'});
        }
        else if(dailyInput && occupants){
            console.log('updating document');
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    occupants: occupants
                }}
            );
            console.log('calculator inputs updated');
            return res.status(200).json({message: 'calculator inputs updated'});
        }else{
            res.status(400).json({message: 'occupants cannot be empty'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})



//route to obtain bathroom water usage inputs (tested)
router.post('/bathroomInputs', isAuthenticated, async (req, res)=>{
    let {averageShowerTime, showerFlowRate, toiletFlushVolume, averageFlushesPerDay} = req.body

    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        if(!dailyInput){
            return res.status(404).json({message: 'Please fill in the form in the sequential order'});
        }
        else{
            //update document to add bathroom usage inputs without changing existing fields
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    averageShowerTime: averageShowerTime,
                    showerFlowRate: showerFlowRate,
                    toiletFlushVolume: toiletFlushVolume
                }}
            );
            
            //calculate bathroom water usage
            let bathroomWaterUsage = (dailyInput.occupants * averageShowerTime * flowRate[showerFlowRate]) + (dailyInput.occupants * averageFlushesPerDay * flowRate[toiletFlushVolume])

             //check if the daily water usage document has already been created
            let waterUsage = await dailyWaterUsageModel.findOne({
                user: req.session.email,
                date: today
            });

            if(!waterUsage){
                console.log('creating document');
                await dailyWaterUsageModel.create({
                    user: req.session.email,
                    bathroomWaterUsage: bathroomWaterUsage
                });
                console.log('daily water usage document created');
                return res.status(201).json({message: 'daily water usage created'});
            }
            else{
                console.log('updating document');
                await dailyWaterUsageModel.updateOne(
                    {user: req.session.email, date: today},
                    {$set: {
                        bathroomWaterUsage: bathroomWaterUsage
                    }}
                );
                console.log('daily water usage document updated');
                return res.status(200).json({message: 'daily water usage document updated'});
            }
        }
    } catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})


//route to obtain kitchen water usage inputs (tested)
router.post('/kitchenInputs', isAuthenticated, async (req, res)=>{
    let {averageTapUsageTime, numberOfUsers, tapFlowRate, dishWasherType, dishWasherUsageFrequency} = req.body;

    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        if(tapFlowRate && dailyInput){
            //update document to add kitchen water usage inputs
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    dishMethod: tapFlowRate
                }}
            );

            //calculate manual kitchen water usage
            let kitchenWaterUsage = (numberOfUsers * averageTapUsageTime * flowRate[tapFlowRate]);

            //save kitchen water usage value
            await dailyWaterUsageModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {kitchenWaterUsage: kitchenWaterUsage}}
            );
            return res.status(200).json({message: 'updated daily water usage to include kitchen inputs'});
        }
        else if(dishWasherType && dailyInput){
            //update document to add kitchen water usage inputs
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    dishMethod: dishWasherType
                }}
            );

            //calculate dishwasher kitchen water usage
            let kitchenWaterUsage = (numberOfUsers * dishWasherUsageFrequency * flowRate[dishWasherType]);

            //save kitchen water usage value
            await dailyWaterUsageModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {kitchenWaterUsage: kitchenWaterUsage}}
            );
            return res.status(200).json({message: 'updated daily water usage to include kitchen inputs'});
        }
        else if(!dailyInput){
            return res.status(404).json({message: 'Please fill in the form in the sequential order'});
        }
        else{
            return res.status(400).json({message: 'Please ensure you fill in the inputs properly'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }   
})


//route to obtain laundry water usage inputs (tested)
router.post('/laundryInputs', isAuthenticated, async (req, res)=>{
    let {averageTapUsageTime, tapFlowRate, numberOfUsers, washingMachineUsageFrequency, washingMachineType} = req.body;

    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        if(tapFlowRate && dailyInput){
            //update document to add laundry water usage inputs
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    laundryMethod: tapFlowRate
                }}
            );

            //calculate manual laundry water usage
            let laundryWaterUsage = (numberOfUsers * averageTapUsageTime * flowRate[tapFlowRate]);

            //save laundry water usage value
            await dailyWaterUsageModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    laundryWaterUsage: laundryWaterUsage
                }}
            );
            return res.status(200).json({message: 'updated daily water usage to include laudry input'});
        }
        else if(washingMachineType && dailyInput){
            //update document to add laundry water usage inputs
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    laundryMethod: washingMachineType
                }}
            );

            //calculate washingMachine laundry water usage
            let laundryWaterUsage = (numberOfUsers * washingMachineUsageFrequency * flowRate[washingMachineType]);

            //save laundry water usage value
            await dailyWaterUsageModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {laundryWaterUsage: laundryWaterUsage}}
            );
            return res.status(200).json({message: 'updated daily water usage to include laudry input'});
        }
        else if(!dailyInput){
           return res.status(404).json({message: 'Please fill in the forms in the sequential order'});
        }
        else{
            return res.status(400).json({message: 'Please ensure you fill in the inputs properly'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }   
})


//Routes to obtain outdoor usage input (tested)
router.post('/outdoorInputs', isAuthenticated, async (req, res)=>{
    let {swimmingPoolSize, poolWaterChangeFrequency, carWashingFrequency, carWashWaterConsumption} = req.body;

    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        if(!dailyInput){
           return res.status(404).json({message: 'Please fill in the forms in the sequential order'});
        }
        else{
            //update document to add outdoor water usage inputs
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    carWashingFrequency: carWashingFrequency,
                    poolWaterChangeFrequency: poolWaterChangeFrequency,
                }}
            );

            //calculate the outdoor water usage
            let swimmingPoolWaterUsage = swimmingPoolSize * flowRate[poolWaterChangeFrequency];
            let carWaterUsage = carWashWaterConsumption * flowRate[carWashingFrequency];

            //save the outdoor water usage value
            if(swimmingPoolWaterUsage && carWaterUsage){
            await dailyWaterUsageModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    swimmingPoolWaterUsage: swimmingPoolWaterUsage,
                    carWaterUsage: carWaterUsage
                }}
            );
            return res.status(200).json({message: 'outdoor water usage added'});
            }
            else if(swimmingPoolWaterUsage){
                await dailyWaterUsageModel.updateOne(
                    {user: req.session.email, date: today},
                    {$set: {
                        swimmingPoolWaterUsage: swimmingPoolWaterUsage,
                    }}
                );
                return res.status(200).json({message: 'outdoor water usage added'});
            } 
            else if(carWaterUsage){
                await dailyWaterUsageModel.updateOne(
                    {user: req.session.email, date: today},
                    {$set: {
                        carWaterUsage: carWaterUsage
                    }}
                );
                return res.status(200).json({message: 'outdoor water usage added'});
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})


//route to get the water usage results
router.get('/results', isAuthenticated, async (req, res)=>{
    try{
        let dailyUsage = await dailyWaterUsageModel.findOne({
            user: req.session.email,
            date: formatDate(new Date())
        });
    
        // function to format the values displayed to the user
        const formatValue = (value) => value ? value : "N/A";
    
        console.log(dailyUsage);
        let bathroomWaterUsage = formatValue(dailyUsage.bathroomWaterUsage);
        let kitchenWaterUsage = formatValue(dailyUsage.kitchenWaterUsage);
        let laundryWaterUsage = formatValue(dailyUsage.laundryWaterUsage);
        let swimmingPoolWaterUsage = formatValue(dailyUsage.swimmingPoolWaterUsage);
        let carWaterUsage = formatValue(dailyUsage.carWaterUsage);

        res.status(200).json({
            bathroomWaterUsage: bathroomWaterUsage,
            kitchenWaterUsage: kitchenWaterUsage,
            laundryWaterUsage: laundryWaterUsage,
            swimmingPoolWaterUsage: swimmingPoolWaterUsage,
            carWaterUsage: carWaterUsage
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

router.post('/logout', (req, res)=>{
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({message: "Logout failed"});
        }
        res.clearCookie('waterSaverC');
        res.status(200).json({ message: "logout successful"});
    })
})

module.exports = router;