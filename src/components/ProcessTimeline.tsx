import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Database, Code, Sliders, Rocket, Activity, Cpu } from 'lucide-react';

const pipelineSteps = [
  {
    num: "01",
    icon: <Lightbulb size={20} className="text-[#e2b853]" />,
    title: "Deep Alignment",
    tag: "// DISCOVERY & STRATEGY",
    description: "We dedicate the initial phase of our collaboration to deep discovery and product alignment. We believe that a thorough understanding of your vision, target audience, and business goals is essential before development begins. By immersing ourselves in your requirements, we eliminate assumptions and ensure the final software perfectly meets your expectations.",
    timeline: "PHASE: PLANNING",
    diagnosticLogs: [
      "[discovery] establishing communication channels...",
      "[discovery] mapping user journeys and project scope...",
      "[strategy] verifying target market goals...",
      "[strategy] resolving functional requirements...",
      "[scope] project goals successfully defined and agreed upon."
    ],
    metric: "ALIGNMENT: COMPLETE"
  },
  {
    num: "02",
    icon: <Database size={20} className="text-indigo-400" />,
    title: "Process Mapping",
    tag: "// DATABASE & SYSTEM DESIGN",
    description: "Once requirements are defined, we design the software blueprints. This includes structuring the database schema, mapping backend endpoints, and modeling user flows. A solid technical architecture prevents performance bottlenecks and ensures future scalability.",
    timeline: "PHASE: ARCHITECTURE",
    diagnosticLogs: [
      "[design] creating database schemas...",
      "[design] mapping data flow diagrams...",
      "[design] defining API endpoints...",
      "[review] validating security structures...",
      "[system] architectural blueprints finalized."
    ],
    metric: "ARCHITECTURE: VERIFIED"
  },
  {
    num: "03",
    icon: <Code size={20} className="text-teal-400" />,
    title: "Core Construction",
    tag: "// CLEAN CODE & SYSTEM ASSEMBLY",
    description: "With a clear technical plan, we write clean, maintainable code using modern standards. We build modular frontend components, construct performant backend APIs, and configure database integrations, translating system designs into a responsive application.",
    timeline: "PHASE: DEVELOPMENT",
    diagnosticLogs: [
      "[code] assembling frontend components...",
      "[code] building server controllers and routes...",
      "[database] implementing data models...",
      "[testing] running automated code quality tests...",
      "[system] core build compilation successful."
    ],
    metric: "QUALITY: PRODUCTION-READY"
  },
  {
    num: "04",
    icon: <Sliders size={20} className="text-purple-400" />,
    title: "Meticulous Polish",
    tag: "// PERFORMANCE TUNING & QA",
    description: "We thoroughly test the application to eliminate bugs, audit security configurations, and optimize load speeds. We fine-tune transitions and layout responsiveness, ensuring a smooth, secure, and polished experience for all users.",
    timeline: "PHASE: TESTING",
    diagnosticLogs: [
      "[testing] conducting security and vulnerability audits...",
      "[testing] verifying layout response across devices...",
      "[opt] profiling server and page response times...",
      "[testing] running end-to-end user tests...",
      "[quality] experience verified as fast and secure."
    ],
    metric: "STABILITY: AUDITED"
  },
  {
    num: "05",
    icon: <Rocket size={20} className="text-amber-500" />,
    title: "Global Provision",
    tag: "// PRODUCTION LAUNCH & LIVE MONITORING",
    description: "We launch the application to a secure hosting environment configured for high availability. We set up active monitoring tools to track performance, hand over full code access, and provide documentation to ensure your team is equipped for ongoing success.",
    timeline: "PHASE: LAUNCH",
    diagnosticLogs: [
      "[deploy] provisioning hosting environments...",
      "[deploy] setting up security and SSL configurations...",
      "[monitoring] configuring live server telemetry...",
      "[handover] preparing documentation and assets...",
      "[system] application successfully launched."
    ],
    metric: "LAUNCH: LIVE & ACTIVE"
  }
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="pipeline" className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 z-10 bg-transparent pt-28 pb-28 sm:pt-36 sm:pb-36 overflow-hidden">

      {/* Absolute grid decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between relative z-10 gap-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between select-none">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-[#e2b853] uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853]" />
              Workflow Pipeline
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#f4f4f5]">
              Our Development Process
            </h2>
          </div>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-2 sm:mt-0">
            DEVELOPMENT PROCESS
          </span>
        </div>

        {/* Step Selector Horizontal Node Tracker */}
        <div className="relative py-4 border-t border-b border-white/5 my-4">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

          <div className="flex justify-between items-center relative z-10 overflow-x-auto whitespace-nowrap gap-4 scrollbar-none font-sans max-w-md sm:max-w-3xl lg:max-w-none mx-auto w-full px-2 sm:px-0">
            {pipelineSteps.map((step, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                onClick={() => setActiveStep(idx)}
                className="flex items-center justify-center gap-0 sm:gap-3 p-1.5 sm:px-4 sm:py-3 rounded-full cursor-pointer transition-all duration-300 relative group"
              >
                {/* Active indicator pill behind node */}
                {activeStep === idx && (
                  <motion.div
                    layoutId="active-step-glow"
                    className="absolute inset-0 rounded-full bg-white/[0.03] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center font-mono text-[9px] sm:text-[10px] transition-all duration-300 ${activeStep === idx
                  ? 'border-[#e2b853] text-[#e2b853] bg-zinc-950 shadow-[0_0_10px_rgba(226,184,83,0.2)]'
                  : 'border-white/5 text-zinc-500 bg-zinc-900/40 group-hover:border-zinc-500'
                  }`}>
                  {step.num}
                </div>

                <span className={`font-display text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 hidden sm:block ${
                  activeStep === idx 
                    ? 'text-[#f4f4f5]' 
                    : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {step.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Informational Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[48vh] h-auto items-stretch">

          {/* Left Side Panel: Monospaced Cybernetic Telemetry Monitor */}
          <div className="lg:col-span-5 glass-card rounded-[24px] p-6 flex flex-col justify-between border-white/5 bg-zinc-950/40 backdrop-blur-md overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#14b8a6]/20 to-transparent" />

            {/* Header Telemetry line */}
            <div className="flex items-center justify-between font-mono text-[9px] text-[#14b8a6] border-b border-white/5 pb-3 select-none">
              <div className="flex items-center gap-2">
                <Activity size={12} className="animate-pulse" />
                <span>PROCESS_LOG.txt</span>
              </div>
              <span className="text-zinc-600">STEP 0{activeStep + 1}</span>
            </div>

            {/* Simulated Live Terminal Typewriter Output */}
            <div className="flex flex-col gap-2.5 font-mono text-[10px] text-zinc-400 py-4 h-44 overflow-y-hidden select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  {pipelineSteps[activeStep].diagnosticLogs.map((log, lIdx) => (
                    <div key={lIdx} className="tracking-wider flex items-center gap-1.5">
                      <span className="text-zinc-600">{`>`}</span>
                      <span className={log.includes("SUCCESS") || log.includes("OK") ? "text-teal-400" : ""}>
                        {log}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-[#e2b853] mt-2 border-t border-white/5 pt-2">
                    <Cpu size={10} />
                    <span>{pipelineSteps[activeStep].metric}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Telemetry Indicator */}
            <div className="border-t border-white/5 pt-4 mt-2 flex items-center justify-between font-mono text-[9px] text-zinc-500 select-none">
              <span>STATUS: STABLE</span>
              <span className="text-[#14b8a6]">{pipelineSteps[activeStep].timeline}</span>
            </div>

          </div>

          {/* Right Side Panel: Asymmetrical Luxury Content Card */}
          <div className="lg:col-span-7 glass-card rounded-[24px] p-8 sm:p-10 flex flex-col justify-between border-white/5 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#e2b853] to-transparent opacity-40" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between flex-grow lg:h-full h-auto"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 font-mono text-[9px] text-[#e2b853] tracking-[0.25em] font-bold select-none">
                    <span>{pipelineSteps[activeStep].tag}</span>
                    <span>0{activeStep + 1} / 05</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#f4f4f5] tracking-wide mb-4">
                    {pipelineSteps[activeStep].title}
                  </h3>

                  {/* Description text */}
                  <p className="text-zinc-400 text-xs sm:text-sm font-sans font-light leading-relaxed max-w-xl">
                    {pipelineSteps[activeStep].description}
                  </p>
                </div>

                {/* Micro Action Button Trigger */}
                <div className="border-t border-white/5 pt-6 mt-4 flex items-center justify-between select-none">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                      {pipelineSteps[activeStep].icon}
                    </div>
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                      STATUS: STABLE
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500">
                    PHASE: VERIFIED
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
