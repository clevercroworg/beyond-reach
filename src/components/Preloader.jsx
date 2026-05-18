import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Preloader.module.css';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBottomRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const progress = progressRef.current;
    const progressBar = progressBarRef.current;
    const curtainTop = curtainTopRef.current;
    const curtainBottom = curtainBottomRef.current;

    // Lock body scroll during preloader
    document.body.style.overflow = 'hidden';

    const masterTL = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete();
      }
    });

    // Phase 1: Fade in logo letters staggered
    const letters = logo.querySelectorAll(`.${styles.letter}`);
    masterTL.set(letters, { y: 60, opacity: 0 });
    masterTL.to(letters, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
    }, 0.3);

    // Phase 2: Progress bar fills up
    const countObj = { val: 0 };
    masterTL.to(countObj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const rounded = Math.round(countObj.val);
        setCount(rounded);
        if (progressBar) {
          progressBar.style.width = `${rounded}%`;
        }
      }
    }, 0.8);

    // Phase 3: After loading, scale up logo and fade out content
    masterTL.to(logo, {
      scale: 1.2,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    }, '+=0.3');

    masterTL.to(progress, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, '<');

    // Phase 4: Curtain split — two halves wipe away to reveal site
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
          <div className={styles.logo} ref={logoRef}>
            {'BEYOND REACH'.split('').map((char, i) => (
              <span
                key={i}
                className={`${styles.letter} ${char === ' ' ? styles.space : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          <div className={styles.progress} ref={progressRef}>
            <div className={styles.progressTrack}>
              <div className={styles.progressBar} ref={progressBarRef}></div>
            </div>
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
