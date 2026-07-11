import { Quote } from 'lucide-react';

const reviews = [
  {
    id: "helix",
    quote: "Avenor delivered a high-quality, production-ready SaaS platform on an accelerated timeline, helping us secure our $4.2M seed round. Their ability to translate requirements into clean code is exceptional.",
    author: "Julian Ainsley",
    role: "Founder & CEO",
    company: "Helix AI",
    metric: "TIMELINE: 14 DAYS",
    deliverables: ["SaaS Architecture", "Next.js App", "Edge API Core", "Stripe Engine"]
  },
  {
    id: "aether",
    quote: "Most traditional agencies take weeks just to align on Figma wireframes. Avenor skipped the bureaucracy and went straight to clean, secure, and fast full-stack code. The interface is pixel-perfect and highly responsive.",
    author: "Marcus Thorne",
    role: "CTO",
    company: "Aether Vault",
    metric: "SECURITY: AUDITED",
    deliverables: ["Crypto Wallet", "Web3 Hooks", "State Synchronizer", "IPFS Node"]
  }
];

const CompanyLogo = ({ company, className = "w-6 h-6" }: { company: string; className?: string }) => {
  switch (company) {
    case "Helix AI":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4.5 16.5C4.5 16.5 6 12 12 12C18 12 19.5 16.5 19.5 16.5" stroke="#6366f1" />
          <path d="M4.5 7.5C4.5 7.5 6 12 12 12C18 12 19.5 7.5 19.5 7.5" stroke="#e2b853" />
          <circle cx="12" cy="12" r="2" fill="#14b8a6" />
          <line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" strokeOpacity="0.3" />
          <line x1="16" y1="10" x2="16" y2="14" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
      );
    case "Aether Vault":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" stroke="#14b8a6" />
          <path d="M12 2L20 7V11H4V7L12 2Z" stroke="#e2b853" />
          <circle cx="12" cy="15" r="1.5" fill="#6366f1" />
        </svg>
      );
    default:
      return null;
  }
};

const ClientAvatar = ({ name }: { name: string; role: string }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  const gradients = [
    "from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    "from-[#e2b853] to-amber-600 shadow-[0_0_15px_rgba(226,184,83,0.3)]"
  ];
  const index = name === "Julian Ainsley" ? 0 : 1;

  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${gradients[index]} flex items-center justify-center text-zinc-950 font-display font-extrabold text-xs select-none`}>
      {initials}
    </div>
  );
};

export default function Testimonials() {
  // Repeat the 2 reviews multiple times to ensure continuous marquee scrolling on wider screens
  const duplicatedReviews = [
    ...reviews,
    ...reviews,
    ...reviews,
    ...reviews,
  ];

  return (
    <section id="testimonials" className="scroll-mt-28 relative min-h-screen lg:h-screen flex flex-col justify-center items-center z-10 bg-transparent overflow-hidden py-16 lg:py-0 w-full">
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-horizontal {
          display: flex;
          width: max-content;
          gap: 24px;
          animation: marquee 28s linear infinite;
        }
        .animate-marquee-horizontal:hover {
          animation-play-state: paused;
        }
        .mask-marquee {
          mask-image: linear-gradient(to right, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent);
        }
      `}</style>

      <div className="w-full flex flex-col justify-center h-full">

        {/* Section Header - remains boxed and aligned */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 font-mono text-[10px] text-[#e2b853] uppercase tracking-[0.3em] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853]" />
            Client Verdicts
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-[#f4f4f5] select-none">
            Proven Impact & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2b853] via-indigo-300 to-teal-400">
              Client Testimonials
            </span>
          </h2>
        </div>

        {/* Horizontal Scroll marquee track - breaks out to edge-to-edge */}
        <div className="w-full relative py-2 overflow-visible">
          {/* Scroll wrapper with side masks and vertical padding for hover clearance */}
          <div className="w-full overflow-hidden mask-marquee py-10">
            <div className="animate-marquee-horizontal">
              {duplicatedReviews.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="w-[380px] sm:w-[420px] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between border border-white/5 hover:border-[#e2b853]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(226,184,83,0.02)] bg-[#121216] hover:scale-[1.02] flex-shrink-0"
                >
                  <div>
                    {/* Header: Logo and Company */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                          <CompanyLogo company={review.company} className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-display text-sm font-extrabold text-[#f4f4f5] tracking-wide">
                            {review.company}
                          </h4>
                          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mt-0.5">
                            {review.role}
                          </span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                        <Quote size={12} className="text-[#e2b853]" />
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote className="font-display text-sm sm:text-[15px] font-medium leading-relaxed italic text-zinc-200 mb-6">
                      "{review.quote}"
                    </blockquote>
                  </div>

                  {/* Footer: Bio, Metric and Deliverables */}
                  <div className="mt-auto border-t border-white/5 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <ClientAvatar name={review.author} role={review.role} />
                        <div className="flex flex-col">
                          <cite className="not-italic font-display text-xs font-extrabold text-[#f4f4f5]">
                            {review.author}
                          </cite>
                          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-wider mt-0.5">
                            {review.role}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-[#14b8a6]/20 bg-[#14b8a6]/5 text-[#14b8a6] uppercase tracking-wider select-none">
                        {review.metric.split(': ')[1]}
                      </span>
                    </div>

                    {/* Deliverables tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {review.deliverables.map((tech) => (
                        <span key={tech} className="text-[9px] font-mono text-zinc-400 bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded-full select-none">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
