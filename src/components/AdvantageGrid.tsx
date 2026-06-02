import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const benchmarks = [
  {
    feature: "Discovery & Alignment",
    traditional: "2-4 weeks of generic requirement workshops and slow alignment syncs.",
    avenor: "Focused, high-impact consulting to map system requirements in days."
  },
  {
    feature: "Development Timelines",
    traditional: "3-6 months. Large, slow-moving teams writing repetitive boilerplate code.",
    avenor: "2-4 weeks. Agile full-stack execution using modern development frameworks."
  },
  {
    feature: "UI/UX Design Quality",
    traditional: "Standard pre-made templates and generic stock layouts.",
    avenor: "Bespoke, polished user interfaces custom-designed for your brand."
  },
  {
    feature: "Architecture & Performance",
    traditional: "Standard cloud setups requiring complex, high-maintenance support contracts.",
    avenor: "Serverless, high-performance edge architectures that scale automatically."
  }
];

export default function AdvantageGrid() {
  return (
    <section id="advantage" className="relative py-24 sm:py-36 px-6 sm:px-12 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-24">
          <div className="flex items-center gap-2 mb-4 font-mono text-[10px] text-[#e2b853] uppercase tracking-[0.3em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853]" />
            Comparative Advantage
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-[#f4f4f5]">
            Why Choose Avenor Over <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2b853] via-indigo-300 to-teal-400">
              Traditional Agencies
            </span>
          </h2>
        </div>

        {/* Matrix Grid */}
        <div className="glass-card rounded-[32px] overflow-hidden backdrop-blur-md border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 py-6 px-8 bg-white/[0.02] font-mono text-[10px] tracking-[0.25em] font-bold text-zinc-400 select-none">
            <span className="hidden md:inline">CRITERIA</span>
            <span className="hidden md:inline text-red-400/80">TRADITIONAL AGENCIES</span>
            <span className="hidden md:inline text-[#e2b853] text-glow-gold">AVENOR STUDIO</span>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col">
            {benchmarks.map((row, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center py-8 px-8 border-b border-white/5 last:border-b-0 hover:bg-white/[0.01] transition-colors"
              >
                
                {/* Feature Label */}
                <div className="flex flex-col">
                  <span className="md:hidden font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1.5">
                    VARIABLE
                  </span>
                  <h3 className="font-display text-sm sm:text-base font-bold text-[#f4f4f5] tracking-wide">
                    {row.feature}
                  </h3>
                </div>

                {/* Legacy System Info */}
                <div className="flex items-start gap-3 text-zinc-500">
                  <X size={16} className="text-red-500/60 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="md:hidden font-mono text-[8px] text-red-400/60 uppercase tracking-widest mb-1">
                      TRADITIONAL AGENCIES
                    </span>
                    <p className="text-xs sm:text-sm font-sans font-light leading-relaxed">
                      {row.traditional}
                    </p>
                  </div>
                </div>

                {/* Avenor System Info */}
                <div className="flex items-start gap-3 md:pl-6 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <Check size={16} className="text-[#e2b853] mt-0.5 flex-shrink-0 shadow-[0_0_8px_#e2b853]" />
                  <div className="flex flex-col">
                    <span className="md:hidden font-mono text-[8px] text-[#e2b853] uppercase tracking-widest mb-1">
                      AVENOR STUDIO
                    </span>
                    <p className="text-xs sm:text-sm font-sans font-medium text-[#f4f4f5] leading-relaxed group-hover:text-glow-gold">
                      {row.avenor}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
