import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ContactForm from "./contact-form";
import SuccessModal from "./success-modal";
import SocialIcons from "../common/social-icons";
import { profileData } from "@/data/profile-data";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const handleFormSuccess = () => {
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you. Fill out the form below and I'll get back
            to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            className="lg:col-span-3 bg-card border border-border p-8 rounded-xl shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="font-heading text-2xl font-bold mb-6"
              variants={itemVariants}
            >
              Send Me a Message
            </motion.h3>

            <ContactForm onSuccess={handleFormSuccess} />
          </motion.div>

          <div className="lg:col-span-2">
            <motion.div
              className="bg-card border border-border p-8 rounded-xl shadow-lg mb-8"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-heading text-2xl font-bold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {profileData.location}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <a
                      href={`tel:${profileData.phone}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      {profileData.phone}
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-card border border-border p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="font-heading text-xl font-bold mb-6">Follow Me</h3>

              <SocialIcons className="flex justify-between mb-8" />

              <div className="mt-8 text-center">
                <motion.a
                  href={profileData.cvUrl}
                  className="download-resume-button inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  <i className="fas fa-file-download text-lg"></i>
                  <span className="font-semibold">Download Resume</span>
                </motion.a>
                <motion.p
                  className="text-sm text-gray-500 dark:text-gray-400 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Get my latest professional resume in PDF format
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
    </section>
  );
}
