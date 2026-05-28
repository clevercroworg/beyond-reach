"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CaseStudiesSnap.module.css';
import { caseStudiesData } from '../case-studies/caseStudiesData';

// Custom fully interactive Analytics Pod containing SVG Donut Chart, Outcomes list and spanning Legend
const AnalyticsPod = ({ project, isSlideActive }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isSlideActive) {
    return (
      <div className={styles.analyticsSection}>
        <div className={styles.donutWrapper} />
        <div className={styles.outcomesWrapper}>
          <span className={styles.outcomeTitle}>WHAT WE DELIVERED</span>
        </div>
      </div>
    );
  }

  const data = project.pieData;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;

  return (
    <motion.div className={styles.analyticsSection} variants={donutPodVariants}>
      {/* 1. DONUT WRAPPER (occupies first grid column) */}
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

      {/* 2. OUTCOMES WRAPPER (occupies second grid column) */}
      <div className={styles.outcomesWrapper}>
        <span className={styles.outcomeTitle}>WHAT WE DELIVERED</span>
        <motion.div className={styles.outcomesList} variants={badgeContainerVariants}>
          {project.bulletPoints.slice(0, 2).map((point, pIdx) => (
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

      {/* 3. DONUT LEGEND (spans columns 1 and 2 at the bottom) */}
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
    </motion.div>
  );
};

// Premium, high-fidelity 3D perspective fold entrance variants for central dashboard cards
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 80, 
    rotateX: 14, // 3D structural perspective fold entries!
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 80,
      damping: 15,
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

const mediaVariants = {
  initial: { 
    scale: 0.15, 
    opacity: 0, // initially pitch-black gap!
    border: '1px solid rgba(255, 255, 255, 0.25)',
    transformOrigin: 'center center',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' // straight corners in mini mode
  },
  zoom: { 
    scale: 1, 
    opacity: 1, // blooms and fades in during zoom!
    border: '1px solid rgba(255, 255, 255, 0)',
    transition: { 
      duration: 2.6, // slower and smoother cinematic reveal!
      ease: [0.16, 1, 0.3, 1] 
    } 
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

// Splits title into main sans-serif part and beautiful serif italic last word (e.g. "AHILYA FORT" -> "AHILYA Fort.")
const renderSplitTitle = (title) => {
  if (!title) return '';
  const words = title.split(' ');
  if (words.length <= 1) {
    return <span className={styles.titleSerifItalic}>{title}</span>;
  }
  const lastWord = words[words.length - 1];
  const mainPart = words.slice(0, words.length - 1).join(' ');
  
  // Format last word elegantly (e.g. FORT -> Fort.)
  const formattedLast = lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
  
  return (
    <>
      <span className={styles.titleSans}>{mainPart} </span>
      <span className={styles.titleSerifItalic}>{formattedLast}.</span>
    </>
  );
};

// --- PREMIUM DESKTOP CARD ---
const DesktopPremiumCard = ({ project, isSlideActive, nextProject, onNextClick, progress }) => {
  return (
    <motion.div 
      className={styles.desktopCard}
      variants={cardVariants}
      initial="hidden"
      animate={isSlideActive ? "visible" : "hidden"}
    >
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
            {renderSplitTitle(project.title)}
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

        <motion.p className={styles.projectTagline} variants={itemUpVariants}>
          {project.tagline}
        </motion.p>

        <motion.div className={styles.scopeSection} variants={itemUpVariants}>
          <span className={styles.sectionLabel}>SCOPE OF WORK</span>
          <motion.div className={styles.badgeContainer} variants={badgeContainerVariants}>
            {project.services.map((service, sIdx) => {
              const dotColors = ['#38bdf8', '#34d399', '#a78bfa', '#fbbf24'];
              const activeColor = dotColors[sIdx % dotColors.length];
              return (
                <motion.span 
                  key={service} 
                  className={styles.serviceBadge}
                  variants={badgeVariants}
                  whileHover={{ y: -2, scale: 1.04, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.badgeBullet} style={{ backgroundColor: activeColor }} />
                  {service}
                </motion.span>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Looping indicator footer inside left column */}
        {nextProject && (
          <div 
            className={styles.projectLoopIndicator}
            onClick={onNextClick}
          >
            <div className={styles.loopInfo}>
              <span className={styles.loopLabel}>Next Project</span>
              <span className={styles.loopTitle}>{nextProject.title}</span>
            </div>
            <div className={styles.loopLineContainer}>
              <motion.div 
                className={styles.loopLine}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className={styles.rightCol}>
        <motion.div className={styles.kpiGrid} variants={kpiGridVariants}>
          {project.kpis.map((kpi, kIdx) => (
            <motion.div 
              key={kIdx} 
              className={styles.kpiCard}
              variants={kpiCardVariants}
              whileHover={{ y: -3, scale: 1.03 }}
            >
              <svg className={styles.kpiTrendIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <span className={styles.kpiLabel}>{kpi.label}</span>
            </motion.div>
          ))}
        </motion.div>
        <AnalyticsPod project={project} isSlideActive={isSlideActive} />
      </div>
    </motion.div>
  );
};

// --- PREMIUM MOBILE CARD ---
const MobilePremiumCard = ({ project, isSlideActive, nextProject, onNextClick, progress }) => {
  return (
    <motion.div 
      className={styles.mobileCard}
      variants={cardVariants}
      initial="hidden"
      animate={isSlideActive ? "visible" : "hidden"}
    >
      <div className={styles.identityBlock}>
        <motion.div className={styles.locationBadge} variants={itemDownVariants}>
          <svg className={styles.locationIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{project.location}</span>
        </motion.div>
        
        <motion.h3 className={styles.projectTitle} variants={titleVariants}>
          {renderSplitTitle(project.title)}
        </motion.h3>
        
        <motion.div className={styles.metaCapsule} variants={itemUpVariants}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>TYPE</span>
            <span className={styles.metaValue}>{project.propertyType}</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>CAPACITY</span>
            <span className={styles.metaValue}>{project.capacity}</span>
          </div>
        </motion.div>
      </div>

      <motion.div className={styles.scopeSection} variants={itemUpVariants}>
        <span className={styles.sectionLabel}>SCOPE</span>
        <motion.div className={styles.badgeContainer} variants={badgeContainerVariants}>
          {project.services.slice(0, 3).map((service, sIdx) => {
            const dotColors = ['#38bdf8', '#34d399', '#a78bfa', '#fbbf24'];
            const activeColor = dotColors[sIdx % dotColors.length];
            return (
              <motion.span 
                key={service} 
                className={styles.serviceBadge}
                variants={badgeVariants}
              >
                <span className={styles.badgeBullet} style={{ backgroundColor: activeColor }} />
                {service}
              </motion.span>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div className={styles.kpiGrid} variants={kpiGridVariants}>
        {project.kpis.map((kpi, kIdx) => (
          <motion.div key={kIdx} className={styles.kpiCard} variants={kpiCardVariants}>
            <svg className={styles.kpiTrendIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
            <span className={styles.kpiValue}>{kpi.value}</span>
            <span className={styles.kpiLabel}>{kpi.label}</span>
          </motion.div>
        ))}
      </motion.div>
      <AnalyticsPod project={project} isSlideActive={isSlideActive} />

      {/* Looping indicator footer */}
      {nextProject && (
        <div 
          className={styles.projectLoopIndicator}
          onClick={onNextClick}
        >
          <div className={styles.loopInfo}>
            <span className={styles.loopLabel}>Next Project</span>
            <span className={styles.loopTitle}>{nextProject.title}</span>
          </div>
          <div className={styles.loopLineContainer}>
            <motion.div 
              className={styles.loopLine}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function CaseStudiesSnapPage() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const filterRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [introState, setIntroState] = useState('loading'); // 'loading' | 'splitting' | 'active'
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Stage 2: Trigger the text split & center-zooming media at 1.8s
    const splitTimer = setTimeout(() => {
      setIntroState('splitting');
    }, 1800);

    // Stage 3: Reveal overlays at t = 3.3s (exactly when media hits ~75% scale of a 2.6s zoom!)
    const activeTimer = setTimeout(() => {
      setIntroState('active');
    }, 3300);

    // Stage 4: Unmount preloader logic entirely and trigger cycling at t = 4.4s (full zoom completion)
    const doneTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 4400);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(activeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // Filter 51 data projects sorted alphabetically
  const filteredStudies = activeFilter === 'All'
    ? caseStudiesData
    : caseStudiesData.filter(p => getCategoryForProject(p.propertyType) === activeFilter);

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
    setProgress(0); // Reset timer immediately on navigation!
  };

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
          setProgress(0); // Reset progress on scroll shift!
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

  // Stately Auto-Cycle Slideshow Timer
  useEffect(() => {
    if (isInitialLoad || filteredStudies.length <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          navigateToSlide((activeIndex + 1) % filteredStudies.length);
          return 0;
        }
        return prev + 1.25; // 80 steps over 6.4s (or adjust value to perfect 8s duration: ~1% per 80ms)
      });
    }, 80);

    return () => clearInterval(interval);
  }, [activeIndex, filteredStudies.length, isInitialLoad]);

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
      {/* Cinematic Typographic Split Preloader */}
      <AnimatePresence>
        {isInitialLoad && (
          <motion.div 
            className={styles.preloaderContainer}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: introState === 'active' ? 'none' : 'auto' }}
          >
            <div className={styles.preloaderContent}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.15em' }}>
                <motion.span 
                  className={styles.preloaderLogo}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={
                    introState === 'splitting' || introState === 'active'
                      ? { x: "-35vw", opacity: 0, scale: 0.8 }
                      : { scale: 1, opacity: 1, x: 0 }
                  }
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  O
                </motion.span>
                <motion.span 
                  className={styles.preloaderWord}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    introState === 'splitting' || introState === 'active'
                      ? { x: "-20vw", opacity: 0, scale: 0.8 }
                      : { opacity: 1, x: 0, scale: 1 }
                  }
                  transition={{ 
                    x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
                    scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }
                  }}
                >
                  UR
                </motion.span>
              </div>

              {/* Center Gap for the Centered Expanding Mini Square */}
              {isInitialLoad && (
                <motion.div 
                  className={styles.preloaderGap}
                  initial={{ scaleX: 1, opacity: 1 }}
                  animate={introState === 'splitting' || introState === 'active' ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                />
              )}

              <motion.span 
                className={styles.preloaderWordRight}
                initial={{ opacity: 0, x: 40 }}
                animate={
                  introState === 'splitting' || introState === 'active'
                    ? { x: "35vw", opacity: 0, scale: 0.8 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ 
                  opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
                  x: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <span className={styles.titleSerifItalic} style={{ textTransform: 'none', color: '#38bdf8' }}>Work.</span>
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating Global Navigation controls */}
      <motion.nav 
        className={styles.pageNavbar}
        initial={{ opacity: 0 }}
        animate={!isInitialLoad || introState === 'active' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: !isInitialLoad || introState === 'active' ? 'auto' : 'none' }}
      >
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
      </motion.nav>

      {/* Floating Vertical Navigation Dots (Right Edge) */}
      {filteredStudies.length > 0 && (
        <motion.div 
          className={styles.floatingSidebar}
          initial={{ opacity: 0 }}
          animate={!isInitialLoad || introState === 'active' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ pointerEvents: !isInitialLoad || introState === 'active' ? 'auto' : 'none' }}
        >
          {filteredStudies.map((project, idx) => (
            <div key={project.id} className={styles.dotWrapper} onClick={() => navigateToSlide(idx)}>
              <span className={styles.dotLabel}>{project.title}</span>
              <div className={`${styles.dot} ${activeIndex === idx ? styles.dotActive : ''}`} />
            </div>
          ))}
        </motion.div>
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
                  <motion.div 
                    className={styles.diagonalBg}
                    variants={mediaVariants}
                    initial={idx === 0 && isInitialLoad ? "initial" : false}
                    animate={idx === 0 && isInitialLoad && introState !== 'loading' ? "zoom" : false}
                  >
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
                    <motion.div 
                      className={styles.heroVideoOverlay}
                      initial={{ opacity: 0 }}
                      animate={idx === 0 && isInitialLoad && introState !== 'active' ? { opacity: 0 } : { opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className={styles.orb1} />
                    <div className={styles.orb2} />
                    <div className={styles.orb3} />
                    
                    {/* Editorial wireframe corner markers during zoom reveal */}
                    {idx === 0 && isInitialLoad && (
                      <>
                        <motion.div 
                          className={`${styles.wireframeCorner} ${styles.topLeftCorner}`}
                          animate={introState === 'active' ? { opacity: 0 } : { opacity: 0.7 }}
                          transition={{ duration: 0.6 }}
                        >+</motion.div>
                        <motion.div 
                          className={`${styles.wireframeCorner} ${styles.topRightCorner}`}
                          animate={introState === 'active' ? { opacity: 0 } : { opacity: 0.7 }}
                          transition={{ duration: 0.6 }}
                        >+</motion.div>
                        <motion.div 
                          className={`${styles.wireframeCorner} ${styles.bottomLeftCorner}`}
                          animate={introState === 'active' ? { opacity: 0 } : { opacity: 0.7 }}
                          transition={{ duration: 0.6 }}
                        >+</motion.div>
                        <motion.div 
                          className={`${styles.wireframeCorner} ${styles.bottomRightCorner}`}
                          animate={introState === 'active' ? { opacity: 0 } : { opacity: 0.7 }}
                          transition={{ duration: 0.6 }}
                        >+</motion.div>
                      </>
                    )}
                  </motion.div>

                  {/* Render tailored Premium Card based on Viewport */}
                  {isMobile ? (
                    <MobilePremiumCard 
                      project={project} 
                      isSlideActive={isSlideActive && (!isInitialLoad || introState === 'active')} 
                      nextProject={filteredStudies[(idx + 1) % filteredStudies.length]}
                      onNextClick={() => navigateToSlide((idx + 1) % filteredStudies.length)}
                      progress={isSlideActive ? progress : 0}
                    />
                  ) : (
                    <DesktopPremiumCard 
                      project={project} 
                      isSlideActive={isSlideActive && (!isInitialLoad || introState === 'active')} 
                      nextProject={filteredStudies[(idx + 1) % filteredStudies.length]}
                      onNextClick={() => navigateToSlide((idx + 1) % filteredStudies.length)}
                      progress={isSlideActive ? progress : 0}
                    />
                  )}
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
