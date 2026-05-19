"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AuditBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0a0e0b]">
      {/* 1. Subtle Engineering Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 20%, black 80%, transparent 95%)',
          maskImage: 'linear-gradient(to bottom, transparent 5%, black 20%, black 80%, transparent 95%)'
        }}
      />
      
      {/* 2. Abstract Ambient Aurora Orbs */}
      {/* Green Orb */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#d1ff36] rounded-full mix-blend-screen filter blur-[150px] opacity-20"
        style={{ willChange: 'transform' }}
      />
      
      {/* Blue Orb */}
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[-5%] w-[45vw] h-[45vw] bg-[#0ea5e9] rounded-full mix-blend-screen filter blur-[160px] opacity-[0.15]"
        style={{ willChange: 'transform' }}
      />

      {/* Yellow Orb */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 100, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] bg-[#eab308] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.12]"
        style={{ willChange: 'transform' }}
      />

      {/* 3. Subtle Floating Data Particles (Reduced count for perf) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -50, 0], opacity: [0, 0.6, 0] }}
          transition={{
            duration: Math.random() * 5 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          className="absolute w-1 h-1 rounded-full bg-[#d1ff36] shadow-[0_0_10px_#d1ff36]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
      
      {/* 4. Film Grain Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
}
