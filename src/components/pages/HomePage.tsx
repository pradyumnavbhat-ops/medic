// HPI 1.7-G
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Shield, DollarSign, Users, FileText, ArrowRight, Activity, Globe, Lock, ChevronRight, Database, Cpu } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Canonical Data Sources ---
const features = [
  {
    icon: Shield,
    title: 'Blockchain-Verified Credentials',
    description: 'Tamper-proof doctor certifications and surgical success rates from national medical boards.',
    color: 'neon-teal',
    id: '01'
  },
  {
    icon: DollarSign,
    title: 'TrueCost Transparency',
    description: 'Itemized pricing with AI-powered cost breakdowns and all-inclusive trip estimates.',
    color: 'electric-magenta',
    id: '02'
  },
  {
    icon: Activity,
    title: 'CareContinuum Bridge',
    description: 'Post-treatment monitoring with AI recovery tracking and global care coordination.',
    color: 'neon-teal',
    id: '03'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access verified hospitals and doctors across major medical hubs worldwide.',
    color: 'electric-magenta',
    id: '04'
  }
];

const stats = [
  { value: '500+', label: 'Verified Hospitals' },
  { value: '2000+', label: 'Certified Doctors' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'Support Available' }
];
// ------------------------------

const IMAGE_PLACEHOLDER = "https://static.wixstatic.com/media/817061_6e552ee00967496491def935fcc33245~mv2.png?originWidth=1152&originHeight=576";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);

  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  return (
    <div className="min-h-screen bg-space-black text-foreground selection:bg-neon-teal selection:text-space-black overflow-clip font-paragraph">
      <style>{`
        .tech-grid {
          background-image: 
            linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 4rem 4rem;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }
        .glow-text-teal {
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
        .glow-text-magenta {
          text-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        }
        .clip-corner {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
        }
        .clip-corner-reverse {
          clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px);
        }
      `}</style>

      <Header />

      {/* HERO SECTION - The Terminal */}
      <section ref={heroRef} className="relative w-full min-h-[100vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        {/* Dynamic Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 tech-grid" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-teal/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-magenta/10 rounded-full blur-[120px]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-12 border border-neon-teal/30 bg-neon-teal/5 backdrop-blur-md rounded-none clip-corner"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-teal"></span>
            </div>
            <span className="text-xs tracking-[0.2em] text-neon-teal uppercase">System Online // Secure Protocol</span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-6xl mx-auto mb-8"
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] text-white tracking-tight">
              NAVIGATE GLOBAL HEALTHCARE WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal via-white to-electric-magenta glow-text-teal">
                UNWAVERING TRUST
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
              [ The ultimate digital compass for international medical travel. Transform confusion into clarity with verified credentials, transparent costs, and comprehensive post-care support. ]
            </p>
          </motion.div>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full"
          >
            <Link to="/hospitals" className="w-full sm:w-auto group">
              <div className="relative px-8 py-5 bg-neon-teal text-space-black font-heading font-bold text-lg clip-corner transition-all duration-300 hover:bg-white flex items-center justify-center gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span>EXPLORE HOSPITALS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            
            <Link to="/doctors" className="w-full sm:w-auto group">
              <div className="px-8 py-5 bg-transparent border border-neon-teal/50 text-neon-teal font-heading font-bold text-lg clip-corner-reverse transition-all duration-300 hover:bg-neon-teal/10 flex items-center justify-center gap-3">
                <span>FIND DOCTORS</span>
                <Database className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] text-foreground/50 uppercase">Scroll to initialize</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neon-teal/50 to-transparent" />
        </motion.div>
      </section>

      {/* STATS HUD - Visual Breather */}
      <section ref={statsRef} className="relative w-full py-24 border-y border-frosted-glass-foreground bg-deep-space-blue/20">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen">
           <Image src={IMAGE_PLACEHOLDER} alt="Medical Data Visualization" className="w-full h-full object-cover grayscale" />
           <div className="absolute inset-0 bg-space-black/80" />
        </div>
        
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center md:items-start border-l border-neon-teal/30 pl-6">
                <span className="text-xs text-foreground/50 tracking-widest uppercase mb-2">DATA_POINT_{index + 1}</span>
                <span className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-1">{stat.value}</span>
                <span className="text-sm text-neon-teal">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - The Trust Protocol (Sticky Scroll) */}
      <section ref={featuresRef} className="relative w-full bg-space-black">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 relative">
            
            {/* Sticky Left Column */}
            <div className="lg:w-1/3 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-20 z-20">
              <div className="inline-flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-electric-magenta" />
                <span className="text-xs tracking-widest text-electric-magenta uppercase">Core Architecture</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                ADVANCED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-magenta to-neon-teal">
                  TRUST PROTOCOL
                </span>
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed mb-12">
                Powered by cutting-edge technology to ensure transparency, security, and peace of mind throughout your medical journey.
              </p>
              
              {/* Decorative Element */}
              <div className="w-full h-[1px] bg-gradient-to-r from-neon-teal/50 to-transparent relative">
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-neon-teal rounded-full"
                  style={{ left: useTransform(featuresProgress, [0, 1], ["0%", "100%"]) }}
                />
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="lg:w-2/3 py-20 lg:py-40 flex flex-col gap-12 lg:gap-32 z-10">
              {features.map((feature, index) => {
                const isTeal = feature.color === 'neon-teal';
                const accentColor = isTeal ? 'text-neon-teal' : 'text-electric-magenta';
                const borderColor = isTeal ? 'border-neon-teal/30' : 'border-electric-magenta/30';
                const bgColor = isTeal ? 'bg-neon-teal/5' : 'bg-electric-magenta/5';

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`relative p-8 md:p-12 border ${borderColor} ${bgColor} backdrop-blur-sm clip-corner group`}
                  >
                    {/* Background Image Mask */}
                    <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay overflow-hidden">
                      <Image src={IMAGE_PLACEHOLDER} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                      <div className={`shrink-0 w-16 h-16 flex items-center justify-center border ${borderColor} bg-space-black`}>
                        <feature.icon className={`w-8 h-8 ${accentColor}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`font-heading text-xl ${accentColor}`}>[{feature.id}]</span>
                          <h3 className="font-heading text-2xl md:text-3xl text-white">{feature.title}</h3>
                        </div>
                        <p className="text-foreground/80 text-lg leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative Corner Accents */}
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${borderColor} -translate-x-1 -translate-y-1`} />
                    <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColor} translate-x-1 translate-y-1`} />
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* QUICK ACCESS - Navigation Matrix */}
      <section className="relative w-full py-32 border-t border-frosted-glass-foreground overflow-hidden">
        {/* Background Noise/Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="font-heading text-3xl md:text-5xl text-white mb-4">SYSTEM MODULES</h2>
              <p className="text-foreground/60 max-w-xl">Access specialized tools for cost analysis, post-care management, and direct support channels.</p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-frosted-glass-foreground" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Module 1 */}
            <Link to="/treatment-costs" className="group block h-full">
              <div className="h-full relative p-8 border border-frosted-glass-foreground bg-deep-space-blue/30 hover:bg-deep-space-blue/50 transition-colors duration-500 flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-electric-magenta -rotate-45" />
                </div>
                <DollarSign className="w-10 h-10 text-electric-magenta mb-8" />
                <h3 className="font-heading text-2xl text-white mb-4 group-hover:text-electric-magenta transition-colors">Treatment Costs</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-8 flex-1">
                  View transparent, itemized cost breakdowns for medical procedures. No hidden fees.
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs tracking-widest text-electric-magenta uppercase">
                  <span>Initialize Module</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-electric-magenta group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </Link>

            {/* Module 2 */}
            <Link to="/post-care" className="group block h-full">
              <div className="h-full relative p-8 border border-frosted-glass-foreground bg-deep-space-blue/30 hover:bg-deep-space-blue/50 transition-colors duration-500 flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-neon-teal -rotate-45" />
                </div>
                <FileText className="w-10 h-10 text-neon-teal mb-8" />
                <h3 className="font-heading text-2xl text-white mb-4 group-hover:text-neon-teal transition-colors">Post-Care Guides</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-8 flex-1">
                  Access comprehensive recovery monitoring and follow-up care information.
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs tracking-widest text-neon-teal uppercase">
                  <span>Initialize Module</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-teal group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </Link>

            {/* Module 3 */}
            <Link to="/contact" className="group block h-full">
              <div className="h-full relative p-8 border border-frosted-glass-foreground bg-deep-space-blue/30 hover:bg-deep-space-blue/50 transition-colors duration-500 flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                </div>
                <Users className="w-10 h-10 text-white mb-8" />
                <h3 className="font-heading text-2xl text-white mb-4 group-hover:text-white transition-colors">Personalized Help</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-8 flex-1">
                  Submit an inquiry for customized treatment information and dedicated support.
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs tracking-widest text-white uppercase">
                  <span>Initialize Module</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}