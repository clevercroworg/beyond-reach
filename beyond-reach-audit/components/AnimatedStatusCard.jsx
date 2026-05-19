"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedStatusCard({ label, value, index }) {
  const valString = String(value || '-');
  
  const isNegative = ['No', 'Slow', 'Low'].includes(valString);
  const isMedium = ['Medium'].includes(valString);
  const isPositive = ['Yes', 'Fast', 'High'].includes(valString);

  let icon = null;
  let bgClass = "bg-neutral-800 text-neutral-300 border-neutral-700";
  let dotColor = '#3f3f46';
  
  if (isNegative) { 
    bgClass = "bg-red-500/10 text-red-400 border-red-500/20";
    dotColor = '#ef4444';
    icon = (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  } else if (isMedium) { 
    bgClass = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    dotColor = '#eab308';
    icon = (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  } else if (isPositive) { 
    bgClass = "bg-[#d1ff36]/10 text-[#d1ff36] border-[#d1ff36]/20";
    dotColor = '#d1ff36';
    icon = (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  // Blinking animation for negative elements
  const pulseAnimation = isNegative 
    ? { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } 
    : {};

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10 flex flex-col justify-center relative overflow-hidden group hover:bg-white/10 transition-colors duration-300"
    >
      <span className="text-sm text-neutral-400 mb-3 relative z-10">{label}</span>
      <div className="relative z-10 flex items-center">
        <motion.div 
          animate={pulseAnimation}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${bgClass}`}
        >
          {icon}
          {valString}
        </motion.div>
      </div>
      
      {/* Background ambient glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
        style={{ backgroundColor: dotColor }}
      ></div>
    </motion.div>
  );
}
