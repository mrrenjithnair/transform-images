const Jimp = require('jimp')

const transform = (source, {
  width,
  height,
  outputFilename,
  normalize = true,
  blur = false,
  blurRadius = 5,
  output = 'image',
  quality = 100
}) =>
  new Promise((resolve, reject) => {
    if (!source || source === '') {
      return reject(new Error('Either URL or pathname is mandatory'))
    }

    if (!width || !height) {
      return reject(new Error('Width & height are mandatory'))
    }

    if (output === 'image' && !outputFilename) {
      return reject(new Error('If output type is image, outputFilename must be provided.'))
    }

    return Jimp.read(source, async (err, image) => {
      if (err) {
        return reject(err)
      }

      const resizedImage = image.cover(width, height)
      const normalizedImage = normalize ? resizedImage.normalize() : resizedImage
      const blurredImage = blur ? normalizedImage.blur(Number(blurRadius)) : normalizedImage
      const qualityImage = await blurredImage.quality(quality)

      if (output === 'buffer') {
        return qualityImage.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          if (err) {
            return reject(err)
          }

          return resolve(buffer)
        })
      }

      qualityImage.write(outputFilename)

      return resolve(qualityImage)
    })
  })

module.exports = transform
