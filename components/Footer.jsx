import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* TOP SECTION */}
      <div className={styles.topSection}>
        <div className={styles.brandBlock}>
          <p className={styles.tagline}>Built for modern hospitality brands.</p>
          <h2 className={styles.logo}>
            <span style={{ fontWeight: 'bold' }}>BEYOND</span> <span style={{ fontWeight: 'normal' }}>REACH</span>
          </h2>
        </div>
        <div className={styles.contactBlock}>
          <p className={styles.description}>
            We help hotels, resorts, villas, spas and experience-led brands grow through strategic marketing, performance campaigns, content systems and direct booking growth.
          </p>
          <Link href="/contact" className={styles.contactBtn}>
            <div className={styles.btnTextContainer}>
              <span className={styles.btnLabel}><span className={styles.star}>★</span> CONTACT US</span>
              <span className={styles.btnLabel} aria-hidden="true"><span className={styles.star}>★</span> CONTACT US</span>
            </div>
          </Link>
        </div>
      </div>
      
      <hr className={styles.divider} />
      
      {/* MIDDLE SECTION */}
      <div className={styles.middleSection}>
        <div className={styles.footerLinks}>
          <Link href="/work">WORK</Link>
          <Link href="/#solution">SERVICES</Link>
          <Link href="/#about">ABOUT</Link>
          <Link href="/contact">CONTACT</Link>
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.socialIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className={styles.socialIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="#" className={styles.socialIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
          </a>
          <a href="#" className={styles.socialIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
      
      <hr className={styles.divider} />
      
      {/* BOTTOM SECTION */}
      <div className={styles.bottomSection}>
        <div className={styles.copyrightBox}>
          <div className={styles.boxLogo}>BR</div>
          <div className={styles.boxText}>
            <p className={styles.year}>2026 © ALL RIGHTS RESERVED</p>
            <p className={styles.desc}>Beyond Reach is a premium agency based in the World.</p>
          </div>
        </div>
        
        <div className={styles.legalBlock}>
          <span className={styles.label}>LEGAL</span>
          <a href="#" className={styles.link}>GENERAL TERMS</a>
        </div>
        
        <div className={styles.creditsBlock}>
          <span className={styles.label}>PRIVACY</span>
          <Link href="/privacy-policy" className={styles.link}>PRIVACY POLICY</Link>
        </div>
      </div>
      
      <div className={styles.bottomSpacer}></div>
    </footer>
  );
};

export default Footer;
