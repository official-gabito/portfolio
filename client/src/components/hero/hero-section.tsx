import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profileData } from '@/data/profile-data';

// SVG wave component
const WaveSVG = () => (
  <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
    <defs>
      <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
    </defs>
    <g className="parallax">
      <use xlinkHref="#gentle-wave" x="48" y="0" />
      <use xlinkHref="#gentle-wave" x="48" y="3" />
      <use xlinkHref="#gentle-wave" x="48" y="5" />
      <use xlinkHref="#gentle-wave" x="48" y="7" />
    </g>
  </svg>
);

// Magnetic button effect hook
const useMagneticEffect = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const magneticPull = 0.4; // Strength of the magnetic effect
      button.style.transform = `translate(${x * magneticPull}px, ${y * magneticPull}px)`;
    };
    
    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return buttonRef;
};

export default function HeroSection() {
  const [typewriterText, setTypewriterText] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Create parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Magnetic buttons
  const viewWorkButtonRef = useMagneticEffect();
  const contactButtonRef = useMagneticEffect();
  
  const typewriterRef = useRef<{ phrases: string[], currentPhraseIndex: number, currentLetterIndex: number, isDeleting: boolean }>({
    phrases: profileData.skills,
    currentPhraseIndex: 0,
    currentLetterIndex: 0,
    isDeleting: false
  });

  useEffect(() => {
    const typeText = () => {
      const { phrases, currentPhraseIndex, currentLetterIndex, isDeleting } = typewriterRef.current;
      const currentPhrase = phrases[currentPhraseIndex];
      
      // Set the delay based on the current action
      let typingSpeed = 100;
      if (isDeleting) {
        typingSpeed = 50;
      } else if (currentLetterIndex === currentPhrase.length) {
        typingSpeed = 1000; // Pause at end of phrase
      } else if (currentLetterIndex === 0) {
        typingSpeed = 500; // Pause before starting new phrase
      }
      
      // Update text
      if (isDeleting) {
        setTypewriterText(currentPhrase.substring(0, currentLetterIndex - 1));
        typewriterRef.current.currentLetterIndex -= 1;
      } else {
        setTypewriterText(currentPhrase.substring(0, currentLetterIndex + 1));
        typewriterRef.current.currentLetterIndex += 1;
      }
      
      // Change direction or move to next phrase
      if (!isDeleting && currentLetterIndex === currentPhrase.length) {
        typewriterRef.current.isDeleting = true;
      } else if (isDeleting && currentLetterIndex === 0) {
        typewriterRef.current.isDeleting = false;
        typewriterRef.current.currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      }
      
      // Schedule the next update
      setTimeout(typeText, typingSpeed);
    };
    
    // Start the typewriter effect with a small delay
    const timeout = setTimeout(typeText, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Floating shapes with reduced opacity */}
      <div className="floating-shape shape-1 opacity-30"></div>
      <div className="floating-shape shape-2 opacity-30"></div>
      <div className="floating-shape shape-3 opacity-30"></div>
      
      {/* Content container with increased spacing */}
      <div className="container mx-auto px-6 relative z-10 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            className="lg:w-1/2 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity }}
          >
            <motion.div
              className="glass p-8 rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <motion.p 
                className="text-primary font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Welcome to my portfolio
              </motion.p>
              <motion.h1 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Hi, I'm <span className="text-primary">Gabriel Naandum</span>
              </motion.h1>
              <div className="h-16 mt-4">
                <motion.p 
                  className="typing-text inline-block font-code text-xl md:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {typewriterText}
                </motion.p>
              </div>
              <motion.p 
                className="text-gray-800 dark:text-gray-200 text-lg max-w-xl mx-auto lg:mx-0 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                I build beautiful, responsive, and performant web and mobile applications 
                with a focus on user experience and clean code.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.a 
                ref={viewWorkButtonRef}
                href="#projects" 
                className="magnetic-button px-8 py-4 bg-primary text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a 
                ref={contactButtonRef}
                href="#contact" 
                className="magnetic-button glass px-8 py-4 border border-blue-400/20 text-primary rounded-full font-medium hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] mx-auto relative">
              {/* Subtle animated outer ring */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-blue-600/30 rounded-full"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 3, 0, -3, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 8,
                  ease: "easeInOut" 
                }}
              />
              
              {/* Profile image container - larger and more prominent */}
              <motion.div
                className="relative w-full h-full p-2 z-10"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="glass w-full h-full rounded-full p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="Gabriel Naandum" 
                    className="rounded-full w-full h-full object-cover border-2 border-white/20"
                  />
                </div>
              </motion.div>
              
              {/* Repositioned floating tech badges to avoid overlapping the image */}
              <motion.div 
                className="absolute -bottom-5 -right-5 glass p-3 rounded-2xl shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-2xl">
                  <i className="fab fa-react"></i>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-5 -left-5 glass p-3 rounded-2xl shadow-xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-2xl">
                  <i className="fab fa-flutter"></i>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 right-0 translate-x-1/2 glass p-3 rounded-2xl shadow-xl"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-2xl">
                  <i className="fab fa-bootstrap"></i>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator - repositioned to avoid overlapping content */}
        <motion.div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <motion.a 
            href="#about" 
            className="glass px-5 py-3 rounded-full flex items-center gap-2 text-primary"
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <i className="fas fa-chevron-down"></i>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Wave SVG at the bottom */}
      <WaveSVG />
    </section>
  );
}
