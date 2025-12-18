import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: '#0a0c12', padding: '80px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px', marginBottom: '60px' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ height: '12px', width: '12px', background: 'var(--secondary)', borderRadius: '50%', display: 'inline-block' }}></span>
                            MindSpace
                        </h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            A digital sanctuary for your mental well-being. Built with privacy and empathy at its core.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '24px' }}>Platform</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="#">Journaling</a></li>
                            <li><a href="#">Mood Tracking</a></li>
                            <li><a href="#">Mindfulness</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '24px' }}>Support</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><a href="#">Crisis Resources</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} MindSpace. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
