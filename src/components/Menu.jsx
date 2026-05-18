import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Menu.module.css';

const Menu = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const slideImgRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const menuItems = [
    { name: "WORK", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80" },
    { 
      name: "SOLUTION", 
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
      subItems: ["Resorts", "Home Stay", "Wellness", "Spa & Retreats", "Events", "Yachts"]
    },
    { name: "ABOUT", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80" },
    { name: "CONTACT", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" }
  ];

  // Default images for the automated slideshow
  const slideshowImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80"
  ];

  // Handle the automated slideshow wiping effect
  useEffect(() => {
    let interval;
    if (isOpen && !hoveredItem) {
      interval = setInterval(() => {
        // Wipe animation out
        gsap.to(slideImgRef.current, {
          y: "-100%", // wipe up
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
            // Reset position and wipe in
            gsap.set(slideImgRef.current, { y: "100%" });
            gsap.to(slideImgRef.current, {
              y: "0%",
              opacity: 0.3,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });
      }, 2500);
    }
    
    return () => clearInterval(interval);
  }, [isOpen, hoveredItem]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        top: 0,
        duration: 0.8,
        ease: "power4.inOut"
      });

      gsap.fromTo(linksRef.current,
        { y: 150, opacity: 0, skewY: 10 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.4
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        top: "-100vh",
        duration: 0.8,
        ease: "power4.inOut"
      });
      gsap.set(linksRef.current, { y: 150, opacity: 0, skewY: 10 });
      setHoveredItem(null); // Reset dropdowns on close
    }
  }, [isOpen]);

  const handleMouseEnter = (itemName) => {
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className={styles.overlay} ref={overlayRef}>
      
      {/* Background Container */}
      <div className={styles.bgContainer}>
        {/* Pre-render all images and toggle CSS opacity for smooth transition */}
        {menuItems.map((item, idx) => (
          <img 
            key={`bg-${idx}`}
            src={item.image} 
            alt={item.name} 
            className={`${styles.bgImage} ${hoveredItem === item.name ? styles.hoverImageActive : ''}`} 
          />
        ))}
        
        {/* The slideshow image runs behind it when not hovering */}
        <div className={`${styles.slideWrapper} ${hoveredItem ? styles.slideHidden : ''}`}>
           <img 
             ref={slideImgRef}
             src={slideshowImages[slideIndex]} 
             alt="Slideshow" 
             className={styles.bgImageSlide} 
           />
        </div>
      </div>

      <div className={styles.topBar}>
        <div className={styles.logo}>BEYOND REACH</div>
      </div>

      <div className={styles.menuContent}>
        <nav className={styles.navBlock}>
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={styles.menuItemWrapper}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.linkContainer}>
                <a 
                  href={`#${item.name.toLowerCase()}`} 
                  className={styles.menuLink}
                  ref={el => linksRef.current[index] = el}
                  onClick={!item.subItems ? onClose : undefined}
                >
                  <div className={styles.linkInner}>
                    <span className={styles.primaryText}>{item.name}</span>
                    <span className={styles.hoverTextClone}>{item.name}</span>
                  </div>
                </a>
              </div>
              
              {/* Dropdown for subItems (Solutions) */}
              {item.subItems && (
                <div className={`${styles.dropdown} ${hoveredItem === item.name ? styles.dropdownActive : ''}`}>
                  {item.subItems.map((subItem, subIdx) => (
                    <a 
                      key={subIdx} 
                      href="#solution" 
                      className={styles.subLink}
                      onClick={onClose}
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.closeBtn} onClick={onClose}>
          <span className={styles.closeIcon}>×</span> CLOSE
        </button>
      </div>
    </div>
  );
};

export default Menu;
