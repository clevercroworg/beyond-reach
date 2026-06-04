"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import styles from './WorkDetail.module.css';

// Custom inline SVG icons
const TrendingIcon = () => (
  <svg className={styles.growthIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const AwardIcon = () => (
  <svg className={styles.growthIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const projectDetails = {
  "the-grand-escape": {
    title: "THE GRAND ESCAPE",
    client: "RIVA BEACH RESORT",
    category: "BRANDING · WEBSITE · SEO",
    overview: "Designed and deployed a modern brand positioning strategy, premium visual identity, and a commission-free direct booking engine for Riva Beach Resort. By optimizing guest user journeys, page load speeds, and implementing rate parity comparison widgets, we established a resilient direct booking pipeline.",
    propertyType: "Luxury Beachfront Resort",
    location: "Mandrem, Goa, India",
    rooms: "85 Keys (Villas, Cottages & Suites)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3841.5165997637153!2d73.7144883!3d15.6705607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbbef2ec258e725%3A0xe54efc1cd3471018!2sRiva%20Beach%20Resort!5e0!3m2!1sen!2sin!4v1717482329384!5m2!1sen!2sin",
    services: [
      "Brand Identity & Art Direction",
      "Bespoke Responsive Website Design",
      "Direct Booking Engine Integration",
      "Technical & Local SEO Implementation"
    ],
    deliverables: [
      "Engineered rate parity synchronization modules, eliminating direct-booking pricing friction.",
      "Decreased core page load speeds down to 1.4 seconds, reducing visitor bounce rates.",
      "Ranked top-of-page organically for primary location-based destination queries.",
      "Sustained 45% increase in commission-free room bookings over consecutive quarters."
    ],
    duration: "4 Months",
    year: "2025",
    primaryValue: "45%",
    primaryLabel: "Direct Bookings Growth",
    outcomes: [
      { value: "₹7.78 Cr", label: "Consolidated Revenue" },
      { value: "8,640", label: "Direct Bookings Driven" }
    ],
    chartData: [
      { name: "Direct Bookings", value: 45, color: "#d1ff36" },
      { name: "OTA Portals", value: 50, color: "#00f0ff" },
      { name: "Offline Groups", value: 5, color: "#ff007a" }
    ],
    chartTrend: [
      { label: "Month 1", value: 120 },
      { label: "Month 2", value: 190 },
      { label: "Month 3", value: 280 },
      { label: "Month 4", value: 430 },
      { label: "Month 5", value: 610 },
      { label: "Month 6", value: 840 }
    ],
    trendLabel: "Monthly Booking Volume"
  },
  "oceanic-voyages": {
    title: "OCEANIC VOYAGES",
    client: "AZURE CHARTERS",
    category: "CAMPAIGN · CONTENT",
    overview: "Formulated highly targeted digital media campaigns and cinematic drone videography assets to capture high-net-worth travelers looking for luxury yacht charters. Combined descriptive creative narratives with structured ad funnels to drive conversion rates.",
    propertyType: "Private Yacht Fleet",
    location: "Gateway of India, Mumbai, India",
    rooms: "5 Custom-Built Cruising Yachts",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.218579471168!2d72.832047!3d18.9219894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c06fffffff%3A0xf64fde2e84c98f98!2sGateway%20Of%20India%20Mumbai!5e0!3m2!1sen!2sin!4v1717482590234!5m2!1sen!2sin",
    services: [
      "Cinematic Video Production",
      "Social-First Content Curation",
      "Google Search & Meta Ad Strategy",
      "High-Intent Retargeting Funnels"
    ],
    deliverables: [
      "Produced cinematic promotional reel generating over 5 million collective views.",
      "Optimized target cost-per-lead (CPL) by 32% using custom lookalike models.",
      "Launched direct social DM reservation channels, securing immediate inquiries.",
      "Delivered a sustained 5.2x return on ad spend (ROAS) during peak charter seasons."
    ],
    duration: "3 Months",
    year: "2025",
    primaryValue: "60%",
    primaryLabel: "Paid Search Share",
    outcomes: [
      { value: "5.2x", label: "Campaign ROAS" },
      { value: "10M+", label: "Ad Impressions" }
    ],
    chartData: [
      { name: "Search Ads Share", value: 60, color: "#d1ff36" },
      { name: "Social Ads Share", value: 30, color: "#00f0ff" },
      { name: "Organic Referrals", value: 10, color: "#ff007a" }
    ],
    chartTrend: [
      { label: "Week 1", value: 2.1 },
      { label: "Week 2", value: 3.4 },
      { label: "Week 3", value: 4.2 },
      { label: "Week 4", value: 5.2 }
    ],
    trendLabel: "Return on Ad Spend (ROAS)"
  },
  "zen-wellness": {
    title: "ZEN WELLNESS",
    client: "VITALITY SPA",
    category: "BRANDING · DIGITAL",
    overview: "Created a tranquil, visual-first online brand presence and guest reservation interface for a luxury spa and wellness sanctuary. Focused on capturing the serene environment through micro-interactions and experiential typography.",
    propertyType: "Luxury Ayurvedic Sanctuary",
    location: "Tapovan, Rishikesh, Uttarakhand, India",
    rooms: "18 Ayurvedic Treatment Suites",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13778.601550993079!2d78.3075253!3d30.1328005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909163be607ef35%3A0xe54df97b79d20c5d!2sTapovan%2C%20Rishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1717482810234!5m2!1sen!2sin",
    services: [
      "Calming Visual Brand Strategy",
      "Custom Spa Reservation Flow",
      "Local Map Visibility Optimization",
      "Reputation Management & Review Loops"
    ],
    deliverables: [
      "Redesigned the booking path, reducing treatment booking steps from 6 down to 2.",
      "Increased local Google Maps visibility, driving 4x organic spa walk-in traffic.",
      "Automated post-service review collection loops, boosting rating status to 4.9 stars.",
      "Scaled seasonal gift card sales by 75% via organic email newsletter campaigns."
    ],
    duration: "5 Months",
    year: "2025",
    primaryValue: "55%",
    primaryLabel: "Organic Map Traffic",
    outcomes: [
      { value: "+190%", label: "Enquiry Growth" },
      { value: "60%", label: "Direct Spa Bookings" }
    ],
    chartData: [
      { name: "Organic Map Traffic", value: 55, color: "#d1ff36" },
      { name: "Direct Bookings", value: 35, color: "#00f0ff" },
      { name: "OTA Portals", value: 10, color: "#ff007a" }
    ],
    chartTrend: [
      { label: "Month 1", value: 40 },
      { label: "Month 2", value: 85 },
      { label: "Month 3", value: 130 },
      { label: "Month 4", value: 190 }
    ],
    trendLabel: "Monthly Booking Inquiries"
  },
  "alpine-peaks": {
    title: "ALPINE PEAKS",
    client: "NORDIC STAYS",
    category: "WEBSITE · SEO · ADS",
    overview: "Developed a comprehensive digital marketing strategy and high-fidelity reservation platform for a luxury mountain resort. Utilized Google Performance Max campaigns paired with landing page tests to scale direct occupancy during winter seasons.",
    propertyType: "Mountain Boutique Chalets",
    location: "Gulmarg, Jammu and Kashmir, India",
    rooms: "32 Heated Mountain Chalets",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13264.4443909761895!2d74.3789476!3d34.0505187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1a129037be38d%3A0xa1be6c2b1e15b678!2sGulmarg%20Gondola!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    services: [
      "Next.js High-Performance Website",
      "Google Performance Max Management",
      "Off-Season Direct Email Marketing",
      "UX/UI Booking Friction Audits"
    ],
    deliverables: [
      "Engineered responsive booking interface decreasing cart abandonment by 40%.",
      "Ranked #1 for regional winter-sports luxury lodging keywords.",
      "Implemented automated CRM email drips targeting past guest profiles.",
      "Secured a 38% increase in direct off-season package reservations."
    ],
    duration: "6 Months",
    year: "2024",
    primaryValue: "38%",
    primaryLabel: "Direct Website Bookings",
    outcomes: [
      { value: "38%", label: "Direct Booking Rate" },
      { value: "-40%", label: "Cart Abandonment" }
    ],
    chartData: [
      { name: "Direct Website", value: 38, color: "#d1ff36" },
      { name: "Paid Ads", value: 42, color: "#00f0ff" },
      { name: "Third Party OTAs", value: 20, color: "#ff007a" }
    ],
    chartTrend: [
      { label: "Month 1", value: 15 },
      { label: "Month 2", value: 28 },
      { label: "Month 3", value: 32 },
      { label: "Month 4", value: 38 }
    ],
    trendLabel: "Direct Booking Share %"
  },
  "nocturnal-events": {
    title: "NOCTURNAL EVENTS",
    client: "LUMIERE NIGHTS",
    category: "CONTENT · SOCIAL",
    overview: "Produced visual-first social media content strategies and cinematic motion designs for an exclusive nightlife brand and event venue. Designed virtual ticket-booking flows and local influencer campaigns to drive ticket velocity.",
    propertyType: "Exclusive Club & Concert Hall",
    location: "Indiranagar, Bangalore, Karnataka, India",
    rooms: "1,500 Guest Maximum Capacity",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0261179612347!2d77.6385419!3d12.9701194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13ef9f61b0c7%3A0xcdcbefdf07dbf0a0!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    services: [
      "Viral Video & Reels Production",
      "Experiential Event Branding",
      "Dynamic Social Ticket Funnels",
      "Local Influencer Partnership Sourcing"
    ],
    deliverables: [
      "Crafted promotional campaigns resulting in 2.5x growth in profile engagement.",
      "Sold out launch ticket allocations across eight consecutive weekly events.",
      "Built community channels with direct event updates, retaining loyal visitors.",
      "Drove local search brand volume by 300% within the initial 90 days."
    ],
    duration: "2 Months",
    year: "2025",
    primaryValue: "65%",
    primaryLabel: "Social Reels Reach",
    outcomes: [
      { value: "2.5x", label: "Engagement Growth" },
      { value: "+300%", label: "Search Volume Growth" }
    ],
    chartData: [
      { name: "Social Reels Views", value: 65, color: "#d1ff36" },
      { name: "Referral Networks", value: 25, color: "#00f0ff" },
      { name: "Performance Ads", value: 10, color: "#ff007a" }
    ],
    chartTrend: [
      { label: "Week 1", value: 80 },
      { label: "Week 2", value: 120 },
      { label: "Week 3", value: 180 },
      { label: "Week 4", value: 250 },
      { label: "Week 5", value: 300 }
    ],
    trendLabel: "Search Brand Vol Growth %"
  },
  "urban-sanctuary": {
    title: "URBAN SANCTUARY",
    client: "THE METRO HOTEL",
    category: "STRATEGY · BOOKING",
    overview: "Refined the revenue management strategy and direct customer booking funnels for a high-end corporate boutique hotel. Integrated clean analytical dashboards to track client acquisition cost and optimize daily room rates.",
    propertyType: "Premium Corporate Boutique Hotel",
    location: "Connaught Place, New Delhi, India",
    rooms: "112 Executive Rooms & Suites",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996574937783!2d77.2182743!3d28.6298516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b6b15119%3A0x401f825e6834ff44!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    services: [
      "ADR & RevPAR Revenue Strategy",
      "Direct Booking Funnel Revamp",
      "Custom Sales Dashboard Integrations",
      "Corporate Guest Loyalty Modules"
    ],
    deliverables: [
      "Decreased commission payouts to third-party OTA sites by 50%.",
      "Optimized average daily rate (ADR) leading to an 18% growth in RevPAR.",
      "Consolidated multi-channel tracking into a single unified sales dashboard.",
      "Launched corporate partner signup portals, securing repeat bookings."
    ],
    duration: "5 Months",
    year: "2024",
    primaryValue: "50%",
    primaryLabel: "Direct Corporate Sales",
    outcomes: [
      { value: "-50%", label: "OTA Reliance Drop" },
      { value: "+18%", label: "RevPAR Growth" }
    ],
    chartData: [
      { name: "Direct Corporate", value: 50, color: "#d1ff36" },
      { name: "OTA Distribution", value: 45, color: "#00f0ff" },
      { name: "Offline Sales", value: 5, color: "#ff007a" }
    ],
    chartTrend: [
      { label: "Month 1", value: 5 },
      { label: "Month 2", value: 8 },
      { label: "Month 3", value: 11 },
      { label: "Month 4", value: 14 },
      { label: "Month 5", value: 18 }
    ],
    trendLabel: "RevPAR Growth %"
  }
};

const projectAssets = {
  "the-grand-escape": {
    bgImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    reels: [
      "/case-studies/assets/amanzoe-mobile.mp4",
      "/case-studies/assets/ahilya-fort-mobile.mp4",
      "/case-studies/assets/the-zuri-white-sands.mp4"
    ]
  },
  "oceanic-voyages": {
    bgImage: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    reels: [
      "/projects/sailo-club.mp4",
      "/projects/yacht-club-india.mp4",
      "/projects/navigate.mp4"
    ]
  },
  "zen-wellness": {
    bgImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    reels: [
      "/case-studies/assets/anopura-jaipur-mobile.mp4",
      "/case-studies/assets/chembarathi-wayanad-mobile.mp4",
      "/case-studies/assets/amanzoe-mobile.mp4"
    ]
  },
  "alpine-peaks": {
    bgImage: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    reels: [
      "/case-studies/assets/venue-1-compressed.mp4",
      "/case-studies/assets/bangaram-island-resort-mobile.mp4",
      "/case-studies/assets/ahilya-fort-mobile.mp4"
    ]
  },
  "nocturnal-events": {
    bgImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    reels: [
      "/projects/ashtitva.mp4",
      "/case-studies/assets/venue-1-compressed.mp4",
      "/projects/sailo-club.mp4"
    ]
  },
  "urban-sanctuary": {
    bgImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    reels: [
      "/case-studies/assets/the-zuri-white-sands.mp4",
      "/case-studies/assets/amanzoe-mobile.mp4",
      "/case-studies/assets/chembarathi-wayanad-mobile.mp4"
    ]
  }
};

// Adaptive color mapping helper for white charts cards
const adaptiveColorMap = {
  "#d1ff36": "#84cc16", // Lime mapped to rich lime green
  "#00f0ff": "#0284c7", // Cyan mapped to electric sky blue
  "#ff007a": "#db2777"  // Pink mapped to deep pink
};

// Custom SVG Growth Line Chart Component (Adaptive on White Background)
const GrowthLineChart = ({ data, trendLabel }) => {
  if (!data || data.length === 0) return null;

  const width = 500;
  const height = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map(d => d.value);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values) * 0.75; // Baseline below min
  const valueRange = maxVal - minVal || 1;

  // Generate coordinates
  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.value - minVal) / valueRange) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  // Smooth bezier curve path
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cpX1 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
      const cpY1 = points[i-1].y;
      const cpX2 = points[i-1].x + (points[i].x - points[i-1].x) / 2;
      const cpY2 = points[i].y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`;
    }
  }

  // Gradient area fill path (teal/green overlay)
  const areaD = pathD ? `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z` : "";

  return (
    <div className={styles.chartBlock}>
      <h3 className={styles.chartBlockTitle}>{trendLabel}</h3>
      <div className={styles.chartContainer}>
        <svg viewBox={`0 0 ${width} ${height}`} className={styles.chartSvg}>
          <defs>
            <linearGradient id="glowAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84cc16" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#84cc16" stopOpacity="0.00" />
            </linearGradient>
            <filter id="neonStrokeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#84cc16" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Grid lines (Adaptive dark gray) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingTop + chartHeight * ratio;
            return (
              <line
                key={idx}
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="rgba(0, 0, 0, 0.08)"
                strokeWidth="1"
              />
            );
          })}

          {/* Fill path */}
          {areaD && <path d={areaD} fill="url(#glowAreaGradient)" />}

          {/* Stroke path (Adaptive lime green) */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#84cc16"
              strokeWidth="3.5"
              filter="url(#neonStrokeGlow)"
              strokeLinecap="round"
            />
          )}

          {/* Hover points & labels */}
          {points.map((p, idx) => (
            <g key={idx} className={styles.chartPointGroup}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#ffffff"
                stroke="#84cc16"
                strokeWidth="2.5"
              />
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                className={styles.chartPointLabel}
              >
                {p.value}
              </text>
            </g>
          ))}

          {/* X Axis Labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={height - paddingBottom + 20}
              textAnchor="middle"
              className={styles.chartAxisLabel}
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

// High contrast share meters block (Adaptive colors)
const BookingShareMeters = ({ chartData }) => {
  if (!chartData || chartData.length === 0) return null;
  return (
    <div className={styles.shareMetersBlock}>
      <h3 className={styles.chartBlockTitle}>Channel Distribution</h3>
      <div className={styles.metersList}>
        {chartData.map((item, idx) => {
          const displayColor = adaptiveColorMap[item.color] || item.color;
          return (
            <div key={idx} className={styles.meterRow}>
              <div className={styles.meterHeader}>
                <span className={styles.meterNameGroup}>
                  <span className={styles.meterDot} style={{ backgroundColor: displayColor }} />
                  <span className={styles.meterName}>{item.name}</span>
                </span>
                <span className={styles.meterPercentage} style={{ color: displayColor }}>{item.value}%</span>
              </div>
              <div className={styles.meterTrack}>
                <div
                  className={styles.meterFill}
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: displayColor,
                    boxShadow: `0 0 8px ${displayColor}55`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function WorkDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const containerRef = useRef(null);

  const project = projectDetails[id];
  const assets = projectAssets[id];

  useEffect(() => {
    if (!project) {
      router.push('/work');
      return;
    }

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(`.${styles.backBtn}`, { x: 10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(`.${styles.categoryBadge}`, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo(`.${styles.projectTitle}`, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }, '-=0.4')
        .fromTo(`.${styles.featuredCardFrame}`, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo(`.${styles.badgeBar}`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo(`.${styles.propertyVitalsGrid} > *`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.5')
        .fromTo(`.${styles.overviewGrid} > *`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out' }, '-=0.6')
        .fromTo(`.${styles.analyticsSection}`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
        .fromTo(`.${styles.reelsGrid} > *`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.6')
        .fromTo(`.${styles.deliverablesSection} > *`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.7')
        .fromTo(`.${styles.mapSection}`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8');
    }, containerRef);

    return () => ctx.revert();
  }, [project, router]);

  if (!project) return null;

  return (
    <main className={styles.pageContainer} ref={containerRef}>
      <div className={styles.bgGlow} />
      <div className={styles.bgGlow2} />

      {/* 1. Cinematic Banner Header with Background Image & Floating Mockup */}
      <header className={styles.cinemaHeader}>
        <div className={styles.headerBgWrapper}>
          <img src={assets?.bgImage} alt="" className={styles.headerBgImg} />
          <div className={styles.headerBgOverlay} />
        </div>

        <div className={styles.headerContentGrid}>
          <div className={styles.headerLeftCol}>
            <Link href="/work" className={styles.backBtn}>
              ← Back to Work
            </Link>
            <div className={styles.headerMetaRow}>
              <span className={styles.categoryBadge}>{project.category}</span>
              <span className={styles.metaYear}>{project.year}</span>
            </div>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <div className={styles.clientTagLine}>
              <span className={styles.clientLabel}>CLIENT:</span>
              <span className={styles.clientValue}>{project.client}</span>
            </div>
          </div>

          <div className={styles.headerRightCol}>
            <div className={styles.featuredCardFrame}>
              <img src={assets?.heroImage} alt={project.title} className={styles.featuredCardImg} />
              <div className={styles.featuredCardOverlay} />
            </div>
          </div>
        </div>
      </header>

      <div className={styles.innerContent}>
        {/* 2. What We Did Badge Bar */}
        <div className={styles.badgeBar}>
          <span className={styles.badgeBarLabel}>WHAT WE DID:</span>
          <div className={styles.badgeList}>
            {project.category.split('·').map((cat, idx) => (
              <span key={idx} className={styles.projectTypeBadge}>
                {cat.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Property Details Horizontal Vitals Grid */}
        <div className={styles.propertyVitalsGrid}>
          <div className={styles.propertyVitalCard}>
            <div className={styles.propertyVitalIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" className={styles.pIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className={styles.propertyVitalText}>
              <span className={styles.propertyVitalLabel}>Location</span>
              <span className={styles.propertyVitalValue}>{project.location}</span>
            </div>
          </div>

          <div className={styles.propertyVitalCard}>
            <div className={styles.propertyVitalIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" className={styles.pIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className={styles.propertyVitalText}>
              <span className={styles.propertyVitalLabel}>Property Type</span>
              <span className={styles.propertyVitalValue}>{project.propertyType}</span>
            </div>
          </div>

          <div className={styles.propertyVitalCard}>
            <div className={styles.propertyVitalIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" className={styles.pIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className={styles.propertyVitalText}>
              <span className={styles.propertyVitalLabel}>Keys / Capacity</span>
              <span className={styles.propertyVitalValue}>{project.rooms}</span>
            </div>
          </div>
        </div>

        {/* 4. Project Overview and Impact Metric */}
        <section className={styles.overviewSection}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewTextCol}>
              <span className={styles.sectionLabel}>The Challenge & Blueprint</span>
              <h2 className={styles.overviewTitle}>Project Overview</h2>
              <p className={styles.overviewText}>{project.overview}</p>
            </div>

            <div className={styles.overviewImpactCol}>
              <div className={styles.impactMetricCard}>
                <span className={styles.impactLabel}>PRIMARY IMPACT</span>
                <div className={styles.impactValueGroup}>
                  <span className={styles.impactValue}>{project.primaryValue}</span>
                  <svg className={styles.impactArrow} fill="none" viewBox="0 0 24 24" stroke="var(--accent-color)" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
                <span className={styles.impactDesc}>{project.primaryLabel}</span>

                <div className={styles.metaDuo}>
                  <div className={styles.metaDuoBlock}>
                    <span className={styles.metaDuoLabel}>DURATION</span>
                    <span className={styles.metaDuoVal}>{project.duration}</span>
                  </div>
                  <div className={styles.metaDuoBlock}>
                    <span className={styles.metaDuoLabel}>YEAR</span>
                    <span className={styles.metaDuoVal}>{project.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* 5. Stats & Charts Dashboard Section (Results) - ABOVE VIDEO */}
        <section className={styles.analyticsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel} style={{ color: '#0284c7' }}>Growth Vitals</span>
            <h2 className={styles.sectionTitle}>Performance Analytics</h2>
          </div>

          <div className={styles.analyticsGrid}>
            {/* Custom SVG Line Chart */}
            <GrowthLineChart data={project.chartTrend} trendLabel={project.trendLabel} />

            {/* Custom Segmented Share Meters */}
            <BookingShareMeters chartData={project.chartData} />

            {/* Growth Outcome Vitals */}
            <div className={styles.growthBlock}>
              <div className={styles.growthCard}>
                <div className={styles.growthIconWrapper}>
                  <TrendingIcon />
                </div>
                <div className={styles.growthInfo}>
                  <div className={styles.growthValue}>{project.outcomes[0].value}</div>
                  <div className={styles.growthLabel}>{project.outcomes[0].label}</div>
                </div>
              </div>

              <div className={styles.growthCard}>
                <div className={styles.growthIconWrapper}>
                  <AwardIcon />
                </div>
                <div className={styles.growthInfo}>
                  <div className={styles.growthValue}>{project.outcomes[1].value}</div>
                  <div className={styles.growthLabel}>{project.outcomes[1].label}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* 6. Reels Section (3 Vertical Mobile Mockup Videos) - BELOW RESULTS */}
        <section className={styles.reelsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Creative Capture</span>
            <h2 className={styles.sectionTitle}>Digital Reels Showcase</h2>
          </div>

          <div className={styles.reelsGrid}>
            {assets?.reels?.map((reelUrl, idx) => (
              <div key={idx} className={styles.reelCardWrapper}>
                <div className={styles.phoneBezel}>
                  <div className={styles.phoneSpeaker} />
                  <div className={styles.phoneScreen}>
                    <video
                      className={styles.reelVideo}
                      src={reelUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className={styles.reelOverlay} />
                  </div>
                </div>
                <div className={styles.reelLabel}>INTERFACE PREVIEW {idx + 1}</div>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* 7. What We Worked On (Services & Deliverables) */}
        <section className={styles.deliverablesSection}>
          <div className={styles.deliverablesGrid}>
            <div>
              <span className={styles.sectionLabel}>The Implementation</span>
              <h2 className={styles.overviewTitle} style={{ marginBottom: '2rem' }}>
                Key Deliverables & Milestones
              </h2>
              <div className={styles.deliverablesList}>
                {project.deliverables.map((item, index) => (
                  <div key={index} className={styles.deliverableItem}>
                    <div className={styles.numberCircle}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className={styles.deliverableText}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Technologies & Deployed Services Checklist */}
            <div className={styles.techPanel}>
              <h3 className={styles.techTitle}>Services Deployed</h3>
              <div className={styles.techList}>
                {project.services.map((service, idx) => (
                  <div key={idx} className={styles.techItem}>
                    <span className={styles.techBullet} />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        {/* 8. Interactive Location Map Section */}
        <section className={styles.mapSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Real World Presence</span>
            <h2 className={styles.sectionTitle}>Project Location</h2>
          </div>
          <div className={styles.mapFrameWrapper}>
            <iframe
              src={project.mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.mapIframe}
              title={`Google Maps Location for ${project.title}`}
            />
            <div className={styles.mapGlowOverlay} />
          </div>
        </section>
      </div>
    </main>
  );
}
