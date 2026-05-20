import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ViewAudit.module.css';

const ViewAudit = () => {
  const { propname } = useParams();
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/clients/propname/${propname}`);
        if (response.ok) {
          const data = await response.json();
          setAudit(data);
        } else {
          console.error("Failed to fetch audit");
        }
      } catch (error) {
        console.error("Error fetching audit:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, [propname]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', fontSize: '1.5rem' }}>
        Loading Audit...
      </div>
    );
  }

  if (!audit) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b6b', fontSize: '1.5rem' }}>
        Audit Not Found
      </div>
    );
  }

  const sections = [
    {
      title: "A. Google Business Profile",
      problem: "Simply having correct contact info isn't enough anymore.",
      solution: "A profile that lacks regular review replies, updated guest photos, or a direct link to your booking page fails to capture the 70% of travelers who use Google Maps as their main decision tool.",
      metrics: [
        { label: "Profile Active", value: audit.gmb.profileActive },
        { label: "Correct Phone Number", value: audit.gmb.correctPhoneNumber },
        { label: "Website Link Working", value: audit.gmb.websiteLinkWorking },
        { label: "Accurate Address/Pin", value: audit.gmb.accurateAddressPin },
        { label: "Review Rating & Count", value: audit.gmb.reviewRatingAndCount },
        { label: "Owner Responses", value: audit.gmb.ownerResponses },
      ]
    },
    {
      title: "B. Website Experience",
      problem: "Your website should be your highest-earning salesperson, but right now it is losing buyers.",
      solution: "Slow page loading speeds, clunky mobile navigation, or hidden \"Book Now\" buttons create friction. If a traveler finds your website difficult to use, they will instantly leave and book with a competitor.",
      metrics: [
        { label: "Website Active", value: audit.website.active },
        { label: "Mobile-Friendly Design", value: audit.website.mobileFriendly },
        { label: "Direct Booking Engine", value: audit.website.directBookingEngine },
        { label: "Clear Services Page", value: audit.website.clearServicesPage },
        { label: "High-Quality Gallery", value: audit.website.highQualityGallery },
        { label: "Page Loading Speed", value: audit.website.pageLoadSpeed },
      ]
    },
    {
      title: "C. Social Media Engagement",
      problem: "Your current Instagram and Facebook pages are missing out on modern travel trends.",
      solution: "Travelers use social media as a visual brochure to check the \"vibe\" of a resort before booking. Lacking high-quality video content (like Reels) or consistent posting gives the impression that the property is outdated or unmanaged.",
      metrics: [
        { label: "Active Pages", value: audit.socialMedia.activePages },
        { label: "Total Posts", value: audit.socialMedia.totalPosts },
        { label: "Posting Consistency", value: audit.socialMedia.postingConsistency },
        { label: "Post Performance", value: audit.socialMedia.postPerformance },
        { label: "Video/Reels Content", value: audit.socialMedia.videoReelsContent },
        { label: "Branding Score", value: `${audit.socialMedia.brandingScore} / 10` },
      ]
    }
  ];

  const isNegative = (val) => val === 'No' || val === 'Slow' || val === 'Low';

  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className={styles.heroSubtitle}>Online Presence Audit</span>
          <h1 className={styles.heroTitle}>{audit.hotelName}</h1>
          <p className={styles.heroDesc}>
            A comprehensive analysis of your current digital footprint, identifying critical gaps and actionable steps for revenue growth.
          </p>
        </motion.div>
      </section>

      <div className={styles.content}>

        {/* SECTION 1: Metrics Breakdown */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1</span>
              Current Digital Baseline
            </h2>
            <p className={styles.sectionSubtitle}>Your visibility across the channels where guests search.</p>
          </div>

          <div>
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={styles.baselineGrid}
              >
                <div className={styles.baselineContent}>
                  <h3>{section.title}</h3>
                  <div className={styles.problemBox}>
                    <p><strong className={styles.redText}>The Problem:</strong> {section.problem}</p>
                    <p><strong className={styles.greenText}>Where to Improve:</strong> {section.solution}</p>
                  </div>
                </div>
                <div className={styles.metricsGrid}>
                  {section.metrics.map((metric, i) => (
                    <div key={i} className={styles.metricCard}>
                      <span className={styles.metricLabel}>{metric.label}</span>
                      <span className={`${styles.metricValue} ${isNegative(metric.value) ? styles.negative : ''}`}>
                        {metric.value || '-'}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Missing Tracking & Local Ads Sections */}
        <section className={styles.missingTrackingGrid}>
          <div className={styles.missingCard}>
            <h3>D. Tracking & Retargeting Setup</h3>
            <p><strong className={styles.redText}>The Problem:</strong> You are letting highly interested website visitors slip through your fingers.</p>
            <p>Without backend tracking tools (like Meta Pixel or Google Analytics), you have no way of knowing who visited your site. This means you cannot retarget guests who looked at your rooms but left without making a reservation.</p>
          </div>
          <div className={styles.missingCard}>
            <h3>E. Local Ad Visibility</h3>
            <p><strong className={styles.redText}>The Problem:</strong> Your property is currently invisible to travelers actively looking to book in your area right now.</p>
            <p>Without targeted local SEO and strategic digital ads, nearby rival hotels will always sit at the top of search results, essentially stealing active, high-intent traffic directly from you.</p>
          </div>
        </section>

        {/* SECTION 2: Market Insights & Score */}
        <section className={styles.marketSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2</span>
              Market Insights & Growth Forecast
            </h2>
          </div>

          <div className={styles.marketGridTop}>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Your Visibility Score</span>
              <div className={styles.scoreValue}>{audit.onlinePresenceScore.visibilityScore}<span>/100</span></div>
            </div>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Competitor's Score</span>
              <div className={styles.scoreValue}>{audit.onlinePresenceScore.competitorScore}<span>/100</span></div>
            </div>
            <div className={styles.scoreItem}>
              <span className={styles.scoreLabel}>Estimated Lost Revenue</span>
              <div className={styles.scoreValue} style={{ color: '#ff6b6b' }}>{audit.marketInsights.estimatedLostRevenue}</div>
            </div>
          </div>

          <div className={styles.marketGridBottom}>
            <div className={styles.insightCard}>
              <span className={styles.insightLabel}>Monthly Search Volume</span>
              <span className={styles.insightValue}>{audit.marketInsights.monthlySearchVolume}</span>
            </div>
            <div className={styles.insightCard}>
              <span className={styles.insightLabel}>Competition Level</span>
              <span className={styles.insightValue}>{audit.marketInsights.competitionLevel}</span>
            </div>
            <div className={`${styles.insightCard} ${styles.fullWidth}`}>
              <span className={styles.insightLabel}>Scope of Booking Growth</span>
              <span className={`${styles.insightValue} ${styles.accent}`}>{audit.marketInsights.bookingGrowthScope}</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: How Beyond Reach Will Help */}
        <section>
          <div className={styles.sectionHeader} style={{ textAlign: 'center' }}>
            <h2 className={styles.sectionTitle} style={{ justifyContent: 'center' }}>
              <span className={styles.sectionNumber} style={{ backgroundColor: 'var(--accent-color)', color: '#000' }}>3</span>
              How Beyond Reach Will Help
            </h2>
            <p className={styles.sectionSubtitle} style={{ maxWidth: '700px', margin: '0 auto' }}>
              We shift your booking mix away from expensive third-party platforms and redirect travelers to book with you directly.
            </p>
          </div>

          <div className={styles.phaseGrid}>
            <motion.div whileHover={{ y: -5 }} className={styles.phaseCard}>
              <span className={styles.phaseTag}>MONTHS 1–2</span>
              <h3>Phase 1: Foundation Optimization</h3>
              <p>
                We fully optimize your Google Business Profile, fix website loading bugs, clean up your contact links, and ensure your booking button is front and center to immediately capture organic demand.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className={styles.phaseCard}>
              <span className={styles.phaseTag}>MONTHS 3+</span>
              <h3>Phase 2: Targeted Visibility & Paid Ads</h3>
              <p>
                We deploy consistent social media content (Reels/Videos) and launch high-converting local Facebook, Instagram, and Google Ad campaigns within your approved budget to outrank local competitors.
              </p>
            </motion.div>
          </div>

          <div className={styles.roiCard}>
            <h3>The Bottom Line ROI</h3>
            <p>Stop losing 15-25% in heavy commission fees to OTAs. We build the engine to capture direct bookings.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ViewAudit;
