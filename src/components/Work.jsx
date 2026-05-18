import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Work.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "THE GRAND ESCAPE",
    client: "LUXURY RESORTS",
    imgSrc: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    vidSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    title: "OCEANIC VOYAGES",
    client: "AZURE CHARTERS",
    imgSrc: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    vidSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    title: "ZEN WELLNESS",
    client: "VITALITY SPA",
    imgSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    vidSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  },
  {
    title: "ALPINE PEAKS",
    client: "NORDIC STAYS",
    imgSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    vidSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  },
  {
    title: "NOCTURNAL EVENTS",
    client: "LUMIERE NIGHTS",
    imgSrc: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    vidSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
  },
  {
    title: "URBAN SANCTUARY",
    client: "THE METRO HOTEL",
    imgSrc: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    vidSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  }
];

const WorkCard = ({ title, client, imgSrc, vidSrc }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Optional: reset to beginning
      // videoRef.current.currentTime = 0; 
    }
  };

  return (
    <div className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles.mediaContainer}>
        <img src={imgSrc} alt={title} className={styles.imagePlaceholder} />
        <video 
          ref={videoRef} 
          src={vidSrc} 
          className={styles.video} 
          muted 
          loop 
          playsInline
        />
        <div className={styles.clientOverlay}>
          <span>{client}</span>
        </div>
      </div>
      <div className={styles.cardInfo}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <span className={styles.cardClientText}>{client}</span>
      </div>
    </div>
  );
};

const Work = () => {
  const containerRef = useRef(null);
  const cycleWords = ["STRATEGY", "CREATIVE", "WEBSITES", "CONTENT"];
  const [currentWord, setCurrentWord] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % cycleWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cycleWords.length]);

  useEffect(() => {
    // Mount entrance animation
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(`.${styles.animatedHeading}`, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2 // allow page transition to start
      });

      // Animate filter row
      gsap.from(`.${styles.filterRow}`, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6
      });

      // Animate cards staggering in
      gsap.from(`.${styles.card}`, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.workSection} id="work" ref={containerRef}>
      <div className={styles.header}>
        <div className={styles.animatedHeading}>
          <div className={styles.cycler}>
            {cycleWords.map((word, i) => (
              <span
                key={i}
                className={`${styles.cycleWord} ${i === currentWord ? styles.activeWord : styles.inactiveWord}`}
              >
                {word}
              </span>
            ))}
          </div>
          <div className={styles.staticHeading}>DRIVEN PRODUCTION</div>
        </div>
        <div className={styles.filterRow}>
          <span>PROJECTS ( {projects.length} )</span>
        </div>
      </div>

      <div className={styles.grid}>
        {projects.map((proj, idx) => (
          <WorkCard key={idx} {...proj} />
        ))}
      </div>
    </section>
  );
};

export default Work;
