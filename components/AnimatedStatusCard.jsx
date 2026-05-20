"use client";
import React from 'react';
import { motion } from 'framer-motion';

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { type: "spring", stiffness: 100, damping: 15 },
      opacity: { duration: 0.2 }
    }
  }
};

const crossVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { type: "spring", stiffness: 100, damping: 15 },
      opacity: { duration: 0.2 }
    }
  }
};

export default function AnimatedStatusCard({ label, value, index, light = false }) {
  const valString = String(value || '-');
  
  const isNegative = ['No', 'Slow', 'Low'].includes(valString);
  const isMedium = ['Medium'].includes(valString);
  const isPositive = ['Yes', 'Fast', 'High'].includes(valString);
  const isBooleanLike = isNegative || isMedium || isPositive;

  let dotColor = '#738480';
  if (isNegative) dotColor = '#ef4444';
  else if (isMedium) dotColor = '#eab308';
  else if (isPositive) dotColor = '#10b981';

  // Dynamic animated badge renderer
  const renderBadge = () => {
    switch (valString) {
      case 'Yes':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25 shadow-[0_2px_10px_rgba(16,185,129,0.05)]">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3.5} 
                d="M5 13l4 4L19 7"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
            <span className="font-extrabold text-xs tracking-wider uppercase">Yes</span>
          </div>
        );
      case 'No':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/25 shadow-[0_2px_10px_rgba(239,68,68,0.05)] animate-pulse">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3.5} 
                d="M6 18L18 6M6 6l12 12"
                variants={crossVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
            <span className="font-extrabold text-xs tracking-wider uppercase">No</span>
          </div>
        );
      case 'Fast':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25">
            <motion.svg 
              className="w-5 h-5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </motion.svg>
            <span className="font-extrabold text-xs tracking-wider uppercase">Fast</span>
          </div>
        );
      case 'Slow':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/25">
            <motion.svg 
              className="w-5 h-5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </motion.svg>
            <span className="font-extrabold text-xs tracking-wider uppercase">Slow</span>
          </div>
        );
      case 'High':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25">
            <motion.svg 
              className="w-5 h-5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </motion.svg>
            <span className="font-extrabold text-xs tracking-wider uppercase">High</span>
          </div>
        );
      case 'Medium':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/25">
            <motion.svg 
              className="w-5 h-5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </motion.svg>
            <span className="font-extrabold text-xs tracking-wider uppercase">Medium</span>
          </div>
        );
      case 'Low':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/25">
            <motion.svg 
              className="w-5 h-5 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
            <span className="font-extrabold text-xs tracking-wider uppercase">Low</span>
          </div>
        );
      default:
        return (
          <span className="text-xl font-bold tracking-tight text-[#192521]">
            {valString}
          </span>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white/45 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col justify-center relative overflow-hidden group hover:bg-white/55 transition-all duration-500 text-left"
    >
      <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#738480] font-bold block mb-4 relative z-10 select-none">
        {label}
      </span>
      <div className="relative z-10 flex items-center">
        {renderBadge()}
      </div>
      
      {/* Background ambient glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
        style={{ background: `radial-gradient(circle at 80% 80%, ${dotColor}0b 0%, transparent 70%)` }}
      ></div>
    </motion.div>
  );
}
