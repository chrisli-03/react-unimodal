import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useUniModal } from 'react-unimodal';
import TestPage from './page/TestPage';
import './App.css';
import 'react-unimodal/dist/style.css';

const header = <div>component header</div>;
function App() {
  const Modal = useUniModal({ header: 'header', footer: 'footer' });
  const Modal2 = useUniModal({ id: 'modal2', header });

  return (
    <Router>
      <div className="App">
        <Modal />
        <Modal2 closeOnOutsideClick />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
