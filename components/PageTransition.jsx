"use client";
import React, { useRef, useState } from 'react';
import { motion, useIsPresent } from 'framer-motion';

const PageTransition = ({ children }) => {
  const isPresent = useIsPresent();
  const savedChildren = useRef(children);
  const [animationComplete, setAnimationComplete] = useState(false);

  if (isPresent) {
    savedChildren.current = children;
  }

  // Snappy, premium Awwwards ease
  const transitionEase = [0.76, 0, 0.24, 1];
  
  // Matching S-curve path for the bottom edge (covers top-left half)
  const curvePathBottom = "M0,100 C30,100 70,0 100,0 L0,0 Z";

  return (
    <>
      {/* The Actual Page Content */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
        style={animationComplete ? { transform: 'none', filter: 'none' } : {}}
      >
        {savedChildren.current}
      </motion.div>

      {/* --- ENTER PHASE (Wiping up to REVEAL the screen) --- */}
      {/* Layer 1: Dark Grey (Moves second to reveal page) */}
      <motion.div
        initial={{ y: "0vh" }}
        animate={{ y: "-115vh" }}
        transition={{ duration: 0.8, ease: transitionEase, delay: 0.1 }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          backgroundColor: '#222', 
          zIndex: 9998, 
          pointerEvents: 'none',
          transform: 'translateY(0)'
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '-15vh', left: 0, width: '100%', height: '15.1vh' }}>
          <path fill="#222" d={curvePathBottom} />
        </svg>
      </motion.div>

      {/* Layer 2: Black (Moves first, revealing the grey layer underneath) */}
      <motion.div
        initial={{ y: "0vh" }}
        animate={{ y: "-115vh" }}
        transition={{ duration: 0.8, ease: transitionEase, delay: 0 }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          backgroundColor: '#0a0a0a', 
          zIndex: 9999, 
          pointerEvents: 'none',
          transform: 'translateY(0)'
        }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '-15vh', left: 0, width: '100%', height: '15.1vh' }}>
          <path fill="#0a0a0a" d={curvePathBottom} />
        </svg>
      </motion.div>
    </>
  );
};

export default PageTransition;
