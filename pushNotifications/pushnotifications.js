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
            onError = function (error) {
                console.log('pushNotifications error: ' + error.message + ' (' + error.code + ')');
            };
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(serviceWorkerFilePath)
                .then(function () {
                    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                        onError({ 'code': 'NOT_SUPPORTED', 'message': 'Notifications aren\'t supported.' });
                        return;
                    }
                    if (Notification.permission === 'denied') {
                        onError({ 'code': 'ACCESS_DENIED', 'message': 'The user has blocked notifications.' });
                        return;
                    }
                    if (!('PushManager' in window)) {
                        onError({ 'code': 'NOT_SUPPORTED', 'message': 'Push messaging isn\'t supported.' });
                        return;
                    }
                    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                        serviceWorkerRegistration.pushManager.getSubscription()
                            .then(function (subscription) {
                                if (subscription) {
                                    pushNotifications.endpoint = subscription.endpoint;
                                    onDone();
                                } else {
                                    serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true })
                                        .then(function (subscription) {
                                            pushNotifications.endpoint = subscription.endpoint;
                                            onDone();
                                        })
                                        .catch(function (error) {
                                            if (Notification.permission === 'denied') {
                                                onError({ 'code': 'ACCESS_DENIED', 'message': 'Permission for Notifications was denied' });
                                            } else {
                                                onError({ 'code': 'UNKNOWN', 'message': JSON.stringify(error) });
                                            }
                                        });
                                }


                            })
                            .catch(function (error) {
                                onError({ 'code': 'UNKNOWN', 'message': JSON.stringify(error) });
                            });
                    })
                        .catch(function (error) {
                            onError({ 'code': 'UNKNOWN', 'message': JSON.stringify(error) });
                        });
                })
                .catch(function (error) {
                    onError({ 'code': 'UNKNOWN', 'message': JSON.stringify(error) });
                });
        } else {
            onError({ 'code': 'NOT_SUPPORTED', 'message': 'Service workers aren\'t supported in this browser.' });
        }
    };

    pushNotifications.getEndpoint = function () {
        return pushNotifications.endpoint;
    };
}
;