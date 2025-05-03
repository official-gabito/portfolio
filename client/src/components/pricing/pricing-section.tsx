import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocation } from 'wouter';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [_, setLocation] = useLocation();

  // Pricing plans data
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$499',
      description: 'Perfect for small businesses and startups looking to establish their online presence.',
      features: [
        'Responsive website design',
        'Up to 5 pages',
        'Basic SEO setup',
        'Contact form integration',
        'Mobile-friendly design',
        '1 revision round',
        '2 weeks delivery'
      ],
      buttonText: 'Order Starter'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$999',
      description: 'Ideal for growing businesses that need more advanced features and customization.',
      features: [
        'Everything in Starter',
        'Up to 10 pages',
        'Advanced SEO optimization',
        'Blog/news section',
        'Social media integration',
        'Custom animations',
        'Analytics setup',
        '3 revision rounds',
        '4 weeks delivery'
      ],
      popular: true,
      buttonText: 'Order Pro'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$2499',
      description: 'Comprehensive solution for businesses requiring a full-featured web application.',
      features: [
        'Everything in Professional',
        'Custom web application',
        'User authentication system',
        'Database integration',
        'Payment gateway setup',
        'Admin dashboard',
        'Content management system',
        'API integration',
        'Unlimited revisions',
        '8-10 weeks delivery'
      ],
      buttonText: 'Order Premium'
    }
  ];

  // Handle order button click
  const handleOrderClick = (planId: string) => {
    // Navigate to custom order page with the selected plan
    setLocation(`/order?plan=${planId}`);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -15,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.3
      }
    })
  };

  return (
    <section id="pricing" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <motion.div variants={titleVariants} className="text-center mb-16">
            <motion.span className="text-primary font-medium block mb-2">Pricing</motion.span>
            <motion.h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Plans & Packages</motion.h2>
            <motion.p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan tailored to your business needs. Each package is designed to deliver exceptional value and results.
            </motion.p>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                custom={index}
                variants={cardVariants}
                className={`glass rounded-2xl overflow-hidden shadow-lg relative ${
                  hoveredPlan === plan.id ? 'ring-2 ring-primary' : ''
                } ${plan.popular ? 'transform lg:scale-105 z-10' : ''}`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                whileHover="hover"
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute top-5 right-5">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan name and price */}
                  <h3 className="font-heading text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">/project</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {plan.description}
                  </p>

                  {/* Feature list */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={`${plan.id}-feature-${idx}`}
                        custom={idx}
                        variants={featureVariants}
                        className="flex items-start gap-2"
                      >
                        <div className="text-primary mt-1">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action button */}
                  <motion.button
                    onClick={() => handleOrderClick(plan.id)}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 shadow-lg ${
                      plan.popular
                        ? 'bg-primary text-white hover:shadow-blue-500/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-primary hover:text-white dark:hover:bg-primary'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {plan.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact for custom solutions */}
          <motion.div
            variants={titleVariants}
            className="text-center mt-16 glass p-8 rounded-2xl max-w-3xl mx-auto"
          >
            <h3 className="font-heading text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If none of the packages above meet your requirements, I can create a tailored solution specifically for your business needs.
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-8 py-3 bg-primary text-white rounded-full font-medium hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact for Custom Quote
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}