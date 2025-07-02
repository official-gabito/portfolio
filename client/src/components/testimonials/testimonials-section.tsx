import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Testimonial data type
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  project?: string;
}

// Enhanced testimonial data with more details
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "CEO & Founder",
    company: "TechStart Inc.",
    avatar: "",
    rating: 5,
    text: "Gabriel created an incredible mobile app for our startup that exceeded all expectations. His attention to detail, technical expertise, and ability to translate our vision into a beautiful, functional product was remarkable. The app launched successfully and has been crucial to our growth.",
    project: "Mobile App Development",
  },
  {
    id: "2",
    name: "Michael Chang",
    position: "Product Manager",
    company: "InnovateX Solutions",
    avatar: "",
    rating: 5,
    text: "Working with Gabriel was transformative for our product development. His expertise in Flutter and React allowed us to deploy across multiple platforms simultaneously, cutting our development time in half while maintaining exceptional quality and performance.",
    project: "Cross-Platform Development",
  },
  {
    id: "3",
    name: "Olivia Martinez",
    position: "Marketing Director",
    company: "GrowthBrand Agency",
    avatar: "",
    rating: 5,
    text: "Gabriel completely revamped our website with stunning animations and a sleek, modern interface. The result speaks for itself - our site is now lightning-fast, fully responsive, and our conversion rate has improved by 40%. Outstanding work!",
    project: "Website Redesign",
  },
  {
    id: "4",
    name: "David Wilson",
    position: "Founder",
    company: "EduTech Solutions",
    avatar: "",
    rating: 5,
    text: "Gabriel developed a comprehensive learning management system that has become the backbone of our educational platform. The real-time features, intuitive interface, and scalable architecture have received overwhelmingly positive feedback from thousands of users.",
    project: "Custom LMS Development",
  },
  {
    id: "5",
    name: "Emma Brooks",
    position: "Senior UX Designer",
    company: "DesignHub Studio",
    avatar: "",
    rating: 5,
    text: "As a designer, I deeply appreciate developers who understand the importance of pixel-perfect implementation. Gabriel not only matched our designs flawlessly but also suggested thoughtful micro-interactions that elevated the entire user experience.",
    project: "UI/UX Implementation",
  },
  {
    id: "6",
    name: "James Rodriguez",
    position: "CTO",
    company: "FinanceFlow",
    avatar: "",
    rating: 5,
    text: "Gabriel delivered a robust financial dashboard with complex data visualizations and real-time updates. His code quality, attention to security, and ability to handle intricate business logic made him an invaluable partner for our fintech project.",
    project: "Financial Dashboard",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-rotation of testimonials
  useEffect(() => {
    if (autoplay) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % testimonials.length;
          setDirection(1);
          return newIndex;
        });
      }, 6000);
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
    if (index !== activeIndex) {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      setAutoplay(false);
      setTimeout(() => setAutoplay(true), 8000);
    }
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % testimonials.length;
    setDirection(1);
    setActiveIndex(newIndex);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  const handlePrev = () => {
    const newIndex =
      (activeIndex - 1 + testimonials.length) % testimonials.length;
    setDirection(-1);
    setActiveIndex(newIndex);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 8000);
  };

  // Generate star ratings with animations
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <svg
              className={`w-5 h-5 ${
                i < rating ? "text-amber-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.div>
        ))}
      </div>
    );
  };

  // Generate elegant initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
        duration: 0.6,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 35,
        duration: 0.4,
      },
    }),
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/40 dark:from-blue-900/20 dark:to-indigo-900/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-200/40 to-pink-300/40 dark:from-purple-900/20 dark:to-pink-900/30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-bl from-cyan-200/30 to-blue-300/30 dark:from-cyan-900/15 dark:to-blue-900/25 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Enhanced Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Client Testimonials
            </motion.div>

            <motion.h2
              className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              What Clients Say
            </motion.h2>

            <motion.p
              className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover how I've helped businesses transform their digital
              presence and achieve their goals through innovative development
              solutions.
            </motion.p>
          </motion.div>

          {/* Enhanced Testimonial Carousel */}
          <motion.div variants={itemVariants} className="relative">
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 z-20">
              <motion.button
                className="group p-4 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>
            </div>

            <div className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 z-20">
              <motion.button
                className="group p-4 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl border border-white/20 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <svg
                  className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Main Testimonial Card */}
            <div className="px-8 md:px-16 py-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative"
                >
                  {/* Testimonial Card */}
                  <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 md:p-12 max-w-5xl mx-auto overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                    <motion.div
                      className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        {/* Avatar Section */}
                        <div className="flex-shrink-0">
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl overflow-hidden">
                              {currentTestimonial.avatar ? (
                                <img
                                  src={currentTestimonial.avatar}
                                  alt={currentTestimonial.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                getInitials(currentTestimonial.name)
                              )}
                            </div>
                            <motion.div
                              className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 0.3,
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <svg
                                className="w-4 h-4 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 text-center lg:text-left">
                          {/* Project Badge */}
                          {currentTestimonial.project && (
                            <motion.div
                              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mb-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1zm0 5a1 1 0 011 1v.01a1 1 0 11-2 0V9a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {currentTestimonial.project}
                            </motion.div>
                          )}

                          {/* Quote Mark */}
                          <motion.div
                            className="text-6xl md:text-7xl text-gradient bg-gradient-to-br from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4 leading-none opacity-60"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.6, scale: 1 }}
                            transition={{
                              delay: 0.1,
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
                            "
                          </motion.div>

                          {/* Testimonial Text */}
                          <motion.p
                            className="text-slate-700 dark:text-slate-300 mb-6 text-lg md:text-xl leading-relaxed font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                          >
                            {currentTestimonial.text}
                          </motion.p>

                          {/* Rating */}
                          <motion.div
                            className="flex justify-center lg:justify-start mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                          >
                            {renderStars(currentTestimonial.rating)}
                          </motion.div>

                          {/* Client Info */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                          >
                            <h4 className="font-bold text-xl md:text-2xl text-slate-800 dark:text-white mb-1">
                              {currentTestimonial.name}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">
                              {currentTestimonial.position}
                            </p>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                              {currentTestimonial.company}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Pagination Dots */}
            <div className="flex justify-center mt-12 gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`relative transition-all duration-300 ${
                    index === activeIndex ? "w-12 h-3" : "w-3 h-3 hover:w-6"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div
                    className={`w-full h-full rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                        : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                    }`}
                  />
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-50"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="flex justify-center mt-8">
              <div className="w-64 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: autoplay ? "100%" : "0%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={activeIndex}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
