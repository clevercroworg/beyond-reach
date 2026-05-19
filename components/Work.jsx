"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Work.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "SAILO",
    client: "SAILO CLUB",
    imgSrc: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    vidSrc: "/projects/sailo-club.mp4"
  },
  {
    title: "NAVIGATE",
    client: "NAVIGATE AGENCY",
    imgSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    vidSrc: "/projects/navigate.mp4"
  },
  {
    title: "YACHT CLUB INDIA",
    client: "YACHT CLUB",
    imgSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    vidSrc: "/projects/yacht-club-india.mp4"
  },
  {
    title: "ASHTITVA",
    client: "ASHTITVA RESORTS",
    imgSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    vidSrc: "/projects/ashtitva.mp4"
  }
];

const WorkCard = React.forwardRef(({ title, client, imgSrc, vidSrc, isActive }, ref) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Desktop: hover to play
  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Video play error:", e));
      }
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  // Mobile: respond to isActive prop from parent
  useEffect(() => {
    if (window.innerWidth > 768) return;

    if (isActive) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log(e));
      }
    } else {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  return (
    <div className={styles.card} ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.mediaContainer}>
        <img 
          src={imgSrc} 
          alt={title} 
          className={styles.imagePlaceholder}
          style={{ opacity: isPlaying ? 0 : 1 }}
        />
        <video 
          ref={videoRef} 
          src={vidSrc} 
          className={styles.video} 
          muted 
          loop 
          playsInline
          preload="metadata"
        />
        <div className={styles.clientOverlay} style={{ opacity: isPlaying ? 1 : 0 }}>
          <span>{client}</span>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <span className={styles.cardClientText}>{client}</span>
      </div>
    </div>
  );
});

WorkCard.displayName = 'WorkCard';

const Work = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const cycleWords = ["STRATEGY", "CREATIVE", "WEBSITES", "CONTENT"];
  const [currentWord, setCurrentWord] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);

  // Word cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % cycleWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cycleWords.length]);

  // Mobile: scroll listener — find the SINGLE card closest to viewport center
  const handleScroll = useCallback(() => {
    if (window.innerWidth > 768) {
      setActiveCardIndex(-1);
      return;
    }

    const viewportCenter = window.innerHeight / 2;
    let closestIdx = -1;
    let closestDist = Infinity;

    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - viewportCenter);

      // Only consider cards that are reasonably in view (within 40% of viewport from center)
      if (dist < closestDist && dist < window.innerHeight * 0.35) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    setActiveCardIndex(closestIdx);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.animatedHeading}`, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });

      gsap.from(`.${styles.filterRow}`, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6
      });

      gsap.from(`.${styles.card}`, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.workSection} id="work" ref={containerRef}>
      <div className={styles.header}>
        <div className={styles.animatedHeading}>
          <div className={styles.cycler}>
            {cycleWords.map((word, i) => (
              <span
                key={i}
                className={`${styles.cycleWord} ${i === currentWord ? styles.activeWord : styles.inactiveWord}`}
              >
                {word}
              </span>
            ))}
          </div>
          <div className={styles.staticHeading}>DRIVEN PRODUCTION</div>
        </div>
        <div className={styles.filterRow}>
          <span>PROJECTS</span>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.map((proj, idx) => (
          <WorkCard
            key={idx}
            ref={el => cardRefs.current[idx] = el}
            {...proj}
            isActive={idx === activeCardIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
