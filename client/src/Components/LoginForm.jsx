import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Loginform = ({ userInfo }) => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const logintoServer = async (e) => {
    e.preventDefault();

    if (!loginInfo.email || !loginInfo.password) {
      return toast.warning('Please enter your email address and password.');
    }

    try {
      const response = await axios.post( 
        'http://localhost:2222/api/v1/user_login',
        loginInfo
      );

      if (response.data.status === 'success') {
        userInfo(response.data.email, true);
        localStorage.setItem('token', response.data.token);
        toast.success(response.data.response);
        navigate('/');
      } else {
        toast.warning(response.data.response);
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  return (
    <div className="container login-container">
      <div className="row login-form">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3>Log In</h3>
              <ToastContainer position="top-center" />
            </div>
            <div className="card-body">
              <form onSubmit={logintoServer}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    onChange={changeHandler}
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    required
                    name="password"
                    onChange={changeHandler}
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                  />
                </div>
                <p>
                  Are you new here?{' '}
                  <Link to="/registration">Register</Link>
                </p>
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
