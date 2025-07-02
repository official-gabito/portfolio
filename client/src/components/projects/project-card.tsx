import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  sourceUrl: string;
  demoUrl: string;
  index: number;
  // New enhanced props
  images?: string[];
  longDescription?: string;
  techStack?: string[];
  features?: string[];
  challenges?: string[];
  onViewDetails?: (project: any) => void;
}

export default function ProjectCard({
  image,
  title,
  description,
  tags,
  category,
  sourceUrl,
  demoUrl,
  index,
  images = [],
  longDescription,
  techStack = [],
  features = [],
  challenges = [],
  onViewDetails,
}: ProjectCardProps) {
  // 3D tilt effect setup
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create smooth motion values with springs
  const springConfig = { stiffness: 150, damping: 15 };
  const motionRotateX = useSpring(useMotionValue(0), springConfig);
  const motionRotateY = useSpring(useMotionValue(0), springConfig);
  const motionScale = useSpring(useMotionValue(1), springConfig);

  // Parallax effect for different card elements
  const titleY = useTransform(motionRotateX, [10, -10], [-5, 5]);
  const imageY = useTransform(motionRotateX, [10, -10], [-15, 15]);
  const tagsX = useTransform(motionRotateY, [10, -10], [-5, 5]);

  // All images including the main image
  const allImages = [image, ...images].filter(Boolean);

  // Auto-rotate through images
  useEffect(() => {
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [allImages.length]);

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

    const rotateXFactor = 15;
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

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails({
        image,
        title,
        description,
        tags,
        category,
        sourceUrl,
        demoUrl,
        images,
        longDescription,
        techStack,
        features,
        challenges,
      });
    }
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
        delay: 0.1 * index,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="tilt-card enhanced-card project-card bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl relative group cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      style={{
        transform: `perspective(1000px) rotateX(${motionRotateX}deg) rotateY(${motionRotateY}deg) scale(${motionScale})`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Enhanced Glassmorphism overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-pink-500/20 transition-all duration-500 rounded-xl z-10" />

      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
        <div className="absolute inset-[2px] bg-white dark:bg-dark-card rounded-xl" />
      </div>

      {/* Project image carousel with parallax effect */}
      <motion.div
        className="relative h-56 sm:h-48 md:h-56 overflow-hidden"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        <motion.div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay z-20" />

        {/* Image carousel */}
        <div className="relative w-full h-full">
          {allImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`${title} - Image ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
              style={{
                y: imageY,
                scale: 1.1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>

        {/* Image indicators */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? "bg-white shadow-lg"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}

        {/* Enhanced category badge */}
        <motion.div
          className="absolute top-3 right-3 z-30 glass backdrop-blur-md"
          style={{ transform: "translateZ(40px)" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="px-4 py-1.5 text-primary font-medium text-xs rounded-full block bg-white/20 backdrop-blur-sm border border-white/30">
            {category}
          </span>
        </motion.div>

        {/* Hover overlay with quick actions */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-25"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="flex space-x-4">
            <motion.button
              onClick={handleViewDetails}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </motion.button>
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced card content with 3D effect */}
      <div
        className="p-6 tilt-card-content relative z-20"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Enhanced title with gradient */}
        <motion.h3
          className="font-heading text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"
          style={{ y: titleY }}
        >
          {title}
        </motion.h3>

        {/* Enhanced description */}
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(5px)",
          }}
        >
          {description}
        </motion.p>

        {/* Enhanced tags with better spacing */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          style={{
            x: tagsX,
            transformStyle: "preserve-3d",
            transform: "translateZ(15px)",
          }}
        >
          {tags.slice(0, 4).map((tag, idx) => (
            <motion.span
              key={idx}
              className="glass px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300"
              whileHover={{ scale: 1.1, y: -2 }}
              initial={{ opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {tag}
            </motion.span>
          ))}
          {tags.length > 4 && (
            <motion.span
              className="glass px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              whileHover={{ scale: 1.1, y: -2 }}
            >
              +{tags.length - 4}
            </motion.span>
          )}
        </motion.div>

        {/* Enhanced action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:justify-between"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(25px)",
          }}
        >
          <div className="flex gap-2 flex-1">
            <motion.a
              href={sourceUrl}
              className="magnetic-button glass px-4 py-2 rounded-full text-primary flex items-center gap-2 text-sm hover:shadow-lg transition-all flex-1 justify-center sm:flex-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200/50"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github"></i>
              <span className="hidden sm:inline">Source</span>
            </motion.a>

            <motion.a
              href={demoUrl}
              className="magnetic-button radial-button px-4 py-2 rounded-full text-white flex items-center gap-2 text-sm hover:shadow-lg transition-all flex-1 justify-center sm:flex-none bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-external-link-alt"></i>
              <span className="hidden sm:inline">Demo</span>
            </motion.a>
          </div>

          <motion.button
            onClick={handleViewDetails}
            className="magnetic-button glass px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 flex items-center gap-2 text-sm hover:shadow-lg transition-all bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300/50"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(107, 114, 128, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Details</span>
            <i className="fas fa-arrow-right"></i>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating elements for extra visual appeal */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
