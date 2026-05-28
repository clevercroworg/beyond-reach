"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CaseStudiesSnap.module.css';
import { caseStudiesData } from '../case-studies/caseStudiesData';

// Custom fully interactive SVG Donut Chart component with dynamic legend hover syncing
const GlassDonutChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '1rem' }}>
      <div className={styles.donutWrapper}>
        <svg className={styles.donutSvg} viewBox="0 0 140 140">
          <g transform="translate(70, 70)">
            {/* Track background circle */}
            <circle
              cx="0"
              cy="0"
              r={radius}
              fill="none"
              stroke="rgba(15, 23, 42, 0.05)"
              strokeWidth="18"
            />
            {data.map((slice, index) => {
              const percentage = (slice.value / total) * 100;
              const strokeDashoffset = circumference - (percentage / 100) * circumference;
              const rotation = (accumulatedPercent / 100) * 360;
              accumulatedPercent += percentage;

              const isSegmentActive = activeIndex === index;

              return (
                <motion.circle
                  key={slice.name}
                  className={styles.donutSegment}
                  r={radius}
                  cx="0"
                  cy="0"
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={isSegmentActive ? 22 : 18}
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  transform={`rotate(${rotation})`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(index)}
                  onTouchStart={() => setSelectedIndex(index)}
                  style={{
                    opacity: isSegmentActive ? 1 : 0.65,
                    cursor: 'pointer',
                    transformOrigin: '0px 0px'
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

      {/* Pro Mode Interactive Legend list */}
      <div className={styles.donutLegend}>
        {data.map((slice, index) => (
          <div 
            key={slice.name} 
            className={styles.legendItem}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedIndex(index)}
            style={{
              borderColor: activeIndex === index ? slice.color : 'rgba(15, 23, 42, 0.04)',
              background: activeIndex === index ? `${slice.color}0a` : 'rgba(15, 23, 42, 0.02)',
              color: activeIndex === index ? '#0f172a' : '#475569',
              boxShadow: activeIndex === index ? `0 2px 8px ${slice.color}15` : 'none'
            }}
          >
            <span className={styles.legendDot} style={{ backgroundColor: slice.color }} />
            <span>{slice.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Premium, high-fidelity 3D perspective fold entrance variants for central dashboard cards
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 70, 
    rotateX: 12, // 3D structural perspective entries!
    scale: 0.96 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 85,
      damping: 16,
      staggerChildren: 0.08,
      delayChildren: 0.15
    } 
  }
};

const itemDownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  }
};

const itemUpVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 260, damping: 26 } 
  }
};

const titleVariants = {
  hidden: { opacity: 0, letterSpacing: "0.22em", y: 15 },
  visible: { 
    opacity: 1, 
    letterSpacing: "0.10em", 
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const badgeContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05 
    }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 22 } 
  }
};

const kpiGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const kpiCardVariants = {
  hidden: { opacity: 0, x: 25, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 } 
  }
};

const donutPodVariants = {
  hidden: { opacity: 0, scale: 0.92, rotate: 3 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

const outcomeItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 22 }
  }
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
                        poster={project.imgSrc}
                      >
                        <source src={`/case-studies/assets/${project.id}.mp4`} type="video/mp4" />
                        <source src="/case-studies/assets/venue-1-compressed.mp4" type="video/mp4" />
                      </video>
                    )}
                    <div className={styles.heroVideoOverlay}></div>
                  </div>

                  {/* Glassmorphic Central Content Dashboard card */}
                  <motion.div 
                    className={styles.glassCard}
                    variants={cardVariants}
                    initial="hidden"
                    animate={isSlideActive ? "visible" : "hidden"}
                    whileHover={{ 
                      y: -4, 
                      boxShadow: "0 25px 60px rgba(0,0,0,0.08), 0 50px 110px rgba(0,0,0,0.18)"
                    }}
                  >
                    {/* LEFT COLUMN: BRANDING AND IDENTITY */}
                    <div className={styles.leftCol}>
                      <div className={styles.identityBlock}>
                        <motion.div className={styles.locationBadge} variants={itemDownVariants}>
                          <svg className={styles.locationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{project.location}</span>
                        </motion.div>
                        
                        <motion.h3 className={styles.projectTitle} variants={titleVariants}>
                          {project.title}
                        </motion.h3>
                        
                        <motion.div className={styles.metaCapsule} variants={itemUpVariants}>
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>PROPERTY TYPE</span>
                            <span className={styles.metaValue}>{project.propertyType}</span>
                          </div>
                          <div className={styles.metaDivider} />
                          <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>CAPACITY</span>
                            <span className={styles.metaValue}>{project.capacity}</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Scope of Work badges */}
                      <motion.div className={styles.scopeSection} variants={itemUpVariants}>
                        <span className={styles.sectionLabel}>SCOPE OF WORK</span>
                        <motion.div className={styles.badgeContainer} variants={badgeContainerVariants}>
                          {project.services.map((service, sIdx) => {
                            const dotColors = ['#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b']; // Sky, Emerald, Violet, Amber
                            const activeColor = dotColors[sIdx % dotColors.length];
                            return (
                              <motion.span 
                                key={service} 
                                className={styles.serviceBadge}
                                variants={badgeVariants}
                                whileHover={{ y: -2, scale: 1.04, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span className={styles.badgeBullet} style={{ backgroundColor: activeColor }} />
                                {service}
                              </motion.span>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* RIGHT COLUMN: NUMERICAL STATS AND INTERACTIVE AUDITS */}
                    <div className={styles.rightCol}>
                      
                      {/* Compact KPI Card Row */}
                      <motion.div className={styles.kpiGrid} variants={kpiGridVariants}>
                        {project.kpis.map((kpi, kIdx) => (
                          <motion.div 
                            key={kIdx} 
                            className={styles.kpiCard}
                            variants={kpiCardVariants}
                            whileHover={{ y: -3, scale: 1.03 }}
                          >
                            {/* Upward diagonal arrow for business growth trend indicator */}
                            <svg className={styles.kpiTrendIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" style={{ transform: 'rotate(-45deg)', transformOrigin: 'center' }} />
                            </svg>
                            <span className={styles.kpiValue}>{kpi.value}</span>
                            <span className={styles.kpiLabel}>{kpi.label}</span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Interactive Analytics Split row */}
                      <motion.div className={styles.analyticsSection} variants={donutPodVariants}>
                        {isSlideActive ? (
                          <GlassDonutChart data={project.pieData} />
                        ) : (
                          <div className={styles.donutWrapper} />
                        )}
                        
                        {/* Compact outcomes list */}
                        <div className={styles.outcomesWrapper}>
                          <span className={styles.outcomeTitle}>WHAT WE DELIVERED</span>
                          <motion.div className={styles.outcomesList} variants={badgeContainerVariants}>
                            {project.bulletPoints.slice(0, 3).map((point, pIdx) => (
                              <motion.div 
                                key={pIdx} 
                                className={styles.outcomeItem}
                                variants={outcomeItemVariants}
                              >
                                <div className={styles.outcomeBullet}>
                                  <span>✓</span>
                                </div>
                                <span className={styles.outcomeText}>{point}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>

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
