import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// FAQ item type
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Sample FAQ data
const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What technologies do you use?',
    answer: 'I specialize in modern web and mobile development technologies including React, Flutter, Firebase, JavaScript/TypeScript, Node.js, SQL, HTML, CSS, and Bootstrap. I stay current with industry trends to deliver the most efficient and effective solutions for my clients.'
  },
  {
    id: 'faq-2',
    question: 'Do you offer post-project support?',
    answer: 'Yes, I provide comprehensive post-project support and maintenance. After delivery, I offer a support period to address any issues that may arise. For ongoing maintenance, I offer flexible support packages tailored to your specific needs to ensure your application continues to run smoothly.'
  },
  {
    id: 'faq-3',
    question: 'How long does a project typically take?',
    answer: 'Project timelines typically range from 2 to 6 weeks depending on complexity, scope, and requirements. Simple websites or applications may take 2-3 weeks, while more complex projects with custom features, integrations, or extensive functionality can take 4-6 weeks or more. I provide a detailed timeline during the initial consultation based on your specific project needs.'
  },
  {
    id: 'faq-4',
    question: 'What is your design process like?',
    answer: 'My design process is collaborative and iterative. It begins with understanding your requirements, target audience, and goals. I create wireframes and prototypes for your feedback before moving to the final design phase. Throughout the process, I maintain open communication and incorporate your feedback to ensure the final product matches your vision and meets your users\' needs.'
  },
  {
    id: 'faq-5',
    question: 'Do you work with clients internationally?',
    answer: 'Yes, I work with clients globally. Using modern communication tools, I maintain clear and consistent communication regardless of time zones or geographical locations. I\'ve successfully completed projects with clients across different countries and continents, ensuring a smooth collaborative process throughout the project lifecycle.'
  },
  {
    id: 'faq-6',
    question: 'How do you handle project revisions?',
    answer: 'I include a specified number of revision rounds in each project proposal. After each development milestone, you\'ll have the opportunity to provide feedback and request changes. Additional revisions beyond the agreed scope can be accommodated at an hourly rate. My goal is to ensure you\'re completely satisfied with the final product.'
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  
  // Toggle FAQ item
  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
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
  
  // Accordion animation variants
  const accordionItemVariants = {
    closed: { opacity: 0, height: 0 },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.3
      }
    }
  };
  
  // Background animation for active FAQ item
  const activeBackgroundVariants = {
    inactive: { 
      background: "rgba(var(--card-rgb), 0.5)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    active: { 
      background: "rgba(var(--card-rgb), 0.8)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    }
  };

  return (
    <section 
      id="faq" 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.span 
              className="text-primary font-medium block mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Common Questions
            </motion.span>
            <motion.h2 
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Find answers to common questions about my services, process, and policies
            </motion.p>
          </motion.div>
          
          {/* FAQ Accordion */}
          <motion.div variants={itemVariants} className="space-y-4">
            {faqItems.map((item) => (
              <motion.div 
                key={item.id}
                variants={activeBackgroundVariants}
                initial="inactive"
                animate={openItemId === item.id ? "active" : "inactive"}
                className="faq-item glass rounded-xl overflow-hidden shadow-sm"
              >
                {/* Question Button */}
                <motion.button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-medium text-lg focus:outline-none"
                  whileHover={{ backgroundColor: "rgba(var(--card-rgb), 0.7)" }}
                  aria-expanded={openItemId === item.id}
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: openItemId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-primary"
                  >
                    <i className="fas fa-chevron-down"></i>
                  </motion.span>
                </motion.button>
                
                {/* Answer Content */}
                <AnimatePresence>
                  {openItemId === item.id && (
                    <motion.div
                      key={`content-${item.id}`}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={accordionItemVariants}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 prose dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Contact CTA */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Don't see your question here? Feel free to reach out directly.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-envelope"></i>
              <span>Contact Me</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}