"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedStatusCard({ label, value, index, light = false }) {
  const valString = String(value || '-');
  
  const isNegative = ['No', 'Slow', 'Low'].includes(valString);
  const isMedium = ['Medium'].includes(valString);
  const isPositive = ['Yes', 'Fast', 'High'].includes(valString);
  const isBooleanLike = isNegative || isMedium || isPositive;

  let dotColor = light ? '#64748b' : '#3f3f46';
  let textColor = light ? '#1e293b' : '#ffffff';
  
  if (isNegative) { 
    dotColor = '#ef4444';
    textColor = '#ef4444';
  } else if (isMedium) { 
    dotColor = '#eab308';
    textColor = '#eab308';
  } else if (isPositive) { 
    dotColor = '#10b981';
    textColor = '#10b981';
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
      className={
        light 
          ? "bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-center relative overflow-hidden group hover:bg-neutral-50 transition-all duration-500"
          : "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-center relative overflow-hidden group hover:from-white/20 hover:to-white/10 transition-all duration-500"
      }
    >
      <span className={`text-sm font-medium mb-4 relative z-10 ${light ? 'text-neutral-500' : 'text-neutral-300'}`}>{label}</span>
      <div className="relative z-10 flex items-center">
        {isBooleanLike && (
          <div className="relative w-5 h-5 mr-3 flex items-center justify-center">
            {/* Core */}
            <div className="w-2.5 h-2.5 rounded-full relative z-10" style={{ backgroundColor: dotColor }}></div>
            
            {/* Clean Ring for light theme / Blurry glow for dark theme */}
            {light ? (
              <div className="absolute inset-[1px] rounded-full border border-current opacity-25" style={{ color: dotColor }}></div>
            ) : (
              <>
                {/* Intense Inner Glow */}
                <div className="absolute inset-0 rounded-full blur-[4px]" style={{ backgroundColor: dotColor, opacity: 0.6 }}></div>
                {/* Wide Outer Glow */}
                <div className="absolute inset-[-6px] rounded-full blur-[8px]" style={{ backgroundColor: dotColor, opacity: 0.3 }}></div>
              </>
            )}
          </div>
        )}
        <span className="text-xl font-bold tracking-wide" style={{ color: isBooleanLike ? textColor : (light ? '#1e293b' : '#ffffff') }}>
          {valString}
        </span>
      </div>
      
      {/* Background ambient glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
        style={{ background: `radial-gradient(circle at 80% 80%, ${dotColor}10 0%, transparent 70%)` }}
      ></div>
    </motion.div>
  );
}
