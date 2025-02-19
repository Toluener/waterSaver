const path = require('path');
const webPush = require('web-push');
const {userModel, calculatorInputsModel, dailyWaterUsageModel, subscriptionModel} = require(path.join(__dirname, '../db/Schema.js'));


//Function to send random push notifications to random subscribed users.
const sendNotifications = async ()=>{
    try{
        //fetch all subsrciptions
        const subscriptions = await subscriptionModel.find();
        let numberOfSubscriptions = subscriptions.length;
        if( numberOfSubscriptions === 0){
            console.log('No subscriptions found');
            return;}

            //select multiple random users' subscription to send notifications to
            const randomIndex = Math.floor(Math.random()*numberOfSubscriptions) + 1;
            subscriptions.sort(()=>{0.5 - Math.random()});
            const selectedSubscriptions = subscriptions.slice(0, randomIndex);

            //Get calculator inputs of user to structure the notifications to send
            

            //notification payload
            const payload = JSON.stringify(
                {
                    title: 'Welcome Notifications',
                    body: 'This is a test notification',
                    url: '/'
                }
            );

            //send notifications to random suscribed user
                for(const subscription of selectedSubscriptions){
                    try{
                        await webPush.sendNotification(subscription, payload);
                        console.log(`push notification sent to: ${subscription.endpoint}`);
                    }
                    catch(error){
                        console.log(error);
                    }
                }
    }
    catch(err){
        console.log(err);
    }
}


//scheduling the notifications to be sent after certain interval
let scheduleNotifications = (interval)=>{
    setTimeout(async () =>{
      console.log('sending notifications...');
      await sendNotifications();
  
      //Schedule the next notification
      scheduleNotifications(interval);
    }, interval);
  }

//scheduling notifications for occur every 5 mins
scheduleNotifications(18000000);
