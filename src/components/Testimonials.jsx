import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    { text: "A SOUND MIND IN A SOUND BODY", author: "ASICS", year: "2024" },
    { text: "CONNECTING PEOPLE WITH SPORT", author: "OYSHO", year: "2023" },
    { text: "TWICE SETS AN EXAMPLE", author: "PUMA", year: "2023" },
    { text: "WE ARE WINNING WITH TWICE", author: "LIGA F", year: "2024" }
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
