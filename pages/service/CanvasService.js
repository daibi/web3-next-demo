const reversedGrdTrigrams = ['000', '001']

const addWhite = ['010', '100']

export const fill111 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo(width / (Math.sqrt(2) + 2) + 10, 0)
  context.lineTo(width / 2, height / 2 - 20)
  context.lineTo((width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) - 10, 0)
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(width / 2, height / 2 - 20, width / 2, 0)
    : context.createLinearGradient(width / 2, 0, width / 2, height / 2 - 20)
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

export const fill110 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo((width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + 5, 5)
  context.lineTo(width / 2 + 18, height / 2 - 18)
  context.lineTo(width - 5, height / (Math.sqrt(2) + 2) - 5)
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(
        width / 2 + 18,
        height / 2 - 18,
        ((width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + width) / 2,
        height / (Math.sqrt(2) + 2) / 2,
      )
    : context.createLinearGradient(
        ((width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + width) / 2,
        height / (Math.sqrt(2) + 2) / 2,
        width / 2 + 18,
        height / 2 - 18,
      )
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

export const fill010 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo(width, height / (Math.sqrt(2) + 2) + 10)
  context.lineTo(width / 2 + 20, height / 2)
  context.lineTo(width, (height / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) - 10)
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(
        width / 2 + 20,
        height / 2,
        width,
        height / 2,
      )
    : context.createLinearGradient(
        width,
        height / 2,
        width / 2 + 20,
        height / 2,
      )
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

export const fill100 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo(width, (height / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + 5)
  context.lineTo(width / 2 + 18, height / 2 + 18)
  context.lineTo(
    (width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + 5,
    height - 5,
  )
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(
        width / 2 + 18,
        height / 2 + 18,
        (width + (width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1)) / 2,
        ((height / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + height) / 2,
      )
    : context.createLinearGradient(
        (width + (width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1)) / 2,
        ((height / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + height) / 2,
        width / 2 + 18,
        height / 2 + 18,
      )
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

export const fill000 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo(width / (Math.sqrt(2) + 2) + 10, height)
  context.lineTo(width / 2, height / 2 + 20)
  context.lineTo((width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) - 10, height)
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(
        width / 2,
        height / 2 + 20,
        width / 2,
        height,
      )
    : context.createLinearGradient(
        width / 2,
        height,
        width / 2,
        height / 2 + 20,
      )
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

export const fill001 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo(
    width - ((width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) + 5),
    height - 5,
  )
  context.lineTo(width / 2 - 16, height / 2 + 16)
  context.lineTo(5, height - (height / (Math.sqrt(2) + 2) - 5))
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(
        width / 2 - 16,
        height / 2 + 16,
        (width - (width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1)) / 2,
        (2 * height - height / (Math.sqrt(2) + 2)) / 2,
      )
    : context.createLinearGradient(
        (width - (width / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1)) / 2,
        (2 * height - height / (Math.sqrt(2) + 2)) / 2,
        width / 2 - 16,
        height / 2 + 16,
      )
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

export const fill101 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo(0, height / (Math.sqrt(2) + 2) + 10)
  context.lineTo(width / 2 - 20, height / 2)
  context.lineTo(0, (height / (Math.sqrt(2) + 2)) * (Math.sqrt(2) + 1) - 10)
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(width / 2 - 20, height / 2, 0, height / 2)
    : context.createLinearGradient(0, height / 2, width / 2 - 20, height / 2)
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

export const fill011 = (
  context,
  width,
  height,
  currentTrigramLower,
  colorFrom,
  colorTo,
) => {
  context.beginPath()
  context.moveTo(width / (Math.sqrt(2) + 2) - 5, 5)
  context.lineTo(width / 2 - 16, height / 2 - 16)
  context.lineTo(5, height / (Math.sqrt(2) + 2) - 5)
  var grd = reversedGrd(currentTrigramLower)
    ? context.createLinearGradient(
        width / 2 - 16,
        height / 2 - 16,
        width / (Math.sqrt(2) + 2) / 2,
        height / (Math.sqrt(2) + 2) / 2,
      )
    : context.createLinearGradient(
        width / (Math.sqrt(2) + 2) / 2,
        height / (Math.sqrt(2) + 2) / 2,
        width / 2 - 16,
        height / 2 - 16,
      )
  grd.addColorStop(0, '#' + colorFrom)
  if (needAddWhite(currentTrigramLower)) {
    grd.addColorStop(reversedGrd(currentTrigramLower) ? 0.8 : 0.2, 'white')
  }
  grd.addColorStop(1, '#' + colorTo)

  console.log('grd res: ', grd)

  context.fillStyle = grd
  context.fill()
}

const reversedGrd = (currentTrigramLower) => {
  return reversedGrdTrigrams.indexOf(currentTrigramLower) >= 0
}

const needAddWhite = (currentTrigramLower) => {
  return addWhite.indexOf(currentTrigramLower) >= 0
}
