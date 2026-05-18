import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Offerings from './components/Offerings';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Preloader from './components/Preloader';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Offerings />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default App;
