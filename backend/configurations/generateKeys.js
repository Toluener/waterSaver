const webPush = require('web-push');

// Create Vapid keys for authentication
const vapidKeys = webPush.generateVAPIDKeys();
console.log(vapidKeys.publicKey);
console.log(vapidKeys.privateKey);
