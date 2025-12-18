import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            background: 'var(--bg-dark)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            textAlign: 'center'
        }}>
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ fontSize: '6rem', marginBottom: '0', color: 'var(--accent)' }}
            >
                404
            </motion.h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Page Not Found</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>
                It seems you've wandered into the unknown. <br /> Let's guide you back to safety.
            </p>
            <Link to="/">
                <button style={{
                    padding: '12px 32px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50px',
                    fontWeight: 600
                }}>
                    Return Home
                </button>
            </Link>
        </div>
    );
};

export default NotFound;
