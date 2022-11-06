const fs = require('fs')
const pinataSDK = require('@pinata/sdk')
const path = require('path')

const pinataApiKey = '851b44ee88e255f1043d'
const pinataApiSecret =
  '069041b73bf10e80a50bd27b6280bc9ca184425f68a23f12e9271f8cb6ee1f0e'

const pinata = pinataSDK(pinataApiKey, pinataApiSecret)

/**
 * upload to IPFS space
 * @param {string} fileName   target file name
 * @param {string} metaData   meta data associated with this file
 * @returns         IPFS hash
 */
export const upload = async (fileName, metaData) => {
  const readableStreamForFile = fs.createReadStream(path.resolve('.', fileName))
  const options = {
    pinataMetadata: {
      name: fileName,
      keyvalues: { ...metaData },
    },
  }
  const uploadResult = await pinata.pinFileToIPFS(
    readableStreamForFile,
    options,
  )
  return uploadResult.IpfsHash
}
