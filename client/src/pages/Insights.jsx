import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { getInsights } from '../services/api';

const Insights = () => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await getInsights();
                setInsights(res.data);
            } catch (err) {
                console.error('Error fetching insights:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, []);

    const trends = [
        { label: 'Mood Average', value: insights?.aiInsight?.moodAverage ? (insights.aiInsight.moodAverage * 20) : 0, color: 'var(--mood-happy)' },
        { label: 'Journaling', value: insights ? Math.min((insights.weeklyJournalCount / 7) * 100, 100) : 0, color: 'var(--mood-calm)' },
        { label: 'Goals', value: insights ? (insights.goalStats.completed / (insights.goalStats.total || 1)) * 100 : 0, color: 'var(--primary)' },
    ];

    if (loading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>Analyzing patterns...</p>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
            <Navbar />
            <div className="container" style={{ padding: '40px 0' }}>
                <header style={{ marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '2.5rem' }}>Insights & Trends</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Understanding your emotional patterns over time.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                    {/* Weekly Mood Trend */}
                    <div className="glass" style={{ padding: '32px', borderRadius: '32px' }}>
                        <h3 style={{ marginBottom: '32px' }}>Mood History (Last 14 Days)</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '8px', justifyContent: 'space-around' }}>
                            {insights?.moodTrends && insights.moodTrends.length > 0 ? (
                                insights.moodTrends.map((mood, i) => (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(mood.value / 5) * 100}%` }}
                                            style={{
                                                width: '100%',
                                                background: mood.value > 3 ? 'var(--mood-happy)' : mood.value < 3 ? 'var(--mood-anxious)' : 'var(--mood-calm)',
                                                borderRadius: '8px 8px 4px 4px',
                                                opacity: 0.8
                                            }}
                                            title={mood.label}
                                        ></motion.div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%' }}>Log your mood to see trends.</p>
                            )}
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="glass" style={{ padding: '32px', borderRadius: '32px' }}>
                        <h3 style={{ marginBottom: '32px' }}>Engagement Stats</h3>
                        {trends.map(trend => (
                            <div key={trend.label} style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>{trend.label}</span>
                                    <span style={{ fontWeight: 600 }}>{Math.round(trend.value)}%</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${trend.value}%` }}
                                        style={{ height: '100%', background: trend.color, borderRadius: '4px' }}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* AI Insight Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass"
                        style={{
                            padding: '32px',
                            borderRadius: '32px',
                            gridColumn: '1 / -1',
                            background: 'linear-gradient(135deg, rgba(108, 92, 231, 0.1) 0%, rgba(21, 25, 38, 0.7) 100%)',
                            border: '1px solid rgba(108, 92, 231, 0.3)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '1.5rem' }}>✨</span> AI Mood Pattern Analysis
                            </h3>
                            <span style={{
                                padding: '4px 12px',
                                background: 'var(--primary)',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: 'white'
                            }}>
                                {insights?.aiInsight?.trend || 'Analyzing...'}
                            </span>
                        </div>

                        <p style={{ fontSize: '1.1rem', marginBottom: '16px', fontWeight: 500 }}>
                            {insights?.aiInsight?.summary || "Keep logging to reveal insights."}
                        </p>

                        <div style={{
                            padding: '16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '16px',
                            borderLeft: '4px solid var(--secondary)',
                            marginBottom: '24px'
                        }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Why am I seeing this?
                            </h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                {insights?.aiInsight?.explanation || "More data helps me understand your context better."}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {insights?.aiInsight?.topEmotions?.map(emotion => (
                                <span key={emotion} style={{
                                    padding: '6px 14px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '30px',
                                    fontSize: '0.85rem'
                                }}>
                                    #{emotion}
                                </span>
                            ))}
                        </div>

                        <p style={{ marginTop: '32px', fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', opacity: 0.6 }}>
                            * This is an AI-generated pattern analysis and not a clinical diagnosis. If you're feeling persistent distress, please consult a healthcare professional.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Insights;
