/*
 * @Author: 碧戈 bige.zby@alibaba-inc.com
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: 碧戈 bige.zby@alibaba-inc.com
 * @LastEditTime: 2022-11-06 14:33:29
 * @FilePath: /web3-next-demo/pages/_app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import '../styles/globals.css'
import { useEffect, useRef, useState } from 'react';

import { Layout, Button, message } from 'antd';
import "antd/dist/antd.css";
import Header from '../components/Header';
import StepModal from '../components/stepModel';

import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import eightTrgramCore from './EightTrgramCore.json'
const contract_abi = eightTrgramCore.abi;
const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

console.log(">>>>>>>>>>>> contract_address ", contract_address);

const { Footer, Sider, Content } = Layout;

function MyApp({ Component, pageProps }) {
  const provider = useRef(1);
  const wallet = useRef(null);

  const [ntfList, setNftList] = useState([])
  const [web3, setWeb3] = useState(null)
  const [ contract, setContract ] = useState(null);
  const [ accounts, setAccounts ] = useState(null);
  const [ showSelect, setShowSelect ] = useState(false);
  const [ selectTokenId, setSelectTokenId ] = useState([]);
  const [ showModal, setShowModal ] = useState(false)

  useEffect(()=>{
    if(!web3){
      loadWeb3();
    }
  }, [])

  useEffect(()=>{
    console.log('>>>>><<<<<<<<', ntfList);
  }, ['ntfList'])

  const loadWeb3 = async ()=>{
    if(typeof window.ethereum!=='undefined'){
      web3 = new Web3(window.ethereum)
      setWeb3(new Web3(window.ethereum))

      setContract(new web3.eth.Contract(contract_abi, contract_address));
      setAccounts(await web3.eth.getAccounts())
    }
  }

  const handleMint = async () => {
    setShowModal(true)
    
    // message.loading({ content: 'Loading...', key: "loading" });
    
    const response = await generateGene();

    console.log("*********: ", response);
    
    _handleMint(response.imageUrl, response.upperTrigramSigns, response.lowerTrigramSigns, response.colorGeneFrom, response.colorGeneTo, response.zodiacName)
  }

  const generateGene = async () => {
    const response = await fetch("/api/nftIndex/generateGene", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'randomNumber': Math.trunc(Math.random() * 1e16)})
    })

    return response.json()
  }
  
  const handleMetaMask = async () => {
    if(provider.current === 1){
      provider.current = await detectEthereumProvider();
    }
    if(provider.current){
      // 连接钱包
      wallet.current = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('用户钱包地址', wallet)

      const nftList = await getNftList()

      setNftList(nftList.collection)
      console.log('>>>>>>>>', nftList)
      
    }else{
      alert('Please install MetaMask!')
    }
  };

  // 选择or取消 nft
  const handleCheck = (selectList) =>{
    console.log('handleCheck', selectList)
    setSelectTokenId(selectList);
  }

  const handleChangeSelect = () => {
    setShowSelect(!showSelect);
  }

  const handleBreed = async () => {
    const result = await fetch("/api/nftIndex/breed", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
            'randomNumber': Math.trunc(Math.random() * 1e16),
            'fatherTokenId': selectTokenId[0],
            'motherTokenId': selectTokenId[1],
            'address': accounts[0]
        })
    })

    const nftRes = await result.json();

    _handleMintN( selectTokenId[0], selectTokenId[1], nftRes.imageUrl, nftRes.resultUpper, nftRes.resultLower, nftRes.resultColorFrom, nftRes.resultColorTo, nftRes.zodiacName )
  }

  // 获取NFT列表
  const getNftList = async () => {
    if(!wallet.current){
      handleMetaMask();
    }
    const response = await fetch(`/api/nftIndex/${wallet.current}`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    console.log('getNftList', response);
    return response.json();
  }

  // mint方法
  const _handleMint = (imageUrl, upperTrigramSigns, lowerTrigramSigns, colorGeneFrom, colorGeneTo, zodiacName) => {
    contract.methods.mintGene0(imageUrl, upperTrigramSigns, lowerTrigramSigns, colorGeneFrom, colorGeneTo, zodiacName)
      .send({from: accounts[0]})
        .on('transactionHash', (hash) => {
          contract.events.Transfer({}, async (error, event) => {
            console.log("~~~~~~~~~~event: ", event)
            // message.success({ content: 'Mint Success!', key:"loading", duration: 2 });
            const nftList = await getNftList()
            setNftList(nftList.collection)
          })
        })
  }

  // mint方法
  const _handleMintN = (fId, mId, imageUrl, upperTrigramSigns, lowerTrigramSigns, colorGeneFrom, colorGeneTo, zodiacName) => {
    contract.methods.mintGeneN(fId, mId, imageUrl, upperTrigramSigns, lowerTrigramSigns, colorGeneFrom, colorGeneTo, zodiacName)
      .send({from: accounts[0]})
        .on('transactionHash', (hash) => {
          contract.events.Transfer({}, async (error, event) => {
            console.log("~~~~~~~~~~event: ", event)            
            const nftList = await getNftList()
            setNftList(nftList.collection)
          })
        })
  }

  return <Layout>
  <Header handleSelect={handleChangeSelect} handleMint={handleMint} handleMetaMask={handleMetaMask} getNftList={getNftList} wallet={wallet} />
  <Layout>
    {/* <Sider>Sider</Sider> */}
    <Content><Component {...pageProps} ntfList={ntfList} showSelect={showSelect} handleCheck={handleCheck} handleBreed={handleBreed} /></Content>
  </Layout>
  <Footer>
    { (ntfList || []).length>2 ? <Button type="primary" onClick={handleBreed}>breed</Button> : null }
  </Footer>
  <StepModal showModal={showModal} setShowModal={setShowModal}></StepModal>
</Layout>
}

export default MyApp
