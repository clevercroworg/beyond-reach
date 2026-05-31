"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CaseStudiesSnap.module.css';
import { caseStudiesData } from '../case-studies/caseStudiesData';

// Custom inline SVG Vector Icons
const LocationIcon = () => (
  <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ResortIcon = () => (
  <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const BedIcon = () => (
  <svg className={styles.cardMetaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M2 8h18M2 12h20M22 4v16M11 8H6a2 2 0 0 0-2 2v2h7" />
  </svg>
);

const InstagramIcon = () => (
  <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const MetaAdsIcon = () => (
  <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 8C14.7 8 13.1 9.2 12.3 10.8L11.7 12c-.8 1.6-2.4 2.8-4.2 2.8C4.5 14.8 2.5 12.8 2.5 10.5S4.5 6.2 7.5 6.2c1.8 0 3.4 1.2 4.2 2.8l.6 1.2c.8 1.6 2.4 2.8 4.2 2.8c3 0 5-2 5-4.3S19.5 8 16.5 8z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className={styles.serviceIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Helper function to dynamically map propertyType to categories in caseStudiesData
const getCategoryForProject = (propertyType) => {
  const type = (propertyType || '').toLowerCase();
  if (type.includes('resort') || type.includes('retreat') || type.includes('palace') || type.includes('fort') || type.includes('heritage')) {
    return 'resorts';
  }
  if (type.includes('villa') || type.includes('homestay') || type.includes('home stay') || type.includes('estate') || type.includes('cabin')) {
    return 'villas';
  }
  if (type.includes('hotel') || type.includes('inn') || type.includes('boutique') || type.includes('lodge')) {
    return 'hotels';
  }
  if (type.includes('wellness') || type.includes('spa') || type.includes('yoga') || type.includes('ayurveda')) {
    return 'wellness';
  }
  return 'resorts'; // default fallback
};

// Custom interactive SVG Donut Gauge ring with dynamic legend breakdown
const DynamicBookingGauge = ({ pieData }) => {
  if (!pieData || pieData.length === 0) return null;

  // Extract rates, matching the default mockup parameters if missing
  const directVal = pieData[0]?.value || 0;
  const otaVal = pieData[1]?.value || 0;
  const offlineVal = pieData[2]?.value || 0;
  const total = directVal + otaVal + offlineVal || 100;

  // Normalize percentages so they map to 100% of a circle
  const dPct = (directVal / total) * 100;
  const oPct = (otaVal / total) * 100;
  const gPct = (offlineVal / total) * 100;

  const radius = 35;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // ~219.91

  const dLength = (dPct / 100) * circumference;
  const oLength = (oPct / 100) * circumference;
  const gLength = (gPct / 100) * circumference;

  // Offsets for stacked dash values (negative dashoffset rotates forward clockwise)
  const dOffset = 0;
  const oOffset = -dLength;
  const gOffset = -(dLength + oLength);

  return (
    <div className={styles.gaugeBlock}>
      <div className={styles.donutWrapper}>
        <svg viewBox="0 0 100 100" className={styles.donutSvg}>
          {/* Base Empty Circle Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Direct segment (Lime Green) */}
          {dLength > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#caff33"
              strokeWidth={strokeWidth}
              strokeDasharray={`${dLength} ${circumference}`}
              strokeDashoffset={dOffset}
              transform="rotate(-90 50 50)"
              strokeLinecap={oLength === 0 && gLength === 0 ? "round" : "butt"}
            />
          )}
          {/* OTA segment (Teal Blue) */}
          {oLength > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={strokeWidth}
              strokeDasharray={`${oLength} ${circumference}`}
              strokeDashoffset={oOffset}
              transform="rotate(-90 50 50)"
            />
          )}
          {/* Offline segment (Dark Slate Gray) */}
          {gLength > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#374151"
              strokeWidth={strokeWidth}
              strokeDasharray={`${gLength} ${circumference}`}
              strokeDashoffset={gOffset}
              transform="rotate(-90 50 50)"
            />
          )}
        </svg>
        <div className={styles.donutCenter}>
          <span className={styles.donutCenterPct}>{directVal}%</span>
          <span className={styles.donutCenterLbl}>DIRECT</span>
        </div>
      </div>

      <div className={styles.legendList}>
        <div className={styles.legendItem}>
          <div className={styles.legendLabelGroup}>
            <span className={styles.legendDot} style={{ backgroundColor: '#caff33' }} />
            <span className={styles.legendLabelText}>Direct Bookings</span>
          </div>
          <span className={styles.legendValueText}>{directVal}%</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendLabelGroup}>
            <span className={styles.legendDot} style={{ backgroundColor: '#06b6d4' }} />
            <span className={styles.legendLabelText}>OTA Portals</span>
          </div>
          <span className={styles.legendValueText}>{otaVal}%</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendLabelGroup}>
            <span className={styles.legendDot} style={{ backgroundColor: '#374151' }} />
            <span className={styles.legendLabelText}>Offline / Groups</span>
          </div>
          <span className={styles.legendValueText}>{offlineVal}%</span>
        </div>
      </div>
    </div>
  );
};

export default function CaseStudiesSnapPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Filter 51 projects based on the active dynamic category pill
  const filteredStudies = activeFilter === 'ALL'
    ? caseStudiesData
    : caseStudiesData.filter(p => getCategoryForProject(p.propertyType) === activeFilter.toLowerCase());

  return (
    <div className={styles.pageContainer}>
      
      {/* Floating Header Navbar matching mockup layout */}
      <nav className={styles.pageNavbar}>
        <div className={styles.navLogo}>
          <a href="/">
            <span className={styles.logoBold}>BEYOND</span>{" "}
            <span className={styles.logoLight}>REACH</span>
          </a>
        </div>
        
        <div className={styles.navbarRight}>
          <a href="tel:+919999999999" className={styles.phoneLink} title="Call Support">
            <svg className={styles.phoneIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          
          <button className={styles.menuBtn} onClick={() => {
            // Anchor to main menu triggers if available in layout wrapper
            const globalMenuBtn = document.querySelector('button[class*="menuBtn"]');
            if (globalMenuBtn) {
              globalMenuBtn.click();
            } else {
              window.location.href = '/contact';
            }
          }}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </nav>

      {/* Scenic Drone Beach Forest Road Header banner */}
      <header className={styles.scenicHeader}>
        <div className={styles.scenicHeaderBg} />
        <div className={styles.scenicHeaderOverlay} />
        
        <div className={styles.headerContent}>
          <div className={styles.workSubheading}>
            <span>OUR WORK</span>
            <span className={styles.subheadingLine} />
          </div>
          
          <h1 className={styles.mainHeading}>
            GROWTH <span className={styles.accentText}>STORIES</span>
          </h1>
          
          <p className={styles.description}>
            Real hospitality growth work across resorts, villas, wellness spaces & experience brands.
          </p>

          {/* Interactive filter pills container */}
          <div className={styles.filterPillsContainer}>
            {['ALL', 'RESORTS', 'VILLAS', 'HOTELS', 'WELLNESS'].map((category) => {
              const isActive = activeFilter === category;
              return (
                <div key={category} className={styles.pillWrapper}>
                  <button
                    className={`${styles.filterPill} ${isActive ? styles.pillActive : ''}`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
                  </button>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className={styles.activePillIndicator}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Dynamic Stream of OLED Dark Green-Black Cards */}
      <main className={styles.cardsStream}>
        <AnimatePresence mode="popLayout">
          {filteredStudies.length > 0 ? (
            filteredStudies.map((project) => {
              const directShare = project.pieData?.[0]?.value || 0;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.caseCard}
                >
                  {/* Card Property Photo Header */}
                  <div className={styles.cardImageBlock}>
                    <img
                      src={project.imgSrc}
                      alt={project.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.cardImageOverlay} />
                    
                    {/* Location and Category badges overlaid on top corners */}
                    <div className={styles.imageOverlayTop}>
                      <div className={styles.badgeOutline}>
                        <LocationIcon />
                        <span>{project.location.toUpperCase()}</span>
                      </div>
                      <div className={styles.badgeOutline}>
                        <ResortIcon />
                        <span>{project.propertyType.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Property title and room count at bottom of photo overlay */}
                    <div className={styles.imageOverlayBottom}>
                      <h2 className={styles.cardTitle}>{project.title.toUpperCase()}</h2>
                      <div className={styles.cardMetaRow}>
                        <BedIcon />
                        <span>{project.capacity.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card details body content */}
                  <div className={styles.cardBody}>
                    
                    {/* 1. GROWTH WORK DELIVERED section */}
                    <div className={styles.cardSection}>
                      <h3 className={styles.sectionLabel}>GROWTH WORK DELIVERED</h3>
                      <div className={styles.servicesGrid}>
                        <div className={styles.serviceCol}>
                          <div className={styles.serviceIconFrame}>
                            <InstagramIcon />
                          </div>
                          <span className={styles.serviceText}>Instagram<br />Handling</span>
                        </div>
                        
                        <div className={styles.colDivider} />
                        
                        <div className={styles.serviceCol}>
                          <div className={styles.serviceIconFrame}>
                            <MetaAdsIcon />
                          </div>
                          <span className={styles.serviceText}>Meta Ads<br />Campaigns</span>
                        </div>
                        
                        <div className={styles.colDivider} />
                        
                        <div className={styles.serviceCol}>
                          <div className={styles.serviceIconFrame}>
                            <GlobeIcon />
                          </div>
                          <span className={styles.serviceText}>OTA Profile<br />Optimisation</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider Rule */}
                    <div className={styles.sectionDivider} />

                    {/* 2. RESULTS INFLUENCED section */}
                    <div className={styles.cardSection}>
                      <h3 className={styles.sectionLabel}>RESULTS INFLUENCED</h3>
                      <div className={styles.statsGrid}>
                        <div className={styles.statCol}>
                          <span className={styles.statValue}>{project.kpis?.[0]?.value || '—'}</span>
                          <span className={styles.statLabel}>REVENUE INFLUENCED</span>
                        </div>
                        
                        <div className={styles.colDivider} />
                        
                        <div className={styles.statCol}>
                          <span className={styles.statValue}>{project.kpis?.[1]?.value || '—'}</span>
                          <span className={styles.statLabel}>BOOKINGS SUPPORTED</span>
                        </div>
                        
                        <div className={styles.colDivider} />
                        
                        <div className={styles.statCol}>
                          <span className={styles.statValue}>{directShare}%</span>
                          <span className={styles.statLabel}>DIRECT BOOKING SHARE</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider Rule */}
                    <div className={styles.sectionDivider} />

                    {/* 3. Donut Gauge circular progress ring breakdown */}
                    <div className={styles.cardSection}>
                      <DynamicBookingGauge pieData={project.pieData} />
                    </div>


                  </div>
                </motion.article>
              );
            })
          ) : (
            <div className={styles.emptyState}>
              <h3>NO CASE STORIES FOUND</h3>
              <p>No growth work matches your selected category filter at this time.</p>
            </div>
          )}
        </AnimatePresence>
      </main>
      
    </div>
  );
}
