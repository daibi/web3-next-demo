const { createCanvas, loadImage } = require('canvas')
const {
  approval,
  getMetaData,
} = require('../service/contract/NFTContractService')
const {
  trigramGeneScience,
  colorGeneScience,
} = require('../service/gene/GeneService')

const {trigramNameConfig, 
  zodiacNameConfig, 
  trigramToastConfig,
  indexSequenceToTrigramSign} = require('../service/common/config.js')

const { upload } = require('./IpfsService')
const fs = require('fs')
const path = require('path')

const {
  fill111,
  fill110,
  fill010,
  fill100,
  fill000,
  fill001,
  fill101,
  fill011,
} = require('./CanvasService')

/**
 * determine each <trigram sign>'s start position
 */
const eightTrigramSignPosition = {
  '111': 0,
  '110': 3,
  '101': 6,
  '011': 9,
  '100': 12,
  '010': 15,
  '001': 18,
  '000': 21,
}

const eightTrigramColorPosition = {
  '111': 0,
  '110': 1,
  '101': 2,
  '011': 3,
  '100': 4,
  '010': 5,
  '001': 6,
  '000': 7,
}

const colorPalette = [
  'FEAFDC',
  'C5C6FE',
  'FED0B6',
  'FAE97A',
  '83FFC0',
  '80B1FE',
]

/**
 * mint a new NFT, with random gene series
 */
export const generateImage = async (randomNumber) => {
  // TODO: js random number implementation to get color and eight trigram metadata，change implementation to chainlink event listen

  // init two series of genes:
  let upperTrigramSigns = '222222222222222222222222'
  let lowerTrigramSigns = '222222222222222222222222'

  // generate trigram representation(e.g: 010111)
  const trigramSign = generateTrigramSign(randomNumber)

  // find the position that needs to be changed
  const position = eightTrigramSignPosition[trigramSign.substring(0, 3)]

  // change upper sign and lower sign:
  upperTrigramSigns =
    upperTrigramSigns.substring(0, position) +
    trigramSign.substring(0, 3) +
    upperTrigramSigns.substring(position + 3, upperTrigramSigns.length)

  lowerTrigramSigns =
    lowerTrigramSigns.substring(0, position) +
    trigramSign.substring(3, 6) +
    lowerTrigramSigns.substring(position + 3, lowerTrigramSigns.length)

  // generate color
  const { colorGeneFrom, colorGeneTo } = generateColor(
    randomNumber,
    eightTrigramColorPosition[trigramSign.substring(0, 3)],
  )

  const zodiacName = resolveZodiac(trigramSign.substring(3, 6), randomNumber)

  // draw image
  const fileName = await drawImage(
    randomNumber,
    upperTrigramSigns,
    lowerTrigramSigns,
    colorGeneFrom,
    colorGeneTo,
    zodiacName,
  )

  // upload image file
  const ipfsHash = await upload(fileName, {
    upperTrigramSigns,
    lowerTrigramSigns,
    colorGeneFrom,
    colorGeneTo,
    zodiacName,
  })

  console.log(
    'mint result -> upperTrigramSigns: ',
    upperTrigramSigns,
    'lowerTrigramSigns: ',
    lowerTrigramSigns,
    'colorGeneFrom: ',
    colorGeneFrom,
    'colorGeneTo: ',
    colorGeneTo,
    'zodiacName: ',
    zodiacName,
  )

  return {
    upperTrigramSigns,
    lowerTrigramSigns,
    colorGeneFrom,
    colorGeneTo,
    zodiacName,
    imageUrl:
      'https://purple-solid-leopard-256.mypinata.cloud/ipfs/' + ipfsHash,
    showMessage: {
        // lighted trigram name：
        lightedTrigram: trigramNameConfig[trigramSign.substring(0, 3)],
        // name of zodiac:
        zodiacText: zodiacNameConfig[zodiacName],
        // a toast based on current trigram
        toast: trigramToastConfig[trigramSign.substring(0, 3)]
      }
  }
}

/**
 * breed executation of two NFT
 *
 * @param {number} randomNumber     randomNumber used for gene combination
 * @param {string} fatherTokenId    father token id
 * @param {string} motherTokenId    mother token id
 * @param {string} address          address of request user's wallet
 */
export const breedExe = async (
  randomNumber,
  fatherTokenId,
  motherTokenId,
  address,
) => {
  // query contract to verify address has operation right two both tokens
  if (!approval(address, fatherTokenId) || !approval(address, motherTokenId)) {
    throw "this address isn't qualified for breeding! Please check ownership or approval"
  }
  const fatherMetadata = await getMetaData(fatherTokenId)
  const motherMetadata = await getMetaData(motherTokenId)

  if (!fatherMetadata || !motherMetadata) {
    throw 'invalid metadata'
  }
  
  if (motherMetadata.upperTrigramGene == fatherMetadata.upperTrigramGene) {
    throw "seems that you are making the same trigram breeding, abort"
  }

  const { resultUpper, resultLower, inheritRecorder } = trigramGeneScience(
    motherMetadata.upperTrigramGene,
    motherMetadata.lowerTrigramGene,
    fatherMetadata.upperTrigramGene,
    fatherMetadata.lowerTrigramGene,
    randomNumber,
  )

  const { resultColorFrom, resultColorTo } = colorGeneScience(
    randomNumber,
    resultUpper,
    motherMetadata.colorFrom,
    motherMetadata.colorTo,
    fatherMetadata.colorFrom,
    fatherMetadata.colorTo,
  )

  const fileName = await drawImage(
    randomNumber,
    resultUpper,
    resultLower,
    resultColorFrom,
    resultColorTo,
    motherMetadata.zodiacName,
  )

  // upload image file
  const ipfsHash = await upload(fileName, {
    resultUpper,
    resultLower,
    resultColorFrom,
    resultColorTo,
    zodiacName: motherMetadata.zodiacName,
  })

  console.log(
    'breed result -> resultUpper: ',
    resultUpper,
    'resultLower: ',
    resultLower,
    'resultColorFrom: ',
    resultColorFrom,
    'resultColorTo: ',
    resultColorTo,
    'zodiacName: ',
    motherMetadata.zodiacName,
  )

  return {
    resultUpper,
    resultLower,
    resultColorFrom,
    resultColorTo,
    zodiacName: motherMetadata.zodiacName,
    imageUrl:
      'https://purple-solid-leopard-256.mypinata.cloud/ipfs/' + ipfsHash,
    // print newly inherited trigrams:
    showMessage: {
      inheritedTrigram: inheritRecorder
        .map((num, index) => num == 1 ? trigramNameConfig[indexSequenceToTrigramSign[index]] + '(' + indexSequenceToTrigramSign[index] + ')' : null)
        .filter(num => num != null)
        .join(', '),
      zodiacText: zodiacNameConfig[motherMetadata.zodiacName],
      toast: trigramToastConfig[inheritRecorder
        .map((num, index) => num == 1 ? trigramNameConfig[indexSequenceToTrigramSign[index]] + '(' + indexSequenceToTrigramSign[index] + ')' : null)
        .filter(num => num != null)[0]]
    }
  }
}

/**
 * generate trigram by random number
 *
 * @param {number} randomNumber
 */
const generateTrigramSign = (randomNumber) => {
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += (randomNumber & (0x1 << i)) >> i
    console.log(
      'randomNumber: ',
      randomNumber,
      'binary: ',
      randomNumber.toString(2),
      'current i: ',
      i,
      'representation: ',
      result,
    )
  }
  return result
}
/**
 * generate hex code color representation
 *
 * @param {number} randomNumber
 */
const generateColor = (randomNumber, position) => {
  // init color gene
  let colorGeneFrom = 'NNNNNNNN'
  let colorGeneTo = 'NNNNNNNN'

  // find the right position
  const rightPosition = findRightPosition(colorGeneFrom, position)

  // use color palette
  const colorGeneGeneratedFrom = colorPalette[randomNumber % 6]
  console.log(
    'shift 3: ',
    Math.abs(randomNumber >> 3),
    ' module by 6: ',
    Math.abs(randomNumber >> 3) % 6,
  )
  let colorGeneGeneratedTo = colorPalette[Math.abs(randomNumber >> 3) % 6]

  console.log('from: ', colorGeneGeneratedFrom, 'to: ', colorGeneGeneratedTo)
  if (colorGeneGeneratedFrom === colorGeneGeneratedTo) {
    colorGeneGeneratedTo = colorPalette[((randomNumber % 6) + 3) % 6]
  }

  return {
    colorGeneFrom: ''.concat(
      colorGeneFrom.substring(0, rightPosition),
      colorGeneGeneratedFrom,
      colorGeneFrom.substring(rightPosition + 1, colorGeneFrom.length),
    ),
    colorGeneTo: ''.concat(
      colorGeneTo.substring(0, rightPosition),
      colorGeneGeneratedTo,
      colorGeneTo.substring(rightPosition + 1, colorGeneFrom.length),
    ),
  }
}

const findRightPosition = (colorGene, position) => {
  var recorder = 0
  for (var i = 0; i < colorGene.length; i++) {
    if (recorder === position) {
      return i
    }
    if (colorGene[i] === 'N') {
      recorder += 1
      continue
    }
    i += 5
    recorder += 1
  }
  return colorGene.length - 1
}

const drawImage = async (
  randomNumber,
  upperTrigramSigns,
  lowerTrigramSigns,
  colorGeneFrom,
  colorGeneTo,
  zodiacName,
) => {
  // create a new canvas
  const width = 320
  const height = 320
  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  // draw base image
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, width, height)

  // fill trigram's color
  for (let i = 0; i < upperTrigramSigns.length / 3; i++) {
    let currentTrigramUpper = upperTrigramSigns.substring(3 * i, 3 * i + 3)
    let currentTrigramLower = lowerTrigramSigns.substring(3 * i, 3 * i + 3)
    if (!validTrigram(currentTrigramUpper)) {
      continue
    }
    const position = eightTrigramColorPosition[currentTrigramUpper]
    const rightPosition = findRightPosition(colorGeneFrom, position)
    console.log('rightPosition: ', rightPosition)
    console.log(
      'current trigram upper: ',
      currentTrigramUpper,
      'current trigram lower: ',
      currentTrigramLower,
      'colorFrom original',
      colorGeneFrom,
      'colorFrom: ',
      colorGeneFrom.substring(rightPosition, rightPosition + 6),
      'colorTo: ',
      colorGeneTo.substring(rightPosition, rightPosition + 6),
    )
    drawExecute(
      currentTrigramUpper,
      currentTrigramLower,
      colorGeneFrom.substring(rightPosition, rightPosition + 6),
      colorGeneTo.substring(rightPosition, rightPosition + 6),
      context,
      width,
      height,
    )
  }

  // load base eight-trigram image
  const baseImagePath = path.resolve('.', 'image/trigram.png')
  await loadImage(baseImagePath).then((image) => {
    context.drawImage(image, 0, 0, width, height)
  })

  // determine zodiac
  console.log('zodiacName: ', zodiacName)
  const zodiacPath = path.resolve('./image/zodiac', zodiacName + '.png')
  await loadImage(zodiacPath).then((image) => {
    context.drawImage(image, width / 2 - 64, height / 2 - 64, 128, 128)
  })

  const buffer = canvas.toBuffer('image/png')

  const fileName = 'image/gene0Result_' + randomNumber + '.png'
  fs.writeFileSync(path.resolve('.', fileName), buffer)

  return fileName
}

const validTrigram = (trigram) => {
  return trigram.indexOf('2') < 0
}

const drawExecute = (
  currentTrigramUpper,
  currentTrigramLower,
  colorFrom,
  colorTo,
  context,
  width,
  height,
) => {
  console.log(
    'draw execute, trigram:',
    currentTrigramUpper,
    'colorFrom:',
    colorFrom,
    'colorTo:',
    colorTo,
  )
  switch (currentTrigramUpper) {
    case '111':
      fill111(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    case '110':
      fill110(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    case '101':
      fill101(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    case '011':
      fill011(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    case '100':
      fill100(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    case '010':
      fill010(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    case '001':
      fill001(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    case '000':
      fill000(context, width, height, currentTrigramLower, colorFrom, colorTo)
      break
    default:
      break
  }
}

const resolveZodiac = (trigram, randomNumber) => {
  console.log(
    'resolveZodiac, trigram: ',
    trigram,
    'randomNumber: ',
    randomNumber,
  )
  switch (trigram) {
    case '001':
      return ['tiger', 'bull'][randomNumber % 2]
    case '100':
      return 'rabbit'
    case '011':
      return ['dragon', 'snake'][randomNumber % 2]
    case '101':
      return 'horse'
    case '000':
      return ['monkey', 'sheep'][randomNumber % 2]
    case '110':
      return 'chicken'
    case '111':
      return ['dog', 'pig'][randomNumber % 2]
    case '010':
      return 'mouse'
    default:
      return 'tiger'
  }
}
