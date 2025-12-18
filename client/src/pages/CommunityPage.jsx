import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { motion } from 'framer-motion';

const CommunityPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get('community');
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        try {
            const res = await api.post('community', { content: newPost, isAnonymous });
            setNewPost('');
            if (res.data.moderationAlert) {
                setAlert({ type: 'warning', message: res.data.moderationAlert });
            } else if (res.data.crisisAlert) {
                setAlert({ type: 'danger', message: res.data.crisisAlert });
            } else {
                setAlert({ type: 'success', message: 'Thought shared successfully.' });
            }
            fetchPosts();
            setTimeout(() => setAlert(null), 8000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReact = async (id, reaction) => {
        try {
            await api.post(`community/${id}/react`, { reaction });
            fetchPosts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleFlag = async (id) => {
        try {
            if (window.confirm('Are you sure you want to flag this post for moderation?')) {
                await api.put(`community/${id}/flag`, { reason: 'User Reported' });
                alert('Post has been flagged for review.');
                fetchPosts();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <Navbar />
            <div className="container" style={{ padding: '40px 0' }}>
                <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Safe Space</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Share your thoughts anonymously and receive community support.</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', marginTop: '8px' }}>
                        * All posts are scanned for safety. If you are in crisis, please call 988 (US) or your local emergency number.
                    </p>
                </header>

                {alert && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            padding: '16px 24px',
                            background: alert.type === 'danger' ? 'rgba(255, 71, 87, 0.2)' : alert.type === 'warning' ? 'rgba(255, 165, 2, 0.2)' : 'rgba(46, 213, 115, 0.2)',
                            border: `1px solid ${alert.type === 'danger' ? '#ff4757' : alert.type === 'warning' ? '#ffa502' : '#2ed573'}`,
                            borderRadius: '16px',
                            marginBottom: '32px',
                            maxWidth: '700px',
                            margin: '0 auto 32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        <span>{alert.type === 'danger' ? '🚨' : alert.type === 'warning' ? '⚠️' : '✅'}</span>
                        <p style={{ fontWeight: 500 }}>{alert.message}</p>
                    </motion.div>
                )}

                {/* Create Post */}
                <div className="glass" style={{ padding: '32px', borderRadius: '24px', maxWidth: '700px', margin: '0 auto 60px' }}>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="What's on your mind? We're here to listen..."
                            style={{
                                width: '100%',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                padding: '20px',
                                color: '#fff',
                                height: '120px',
                                resize: 'none',
                                marginBottom: '16px',
                                fontSize: '1rem'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                <input
                                    type="checkbox"
                                    id="anon-check"
                                    checked={isAnonymous}
                                    onChange={() => setIsAnonymous(!isAnonymous)}
                                />
                                <label htmlFor="anon-check" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>Post Anonymously</label>
                            </div>
                            <button
                                type="submit"
                                style={{ background: 'var(--primary)', color: '#fff', padding: '12px 32px', borderRadius: '12px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                            >
                                Share Thought
                            </button>
                        </div>
                    </form>
                </div>

                {/* Posts Feed */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px', margin: '0 auto' }}>
                    {posts.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Be the first to share a thought in this safe space.</p>
                    ) : posts.map(post => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass"
                            style={{ padding: '24px', borderRadius: '24px', position: 'relative' }}
                        >
                            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>
                                    {post.isAnonymous ? 'Anonymous' : post.user?.username}
                                </span>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                    <button
                                        onClick={() => handleFlag(post._id)}
                                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
                                        title="Flag this post"
                                    >
                                        🚩
                                    </button>
                                </div>
                            </div>
                            <p style={{ lineHeight: 1.6, marginBottom: '24px', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>{post.content}</p>

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {['❤️', '🤗', '🙏', '💪'].map(emoji => (
                                    <button
                                        key={emoji}
                                        onClick={() => handleReact(post._id, emoji)}
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            padding: '8px 16px',
                                            borderRadius: '100px',
                                            color: '#fff',
                                            display: 'flex',
                                            gap: '8px',
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {emoji} {post.reactions.filter(r => r === emoji).length || 0}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
