import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ServiceCard from './service-card';
import { profileData } from '@/data/profile-data';
import { useForm } from '@/context/form-context';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { setSelectedPackage } = useForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    // Scroll to contact section
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">My <span className="text-primary">Services</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            I offer a range of development services tailored to meet your specific needs and budget. 
            Choose the package that best fits your project requirements.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {profileData.services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              price={service.price}
              icon={service.icon}
              features={service.features}
              notIncluded={service.notIncluded}
              deliveryTime={service.deliveryTime}
              isPopular={service.isPopular}
              onRequestNow={() => handlePackageSelect(service.title)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
