import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // we'll define styles here

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ user_name: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';

    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, form);
      alert(res.data.message);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        <input
          type="text"
          name="user_name"
          placeholder="User Name"
          value={form.user_name}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
