import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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
  const isInView = useInView(categoryRef, { once: true, amount: 0.5 });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1.5, delay: 0.3, ease: "easeOut" }
    })
  };

  return (
    <motion.div 
      ref={categoryRef}
      className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md"
      variants={cardVariants}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
          <i className={icon}></i>
        </div>
        <h3 className="font-heading text-xl font-bold">{title}</h3>
      </div>
      
      {skills.map((skill, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-medium">{skill.name}</span>
            <span>{skill.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <motion.div 
              className="bg-primary h-2.5 rounded-full"
              variants={skillBarVariants}
              custom={skill.percentage}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            ></motion.div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
