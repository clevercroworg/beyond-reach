"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hotelName: '',
    gmb: {
      profileActive: 'No',
      correctPhoneNumber: 'No',
      websiteLinkWorking: 'No',
      accurateAddressPin: 'No',
      reviewRatingAndCount: '',
      ownerResponses: 'No',
    },
    website: {
      active: 'No',
      mobileFriendly: 'No',
      directBookingEngine: 'No',
      clearServicesPage: 'No',
      highQualityGallery: 'No',
      basicSEO: 'No',
      pageLoadSpeed: 'Slow',
    },
    socialMedia: {
      activePages: 'No',
      totalPosts: '',
      postingConsistency: '',
      postPerformance: 'Low',
      brandingScore: 0,
      videoReelsContent: 'No',
    },
    onlinePresenceScore: {
      visibilityScore: 0,
      competitorScore: 0,
      competitiveGap: '',
    },
    marketInsights: {
      monthlySearchVolume: '',
      competitionLevel: 'Low',
      bookingGrowthScope: '',
      estimatedLostRevenue: '',
      recommendedAdBudget: '',
    },
  });

  const handleChange = (section, field, value) => {
    if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value
        }
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        router.push(`/${data.propname}`);
      } else {
        alert('Failed to save audit.');
      }
    } catch (error) {
      console.error('Error saving client audit:', error);
      alert('Failed to save audit. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e0b] text-white py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-center">
          Create Online Presence Audit
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-12 bg-[#131915] p-8 rounded-2xl border border-[#2a332d] shadow-2xl">
          
          {/* Hotel Info */}
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Hotel / Resort Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 focus:ring-2 focus:ring-[#d1ff36] focus:border-[#d1ff36] focus:outline-none transition-all text-white placeholder-neutral-600"
              value={formData.hotelName}
              onChange={(e) => handleChange(null, 'hotelName', e.target.value)}
              placeholder="e.g., The Grand Oasis Resort"
            />
          </div>

          {/* SECTION 1: GMB */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#d1ff36]">A. Google My Business (GBP)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Profile Active', field: 'profileActive' },
                { label: 'Correct Phone Number', field: 'correctPhoneNumber' },
                { label: 'Website Link Working', field: 'websiteLinkWorking' },
                { label: 'Accurate Address/Pin', field: 'accurateAddressPin' },
                { label: 'Owner Responses to Reviews', field: 'ownerResponses' },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">{item.label}</label>
                  <select 
                    className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none"
                    value={formData.gmb[item.field]}
                    onChange={(e) => handleChange('gmb', item.field, e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Review Rating & Count</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600"
                  value={formData.gmb.reviewRatingAndCount}
                  onChange={(e) => handleChange('gmb', 'reviewRatingAndCount', e.target.value)}
                  placeholder="e.g., 4.1 Stars / 85 Reviews"
                />
              </div>
            </div>
          </section>

          {/* SECTION 1: Website */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#d1ff36]">B. Website</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Website Active', field: 'active' },
                { label: 'Mobile-Friendly Design', field: 'mobileFriendly' },
                { label: 'Direct Booking Engine', field: 'directBookingEngine' },
                { label: 'Clear Services & Amenities', field: 'clearServicesPage' },
                { label: 'High-Quality Gallery', field: 'highQualityGallery' },
                { label: 'Basic SEO', field: 'basicSEO' },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">{item.label}</label>
                  <select 
                    className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none"
                    value={formData.website[item.field]}
                    onChange={(e) => handleChange('website', item.field, e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Page Loading Speed</label>
                <select 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none"
                  value={formData.website.pageLoadSpeed}
                  onChange={(e) => handleChange('website', 'pageLoadSpeed', e.target.value)}
                >
                  <option value="Fast">Fast</option>
                  <option value="Slow">Slow</option>
                </select>
              </div>
            </div>
          </section>

          {/* SECTION 1: Social Media */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#d1ff36]">C. Instagram & Facebook</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Active Pages', field: 'activePages', type: 'select', options: ['Yes', 'No'] },
                { label: 'Total Posts', field: 'totalPosts', type: 'text', placeholder: 'e.g., 140 posts' },
                { label: 'Posting Consistency', field: 'postingConsistency', type: 'text', placeholder: 'e.g., Once a month' },
                { label: 'Post Performance', field: 'postPerformance', type: 'select', options: ['High', 'Medium', 'Low'] },
                { label: 'Branding Score (Out of 10)', field: 'brandingScore', type: 'number' },
                { label: 'Video/Reels Content', field: 'videoReelsContent', type: 'select', options: ['Yes', 'No'] },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">{item.label}</label>
                  {item.type === 'select' ? (
                    <select 
                      className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none"
                      value={formData.socialMedia[item.field]}
                      onChange={(e) => handleChange('socialMedia', item.field, e.target.value)}
                    >
                      {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      type={item.type} 
                      className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600"
                      value={formData.socialMedia[item.field]}
                      onChange={(e) => handleChange('socialMedia', item.field, e.target.value)}
                      placeholder={item.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 1: Online Presence */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#d1ff36]">D. Online Presence Score</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Visibility Score (/100)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none"
                  value={formData.onlinePresenceScore.visibilityScore}
                  onChange={(e) => handleChange('onlinePresenceScore', 'visibilityScore', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Competitor's Score (/100)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none"
                  value={formData.onlinePresenceScore.competitorScore}
                  onChange={(e) => handleChange('onlinePresenceScore', 'competitorScore', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-400 mb-2">The Competitive Gap</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600"
                  value={formData.onlinePresenceScore.competitiveGap}
                  onChange={(e) => handleChange('onlinePresenceScore', 'competitiveGap', e.target.value)}
                  placeholder='e.g., Competitor ranking higher for "Best resort near..."'
                />
              </div>
            </div>
          </section>

          {/* SECTION 1: Market Insights */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#d1ff36]">E. Market Insights & Forecast</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Monthly Search Volume', field: 'monthlySearchVolume', placeholder: 'e.g., 5,000+ Searches/mo' },
                { label: 'Competition Level', field: 'competitionLevel', type: 'select', options: ['High', 'Medium', 'Low'] },
                { label: 'Scope of Booking Growth', field: 'bookingGrowthScope', placeholder: 'e.g., Room to capture 35% more...' },
                { label: 'Estimated Lost Revenue', field: 'estimatedLostRevenue', placeholder: 'e.g., $8,500 / Month' },
                { label: 'Recommended Ad Budget', field: 'recommendedAdBudget', placeholder: 'e.g., $1,200 / Month' },
              ].map((item) => (
                <div key={item.field} className={item.field === 'bookingGrowthScope' ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">{item.label}</label>
                  {item.type === 'select' ? (
                    <select 
                      className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none"
                      value={formData.marketInsights[item.field]}
                      onChange={(e) => handleChange('marketInsights', item.field, e.target.value)}
                    >
                      {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600"
                      value={formData.marketInsights[item.field]}
                      onChange={(e) => handleChange('marketInsights', item.field, e.target.value)}
                      placeholder={item.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          <button 
            type="submit" 
            className="w-full bg-[#d1ff36] hover:bg-[#bce62b] text-black font-bold py-4 rounded-lg transition-colors text-lg mt-8 uppercase tracking-wider"
          >
            Generate Audit Report
          </button>
        </form>
      </div>
    </div>
  );
}
