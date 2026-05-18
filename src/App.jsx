import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Offerings from './components/Offerings';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Menu from './components/Menu';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main>
        <Hero />
        <Marquee />
        <Offerings />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default App;
