"use client";
import React from 'react';
import Link from 'next/link';
import styles from './TermsConditions.module.css';

const TermsConditions = () => {
  return (
    <div className={styles.termsSection}>
      {/* Decorative Background Glow */}
      <div className={styles.bgLight}></div>

      <div className={styles.container}>
        {/* Back Button */}
        <Link href="/" className={styles.backBtn}>
          ← BACK TO HOME
        </Link>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>GENERAL TERMS</h1>
          <span className={styles.lastUpdated}>LAST UPDATED: MAY 2026</span>
        </header>

        {/* Content */}
        <div className={styles.contentBlock}>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. ACCEPTANCE OF TERMS</h2>
            <p className={styles.text}>
              By accessing this website, initiating a brand audit, or engaging the services of <span className={styles.highlight}>Beyond Reach</span>, you agree to be bound by these General Terms and Conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site and our digital offerings.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. SCOPE OF SERVICES</h2>
            <p className={styles.text}>
              Beyond Reach provides premium digital marketing, creative storytelling, SEO strategy, direct booking engines, and brand consulting tailored for luxury hospitality properties. Specific deliverables, timelines, and budgets will be outlined in separate mutually executed Statements of Work (SOW) or Service Agreements.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. INTELLECTUAL PROPERTY RIGHTS</h2>
            <p className={styles.text}>
              All intellectual property rights, including but not limited to design concepts, custom software code, cinematic video assets, copywriting, and marketing strategies developed by Beyond Reach remain our proprietary property until all project fees are settled in full:
            </p>
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Pre-Existing Materials:</span> Any proprietary methodologies, code libraries, or design frameworks owned by us prior to an engagement remain solely ours.
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Client Deliverables:</span> Upon receipt of full payment, the client is granted a perpetual, royalty-free, exclusive license (or full ownership transfers as per the individual SOW) to utilize completed deliverables for their specified hotel or resort properties.
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Trademarks & Logos:</span> Clients retain full rights to their original logos, brand colors, and identity assets supplied to us for campaign purposes.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. CLIENT OBLIGATIONS & DATA DESK</h2>
            <p className={styles.text}>
              To execute precision marketing campaigns and audits, clients must provide timely access to relevant platforms (such as Google Analytics, Booking Engines, and OTA extranet dashboards). All information provided must be accurate, up to date, and not infringe on third-party rights. We reserve the right to pause campaigns or strategy execution if necessary assets are withheld.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. PERFORMANCE DISCLAIMER & OTA LIMITATIONS</h2>
            <p className={styles.text}>
              While Beyond Reach architects full-funnel marketing campaigns designed to significantly increase direct booking yields and reduce OTA dependency (with past campaigns averaging a 40% growth), digital performance is influenced by external variables. We do not guarantee specific conversion rates, occupancy metrics, or revenue targets as they are subject to market conditions, seasonal fluctuations, and client operational compliance.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. CONFIDENTIALITY & NON-DISCLOSURE</h2>
            <p className={styles.text}>
              Both parties agree to treat all business metrics, OTA commission data, strategy roadmaps, and client lists shared during briefings as strictly confidential. Confidential details shall not be disclosed to any third parties without prior written consent, except where required by law.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>7. LIMITATION OF LIABILITY</h2>
            <p className={styles.text}>
              In no event shall Beyond Reach, its directors, or its global team be liable for any indirect, incidental, special, or consequential damages (including, without limitation, loss of business data, booking revenue, or digital platform downtime) arising out of the use or inability to use our website or marketing services, even if notified of the possibility of such damages.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>8. AMENDMENTS</h2>
            <p className={styles.text}>
              We reserve the right to revise these General Terms at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms. For inquiries regarding legal agreements, please reach out to our legal desk at:
              <br />
              <span className={styles.highlight}>hello@beyondreachagency.com</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
