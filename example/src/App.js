import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useUniModal, hideModal, UniModalButton } from 'react-unimodal';
import TestPage from './page/TestPage';
import './App.css';
import 'react-unimodal/dist/style.css';

const modalRoot = document.getElementById('modal-root');
const header = <div>component header</div>;
function App() {
  const Modal = useUniModal({
    header: 'Header',
    body: 'Some contents...',
    footer: (
      <>
        <UniModalButton onClick={() => hideModal()}>Close</UniModalButton>
        <UniModalButton type="primary" onClick={() => hideModal()}>Ok</UniModalButton>
      </>
    )
  });
  const Modal2 = useUniModal({ id: 'modal2', header });
  const ModalWithPortal = useUniModal({ id: 'modal-portal', body: 'modal with portal' }, modalRoot);
  const ModalAutoClose = useUniModal({ id: 'modal-autoclose', body: 'modal autoclose' });

  return (
    <Router>
      <Modal noMask />
      <Modal2 closeOnOutsideClick />
      <ModalWithPortal width={1000} />
      <ModalAutoClose autoClose={2} />
      <div className="App">
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
