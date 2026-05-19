"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedGauge({ score }) {
  const radius = 140;
  const stroke = 20;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Offset formula for SVG dasharray
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#ef4444'; // Red
  let statusText = 'Urgent Attention Needed';

  if (score >= 40) {
    color = '#f59e0b'; // Amber
    statusText = 'Can Be Improved';
  }
  if (score >= 70) {
    color = '#eab308'; // Yellow
    statusText = 'Good';
  }
  if (score >= 90) {
    color = '#d1ff36'; // Neon Green
    statusText = 'Best';
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 relative">
      {/* Background Glow */}
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-[80px] pointer-events-none" 
        style={{ backgroundColor: color, opacity: 0.15 }}
      ></div>
      
      {/* Wrapper for SVG & Center Text to guarantee perfect centering */}
      <div className="relative w-full max-w-[280px] flex items-center justify-center">
        <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="w-full h-auto relative z-10 transform -rotate-90 filter drop-shadow-2xl">
          {/* Track */}
          <circle
            stroke="#1a231d"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Fill progress */}
          <motion.circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        
        {/* Inner Text content - perfectly centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <span className="text-6xl md:text-7xl font-bold tracking-tighter" style={{ color }}>{Math.round(score)}</span>
          <span className="text-neutral-400 text-xs tracking-widest uppercase mt-1">Audit Score</span>
        </div>
      </div>

      {/* Glowing Status Text below the graph */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 text-xl md:text-2xl font-bold tracking-wider uppercase text-center relative z-20"
        style={{ color, textShadow: `0 0 20px ${color}` }}
      >
        {statusText}
      </motion.div>
    </div>
  );
}
