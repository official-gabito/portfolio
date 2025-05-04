import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedLoaderProps {
  initialLoading?: boolean;
}

export default function AnimatedLoader({ initialLoading = true }: AnimatedLoaderProps) {
  const [loading, setLoading] = useState(initialLoading);
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    if (!loading) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down progress as it gets closer to 100%
        const increment = prev < 50 ? 5 : prev < 75 ? 3 : prev < 90 ? 1 : 0.5;
        const newProgress = Math.min(prev + increment, 100);
        
        // When we reach 100%, trigger exit animation
        if (newProgress >= 100) {
          setTimeout(() => {
            setLoading(false);
          }, 500); // Delay before hiding loader
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [loading]);
  
  // Animation variants
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };
  
  const logoVariants = {
    initial: { 
      scale: 0.8,
      opacity: 0 
    },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      }
    }
  };
  
  const pathVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0 
    },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { 
        pathLength: { 
          type: "spring",
          duration: 1.5,
          bounce: 0,
          delay: 0.2 + (i * 0.2) 
        },
        opacity: { 
          duration: 0.3,
          delay: 0.2 + (i * 0.2)
        }
      }
    })
  };
  
  // Progress bar animation
  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-dark-bg"
        >
          <div className="relative">
            {/* Animated GN logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              className="relative w-32 h-32 mb-8"
            >
              {/* Custom animated SVG logo */}
              <svg
                width="128"
                height="128"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* G Letter */}
                <motion.path
                  d="M35,30 C25,30 20,40 20,50 C20,60 25,70 35,70 C45,70 50,60 40,50 L35,50 L35,60 C30,60 30,40 35,40 C40,40 45,45 45,50 L55,50 C55,40 45,30 35,30 Z"
                  stroke="url(#gradient-1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={pathVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  className="dark:stroke-white"
                />
                
                {/* N Letter */}
                <motion.path
                  d="M60,30 L60,70 L70,70 L70,45 L80,65 L90,65 L90,30 L80,30 L80,55 L70,35 L60,30 Z"
                  stroke="url(#gradient-2)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={pathVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="dark:stroke-white"
                />
                
                {/* Circle around letters */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient-3)"
                  strokeWidth="2"
                  variants={pathVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  className="dark:stroke-white"
                />
                
                {/* Gradients for strokes */}
                <defs>
                  <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                  <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                  <linearGradient id="gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Particles for decoration */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    x: Math.sin(i * 60 * Math.PI / 180) * 60,
                    y: Math.cos(i * 60 * Math.PI / 180) * 60,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: 1 + (i * 0.2),
                    repeat: Infinity,
                    repeatType: "loop",
                    times: [0, 0.5, 1]
                  }}
                />
              ))}
            </motion.div>
            
            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="font-heading text-xl font-bold mb-1">
                Gabriel Naandum
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {progress < 100 ? 'Loading Portfolio...' : 'Ready!'}
              </p>
              
              {/* Progress bar */}
              <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-primary"
                  variants={progressVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
              
              {/* Loading percentage */}
              <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {Math.round(progress)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}