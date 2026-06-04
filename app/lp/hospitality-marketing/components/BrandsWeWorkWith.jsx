"use client";
import React from 'react';

const BrandsWeWorkWith = () => {
  const logos = [
    "MARRIOTT",
    "FOUR SEASONS",
    "RITZ-CARLTON",
    "AMAN",
    "MANDARIN ORIENTAL",
    "TAJ HOTELS",
    "OBEROI",
    "W HOTELS",
    "HYATT",
    "HILTON",
  ];

  // Duplicate logos once for seamless infinite loop scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="relative bg-[#fafbfa] py-4 sm:py-6 overflow-hidden border-b border-neutral-200/40 z-10">
      <div className="mx-auto max-w-7xl px-6 mb-3 text-center">
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
          Brands We Work With
        </span>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Soft copper edge gradients for smooth premium transition */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#c1781f]/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#c1781f]/20 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center whitespace-nowrap gap-8 sm:gap-14 py-1.5 animate-scroll-marquee select-none">
          {duplicatedLogos.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 sm:gap-4 group"
            >
              <span className="text-neutral-300 text-[10px] select-none">●</span>
              <span 
                className="text-sm sm:text-lg font-normal text-neutral-500 uppercase tracking-[0.25em] transition-colors duration-300 group-hover:text-[#c1781f] cursor-pointer"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsWeWorkWith;
