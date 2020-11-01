"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePdf = generatePdf;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pdfLib = require("pdf-lib");

function generatePdf(_x) {
  return _generatePdf.apply(this, arguments);
}

function _generatePdf() {
  _generatePdf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
    var pdfBase, buffer, pdfDoc, pages, page1, font, drawText, x, y, pdfBytes, pdfAsBlob;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.stopPropagation();
            pdfBase = document.getElementById('file').files[0];
            _context.next = 4;
            return pdfBase.arrayBuffer();

          case 4:
            buffer = _context.sent;
            _context.next = 7;
            return _pdfLib.PDFDocument.load(buffer);

          case 7:
            pdfDoc = _context.sent;
            pages = pdfDoc.getPages();
            page1 = pages[0];
            _context.next = 12;
            return pdfDoc.embedFont(_pdfLib.StandardFonts.Helvetica);

          case 12:
            font = _context.sent;

            drawText = function drawText(text, x, y) {
              var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 11;
              page1.drawText(text, {
                x: x,
                y: y,
                size: size,
                font: font
              });
            };

            for (x = 25; x < 1000; x += 25) {
              for (y = 25; y < 1000; y += 25) {
                drawText('.', {
                  x: x,
                  y: y,
                  size: 11,
                  font: font,
                  color: (0, _pdfLib.rgb)(0.95, 0.1, 0.1)
                });
                drawText("".concat(x), {
                  x: x + 3,
                  y: y,
                  size: 7,
                  font: font,
                  color: (0, _pdfLib.rgb)(0, 0, 0)
                });
                drawText("".concat(y), {
                  x: x + 3,
                  y: y - 6,
                  size: 7,
                  font: font,
                  color: (0, _pdfLib.rgb)(0, 0, 0)
                });
              }
            }

            pdfDoc.addPage();
            _context.next = 18;
            return pdfDoc.save();

          case 18:
            pdfBytes = _context.sent;
            // Trigger the browser to download the PDF document
            pdfAsBlob = new Blob([pdfBytes], {
              type: 'application/pdf'
            });
            downloadBlob(pdfAsBlob, 'grid.pdf', 'application/pdf');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generatePdf.apply(this, arguments);
}

function downloadBlob(blob, fileName) {
  var link = document.createElement('a');
  var url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
}

document.querySelector('#file').addEventListener('change', generatePdf);