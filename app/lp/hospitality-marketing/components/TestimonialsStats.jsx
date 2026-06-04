"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Star } from 'lucide-react';

const TestimonialsStats = () => {
  const testimonials = [
    {
      quote: "Beyond Reach transformed our Google Ads. Direct bookings are up 40% and our brand has never been stronger.",
      clientName: "The Grand Resort",
      category: "Resort",
      tag: "+40% Direct Bookings",
    },
    {
      quote: "Finally free from OTA commissions. Their Google Ads strategy is unmatched and results speak for themselves.",
      clientName: "Vitality Wellness Spa",
      category: "Wellness Retreat",
      tag: "Lower OTA Dependency",
    },
    {
      quote: "Our yacht charters are booked solid for the season through high-intent traffic and smart campaigns.",
      clientName: "Azure Charters",
      category: "Yacht Charter",
      tag: "More Enquiries",
    },
    {
      quote: "Their campaigns elevated our brand presence overnight. Incredible ROI and better occupancy across the board.",
      clientName: "Serenity Retreats",
      category: "Luxury Villa",
      tag: "Better Occupancy",
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#fafbfa] overflow-hidden border-t border-neutral-200/40 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Testimonials Title (Styled for light background) */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-brand-accent text-xs sm:text-sm font-body font-bold tracking-[0.3em] uppercase mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted By Hospitality Brands</span>
          </div>
          <h3 className="font-heading text-4xl md:text-5xl font-bold text-[#0a0e0b] uppercase">
            What Our <span className="text-brand-accent font-bold-important">Clients Say</span>
          </h3>
        </div>

        {/* Testimonials Grid (White background styled cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white border-2 border-[#c1781f]/35 p-6 rounded-2xl flex flex-col justify-between hover:border-[#c1781f]/75 hover:shadow-[0_12px_40px_rgba(193,120,31,0.08)] transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-amber-400 text-amber-400" 
                      />
                    ))}
                  </div>
                  <div className="text-brand-accent">
                    <Quote className="w-6 h-6 opacity-25 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <p className="font-body text-[15px] md:text-base text-neutral-700 leading-[1.7] mb-6 font-normal">
                  "{test.quote}"
                </p>
              </div>

              <div>
                <div className="border-t border-neutral-100 pt-4 mb-4">
                  <h4 className="font-heading text-lg font-bold text-[#0a0e0b] uppercase leading-none mb-1">
                    {test.clientName}
                  </h4>
                  <span className="font-body text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                    {test.category}
                  </span>
                </div>
                
                {/* Copper Premium Tag */}
                <div className="inline-block bg-brand-accent/5 border border-brand-accent/20 px-3.5 py-1 rounded-full">
                  <span className="font-body text-[10px] text-brand-accent font-semibold tracking-wider uppercase font-bold-important">
                    {test.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsStats;
