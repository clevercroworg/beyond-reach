import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Preloader.module.css';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const logoFillRef = useRef(null);
  const counterRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBottomRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const curtainTop = curtainTopRef.current;
    const curtainBottom = curtainBottomRef.current;
    const counter = counterRef.current;

    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';

    const masterTL = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Phase 1: Logo fills left to right with white
    const fillObj = { width: 0 };
    masterTL.to(fillObj, {
      width: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const rounded = Math.round(fillObj.width);
        setCount(rounded);
        if (logoFillRef.current) {
          logoFillRef.current.style.width = `${fillObj.width}%`;
        }
      }
    }, 0.5);

    // Phase 2: Scale up logo & fade counter
    masterTL.to(logo, {
      scale: 1.15,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
    }, '+=0.2');

    if (counter) {
      masterTL.to(counter, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, '<');
    }

    // Phase 3: Curtain split
    masterTL.to(curtainTop, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '-=0.1');

    masterTL.to(curtainBottom, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power4.inOut',
    }, '<');

    return () => {
      masterTL.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div className={styles.preloader} ref={containerRef}>
      {/* Top curtain half */}
      <div className={styles.curtainTop} ref={curtainTopRef}>
        <div className={styles.curtainContent}>
          <div className={styles.logoContainer} ref={logoRef}>
            <div className={styles.logoBase}>
              <span style={{ fontWeight: 'bold' }}>BEYOND</span> <span style={{ fontWeight: 'normal' }}>REACH</span>
            </div>
            <div className={styles.logoFill} ref={logoFillRef}>
              <span style={{ fontWeight: 'bold' }}>BEYOND</span> <span style={{ fontWeight: 'normal' }}>REACH</span>
            </div>
          </div>

          <div className={styles.progress}>
            <span className={styles.counter} ref={counterRef}>{count}%</span>
          </div>
        </div>
      </div>

      {/* Bottom curtain half */}
      <div className={styles.curtainBottom} ref={curtainBottomRef}>
        <div className={styles.bottomCredit}>
          <div className={styles.creditBox}>
            <div className={styles.creditLogo}>BR</div>
            <div className={styles.creditText}>
              <p className={styles.creditYear}>2026 © ALL RIGHTS RESERVED</p>
              <p className={styles.creditDesc}>Beyond Reach is a premium agency based in the World.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
