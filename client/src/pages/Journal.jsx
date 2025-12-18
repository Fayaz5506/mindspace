import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('Neutral');
    const [gratitude, setGratitude] = useState(['', '', '']);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const moods = [
        { label: 'Happy', emoji: '😊', color: 'var(--mood-happy)' },
        { label: 'Calm', emoji: '😌', color: 'var(--mood-calm)' },
        { label: 'Neutral', emoji: '😐', color: 'var(--text-muted)' },
        { label: 'Sad', emoji: '😢', color: 'var(--mood-sad)' },
        { label: 'Anxious', emoji: '😰', color: 'var(--mood-anxious)' },
    ];

    const handleGratitudeChange = (index, value) => {
        const newGratitude = [...gratitude];
        newGratitude[index] = value;
        setGratitude(newGratitude);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await api.post('journals', {
                title,
                content,
                mood,
                gratitude: gratitude.filter(item => item.trim() !== '')
            });
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)', paddingBottom: '40px' }}>
            <Navbar />

            <div className="container" style={{ marginTop: '40px', maxWidth: '900px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{ padding: '40px', borderRadius: '32px' }}
                >
                    <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>New Entry</h1>
                            <p style={{ color: 'var(--text-muted)' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            style={{
                                background: 'var(--primary)',
                                color: '#fff',
                                padding: '12px 32px',
                                borderRadius: '12px',
                                fontWeight: 600,
                                opacity: isSaving ? 0.7 : 1
                            }}
                        >
                            {isSaving ? 'Saving...' : 'Save Entry'}
                        </button>
                    </header>

                    {/* Mood Selector */}
                    <section style={{ marginBottom: '40px' }}>
                        <h4 style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Current Mood</h4>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {moods.map((m) => (
                                <button
                                    key={m.label}
                                    onClick={() => setMood(m.label)}
                                    style={{
                                        padding: '12px 20px',
                                        borderRadius: '16px',
                                        background: mood === m.label ? m.color : 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: mood === m.label ? '#000' : '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span>{m.emoji}</span> {m.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Editor */}
                    <section style={{ marginBottom: '40px' }}>
                        <input
                            type="text"
                            placeholder="Title (optional)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                padding: '12px 0',
                                marginBottom: '24px',
                                outline: 'none'
                            }}
                        />
                        <textarea
                            placeholder="Start writing your thoughts..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                minHeight: '300px',
                                resize: 'none',
                                outline: 'none'
                            }}
                        />
                    </section>

                    {/* Gratitude Section */}
                    <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                        <h4 style={{ marginBottom: '24px', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>✨ 3 Things I'm Grateful For</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {gratitude.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>{index + 1}.</span>
                                    <input
                                        type="text"
                                        placeholder="I am grateful for..."
                                        value={item}
                                        onChange={(e) => handleGratitudeChange(index, e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            color: '#fff',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="glass"
                            style={{ padding: '48px', borderRadius: '32px', textAlign: 'center' }}
                        >
                            <span style={{ fontSize: '4rem', marginBottom: '24px', display: 'block' }}>🌙</span>
                            <h2>Entry Saved Securely</h2>
                            <p style={{ color: 'var(--text-muted)' }}>Taking you back to the dashboard.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Journal;
