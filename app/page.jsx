"use client";
import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Offerings from '../components/Offerings';
import WhyBeyondReach from '../components/WhyBeyondReach';
import GrowthSystem from '../components/GrowthSystem';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <main>
      <Hero />
      <Marquee />
      <Offerings />
      <WhyBeyondReach />
      <GrowthSystem />
      <Testimonials />
    </main>
  );
};

export default Home;
