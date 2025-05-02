import { motion } from 'framer-motion';

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
      className="service-card bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg relative"
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground py-1 px-4 text-sm font-medium">Popular</div>
        </div>
      )}
      <div className="p-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl mb-6 mx-auto">
          <i className={icon}></i>
        </div>
        <h3 className="font-heading text-xl font-bold mb-4 text-center">{title}</h3>
        <div className="text-3xl font-bold text-center mb-6">{price}</div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <i className="fas fa-check text-green-500"></i>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </li>
          ))}
          {notIncluded.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <i className="fas fa-times text-red-500"></i>
              <span className="text-gray-500 line-through">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">Delivery: {deliveryTime}</p>
          <motion.button 
            className="px-6 py-3 w-full bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
            onClick={onRequestNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
