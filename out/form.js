"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createForm = createForm;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("bootstrap/dist/css/bootstrap.min.css");

require("../css/main.css");

var _formData = _interopRequireDefault(require("../form-data.json"));

var _domUtils = require("./dom-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createTitle = function createTitle() {
  var h2 = (0, _domUtils.createElement)('h2', {
    className: 'titre-2',
    innerHTML: 'Remplissez en ligne votre déclaration numérique : '
  });
  var p = (0, _domUtils.createElement)('p', {
    className: 'msg-info',
    innerHTML: 'Tous les champs sont obligatoires.'
  });
  return [h2, p];
}; // createElement('div', { className: 'form-group' })


var getCurrentTime = function getCurrentTime() {
  var date = new Date();
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

var createFormGroup = function createFormGroup(_ref) {
  var _ref$autocomplete = _ref.autocomplete,
      autocomplete = _ref$autocomplete === void 0 ? false : _ref$autocomplete,
      _ref$autofocus = _ref.autofocus,
      autofocus = _ref$autofocus === void 0 ? false : _ref$autofocus,
      inputmode = _ref.inputmode,
      label = _ref.label,
      max = _ref.max,
      min = _ref.min,
      maxlength = _ref.maxlength,
      minlength = _ref.minlength,
      name = _ref.name,
      pattern = _ref.pattern,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type;
  var formGroup = (0, _domUtils.createElement)('div', {
    className: 'form-group'
  });
  var labelAttrs = {
    "for": "field-".concat(name),
    id: "field-".concat(name, "-label"),
    innerHTML: label
  };
  var labelEl = (0, _domUtils.createElement)('label', labelAttrs);
  var inputGroup = (0, _domUtils.createElement)('div', {
    className: 'input-group align-items-center'
  });
  var inputAttrs = {
    autocomplete: autocomplete,
    autofocus: autofocus,
    className: 'form-control',
    id: "field-".concat(name),
    inputmode: inputmode,
    min: min,
    max: max,
    minlength: minlength,
    maxlength: maxlength,
    name: name,
    pattern: pattern,
    placeholder: placeholder,
    required: true,
    type: type
  };
  var input = (0, _domUtils.createElement)('input', inputAttrs);

  if (name === 'heuresortie') {
    input.value = getCurrentTime();
  }

  var validityAttrs = {
    className: 'validity'
  };
  var validity = (0, _domUtils.createElement)('span', validityAttrs);
  var appendToFormGroup = (0, _domUtils.appendTo)(formGroup);
  appendToFormGroup(labelEl);
  appendToFormGroup(inputGroup);
  var appendToInputGroup = (0, _domUtils.appendTo)(inputGroup);
  appendToInputGroup(input);
  appendToInputGroup(validity);
  return formGroup;
};

var createReasonField = function createReasonField(reasonData) {
  var formReasonAttrs = {
    className: 'form-checkbox align-items-center'
  };
  var formReason = (0, _domUtils.createElement)('div', formReasonAttrs);
  var appendToReason = (0, _domUtils.appendTo)(formReason);
  var id = "checkbox-".concat(reasonData.code);
  var inputReasonAttrs = {
    className: 'form-check-input',
    type: 'checkbox',
    id: id,
    name: 'field-reason',
    value: reasonData.code
  };
  var inputReason = (0, _domUtils.createElement)('input', inputReasonAttrs);
  var labelAttrs = {
    innerHTML: reasonData.label,
    className: 'form-checkbox-label',
    "for": id
  };
  var label = (0, _domUtils.createElement)('label', labelAttrs);
  appendToReason([inputReason, label]);
  return formReason;
};

var createReasonFieldset = function createReasonFieldset(reasonsData) {
  var fieldsetAttrs = {
    id: 'reason-fieldset',
    className: 'fieldset'
  };
  var fieldset = (0, _domUtils.createElement)('fieldset', fieldsetAttrs);
  var appendToFieldset = (0, _domUtils.appendTo)(fieldset);
  var legendAttrs = {
    className: 'legend titre-3',
    innerHTML: 'Choisissez un motif de déplacement'
  };
  var legend = (0, _domUtils.createElement)('legend', legendAttrs);
  var textAlertAttrs = {
    className: 'msg-alert hidden',
    innerHTML: 'Veuillez choisir un motif'
  };
  var textAlert = (0, _domUtils.createElement)('p', textAlertAttrs);
  var textSubscribeReasonAttrs = {
    innerHTML: 'certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l\'épidémie de Covid19 dans le cadre de l\'état d\'urgence sanitaire  <a class="footnote" href="#footnote1">[1]</a>&nbsp;:'
  };
  var textSubscribeReason = (0, _domUtils.createElement)('p', textSubscribeReasonAttrs);
  var reasonsFields = reasonsData.items.map(createReasonField);
  appendToFieldset([legend, textAlert, textSubscribeReason].concat((0, _toConsumableArray2["default"])(reasonsFields))); // Créer un form-checkbox par motif

  return fieldset;
};

function createForm() {
  var form = (0, _domUtils.$)('#form-profile'); // Évite de recréer le formulaire s'il est déjà créé par react-snap (ou un autre outil de prerender)

  if (form.innerHTML !== '') {
    return;
  }

  var appendToForm = (0, _domUtils.appendTo)(form);

  var formFirstPart = _formData["default"].flat(1).filter(function (field) {
    return field.key !== 'reason';
  }).filter(function (field) {
    return !field.isHidden;
  }).map(function (field, index) {
    var formGroup = createFormGroup(_objectSpread(_objectSpread({
      autofocus: index === 0
    }, field), {}, {
      name: field.key
    }));
    return formGroup;
  });

  var reasonsData = _formData["default"].flat(1).find(function (field) {
    return field.key === 'reason';
  });

  var reasonFieldset = createReasonFieldset(reasonsData);
  appendToForm([].concat((0, _toConsumableArray2["default"])(createTitle()), (0, _toConsumableArray2["default"])(formFirstPart), [reasonFieldset]));
}