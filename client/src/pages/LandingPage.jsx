import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import EmotionalSection from '../components/EmotionalSection';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div style={{ position: 'relative' }}>
            <Navbar />
            <Hero />
            <FeatureSection />
            <EmotionalSection />
            <TrustSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
