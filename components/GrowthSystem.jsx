"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GrowthSystem.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GrowthSystem = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const sectionRef = useRef(null);
  const detailCardRef = useRef(null);
  const titleContainerRef = useRef(null);

  const stepsData = [
    {
      num: "01",
      title: "Property & Market Audit",
      desc: "We assess the property, location, audience, pricing, current assets and booking potential.",
      bullets: [
        "Market & competitor analysis",
        "Audience & demand mapping",
        "Asset & pricing evaluation",
        "Booking potential assessment"
      ],
      phase: "DISCOVER",
      phaseIndex: 0, // DISCOVER
      progressWidth: "10%",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.rowIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 4V2" />
          <path d="M10 2h4" />
          <path d="M4 18h16" />
          <path d="M5 18a7 7 0 0 1 14 0" />
          <path d="M12 11v7" strokeDasharray="1 2" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Brand & Booking Readiness",
      desc: "We improve how the property appears across website, Google, social media, content and enquiry channels.",
      bullets: [
        "Direct booking site optimization",
        "Google Business profile setup",
        "Social media narrative alignment",
        "Enquiry channel friction audit"
      ],
      phase: "STRATEGISE",
      phaseIndex: 1, // STRATEGISE
      progressWidth: "36%",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.rowIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Demand Creation",
      desc: "We build awareness through content, search visibility, campaigns and audience targeting.",
      bullets: [
        "Content funnel mapping",
        "Search visibility boost (SEO)",
        "Targeted ad campaigns",
        "Audience segment targeting"
      ],
      phase: "STRATEGISE",
      phaseIndex: 1, // STRATEGISE
      progressWidth: "50%",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.rowIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M11 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
          <path d="M12 9h.01M12 13h.01M12 17h.01" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.5 7.5a4.5 4.5 0 0 1 0 9" />
          <path d="M21.5 5.5a7.5 7.5 0 0 1 0 13" />
          <path d="M3 9h5v6H3z" />
          <path d="M8 10l3-3v10l-3-3" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Enquiry & Lead Flow",
      desc: "We create structured WhatsApp, call, landing page and form-based enquiry journeys.",
      bullets: [
        "WhatsApp automation setup",
        "Call routing & conversion flow",
        "High-converting landing pages",
        "Structured lead forms"
      ],
      phase: "ACTIVATE",
      phaseIndex: 2, // ACTIVATE
      progressWidth: "66%",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.rowIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M21 11.5A8.5 8.5 0 0 1 12.5 20c-1.5 0-3-.4-4.3-1.1L3 21l2.1-5.2c-.8-1.3-1.1-2.8-1.1-4.3A8.5 8.5 0 0 1 12.5 3c4.7 0 8.5 3.8 8.5 8.5Z" />
        </svg>
      )
    },
    {
      num: "05",
      title: "Tracking & Optimisation",
      desc: "We track leads, guest behaviour, campaign performance and booking quality to improve results.",
      bullets: [
        "Lead source tracking",
        "Guest click behaviour analytics",
        "Ad spend performance reports",
        "Booking lead quality analysis"
      ],
      phase: "ACTIVATE",
      phaseIndex: 2, // ACTIVATE
      progressWidth: "82%",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.rowIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="4" y="14" width="3" height="7" rx="0.5" />
          <rect x="10.5" y="9" width="3" height="12" rx="0.5" />
          <rect x="17" y="4" width="3" height="17" rx="0.5" />
        </svg>
      )
    },
    {
      num: "06",
      title: "Scale & Retention",
      desc: "We refine offers, seasonal campaigns, repeat guest engagement and long-term growth systems.",
      bullets: [
        "Bespoke seasonal package offers",
        "Repeat guest email sequences",
        "VIP loyalty system integration",
        "Long-term growth automation"
      ],
      phase: "GROW",
      phaseIndex: 3, // GROW
      progressWidth: "100%",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.rowIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 3h12l4 6-10 12L2 9Z" />
          <path d="M12 3L8 9l4 12 M12 3l4 9-4 12" />
          <path d="M2 9h20" />
        </svg>
      )
    }
  ];

  const currentStepData = stepsData[activeStep];

  // Animate the left detail card whenever the active step changes
  useEffect(() => {
    const detailCard = detailCardRef.current;
    if (!detailCard) return;

    gsap.fromTo(
      detailCard.children,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeStep]);

  // Section entry scroll animation
  useEffect(() => {
    const section = sectionRef.current;
    const titleContainer = titleContainerRef.current;
    if (!section || !titleContainer) return;

    const anim = gsap.fromTo(
      titleContainer.children,
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  // Map Phase name to specific active step index (bidirectional timeline mapping)
  const handlePhaseClick = (phaseIndex) => {
    switch (phaseIndex) {
      case 0:
        setActiveStep(0); // DISCOVER
        break;
      case 1:
        setActiveStep(1); // STRATEGISE (first step in phase)
        break;
      case 2:
        setActiveStep(3); // ACTIVATE (first step in phase)
        break;
      case 3:
        setActiveStep(5); // GROW (first step in phase)
        break;
      default:
        break;
    }
  };

  const currentPhaseIndex = stepsData[activeStep].phaseIndex;

  return (
    <section ref={sectionRef} className={styles.growthSection} id="growth-system">
      <div className={styles.headerTitle} ref={titleContainerRef}>
        <span className={styles.subHeading}>HOW WE WORK</span>
        <h2 className={styles.mainHeading}>OUR GROWTH SYSTEM</h2>
        <p className={styles.subtitle}>
          A structured brand-to-booking framework built for premium hospitality growth.
        </p>
      </div>

      <div className={styles.container}>
        {/* Left Side: Desktop Detail Card */}
        <div ref={detailCardRef} className={styles.detailCard}>
          <div className={styles.cardTop}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIconFrame}>
                {currentStepData.icon}
              </div>
              <div className={styles.cardHeadingInfo}>
                <span className={styles.cardNum}>{currentStepData.num}</span>
                <h3 className={styles.cardTitle}>{currentStepData.title}</h3>
              </div>
            </div>
            <p className={styles.cardDesc}>{currentStepData.desc}</p>
            <div className={styles.headingLine}></div>
            <ul className={styles.bulletList}>
              {currentStepData.bullets.map((bullet, index) => (
                <li key={index} className={styles.bulletItem}>
                  <span className={styles.bulletDot}></span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.cardLinkContainer}>
            <a href="#contact" className={styles.cardLink}>
              VIEW DETAILS ➔
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Vertical Accordion rows */}
        <div className={styles.accordionContainer}>
          <div className={styles.verticalLine}></div>
          {stepsData.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <div
                key={index}
                className={`${styles.accordionRow} ${isActive ? styles.activeRow : ''}`}
                onClick={() => setActiveStep(index)}
              >
                {/* Horizontal glow connecting line */}
                <div className={styles.horizontalConnector}></div>
                
                {/* Vertical timeline node dot */}
                <div className={styles.rowNode}></div>

                <div className={styles.rowIdentity}>
                  <span className={styles.rowNum}>{step.num}</span>
                  <div className={styles.rowIconFrame}>
                    {step.icon}
                  </div>
                  <h3 className={styles.rowTitle}>{step.title}</h3>
                </div>

                <div className={styles.expanderBtn}>
                  {isActive ? "−" : "+"}
                </div>

                {/* Mobile Inline Detail Drawer */}
                {isActive && (
                  <div className={styles.mobileDetailDrawer}>
                    <p className={styles.mobileDesc}>{step.desc}</p>
                    <ul className={styles.mobileBullets}>
                      {step.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className={styles.mobileBullet}>
                          <span className={styles.mobileBulletDot}></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className={styles.mobileLink}>
                      VIEW DETAILS ➔
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Timeline Progress Tracker */}
        <div className={styles.bottomTimeline}>
          <div className={styles.timelineTrack}>
            <div
              className={styles.timelineProgress}
              style={{ width: currentStepData.progressWidth }}
            ></div>
          </div>
          
          <div className={styles.timelineLabels}>
            <div
              className={`${styles.timelineNode} ${currentPhaseIndex === 0 ? styles.activeNode : ''}`}
              onClick={() => handlePhaseClick(0)}
            >
              <div className={styles.nodeCircle}></div>
              <span className={styles.nodeIndex}>01</span>
              <span className={styles.nodeLabel}>DISCOVER</span>
            </div>

            <div
              className={`${styles.timelineNode} ${currentPhaseIndex === 1 ? styles.activeNode : ''}`}
              onClick={() => handlePhaseClick(1)}
            >
              <div className={styles.nodeCircle}></div>
              <span className={styles.nodeLabel}>STRATEGISE</span>
            </div>

            <div
              className={`${styles.timelineNode} ${currentPhaseIndex === 2 ? styles.activeNode : ''}`}
              onClick={() => handlePhaseClick(2)}
            >
              <div className={styles.nodeCircle}></div>
              <span className={styles.nodeLabel}>ACTIVATE</span>
            </div>

            <div
              className={`${styles.timelineNode} ${currentPhaseIndex === 3 ? styles.activeNode : ''}`}
              onClick={() => handlePhaseClick(3)}
            >
              <div className={styles.nodeCircle}></div>
              <span className={styles.nodeLabel}>GROW</span>
              <span className={styles.nodeIndex}>06</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSystem;
