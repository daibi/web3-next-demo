const { queryCollection } = require('../../service/NFTCollectionService')

/**
 * NFT index - query current address's NFT collection
 *
 * method: GET
 *
 */
export default async (req, res) => {
  try {
    const { address } = req.query
    const collection = await queryCollection(address)
    return res.status(200).json({ collection })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
