import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Section = ({ title, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        style={{ marginBottom: '60px' }}
    >
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--text-main)' }}>{title}</h2>
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            {children}
        </div>
    </motion.div>
);

const MethodPage = () => {
    return (
        <div style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
            <Navbar />
            <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '900px' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}
                >
                    The MindSpace Method
                </motion.h1>
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '80px' }}>
                    A scientifically grounded approach to understanding your emotional landscape.
                </p>

                <Section title="Cognitive Journaling" delay={0.1}>
                    <p>
                        Our journaling interface isn't just a blank page. It's designed based on principles of Cognitive Behavioral Therapy (CBT).
                        By externalizing your thoughts, you move them from the chaotic space of working memory to a structured external medium.
                    </p>
                    <p style={{ marginTop: '16px' }}>
                        This process, known as "affect labeling," has been shown to dampen the activity of the amygdala—the brain's alarm system—and increase activity in the prefrontal cortex, which is responsible for emotional regulation.
                    </p>
                </Section>

                <Section title="Pattern Recognition" delay={0.3}>
                    <p>
                        Emotions are rarely random. They follow patterns triggered by time of day, social interactions, or specific activities.
                        MindSpace uses privacy-preserving analytics to help you spot these trends.
                    </p>
                    <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                        <li>Do you feel anxious every Sunday evening?</li>
                        <li>Does creative writing consistently boost your mood?</li>
                        <li>Are there people who drain your energy?</li>
                    </ul>
                    <p style={{ marginTop: '16px' }}>
                        We help you answer these questions with data, not just intuition.
                    </p>
                </Section>

                <Section title="Micro-Mindfulness" delay={0.5}>
                    <p>
                        You don't need to meditate for an hour to feel the benefits. The MindSpace Method advocates for "micro-doses" of mindfulness.
                        Two minutes of focused breathing can reset your autonomic nervous system.
                    </p>
                    <p style={{ marginTop: '16px' }}>
                        Our built-in Calm SVG element is visual anchor for box breathing (in for 4, hold for 4, out for 4, hold for 4), giving you an immediate tool for de-escalation during stress spikes.
                    </p>
                </Section>
            </div>
            <Footer />
        </div>
    );
};

export default MethodPage;
