import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, CheckCircle, Copy, ExternalLink, Wallet, ChevronUp, ChevronDown, UserPlus, MessageCircle } from 'lucide-react';
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
                  className={`p-4 rounded-2xl border text-[10px] uppercase font-bold tracking-widest transition-all ${data.status === opt.id ? 'border-wedding-accent bg-wedding-accent/10 ring-2 ring-wedding-accent/20' : 'border-wedding-accent/10 bg-white/50 hover:bg-white'}`}
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block font-serif text-wedding-secondary font-medium italic ml-1">Doa Restu</label>
            <textarea 
              placeholder="Tulis doa restu Anda..." 
              rows={4} 
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              className="w-full p-5 rounded-[1.5rem] ring-1 ring-wedding-accent/10 focus:ring-2 focus:ring-wedding-accent/40 bg-white/60 font-sans italic outline-none text-wedding-text transition-all focus:bg-white"
              required
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!data.status || !data.name || !data.message}
            className="w-full py-5 rounded-full bg-wedding-secondary text-white font-sans text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl disabled:opacity-30 transition-all hover:bg-wedding-accent"
          >
            Kirim Konfirmasi
          </motion.button>
        </form>
      </div>
    </RevealSection>
  );
};

const PersonalizedShare: React.FC<{ currentGuestName: string }> = ({ currentGuestName }) => {
  const [inviteeName, setInviteeName] = useState('');
  
  const getShareUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    if (!inviteeName.trim()) return baseUrl;
    return `${baseUrl}?to=${inviteeName.trim().replace(/\s+/g, '_')}`;
  };

  const handleWhatsAppShare = () => {
    const url = getShareUrl();
    const name = inviteeName.trim() || 'Bapak/Ibu/Saudara/i';
    
    // Formal and polite Indonesian message template
    const message = `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i ${name} untuk merayakan hari bahagia kami.

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Informasi lengkap mengenai acara dapat dilihat melalui tautan undangan digital di bawah ini:
${url}

Atas perhatian dan kehadirannya, kami ucapkan banyak terima kasih.
Wassalamu'alaikum Warahmatullahi Wabarakatuh.

Kami yang berbahagia,
${WEDDING_DATA.groom.nickname} & ${WEDDING_DATA.bride.nickname}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <RevealSection direction="up">
      <div className="max-w-md mx-auto p-8 md:p-10 bg-white/40 rounded-[3rem] border border-wedding-accent/10 shadow-xl backdrop-blur-md flex flex-col gap-6 relative overflow-hidden">
        <div className="space-y-3">
           <h3 className="font-serif text-xl md:text-2xl italic text-wedding-secondary">
             Bagikan Undangan
           </h3>
           <p className="text-sm opacity-70 font-serif italic leading-relaxed text-wedding-secondary">
            Gunakan kolom di bawah ini untuk mengirimkan undangan resmi secara personal via WhatsApp.
          </p>
        </div>

        <div className="relative group">
          <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wedding-accent/40 group-focus-within:text-wedding-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Ketik Nama Tamu..." 
            value={inviteeName}
            onChange={(e) => setInviteeName(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-wedding-accent/10 focus:border-wedding-accent/40 bg-white/60 font-serif italic outline-none text-wedding-text transition-all focus:bg-white text-sm"
          />
        </div>

        <div className="flex flex-col gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsAppShare} 
            className="w-full py-5 bg-[#25D366] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-lg hover:brightness-105"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" /> Kirim Undangan WhatsApp
          </motion.button>
        </div>

        {inviteeName && (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] text-center text-wedding-accent uppercase tracking-widest font-bold bg-wedding-accent/5 py-2 rounded-xl"
          >
            Undangan atas nama "{inviteeName}" siap dikirim
          </motion.p>
        )}
      </div>
    </RevealSection>
  );
};

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const guestName = (new URLSearchParams(window.location.search).get('to') || 'Tamu Undangan').replace(/_/g, ' ');

  const mempRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mempRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  useEffect(() => {
    const handleScroll = () => setShowScrollUp(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="relative font-sans text-wedding-text bg-wedding-primary overflow-x-hidden selection:bg-wedding-accent/20 min-h-screen">
      <BatikBackground />
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div 
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="fixed inset-0 z-[100] h-screen w-full flex flex-col items-center justify-center bg-wedding-primary text-center p-8 overflow-hidden"
          >
            <LightSweep />
            <FallingPetals />
            <DecorativeFrame />
            
            <div className="z-10 space-y-12 max-w-lg w-full">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <FlowerOrnament className="w-16 h-16 md:w-24 md:h-24 mb-6 opacity-20" />
              </motion.div>
              <div className="space-y-6">
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.4, y: 0 }}
                  className="font-sans uppercase tracking-[0.6em] text-[10px] font-bold"
                >Wedding Celebration</motion.h4>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  <h1 className="font-script text-6xl md:text-[10rem] text-wedding-secondary leading-none">
                    {WEDDING_DATA.groom.nickname} & {WEDDING_DATA.bride.nickname}
                  </h1>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="py-8 border-y border-wedding-accent/10 max-w-xs mx-auto overflow-hidden"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-wedding-secondary/40 mb-4 font-bold">Spesial Untuk:</p>
                <h3 className="font-serif text-3xl md:text-5xl font-medium italic text-wedding-secondary">{guestName}</h3>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="relative"
              >
                <motion.div 
                  className="absolute inset-0 bg-wedding-accent/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(true);
                    window.scrollTo(0, 0);
                  }} 
                  className="relative flex items-center gap-4 mx-auto bg-wedding-secondary text-white px-12 py-5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl transition-all hover:bg-wedding-accent"
                >
                  <Heart className="w-4 h-4 fill-white stroke-none" /> Buka Undangan
                </motion.button>
              </motion.div>
            </div>
            
            <BatikCorner position="top-left" animated />
            <BatikCorner position="top-right" animated />
            <BatikCorner position="bottom-left" animated />
            <BatikCorner position="bottom-right" animated />
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: showScrollUp ? 1 : 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 p-4 bg-wedding-secondary text-white rounded-full shadow-2xl transition-all"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>

            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative bg-wedding-primary py-24">
              <FloatingDecorations />
              <BatikCorner position="top-left" animated />
              <BatikCorner position="top-right" animated />
              <div className="space-y-10 relative">
                <div className="space-y-8">
                  <p className="font-sans uppercase tracking-[1em] text-[9px] text-wedding-secondary/30 font-bold">Wedding</p>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                  >
                    <h1 className="font-script text-[5.5rem] md:text-[12rem] text-wedding-secondary leading-[0.7] mb-4">{WEDDING_DATA.groom.nickname}</h1>
                    <div className="font-serif text-2xl md:text-3xl italic text-wedding-accent my-4 animate-pulse">&</div>
                    <h1 className="font-script text-[5.5rem] md:text-[12rem] text-wedding-secondary leading-[0.7]">{WEDDING_DATA.bride.nickname}</h1>
                  </motion.div>
                  <BatikDivider animated />
                  <p className="font-serif text-xl md:text-2xl tracking-[0.4em] text-wedding-secondary font-light">31 JANUARI 2026</p>
                </div>
              </div>
            </section>

            <Section className="bg-wedding-light relative">
              <FloatingDecorations />
              <RevealSection className="max-w-2xl mx-auto italic font-serif text-xl md:text-3xl text-wedding-secondary leading-relaxed space-y-8">
                <p className="tracking-tight">"{WEDDING_DATA.quote.text}"</p>
                <BatikDivider animated />
                <p className="font-sans font-bold text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-wedding-accent">— {WEDDING_DATA.quote.source}</p>
              </RevealSection>
            </Section>

            <section ref={mempRef} className="bg-wedding-primary py-32 relative overflow-hidden text-center">
              <motion.div 
                style={{ y: yParallax, opacity: 0.03 }}
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
              >
                <FlowerOrnament className="w-[150%] md:w-[80%] h-auto rotate-12" />
              </motion.div>

              <div className="max-w-4xl mx-auto z-10 relative">
                <RevealSection direction="up" className="mb-24 space-y-6">
                  <p className="font-sans text-[10px] uppercase tracking-[0.8em] text-wedding-accent font-bold">Assalamualaikum Warahmatullahi Wabarakatuh</p>
                  <p className="max-w-lg mx-auto text-sm md:text-base opacity-60 leading-relaxed font-serif italic px-4">Dengan memohon ridho Allah SWT, kami mengundang Anda untuk merayakan wedding suci kami:</p>
                  <BatikDivider animated />
                </RevealSection>

                <div className="space-y-40 max-w-5xl mx-auto px-6 relative">
                  <RevealSection direction="left" className="space-y-12">
                    <h3 className="font-script text-5xl md:text-[9rem] text-wedding-secondary leading-none">{WEDDING_DATA.groom.fullName}</h3>
                    <div className="space-y-6">
                      <p className="font-sans text-[9px] text-wedding-secondary/40 tracking-[0.5em] uppercase font-bold">Putra Dari</p>
                      <div className="font-serif text-lg md:text-2xl text-wedding-secondary/80 space-y-1 italic font-medium tracking-tight">
                        <p>{WEDDING_DATA.groom.father}</p>
                        <p className="text-sm text-wedding-accent/40 font-sans not-italic font-light tracking-[0.3em] uppercase">dan</p>
                        <p>{WEDDING_DATA.groom.mother}</p>
                      </div>
                    </div>
                  </RevealSection>

                  <BatikDivider animated />

                  <RevealSection direction="right" className="space-y-12">
                    <h3 className="font-script text-5xl md:text-[9rem] text-wedding-secondary leading-none">{WEDDING_DATA.bride.fullName}</h3>
                    <div className="space-y-6">
                      <p className="font-sans text-[9px] text-wedding-secondary/40 tracking-[0.5em] uppercase font-bold">Putri Dari</p>
                      <div className="font-serif text-lg md:text-2xl text-wedding-secondary/80 space-y-1 italic font-medium tracking-tight">
                        <p>{WEDDING_DATA.bride.father}</p>
                        <p className="text-sm text-wedding-accent/40 font-sans not-italic font-light tracking-[0.3em] uppercase">dan</p>
                        <p>{WEDDING_DATA.bride.mother}</p>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              </div>
            </section>

            <Section className="bg-wedding-light relative">
              <FloatingDecorations />
              <BatikCorner position="bottom-right" animated />
              <RevealSection direction="up" className="mb-12">
                <h2 className="font-serif text-3xl md:text-5xl text-wedding-secondary italic mb-2">Momen Bahagia</h2>
                <Countdown />
              </RevealSection>
              <div className="grid md:grid-cols-2 gap-10 mt-20">
                {[
                  { title: 'Akad Nikah', ...WEDDING_DATA.event.akad, direction: 'left' },
                  { title: 'Resepsi', ...WEDDING_DATA.event.resepsi, direction: 'right' }
                ].map((ev, i) => (
                  <RevealSection key={i} direction={ev.direction as any} delay={i * 0.2}>
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="bg-white/40 p-10 md:p-16 rounded-[4rem] border border-wedding-accent/10 shadow-xl backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:bg-white"
                    >
                      <Calendar className="w-8 h-8 mx-auto text-wedding-accent mb-6 stroke-[1]" />
                      <h3 className="font-serif text-2xl font-bold text-wedding-secondary mb-6 italic">{ev.title}</h3>
                      <div className="space-y-4 text-wedding-secondary/60">
                        <p className="font-medium">{ev.dayDate}</p>
                        <p className="font-medium">{ev.time}</p>
                        <div className="pt-6 border-t border-wedding-accent/15">
                          <p className="font-serif italic text-xl md:text-2xl text-wedding-secondary mb-2">{ev.location}</p>
                          <p className="text-[10px] leading-relaxed opacity-60 uppercase tracking-wider px-4">{ev.address}</p>
                        </div>
                      </div>
                      <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={ev.mapLink} 
                        target="_blank" 
                        className="mt-10 inline-flex items-center gap-3 bg-wedding-secondary text-white px-10 py-4 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] shadow-xl"
                      >
                         <MapPin className="w-3 h-3" /> Peta Lokasi
                      </motion.a>
                    </motion.div>
                  </RevealSection>
                ))}
              </div>
            </Section>

            <Section className="bg-wedding-primary">
              <FloatingDecorations />
              <RevealSection direction="up" className="mb-8">
                <h2 className="font-serif text-3xl md:text-5xl text-wedding-secondary italic">Tanda Kasih</h2>
              </RevealSection>
              <RevealSection direction="scale">
                <p className="max-w-md mx-auto text-sm opacity-60 mb-10 px-4">Kado paling utama adalah doa restu Anda. Namun jika ingin memberikan tanda kasih, dapat melalui:</p>
                <div className="max-w-md mx-auto p-10 md:p-14 bg-white/40 rounded-[4rem] border border-wedding-accent/15 shadow-2xl space-y-12 backdrop-blur-lg">
                  <div className="flex flex-col items-center gap-6">
                    <Wallet className="w-14 h-14 text-wedding-accent stroke-[1]" />
                    <div className="space-y-2">
                      <p className="font-sans text-[9px] uppercase tracking-[0.4em] font-bold text-wedding-secondary/30">Transfer DANA</p>
                      <h3 className="font-serif text-3xl md:text-4xl font-bold text-wedding-secondary tabular-nums">{WEDDING_DATA.payment.dana.number}</h3>
                      <p className="text-xs md:text-sm text-wedding-secondary/60 italic">a.n {WEDDING_DATA.payment.dana.accountName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        navigator.clipboard.writeText(WEDDING_DATA.payment.dana.number);
                      }} 
                      className="w-full py-4 border border-wedding-accent/20 text-wedding-secondary bg-white/70 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-white"
                    >
                      <Copy className="w-4 h-4" /> Salin Nomor DANA
                    </motion.button>
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={WEDDING_DATA.payment.dana.link} 
                      target="_blank" 
                      className="w-full py-5 bg-wedding-secondary text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl flex items-center justify-center gap-3"
                    >
                      <ExternalLink className="w-3 h-3" /> Kirim via DANA
                    </motion.a>
                  </div>
                </div>
              </RevealSection>
            </Section>

            <Section className="bg-wedding-light relative">
              <RevealSection direction="up" className="mb-8">
                <h2 className="font-serif text-3xl md:text-5xl text-wedding-secondary italic">Buku Tamu</h2>
              </RevealSection>
              <UnifiedRSVPSection defaultName={guestName} />
            </Section>

            <Section className="bg-wedding-primary pb-32">
              <RevealSection direction="up" className="mb-6">
                <h2 className="font-serif text-2xl md:text-3xl text-wedding-secondary italic">Bagikan Kabar Bahagia</h2>
              </RevealSection>
              <PersonalizedShare currentGuestName={guestName} />
            </Section>

            <footer className="py-32 bg-wedding-light text-wedding-secondary text-center relative overflow-hidden border-t border-wedding-accent/10">
              <FloatingDecorations />
              <BatikCorner position="top-left" animated />
              <BatikCorner position="top-right" animated />
              <div className="relative z-10">
                <motion.h2 
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="font-script text-7xl md:text-[11rem] mb-10 text-wedding-accent"
                >{WEDDING_DATA.groom.nickname} & {WEDDING_DATA.bride.nickname}</motion.h2>
                <BatikDivider animated />
                <p className="font-serif italic text-lg opacity-75 px-10 max-w-xl mx-auto leading-relaxed">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.</p>
                <div className="mt-20">
                  <FlowerOrnament className="w-12 h-12 mb-6 opacity-20" />
                  <p className="font-sans text-[8px] opacity-30 tracking-[0.5em] uppercase font-bold">Wassalamualaikum Warahmatullahi Wabarakatuh</p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        :root { 
          scroll-behavior: smooth;
          -webkit-tap-highlight-color: transparent;
        }
        body { 
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f9f6ee; }
        ::-webkit-scrollbar-thumb { background: #dcd7ca; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #B8860B; }
      `}} />
    </div>
  );
};

export default App;