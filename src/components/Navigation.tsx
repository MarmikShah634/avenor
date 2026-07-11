import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

interface NavigationProps {
  onContactClick: () => void;
}

export default function Navigation({ onContactClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Axiom', href: '#axiom' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Pipeline', href: '#pipeline' },
    { name: 'Showcases', href: '#showcases' },
    { name: 'Advantage', href: '#advantage' },
    { name: 'Impact', href: '#testimonials' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transitionProperty: "padding, background-color, border-color, backdrop-filter, -webkit-backdrop-filter",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-5 ${
          scrolled 
            ? 'backdrop-blur-md bg-zinc-950/40 border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo on the left */}
          <a href="#" className="flex items-center gap-3 group select-none">
            <svg viewBox="0 0 100 100" className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12">
              <path
                d="M50 15 L80 75 L62 75 L50 48 L38 75 L20 75 Z"
                fill="none"
                stroke="#e2b853"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="50" cy="48" r="4.5" fill="#6366f1" />
            </svg>
            <div className="flex flex-col">
              <span className="font-display font-bold uppercase tracking-[0.2em] text-sm text-[#f4f4f5] group-hover:text-glow-gold transition-colors duration-300">
                Avenor
              </span>
              <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-[#14b8a6]">
                AI-NATIVE
              </span>
            </div>
          </a>

          {/* Centered nav links */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/35 border border-white/5 rounded-full px-2 py-1 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-xs tracking-wider text-zinc-400 hover:text-[#f4f4f5] px-4 py-2 rounded-full transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#e2b853] scale-0 group-hover:scale-100 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Right action button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onContactClick}
              className="relative px-6 py-2.5 rounded-full text-xs font-mono tracking-wider font-semibold text-zinc-950 bg-[#e2b853] overflow-hidden group transition-all duration-300 shadow-[0_0_15px_rgba(226,184,83,0.15)] hover:shadow-[0_0_25px_rgba(226,184,83,0.3)]"
            >
              {/* Sliding glass overlay effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              INITIATE SYNTHESIS
            </button>
          </div>

          {/* Burger Menu for mobile viewports */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#f4f4f5] hover:text-[#e2b853] transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Full screen mobile glass overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen z-40 bg-[#07070a]/95 backdrop-blur-lg flex flex-col justify-center items-center px-8 md:hidden"
          >
            {/* Ambient subtle glowing grids in the menu */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.06),transparent_50%)] pointer-events-none" />
            
            <div className="flex flex-col gap-8 text-center z-10 w-full max-w-xs">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-display text-xl font-bold uppercase tracking-[0.2em] text-zinc-300 hover:text-[#e2b853] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="mt-6 w-full py-4 rounded-full text-xs font-mono tracking-widest bg-[#e2b853] text-zinc-950 font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(226,184,83,0.2)]"
              >
                <Terminal size={14} />
                INITIATE SYNTHESIS
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
