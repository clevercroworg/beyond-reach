"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Play, 
  X, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Coins,
  Cpu
} from 'lucide-react';
import { projectsDetails } from '../data/projectDetails';

export default function ProjectDetailsPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const project = projectsDetails[id] || projectsDetails["riva-beach-resort"];
  
  const [activeVideo, setActiveVideo] = useState(null);

  // Helper to color work pills based on tag name
  const getTagColor = (tag) => {
    const t = tag.toUpperCase();
    if (t.includes("BRANDING")) return "bg-[#e0f2fe]/10 text-[#38bdf8] border-[#bae6fd]/20";
    if (t.includes("STRATEGY")) return "bg-[#faf5ff]/10 text-[#c084fc] border-[#f3e8ff]/20";
    if (t.includes("SEO")) return "bg-[#ecfdf5]/10 text-[#34d399] border-[#d1fae5]/20";
    if (t.includes("WEBSITES") || t.includes("DEV") || t.includes("UXI")) return "bg-[#fef3c7]/10 text-[#fbbf24] border-[#fde68a]/20";
    if (t.includes("ADS") || t.includes("GOOGLE") || t.includes("META")) return "bg-[#fdf2f8]/10 text-[#f472b6] border-[#fce7f3]/20";
    return "bg-neutral-800/40 text-neutral-400 border-neutral-700/30";
  };

  return (
    <main 
      className="min-h-screen bg-brand-dark text-white selection:bg-[#8ea800]/30 relative overflow-x-hidden font-body"
      style={{ 
        '--color-brand-accent': '#8ea800', 
        '--color-brand-border': '#2a332d', 
        '--color-brand-card': '#131915' 
      }}
    >
      {/* Background Soft Gradients */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#8ea800]/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#8ea800]/3 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* HERO SECTION: Compact Full-Bleed Hero Image + Transparent Header */}
      <section className="relative min-h-[380px] lg:min-h-[440px] flex flex-col justify-between overflow-hidden bg-brand-dark border-b border-neutral-800/30">
        
        {/* Desktop Background Image (Covering the right 70% from top to bottom) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[70%] z-0 lg:block hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays to blend into the left column's solid black background */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent w-[30%]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
        </div>

        {/* Mobile Background Fallback (Covering full screen) */}
        <div className="absolute inset-0 z-0 lg:hidden block">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/65 to-transparent"></div>
        </div>

        {/* Top Header Bar (Transparent background, full width max-w-[95rem]) */}
        <header className="relative z-20 w-full max-w-[95rem] mx-auto px-6 lg:px-12 py-6 flex justify-between items-center bg-transparent">
          {/* Logo Branding */}
          <Link href="/lp/hospitality-marketing" className="flex items-center gap-2 transition-transform hover:scale-101 active:scale-98">
            <span className="font-heading font-black text-2xl tracking-[0.05em] text-white">
              BEYOND <span className="text-[#8ea800]">REACH</span>
            </span>
          </Link>

          {/* Right Back button (simplified) */}
          <Link 
            href="/lp/hospitality-marketing#portfolio" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-[#8ea800] transition-colors group font-semibold uppercase tracking-wider text-xs bg-[#131915]/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </Link>
        </header>

        {/* Main Split Grid (Content Left, Results Card Right) */}
        <div className="relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 items-center lg:items-start lg:pt-14 max-w-[95rem] w-full mx-auto px-6 lg:px-12 py-8 lg:py-0">
          
          {/* Left side: Heading, Specs, Tags */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-left lg:pr-12 space-y-4">
            <div className="space-y-2">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[3.2rem] text-white uppercase hero-heading leading-[1.1] tracking-wide">
                Growth Story Of <br className="lg:hidden" />{" "}
                <span className="text-[#8ea800]">{project.title}</span>
              </h1>
              <p className="font-body text-sm sm:text-base text-white max-w-xl font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Specifications and Tags Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl pt-1">
              
              {/* Specifications Card */}
              <div className="bg-[#131915]/80 backdrop-blur-md border border-[#2a332d] rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">SPECIFICATIONS</h4>
                <div className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-neutral-800/40 pb-2 gap-1 sm:gap-4">
                    <span className="text-neutral-500 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">Capacity</span>
                    <span className="font-bold text-white text-xs sm:text-[11px] lg:text-[11px] xl:text-xs sm:text-right sm:whitespace-nowrap">
                      {project.propertySpecs.capacity}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
                    <span className="text-neutral-500 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">Commission</span>
                    <span className="font-bold text-[#8ea800] text-xs sm:text-[11px] lg:text-[11px] xl:text-xs sm:text-right sm:whitespace-nowrap">
                      {project.propertySpecs.commission}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags Card */}
              <div className="bg-[#131915]/80 backdrop-blur-md border border-[#2a332d] rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400">PROJECT ACTIONS</h4>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`px-2 py-0.5 border rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Results Card Overlay */}
          <div className="lg:col-span-5 w-full lg:pl-6 pt-8 lg:pt-0 pb-6 lg:pb-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#131915]/95 border border-[#2a332d] rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#8ea800]">
                    RESULTS THAT COMPOUND
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide mt-0.5">
                    Direct Bookings Increase
                  </h3>
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-heading font-black text-[#8ea800]">
                    {project.headline.split(' ')[0]}
                  </span>
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-heading">
                    {project.headline.split(' ').slice(1).join(' ')}
                  </span>
                </div>

                {/* Custom SVG line chart */}
                <div className="h-14 w-full pt-1">
                  <svg className="w-full h-full" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8ea800" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8ea800" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 2 22 Q 35 18, 65 11 T 98 3" 
                      fill="none" 
                      stroke="#8ea800" 
                      strokeWidth="1.5" 
                    />
                    <path 
                      d="M 2 22 Q 35 18, 65 11 T 98 3 L 98 25 L 2 25 Z" 
                      fill="url(#chartGlow)" 
                    />
                  </svg>
                </div>
                
                <div className="flex justify-between items-center text-xs text-neutral-500 font-bold uppercase tracking-wider">
                  <span>Baseline</span>
                  <span>Direct Optimization (90 Days)</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Spacer */}
        <div className="relative z-10 w-full h-6"></div>
      </section>

      {/* LOGOS INTEGRATIONS MARQUEE */}
      <section className="border-b border-neutral-800/40 py-5 overflow-hidden relative">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {["Google Ads", "Meta Ads", "Hotel Websites", "SEO Optimization", "Booking Flow Automation", "Lead Tracking System"].map((service, index) => (
            <div key={index} className="flex items-center gap-2 text-neutral-500 font-semibold tracking-wider text-xs uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8ea800]" />
              <span>{service}</span>
            </div>
          ))}
          {["Google Ads", "Meta Ads", "Hotel Websites", "SEO Optimization", "Booking Flow Automation", "Lead Tracking System"].map((service, index) => (
            <div key={index + 10} className="flex items-center gap-2 text-neutral-500 font-semibold tracking-wider text-xs uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8ea800]" />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT AREA: Spacious layout with max-w-[95rem], tighter paddings */}
      <div className="max-w-[95rem] mx-auto px-6 lg:px-12 py-14 space-y-16 lg:space-y-20 relative z-10">

        {/* THE PROBLEM SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Title */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ea800]">
              THE PROBLEM
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase leading-[1.15] text-white">
              WHY HOTELS <br />
              LOSE DIRECT <br />
              BOOKINGS.
            </h2>
          </div>

          {/* 3 Dark Bento Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131915] border border-[#2a332d] rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#8ea800]/40 transition-colors duration-300">
              <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 w-fit">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-white uppercase tracking-wider text-sm sm:text-base">
                POOR WEBSITE EXPERIENCE
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Slow page speeds and friction-filled checkout paths frustrate guests, sending them back to OTA directories.
              </p>
            </div>

            <div className="bg-[#131915] border border-[#2a332d] rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#8ea800]/40 transition-colors duration-300">
              <div className="p-2.5 bg-[#fbbf24]/10 rounded-xl border border-[#fbbf24]/20 text-[#fbbf24] w-fit">
                <Coins className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-white uppercase tracking-wider text-sm sm:text-base">
                HIGH OTA DEPENDENCY
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                High distributor commissions (15% to 25%) eat room margins, while hotels lose direct guest relationships.
              </p>
            </div>

            <div className="bg-[#131915] border border-[#2a332d] rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#8ea800]/40 transition-colors duration-300">
              <div className="p-2.5 bg-[#c084fc]/10 rounded-xl border border-[#c084fc]/20 text-[#c084fc] w-fit">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-heading font-bold text-white uppercase tracking-wider text-sm sm:text-base">
                LEAKY INQUIRY FLOW
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Unstructured email, phone, or website inquiries drop off because of slow or inconsistent follow-ups.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE IMPROVED SECTION */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ea800]">
              OUR SOLUTION
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              WHAT WE IMPROVE.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-neutral-800/40 border-t border-b border-neutral-800/40 py-6">
            <div className="space-y-2 pb-4 md:pb-0">
              <h4 className="font-heading font-bold text-white tracking-wider text-sm sm:text-base uppercase">
                HIGH-CONVERTING WEBSITES
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Built for speed, mobile compatibility, and clear room parity widgets to encourage direct checkouts.
              </p>
            </div>
            <div className="space-y-2 pt-4 md:pt-0 lg:pl-8 pb-4 lg:pb-0">
              <h4 className="font-heading font-bold text-white tracking-wider text-sm sm:text-base uppercase">
                AD STRATEGY & PERFORMANCE
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Targeted search keywords and social campaigns designed to drive direct booking clicks at a lower CAC.
              </p>
            </div>
            <div className="space-y-2 pt-4 md:pt-0 lg:pl-8 pb-4 lg:pb-0">
              <h4 className="font-heading font-bold text-white tracking-wider text-sm sm:text-base uppercase">
                BOOKING FLOW AUTOMATION
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Streamlined inquiry capture forms linked to direct follow-up automations to close booking opportunities.
              </p>
            </div>
            <div className="space-y-2 pt-4 md:pt-0 lg:pl-8">
              <h4 className="font-heading font-bold text-white tracking-wider text-sm sm:text-base uppercase">
                TRACKING & ATTRIBUTION
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Clean direct performance tracking systems that map actual conversions and reduce useless ad budget spend.
              </p>
            </div>
          </div>
        </section>

        {/* DYNAMIC STORY INSIGHTS & GALLERY */}
        {project.insights && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-neutral-800/40 pb-12">
            
            {/* Left storytelling details (Col span 7) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ea800]">
                PROJECT STORY
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase leading-[1.15] text-white">
                PROJECT INSIGHTS & <br />
                DIAGNOSTICS.
              </h2>
              
              <div className="space-y-5 pt-2">
                <div className="flex gap-3">
                  <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 shrink-0 h-fit">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-black tracking-wider text-neutral-400 mb-0.5">THE CASE CHALLENGE</h5>
                    <p className="text-sm sm:text-base text-white font-light leading-relaxed">{project.insights.challenge}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 bg-[#8ea800]/10 rounded-xl border border-[#8ea800]/20 text-[#8ea800] shrink-0 h-fit">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-black tracking-wider text-neutral-400 mb-0.5">THE STRATEGIC WORK</h5>
                    <p className="text-sm sm:text-base text-white font-light leading-relaxed">{project.insights.solution}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 bg-[#10b981]/10 rounded-xl border border-[#10b981]/20 text-[#10b981] shrink-0 h-fit">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-black tracking-wider text-[#8ea800] mb-0.5">THE ACTUAL IMPACT</h5>
                    <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">{project.insights.impact}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Gallery (Col span 5) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4 pt-6 lg:pt-0">
              {project.insights.gallery.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#2a332d] shadow-lg group hover:border-[#8ea800]/40 transition-all duration-300"
                >
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} gallery detail`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0b]/55 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

          </section>
        )}

        {/* PROCESS FLOW TIMELINE */}
        <section className="space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ea800]">
              OUR PROCESS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              A SIMPLE GROWTH PROCESS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2 relative">
              <span className="text-[#8ea800] font-heading text-3xl font-extrabold block">01</span>
              <h4 className="font-heading font-bold text-white uppercase text-sm sm:text-base tracking-wide">
                DISCOVER & AUDIT
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Diagnose baseline reservation channels, page load speed friction, and parity leaks.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[#8ea800] font-heading text-3xl font-extrabold block">02</span>
              <h4 className="font-heading font-bold text-white uppercase text-sm sm:text-base tracking-wide">
                STRATEGY & PLAN
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Establish direct rate parity comparison systems and design a custom campaign architecture.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[#8ea800] font-heading text-3xl font-extrabold block">03</span>
              <h4 className="font-heading font-bold text-white uppercase text-sm sm:text-base tracking-wide">
                BUILD & EXECUTE
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Deploy high-speed booking funnels and launch target Google Search & Meta PPC ads.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[#8ea800] font-heading text-4xl font-extrabold block">04</span>
              <h4 className="font-heading font-bold text-white uppercase text-sm sm:text-base tracking-wide">
                OPTIMIZE & SCALE
              </h4>
              <p className="text-sm sm:text-base text-white font-light leading-relaxed">
                Continuously test audience conversions, refine budget share allocation, and boost direct margins.
              </p>
            </div>
          </div>
        </section>

        {/* REAL-TIME INSIGHTS (PERFORMANCE DASHBOARD WIDGET) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-neutral-800/40 pt-12">
          
          {/* Left stats text (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ea800]">
                REAL-TIME INSIGHTS
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase leading-[1.15] text-white">
                SEE WHAT <br />
                DRIVES YOUR <br />
                GROWTH.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-white font-light leading-relaxed max-w-sm">
              We deploy custom direct-booking tracking dashboards that unmask actual attribution and eliminate useless aggregator expenditures.
            </p>
            <Link 
              href="/lp/hospitality-marketing#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8ea800] hover:bg-white text-brand-dark font-heading text-xs font-black tracking-widest uppercase rounded-full shadow-lg shadow-[#8ea800]/10 transition-all duration-300"
            >
              <span>EXPLORE DIRECT SYSTEM</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-dark" />
            </Link>
          </div>

          {/* Right Dashboard Widget (Col span 8) */}
          <div className="lg:col-span-8 w-full">
            <div className="bg-[#131915] border border-[#2a332d] rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-800/40">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  Direct Booking Performance Dashboard
                </span>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>

              {/* Vitals row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Direct Bookings</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-heading font-black text-white">1,248</span>
                    <span className="text-xs font-extrabold text-[#10b981]">+23%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Ad Attributed Sales</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-heading font-black text-[#8ea800]">{project.vitals[1].value}</span>
                    <span className="text-xs font-extrabold text-[#10b981]">+31%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">Conversion Rate</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-heading font-black text-white">{project.auditResults.healthScores.conversion / 25}%</span>
                    <span className="text-xs font-extrabold text-red-500">-12%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">OTA Commission Saved</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-heading font-black text-white">{project.vitals[3].value}</span>
                    <span className="text-xs font-extrabold text-[#10b981]">+16%</span>
                  </div>
                </div>
              </div>

              {/* Grid: SVG chart & channels circle */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                
                {/* SVG Performance graph */}
                <div className="md:col-span-7 space-y-1">
                  <span className="text-xs font-black uppercase text-neutral-400 tracking-wider">
                    Direct Booking Compound Line
                  </span>
                  <div className="h-36 bg-[#0a0e0b] border border-neutral-800/80 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="h-full w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="dashboardChartGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8ea800" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#8ea800" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Area Fill Path */}
                        <motion.path 
                          d="M 30 165 C 80 160, 100 150, 140 145 C 180 140, 210 125, 250 115 C 290 105, 320 85, 360 75 C 400 65, 430 40, 470 30 L 470 190 L 30 190 Z"
                          fill="url(#dashboardChartGlow)"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                        {/* Line Stroke Path */}
                        <motion.path 
                          d="M 30 165 C 80 160, 100 150, 140 145 C 180 140, 210 125, 250 115 C 290 105, 320 85, 360 75 C 400 65, 430 40, 470 30" 
                          fill="none" 
                          stroke="#8ea800" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        {/* 5 sequential animated dots */}
                        <motion.circle cx="30" cy="165" r="5" fill="#8ea800" stroke="#0a0e0b" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.3 }} />
                        <motion.circle cx="140" cy="145" r="5" fill="#8ea800" stroke="#0a0e0b" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.3 }} />
                        <motion.circle cx="250" cy="115" r="5" fill="#8ea800" stroke="#0a0e0b" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.3 }} />
                        <motion.circle cx="360" cy="75" r="5" fill="#8ea800" stroke="#0a0e0b" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.3 }} />
                        <motion.circle cx="470" cy="30" r="5" fill="#8ea800" stroke="#0a0e0b" strokeWidth="1.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.4, duration: 0.3 }} />
                      </svg>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 font-bold uppercase tracking-wider px-[6%]">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                    </div>
                  </div>
                </div>

                {/* SVG Channels Doughnut */}
                <div className="md:col-span-5 flex flex-col items-center justify-center space-y-3">
                  <span className="text-xs font-black uppercase text-neutral-400 tracking-wider">
                    Bookings By Channel Split
                  </span>
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Track */}
                      <circle cx="48" cy="48" r="36" fill="transparent" stroke="#1f2937" strokeWidth="6" />
                      {/* Organic 27% */}
                      <motion.circle 
                        cx="48" 
                        cy="48" 
                        r="36" 
                        fill="transparent" 
                        stroke="#0284c7" 
                        strokeWidth="6" 
                        strokeDasharray="226.19" 
                        initial={{ strokeDashoffset: 226.19 }}
                        whileInView={{ strokeDashoffset: 226.19 - (226.19 * 75) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="opacity-40" 
                      />
                      {/* Direct 48% */}
                      <motion.circle 
                        cx="48" 
                        cy="48" 
                        r="36" 
                        fill="transparent" 
                        stroke="#8ea800" 
                        strokeWidth="6" 
                        strokeDasharray="226.19" 
                        initial={{ strokeDashoffset: 226.19 }}
                        whileInView={{ strokeDashoffset: 226.19 - (226.19 * 48) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      />
                    </svg>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="absolute flex flex-col items-center"
                    >
                      <span className="text-lg font-heading font-black text-white leading-none">48%</span>
                      <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mt-0.5">DIRECT</span>
                    </motion.div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#8ea800] rounded-full" /> Direct 48%</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#0284c7] rounded-full" /> Organic 27%</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Paid 17%</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

        {/* SECTION 03 // PROJECT VIDEO SHOWCASE */}
        <section className="border-t border-neutral-800/40 pt-12 space-y-6">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ea800]">
                03 // PROJECT VIDEO SHOWCASE
              </span>
              <h2 className="font-heading text-3xl font-bold uppercase text-white tracking-wide">
                EXPERIENCE VIDEOS
              </h2>
            </div>
            <span className="text-xs text-neutral-400 font-medium hidden sm:inline-block">
              {project.videos.length} VIDEO CLIP(S) AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.videos.map((vid, index) => (
              <div 
                key={index}
                className="bg-brand-card border border-neutral-800 rounded-[1.5rem] overflow-hidden group shadow-lg hover:border-[#8ea800]/50 transition-all duration-300"
              >
                {/* Image Thumbnail wrapper */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={vid.thumbnail} 
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-[#0a0e0b]/55 group-hover:bg-[#0a0e0b]/45 transition-colors duration-300" />
                  
                  {/* Play Button Overlay */}
                  <button 
                    onClick={() => setActiveVideo(vid)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#8ea800] hover:bg-white text-brand-dark flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5 text-brand-dark" />
                  </button>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-brand-dark/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8ea800]" />
                    <span>{vid.duration}</span>
                  </div>
                </div>

                {/* Video Info Footer */}
                <div className="p-4 flex items-center justify-between">
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase group-hover:text-[#8ea800] transition-colors">
                    {vid.title}
                  </h4>
                  <span className="text-xs font-extrabold text-[#8ea800] uppercase tracking-wider whitespace-nowrap pl-4">
                    WATCH VIDEO
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: PROVEN RESULTS (OTHER PROJECTS) */}
        <section className="border-t border-neutral-800/40 pt-12 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8ea800]">
              PROVEN RESULTS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              REAL HOTELS. REAL GROWTH.
            </h2>
          </div>

          {/* Touch-swipe snap slider */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
            <div className="min-w-[260px] sm:min-w-[300px] bg-[#131915] border border-neutral-800 rounded-2xl p-5 snap-start space-y-3 hover:border-[#8ea800]/40 transition-colors duration-300">
              <span className="text-xs font-bold text-neutral-400 block uppercase">CITY BEACH HOTEL</span>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#8ea800] block">+52%</span>
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Direct Bookings</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white block">+31%</span>
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Direct Revenue</span>
              </div>
            </div>

            <div className="min-w-[260px] sm:min-w-[300px] bg-[#131915] border border-neutral-800 rounded-2xl p-5 snap-start space-y-3 hover:border-[#8ea800]/40 transition-colors duration-300">
              <span className="text-xs font-bold text-neutral-400 block uppercase">MONTERRA SUITES</span>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#8ea800] block">+64%</span>
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Direct Bookings</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white block">+41%</span>
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Direct Revenue</span>
              </div>
            </div>

            <div className="min-w-[260px] sm:min-w-[300px] bg-[#131915] border border-neutral-800 rounded-2xl p-5 snap-start space-y-3 hover:border-[#8ea800]/40 transition-colors duration-300">
              <span className="text-xs font-bold text-neutral-400 block uppercase">PACIFICA RESORT</span>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#8ea800] block">+68%</span>
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Direct Bookings</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white block">+45%</span>
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest block">Direct Revenue</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM FINAL SECTION (CTA) */}
        <section className="bg-[#131915] border border-neutral-800 rounded-[2rem] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#8ea800]/5 rounded-full blur-[90px] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white leading-tight">
              LET'S GROW YOUR DIRECT REVENUE.
            </h2>
            <p className="text-white text-sm sm:text-base leading-relaxed font-light max-w-md mx-auto">
              We diagnose conversion leaks, deploy premium high-performance web systems, and scale organic/paid customer acquisition funnels on pure commission-free shares.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/lp/hospitality-marketing#contact"
                className="px-6 py-3.5 bg-[#8ea800] hover:bg-white text-brand-dark font-heading text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(142,168,0,0.2)] transition-all duration-300 hover:-translate-y-0.5"
              >
                REQUEST GROWTH REVIEW →
              </Link>
              <Link 
                href="https://wa.me/919986389444"
                className="px-6 py-3.5 bg-transparent border border-neutral-800 hover:border-[#8ea800] text-white font-heading text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300"
              >
                WHATSAPP US
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* VIDEO POPUP MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0e0b]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative bg-black w-full max-w-4xl rounded-[1.5rem] overflow-hidden border border-neutral-800 shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 bg-brand-dark/80 hover:bg-[#8ea800] text-white hover:text-brand-dark w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <video 
                  src={activeVideo.videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Video Footer info */}
              <div className="p-5 bg-brand-card border-t border-neutral-900 flex justify-between items-center">
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  {activeVideo.title}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  {activeVideo.duration}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
