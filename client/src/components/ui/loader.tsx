import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "small" | "medium" | "large";
  type?: "spinner" | "dots" | "pulse" | "wave";
  color?: "primary" | "white" | "dark";
  text?: string;
  fullScreen?: boolean;
}

export default function Loader({
  className,
  size = "medium",
  type = "spinner",
  color = "primary",
  text,
  fullScreen = false,
}: LoaderProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  const colorClasses = {
    primary: "text-primary",
    white: "text-white",
    dark: "text-gray-800 dark:text-gray-200",
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <motion.div
            className={cn(
              "border-4 rounded-full border-t-transparent",
              sizeClasses[size],
              colorClasses[color],
              "border-current"
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        );
      case "dots":
        return (
          <div className="flex items-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  "rounded-full bg-current",
                  size === "small" ? "w-1.5 h-1.5" : size === "medium" ? "w-2.5 h-2.5" : "w-4 h-4",
                  colorClasses[color]
                )}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <motion.div
            className={cn(
              "rounded-full bg-current",
              sizeClasses[size],
              colorClasses[color]
            )}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      case "wave":
        return (
          <div className="flex items-center space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  "bg-current",
                  size === "small" ? "w-1 h-5" : size === "medium" ? "w-1.5 h-8" : "w-2 h-12",
                  colorClasses[color],
                  "rounded-full"
                )}
                animate={{ 
                  height: [
                    "40%", 
                    "100%", 
                    "40%"
                  ] 
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Full screen loader with backdrop
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-all">
        {renderLoader()}
        {text && (
          <motion.p 
            className={cn(
              "mt-4 text-center font-medium", 
              colorClasses[color],
              textSizeClasses[size]
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Regular loader
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {renderLoader()}
      {text && (
        <p className={cn("mt-2 text-center", colorClasses[color], textSizeClasses[size])}>
          {text}
        </p>
      )}
    </div>
  );
}