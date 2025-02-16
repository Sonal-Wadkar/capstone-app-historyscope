import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './AuthFormStyles.css';

const Register = ({ onFormSwitch }) => {  
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err.message || 'Signup failed.');
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <label htmlFor='name'>Name</label>
                <input onChange={handleChange} type='text' name='name' placeholder='Enter your name...' value={signupInfo.name} />

                <label htmlFor='email'>Email</label>
                <input onChange={handleChange} type='email' name='email' placeholder='Enter your email...' value={signupInfo.email} />

                <label htmlFor='password'>Password</label>
                <input onChange={handleChange} type='password' name='password' placeholder='Enter your password...' value={signupInfo.password} />

                <button type='submit'>Signup</button>
            </form>
            <span>Already have an account? <Link to="/login">Login</Link></span>
            <ToastContainer />
        </div>
    );
};

export default Register;  // ✅ Default export
