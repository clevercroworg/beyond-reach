import React, { useEffect, useRef } from 'react';
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

/* ─── SVG MIND MAP COMPONENT ─── */
const branchData = [
  { label: 'Branding', angle: -55, len: 260, color: '#c85a5a' },
  { label: 'Performance Ads', angle: -38, len: 240, color: '#c87a3a' },
  { label: 'SEO & Content', angle: -22, len: 255, color: '#b8a033' },
  { label: 'Web & Digital', angle: -5, len: 250, color: '#5a8c5a' },
  { label: 'Analytics', angle: 12, len: 235, color: '#4a7a9e' },
  { label: 'Revenue Strategy', angle: 28, len: 270, color: '#7a5aaa' },
  { label: 'Social Media', angle: 45, len: 225, color: '#c85a8a' },
  { label: 'CRM & Retention', angle: 62, len: 245, color: '#8a7a5a' }
];

const MindMapSVG = ({ isActive }) => {
  const svgRef = useRef(null);
  const hasAnimated = useRef(false);

  const cx = 200, cy = 260, hubR = 80;

  useEffect(() => {
    if (!isActive || hasAnimated.current || !svgRef.current) return;
    hasAnimated.current = true;

    const svg = svgRef.current;
    const paths = svg.querySelectorAll('[data-branch-path]');
    const dots = svg.querySelectorAll('[data-branch-dot]');
    const labels = svg.querySelectorAll('[data-branch-label]');
    const hub = svg.querySelector('[data-hub]');
    const hubText = svg.querySelector('[data-hub-text]');
    const hubGlow = svg.querySelector('[data-hub-glow]');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Hub entrance */
    tl.fromTo(hub, { scale: 0, transformOrigin: `${cx}px ${cy}px` },
      { scale: 1, duration: 0.8, ease: 'back.out(1.4)' })
      .fromTo(hubGlow, { opacity: 0, scale: 0.5, transformOrigin: `${cx}px ${cy}px` },
        { opacity: 1, scale: 1, duration: 1 }, '-=0.4')
      .fromTo(hubText, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.5');

    /* Draw each path + dot + label sequentially */
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      }, `-=${i === 0 ? 0 : 0.45}`)
        .fromTo(dots[i], { scale: 0, transformOrigin: 'center' },
          { scale: 1, duration: 0.3, ease: 'back.out(3)' }, '-=0.2')
        .fromTo(labels[i], { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.35 }, '-=0.15');
    });

    /* Hub subtle pulse loop */
    gsap.to(hubGlow, {
      scale: 1.15, opacity: 0.4, duration: 2, repeat: -1, yoyo: true,
      ease: 'sine.inOut', transformOrigin: `${cx}px ${cy}px`, delay: 2.5
    });
  }, [isActive, cx, cy]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 700 520"
      className={styles.mindMapSvg}
      aria-label="Commercial Strategy Team mind map"
    >
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8a45a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c8a45a" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hub glow */}
      <circle data-hub-glow cx={cx} cy={cy} r={hubR + 30} fill="url(#hubGlow)" opacity="0" />

      {/* Branches */}
      {branchData.map((b, i) => {
        const rad = (b.angle * Math.PI) / 180;
        const startX = cx + Math.cos(rad) * hubR;
        const startY = cy + Math.sin(rad) * hubR;
        const endX = cx + Math.cos(rad) * b.len;
        const endY = cy + Math.sin(rad) * b.len;
        /* Bezier control — curve slightly perpendicular */
        const perpRad = rad + Math.PI / 2;
        const curveMag = 20 + (i % 3) * 8;
        const cpX = (startX + endX) / 2 + Math.cos(perpRad) * curveMag * (i % 2 === 0 ? 1 : -1);
        const cpY = (startY + endY) / 2 + Math.sin(perpRad) * curveMag * (i % 2 === 0 ? 1 : -1);
        const dotR = 6;

        return (
          <g key={i}>
            <path
              data-branch-path
              d={`M${startX},${startY} Q${cpX},${cpY} ${endX},${endY}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
            <rect
              data-branch-dot
              x={endX - dotR} y={endY - dotR}
              width={dotR * 2} height={dotR * 2}
              rx="2"
              fill={b.color}
              transform={`rotate(45, ${endX}, ${endY})`}
            />
            <text
              data-branch-label
              x={endX + 18}
              y={endY + 6}
              fill="#333"
              fontSize="18"
              fontFamily="Inter, sans-serif"
              fontStyle="italic"
              opacity="0"
            >
              {b.label}
            </text>
          </g>
        );
      })}

      {/* Hub circle */}
      <circle data-hub cx={cx} cy={cy} r={hubR} fill="#f8f8f6" stroke="#d4d0c8" strokeWidth="1.5" />
      <text data-hub-text textAnchor="middle" fill="#333" fontSize="14" fontFamily="Inter, sans-serif" fontStyle="italic" opacity="0">
        <tspan x={cx} y={cy - 10}>360°</tspan>
        <tspan x={cx} y={cy + 8}>Strategy</tspan>
        <tspan x={cx} y={cy + 26}>Hub</tspan>
      </text>
    </svg>
  );
};


/* ─── MAIN PAGE ─── */
const Resorts = () => {
  const pageRef = useRef(null);
  const refSectionRef = useRef(null);
  const [refSectionActive, setRefSectionActive] = React.useState(false);

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

      /* ── Reference section — scroll-triggered entrance ── */
      ScrollTrigger.create({
        trigger: refSectionRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () => setRefSectionActive(true)
      });

      /* Left content slide-in */
      gsap.from(`.${styles.refLabel}`, {
        scrollTrigger: { trigger: refSectionRef.current, start: 'top 65%' },
        y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
      });
      gsap.from(`.${styles.refTitle}`, {
        scrollTrigger: { trigger: refSectionRef.current, start: 'top 65%' },
        y: 50, opacity: 0, duration: 0.9, ease: 'power4.out', delay: 0.15
      });
      gsap.from(`.${styles.refDesc}`, {
        scrollTrigger: { trigger: refSectionRef.current, start: 'top 65%' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.35
      });
      gsap.from(`.${styles.refTag}`, {
        scrollTrigger: { trigger: refSectionRef.current, start: 'top 65%' },
        scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(2)', delay: 0.55
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
            <h1 className={styles.headerTitle}>RESORTS</h1>
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
          SECTION 3: REFERENCE / VISUAL (WHITE)
         ═══════════════════════════════════ */}
      <section className={styles.referenceSection} ref={refSectionRef}>
        <div className={styles.refInner}>
          <div className={styles.refContent}>
            <span className={styles.refLabel}>HOW WE WORK</span>
            <h2 className={styles.refTitle}>
              Strategy first.<br />
              Every <span className={styles.refHighlight}>channel</span> aligned.<br />
              Nothing left to chance.
            </h2>
            <p className={styles.refDesc}>
              At Beyond Reach, we don't work in silos. Our integrated strategy hub 
              connects every discipline — from brand and creative to performance 
              and analytics — into one unified growth system.
            </p>
            <div className={styles.refTags}>
              {['Branding', 'Performance Ads', 'SEO & Content', 'Web & Digital', 'Analytics', 'Revenue Strategy', 'Social Media', 'CRM & Retention'].map((tag, i) => (
                <span key={i} className={styles.refTag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.refImageWrap}>
            <MindMapSVG isActive={refSectionActive} />
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
