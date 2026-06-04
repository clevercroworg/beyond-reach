"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ClubsLounges.module.css';
import ServicesMarquee from '@/components/ServicesMarquee';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── DATA ─── */
const processSteps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    desc: "We dive deep into your club\u2019s digital presence \u2014 analyzing your current OTA dependency, booking funnels, brand positioning, and competitive landscape to uncover hidden growth levers."
  },
  {
    number: '02',
    title: 'Strategy Blueprint',
    desc: "A tailored roadmap covering SEO, paid media, content marketing, and direct booking optimization \u2014 designed specifically for luxury hospitality."
  },
  {
    number: '03',
    title: 'Creative & Content',
    desc: 'From cinematic videography to immersive virtual tours, we craft visual storytelling that captures the essence of your club and compels travelers to book direct.'
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
    desc: "Cinematic content and editorial narratives that position your club as the destination, not just accommodation."
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

/* ─── FAQ DATA ─── */
const clubFaqs = [
  {
    question: 'How do you reduce our reliance on Online Travel Agencies (OTAs)?',
    answer: 'We shift the balance of power back to your club by building a high-converting direct booking ecosystem. This includes optimizing your website for search engines (SEO), running targeted paid media campaigns to capture high-intent travelers, and implementing urgency triggers and rate-parity strategies that incentivize guests to book directly with you rather than a third party.'
  },
  {
    question: 'What digital marketing strategies yield the highest ROI for luxury clubs?',
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

/* ─── PORTFOLIO CARD ─── */
const PortfolioCard = ({ title, client, category, imgSrc, vidSrc }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

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
    <Link href="/case-study-snap" className={styles.pCard} ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
    </Link>
  );
};

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

/* ─── MAIN PAGE ─── */
const ClubsLounges = () => {
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
      /* Temporarily disabled GSAP on word cloud to debug visibility issue */

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
            src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1600&q=80"
            alt="Clubs aerial view"
          />
          <div className={styles.headerOverlay}></div>
        </div>
        <div className={styles.headerInner}>
          <div className={styles.headerContent}>
            <span className={styles.headerLabel}>OUR OFFERING</span>
            <h1 className={styles.headerTitle}>
              <span className={styles.titlePrefix}>We help Clubs with</span>
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
              A proven five-phase methodology refined across 50+ club partnerships worldwide.
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
          SECTION 3: SERVICES (MARQUEE)
         ═══════════════════════════════════ */}
      <ServicesMarquee />

      {/* ═══════════════════════════════════
          SECTION 4: HOW WE HANDLE (DARK)
         ═══════════════════════════════════ */}
      <section className={styles.handleSection}>
        <div className={styles.sectionInner}>
          <div className={styles.handleTop}>
            <div className={styles.handleContent}>
              <span className={styles.sectionLabel}>WHAT SETS US APART</span>
              <h2 className={styles.handleSectionTitle}>HOW WE HANDLE<br/>CLUB MARKETING</h2>
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

      {/* ═══════════════════════════════════
          SECTION 6: FAQ (DARK)
         ═══════════════════════════════════ */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqHeader}>
            <span className={styles.faqLabel}>COMMON QUESTIONS</span>
            <h2 className={styles.faqTitle}>FAQS</h2>
          </div>
          <FaqAccordion faqs={clubFaqs} />
        </div>
      </section>
    </div>
  );
};

export default ClubsLounges;
