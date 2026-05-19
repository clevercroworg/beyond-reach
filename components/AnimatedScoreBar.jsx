"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedScoreBar({ score, max = 100, label, inverseColors = false, light = false, hideMax = false }) {
  const numScore = Number(score) || 0;
  const percentage = Math.min(100, Math.max(0, (numScore / max) * 100));
  
  // Default: Higher is better (Blue -> Yellow -> Red)
  let color = light ? '#0284c7' : '#00d2ff'; // Sky Blue or Electric Blue
  let shadow = light ? 'rgba(2, 132, 199, 0.2)' : 'rgba(0, 210, 255, 0.5)';
  
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
      color = light ? '#0284c7' : '#00d2ff';
      shadow = light ? 'rgba(2, 132, 199, 0.2)' : 'rgba(0, 210, 255, 0.5)';
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
        <span className={`${light ? 'text-neutral-500' : 'text-neutral-400'} font-medium`}>{label}</span>
        <span className="text-4xl font-bold tracking-tight" style={{ color }}>
          {numScore}{!hideMax && <span className={`text-xl ${light ? 'text-neutral-400' : 'text-neutral-600'} font-normal`}>/{max}</span>}
        </span>
      </div>
      <div className={`h-4 rounded-full overflow-hidden relative shadow-inner ${light ? 'bg-neutral-200' : 'bg-[#1e293b]'}`}>
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: light ? 'none' : `0 0 15px ${shadow}` }}
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}
