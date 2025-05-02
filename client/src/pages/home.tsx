import Layout from '@/components/common/layout';
import HeroSection from '@/components/hero/hero-section';
import AboutSection from '@/components/about/about-section';
import SkillsSection from '@/components/skills/skills-section';
import ProjectsSection from '@/components/projects/projects-section';
import ServicesSection from '@/components/services/services-section';
import ContactSection from '@/components/contact/contact-section';
import { useEffect } from 'react';

export default function Home() {
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

  return (
    <Layout>
      <HeroSection />
      <div className="fadeIn">
        <AboutSection />
      </div>
      <div className="fadeIn">
        <SkillsSection />
      </div>
      <div className="fadeIn">
        <ProjectsSection />
      </div>
      <div className="fadeIn">
        <ServicesSection />
      </div>
      <div className="fadeIn">
        <ContactSection />
      </div>
    </Layout>
  );
}
