import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define theme type
export type Theme = 'light' | 'dark';

// Create the theme context interface
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

// Provider props interface
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return newTheme;
    });
  };

  // Apply theme to document when it changes with robust handling for mobile
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Force repaint to avoid visual glitches, especially on mobile
    const forceRepaint = () => {
      const bodyDisplay = body.style.display;
      body.style.display = 'none';
      void body.offsetHeight; // Trigger reflow
      body.style.display = bodyDisplay;
    };
    
    // Add transition class before changing theme to enable smooth transitions
    root.classList.add('theme-transition');
    body.classList.add('theme-transition');
    
    // Apply or remove dark class based on theme to both root and body
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Force all sections to update their styles
    const sections = document.querySelectorAll('section, div, header, footer, main');
    sections.forEach(section => {
      section.classList.add('theme-force-update');
      setTimeout(() => section.classList.remove('theme-force-update'), 50);
    });
    
    // Force repaint after a brief delay to ensure all styles are applied
    setTimeout(forceRepaint, 100);
    
    // Remove transition class after a delay to prevent transitions on page load
    const timeoutId = setTimeout(() => {
      root.classList.remove('theme-transition');
      body.classList.remove('theme-transition');
    }, 800);
    
    return () => clearTimeout(timeoutId);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  return useContext(ThemeContext);
}
