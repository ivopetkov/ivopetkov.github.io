if (typeof pushNotifications === 'undefined') {

    var pushNotifications = {};
    pushNotifications.endpoint = null;

    pushNotifications.initialize = function (serviceWorkerFilePath, onDone, onError) {
        console.log(1);
        if (typeof onDone !== 'function') {
            onDone = function () {
                console.log('pushNotifications initialized');
            };
        }
        console.log(2);
        if (typeof onError !== 'function') {
            onError = function (message) {
                console.log('pushNotifications error: ' + message);
            };
        }
        console.log(3);
        if ('serviceWorker' in navigator) {
            console.log(4);
            navigator.serviceWorker.register(serviceWorkerFilePath)
                    .then(function () {
                        console.log(5);
                        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                            onError('Notifications aren\'t supported.');
                            return;
                        }
                        console.log(6);
                        if (Notification.permission === 'denied') {
                            onError('The user has blocked notifications.');
                            return;
                        }
                        console.log(7);
                        if (!('PushManager' in window)) {
                            onError('Push messaging isn\'t supported.');
                            return;
                        }
                        console.log(8);
                        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                            console.log(9);
                            serviceWorkerRegistration.pushManager.getSubscription()
                                    .then(function (subscription) {
                                        console.log(10);
                                        if (subscription) {
                                            pushNotifications.endpoint = subscription.endpoint;
                                            onDone();
                                        } else {
                                            console.log(11);
                                            serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
                                                    .then(function (subscription) {
                                                        pushNotifications.endpoint = subscription.endpoint;
                                                        onDone();
                                                    })
                                                    .catch(function (error) {
                                                        if (Notification.permission === 'denied') {
                                                            onError('Permission for Notifications was denied');
                                                        } else {
                                                            onError('Unable to subscribe to push: ' + JSON.stringify(error));
                                                        }
                                                    });
                                        }


                                    })
                                    .catch(function (error) {
                                        onError('Error: ' + JSON.stringify(error));
                                    });
                        })
                                .catch(function (error) {
                                    onError('Error: ' + JSON.stringify(error));
                                });
                    })
                    .catch(function (error) {
                        onError('Error: ' + JSON.stringify(error));
                    });
        } else {
            onError('Service workers aren\'t supported in this browser.');
        }
    };

    pushNotifications.getEndpoint = function () {
        return pushNotifications.endpoint;
    };
}
;