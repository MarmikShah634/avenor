import { Terminal } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-transparent border-t border-white/5 py-12 px-6 sm:px-12 z-10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Top Segment: Brand & Links */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Logo Brand info */}
          <div className="flex flex-col max-w-xs gap-3">
            <a href="#" className="flex items-center gap-3">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
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
                <span className="font-display font-bold uppercase tracking-[0.2em] text-sm text-[#f4f4f5]">
                  Avenor
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-[#14b8a6]">
                  AI-NATIVE
                </span>
              </div>
            </a>
            
            <p className="text-zinc-500 text-xs font-sans font-light leading-relaxed mt-2">
              An elite digital product studio synthesizing high-fidelity full-stack applications and cognitive integrations.
            </p>
          </div>

          {/* Quick links columns */}
          <div className="flex gap-16 select-none">
            
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest font-bold">
                // SEGMENTS
              </span>
              
              <a 
                href="#axiom" 
                onClick={(e) => handleLinkClick(e, '#axiom')}
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                The Axiom
              </a>
              
              <a 
                href="#capabilities" 
                onClick={(e) => handleLinkClick(e, '#capabilities')}
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                Capabilities
              </a>
              
              <a 
                href="#pipeline" 
                onClick={(e) => handleLinkClick(e, '#pipeline')}
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                Pipeline
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest font-bold">
                // CURATION
              </span>
              
              <a 
                href="#showcases" 
                onClick={(e) => handleLinkClick(e, '#showcases')}
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                Showcases
              </a>
              
              <a 
                href="#advantage" 
                onClick={(e) => handleLinkClick(e, '#advantage')}
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                Advantage
              </a>
              
              <a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                Synthesis Contact
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest font-bold">
                // CONNECT
              </span>
              
              <a 
                href="https://github.com/MarmikShah634" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                GitHub
              </a>
              
              <a 
                href="https://www.linkedin.com/in/marmik-shah-81bb96294" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans font-light text-zinc-400 hover:text-[#e2b853] transition-colors"
              >
                LinkedIn
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Segment: Copyright & Telemetry Operational diagnostic logs */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px] text-zinc-500">
          
          <div className="flex items-center gap-2">
            <span>© {currentYear} AVENOR CORE INC. ALL SYNTHESIZED RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/5 select-none">
            <Terminal size={12} className="text-[#14b8a6] animate-pulse" />
            <span className="text-[#14b8a6] tracking-widest uppercase">
              ALL SYSTEMS OPERATIONAL // AVENOR v1.0.4
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
