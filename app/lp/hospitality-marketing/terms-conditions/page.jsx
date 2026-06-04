"use client";
import React from 'react';
import Link from 'next/link';

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden py-24 px-6 md:px-12">
      {/* Decorative Radial Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/lp/hospitality-marketing" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-brand-accent font-body font-bold text-xs uppercase tracking-[0.1em] mb-12 transition-all duration-300 hover:-translate-x-1"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <header className="border-b border-brand-border/60 pb-8 mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-[0.015em] mb-4 text-white uppercase" style={{ wordSpacing: '0.06em' }}>
            General Terms
          </h1>
          <p className="font-body text-xs tracking-wider text-neutral-400 uppercase">
            Last Updated: May 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10 font-body text-neutral-400 leading-relaxed text-sm md:text-base">
          
          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this website, initiating a brand audit, or engaging the services of <span className="text-brand-accent font-medium">Beyond Reach Agency</span>, you agree to be bound by these General Terms and Conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site and our digital offerings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              2. Scope of Services
            </h2>
            <p>
              Beyond Reach Agency provides premium digital marketing, creative storytelling, SEO strategy, direct booking engines, and brand consulting tailored for luxury hospitality properties. Specific deliverables, timelines, and budgets will be outlined in separate mutually executed Statements of Work (SOW) or Service Agreements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              3. Intellectual Property Rights
            </h2>
            <p>
              All intellectual property rights, including but not limited to design concepts, custom software code, cinematic video assets, copywriting, and marketing strategies developed by Beyond Reach Agency remain our proprietary property until all project fees are settled in full:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="text-brand-accent font-medium">Pre-Existing Materials:</span> Any proprietary methodologies, code libraries, or design frameworks owned by us prior to an engagement remain solely ours.
              </li>
              <li>
                <span className="text-brand-accent font-medium">Client Deliverables:</span> Upon receipt of full payment, the client is granted a perpetual, royalty-free, exclusive license (or full ownership transfers as per the individual SOW) to utilize completed deliverables for their specified hotel or resort properties.
              </li>
              <li>
                <span className="text-brand-accent font-medium">Trademarks & Logos:</span> Clients retain full rights to their original logos, brand colors, and identity assets supplied to us for campaign purposes.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              4. Client Obligations & Data Desk
            </h2>
            <p>
              To execute precision marketing campaigns and audits, clients must provide timely access to relevant platforms (such as Google Analytics, Booking Engines, and OTA extranet dashboards). All information provided must be accurate, up to date, and not infringe on third-party rights. We reserve the right to pause campaigns or strategy execution if necessary assets are withheld.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              5. Performance Disclaimer & OTA Limitations
            </h2>
            <p>
              While Beyond Reach Agency architects full-funnel marketing campaigns designed to significantly increase direct booking yields and reduce OTA dependency (with past campaigns averaging a 40% growth), digital performance is influenced by external variables. We do not guarantee specific conversion rates, occupancy metrics, or revenue targets as they are subject to market conditions, seasonal fluctuations, and client operational compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              6. Confidentiality & Non-Disclosure
            </h2>
            <p>
              Both parties agree to treat all business metrics, OTA commission data, strategy roadmaps, and client lists shared during briefings as strictly confidential. Confidential details shall not be disclosed to any third parties without prior written consent, except where required by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              7. Limitation of Liability
            </h2>
            <p>
              In no event shall Beyond Reach Agency, its directors, or its global team be liable for any indirect, incidental, special, or consequential damages (including, without limitation, loss of business data, booking revenue, or digital platform downtime) arising out of the use or inability to use our website or marketing services, even if notified of the possibility of such damages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              8. Amendments
            </h2>
            <p>
              We reserve the right to revise these General Terms at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms. For inquiries regarding legal agreements, please reach out to our legal desk at:
              <br />
              <a 
                href="mailto:hello@beyondreachagency.com" 
                className="text-brand-accent hover:underline font-medium transition-all duration-300"
              >
                hello@beyondreachagency.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
