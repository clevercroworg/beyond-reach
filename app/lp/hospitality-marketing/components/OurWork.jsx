"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AutoplayVideo = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct failsafe play trigger
    const attemptPlay = () => {
      video.play().catch((err) => {
        // Muted videos are allowed to autoplay by 99% of browsers,
        // but this handles any extreme power-saving or user-restriction states gracefully.
        console.log("Muted autoplay attempt logged:", err);
      });
    };

    attemptPlay();

    // Trigger replay when window gains visibility (prevents videos from halting in background)
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        attemptPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-cover pointer-events-none"
    />
  );
};

const OurWork = () => {
  const videoReels = [
    "/lp/hospitality/reel1.mp4",
    "/lp/hospitality/reel2.mp4",
    "/lp/hospitality/reel7.mp4",
    "/lp/hospitality/reel8.mp4",
    "/lp/hospitality/reel18.mp4",
    "/lp/hospitality/reel20.mp4"
  ];

  return (
    <section id="our-work" className="py-24 px-6 bg-brand-dark relative overflow-hidden border-t border-brand-border/60">
      {/* Background soft radial glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        


        {/* Clean, direct 6-video grid layout in 3x2 portrait aspect-[9/16] autoplaying */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoReels.map((videoPath, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="w-full aspect-[9/16] bg-black rounded-[1.8rem] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.4)] border border-brand-border/40 hover:border-brand-accent/45 hover:shadow-[0_20px_50px_rgba(193,120,31,0.15)] hover:scale-[1.01] transition-all duration-500 ease-out"
            >
              <AutoplayVideo src={videoPath} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurWork;
