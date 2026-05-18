import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Offerings.module.css';

gsap.registerPlugin(ScrollTrigger);

const Offerings = () => {
  const mobileWrappersRef = useRef([]);

  const items = [
    { title: "Resorts", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80" },
    { title: "Home Stay", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80" },
    { title: "Wellness", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80" },
    { title: "Spa & Retreats", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" },
    { title: "Events", img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80" },
    { title: "Yachts", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80" }
  ];

  useEffect(() => {
    let mm = gsap.matchMedia();
    
    // Only apply ScrollTrigger animations on mobile
    mm.add("(max-width: 768px)", () => {
      mobileWrappersRef.current.forEach((el) => {
        if (!el) return;
        
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%", // Triggers when the top of the element hits 60% of viewport
          end: "bottom 40%",
          toggleClass: styles.mobileActive,
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.sectionFluidMain} id="solution">
      <div className={styles.headerTitle}>
        <h2>OUR OFFERINGS</h2>
      </div>

      {/* Desktop Grid Layout (Hidden on Mobile) */}
      <div className={`${styles.sectionRow} ${styles.desktopOnly}`}>
        {items.map((item, index) => (
          <div className={styles.sectionCol} key={`desktop-${index}`}>
            <div className={styles.sectionBlock}>
              <div className={styles.sectionIn}>
                <img src={item.img} alt={item.title} />
              </div>
            </div>
            {/* Hover text is now contained WITHIN the column so it doesn't bleed */}
            <div className={styles.hoverText}>
              <h2>{item.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Scroll Layout (Hidden on Desktop) */}
      <div className={`${styles.mobileList} ${styles.mobileOnly}`}>
        {items.map((item, index) => (
          <div 
            className={styles.mobileWrapper} 
            key={`mobile-${index}`}
            ref={el => mobileWrappersRef.current[index] = el}
          >
            <div className={styles.mobileImageWrapper}>
              <img src={item.img} alt={item.title} className={styles.mobileImg} />
            </div>
            <div className={styles.mobileHeaderWrapper}>
              <div className={styles.mobileTextMover}>
                <h2 className={styles.mobileTitle}>{item.title}</h2>
                <h2 className={styles.mobileTitleAction}>SEE PROJECT</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offerings;
