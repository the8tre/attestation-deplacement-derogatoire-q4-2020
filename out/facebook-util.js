"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnFacebookBrowserUserIfNecessary = warnFacebookBrowserUserIfNecessary;

var _domUtils = require("./dom-utils");

function warnFacebookBrowserUserIfNecessary() {
  if (isFacebookBrowser()) {
    var alertFacebookElt = (0, _domUtils.$)('#alert-facebook');
    alertFacebookElt.value = "ATTENTION !! Vous utilisez actuellement le navigateur Facebook, ce générateur ne fonctionne pas correctement au sein de ce navigateur ! Merci d'ouvrir Chrome sur Android ou bien Safari sur iOS.";
    alertFacebookElt.classList.remove('d-none');
  }
} // see: https://stackoverflow.com/a/32348687/1513045


function isFacebookBrowser() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.includes('FBAN') || ua.includes('FBAV');
}