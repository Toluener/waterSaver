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



//sending monthly email reports
let sendMonthlyEmail = async (text)=>{
    let aggregationArr = aggregation();


    //using for loop to send emails to all users
    for(let i = 0; i < users.length; i++){



        const mailOptions = {
            from: "waterSaver",
            to: aggregationArr[i].user,
            subject: aggregationArr[i],
            html: text
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

cron.schedule('0 23 1 * *', ()=>{
    sendMonthlyEmail('waterSaver Notification', 'waterSaver monthly report!');
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



//aggregation of user's activities to be sent in the monthly email
let aggregation = async ()=>{
    let users = await userModel.find({});
    let aggregationArr = [];

    for(let i = 0; i < users.length; i++){
        let email = users[i].email;
       try{
       let waterUsage = dailyWaterUsageModel.find({user: email});
       let totalBathroomWaterUsage, totalKitchenWaterUsage, totalLaundryWaterUsage, totalCarWaterUsage, totalSwimmingPoolWaterUsage;

       for(let j = 0; j < waterUsage.length; i++){
        let dateObj = waterUsage[j].date;
        console.log('date obj '+ dateObj);
        let month = dateObj.getMonth();
        console.log('month is: ' + month);
        
        
        if((new Date()).getMonth == (month)){
            let { bathroomWaterUsage, kitchenWaterUsage, laundryWaterUsage, carWaterUsage, swimmingPoolWaterUsage} = waterUsage[j];

            totalBathroomWaterUsage += bathroomWaterUsage;
            totalKitchenWaterUsage += kitchenWaterUsage;
            totalLaundryWaterUsage += laundryWaterUsage;
            totalSwimmingPoolWaterUsage += swimmingPoolWaterUsage;
            totalCarWaterUsage += carWaterUsage;
        }else{
            console.log('next');
        }
       }

       let usersAggregate = {
        user: email,
        totalBathroomWaterUsage: totalBathroomWaterUsage,
        totalKitchenWaterUsage: totalKitchenWaterUsage,
        totalLaundryWaterUsage: totalLaundryWaterUsage,
        totalSwimmingPoolWaterUsage: totalSwimmingPoolWaterUsage,
        totalCarWaterUsage: totalCarWaterUsage     
       }

       aggregationArr.push(usersAggregate);

       }catch(err){
            console.log(err);
       }
    }
    return aggregationArr;
}

module.exports = sendWelcomeEmail;
