import React from 'react';
import { motion } from 'framer-motion';

const CalmSVG = () => {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            opacity: 0.6,
            pointerEvents: 'none'
        }}>
            <motion.svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                width="600"
                height="600"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#6C5CE7', stopOpacity: 0.4 }} />
                        <stop offset="100%" style={{ stopColor: '#00B894', stopOpacity: 0.1 }} />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#gradient)"
                    d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.9,32.4C59.6,43.3,48.3,52.2,36.2,59.3C24.1,66.4,11.2,71.7,-1,73.4C-13.2,75.1,-25.6,73.2,-37.3,66.8C-49,60.4,-60,49.5,-68.8,36.6C-77.6,23.7,-84.2,8.8,-83.4,-5.9C-82.6,-20.6,-74.4,-35.1,-63.3,-46.4C-52.2,-57.7,-38.2,-65.8,-24.3,-73.2C-10.4,-80.6,3.4,-87.3,16.8,-86.6C30.2,-85.9,43.2,-77.8,44.7,-76.4Z"
                    transform="translate(100 100)"
                />
            </motion.svg>
        </div>
    );
};

export default CalmSVG;
