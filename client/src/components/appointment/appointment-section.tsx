import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface AppointmentFormData {
  fullName: string;
  email: string;
  preferredDate: string;
  time: string;
  topic: string;
}

export default function AppointmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: "",
    email: "",
    preferredDate: "",
    time: "",
    topic: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.preferredDate || !formData.time) {
      alert("Please select both date and time for your appointment.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowSuccess(true);

      // Reset form after success
      setFormData({
        fullName: "",
        email: "",
        preferredDate: "",
        time: "",
        topic: "",
      });

      // Hide success state after delay
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(
        "There was an error scheduling your appointment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const quickDateOptions = [
    { label: "Today", date: new Date() },
    { label: "Tomorrow", date: addDays(new Date(), 1) },
    { label: "Day After", date: addDays(new Date(), 2) },
    { label: "Next Week", date: addDays(new Date(), 7) },
  ];

  const quickTimeOptions = ["09:00", "12:00", "15:00", "18:00"];

  // Enhanced Input Field Component
  const EnhancedInputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = false,
    placeholder = "",
    className = "",
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    className?: string;
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;
    const isActive = isFocused || hasValue;

    // For date/time inputs, always keep label at top since they have built-in functionality
    const isDateTimeInput = type === "date" || type === "time";
    const shouldShowTopLabel = isActive || isDateTimeInput;

    return (
      <div className={`relative ${className}`}>
        {!isDateTimeInput && (
          <motion.label
            htmlFor={name}
            className={`absolute left-3 px-1 pointer-events-none font-medium transition-all duration-150 ease-out ${
              shouldShowTopLabel
                ? "top-0 text-xs text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 -translate-y-1/2 z-10"
                : "top-1/2 text-gray-500 dark:text-gray-400 -translate-y-1/2"
            }`}
            animate={{
              scale: shouldShowTopLabel ? 0.85 : 1,
              y: shouldShowTopLabel ? -16 : 0,
              color: shouldShowTopLabel ? "#2563eb" : "#6b7280",
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {label}
          </motion.label>
        )}

        {isDateTimeInput && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
          </label>
        )}

        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          placeholder={
            isDateTimeInput ? "" : shouldShowTopLabel ? placeholder : ""
          }
          className={`w-full px-3 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border-2 transition-all duration-200 ease-out
            ${
              isFocused
                ? "border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/10"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }
            text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
          `}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  };

  // Enhanced Textarea Component
  const EnhancedTextarea = ({
    label,
    name,
    value,
    onChange,
    required = false,
    placeholder = "",
    rows = 4,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    placeholder?: string;
    rows?: number;
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;
    const isActive = isFocused || hasValue;

    return (
      <div className="relative">
        <motion.label
          htmlFor={name}
          className={`absolute left-3 px-1 pointer-events-none font-medium transition-all duration-200 ease-out ${
            isActive
              ? "top-0 text-xs text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 -translate-y-1/2 z-10"
              : "top-4 text-gray-500 dark:text-gray-400"
          }`}
          animate={{
            scale: isActive ? 0.85 : 1,
            y: isActive ? -16 : 0,
            color: isActive ? "#2563eb" : "#6b7280",
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {label}
        </motion.label>

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          placeholder={isActive ? placeholder : ""}
          rows={rows}
          className={`w-full px-3 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border-2 transition-all duration-200 ease-out resize-none
            ${
              isFocused
                ? "border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/10"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }
            text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
          `}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  };

  // Animations
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="appointment"
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.span className="text-blue-600 font-semibold text-sm uppercase tracking-wider block mb-2">
              Let's Connect
            </motion.span>
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Book an Appointment
            </motion.h2>
            <motion.p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Schedule a time to discuss your project requirements, get a
              consultation, or learn more about my services.
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EnhancedInputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />

                <EnhancedInputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Select Date
                  </h3>

                  <EnhancedInputField
                    label="Preferred Date"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />

                  <div className="flex flex-wrap gap-2">
                    {quickDateOptions.map((option) => (
                      <motion.button
                        key={option.label}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            preferredDate: formatDateForInput(option.date),
                          }))
                        }
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Select Time
                  </h3>

                  <EnhancedInputField
                    label="Preferred Time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />

                  <div className="flex flex-wrap gap-2">
                    {quickTimeOptions.map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            time: time,
                          }))
                        }
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Appointment Summary */}
              <AnimatePresence>
                {formData.preferredDate && formData.time && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">
                        Appointment scheduled for{" "}
                        {new Date(formData.preferredDate).toLocaleDateString()}{" "}
                        at {formData.time}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <EnhancedTextarea
                label="Topic/Reason for Appointment"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                placeholder="Please describe what you'd like to discuss during our appointment..."
                rows={4}
              />

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <motion.button
                  onClick={handleSubmit}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting || showSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span>Booking Appointment...</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Appointment Booked!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Book Appointment</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
