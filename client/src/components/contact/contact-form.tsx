import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/context/form-context';
import { sendContactMessage } from '@/lib/firebase';

interface ContactFormProps {
  onSuccess: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const { selectedPackage, resetSelectedPackage } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: selectedPackage || '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Send data to Firebase
      await sendContactMessage(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        package: '',
        message: ''
      });
      resetSelectedPackage();
      
      // Show success modal
      onSuccess();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.form 
      id="contactForm" 
      className="space-y-6"
      variants={formVariants}
      onSubmit={handleSubmit}
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={inputVariants}
      >
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg/50 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg/50 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your.email@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </motion.div>
      
      <motion.div variants={inputVariants}>
        <label htmlFor="phone" className="block mb-2 font-medium">Phone (Optional)</label>
        <input 
          type="tel" 
          id="phone" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg/50 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
      </motion.div>
      
      <motion.div variants={inputVariants}>
        <label htmlFor="package" className="block mb-2 font-medium">Package (Optional)</label>
        <select 
          id="package" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg/50 focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.package}
          onChange={handleChange}
        >
          <option value="">Select a package</option>
          <option value="Basic Mobile App">Basic Mobile App</option>
          <option value="Advanced Web App">Advanced Web App</option>
          <option value="Full Business Suite">Full Business Suite</option>
          <option value="Custom">Custom Package</option>
        </select>
      </motion.div>
      
      <motion.div variants={inputVariants}>
        <label htmlFor="message" className="block mb-2 font-medium">Message</label>
        <textarea 
          id="message" 
          rows={5} 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-bg/50 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell me about your project..."
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>
      </motion.div>
      
      <motion.button 
        type="submit" 
        className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
        variants={inputVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <i className="fas fa-paper-plane ml-2"></i>
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
