import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/Client';
import { notFound } from 'next/navigation';
import AnimatedStatusCard from '@/components/AnimatedStatusCard';
import AnimatedScoreBar from '@/components/AnimatedScoreBar';
import AuditBackground from '@/components/AuditBackground';
import AnimatedGauge from '@/components/AnimatedGauge';

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

  const healthScore = totalMetrics > 0 ? Math.round((positiveMetrics / totalMetrics) * 100) : 0;

  const sections = [
    {
      title: "A. Google Business Profile",
      problem: "Simply having correct contact info isn't enough anymore.",
      solution: "A profile that lacks regular review replies, updated guest photos, or a direct link to your booking page fails to capture the 70% of travelers who use Google Maps as their main decision tool.",
      metrics: [
        { label: "Profile Active", value: audit.gmb?.profileActive },
        { label: "Correct Phone Number", value: audit.gmb?.correctPhoneNumber },
        { label: "Website Link Working", value: audit.gmb?.websiteLinkWorking },
        { label: "Accurate Address/Pin", value: audit.gmb?.accurateAddressPin },
        { label: "Review Rating & Count", value: audit.gmb?.reviewRatingAndCount },
        { label: "Owner Responses", value: audit.gmb?.ownerResponses },
      ]
    },
    {
      title: "B. Website Experience",
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
      title: "C. Social Media Engagement",
      problem: "Your current Instagram and Facebook pages are missing out on modern travel trends.",
      solution: "Travelers use social media as a visual brochure to check the \"vibe\" of a resort before booking. Lacking high-quality video content (like Reels) or consistent posting gives the impression that the property is outdated or unmanaged.",
      metrics: [
        { label: "Active Pages", value: audit.socialMedia?.activePages },
        { label: "Total Posts", value: audit.socialMedia?.totalPosts },
        { label: "Posting Consistency", value: audit.socialMedia?.postingConsistency },
        { label: "Post Performance", value: audit.socialMedia?.postPerformance },
        { label: "Video/Reels Content", value: audit.socialMedia?.videoReelsContent },
        { label: "Branding Score", value: `${audit.socialMedia?.brandingScore} / 10` },
      ]
    }
  ];

  const formatLink = (url) => {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
  };

  return (
    <div className="min-h-screen text-[#4A5551] selection:bg-[#0284C7]/30 pb-20 relative bg-[#F0F4F1]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{
        __html: `
        * {
          font-family: 'Inter', sans-serif !important;
        }
      `}} />
      <AuditBackground light={true} customBg="#F0F4F1" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-6 overflow-hidden border-b border-white/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.5)_0%,_transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center animate-fade-in-up">

          {/* 2. Main AI Audit Heading on Next Line */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1A2421] leading-tight whitespace-nowrap">
            <span className="text-[#0284C7] font-black">AI</span> Audit of Online Presence
          </h1>

          {/* 3. Description Paragraph below that */}
          <p className="text-sm md:text-lg text-[#4A5551] max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
            A comprehensive analysis of your current digital footprint, identifying critical gaps and actionable steps for revenue growth.
          </p>

          {/* Card 1: Audited Entity Details, Location, and Score Graph in a single 2-Column Card (Persistent Side-by-Side) */}
          <div className="max-w-4xl mx-auto bg-white/45 backdrop-blur-md rounded-2xl border border-white/60 p-6 md:p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.03)] mb-6 transition-all duration-300 hover:bg-white/50">
            <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">
              
              {/* Left Column: Details & Location */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#4A5551]/75 font-bold block mb-1">Audited Entity</span>
                  <span className="text-lg md:text-2xl font-bold text-[#1A2421] block leading-snug">{audit.hotelName}</span>
                </div>
                {audit.location && (
                  <div>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#4A5551]/75 font-bold block mb-1">Location</span>
                    <span className="text-sm md:text-lg text-[#4A5551] font-semibold flex items-center gap-1">
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

          {/* Row 2: Card 3 containing Digital Assets Under Review */}
          {(audit.websiteLink || audit.gmbLink || audit.instagramLink) && (
            <div className="max-w-4xl mx-auto bg-white/45 backdrop-blur-md rounded-2xl border border-white/60 p-6 md:p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-300 hover:bg-white/50">
              <span className="text-xs uppercase tracking-wider text-[#4A5551]/75 font-bold block mb-4">Digital Assets Under Review</span>
              <div className="space-y-3">
                {audit.websiteLink && (
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm">
                    <span className="font-bold text-[#4A5551] w-28 shrink-0">Website:</span>
                    <a href={formatLink(audit.websiteLink)} target="_blank" rel="noopener noreferrer" className="text-[#0284C7] hover:text-sky-700 hover:underline font-mono break-all text-[13px] md:text-sm">
                      {audit.websiteLink}
                    </a>
                  </div>
                )}
                {audit.gmbLink && (
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm">
                    <span className="font-bold text-[#4A5551] w-28 shrink-0">Google Maps:</span>
                    <a href={formatLink(audit.gmbLink)} target="_blank" rel="noopener noreferrer" className="text-[#0284C7] hover:text-sky-700 hover:underline font-mono break-all text-[13px] md:text-sm">
                      {audit.gmbLink}
                    </a>
                  </div>
                )}
                {audit.instagramLink && (
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm">
                    <span className="font-bold text-[#4A5551] w-28 shrink-0">Social Media:</span>
                    <a href={formatLink(audit.instagramLink)} target="_blank" rel="noopener noreferrer" className="text-[#0284C7] hover:text-sky-700 hover:underline font-mono break-all text-[13px] md:text-sm">
                      {audit.instagramLink}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-6 md:py-10 space-y-12 md:space-y-20">

        {/* SECTION 1: Metrics Breakdown */}
        <section>
          <div className="mb-8 flex flex-row items-center justify-between gap-4 border-b border-white/60 pb-4">
            <h2 className="text-lg md:text-3xl font-extrabold tracking-tight text-[#1A2421] shrink-0">
              Current Digital Baseline
            </h2>
            <p className="text-[10px] md:text-lg text-[#4A5551] font-medium text-right leading-none">
              Where you stand today across critical booking channels.
            </p>
          </div>

          <div className="space-y-16">
            {sections.map((section, idx) => (
              <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8">
                
                {/* Mobile Heading */}
                <h3 className="text-2xl font-semibold text-[#1A2421] md:hidden tracking-wide order-1">{section.title}</h3>
                
                <div className="md:col-span-5 flex flex-col space-y-4 order-3 md:order-1">
                  {/* Desktop Heading */}
                  <h3 className="text-2xl font-semibold text-[#1A2421] hidden md:block tracking-wide">{section.title}</h3>
                  <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                    <p className="text-[#4A5551] mb-6 leading-relaxed"><strong className="text-red-500 font-medium block mb-1 text-sm uppercase tracking-wider">The Problem</strong> {section.problem}</p>
                    <p className="text-[#4A5551] leading-relaxed"><strong className="text-[#0284C7] font-medium block mb-1 text-sm uppercase tracking-wider">Where to Improve</strong> {section.solution}</p>
                  </div>
                </div>
                
                <div className="md:col-span-7 grid grid-cols-2 gap-4 order-2 md:order-2">
                  {section.metrics.map((metric, i) => (
                    <AnimatedStatusCard key={i} label={metric.label} value={metric.value} index={i} light={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Missing Tracking & Local Ads Sections */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
              <h3 className="text-2xl font-bold mb-4 text-[#1A2421]">D. Tracking & Retargeting Setup</h3>
              <p className="text-[#4A5551] mb-4"><strong className="text-red-500">The Problem:</strong> You are letting highly interested website visitors slip through your fingers.</p>
              <p className="text-[#4A5551] leading-relaxed">Without backend tracking tools (like Meta Pixel or Google Analytics), you have no way of knowing who visited your site. This means you cannot retarget guests who looked at your rooms but left without making a reservation.</p>
            </div>
            <div className="p-8 bg-white/45 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
              <h3 className="text-2xl font-bold mb-4 text-[#1A2421]">E. Local Ad Visibility</h3>
              <p className="text-[#4A5551] mb-4"><strong className="text-red-500">The Problem:</strong> Your property is currently invisible to travelers actively looking to book in your area right now.</p>
              <p className="text-[#4A5551] leading-relaxed">Without targeted local SEO and strategic digital ads, nearby rival hotels will always sit at the top of search results, essentially stealing active, high-intent traffic directly from you.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Market Insights & Score */}
        <section className="bg-white/45 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/60 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.01)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="mb-8 flex flex-row items-center justify-between gap-4 border-b border-white/60 pb-4">
              <h2 className="text-lg md:text-3xl font-extrabold tracking-tight text-[#1A2421] shrink-0">
                Market Insights & Growth Forecast
              </h2>
              <p className="text-[10px] md:text-lg text-[#4A5551] font-medium text-right leading-none">
                Growth opportunities and estimated revenue gaps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <AnimatedScoreBar 
                score={audit.onlinePresenceScore?.visibilityScore} 
                max={100} 
                label="Your Visibility Score" 
                light={true}
              />
              <AnimatedScoreBar 
                score={audit.onlinePresenceScore?.competitorScore} 
                max={100} 
                label="Competitor's Score" 
                inverseColors={true}
                light={true}
              />
              <div className="space-y-2">
                <span className="text-[#4A5551] block text-sm font-medium uppercase tracking-wider">Estimated Lost Revenue</span>
                <div className="text-4xl font-bold text-red-500">{audit.marketInsights?.estimatedLostRevenue}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/30 p-6 rounded-2xl border border-white/60">
                <span className="text-sm text-[#4A5551]/80 block mb-2 font-medium">Monthly Search Volume</span>
                <span className="text-xl text-[#1A2421] font-bold">{audit.marketInsights?.monthlySearchVolume}</span>
              </div>
              <div className="bg-white/30 p-6 rounded-2xl border border-white/60">
                <span className="text-sm text-[#4A5551]/80 block mb-2 font-medium">Competition Level</span>
                <span className="text-xl text-[#1A2421] font-bold">{audit.marketInsights?.competitionLevel}</span>
              </div>
              <div className="bg-white/30 p-6 rounded-2xl border border-white/60 md:col-span-2">
                <span className="text-sm text-[#4A5551]/80 block mb-2 font-medium">Scope of Booking Growth</span>
                <span className="text-xl text-[#0284C7] font-bold">{audit.marketInsights?.bookingGrowthScope}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: How Beyond Reach Will Help */}
        <section className="border-t border-white/60 pt-20">
          <div className="mb-8 flex flex-row items-center justify-between gap-4 border-b border-white/60 pb-4">
            <h2 className="text-lg md:text-3xl font-extrabold tracking-tight text-[#1A2421] shrink-0">
              How Beyond Reach Will Help
            </h2>
            <p className="text-[10px] md:text-lg text-[#4A5551] font-medium text-right leading-none max-w-xs md:max-w-xl truncate md:overflow-visible">
              Our strategy to redirect expensive commission fees back into pure direct profit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/45 backdrop-blur-md p-8 rounded-3xl border border-white/60 hover:bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300">
              <div className="text-[#0F3A30] font-mono text-sm mb-4 font-semibold tracking-wider">MONTHS 1–2</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1A2421]">Phase 1: Foundation Optimization</h3>
              <p className="text-[#4A5551] leading-relaxed">
                We fully optimize your Google Business Profile, fix website loading bugs, clean up your contact links, and ensure your booking button is front and center to immediately capture organic demand.
              </p>
            </div>

            <div className="bg-white/45 backdrop-blur-md p-8 rounded-3xl border border-white/60 hover:bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300">
              <div className="text-[#0F3A30] font-mono text-sm mb-4 font-semibold tracking-wider">MONTHS 3+</div>
              <h3 className="text-2xl font-bold mb-4 text-[#1A2421]">Phase 2: Targeted Visibility & Paid Ads</h3>
              <p className="text-[#4A5551] leading-relaxed">
                We deploy consistent social media content (Reels/Videos) and launch high-converting local Facebook, Instagram, and Google Ad campaigns within your approved budget to outrank local competitors.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white/45 backdrop-blur-md border border-white/60 p-8 rounded-3xl text-center shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
            <h3 className="text-2xl font-bold text-[#1A2421] mb-2">The Bottom Line ROI</h3>
            <p className="text-[#0F3A30] text-lg font-medium leading-relaxed">Stop losing 15-25% in heavy commission fees to OTAs. We build the engine to capture direct bookings.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
