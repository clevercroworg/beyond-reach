"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';

const Hero = () => {
  const contentRef = useRef(null);
  const wordContainerRef = useRef(null);
  const footerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false); // Default to false for SSR

  useEffect(() => {
    // Check window width only after component mounts on the client
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Words that cycle through endlessly
  const cycleWords = ['RANKINGS', 'TRAFFIC', 'CLICKS', 'ALGORITHM', 'ADS', 'OTA DEPENDENCY'];

  useEffect(() => {
    const content = contentRef.current;
    const wordContainer = wordContainerRef.current;
    if (!content || !wordContainer) return;

    // Entry animation for main content
    gsap.fromTo(
      content.children,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out', delay: 0.5 }
    );

    // Entry animation for corner text
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 1.2 }
      );
    }

    // Word cycling animation
    const words = wordContainer.querySelectorAll(`.${styles.cycleWord}`);
    let currentIndex = 0;

    // Show the first word immediately
    gsap.set(words[0], { yPercent: 0, opacity: 1 });

    const cycleTimeline = () => {
      const current = words[currentIndex];
      const nextIndex = (currentIndex + 1) % words.length;
      const next = words[nextIndex];

      const tl = gsap.timeline({
        delay: 2, // Each word shows for 2 seconds
        onComplete: () => {
          currentIndex = nextIndex;
          cycleTimeline(); // Trigger next cycle
        }
      });

      // Wipe current word up and out
      tl.to(current, {
        yPercent: -110,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      });

      // Wipe next word in from below
      tl.fromTo(next,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.15' // Slight overlap for smoothness
      );
    };

    // Start cycling after initial entry animation finishes
    const startDelay = setTimeout(() => {
      cycleTimeline();
    }, 2000); // Wait for entry animation + a beat

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.videoContainer}>
        <video 
          key={isMobile ? "mobile-video" : "desktop-video"}
          src={isMobile ? "/mobile-bg.mp4" : "/desktop-bg.mp4"}
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className={styles.video}
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content} ref={contentRef}>
        <h1 className={styles.title}>
          <span>BEYOND</span>
          <div className={styles.wordCycler} ref={wordContainerRef}>
            {cycleWords.map((word, i) => (
              <span 
                key={i} 
                className={styles.cycleWord}
                style={{ 
                  opacity: i === 0 ? 1 : 0,
                  fontSize: word === 'OTA DEPENDENCY' ? '0.75em' : '1em'
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </h1>
        <p className={styles.subtitle}>Data-Driven Hospitality Marketing</p>
      </div>

      <div className={styles.heroFooter} ref={footerRef}>
        <div className={styles.footerLeft}>
          <p className={styles.smallText}>BEYOND REACH</p>
          <p className={styles.boldText}>CREATIVE AGENCY</p>
        </div>
        <div className={styles.footerRight}>
          <p className={styles.smallText}>EST. 2026</p>
          <p className={styles.boldText}>GLOBAL TEAM</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
