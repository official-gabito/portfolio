import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategoryProps {
  title: string;
  icon: string;
  skills: Skill[];
}

export default function SkillCategory({ title, icon, skills }: SkillCategoryProps) {
  const categoryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(categoryRef, { once: true, amount: 0.3 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.7 
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  // Container for staggered skill animations
  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  // Each skill item animation
  const skillItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Progress bar animation
  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1.2, ease: "easeOut" }
    })
  };

  // Particles animation for selected skill
  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: [0, 1, 0],
      transition: { 
        delay: 0.05 * index,
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.5
      }
    })
  };

  return (
    <motion.div 
      ref={categoryRef}
      className="glass enhanced-card p-8 rounded-2xl relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-blue-600/5 mix-blend-overlay pointer-events-none" />
      
      {/* Header section with icon and title */}
      <div className="flex items-center gap-5 mb-8">
        <motion.div 
          className="relative w-14 h-14"
          variants={iconVariants}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut" 
            }}
          />
          <div className="glass absolute inset-0 rounded-full flex items-center justify-center text-primary text-2xl">
            <motion.i 
              className={icon}
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            ></motion.i>
          </div>
        </motion.div>
        
        <motion.h3 
          className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"
          variants={titleVariants}
        >
          {title}
        </motion.h3>
      </div>
      
      {/* Skills list with animated progress bars */}
      <motion.div 
        className="space-y-6"
        variants={skillsContainerVariants}
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={index} 
            className="relative"
            variants={skillItemVariants}
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="flex justify-between mb-2">
              <motion.span 
                className="font-medium"
                whileHover={{ color: "#3b82f6", x: 3 }}
                transition={{ duration: 0.2 }}
              >
                {skill.name}
              </motion.span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (0.1 * index) }}
              >
                <span className="glass px-2 py-1 rounded-full text-xs font-bold text-primary">
                  {skill.percentage}%
                </span>
              </motion.div>
            </div>
            
            {/* Custom progress bar with gradient and glow effect */}
            <div className="w-full h-3 bg-gray-200/40 dark:bg-gray-700/40 rounded-full overflow-hidden relative">
              {/* Animated particles for hovered skill */}
              <AnimatePresence>
                {hoveredSkill === index && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute top-1/2 w-1.5 h-1.5 bg-white rounded-full z-10"
                        style={{ 
                          left: `${Math.min((skill.percentage * (i+1) / 6), skill.percentage)}%`,
                          translateY: "-50%" 
                        }}
                        variants={particleVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                        exit={{ opacity: 0, scale: 0 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
              
              {/* Main progress bar */}
              <motion.div 
                className="h-full rounded-full relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(90deg, #2563eb ${Math.max(0, skill.percentage-10)}%, #60a5fa ${Math.min(100, skill.percentage+10)}%)`,
                  boxShadow: hoveredSkill === index ? "0 0 15px rgba(59, 130, 246, 0.5)" : "none"
                }}
                variants={progressBarVariants}
                custom={skill.percentage}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ y: -1 }}
              >
                {/* Animated gradient shimmer effect */}
                <motion.div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                    backgroundSize: "200% 100%"
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
