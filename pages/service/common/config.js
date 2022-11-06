export const INIT_TRIGRAM_GENE = '222222222222222222222222'
export const NOT_INITED_TRIGRAM_SIGN = '222'

/**
 * determine each <trigram sign>'s start position
 */
export const eightTrigramSignPosition = {
  '111': 0,
  '110': 3,
  '101': 6,
  '011': 9,
  '100': 12,
  '010': 15,
  '001': 18,
  '000': 21,
}

export const indexSequenceToTrigramSign = {
  0: '111',
  1: '110',
  2: '101',
  3: '011',
  4: '110',
  5: '010',
  6: '001',
  7: '000',
}

export const eightTrigramColorPosition = {
  '111': 0,
  '110': 1,
  '101': 2,
  '011': 3,
  '100': 4,
  '010': 5,
  '001': 6,
  '000': 7,
}

export const colorPalette = [
  'FEAFDC',
  'C5C6FE',
  'FED0B6',
  'FAE97A',
  '83FFC0',
  '80B1FE',
]
