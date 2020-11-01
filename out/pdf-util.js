"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePdf = generatePdf;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _util = require("./util");

var _pdfLib = require("pdf-lib");

var ys = {
  travail: 578,
  achats: 533,
  sante: 477,
  famille: 435,
  handicap: 396,
  sport_animaux: 358,
  convocation: 295,
  missions: 255,
  enfants: 211
};

function generatePdf(_x, _x2, _x3) {
  return _generatePdf.apply(this, arguments);
}

function _generatePdf() {
  _generatePdf = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(profile, reasons, pdfBase) {
    var creationInstant, creationDate, creationHour, lastname, firstname, birthday, placeofbirth, address, zipcode, city, datesortie, heuresortie, data, existingPdfBytes, pdfDoc, page1, font, drawText, locationSize, generatedQR, qrImage, page2, pdfBytes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            creationInstant = new Date();
            creationDate = creationInstant.toLocaleDateString('fr-FR');
            creationHour = creationInstant.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            }).replace(':', 'h');
            lastname = profile.lastname, firstname = profile.firstname, birthday = profile.birthday, placeofbirth = profile.placeofbirth, address = profile.address, zipcode = profile.zipcode, city = profile.city, datesortie = profile.datesortie, heuresortie = profile.heuresortie;
            data = ["Cree le: ".concat(creationDate, " a ").concat(creationHour), "Nom: ".concat(lastname), "Prenom: ".concat(firstname), "Naissance: ".concat(birthday, " a ").concat(placeofbirth), "Adresse: ".concat(address, " ").concat(zipcode, " ").concat(city), "Sortie: ".concat(datesortie, " a ").concat(heuresortie), "Motifs: ".concat(reasons)].join(';\n ');
            _context.next = 7;
            return fetch(pdfBase).then(function (res) {
              return res.arrayBuffer();
            });

          case 7:
            existingPdfBytes = _context.sent;
            _context.next = 10;
            return _pdfLib.PDFDocument.load(existingPdfBytes);

          case 10:
            pdfDoc = _context.sent;
            // set pdf metadata
            pdfDoc.setTitle('COVID-19 - Déclaration de déplacement');
            pdfDoc.setSubject('Attestation de déplacement dérogatoire');
            pdfDoc.setKeywords(['covid19', 'covid-19', 'attestation', 'déclaration', 'déplacement', 'officielle', 'gouvernement']);
            pdfDoc.setProducer('DNUM/SDIT');
            pdfDoc.setCreator('');
            pdfDoc.setAuthor("Ministère de l'intérieur");
            page1 = pdfDoc.getPages()[0];
            _context.next = 20;
            return pdfDoc.embedFont(_pdfLib.StandardFonts.Helvetica);

          case 20:
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

            drawText("".concat(firstname, " ").concat(lastname), 119, 696);
            drawText(birthday, 119, 674);
            drawText(placeofbirth, 297, 674);
            drawText("".concat(address, " ").concat(zipcode, " ").concat(city), 133, 652);
            reasons.split(', ').forEach(function (reason) {
              drawText('x', 78, ys[reason], 18);
            });
            locationSize = getIdealFontSize(font, profile.city, 83, 7, 11);

            if (!locationSize) {
              alert('Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. ' + 'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.');
              locationSize = 7;
            }

            drawText(profile.city, 105, 177, locationSize);
            drawText("".concat(profile.datesortie), 91, 153, 11);
            drawText("".concat(profile.heuresortie), 264, 153, 11); // const shortCreationDate = `${creationDate.split('/')[0]}/${
            //   creationDate.split('/')[1]
            // }`
            // drawText(shortCreationDate, 314, 189, locationSize)
            // // Date création
            // drawText('Date de création:', 479, 130, 6)
            // drawText(`${creationDate} à ${creationHour}`, 470, 124, 6)

            _context.next = 34;
            return (0, _util.generateQR)(data);

          case 34:
            generatedQR = _context.sent;
            _context.next = 37;
            return pdfDoc.embedPng(generatedQR);

          case 37:
            qrImage = _context.sent;
            page1.drawImage(qrImage, {
              x: page1.getWidth() - 156,
              y: 100,
              width: 92,
              height: 92
            });
            pdfDoc.addPage();
            page2 = pdfDoc.getPages()[1];
            page2.drawImage(qrImage, {
              x: 50,
              y: page2.getHeight() - 350,
              width: 300,
              height: 300
            });
            _context.next = 44;
            return pdfDoc.save();

          case 44:
            pdfBytes = _context.sent;
            return _context.abrupt("return", new Blob([pdfBytes], {
              type: 'application/pdf'
            }));

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generatePdf.apply(this, arguments);
}

function getIdealFontSize(font, text, maxWidth, minSize, defaultSize) {
  var currentSize = defaultSize;
  var textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize) {
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return textWidth > maxWidth ? null : currentSize;
}