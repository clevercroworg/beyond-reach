"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, EyeOff, Monitor, Image, Percent } from 'lucide-react';

const HexagonIcon = ({ icon: IconComponent }) => {
  return (
    <div className="relative w-14 h-16 flex items-center justify-center">
      {/* Custom SVG Hexagon with a thin border and dark background fill */}
      <svg 
        viewBox="0 0 52 60" 
        className="absolute inset-0 w-full h-full text-brand-accent fill-brand-dark"
      >
        <polygon 
          points="26,2 49,15 49,45 26,58 3,45 3,15" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
      </svg>
      {/* Icon placed inside the hexagon */}
      <div className="relative z-10 text-brand-accent">
        <IconComponent className="w-5 h-5 stroke-[1.8]" />
      </div>
    </div>
  );
};

const ProblemSection = () => {
  const problems = [
    {
      id: 1,
      titleLine1: "Low Direct",
      titleLine2: "Enquiries",
      desc: "Most properties rely too heavily on costly OTAs and paid channels for bookings.",
      icon: TrendingUp,
    },
    {
      id: 2,
      titleLine1: "High Dependency",
      titleLine2: "on OTAs",
      desc: "High commission rates eat into margins, limiting your direct booking growth.",
      icon: Globe,
    },
    {
      id: 3,
      titleLine1: "Poor Online",
      titleLine2: "Visibility",
      desc: "Your property gets completely buried in a sea of sameness and competition.",
      icon: EyeOff,
    },
    {
      id: 4,
      titleLine1: "Inefficient",
      titleLine2: "Enquiry Flow",
      desc: "Leads drop off quickly due to slow manual responses and unclear booking steps.",
      icon: Monitor,
    },
    {
      id: 5,
      titleLine1: "Low Quality",
      titleLine2: "Content",
      desc: "Average photos and generic messaging fail to showcase the true value of stays.",
      icon: Image,
    },
    {
      id: 6,
      titleLine1: "Low Website",
      titleLine2: "Conversion",
      desc: "Web visitors leave without converting into enquiries or direct booking guests.",
      icon: Percent,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="relative py-20 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40">
      <div className="max-w-[95rem] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 px-4">
          <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3.5 uppercase tracking-wide leading-tight font-bold-important">
            Your Property May Be Good.
          </h3>
          <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-accent uppercase tracking-wide leading-[1.15] sm:leading-tight font-bold-important">
            But Is Your Booking Flow Good Enough?
          </h3>
        </div>

        {/* Problems Grid - 6 columns side-by-side on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-8">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="group relative bg-brand-card/90 border border-brand-border/60 hover:border-brand-accent/40 rounded-2xl pt-10 pb-8 px-4 text-center flex flex-col justify-center items-center transition-all duration-500 hover:translate-y-[-4px] min-h-[160px] w-full"
            >
              {/* Overlapping Hexagon Badge on Top border */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-110">
                <HexagonIcon icon={problem.icon} />
              </div>

              {/* Title Stacked */}
              <h4 className="font-heading text-[32px] sm:text-[34px] font-bold text-white uppercase tracking-wider leading-none flex flex-col justify-center mt-3 font-bold-important">
                <span>{problem.titleLine1}</span>
                <span className="text-brand-accent font-bold-important">{problem.titleLine2}</span>
              </h4>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ProblemSection;
