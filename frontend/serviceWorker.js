//Adding event listeners to the service worker

self.addEventListener('install', (installEvent)=>{
    console.log('Service worker installing...');
});

self.addEventListener('activate', (activateEvent)=>{
    console.log('Service worker activating...');
    activateEvent.waitUntil(
       self.clients.claim()
    );
});

// A listener to listen for push events
self.addEventListener('push', (pushEvent)=>{
    const data = pushEvent.data.json();
 console.log('push event recieved');
    // show the notification
    self.registration.showNotification(data.title, {
        body: data.body,
        data: data.url
    });
});


//a listener to handle notification click events
self.addEventListener('notificationclick', notifEvent => {
    notifEvent.notification.close();

    //open the specified URL if the notification is clicked on 
    if(notifEvent.notification.data){
        clients.openWindow(notifEvent.notification.data);
    }
});