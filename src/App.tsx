import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { About } from './components/About';
import { WhyChoose } from './components/WhyChoose';
import { Journey } from './components/Journey';
import { Curriculum } from './components/Curriculum';
import { PracticalExposure } from './components/PracticalExposure';
import { LogisticsGlobe } from './components/LogisticsGlobe';
import { SuccessStories } from './components/SuccessStories';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis Smooth Scrolling after loading finishes
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing Expo.out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Anchor smooth scrolls handling via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          if (href === '#') return;
          const targetEl = document.querySelector(href) as HTMLElement;
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -80 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [loading]);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white font-sans antialiased overflow-x-hidden">
      <CustomCursor />
      
      <Navigation />
      <Hero />
      <TrustBar />
      <About />
      <WhyChoose />
      <Journey />
      <Curriculum />
      <PracticalExposure />
      <LogisticsGlobe />
      <SuccessStories />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
