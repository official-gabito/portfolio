import { useState, ReactNode, useEffect, useRef, createContext, useContext } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import SocialIcons from "./social-icons";
import { profileData } from "@/data/profile-data";
import { useTheme } from "@/context/theme-context";

interface LayoutProps {
  children: ReactNode;
}

// Create context for mobile menu state
interface MobileMenuContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  toggleMobileMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
  toggleMobileMenu: () => {},
});

// Desktop navigation links
function NavLinks() {
  const { setIsMobileMenuOpen } = useContext(MobileMenuContext);
  
  return (
    <>
      <a 
        href="#home" 
        className="hover:text-primary transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Home
      </a>
      <a 
        href="#about" 
        className="hover:text-primary transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        About
      </a>
      <a 
        href="#skills" 
        className="hover:text-primary transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Skills
      </a>
      <a 
        href="#projects" 
        className="hover:text-primary transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Projects
      </a>
      <a 
        href="#services" 
        className="hover:text-primary transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Services
      </a>
      <a 
        href="#pricing" 
        className="hover:text-primary transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Pricing
      </a>
      <a 
        href="#appointment" 
        className="hover:text-primary transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Book Now
      </a>
      <a 
        href="#contact" 
        className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Contact Me
      </a>
    </>
  );
}

// Mobile navigation with icons and active state highlighting
function MobileSidebarLinks() {
  const [activeSection, setActiveSection] = useState('home');
  const { toggleMobileMenu } = useContext(MobileMenuContext);

  // Navigation items with icons
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About Me', icon: 'user' },
    { id: 'skills', label: 'Skills', icon: 'code' },
    { id: 'projects', label: 'Projects', icon: 'folder-open' },
    { id: 'services', label: 'Services', icon: 'briefcase' },
    { id: 'pricing', label: 'Pricing', icon: 'tag' },
    { id: 'appointment', label: 'Book Appointment', icon: 'calendar-alt' },
    { id: 'contact', label: 'Contact Me', icon: 'envelope' },
  ];
  
  const handleClick = (id: string) => {
    setActiveSection(id);
    toggleMobileMenu(); // Close the mobile menu after clicking
  };
  
  return (
    <>
      {navItems.map(item => (
        <motion.a 
          key={item.id}
          href={`#${item.id}`} 
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
            activeSection === item.id 
              ? 'bg-primary/10 text-primary font-medium' 
              : 'hover:bg-muted'
          }`}
          onClick={() => handleClick(item.id)}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className={`fas fa-${item.icon} w-5 h-5 ${activeSection === item.id ? 'text-primary' : ''}`} />
          <span>{item.label}</span>
        </motion.a>
      ))}
      
      <div className="mt-4 pt-4 border-t">
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="/admin" 
            className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-lock w-5 h-5" />
            <span>Admin Panel</span>
          </Link>
        </motion.div>
      </div>
    </>
  );
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle closing the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      // When opening the menu, prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // When closing, restore scrolling
      document.body.style.overflow = '';
    }
  };

  // Close mobile menu when navigating to a new section
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  // Create the mobile menu context value
  const mobileMenuContextValue = {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    toggleMobileMenu
  };

  return (
    <MobileMenuContext.Provider value={mobileMenuContextValue}>
      {/* Mobile overlay when sidebar is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={sidebarRef}
            className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs z-50 bg-background shadow-xl lg:hidden overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-5 flex justify-between items-center border-b">
              <h2 className="font-heading font-bold text-xl">Menu</h2>
              <button
                className="text-foreground p-2 rounded-full hover:bg-muted transition-colors"
                onClick={toggleMobileMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="flex flex-col py-4 px-6 gap-2">
              <MobileSidebarLinks />
            </div>
            <div className="p-6 border-t mt-auto">
              <SocialIcons className="flex justify-center space-x-6" />
              <p className="text-center text-muted-foreground text-sm mt-4">© {new Date().getFullYear()} Gabriel Naandum</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav 
        className="fixed top-0 w-full z-30 bg-background dark:bg-background shadow-sm transition-colors duration-300 backdrop-blur-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.a 
            href="#home"
            className="font-heading font-bold text-2xl text-primary flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded mr-2">GN</span>
            Gabriel
          </motion.a>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <motion.button 
              className="flex lg:hidden items-center justify-center w-10 h-10 text-foreground hover:bg-muted rounded-full transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMobileMenuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="12" x2="20" y2="12"></line>
                      <line x1="4" y1="6" x2="20" y2="6"></line>
                      <line x1="4" y1="18" x2="20" y2="18"></line>
                    </>
                  )}
                </svg>
              </motion.div>
            </motion.button>
            
            <div className="hidden lg:flex items-center gap-6">
              <NavLinks />
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="pt-20 theme-transition">
        {children}
      </main>

      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <a href="#home" className="font-heading font-bold text-2xl text-primary flex items-center mb-4">
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
                <li><a href="#services" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Mobile App Development</a></li>
                <li><a href="#services" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Web Development</a></li>
                <li><a href="#services" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">UI/UX Design</a></li>
                <li><a href="#services" className="text-gray-400 dark:text-gray-300 hover:text-primary transition-colors duration-300">Backend Development</a></li>
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
    </MobileMenuContext.Provider>
  );
}