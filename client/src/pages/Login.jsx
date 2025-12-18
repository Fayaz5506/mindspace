import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 80px)' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '40px',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '400px',
                        boxShadow: 'var(--shadow-soft)'
                    }}
                >
                    <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Welcome Back</h2>
                    {error && <div style={{ color: '#e74c3c', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
                    <form onSubmit={onSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#2d3436', color: '#fff' }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#2d3436', color: '#fff' }}
                            />
                        </div>
                        <button type="submit" style={{
                            width: '100%',
                            padding: '12px',
                            background: 'var(--primary)',
                            color: '#fff',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '1rem'
                        }}>
                            Log In
                        </button>
                    </form>
                    <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        New to MindSpace? <Link to="/register" style={{ color: 'var(--secondary)' }}>Sign Up</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
