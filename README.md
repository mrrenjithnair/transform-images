 # transform-images

Super simple function utility that resizes an image and normalizes it's channels using [Jimp](https://github.com/oliver-moran/jimp) package

___

[![Maintainability](https://api.codeclimate.com/v1/badges/9283288d3bf8378fbe66/maintainability)](https://codeclimate.com/github/manelgarcia/transform-images/maintainability) [![Build Status](https://travis-ci.org/manelgarcia/transform-images.svg?branch=master)](https://travis-ci.org/manelgarcia/transform-images) [![Coverage Status](https://coveralls.io/repos/github/manelgarcia/transform-images/badge.svg?branch=master)](https://coveralls.io/github/manelgarcia/transform-images?branch=master) [![dependencies Status](https://david-dm.org/manelgarcia/transform-images/status.svg)](https://david-dm.org/manelgarcia/transform-images) [![devDependencies Status](https://david-dm.org/manelgarcia/transform-images/dev-status.svg)](https://david-dm.org/manelgarcia/transform-images?type=dev)

___

## Installation

```javascript
npm i transform-images
yarn add transform-images
```

```javascript
const transform = require('transform-images')
```

## Usage

```javascript
const source = 'https://images.unsplash.com/photo-1537557132238-b136d7e758ac'

const options = {
  width: 300,
  height: 180,
  output: 'image',
  outputFilename: './output.png',
  normalized: true,
  blur: true,
  blurRadius: 5,
  quality: 100
}

transform(source, options)
  .then(image => console.log('Done!'))
  .catch(error => console.error(error))
```

**Return**: `Promise` Either valid with an JIMP image object or a buffer, or rejected with an error

**Source**: `string` Either a valid URL or a path

**Options**: `Object` An object with desired options


Property | Type | Mandatory | Default | Description
--- | --- | --- | --- | ---
**width** | number | yes | - | Width of resized image
**height** | number | yes | - | Height of resized image
**normalize** | boolean | no | `true` | Apply normalization in brightness & contrast
**output** | string | no | `image` | Output type, `image` or `buffer`
**outputFilename** | string | yes | - | Output filename when output is image
**blur** | boolean | no | false | Set to true if want to blur the image
**blurRadius** | number | no | 5 | Spread radius of the blur
**quality** | number | no | 100 | Quality of the JPG


