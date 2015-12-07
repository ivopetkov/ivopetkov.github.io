/*
 * Push Notifications
 * http://ivopetkov.com/
 * Copyright 2015, Ivo Petkov
 * Free to use under the MIT license.
 */

if (typeof pushNotifications === 'undefined') {

    var pushNotifications = {};
    pushNotifications.endpoint = null;

    pushNotifications.initialize = function (serviceWorkerFilePath, onDone, onError) {
        if (typeof onDone !== 'function') {
            onDone = function () {
                console.log('pushNotifications initialized');
            };
        }
        if (typeof onError !== 'function') {
            onError = function (message) {
                console.log('pushNotifications error: ' + message);
            };
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(serviceWorkerFilePath)
                    .then(function () {
                        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                            onError('Notifications aren\'t supported.');
                            return;
                        }
                        if (Notification.permission === 'denied') {
                            onError('The user has blocked notifications.');
                            return;
                        }
                        if (!('PushManager' in window)) {
                            onError('Push messaging isn\'t supported.');
                            return;
                        }
                        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                            serviceWorkerRegistration.pushManager.getSubscription()
                                    .then(function (subscription) {
                                        if (subscription) {
                                            pushNotifications.endpoint = subscription.endpoint;
                                            onDone();
                                        } else {
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