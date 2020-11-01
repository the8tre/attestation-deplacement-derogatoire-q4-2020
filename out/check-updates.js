"use strict";

var _domUtils = require("./dom-utils");

// Ce fichier est généré au build par le plugin parcel-plugin-sw-cache
var swName = '../sw.js';
window.isUpdateAvailable = new Promise(function (resolve, reject) {
  // lazy way of disabling service workers while developing
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(swName).then(function (registration) {
      registration.onupdatefound = function () {
        var installingWorker = registration.installing;

        installingWorker.onstatechange = function () {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // new update available
                resolve(true);
              } else {
                // no update available
                resolve(false);
              }

              break;
          }
        };
      };
    })["catch"](function (err) {
      return console.error('[SW ERROR]', err);
    }); // eslint-disable-line no-console
  }
});
window.isUpdateAvailable.then(function (isAvailable) {
  (0, _domUtils.$)('#reload-btn').addEventListener('click', function () {
    return window.location.reload();
  });
  (0, _domUtils.$)('#update-alert').classList.remove('d-none');
});