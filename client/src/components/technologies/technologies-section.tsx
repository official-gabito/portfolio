import { motion } from 'framer-motion';

interface Technology {
  name: string;
  icon: string;
  description: string;
  color: string;
}

export default function TechnologiesSection() {
  // Technologies I use with icons from Font Awesome
  const technologies: Technology[] = [
    {
      name: "JavaScript",
      icon: "fab fa-js",
      description: "My primary programming language for web development, using modern ES6+ features.",
      color: "#f7df1e"
    },
    {
      name: "React",
      icon: "fab fa-react",
      description: "Building interactive UIs with React and its ecosystem (React Router, Context API, Hooks).",
      color: "#61dafb"
    },
    {
      name: "React Native",
      icon: "fab fa-react",
      description: "Creating cross-platform mobile apps with native performance using React Native.",
      color: "#61dafb"
    },
    {
      name: "Flutter",
      icon: "fab fa-android",
      description: "Developing beautiful, natively compiled apps from a single codebase with Flutter.",
      color: "#0175c2"
    },
    {
      name: "Firebase",
      icon: "fas fa-fire",
      description: "Utilizing Firebase for authentication, database, storage, and hosting solutions.",
      color: "#ffca28"
    },
    {
      name: "Node.js",
      icon: "fab fa-node-js",
      description: "Building server-side applications with Node.js and Express for RESTful APIs.",
      color: "#339933"
    },
    {
      name: "Git",
      icon: "fab fa-git-alt",
      description: "Version control and collaboration using Git and GitHub for project management.",
      color: "#f05032"
    },
    {
      name: "Figma",
      icon: "fab fa-figma",
      description: "Designing user interfaces and creating interactive prototypes with Figma.",
      color: "#f24e1e"
    },
    {
      name: "Cloudinary",
      icon: "fas fa-cloud",
      description: "Managing and optimizing media assets with Cloudinary's cloud-based solutions.",
      color: "#3448c5"
    },
    {
      name: "ZegoCloud",
      icon: "fas fa-video",
      description: "Implementing real-time video and audio communication features with ZegoCloud.",
      color: "#0099ff"
    }
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="technologies" className="py-20 bg-gray-50 dark:bg-gray-900 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-800 opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Technologies I Use</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I work with modern technologies to build high-quality, scalable, and performant applications.
            Here are the main tools and frameworks in my tech stack:
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="glass p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: `0 10px 25px rgba(0, 0, 0, 0.1), 0 0 10px ${tech.color}40`
              }}
            >
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ 
                  background: `linear-gradient(135deg, ${tech.color}30, ${tech.color}60)`,
                  color: tech.color
                }}
              >
                <i className={`${tech.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-300">
            I'm always learning and expanding my skill set to stay current with industry trends.
          </p>
          <a 
            href="#projects" 
            className="inline-flex items-center mt-4 text-primary font-medium"
          >
            <span>See my projects</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}