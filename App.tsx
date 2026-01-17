import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Share2, CheckCircle, Copy, ExternalLink, Wallet, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { WEDDING_DATA } from './constants';

const RevealSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' | 'scale' }> = ({ 
  children, 
  className = "", 
  delay = 0, 
  direction = 'up' 
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      scale: direction === 'scale' ? 0.95 : 1
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: delay, 
        // Fix: Added 'as any' to solve Framer Motion transition easing type mismatch for cubic-bezier array
        ease: [0.16, 1, 0.3, 1] as any 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

const FallingPetals = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute text-wedding-accent/10"
          initial={{ 
            top: -50,
            left: `${Math.random() * 100}%`,
            rotate: 0,
            scale: 0.5 + Math.random()
          }}
          animate={{ 
            top: '110%',
            left: `${(Math.random() * 20) - 10}%`,
            rotate: 360,
            x: [0, 50, -50, 0]
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 15
          }}
        >
          <FlowerOrnament className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>
      ))}
    </div>
  );
};

const FloatingDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute opacity-[0.04] text-wedding-accent"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            rotate: 0 
          }}
          animate={{ 
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            rotate: 360 
          }}
          transition={{ 
            duration: 20 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <FlowerOrnament className="w-12 h-12 md:w-20 md:h-20" />
        </motion.div>
      ))}
    </div>
  );
};

const LightSweep = () => (
  <motion.div 
    className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]"
    animate={{ 
      background: [
        'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 60%, transparent 100%)',
        'linear-gradient(110deg, transparent 0%, rgba(255,255,255,0) 100%, rgba(255,255,255,0.4) 110%, rgba(255,255,255,0) 120%, transparent 200%)'
      ]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  />
);

const DecorativeFrame = () => (
  <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
    <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" className="max-w-xl opacity-20 text-wedding-accent">
      <motion.path 
        d="M50 20 Q20 20 20 50 L20 550 Q20 580 50 580 L350 580 Q380 580 380 550 L380 50 Q380 20 350 20 Z" 
        stroke="currentColor" 
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.circle cx="20" cy="20" r="5" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} />
      <motion.circle cx="380" cy="20" r="5" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} />
      <motion.circle cx="20" cy="580" r="5" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} />
      <motion.circle cx="380" cy="580" r="5" fill="currentColor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} />
    </svg>
  </div>
);

const BatikBackground = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
    style={{ 
      backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
      transform: "translate3d(0,0,0)"
    }}
  />
);

const BatikCorner = ({ position = "top-left", animated = false }) => {
  const positions = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180"
  };

  return (
    <motion.div 
      className={`absolute ${positions[position as keyof typeof positions]} w-24 h-24 md:w-56 md:h-56 text-wedding-accent/10 pointer-events-none opacity-40`}
      animate={animated ? { 
        opacity: [0.1, 0.4, 0.1],
        scale: [1, 1.05, 1],
        rotate: position.includes('right') ? [90, 95, 90] : [0, 5, 0]
      } : {}}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" fill="currentColor">
        <path d="M0 0 Q100 0 100 100 Q100 200 200 200 L0 200 Z" />
        <circle cx="40" cy="40" r="10" />
        <circle cx="80" cy="80" r="15" />
      </svg>
    </motion.div>
  );
};

const BatikDivider = ({ animated = false }) => (
  <div className="flex items-center justify-center gap-4 py-8 relative overflow-hidden">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "6rem" }}
      viewport={{ once: true }}
      className="h-px bg-gradient-to-r from-transparent via-wedding-accent/30 to-transparent"
    ></motion.div>
    <div className="relative">
      <motion.svg 
        width="24" height="24" viewBox="0 0 40 40" 
        className="text-wedding-accent/30"
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" fill="currentColor" />
      </motion.svg>
    </div>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "6rem" }}
      viewport={{ once: true }}
      className="h-px bg-gradient-to-l from-transparent via-wedding-accent/30 to-transparent"
    ></motion.div>
  </div>
);

const FlowerOrnament = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`text-wedding-accent/15 mx-auto ${className}`} fill="currentColor">
    <path d="M50 0C52.76 18.39 68.39 33.14 86.78 35.89C68.39 38.64 52.76 53.39 50 71.78C47.24 53.39 31.61 38.64 13.22 35.89C31.61 33.14 47.24 18.39 50 0ZM50 78.22C51.38 87.41 59.2 94.62 68.39 96C59.2 97.38 51.38 104.59 50 113.78C48.62 104.59 40.8 97.38 31.61 96C40.8 94.62 48.62 87.41 50 78.22Z" />
  </svg>
);

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(WEDDING_DATA.event.date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-2 md:gap-4 max-w-md mx-auto py-6">
      {[
        { label: 'Hari', value: timeLeft.days },
        { label: 'Jam', value: timeLeft.hours },
        { label: 'Menit', value: timeLeft.minutes },
        { label: 'Detik', value: timeLeft.seconds },
      ].map((item, idx) => (
        <RevealSection key={idx} delay={idx * 0.1} direction="scale" className="flex-1">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white/40 border border-wedding-accent/10 p-3 md:p-5 rounded-2xl shadow-lg text-center backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-wedding-accent/20"
          >
            <div className="text-xl md:text-3xl font-serif font-bold text-wedding-secondary tabular-nums">
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className="text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-wedding-secondary/40 mt-1">{item.label}</div>
          </motion.div>
        </RevealSection>
      ))}
    </div>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
  <section id={id} className={`py-16 px-6 md:py-32 text-center overflow-hidden relative ${className}`}>
    <div className="max-w-4xl mx-auto z-10 relative">{children}</div>
  </section>
);

const UnifiedRSVPSection: React.FC<{ defaultName: string }> = ({ defaultName }) => {
  const [data, setData] = useState({
    name: defaultName === 'Tamu Undangan' ? '' : defaultName,
    status: null as 'accept' | 'decline' | 'maybe' | null,
    message: '',
    submitted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.status) return;
    setData({ ...data, submitted: true });
  };

  if (data.submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/60 p-8 rounded-[3rem] border border-wedding-accent/15 shadow-2xl max-w-xl mx-auto text-center backdrop-blur-md"
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <CheckCircle className="w-16 h-16 text-wedding-accent mx-auto mb-6 stroke-[1]" />
        </motion.div>
        <h3 className="font-serif text-2xl text-wedding-secondary mb-4 italic">Terima Kasih, {data.name}!</h3>
        <p className="text-sm font-sans opacity-60 mb-8 leading-relaxed px-4">Konfirmasi serta doa restu Anda telah kami terima dengan penuh rasa syukur.</p>
        <button onClick={() => setData({...data, submitted: false})} className="text-[9px] tracking-[0.4em] uppercase font-bold text-wedding-secondary/40 hover:text-wedding-accent transition-all">Ubah Konfirmasi</button>
      </motion.div>
    );
  }

  return (
    <RevealSection direction="up">
      <div className="bg-white/30 p-8 md:p-14 rounded-[3rem] border border-wedding-accent/10 shadow-2xl max-w-2xl mx-auto backdrop-blur-lg">
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div className="space-y-2">
            <label className="block font-serif text-wedding-secondary font-medium italic ml-1">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Ketik nama Anda..." 
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full p-4 rounded-2xl ring-1 ring-wedding-accent/10 focus:ring-2 focus:ring-wedding-accent/40 bg-white/60 font-sans outline-none text-wedding-text transition-all focus:bg-white"
              required
            />
          </div>
          <div className="space-y-4">
            <p className="font-serif text-wedding-secondary font-medium italic ml-1">Konfirmasi Kehadiran</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[{ id: 'accept', label: 'Hadir' }, { id: 'maybe', label: 'Ragu' }, { id: 'decline', label: 'Tidak Hadir' }].map((opt) => (
                <motion.button
                  key={opt.id}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setData({ ...data, status: opt.id as any })}
                  className={`p-4 rounded-2xl border text-[10px] uppercase font-bold tracking-widest transition-all ${data.status === opt.id ? 'border-wedding-accent bg-