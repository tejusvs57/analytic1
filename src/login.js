import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import './login.css'; // we'll define styles here
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ user_name: '', password: '' });
  const pass='1234';
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';

   // console.log(e.target);
   // console.log(e.target.value);
   console.log(form);

    try {
      // const res = await axios.post(`http://localhost:5000${endpoint}`, form);
      // alert(res.data.message);
      // if (res.data.token) {
        if( form['password']===pass){
          localStorage.setItem('token', 'loggedin');
          console.log('logged in');
          navigate('/home');
        }
        else{
          throw console.error('login failed');
          
        }
       
      // }
    } catch (err) {
      //alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>🚀 Login to Your Portal</h2>

        <div className="input-box">
          <FaEnvelope className="input-icon" />
          <input
            type="text"
            name="user_name"
            placeholder="User Name"
            required
            value={form.user_name}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaLock className="input-icon" />
          <input
            type={showPwd ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />
          <span className="toggle-eye" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Let’s Go 🚀</button>
        <p className="note">First time here? Ask your admin for access.</p>
      </form>
    </div>
  );
}

export default AuthForm;
