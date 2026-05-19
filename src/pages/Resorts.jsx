import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Resorts.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */
const processSteps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    desc: "We dive deep into your resort\u2019s digital presence \u2014 analyzing your current OTA dependency, booking funnels, brand positioning, and competitive landscape to uncover hidden growth levers."
  },
  {
    number: '02',
    title: 'Strategy Blueprint',
    desc: "A tailored roadmap covering SEO, paid media, content marketing, and direct booking optimization \u2014 designed specifically for luxury hospitality."
  },
  {
    number: '03',
    title: 'Creative & Content',
    desc: 'From cinematic videography to immersive virtual tours, we craft visual storytelling that captures the essence of your resort and compels travelers to book direct.'
  },
  {
    number: '04',
    title: 'Launch & Optimize',
    desc: 'We go live with precision campaigns, continuously A/B testing creatives, landing pages, and booking flows to maximize revenue per visitor.'
  },
  {
    number: '05',
    title: 'Scale & Sustain',
    desc: "Long-term growth through reputation management, loyalty programs, retargeting, and seasonal campaign strategies that keep occupancy consistently high."
  }
];

const handlePoints = [
  {
    icon: '◈',
    title: 'Revenue Management',
    desc: 'Dynamic pricing strategies paired with demand forecasting to optimize ADR and RevPAR across all seasons.'
  },
  {
    icon: '◈',
    title: 'Direct Booking Engine',
    desc: "Custom-built booking experiences that outperform OTAs \u2014 with rate parity, urgency triggers, and zero commission."
  },
  {
    icon: '◈',
    title: 'Brand Storytelling',
    desc: "Cinematic content and editorial narratives that position your resort as the destination, not just accommodation."
  },
  {
    icon: '◈',
    title: 'Guest Experience Tech',
    desc: 'Pre-arrival personalization, in-stay digital concierge, and post-stay re-engagement funnels.'
  }
];

const portfolioProjects = [
  {
    title: 'THE GRAND ESCAPE',
    client: 'LUXURY RESORTS',
    category: 'BRANDING · WEBSITE · SEO',
    imgSrc: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    vidSrc: '/sample-vid.mp4'
  },
  {
    title: 'OCEANIC VOYAGES',
    client: 'AZURE CHARTERS',
    category: 'CAMPAIGN · CONTENT',
    imgSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  },
  {
    title: 'ZEN WELLNESS',
    client: 'VITALITY SPA',
    category: 'BRANDING · DIGITAL',
    imgSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    title: 'ALPINE PEAKS',
    client: 'NORDIC STAYS',
    category: 'WEBSITE · SEO · ADS',
    imgSrc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    title: 'NOCTURNAL EVENTS',
    client: 'LUMIERE NIGHTS',
    category: 'CONTENT · SOCIAL',
    imgSrc: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  },
  {
    title: 'URBAN SANCTUARY',
    client: 'THE METRO HOTEL',
    category: 'STRATEGY · BOOKING',
    imgSrc: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
    vidSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  }
];

/* ─── PORTFOLIO CARD ─── */
const PortfolioCard = ({ title, client, category, imgSrc, vidSrc }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

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
    <div className={styles.pCard} ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.pMedia}>
        <img src={imgSrc} alt={title} className={styles.pImg} style={{ opacity: isPlaying ? 0 : 1 }} />
        <video ref={videoRef} src={vidSrc} className={styles.pVid} muted loop playsInline />
        <div className={styles.pOverlay} style={{ opacity: isPlaying ? 1 : 0 }}>
          <span>{client}</span>
        </div>
      </div>
      <div className={styles.pInfo}>
        <h4 className={styles.pTitle}>{title}</h4>
        <span className={styles.pCategory}>{category}</span>
      </div>
    </div>
  );
};

/* ─── MAIN PAGE ─── */
const Resorts = () => {
  const pageRef = useRef(null);
  const refSectionRef = useRef(null);
  
  const words = ['STRATEGY', 'WEBSITES', 'MARKETING', 'TECHNOLOGY', 'GROWTH'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Wait for page transition to finish before any animations */
      const transitionDelay = 1;

      /* Header entrance — plays right after transition */
      gsap.from(`.${styles.headerContent}`, {
        y: 60, opacity: 0, duration: 1.2, ease: 'power4.out', delay: transitionDelay
      });
      gsap.from(`.${styles.headerBadge}`, {
        scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out', delay: transitionDelay + 0.3
      });

      /* Process steps stagger */
      gsap.from(`.${styles.processStep}`, {
        scrollTrigger: { trigger: `.${styles.processSection}`, start: 'top 75%' },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
      });

      /* ── Services section — scroll-triggered entrance ── */
      gsap.from(`.${styles.servicesContent}`, {
        scrollTrigger: { trigger: refSectionRef.current, start: 'top 65%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out'
      });
      gsap.from(`.${styles.serviceBlock}`, {
        scrollTrigger: { trigger: refSectionRef.current, start: 'top 65%' },
        scale: 0.95, duration: 0.6, stagger: 0.08, ease: 'power3.out'
      });

      /* Handle section */
      gsap.from(`.${styles.handleContent}`, {
        scrollTrigger: { trigger: `.${styles.handleSection}`, start: 'top 70%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out'
      });
      gsap.from(`.${styles.handleVideoCard}`, {
        scrollTrigger: { trigger: `.${styles.handleSection}`, start: 'top 70%' },
        x: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2
      });

      /* Portfolio cards */
      gsap.from(`.${styles.pCard}`, {
        scrollTrigger: { trigger: `.${styles.portfolioSection}`, start: 'top 75%' },
        y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });

      /* Refresh ScrollTrigger after transition settles */
      setTimeout(() => ScrollTrigger.refresh(), transitionDelay * 1000 + 200);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ═══════════════════════════════════
          SECTION 1: COMPACT HEADER (DARK)
         ═══════════════════════════════════ */}
      <section className={styles.headerSection}>
        <div className={styles.headerBg}>
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80"
            alt="Resort aerial view"
          />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className={styles.headerInner}>
          <div className={styles.headerContent}>
            <span className={styles.headerLabel}>OUR OFFERING</span>
            <h1 className={styles.headerTitle}>
              <span className={styles.titlePrefix}>We help Resorts with</span>
              <span className={styles.dynamicWordWrap}>
                <span key={words[wordIndex]} className={styles.dynamicWord}>
                  {words[wordIndex]}
                </span>
              </span>
            </h1>
            <p className={styles.headerSub}>
              Elevating luxury hospitality through strategy, storytelling, and technology — 
              driving direct bookings beyond OTA dependency.
            </p>
          </div>
          <div className={styles.headerBadge}>
            <div className={styles.badgeInner}>
              <span className={styles.badgeNumber}>40%</span>
              <span className={styles.badgeText}>AVG INCREASE IN<br/>DIRECT BOOKINGS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 2: OUR PROCESS (DARK)
         ═══════════════════════════════════ */}
      <section className={styles.processSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>HOW WE WORK</span>
            <h2 className={styles.sectionTitle}>OUR PROCESS</h2>
            <p className={styles.sectionDesc}>
              A proven five-phase methodology refined across 50+ resort partnerships worldwide.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, i) => (
              <div key={i} className={styles.processStep}>
                <div className={styles.stepTop}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepLine}></div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 3: SERVICES GRID (WHITE)
         ═══════════════════════════════════ */}
      <section className={styles.servicesSection} ref={refSectionRef}>
        <div className={styles.servicesInner}>
          <div className={styles.servicesContent}>
            <span className={styles.servicesLabel}>HOW WE WORK</span>
            <h2 className={styles.servicesTitle}>
              STRATEGY FIRST.<br />
              EVERY <span className={styles.servicesHighlight}>CHANNEL</span> ALIGNED.
            </h2>
            <p className={styles.servicesDesc}>
              At Beyond Reach, we don't work in silos. Our integrated strategy 
              hub connects every discipline — from brand and creative to 
              performance and analytics — into one unified growth system.
            </p>
            <div className={styles.servicesStats}>
              <div className={styles.servicesStat}>
                <span className={styles.statsNumber}>8+</span>
                <span className={styles.statsLabel}>CORE<br/>DISCIPLINES</span>
              </div>
              <div className={styles.servicesDivider}></div>
              <div className={styles.servicesStat}>
                <span className={styles.statsNumber}>360°</span>
                <span className={styles.statsLabel}>UNIFIED<br/>APPROACH</span>
              </div>
            </div>
          </div>
          <div className={styles.servicesGrid}>
            {[
              { name: 'Branding', num: '01', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80' },
              { name: 'Performance Ads', num: '02', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
              { name: 'SEO & Content', num: '03', img: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80' },
              { name: 'Web & Digital', num: '04', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
              { name: 'Analytics', num: '05', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
              { name: 'Revenue Strategy', num: '06', img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80' },
              { name: 'Social Media', num: '07', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80' },
              { name: 'CRM & Retention', num: '08', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' }
            ].map((service, i) => (
              <div 
                key={i} 
                className={`${styles.serviceBlock} ${styles[`service${i + 1}`]}`}
              >
                <div 
                  className={styles.serviceBg} 
                  style={{ backgroundImage: `url(${service.img})` }}
                ></div>
                <div className={styles.serviceOverlay}></div>
                <span className={styles.serviceNum}>{service.num}</span>
                <span className={styles.serviceName}>{service.name}</span>
                <div className={styles.serviceGlow}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 4: HOW WE HANDLE (DARK)
         ═══════════════════════════════════ */}
      <section className={styles.handleSection}>
        <div className={styles.sectionInner}>
          <div className={styles.handleTop}>
            <div className={styles.handleContent}>
              <span className={styles.sectionLabel}>WHAT SETS US APART</span>
              <h2 className={styles.handleSectionTitle}>HOW WE HANDLE<br/>RESORT MARKETING</h2>
              <p className={styles.handleDesc}>
                We don't just run ads. We architect full-funnel ecosystems that turn 
                lookers into bookers — from initial inspiration to post-stay advocacy.
              </p>
              <div className={styles.handleHighlights}>
                <div className={styles.handleHighlight}>
                  Full-spectrum campaigns across search, social, and programmatic — tailored to seasonal demand.
                </div>
                <div className={styles.handleHighlight}>
                  Conversion-optimized booking flows that reduce drop-off by up to 60%.
                </div>
                <div className={styles.handleHighlight}>
                  Real-time analytics dashboards giving you complete visibility into ROI.
                </div>
              </div>
            </div>
            <div className={styles.handleVideoCard}>
              <video
                src="/sample-vid.mp4"
                autoPlay loop muted playsInline
                className={styles.handleVideo}
              />
              <div className={styles.handleVideoOverlay}>
                <span className={styles.handleVideoTag}>STRATEGY IN ACTION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 5: PORTFOLIO (WHITE - GLOBAL)
         ═══════════════════════════════════ */}
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
    </div>
  );
};

export default Resorts;
