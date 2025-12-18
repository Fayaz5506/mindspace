import React from 'react';
import { motion } from 'framer-motion';

const EmotionalSection = () => {
    return (
        <section style={{ padding: '100px 24px', background: 'var(--bg-card)' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: '800px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', color: 'var(--text-main)' }}>
                        Why Reflection Matters
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '48px', lineHeight: '1.8' }}>
                        In a world that never stops, taking five minutes for yourself isn't a luxury—it's a necessity.
                        MindSpace gives you the tools to understand your emotional landscape.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', width: '100%' }}>
                    {[
                        { title: "Find Clarity", text: "Untangle complex thoughts by writing them down. See your problems from a new perspective." },
                        { title: "Spot Patterns", text: "Notice what triggers your anxiety and what brings you joy through our mood analytics." },
                        { title: "Build Resilience", text: "Regular reflection strengths your emotional immune system, preparing you for life's challenges." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            style={{ padding: '32px', borderLeft: '3px solid var(--secondary)', background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}
                        >
                            <h3 style={{ marginBottom: '16px', color: 'var(--text-main)' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EmotionalSection;
