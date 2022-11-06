const { breedExe } = require('../../service/NFTOperationService')

/**
 * breed a new NFT
 */
export default async (req, res) => {
  try {
    if (req.method == 'POST') {
      const { fatherTokenId, motherTokenId, randomNumber, address } = req.body
      console.log(
        'req body randomNumber:',
        randomNumber,
        'fatherTokenId:',
        fatherTokenId,
        'motherTokenId:',
        motherTokenId,
        'address:',
        address,
      )
      let result = await breedExe(
        randomNumber,
        fatherTokenId,
        motherTokenId,
        address,
      )
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
