import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    { text: "BEYOND REACH TRANSFORMED OUR STRATEGY. DIRECT BOOKINGS ARE UP 40%.", author: "THE GRAND RESORT", year: "2024" },
    { text: "FINALLY BROKE FREE FROM OTA COMMISSIONS. THEIR SEO EXPERTISE IS UNMATCHED.", author: "VITALITY WELLNESS SPA", year: "2023" },
    { text: "OUR YACHT CHARTERS ARE BOOKED SOLID FOR THE SEASON THROUGH ORGANIC REACH.", author: "AZURE CHARTERS", year: "2024" },
    { text: "THEIR CAMPAIGNS ELEVATED OUR BRAND PRESENCE OVERNIGHT. INCREDIBLE ROI.", author: "SERENITY RETREATS", year: "2023" }
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
        <button className={styles.actionBtn}>
            <div className={styles.btnTextContainer}>
              <span className={styles.btnLabel}><span className={styles.star}>★</span> WORK WITH US</span>
              <span className={styles.btnLabel} aria-hidden="true"><span className={styles.star}>★</span> WORK WITH US</span>
            </div>
          </button>
      </div>
    </section>
  );
};

export default Testimonials;
