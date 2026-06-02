import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Cloud, Globe } from 'lucide-react';

const techCategories = [
  {
    category: "Frontend & Frameworks",
    icon: <Cpu className="text-[#e2b853]" size={18} />,
    description: "Core client component engines and state routers used to compile lightning-fast, production-ready interfaces.",
    items: [
      { name: "React 19 / Vite", level: "UI COMPILER", desc: "Next-gen UI library coupled with ultra-fast compilation engines.", status: "OPTIMIZED" },
      { name: "Next.js 15", level: "FRAMEWORK", desc: "Unified React routing foundation optimizing server-side execution and pre-rendering.", status: "ACTIVE" },
      { name: "TypeScript", level: "ROBUST TYPE", desc: "Statically typed programming layer preventing runtime exceptions before edge deployment.", status: "VERIFIED" },
      { name: "Tailwind CSS", level: "STYLING SYSTEM", desc: "Modern styling engine rendering lightweight, utility-first interactive page layouts.", status: "STABLE" }
    ]
  },
  {
    category: "AI Backend & Reasoning",
    icon: <Zap className="text-indigo-400" size={18} />,
    description: "Cognitive reasoning APIs, backend routing servers, and agentic orchestration pipelines driving machine intelligence.",
    items: [
      { name: "Claude 3.5 API", level: "COGNITIVE AI", desc: "Advanced reasoning model powering autonomous code copilots and data compilers.", status: "CALIBRATED" },
      { name: "GPT-4o API", level: "DENSE MODEL", desc: "Multimodal neural network processing high-density operational telemetry streams.", status: "ACTIVE" },
      { name: "FastAPI / Python", level: "BACKEND API", desc: "High-performance Python backend server routing computational schemas at millisecond speeds.", status: "SECURE" },
      { name: "LangChain Pipelines", level: "AGENT ORCHESTRA", desc: "Dynamic systemic orchestration frameworks linking cognitive models to external service APIs.", status: "ACTIVE" }
    ]
  },
  {
    category: "Database & Edge Cloud",
    icon: <Cloud className="text-teal-400" size={18} />,
    description: "Distributed transactional databases, scalable cloud datastores, and decentralized edge content CDNs.",
    items: [
      { name: "Supabase Cloud", level: "CLOUD STORAGE", desc: "Autoscaling cloud datastore with instant real-time data streaming triggers.", status: "ONLINE" },
      { name: "PostgreSQL DB", level: "DATABASE ENGINE", desc: "Relational database server executing secure transactional database schemas.", status: "STABLE" },
      { name: "Vercel / Cloudflare", level: "EDGE NETWORK", desc: "Globally distributed serverless CDN networks provisioning assets from closest nodes.", status: "ACTIVE CDN" },
      { name: "Three.js / WebGL", level: "3D CANVAS", desc: "High-performance GPU visual canvas rendering 60fps immersive micro-animations.", status: "LOCKED" }
    ]
  }
];

export default function TechOrbit() {
  const [hoveredTech, setHoveredTech] = useState<{
    name: string;
    level: string;
    desc: string;
    status: string;
  } | null>(null);
  
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Helper to place items around a circle (360 degrees)
  const getBadgeCoordinates = (index: number, total: number, radius: number) => {
    const angle = (index * (360 / total) * Math.PI) / 180;
    return {
      x: Math.round(radius * Math.cos(angle)),
      y: Math.round(radius * Math.sin(angle))
    };
  };

  return (
    <section id="engine-room" className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 z-10 bg-transparent pt-28 pb-28 sm:pt-36 sm:pb-36 overflow-hidden">
      
      {/* Dynamic ambient orb glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(226,184,83,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 sm:mb-24 gap-4 select-none max-w-3xl">
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-[10px] text-[#e2b853] uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853] animate-ping" />
              The Engine Room
            </div>
            
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-[#f4f4f5] mb-2">
              Core Production <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2b853] via-indigo-300 to-teal-400">
                Engine & Ecosystem
              </span>
            </h2>
          </div>
          
          <p className="max-w-xl text-sm text-zinc-400 leading-relaxed font-sans font-light">
            We build structural systems, deploy thinking logic, and scale edge resources with high-performance modules. Scroll, hover, or click categories to explore our active calibrations.
          </p>
        </div>

        {/* Dynamic Dual-Column Interactive Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Categories Navigator */}
          <div className="lg:col-span-5 flex flex-col gap-5 select-none order-2 lg:order-1">
            <div className="flex flex-col gap-4">
              {techCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setHoveredCategory(cat.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`text-left p-6 rounded-[24px] border transition-all duration-500 relative group cursor-pointer ${
                    hoveredCategory === cat.category
                      ? 'border-[#e2b853]/40 bg-zinc-900/35 shadow-[0_12px_40px_rgba(0,0,0,0.3)] translate-x-2'
                      : 'border-white/5 bg-zinc-950/20 hover:border-white/10 hover:bg-zinc-950/40'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e2b853]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      {cat.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[8px] text-[#e2b853] tracking-[0.25em] uppercase">
                        SECTOR 0{idx + 1}
                      </div>
                      <h4 className="font-display text-sm font-bold text-zinc-200 group-hover:text-[#f4f4f5] transition-colors">
                        {cat.category}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-zinc-500 text-[11px] font-sans font-light leading-relaxed group-hover:text-zinc-400 transition-colors pl-11">
                    {cat.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic concentric counter-rotating 3D Orbital system */}
          <div className="lg:col-span-7 flex items-center justify-center relative overflow-visible py-10 order-1 lg:order-2">
            
            <div 
              style={{
                width: '100%',
                maxWidth: '520px',
                aspectRatio: '1/1',
              }}
              className="relative flex items-center justify-center select-none orbit-container scale-85 sm:scale-100"
            >
              {/* Concentric Orbital Rings Background Visuals */}
              
              {/* Ring 3 (Outer) */}
              <div 
                style={{
                  width: '500px',
                  height: '500px',
                  border: '1px dashed rgba(20, 184, 166, 0.1)',
                  borderRadius: '50%',
                  position: 'absolute',
                  transition: 'opacity 0.6s, border-color 0.6s',
                  opacity: hoveredCategory === null || hoveredCategory === "Global Delivery" ? 1 : 0.15,
                  borderColor: hoveredCategory === "Global Delivery" ? 'rgba(20, 184, 166, 0.35)' : undefined,
                }}
                className="flex items-center justify-center orbit-ccw pointer-events-none"
              >
                {/* Outer Badges */}
                {techCategories[2].items.map((item, idx) => {
                  const { x, y } = getBadgeCoordinates(idx, 4, 250);
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredTech(item)}
                      onMouseLeave={() => setHoveredTech(null)}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto',
                      }}
                      className="cursor-pointer"
                    >
                      <div 
                        className={`px-3.5 py-2 rounded-full border text-[10px] font-mono font-bold tracking-wide whitespace-nowrap transition-all duration-300 orbit-badge-inner-ccw ${
                          hoveredTech?.name === item.name
                            ? 'border-teal-400 bg-zinc-950 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.3)] scale-105 z-30'
                            : 'border-white/5 bg-zinc-950/80 text-zinc-400 hover:border-white/10 hover:text-zinc-200'
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ring 2 (Middle) */}
              <div 
                style={{
                  width: '360px',
                  height: '360px',
                  border: '1px dashed rgba(99, 102, 241, 0.12)',
                  borderRadius: '50%',
                  position: 'absolute',
                  transition: 'opacity 0.6s, border-color 0.6s',
                  opacity: hoveredCategory === null || hoveredCategory === "Cognitive Logic" ? 1 : 0.15,
                  borderColor: hoveredCategory === "Cognitive Logic" ? 'rgba(99, 102, 241, 0.35)' : undefined,
                }}
                className="flex items-center justify-center orbit-cw pointer-events-none"
              >
                {/* Middle Badges */}
                {techCategories[1].items.map((item, idx) => {
                  const { x, y } = getBadgeCoordinates(idx, 4, 180);
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredTech(item)}
                      onMouseLeave={() => setHoveredTech(null)}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto',
                      }}
                      className="cursor-pointer"
                    >
                      <div 
                        className={`px-3.5 py-2 rounded-full border text-[10px] font-mono font-bold tracking-wide whitespace-nowrap transition-all duration-300 orbit-badge-inner-cw ${
                          hoveredTech?.name === item.name
                            ? 'border-indigo-400 bg-zinc-950 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-105 z-30'
                            : 'border-white/5 bg-zinc-950/80 text-zinc-400 hover:border-white/10 hover:text-zinc-200'
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ring 1 (Inner) */}
              <div 
                style={{
                  width: '220px',
                  height: '220px',
                  border: '1px dashed rgba(226, 184, 83, 0.15)',
                  borderRadius: '50%',
                  position: 'absolute',
                  transition: 'opacity 0.6s, border-color 0.6s',
                  opacity: hoveredCategory === null || hoveredCategory === "Structural Synthesis" ? 1 : 0.15,
                  borderColor: hoveredCategory === "Structural Synthesis" ? 'rgba(226, 184, 83, 0.4)' : undefined,
                }}
                className="flex items-center justify-center orbit-ccw pointer-events-none"
              >
                {/* Inner Badges */}
                {techCategories[0].items.map((item, idx) => {
                  const { x, y } = getBadgeCoordinates(idx, 4, 110);
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredTech(item)}
                      onMouseLeave={() => setHoveredTech(null)}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'auto',
                      }}
                      className="cursor-pointer"
                    >
                      <div 
                        className={`px-3.5 py-2 rounded-full border text-[10px] font-mono font-bold tracking-wide whitespace-nowrap transition-all duration-300 orbit-badge-inner-ccw ${
                          hoveredTech?.name === item.name
                            ? 'border-[#e2b853] bg-zinc-950 text-[#e2b853] shadow-[0_0_15px_rgba(226,184,83,0.3)] scale-105 z-30'
                            : 'border-white/5 bg-zinc-950/80 text-zinc-400 hover:border-white/10 hover:text-zinc-200'
                        }`}
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Glowing Interactive Central Core Hub */}
              <div 
                style={{
                  width: '130px',
                  height: '130px',
                  zIndex: 20
                }}
                className="rounded-full bg-zinc-950/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col items-center justify-center p-3 text-center relative group/core select-none"
              >
                {/* Pulse Glow Aura Overlay */}
                <div 
                  className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${
                    hoveredTech 
                      ? 'shadow-[0_0_35px_rgba(226,184,83,0.12)] border-[#e2b853]/30 scale-105' 
                      : 'shadow-[0_0_20px_rgba(255,255,255,0.02)]'
                  }`}
                />

                <AnimatePresence mode="wait">
                  {!hoveredTech ? (
                    <motion.div
                      key="inactive"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center justify-center gap-1.5"
                    >
                      <Globe size={18} className="text-[#e2b853] animate-pulse" />
                      <span className="font-display text-[11px] font-extrabold tracking-[0.15em] text-zinc-100 uppercase">
                        AVENOR
                      </span>
                      <span className="font-mono text-[7px] text-zinc-500 tracking-widest font-bold">
                        ACTIVE CORE
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center justify-center gap-1"
                    >
                      <span className="font-display text-[11px] font-extrabold text-[#f4f4f5] tracking-tight leading-tight uppercase">
                        {hoveredTech.name}
                      </span>
                      <span className="font-mono text-[7px] text-[#e2b853] tracking-wider uppercase font-bold">
                        {hoveredTech.level}
                      </span>
                      <span className="font-mono text-[6px] text-zinc-500 tracking-[0.2em] font-extrabold">
                        {hoveredTech.status}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hover Metadata Context Card floating below the core on mobile, or statically positioned nearby */}
              <AnimatePresence>
                {hoveredTech && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: '-70px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '320px',
                      zIndex: 40
                    }}
                    className="glass-card rounded-2xl p-4 border-white/5 bg-zinc-950/95 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl text-center select-none"
                  >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e2b853]/20 to-transparent" />
                    <p className="text-zinc-300 text-[11px] font-sans font-light leading-relaxed">
                      {hoveredTech.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>

      {/* Luxury CSS Keyframe Animations perfectly bundled inside TechOrbit to avoid breaking bundle logic */}
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes badge-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes badge-cw {
          from { transform: translate(-50%, -50%) rotate(-360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }

        .orbit-cw {
          animation: orbit-cw 38s linear infinite;
        }
        .orbit-ccw {
          animation: orbit-ccw 44s linear infinite;
        }

        .orbit-badge-inner-cw {
          animation: badge-ccw 38s linear infinite;
        }
        .orbit-badge-inner-ccw {
          animation: badge-cw 44s linear infinite;
        }

        /* Continuous synchronization of pauses across parent orbit lines and badge children on hover */
        .orbit-container:hover .orbit-cw,
        .orbit-container:hover .orbit-ccw,
        .orbit-container:hover .orbit-badge-inner-cw,
        .orbit-container:hover .orbit-badge-inner-ccw {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
}
