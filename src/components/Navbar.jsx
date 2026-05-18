import React from 'react';
import styles from './Navbar.module.css';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className={styles.navbar}>
      <a href="#work" className={styles.navLink}>Work</a>
      <div className={styles.logo}>
        <span style={{ fontWeight: 'bold' }}>BEYOND</span> <span style={{ fontWeight: 'normal' }}>REACH</span>
      </div>
      <a href="#solution" className={styles.navLink}>Solution</a>
      <button className={styles.menuBtn} onClick={onMenuClick}>
        <span className={styles.hamburger}></span>
        MENU
      </button>
    </nav>
  );
};

export default Navbar;
