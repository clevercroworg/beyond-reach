import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ onMenuClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/work" className={styles.navLink}>Work</Link>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <span style={{ fontWeight: 'bold' }}>BEYOND</span> <span style={{ fontWeight: 'normal' }}>REACH</span>
        </Link>
      </div>
      {/* If on home page, use hash. Otherwise route to home with hash */}
      <Link to={location.pathname === '/' ? '#contact' : '/#contact'} className={styles.navLink}>Get in touch</Link>
      <button className={styles.menuBtn} onClick={onMenuClick}>
        <span className={styles.hamburger}></span>
        MENU
      </button>
    </nav>
  );
};

export default Navbar;
