import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../../redux/features/authSlice";

const Register = () => {
  const { loading } = useSelector(state => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    username: "",
    email: "",
    password: "",
    name: "",
  };
  const [inputs, setInputs] = useState(initState);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    const { username, email, password, name } = inputs;
    e.preventDefault();
    
    if (!username || !email || !password || !name) {
      return toast.error("Input is not empty ")
    }
    dispatch(register({ data:inputs, navigate, toast }));
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>HID</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit} >
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <button disabled={loading}  type='submit'>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
