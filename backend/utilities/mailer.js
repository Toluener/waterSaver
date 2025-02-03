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
      pass: "dfqwgyvtihmvrach",
    },
  });



//sending monthly email reports
let sendMonthlyEmail = async (subject, text)=>{
    let users = await userModel.find({});

    //using for loop to send emails to all users
    for(let i = 0; i < users.length; i++){
        const mailOptions = {
            from: "waterSaver",
            to: users[i].email,
            subject: subject,
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
    
            try{
                console.log('sending welcome mails...');
                await transporter.sendMail(mailOptions);
                console.log('welcome emails sent');
            }catch(err){
                console.log(err);
            }
    }
}

module.exports = sendWelcomeEmail;
