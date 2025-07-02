import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import TimelineCard from "./timeline-card";
import { profileData } from "@/data/profile-data";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-dark-card/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="font-heading text-2xl font-bold mb-6"
              variants={itemVariants}
            >
              A passionate developer from Nigeria
            </motion.h3>

            <motion.p
              className="mb-6 text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              With over 3 years of experience in mobile and web development, I
              specialize in creating user-focused applications that deliver
              exceptional performance and clean code. Based in{" "}
              {profileData.location}, I've worked with clients across various
              industries to bring their digital ideas to life.
            </motion.p>

            <motion.p
              className="mb-6 text-gray-700 dark:text-gray-300"
              variants={itemVariants}
            >
              My expertise spans Flutter, React, Firebase, JavaScript, Node.js,
              SQL, HTML, and CSS, allowing me to build comprehensive solutions
              from concept to deployment. I'm particularly passionate about
              mobile-first design and creating seamless user experiences.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              variants={containerVariants}
            >
              {profileData.quickFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <i className={fact.icon}></i>
                  </div>
                  <div>
                    <h4 className="font-medium">{fact.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {fact.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get In Touch</span>
              <i className="fas fa-arrow-right"></i>
            </motion.a>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-primary rounded-lg rotate-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              ></motion.div>
              <img
                src="../../assets/my_picture.jpg"
                alt="Gabriel working"
                className="relative rounded-lg w-full h-full object-cover"
              />
              <motion.div
                className="absolute -bottom-6 -right-6 bg-white dark:bg-dark-card p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <h5 className="text-3xl font-bold text-primary">3+</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Years
                    </p>
                  </div>
                  <div className="text-center">
                    <h5 className="text-3xl font-bold text-primary">20+</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Projects
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <TimelineCard
              title="Work History"
              icon="fas fa-briefcase"
              items={profileData.workHistory}
            />

            <TimelineCard
              title="Education"
              icon="fas fa-graduation-cap"
              items={profileData.education}
            />

            <TimelineCard
              title="Soft Skills"
              icon="fas fa-smile"
              items={profileData.softSkills}
            />

            <TimelineCard
              title="Hobbies"
              icon="fas fa-heart"
              items={profileData.hobbies}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
