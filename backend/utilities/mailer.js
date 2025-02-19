const nodemailer = require('nodemailer');
const cron = require('node-cron');
const path = require('path');
require('dotenv').config({path: '../configurations/Env.env'});
const {userModel, calculatorInputsModel, dailyWaterUsageModel} = require(path.join(__dirname, '../db/Schema.js'));
const {formatDate} = require(path.join(__dirname, './utilityFunctions.js'));


//creating the transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "watersavercalc@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
});


//aggregation of user's activities to be sent in the monthly email
let aggregation = async ()=>{
    console.log('aggregation called');
    let users = await userModel.find({});
    let aggregationArr = [];

    for(let i = 0; i < users.length; i++){
        let email = users[i].email;
        console.log('aggregate function user email: ' + email);
       try{
       let waterUsage = await dailyWaterUsageModel.find({user: email});

       let totalValues = {
        totalBathroomWaterUsage: 0,
        totalKitchenWaterUsage: 0,
        totalLaundryWaterUsage: 0,
        totalCarWaterUsage: 0,
        totalSwimmingPoolWaterUsage: 0
       }
       

       if(waterUsage.length != 0){
        for(let j = 0; j < waterUsage.length; j++){
            let dateObj = new Date(waterUsage[j].date);
            let month = dateObj.getMonth() + 1;
            let date = new Date();
            let compareMonth = date.getMonth() + 1;

            
            if(compareMonth == (month - 1)){
                console.log('calculating');
                let { bathroomWaterUsage, kitchenWaterUsage, laundryWaterUsage, carWaterUsage, swimmingPoolWaterUsage} = waterUsage[j];

                let safeAdd = (value, targetObj, key)=>{
                    if (!isNaN(value) && value !== undefined) {
                        targetObj[key] += value;
                    }
                }
            
                safeAdd(bathroomWaterUsage, totalValues,"totalBathroomWaterUsage");
                safeAdd(kitchenWaterUsage, totalValues, "totalKitchenWaterUsage");
                safeAdd(laundryWaterUsage, totalValues, "totalLaundryWaterUsage");
                safeAdd(swimmingPoolWaterUsage, totalValues, "totalSwimmingPoolWaterUsage");
                safeAdd(carWaterUsage, totalValues, "totalCarWaterUsage");
            }else{
                console.log('next');
            }
           }
    
           let usersAggregate = {
            user: email,
            totalBathroomWaterUsage: totalValues.totalBathroomWaterUsage,
            totalKitchenWaterUsage: totalValues.totalKitchenWaterUsage,
            totalLaundryWaterUsage: totalValues.totalLaundryWaterUsage,
            totalSwimmingPoolWaterUsage: totalValues.totalSwimmingPoolWaterUsage,
            totalCarWaterUsage: totalValues.totalCarWaterUsage     
           }
           console.log('usersAggregate ' + usersAggregate.user);
    
           aggregationArr.push(usersAggregate);
       } else{
        console.log('user does not have any water usage input for email: ' + email);
       }
       }catch(err){
            console.log(err);
       }
    }
    return aggregationArr;
}


//sending monthly email reports
let sendMonthlyEmail = async (text)=>{

    let aggregationArr = await aggregation();


    //using for loop to send emails to all users
    for(let i = 0; i < aggregationArr.length; i++){




        const mailOptions = {
            from: "waterSaver",
            to: aggregationArr[i].user,
            subject: text,
            text: `\nFor your monthly water usage, you used a total of ${aggregationArr[i].totalBathroomWaterUsage} litres of water for bathroom usage, your kitchen water usage was ${aggregationArr[i].totalKitchenWaterUsage} litres, your laundry water usage was ${aggregationArr[i].totalLaundryWaterUsage} litres, your swimming pool water usage was ${aggregationArr[i].totalSwimmingPoolWaterUsage} litres, and your car water usage was ${aggregationArr[i].totalCarWaterUsage}. \nYour total water usage for last month is ${aggregationArr[i].totalBathroomWaterUsage + aggregationArr[i].totalKitchenWaterUsage + aggregationArr[i].totalLaundryWaterUsage + aggregationArr[i].totalSwimmingPoolWaterUsage + aggregationArr[i].totalCarWaterUsage} litres. Keep improving on your water saving journey!.`
        };

        try{
            console.log('sending monthly mails...');
            await transporter.sendMail(mailOptions);
            console.log('monthly emails sent');
        }catch(err){
            console.log(err);
        }
    }
}

cron.schedule('0 10 1 * *', ()=>{
    sendMonthlyEmail('waterSaver monthly report!');
})



//sending welcome emails to newly registered users
let sendWelcomeEmail = async (subject, text)=>{
    let users = await userModel.find({date: formatDate(new Date())});

    //using for loop to  send emails to all users
    for(let i = 0; i < users.length; i++){
            const mailOptions = {
                from: "waterSaver",
                to: users[i].email,
                subject: subject,
                html: text
            };
    
            if(!users[i].emailed){
                try{
                    console.log(`sending welcome mail to ${users[i].email}`);
                    await transporter.sendMail(mailOptions);
                    await userModel.updateOne(
                        {email: users[i].email},
                        {$set: {
                            emailed: true
                        }}
                    );
                    console.log('welcome email sent');
                }catch(err){
                    console.log(err);
                }
            }
    }
}


module.exports = sendWelcomeEmail;
