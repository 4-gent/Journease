import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Main />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
