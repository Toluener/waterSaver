const express = require('express');
const app = express();
const cors = require('cors');
const webPush = require('web-push');
const router = require('../backend/routers');
const path = require('path'); 
require('dotenv').config({path: './configurations/Env.env'});
const connect = require(path.join(__dirname, './db/dbConnection.js'));

connect();

const allowedOrigins = [
    "http://localhost:3000",
    "http://102.89.82.236:3000",
    "https://water-saver-project.vercel.app"
  ];

  
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.options("*", cors());
app.set('trust proxy', 1);
app.use('/waterSaver', router);

 
webPush.setVapidDetails(
    'mailto: toluehinmosan51@gmail.com',
    process.env.VAPID_PUBLICKEY,
    process.env.VAPID_PRIVATEKEY
);

const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
    console.log('server is running');
})
