import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
   
  });

  const handleOnChange = (e) => {
    setInputVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    

    const data = {
     
      email: inputVal.email,
      password: inputVal.password,
     
    };

    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/login", data);
      console.log(res);
      if (res.status === 200) {
        console.log("successful login")
        navigate('/')
        setInputVal({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label>Email</label>
        <input type="email" name='email' value={inputVal.email} onChange={handleOnChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name='password' value={inputVal.password} onChange={handleOnChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
