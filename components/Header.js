/*
 * @Author: 碧戈 bige.zby@alibaba-inc.com
 * @Date: 2022-10-10 17:35:52
 * @LastEditors: 碧戈 bige.zby@alibaba-inc.com
 * @LastEditTime: 2022-11-06 11:36:05
 * @FilePath: /web3-next-demo/components/Header.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Layout, Result } from 'antd';
const { Header : AntdHeader, Footer, Sider, Content } = Layout;
import {
  RestOutlined,
  TrademarkOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import styles from '../styles/Header.module.css'

import { useEffect, useRef, useState } from 'react';

// import detectEthereumProvider from '@metamask/detect-provider';
// const provider = detectEthereumProvider();

function Header({handleMint, handleSelect, handleNftList, handleMetaMask, wallet}){
  

  useEffect(()=>{
    // 初始化关联钱包
    if(!wallet.current){
      handleMetaMask();
    }else{
      handleNftList()
    }
  }, [])

  return <AntdHeader className={styles.wrap}>
  <div className={styles.logo}>
    {/* <TrademarkOutlined /> */}
    <div className={styles.logoIcon}></div>
    <div className={styles.logoText}>This is DB's Web3 site</div>
  </div>
  <div className={styles.rightOp}>
    <Button className={styles.button}  type="primary" onClick={handleMint}>mint</Button>
    <Button className={styles.button}  type="primary" onClick={handleSelect}>select</Button>
    <Button className={styles.button} type="primary" onClick={handleMetaMask}>connect to wallet</Button>
  </div>
</AntdHeader>
}

export default Header;
