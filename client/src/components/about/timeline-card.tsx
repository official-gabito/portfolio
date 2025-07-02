import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  subtitle: string;
}

interface TimelineCardProps {
  title: string;
  icon: string;
  items: TimelineItem[];
}

export default function TimelineCard({
  title,
  icon,
  items,
}: TimelineCardProps) {
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      className="bg-card border border-border p-6 rounded-lg shadow-md hover:shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-shadow duration-300"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        <i className={icon}></i>
      </div>
      <h4 className="font-heading text-xl font-bold mb-2">{title}</h4>
      <ul className="space-y-4 mt-4">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex gap-3"
            custom={index}
            variants={itemVariants}
          >
            <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs">
              <i className="fas fa-check"></i>
            </div>
            <div>
              <h5 className="font-medium">{item.title}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.subtitle}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
