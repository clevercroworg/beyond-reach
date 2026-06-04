"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Sparkles, ShieldCheck } from 'lucide-react';

const WhyExperience = () => {
  const differentiators = [
    {
      title: "Hospitality-First Thinking",
      desc: "Deep understanding of stays, guest intent, location demand, seasonality, and booking hesitation.",
      icon: Target
    },
    {
      title: "Direct Booking Focus",
      desc: "Performance-driven campaigns designed to slash OTA commission costs and maximize your direct yield.",
      icon: Users
    },
    {
      title: "Premium Content Production",
      desc: "Elite cinematic video, high-end photography direction, and ads crafted specifically to convert.",
      icon: Sparkles
    },
    {
      title: "End-to-End Execution",
      desc: "Full campaign management, tracking setups, and transparent reporting from certified strategists.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="why-beyond-reach" className="py-24 px-6 bg-brand-card/25 relative overflow-hidden border-t border-brand-border/40">
      
      {/* Premium back glow */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Minimalist Differentiators Grid (Col Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-body text-xs md:text-sm tracking-[0.3em] text-brand-accent mb-3 font-bold uppercase block">
              Why Choose Us
            </span>
            <h3 className="font-heading text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] xl:text-[54px] font-bold text-white mb-6 uppercase leading-[1.1] tracking-[0.02em] font-bold-important">
              Results Driven. <br/>
              Hospitality Focused. <br/>
              <span className="text-brand-accent font-bold-important">Growth Oriented.</span>
            </h3>
            
            <p className="font-body text-[15.8px] md:text-[16px] text-neutral-400 max-w-xl mb-10 leading-[1.7] font-normal">
              Beyond Reach is engineered exclusively for hospitality growth, not generic marketing. We understand stays, guest behavior, and what triggers direct bookings.
            </p>

            {/* Differentiators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {differentiators.map((diff, index) => {
                const IconComponent = diff.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex flex-col items-start gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="font-heading text-[22px] sm:text-[24px] md:text-[26px] font-bold text-white uppercase tracking-[0.02em] mb-2 font-bold-important">
                        {diff.title}
                      </h4>
                      <p className="font-body text-[13px] md:text-[14.7px] text-neutral-400 leading-[1.6] font-normal">
                        {diff.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Elite Tall Lobby Visual Panel (Col Span 5) - Lengthy frame as requested */}
          <div className="lg:col-span-5 w-full flex items-stretch">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] group"
            >
              {/* Tall Lobby Image */}
              <img 
                src="/lp/hospitality/luxury_lobby.png" 
                alt="Luxury Hotel Guest Room Experience" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Warm copper radial overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0b]/95 via-[#0a0e0b]/20 to-transparent"></div>
              
              {/* Premium Floating Badge inside the image */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0a0e0b]/85 border border-[#c1781f]/20 p-5 rounded-xl backdrop-blur-md">
                <h4 className="font-heading text-lg font-bold text-white uppercase leading-none mb-1.5">
                  Driven by <span className="text-brand-accent font-bold-important">Data & Insights</span>
                </h4>
                <p className="font-body text-[11px] text-neutral-400 leading-relaxed font-normal">
                  We focus exclusively on direct bookings, higher margins, and measurable growth.
                </p>
              </div>

              {/* Glowing copper framing border */}
              <div className="absolute inset-0 border border-brand-accent/20 rounded-2xl pointer-events-none group-hover:border-brand-accent/40 transition-colors duration-500"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyExperience;
