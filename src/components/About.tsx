import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="axiom" className="relative min-h-screen flex flex-col justify-start items-center px-6 sm:px-12 z-10 bg-transparent pt-28 pb-28 sm:pt-36 sm:pb-36">
      {/* Light glow backdrops */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Asymmetrical Section Label */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] text-[#e2b853] uppercase tracking-[0.3em] select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853]" />
              About Us
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#f4f4f5] select-none">
              Building Reliable <br className="hidden lg:inline" />
              Digital Solutions
            </h2>
          </div>

          {/* Right Column: Editorial Text Blocks */}
          <div className="lg:col-span-8 flex flex-col gap-8 font-sans font-light text-zinc-400 text-sm sm:text-base leading-relaxed tracking-wide">
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#f4f4f5] text-base sm:text-lg font-normal leading-relaxed"
            >
              We believe software development should be direct, transparent, and focused on results. Traditional agencies often introduce unnecessary overhead and delays; we focus on delivering functional, high-quality products without unnecessary layers.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              At Avenor, we leverage modern engineering workflows and professional design standards to build, test, and ship production-ready applications with uncompromised quality.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              We focus on functional code and responsive interfaces. By aligning closely with our clients' needs, we translate concepts directly into stable, launchable digital products—built to scale, backed by security, and polished to perfection.
            </motion.p>

            {/* Micro stats banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/5 pt-8 mt-4 select-none">
              <div className="flex flex-col">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1">
                  EFFICIENCY
                </span>
                <span className="font-display text-lg font-extrabold text-zinc-200">
                  RAPID DELIVERY
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1">
                  RELIABILITY
                </span>
                <span className="font-display text-lg font-extrabold text-zinc-200">
                  SECURE & STABLE
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1">
                  PERFORMANCE
                </span>
                <span className="font-display text-lg font-extrabold text-zinc-200">
                  FAST LOADING
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1">
                  AVAILABILITY
                </span>
                <span className="font-display text-lg font-extrabold text-zinc-200">
                  99.9% UPTIME
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
