import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import TestPage from './page/TestPage'
import { useUniModal } from 'react-unimodal'
import './App.css';

function App() {
  const Modal = useUniModal({ header: 'header', footer: 'footer' });
  // const Modal2 = useUniModal('modal2', { header: () => <div>component header</div>});

  return (
    <Router>
      <div className="App">
        <Modal />
        {/*<Modal2 />*/}
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
