import React from 'react';
import './hospitality.css';

export const metadata = {
  title: 'Beyond Reach | Hospitality Growth Partner',
  description: 'Improve your online presence, enquiry flow and booking growth. Get more direct enquiries and bookings for your hotel, resort, homestay or villa.',
};

export default function HospitalityLayout({ children }) {
  return (
    <div className="hospitality-funnel min-h-screen bg-brand-dark text-white font-body">
      {children}
    </div>
  );
}
