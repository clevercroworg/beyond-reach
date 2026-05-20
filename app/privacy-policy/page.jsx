"use client";
import React from 'react';
import Link from 'next/link';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacySection}>
      {/* Decorative Background Glow */}
      <div className={styles.bgLight}></div>

      <div className={styles.container}>
        {/* Back Button */}
        <Link href="/" className={styles.backBtn}>
          ← BACK TO HOME
        </Link>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>PRIVACY POLICY</h1>
          <span className={styles.lastUpdated}>LAST UPDATED: MAY 2026</span>
        </header>

        {/* Content */}
        <div className={styles.contentBlock}>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>1. OVERVIEW</h2>
            <p className={styles.text}>
              At <span className={styles.highlight}>Beyond Reach</span>, we are committed to safeguarding the privacy of our clients, partners, and visitors. This Privacy Policy details how we collect, process, secure, and share your information when you interact with our website, digital offerings, brand audits, or direct communications channels.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>2. DATA WE COLLECT</h2>
            <p className={styles.text}>
              We collect information that allows us to deliver elite branding, performance marketing, and yield-optimization strategies for modern hospitality brands. This includes:
            </p>
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Identity Details:</span> Full name, title, and organization affiliation.
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Contact Information:</span> Corporate email addresses, business phone numbers, and physical office locations.
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Brand Performance Data:</span> Current website URL, OTA dependencies, estimated booking yields, and growth challenges provided during private briefings.
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.highlight}>Technical Data:</span> IP address, geographic location, browser details, and navigation metrics analyzed via cookies to improve user experience.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. HOW WE USE YOUR INFORMATION</h2>
            <p className={styles.text}>
              Your information is processed under strict confidentiality standards to achieve specific business targets:
            </p>
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>Conducting comprehensive brand audits and direct booking evaluations.</li>
              <li className={styles.bulletItem}>Scheduling private briefings and managing corporate strategy alignments.</li>
              <li className={styles.bulletItem}>Formulating custom search optimization, CRM, and creative marketing campaigns.</li>
              <li className={styles.bulletItem}>Securing communication logs and preventing unauthorized platform access.</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. DATA RETENTION & SECURITY</h2>
            <p className={styles.text}>
              We implement industry-grade electronic and operational security measures to prevent data breaches, alterations, or loss. Your brand briefs and contact details are stored in highly encrypted databases and are only accessible by authorized strategists. We retain your information only as long as necessary to fulfill corporate engagement objectives.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>5. YOUR PRIVACY RIGHTS</h2>
            <p className={styles.text}>
              You retain absolute ownership over your business and personal details. You have the right to request access to your stored files, update outdated metrics, restrict processing permissions, or request complete deletion of your corporate records from our secure data desk.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>6. DIRECT COMMUNICATION</h2>
            <p className={styles.text}>
              For any questions, privacy audits, or details regarding data security, please contact our data desk directly at:
              <br />
              <span className={styles.highlight}>hello@beyondreachagency.com</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
