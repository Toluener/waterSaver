//vapid public key 
let publicKey = 'BB6Xzi0l4vhZcnyPc0W7PiupJGsT0oMC-Vu6neyO5PpEAAFwQLjMhZnh5uw9rywBk0cggA1-Jxd_DBncZf-2XTI'


//convert vapid key function
let urlBase64ToUint8Array = (base64String)=>{
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for(let i = 0; i < rawData.length; i++){
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


let send = async ()=>{

    console.log('registering service worker');
    const register = await navigator.serviceWorker.register('./serviceWorker.js', {
        scope: '/waterSaver/'
    });
    console.log('service worker registered');
    
    //register push
    console.log('registering push...')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
    console.log('push registered');
    
    //send push notif
    console.log('sending push subscription');
    await fetch('/waterSaver/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push subscription sent');
    } 


const subscribeButton = document.getElementById('subscribeButton');

subscribeButton.addEventListener('click', async ()=>{
    if('serviceWorker' in navigator){
        console.log('found');

        if(Notification.permission === 'granted'){
            //show a popup message to tell user that permission has already been granted
            alert('You have already subcribed to notifications!');
            alert("If you haven't been receiving notifications please check your browser's settings to reset notifications and try subscribing again");
        }else if( Notification.permission === 'default'){
            //ask for permission
            const permission = await Notification.requestPermission();
            if(permission == 'denied'){
                console.log('Permission to send User Notification has been denied');
                alert("You have denied permission to receive notifications from us");
                alert("If you change your mind you can check your browser's settings to reset notifications and subscribe")
            }
            else{
                console.log('Permission to send User Notification has been granted');
                send().catch(err => console.error(err));
            }
        }else{
                console.log('Permission to send User Notification has been denied');
                alert("You have denied permission to receive notifications from us");
                alert("If you change your mind you can check your browser's settings to reset notifications and subscribe")
        }

    }
    else{console.log('not found');}
})


