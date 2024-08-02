import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    
  });

  const handleOnChange = (e) => {
    setInputVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (inputVal.password !== inputVal.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const data = {
      userName: inputVal.userName,
      firstName: inputVal.firstName,
      lastName: inputVal.lastName,
      email: inputVal.email,
      mobile: inputVal.mobile,
      password: inputVal.password,
      confirmPassword: inputVal.confirmPassword,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/signup", data);
      console.log(res);
      if (res.status === 200) {
        console.log("successful register")
        navigate('/login')
        setInputVal({
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registeration</h3>
      <div>
        <label>Username</label>
        <input type="text" name='userName' value={inputVal.userName} onChange={handleOnChange} required />
      </div>
      <div>
        <label>First Name</label>
        <input type="text" name='firstName' value={inputVal.firstName} onChange={handleOnChange} required />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name='lastName' value={inputVal.lastName} onChange={handleOnChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name='email' value={inputVal.email} onChange={handleOnChange} required />
      </div>
      <div>
        <label>Mobile</label>
        <input type="text" name='mobile' value={inputVal.mobile} onChange={handleOnChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name='password' value={inputVal.password} onChange={handleOnChange} required />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" name='confirmPassword' value={inputVal.confirmPassword} onChange={handleOnChange} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
