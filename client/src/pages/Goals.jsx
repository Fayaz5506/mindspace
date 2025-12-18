import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Goals = () => {
    const [goals, setGoals] = useState([
        { id: 1, title: 'Daily Meditation', target: 7, current: 5, category: 'Meditation' },
        { id: 2, title: 'Journal 5x a week', target: 5, current: 3, category: 'Journaling' },
        { id: 3, title: 'Step outside for 10 min', target: 7, current: 7, category: 'Other' },
    ]);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
            <Navbar />
            <div className="container" style={{ padding: '40px 0' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem' }}>Your Goals</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Small steps lead to big changes.</p>
                    </div>
                    <button style={{ background: 'var(--primary)', color: '#fff', padding: '12px 24px', borderRadius: '12px', fontWeight: 600 }}>+ New Goal</button>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                    {goals.map(goal => (
                        <div key={goal.id} className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                <div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        color: 'var(--primary)',
                                        background: 'rgba(108, 92, 231, 0.1)',
                                        padding: '4px 8px',
                                        borderRadius: '4px'
                                    }}>
                                        {goal.category}
                                    </span>
                                    <h3 style={{ marginTop: '12px' }}>{goal.title}</h3>
                                </div>
                                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>
                                    {Math.round((goal.current / goal.target) * 100)}%
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                                    style={{ height: '100%', background: 'var(--primary)' }}
                                ></motion.div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-muted)' }}>{goal.current} of {goal.target} complete</span>
                                <button style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem' }}>Mark Done</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Goals;
