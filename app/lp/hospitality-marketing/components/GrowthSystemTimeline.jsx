"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sliders, Layout, Megaphone, LineChart } from 'lucide-react';

const GrowthSystemTimeline = () => {
  const steps = [
    {
      title: "Discover",
      desc: "We understand your property, audience, and goals.",
      icon: Search,
    },
    {
      title: "Strategize",
      desc: "We craft a tailored growth strategy focused on direct enquiries & bookings.",
      icon: Sliders,
    },
    {
      title: "Optimize & Create",
      desc: "We optimize your digital assets and create high impact content.",
      icon: Layout,
    },
    {
      title: "Attract & Convert",
      desc: "We drive qualified traffic and convert visitors into enquiries.",
      icon: Megaphone,
    },
    {
      title: "Nurture & Grow",
      desc: "We manage follow-ups and optimize performance for continuous growth.",
      icon: LineChart,
    },
  ];

  return (
    <section id="our-process" className="py-24 px-6 bg-white relative overflow-hidden border-t border-neutral-200/50">
      {/* Background soft blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="font-heading text-[15px] md:text-[16px] tracking-[0.08em] text-brand-accent mb-3.5 font-bold uppercase block">
            Our Proven System
          </span>
          <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a0e0b] uppercase leading-tight tracking-[0.015em]" style={{ wordSpacing: '0.06em' }}>
            From Brand Presence to <span className="text-brand-accent">Booking Growth</span>
          </h3>
          <p className="font-body text-base md:text-lg text-neutral-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            We do not start with ads alone. First, we understand your property, location demand, guest type, booking capacity and current online assets. Then we build the right growth path across visibility, content, campaigns, lead tracking and booking flow.
          </p>
        </div>

        {/* Steps Horizontal Workflow (Desktop) / Vertical (Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative">
          
          {/* Background horizontal dashed line for Desktop */}
          <div className="hidden lg:block absolute top-[32px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-neutral-200 z-0"></div>

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center relative z-10 group"
              >
                {/* Connecting Line for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-[64px] left-1/2 -translate-x-1/2 w-[1px] h-[calc(100%+32px)] border-l border-dashed border-neutral-200 z-0"></div>
                )}

                {/* Circle Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-white border border-brand-accent group-hover:border-brand-dark flex items-center justify-center text-brand-dark group-hover:text-brand-accent transition-all duration-300 shadow-sm mb-6 relative z-10 group-hover:scale-110">
                  <IconComponent className="w-6 h-6 stroke-[1.4]" />
                </div>

                {/* Step Content */}
                <div className="px-4">
                  <h4 className="font-heading text-xl font-bold text-[#0a0e0b] uppercase tracking-wider mb-2.5 transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="font-body text-xs text-neutral-500 leading-relaxed max-w-[240px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default GrowthSystemTimeline;
