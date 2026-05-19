"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedStatusCard({ label, value, index }) {
  const valString = String(value || '-');
  
  const isNegative = ['No', 'Slow', 'Low'].includes(valString);
  const isMedium = ['Medium'].includes(valString);
  const isPositive = ['Yes', 'Fast', 'High'].includes(valString);
  const isBooleanLike = isNegative || isMedium || isPositive;

  let dotColor = '#3f3f46';
  let textColor = '#ffffff';
  
  if (isNegative) { 
    dotColor = '#ef4444';
    textColor = '#ef4444';
  } else if (isMedium) { 
    dotColor = '#eab308';
    textColor = '#eab308';
  } else if (isPositive) { 
    dotColor = '#d1ff36';
    textColor = '#d1ff36';
  }

  const pulseAnimation = isBooleanLike 
    ? { scale: [1, 2], opacity: [0.8, 0] } 
    : {};

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-center relative overflow-hidden group hover:from-white/20 hover:to-white/10 transition-all duration-500"
    >
      <span className="text-sm font-medium text-neutral-300 mb-4 relative z-10">{label}</span>
      <div className="relative z-10 flex items-center">
        {isBooleanLike && (
          <div className="relative w-5 h-5 mr-3 flex items-center justify-center">
            {/* Core */}
            <div className="w-3 h-3 rounded-full relative z-10 shadow-sm" style={{ backgroundColor: dotColor }}></div>
            {/* Intense Inner Glow */}
            <div className="absolute inset-0 rounded-full blur-[4px]" style={{ backgroundColor: dotColor, opacity: 0.9 }}></div>
            {/* Wide Outer Glow */}
            <div className="absolute inset-[-6px] rounded-full blur-[8px]" style={{ backgroundColor: dotColor, opacity: 0.5 }}></div>
          </div>
        )}
        <span className="text-xl font-bold tracking-wide" style={{ color: isBooleanLike ? textColor : '#ffffff' }}>
          {valString}
        </span>
      </div>
      
      {/* Background ambient glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
        style={{ background: `radial-gradient(circle at 80% 80%, ${dotColor}20 0%, transparent 70%)` }}
      ></div>
    </motion.div>
  );
}
