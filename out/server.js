"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pdfUtil = require("./pdf-util.js");

var _fs = require("fs");

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var Blob = require('cross-blob');

var basePdfBuffer = (0, _fs.readFileSync)('./src/certificate.pdf').buffer;

var arrayBuffer = function arrayBuffer() {
  return new Promise(function (resolve, reject) {
    resolve(basePdfBuffer);
  });
};

var fakeFetch = function fakeFetch() {
  return new Promise(function (resolve, reject) {
    resolve({
      arrayBuffer: arrayBuffer
    });
  });
};

if (!globalThis.fetch) {
  globalThis.fetch = fakeFetch;
}

if (!globalThis.Blob) {
  globalThis.Blob = Blob;
}

function run(_x, _x2) {
  return _run.apply(this, arguments);
}

function _run() {
  _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(profile, reasons) {
    var blob, buffer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _pdfUtil.generatePdf)(profile, reasons, null);

          case 2:
            blob = _context.sent;
            _context.next = 5;
            return blob.arrayBuffer();

          case 5:
            buffer = _context.sent;
            return _context.abrupt("return", Buffer.from(buffer));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _run.apply(this, arguments);
}

var validateInput = function validateInput(input) {
  if (!input || !input.profile || !input.reasons) {
    return false;
  }

  var valid = typeof input.profile.firstname === 'string' & typeof input.profile.lastname === 'string' & typeof input.profile.birthday === 'string' & typeof input.profile.placeofbirth === 'string' & typeof input.profile.address === 'string' & typeof input.profile.zipcode === 'string' & typeof input.profile.city === 'string' & typeof input.profile.datesortie === 'string' & typeof input.profile.heuresortie === 'string' & typeof input.reasons === 'string';
  return valid;
};

app.use(bodyParser.json());
app.post('/', function (req, res) {
  var body = req.body;

  if (!validateInput(body)) {
    res.sendStatus(400);
    return;
  }

  run(body.profile, body.reasons).then(function (buffer) {
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=attestation.pdf');
    res.end(buffer);
  })["catch"](function (error) {
    console.log(error);
    res.sendStatus(500);
  });
});
app.listen(3000); // const path = require('path')
// const PORT = process.env.PORT || 5000
// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))