"use client";
import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden py-24 px-6 md:px-12">
      {/* Decorative Radial Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/lp/hospitality-marketing" 
          className="inline-flex items-center gap-2 text-brand-textSecondary hover:text-brand-accent font-body font-bold text-xs uppercase tracking-[0.1em] mb-12 transition-all duration-300 hover:-translate-x-1"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <header className="border-b border-brand-border/60 pb-8 mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-[0.015em] mb-4 text-white uppercase" style={{ wordSpacing: '0.06em' }}>
            Privacy Policy
          </h1>
          <p className="font-body text-xs tracking-wider text-brand-textSecondary uppercase">
            Last Updated: May 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10 font-body text-brand-textSecondary leading-relaxed text-sm md:text-base">
          
          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              1. Overview
            </h2>
            <p>
              At <span className="text-brand-accent font-medium">Beyond Reach Agency</span>, we are committed to safeguarding the privacy of our clients, partners, and visitors. This Privacy Policy details how we collect, process, secure, and share your information when you interact with our website, digital offerings, brand audits, or direct communications channels.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              2. Data We Collect
            </h2>
            <p>
              We collect information that allows us to deliver elite branding, performance marketing, and yield-optimization strategies for modern hospitality brands. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <span className="text-brand-accent font-medium">Identity Details:</span> Full name, title, and organization affiliation.
              </li>
              <li>
                <span className="text-brand-accent font-medium">Contact Information:</span> Corporate email addresses, business phone numbers, and physical office locations.
              </li>
              <li>
                <span className="text-brand-accent font-medium">Brand Performance Data:</span> Current website URL, OTA dependencies, estimated booking yields, and growth challenges provided during private briefings.
              </li>
              <li>
                <span className="text-brand-accent font-medium">Technical Data:</span> IP address, geographic location, browser details, and navigation metrics analyzed via cookies to improve user experience.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              3. How We Use Your Information
            </h2>
            <p>
              Your information is processed under strict confidentiality standards to achieve specific business targets:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Conducting comprehensive brand audits and direct booking evaluations.</li>
              <li>Scheduling private briefings and managing corporate strategy alignments.</li>
              <li>Formulating custom search optimization, CRM, and creative marketing campaigns.</li>
              <li>Securing communication logs and preventing unauthorized platform access.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              4. Data Retention & Security
            </h2>
            <p>
              We implement industry-grade electronic and operational security measures to prevent data breaches, alterations, or loss. Your brand briefs and contact details are stored in highly encrypted databases and are only accessible by authorized strategists. We retain your information only as long as necessary to fulfill corporate engagement objectives.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              5. Your Privacy Rights
            </h2>
            <p>
              You retain absolute ownership over your business and personal details. You have the right to request access to your stored files, update outdated metrics, restrict processing permissions, or request complete deletion of your corporate records from our secure data desk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-bold text-white tracking-wide uppercase">
              6. Direct Communication
            </h2>
            <p>
              For any questions, privacy audits, or details regarding data security, please contact our data desk directly at:
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
