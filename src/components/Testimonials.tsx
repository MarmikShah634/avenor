import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    quote: "Avenor delivered a high-quality, production-ready SaaS platform on an accelerated timeline, helping us secure our $4.2M seed round. Their ability to translate requirements into clean code is exceptional.",
    author: "Julian Ainsley",
    role: "Founder & CEO, Helix AI",
    metric: "[ TIMELINE: 14 DAYS ]"
  },
  {
    quote: "Most traditional agencies take weeks just to align on Figma wireframes. Avenor skipped the bureaucracy and went straight to clean, secure, and fast full-stack code. The interface is pixel-perfect and highly responsive.",
    author: "Marcus Thorne",
    role: "CTO, Aether Vault",
    metric: "[ SECURITY: AUDITED ]"
  },
  {
    quote: "The visual craftsmanship that Avenor delivers in accelerated cycles is outstanding. They rebuilt our merchant portal into a fast, smooth analytics console that increased transaction conversion by 28%.",
    author: "Sophia Vance",
    role: "COO, Synthetix Commerce",
    metric: "[ PERFORMANCE: +28% CONVERSION ]"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-24 sm:py-36 px-6 sm:px-12 z-10 bg-gradient-to-b from-[#07070a] to-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.04),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Quote Symbol decoration */}
        <div className="flex justify-center mb-8 select-none">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
            <Quote size={20} className="text-[#e2b853]" />
          </div>
        </div>

        {/* Carousel Slide container */}
        <div className="relative min-h-[260px] sm:min-h-[220px] mb-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <p className="font-display text-base sm:text-xl font-bold italic leading-relaxed text-zinc-100 mb-8 max-w-2xl">
                "{reviews[current].quote}"
              </p>
              
              <h4 className="font-display text-sm font-extrabold text-[#e2b853] uppercase tracking-wider">
                {reviews[current].author}
              </h4>
              
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase mt-1 select-none">
                {reviews[current].role} — <span className="text-[#14b8a6]">{reviews[current].metric}</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center items-center gap-6">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/5 bg-zinc-900/30 flex items-center justify-center hover:border-white/10 hover:bg-zinc-900/60 hover:text-[#e2b853] transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-4 bg-[#e2b853]' : 'bg-zinc-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/5 bg-zinc-900/30 flex items-center justify-center hover:border-white/10 hover:bg-zinc-900/60 hover:text-[#e2b853] transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
