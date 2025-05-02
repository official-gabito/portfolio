import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '@/data/profile-data';

export default function HeroSection() {
  const [typewriterText, setTypewriterText] = useState('');
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
    <section id="home" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div 
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-primary font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Welcome to my portfolio
            </motion.p>
            <motion.h1 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Hi, I'm <span className="text-primary">Gabriel Naandum</span>
            </motion.h1>
            <div className="h-10">
              <motion.p 
                className="typing-text inline-block font-code text-xl md:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {typewriterText}
              </motion.p>
            </div>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              I build beautiful, responsive, and performant web and mobile applications 
              with a focus on user experience and clean code.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.a 
                href="#projects" 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto relative">
              <motion.div 
                className="absolute inset-0 bg-primary rounded-full opacity-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut" 
                }}
              />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Gabriel Naandum" 
                className="rounded-full w-full h-full object-cover border-4 border-primary p-1"
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white dark:bg-dark-card p-3 rounded-full shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl">
                  <i className="fab fa-react"></i>
                </div>
              </motion.div>
              <motion.div 
                className="absolute -top-4 -left-4 bg-white dark:bg-dark-card p-3 rounded-full shadow-lg"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl">
                  <i className="fab fa-flutter"></i>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.a 
            href="#about" 
            className="text-primary text-3xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <i className="fas fa-chevron-down"></i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
