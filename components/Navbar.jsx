"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname() || '/';

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Hide if scrolling down and scrolled past header zone, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const staticRoutes = ['/', '/work', '/admin', '/contact', '/hotels', '/resorts', '/homestays-villas', '/spas-wellness', '/clubs-lounges', '/event-venues', '/yachts-boats', '/tours-activities', '/privacy-policy', '/terms-conditions', '/case-study-snap', '/case-study'];
  const isAuditRoute = !staticRoutes.includes(pathname) && !pathname.startsWith('/work/') && !pathname.startsWith('/api');
  const hideMenuBtn = pathname === '/admin' || isAuditRoute;

  return (
    <>
      <nav 
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${!visible ? styles.navbarHidden : ''}`} 
        style={isAuditRoute ? { position: 'absolute' } : {}}
      >
        {!isAuditRoute && <Link href="/case-study-snap" className={styles.navLink}>Work</Link>}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink} style={isAuditRoute ? { color: '#111827' } : {}}>
            <span style={{ fontWeight: 'bold' }}>BEYOND</span> <span style={{ fontWeight: 'normal' }}>REACH</span>
          </Link>
        </div>
        {!isAuditRoute && (
          <Link href="/contact" className={styles.navLink}>Get in touch</Link>
        )}
      </nav>

      {!hideMenuBtn && (
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <span className={styles.hamburger}></span>
          MENU
        </button>
      )}
    </>
  );
};

export default Navbar;
