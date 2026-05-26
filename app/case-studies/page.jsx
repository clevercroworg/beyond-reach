"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CaseStudies.module.css';
import AnimatedGauge from '@/components/AnimatedGauge';
import AnimatedScoreBar from '@/components/AnimatedScoreBar';
import AnimatedStatusCard from '@/components/AnimatedStatusCard';

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
      <p className={styles.sidebarText} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Direct booking volume vs OTA portals and traditional sales channels post-optimization.
      </p>

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
    title: "ASTHITVA BENGALURU",
    client: "ASTHITVA",
    propertyType: "Bespoke Event Venues",
    location: "Bengaluru, India",
    capacity: "7 Venues / 3,750 Guests",
    services: ['BRANDING', 'STRATEGY', 'SEO', 'WEBSITES'],
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
      "Custom React 19 / Vite 8 booking portal optimized for Bengaluru event guest clusters.",
      "Integrated dynamic slot pricing module across 7 premium venues (Teak Meadows, RR Nagar, Ullal, Muddainapalya).",
      "Eliminated directory commissions completely, securing 14 guest rooms and absolute booking authority."
    ]
  },
  {
    id: 'sailo',
    title: "SAILO CLUB",
    client: "SAILO",
    propertyType: "Luxury Yacht & Charter",
    location: "Mumbai & Goa, India",
    capacity: "12 Crewed Superyachts",
    services: ['BRANDING', 'WEBSITE', 'SEO', 'FLEET MGMT'],
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
      "Zero-commission yacht reservation engine capturing direct, premium charter inquiries.",
      "Immersive UI engineering optimized for high-value transactional flows.",
      "Organic authority expansion indexing permanent page-one results on travel keywords."
    ]
  },
  {
    id: 'navigate',
    title: "NAVIGATE AGENCY",
    client: "NAVIGATE",
    propertyType: "Event Venues & Spaces",
    location: "Bangalore, India",
    capacity: "500 Guest Capacity",
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
      "Precision programmatic geo-targeting parameters minimizing advertising budget leakages.",
      "Cinema-grade editorial visual assets producing outstanding social engagement rates.",
      "Advanced data-driven retargeting securing high conversions during traditional off-seasons."
    ]
  },
  {
    id: 'yacht-club-india',
    title: "YACHT CLUB INDIA",
    client: "YACHT CLUB",
    propertyType: "Homestays & Villas",
    location: "Goa & Bangalore, India",
    capacity: "8 Luxury Sea-Villas",
    services: ['BOOKING SYSTEM', 'DESIGN', 'DEVELOP', 'PAYMENTS'],
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
      "Custom three-step check-out architecture reducing booking friction by 62%.",
      "Multi-currency dynamic pricing models supporting seamless global payments.",
      "High-end visual asset display driving massive brand credibility and conversion volumes."
    ]
  }
];

export default function CaseStudiesPage() {
  const containerRef = useRef(null);

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

      <div className={styles.contentWrapper}>
        {/* Main Catalog Header Section */}
        <header className={styles.header}>
          <span className={styles.label}>CASE STUDY SHOWCASE</span>
          <h1 className={styles.title}>OUR SELECTED WORK</h1>
          <p className={styles.subtitle}>
            Explore our highly-structured digital audits and business metrics. Bypassing middleman directories, eliminating OTA fees, and architecting absolute conversion dominance.
          </p>
        </header>

        {/* Vertical Stacked Case Studies */}
        <div>
          {caseStudiesData.map((project) => (
            <div 
              key={project.id} 
              id={project.id}
              className={styles.stackedSection}
            >
              {/* 2-Column Layout Grid */}
              <div className={styles.csMainGrid}>
                
                {/* LEFT COLUMN: Image & Capacity Card */}
                <div className={styles.leftCol}>
                  <div className={styles.csHeroImageWrapper}>
                    <img 
                      src={project.imgSrc} 
                      alt={project.title} 
                      className={styles.csHeroImage}
                    />
                  </div>
                  
                  {/* Property capacity card directly under the image */}
                  <section className={styles.csCapacitySection}>
                    <div className={styles.capacityGrid}>
                      <div className={styles.capacityItem}>
                        <span className={styles.capacityLabel}>PROPERTY CATEGORY</span>
                        <span className={styles.capacityValue}>{project.propertyType}</span>
                      </div>
                      <div className={styles.capacityItem}>
                        <span className={styles.capacityLabel}>ACCOMMODATION CAPACITY</span>
                        <span className={styles.capacityValue}>{project.capacity}</span>
                      </div>
                      <div className={styles.capacityItem}>
                        <span className={styles.capacityLabel}>COMMISSION SLICES</span>
                        <span className={styles.capacityValue}>0% COMMISSION</span>
                      </div>
                    </div>
                  </section>
                </div>

                {/* RIGHT COLUMN: Project Info, Location, Service Badges, and Stats */}
                <div className={styles.rightCol}>
                  <div className={styles.headerLeftBlock}>
                    <span className={styles.csClientTitleLabel}>CLIENT PARTNER</span>
                    <h3 className={styles.csClientNameText}>{project.title}</h3>
                    
                    <div className={styles.metaRow}>
                      {/* Location Badge */}
                      <div className={styles.locationBadge}>
                        <svg className={styles.locationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{project.location}</span>
                      </div>
                      <span className={styles.propertyTypeLabel}>Type: {project.propertyType}</span>
                    </div>
                  </div>

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

              {/* Section A: Detailed Outcomes & Digital Audits */}
              <div className={styles.kpiCardGridWrapper} style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                <span className={styles.sectionHeaderLabel}>01 // AUDIT RESULTS & BOOKING PORTALS</span>
              </div>

              <div className={styles.analyticsGrid}>
                {/* Column 1: Spacious Donut Card */}
                <InteractivePieChart data={project.pieData} />

                {/* Column 2: Spacious Audit & Platform Health Card */}
                <div className={styles.auditHealthCard}>
                  <span className={styles.csClientTitleLabel} style={{ marginBottom: '1.5rem', display: 'block' }}>DIGITAL AUDITS & platform health</span>
                  
                  <div className={styles.auditBody}>
                    {/* Score Bars Area */}
                    <div className={styles.scoreBarsWrapper}>
                      {project.scoreBars.map((bar, barIdx) => (
                        <AnimatedScoreBar 
                          key={barIdx}
                          score={bar.score}
                          max={bar.max}
                          label={bar.label}
                          light={true}
                        />
                      ))}
                    </div>

                    {/* Vertical Divider line */}
                    <div className={styles.verticalDivider}></div>

                    {/* Radial Gauge Area */}
                    <div className={styles.gaugeWrapper}>
                      <AnimatedGauge score={project.gaugeScore} light={true} />
                      <div className={styles.gaugeSubtitle}>
                        {project.gaugeLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section C: Platform Stability & Vitals Footer Row */}
              <div className={styles.statusSectionWrapper}>
                <span className={styles.sectionHeaderLabel} style={{ marginBottom: '1.5rem', display: 'block' }}>02 // PLATFORM STABILITY & DEPLOYMENT VITALS</span>
                <div className={styles.statusRow}>
                  {project.statusCards.map((card, cardIdx) => (
                    <AnimatedStatusCard 
                      key={cardIdx}
                      label={card.label}
                      value={card.value}
                      index={cardIdx}
                      light={true}
                    />
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
