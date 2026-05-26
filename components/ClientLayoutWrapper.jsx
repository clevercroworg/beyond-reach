"use client";
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Footer from './Footer';
import Preloader from './Preloader';
import PageTransition from './PageTransition';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  // Only show preloader on the home page
  const [isLoading, setIsLoading] = useState(pathname === '/');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smart smooth scrolling handler for cross-page and same-page hash anchors
  useEffect(() => {
    if (!mounted) return;

    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Listen to hash change events for same-page nav
    window.addEventListener('hashchange', handleHashScroll);

    // If navigated with a hash, wait for page mounting and transitions
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(handleHashScroll, 500); // 500ms ensures Framer Motion transitions/preloader clear
      return () => {
        clearTimeout(timer);
        window.removeEventListener('hashchange', handleHashScroll);
      };
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, [pathname, mounted]);

  // Server-side & initial client hydration: render standard static layout
  if (!mounted) {
    return (
      <>
        <Navbar onMenuClick={() => setIsMenuOpen(true)} />
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <div>{children}</div>
        <Footer />
      </>
    );
  }

  const staticRoutes = ['/', '/work', '/admin', '/contact', '/hotels', '/resorts', '/homestays-villas', '/spas-wellness', '/clubs-lounges', '/event-venues', '/yachts-boats', '/tours-activities', '/privacy-policy', '/terms-conditions', '/case-studies', '/case-study'];
  const isAuditRoute = !staticRoutes.includes(pathname) && !pathname.startsWith('/api');

  return (
    <>
      {isLoading && pathname === '/' && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          {children}
        </PageTransition>
      </AnimatePresence>
      {!isAuditRoute && <Footer />}
    </>
  );
}