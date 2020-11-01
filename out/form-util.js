"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReleaseDateTime = setReleaseDateTime;
exports.getProfile = getProfile;
exports.getReasons = getReasons;
exports.prepareInputs = prepareInputs;
exports.prepareForm = prepareForm;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _domUtils = require("./dom-utils");

var _util = require("./util");

var _certificate = _interopRequireDefault(require("../certificate.pdf"));

var _pdfUtil = require("./pdf-util");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var conditions = {
  '#field-firstname': {
    length: 1
  },
  '#field-lastname': {
    length: 1
  },
  '#field-birthday': {
    pattern: /^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)/g
  },
  '#field-placeofbirth': {
    length: 1
  },
  '#field-address': {
    length: 1
  },
  '#field-city': {
    length: 1
  },
  '#field-zipcode': {
    pattern: /\d{5}/g
  },
  '#field-datesortie': {
    pattern: /\d{4}-\d{2}-\d{2}/g
  },
  '#field-heuresortie': {
    pattern: /\d{2}:\d{2}/g
  }
};

function validateAriaFields() {
  return Object.keys(conditions).map(function (field) {
    var fieldData = conditions[field];
    var pattern = fieldData.pattern;
    var length = fieldData.length;
    var isInvalidPattern = pattern && !(0, _domUtils.$)(field).value.match(pattern);
    var isInvalidLength = length && !(0, _domUtils.$)(field).value.length;
    var isInvalid = !!(isInvalidPattern || isInvalidLength);
    (0, _domUtils.$)(field).setAttribute('aria-invalid', isInvalid);

    if (isInvalid) {
      (0, _domUtils.$)(field).focus();
    }

    return isInvalid;
  }).includes(true);
}

function setReleaseDateTime(releaseDateInput) {
  var loadedDate = new Date();
  releaseDateInput.value = (0, _util.getFormattedDate)(loadedDate);
}

function getProfile(formInputs) {
  var fields = {};

  var _iterator = _createForOfIteratorHelper(formInputs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var field = _step.value;
      var value = field.value;

      if (field.id === 'field-datesortie') {
        var dateSortie = field.value.split('-');
        value = "".concat(dateSortie[2], "/").concat(dateSortie[1], "/").concat(dateSortie[0]);
      }

      fields[field.id.substring('field-'.length)] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return fields;
}

function getReasons(reasonInputs) {
  var reasons = reasonInputs.filter(function (input) {
    return input.checked;
  }).map(function (input) {
    return input.value;
  }).join(', ');
  return reasons;
}

function prepareInputs(formInputs, reasonInputs, reasonFieldset, reasonAlert, snackbar) {
  formInputs.forEach(function (input) {
    var exempleElt = input.parentNode.parentNode.querySelector('.exemple');
    var validitySpan = input.parentNode.parentNode.querySelector('.validity');

    if (input.placeholder && exempleElt) {
      input.addEventListener('input', function (event) {
        if (input.value) {
          exempleElt.innerHTML = 'ex.&nbsp;: ' + input.placeholder;
          validitySpan.removeAttribute('hidden');
        } else {
          exempleElt.innerHTML = '';
        }
      });
    }
  });
  (0, _domUtils.$)('#field-birthday').addEventListener('keyup', function (event) {
    event.preventDefault();
    var input = event.target;
    var key = event.keyCode || event.charCode;

    if (key !== 8 && key !== 46) {
      input.value = (0, _util.addSlash)(input.value);
    }
  });
  reasonInputs.forEach(function (radioInput) {
    radioInput.addEventListener('change', function (event) {
      var isInError = reasonInputs.every(function (input) {
        return !input.checked;
      });
      reasonFieldset.classList.toggle('fieldset-error', isInError);
      reasonAlert.classList.toggle('hidden', !isInError);
    });
  });
  (0, _domUtils.$)('#generate-btn').addEventListener('click', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(event) {
      var reasons, invalid, pdfBlob, creationInstant, creationDate, creationHour;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();
              reasons = getReasons(reasonInputs);

              if (reasons) {
                _context.next = 7;
                break;
              }

              reasonFieldset.classList.add('fieldset-error');
              reasonAlert.classList.remove('hidden');
              reasonFieldset.scrollIntoView && reasonFieldset.scrollIntoView();
              return _context.abrupt("return");

            case 7:
              invalid = validateAriaFields();

              if (!invalid) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return");

            case 10:
              console.log(getProfile(formInputs), reasons);
              _context.next = 13;
              return (0, _pdfUtil.generatePdf)(getProfile(formInputs), reasons, _certificate["default"]);

            case 13:
              pdfBlob = _context.sent;
              creationInstant = new Date();
              creationDate = creationInstant.toLocaleDateString('fr-CA');
              creationHour = creationInstant.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              }).replace(':', '-');
              (0, _domUtils.downloadBlob)(pdfBlob, "attestation-".concat(creationDate, "_").concat(creationHour, ".pdf"));
              snackbar.classList.remove('d-none');
              setTimeout(function () {
                return snackbar.classList.add('show');
              }, 100);
              setTimeout(function () {
                snackbar.classList.remove('show');
                setTimeout(function () {
                  return snackbar.classList.add('d-none');
                }, 500);
              }, 6000);

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

function prepareForm() {
  var formInputs = (0, _domUtils.$$)('#form-profile input');
  var snackbar = (0, _domUtils.$)('#snackbar');
  var reasonInputs = (0, _toConsumableArray2["default"])((0, _domUtils.$$)('input[name="field-reason"]'));
  var reasonFieldset = (0, _domUtils.$)('#reason-fieldset');
  var reasonAlert = reasonFieldset.querySelector('.msg-alert');
  var releaseDateInput = (0, _domUtils.$)('#field-datesortie');
  setReleaseDateTime(releaseDateInput);
  prepareInputs(formInputs, reasonInputs, reasonFieldset, reasonAlert, snackbar);
}