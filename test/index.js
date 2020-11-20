/* global describe, it */
const chai = require('chai')
const path = require('path')
const fs = require('fs')
const transform = require('../transform')

chai.use(require('chai-fs'))
chai.use(require('chai-as-promised'))

const { expect } = chai
const imageUrl = 'https://images.unsplash.com/photo-1537459957193-1ec46f598e7c'
const imagePath = path.join(__dirname, './test.jpg')
const imageIncorrect = path.join(__dirname, './incorrect.jgp')
const outputFilename = path.join(__dirname, './test-output.jpg')
const width = 300
const height = 180

describe('Transform Images', () => {
  it('Should fail, no source provided', async () =>
    expect(transform('', { width, height, outputFilename }))
      .to.eventually.be.rejectedWith('Either URL or pathname is mandatory')
  )

  it('Should fail, no width provided', async () =>
    expect(transform(imagePath, { height, outputFilename }))
      .to.eventually.be.rejectedWith('Width & height are mandatory')
  )

  it('Should fail, No height provided', async () =>
    expect(transform(imagePath, { width, outputFilename }))
      .to.eventually.be.rejectedWith('Width & height are mandatory')
  )

  it('Should fail, output type is image and no outputFilename provided', async () =>
    expect(transform(imagePath, { width, height }))
      .to.eventually.be.rejectedWith('If output type is image, outputFilename must be provided.')
  )

  it('Should fail, incorrect path source', async () =>
    expect(transform(imageIncorrect, { width, height, outputFilename }))
      .to.eventually.be.rejectedWith(`ENOENT: no such file or directory, open '${imageIncorrect}'`)
  )

  it('Should success, relative path image, output type image, normalized', async () => {
    await transform(imagePath, { width, height, outputFilename })
    return expect(outputFilename)
      .to.be.a.file().and.to.have.extname('.jpg')
  }).timeout(15000)

  it('Should success, URL image, output type image, NOT normalized', async () => {
    await transform(imageUrl, { width, height, outputFilename, normalized: false })
    return expect(outputFilename)
      .to.be.a.file().and.to.have.extname('.jpg')
  }).timeout(15000)

  it('Should success, relative path image, output type buffer', async () =>
    expect(transform(imagePath, { width, height, output: 'buffer' }))
      .to.eventually.be.instanceOf(Buffer)
  ).timeout(15000)

  it('Should success, input is a buffer, output an image', async () => {
    const buffer = Buffer.from(fs.readFileSync(imagePath, 'base64'), 'base64')
    const outputFilename = path.join(__dirname, './test-from-buffer.jpg')

    return transform(buffer, { width, height, outputFilename })
      .then(() => {
        return expect(outputFilename)
          .to.be.a.file().and.to.have.extname('.jpg')
      })
  }).timeout(15000)
})
