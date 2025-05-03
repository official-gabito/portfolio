import { useState, ReactNode, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import SocialIcons from "./social-icons";
import { profileData } from "@/data/profile-data";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when navigating to a new section
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.a 
            href="#"
            className="font-heading font-bold text-2xl text-primary flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded mr-2">GN</span>
            Gabriel
          </motion.a>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <motion.button 
              id="menuToggle" 
              className="lg:hidden text-lg"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </motion.button>
            
            <div className="hidden lg:flex items-center gap-6">
              <NavLinks />
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden absolute top-full left-0 w-full bg-background shadow-lg py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 flex flex-col gap-4">
                <NavLinks mobile />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20 theme-transition">
        {children}
      </main>

      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <a href="#" className="font-heading font-bold text-2xl text-primary flex items-center mb-4">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded mr-2">GN</span>
                Gabriel
              </a>
              <p className="text-gray-400 dark:text-gray-300 mb-4">
                Building high-quality web and mobile applications that deliver exceptional user experiences.
              </p>
              <SocialIcons />
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 text-gray-100">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Mobile App Development</a></li>
                <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Web Development</a></li>
                <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">UI/UX Design</a></li>
                <li><a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Backend Development</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 text-gray-100">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">About</a></li>
                <li><a href="#projects" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Projects</a></li>
                <li><a href="#pricing" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Pricing</a></li>
                <li><a href="#appointment" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Book Appointment</a></li>
                <li><a href="#contact" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 text-gray-100">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                  <span className="text-gray-400 dark:text-gray-300">{profileData.location}</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-envelope text-primary mt-1"></i>
                  <a href={`mailto:${profileData.email}`} className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">{profileData.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-phone-alt text-primary mt-1"></i>
                  <a href={`tel:${profileData.phone}`} className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">{profileData.phone}</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-300 text-sm">© {new Date().getFullYear()} Gabriel Naandum. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-sm">Privacy Policy</a>
              <span className="mx-2 text-gray-600 dark:text-gray-500">|</span>
              <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300 text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

interface NavLinksProps {
  mobile?: boolean;
}

function NavLinks({ mobile = false }: NavLinksProps) {
  return (
    <>
      <a href="#home" className={`hover:text-primary transition-colors duration-300 ${mobile ? 'py-2' : ''}`}>Home</a>
      <a href="#about" className={`hover:text-primary transition-colors duration-300 ${mobile ? 'py-2' : ''}`}>About</a>
      <a href="#skills" className={`hover:text-primary transition-colors duration-300 ${mobile ? 'py-2' : ''}`}>Skills</a>
      <a href="#projects" className={`hover:text-primary transition-colors duration-300 ${mobile ? 'py-2' : ''}`}>Projects</a>
      <a href="#services" className={`hover:text-primary transition-colors duration-300 ${mobile ? 'py-2' : ''}`}>Services</a>
      <a href="#pricing" className={`hover:text-primary transition-colors duration-300 ${mobile ? 'py-2' : ''}`}>Pricing</a>
      <a href="#appointment" className={`hover:text-primary transition-colors duration-300 ${mobile ? 'py-2' : ''}`}>Book Now</a>
      {mobile ? (
        <a href="#contact" className={`py-2 text-primary font-medium transition-colors duration-300`}>Contact Me</a>
      ) : (
        <a href="#contact" className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-300">Contact Me</a>
      )}
      {mobile && (
        <Link href="/admin" className="py-2 hover:text-primary transition-colors duration-300">Admin</Link>
      )}
    </>
  );
}
