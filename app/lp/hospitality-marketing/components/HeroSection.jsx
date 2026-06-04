"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Award, Users, CheckCircle, 
  Loader2, AlertCircle 
} from 'lucide-react';
const FaWhatsapp = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Custom filled SVG Icons matching the mockup exactly
const CustomUsersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="10" r="3" />
    <path d="M6.5 14.5c-2.2 0-4 1.3-4 3v1h8v-1c0-1.7-1.8-3-4-3z" />
    <circle cx="17.5" cy="10" r="3" />
    <path d="M17.5 14.5c-2.2 0-4 1.3-4 3v1h8v-1c0-1.7-1.8-3-4-3z" />
    <circle cx="12" cy="7.5" r="3.6" />
    <path d="M12 12.8c-2.8 0-5 1.6-5 3.6v1.2h10v-1.2c0-2-2.2-3.6-5-3.6z" />
  </svg>
);

const CustomInfinityIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={props.className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
  </svg>
);

const CustomShieldStarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polygon points="12,8.5 13.5,11.5 16.8,11.8 14.3,14 15.1,17.2 12,15.5 8.9,17.2 9.7,14 7.2,11.8 10.5,11.5" fill="currentColor" stroke="none" />
  </svg>
);

const HeroSection = () => {
  const router = useRouter();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    contactName: '',
    propertyType: '',
    phone: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const propertyTypes = [
    "Hotels",
    "Resorts",
    "Homestays & Villas",
    "Spas & Wellness Brands",
    "Clubs & Lounges",
    "Event Venues",
    "Yachts & Boat Rentals",
    "Tours & Activities"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.contactName || !formData.propertyType || !formData.phone) {
      setStatus({ loading: false, success: false, error: 'Please fill in all fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
      const payload = {
        name: formData.contactName,
        phone: formData.phone,
        email: "",
        message: `New enquiry received. Source Page: Hospitality Marketing Landing Page. Referrer/Landed URL: ${currentUrl}\nProperty Type: ${formData.propertyType}`,
        source: "Hospitality Marketing Landing Page"
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Tracking disabled

        setStatus({ loading: false, success: true, error: null });
        setFormData({ contactName: '', propertyType: '', phone: '' });

        // Redirect after a brief success delay
        setTimeout(() => {
          setIsModalOpen(false);
          router.push('/thank-you');
        }, 1200);
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  const trackCallClick = () => {};

  const trackWhatsAppClick = () => {};

  // Centered premium stats
  const stats = [
    { label: "145+ Clients", icon: CustomUsersIcon },
    { label: "Google & Meta Experts", icon: CustomInfinityIcon },
    { label: "Hospitality-Focused", icon: CustomShieldStarIcon }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-brand-dark">
      
      {/* Full Page Luxury Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Mobile-optimized warm copper hotel bg */}
        <picture>
          <source media="(max-width: 639px)" srcSet="/lp/hospitality/resort_hero_mobile.png" />
          <img 
            src="/lp/hospitality/resort_hero.png" 
            alt="Luxury Resort Pool at Night" 
            className="w-full h-full object-cover"
          />
        </picture>
        {/* Darker overlay on mobile for text contrast, lighter on desktop */}
        <div className="absolute inset-0 bg-[#0a0e0b]/80 sm:bg-[#0a0e0b]/25 z-[1]"></div>
        {/* Warm copper tint overlay on mobile for color harmony */}
        <div className="absolute inset-0 bg-[#c1781f]/8 sm:bg-transparent z-[1]"></div>
        {/* Premium Vignette Edge Shadow Overlay */}
        <div className="hero-vignette z-[2]"></div>
      </div>
      
      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-[95rem] mx-auto px-6 pt-4 pb-2 lg:py-4 flex justify-between items-center bg-transparent">
        {/* Logo Branding */}
        <Link href="/lp/hospitality-marketing" className="flex items-center gap-2 transition-transform hover:scale-101 active:scale-98">
          <span className="font-heading font-black text-2xl tracking-[0.05em] text-white">
            BEYOND <span className="text-[#8ea800]">REACH</span>
          </span>
        </Link>

        {/* Right WhatsApp Us Capsule Button */}
        <a 
          href="https://wa.me/919986389444?text=Hi%20Beyond%20Reach%2C%20I%27m%20interested%20in%20hospitality%20marketing%20services.%20(Ref:%20LP/Hospitality-Marketing)" 
          onClick={trackWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#0a0e0b]/70 hover:bg-[#0a0e0b]/90 border border-[#c1781f]/50 hover:border-[#c1781f] text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer"
          title="WhatsApp Us"
        >
          <FaWhatsapp className="w-5 h-5 text-[#25d366]" />
          <span className="font-heading text-xs sm:text-sm font-bold tracking-wider uppercase">WhatsApp Us</span>
        </a>
      </header>

      {/* Centered Typography & CTAs Grid */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center max-w-[95rem] w-full mx-auto px-6 py-12 lg:py-6 -mt-8 sm:-mt-12">
        
        {/* Animated Headline Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Tagline using Barlow Condensed font, copper color accent with high-end drop shadow */}
          <h1 className="hero-tagline text-[11vw] xs:text-[10.5vw] sm:text-[62px] md:text-[78px] lg:text-[3.8rem] xl:text-[4.4rem] 2xl:text-[5.0rem] text-white tracking-tighter uppercase leading-[1.22] sm:leading-[1.08] mb-6 max-w-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            <span className="block whitespace-nowrap">Hospitality</span>
            <span className="block whitespace-nowrap">Digital Marketing</span>
            <span className="text-brand-accent block mt-1.5 leading-[1.18] sm:leading-[1.05] whitespace-nowrap">
              For Hotels, Resorts,
            </span>
            <span className="text-brand-accent block leading-[1.18] sm:leading-[1.05] whitespace-nowrap">
              Homestays & Villas
            </span>
          </h1>
        </motion.div>

        {/* Dramatic Lens Flare / Light Streak Effect */}
        <div className="relative w-full max-w-2xl h-8 mx-auto mb-6 shrink-0 flex items-center justify-center">
          {/* Outer soft glow halo (wide warm amber glow) */}
          <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-transparent via-[#e89030]/50 to-transparent blur-[12px] opacity-90"></div>
          {/* Ambient wide radial amber flare at the center */}
          <div className="absolute w-48 h-8 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.7)_0%,transparent_70%)] blur-[4px]"></div>
          {/* Golden glow line */}
          <div className="absolute w-[90%] h-[3px] bg-gradient-to-r from-transparent via-[#d48a2a] to-transparent blur-[0.5px]"></div>
          {/* The main sharp copper accent line */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#c1781f] to-transparent"></div>
          {/* Intense focal center glow (radial amber flare) */}
          <div className="absolute w-32 h-6 bg-[radial-gradient(ellipse_at_center,rgba(255,201,138,0.65)_0%,transparent_60%)] blur-[2px]"></div>
          {/* Central white-hot diamond/ellipse flare */}
          <div className="absolute w-28 h-2.5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,rgba(193,120,31,0.5)_40%,transparent_70%)] blur-[0.5px]"></div>
          {/* Lens flare horizontal streak (thin sharp white core) */}
          <div className="absolute w-48 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#fff]"></div>
          {/* Subtle vertical glint sparkle to make it pop like a bright star/spark */}
          <div className="absolute w-[1.5px] h-6 bg-gradient-to-b from-transparent via-white/90 to-transparent blur-[0.5px]"></div>
        </div>

        {/* Centered Grey Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm xs:text-base sm:text-xl md:text-2xl text-white mb-10 max-w-2xl font-medium leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] whitespace-nowrap"
        >
          More visibility. More enquiries. Better growth.
        </motion.p>

        {/* CTA Buttons - Center Request Call Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex items-center justify-center w-full sm:w-auto mx-auto"
        >
          {/* Request a Call Back — Copper Outlined */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-3.5 border-2 border-[#c1781f]/40 hover:border-[#c1781f] bg-[#0a0e0b]/50 hover:bg-[#0a0e0b]/70 text-white font-heading text-[13px] xs:text-sm sm:text-base font-bold py-4 sm:py-4 px-8 sm:px-10 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#c1781f]/10 tracking-wider uppercase w-full sm:w-auto shrink-0 cursor-pointer"
          >
            <Phone className="w-5 h-5 stroke-[2.5] shrink-0" />
            <span>Request a Call Back</span>
          </button>
        </motion.div>

        {/* Horizontal Stats Bar (Mobile & Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-3xl mt-12 bg-[#0a0e0b]/55 border border-[#c1781f]/30 backdrop-blur-md rounded-2xl py-3.5 px-2.5 sm:py-5 sm:px-8 hidden sm:flex flex-row justify-around items-center gap-1 sm:gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="w-[1px] h-6 sm:h-8 bg-white/20 shrink-0"></div>}
                <div className="flex items-center gap-1.5 sm:gap-3.5 py-0.5 w-auto">
                  <IconComp className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-[#c1781f] shrink-0" />
                  <span className="font-heading text-[9px] xs:text-[10px] sm:text-sm md:text-base font-semibold tracking-wide text-white select-none leading-tight sm:whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </motion.div>

      </div>

      {/* Spacer */}
      <div className="relative z-10 w-full h-8 lg:h-2"></div>

      {/* Sleek Callback Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#c1781f]/20 p-8 md:p-9 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden w-full max-w-md"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0a0e0b] w-8 h-8 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
              >
                &times;
              </button>

              {/* Top copper highlight border */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent/30 via-brand-accent to-brand-accent/30"></div>
              
              <h3 className="font-heading text-[22px] sm:text-[26px] font-bold text-[#0a0e0b] mb-6 leading-none mt-2">
                Request <span className="text-brand-accent font-bold-important">Call Back</span>
              </h3>

              <AnimatePresence mode="wait">
                {status.success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <CheckCircle className="w-14 h-14 text-brand-accent mb-6 animate-pulse" />
                    <h4 className="font-heading text-xl sm:text-2xl font-bold text-[#0a0e0b] mb-2 whitespace-nowrap">Review Requested!</h4>
                    <p className="font-body text-sm text-slate-500 max-w-xs mb-8 font-normal">
                      Thank you! Our growth desk is reviewing your online presence and will call you back shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {status.error && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-500 rounded-lg text-xs font-body">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{status.error}</span>
                      </div>
                    )}

                    {/* Full Name Input */}
                    <div>
                      <input 
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        disabled={status.loading}
                        className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 disabled:opacity-50 font-normal"
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        disabled={status.loading}
                        className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 disabled:opacity-50 font-normal"
                      />
                    </div>

                    {/* Property Type Dropdown */}
                    <div className="relative">
                      <select 
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        required
                        disabled={status.loading}
                        className="w-full bg-[#f8fafc] border border-slate-200 focus:border-brand-accent text-[#0a0e0b] px-5 py-4 rounded-xl font-body text-sm transition-colors duration-300 outline-none placeholder:text-slate-400 appearance-none disabled:opacity-50 cursor-pointer font-normal"
                      >
                        <option value="" disabled className="text-slate-400">Select Property Type</option>
                        {propertyTypes.map((type, index) => (
                          <option key={index} value={type} className="bg-white text-[#0a0e0b] font-normal">{type}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status.loading}
                      className="w-full bg-brand-accent text-white font-body font-bold text-sm uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#9a6118] transition-all duration-300 cursor-pointer disabled:opacity-50 tracking-[0.05em] shadow-md hover:shadow-lg"
                    >
                      {status.loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span className="font-bold-important text-white text-sm uppercase">Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold-important text-white text-sm uppercase">Submit</span>
                          <span className="font-bold-important text-white">→</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-center font-body text-[10px] text-slate-400 mt-4 font-normal tracking-wide">
                      We respect your privacy. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
