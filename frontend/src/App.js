import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './main';
import Dash from './routes/dashboard';
import Privacy from './routes/privacy';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Main />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="/dashboard" element={<Dash />} />
      </Routes>
    </Router>
  );
}

export default App;
