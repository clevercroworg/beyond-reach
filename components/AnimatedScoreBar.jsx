"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedScoreBar({ score, max = 100, label, inverseColors = false }) {
  const numScore = Number(score) || 0;
  const percentage = Math.min(100, Math.max(0, (numScore / max) * 100));
  
  // Default: Higher is better (Green -> Yellow -> Red)
  let color = '#d1ff36'; // Green
  let shadow = 'rgba(209, 255, 54, 0.5)';
  
  if (percentage < 50) {
    color = '#ef4444'; // Red
    shadow = 'rgba(239, 68, 68, 0.5)';
  } else if (percentage < 75) {
    color = '#eab308'; // Yellow
    shadow = 'rgba(234, 179, 8, 0.5)';
  }

  // If inverseColors is true: Higher is worse (e.g. competitor score)
  if (inverseColors) {
    if (percentage < 50) {
      color = '#d1ff36';
      shadow = 'rgba(209, 255, 54, 0.5)';
    } else if (percentage < 75) {
      color = '#eab308';
      shadow = 'rgba(234, 179, 8, 0.5)';
    } else {
      color = '#ef4444';
      shadow = 'rgba(239, 68, 68, 0.5)';
    }
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-neutral-400 font-medium">{label}</span>
        <span className="text-4xl font-bold tracking-tight" style={{ color }}>
          {numScore}<span className="text-xl text-neutral-600 font-normal">/{max}</span>
        </span>
      </div>
      <div className="h-4 bg-[#1a231d] rounded-full overflow-hidden relative shadow-inner">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 15px ${shadow}` }}
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}
