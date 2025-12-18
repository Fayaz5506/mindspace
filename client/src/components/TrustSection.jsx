import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
    return (
        <section style={{ padding: '100px 24px', background: 'var(--bg-dark)' }}>
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '60px' }}>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ flex: '1 1 400px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', background: 'linear-gradient(to right, #00B894, #55efc4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Privacy First. Always.
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '32px' }}>
                        Your thoughts are yours alone. MindSpace is built on the principle of psychological safety.
                        We don't sell your data, we don't read your journals, and we don't have public profiles.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                            "End-to-End Encrypted Journal Entries",
                            "No Social Following or Public Feeds",
                            "Anonymous Community Support (Optional)",
                            "Data Deletion at Any Time"
                        ].map((item, i) => (
                            <li key={i} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                                <span style={{ color: 'var(--secondary)' }}>✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{
                        flex: '1 1 400px',
                        height: '400px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                        borderRadius: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Abstract Lock Illustration */}
                    <div style={{ position: 'relative', width: '120px', height: '160px', border: '8px solid var(--text-muted)', borderRadius: '20px' }}>
                        <div style={{ position: 'absolute', top: '-60px', left: '10px', width: '84px', height: '80px', border: '8px solid var(--text-muted)', borderBottom: 'none', borderRadius: '42px 42px 0 0' }}></div>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', background: 'var(--secondary)', borderRadius: '50%' }}></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TrustSection;
