"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Offerings.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Offerings = () => {
  const cardsRef = useRef([]);

  const items = [
    { title: "Hotels", slug: "/hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
    { title: "Resorts", slug: "/resorts", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80" },
    { title: "Homestays & Villas", slug: "/homestays-villas", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80" },
    { title: "Spas & Wellness", slug: "/spas-wellness", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" },
    { title: "Clubs & Lounges", slug: "/clubs-lounges", img: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80" },
    { title: "Event Venues", slug: "/event-venues", img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80" },
    { title: "Yachts & Boat Rentals", slug: "/yachts-boats", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80" },
    { title: "Tours & Activities", slug: "/tours-activities", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" }
  ];

  useEffect(() => {
    let mm = gsap.matchMedia();
    
    // On mobile, trigger the "hover" effect when scrolling
    mm.add("(max-width: 768px)", () => {
      cardsRef.current.forEach((el) => {
        if (!el) return;
        
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%", // When top of card reaches slightly above middle of screen
          end: "bottom 40%", // When bottom of card leaves middle
          toggleClass: "scroll-active", // Use global class name
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.sectionFluidMain} id="solution">
      <div className={styles.headerTitle}>
        <h2>OUR OFFERINGS</h2>
      </div>

      <div className={styles.sectionRow}>
        {items.map((item, index) => (
          <div 
            className={styles.sectionCol} 
            key={index}
            ref={el => cardsRef.current[index] = el}
          >
            <Link href={item.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionIn}>
                  <img src={item.img} alt={item.title} />
                </div>
              </div>
              {/* Hover text is contained WITHIN the column */}
              <div className={styles.hoverText}>
                <h2>{item.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offerings;
