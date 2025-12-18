import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        streak: 3,
        moodTrend: 'Improving'
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('auth/me');
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    const moods = [
        { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD93D' },
        { id: 'calm', emoji: '😌', label: 'Calm', color: '#6BCB77' },
        { id: 'sad', emoji: '😢', label: 'Sad', color: '#4D96FF' },
        { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#FF6B6B' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)', paddingBottom: '40px' }}>
            <Navbar />

            <div className="container" style={{ marginTop: '40px' }}>
                <header style={{ marginBottom: '40px' }}>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ fontSize: '2.5rem', marginBottom: '8px' }}
                    >
                        Hello, {user?.username || 'User'}
                    </motion.h1>
                    <p style={{ color: 'var(--text-muted)' }}>How are you feeling today?</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {/* Mood Selector Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass"
                        style={{ padding: '32px', borderRadius: '24px', gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1) 0%, rgba(21, 25, 38, 0.7) 100%)' }}
                    >
                        <h3 style={{ marginBottom: '24px' }}>How are you feeling today?</h3>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            {moods.map((m) => (
                                <motion.button
                                    key={m.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '16px 32px',
                                        borderRadius: '16px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span> {m.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <div className="glass" style={{ padding: '24px', borderRadius: '24px' }}>
                        <h4 style={{ color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Stats</h4>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                            <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1 }}>{stats.streak}</span>
                            <span style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Days Streak</span>
                        </div>
                    </div>

                    {/* Quick Journal */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => navigate('/journal')}
                        className="glass"
                        style={{ padding: '24px', borderRadius: '24px', cursor: 'pointer' }}
                    >
                        <h4 style={{ color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Quick Journal</h4>
                        <div style={{
                            width: '100%',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            padding: '16px',
                            color: 'var(--text-muted)',
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            Click to start a new entry...
                        </div>
                    </motion.div>

                    {/* Meditation Suggestion */}
                    <div className="glass" style={{ padding: '24px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Daily Meditation</h4>
                            <p style={{ fontWeight: 600 }}>Recommended: 5 min breathing</p>
                        </div>
                        <button style={{ background: 'var(--secondary)', padding: '12px 24px', borderRadius: '12px', fontWeight: 600 }}>Play</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
