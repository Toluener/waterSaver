const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const {userModel, calculatorInputsModel, dailyWaterUsageModel, subscriptionModel} = require(path.join(__dirname, './db/Schema.js'));
const isAuthenticated = require(path.join(__dirname, './middleware/auth.js'));
require(path.join(__dirname, './utilities/notifications.js'));
require(path.join(__dirname, './utilities/mailer.js'));
const {flowRate, formatDate} = require(path.join(__dirname, './utilities/utilityFunctions.js'));
const mongoStore = require('connect-mongo');
require('dotenv').config({path: './configurations/Env.env'});



router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());
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




//route for users' registration (tested)
router.get('/register', (req, res)=>{
    res.send('fontend register page');
})


//route to get users' registration details (tested)
router.post('/register', async (req, res)=>{
    console.log(req.body);
    try{
        let {email, password, username} = req.body; 
await userModel.create({email: email, password: password, username: username});
res.status(201).redirect('login');
    } catch(err){console.log(err);
        res.send('error');
    }
})


//route for users to login (tested)
router.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
})


//route to check if the user exists and the password matches (tested)
router.post('/signin', async (req, res)=>{
   try{
    let {email, password} = req.body;
   let user = await userModel.findOne({email});

   if(!user){
    console.log('User not found');
   } else if(user && user.password != password){
    res.send('password does not match').redirect('login');    
   }else{
    req.session.email = user.email;
    res.redirect('homePage');
   }
   } catch(err){
    console.log(err);
    res.send(err);
   } 
})


//Landing page (tested)
router.get('/homePage', isAuthenticated, (req, res)=>{
    res.sendFile(path.join(__dirname, '../frontend/subscribePage.html'));
})


//route to obtain user's subscription (tested)
router.post('/subscribe', isAuthenticated, async (req, res)=>{
    let subscription = req.body;
    //check for existing subscription
    const existingSubscription = await subscriptionModel.findOne({ endpoint: subscription.endpoint});

    if(!existingSubscription){
        try{
            await subscriptionModel.create(subscription);
            res.redirect('subscribed');
        }catch(err){
            console.log(err);
            res.send(err);
        }
    } else{ res.send('You already have an existing subscription');}
})


//route to notify user of successful subscription
router.get('/subscribed', isAuthenticated, (req, res)=>{
    res.send("You have successfully subscribed to water saver's notifications")
})


// Route to send the calculator's page (tested)
router.get('/calculator', isAuthenticated, (req, res)=>{
    res.send('welcome to the calculator, please enter in your inputs');
})


//route to obtain basic info (tested)
router.post('/basicInfo', async (req, res)=>{
    let {occupants} = req.body;
    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        //check if user has already entered their inputs for that day, if no, then create a new document to save the inputs, else update the already existing document
        if(!dailyInput){
            console.log('creating document');
            await calculatorInputsModel.create({
                user: req.session.email,
                occupants: occupants
            });
            console.log('calculator inputs created');
            res.send('calculator inputs created')
        }
        else{
            console.log('updating document');
            await calculatorInputsModel.updateOne(
                {user: req.session.email, date: today},
                {$set: {
                    occupants: occupants
                }}
            );
            console.log('calculator inputs updated');
            res.send('calculator inputs updated');
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
})



//route to obtain bathroom water usage inputs (tested)
router.post('/bathroomInputs', async (req, res)=>{
    let {averageShowerTime, showerFlowRate, toiletFlushVolume, averageFlushesPerDay} = req.body

    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        if(!dailyInput){
            res.send('Please fill in the form in the sequential order');
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
                res.send('daily water usage created');
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
                res.send('daily water usage document updated');
            }
        }
    } catch(err){
        console.log(err);
        res.send(err);
    }
})


//route to obtain kitchen water usage inputs (tested)
router.post('/kitchenInputs', async (req, res)=>{
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
            res.send('updated daily water usage to include kitchen inputs');
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
            res.send('updated daily water usage to include kitchen inputs');
        }
        else if(!dailyInput){
            res.send('Please fill in the form in the sequential order');
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }   
})


//route to obtain laundry water usage inputs (tested)
router.post('/laundryInputs', async (req, res)=>{
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
            res.send('updated daily water usage to include laudry input');
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
            res.send('updated daily water usage to include laudry input');
        }
        else{
            res.send('Please fill in the forms in the sequential order');
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }   
})


//Routes to obtain outdoor usage input (tested)
router.post('/outdoorInputs', async (req, res)=>{
    let {swimmingPoolSize, poolWaterChangeFrequency, carWashingFrequency, carWashWaterConsumption} = req.body;

    try{
        let today = formatDate(new Date());
        console.log(today);
        let dailyInput = await calculatorInputsModel.findOne({
            user: req.session.email,
            date: today
        });

        if(!dailyInput){
            res.send('Please fill in the forms in the sequential order')
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
            res.send('outdoor water usage added');
            }
            else if(swimmingPoolWaterUsage){
                await dailyWaterUsageModel.updateOne(
                    {user: req.session.email, date: today},
                    {$set: {
                        swimmingPoolWaterUsage: swimmingPoolWaterUsage,
                    }}
                );
                res.send('outdoor water usage added');
            } 
            else if(carWaterUsage){
                await dailyWaterUsageModel.updateOne(
                    {user: req.session.email, date: today},
                    {$set: {
                        carWaterUsage: carWaterUsage
                    }}
                );
                res.send('outdoor water usage added');
            }
        }
    }catch(err){
        console.log(err);
        res.send(err);
    }
})


module.exports = router;