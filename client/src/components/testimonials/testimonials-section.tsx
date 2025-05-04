import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Testimonial data type
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

// Sample testimonial data
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'TechStart',
    avatar: '', // If you have real avatars, replace these with paths
    rating: 5,
    text: 'Gabriel created an incredible mobile app for our startup. His attention to detail and UI expertise made our vision come to life better than we imagined.'
  },
  {
    id: '2',
    name: 'Michael Chang',
    position: 'Product Manager',
    company: 'InnovateX',
    avatar: '',
    rating: 5,
    text: 'Working with Gabriel was a game-changer for our product. His Flutter and React skills allowed us to deploy on multiple platforms simultaneously, saving us time and resources.'
  },
  {
    id: '3',
    name: 'Olivia Martinez',
    position: 'Marketing Director',
    company: 'GrowthBrand',
    avatar: '',
    rating: 4,
    text: 'Gabriel revamped our website with modern animations and a sleek UI. The site is now significantly faster, mobile-friendly, and our conversion rate has improved by 40%!'
  },
  {
    id: '4',
    name: 'David Wilson',
    position: 'Founder',
    company: 'EduTech Solutions',
    avatar: '',
    rating: 5,
    text: 'Gabriel developed a custom learning management system for us using React and Firebase. The real-time features and intuitive interface have received extremely positive feedback from our users.'
  },
  {
    id: '5',
    name: 'Emma Brooks',
    position: 'UX Designer',
    company: 'DesignHub',
    avatar: '',
    rating: 5,
    text: 'As a designer, I appreciate developers who care about implementing designs with precision. Gabriel not only matched our designs perfectly but also suggested subtle animations that enhanced the overall experience.'
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle auto-rotation of testimonials
  useEffect(() => {
    if (autoplay) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  // Handle manual navigation
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    // Temporarily pause autoplay when manually navigating
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };
  
  // Generate star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <i 
            key={i} 
            className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          ></i>
        ))}
      </div>
    );
  };
  
  // Generate initials from name if no avatar is available
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    })
  };
  
  // Keep track of slide direction for animation
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  
  const handleNext = () => {
    setCurrentIndex([
      (currentIndex + 1) % testimonials.length,
      1
    ]);
    setActiveIndex((activeIndex + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex([
      (currentIndex - 1 + testimonials.length) % testimonials.length,
      -1
    ]);
    setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="py-20 bg-gray-50 dark:bg-dark-bg relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decoration */}
      <motion.div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-50"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      <motion.div 
        className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-100 dark:bg-indigo-900/20 blur-3xl opacity-50"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.span 
              className="text-primary font-medium block mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              What Clients Say
            </motion.span>
            <motion.h2 
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Testimonials
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Feedback from clients I've worked with on various projects
            </motion.p>
          </motion.div>
          
          {/* Testimonial Carousel */}
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden py-8"
          >
            <div className="testimonial-carousel relative">
              {/* Navigation Arrows */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                <motion.button
                  className="p-3 rounded-full bg-white dark:bg-dark-card shadow-lg text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <i className="fas fa-chevron-left"></i>
                </motion.button>
              </div>
              
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                <motion.button
                  className="p-3 rounded-full bg-white dark:bg-dark-card shadow-lg text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <i className="fas fa-chevron-right"></i>
                </motion.button>
              </div>
              
              {/* Active Testimonial */}
              <div className="px-12 md:px-16">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="testimonial-card glass p-8 rounded-2xl shadow-lg max-w-4xl mx-auto"
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* Avatar or Initials */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                          {testimonials[currentIndex].avatar ? (
                            <img 
                              src={testimonials[currentIndex].avatar} 
                              alt={testimonials[currentIndex].name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getInitials(testimonials[currentIndex].name)
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        {/* Quote Mark */}
                        <div className="text-5xl text-primary/20 dark:text-primary/30 mb-4 md:mb-2 leading-none">
                          <i className="fas fa-quote-left"></i>
                        </div>
                        
                        {/* Testimonial Text */}
                        <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg italic leading-relaxed">
                          "{testimonials[currentIndex].text}"
                        </p>
                        
                        {/* Rating */}
                        <div className="flex justify-center md:justify-start mt-2 mb-3">
                          {renderStars(testimonials[currentIndex].rating)}
                        </div>
                        
                        {/* Client Info */}
                        <div>
                          <h4 className="font-heading font-semibold text-xl">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}