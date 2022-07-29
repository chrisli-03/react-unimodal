import React from 'react';
import { showModal, hideModal, updateModal } from 'react-unimodal';

const ModalType2 = () => (
  <div>
    <div>modal type 2</div>
    <button type="button" onClick={() => { updateModal({ body: 'modal type string' }); }}>modal type string</button>
  </div>
);

const ModalType1 = () => (
  <div>
    <div>modal type 1</div>
    <button type="button" onClick={() => { updateModal({ body: <ModalType2 /> }); }}>modal type 2</button>
  </div>
);

const ModalType3 = () => (
  <div>modal type 3</div>
);

function TestPage() {
  return (
    <div>
      <div>
        <button type="button" onClick={() => showModal()}>show modal 1</button>
        <button type="button" onClick={() => hideModal()}>hide modal 1</button>
        <button type="button" onClick={() => { updateModal({ body: <ModalType1 /> }); }}>modal type 1</button>
      </div>
      <div>
        <button type="button" onClick={() => showModal('modal2')}>show modal 2</button>
        <button type="button" onClick={() => hideModal('modal2')}>hide modal 2</button>
        <button type="button" onClick={() => { updateModal({ id: 'modal2', body: <ModalType3 /> }); }}>modal type 3</button>
        <button type="button" onClick={() => { updateModal({ id: 'modal2', body: 'modal type string' }); }}>modal type string</button>
      </div>
      <div>
        <button type="button" onClick={() => showModal('modal-portal')}>show modal with portal</button>
        <button type="button" onClick={() => hideModal('modal-portal')}>hide modal with portal</button>
      </div>
      <div>
        <button type="button" onClick={() => showModal('modal-autoclose')}>show modal with autoclose</button>
        <button type="button" onClick={() => hideModal('modal-autoclose')}>hide modal with autoclose</button>
      </div>
    </div>
  );
}

export default TestPage;
