import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillCategory from './skill-category';
import { profileData } from '@/data/profile-data';

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const techIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1 * index,
        duration: 0.4
      }
    }),
    hover: {
      scale: 1.1,
      color: 'hsl(var(--primary))',
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">My <span className="text-primary">Skills</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            With expertise in both frontend and backend technologies, I create seamless, responsive 
            applications with a focus on user experience and performance.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SkillCategory 
            title="Frontend"
            icon="fas fa-laptop-code"
            skills={profileData.skills_categories.frontend}
          />
          
          <SkillCategory 
            title="Mobile"
            icon="fas fa-mobile-alt"
            skills={profileData.skills_categories.mobile}
          />
          
          <SkillCategory 
            title="Backend"
            icon="fas fa-server"
            skills={profileData.skills_categories.backend}
          />
        </motion.div>
        
       
      </div>
    </section>
  );
}
