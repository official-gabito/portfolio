import { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  price: string;
  icon: string;
  features: string[];
  notIncluded: string[];
  deliveryTime: string;
  isPopular?: boolean;
  onRequestNow: () => void;
  index: number;
}

export default function ServiceCard({
  title,
  price,
  icon,
  features,
  notIncluded,
  deliveryTime,
  isPopular = false,
  onRequestNow,
  index
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Card animation variants
  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 80,
        delay: 0.15 * index
      }
    }
  };
  
  // Badge animation variants
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -15 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        delay: 0.3 + (0.15 * index), 
        duration: 0.6,
        type: "spring",
        stiffness: 200
      } 
    }
  };
  
  // Staggered list item animations
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2 + (0.1 * index)
      }
    }
  };
  
  const listItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className="service-card glass enhanced-card relative rounded-2xl overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -15, 
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Price tag ribbon */}
      <div className="absolute -right-12 top-12 rotate-45 z-20">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-1 px-12 shadow-lg text-center text-sm font-medium">
          {price}
        </div>
      </div>
      
      {/* Popular badge */}
      {isPopular && (
        <motion.div 
          className="absolute -top-5 -left-5 z-20"
          variants={badgeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white py-1 px-6 rotate-[-45deg] shadow-lg text-sm font-medium">
            Popular
          </div>
        </motion.div>
      )}
      
      {/* Card content with glassmorphism */}
      <div className="p-8 relative z-10">
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.2 + (0.1 * index), duration: 0.5 }}
        >
          {/* Animated circle background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut" 
            }}
          />
          
          {/* Icon container */}
          <div className="absolute inset-0 glass flex items-center justify-center text-primary text-3xl rounded-full">
            <motion.i 
              className={icon}
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            ></motion.i>
          </div>
        </motion.div>
        
        <motion.h3 
          className="font-heading text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.3 + (0.1 * index), duration: 0.4 }}
        >
          {title}
        </motion.h3>
        
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.4 + (0.1 * index), duration: 0.5 }}
        >
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium block">STARTING AT</span>
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{price}</span>
        </motion.div>
        
        <motion.ul 
          className="space-y-3 mb-8"
          variants={listContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, idx) => (
            <motion.li 
              key={`feature-${idx}`} 
              className="flex items-center gap-3"
              variants={listItemVariants}
            >
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-check text-green-500 text-xs"></i>
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
            </motion.li>
          ))}
          
          {notIncluded.map((feature, idx) => (
            <motion.li 
              key={`not-included-${idx}`} 
              className="flex items-center gap-3"
              variants={listItemVariants}
            >
              <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-times text-red-500 text-xs"></i>
              </div>
              <span className="text-gray-500 dark:text-gray-500 line-through text-sm">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 + (0.1 * index), duration: 0.5 }}
        >
          <div className="glass inline-block px-4 py-2 rounded-full mb-4">
            <p className="text-primary font-medium text-sm">
              <i className="far fa-clock mr-2"></i>
              Delivery: {deliveryTime}
            </p>
          </div>
          <motion.button 
            className="px-8 py-3 w-full radial-button text-white rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            onClick={onRequestNow}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Request Now
          </motion.button>
        </motion.div>
      </div>
      
      {/* Decorative background gradient */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-blue-50/5 to-transparent dark:from-blue-900/5 pointer-events-none z-0" />
    </motion.div>
  );
}
