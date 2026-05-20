"use client";
import React, { useRef } from 'react';
import styles from './ServicesMarquee.module.css';

const ServicesMarquee = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // The actual business services provided by Beyond Reach
  const row1Items = [
    "Digital Marketing",
    "Website Design",
    "Branding & Identity",
    "SEO & Content",
    "IT Services"
  ];

  const row2Items = [
    "Social Media",
    "Analytics & Insights",
    "Revenue Strategy",
    "CRM & Retention",
    "Performance Marketing"
  ];

  // We duplicate items to create a seamless infinite scroll effect across large screens
  const row1Repeated = [...row1Items, ...row1Items, ...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const row2Repeated = [...row2Items, ...row2Items, ...row2Items, ...row2Items, ...row2Items, ...row2Items];

  return (
    <section className={styles.servicesMarqueeSection}>
      {/* Marquee Wrapper */}
      <div className={styles.marqueeWrapper}>
        
        {/* Row 1 (Left to Right) */}
        <div className={styles.marqueeRow}>
          <div ref={row1Ref} className={`${styles.marqueeTrack} ${styles.trackLeft}`}>
            {row1Repeated.map((item, index) => (
              <span key={`r1-${index}`} className={styles.marqueeItem}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 (Right to Left) */}
        <div className={styles.marqueeRow}>
          <div ref={row2Ref} className={`${styles.marqueeTrack} ${styles.trackRight}`}>
            {row2Repeated.map((item, index) => (
              <span key={`r2-${index}`} className={styles.marqueeItem}>
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesMarquee;
