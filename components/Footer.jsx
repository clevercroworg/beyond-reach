import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* 1. TOP CTA BANNER - Full width horizontal section */}
      <div className={styles.ctaContainer}>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaLeft}>
            <div className={styles.ctaSubtagRow}>
              <span className={styles.ctaSubtag}>LET'S GROW. DIRECT.</span>
              <div className={styles.ctaSubtagLine}></div>
            </div>
            <h2 className={styles.ctaHeading}>LET'S BUILD YOUR BRAND-TO-BOOKING GROWTH SYSTEM.</h2>
            <p className={styles.ctaDesc}>
              We help hotels, resorts, villas, wellness brands and experience-led properties drive direct bookings—sustainably and profitably.
            </p>
          </div>
          <div className={styles.ctaRight}>
            <Link href="/contact" className={styles.ctaBtn}>
              ↗ REQUEST GROWTH REVIEW
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT SECTION */}
      <div className={styles.mainFooter}>
        <div className={styles.footerGrid}>
          
          {/* Column 1: Brand Info */}
          <div className={styles.brandCol}>
            <h2 className={styles.logoStacked}>
              <span className={styles.logoWordBeyond}>BEYOND</span>
              <span className={styles.logoWordReach}>REACH</span>
            </h2>
            <p className={styles.brandDesc}>
              Strategic marketing and growth systems for premium hospitality and experience-led brands. Built for measurable, long-term direct booking growth.
            </p>
            <div className={styles.brandPartner}>
              <span className={styles.partnerDot}></span>
              <span className={styles.partnerText}>PARTNER TO AMBITIOUS BRANDS</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className={styles.linkCol}>
            <h3 className={styles.colHeader}>NAVIGATION</h3>
            <div className={styles.colHeaderLine}></div>
            <ul className={styles.linkList}>
              <li><Link href="/work" className={styles.footerLink}>WORK</Link></li>
              <li><Link href="/#growth-system" className={styles.footerLink}>WHO WE HELP</Link></li>
              <li><Link href="/#about" className={styles.footerLink}>ABOUT</Link></li>
              <li><Link href="/#testimonials" className={styles.footerLink}>INSIGHTS</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>CONTACT</Link></li>
            </ul>
          </div>

          {/* Column 3: Who We Help */}
          <div className={styles.linkCol}>
            <h3 className={styles.colHeader}>WHO WE HELP</h3>
            <div className={styles.colHeaderLine}></div>
            <ul className={styles.linkList}>
              <li><Link href="/hotels" className={styles.footerLink}>HOTELS</Link></li>
              <li><Link href="/resorts" className={styles.footerLink}>RESORTS</Link></li>
              <li><Link href="/homestays-villas" className={styles.footerLink}>HOMESTAYS & VILLAS</Link></li>
              <li><Link href="/spas-wellness" className={styles.footerLink}>SPAS & WELLNESS</Link></li>
              <li><Link href="/clubs-lounges" className={styles.footerLink}>CLUBS & LOUNGES</Link></li>
              <li><Link href="/event-venues" className={styles.footerLink}>EVENT VENUES</Link></li>
              <li><Link href="/yachts-boats" className={styles.footerLink}>YACHTS & BOAT RENTALS</Link></li>
              <li><Link href="/tours-activities" className={styles.footerLink}>TOURS & ACTIVITIES</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className={styles.connectCol}>
            <h3 className={styles.colHeader}>CONNECT</h3>
            <div className={styles.colHeaderLine}></div>
            
            <div className={styles.connectItem}>
              <div className={styles.connectIconFrame}>
                <svg viewBox="0 0 24 24" className={styles.connectIcon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="M17 14c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.1-.1.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4-.1-.5-.1-.2-.7-1.7-1-2.4-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4C7.3 6.8 6.5 7.6 6.5 9.2c0 1.6 1.2 3.1 1.3 3.3.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />
                </svg>
              </div>
              <div className={styles.connectText}>
                <span className={styles.connectLabel}>WHATSAPP US</span>
                <span className={styles.connectVal}>+91 98765 43210</span>
              </div>
            </div>

            <div className={styles.connectItem}>
              <div className={styles.connectIconFrame}>
                <svg viewBox="0 0 24 24" className={styles.connectIcon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.connectText}>
                <span className={styles.connectLabel}>BENGALURU, INDIA</span>
                <span className={styles.connectVal}>Working with brands across India</span>
              </div>
            </div>

            <div className={styles.connectItem}>
              <div className={styles.connectIconFrame}>
                <svg viewBox="0 0 24 24" className={styles.connectIcon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className={styles.connectText}>
                <span className={styles.connectLabel}>MON - SAT, 10:00 AM - 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Column 5: Follow & Slogan Box */}
          <div className={styles.followCol}>
            <h3 className={styles.colHeader}>FOLLOW</h3>
            <div className={styles.colHeaderLine}></div>
            
            <div className={styles.socialsGrid}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconFrame}>
                <svg viewBox="0 0 24 24" className={styles.socialIcon} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconFrame}>
                <svg viewBox="0 0 24 24" className={styles.socialIcon} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconFrame}>
                <svg viewBox="0 0 24 24" className={styles.socialIcon} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2a29 29 0 0 0-2.46 5.33A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>

            {/* Slogan framed box */}
            <div className={styles.sloganBox}>
              <div className={styles.sloganStarFrame}>
                <svg viewBox="0 0 24 24" className={styles.sloganStar} fill="currentColor">
                  <path d="M12 2 C12 9, 15 12, 22 12 C15 12, 12 15, 12 22 C12 15, 9 12, 2 12 C9 12, 12 9, 12 2 Z" />
                </svg>
              </div>
              <div className={styles.sloganText}>
                <span className={styles.sloganLine1}>STRATEGY. SYSTEMS. GROWTH.</span>
                <span className={styles.sloganLine2}>MEASURABLE. SUSTAINABLE. DIRECT.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM BAR */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarContent}>
          <span className={styles.copyright}>© 2026 BEYOND REACH. ALL RIGHTS RESERVED.</span>
          <div className={styles.agencySlogan}>
            <span>BUILT FOR PREMIUM HOSPITALITY AND EXPERIENCE-LED BRANDS ACROSS INDIA.</span>
            <div className={styles.agencySloganLine}></div>
          </div>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy" className={styles.legalLink}>PRIVACY POLICY</Link>
            <span className={styles.legalSlash}>/</span>
            <Link href="/terms-conditions" className={styles.legalLink}>TERMS OF SERVICE</Link>
            <span className={styles.legalSlash}>/</span>
            <Link href="/privacy-policy" className={styles.legalLink}>COOKIE POLICY</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
