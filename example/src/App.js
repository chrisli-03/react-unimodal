import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useUniModal, hideModal } from 'react-unimodal';
import TestPage from './page/TestPage';
import './App.css';
import 'react-unimodal/dist/style.css';

const modalRoot = document.getElementById('modal-root');
const header = <div>component header</div>;
function App() {
  const Modal = useUniModal({
    header: 'header',
    footer: <button type="button" onClick={() => hideModal()}>close</button>
  });
  const Modal2 = useUniModal({ id: 'modal2', header });
  const ModalWithPortal = useUniModal({ id: 'modal-portal', body: 'modal with portal' }, modalRoot);

  return (
    <Router>
      <Modal />
      <Modal2 closeOnOutsideClick />
      <ModalWithPortal />
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
