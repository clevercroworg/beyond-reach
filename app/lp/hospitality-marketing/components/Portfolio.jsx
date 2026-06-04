"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

const projects = [
  // Resorts Category
  {
    id: "riva-beach-resort",
    title: "Riva Beach Resort",
    category: "Resorts",
    subCategory: "Luxury Resort • 100 Rooms",
    location: "Goa, India",
    headline: "+310% Booking Surge",
    description: "Scaled luxury guests acquisition with highly targeted Google Search & Meta Retargeting, bypassing commission-heavy OTA channels.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "8.4x", label: "Ads ROAS" },
      { value: "₹7.78 Cr", label: "Revenue" },
      { value: "35%", label: "Direct Share" }
    ]
  },
  {
    id: "anahata-retreat",
    title: "Anahata Yoga Retreat",
    category: "Resorts",
    subCategory: "Eco-Retreat • 20 Rooms",
    location: "Goa, India",
    headline: "+185% Inbound Sales",
    description: "Deployed geo-targeted lookalike campaigns for high-spending international wellness travelers, driving direct room bookings.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "6.2x", label: "Campaign ROI" },
      { value: "₹1.56 Cr", label: "Ad Bookings" },
      { value: "42%", label: "Direct Share" }
    ]
  },
  {
    id: "manuallaya-resort",
    title: "Manuallaya Valley Resort",
    category: "Resorts",
    subCategory: "Mountain Resort • 85 Rooms",
    location: "Manali, HP",
    headline: "+120% Occupancy Rate",
    description: "Sustained high off-season occupancy through contextual local search campaigns and exclusive dynamic package landing pages.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "5.0x", label: "Search ROAS" },
      { value: "₹6.61 Cr", label: "Ad Revenue" },
      { value: "31%", label: "Direct Share" }
    ]
  },

  // Villas & Homestays Category
  {
    id: "hazaar-dastaan-homestay",
    title: "Hazaar Dastaan",
    category: "Villas & Homestays",
    subCategory: "Heritage Stay • 10 Rooms",
    location: "Kashmir, India",
    headline: "+420% Organic Leads",
    description: "Leveraged storytelling and local culture content to build a cult aesthetic following, filling inventory months in advance.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "920k+", label: "Organic Reach" },
      { value: "44%", label: "Direct Bookings" },
      { value: "₹36.9L", label: "Direct Sales" }
    ]
  },
  {
    id: "casa-de-sol-villas",
    title: "Casa De Sol",
    category: "Villas & Homestays",
    subCategory: "Luxury Villa • 6 Cottages",
    location: "Goa, India",
    headline: "+240% Inbound Inquiries",
    description: "Positioned as Goa's premier private luxury villa compound, scaling direct reservations using premium visual branding.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "7.8x", label: "Villa ROAS" },
      { value: "₹1.80 Cr", label: "Direct Sales" },
      { value: "55%", label: "Direct Share" }
    ]
  },
  {
    id: "hinterland-forest-cabins",
    title: "Hinterland Cabins",
    category: "Villas & Homestays",
    subCategory: "Forest Cabins • 8 Cabins",
    location: "Manali, HP",
    headline: "+175% Dynamic Bookings",
    description: "Designed responsive mobile booking interfaces for high-converting social media travelers seeking wilderness stays.",
    image: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "6.5x", label: "Social ROAS" },
      { value: "₹94 Lakhs", label: "Direct Revenue" },
      { value: "48%", label: "Direct Share" }
    ]
  },

  // Boutique Hotels Category
  {
    id: "palma-goa-boutique",
    title: "Palma Goa Boutique",
    category: "Boutique Hotels",
    subCategory: "Boutique Hotel • 15 Rooms",
    location: "Goa, India",
    headline: "+340% Instagram Reach",
    description: "Created a visual-first organic narrative strategy with high-production aesthetic reel storytelling, scaling direct inbound DMs.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "1.2M+", label: "Reel Views" },
      { value: "12.5k+", label: "New Followers" },
      { value: "45%", label: "Inquiry Growth" }
    ]
  },
  {
    id: "woodrock-forest-hotel",
    title: "Woodrock Forest Hotel",
    category: "Boutique Hotels",
    subCategory: "Forest Hotel • 41 Rooms",
    location: "Manali, HP",
    headline: "+210% Profile Activity",
    description: "Curated experiential forest stay content that positioned the property as Manali's premier high-end nature escape.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "1.5M", label: "Impressions" },
      { value: "5.0x", label: "Follower ROI" },
      { value: "40%", label: "Direct Share" }
    ]
  },
  {
    id: "the-whispering-inn",
    title: "The Whispering Inn",
    category: "Boutique Hotels",
    subCategory: "Luxury Inn • 24 Rooms",
    location: "Manali, HP",
    headline: "+150% Site Conversions",
    description: "Designed a clean, responsive mobile-first booking interface with transparent rate parity comparison widgets to build trust.",
    image: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "46%", label: "Direct Share" },
      { value: "₹1.87 Cr", label: "Direct Sales" },
      { value: "+150%", label: "Conversion" }
    ]
  },

  // Spas & Wellness Category
  {
    id: "eden-resorts-spa",
    title: "Eden Resorts & Spa",
    category: "Spas & Wellness",
    subCategory: "Wellness Spa • 45 Rooms",
    location: "Kashmir, India",
    headline: "98/100 Brand Rating",
    description: "Created a high-luxury sensory identity and digital assets, reinforcing premium spa treatments and wilderness excursions.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "38%", label: "Repeat Guests" },
      { value: "₹3.50 Cr", label: "Direct Sales" },
      { value: "98/100", label: "Satisfaction" }
    ]
  },
  {
    id: "wayanad-wild-retreat",
    title: "Wayanad Wild Retreat",
    category: "Spas & Wellness",
    subCategory: "Jungle Villa • 12 Cottages",
    location: "Kerala, India",
    headline: "+175% Premium Bookings",
    description: "Established the luxury eco-wilderness visual identity and custom assets, scaling high-value room tier direct bookings.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "8.2x", label: "Brand ROI" },
      { value: "₹2.20 Cr", label: "Revenue" },
      { value: "52%", label: "Direct Share" }
    ]
  },
  {
    id: "sanctuary-woods-wellness",
    title: "Sanctuary Spa",
    category: "Spas & Wellness",
    subCategory: "Wellness Resort • 25 Rooms",
    location: "Manali, HP",
    headline: "+190% Direct Bookings",
    description: "Engineered elegant direct reservation funnels and interactive wellness packages, decreasing OTA dependencies.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    metrics: [
      { value: "7.5x", label: "Ad Campaign ROI" },
      { value: "₹2.10 Cr", label: "Revenue" },
      { value: "60%", label: "Direct Rate" }
    ]
  }
];

const categories = ["All", "Resorts", "Villas & Homestays", "Boutique Hotels", "Spas & Wellness"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("Villas & Homestays");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 px-6 bg-white relative overflow-hidden border-t border-neutral-200/40">
      {/* Background soft radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h3 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#0a0e0b] uppercase tracking-[0.06em] leading-none mb-4">
            OUR <span className="text-brand-accent font-bold-important">SUCCESS STORIES</span>
          </h3>
          <div className="w-24 h-[3px] bg-brand-accent mx-auto mt-6"></div>
        </div>

        {/* Filter Pills Bar */}
        <div className="relative mb-16 max-w-3xl mx-auto">
          {/* Left fade indicator (mobile only) */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none md:hidden" />
          {/* Right fade indicator with subtle chevron hint (mobile only) */}
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none md:hidden flex items-center justify-end pr-1">
            <svg className="w-3.5 h-3.5 text-brand-accent/60 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex md:flex-wrap md:justify-center gap-2.5 sm:gap-3 overflow-x-auto md:overflow-visible px-6 md:px-1 pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-brand-accent text-white shadow-[0_4px_20px_rgba(193,120,31,0.35)]"
                      : "bg-neutral-100 text-neutral-600 hover:text-[#0a0e0b] border border-neutral-200 hover:border-brand-accent/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Premium Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-card border-2 border-[#c1781f]/35 hover:border-brand-accent/70 rounded-[1.5rem] overflow-hidden hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(193,120,31,0.12)] transition-all duration-500 flex flex-col h-full group"
              >
                <div className="flex flex-col h-full w-full">
                  {/* Card Property Photo Header */}
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0b]/95 via-[#0a0e0b]/40 to-transparent z-10" />
                    
                    {/* Location & Category Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 bg-brand-dark/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-wider text-white">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{project.location.toUpperCase()}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-brand-dark/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-wider text-brand-accent">
                        <span>{project.category.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Title & Metadata overlays */}
                    <div className="absolute bottom-4 left-5 right-5 z-20 pointer-events-none">
                      <span className="text-[0.7rem] font-bold tracking-widest text-neutral-400 block mb-0.5 uppercase">
                        {project.subCategory}
                      </span>
                      <h4 className="text-xl font-heading font-bold text-white tracking-wide uppercase">
                        {project.title}
                      </h4>
                    </div>
                  </div>

                  {/* Card Details Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between bg-brand-card">
                    <div>
                      {/* Direct Response Headline */}
                      <h5 className="text-lg font-bold text-brand-accent mb-2 uppercase tracking-wide leading-snug font-heading">
                        {project.headline}
                      </h5>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Divider */}
                      <div className="w-full h-[1px] bg-neutral-800/40 mb-5" />

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-2 text-center mb-4">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-base sm:text-lg font-heading font-black text-white tracking-tight leading-none mb-1">
                              {metric.value}
                            </span>
                            <span className="text-[0.62rem] font-bold tracking-widest text-neutral-500 uppercase leading-none">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
