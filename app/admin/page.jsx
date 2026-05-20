"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPortal } from 'react-dom';

const defaultFormData = {
  hotelName: '',
  location: '',
  websiteLink: '',
  gmbLink: '',
  instagramLink: '',
  gmb: {
    profileActive: 'No',
    correctPhoneNumber: 'No',
    websiteLinkWorking: 'No',
    accurateAddressPin: 'No',
    reviewRatingAndCount: '',
    ownerResponses: 'No',
    uploadedImages: 'No',
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
    postCreativeQuality: 'No',
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
    highIntentKeywords: [{ keyword: '', searchVolume: '' }],
    adsBudgetBookings: [{ budget: '', bookings: '' }],
  },
  googleTrends: {
    seasonVisitor: '',
    nonSeasonSearch: '',
  },
};

export default function AdminForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(defaultFormData);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openManageModal = () => {
    setIsModalOpen(true);
    fetchClients();
  };

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSelectClient = (client) => {
    // Reset to default then merge in client data to ensure no missing fields
    setFormData({
      ...defaultFormData,
      ...client,
      gmb: { ...defaultFormData.gmb, ...client.gmb },
      website: { ...defaultFormData.website, ...client.website },
      socialMedia: { ...defaultFormData.socialMedia, ...client.socialMedia },
      onlinePresenceScore: { ...defaultFormData.onlinePresenceScore, ...client.onlinePresenceScore },
      marketInsights: { 
        ...defaultFormData.marketInsights, 
        ...client.marketInsights, 
        highIntentKeywords: client.marketInsights?.highIntentKeywords || [{ keyword: '', searchVolume: '' }],
        adsBudgetBookings: client.marketInsights?.adsBudgetBookings || [{ budget: '', bookings: '' }]
      },
      googleTrends: { ...defaultFormData.googleTrends, ...client.googleTrends },
    });
    setIsModalOpen(false); // Close modal on select
  };

  const handleDeleteClient = async (id, e) => {
    e.stopPropagation(); // prevent triggering row select
    if (!confirm('Are you sure you want to delete this audit report? This cannot be undone.')) return;
    
    try {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setClients(clients.filter(c => c._id !== id));
        if (formData._id === id) {
          setFormData(defaultFormData);
        }
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };


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
        const errData = await response.json().catch(() => ({}));
        alert(`Failed to save audit: ${errData.error || 'Unknown server error'}`);
      }
    } catch (error) {
      console.error('Error saving client audit:', error);
      alert(`Failed to save audit: ${error.message || 'Please try again.'}`);
    }
  };

  const filteredClients = clients.filter(c => 
    c.hotelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.propname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0e0b] text-white py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center md:text-left">
            Admin Audit Portal
          </h1>
          <button 
            onClick={openManageModal}
            className="bg-[#2a332d] hover:bg-[#3f4d43] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Manage Existing Audits
          </button>
        </div>
        
        {/* Manage Existing Audits Modal (Portaled to escape Framer Motion containing block) */}
        {isModalOpen && mounted && createPortal(
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
            <div className="bg-[#131915] p-6 md:p-8 rounded-2xl border border-[#2a332d] shadow-2xl w-full max-w-3xl relative max-h-[90vh] flex flex-col">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-400 hover:text-white text-xl z-10"
              >
                ✕
              </button>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pr-8 shrink-0">
                <h2 className="text-2xl font-bold">Manage Existing Audits</h2>
                <input 
                  type="text" 
                  placeholder="Search by hotel name or URL..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#0a0e0b] border border-[#2a332d] rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#d1ff36] focus:outline-none w-full md:w-64"
                />
              </div>
              
              <div className="overflow-y-auto pr-2 space-y-2 custom-scrollbar flex-1">
                {filteredClients.length === 0 ? (
                  <p className="text-neutral-500 text-sm">No audits found.</p>
                ) : (
                  filteredClients.map(client => (
                    <div 
                      key={client._id} 
                      onClick={() => handleSelectClient(client)}
                      className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg border cursor-pointer transition-colors gap-4 ${formData._id === client._id ? 'bg-[#d1ff36]/10 border-[#d1ff36]' : 'bg-[#0a0e0b] border-[#2a332d] hover:border-white/20'}`}
                    >
                      <div>
                        <span className="font-semibold block">{client.hotelName}</span>
                        <span className="text-xs text-neutral-500">/{client.propname}</span>
                      </div>
                      <div className="flex gap-3">
                        <Link 
                          href={`/${client.propname}`} 
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-neutral-400 hover:text-white px-3 py-1 rounded bg-[#2a332d] hover:bg-[#3f4d43] transition-colors"
                        >
                          View
                        </Link>
                        <button 
                          onClick={(e) => handleDeleteClient(client._id, e)}
                          className="text-sm text-red-400 hover:text-white px-3 py-1 rounded bg-red-400/10 hover:bg-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold">{formData._id ? 'Edit Audit Report' : 'Create New Audit'}</h2>
          {formData._id && (
            <button 
              onClick={() => setFormData(defaultFormData)}
              className="text-sm text-neutral-400 hover:text-white transition-colors underline"
            >
              Clear & Create New
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 bg-[#131915] p-8 rounded-2xl border border-[#2a332d] shadow-2xl">
          
          {/* Hotel Info */}
          <section className="space-y-6 pb-6 border-b border-[#2a332d]">
            <h2 className="text-2xl font-semibold text-white">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Hotel / Resort Name *</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 focus:ring-2 focus:ring-[#d1ff36] focus:border-[#d1ff36] focus:outline-none transition-all text-white placeholder-neutral-600"
                  value={formData.hotelName}
                  onChange={(e) => handleChange(null, 'hotelName', e.target.value)}
                  placeholder="e.g., The Grand Oasis Resort"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">City & State</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 focus:ring-2 focus:ring-[#d1ff36] focus:border-[#d1ff36] focus:outline-none transition-all text-white placeholder-neutral-600"
                  value={formData.location}
                  onChange={(e) => handleChange(null, 'location', e.target.value)}
                  placeholder="e.g., Miami, FL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Website Link</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 focus:ring-2 focus:ring-[#d1ff36] focus:border-[#d1ff36] focus:outline-none transition-all text-white placeholder-neutral-600"
                  value={formData.websiteLink}
                  onChange={(e) => handleChange(null, 'websiteLink', e.target.value)}
                  placeholder="https://"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Google My Business Link</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 focus:ring-2 focus:ring-[#d1ff36] focus:border-[#d1ff36] focus:outline-none transition-all text-white placeholder-neutral-600"
                  value={formData.gmbLink}
                  onChange={(e) => handleChange(null, 'gmbLink', e.target.value)}
                  placeholder="https://"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-400 mb-2">Instagram / Facebook Link</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 focus:ring-2 focus:ring-[#d1ff36] focus:border-[#d1ff36] focus:outline-none transition-all text-white placeholder-neutral-600"
                  value={formData.instagramLink}
                  onChange={(e) => handleChange(null, 'instagramLink', e.target.value)}
                  placeholder="https://"
                />
              </div>
            </div>
          </section>

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
                { label: 'Uploaded Images', field: 'uploadedImages' },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">{item.label}</label>
                  <div className="flex gap-4">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-colors ${formData.gmb[item.field] === opt ? 'bg-[#d1ff36]/10 border-[#d1ff36] text-[#d1ff36]' : 'bg-[#0a0e0b] border-[#2a332d] hover:border-white/20 text-neutral-400'}`}>
                        <input type="radio" name={`gmb_${item.field}`} className="hidden" value={opt} checked={formData.gmb[item.field] === opt} onChange={(e) => handleChange('gmb', item.field, e.target.value)} />
                        {opt}
                      </label>
                    ))}
                  </div>
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
                  <div className="flex gap-4">
                    {['Yes', 'No'].map(opt => (
                      <label key={opt} className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-colors ${formData.website[item.field] === opt ? 'bg-[#d1ff36]/10 border-[#d1ff36] text-[#d1ff36]' : 'bg-[#0a0e0b] border-[#2a332d] hover:border-white/20 text-neutral-400'}`}>
                        <input type="radio" name={`website_${item.field}`} className="hidden" value={opt} checked={formData.website[item.field] === opt} onChange={(e) => handleChange('website', item.field, e.target.value)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Page Loading Speed</label>
                <div className="flex gap-4">
                  {['Fast', 'Slow'].map(opt => (
                    <label key={opt} className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-colors ${formData.website.pageLoadSpeed === opt ? 'bg-[#d1ff36]/10 border-[#d1ff36] text-[#d1ff36]' : 'bg-[#0a0e0b] border-[#2a332d] hover:border-white/20 text-neutral-400'}`}>
                      <input type="radio" name="pageLoadSpeed" className="hidden" value={opt} checked={formData.website.pageLoadSpeed === opt} onChange={(e) => handleChange('website', 'pageLoadSpeed', e.target.value)} />
                      {opt}
                    </label>
                  ))}
                </div>
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
                { label: 'Post Performance', field: 'postPerformance', type: 'select', options: ['High', 'Medium', 'Low'] },
                { label: 'Branding Score (Out of 10)', field: 'brandingScore', type: 'number' },
                { label: 'Video/Reels Content', field: 'videoReelsContent', type: 'select', options: ['Yes', 'No'] },
                { label: 'Post / Creative Quality', field: 'postCreativeQuality', type: 'select', options: ['Yes', 'No'] },
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">{item.label}</label>
                  {item.type === 'select' ? (
                    <div className="flex gap-2 md:gap-4">
                      {item.options.map(opt => (
                        <label key={opt} className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-colors ${formData.socialMedia[item.field] === opt ? 'bg-[#d1ff36]/10 border-[#d1ff36] text-[#d1ff36]' : 'bg-[#0a0e0b] border-[#2a332d] hover:border-white/20 text-neutral-400'}`}>
                          <input type="radio" name={`socialMedia_${item.field}`} className="hidden" value={opt} checked={formData.socialMedia[item.field] === opt} onChange={(e) => handleChange('socialMedia', item.field, e.target.value)} />
                          {opt}
                        </label>
                      ))}
                    </div>
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
                    <div className="flex gap-2 md:gap-4">
                      {item.options.map(opt => (
                        <label key={opt} className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-colors ${formData.marketInsights[item.field] === opt ? 'bg-[#d1ff36]/10 border-[#d1ff36] text-[#d1ff36]' : 'bg-[#0a0e0b] border-[#2a332d] hover:border-white/20 text-neutral-400'}`}>
                          <input type="radio" name={`marketInsights_${item.field}`} className="hidden" value={opt} checked={formData.marketInsights[item.field] === opt} onChange={(e) => handleChange('marketInsights', item.field, e.target.value)} />
                          {opt}
                        </label>
                      ))}
                    </div>
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
              
              {/* Dynamic Keywords List */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-neutral-400">High Intent Keywords</label>
                  <button type="button" onClick={() => {
                    const newKeywords = [...(formData.marketInsights.highIntentKeywords || []), { keyword: '', searchVolume: '' }];
                    handleChange('marketInsights', 'highIntentKeywords', newKeywords);
                  }} className="text-xs bg-[#d1ff36]/10 text-[#d1ff36] px-3 py-1 rounded hover:bg-[#d1ff36]/20 transition-colors">+ Add Keyword</button>
                </div>
                {(formData.marketInsights.highIntentKeywords || []).map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600 text-sm"
                        value={item.keyword}
                        onChange={(e) => {
                          const newKeywords = [...formData.marketInsights.highIntentKeywords];
                          newKeywords[index].keyword = e.target.value;
                          handleChange('marketInsights', 'highIntentKeywords', newKeywords);
                        }}
                        placeholder="Keyword (e.g., Best resort in Miami)"
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600 text-sm"
                        value={item.searchVolume}
                        onChange={(e) => {
                          const newKeywords = [...formData.marketInsights.highIntentKeywords];
                          newKeywords[index].searchVolume = e.target.value;
                          handleChange('marketInsights', 'highIntentKeywords', newKeywords);
                        }}
                        placeholder="Search Volume (e.g., 2000)"
                      />
                    </div>
                    <button type="button" onClick={() => {
                      const newKeywords = formData.marketInsights.highIntentKeywords.filter((_, i) => i !== index);
                      handleChange('marketInsights', 'highIntentKeywords', newKeywords);
                    }} className="text-red-400 hover:text-red-300 p-3 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Dynamic Ads Budget Bookings List */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-neutral-400">Ads Budget / Estimated Bookings</label>
                  <button type="button" onClick={() => {
                    const newList = [...(formData.marketInsights.adsBudgetBookings || []), { budget: '', bookings: '' }];
                    handleChange('marketInsights', 'adsBudgetBookings', newList);
                  }} className="text-xs bg-[#d1ff36]/10 text-[#d1ff36] px-3 py-1 rounded hover:bg-[#d1ff36]/20 transition-colors">+ Add Item</button>
                </div>
                {(formData.marketInsights.adsBudgetBookings || []).map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600 text-sm"
                        value={item.budget}
                        onChange={(e) => {
                          const newList = [...formData.marketInsights.adsBudgetBookings];
                          newList[index].budget = e.target.value;
                          handleChange('marketInsights', 'adsBudgetBookings', newList);
                        }}
                        placeholder="Ads Budget (e.g., $1500)"
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600 text-sm"
                        value={item.bookings}
                        onChange={(e) => {
                          const newList = [...formData.marketInsights.adsBudgetBookings];
                          newList[index].bookings = e.target.value;
                          handleChange('marketInsights', 'adsBudgetBookings', newList);
                        }}
                        placeholder="Estimated Bookings (e.g., 25-40)"
                      />
                    </div>
                    <button type="button" onClick={() => {
                      const newList = formData.marketInsights.adsBudgetBookings.filter((_, i) => i !== index);
                      handleChange('marketInsights', 'adsBudgetBookings', newList);
                    }} className="text-red-400 hover:text-red-300 p-3 bg-red-400/10 rounded-lg hover:bg-red-400/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 1: Google Trends */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#d1ff36]">F. Google Trends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Season property visitor in location is</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600"
                  value={formData.googleTrends?.seasonVisitor || ''}
                  onChange={(e) => handleChange('googleTrends', 'seasonVisitor', e.target.value)}
                  placeholder="e.g., 9.8K searches during Peak Season"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Non season property search option</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0e0b] border border-[#2a332d] rounded-lg p-4 text-white focus:ring-2 focus:ring-[#d1ff36] focus:outline-none placeholder-neutral-600"
                  value={formData.googleTrends?.nonSeasonSearch || ''}
                  onChange={(e) => handleChange('googleTrends', 'nonSeasonSearch', e.target.value)}
                  placeholder="e.g., Off-season retreat searches"
                />
              </div>
            </div>
          </section>

          <button 
            type="submit" 
            className="w-full bg-[#d1ff36] hover:bg-[#bce62b] text-black font-bold py-4 rounded-lg transition-colors text-lg mt-8 uppercase tracking-wider"
          >
            {formData._id ? 'Update Audit Report' : 'Generate Audit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}
