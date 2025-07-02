import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  references: string;
  additionalInfo: string;
}

interface PlanDetails {
  id: string;
  name: string;
  price: string;
  description: string;
}

export default function OrderPage() {
  const [searchParams, setLocation] = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Get the plan from the URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const planId = queryParams.get("plan") || "custom";

  // Plan details
  const plans: Record<string, PlanDetails> = {
    starter: {
      id: "starter",
      name: "Starter Package",
      price: "$499",
      description:
        "Perfect for small businesses and startups looking to establish their online presence.",
    },
    pro: {
      id: "pro",
      name: "Professional Package",
      price: "$999",
      description:
        "Ideal for growing businesses that need more advanced features and customization.",
    },
    premium: {
      id: "premium",
      name: "Premium Package",
      price: "$2499",
      description:
        "Comprehensive solution for businesses requiring a full-featured web application.",
    },
    custom: {
      id: "custom",
      name: "Custom Package",
      price: "Custom",
      description: "A tailored solution specifically for your business needs.",
    },
  };

  const selectedPlan = plans[planId] || plans.custom;

  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    timeline: "",
    budget: selectedPlan.price !== "Custom" ? selectedPlan.price : "",
    references: "",
    additionalInfo: "",
  });

  // Update budget when plan changes
  useEffect(() => {
    if (selectedPlan.price !== "Custom") {
      setFormData((prevData) => ({
        ...prevData,
        budget: selectedPlan.price,
      }));
    }
  }, [selectedPlan.price]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Import dynamically to avoid issues with SSR
      const { submitOrder } = await import("@/lib/firebase");

      // Submit order to Firebase
      await submitOrder({
        ...formData,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
      });

      // Show success message and reset form
      setOrderSuccess(true);
      setTimeout(() => {
        // Redirect to home page after success
        setLocation("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was an error submitting your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setLocation("/#pricing");
  };

  // Animations
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Floating label animation
  const floatingLabelVariants = {
    default: { y: 0, scale: 1 },
    focused: {
      y: -25,
      scale: 0.85,
      color: "#3b82f6",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  // Animation for the field focus indicator
  const focusIndicatorVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen py-20">
      <motion.div
        className="container mx-auto px-6"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.button
            onClick={goBack}
            className="mb-8 flex items-center text-primary hover:underline"
            variants={itemVariants}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Packages
          </motion.button>

          {/* Order header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {orderSuccess
                ? "Order Submitted Successfully!"
                : `Order ${selectedPlan.name}`}
            </h1>
            {!orderSuccess && (
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {selectedPlan.description}
              </p>
            )}
          </motion.div>

          {orderSuccess ? (
            // Success message
            <motion.div
              variants={itemVariants}
              className="glass p-10 rounded-2xl text-center"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-green-500 text-3xl"></i>
              </div>
              <h2 className="font-heading text-2xl font-bold mb-4">
                Thank You for Your Order!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I've received your order details and will contact you shortly to
                discuss the next steps.
              </p>
              <p className="text-primary font-medium">
                Redirecting you back to the homepage...
              </p>
            </motion.div>
          ) : (
            // Order form
            <motion.div
              variants={itemVariants}
              className="glass p-8 rounded-2xl shadow-lg"
            >
              {/* Selected plan summary */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-8">
                <h3 className="font-heading text-xl font-bold mb-2">
                  Selected Package:
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedPlan.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {selectedPlan.description}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {selectedPlan.price}
                  </div>
                </div>
              </div>

              {/* Order form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-heading text-xl font-bold mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name field */}
                    <div className="relative">
                      <motion.label
                        htmlFor="name"
                        className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                        variants={floatingLabelVariants}
                        animate={
                          focusedField === "name" || formData.name
                            ? "focused"
                            : "default"
                        }
                      >
                        Full Name
                      </motion.label>

                      <input
                        type="text"
                        id="name"
                        className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                        variants={focusIndicatorVariants}
                        initial="hidden"
                        animate={focusedField === "name" ? "visible" : "hidden"}
                      />
                    </div>

                    {/* Email field */}
                    <div className="relative">
                      <motion.label
                        htmlFor="email"
                        className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                        variants={floatingLabelVariants}
                        animate={
                          focusedField === "email" || formData.email
                            ? "focused"
                            : "default"
                        }
                      >
                        Email Address
                      </motion.label>

                      <input
                        type="email"
                        id="email"
                        className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                        variants={focusIndicatorVariants}
                        initial="hidden"
                        animate={
                          focusedField === "email" ? "visible" : "hidden"
                        }
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="relative mt-6">
                    <motion.label
                      htmlFor="phone"
                      className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                      variants={floatingLabelVariants}
                      animate={
                        focusedField === "phone" || formData.phone
                          ? "focused"
                          : "default"
                      }
                    >
                      Phone Number
                    </motion.label>

                    <input
                      type="tel"
                      id="phone"
                      className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                    />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                      variants={focusIndicatorVariants}
                      initial="hidden"
                      animate={focusedField === "phone" ? "visible" : "hidden"}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="font-heading text-xl font-bold mb-4">
                    Project Details
                  </h3>

                  {/* Project Description */}
                  <div className="relative mb-6">
                    <motion.label
                      htmlFor="projectDescription"
                      className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                      variants={floatingLabelVariants}
                      animate={
                        focusedField === "projectDescription" ||
                        formData.projectDescription
                          ? "focused"
                          : "default"
                      }
                    >
                      Describe your project in detail
                    </motion.label>

                    <textarea
                      id="projectDescription"
                      rows={4}
                      className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all resize-none"
                      required
                      value={formData.projectDescription}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("projectDescription")}
                      onBlur={() => setFocusedField(null)}
                    ></textarea>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                      variants={focusIndicatorVariants}
                      initial="hidden"
                      animate={
                        focusedField === "projectDescription"
                          ? "visible"
                          : "hidden"
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Timeline */}
                    <div className="relative">
                      <motion.label
                        htmlFor="timeline"
                        className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                        variants={floatingLabelVariants}
                        animate={
                          focusedField === "timeline" || formData.timeline
                            ? "focused"
                            : "default"
                        }
                      >
                        Preferred Timeline
                      </motion.label>

                      <input
                        type="text"
                        id="timeline"
                        className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all"
                        required
                        value={formData.timeline}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("timeline")}
                        onBlur={() => setFocusedField(null)}
                      />

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                        variants={focusIndicatorVariants}
                        initial="hidden"
                        animate={
                          focusedField === "timeline" ? "visible" : "hidden"
                        }
                      />
                    </div>

                    {/* Budget */}
                    <div className="relative">
                      <motion.label
                        htmlFor="budget"
                        className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                        variants={floatingLabelVariants}
                        animate={
                          focusedField === "budget" || formData.budget
                            ? "focused"
                            : "default"
                        }
                      >
                        Budget
                      </motion.label>

                      <input
                        type="text"
                        id="budget"
                        className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        readOnly={selectedPlan.price !== "Custom"}
                      />

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                        variants={focusIndicatorVariants}
                        initial="hidden"
                        animate={
                          focusedField === "budget" ? "visible" : "hidden"
                        }
                      />
                    </div>
                  </div>

                  {/* References */}
                  <div className="relative mb-6">
                    <motion.label
                      htmlFor="references"
                      className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                      variants={floatingLabelVariants}
                      animate={
                        focusedField === "references" || formData.references
                          ? "focused"
                          : "default"
                      }
                    >
                      References/Examples (Optional)
                    </motion.label>

                    <textarea
                      id="references"
                      rows={3}
                      className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all resize-none"
                      value={formData.references}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("references")}
                      onBlur={() => setFocusedField(null)}
                    ></textarea>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                      variants={focusIndicatorVariants}
                      initial="hidden"
                      animate={
                        focusedField === "references" ? "visible" : "hidden"
                      }
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="relative">
                    <motion.label
                      htmlFor="additionalInfo"
                      className="absolute left-4 top-3.5 origin-left pointer-events-none text-gray-500 transition-all duration-200"
                      variants={floatingLabelVariants}
                      animate={
                        focusedField === "additionalInfo" ||
                        formData.additionalInfo
                          ? "focused"
                          : "default"
                      }
                    >
                      Additional Information (Optional)
                    </motion.label>

                    <textarea
                      id="additionalInfo"
                      rows={3}
                      className="glass w-full px-4 pt-6 pb-2 rounded-xl border-0 focus:outline-none focus:ring-0 bg-transparent transition-all resize-none"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("additionalInfo")}
                      onBlur={() => setFocusedField(null)}
                    ></textarea>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                      variants={focusIndicatorVariants}
                      initial="hidden"
                      animate={
                        focusedField === "additionalInfo" ? "visible" : "hidden"
                      }
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-center">
                  <motion.button
                    type="submit"
                    className="px-10 py-4 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        <span>Submit Order</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
