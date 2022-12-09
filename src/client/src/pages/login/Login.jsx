import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../redux/features/authSlice'
import './Login.scss'
const Login = () => {
  const { error, loading } = useSelector(state => ({ ...state.auth }));
  const initStateLogin = {
    username: '',
    password: '',
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData ] = useState(initStateLogin);
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  useEffect(() => {
    error && toast.error(error);
  },[error])
  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) { 
      return toast.error("Input is not empty ")
    }
    dispatch(login({ data: formData, navigate,toast}))
  }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login