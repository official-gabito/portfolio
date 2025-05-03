import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format, addDays, addMonths } from 'date-fns';
import { useUI } from '@/context/ui-context';

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

  const { showAlert, showLoader, hideLoader } = useUI();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.preferredDate || !formData.time) {
      showAlert({
        type: 'warning',
        title: 'Missing Information',
        message: 'Please select both date and time for your appointment.',
        position: 'top'
      });
      return;
    }
    
    setIsSubmitting(true);
    showLoader({ text: 'Scheduling your appointment...', type: 'pulse' });
    
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
      hideLoader();
      
      showAlert({
        type: 'success',
        title: 'Appointment Scheduled!',
        message: `Your appointment has been scheduled for ${appointmentDateStr} at ${appointmentTimeStr}. I'll be in touch soon to confirm.`,
        autoClose: true,
        autoCloseTime: 6000,
        position: 'top'
      });
      
      // Reset form after success
      setFormData({
        fullName: '',
        email: '',
        preferredDate: null,
        time: null,
        topic: ''
      });
      
      // Hide success state after delay
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      hideLoader();
      showAlert({
        type: 'error',
        title: 'Booking Failed',
        message: 'There was an error scheduling your appointment. Please try again later.',
        autoClose: true,
        autoCloseTime: 6000,
        position: 'top'
      });
    } finally {
      setIsSubmitting(false);
      hideLoader();
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
              
              {/* Date and Time selector - Improved Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative glass p-5 rounded-xl shadow-sm">
                  <h3 className="font-medium text-primary dark:text-primary-foreground text-center mb-3">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="inline-flex items-center gap-2"
                    >
                      <i className="fas fa-calendar-alt"></i>
                      <span>Select Your Date</span>
                    </motion.span>
                  </h3>
                  
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Appointment Date"
                      value={formData.preferredDate || null}
                      onChange={handleDateChange}
                      disablePast
                      className="w-full theme-date-picker"
                      slotProps={{ 
                        textField: { 
                          variant: 'outlined',
                          fullWidth: true,
                          InputProps: {
                            className: "bg-background/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg"
                          }
                        } 
                      }}
                    />
                  </LocalizationProvider>
                  
                  {/* Quick Date Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                      onClick={() => handleDateChange(new Date())}
                    >
                      Today
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                      onClick={() => handleDateChange(addDays(new Date(), 1))}
                    >
                      Tomorrow
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                      onClick={() => handleDateChange(addDays(new Date(), 2))}
                    >
                      Day After
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                      onClick={() => handleDateChange(addDays(new Date(), 7))}
                    >
                      Next Week
                    </motion.button>
                  </div>
                </div>
                
                <div className="relative glass p-5 rounded-xl shadow-sm">
                  <h3 className="font-medium text-primary dark:text-primary-foreground text-center mb-3">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="inline-flex items-center gap-2"
                    >
                      <i className="fas fa-clock"></i>
                      <span>Select Your Time</span>
                    </motion.span>
                  </h3>
                  
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Appointment Time"
                      value={formData.time || null}
                      onChange={handleTimeChange}
                      className="w-full theme-time-picker"
                      slotProps={{ 
                        textField: { 
                          variant: 'outlined', 
                          fullWidth: true,
                          InputProps: {
                            className: "bg-background/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg"
                          }
                        } 
                      }}
                    />
                  </LocalizationProvider>
                  
                  {/* Quick Time Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {["09:00", "12:00", "15:00", "18:00"].map((timeStr) => {
                      const [hours, minutes] = timeStr.split(':').map(Number);
                      const timeToSet = new Date();
                      timeToSet.setHours(hours, minutes, 0);
                      
                      return (
                        <motion.button
                          key={timeStr}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                          onClick={() => handleTimeChange(timeToSet)}
                        >
                          {timeStr}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Selected Date and Time Summary */}
              {(formData.preferredDate || formData.time) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass p-4 rounded-xl text-center border border-primary/10"
                >
                  <p className="text-foreground/80 dark:text-gray-300 mb-1">Your selected appointment:</p>
                  <p className="text-primary font-semibold text-lg dark:text-primary-foreground flex items-center justify-center gap-2">
                    {formData.preferredDate ? (
                      <><i className="fas fa-calendar-check"></i> {format(formData.preferredDate, 'PPPP')}</>
                    ) : (
                      <><i className="fas fa-calendar"></i> No date selected</>
                    )}
                    {formData.time && (
                      <><span className="mx-2">at</span> <i className="fas fa-clock"></i> {format(formData.time, 'p')}</>
                    )}
                  </p>
                </motion.div>
              )}
              
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