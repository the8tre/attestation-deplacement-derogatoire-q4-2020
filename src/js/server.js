import { generatePdf } from './pdf-util.js'
import { readFileSync } from 'fs'

const PORT = process.env.PORT || 5000

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Blob = require('cross-blob')

const basePdfBuffer = readFileSync('./src/certificate.pdf').buffer

const arrayBuffer = function () {
  return new Promise((resolve, reject) => {
    resolve(basePdfBuffer)
  })
}

const fakeFetch = function () {
  return new Promise((resolve, reject) => {
    resolve({ arrayBuffer: arrayBuffer })
  })
}

if (!globalThis.fetch) {
  globalThis.fetch = fakeFetch
}
if (!globalThis.Blob) {
  globalThis.Blob = Blob
}

async function run (profile, reasons) {
  const blob = await generatePdf(profile, reasons, null)
  const buffer = await blob.arrayBuffer()
  return Buffer.from(buffer)
}

const validateInput = function (input) {
  if (!input || !input.profile || !input.reasons) {
    return false
  }
  const valid = typeof input.profile.firstname === 'string' &
    typeof input.profile.lastname === 'string' &
    typeof input.profile.birthday === 'string' &
    typeof input.profile.placeofbirth === 'string' &
    typeof input.profile.address === 'string' &
    typeof input.profile.zipcode === 'string' &
    typeof input.profile.city === 'string' &
    typeof input.profile.datesortie === 'string' &
    typeof input.profile.heuresortie === 'string' &
    typeof input.reasons === 'string'
  return valid
}

app.use(bodyParser.json())
app.post('/', function (req, res) {
  console.log(JSON.stringify(req.body))
  const body = req.body
  if (!validateInput(body)) {
    res.sendStatus(400)
    return
  }

  run(body.profile, body.reasons)
    .then(buffer => {
      res.setHeader('Content-Length', buffer.length)
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename=attestation.pdf')
      res.end(buffer)
    })
    .catch(error => {
      console.log(error)
      res.sendStatus(500)
    })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
