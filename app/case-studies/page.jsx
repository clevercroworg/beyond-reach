"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CaseStudies.module.css';

// Highly-interactive, beautifully animated Custom SVG Donut Chart component for Light Background
const InteractivePieChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedPercent = 0;

  return (
    <div className={styles.pieChartCard}>
      <h4 className={styles.sidebarTitle}>BOOKING DISTRIBUTION</h4>

      <div className={styles.pieChartWrapper}>
        <svg className={styles.pieChartSvg} viewBox="0 0 140 140">
          <g transform="translate(70, 70)">
            {/* Background Track Circle */}
            <circle
              cx="0"
              cy="0"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="28"
            />
            {data.map((slice, index) => {
              const percentage = (slice.value / total) * 100;
              const strokeDashoffset = circumference - (percentage / 100) * circumference;
              const rotation = (accumulatedPercent / 100) * 360;
              accumulatedPercent += percentage;

              const isHovered = hoveredIndex === index;

              return (
                <circle
                  key={slice.name}
                  className={styles.pieSegment}
                  r={radius}
                  cx="0"
                  cy="0"
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="28"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(${rotation})`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    opacity: hoveredIndex === null || isHovered ? 1 : 0.65
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Center overlay text for glassmorphic donut */}
        <div className={styles.pieCenterText}>
          <span className={styles.pieCenterValue}>
            {hoveredIndex !== null 
              ? `${Math.round((data[hoveredIndex].value / total) * 100)}%` 
              : `${Math.round((data[0].value / total) * 100)}%`
            }
          </span>
          <span className={styles.pieCenterLabel}>
            {hoveredIndex !== null ? data[hoveredIndex].name : data[0].name}
          </span>
        </div>
      </div>

      {/* Legend Block */}
      <div className={styles.pieLegend}>
        {data.map((slice, index) => (
          <div 
            key={slice.name}
            className={styles.pieLegendItem}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              backgroundColor: hoveredIndex === index ? '#f1f5f9' : 'transparent'
            }}
          >
            <div className={styles.pieLegendLeft}>
              <div 
                className={styles.pieLegendBullet} 
                style={{ backgroundColor: slice.color, boxShadow: `0 0 8px ${slice.color}35` }}
              ></div>
              <span className={styles.pieLegendName}>{slice.name}</span>
            </div>
            <span className={styles.pieLegendPercent}>
              {Math.round((slice.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const caseStudiesData = [
  {
    id: 'ashtitva',
    title: "ASHTITVA",
    client: "ASHTITVA",
    propertyType: "Bespoke Event Venues",
    location: "Bengaluru, India",
    capacity: "3,750 Guests",
    services: ['BRANDING', 'STRATEGY', 'SEO', 'WEBSITES', 'ADS'],
    tagline: "Unified 7 premium open-air event venues across Bengaluru into a commission-free direct booking engine, bypassing aggregator portals.",
    imgSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    kpis: [
      { label: "Total Revenue Generated", value: "₹1.5Cr+" },
      { label: "Organic Search Growth", value: "40%+" },
      { label: "Direct Leads Converted", value: "10x+" },
      { label: "OTA Commissions Saved", value: "₹25 Lakhs+" }
    ],
    gaugeScore: 98,
    gaugeLabel: "Digital Performance Score",
    scoreBars: [
      { score: 98, max: 100, label: "User Experience (UX)" },
      { score: 96, max: 100, label: "Inquiry Conversion Rate" }
    ],
    statusCards: [
      { label: "React 19 & Vite 8", value: "Fast" },
      { label: "14 Guest Rooms Booking", value: "Yes" },
      { label: "Direct Leads Conversion", value: "High" }
    ],
    pieData: [
      { name: "Direct Inquiries", value: 68, color: "#10b981" },
      { name: "Aggregator Directories", value: 18, color: "#0ea5e9" },
      { name: "Offline Agencies", value: 14, color: "#f43f5e" }
    ],
    bulletPoints: [
      "Built a dedicated website with an inquiry form and venue showcase, replacing their old dependency on third-party listing sites.",
      "Set up Google My Business profiles for all 7 venue locations, improving local search visibility across Bengaluru.",
      "Ran targeted Google and Meta ad campaigns during wedding and corporate event seasons to drive qualified leads directly."
    ]
  },
  {
    id: 'sailo',
    title: "SAILO CLUB",
    client: "SAILO",
    propertyType: "Luxury Yacht & Charter",
    location: "Mumbai & Goa, India",
    capacity: "12 Superyachts",
    services: ['BRANDING', 'WEBSITE', 'SEO', 'FLEET MGMT', 'ADS'],
    tagline: "Overhauled digital fleet management, indexing page-one search rankings and launching direct, high-value superyacht charter bookings.",
    imgSrc: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    kpis: [
      { label: "Total Bookings Value", value: "₹85 Lakhs+" },
      { label: "Organic Search Volume", value: "72%+" },
      { label: "Lead Generation Gain", value: "5x+" },
      { label: "OTA Fees Eliminated", value: "25% Saved" }
    ],
    gaugeScore: 94,
    gaugeLabel: "SEO Visibility Score",
    scoreBars: [
      { score: 88, max: 100, label: "Booking Conversions" },
      { score: 96, max: 100, label: "Core Web Vitals" }
    ],
    statusCards: [
      { label: "Rate Parity Control", value: "Yes" },
      { label: "Mobile Performance", value: "Fast" },
      { label: "Direct Leads Conversion", value: "High" }
    ],
    pieData: [
      { name: "Direct Bookings", value: 58, color: "#10b981" },
      { name: "OTA Portals", value: 22, color: "#0ea5e9" },
      { name: "Offline Groups", value: 20, color: "#f43f5e" }
    ],
    bulletPoints: [
      "Designed a clean, mobile-first website showcasing the full fleet with real photos, pricing tiers, and a WhatsApp inquiry button.",
      "Created SEO-optimized landing pages for key search terms like 'yacht rental Mumbai' and 'boat party Goa' to capture organic traffic.",
      "Managed paid campaigns on Instagram and Google targeting high-intent audiences in the luxury travel and celebration space."
    ]
  },
  {
    id: 'navigate',
    title: "NAVIGATE AGENCY",
    client: "NAVIGATE",
    propertyType: "Event Venues & Spaces",
    location: "Bangalore, India",
    capacity: "500 Guests",
    services: ['STRATEGY', 'ADS', 'CONTENT', 'PROGRAMMATIC'],
    tagline: "Deployed hyper-targeted programmatic ad funnels and premium visual content, scaling booking rates during off-seasons.",
    imgSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
    kpis: [
      { label: "Total Revenue Generated", value: "₹1.2Cr+" },
      { label: "Paid Ads Return (ROAS)", value: "3.8x" },
      { label: "CPA Cost Reduction", value: "52%+" },
      { label: "Conversion Volume", value: "10x+" }
    ],
    gaugeScore: 88,
    gaugeLabel: "Digital Campaign Health",
    scoreBars: [
      { score: 78, max: 100, label: "Creative CTR" },
      { score: 92, max: 100, label: "ROI Efficiency" }
    ],
    statusCards: [
      { label: "Audience Target Match", value: "Yes" },
      { label: "Lead Quality Rate", value: "High" },
      { label: "Ad Load Speed", value: "Fast" }
    ],
    pieData: [
      { name: "Direct Bookings", value: 60, color: "#10b981" },
      { name: "OTA Portals", value: 15, color: "#0ea5e9" },
      { name: "Offline Groups", value: 25, color: "#f43f5e" }
    ],
    bulletPoints: [
      "Produced professional photo and video content for social media, replacing the client's older phone-shot material with polished visuals.",
      "Set up location-based Google Ads campaigns targeting event planners and couples searching for venues in Bangalore.",
      "Ran retargeting ads on Meta to re-engage website visitors who browsed venue pages but didn't submit an inquiry."
    ]
  },
  {
    id: 'yacht-club-india',
    title: "YACHT CLUB INDIA",
    client: "YACHT CLUB",
    propertyType: "Homestays & Villas",
    location: "Goa & Bangalore, India",
    capacity: "8 Sea-Villas",
    services: ['BOOKING SYSTEM', 'DESIGN', 'DEVELOP', 'PAYMENTS', 'ADS'],
    tagline: "Designed an elite custom 3-step villa booking portal, successfully eliminating high cart abandonment rates and middleman fees.",
    imgSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    kpis: [
      { label: "Total Booking Value", value: "₹2.1Cr+" },
      { label: "Cart Abandonment Drop", value: "62%+" },
      { label: "Booking Frequency Lift", value: "2.4x" },
      { label: "OTA Commission Paid", value: "0%" }
    ],
    gaugeScore: 96,
    gaugeLabel: "Booking Flow Efficiency",
    scoreBars: [
      { score: 95, max: 100, label: "System Performance" },
      { score: 99, max: 100, label: "Platform Uptime" }
    ],
    statusCards: [
      { label: "Rate Parity Locked", value: "Yes" },
      { label: "Payment Checkout Vitals", value: "Fast" },
      { label: "Direct Conversions", value: "High" }
    ],
    pieData: [
      { name: "Direct Bookings", value: 72, color: "#10b981" },
      { name: "OTA Portals", value: 18, color: "#00d2ff" },
      { name: "Offline Groups", value: 10, color: "#f43f5e" }
    ],
    bulletPoints: [
      "Built a simple 3-step booking flow — select dates, choose a villa, and pay — cutting down the drop-off rate significantly.",
      "Integrated Razorpay for seamless online payments with instant booking confirmations via email and SMS.",
      "Created lifestyle photography and drone video content for each property, used across the website, Google Ads, and Instagram."
    ]
  }
];

const filterCategories = ['All', 'Event Venues', 'Yachts & Charters', 'Homestays & Villas', 'Resorts'];

const getCategoryForProject = (propertyType) => {
  if (propertyType.toLowerCase().includes('yacht') || propertyType.toLowerCase().includes('charter')) return 'Yachts & Charters';
  if (propertyType.toLowerCase().includes('homestay') || propertyType.toLowerCase().includes('villa')) return 'Homestays & Villas';
  if (propertyType.toLowerCase().includes('resort')) return 'Resorts';
  return 'Event Venues';
};

export default function CaseStudiesPage() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const filteredStudies = activeFilter === 'All'
    ? caseStudiesData
    : caseStudiesData.filter(p => getCategoryForProject(p.propertyType) === activeFilter);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Entrance animations for the stacked rows
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(`.${styles.label}`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .fromTo(`.${styles.title}`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }, "-=0.4")
        .fromTo(`.${styles.subtitle}`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .fromTo(`.${styles.stackedSection}`, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.pageContainer} ref={containerRef}>
      {/* Background Ambience Elements */}
      <div className={styles.bgGlow}></div>
      <div className={styles.bgGlow2}></div>

      {/* Top Global Navigation Bar */}
      <nav className={styles.pageNavbar}>
        <div className={styles.navLogo}>
          <a href="/">
            <span className={styles.logoBold}>BEYOND</span> <span className={styles.logoLight}>REACH</span>
          </a>
        </div>
        <a href="tel:+919999999999" className={styles.phoneLink}>
          <svg className={styles.phoneIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </nav>

      {/* Main Catalog Header Section */}
      <header className={styles.darkHeader}>
        <div className={styles.headerBgImage}></div>
        <div className={styles.headerOverlay}></div>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>Case Studies</h1>
        </div>
      </header>

      {/* Property Type Filter */}
      <div className={styles.filterBar}>
        <span className={styles.filterLabel}>Filter by</span>
        <div className={styles.filterDropdown} ref={filterRef}>
          <button
            className={styles.filterToggle}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <span>{activeFilter}</span>
            <svg className={`${styles.filterChevron} ${filterOpen ? styles.filterChevronOpen : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {filterOpen && (
            <div className={styles.filterMenu}>
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterOption} ${activeFilter === cat ? styles.filterOptionActive : ''}`}
                  onClick={() => { setActiveFilter(cat); setFilterOpen(false); }}
                >
                  {cat}
                  {activeFilter === cat && (
                    <svg className={styles.filterCheckIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.contentWrapper}>

        {/* Vertical Stacked Case Studies */}
        <div>
          {filteredStudies.map((project) => (
            <div 
              key={project.id} 
              id={project.id}
              className={styles.stackedSection}
            >
              {/* Video Hero Banner — title + capacity overlaid on background video */}
              <div className={styles.videoHeroBanner}>
                <video
                  className={styles.heroBgVideo}
                  src="/case-studies/assets/venue-1-compressed.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className={styles.heroVideoOverlay}></div>
                <div className={styles.heroVideoContent}>
                  <h3 className={styles.heroProjectTitle}>{project.title}</h3>
                  <div className={styles.heroMetaRow}>
                    <div className={styles.heroMetaItem}>
                      <span className={styles.heroMetaLabel}>PROPERTY CATEGORY</span>
                      <span className={styles.heroMetaValue}>{project.propertyType}</span>
                    </div>
                    <div className={styles.heroMetaDivider}></div>
                    <div className={styles.heroMetaItem}>
                      <span className={styles.heroMetaLabel}>CAPACITY</span>
                      <span className={styles.heroMetaValue}>{project.capacity}</span>
                    </div>
                    <div className={styles.heroMetaDivider}></div>
                    <div className={styles.heroMetaItem}>
                      <span className={styles.heroMetaLabel}>LOCATION</span>
                      <span className={styles.heroMetaValue}>{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2-Column Layout Grid */}
              <div className={styles.csMainGrid}>

                {/* RIGHT COLUMN: Service Badges and Stats */}
                <div className={styles.rightCol}>

                  {/* Scope of Work Badges (Different Colors) */}
                  <div className={styles.servicesSection}>
                    <span className={styles.sectionHeaderLabel}>WHAT WE WORKED ON</span>
                    <div className={styles.badgeContainer}>
                      {project.services.map((service, idx) => {
                        const badgeClasses = [
                          styles.badgeSky,
                          styles.badgePurple,
                          styles.badgeEmerald,
                          styles.badgeAmber
                        ];
                        const badgeClass = badgeClasses[idx % badgeClasses.length];
                        return (
                          <span key={service} className={`${styles.serviceBadge} ${badgeClass}`}>
                            {service}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* High-Impact Stat Highlights */}
                  <div className={styles.rightStatsSection}>
                    <span className={styles.sectionHeaderLabel}>CAMPAIGN PERFORMANCE VITALS</span>
                    <div className={styles.kpiCompactGrid}>
                      {project.kpis.map((kpi, kpiIdx) => (
                        <div key={kpiIdx} className={styles.kpiCompactCard}>
                          <span className={styles.kpiCompactValue}>{kpi.value}</span>
                          <span className={styles.kpiCompactLabel}>{kpi.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Robust Statistics Divider */}
              <div className={styles.sectionDivider}></div>

              {/* Section A: Detailed Outcomes & Donut Charts */}
              <div className={styles.kpiCardGridWrapper}>
                <span className={styles.sectionHeaderLabel}>BOOKING PORTALS</span>
              </div>

              <div className={styles.analyticsGrid}>
                {/* Spacious Donut Card */}
                <InteractivePieChart data={project.pieData} />

                {/* Column 2: What We Delivered Card */}
                <div className={`${styles.outcomesCard} ${styles.mobileHidden}`}>
                  <h4 className={styles.outcomesTitle}>WHAT WE DELIVERED</h4>
                  <div className={styles.outcomesList}>
                    {project.bulletPoints.map((point, index) => (
                      <div key={index} className={styles.outcomeItem}>
                        <div className={styles.outcomeStep}>
                          <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <span className={styles.outcomeText}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
