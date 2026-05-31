"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyBeyondReach.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyBeyondReach = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section) return;

    // Scroll animation for left content elements
    let leftAnim;
    if (leftContent) {
      leftAnim = gsap.fromTo(
        leftContent.children,
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
    }

    // Scroll animation for card grid (staggered display)
    let cardsAnim;
    if (cards.length > 0) {
      cardsAnim = gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out"
        }
      );
    }

    return () => {
      if (leftAnim && leftAnim.scrollTrigger) leftAnim.scrollTrigger.kill();
      if (leftAnim) leftAnim.kill();
      if (cardsAnim && cardsAnim.scrollTrigger) cardsAnim.scrollTrigger.kill();
      if (cardsAnim) cardsAnim.kill();
    };
  }, []);

  const cardData = [
    {
      num: "01",
      title: "Hospitality-first thinking",
      text: "We understand stays, guest intent, location demand, seasonality, pricing, experience value and booking hesitation.",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.cardIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
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
      title: "Brand-to-booking approach",
      text: "We do not only run campaigns. We improve the full journey from discovery to enquiry to booking.",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.cardIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Data-led decision making",
      text: "We use analytics, platform signals and guest behaviour insights to understand who is searching, what they want and when to reach them.",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.cardIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="4" y="14" width="3" height="7" rx="0.5" />
          <rect x="10.5" y="9" width="3" height="12" rx="0.5" />
          <rect x="17" y="4" width="3" height="17" rx="0.5" />
        </svg>
      )
    },
    {
      num: "04",
      title: "In-house systems",
      text: "We support booking lead tracking, enquiry management, WhatsApp flow, outreach and optional call assistance when required.",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.cardIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M21 11.5A8.5 8.5 0 0 1 12.5 20c-1.5 0-3-.4-4.3-1.1L3 21l2.1-5.2c-.8-1.3-1.1-2.8-1.1-4.3A8.5 8.5 0 0 1 12.5 3c4.7 0 8.5 3.8 8.5 8.5Z" />
        </svg>
      )
    },
    {
      num: "05",
      title: "Premium positioning",
      text: "We help properties look more credible, desirable and booking-ready before scaling campaigns.",
      icon: (
        <svg viewBox="0 0 24 24" className={styles.cardIcon} fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 3h12l4 6-10 12L2 9Z" />
          <path d="M12 3L8 9l4 12 M12 3l4 9-4 12" />
          <path d="M2 9h20" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className={styles.whySection} id="why-choose-us">
      <div className={styles.container}>
        {/* Left Content Column */}
        <div ref={leftContentRef} className={styles.leftContent}>
          <span className={styles.subHeading}>WHY BEYOND REACH</span>
          <h2 className={styles.mainHeading}>
            WHY PREMIUM <br />
            HOSPITALITY BRANDS <br />
            CHOOSE <br />
            <span className={styles.neonAccent}>BEYOND REACH</span>
          </h2>
          <div className={styles.headingLine}></div>
          <p className={styles.description}>
            We are not built like a typical local agency. We operate at the intersection of hospitality positioning, digital demand, guest behaviour, performance marketing and booking infrastructure.
          </p>
        </div>

        {/* Right 5-Card Grid */}
        <div className={styles.rightGrid}>
          {cardData.map((card, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className={`${styles.card} ${styles[`card${card.num}`]}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardNum}>{card.num}</span>
                <div className={styles.iconWrapper}>
                  {card.icon}
                </div>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBeyondReach;
