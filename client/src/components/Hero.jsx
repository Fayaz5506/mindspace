import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CalmSVG from './CalmSVG';

const Hero = () => {
    return (
        <section style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <CalmSVG />

            <div style={{ zIndex: 2, padding: '0 20px', maxWidth: '800px' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        letterSpacing: '4px',
                        color: 'var(--secondary)',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        marginBottom: '16px',
                        fontWeight: 600
                    }}
                >
                    Start Your Mental Journey
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: '4.5rem',
                        fontWeight: 800,
                        background: 'linear-gradient(to right, #fff, #a29bfe)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: '0 0 24px 0',
                        lineHeight: 1.1
                    }}
                >
                    A Private Space <br /> For Your Mind
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        marginBottom: '40px',
                        lineHeight: 1.6
                    }}
                >
                    Track your emotions daily, recognize patterns, and practice mindfulness. <br />
                    Completely private. Secure. Yours.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Link to="/register">
                        <button style={{
                            background: 'var(--primary)',
                            color: '#fff',
                            padding: '16px 48px',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            boxShadow: '0 10px 25px var(--primary-glow)',
                            transition: 'transform 0.2s ease',
                            border: '2px solid transparent'
                        }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Start Journaling
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Bottom Indicator */}
            <div style={{ position: 'absolute', bottom: '40px', opacity: 0.5 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TRUSTED BY WELLNESS ADVOCATES</p>
                {/* Placeholders for logos if needed, sticking to text for now as per constraints */}
            </div>
        </section>
    );
};

export default Hero;
