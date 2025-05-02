import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  sourceUrl: string;
  demoUrl: string;
  index: number;
}

export default function ProjectCard({
  image,
  title,
  description,
  tags,
  category,
  sourceUrl,
  demoUrl,
  index
}: ProjectCardProps) {
  // 3D tilt effect setup
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  
  // Create smooth motion values with springs
  const springConfig = { stiffness: 150, damping: 15 };
  const motionRotateX = useSpring(useMotionValue(0), springConfig);
  const motionRotateY = useSpring(useMotionValue(0), springConfig);
  const motionScale = useSpring(useMotionValue(1), springConfig);
  
  // Parallax effect for different card elements
  const titleY = useTransform(motionRotateX, [10, -10], [-5, 5]);
  const imageY = useTransform(motionRotateX, [10, -10], [-15, 15]);
  const tagsX = useTransform(motionRotateY, [10, -10], [-5, 5]);
  
  // Update motion values when state changes
  useEffect(() => {
    motionRotateX.set(rotateX);
    motionRotateY.set(rotateY);
    motionScale.set(scale);
  }, [rotateX, rotateY, scale, motionRotateX, motionRotateY, motionScale]);
  
  // Event handlers for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateXFactor = 15; // Max rotation in degrees
    const rotateYFactor = 15;
    
    const newRotateY = ((mouseX - centerX) / (rect.width / 2)) * rotateYFactor;
    const newRotateX = ((centerY - mouseY) / (rect.height / 2)) * rotateXFactor;
    
    setRotateX(newRotateX);
    setRotateY(newRotateY);
    setScale(1.05);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };
  
  // Animation variants for the card's entrance
  const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.1 * index
      }
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      className="tilt-card enhanced-card project-card bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      style={{ 
        transform: `perspective(1000px) rotateX(${motionRotateX}deg) rotateY(${motionRotateY}deg) scale(${motionScale})`,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 transition-opacity duration-300 rounded-xl z-0" />
      
      {/* Project image with parallax effect */}
      <motion.div 
        className="relative h-56 overflow-hidden"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10"
        />
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ 
            y: imageY,
            scale: 1.1
          }}
        />
        <motion.div 
          className="absolute top-3 right-3 z-20 glass"
          style={{ transform: "translateZ(40px)" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="px-4 py-1.5 text-primary font-medium text-xs rounded-full block">{category}</span>
        </motion.div>
      </motion.div>
      
      {/* Card content with 3D effect */}
      <div className="p-6 tilt-card-content" style={{ transform: "translateZ(30px)" }}>
        <motion.h3 
          className="font-heading text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700"
          style={{ y: titleY }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-4 text-sm"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(5px)" }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-2 mb-6"
          style={{ x: tagsX, transformStyle: "preserve-3d", transform: "translateZ(15px)" }}
        >
          {tags.map((tag, idx) => (
            <motion.span 
              key={idx} 
              className="glass px-3 py-1 text-xs rounded-full"
              whileHover={{ scale: 1.1, y: -2 }}
              initial={{ opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex justify-between"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(25px)" }}
        >
          <motion.a 
            href={sourceUrl} 
            className="magnetic-button glass px-4 py-2 rounded-full text-primary flex items-center gap-1 text-sm hover:shadow-lg transition-all"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" 
            }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
            <span>Source Code</span>
          </motion.a>
          
          <motion.a 
            href={demoUrl} 
            className="magnetic-button radial-button px-4 py-2 rounded-full text-white flex items-center gap-1 text-sm hover:shadow-lg transition-all"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-external-link-alt"></i>
            <span>Live Demo</span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
