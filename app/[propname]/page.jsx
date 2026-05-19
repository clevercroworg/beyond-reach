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
    <div className="min-h-screen text-white font-sans selection:bg-[#d1ff36]/30 pb-20 relative">
      <AuditBackground />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 md:pb-16 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#112a1b_0%,_#0a0e0b_70%)]"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center animate-fade-in-up">
          <span className="text-[#d1ff36] font-semibold tracking-wider uppercase text-sm mb-4 block">Online Presence Audit</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-4">{audit.hotelName}</h1>
          
          {audit.location && (
            <p className="text-lg text-neutral-300 mb-6 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-[#d1ff36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {audit.location}
            </p>
          )}

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8">
            A comprehensive analysis of your current digital footprint, identifying critical gaps and actionable steps for revenue growth.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-6 md:py-10 space-y-12 md:space-y-20">
        
        {/* Overall Health Score Graph */}
        <section className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 relative z-20 shadow-2xl overflow-hidden -mt-16 md:-mt-28 flex flex-col items-center justify-center">
           <AnimatedGauge score={healthScore} />
           
           {(audit.websiteLink || audit.gmbLink || audit.instagramLink) && (
             <div className="flex flex-wrap justify-center gap-4 mt-2 relative z-20">
               {audit.websiteLink && (
                 <a href={formatLink(audit.websiteLink)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#d1ff36]/30 transition-all text-sm font-medium">
                   <svg className="w-4 h-4 text-[#d1ff36]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                   Website
                 </a>
               )}
               {audit.gmbLink && (
                 <a href={formatLink(audit.gmbLink)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#d1ff36]/30 transition-all text-sm font-medium">
                   <svg className="w-4 h-4 text-[#d1ff36]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                   Google Maps
                 </a>
               )}
               {audit.instagramLink && (
                 <a href={formatLink(audit.instagramLink)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#d1ff36]/30 transition-all text-sm font-medium">
                   <svg className="w-4 h-4 text-[#d1ff36]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                   Social Media
                 </a>
               )}
             </div>
           )}
        </section>

        {/* SECTION 1: Metrics Breakdown */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#d1ff36]/20 text-[#d1ff36] flex items-center justify-center text-sm">1</span>
              Current Digital Baseline
            </h2>
            <p className="text-neutral-400 text-lg">Where you stand today across critical booking channels.</p>
          </div>

          <div className="space-y-16">
            {sections.map((section, idx) => (
              <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8">
                
                {/* Mobile Heading */}
                <h3 className="text-2xl font-semibold text-white md:hidden tracking-wide order-1">{section.title}</h3>
                
                <div className="md:col-span-5 flex flex-col space-y-4 order-3 md:order-1">
                  {/* Desktop Heading */}
                  <h3 className="text-2xl font-semibold text-white hidden md:block tracking-wide">{section.title}</h3>
                  <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl">
                    <p className="text-neutral-300 mb-6 leading-relaxed"><strong className="text-red-400 font-medium block mb-1 text-sm uppercase tracking-wider">The Problem</strong> {section.problem}</p>
                    <p className="text-neutral-400 leading-relaxed"><strong className="text-[#d1ff36] font-medium block mb-1 text-sm uppercase tracking-wider">Where to Improve</strong> {section.solution}</p>
                  </div>
                </div>
                
                <div className="md:col-span-7 grid grid-cols-2 gap-4 order-2 md:order-2">
                  {section.metrics.map((metric, i) => (
                    <AnimatedStatusCard key={i} label={metric.label} value={metric.value} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Missing Tracking & Local Ads Sections */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4">D. Tracking & Retargeting Setup</h3>
              <p className="text-neutral-300 mb-4"><strong className="text-red-400">The Problem:</strong> You are letting highly interested website visitors slip through your fingers.</p>
              <p className="text-neutral-400">Without backend tracking tools (like Meta Pixel or Google Analytics), you have no way of knowing who visited your site. This means you cannot retarget guests who looked at your rooms but left without making a reservation.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4">E. Local Ad Visibility</h3>
              <p className="text-neutral-300 mb-4"><strong className="text-red-400">The Problem:</strong> Your property is currently invisible to travelers actively looking to book in your area right now.</p>
              <p className="text-neutral-400">Without targeted local SEO and strategic digital ads, nearby rival hotels will always sit at the top of search results, essentially stealing active, high-intent traffic directly from you.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Market Insights & Score */}
        <section className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d1ff36]/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight mb-10 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#d1ff36]/20 text-[#d1ff36] flex items-center justify-center text-sm">2</span>
              Market Insights & Growth Forecast
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <AnimatedScoreBar 
                score={audit.onlinePresenceScore?.visibilityScore} 
                max={100} 
                label="Your Visibility Score" 
              />
              <AnimatedScoreBar 
                score={audit.onlinePresenceScore?.competitorScore} 
                max={100} 
                label="Competitor's Score" 
                inverseColors={true}
              />
              <div className="space-y-2">
                <span className="text-neutral-400">Estimated Lost Revenue</span>
                <div className="text-4xl font-bold text-red-400">{audit.marketInsights?.estimatedLostRevenue}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                <span className="text-sm text-neutral-500 block mb-2">Monthly Search Volume</span>
                <span className="text-xl text-white">{audit.marketInsights?.monthlySearchVolume}</span>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                <span className="text-sm text-neutral-500 block mb-2">Competition Level</span>
                <span className="text-xl text-white">{audit.marketInsights?.competitionLevel}</span>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl border border-white/5 md:col-span-2">
                <span className="text-sm text-neutral-500 block mb-2">Scope of Booking Growth</span>
                <span className="text-xl text-[#d1ff36]">{audit.marketInsights?.bookingGrowthScope}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: How Beyond Reach Will Help */}
        <section className="border-t border-[#2a332d] pt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#d1ff36] text-black flex items-center justify-center text-sm font-bold">3</span>
              How Beyond Reach Will Help
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              We shift your booking mix away from expensive third-party platforms and redirect travelers to book with you directly, converting high commission fees back into pure profit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="text-[#d1ff36] font-mono text-sm mb-4">MONTHS 1–2</div>
              <h3 className="text-2xl font-bold mb-4">Phase 1: Foundation Optimization</h3>
              <p className="text-neutral-400 leading-relaxed">
                We fully optimize your Google Business Profile, fix website loading bugs, clean up your contact links, and ensure your booking button is front and center to immediately capture organic demand.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
              <div className="text-[#d1ff36] font-mono text-sm mb-4">MONTHS 3+</div>
              <h3 className="text-2xl font-bold mb-4">Phase 2: Targeted Visibility & Paid Ads</h3>
              <p className="text-neutral-400 leading-relaxed">
                We deploy consistent social media content (Reels/Videos) and launch high-converting local Facebook, Instagram, and Google Ad campaigns within your approved budget to outrank local competitors.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-[#d1ff36]/5 border border-[#d1ff36]/20 p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-2">The Bottom Line ROI</h3>
            <p className="text-[#d1ff36] text-lg">Stop losing 15-25% in heavy commission fees to OTAs. We build the engine to capture direct bookings.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
