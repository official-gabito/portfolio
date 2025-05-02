import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      aria-label="Toggle dark mode"
      className="theme-switch"
      onClick={toggleTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.95 }}
    />
  );
}
