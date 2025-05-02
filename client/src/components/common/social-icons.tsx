import { motion } from 'framer-motion';
import { profileData } from '@/data/profile-data';

interface SocialIconsProps {
  className?: string;
}

export default function SocialIcons({ className = 'flex space-x-4' }: SocialIconsProps) {
  const iconVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
        ease: 'easeOut'
      }
    }),
    hover: { 
      scale: 1.2, 
      color: 'hsl(var(--primary))',
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={className}>
      <motion.a 
        href={profileData.socials.github} 
        target="_blank"
        rel="noreferrer"
        className="social-icon text-gray-400 hover:text-primary"
        custom={0}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={iconVariants}
      >
        <i className="fab fa-github"></i>
      </motion.a>
      <motion.a 
        href={profileData.socials.linkedin} 
        target="_blank"
        rel="noreferrer"
        className="social-icon text-gray-400 hover:text-primary"
        custom={1}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={iconVariants}
      >
        <i className="fab fa-linkedin"></i>
      </motion.a>
      <motion.a 
        href={profileData.socials.twitter} 
        target="_blank"
        rel="noreferrer"
        className="social-icon text-gray-400 hover:text-primary"
        custom={2}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={iconVariants}
      >
        <i className="fab fa-twitter"></i>
      </motion.a>
      <motion.a 
        href={profileData.socials.instagram} 
        target="_blank"
        rel="noreferrer"
        className="social-icon text-gray-400 hover:text-primary"
        custom={3}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={iconVariants}
      >
        <i className="fab fa-instagram"></i>
      </motion.a>
      <motion.a 
        href={profileData.socials.whatsapp} 
        target="_blank"
        rel="noreferrer"
        className="social-icon text-gray-400 hover:text-primary"
        custom={4}
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={iconVariants}
      >
        <i className="fab fa-whatsapp"></i>
      </motion.a>
    </div>
  );
}
