/*
 * @Author: 碧戈 bige.zby@alibaba-inc.com
 * @Date: 2022-10-16 19:25:18
 * @LastEditors: 碧戈 bige.zby@alibaba-inc.com
 * @LastEditTime: 2022-10-16 19:40:53
 * @FilePath: /web3-next-demo/pages/content.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Card } from 'antd';
import Image from 'next/image'
const { Meta } = Card;

import styles from '../styles/Content.module.css'

function Content(props){
  return <div className={styles.wrap}>
    <div></div>
    <div className={styles.bgImg}></div>
  </div>
}

export default Content