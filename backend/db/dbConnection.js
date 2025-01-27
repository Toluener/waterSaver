const mongoose = require('mongoose');
require('dotenv').config({path: '../configurations/Env.env'});



let connect = async ()=>{

  let URI = `mongodb+srv://toluehinmosan51:${process.env.DB_PASSWORD}@cluster0.ofefc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

   try{
    await mongoose.connect(URI, {
      ssl: true,
      dbName: 'waterSaverDB'
    });
    console.log('Your MongoDB database has been connected sucessfully')
   } catch(err){
    console.log(err);
   }
}

module.exports = connect;