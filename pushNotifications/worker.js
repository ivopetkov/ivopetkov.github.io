/*
 * Push Notifications demo
 * http://ivopetkov.com/
 * Copyright 2015, Ivo Petkov
 * Free to use under the MIT license.
*/

self.addEventListener('push', function (event) {
    event.waitUntil(
        self.registration.pushManager.getSubscription().then(
            function (subscription) {
                return fetch('https://ivopetkov.github.io/pushNotifications/data.json?endpoint=' + encodeURIComponent(subscription.endpoint)).then(function (response) {
                    if (response.status === 200) {
                        return response.json().then(function (data) {
                            return self.registration.showNotification(data.title, {
                                'body': data.message,
                                'icon': data.icon,
                                'tag': data.tag,
                                'data': data
                            });
                        });
                    }
                })
            })
        );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (typeof event.notification.data.onClickUrl !== 'undefined') {
        if (clients.openWindow) {
            return clients.openWindow(event.notification.data.onClickUrl);
        }
    }
});