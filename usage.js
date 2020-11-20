const transform = require('../transform')
const path = require('path')
const fs = require('fs')
const url = 'http://as01.epimg.net/futbol/imagenes/2018/07/16/primera/1531757536_711668_1531757805_noticia_normal.jpg'

const buffer = Buffer.from(fs.readFileSync(path.join(__dirname, './test.jpg'), 'base64'), 'base64')
// console.log(buffer.toString().substring(0, 200))

transform(buffer, {
  width: 50,
  height: 30,
  quality: 100,
  blur: true,
  blurRadius: 2,
  outputFilename: './usage100b.jpg'
})
  .then(response => {
    console.log('response!', response)
  })
  .catch(error => {
    console.log('ERROR!', error)
  })
