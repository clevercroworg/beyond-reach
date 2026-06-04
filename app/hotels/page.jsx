"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hotels.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── CUSTOM INLINE SVG ICONS ─── */
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', flexShrink: 0 }}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.017 14.077.99 11.478.99c-5.447 0-9.87 4.37-9.874 9.8.001 2.01.536 3.97 1.549 5.679L2.182 20.8l4.465-1.646zm11.396-4.996c-.3-.149-1.776-.864-2.05-.962-.273-.099-.472-.148-.671.149-.197.297-.768.962-.94.1.162-.198.324-.495.324-.742.001-.247-.149-.962-.423-1.63-.274-.669-.472-.569-.67-.569-.197 0-.422-.049-.646-.049-.224 0-.596.084-.908.431-.31.348-1.18 1.155-1.18 2.815 0 1.66 1.205 3.262 1.373 3.486.168.223 2.37 3.57 5.74 5.006.802.341 1.427.544 1.916.697.806.254 1.539.219 2.118.134.646-.095 1.777-.716 2.025-1.41.247-.691.247-1.285.173-1.408-.074-.124-.273-.223-.573-.372z" />
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2.2" style={{ marginRight: '8px', flexShrink: 0 }}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" style={{ display: 'none' }} />
  </svg>
);

const ProblemWebsiteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1ff36" strokeWidth="2" style={{ marginBottom: '1rem' }}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="10" y1="12" x2="14" y2="16" />
    <line x1="14" y1="12" x2="10" y2="16" />
  </svg>
);

const ProblemOtaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1ff36" strokeWidth="2" style={{ marginBottom: '1rem' }}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" />
  </svg>
);

const ProblemInquiryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1ff36" strokeWidth="2" style={{ marginBottom: '1rem' }}>
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
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-primary)' }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ProcessStrategyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-primary)' }}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="13" y2="18" />
  </svg>
);

const ProcessBuildIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-primary)' }}>
    <path d="M12 2L2 22h20L12 2z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const ProcessScaleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-primary)' }}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const SparklineSVG = () => (
  <svg width="100%" height="50" viewBox="0 0 200 50" fill="none">
    <path d="M10 42c20-5 35-18 55-12s30-22 50-10 40-20 70-15" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="185" cy="5" r="4.5" fill="var(--accent-color)" filter="drop-shadow(0 0 6px var(--accent-color))" />
  </svg>
);

/* ─── DATA ─── */
const hotelFaqs = [
  {
    question: 'How do you reduce our reliance on Online Travel Agencies (OTAs)?',
    answer: 'We shift the balance of power back to your hotel by building a high-converting direct booking ecosystem. This includes optimizing your website for search engines (SEO), running targeted paid media campaigns to capture high-intent travelers, and implementing urgency triggers and rate-parity strategies that incentivize guests to book directly with you rather than a third party.'
  },
  {
    question: 'What digital marketing strategies yield the highest ROI for luxury hotels?',
    answer: 'For luxury properties, visual storytelling is paramount. A combination of cinematic video content, immersive social media campaigns, and highly targeted Google Ads works best. We pair this top-of-funnel brand building with robust SEO and email retention strategies to ensure we are capturing guests at every stage of their travel planning journey.'
  },
  {
    question: 'How long does it take to see an increase in direct bookings?',
    answer: 'While paid advertising (PPC and Social Ads) can drive immediate traffic and bookings within the first 30 days, sustainable organic growth through SEO and brand positioning typically takes 3 to 6 months to mature. We build a dual-strategy roadmap that balances quick wins with long-term profitability.'
  },
  {
    question: 'Do you create the video and photography content yourselves?',
    answer: 'Yes, we are a full-service creative agency. We do not just run ads; we produce the assets that make those ads successful. Our in-house production team specializes in luxury hospitality, capturing aerial drone footage, lifestyle photography, and compelling short-form video designed specifically for modern digital platforms.'
  }
];

/* ─── FAQ COMPONENT ─── */
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

/* ─── MAIN REDESIGNED HOTELS COMPONENT ─── */
const Hotels = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const transitionDelay = 0.4;

      // Entrances
      gsap.from(`.${styles.heroLeft}`, {
        x: -50, opacity: 0, duration: 1.2, ease: 'power4.out', delay: transitionDelay
      });
      gsap.from(`.${styles.resultsWidget}`, {
        x: 50, opacity: 0, duration: 1.2, ease: 'power4.out', delay: transitionDelay + 0.2
      });

      // Scroll triggers
      gsap.from(`.${styles.problemCard}`, {
        scrollTrigger: { trigger: `.${styles.problemSection}`, start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
      });

      gsap.from(`.${styles.solutionCard}`, {
        scrollTrigger: { trigger: `.${styles.solutionSection}`, start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
      });

      gsap.from(`.${styles.processStepNode}`, {
        scrollTrigger: { trigger: `.${styles.processSection}`, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out'
      });

      gsap.from(`.${styles.resultsCard}`, {
        scrollTrigger: { trigger: `.${styles.resultsSection}`, start: 'top 80%' },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
      });

      setTimeout(() => ScrollTrigger.refresh(), transitionDelay * 1000 + 200);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className={styles.pageWrapper}>
      
      {/* 1. HERO HEADER SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury hotel pool area at night"
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <span className={styles.heroLabel}>HOTEL GROWTH SYSTEM</span>
            <h1 className={styles.heroTitle}>
              MORE DIRECT<br />BOOKINGS<br />
              <span className={styles.glowingText}>FOR HOTELS.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Marketing, websites and booking systems drive more direct revenue — sustainably.
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
                <span className={styles.widgetLabel}>Direct bookings increase</span>
              </div>
              <div className={styles.widgetValueGroup}>
                <div className={styles.widgetValue}>+68%</div>
                <div className={styles.widgetSublabel}>Average increase in direct revenue</div>
              </div>
              <div className={styles.widgetChartWrapper}>
                <SparklineSVG />
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
            <WebsiteIcon stroke="rgba(255,255,255,0.7)" />
            <span>Hotel Websites</span>
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
              <span className={styles.miniLabel}>THE PROBLEM</span>
              <h2 className={styles.splitSectionTitle}>WHY HOTELS<br />LOSE DIRECT<br />BOOKINGS.</h2>
            </div>
            
            <div className={styles.cardsCol}>
              <div className={styles.problemCard}>
                <ProblemWebsiteIcon />
                <h3 className={styles.cardTitle}>POOR WEBSITE EXPERIENCE</h3>
                <p className={styles.cardDesc}>Slow sites and unclear booking paths lose guests.</p>
              </div>

              <div className={styles.problemCard}>
                <ProblemOtaIcon />
                <h3 className={styles.cardTitle}>TOO MUCH OTA DEPENDENCE</h3>
                <p className={styles.cardDesc}>High commissions reduce profitability and brand control.</p>
              </div>

              <div className={styles.problemCard}>
                <ProblemInquiryIcon />
                <h3 className={styles.cardTitle}>POOR INQUIRY FLOW</h3>
                <p className={styles.cardDesc}>Unstructured enquiries and slow follow-ups mean lost revenue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 4. THE SOLUTION SECTION */}
      <section className={styles.solutionSection}>
        <div className={styles.sectionInner}>
          <div className={styles.gridSplit}>
            <div className={styles.stickyCol}>
              <span className={styles.miniLabel}>OUR SOLUTION</span>
              <h2 className={styles.splitSectionTitle}>WHAT WE<br />IMPROVE.</h2>
            </div>

            <div className={styles.solutionsGrid}>
              <div className={styles.solutionCard}>
                <SolutionWebsiteIcon />
                <h3 className={styles.solutionCardTitle}>HIGH-CONVERTING WEBSITES</h3>
                <p className={styles.solutionCardDesc}>Built for clarity and designed for guests.</p>
              </div>

              <div className={styles.solutionCard}>
                <SolutionAdIcon />
                <h3 className={styles.solutionCardTitle}>AD STRATEGY & PERFORMANCE</h3>
                <p className={styles.solutionCardDesc}>Targeted campaigns that drive quality traffic and lower CAC.</p>
              </div>

              <div className={styles.solutionCard}>
                <SolutionAutomationIcon />
                <h3 className={styles.solutionCardTitle}>BOOKING FLOW & AUTOMATION</h3>
                <p className={styles.solutionCardDesc}>Streamlined forms, automations and follow-ups that convert more stays.</p>
              </div>

              <div className={styles.solutionCard}>
                <SolutionTrackingIcon />
                <h3 className={styles.solutionCardTitle}>TRACKING & ATTRIBUTION</h3>
                <p className={styles.solutionCardDesc}>Clear data visibility to scale what works and cut waste.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 5. PROCESS SECTION */}
      <section className={styles.processSection}>
        <div className={styles.sectionInner}>
          <div className={styles.gridSplit}>
            <div className={styles.stickyCol}>
              <span className={styles.miniLabel}>OUR PROCESS</span>
              <h2 className={styles.splitSectionTitle}>A SIMPLE<br />GROWTH<br />PROCESS.</h2>
            </div>

            <div className={styles.processHorizontalList}>
              <div className={styles.processStepNode}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNum}>01</span>
                  <div className={styles.stepIconWrapper}>
                    <ProcessAuditIcon />
                  </div>
                </div>
                <h3 className={styles.stepName}>DISCOVER & AUDIT</h3>
              </div>

              <div className={styles.stepArrow}>&rarr;</div>

              <div className={styles.processStepNode}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNum}>02</span>
                  <div className={styles.stepIconWrapper}>
                    <ProcessStrategyIcon />
                  </div>
                </div>
                <h3 className={styles.stepName}>STRATEGY & PLAN</h3>
              </div>

              <div className={styles.stepArrow}>&rarr;</div>

              <div className={styles.processStepNode}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNum}>03</span>
                  <div className={styles.stepIconWrapper}>
                    <ProcessBuildIcon />
                  </div>
                </div>
                <h3 className={styles.stepName}>BUILD & EXECUTE</h3>
              </div>

              <div className={styles.stepArrow}>&rarr;</div>

              <div className={styles.processStepNode}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNum}>04</span>
                  <div className={styles.stepIconWrapper}>
                    <ProcessScaleIcon />
                  </div>
                </div>
                <h3 className={styles.stepName}>OPTIMIZE & SCALE</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 6. ANALYTICS & INSIGHTS (LIVE DASHBOARD MOCK) */}
      <section className={styles.insightsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.insightsGrid}>
            <div className={styles.insightsText}>
              <span className={styles.miniLabel}>REAL-TIME INSIGHTS</span>
              <h2 className={styles.insightsTitle}>See what drives your growth.</h2>
              <p className={styles.insightsDesc}>Live dashboards that turn data into decisions.</p>
              <Link href="/contact" className={styles.btnOutline}>
                EXPLORE DASHBOARD &rarr;
              </Link>
            </div>

            {/* Dashboard Mock Container */}
            <div className={styles.dashboardContainer}>
              <div className={styles.dbHeader}>
                <span className={styles.dbTitle}>Direct Booking Performance</span>
              </div>
              <div className={styles.dbOverviewStats}>
                <div className={styles.dbStatBlock}>
                  <span className={styles.dbStatLabel}>Direct Bookings</span>
                  <div className={styles.dbStatValGroup}>
                    <span className={styles.dbStatValue}>1,248</span>
                    <span className={styles.dbStatChangePos}>+23%</span>
                  </div>
                </div>
                <div className={styles.dbStatBlock}>
                  <span className={styles.dbStatLabel}>Revenue</span>
                  <div className={styles.dbStatValGroup}>
                    <span className={styles.dbStatValue}>$642K</span>
                    <span className={styles.dbStatChangePos}>+31%</span>
                  </div>
                </div>
                <div className={styles.dbStatBlock}>
                  <span className={styles.dbStatLabel}>Conversion Rate</span>
                  <div className={styles.dbStatValGroup}>
                    <span className={styles.dbStatValue}>3.72%</span>
                    <span className={styles.dbStatChangeNeg}>-18%</span>
                  </div>
                </div>
                <div className={styles.dbStatBlock}>
                  <span className={styles.dbStatLabel}>Avg. Booking Value</span>
                  <div className={styles.dbStatValGroup}>
                    <span className={styles.dbStatValue}>$538</span>
                    <span className={styles.dbStatChangePos}>+16%</span>
                  </div>
                </div>
              </div>

              <div className={styles.dbGraphRow}>
                <div className={styles.dbChartBlock}>
                  <span className={styles.dbBlockTitle}>Last 12 Months</span>
                  <div className={styles.dbChartSvgBox}>
                    <svg viewBox="0 0 400 120" width="100%" height="100%" fill="none" style={{ overflow: 'visible' }}>
                      <path d="M10 100c30-5 60-35 90-25s60-40 90-20 60-35 90-10 20-30 30-20" stroke="#d1ff36" strokeWidth="3.5" strokeLinecap="round" />
                      <circle cx="390" cy="5" r="4.5" fill="#d1ff36" filter="drop-shadow(0 0 6px #d1ff36)" />
                      {/* Grid lines */}
                      <line x1="10" y1="110" x2="390" y2="110" stroke="rgba(255,255,255,0.06)" />
                      <line x1="10" y1="80" x2="390" y2="80" stroke="rgba(255,255,255,0.06)" />
                      <line x1="10" y1="50" x2="390" y2="50" stroke="rgba(255,255,255,0.06)" />
                      {/* Axis Labels */}
                      <text x="10" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">Jan</text>
                      <text x="75" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">Mar</text>
                      <text x="140" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">May</text>
                      <text x="205" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">Jul</text>
                      <text x="270" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">Sep</text>
                      <text x="335" y="118" fill="rgba(255,255,255,0.3)" fontSize="8">Nov</text>
                    </svg>
                  </div>
                </div>

                <div className={styles.dbChannelBlock}>
                  <span className={styles.dbBlockTitle}>Bookings by Channel</span>
                  <div className={styles.dbChannelsGrid}>
                    <div className={styles.donutPlaceholder}>
                      <svg width="64" height="64" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d1ff36" strokeWidth="4" strokeDasharray="48 100" strokeDashoffset="25" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffffff" strokeWidth="4" strokeDasharray="27 100" strokeDashoffset="77" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f9ab00" strokeWidth="4" strokeDasharray="17 100" strokeDashoffset="4" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a73e8" strokeWidth="4" strokeDasharray="8 100" strokeDashoffset="21" />
                      </svg>
                    </div>
                    <div className={styles.dbChannelsLegend}>
                      <div className={styles.legendRow}><span className={styles.dotDirect}></span><span>Direct</span><strong>48%</strong></div>
                      <div className={styles.legendRow}><span className={styles.dotOrganic}></span><span>Organic</span><strong>27%</strong></div>
                      <div className={styles.legendRow}><span className={styles.dotPaid}></span><span>Paid</span><strong>17%</strong></div>
                      <div className={styles.legendRow}><span className={styles.dotReferral}></span><span>Referral</span><strong>8%</strong></div>
                    </div>
                  </div>
                </div>

                <div className={styles.dbImagePreview}>
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=300&q=80"
                    alt="Luxury hotel room mockup inside dashboard"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionSeparator}></div>

      {/* 7. PROVEN RESULTS SECTION */}
      <section className={styles.resultsSection}>
        <div className={styles.sectionInner}>
          <div className={styles.gridSplit}>
            <div className={styles.stickyCol}>
              <span className={styles.miniLabel}>PROVEN RESULTS</span>
              <h2 className={styles.splitSectionTitle}>Real hotels.<br />Real growth.</h2>
            </div>

            <div className={styles.resultsGrid}>
              <div className={styles.resultsCard}>
                <div className={styles.resultsCardBg}>
                  <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80" alt="City Beach Hotel pool" />
                  <div className={styles.resultsCardOverlay}></div>
                </div>
                <div className={styles.resultsCardInfo}>
                  <span className={styles.resultHotelName}>CITY BEACH HOTEL</span>
                  <div className={styles.resultStatBlock}>
                    <div className={styles.resultStatVal}>+52%</div>
                    <div className={styles.resultStatLbl}>Direct Bookings</div>
                  </div>
                  <div className={styles.resultStatBlock}>
                    <div className={styles.resultStatVal}>+31%</div>
                    <div className={styles.resultStatLbl}>Direct Revenue</div>
                  </div>
                </div>
              </div>

              <div className={styles.resultsCard}>
                <div className={styles.resultsCardBg}>
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" alt="Monterra Suites exterior" />
                  <div className={styles.resultsCardOverlay}></div>
                </div>
                <div className={styles.resultsCardInfo}>
                  <span className={styles.resultHotelName}>MONTERRA SUITES</span>
                  <div className={styles.resultStatBlock}>
                    <div className={styles.resultStatVal}>+64%</div>
                    <div className={styles.resultStatLbl}>Direct Bookings</div>
                  </div>
                  <div className={styles.resultStatBlock}>
                    <div className={styles.resultStatVal}>+41%</div>
                    <div className={styles.resultStatLbl}>Direct Revenue</div>
                  </div>
                </div>
              </div>

              <div className={styles.resultsCard}>
                <div className={styles.resultsCardBg}>
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" alt="Pacifica Resort beachfront" />
                  <div className={styles.resultsCardOverlay}></div>
                </div>
                <div className={styles.resultsCardInfo}>
                  <span className={styles.resultHotelName}>PACIFICA RESORT</span>
                  <div className={styles.resultStatBlock}>
                    <div className={styles.resultStatVal}>+68%</div>
                    <div className={styles.resultStatLbl}>Direct Bookings</div>
                  </div>
                  <div className={styles.resultStatBlock}>
                    <div className={styles.resultStatVal}>+45%</div>
                    <div className={styles.resultStatLbl}>Direct Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION & FOOTER BANNER */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>LET'S GROW YOUR DIRECT REVENUE.</h2>
          <p className={styles.ctaDesc}>Request a tailored review of your hotel's growth potential.</p>
          <div className={styles.ctaBtnGroup}>
            <Link href="/contact" className={styles.btnPrimary}>
              REQUEST GROWTH REVIEW &rarr;
            </Link>
            <a href="https://wa.me/#" target="_blank" rel="noopener noreferrer" className={styles.btnWhatsApp}>
              <WhatsAppIcon />
              WHATSAPP US
            </a>
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
          <FaqAccordion faqs={hotelFaqs} />
        </div>
      </section>

    </div>
  );
};

export default Hotels;
