import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface CustomAlertProps {
  show: boolean;
  type: AlertType;
  title: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
  position?: 'top' | 'bottom';
}

export default function CustomAlert({
  show,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
  position = 'top'
}: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(show);

  // Handle auto close
  useEffect(() => {
    setIsVisible(show);
    
    let timer: NodeJS.Timeout;
    if (show && autoClose) {
      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(), 500); // Allow exit animation to complete
      }, autoCloseTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show, autoClose, autoCloseTime, onClose]);

  // Color and icon mapping based on type
  const alertConfig = {
    success: {
      bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
      iconClass: 'fas fa-check-circle',
      progressColor: 'bg-green-100',
    },
    error: {
      bgColor: 'bg-gradient-to-r from-red-500 to-rose-500',
      iconClass: 'fas fa-exclamation-circle',
      progressColor: 'bg-red-100',
    },
    warning: {
      bgColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
      iconClass: 'fas fa-exclamation-triangle',
      progressColor: 'bg-amber-100',
    },
    info: {
      bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      iconClass: 'fas fa-info-circle',
      progressColor: 'bg-blue-100',
    },
  };

  const config = alertConfig[type];
  
  // Positioning classes
  const positionClasses = position === 'top' 
    ? 'top-4 rounded-xl' 
    : 'bottom-4 rounded-xl';

  // Variants for animations
  const alertVariants = {
    hidden: { 
      opacity: 0, 
      y: position === 'top' ? -30 : 30,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-md',
            positionClasses
          )}
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={cn(
            'relative shadow-lg rounded-xl overflow-hidden text-white',
            config.bgColor
          )}>
            {/* Content */}
            <div className="p-4 pr-12 flex items-start">
              <div className="flex-shrink-0 mr-4 text-2xl">
                <i className={config.iconClass}></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-sm opacity-90">{message}</p>
              </div>
              
              {/* Close button */}
              <button 
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => onClose(), 300);
                }}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                aria-label="Close alert"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            {/* Auto-close progress bar */}
            {autoClose && (
              <motion.div 
                className="h-1 w-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: autoCloseTime / 1000, ease: "linear" }}
              >
                <div className={cn("h-full opacity-30", config.progressColor)}></div>
              </motion.div>
            )}
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-20 bg-white"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 -ml-8 -mb-8 rounded-full opacity-10 bg-white"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}