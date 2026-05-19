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
  if (score >= 50) color = '#eab308'; // Yellow
  if (score >= 75) color = '#d1ff36'; // Green

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      {/* Background Glow */}
      <div 
        className="absolute w-[250px] h-[250px] rounded-full blur-[80px] pointer-events-none" 
        style={{ backgroundColor: color, opacity: 0.15 }}
      ></div>
      
      <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="w-full max-w-[280px] h-auto relative z-10 transform -rotate-90 filter drop-shadow-2xl">
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
          style={{ strokeDashoffset: circumference }} // start empty
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
      
      {/* Inner Text content */}
      <div className="absolute flex flex-col items-center justify-center z-20">
        <span className="text-7xl font-bold tracking-tighter" style={{ color }}>{Math.round(score)}</span>
        <span className="text-neutral-400 text-xs tracking-widest uppercase mt-2">Audit Score</span>
      </div>
    </div>
  );
}
