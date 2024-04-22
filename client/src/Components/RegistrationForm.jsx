import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

    const [registrationInfo , setRegistrationInfo] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setRegistrationInfo({...registrationInfo, [name] : value});
    }

    const registrationToServer = (e) => {
        e.preventDefault();

        if(!registrationInfo.name || !registrationInfo.email || !registrationInfo.password){
            return toast.warning('Please fill all the fields');
        }

        axios.post('http://localhost:2222/api/v1/user_registration',registrationInfo).
        then(res => {
            if (res.data.status =='success'){
                toast.success(res.data.response);
                navigate('/login');
            }else{
                toast.warning(res.data.response);
            }
        }).catch(err => console.error(err));


    }

    return (
        <div className="container login-container">
            <div className="row login-form">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>Registration</h3>
                            <ToastContainer position="top-center" />
                        </div>
                        <div className="card-body">
                            <form onSubmit={registrationToServer}>
                                <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={changeHandler}
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter name"
                                />
                                </div>
                                <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
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
                                    name="password"
                                    onChange={changeHandler}
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                />
                                </div>
                                <p>
                                Already registered?{' '}
                                <Link to="/login">Log In</Link>
                                </p>
                                <button type="submit" className="btn btn-primary">
                                Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;