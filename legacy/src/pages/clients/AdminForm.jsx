import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminForm.module.css';

const AdminForm = () => {
  const navigate = useNavigate();
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
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/client/${data.propname}`);
      }
    } catch (error) {
      console.error('Error saving client audit:', error);
      alert('Failed to save audit. Ensure backend server is running on port 5000.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create Online Presence Audit</h1>
      
      <form onSubmit={handleSubmit} className={styles.formCard}>
        
        {/* Hotel Info */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Hotel / Resort Name</label>
          <input 
            required
            type="text" 
            className={styles.input}
            value={formData.hotelName}
            onChange={(e) => handleChange(null, 'hotelName', e.target.value)}
            placeholder="e.g., The Grand Oasis Resort"
          />
        </div>

        {/* SECTION 1: GMB */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>A. Google My Business (GBP)</h2>
          <div className={styles.gridCols2}>
            {[
              { label: 'Profile Active', field: 'profileActive' },
              { label: 'Correct Phone Number', field: 'correctPhoneNumber' },
              { label: 'Website Link Working', field: 'websiteLinkWorking' },
              { label: 'Accurate Address/Pin', field: 'accurateAddressPin' },
              { label: 'Owner Responses to Reviews', field: 'ownerResponses' },
            ].map((item) => (
              <div key={item.field} className={styles.formGroup}>
                <label className={styles.label}>{item.label}</label>
                <select 
                  className={styles.select}
                  value={formData.gmb[item.field]}
                  onChange={(e) => handleChange('gmb', item.field, e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            ))}
            <div className={styles.formGroup}>
              <label className={styles.label}>Review Rating & Count</label>
              <input 
                type="text" 
                className={styles.input}
                value={formData.gmb.reviewRatingAndCount}
                onChange={(e) => handleChange('gmb', 'reviewRatingAndCount', e.target.value)}
                placeholder="e.g., 4.1 Stars / 85 Reviews"
              />
            </div>
          </div>
        </div>

        {/* SECTION 1: Website */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>B. Website</h2>
          <div className={styles.gridCols2}>
            {[
              { label: 'Website Active', field: 'active' },
              { label: 'Mobile-Friendly Design', field: 'mobileFriendly' },
              { label: 'Direct Booking Engine', field: 'directBookingEngine' },
              { label: 'Clear Services & Amenities', field: 'clearServicesPage' },
              { label: 'High-Quality Gallery', field: 'highQualityGallery' },
              { label: 'Basic SEO', field: 'basicSEO' },
            ].map((item) => (
              <div key={item.field} className={styles.formGroup}>
                <label className={styles.label}>{item.label}</label>
                <select 
                  className={styles.select}
                  value={formData.website[item.field]}
                  onChange={(e) => handleChange('website', item.field, e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            ))}
            <div className={styles.formGroup}>
              <label className={styles.label}>Page Loading Speed</label>
              <select 
                className={styles.select}
                value={formData.website.pageLoadSpeed}
                onChange={(e) => handleChange('website', 'pageLoadSpeed', e.target.value)}
              >
                <option value="Fast">Fast</option>
                <option value="Slow">Slow</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 1: Social Media */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>C. Instagram & Facebook</h2>
          <div className={styles.gridCols2}>
            {[
              { label: 'Active Pages', field: 'activePages', type: 'select', options: ['Yes', 'No'] },
              { label: 'Total Posts', field: 'totalPosts', type: 'text', placeholder: 'e.g., 140 posts' },
              { label: 'Posting Consistency', field: 'postingConsistency', type: 'text', placeholder: 'e.g., Once a month' },
              { label: 'Post Performance', field: 'postPerformance', type: 'select', options: ['High', 'Medium', 'Low'] },
              { label: 'Branding Score (Out of 10)', field: 'brandingScore', type: 'number' },
              { label: 'Video/Reels Content', field: 'videoReelsContent', type: 'select', options: ['Yes', 'No'] },
            ].map((item) => (
              <div key={item.field} className={styles.formGroup}>
                <label className={styles.label}>{item.label}</label>
                {item.type === 'select' ? (
                  <select 
                    className={styles.select}
                    value={formData.socialMedia[item.field]}
                    onChange={(e) => handleChange('socialMedia', item.field, e.target.value)}
                  >
                    {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input 
                    type={item.type} 
                    className={styles.input}
                    value={formData.socialMedia[item.field]}
                    onChange={(e) => handleChange('socialMedia', item.field, e.target.value)}
                    placeholder={item.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 1: Online Presence */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>D. Online Presence Score</h2>
          <div className={styles.gridCols2}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Visibility Score (/100)</label>
              <input 
                type="number" 
                className={styles.input}
                value={formData.onlinePresenceScore.visibilityScore}
                onChange={(e) => handleChange('onlinePresenceScore', 'visibilityScore', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Competitor's Score (/100)</label>
              <input 
                type="number" 
                className={styles.input}
                value={formData.onlinePresenceScore.competitorScore}
                onChange={(e) => handleChange('onlinePresenceScore', 'competitorScore', e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>The Competitive Gap</label>
              <input 
                type="text" 
                className={styles.input}
                value={formData.onlinePresenceScore.competitiveGap}
                onChange={(e) => handleChange('onlinePresenceScore', 'competitiveGap', e.target.value)}
                placeholder='e.g., Competitor ranking higher for "Best resort near..."'
              />
            </div>
          </div>
        </div>

        {/* SECTION 1: Market Insights */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>E. Market Insights & Forecast</h2>
          <div className={styles.gridCols2}>
            {[
              { label: 'Monthly Search Volume', field: 'monthlySearchVolume', placeholder: 'e.g., 5,000+ Searches/mo' },
              { label: 'Competition Level', field: 'competitionLevel', type: 'select', options: ['High', 'Medium', 'Low'] },
              { label: 'Scope of Booking Growth', field: 'bookingGrowthScope', placeholder: 'e.g., Room to capture 35% more...' },
              { label: 'Estimated Lost Revenue', field: 'estimatedLostRevenue', placeholder: 'e.g., $8,500 / Month' },
              { label: 'Recommended Ad Budget', field: 'recommendedAdBudget', placeholder: 'e.g., $1,200 / Month' },
            ].map((item) => (
              <div key={item.field} className={`${styles.formGroup} ${item.field === 'bookingGrowthScope' ? styles.fullWidth : ''}`}>
                <label className={styles.label}>{item.label}</label>
                {item.type === 'select' ? (
                  <select 
                    className={styles.select}
                    value={formData.marketInsights[item.field]}
                    onChange={(e) => handleChange('marketInsights', item.field, e.target.value)}
                  >
                    {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input 
                    type="text" 
                    className={styles.input}
                    value={formData.marketInsights[item.field]}
                    onChange={(e) => handleChange('marketInsights', item.field, e.target.value)}
                    placeholder={item.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Generate Audit Report
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
