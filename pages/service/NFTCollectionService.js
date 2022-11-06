const {
  balanceOf,
  queryByIndex,
} = require('../service/contract/NFTContractService')

/**
 * query NFT collection by address
 *
 * @param {string} address - wallet address
 */
export const queryCollection = async (address) => {
  let balance = await balanceOf(address)
  console.log('balance of ', address, ': ', balance)

  let result = []
  if (balance === 0) {
    return result
  }

  for (let index = 0; index < balance; index++) {
    let nftElement = await queryByIndex(address, index)
    result.push(nftElement)
  }

  return result
}
