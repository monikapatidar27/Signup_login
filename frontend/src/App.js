
import { Route, Router, Routes} from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import SignUp from './components/Signup';
import HomePage from './components/Home';
import Test from './components/test'
function App() {
  return (
    // <h1 class='text-3xl font-bold underline text-teal-600'>Welcome</h1>
    <Test/>
    // <HomePage/>
    // <Routes>
    //   <Route path="/" element={<HomePage />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/signup" element={<SignUp />} />
    // </Routes>
  );
}

export default App;
