/*
 * @Author: 碧戈 bige.zby@alibaba-inc.com
 * @Date: 2022-10-10 18:46:53
 * @LastEditors: 碧戈 bige.zby@alibaba-inc.com
 * @LastEditTime: 2022-10-23 20:54:21
 * @FilePath: /web3-next-demo/pages/list.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Card, Button, Checkbox } from 'antd';
import Image from 'next/image'
const { Meta } = Card;

import styles from '../styles/List.module.css'

function List(props){
  const { handleCheck, handleBreed } = props;
  
  const onChange = (check)=>{
    console.log('onChange: ', check)
    
    handleCheck(check);
  }
  return <Checkbox.Group onChange={onChange}>
      <div className={styles.wrap}>
    {/* <div className={styles.selectWrap}>
      <Button className={styles.button}  type="primary" onClick={()=>{}}>breed</Button>
    </div> */}
    {
      props.ntfList.map((nft, index)=>(
        <Card
          key={index}
          hoverable
          style={{ width: 260 }}
          cover={<img alt="example" src={nft.tokenUri} />}
          className={styles.item}
        >
          <Meta title={`EightTrigram-# ${nft.tokenId}`} description={`This is a ${nft.zodiacName}`} />
          { props.showSelect && <Checkbox value={nft.tokenId} /> }
        </Card>
        ))
    }
    {/* <div className={styles.bgImg}></div> */}
    
    </div>
  </Checkbox.Group>
}

export default List