"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ClubsLounges.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── CUSTOM INLINE SVG ICONS ─── */
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', flexShrink: 0 }}>
    <path d="M12.004 2c-5.518 0-9.996 4.477-9.996 9.995 0 1.763.459 3.486 1.332 5.006L2 22l5.126-1.345c1.468.802 3.125 1.226 4.872 1.226.002 0 .004 0 .006 0 5.517 0 9.996-4.478 9.996-9.995C22 6.477 17.521 2 12.004 2zm5.728 14.33c-.25.707-1.458 1.37-2.007 1.436-.5.062-1.15.086-1.844-.136-.44-.14-1.025-.36-1.748-.682-3.08-1.37-5.07-4.512-5.223-4.717-.153-.205-1.237-1.65-1.237-3.15 0-1.502.784-2.24 1.063-2.541.278-.3.606-.375.808-.375.203 0 .405.002.582.01.183.007.426-.07.666.51.248.6.848 2.072.923 2.223.076.15.127.327.026.53-.102.203-.153.33-.304.507-.153.18-.32.402-.457.54-.153.15-.313.315-.135.623.178.307.79 1.303 1.693 2.11.164.147.336.27.508.384.606.398.96.347 1.316.035.152-.135.656-.763.832-1.024.178-.262.355-.22.607-.127.254.093 1.61.76 1.889.897.278.136.464.204.53.317.067.114.067.66-.183 1.367z" />
  </svg>
);

const GoogleAdsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px', flexShrink: 0 }}>
    <path d="M16.6 3.6c-.6-.6-1.5-.6-2.1 0l-9.8 16c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2.1 0l9.8-16c.6-.6.6-1.5 0-2.1z" fill="#F9BC05" />
    <path d="M21.3 12.3c-.6-.6-1.5-.6-2.1 0l-4.9 8c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2.1 0l4.9-8c.6-.6.6-1.5 0-2.1z" fill="#1A73E8" />
  </svg>
);

const MetaAdsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0064E0" strokeWidth="3.2" style={{ marginRight: '8px', flexShrink: 0 }}>
    <path d="M16.5 7c-1.6 0-3.1 1.2-3.8 2.5-.7-1.3-2.2-2.5-3.8-2.5C5.8 7 3 9.2 3 12s2.8 5 5.9 5c1.6 0 3.1-1.2 3.8-2.5.7 1.3 2.2 2.5 3.8 2.5 3.1 0 5.9-2.2 5.9-5s-2.8-5-5.9-5z" />
  </svg>
);

const WebsiteIcon = ({ stroke = "#2563eb" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" style={{ marginRight: '8px', flexShrink: 0 }}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <circle cx="6" cy="6" r="0.6" fill={stroke} stroke="none" />
    <circle cx="9" cy="6" r="0.6" fill={stroke} stroke="none" />
    <circle cx="12" cy="6" r="0.6" fill={stroke} stroke="none" />
    <line x1="9" y1="9" x2="9" y2="21" />
  </svg>
);

const SeoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2.2" style={{ marginRight: '8px', flexShrink: 0 }}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M8 12.5l2-2 1.5 1.5 2.5-2.5" strokeWidth="1.8" />
  </svg>
);

const BookingFlowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.2" style={{ marginRight: '8px', flexShrink: 0 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="8 15 11 18 17 11" strokeWidth="1.8" />
  </svg>
);

const TrackingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.2" style={{ marginRight: '8px', flexShrink: 0 }}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ProblemWebsiteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" style={{ marginBottom: '1rem' }}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="10" y1="12" x2="14" y2="16" />
    <line x1="14" y1="12" x2="10" y2="16" />
  </svg>
);

const ProblemOtaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" style={{ marginBottom: '1rem' }}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" />
  </svg>
);

const ProblemInquiryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" style={{ marginBottom: '1rem' }}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const SolutionWebsiteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1ff36" strokeWidth="2" style={{ marginBottom: '0.8rem' }}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SolutionAdIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1ff36" strokeWidth="2" style={{ marginBottom: '0.8rem' }}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const SolutionAutomationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1ff36" strokeWidth="2" style={{ marginBottom: '0.8rem' }}>
    <path d="M16.5 9.5c-1.1 0-2 .6-2.5 1.4-.5-.8-1.4-1.4-2.5-1.4C9.1 8.5 7.5 10 7.5 12s1.6 3.5 3.7 3.5c1.1 0 2-.6 2.5-1.4.5.8 1.4 1.4 2.5 1.4 2.1 0 3.7-1.5 3.7-3.5s-1.6-3.5-3.7-3.5zm-5 5.5c-1.2 0-2.2-.9-2.2-2s1-2 2.2-2 2.2.9 2.2 2-1 2-2.2 2zm5 0c-1.2 0-2.2-.9-2.2-2s1-2 2.2-2 2.2.9 2.2 2-1 2-2.2 2z" fill="none" />
  </svg>
);

const SolutionTrackingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1ff36" strokeWidth="2" style={{ marginBottom: '0.8rem' }}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ProcessAuditIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ProcessStrategyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="13" y2="18" />
  </svg>
);

const ProcessBuildIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 22h20L12 2z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const ProcessScaleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const AnimatedSparkline = () => {
  const pathRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    if (fillRef.current) gsap.set(fillRef.current, { opacity: 0 });
    if (dotRef.current) gsap.set(dotRef.current, { scale: 0, opacity: 0 });
    if (pulseRef.current) {
      gsap.set(pulseRef.current, { scale: 0, opacity: 0, transformOrigin: 'center center' });
    }

    const tl = gsap.timeline({ delay: 1.2 });
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: 'power2.out'
    })
    .to(fillRef.current, {
      opacity: 1,
      duration: 1.0,
      ease: 'power1.out'
    }, '-=1.2')
    .to(dotRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(2)'
    }, '-=0.3')
    .to(pulseRef.current, {
      scale: 2.2,
      opacity: 0,
      duration: 1.6,
      repeat: -1,
      ease: 'power1.out'
    }, '-=0.1');
  }, []);

  return (
    <svg width="100%" height="80" viewBox="0 0 200 80" fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="5" y1="15" x2="195" y2="15" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
      <line x1="5" y1="40" x2="195" y2="40" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
      <line x1="5" y1="65" x2="195" y2="65" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
      <path
        ref={fillRef}
        d="M 5 80 L 5 70 C 25 65 45 40 65 45 C 85 50 105 20 125 35 C 145 50 165 15 190 20 L 190 80 Z"
        fill="url(#chartGradient)"
      />
      <path
        ref={pathRef}
        d="M 5 70 C 25 65 45 40 65 45 C 85 50 105 20 125 35 C 145 50 165 15 190 20"
        stroke="var(--accent-color)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle
        ref={pulseRef}
        cx="190"
        cy="20"
        r="8"
        fill="none"
        stroke="var(--accent-color)"
        strokeWidth="1.5"
      />
      <circle
        ref={dotRef}
        cx="190"
        cy="20"
        r="4.5"
        fill="var(--accent-color)"
        filter="drop-shadow(0 0 6px var(--accent-color))"
      />
    </svg>
  );
};

const ResultsSparkline = ({ id, points, fillPoints, color = "#10b981" }) => {
  const pathRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    if (fillRef.current) gsap.set(fillRef.current, { opacity: 0 });
    if (dotRef.current) gsap.set(dotRef.current, { scale: 0, opacity: 0, transformOrigin: 'center center' });

    ScrollTrigger.create({
      trigger: path,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out' })
          .to(fillRef.current, { opacity: 1, duration: 0.6, ease: 'power1.out' }, '-=1.0')
          .to(dotRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.2');
      }
    });
  }, []);

  return (
    <svg viewBox="0 0 160 40" width="100%" height="32" fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path ref={fillRef} d={fillPoints} fill={`url(#grad-${id})`} />
      <path ref={pathRef} d={points} stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle ref={dotRef} cx="155" cy="10" r="3" fill={color} filter={`drop-shadow(0 1px 3px ${color})`} />
    </svg>
  );
};

/* ─── DATA ─── */
const clubFaqs = [
  {
    question: 'How do you protect privacy and exclusivity for members-only clubs?',
    answer: 'We implement secure gated pages, private login portals, and highly targeted advertising that only reaches qualified demographics based on wealth, interests, and geography.'
  },
  {
    question: 'Can you optimize our table booking and private room hire online?',
    answer: 'Yes. We design and build seamless, luxury booking pathways for private tables, meeting rooms, and VIP lounges, connecting directly with systems like SevenRooms or OpenTable.'
  },
  {
    question: 'What marketing strategies yield the highest ROI for upscale lounges?',
    answer: 'Curated micro-influencer events, cinematic short-form video campaigns showcasing the lounge atmosphere, and local search optimization (Google Maps) capture premium bookings when guests plan their social evenings.'
  },
  {
    question: 'Do you manage corporate event lead generation?',
    answer: 'Yes, we build dedicated private event hiring landing pages and run LinkedIn and Google Search campaigns targeting corporate planners and luxury event hosts.'
  }
];

const portfolioProjects = [
  {
    title: 'THE GRAND ESCAPE',
    client: 'LUXURY RESORTS',
    category: 'BRANDING · WEBSITE · SEO',
    imgSrc: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    vidSrc: '/sample-vid.mp4',
    location: 'Goa, India',
    subCategory: 'Luxury Resort • 100 Rooms',
    headline: '+310% Booking Surge',
    description: 'Scaled luxury guests acquisition with highly targeted Google Search & Meta Retargeting, bypassing commission-heavy OTA channels.',
    metrics: [
      { value: '8.4x', label: 'Ads ROAS' },
      { value: '$940K', label: 'Revenue' },
      { value: '35%', label: 'Direct Share' }
    ]
  },
  {
    title: 'OCEANIC VOYAGES',
    client: 'AZURE CHARTERS',
    category: 'CAMPAIGN · CONTENT',
    imgSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    location: 'Maldives',
    subCategory: 'Luxury Yacht • 8 Charters',
    headline: '+185% Inbound Sales',
    description: 'Deployed geo-targeted lookalike campaigns for high-spending international wellness travelers, driving direct boat charters.',
    metrics: [
      { value: '6.2x', label: 'Campaign ROI' },
      { value: '$190K', label: 'Ad Bookings' },
      { value: '42%', label: 'Direct Share' }
    ]
  },
  {
    title: 'ZEN WELLNESS',
    client: 'VITALITY SPA',
    category: 'BRANDING · DIGITAL',
    imgSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    location: 'Kerala, India',
    subCategory: 'Eco-Retreat • 20 Rooms',
    headline: '+120% Occupancy Rate',
    description: 'Sustained high off-season occupancy through contextual local search campaigns and exclusive dynamic package landing pages.',
    metrics: [
      { value: '5.0x', label: 'Search ROAS' },
      { value: '$420K', label: 'Ad Revenue' },
      { value: '31%', label: 'Direct Share' }
    ]
  },
  {
    title: 'ALPINE PEAKS',
    client: 'NORDIC STAYS',
    category: 'WEBSITE · SEO · ADS',
    imgSrc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    location: 'Manali, HP',
    subCategory: 'Heritage Stay • 10 Rooms',
    headline: '+420% Organic Leads',
    description: 'Leveraged storytelling and local culture content to build a cult aesthetic following, filling inventory months in advance.',
    metrics: [
      { value: '920k+', label: 'Organic Reach' },
      { value: '44%', label: 'Direct Share' },
      { value: '$280K', label: 'Direct Sales' }
    ]
  },
  {
    title: 'NOCTURNAL EVENTS',
    client: 'LUMIERE NIGHTS',
    category: 'CONTENT · SOCIAL',
    imgSrc: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    location: 'Mumbai, India',
    subCategory: 'Boutique Event • 15 Events',
    headline: '+240% Inbound Inquiries',
    description: 'Positioned as the city\'s premier private luxury event hosts, scaling direct reservations using premium visual branding.',
    metrics: [
      { value: '7.8x', label: 'Social ROAS' },
      { value: '1.2M+', label: 'Reel Views' },
      { value: '55%', label: 'Direct Share' }
    ]
  },
  {
    title: 'URBAN SANCTUARY',
    client: 'THE METRO HOTEL',
    category: 'STRATEGY · BOOKING',
    imgSrc: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    location: 'Singapore',
    subCategory: 'Boutique Hotel • 41 Rooms',
    headline: '+175% Dynamic Bookings',
    description: 'Designed responsive mobile booking interfaces for high-converting social media travelers seeking urban staycations.',
    metrics: [
      { value: '6.5x', label: 'Mobile ROI' },
      { value: '$610K', label: 'Direct Revenue' },
      { value: '48%', label: 'Direct Share' }
    ]
  }
];

const PortfolioCard = ({ title, client, category, imgSrc, vidSrc, location, subCategory, headline, description, metrics }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setIsPlaying(true);
      videoRef.current?.play().catch(() => {});
    }
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setIsPlaying(false);
      videoRef.current?.pause();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth <= 768) {
          if (entry.isIntersecting) {
            setIsPlaying(true);
            videoRef.current?.play().catch(() => {});
          } else {
            setIsPlaying(false);
            videoRef.current?.pause();
          }
        }
      },
      { threshold: 0.7 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link href="/case-study-snap" className={styles.pCard} ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.pMedia}>
        <img src={imgSrc} alt={title} className={styles.pImg} style={{ opacity: isPlaying ? 0.35 : 1 }} />
        <video ref={videoRef} src={vidSrc} className={styles.pVid} muted loop playsInline />
        <div className={styles.pMediaOverlay}></div>
        
        <div className={styles.pBadgesRow}>
          <div className={styles.pLocationBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.pinIcon}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location.toUpperCase()}</span>
          </div>
          <div className={styles.pCategoryBadge}>
            <span>{category.split(' · ')[0]}</span>
          </div>
        </div>

        <div className={styles.pTitleOverlay}>
          <span className={styles.pSubCategory}>{subCategory}</span>
          <h4 className={styles.pCardTitle}>{title}</h4>
        </div>
      </div>

      <div className={styles.pDetailsBody}>
        <div>
          <h5 className={styles.pHeadline}>{headline}</h5>
          <p className={styles.pDescription}>{description}</p>
        </div>

        <div>
          <div className={styles.pDivider} />
          <div className={styles.pMetricsGrid}>
            {metrics.map((metric, idx) => (
              <div key={idx} className={styles.pMetricBlock}>
                <span className={styles.pMetricValue}>{metric.value}</span>
                <span className={styles.pMetricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.pCardLinkWrapper}>
            <span className={styles.pCardLinkText}>VIEW CASE STUDY &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FaqAccordion = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqList}>
      {faqs.map((faq, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div key={idx} className={styles.faqItem}>
            <button 
              className={`${styles.faqQuestion} ${isActive ? styles.active : ''}`}
              onClick={() => toggleAccordion(idx)}
            >
              {faq.question}
              <span className={styles.faqIcon}>+</span>
            </button>
            <div className={`${styles.faqAnswerWrapper} ${isActive ? styles.active : ''}`}>
              <div className={styles.faqAnswerInner}>
                <div className={styles.faqAnswer}>
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ClubsLounges = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const transitionDelay = 0.4;

      gsap.fromTo(`.${styles.heroLeft}`, 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: transitionDelay }
      );
      gsap.fromTo(`.${styles.resultsWidget}`, 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: transitionDelay + 0.2 }
      );

      const animateOnScroll = (targets, trigger, startOffset = 'top 92%') => {
        gsap.fromTo(targets,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: trigger,
              start: startOffset,
              once: true
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          }
        );
      };

      animateOnScroll(`.${styles.problemCard}`, `.${styles.problemSection}`);
      animateOnScroll(`.${styles.solutionCard}`, `.${styles.solutionSection}`);
      animateOnScroll(`.${styles.processStepNode}`, `.${styles.processSection}`);
      animateOnScroll(`.${styles.resultsCard}`, `.${styles.resultsSection}`);
      animateOnScroll(`.${styles.pCard}`, `.${styles.portfolioSection}`);

      const dbPath = pageRef.current.querySelector(`.${styles.dbChartPath}`);
      const dbGradient = pageRef.current.querySelector(`.${styles.dbChartGradientPath}`);
      const dbDots = pageRef.current.querySelectorAll('.dbDotPoint');
      
      if (dbPath) {
        const length = dbPath.getTotalLength();
        gsap.set(dbPath, { strokeDasharray: length, strokeDashoffset: length });
        if (dbGradient) gsap.set(dbGradient, { opacity: 0 });
        if (dbDots.length) {
          gsap.set(dbDots, { scale: 0, opacity: 0, transformOrigin: 'center center' });
        }
        
        ScrollTrigger.create({
          trigger: `.${styles.insightsSection}`,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(dbPath, {
              strokeDashoffset: 0,
              duration: 2.2,
              ease: 'power1.inOut'
            })
            .to(dbGradient, {
              opacity: 1,
              duration: 0.8,
              ease: 'power1.out'
            }, '-=1.5');
            
            if (dbDots.length) {
              tl.to(dbDots, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                stagger: 0.15,
                ease: 'back.out(2.5)'
              }, '-=2.1');
            }
          }
        });
      }

      const refreshST = () => ScrollTrigger.refresh();
      window.addEventListener('load', refreshST);
      const timer1 = setTimeout(refreshST, 200);
      const timer2 = setTimeout(refreshST, 1000);
      
      return () => {
        window.removeEventListener('load', refreshST);
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className={styles.pageWrapper}>
      
      {/* 1. HERO HEADER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury private member club interior"
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <span className={styles.heroLabel}>CLUB GROWTH SYSTEM</span>
            <h1 className={styles.heroTitle}>
              MORE MEMBER BOOKINGS<br />
              <span className={styles.glowingText}>FOR CLUBS.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Marketing, websites and booking engines drive more membership inquiries and direct venue bookings — sustainably.
            </p>
            <div className={styles.heroBtnGroup}>
              <Link href="/contact" className={styles.btnPrimary}>
                REQUEST GROWTH REVIEW &rarr;
              </Link>
              <a href="https://wa.me/#" target="_blank" rel="noopener noreferrer" className={styles.btnWhatsApp}>
                <WhatsAppIcon />
                WHATSAPP US
              </a>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.resultsWidget}>
              <div className={styles.widgetHeader}>
                <span className={styles.widgetBadge}>RESULTS THAT COMPOUND</span>
                <span className={styles.widgetLabel}>Direct inquiries increase</span>
              </div>
              <div className={styles.widgetValueGroup}>
                <div className={styles.widgetValue}>+58%</div>
                <div className={styles.widgetSublabel}>Average increase in member inquiries</div>
              </div>
              <div className={styles.widgetChartWrapper}>
                <AnimatedSparkline />
              </div>
              <div className={styles.widgetFooter}>
                <span>Last 90 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUB-HERO DEPLOYED CHANNELS BAR */}
      <div className={styles.servicesBar}>
        <div className={styles.servicesBarInner}>
          <div className={styles.serviceBarItem}>
            <GoogleAdsIcon />
            <span>Google Ads</span>
          </div>
          <div className={styles.serviceBarItem}>
            <MetaAdsIcon />
            <span>Meta Ads</span>
          </div>
          <div className={styles.serviceBarItem}>
            <WebsiteIcon stroke="#2563eb" />
            <span>Club Websites</span>
          </div>
          <div className={styles.serviceBarItem}>
            <SeoIcon />
            <span>SEO</span>
          </div>
          <div className={styles.serviceBarItem}>
            <BookingFlowIcon />
            <span>Booking Flow</span>
          </div>
          <div className={styles.serviceBarItem}>
            <TrackingIcon />
            <span>Lead Tracking</span>
          </div>
        </div>
      </div>

      {/* 3. THE PROBLEM SECTION */}
      <section className={styles.problemSection}>
        <div className={styles.sectionInner}>
          <div className={styles.gridSplit}>
            <div className={styles.stickyCol}>
              <span className={`${styles.miniLabel} ${styles.problemLabel}`}>THE PROBLEM</span>
              <h2 className={styles.splitSectionTitle}>WHY CLUBS <br />LOSE MEMBERS.</h2>
            </div>
            
            <div className={styles.cardsCol}>
              <div className={styles.problemCard}>
                <span className={styles.problemNum}>01</span>
                <ProblemWebsiteIcon />
                <h3 className={styles.cardTitle}>POOR DIGITAL DISCOVERY</h3>
                <p className={styles.cardDesc}>Failing to project the exclusive atmosphere of the club online.</p>
              </div>

              <div className={styles.problemCard}>
                <span className={styles.problemNum}>02</span>
                <ProblemOtaIcon />
                <h3 className={styles.cardTitle}>FRICTION-HEAVY APPLICATION</h3>
                <p className={styles.cardDesc}>Overly long forms and tedious verification that deter potential members.</p>
              </div>

              <div className={styles.problemCard}>
                <span className={styles.problemNum}>03</span>
                <ProblemInquiryIcon />
                <h3 className={styles.cardTitle}>INACTIVE MEMBER ENGAGEMENT</h3>
                <p className={styles.cardDesc}>Lack of personalized newsletter or digital invitations to keep members active.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 4. THE SOLUTION SECTION */}
      <section className={styles.solutionSection}>
        <div className={styles.sectionInner}>
          <div className={styles.solutionGridSplit}>
            <div className={styles.stickyCol}>
              <span className={styles.miniLabel}>OUR SOLUTION</span>
              <h2 className={styles.splitSectionTitle}>WHAT WE <br />IMPROVE.</h2>
            </div>

            <div className={styles.solutionsGrid}>
              <div className={styles.solutionCard}>
                <span className={styles.solutionNum}>01</span>
                <SolutionWebsiteIcon />
                <h3 className={styles.solutionCardTitle}>EXCLUSIVE BRAND EXPERIENCES</h3>
                <p className={styles.solutionCardDesc}>Beautiful websites presenting private atmospheres and prestige.</p>
              </div>

              <div className={styles.solutionCard}>
                <span className={styles.solutionNum}>02</span>
                <SolutionAdIcon />
                <h3 className={styles.solutionCardTitle}>ADVERTISING & SEO</h3>
                <p className={styles.solutionCardDesc}>Targeting high-net-worth individuals in local metropolitan areas.</p>
              </div>

              <div className={styles.solutionCard}>
                <span className={styles.solutionNum}>03</span>
                <SolutionAutomationIcon />
                <h3 className={styles.solutionCardTitle}>STREAMLINED APPLICATION FLOW</h3>
                <p className={styles.solutionCardDesc}>Frictionless, secure online registration and booking setups.</p>
              </div>

              <div className={styles.solutionCard}>
                <span className={styles.solutionNum}>04</span>
                <SolutionTrackingIcon />
                <h3 className={styles.solutionCardTitle}>COMMUNITY AUTOMATIONS</h3>
                <p className={styles.solutionCardDesc}>Exclusive newsletter, loyalty perks, and RSVP automation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 5. PROCESS SECTION */}
      <section className={styles.processSection}>
        <div className={styles.sectionInner}>
          <div className={styles.processGridSplit}>
            <div className={styles.stickyCol}>
              <span className={styles.miniLabel}>OUR PROCESS</span>
              <h2 className={styles.splitSectionTitle}>A SIMPLE <br />GROWTH <br />PROCESS.</h2>
            </div>

            <div className={styles.processTimelineCol}>
              <div className={styles.processStepNode}>
                <span className={styles.stepNum}>01</span>
                <div className={styles.stepIconWrapper}>
                  <ProcessAuditIcon />
                </div>
                <h3 className={styles.stepName}>DISCOVER &<br />AUDIT</h3>
              </div>

              <div className={styles.stepArrow}>&rarr;</div>

              <div className={styles.processStepNode}>
                <span className={styles.stepNum}>02</span>
                <div className={styles.stepIconWrapper}>
                  <ProcessStrategyIcon />
                </div>
                <h3 className={styles.stepName}>STRATEGY<br />& PLAN</h3>
              </div>

              <div className={styles.stepArrow}>&rarr;</div>

              <div className={styles.processStepNode}>
                <span className={styles.stepNum}>03</span>
                <div className={styles.stepIconWrapper}>
                  <ProcessBuildIcon />
                </div>
                <h3 className={styles.stepName}>BUILD &<br />EXECUTE</h3>
              </div>

              <div className={styles.stepArrow}>&rarr;</div>

              <div className={styles.processStepNode}>
                <span className={styles.stepNum}>04</span>
                <div className={styles.stepIconWrapper}>
                  <ProcessScaleIcon />
                </div>
                <h3 className={styles.stepName}>OPTIMIZE<br />& SCALE</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 6. ANALYTICS & INSIGHTS (LIVE DASHBOARD) */}
      <section className={styles.insightsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.insightsGrid}>
            <div className={styles.insightsText}>
              <span className={styles.miniLabel}>REAL-TIME INSIGHTS</span>
              <h2 className={styles.insightsTitle}>See what drives your growth.</h2>
              <p className={styles.insightsDesc}>Live dashboards that turn data into decisions.</p>
              <Link href="/contact" className={styles.btnOutline}>
                REQUEST GROWTH REVIEW &rarr;
              </Link>
            </div>

            <div className={styles.dashboardContainer}>
              <div className={styles.dashboardLeft}>
                <div className={styles.dbHeader}>
                  <span className={styles.dbTitle}>Direct Booking Performance</span>
                </div>
                <div className={styles.dbOverviewStats}>
                  <div className={styles.dbStatBlock}>
                    <span className={styles.dbStatLabel}>Direct Bookings</span>
                    <div className={styles.dbStatValGroup}>
                      <span className={styles.dbStatValue}>892</span>
                      <span className={styles.dbStatChangePos}>+18%</span>
                    </div>
                  </div>
                  <div className={styles.dbStatBlock}>
                    <span className={styles.dbStatLabel}>Revenue</span>
                    <div className={styles.dbStatValGroup}>
                      <span className={styles.dbStatValue}>$512K</span>
                      <span className={styles.dbStatChangePos}>+27%</span>
                    </div>
                  </div>
                  <div className={styles.dbStatBlock}>
                    <span className={styles.dbStatLabel}>Conversion Rate</span>
                    <div className={styles.dbStatValGroup}>
                      <span className={styles.dbStatValue}>3.42%</span>
                      <span className={styles.dbStatChangePos}>+14%</span>
                    </div>
                  </div>
                  <div className={styles.dbStatBlock}>
                    <span className={styles.dbStatLabel}>Avg. Booking Value</span>
                    <div className={styles.dbStatValGroup}>
                      <span className={styles.dbStatValue}>$875</span>
                      <span className={styles.dbStatChangePos}>+12%</span>
                    </div>
                  </div>
                </div>

                <div className={styles.dbGraphRow}>
                  <div className={styles.dbChartBlock}>
                    <span className={styles.dbBlockTitle}>Last 12 Months</span>
                    <div className={styles.dbChartSvgBox}>
                      <svg viewBox="0 0 400 150" width="100%" height="100%" fill="none" style={{ overflow: 'visible' }}>
                        <defs>
                          <linearGradient id="dbChartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <line x1="15" y1="135" x2="378" y2="135" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="15" y1="100" x2="378" y2="100" stroke="#f3f4f6" strokeWidth="1" />
                        <line x1="15" y1="65" x2="378" y2="65" stroke="#f3f4f6" strokeWidth="1" />
                        <line x1="15" y1="30" x2="378" y2="30" stroke="#f3f4f6" strokeWidth="1" />
                        
                        <path 
                          className={styles.dbChartGradientPath} 
                          d="M 15 125 L 48 115 L 81 95 L 114 102 L 147 88 L 180 78 L 213 85 L 246 65 L 279 50 L 312 62 L 345 40 L 378 25 L 378 135 L 15 135 Z" 
                          fill="url(#dbChartGradient)" 
                        />
                        
                        <path 
                          className={styles.dbChartPath} 
                          d="M 15 125 L 48 115 L 81 95 L 114 102 L 147 88 L 180 78 L 213 85 L 246 65 L 279 50 L 312 62 L 345 40 L 378 25" 
                          stroke="#10b981" 
                          strokeWidth="3.2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        
                        <circle className="dbDotPoint" cx="15" cy="125" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="48" cy="115" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="81" cy="95" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="114" cy="102" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="147" cy="88" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="180" cy="78" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="213" cy="85" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="246" cy="65" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="279" cy="50" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="312" cy="62" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="345" cy="40" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        <circle className="dbDotPoint" cx="378" cy="25" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                        
                        <text x="15" y="146" fill="#4b5563" fontSize="10" textAnchor="middle">Jan</text>
                        <text x="81" y="146" fill="#4b5563" fontSize="10" textAnchor="middle">Mar</text>
                        <text x="147" y="146" fill="#4b5563" fontSize="10" textAnchor="middle">May</text>
                        <text x="213" y="146" fill="#4b5563" fontSize="10" textAnchor="middle">Jul</text>
                        <text x="279" y="146" fill="#4b5563" fontSize="10" textAnchor="middle">Sep</text>
                        <text x="345" y="146" fill="#4b5563" fontSize="10" textAnchor="middle">Nov</text>
                      </svg>
                    </div>
                  </div>

                  <div className={styles.dbChannelBlock}>
                    <span className={styles.dbBlockTitle}>Bookings by Channel</span>
                    <div className={styles.dbChannelsGrid}>
                      <div className={styles.donutPlaceholder}>
                        <svg width="64" height="64" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="5" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="48 100" strokeDashoffset="25" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="5" strokeDasharray="27 100" strokeDashoffset="77" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDasharray="17 100" strokeDashoffset="50" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="5" strokeDasharray="8 100" strokeDashoffset="33" />
                        </svg>
                      </div>
                      <div className={styles.dbChannelsLegend}>
                        <div className={styles.legendRow}>
                          <span className={styles.legendLabelGroup}>
                            <span className={styles.dotDirect}></span>
                            <span>Direct</span>
                          </span>
                          <strong>48%</strong>
                        </div>
                        <div className={styles.legendRow}>
                          <span className={styles.legendLabelGroup}>
                            <span className={styles.dotOrganic}></span>
                            <span>Organic</span>
                          </span>
                          <strong>27%</strong>
                        </div>
                        <div className={styles.legendRow}>
                          <span className={styles.legendLabelGroup}>
                            <span className={styles.dotPaid}></span>
                            <span>Paid</span>
                          </span>
                          <strong>17%</strong>
                        </div>
                        <div className={styles.legendRow}>
                          <span className={styles.legendLabelGroup}>
                            <span className={styles.dotReferral}></span>
                            <span>Referral</span>
                          </span>
                          <strong>8%</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.dashboardRight}>
                <img
                  src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80"
                  alt="Exclusive lounge area view inside dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 7. PROVEN RESULTS SECTION */}
      <section className={styles.resultsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.resultsGridSplit}>
            <div className={styles.stickyCol}>
              <span className={styles.miniLabel}>PROVEN RESULTS</span>
              <h2 className={styles.splitSectionTitle}>Real clubs. <br />Real growth.</h2>
            </div>

            <div className={styles.resultsGrid}>
              <div className={styles.resultsCard}>
                <img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=400&q=80" alt="The Soho Chambers" className={styles.resultsCardBgImg} />
                <div className={styles.resultsCardOverlay}></div>
                <div className={styles.resultsCardContent}>
                  <span className={styles.resultHotelName}>THE SOHO CHAMBERS</span>
                  <div className={styles.resultStatGroup}>
                    <div className={styles.resultStatBlock}>
                      <div className={styles.resultStatVal}>+42%</div>
                      <div className={styles.resultStatLbl}>Member Inquiries</div>
                    </div>
                    <div className={styles.resultStatBlock}>
                      <div className={styles.resultStatVal}>+25%</div>
                      <div className={styles.resultStatLbl}>Member Signups</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.resultsCard}>
                <img src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=400&q=80" alt="Amber Lounge" className={styles.resultsCardBgImg} />
                <div className={styles.resultsCardOverlay}></div>
                <div className={styles.resultsCardContent}>
                  <span className={styles.resultHotelName}>AMBER LOUNGE</span>
                  <div className={styles.resultStatGroup}>
                    <div className={styles.resultStatBlock}>
                      <div className={styles.resultStatVal}>+58%</div>
                      <div className={styles.resultStatLbl}>Direct Bookings</div>
                    </div>
                    <div className={styles.resultStatBlock}>
                      <div className={styles.resultStatVal}>+34%</div>
                      <div className={styles.resultStatLbl}>Event Revenue</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.resultsCard}>
                <img src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=400&q=80" alt="The Metropolitan Club" className={styles.resultsCardBgImg} />
                <div className={styles.resultsCardOverlay}></div>
                <div className={styles.resultsCardContent}>
                  <span className={styles.resultHotelName}>THE METROPOLITAN CLUB</span>
                  <div className={styles.resultStatGroup}>
                    <div className={styles.resultStatBlock}>
                      <div className={styles.resultStatVal}>+50%</div>
                      <div className={styles.resultStatLbl}>Member Growth</div>
                    </div>
                    <div className={styles.resultStatBlock}>
                      <div className={styles.resultStatVal}>+22%</div>
                      <div className={styles.resultStatLbl}>Direct Yields</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OUR PORTFOLIO SECTION */}
      <section className={styles.portfolioSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.portfolioLabel}>SELECTED WORK</span>
            <h2 className={styles.portfolioTitle}>OUR PORTFOLIO</h2>
          </div>
          <div className={styles.portfolioGrid}>
            {portfolioProjects.map((proj, idx) => (
              <PortfolioCard key={idx} {...proj} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqHeader}>
            <span className={styles.faqLabel}>COMMON QUESTIONS</span>
            <h2 className={styles.faqTitle}>FAQS</h2>
          </div>
          <FaqAccordion faqs={clubFaqs} />
        </div>
      </section>

    </div>
  );
};

export default ClubsLounges;
