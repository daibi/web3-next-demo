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

// Trigram name config
export const trigramNameConfig = {
  '111': '乾卦',
  '000': '坤卦',
  '011': '兑卦',
  '101': '离卦',
  '001': '震卦',
  '110': '巽卦',
  '010': '坎卦',
  '100': '艮卦'
}

// Trigram toast config
export const trigramToastConfig = {
  '111': '天行健，君子以自强不息',
  '000': '至哉坤元，万物资生',
  '011': '亨，利贞',
  '101': '利贞，亨；畜牝牛吉。',
  '001': '亨；震来虩虩，笑言哑哑；震惊百里，不丧匕鬯',
  '110': '初六，进退，利武人之贞。',
  '010': '坎有险，求小得',
  '100': '艮其趾，无咎，利永贞'
}

// zodiacName config
export const zodiacNameConfig = {
  'mouse': '鼠🐭',
  'bull': '牛🐂',
  'tiger': '虎🐯',
  'rabbit': '兔🐰',
  'dragon': '龙🐲',
  'snake': '蛇🐍',
  'horse': '马🐴',
  'sheep': '羊🐑',
  'monkey': '猴🐒',
  'chicken': '鸡🐔',
  'dog': '狗🐶',
  'pig': '猪🐷'
}
