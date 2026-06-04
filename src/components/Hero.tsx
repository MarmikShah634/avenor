import { motion } from 'framer-motion';
import { ArrowDown, Zap, Terminal } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector('#showcases');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 pt-20 overflow-hidden select-none">
      
      {/* HUD Holographic Status Tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 z-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md bg-zinc-950/45 border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e2b853] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e2b853]"></span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-300">
            AVENOR STUDIO // DIGITAL SOLUTIONS
          </span>
        </div>
      </motion.div>
 
      {/* Main Majestic Headlines */}
      <div className="z-10 text-center max-w-4xl w-full flex flex-col items-center mb-10">
        <h1 className="font-display text-4xl sm:text-7xl font-extrabold uppercase tracking-tight leading-[1.05] text-[#f4f4f5] select-none">
          WE BUILD DIGITAL <br />
          <span className="text-glow-indigo">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2b853] via-indigo-300 to-teal-400">
              PRODUCTS WITH PRECISION
            </span>
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.0 }}
          className="font-sans font-light text-zinc-400 text-sm sm:text-base leading-relaxed tracking-wide max-w-2xl mt-6 select-none"
        >
          We are Avenor, a professional digital product studio. We design and build high-performance web applications, automate complex software workflows, and construct responsive user interfaces designed to help your business scale.
        </motion.p>
      </div>
 
      {/* Hero CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 flex flex-col sm:flex-row gap-4 items-center mb-20"
      >
        <button
          onClick={onContactClick}
          className="w-48 py-4.5 rounded-full text-xs font-mono tracking-widest bg-[#e2b853] text-zinc-950 font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(226,184,83,0.3)] transition-all duration-300 cursor-pointer"
        >
          <Terminal size={14} />
          START A PROJECT
        </button>
        
        <button
          onClick={handleScrollToProjects}
          className="w-48 py-4.5 rounded-full text-xs font-mono tracking-widest border border-white/5 bg-zinc-900/30 text-zinc-300 font-semibold flex items-center justify-center gap-2 hover:border-white/10 hover:bg-zinc-900/60 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <Zap size={13} className="text-[#e2b853]" />
          VIEW OUR WORK
        </button>
      </motion.div>

      {/* Down arrow scroll helper */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 select-none pointer-events-none opacity-40 hover:opacity-100 transition-opacity"
      >
        <span className="font-mono text-[8px] tracking-[0.3em] text-zinc-500 uppercase">
          SCROLL TO EXPLORE
        </span>
        <ArrowDown size={14} className="text-[#e2b853]" />
      </motion.div>

    </section>
  );
}
