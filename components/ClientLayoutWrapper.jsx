"use client";
import React, { useState } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Footer from './Footer';
import Preloader from './Preloader';
import PageTransition from './PageTransition';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          {children}
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}