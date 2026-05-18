import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Marquee.module.css';

gsap.registerPlugin(ScrollTrigger);

const Marquee = () => {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  // Premium hospitality & luxury lifestyle brands — the kind of clients
  // a premium experiences agency like Beyond Reach would work with
  const logos = [
    "MARRIOTT",
    "FOUR SEASONS",
    "RITZ-CARLTON",
    "AMAN",
    "MANDARIN ORIENTAL",
    "TAJ HOTELS",
    "OBEROI",
    "W HOTELS",
    "HYATT",
    "HILTON",
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Base speed: pixels per second
    const baseSpeed = 120;
    let currentX = 0;
    let speed = baseSpeed;

    // Get the width of one set of logos (half the track since we duplicate once)
    const getResetPoint = () => track.scrollWidth / 2;

    // GSAP ticker for smooth frame-by-frame animation
    const onTick = () => {
      currentX -= speed / 60; // 60fps
      const resetPoint = getResetPoint();
      if (Math.abs(currentX) >= resetPoint) {
        currentX += resetPoint;
      }
      gsap.set(track, { x: currentX });
    };

    gsap.ticker.add(onTick);

    // ScrollTrigger: boost speed while scrolling, ease back when stopped
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        // Boost speed proportional to scroll velocity
        speed = baseSpeed + velocity * 0.15;
      },
    });

    // Ease speed back to base when not scrolling
    const easeInterval = setInterval(() => {
      if (speed > baseSpeed) {
        speed = Math.max(baseSpeed, speed * 0.92); // Exponential ease-back
      }
    }, 50);

    return () => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.getAll().forEach(t => t.kill());
      clearInterval(easeInterval);
    };
  }, []);

  // Duplicate logos once for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <section className={styles.marqueeSection} ref={sectionRef}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack} ref={trackRef}>
          {allLogos.map((name, index) => (
            <div key={index} className={styles.logoItem}>
              <span className={styles.dot}>●</span>
              <span className={styles.logoText}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
