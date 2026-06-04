import { motion } from "framer-motion";
import { Cpu, Layout, Zap, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Layout className="text-[#e2b853]" size={22} />,
    title: "Full-Stack Web Development",
    tag: "[ SCALABLE & MODERN ]",
    description:
      "We design and build custom, high-performance web applications using modern web standards. By prioritizing robust architecture, solid database design, and seamless integrations, we deliver secure solutions built to scale.",
    bullets: [
      "Modern React & Next.js",
      "Clean state management",
      "API optimization & scaling",
    ],
    glowColor: "rgba(226, 184, 83, 0.1)",
  },
  {
    icon: <Cpu className="text-indigo-400" size={22} />,
    title: "AI & Workflow Automation",
    tag: "[ INTELLIGENT WORKFLOWS ]",
    description:
      "We integrate tailored AI capabilities directly into your software. From generative AI features and semantic search to custom automation agents, we build intelligent systems that streamline workflows and optimize data processing.",
    bullets: [
      "Tailored LLM integrations",
      "Automated processing pipelines",
      "Semantic data search",
    ],
    glowColor: "rgba(99, 102, 241, 0.1)",
  },
  {
    icon: <Zap className="text-teal-400" size={22} />,
    title: "Rapid Prototyping & MVP Builds",
    tag: "[ FAST TIME-TO-MARKET ]",
    description:
      "We construct production-ready Minimum Viable Products quickly, allowing you to test concepts and launch rapidly. We translate product requirements directly into high-fidelity functional code without unnecessary delays.",
    bullets: [
      "Rapid concept execution",
      "Interactive functional prototypes",
      "Scalable database foundations",
    ],
    glowColor: "rgba(20, 184, 166, 0.1)",
  },
  {
    icon: <Sparkles className="text-purple-400" size={22} />,
    title: "Professional UI/UX Design",
    tag: "[ PREMIUM & RESPONSIVE ]",
    description:
      "We design clean, intuitive, and modern user interfaces that build brand credibility and enhance conversion rates. By combining seamless layouts, smooth interactions, and responsive designs, we ensure a premium user experience across all devices.",
    bullets: [
      "Responsive & modern layouts",
      "Smooth micro-animations",
      "Intuitive user journeys",
    ],
    glowColor: "rgba(168, 85, 247, 0.1)",
  },
];

export default function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="capabilities"
      className="relative min-h-screen flex flex-col justify-start items-center px-6 sm:px-12 z-10 bg-transparent pt-28 pb-28 sm:pt-36 sm:pb-36"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div className="">
            <div className="flex items-center gap-2 mb-4 font-mono text-[10px] text-[#e2b853] uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853] animate-ping" />
              Core Capabilities
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-[#f4f4f5]">
              Transforming Concepts Into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2b853] via-indigo-300 to-teal-400">
                Premium Digital Solutions
              </span>
            </h2>
          </div>
        </div>

        {/* Services Grid (Asymmetrical Layout) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{
                gridColumn: idx === 0 || idx === 3 ? "span 1" : undefined,
              }}
            >
              {/* Dynamic hover color glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle_at_20%_20%, ${service.glowColor}, transparent 50%)`,
                }}
              />

              <div>
                {/* Card Top Details */}
                <div className="flex items-center justify-between mb-8 select-none">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-zinc-500 group-hover:text-[#e2b853] transition-colors duration-300">
                    {service.tag}
                  </span>
                </div>

                {/* Service Details */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f4f4f5] tracking-wide mb-4 group-hover:text-[#e2b853] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm font-sans font-light leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Bullet list of specifics */}
              <div className="border-t border-white/5 pt-6 mt-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {service.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-center gap-2 text-zinc-500 text-[11px] font-sans group-hover:text-zinc-300 transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 opacity-60" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
