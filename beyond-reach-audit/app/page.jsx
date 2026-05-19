"use client";
import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Offerings from '../components/Offerings';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <main>
      <Hero />
      <Marquee />
      <Offerings />
      <Testimonials />
    </main>
  );
};

export default Home;
