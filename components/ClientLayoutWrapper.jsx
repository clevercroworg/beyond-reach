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
  
  // Only show preloader on the home page
  const [isLoading, setIsLoading] = useState(pathname === '/');

  // Scroll to top on every route change (and on refresh)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isAuditRoute = pathname !== '/' && pathname !== '/resorts' && pathname !== '/work' && pathname !== '/admin' && !pathname.startsWith('/api');

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