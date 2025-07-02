import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Mock profile data for demo
const profileData = {
  skills: [
    "Frontend Developer",
    "Mobile App Developer",
    "Full Stack Developer",
    "UI/UX Designer",
  ],
};

// SVG wave component
const WaveSVG = () => (
  <svg
    className="waves absolute bottom-0 left-0 w-full h-20"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
    shapeRendering="auto"
  >
    <defs>
      <path
        id="gentle-wave"
        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
      />
    </defs>
    <g className="parallax">
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="0"
        fill="rgba(59, 130, 246, 0.1)"
      />
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="3"
        fill="rgba(59, 130, 246, 0.05)"
      />
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="5"
        fill="rgba(59, 130, 246, 0.03)"
      />
      <use
        xlinkHref="#gentle-wave"
        x="48"
        y="7"
        fill="rgba(59, 130, 246, 0.02)"
      />
    </g>
  </svg>
);

// Magnetic button effect hook
const useMagneticEffect = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const magneticPull = 0.4;
      button.style.transform = `translate(${x * magneticPull}px, ${
        y * magneticPull
      }px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = "translate(0px, 0px)";
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return buttonRef;
};

// Tech info data - Only 5 technologies as requested
const techData = {
  flutter: {
    name: "Flutter",
    description:
      "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
    use: "Cross-platform mobile development, iOS and Android apps, Desktop applications",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    color: "from-blue-400 to-cyan-500",
  },
  javascript: {
    name: "JavaScript",
    description:
      "A versatile programming language that runs in browsers and servers, powering interactive web experiences and modern applications.",
    use: "Web development, frontend/backend programming, dynamic content, API development",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "from-yellow-400 to-orange-500",
  },
  react: {
    name: "React",
    description:
      "A powerful JavaScript library for building user interfaces, especially single-page applications with dynamic and interactive content.",
    use: "Frontend development, component-based architecture, interactive web apps, SPA development",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "from-blue-500 to-cyan-400",
  },
  firebase: {
    name: "Firebase",
    description:
      "Google's comprehensive platform for building mobile and web applications with real-time databases, authentication, and hosting services.",
    use: "Backend-as-a-Service, real-time databases, user authentication, cloud hosting, push notifications",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "from-orange-400 to-red-500",
  },
  nodejs: {
    name: "Node.js",
    description:
      "A JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side for scalable backend development.",
    use: "Backend development, API creation, server-side applications, microservices, real-time applications",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "from-green-400 to-emerald-500",
  },
};

// Enhanced Popup component
const TechPopup = ({
  tech,
  isOpen,
  onClose,
}: {
  tech: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!tech) return null;

  return (
    <motion.div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700"
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{
          scale: isOpen ? 1 : 0.7,
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 50,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          type: "spring",
          stiffness: 300,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`p-3 rounded-xl bg-gradient-to-r ${tech.color} shadow-lg`}
          >
            <img src={tech.logo} alt={tech.name} className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {tech.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Programming Technology
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
            About {tech.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {tech.description}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
            What I use it for:
          </h4>
          <p className="text-blue-600 dark:text-blue-400 text-sm leading-relaxed">
            {tech.use}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

// Fixed Orbiting tech logo component - stable positioning
const OrbitingTechLogo = ({
  techKey,
  index,
  totalLogos,
  radius,
  delay,
  onClick,
}: {
  techKey: string;
  index: number;
  totalLogos: number;
  radius: number;
  delay: number;
  onClick: () => void;
}) => {
  const tech = techData[techKey as keyof typeof techData];

  // Fixed angle calculation with guaranteed spacing
  const baseAngle = (360 / totalLogos) * index;
  const minSpacing = 360 / totalLogos; // Minimum 72 degrees between logos
  const adjustedAngle = baseAngle + (index * minSpacing * 0.1); // Small adjustment for visual balance

  // Use same rotation speed for all logos to maintain formation
  const rotationSpeed = 25; // Same speed for all

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        style={{
          width: radius * 2,
          height: radius * 2,
          marginLeft: -radius,
          marginTop: -radius,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: rotationSpeed,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute cursor-pointer pointer-events-auto"
          style={{
            left: Math.cos((adjustedAngle * Math.PI) / 180) * radius + radius - 20,
            top: Math.sin((adjustedAngle * Math.PI) / 180) * radius + radius - 20,
          }}
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          animate={{
            rotate: -360, // Counter-rotation to keep logos facing up
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: rotationSpeed,
              ease: "linear",
            },
          }}
        >
          <motion.div
            className={`backdrop-blur-md bg-gradient-to-r ${tech.color} p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20`}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 3, // Same floating duration for all
                ease: "easeInOut",
                delay: delay * 0.2,
              },
            }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-8 h-8 sm:w-9 sm:h-9"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))",
                imageRendering: "crisp-edges",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function HeroSection() {
  const [typewriterText, setTypewriterText] = useState("");
  const [selectedTech, setSelectedTech] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Create parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Magnetic buttons
  const viewWorkButtonRef = useMagneticEffect();
  const contactButtonRef = useMagneticEffect();

  const handleTechClick = (techKey: string) => {
    console.log("Tech clicked:", techKey); // Debug log
    const selectedTechData = techData[techKey as keyof typeof techData];
    console.log("Selected tech data:", selectedTechData); // Debug log
    setSelectedTech(selectedTechData);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setSelectedTech(null), 300);
  };

  const typewriterRef = useRef<{
    phrases: string[];
    currentPhraseIndex: number;
    currentLetterIndex: number;
    isDeleting: boolean;
  }>({
    phrases: profileData.skills,
    currentPhraseIndex: 0,
    currentLetterIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    const typeText = () => {
      const { phrases, currentPhraseIndex, currentLetterIndex, isDeleting } =
        typewriterRef.current;
      const currentPhrase = phrases[currentPhraseIndex];

      let typingSpeed = 100;
      if (isDeleting) {
        typingSpeed = 50;
      } else if (currentLetterIndex === currentPhrase.length) {
        typingSpeed = 1000;
      } else if (currentLetterIndex === 0) {
        typingSpeed = 500;
      }

      if (isDeleting) {
        setTypewriterText(currentPhrase.substring(0, currentLetterIndex - 1));
        typewriterRef.current.currentLetterIndex -= 1;
      } else {
        setTypewriterText(currentPhrase.substring(0, currentLetterIndex + 1));
        typewriterRef.current.currentLetterIndex += 1;
      }

      if (!isDeleting && currentLetterIndex === currentPhrase.length) {
        typewriterRef.current.isDeleting = true;
      } else if (isDeleting && currentLetterIndex === 0) {
        typewriterRef.current.isDeleting = false;
        typewriterRef.current.currentPhraseIndex =
          (currentPhraseIndex + 1) % phrases.length;
      }

      setTimeout(typeText, typingSpeed);
    };

    const timeout = setTimeout(typeText, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Define the 5 tech logos with their keys
  const techLogos = ["flutter", "javascript", "react", "firebase", "nodejs"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <section
        id="home"
        ref={sectionRef}
        className="min-h-screen flex items-center py-20 relative overflow-hidden"
      >
        {/* Floating background shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Content container */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <motion.div
              className="lg:w-1/2 space-y-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ opacity }}
            >
              <motion.div
                className="backdrop-blur-sm bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl shadow-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <motion.p
                  className="text-blue-600 dark:text-blue-400 font-medium text-base sm:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  Welcome to my portfolio
                </motion.p>
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 text-gray-900 dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Hi, I'm{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Gabriel Naandum
                  </span>
                </motion.h1>
                <div className="h-16 mt-4">
                  <motion.p
                    className="inline-block font-mono text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {typewriterText}
                    <span className="animate-pulse">|</span>
                  </motion.p>
                </div>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  I build beautiful, responsive, and performant web and mobile
                  applications with a focus on user experience and clean code.
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <motion.a
                  ref={viewWorkButtonRef}
                  href="#projects"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:bg-blue-700"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
                <motion.a
                  ref={contactButtonRef}
                  href="#contact"
                  className="backdrop-blur-sm bg-white/10 border border-white/20 px-6 sm:px-8 py-3 sm:py-4 text-blue-600 dark:text-blue-400 rounded-full font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] mx-auto relative">
                {/* Animated outer rings */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                  }}
                />

                <motion.div
                  className="absolute inset-2 bg-gradient-to-l from-cyan-400/20 to-blue-600/20 rounded-full"
                  animate={{
                    scale: [1.05, 1, 1.05],
                    rotate: [360, 0],
                  }}
                  transition={{
                    scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                    rotate: { repeat: Infinity, duration: 15, ease: "linear" },
                  }}
                />

                {/* Profile image container */}
                <motion.div
                  className="relative w-full h-full p-4 z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="backdrop-blur-sm bg-white/20 border border-white/30 w-full h-full rounded-full p-3 shadow-2xl">
                    <img
                      src="./assets/my_picture.jpg"
                      alt="Gabriel Naandum"
                      className="rounded-full w-full h-full object-cover border-2 border-white/20"
                    />
                  </div>
                </motion.div>

                {/* Orbiting tech logos - Fixed to prevent clashing */}
                {techLogos.map((techKey, index) => (
                  <OrbitingTechLogo
                    key={techKey}
                    techKey={techKey}
                    index={index}
                    totalLogos={techLogos.length}
                    radius={140}
                    delay={1.2 + index * 0.2}
                    onClick={() => handleTechClick(techKey)}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <motion.a
              href="#about"
              className="backdrop-blur-sm bg-white/10 border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 text-blue-600 dark:text-blue-400 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-sm font-medium">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </motion.a>
          </motion.div>
        </div>

        {/* Wave SVG at the bottom */}
        <WaveSVG />

        {/* Tech Info Popup - Enhanced */}
        <TechPopup
          tech={selectedTech}
          isOpen={isPopupOpen}
          onClose={closePopup}
        />
      </section>
    </div>
  );
}
