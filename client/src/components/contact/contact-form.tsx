import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const InputField = ({ name, label, type = "text", required = false }) => {
    const hasValue = formData[name]?.length > 0;
    const isFocused = focusedField === name;
    const isActive = hasValue || isFocused;

    return (
      <div className="relative group">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required={required}
          className="w-full px-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white"
        />
        <motion.label
          className="absolute left-4 pointer-events-none select-none bg-white dark:bg-gray-800 px-1"
          animate={{
            top: isActive ? "-8px" : "50%",
            fontSize: isActive ? "12px" : "16px",
            color: isActive ? "#2563eb" : "#6b7280",
            y: isActive ? 0 : "-50%",
          }}
          transition={{
            duration: 0.15,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>

        {/* Animated border bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Glow effect on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-blue-500/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </div>
    );
  };

  const TextAreaField = ({ name, label, required = false }) => {
    const hasValue = formData[name]?.length > 0;
    const isFocused = focusedField === name;
    const isActive = hasValue || isFocused;

    return (
      <div className="relative group">
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required={required}
          rows={5}
          className="w-full px-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-900 dark:text-white resize-vertical min-h-[140px]"
        />
        <motion.label
          className="absolute left-4 pointer-events-none select-none bg-white dark:bg-gray-800 px-1"
          animate={{
            top: isActive ? "-8px" : "16px",
            fontSize: isActive ? "12px" : "16px",
            color: isActive ? "#2563eb" : "#6b7280",
          }}
          transition={{
            duration: 0.15,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>

        {/* Animated border bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Glow effect on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-blue-500/5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <InputField name="name" label="Full Name" required />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <InputField
            name="email"
            label="Email Address"
            type="email"
            required
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <InputField name="subject" label="Subject" required />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <TextAreaField name="message" label="Your Message" required />
      </motion.div>

      <motion.div
        className="text-center pt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0"
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />

          {isSubmitting ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Sending Message...</span>
            </>
          ) : (
            <>
              <motion.i
                className="fas fa-paper-plane text-lg relative z-10"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              />
              <span className="relative z-10">Send Message</span>
            </>
          )}
        </motion.button>

        <motion.p
          className="text-sm text-gray-500 dark:text-gray-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          💬 I'll get back to you within 24 hours
        </motion.p>
      </motion.div>
    </div>
  );
}
