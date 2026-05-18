import React from 'react';
import styles from './Navbar.module.css';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>BEYOND REACH</div>
      <ul className={styles.navLinks}>
        <li><a href="#home" className={styles.navLink}>Home</a></li>
        <li><a href="#solution" className={styles.navLink}>Solution</a></li>
      </ul>
      <button className={styles.menuBtn} onClick={onMenuClick}>
        <span className={styles.hamburger}></span>
        MENU
      </button>
    </nav>
  );
};

export default Navbar;
