"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedGauge({ score, light = false }) {
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
    color = light ? '#0284c7' : '#00d2ff'; // Sky Blue or Electric Blue
    statusText = 'Best';
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-10 relative">
      {/* Background Glow */}
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-[80px] pointer-events-none" 
        style={{ backgroundColor: color, opacity: light ? 0.05 : 0.15 }}
      ></div>
      
      {/* Wrapper for SVG & Center Text to guarantee perfect centering */}
      <div className="relative w-full max-w-[160px] md:max-w-[250px] flex items-center justify-center">
        <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className={`w-full h-auto relative z-10 transform -rotate-90 ${light ? '' : 'filter drop-shadow-2xl'}`}>
          {/* Track */}
          <circle
            stroke={light ? "#e2e8f0" : "#1e293b"}
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
          <span className="text-3xl md:text-6xl font-bold tracking-tighter" style={{ color: light ? '#111827' : color }}>{Math.round(score)}</span>
          <span className={`text-[8px] md:text-xs tracking-widest uppercase mt-0.5 md:mt-1 ${light ? 'text-neutral-500 font-medium' : 'text-neutral-400'}`}>Audit Score</span>
        </div>
      </div>

      {/* Glowing Status Text below the graph */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-4 md:mt-8 text-xs md:text-xl font-bold tracking-wider uppercase text-center relative z-20"
        style={{ color, textShadow: light ? 'none' : `0 0 20px ${color}` }}
      >
        {statusText}
      </motion.div>
    </div>
  );
}
