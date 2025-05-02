import { motion } from 'framer-motion';

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
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        delay: 0.1 * index
      }
    }
  };

  return (
    <motion.div 
      className="project-card bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg"
      variants={cardVariants}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">{category}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between">
          <motion.a 
            href={sourceUrl} 
            className="text-primary hover:underline flex items-center gap-1 text-sm"
            whileHover={{ x: -2 }}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
            <span>Source Code</span>
          </motion.a>
          <motion.a 
            href={demoUrl} 
            className="text-primary hover:underline flex items-center gap-1 text-sm"
            whileHover={{ x: 2 }}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-external-link-alt"></i>
            <span>Live Demo</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
