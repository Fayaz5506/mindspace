import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getFlaggedPosts, updatePostStatus } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const [flaggedPosts, setFlaggedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalFlagged: 0,
        urgentCrisis: 0
    });

    useEffect(() => {
        fetchFlaggedContent();
    }, []);

    const fetchFlaggedContent = async () => {
        try {
            setLoading(true);
            const res = await getFlaggedPosts();
            setFlaggedPosts(res.data);

            // Calculate stats from data
            setStats({
                totalFlagged: res.data.length,
                urgentCrisis: res.data.filter(p => p.needsUrgentReview).length
            });
        } catch (err) {
            console.error('Failed to fetch moderation queue:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        try {
            await updatePostStatus(id, status);
            // Remove from local list to show immediate feedback
            setFlaggedPosts(prev => prev.filter(p => p._id !== id));
            setStats(prev => ({
                totalFlagged: prev.totalFlagged - 1,
                urgentCrisis: flaggedPosts.find(p => p._id === id)?.needsUrgentReview ? prev.urgentCrisis - 1 : prev.urgentCrisis
            }));
        } catch (err) {
            alert('Action failed. Please check permissions.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
            <Navbar />
            <div className="container" style={{ padding: '40px 0' }}>
                <header style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Admin Oversight</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Security and community health monitoring.</p>
                    </div>
                    <button
                        onClick={fetchFlaggedContent}
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '8px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        🔄 Refresh Queue
                    </button>
                </header>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    <div className="glass" style={{ padding: '24px', borderRadius: '24px' }}>
                        <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '12px' }}>Awaiting Review</h4>
                        <span style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.totalFlagged}</span>
                    </div>
                    <div className="glass" style={{ padding: '24px', borderRadius: '24px', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
                        <h4 style={{ color: '#FF6B6B', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '12px' }}>Urgent Crisis Flags</h4>
                        <span style={{ fontSize: '2.5rem', fontWeight: 700 }}>{stats.urgentCrisis}</span>
                    </div>
                </div>

                {/* Flagged Posts Review */}
                <section>
                    <h2 style={{ marginBottom: '32px' }}>Priority Review Queue</h2>
                    <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                        {loading ? (
                            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading moderation queue...</div>
                        ) : flaggedPosts.length === 0 ? (
                            <div style={{ padding: '60px', textAlign: 'center' }}>
                                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🌈</span>
                                <h3 style={{ color: 'var(--secondary)' }}>Clear Skies!</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Currently no flagged content requires review.</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <th style={{ padding: '20px' }}>Type/User</th>
                                            <th style={{ padding: '20px' }}>Reason & Content</th>
                                            <th style={{ padding: '20px' }}>Safety Status</th>
                                            <th style={{ padding: '20px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence>
                                            {flaggedPosts.map(post => (
                                                <motion.tr
                                                    key={post._id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                                >
                                                    <td style={{ padding: '20px' }}>
                                                        <div style={{ fontWeight: 600 }}>{post.user?.username || 'Anonymous'}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(post.createdAt).toLocaleString()}</div>
                                                    </td>
                                                    <td style={{ padding: '20px' }}>
                                                        <div style={{ color: '#FF6B6B', fontSize: '0.8rem', marginBottom: '6px', fontWeight: 600 }}>
                                                            {post.flagReason || 'Flagged for Review'}
                                                        </div>
                                                        <div style={{ fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.4 }}>
                                                            {post.content}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '20px' }}>
                                                        {post.needsUrgentReview ?
                                                            <span style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#FF6B6B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>HIGH RISK</span> :
                                                            <span style={{ background: 'rgba(255, 165, 2, 0.2)', color: '#ffa502', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>MODERATE</span>
                                                        }
                                                    </td>
                                                    <td style={{ padding: '20px' }}>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                            <button
                                                                onClick={() => handleAction(post._id, 'approved')}
                                                                style={{ background: 'var(--secondary)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(post._id, 'rejected')}
                                                                style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', cursor: 'pointer' }}
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
