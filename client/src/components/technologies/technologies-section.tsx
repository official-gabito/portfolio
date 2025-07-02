import { motion } from "framer-motion";
import { useState } from "react";

interface Technology {
  name: string;
  icon: string;
  description: string;
  color: string;
  category: string;
  level: string;
  experience: string;
  projects?: number;
}

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Enhanced technologies with more details
  const technologies: Technology[] = [
    {
      name: "JavaScript",
      icon: "fab fa-js",
      description:
        "Advanced ES6+ features, async/await, modern frameworks and libraries for dynamic web applications.",
      color: "#f7df1e",
      category: "frontend",
      level: "Expert",
      experience: "4+ years",
      projects: 25,
    },
    {
      name: "Python",
      icon: "fab fa-python",
      description:
        "AI/ML development, chatbot creation, data analysis, and backend services with Django/Flask.",
      color: "#3776ab",
      category: "ai",
      level: "Advanced",
      experience: "3+ years",
      projects: 15,
    },
    {
      name: "React",
      icon: "fab fa-react",
      description:
        "Complex state management, custom hooks, performance optimization, and modern React patterns.",
      color: "#61dafb",
      category: "frontend",
      level: "Expert",
      experience: "3+ years",
      projects: 20,
    },
    {
      name: "React Native",
      icon: "fab fa-react",
      description:
        "Cross-platform mobile development with native modules, animations, and performance optimization.",
      color: "#61dafb",
      category: "mobile",
      level: "Advanced",
      experience: "2+ years",
      projects: 12,
    },
    {
      name: "Flutter",
      icon: "fab fa-android",
      description:
        "Beautiful native apps with custom widgets, state management (Bloc/Provider), and platform integration.",
      color: "#0175c2",
      category: "mobile",
      level: "Advanced",
      experience: "2+ years",
      projects: 10,
    },
    {
      name: "Firebase",
      icon: "fas fa-fire",
      description:
        "Full-stack solutions: Authentication, Firestore, Cloud Functions, Analytics, and real-time features.",
      color: "#ffca28",
      category: "backend",
      level: "Advanced",
      experience: "3+ years",
      projects: 18,
    },
    {
      name: "Node.js",
      icon: "fab fa-node-js",
      description:
        "Scalable APIs, microservices architecture, real-time applications with Express and Socket.io.",
      color: "#339933",
      category: "backend",
      level: "Advanced",
      experience: "3+ years",
      projects: 16,
    },
    {
      name: "TensorFlow",
      icon: "fas fa-brain",
      description:
        "Machine learning models, neural networks, computer vision, and AI-powered chatbot development.",
      color: "#ff6f00",
      category: "ai",
      level: "Intermediate",
      experience: "1+ years",
      projects: 8,
    },
    {
      name: "OpenAI API",
      icon: "fas fa-robot",
      description:
        "GPT integration, conversational AI, intelligent chatbots, and natural language processing solutions.",
      color: "#412991",
      category: "ai",
      level: "Advanced",
      experience: "2+ years",
      projects: 12,
    },
    {
      name: "Git & GitHub",
      icon: "fab fa-git-alt",
      description:
        "Advanced version control, CI/CD pipelines, collaborative development, and project management.",
      color: "#f05032",
      category: "tools",
      level: "Expert",
      experience: "4+ years",
      projects: 30,
    },
    {
      name: "Figma",
      icon: "fab fa-figma",
      description:
        "UI/UX design, interactive prototypes, design systems, and seamless developer handoff.",
      color: "#f24e1e",
      category: "design",
      level: "Advanced",
      experience: "2+ years",
      projects: 22,
    },
    {
      name: "Cloudinary",
      icon: "fas fa-cloud",
      description:
        "Advanced media management, AI-powered transformations, video processing, and CDN optimization.",
      color: "#3448c5",
      category: "tools",
      level: "Advanced",
      experience: "2+ years",
      projects: 14,
    },
  ];

  const categories = [
    { id: "all", name: "All Technologies", icon: "fas fa-th" },
    { id: "frontend", name: "Frontend", icon: "fas fa-laptop-code" },
    { id: "mobile", name: "Mobile", icon: "fas fa-mobile-alt" },
    { id: "backend", name: "Backend", icon: "fas fa-server" },
    { id: "ai", name: "AI & ML", icon: "fas fa-brain" },
    { id: "design", name: "Design", icon: "fas fa-palette" },
    { id: "tools", name: "Tools", icon: "fas fa-tools" },
  ];

  const filteredTechnologies =
    activeCategory === "all"
      ? technologies
      : technologies.filter((tech) => tech.category === activeCategory);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const categoryVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="technologies"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-code text-white text-xl"></i>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4 font-heading">
            Technologies & Expertise
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Leveraging cutting-edge technologies to build scalable, performant
            applications. From AI-powered solutions to responsive mobile apps, I
            craft digital experiences that matter.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              variants={categoryVariants}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`${category.icon} mr-2`}></i>
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(" ")[0]}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          key={activeCategory}
        >
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group relative bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500"
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px ${tech.color}20`,
              }}
              layout
            >
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${tech.color}40, ${tech.color}20)`,
                }}
              ></div>

              {/* Technology Icon */}
              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}40)`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <i
                    className={`${tech.icon} text-2xl md:text-3xl`}
                    style={{ color: tech.color }}
                  ></i>

                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-2xl"
                    style={{ borderColor: tech.color }}
                    initial={{ scale: 1, opacity: 0 }}
                    whileHover={{ scale: 1.2, opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Technology Details */}
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tech.name}
                  </h3>

                  {/* Level Badge */}
                  <div className="flex justify-center mb-3">
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        backgroundColor: `${tech.color}20`,
                        color: tech.color,
                      }}
                    >
                      {tech.level}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {tech.description}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <i className="fas fa-clock mr-1"></i>
                      <span>{tech.experience}</span>
                    </div>
                    {tech.projects && (
                      <div className="flex items-center">
                        <i className="fas fa-project-diagram mr-1"></i>
                        <span>{tech.projects} projects</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <i className="fas fa-rocket text-white"></i>
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Always Learning, Always Growing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Technology evolves rapidly, and so do I. I continuously expand my
              skill set to stay at the forefront of innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View My Projects</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let's Collaborate</span>
                <i className="fas fa-handshake ml-2"></i>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
