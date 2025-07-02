import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface ProjectDetailsProps {
  project: {
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    images?: string[];
    tags: string[];
    techStack?: string[];
    features?: string[];
    challenges?: string[];
    category: string;
    sourceUrl: string;
    demoUrl: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [dragY, setDragY] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveTab("overview");
      setCurrentImageIndex(0);
      setDragY(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.y > threshold || info.velocity.y > 500) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (info.offset.y > 0) {
      setDragY(info.offset.y);
    }
  };

  if (!project) return null;

  const allImages = [project.image, ...(project.images || [])].filter(Boolean);

  const tabs = [
    { id: "overview", label: "Overview", icon: "fas fa-info-circle" },
    { id: "features", label: "Features", icon: "fas fa-star" },
    { id: "tech", label: "Tech Stack", icon: "fas fa-code" },
    { id: "challenges", label: "Challenges", icon: "fas fa-mountain" },
  ];

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            ref={modalRef}
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 
                       rounded-t-3xl shadow-2xl overflow-hidden flex flex-col
                       h-[85vh] md:h-[90vh] max-h-screen"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              y: dragY,
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header with Image */}
            <div className="relative flex-shrink-0">
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 z-30 p-2 bg-black/40 hover:bg-black/60 
                         backdrop-blur-sm rounded-full text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times w-4 h-4"></i>
              </motion.button>

              {/* Image gallery */}
              <div className="relative h-48 md:h-64 overflow-hidden rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

                {allImages.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`${project.title} - Image ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                ))}

                {/* Image navigation */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) =>
                            (prev - 1 + allImages.length) % allImages.length
                        )
                      }
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 
                               p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm 
                               rounded-full text-white transition-colors z-20"
                    >
                      <i className="fas fa-chevron-left text-sm"></i>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % allImages.length
                        )
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 
                               p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm 
                               rounded-full text-white transition-colors z-20"
                    >
                      <i className="fas fa-chevron-right text-sm"></i>
                    </button>

                    {/* Image indicators */}
                    <div
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 
                                  flex space-x-2 z-20"
                    >
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            idx === currentImageIndex
                              ? "bg-white shadow-lg"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Project title and category overlay */}
                <div className="absolute bottom-3 left-3 z-20 text-white">
                  <motion.span
                    className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm 
                             rounded-full text-sm font-medium mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.category}
                  </motion.span>
                  <motion.h2
                    className="text-xl md:text-2xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-none">
              <div className="px-4 py-4 md:px-6 md:py-6">
                {/* Action buttons */}
                <div className="flex gap-3 mb-6">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                             bg-gradient-to-r from-blue-500 to-purple-600 
                             hover:from-blue-600 hover:to-purple-700 text-white 
                             rounded-xl font-medium transition-all shadow-lg hover:shadow-xl
                             text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>Live Demo</span>
                  </motion.a>

                  <motion.a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                             bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                             text-gray-800 dark:text-gray-200 rounded-xl font-medium 
                             transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <i className="fab fa-github"></i>
                    <span>Source</span>
                  </motion.a>
                </div>

                {/* Tags */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 
                               text-blue-700 dark:text-blue-300 rounded-full 
                               text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Tabs */}
                <motion.div
                  className="border-b border-gray-200 dark:border-gray-700 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-3 px-4 mr-6
                                   border-b-2 font-medium text-sm whitespace-nowrap 
                                   transition-colors flex-shrink-0 ${
                                     activeTab === tab.id
                                       ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                       : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                   }`}
                      >
                        <i className={`${tab.icon} text-xs`}></i>
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </motion.div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="pb-6"
                  >
                    {activeTab === "overview" && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                            Project Description
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {project.longDescription || project.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "features" && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                          Key Features
                        </h3>
                        {project.features && project.features.length > 0 ? (
                          <ul className="space-y-3">
                            {project.features.map((feature, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <i className="fas fa-check-circle text-green-500 mt-1 flex-shrink-0 text-sm"></i>
                                <span>{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 italic">
                            No specific features listed for this project.
                          </p>
                        )}
                      </div>
                    )}

                    {activeTab === "tech" && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                          Technology Stack
                        </h3>
                        {project.techStack && project.techStack.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {project.techStack.map((tech, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                  {tech}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 italic">
                            Technology stack information not available for this
                            project.
                          </p>
                        )}
                      </div>
                    )}

                    {activeTab === "challenges" && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                          Challenges & Solutions
                        </h3>
                        {project.challenges && project.challenges.length > 0 ? (
                          <div className="space-y-4">
                            {project.challenges.map((challenge, idx) => (
                              <motion.div
                                key={idx}
                                className="p-4 bg-amber-50 dark:bg-amber-900/20 
                                         border-l-4 border-amber-400 rounded-r-lg"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <div className="flex items-start gap-3">
                                  <i className="fas fa-exclamation-triangle text-amber-500 mt-1 flex-shrink-0 text-sm"></i>
                                  <p className="text-gray-700 dark:text-gray-300">
                                    {challenge}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400 italic">
                            No specific challenges documented for this project.
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
