import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './project-card';
import { profileData } from '@/data/profile-data';
import ProjectDetailsModal from './project-details-page';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const categories = [
    "All",
    ...Array.from(new Set(profileData.projects.map((p) => p.category))),
  ];
  const filteredProjects =
    filter === "All"
      ? profileData.projects
      : profileData.projects.filter((p) => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="py-20 bg-gray-50 dark:bg-dark-card/20 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <i className="fas fa-code"></i>
              <span>Featured Work</span>
            </motion.div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                Projects
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>

            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Take a look at some of my recent projects. Each one represents my
              commitment to clean code, user experience, and innovative
              solutions.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={filterVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
                category={project.category}
                sourceUrl={project.sourceUrl}
                demoUrl={project.demoUrl}
                index={index}
                images={project.images}
                longDescription={project.longDescription}
                techStack={project.techStack}
                features={project.features}
                challenges={project.challenges}
                onViewDetails={handleViewDetails}
              />
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Let's Work Together</span>
              <motion.i
                className="fas fa-arrow-right"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              ></motion.i>
            </motion.a>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Interested in collaborating? Let's discuss your next project!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}