import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/Client';
import { notFound } from 'next/navigation';
import AnimatedStatusCard from '@/components/AnimatedStatusCard';
import AnimatedScoreBar from '@/components/AnimatedScoreBar';
import AuditBackground from '@/components/AuditBackground';
import AnimatedGauge from '@/components/AnimatedGauge';
import AnimatedChecklist from '@/components/AnimatedChecklist';

export default async function ViewAudit({ params }) {
  const { propname } = params;

  await connectToDatabase();
  const audit = await Client.findOne({ propname }).lean();

  if (!audit) {
    notFound();
  }

  // Calculate Overall Health Score
  let totalMetrics = 0;
  let positiveMetrics = 0;

  const countMetric = (val) => {
    totalMetrics++;
    if (['Yes', 'Fast', 'High'].includes(val)) positiveMetrics++;
  };

  countMetric(audit.gmb?.profileActive);
  countMetric(audit.gmb?.correctPhoneNumber);
  countMetric(audit.gmb?.websiteLinkWorking);
  countMetric(audit.gmb?.accurateAddressPin);
  countMetric(audit.gmb?.ownerResponses);
  countMetric(audit.gmb?.uploadedImages);

  countMetric(audit.website?.active);
  countMetric(audit.website?.mobileFriendly);
  countMetric(audit.website?.directBookingEngine);
  countMetric(audit.website?.clearServicesPage);
  countMetric(audit.website?.highQualityGallery);
  countMetric(audit.website?.basicSEO);
  countMetric(audit.website?.pageLoadSpeed);

  countMetric(audit.socialMedia?.activePages);
  countMetric(audit.socialMedia?.postPerformance);
  countMetric(audit.socialMedia?.videoReelsContent);
  countMetric(audit.socialMedia?.postCreativeQuality);
  // Calculate score directly out of 75 instead of capping it
  const healthScore = totalMetrics > 0 ? Math.round((positiveMetrics / totalMetrics) * 75) : 0;
  const seoScore = Math.min(Math.round(healthScore * 0.35) + 30, 65);
  const lostRevenueINR = ((100 - seoScore) * 15000).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  const gmbWarnings = [];
  const checkGmbWarning = (val, label, warningText) => {
    const valString = String(val || '-');
    const isPositive = ['Yes', 'Fast', 'High'].includes(valString) || /^[0-9]/.test(valString);
    if (!isPositive) {
      gmbWarnings.push({ label, text: warningText });
    }
  };

  checkGmbWarning(audit.gmb?.profileActive, "Profile Active", "Profile status is not up to the mark.");
  checkGmbWarning(audit.gmb?.correctPhoneNumber, "Correct Phone Number", "Phone details need improvement.");
  checkGmbWarning(audit.gmb?.websiteLinkWorking, "Website Link Working", "Website connectivity is not up to the mark.");
  checkGmbWarning(audit.gmb?.accurateAddressPin, "Accurate Address/Pin", "Map pin accuracy needs improvement.");
  checkGmbWarning(audit.gmb?.reviewRatingAndCount, "Review Rating & Count", "Review scores are not up to the mark.");
  checkGmbWarning(audit.gmb?.ownerResponses, "Owner Responses", "Review reply rate needs improvement.");
  checkGmbWarning(audit.gmb?.uploadedImages, "Uploaded Images", "Guest photo variety is not up to the mark.");

  const websiteWarnings = [];
  const checkWebsiteWarning = (val, label, warningText) => {
    const valString = String(val || '-');
    const isPositive = ['Yes', 'Fast', 'High'].includes(valString) || /^[0-9]/.test(valString);
    if (!isPositive) {
      websiteWarnings.push({ label, text: warningText });
    }
  };

  const isWebsiteActive = ['Yes', 'Fast', 'High'].includes(String(audit.website?.active || '-')) || /^[0-9]/.test(String(audit.website?.active || '-'));

  if (!isWebsiteActive) {
    websiteWarnings.push({ label: "Website Active", text: "Your website details not found." });
  } else {
    checkWebsiteWarning(audit.website?.mobileFriendly, "Mobile-Friendly Design", "Mobile optimization needs improvement.");
    checkWebsiteWarning(audit.website?.directBookingEngine, "Direct Booking Engine", "Booking flow setup is not up to the mark.");
    checkWebsiteWarning(audit.website?.clearServicesPage, "Clear Services Page", "Services presentation needs improvement.");
    checkWebsiteWarning(audit.website?.highQualityGallery, "High-Quality Gallery", "Visual gallery quality is not up to the mark.");
    checkWebsiteWarning(audit.website?.pageLoadSpeed, "Page Loading Speed", "Page load performance needs improvement.");
  }

  const socialWarnings = [];
  const checkSocialWarning = (val, label, warningText) => {
    const valString = String(val || '-');
    const isPositive = ['Yes', 'Fast', 'High'].includes(valString) || /^[0-9]/.test(valString);
    if (!isPositive) {
      socialWarnings.push({ label, text: warningText });
    }
  };

  const isSocialActive = ['Yes', 'Fast', 'High'].includes(String(audit.socialMedia?.activePages || '-')) || /^[0-9]/.test(String(audit.socialMedia?.activePages || '-'));

  if (!isSocialActive) {
    socialWarnings.push({ label: "Active Pages", text: "Social media presence needs improvement." });
  } else {
    const totalPostsVal = String(audit.socialMedia?.totalPosts || '-');
    const hasTotalPosts = totalPostsVal !== '-' && totalPostsVal !== '' && !totalPostsVal.toLowerCase().includes('no');
    if (!hasTotalPosts) {
      socialWarnings.push({ label: "Total Posts", text: "Profile content volume needs improvement." });
    }

    checkSocialWarning(audit.socialMedia?.postPerformance, "Post Performance", "Audience engagement rate needs improvement.");
    checkSocialWarning(audit.socialMedia?.videoReelsContent, "Video/Reels Content", "Short-form video layout is not up to the mark.");

    const scoreVal = Number(audit.socialMedia?.brandingScore || 0);
    if (scoreVal < 7) {
      socialWarnings.push({ label: "Branding Score", text: "People need to know your property instantly." });
    }

    checkSocialWarning(audit.socialMedia?.postCreativeQuality, "Post / Creative Quality", "Creative post design is not up to the mark.");
  }

  const sections = [
    {
      title: "Google Business Profile",
      problem: "Simply having correct contact info isn't enough anymore.",
      solution: "A profile that lacks regular review replies, updated guest photos, or a direct link to your booking page fails to capture the 70% of travelers who use Google Maps as their main decision tool.",
      metrics: [
        { label: "Profile Active", value: audit.gmb?.profileActive },
        { label: "Correct Phone Number", value: audit.gmb?.correctPhoneNumber },
        { label: "Website Link Working", value: audit.gmb?.websiteLinkWorking },
        { label: "Accurate Address/Pin", value: audit.gmb?.accurateAddressPin },
        { label: "Review Rating & Count", value: audit.gmb?.reviewRatingAndCount },
        { label: "Owner Responses", value: audit.gmb?.ownerResponses },
        { label: "Uploaded Images", value: audit.gmb?.uploadedImages },
      ]
    },
    {
      title: "Website Experience",
      problem: "Your website should be your highest-earning salesperson, but right now it is losing buyers.",
      solution: "Slow page loading speeds, clunky mobile navigation, or hidden \"Book Now\" buttons create friction. If a traveler finds your website difficult to use, they will instantly leave and book with a competitor.",
      metrics: [
        { label: "Website Active", value: audit.website?.active },
        { label: "Mobile-Friendly Design", value: audit.website?.mobileFriendly },
        { label: "Direct Booking Engine", value: audit.website?.directBookingEngine },
        { label: "Clear Services Page", value: audit.website?.clearServicesPage },
        { label: "High-Quality Gallery", value: audit.website?.highQualityGallery },
        { label: "Page Loading Speed", value: audit.website?.pageLoadSpeed },
      ]
    },
    {
      title: "Social Media Engagement",
      problem: "Your current Instagram and Facebook pages are missing out on modern travel trends.",
      solution: "Travelers use social media as a visual brochure to check the \"vibe\" of a resort before booking. Lacking high-quality video content (like Reels) or consistent posting gives the impression that the property is outdated or unmanaged.",
      metrics: [
        { label: "Active Pages", value: audit.socialMedia?.activePages },
        { label: "Total Posts", value: audit.socialMedia?.totalPosts },
        { label: "Post Performance", value: audit.socialMedia?.postPerformance },
        { label: "Video/Reels Content", value: audit.socialMedia?.videoReelsContent },
        { label: "Branding Score", value: `${audit.socialMedia?.brandingScore} / 10` },
        { label: "Post / Creative Quality", value: audit.socialMedia?.postCreativeQuality },
      ]
    }
  ];

  const formatLink = (url) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
  };

  return (
    <div className="audit-page-wrapper min-h-screen text-[#43524E] selection:bg-[#0284C7]/30 pb-20 relative bg-[#F0F4F1]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        .audit-page-wrapper * {
          font-family: 'Inter', sans-serif !important;
        }
        .audit-page-wrapper h1, 
        .audit-page-wrapper h2, 
        .audit-page-wrapper h3, 
        .audit-page-wrapper h4, 
        .audit-page-wrapper h5, 
        .audit-page-wrapper h6 {
          text-transform: none !important;
          letter-spacing: normal !important;
        }
        /* Custom Light Scrollbar for Audit Page */
        .audit-page-wrapper ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .audit-page-wrapper ::-webkit-scrollbar-track {
          background: transparent; 
          border-radius: 8px;
        }
        .audit-page-wrapper ::-webkit-scrollbar-thumb {
          background: rgba(115, 132, 128, 0.3);
          border-radius: 8px;
        }
        .audit-page-wrapper ::-webkit-scrollbar-thumb:hover {
          background: rgba(115, 132, 128, 0.5); 
        }
      `}} />
      <AuditBackground light={true} customBg="#F0F4F1" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-6 px-6 overflow-hidden border-b border-white/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.5)_0%,_transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center animate-fade-in-up">

          {/* 2. Main AI Audit Heading on Next Line */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#192521] leading-tight whitespace-nowrap">
            Guest Acquisition Audit
          </h1>

          {/* 3. Description Paragraph below that */}
          <p className="text-sm md:text-lg text-[#43524E] max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
            A comprehensive analysis of your current digital footprint, identifying critical gaps and actionable steps for revenue growth.
          </p>

          {/* Card 1: Audited Entity Details, Location, and Score Graph in a single 2-Column Card (Persistent Side-by-Side) */}
          <div className="max-w-4xl mx-auto bg-white/45 backdrop-blur-md rounded-2xl border border-white/60 p-6 md:p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.03)] mb-6 transition-all duration-300 hover:bg-white/50">
            <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">

              {/* Left Column: Details & Location */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#738480] font-bold block mb-1">Audited Entity</span>
                  <span className="text-lg md:text-2xl font-bold text-[#192521] block leading-snug">{audit.hotelName}</span>
                </div>
                {audit.location && (
                  <div>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#738480] font-bold block mb-1">Location</span>
                    <span className="text-sm md:text-lg text-[#43524E] font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-[#0284C7] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {audit.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Column: Score Graph Gauge (Always next to details) */}
              <div className="flex flex-col items-center justify-center border-l border-white/60 pl-4 md:pl-8">
                <AnimatedGauge score={healthScore} light={true} />
              </div>

            </div>
          </div>

          {/* Row 2: Card 3 containing Digital Assets Reviewed */}
          <div className="max-w-4xl mx-auto bg-white/45 backdrop-blur-md rounded-2xl border border-white/60 p-6 md:p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-300 hover:bg-white/50">
            <span className="text-xs uppercase tracking-wider text-[#738480] font-bold block mb-4">Digital Assets Reviewed</span>
            <div className="space-y-3">

              {/* Website Link */}
              <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2 text-sm">
                <span className="font-bold text-[#43524E] w-28 shrink-0">Website:</span>
                {audit.websiteLink ? (
                  <a href={formatLink(audit.websiteLink)} target="_blank" rel="noopener noreferrer" className="text-[#0284C7] hover:text-sky-700 hover:underline font-mono break-all text-[13px] md:text-sm">
                    {audit.websiteLink}
                  </a>
                ) : (
                  <span className="text-red-500 font-semibold text-[13px] md:text-sm animate-pulse">
                    ATTENTION NEEDED - Details not found
                  </span>
                )}
              </div>

              {/* Google Maps Link */}
              <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2 text-sm">
                <span className="font-bold text-[#43524E] w-28 shrink-0">Google Maps:</span>
                {audit.gmbLink ? (
                  <a href={formatLink(audit.gmbLink)} target="_blank" rel="noopener noreferrer" className="text-[#0284C7] hover:text-sky-700 hover:underline font-mono break-all text-[13px] md:text-sm">
                    {audit.gmbLink}
                  </a>
                ) : (
                  <span className="text-red-500 font-semibold text-[13px] md:text-sm animate-pulse">
                    ATTENTION NEEDED - Details not found
                  </span>
                )}
              </div>

              {/* Social Media Link */}
              <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2 text-sm">
                <span className="font-bold text-[#43524E] w-28 shrink-0">Social Media:</span>
                {audit.instagramLink ? (
                  <a href={formatLink(audit.instagramLink)} target="_blank" rel="noopener noreferrer" className="text-[#0284C7] hover:text-sky-700 hover:underline font-mono break-all text-[13px] md:text-sm">
                    {audit.instagramLink}
                  </a>
                ) : (
                  <span className="text-red-500 font-semibold text-[13px] md:text-sm animate-pulse">
                    ATTENTION NEEDED - Details not found
                  </span>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pt-1 pb-6 md:pt-2 md:pb-10 space-y-12 md:space-y-20">

        {/* SECTION 1: Metrics Breakdown & Baseline Card */}
        <section className="bg-white/45 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white/60 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.01)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0284C7]/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-8 flex flex-col gap-1 border-b border-white/60 pb-3">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#192521]">
                Current Digital Baseline
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs md:text-base text-[#43524E] font-medium leading-relaxed">
                  Your visibility across the channels where guests search.
                </p>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-1 rounded-full animate-pulse select-none shrink-0">
                    Explore Metrics ↓
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {sections.map((section, idx) => (
                <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8">

                  {/* Mobile Heading */}
                  <h3 className="text-2xl font-semibold text-[#192521] md:hidden tracking-wide order-1">{section.title}</h3>

                  <div className="md:col-span-5 flex flex-col space-y-4 order-3 md:order-1">
                    {/* Desktop Heading */}
                    <h3 className="text-2xl font-semibold text-[#192521] hidden md:block tracking-wide">{section.title}</h3>

                    {idx === 0 ? (
                      <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)] h-full flex flex-col justify-start">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 mb-5 uppercase tracking-wider self-start">
                          Areas Needs to Improve
                        </span>
                        {gmbWarnings.length > 0 ? (
                          <div className="space-y-4 flex-1">
                            {gmbWarnings.map((warn, wIdx) => (
                              <div key={wIdx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse"></span>
                                <span className="text-sm text-[#43524E] leading-relaxed">{warn.text}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6 text-center flex-1">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mb-3 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <h4 className="text-base font-bold text-[#192521] mb-1">Excellent Performance!</h4>
                            <p className="text-xs text-[#43524E]">All Google Business Profile parameters are completely optimal.</p>
                          </div>
                        )}
                      </div>
                    ) : idx === 1 ? (
                      <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)] h-full flex flex-col justify-start">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 mb-5 uppercase tracking-wider self-start">
                          Areas Needs to Improve
                        </span>
                        {websiteWarnings.length > 0 ? (
                          <div className="space-y-4 flex-1">
                            {websiteWarnings.map((warn, wIdx) => (
                              <div key={wIdx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse"></span>
                                <span className="text-sm text-[#43524E] leading-relaxed">{warn.text}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center flex-1">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mb-3 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <h4 className="text-base font-bold text-[#192521]">Your website is up to date.</h4>
                          </div>
                        )}
                      </div>
                    ) : idx === 2 ? (
                      <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)] h-full flex flex-col justify-start">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 mb-5 uppercase tracking-wider self-start">
                          Areas Needs to Improve
                        </span>
                        {socialWarnings.length > 0 ? (
                          <div className="space-y-4 flex-1">
                            {socialWarnings.map((warn, wIdx) => (
                              <div key={wIdx} className="flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse"></span>
                                <span className="text-sm text-[#43524E] leading-relaxed">{warn.text}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center flex-1">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mb-3 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <h4 className="text-base font-bold text-[#192521]">Your social media is up to date.</h4>
                          </div>
                        )}


                        {/* GOOGLE TRENDS */}
                        {(audit.googleTrends?.seasonVisitor || audit.googleTrends?.nonSeasonSearch) && (
                          <div className="mt-8 pt-6 border-t border-[#192521]/10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20 mb-4 uppercase tracking-wider self-start">
                              Google Search Trends
                            </span>
                            <div className="space-y-4">
                              {audit.googleTrends?.seasonVisitor && (
                                <div>
                                  <span className="text-xs text-[#738480] block mb-1 font-medium uppercase tracking-wider">Season Property Visitor in Location</span>
                                  <span className="text-sm font-semibold text-[#192521] leading-relaxed">{audit.googleTrends.seasonVisitor}</span>
                                </div>
                              )}
                              {audit.googleTrends?.nonSeasonSearch && (
                                <div>
                                  <span className="text-xs text-[#738480] block mb-1 font-medium uppercase tracking-wider">Non-Season Property Search Option</span>
                                  <span className="text-sm font-semibold text-[#192521] leading-relaxed">{audit.googleTrends.nonSeasonSearch}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                        <p className="text-[#43524E] mb-6 leading-relaxed"><strong className="text-red-500 font-medium block mb-1 text-sm uppercase tracking-wider">The Problem</strong> {section.problem}</p>
                        <p className="text-[#43524E] leading-relaxed"><strong className="text-[#0284C7] font-medium block mb-1 text-sm uppercase tracking-wider">Where to Improve</strong> {section.solution}</p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-7 order-2 md:order-2">
                    <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)] h-full">
                      <AnimatedChecklist metrics={section.metrics} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Divider and Sub-cards D & E */}
              <div className="border-t border-white/60 pt-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                    <h3 className="text-2xl font-bold mb-4 text-[#192521]">Tracking & Retargeting Setup</h3>
                    <p className="text-[#43524E] leading-relaxed">
                      Your Google search SEO score is <strong className="text-yellow-500">{seoScore}/100 (moderate)</strong>, meaning visitors are not finding your property when searching for your location. This needs <strong className="text-red-500">immediate attention</strong>.
                    </p>
                  </div>
                  <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col justify-center">
                    <span className="text-sm text-[#738480] block mb-2 font-medium uppercase tracking-wider">Ads Score (Meta/Google ads)</span>
                    <h3 className="text-3xl font-extrabold text-red-500 tracking-tight">LOW</h3>
                  </div>
                </div>

                {/* Inserted High Intent Keywords after Tracking & Retargeting Setup */}
                <div className="bg-white/45 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                  <h3 className="text-xl font-bold mb-6 text-[#192521]">High Intent Keywords</h3>
                  {audit.marketInsights?.highIntentKeywords && audit.marketInsights.highIntentKeywords.length > 0 ? (
                    <div className="overflow-x-auto overflow-y-auto max-h-[320px] pr-2 custom-scrollbar relative">
                      <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-white/80 backdrop-blur-lg z-10">
                          <tr>
                            <th className="pb-3 pt-2 text-sm font-semibold text-[#738480] uppercase tracking-wider border-b border-white/60">Keyword</th>
                            <th className="pb-3 pt-2 text-sm font-semibold text-[#738480] uppercase tracking-wider text-right border-b border-white/60">Search Volume</th>
                          </tr>
                        </thead>
                        <tbody>
                          {audit.marketInsights.highIntentKeywords.map((item, idx) => (
                            <tr key={idx} className="border-b border-white/30 last:border-0">
                              <td className="py-4 text-[#192521] font-medium">{item.keyword || '-'}</td>
                              <td className="py-4 text-[#43524E] text-right font-semibold">{item.searchVolume || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-[#738480] italic text-sm">No high intent keywords found.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: Market Insights & Score */}
        <section className="bg-white/45 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/60 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.01)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-8 flex flex-col gap-2 border-b border-white/60 pb-4">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#192521]">
                Market Insights & Growth Forecast
              </h2>
              <p className="text-xs md:text-base text-[#43524E] font-medium leading-relaxed">
                Growth opportunities and estimated revenue gaps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <AnimatedScoreBar
                score={seoScore}
                max={100}
                label="Your Visibility Score"
                light={true}
              />
              <AnimatedScoreBar
                score={seoScore + 15}
                max={100}
                label="Competitor's Score"
                inverseColors={true}
                light={true}
              />
              <div className="space-y-2">
                <span className="text-[#738480] block text-sm font-medium uppercase tracking-wider">Estimated Lost Revenue</span>
                <div className="text-4xl font-bold text-red-500">52%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/45 backdrop-blur-md p-6 rounded-2xl border border-white/60 md:col-span-2">
                <span className="text-sm text-[#738480] block mb-2 font-medium">Competition Level</span>
                <span className="text-xl text-red-500 font-bold uppercase tracking-wider">HIGH</span>
              </div>

              {/* Inserted Ads Budget Bookings */}
              <div className="bg-white/45 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)] md:col-span-2">
                <h3 className="text-xl font-bold mb-6 text-[#192521]">Ads Budget & Estimated Bookings</h3>
                {audit.marketInsights?.adsBudgetBookings && audit.marketInsights.adsBudgetBookings.length > 0 ? (
                  <div className="overflow-x-auto overflow-y-auto max-h-[320px] pr-2 custom-scrollbar relative">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-white/80 backdrop-blur-lg z-10">
                        <tr>
                          <th className="pb-3 pt-2 text-sm font-semibold text-[#738480] uppercase tracking-wider border-b border-white/60">Ads Budget Required</th>
                          <th className="pb-3 pt-2 text-sm font-semibold text-[#738480] uppercase tracking-wider text-right border-b border-white/60">Estimated Bookings (Monthly)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {audit.marketInsights.adsBudgetBookings.map((item, idx) => (
                          <tr key={idx} className="border-b border-white/30 last:border-0">
                            <td className="py-4 text-[#192521] font-medium">{item.budget ? `₹ ${item.budget}` : '-'}</td>
                            <td className="py-4 text-emerald-600 text-right font-bold">{item.bookings || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-[#738480] italic text-sm">No ads budget projections found.</p>
                )}
              </div>

              <div className="bg-white/45 backdrop-blur-md p-6 rounded-2xl border border-white/60 md:col-span-2">
                <span className="text-sm text-[#738480] block mb-2 font-medium">Scope of Booking Growth</span>
                <span className="text-xl text-emerald-500 font-bold uppercase tracking-wider">POSSIBLE</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
