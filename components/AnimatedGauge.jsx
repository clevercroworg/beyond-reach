"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedGauge({ score, light = false }) {
  const radius = 140;
  const stroke = 20;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Offset formula for SVG dasharray - Always calculate out of 100 visually
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = '#ef4444'; // Red
  let statusText = 'Urgent Attention Needed';

  if (score >= 50) {
    color = '#f59e0b'; // Amber
    statusText = 'Can Be Improved';
  }
  if (score >= 65) {
    color = '#eab308'; // Yellow
    statusText = 'Good';
  }
  if (score >= 70) {
    color = light ? '#0284c7' : '#00d2ff'; // Sky Blue or Electric Blue
    statusText = 'Best';
  }

  return (
    <div className="flex flex-col items-center justify-center py-1 relative">
      {/* Background Glow */}
      <div 
        className="absolute w-[180px] h-[180px] rounded-full blur-[80px] pointer-events-none" 
        style={{ backgroundColor: color, opacity: light ? 0.05 : 0.15 }}
      ></div>
      
      {/* Wrapper for SVG & Center Text to guarantee perfect centering */}
      <div className="relative w-[140px] h-[140px] flex items-center justify-center">
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
          <span className="text-4xl font-extrabold tracking-tighter" style={{ color: light ? '#111827' : color }}>{Math.round(score)}</span>
          <span className={`text-[9px] tracking-widest uppercase mt-0.5 ${light ? 'text-neutral-500 font-bold' : 'text-neutral-400'}`}>Audit Score</span>
        </div>
      </div>

      {/* Glowing Status Text below the graph */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-3 text-xs md:text-sm font-extrabold tracking-wider uppercase text-center relative z-20"
        style={{ color, textShadow: light ? 'none' : `0 0 20px ${color}` }}
      >
        {statusText}
      </motion.div>
    </div>
  );
}
