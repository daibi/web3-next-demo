const { generateImage } = require('../../service/NFTOperationService')

export default async (req, res) => {
  try {
    if (req.method == 'POST') {
      const { randomNumber } = req.body
      console.log('req body randomNumber: ', randomNumber)
      let result = await generateImage(randomNumber)
      console.log('result: ', result)
      res.status(200).json({ ...result })
      return
    }
    res.status(404).json({ message: 'not supported method' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
