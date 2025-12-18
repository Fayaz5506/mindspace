import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Mindfulness = () => {
    const categories = ['Stress', 'Sleep', 'Focus', 'Anxiety'];
    const [selectedCategory, setSelectedCategory] = useState('Stress');

    const meditations = [
        { id: 1, title: 'Calm Breathing', duration: '5 min', category: 'Stress', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=300' },
        { id: 2, title: 'Deep Sleep', duration: '15 min', category: 'Sleep', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=300' },
        { id: 3, title: 'Morning Focus', duration: '10 min', category: 'Focus', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=300' },
        { id: 4, title: 'Anxiety Relief', duration: '8 min', category: 'Anxiety', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=300' },
    ];

    const [isBreathing, setIsBreathing] = useState(false);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
            <Navbar />
            <div className="container" style={{ padding: '40px 0' }}>
                <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Mindfulness</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Find your inner peace through guided practices.</p>
                </header>

                {/* Breathing Exercise Toggle */}
                <section style={{ marginBottom: '80px', textAlign: 'center' }}>
                    <div className="glass" style={{ padding: '40px', borderRadius: '32px', maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{ marginBottom: '24px' }}>4-7-8 Breathing</h2>
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
                            <motion.div
                                animate={isBreathing ? {
                                    scale: [1, 1.5, 1.5, 1],
                                    opacity: [0.5, 1, 1, 0.5]
                                } : {}}
                                transition={{
                                    duration: 19, // 4 inhale, 7 hold, 8 exhale
                                    repeat: Infinity,
                                    times: [0, 4 / 19, 11 / 19, 1]
                                }}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    background: 'var(--primary)',
                                    boxShadow: '0 0 40px var(--primary-glow)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '1.2rem',
                                    fontWeight: 600
                                }}
                            >
                                {isBreathing ? 'Breath' : 'Go'}
                            </motion.div>
                        </div>
                        <button
                            onClick={() => setIsBreathing(!isBreathing)}
                            style={{
                                background: isBreathing ? '#ff4757' : 'var(--primary)',
                                color: '#fff',
                                padding: '16px 48px',
                                borderRadius: '16px',
                                fontWeight: 700
                            }}
                        >
                            {isBreathing ? 'Stop Exercise' : 'Start Breathing'}
                        </button>
                    </div>
                </section>

                {/* Meditation Library */}
                <section>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '100px',
                                    background: selectedCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                    color: '#fff',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
                        {meditations.filter(m => m.category === selectedCategory).map(m => (
                            <motion.div
                                key={m.id}
                                whileHover={{ y: -10 }}
                                className="glass glass-hover"
                                style={{ borderRadius: '24px', overflow: 'hidden' }}
                            >
                                <img src={m.image} alt={m.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ marginBottom: '8px' }}>{m.title}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{m.duration}</span>
                                        <button style={{ color: 'var(--secondary)', fontWeight: 600 }}>Play Now</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Mindfulness;
