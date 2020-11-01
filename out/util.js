"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateQR = generateQR;
exports.pad2Zero = pad2Zero;
exports.getFormattedDate = getFormattedDate;
exports.addSlash = addSlash;
exports.addVersion = addVersion;

var _qrcode = _interopRequireDefault(require("qrcode"));

function generateQR(text) {
  var opts = {
    errorCorrectionLevel: 'M',
    type: 'image/png',
    quality: 0.92,
    margin: 1
  };
  return _qrcode["default"].toDataURL(text, opts);
}

function pad2Zero(str) {
  return String(str).padStart(2, '0');
}

function getFormattedDate(date) {
  var year = date.getFullYear();
  var month = pad2Zero(date.getMonth() + 1); // Les mois commencent à 0

  var day = pad2Zero(date.getDate());
  return "".concat(year, "-").concat(month, "-").concat(day);
}

function addSlash(str) {
  return str.replace(/^(\d{2})$/g, '$1/').replace(/^(\d{2})\/(\d{2})$/g, '$1/$2/').replace(/\/\//g, '/');
}

function addVersion(version) {
  document.getElementById('version').innerHTML = "".concat(new Date().getFullYear(), " - ").concat(version);
}