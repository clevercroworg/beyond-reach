"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CaseStudiesSnap.module.css';
import { caseStudiesData } from '../case-studies/caseStudiesData';

// Custom fully interactive SVG Donut Chart component suited for premium dark mode
const GlassDonutChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;

  return (
    <div className={styles.donutWrapper}>
      <svg className={styles.donutSvg} viewBox="0 0 140 140">
        <g transform="translate(70, 70)">
          {/* Track background circle */}
          <circle
            cx="0"
            cy="0"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="18"
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
                className={styles.donutSegment}
                r={radius}
                cx="0"
                cy="0"
                fill="none"
                stroke={slice.color}
                strokeWidth={isSegmentActive ? "22" : "18"}
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
      {/* Center text indicating share */}
      <div className={styles.donutCenter}>
        <span className={styles.donutCenterValue}>
          {`${Math.round((data[activeIndex].value / total) * 100)}%`}
        </span>
        <span className={styles.donutCenterLabel} title={data[activeIndex].name}>
          {data[activeIndex].name}
        </span>
      </div>
    </div>
  );
};

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

export default function CaseStudiesSnapPage() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const filterRef = useRef(null);

  // Filter 51 data projects sorted alphabetically
  const filteredStudies = activeFilter === 'All'
    ? caseStudiesData
    : caseStudiesData.filter(p => getCategoryForProject(p.propertyType) === activeFilter);

  // Handle active slide tracking via container scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const slideHeight = container.clientHeight;
      if (slideHeight > 0) {
        const index = Math.round(scrollPos / slideHeight);
        if (index !== activeIndex && index >= 0 && index < filteredStudies.length) {
          setActiveIndex(index);
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Adjust index if filtered list size changes to avoid out of bounds
    if (activeIndex >= filteredStudies.length) {
      setActiveIndex(0);
      container.scrollTop = 0;
    }

    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, filteredStudies.length]);

  // Clickable sidebar dots navigation helper
  const navigateToSlide = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const slideHeight = container.clientHeight;
    
    container.scrollTo({
      top: index * slideHeight,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  // Close filter dropdown on outside clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Top Floating Global Navigation controls */}
      <nav className={styles.pageNavbar}>
        <div className={styles.navLogo}>
          <a href="/">
            <span className={styles.logoBold}>BEYOND</span> <span className={styles.logoLight}>REACH</span>
          </a>
        </div>
        
        <div className={styles.navbarRight}>
          {/* Glassmorphic Property Type Filter */}
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
            <AnimatePresence>
              {filterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={styles.filterMenu}
                >
                  {filterCategories.map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.filterOption} ${activeFilter === cat ? styles.filterOptionActive : ''}`}
                      onClick={() => {
                        setActiveFilter(cat);
                        setFilterOpen(false);
                        setActiveIndex(0);
                        if (containerRef.current) containerRef.current.scrollTop = 0;
                      }}
                    >
                      {cat}
                      {activeFilter === cat && (
                        <svg className={styles.filterCheckIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="tel:+919999999999" className={styles.phoneLink} title="Contact Support">
            <svg className={styles.phoneIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Floating Vertical Navigation Dots (Right Edge) */}
      {filteredStudies.length > 0 && (
        <div className={styles.floatingSidebar}>
          {filteredStudies.map((project, idx) => (
            <div key={project.id} className={styles.dotWrapper} onClick={() => navigateToSlide(idx)}>
              <span className={styles.dotLabel}>{project.title}</span>
              <div className={`${styles.dot} ${activeIndex === idx ? styles.dotActive : ''}`} />
            </div>
          ))}
        </div>
      )}

      {/* Main Snap Scroll Container */}
      <div className={styles.snapContainer} ref={containerRef}>
        {filteredStudies.length > 0 ? (
          filteredStudies.map((project, idx) => {
            const isSlideActive = activeIndex === idx;
            // Cinematic Rendering Guard: Only render background video loops for active & neighbor slides
            const shouldRenderVideo = Math.abs(idx - activeIndex) <= 1;

            return (
              <section 
                key={project.id}
                id={project.id}
                className={styles.snapSection}
                style={{ zIndex: idx + 1 }}
              >
                <div className={styles.stickyWrapper}>
                  {/* Diagonal Slanted background container */}
                  <div className={styles.diagonalBg}>
                    {shouldRenderVideo && (
                      <video
                        className={styles.heroBgVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={`/case-studies/assets/${project.id}.mp4`} type="video/mp4" />
                        <source src="/case-studies/assets/venue-1-compressed.mp4" type="video/mp4" />
                      </video>
                    )}
                    <div className={styles.heroVideoOverlay}></div>
                  </div>

                  {/* Glassmorphic Central Content Dashboard Dashboard card */}
                  <motion.div 
                    className={styles.glassCard}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isSlideActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
                  >
                    {/* LEFT COLUMN: BRANDING AND IDENTITY */}
                    <div className={styles.leftCol}>
                      <div className={styles.identityBlock}>
                        <div className={styles.locationBadge}>
                          <svg className={styles.locationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{project.location}</span>
                        </div>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        
                        <div className={styles.metaRow}>
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>PROPERTY TYPE</span>
                            <span className={styles.metaValue}>{project.propertyType}</span>
                          </div>
                          <div className={styles.metaDivider} />
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>CAPACITY</span>
                            <span className={styles.metaValue}>{project.capacity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Scope of Work badges */}
                      <div className={styles.scopeSection}>
                        <span className={styles.sectionLabel}>SCOPE OF WORK</span>
                        <div className={styles.badgeContainer}>
                          {project.services.map((service, sIdx) => {
                            const badgeStyles = [
                              styles.badgeSky,
                              styles.badgePurple,
                              styles.badgeEmerald,
                              styles.badgeAmber
                            ];
                            const badgeStyle = badgeStyles[sIdx % badgeStyles.length];
                            return (
                              <span key={service} className={`${styles.serviceBadge} ${badgeStyle}`}>
                                {service}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: NUMERICAL STATS AND interactive AUDITS */}
                    <div className={styles.rightCol}>
                      
                      {/* Compact KPI Card Row */}
                      <div className={styles.kpiGrid}>
                        {project.kpis.map((kpi, kIdx) => (
                          <div key={kIdx} className={styles.kpiCard}>
                            <span className={styles.kpiValue}>{kpi.value}</span>
                            <span className={styles.kpiLabel}>{kpi.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* interactive Analytics Split row */}
                      <div className={styles.analyticsSection}>
                        {isSlideActive ? (
                          <GlassDonutChart data={project.pieData} />
                        ) : (
                          <div className={styles.donutWrapper} />
                        )}
                        
                        {/* Compact outcomes list */}
                        <div className={styles.outcomesWrapper}>
                          <span className={styles.outcomeTitle}>WHAT WE DELIVERED</span>
                          {project.bulletPoints.slice(0, 3).map((point, pIdx) => (
                            <div key={pIdx} className={styles.outcomeItem}>
                              <div className={styles.outcomeBullet}>
                                <span>✓</span>
                              </div>
                              <span className={styles.outcomeText}>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              </section>
            );
          })
        ) : (
          <div className={styles.emptyContainer}>
            <h3 className={styles.emptyTitle}>NO PROPERTIES FOUND</h3>
            <span>No case studies match your active selection filters.</span>
          </div>
        )}
      </div>
    </div>
  );
}
