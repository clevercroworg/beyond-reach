"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Offerings.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Offerings = () => {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  const items = [
    {
      index: "01",
      title: "Hotels",
      tagline: "Luxury Brand Optimization",
      description: "Unifying brand authority, digital presence, and guest retention strategies to maximize premium hotel booking yields.",
      slug: "/hotels"
    },
    {
      index: "02",
      title: "Resorts",
      tagline: "Immersive Experience Yield",
      description: "Positioning destination resorts as experiential sanctuaries through narrative marketing and custom luxury CRM campaigns.",
      slug: "/resorts"
    },
    {
      index: "03",
      title: "Homestays & Villas",
      tagline: "Bespoke Private Retreats",
      description: "Curating high-end private property positioning and direct booking platforms for premium homestays and luxury estates.",
      slug: "/homestays-villas"
    },
    {
      index: "04",
      title: "Spas & Wellness",
      tagline: "Holistic Revenue Strategy",
      description: "Creating high-conversion booking structures and sensory digital campaigns for premium spas and wellness sanctuaries.",
      slug: "/spas-wellness"
    },
    {
      index: "05",
      title: "Clubs & Lounges",
      tagline: "VIP Membership & Loyalty",
      description: "Driving elite recurring membership revenue and high-value guest lifetime loyalty through bespoke social club engagement.",
      slug: "/clubs-lounges"
    },
    {
      index: "06",
      title: "Event Venues",
      tagline: "Elite Space Monetization",
      description: "Leveraging digital search dominance and visual narratives to drive premium inquiries and bookings for signature event spaces.",
      slug: "/event-venues"
    },
    {
      index: "07",
      title: "Yachts & Boats",
      tagline: "High-End Marine Booking",
      description: "Accelerating direct charter inquiries and luxury private boat rentals through custom digital booking systems.",
      slug: "/yachts-boats"
    },
    {
      index: "08",
      title: "Tours & Activities",
      tagline: "Curated Adventure Growth",
      description: "Transforming raw local excursions into elite, high-yield destination activities through targeted search optimization.",
      slug: "/tours-activities"
    }
  ];

  // Helper to render beautiful, custom luxury vector SVG icons for each category
  const renderIcon = (slug) => {
    switch (slug) {
      case "/hotels":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="4" y="2" width="16" height="20" rx="1" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
        );
      case "/resorts":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 22C12 22 12 12 19 8C19 8 13 11 12 12C11 11 5 8 5 8C12 12 12 22 12 22Z" />
            <path d="M12 14C12 14 15 11 17.5 11.5" />
            <path d="M12 16C12 16 16 13.5 18 14" />
            <path d="M12 14C12 14 9 11 6.5 11.5" />
            <path d="M12 16C12 16 8 13.5 6 14" />
          </svg>
        );
      case "/homestays-villas":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M3 10L12 3L21 10V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V10Z" />
            <path d="M9 21V12H15V21" />
            <line x1="12" y1="3" x2="12" y2="21" strokeDasharray="2 2" />
          </svg>
        );
      case "/spas-wellness":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 3C12 3 15 8 15 11C15 14 13 16 12 16C11 16 9 14 9 11C9 8 12 3 12 3Z" />
            <path d="M12 11C12 11 19 12 20 15C20 17 18 19 15 19C13 19 12 17 12 17" />
            <path d="M12 11C12 11 5 12 4 15C4 17 6 19 9 19C11 19 12 17 12 17" />
          </svg>
        );
      case "/clubs-lounges":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M5 5H19L12 13L5 5Z" />
            <line x1="12" y1="13" x2="12" y2="19" />
            <line x1="8" y1="19" x2="16" y2="19" />
            <path d="M18.5 2L19.2 3.5L20.8 4L19.2 4.5L18.5 6L17.8 4.5L16.2 4L17.8 3.5L18.5 2Z" fill="currentColor" stroke="none" />
          </svg>
        );
      case "/event-venues":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M4 21V10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10V21" />
            <line x1="8" y1="21" x2="8" y2="10" />
            <line x1="16" y1="21" x2="16" y2="10" />
            <rect x="2" y="21" width="20" height="1" fill="currentColor" />
          </svg>
        );
      case "/yachts-boats":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 17C2 17 7 17.5 12 17.5C17 17.5 22 17 22 17C22 17 21 21 12 21C3 21 2 17 2 17Z" />
            <path d="M12 3V15" />
            <path d="M12 5C12 5 18 8 18 12C18 12 13 14 12 14" />
            <path d="M12 6C12 6 6 9 6 12C6 12 11 13 12 13" />
          </svg>
        );
      case "/tours-activities":
        return (
          <svg viewBox="0 0 24 24" className={styles.iconSvg} fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="12" cy="12" r="9" />
            <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const validRows = rowsRef.current.filter(Boolean);
    if (validRows.length === 0) return;

    // Smooth scroll staggered panel sweep up (straight linear coordinate rise)
    const anim = gsap.fromTo(validRows, 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power2.out"
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  return (
    <section className={styles.sectionFluidMain} id="solution">
      <div className={styles.headerTitle}>
        <span className={styles.subHeading}>Elite Expertise Verticals</span>
        <h2>OUR OFFERINGS</h2>
      </div>

      {/* Directory-style Horizontal Panel Catalog */}
      <div className={styles.directoryContainer} ref={containerRef}>
        {items.map((item, index) => (
          <div 
            className={styles.offeringRow} 
            key={index}
            ref={el => rowsRef.current[index] = el}
          >
            <Link href={item.slug} className={styles.rowLink}>
              
              {/* Col 1: Index Number & Luxury Line-Art Vector */}
              <div className={styles.colIdentity}>
                <span className={styles.rowIndex}>{item.index}</span>
                <div className={styles.iconWrapper}>
                  {renderIcon(item.slug)}
                </div>
              </div>

              {/* Col 2: Title & Category Subtag */}
              <div className={styles.colTitle}>
                <h3 className={styles.rowTitle}>{item.title}</h3>
                <span className={styles.rowTagline}>{item.tagline}</span>
              </div>

              {/* Col 3: Business Yield Strategy description */}
              <div className={styles.colDescription}>
                <p className={styles.rowDescription}>{item.description}</p>
              </div>

              {/* Col 4: Perfectly Straight Action indicator */}
              <div className={styles.colAction}>
                <span className={styles.exploreText}>Explore</span>
                <span className={styles.arrowIcon}>➔</span>
              </div>

              {/* Bottom Border Accent Highlight */}
              <div className={styles.rowBottomBar} />

            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offerings;
