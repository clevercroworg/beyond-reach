import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/Client';
import { notFound } from 'next/navigation';

export default async function ViewAudit({ params }) {
  const { propname } = params;

  await connectToDatabase();
  const audit = await Client.findOne({ propname }).lean();

  if (!audit) {
    notFound();
  }

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

  return (
    <div className="min-h-screen bg-[#0a0e0b] text-white font-sans selection:bg-[#d1ff36]/30 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-[#2a332d]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#112a1b_0%,_#0a0e0b_70%)]"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center animate-fade-in-up">
          <span className="text-[#d1ff36] font-semibold tracking-wider uppercase text-sm mb-4 block">Online Presence Audit</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{audit.hotelName}</h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive analysis of your current digital footprint, identifying critical gaps and actionable steps for revenue growth.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-20 space-y-32">
        
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
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-5 space-y-4">
                  <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                  <div className="p-6 bg-[#131915] rounded-2xl border border-[#2a332d]">
                    <p className="text-neutral-300 mb-4"><strong className="text-red-400 font-medium">The Problem:</strong> {section.problem}</p>
                    <p className="text-neutral-400"><strong className="text-[#d1ff36] font-medium">Where to Improve:</strong> {section.solution}</p>
                  </div>
                </div>
                <div className="md:col-span-7 grid grid-cols-2 gap-4">
                  {section.metrics.map((metric, i) => (
                    <div key={i} className="bg-[#131915] p-5 rounded-xl border border-[#2a332d] flex flex-col justify-center">
                      <span className="text-sm text-neutral-500 mb-1">{metric.label}</span>
                      <span className={`text-lg font-medium ${metric.value === 'No' || metric.value === 'Slow' || metric.value === 'Low' ? 'text-red-400' : 'text-white'}`}>
                        {metric.value || '-'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Missing Tracking & Local Ads Sections */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#131915] rounded-3xl border border-[#2a332d]">
              <h3 className="text-2xl font-bold mb-4">D. Tracking & Retargeting Setup</h3>
              <p className="text-neutral-300 mb-4"><strong className="text-red-400">The Problem:</strong> You are letting highly interested website visitors slip through your fingers.</p>
              <p className="text-neutral-400">Without backend tracking tools (like Meta Pixel or Google Analytics), you have no way of knowing who visited your site. This means you cannot retarget guests who looked at your rooms but left without making a reservation.</p>
            </div>
            <div className="p-8 bg-[#131915] rounded-3xl border border-[#2a332d]">
              <h3 className="text-2xl font-bold mb-4">E. Local Ad Visibility</h3>
              <p className="text-neutral-300 mb-4"><strong className="text-red-400">The Problem:</strong> Your property is currently invisible to travelers actively looking to book in your area right now.</p>
              <p className="text-neutral-400">Without targeted local SEO and strategic digital ads, nearby rival hotels will always sit at the top of search results, essentially stealing active, high-intent traffic directly from you.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Market Insights & Score */}
        <section className="bg-gradient-to-br from-[#131915] to-[#0a0e0b] p-10 rounded-[2.5rem] border border-[#2a332d] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d1ff36]/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight mb-10 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#d1ff36]/20 text-[#d1ff36] flex items-center justify-center text-sm">2</span>
              Market Insights & Growth Forecast
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-2">
                <span className="text-neutral-400">Your Visibility Score</span>
                <div className="text-5xl font-bold text-white">{audit.onlinePresenceScore?.visibilityScore}<span className="text-2xl text-neutral-600">/100</span></div>
              </div>
              <div className="space-y-2">
                <span className="text-neutral-400">Competitor's Score</span>
                <div className="text-5xl font-bold text-white">{audit.onlinePresenceScore?.competitorScore}<span className="text-2xl text-neutral-600">/100</span></div>
              </div>
              <div className="space-y-2">
                <span className="text-neutral-400">Estimated Lost Revenue</span>
                <div className="text-4xl font-bold text-red-400">{audit.marketInsights?.estimatedLostRevenue}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0a0e0b]/50 p-6 rounded-2xl border border-[#2a332d]">
                <span className="text-sm text-neutral-500 block mb-2">Monthly Search Volume</span>
                <span className="text-xl text-white">{audit.marketInsights?.monthlySearchVolume}</span>
              </div>
              <div className="bg-[#0a0e0b]/50 p-6 rounded-2xl border border-[#2a332d]">
                <span className="text-sm text-neutral-500 block mb-2">Competition Level</span>
                <span className="text-xl text-white">{audit.marketInsights?.competitionLevel}</span>
              </div>
              <div className="bg-[#0a0e0b]/50 p-6 rounded-2xl border border-[#2a332d] md:col-span-2">
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
            <div className="bg-[#131915] p-8 rounded-3xl border border-[#2a332d] hover:-translate-y-1 transition-transform duration-300">
              <div className="text-[#d1ff36] font-mono text-sm mb-4">MONTHS 1–2</div>
              <h3 className="text-2xl font-bold mb-4">Phase 1: Foundation Optimization</h3>
              <p className="text-neutral-400 leading-relaxed">
                We fully optimize your Google Business Profile, fix website loading bugs, clean up your contact links, and ensure your booking button is front and center to immediately capture organic demand.
              </p>
            </div>
            
            <div className="bg-[#131915] p-8 rounded-3xl border border-[#2a332d] hover:-translate-y-1 transition-transform duration-300">
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
