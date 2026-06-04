"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

const FinalCTASection = () => {
  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trackWhatsAppClick = () => {};

  const trackCallClick = () => {};

  return (
    <footer className="relative py-16 px-6 bg-brand-dark overflow-hidden border-t border-brand-border/40 text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Call to Action Content */}
        <h2 className="font-heading text-[21px] xs:text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mb-6 leading-[1.15] tracking-tight sm:tracking-normal" style={{ wordSpacing: '0.06em' }}>
          Request Your Free <br/>
          <span className="text-brand-accent">Property Growth Review</span>
        </h2>
        
        <p className="font-body text-sm md:text-base text-brand-textSecondary max-w-xl mb-8 font-normal leading-[1.7]">
          Share your property details and our hospitality marketing team will review your online visibility, brand positioning, photos/videos, ads readiness, and booking flow.
        </p>

        {/* Call CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4.5 w-full sm:w-auto mb-10 items-center justify-center">
          <a 
            href="tel:09986389444"
            onClick={trackCallClick}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-heading text-[20px] xs:text-[24px] sm:text-[28px] md:text-[32px] font-bold px-6 py-3 xs:px-8 xs:py-3.5 sm:px-10 sm:py-4 rounded-full flex items-center justify-center gap-2.5 xs:gap-3 transition-all duration-300 cursor-pointer tracking-[0.08em] shadow-lg shadow-[#22c55e]/25 hover:shadow-[#22c55e]/40 w-full sm:w-auto font-bold-important leading-none"
          >
            <Phone className="w-5 h-5 xs:w-6 xs:h-6 stroke-[3] text-white shrink-0" />
            <span className="font-bold-important whitespace-nowrap">09986389444</span>
          </a>
          
          <a 
            href="https://wa.me/919986389444?text=Hi%20Beyond%20Reach%2C%20I%27m%20interested%20in%20hospitality%20marketing%20services.%20(Ref:%20LP/Hospitality-Marketing)"
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 hover:border-brand-accent text-white hover:text-brand-accent font-heading text-[16px] xs:text-[18px] sm:text-[22px] md:text-[28px] font-bold px-5 py-2.5 xs:px-6 xs:py-3 sm:px-8 sm:py-3.5 rounded-full flex items-center justify-center gap-2.5 xs:gap-3 transition-all duration-300 tracking-[0.08em] w-full sm:w-auto font-bold-important leading-none"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 xs:w-5.5 xs:h-5.5 fill-current shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-bold-important whitespace-nowrap">Chat on WhatsApp</span>
          </a>
        </div>

        {/* Footer Brand Info */}
        <div className="w-full border-t border-brand-border/40 pt-8 flex flex-col items-center justify-center gap-4">
          <p className="font-body text-[11px] text-brand-textSecondary/50 uppercase tracking-[0.2em] text-center font-bold">
            &copy; 2026 BEYOND REACH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-body text-brand-textSecondary/40 uppercase tracking-[0.2em] font-bold">
            <Link href="/lp/hospitality-marketing/privacy-policy" className="hover:text-brand-accent transition-colors duration-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/lp/hospitality-marketing/terms-conditions" className="hover:text-brand-accent transition-colors duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FinalCTASection;
