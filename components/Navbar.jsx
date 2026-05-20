"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const Navbar = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuditRoute = pathname !== '/' && pathname !== '/resorts' && pathname !== '/work' && pathname !== '/admin' && !pathname.startsWith('/api');
  const hideMenuBtn = pathname === '/admin' || isAuditRoute;

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} style={isAuditRoute ? { position: 'absolute' } : {}}>
      {!isAuditRoute && <Link href="/work" className={styles.navLink}>Work</Link>}
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink} style={isAuditRoute ? { color: '#111827' } : {}}>
          <span style={{ fontWeight: 'bold' }}>BEYOND</span> <span style={{ fontWeight: 'normal' }}>REACH</span>
        </Link>
      </div>
      {!isAuditRoute && (
        <Link href="/contact" className={styles.navLink}>Get in touch</Link>
      )}
      {!hideMenuBtn && (
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <span className={styles.hamburger}></span>
          MENU
        </button>
      )}
    </nav>
  );
};

export default Navbar;
