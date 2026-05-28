"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './CaseStudies.module.css';

// Highly-interactive, beautifully animated Custom SVG Donut Chart component for Light Background
const InteractivePieChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  
  let accumulatedPercent = 0;

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;

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

              const isSegmentActive = activeIndex === index;

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
                  onClick={() => setSelectedIndex(index)}
                  onTouchStart={() => setSelectedIndex(index)}
                  style={{
                    opacity: isSegmentActive ? 1 : 0.65,
                    cursor: 'pointer'
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Center overlay text for glassmorphic donut */}
        <div className={styles.pieCenterText}>
          <span className={styles.pieCenterValue}>
            {`${Math.round((data[activeIndex].value / total) * 100)}%`}
          </span>
          <span className={styles.pieCenterLabel}>
            {data[activeIndex].name}
          </span>
        </div>
      </div>
    </div>
  );
};

import { caseStudiesData } from './caseStudiesData';

const filterCategories = [
  'All',
  'Resorts',
  'home stays',
  'adventure and activity',
  'Event venues'
];

const getCategoryForProject = (propertyType) => {
  const type = propertyType.toLowerCase();
  
  // Resorts (includes resorts, hotels, inns, retreats, palaces, forts, heritage, royal)
  if (
    type.includes('resort') || 
    type.includes('hotel') || 
    type.includes('inn') || 
    type.includes('retreat') || 
    type.includes('palace') || 
    type.includes('fort') || 
    type.includes('heritage') || 
    type.includes('royal')
  ) {
    return 'Resorts';
  }
  
  // home stays (villas, estates, homestays, farms)
  if (
    type.includes('homestay') || 
    type.includes('villa') || 
    type.includes('estate') || 
    type.includes('farm')
  ) {
    return 'home stays';
  }
  
  // adventure and activity (lodges, adventure, ski, exped, activity, tour, wilderness)
  if (
    type.includes('lodge') || 
    type.includes('adventure') || 
    type.includes('ski') || 
    type.includes('exped') || 
    type.includes('activity') || 
    type.includes('tour') || 
    type.includes('wilderness')
  ) {
    return 'adventure and activity';
  }
  
  // Event venues (default / event venues, yachts, charters, clubs, lounges)
  return 'Event venues';
};

export default function CaseStudiesPage() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  {isMobile ? (
                    <>
                      <source src={`/case-studies/assets/${project.id}-mobile.mp4`} type="video/mp4" />
                      <source src={`/case-studies/assets/${project.id}.mp4`} type="video/mp4" />
                      <source src="/case-studies/assets/venue-1-compressed.mp4" type="video/mp4" />
                    </>
                  ) : (
                    <>
                      <source src={`/case-studies/assets/${project.id}.mp4`} type="video/mp4" />
                      <source src="/case-studies/assets/venue-1-compressed.mp4" type="video/mp4" />
                    </>
                  )}
                </video>
                <div className={styles.heroVideoOverlay}></div>
                <div className={styles.heroLocationBadge}>
                  <svg className={styles.locationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{project.location}</span>
                </div>
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
