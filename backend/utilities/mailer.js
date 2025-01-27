const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({path: '../configurations/Env.env'});
const {userModel, calculatorInputsModel, dailyWaterUsageModel} = require(path.join(__dirname, '../db/Schema.js'));


let sendingEmail = async ()=>{
    let users = await userModel.find({}, {email: 1, _id: 0});
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ehinmosantolu@gmail.com",
          pass: process.env.PASS,
        },
      });
    

    //Function to send mails using the transporter
    const sendEmail = (to, subject, text)=>{
        for(let i = 0; i < to.length; i++){
            const mailOptions = {
                from: "ehinmosantolu@gmail.com",
                to: to[i].email,
                subject: subject,
                text: text
            };
        
            let useTransporter = async ()=>{
                try{
                    console.log('sending mails...');
                    const info = await transporter.sendMail(mailOptions);
                    console.log('email sent');
                }catch(err){
                    console.log(err);
                }
            };
            useTransporter();
        }
    }
    
    sendEmail(users, 'waterSaver Notification', 'Welcome to water saver!');
}

sendingEmail();