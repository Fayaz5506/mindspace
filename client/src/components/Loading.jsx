import React from 'react';

const Loading = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            background: 'var(--bg-dark)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(255,255,255,0.1)',
                borderTop: '4px solid var(--secondary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}>
                <style>
                    {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
                </style>
            </div>
        </div>
    );
};

export default Loading;
