import { useEffect, useState } from 'react';
import Layout from '@/components/common/layout';
import HeroSection from '@/components/hero/hero-section';
import AboutSection from '@/components/about/about-section';
import SkillsSection from '@/components/skills/skills-section';
import TechnologiesSection from '@/components/technologies/technologies-section';
import ProjectsSection from '@/components/projects/projects-section';
import ServicesSection from '@/components/services/services-section';
import PricingSection from '@/components/pricing/pricing-section';
import TestimonialsSection from '@/components/testimonials/testimonials-section';
import FAQSection from '@/components/faq/faq-section';
import AppointmentSection from '@/components/appointment/appointment-section';
import ContactSection from '@/components/contact/contact-section';
import AnimatedLoader from '@/components/loader/animated-loader';

export default function Home() {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to handle section animations on scroll
  useEffect(() => {
    const observeSections = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      // Select all sections with 'fadeIn' class
      const sections = document.querySelectorAll('.fadeIn');
      sections.forEach(section => {
        observer.observe(section);
      });

      return () => {
        sections.forEach(section => {
          observer.unobserve(section);
        });
      };
    };

    observeSections();
  }, []);
  
  // Simulate page load and hide loader after content is ready
  useEffect(() => {
    // Listen for the window load event to ensure all assets are loaded
    const handleLoad = () => {
      // Add a longer delay to make the loader more visible
      setTimeout(() => {
        setIsLoading(false);
      }, 3500);
    };
    
    // If window is already loaded, set a timeout
    if (document.readyState === 'complete') {
      setTimeout(() => {
        setIsLoading(false);
      }, 3500);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      <AnimatedLoader initialLoading={isLoading} />
      
      <Layout>
        <HeroSection />
        <div className="fadeIn">
          <AboutSection />
        </div>
        <div className="fadeIn">
          <SkillsSection />
        </div>
        <div className="fadeIn">
          <TechnologiesSection />
        </div>
        <div className="fadeIn">
          <ProjectsSection />
        </div>
        <div className="fadeIn">
          <ServicesSection />
        </div>
        <div className="fadeIn">
          <PricingSection />
        </div>
        <div className="fadeIn">
          <TestimonialsSection />
        </div>
        <div className="fadeIn">
          <FAQSection />
        </div>
        <div className="fadeIn">
          <AppointmentSection />
        </div>
        <div className="fadeIn">
          <ContactSection />
        </div>
      </Layout>
    </>
  );
}
