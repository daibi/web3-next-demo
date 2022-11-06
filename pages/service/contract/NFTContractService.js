/*
 * @Author: 碧戈 bige.zby@alibaba-inc.com
 * @Date: 2022-10-22 20:42:06
 * @LastEditors: 碧戈 bige.zby@alibaba-inc.com
 * @LastEditTime: 2022-11-06 10:07:28
 * @FilePath: /web3-next-demo/pages/service/contract/NFTContractService.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs')
const path = require('path')
const Web3 = require('web3')

// var provider = 'https://goerli.infura.io/v3/80a7fb6d4f1844a49f64b2a4f475fc6b'
// TODO: use local testnet
const providerUrl = process.env.BLOCKCHAIN_NET_ADDRESS
// var web3Provider = new Provider(privatekey, providerUrl)
var web3Provider = new Web3.providers.HttpProvider(providerUrl)
var web3 = new Web3(web3Provider)
// local contract address
const contractAdderss = process.env.CONTRACT_ADDRESS
const abiFilePath = path.resolve('.', 'EightTrgramCore.json')
var parsed = JSON.parse(fs.readFileSync(abiFilePath))

var eightTrigramNFTContract = new web3.eth.Contract(parsed.abi, contractAdderss)

/**
 * query num of NFT collection of given address
 * @param {string} address  address of current wallet
 * @returns                 num of NFT collection
 */
export const balanceOf = async (address) => {
  let balance = await eightTrigramNFTContract.methods.balanceOf(address).call()
  return balance
}

/**
 * query n-th NFT's metadata
 *
 * @param {string} address  address of current wallet
 * @param {number} index    index of queried NFT
 * @returns                 NFT metadata info
 */
export const queryByIndex = async (address, index) => {
  let nftElement = await eightTrigramNFTContract.methods
    .getOwnerCollectionByIndex(address, index)
    .call()
  console.log('nftElement: ', nftElement)
  return nftElement
}

/**
 * check if this address has approved to operate certain NFT
 *
 * @param {string} address  address of current wallet
 * @param {number} tokenId  certain NFT with given tokenId
 * @returns                 true - this address is approved to give operation of tokenId
 */
export const approval = async (address, tokenId) => {
  // TODO: implementation
  return await eightTrigramNFTContract.methods
    .isApprovedOrOwner(address, tokenId)
    .call()
    .then((result) => result)
    .catch(() => false)
}

/**
 * query NFT's metadata by tokenId
 *
 * @param {number} tokenId token's id
 * @returns token's metadata
 */
export const getMetaData = async (tokenId) => {
  return await eightTrigramNFTContract.methods.getByTokenId(tokenId).call()
}
