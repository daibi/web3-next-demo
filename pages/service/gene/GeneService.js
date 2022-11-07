const {
  indexSequenceToTrigramSign,
  NOT_INITED_TRIGRAM_SIGN,
  INIT_TRIGRAM_GENE,
  colorPalette,
} = require('../common/config')

export const trigramGeneScience = (
  motherUpperTrigramGene,
  motherLowerTrigramGene,
  fatherUpperTrigramGene,
  fatherLowerTrigramGene,
  randomNumber,
) => {
  // For Upper trigram signs: each digit of random number represents each trigram's breeding result
  // use mother's trigram sign as a "base", 50% chance for one of father's sign beeing inherited, 25% for a second sign to be inherited and so on...
  if (
    motherUpperTrigramGene.length != INIT_TRIGRAM_GENE.length ||
    motherUpperTrigramGene.length != fatherUpperTrigramGene.length
  ) {
    throw 'upper trigram gene combination failed'
  }
  if (
    motherLowerTrigramGene.length != INIT_TRIGRAM_GENE.length ||
    motherLowerTrigramGene.length != fatherLowerTrigramGene.length
  ) {
    throw 'lower trigram gene combination failed'
  }
  let resultUpper = motherUpperTrigramGene
  let resultLower = motherLowerTrigramGene

  let num = randomNumber

  let inheritRecorder = [0, 0, 0, 0, 0, 0, 0, 0]
  let inheritedNum = 0
  
  for (let i = 0; i < 8; i++) {
    let motherUpperTrigramSign = resultUpper.substring(3 * i, 3 * i + 3)
    let fatherUpperTrigramSign = fatherUpperTrigramGene.substring(
      3 * i,
      3 * i + 3,
    )
    let fatherLowerTrigramSign = fatherLowerTrigramGene.substring(
      3 * i,
      3 * i + 3,
    )

    let currentNum = num % 10
    num = num / 10

    let newLowerTrigramSign
    let newUpperTrigramSign
    if (needInherit(motherUpperTrigramSign, fatherUpperTrigramSign)) {
      // (50% / (2^n)) chance of being inherited
      if (currentNum < 10 / Math.pow(2, inheritedNum)) {
        console.log('trigramGeneScience father gene inherited at index: ', i)
        newLowerTrigramSign = fatherLowerTrigramSign
        newUpperTrigramSign = fatherUpperTrigramSign

        // record this position has been inherited by father gene
        inheritRecorder[i] = 1
        inheritedNum += 1

      }
    } 
    if (newLowerTrigramSign && newUpperTrigramSign) {
      resultUpper =
        resultUpper.substring(0, 3 * i) +
        newUpperTrigramSign +
        resultUpper.substring(3 * i + 3, resultUpper.length)
      resultLower =
        resultLower.substring(0, 3 * i) +
        newLowerTrigramSign +
        resultLower.substring(3 * i + 3, resultUpper.length)
    }
  }

  return { resultUpper, resultLower, inheritRecorder }
}

export const colorGeneScience = (
  randomNumber,
  resultTrigramUpper,
  motherColorFrom,
  motherColorTo,
  fatherColorFrom,
  fatherColorTo,
) => {
  let resultColorFrom = motherColorFrom
  let resultColorTo = motherColorTo
  for (let i = 0; i < 8; i++) {
    let currentUpperTrigramSign = resultTrigramUpper.substring(3 * i, 3 * i + 3)
    if (currentUpperTrigramSign === NOT_INITED_TRIGRAM_SIGN) {
      continue
    }
    let rightPosition = findRightPosition(resultColorFrom, i)

    let currentColorGene = motherColorFrom[rightPosition]
    console.log(
      'currentUpperTrigramSign: ',
      currentUpperTrigramSign,
      'current from color: ',
      resultColorFrom,
      ' right position: ',
      rightPosition,
      'motherColorFrom: ',
      motherColorFrom,
      'currentColorGene: ',
      currentColorGene,
    )
    if (needColor(currentUpperTrigramSign, currentColorGene)) {
      let fatherRightPosition = findRightPosition(fatherColorFrom, i)
      let currentColorFrom = fatherColorFrom.substring(
        fatherRightPosition,
        fatherRightPosition + 6,
      )
      let currentColorTo = fatherColorTo.substring(
        fatherRightPosition,
        fatherRightPosition + 6,
      )
      console.log(
        'fatherColorGene: ',
        fatherColorFrom,
        ' position: ',
        fatherRightPosition,
        ' currentColortFrom: ',
        currentColorFrom,
        ' currentColortTo: ',
        currentColorTo,
      )
      resultColorFrom = ''.concat(
        resultColorFrom.substring(0, rightPosition),
        currentColorFrom,
        resultColorFrom.substring(rightPosition + 1, resultColorFrom.length),
      )
      resultColorTo = ''.concat(
        resultColorTo.substring(0, rightPosition),
        currentColorTo,
        resultColorTo.substring(rightPosition + 1, resultColorTo.length),
      )
    }
  }
  return { resultColorFrom, resultColorTo }
}

const needInherit = (motherTrigramSign, fatherTrigramSign) => {
  return (
    motherTrigramSign === NOT_INITED_TRIGRAM_SIGN &&
    fatherTrigramSign != NOT_INITED_TRIGRAM_SIGN
  )
}

const mayMutate = (motherTrigramSign, fatherTrigramSign) => {
  return (
    motherTrigramSign === NOT_INITED_TRIGRAM_SIGN &&
    fatherTrigramSign === NOT_INITED_TRIGRAM_SIGN
  )
}

const generateLowerSign = (randomNumber) => {
  let result = ''
  for (let i = 0; i < 3; i++) {
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

const needColor = (currentUpperTrigramSign, currentColorGene) => {
  return (
    currentUpperTrigramSign != NOT_INITED_TRIGRAM_SIGN &&
    currentColorGene === 'N'
  )
}
