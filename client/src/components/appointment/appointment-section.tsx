import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';

interface AppointmentFormData {
  fullName: string;
  email: string;
  preferredDate: Date | null;
  time: Date | null;
  topic: string;
}

export default function AppointmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    email: '',
    preferredDate: null,
    time: null,
    topic: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
  const handleDateChange = (newDate: Date | null) => {
    setFormData({
      ...formData,
      preferredDate: newDate
    });
  };
  
  const handleTimeChange = (newTime: Date | null) => {
    setFormData({
      ...formData,
      time: newTime
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.preferredDate || !formData.time) {
      alert('Please select both date and time for your appointment');
      return;
    }
    
    setIsSubmitting(true);
    
    // Format date and time to be stored in Firestore
    const appointmentDateStr = format(formData.preferredDate, 'PP');
    const appointmentTimeStr = format(formData.time, 'p');
    
    try {
      // Import dynamically to avoid issues with SSR
      const { scheduleAppointment } = await import('@/lib/firebase');
      
      // Send data to Firebase
      await scheduleAppointment({
        ...formData,
        dateFormatted: appointmentDateStr,
        timeFormatted: appointmentTimeStr
      });
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          preferredDate: null,
          time: null,
          topic: ''
        });
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animations
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
  
  // Floating label animation
  const floatingLabelVariants = {
    default: { y: 0, scale: 1 },
    focused: { 
      y: -25, 
      scale: 0.85, 
      color: "#3b82f6",
      transition: { type: "spring", stiffness: 300, damping: 20 }
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

  return (
    <section id="appointment" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.span className="text-primary font-medium block mb-2">Let's Talk</motion.span>
            <motion.h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Book an Appointment</motion.h2>
            <motion.p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Schedule a time to discuss your project requirements, get a consultation, or learn more about my services.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="glass p-8 rounded-2xl shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name field */}
                <div className="relative">
                  <motion.label 
                    htmlFor="fullName" 
                    className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 dark:text-gray-400 transition-all duration-200"
                    variants={floatingLabelVariants}
                    animate={focusedField === 'fullName' || formData.fullName ? "focused" : "default"}
                  >
                    Full Name
                  </motion.label>
                  
                  <input 
                    type="text" 
                    id="fullName" 
                    className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent dark:text-white text-gray-900 transition-all"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                    variants={focusIndicatorVariants}
                    initial="hidden"
                    animate={focusedField === 'fullName' ? "visible" : "hidden"}
                  />
                </div>
                
                {/* Email field */}
                <div className="relative">
                  <motion.label 
                    htmlFor="email" 
                    className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 dark:text-gray-400 transition-all duration-200"
                    variants={floatingLabelVariants}
                    animate={focusedField === 'email' || formData.email ? "focused" : "default"}
                  >
                    Email
                  </motion.label>
                  
                  <input 
                    type="email" 
                    id="email" 
                    className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent dark:text-white text-gray-900 transition-all"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                    variants={focusIndicatorVariants}
                    initial="hidden"
                    animate={focusedField === 'email' ? "visible" : "hidden"}
                  />
                </div>
              </div>
              
              {/* Date and Time selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-4 rounded-xl">
                  <h3 className="font-medium text-primary mb-3">Select Date</h3>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateCalendar 
                      value={formData.preferredDate}
                      onChange={handleDateChange}
                      disablePast
                    />
                  </LocalizationProvider>
                </div>
                
                <div className="glass p-4 rounded-xl">
                  <h3 className="font-medium text-primary mb-3">Select Time</h3>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Appointment Time"
                      value={formData.time}
                      onChange={handleTimeChange}
                      className="w-full"
                    />
                  </LocalizationProvider>
                  
                  {/* Selected date and time display */}
                  <div className="mt-6 text-center">
                    <h4 className="font-medium">Selected Date & Time:</h4>
                    <p className="text-primary font-semibold">
                      {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'No date selected'} 
                      {formData.time ? ` at ${format(formData.time, 'p')}` : ''}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Topic for appointment */}
              <div className="relative">
                <motion.label 
                  htmlFor="topic" 
                  className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 dark:text-gray-400 transition-all duration-200"
                  variants={floatingLabelVariants}
                  animate={focusedField === 'topic' || formData.topic ? "focused" : "default"}
                >
                  Topic/Reason for Appointment
                </motion.label>
                
                <textarea 
                  id="topic" 
                  rows={4} 
                  className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent dark:text-white text-gray-900 transition-all resize-none"
                  required
                  value={formData.topic}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('topic')}
                  onBlur={() => setFocusedField(null)}
                ></textarea>
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                  variants={focusIndicatorVariants}
                  initial="hidden"
                  animate={focusedField === 'topic' ? "visible" : "hidden"}
                />
              </div>
              
              {/* Submit button */}
              <div className="flex justify-center">
                <motion.button 
                  type="submit" 
                  className="px-8 py-4 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting || showSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Booking...</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <i className="fas fa-check"></i>
                      <span>Appointment Booked!</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-calendar-check"></i>
                      <span>Book Appointment</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}