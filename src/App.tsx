import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';

// Core Components
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import ThreeScene from './components/ThreeScene';
import Cursor from './components/Cursor';

// Layout Sections
import Hero from './components/Hero';
import About from './components/About';
import ServicesGrid from './components/ServicesGrid';
import ProcessTimeline from './components/ProcessTimeline';
import ProjectShowcase from './components/ProjectShowcase';
import AdvantageGrid from './components/AdvantageGrid';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll engine once preloader is complete
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious inertial deceleration curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis = undefined;
      lenis.destroy();
    };
  }, [loading]);

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Persistent 3D WebGL Background Canvas - runs during preloader and core site layout */}
      <ThreeScene />

      {/* Preloader is visible immediately during initialization */}
      <Preloader onComplete={() => setLoading(false)} />
      
      {/* Core web layout reveals once preloading is completed */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative min-h-screen"
        >
          {/* Custom kinetic cursor trail */}
          <Cursor />

          {/* Floating Navigation */}
          <Navigation onContactClick={handleContactClick} />
          
          {/* Visual section layouts */}
          <main className="relative z-10 w-full overflow-hidden">
            <Hero onContactClick={handleContactClick} />
            <About />
            <ServicesGrid />
            <ProcessTimeline />
            <ProjectShowcase />
            <AdvantageGrid />
            <Testimonials />
            <ContactForm />
          </main>
          
          {/* Premium Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
