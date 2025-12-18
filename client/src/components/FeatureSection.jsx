import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        style={{
            background: 'var(--bg-card)',
            padding: '32px',
            borderRadius: '24px',
            flex: '1',
            minWidth: '280px',
            border: '1px solid rgba(255,255,255,0.05)'
        }}
    >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-main)' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{desc}</p>
    </motion.div>
);

const FeatureSection = () => {
    return (
        <section id="features" style={{ padding: '100px 24px', background: 'var(--bg-dark)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>How MindSpace Works</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        Designed to be your safe harbor. Simple tools for complex emotions.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
                    <FeatureCard
                        title="Track Emotions"
                        desc="Log your moods daily. Our analytics help you recognize emotional patterns over weeks and months."
                        delay={0.1}
                    />
                    <FeatureCard
                        title="Private Journaling"
                        desc="Write freely in a secure, encrypted space. No profiles, no social feeds, just you and your thoughts."
                        delay={0.2}
                    />
                    <FeatureCard
                        title="Guided Mindfulness"
                        desc="Short, effective meditation sessions designed specifically for anxiety and stress relief."
                        delay={0.3}
                    />
                    <FeatureCard
                        title="Goal Tracking"
                        desc="Set and track mental health goals. Build positive habits through gentle reminders and streak tracking."
                        delay={0.4}
                    />
                    <FeatureCard
                        title="Growth Insights"
                        desc="Understand your progress with beautiful visualizations and AI-powered wellness insights."
                        delay={0.5}
                    />
                    <FeatureCard
                        title="Safe Community"
                        desc="Connect with others anonymously. Share support and find strength in shared experiences."
                        delay={0.6}
                    />
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
