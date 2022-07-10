import React from 'react'
import { showModal, hideModal, updateModal } from 'react-unimodal';

const modalType1 = () => {
  return (
    <div>
      <div>modal type 1</div>
      <button onClick={() => {updateModal({ body: modalType2 })}}>modal type 2</button>
    </div>
  )
}

const modalType2 = () => {
  return (
    <div>
      <div>modal type 2</div>
      <button onClick={() => {updateModal({ body: 'modal type string' })}}>modal type string</button>
    </div>
  )
}

const modalType3 = () => {
  return (
    <div>modal type 3</div>
  )
}


const TestPage = () => {
  return (
    <div>
      <div>
        <button onClick={() => showModal()}>show modal 1</button>
        <button onClick={() => hideModal()}>hide modal 1</button>
        <button onClick={() => {updateModal({ body: modalType1 })}}>modal type 1</button>
      </div>
      <div>
        <button onClick={() => showModal('modal2')}>show modal 2</button>
        <button onClick={() => hideModal('modal2')}>hide modal 2</button>
        <button onClick={() => {updateModal('modal2', { body: modalType3 })}}>modal type 3</button>
        <button onClick={() => {updateModal('modal2', { body: 'modal type string' })}}>modal type string</button>
      </div>
    </div>
  )
}

export default TestPage;
