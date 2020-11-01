"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadBlob = downloadBlob;
exports.appendTo = exports.createElement = exports.$$ = exports.$ = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var $ = function $() {
  var _document;

  return (_document = document).querySelector.apply(_document, arguments);
};

exports.$ = $;

var $$ = function $$() {
  var _document2;

  return (0, _toConsumableArray2["default"])((_document2 = document).querySelectorAll.apply(_document2, arguments));
};

exports.$$ = $$;
var plainAttributes = ['for', 'inputmode', 'minlength', 'maxlength', 'min', 'max', 'pattern'];

var createElement = function createElement(tag, attrs) {
  var el = document.createElement(tag);
  plainAttributes.forEach(function (plainAttr) {
    if (attrs && plainAttr in attrs && attrs[plainAttr]) {
      el.setAttribute(plainAttr, attrs[plainAttr]);
    }

    if (attrs) {
      delete attrs[plainAttr];
    }
  });
  Object.assign(el, attrs);
  return el;
};

exports.createElement = createElement;

var appendTo = function appendTo(el) {
  return function (domNodes) {
    if (domNodes[Symbol.iterator]) {
      el.append.apply(el, (0, _toConsumableArray2["default"])(domNodes));
      return;
    }

    el.append(domNodes);
  };
};

exports.appendTo = appendTo;

function downloadBlob(blob, fileName) {
  var link = createElement('a');
  var url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
}