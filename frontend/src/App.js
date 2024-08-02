
import { Route, Router, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/Signup';
import HomePage from './components/Home';

function App() {
  return (
    // <HomePage/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
