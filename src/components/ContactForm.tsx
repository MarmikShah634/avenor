import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', project: '', details: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project) return;
    
    setStatus('transmitting');
    setTerminalLogs([]);
  };

  useEffect(() => {
    if (status !== 'transmitting') return;

    const logs = [
      "Establishing connection to gateway...",
      "Validating input fields...",
      "Securing transmission channel...",
      "Sending request payload to Google API..."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setTerminalLogs((prev) => [...prev, `[system] > ${logs[currentLog]}`]);
        currentLog++;
      } else {
        clearInterval(interval);
        
        const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${apiBaseUrl}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((res) => {
            if (res.ok) {
              setTerminalLogs((prev) => [
                ...prev,
                "[system] > Success: Message successfully sent via Google Gmail API."
              ]);
              setTimeout(() => {
                setStatus('success');
              }, 1000);
            } else {
              throw new Error("HTTP error " + res.status);
            }
          })
          .catch(() => {
            setTerminalLogs((prev) => [
              ...prev,
              "[system] > Error: Failed to deliver message. Check backend connectivity."
            ]);
            setTimeout(() => {
              setStatus('idle');
            }, 3000);
          });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [status]);

  return (
    <section id="contact" className="relative min-h-screen flex flex-col justify-start items-center px-6 sm:px-12 z-10 bg-transparent pt-28 pb-28 sm:pt-36 sm:pb-36">
      {/* Dynamic ambient lighting filters */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_90%,rgba(20,184,166,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] text-[#e2b853] uppercase tracking-[0.3em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2b853] animate-ping" />
            Contact Us
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-[#f4f4f5]">
            Start Your Next <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2b853] via-indigo-300 to-teal-400">
              World-Class Product
            </span>
          </h2>
          
          <p className="max-w-md mx-auto text-sm text-zinc-500 font-sans font-light mt-4">
            Send us your project details, and we will get back to you with a direct architectural plan and estimate within 24 hours.
          </p>
        </div>

        {/* Glassmorphic Contact container */}
        <div className="glass-card rounded-[32px] p-8 sm:p-12 relative overflow-hidden backdrop-blur-md border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e2b853]/20 to-transparent" />
          
          <AnimatePresence mode="wait">
            
            {/* Form State */}
            {status === 'idle' && (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                id="avenor-synthesis-form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                      01 // Name *
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. John Doe"
                      id="form-input-name"
                      className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm font-sans tracking-wide text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-[#e2b853] focus:bg-white/[0.04] transition-all duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                      02 // Email *
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. john@example.com"
                      id="form-input-email"
                      className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm font-sans tracking-wide text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.04] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Project Title */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                    03 // Project Name *
                  </label>
                  <input 
                    type="text" 
                    name="project" 
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. E-Commerce Platform"
                    id="form-input-project"
                    className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm font-sans tracking-wide text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-teal-400 focus:bg-white/[0.04] transition-all duration-300"
                  />
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                    04 // Project Details
                  </label>
                  <textarea 
                    name="details" 
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="Provide a brief summary of your project, target features, and timeline goals..."
                    rows={4}
                    id="form-input-details"
                    className="bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm font-sans tracking-wide text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-[#e2b853] focus:bg-white/[0.04] resize-none transition-all duration-300"
                  />
                </div>

                {/* Transmit Proposal Button */}
                <button
                  type="submit"
                  id="form-btn-submit"
                  className="mt-4 py-4.5 rounded-full text-xs font-mono tracking-widest bg-[#e2b853] text-zinc-950 font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(226,184,83,0.15)] hover:shadow-[0_0_25px_rgba(226,184,83,0.35)] cursor-pointer"
                >
                  <Send size={14} />
                  SEND MESSAGE
                </button>
              </motion.form>
            )}

            {/* Transmitting Telemetry Loader State */}
            {status === 'transmitting' && (
              <motion.div 
                key="transmitting"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col items-center justify-center min-h-[360px] text-left"
              >
                <div className="w-full max-w-lg p-6 bg-zinc-950 border border-white/5 rounded-2xl font-mono text-[10px] text-[#14b8a6] shadow-inner mb-6 relative overflow-hidden">
                  {/* Subtle terminal background pulse */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(20,184,166,0.03),transparent_60%)] pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-4 text-[#e2b853] border-b border-white/5 pb-3">
                    <Terminal size={14} />
                    <span>AVENOR MAIL CLIENT v1.0.0</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 font-mono h-40 overflow-y-auto">
                    {terminalLogs.map((log, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -5 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        key={idx} 
                        className="tracking-wider leading-relaxed"
                      >
                        {log}
                      </motion.div>
                    ))}
                    <span className="inline-block w-1.5 h-3 bg-[#14b8a6] animate-pulse ml-0.5" />
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500 animate-pulse">
                  TRANSMITTING MESSAGE VIA SECURE API...
                </span>
              </motion.div>
            )}

            {/* Success State */}
            {status === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center justify-center min-h-[360px] text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  className="mb-6 flex justify-center items-center"
                >
                  <CheckCircle2 size={64} className="text-[#e2b853] drop-shadow-[0_0_15px_#e2b853]" />
                </motion.div>
                
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide text-zinc-100 mb-2">
                  Message Sent
                </h3>
                
                <p className="font-sans text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed mb-8">
                  Thank you for reaching out. We have received your project details and will review them shortly. You can expect a response from our team within 24 hours.
                </p>

                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-full border border-white/5 bg-zinc-900/30 text-[10px] font-mono tracking-wider font-semibold text-[#e2b853] hover:bg-zinc-900/60 transition-all duration-300"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
