import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
    const token = localStorage.getItem('token');

    // Help decode token to check role
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const isAdmin = user?.role === 'admin';

    // Add handleLogout
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 48px',
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'var(--bg-glass)',
            backdropFilter: 'var(--glass-blur)',
            borderBottom: 'var(--border-glass)'
        }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ height: '12px', width: '12px', background: 'var(--secondary)', borderRadius: '50%', display: 'inline-block' }}></span>
                    MindSpace
                </div>
            </Link>

            {/* Links */}
            <div style={{ display: 'flex', gap: '32px', color: 'var(--text-muted)' }}>
                {token ? (
                    <>
                        <Link to="/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
                        <Link to="/mindfulness" style={{ fontWeight: 500 }}>Mindfulness</Link>
                        <Link to="/goals" style={{ fontWeight: 500 }}>Goals</Link>
                        <Link to="/insights" style={{ fontWeight: 500 }}>Insights</Link>
                        <Link to="/community" style={{ fontWeight: 500 }}>Community</Link>
                        {isAdmin && <Link to="/admin" style={{ fontWeight: 500, color: 'var(--accent)' }}>Moderation</Link>}
                    </>
                ) : (
                    <>
                        <Link to="/method" style={{ fontWeight: 500 }}>Method</Link>
                        <Link to="/community" style={{ fontWeight: 500 }}>Community</Link>
                    </>
                )}
            </div>

            {/* Auth Buttons */}
            <div style={{ display: 'flex', gap: '16px' }}>
                {!token ? (
                    <>
                        <Link to="/login">
                            <button style={{
                                background: 'transparent',
                                color: 'var(--text-main)',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                fontWeight: 500
                            }}>
                                Log in
                            </button>
                        </Link>
                        <Link to="/register">
                            <button style={{
                                background: 'var(--primary)',
                                color: '#fff',
                                padding: '10px 24px',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: 600,
                                boxShadow: '0 4px 14px 0 var(--primary-glow)'
                            }}>
                                Sign up
                            </button>
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--text-main)',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
