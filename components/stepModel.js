/*
 * @Author: 碧戈 bige.zby@alibaba-inc.com
 * @Date: 2022-11-06 14:04:16
 * @LastEditors: 碧戈 bige.zby@alibaba-inc.com
 * @LastEditTime: 2022-11-06 14:48:44
 * @FilePath: /web3-next-demo/components/stepModel.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, Steps } from 'antd';

function StepModal (props) {
  const { showModal, setShowModal } = props;
  // const [show, setShow] = useState(false);

  const handleOpen = ()=>{
    setShowModal(true);
  }

  const handleOk = () => {
    setShowModal(false)
  }

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal title="Basic Modal" open={showModal} onOk={handleOk} onCancel={handleCancel}>
        <Steps
          items={[
            {
              title: 'Login',
              status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Verification',
              status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Pay',
              status: 'process',
              icon: <LoadingOutlined />,
            },
            {
              title: 'Done',
              status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />
      </Modal>
    </>
  )
}

export default StepModal