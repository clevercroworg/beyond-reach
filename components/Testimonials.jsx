import React from 'react';
import Link from 'next/link';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    { text: "Beyond Reach transformed our strategy. Direct bookings are up 40%.", author: "THE GRAND RESORT", year: "2024" },
    { text: "Finally broke free from OTA commissions. Their SEO expertise is unmatched.", author: "VITALITY WELLNESS SPA", year: "2023" },
    { text: "Our yacht charters are booked solid for the season through organic reach.", author: "AZURE CHARTERS", year: "2024" },
    { text: "Their campaigns elevated our brand presence overnight. Incredible ROI.", author: "SERENITY RETREATS", year: "2023" }
  ];

  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.heading}>
        JUST BELIEVE OUR <br /> CLIENTS' <span className={styles.quoteMark}>""</span> WORDS
      </h2>
      
      <div className={styles.grid}>
        {testimonials.map((t, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.meta}>
              <span className={styles.author}>{t.author}</span>
              <span className={styles.year}>{t.year}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actionContainer}>
        <Link href="/contact" className={styles.actionBtn}>
          <div className={styles.btnTextContainer}>
            <span className={styles.btnLabel}><span className={styles.star}>★</span> WORK WITH US</span>
            <span className={styles.btnLabel} aria-hidden="true"><span className={styles.star}>★</span> WORK WITH US</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
