"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedChecklist({ metrics }) {
  return (
    <div className="flex flex-col justify-center space-y-4 py-2 h-full">
      {metrics.map((metric, i) => {
        let valString = String(metric.value || '-').trim();
        const isZero = /^0(\s|$|\/)/.test(valString);
        
        if (isZero) {
          valString = "Not Found";
        }

        const isSimpleBoolean = ['Yes', 'No', 'Fast', 'Slow', 'High', 'Low', 'Medium', '-', 'N/A'].includes(valString);
        let isPositive = ['Yes', 'Fast', 'High'].includes(valString) || /^[0-9]/.test(valString);
        
        let customBadgeClass = "";
        
        // Handle Branding Score specifics
        if (metric.label === "Branding Score" && valString !== "Not Found") {
          const scoreNum = parseFloat(valString.split('/')[0].trim());
          if (scoreNum >= 9) {
            isPositive = true;
            customBadgeClass = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
          } else if (scoreNum > 5) {
            isPositive = true;
            customBadgeClass = "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
          } else {
            isPositive = false;
            customBadgeClass = "bg-red-500/10 text-red-500 border-red-500/20";
          }
        }
        
        return (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-4 border-b border-[#192521]/10 last:border-0"
          >
            <div className="flex items-center gap-3">
              {/* Checklist Indicator Icon */}
              {isPositive ? (
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center border border-emerald-500/40 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.35)]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="relative shrink-0 w-7 h-7">
                  <div className="absolute inset-0 rounded-full bg-red-500/35 animate-ping opacity-75"></div>
                  <div className="relative w-7 h-7 rounded-full bg-red-500/25 text-red-500 flex items-center justify-center border-2 border-red-500 shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.7)]">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              )}
              
              <span className="font-bold text-sm md:text-base text-[#192521]">
                {metric.label}
              </span>
            </div>

            {/* Badge/Value on the right (Only if not simple state to keep checklist pure) */}
            <div className="shrink-0 pl-10 sm:pl-0">
              {!isSimpleBoolean && (
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-extrabold border uppercase tracking-wide font-mono text-center ${
                  customBadgeClass || (valString === "Not Found" 
                    ? "bg-red-500/10 text-red-500 border-red-500/20" 
                    : "bg-sky-500/15 text-[#0284C7] border-sky-500/20")
                }`}>
                  {valString}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
