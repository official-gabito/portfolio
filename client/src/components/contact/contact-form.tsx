import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from '@/context/form-context';
import { sendContactMessage } from '@/lib/firebase';
import { useUI } from '@/context/ui-context';

interface ContactFormProps {
  onSuccess: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const { selectedPackage, resetSelectedPackage } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: selectedPackage || '',
    message: selectedPackage 
      ? `I'm interested in the "${selectedPackage}" package. Please contact me with more details.` 
      : ''
  });
  
  // Update form data when selectedPackage changes
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        subject: selectedPackage,
        message: `I'm interested in the "${selectedPackage}" package. Please contact me with more details.`
      }));
    }
  }, [selectedPackage]);

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
        subject: '',
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

  // Form animation variants
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

  // Individual input field animation
  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6 
      }
    }
  };
  
  // Animation for the field focus indicator
  const focusIndicatorVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { duration: 0.3 }
    }
  };
  
  // Button hover animation
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.5
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)",
    }
  };
  
  // Floating label animation
  const floatingLabelVariants = {
    default: { y: 0, scale: 1 },
    focused: { 
      y: -25, 
      scale: 0.85, 
      color: "var(--input-focus-border-color, #3b82f6)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.form 
      ref={formRef}
      id="contactForm" 
      className="space-y-8"
      variants={formVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onSubmit={handleSubmit}
    >
      {/* Name and Email fields */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={inputVariants}
      >
        {/* Name field */}
        <motion.div className="relative">
          <motion.label 
            htmlFor="name" 
            className="absolute left-4 top-3.5 origin-left pointer-events-none text-input-placeholder dark:text-input-placeholder font-medium z-10 transition-all duration-200"
            variants={floatingLabelVariants}
            animate={focusedField === 'name' || formData.name ? "focused" : "default"}
          >
            Name
          </motion.label>
          
          <input 
            type="text" 
            id="name" 
            className="glass w-full px-4 pt-6 pb-2 rounded-xl border border-input-border focus:border-input-focus-border focus:outline-none focus:ring-0 transition-all"
            required
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            aria-label="Your name"
            placeholder=" "
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
            variants={focusIndicatorVariants}
            initial="hidden"
            animate={focusedField === 'name' ? "visible" : "hidden"}
          />
        </motion.div>
        
        {/* Email field */}
        <motion.div className="relative">
          <motion.label 
            htmlFor="email" 
            className="absolute left-4 top-3.5 origin-left pointer-events-none text-input-placeholder dark:text-input-placeholder font-medium z-10 transition-all duration-200"
            variants={floatingLabelVariants}
            animate={focusedField === 'email' || formData.email ? "focused" : "default"}
          >
            Email
          </motion.label>
          
          <input 
            type="email" 
            id="email" 
            className="glass w-full px-4 pt-6 pb-2 rounded-xl border border-input-border focus:border-input-focus-border focus:outline-none focus:ring-0 transition-all"
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            aria-label="Your email address"
            placeholder=" "
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
            variants={focusIndicatorVariants}
            initial="hidden"
            animate={focusedField === 'email' ? "visible" : "hidden"}
          />
        </motion.div>
      </motion.div>
      
      {/* Phone field */}
      <motion.div 
        variants={inputVariants}
        className="relative"
      >
        <motion.label 
          htmlFor="phone" 
          className="absolute left-4 top-3.5 origin-left pointer-events-none text-input-placeholder dark:text-input-placeholder font-medium z-10 transition-all duration-200"
          variants={floatingLabelVariants}
          animate={focusedField === 'phone' || formData.phone ? "focused" : "default"}
        >
          Phone (Optional)
        </motion.label>
        
        <input 
          type="tel" 
          id="phone" 
          className="glass w-full px-4 pt-6 pb-2 rounded-xl border border-input-border focus:border-input-focus-border focus:outline-none focus:ring-0 transition-all"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField(null)}
          aria-label="Your phone number (optional)"
          placeholder=" "
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
          variants={focusIndicatorVariants}
          initial="hidden"
          animate={focusedField === 'phone' ? "visible" : "hidden"}
        />
      </motion.div>
      
      {/* Subject field */}
      <motion.div 
        variants={inputVariants}
        className="relative"
      >
        <motion.label 
          htmlFor="subject" 
          className="absolute left-4 top-3.5 origin-left pointer-events-none text-input-placeholder dark:text-input-placeholder font-medium z-10 transition-all duration-200"
          variants={floatingLabelVariants}
          animate={focusedField === 'subject' || formData.subject ? "focused" : "default"}
        >
          Subject
        </motion.label>
        
        <input 
          type="text" 
          id="subject" 
          className="glass w-full px-4 pt-6 pb-2 rounded-xl border border-input-border focus:border-input-focus-border focus:outline-none focus:ring-0 transition-all"
          required
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => setFocusedField('subject')}
          onBlur={() => setFocusedField(null)}
          aria-label="Subject of your message"
          placeholder=" "
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
          variants={focusIndicatorVariants}
          initial="hidden"
          animate={focusedField === 'subject' ? "visible" : "hidden"}
        />
      </motion.div>
      
      {/* Message field */}
      <motion.div 
        variants={inputVariants}
        className="relative"
      >
        <motion.label 
          htmlFor="message" 
          className="absolute left-4 top-3.5 origin-left pointer-events-none text-input-placeholder dark:text-input-placeholder font-medium z-10 transition-all duration-200"
          variants={floatingLabelVariants}
          animate={focusedField === 'message' || formData.message ? "focused" : "default"}
        >
          Message
        </motion.label>
        
        <textarea 
          id="message" 
          rows={5} 
          className="glass w-full px-4 pt-6 pb-2 rounded-xl border border-input-border focus:border-input-focus-border focus:outline-none focus:ring-0 transition-all resize-none"
          required
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          aria-label="Your message"
          placeholder=" "
        ></textarea>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
          variants={focusIndicatorVariants}
          initial="hidden"
          animate={focusedField === 'message' ? "visible" : "hidden"}
        />
      </motion.div>
      
      {/* Submit button */}
      <motion.div 
        className="flex justify-center md:justify-start"
        variants={inputVariants}
      >
        <motion.button 
          type="submit" 
          className="radial-button px-8 py-4 rounded-full font-medium text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <motion.i 
                className="fas fa-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              ></motion.i>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <motion.i 
                className="fas fa-paper-plane"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              ></motion.i>
            </>
          )}
          
          {/* Animated particles on hover */}
          <AnimatePresence>
            {!isSubmitting && (
              <motion.span 
                className="absolute inset-0 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ 
                      top: `${20 + (i * 15)}%`,
                      left: `${10 + (i * 20)}%` 
                    }}
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                ))}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
