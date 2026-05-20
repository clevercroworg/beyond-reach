"use client";
import React, { useState } from 'react';
import styles from './Contact.module.css';
import { Mail, Calendar, Globe, Building2, User, Send, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';

const ContactPage = () => {
  const [copyStatus, setCopyStatus] = useState("CLICK TO COPY");
  const emailAddress = "hello@beyondreachagency.com";

  // Form State
  const [formData, setFormData] = useState({
    hotelName: '',
    contactName: '',
    email: '',
    website: '',
    serviceOfInterest: 'Free Brand Audit',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const services = [
    'Free Brand Audit',
    'Direct Bookings Scale',
    'SEO & Digital Visibility',
    'Social & Branding',
    'Other Support'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopyStatus("COPIED!");
    setTimeout(() => {
      setCopyStatus("CLICK TO COPY");
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectService = (service) => {
    setFormData(prev => ({
      ...prev,
      serviceOfInterest: service
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        const errData = await response.json();
        setSubmitError(errData.error || 'Failed to transmit briefing. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Connection error. Please ensure the server is active.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setSubmitSuccess(false);
    setFormData({
      hotelName: '',
      contactName: '',
      email: '',
      website: '',
      serviceOfInterest: 'Free Brand Audit',
      message: ''
    });
  };

  return (
    <div className={styles.contactSection}>
      {/* Decorative Background Glows */}
      <div className={styles.bgLight}></div>
      <div className={styles.bgLightTwo}></div>

      <div className={styles.container}>
        
        {/* Top Header */}
        <header className={styles.header}>
          <div className={styles.statusWrapper}>
            <div className={styles.statusDot}></div>
            <span className={styles.statusText}>PORTAL ACTIVE · LIVE CONNECTION</span>
          </div>
          <h1 className={styles.title}>CONNECT DIRECTLY</h1>
          <p className={styles.subtitle}>
            Break free from OTA dependency. Bypassing gatekeepers with secure direct communication channels and intelligent brand evaluation.
          </p>
        </header>

        {/* Dynamic Split Layout */}
        <div className={styles.splitLayout}>
          
          {/* Left Column: Portal Mechanics */}
          <div className={styles.leftColumn}>
            
            <div className={styles.infoCard}>
              <h2 className={styles.cardTitle}>DIRECT BRIEFING</h2>
              <p className={styles.cardDesc}>
                Book a high-level private consultation directly with our brand strategy team to align growth objectives.
              </p>
              
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.mainActionBtn}
              >
                <span>SCHEDULE PRIVATE BRIEFING</span>
                <ArrowUpRight className={styles.arrowIcon} size={22} />
              </a>

              {/* Innovative Interactive Click-to-Copy Email */}
              <div className={styles.copyEmailContainer}>
                <button 
                  onClick={handleCopyEmail} 
                  className={styles.copyEmailBtn}
                  title="Click to copy email address"
                  type="button"
                >
                  <div className={styles.emailTextWrapper}>
                    <Mail size={18} className={styles.emailIcon} />
                    <div className={styles.emailDetails}>
                      <span className={styles.emailLabel}>Direct Inquiries</span>
                      <span className={styles.emailValue}>{emailAddress}</span>
                    </div>
                  </div>
                  <span className={styles.copyState}>
                    {copyStatus}
                  </span>
                </button>
              </div>
            </div>

            {/* Real-time Metadata Block */}
            <div className={styles.metaCard}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>TIMEZONE</span>
                <span className={styles.metaValue}>GMT / LONDON</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>RESPONSE WINDOW</span>
                <span className={styles.metaValue}>UNDER 12 HOURS</span>
              </div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>INTAKE STATUS</span>
                <span className={styles.metaValue}>Q2 / Q3 2026 ACTIVE</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Intake Form */}
          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className={styles.intakeForm}>
                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>TRANSMIT BRIEFING</h2>
                    <p className={styles.formSubtitle}>Provide essential brand context to initiate evaluation</p>
                  </div>

                  {submitError && (
                    <div className={styles.errorAlert}>
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Input Grid */}
                  <div className={styles.inputGrid}>
                    
                    {/* Contact Name */}
                    <div className={styles.inputWrapper}>
                      <User size={18} className={styles.inputIcon} />
                      <input 
                        type="text" 
                        name="contactName"
                        required 
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Your Name *"
                        className={styles.textInput}
                      />
                    </div>

                    {/* Hotel/Resort Name */}
                    <div className={styles.inputWrapper}>
                      <Building2 size={18} className={styles.inputIcon} />
                      <input 
                        type="text" 
                        name="hotelName"
                        required 
                        value={formData.hotelName}
                        onChange={handleInputChange}
                        placeholder="Hotel / Resort Name *"
                        className={styles.textInput}
                      />
                    </div>

                    {/* Business Email */}
                    <div className={styles.inputWrapper}>
                      <Mail size={18} className={styles.inputIcon} />
                      <input 
                        type="email" 
                        name="email"
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Business Email Address *"
                        className={styles.textInput}
                      />
                    </div>

                    {/* Website Link */}
                    <div className={styles.inputWrapper}>
                      <Globe size={18} className={styles.inputIcon} />
                      <input 
                        type="url" 
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="Current Website URL (https://)"
                        className={styles.textInput}
                      />
                    </div>

                  </div>

                  {/* Service Custom Selector */}
                  <div className={styles.selectorSection}>
                    <label className={styles.selectorLabel}>SERVICE OF INTEREST</label>
                    <div className={styles.capsuleContainer}>
                      {services.map(service => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleSelectService(service)}
                          className={`${styles.capsule} ${formData.serviceOfInterest === service ? styles.capsuleActive : ''}`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brief Message */}
                  <div className={styles.textareaWrapper}>
                    <MessageSquare size={18} className={styles.textareaIcon} />
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your objectives or challenges..."
                      rows={4}
                      className={styles.textareaInput}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? (
                      <span className={styles.loadingSpinner}>ESTABLISHING CONNECTION...</span>
                    ) : (
                      <>
                        <span>TRANSMIT BRIEFING</span>
                        <Send size={18} className={styles.sendIcon} />
                      </>
                    )}
                  </button>

                </form>
              ) : (
                /* Animated Success State */
                <div className={styles.successState}>
                  <div className={styles.successIconWrapper}>
                    <CheckCircle2 size={64} className={styles.successCheck} />
                  </div>
                  <h2 className={styles.successTitle}>TRANSMISSION SUCCESSFUL</h2>
                  <p className={styles.successDesc}>
                    Briefing data successfully written to secure storage. Our digital strategy desk is initializing evaluation.
                  </p>
                  
                  <div className={styles.receiptSummary}>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>BRAND</span>
                      <span className={styles.receiptVal}>{formData.hotelName}</span>
                    </div>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>DIRECTOR</span>
                      <span className={styles.receiptVal}>{formData.contactName}</span>
                    </div>
                    <div className={styles.receiptRow}>
                      <span className={styles.receiptLabel}>OBJECTIVE</span>
                      <span className={styles.receiptVal}>{formData.serviceOfInterest}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleResetSuccess}
                    className={styles.resetBtn}
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
