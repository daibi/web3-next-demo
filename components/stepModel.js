/*
 * @Author: 碧戈 bige.zby@alibaba-inc.com
 * @Date: 2022-11-06 14:04:16
 * @LastEditors: 碧戈 bige.zby@alibaba-inc.com
 * @LastEditTime: 2022-11-07 17:19:16
 * @FilePath: /web3-next-demo/components/stepModel.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Steps, Descriptions } from 'antd';

import styles from '../styles/step.module.css';

const stepItems = [
  {
    title: 'Wallet Connected',
    status: 'finish',
    icon: <UserOutlined />,
  },
  {
    title: 'Mint Approval',
    status: 'process',
    icon: <LoadingOutlined />,
  },
  {
    title: 'Confirmation Received',
    status: 'wait',
    icon: <SmileOutlined />,
  }
]

function StepModal (props) {
  const { showModal, setShowModal, modalData } = props;
  const [ items, setItems ] = useState(stepItems.filter((item, index)=>({
    ...item,
    ...modalData[index]
  })))
  const [ message, setMessage ] = useState(props.modalData.message)
  
  useEffect(()=>{
    console.log("modalData is change!",modalData );
    setItems(stepItems.map((item, index)=>({
      ...item,
      ...modalData.items[index]
    })))

    setMessage(modalData.message)
  }, [modalData])

  const handleOk = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal width={800} title="Mint Modal" open={showModal} onOk={handleOk} onCancel={handleCancel}>
        <Steps labelPlacement="vertical"
          items={items}
        />
        <div className={styles.content}>
          {
            !modalData.items.length && <div className={styles.approvalContent}>
              <div className={styles.approvalTitle}>Trigram NFT generating!</div>
              <div className={styles.approvalContent}>Please confirm the transaction.</div>
            </div>
          }
          {modalData.items.length ? <div className={styles.descriptions}><Descriptions
            bordered
            title="Mint Result"
            size={"small"}
          >
            <Descriptions.Item label="卦象">{message.lightedTrigram}</Descriptions.Item>
            <Descriptions.Item label="属相">{message.zodiacText}</Descriptions.Item>
            <Descriptions.Item label="时间">{message.time}</Descriptions.Item>
            <Descriptions.Item label="含义">
              {modalData.message.toast}
            </Descriptions.Item>
          </Descriptions></div> : null}
        </div>
      </Modal>
    </>
  )
}

export default StepModal