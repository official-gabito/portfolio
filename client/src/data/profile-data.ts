export const profileData = {
  name: "Gabriel Naandum",
  title: "Fullstack Developer",
  email: "messagegabito@gmail.com",
  phone: "+234 915 611 1232",
  location: "Delta State, Nigeria",
  bio: "With over 3 years of experience in mobile and web development, I specialize in creating user-focused applications that deliver exceptional performance and clean code.",
  skills: [
    "Flutter Developer",
    "React Developer",
    "Firebase Expert",
    "Fullstack Developer",
    "Mobile-First Designer",
  ],
  cvUrl: "#", // URL to download CV
  quickFacts: [
    {
      title: "Experience",
      value: "3+ Years",
      icon: "fas fa-user-graduate",
    },
    {
      title: "Projects",
      value: "20+ Completed",
      icon: "fas fa-code-branch",
    },
    {
      title: "Location",
      value: "Delta State, Nigeria",
      icon: "fas fa-map-marker-alt",
    },
    {
      title: "Education",
      value: "Computer Science",
      icon: "fas fa-graduation-cap",
    },
  ],
  workHistory: [
    {
      title: "Senior Developer",
      subtitle: "TechFusion (2022-Present)",
    },
    {
      title: "Frontend Developer",
      subtitle: "WebSolutions (2020-2022)",
    },
    {
      title: "Freelance Developer",
      subtitle: "Self-employed (2019-2020)",
    },
  ],
  education: [
    {
      title: "B.Sc Computer Science",
      subtitle: "University of Nigeria (2016-2020)",
    },
    {
      title: "Web Development",
      subtitle: "Udacity Nanodegree (2019)",
    },
    {
      title: "Flutter Masterclass",
      subtitle: "Google Developer Program (2020)",
    },
  ],
  softSkills: [
    {
      title: "Problem Solving",
      subtitle: "Analytical approach",
    },
    {
      title: "Communication",
      subtitle: "Clear & effective",
    },
    {
      title: "Team Leadership",
      subtitle: "Collaborative mindset",
    },
  ],
  hobbies: [
    {
      title: "Coding Challenges",
      subtitle: "Daily problem solving",
    },
    {
      title: "Reading",
      subtitle: "Tech blogs & books",
    },
    {
      title: "Photography",
      subtitle: "Urban & nature",
    },
  ],
  skills_categories: {
    frontend: [
      { name: "React", percentage: 90 },
      { name: "JavaScript", percentage: 85 },
      { name: "HTML/CSS", percentage: 95 },
      { name: "Responsive Design", percentage: 90 },
    ],
    mobile: [
      { name: "Flutter", percentage: 95 },
      { name: "Dart", percentage: 90 },
      { name: "React Native", percentage: 80 },
      { name: "Mobile UI Design", percentage: 85 },
    ],
    backend: [
      { name: "Node.js", percentage: 85 },
      { name: "Firebase", percentage: 90 },
      { name: "SQL", percentage: 80 },
      { name: "RESTful APIs", percentage: 85 },
    ],
  },
  technologies: [
    { name: "React", icon: "fab fa-react" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "Bootstrap", icon: "fab fa-bootstrap" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Firebase", icon: "fas fa-fire" },
    { name: "SQL", icon: "fas fa-database" },
    { name: "Git", icon: "fab fa-git-alt" },
  ],
 
// Enhanced project data structure
  projects: [
    {
      title: "ShopEase Mobile App",
      description:
        "A Flutter e-commerce app with Firebase backend, cart management, and payment integration.",
      longDescription:
        "ShopEase is a comprehensive mobile e-commerce solution built with Flutter, featuring a modern UI/UX design, real-time inventory management, secure payment processing, and personalized shopping experiences. The app includes advanced features like wishlist management, order tracking, push notifications, and social login integration.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      category: "Mobile App",
      tags: ["Flutter", "Firebase", "Dart"],
      techStack: ["Flutter", "Firebase", "Dart", "Stripe API", "Google Maps API", "Push Notifications"],
      features: [
        "User authentication with social login",
        "Real-time product catalog with search and filters",
        "Shopping cart and wishlist management",
        "Secure payment processing with multiple gateways",
        "Order tracking and history",
        "Push notifications for deals and updates",
        "User reviews and ratings system"
      ],
      challenges: [
        "Implementing real-time synchronization between multiple users",
        "Optimizing app performance for low-end devices",
        "Integrating multiple payment gateways securely",
        "Handling offline functionality and data caching"
      ],
      sourceUrl: "#",
      demoUrl: "#",
    },
    {
      title: "Roadmap-IQ",
      description:
        "Smart educational guide and course research platform. Explore learning roadmaps, compare online courses, and discover profitable career paths in technology.",
      longDescription:
        "Roadmap-IQ is an intelligent educational platform that helps users navigate their learning journey in technology. It provides curated learning paths, course comparisons, career guidance, and skill assessments. The platform uses AI to recommend personalized learning routes based on user goals and current skill levels.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      category: "Web App",
      tags: ["React", "Firebase", "JavaScript"],
      techStack: ["React", "Firebase", "JavaScript", "Chart.js", "Material-UI", "Node.js"],
      features: [
        "Personalized learning roadmaps",
        "Course comparison and reviews",
        "Progress tracking and analytics",
        "Career path recommendations",
        "Skill assessment tools",
        "Community forums and discussions",
        "Integration with popular learning platforms"
      ],
      challenges: [
        "Building an effective recommendation algorithm",
        "Scraping and organizing course data from multiple sources",
        "Creating intuitive data visualizations",
        "Implementing real-time collaboration features"
      ],
      sourceUrl: "https://roadmap-iq.web.app",
      demoUrl: "https://roadmap-iq.web.app",
    },
    {
      title: "RestaurantAPI",
      description:
        "A Node.js RESTful API for restaurant management with order processing and menu database.",
      longDescription:
        "RestaurantAPI is a comprehensive backend solution for restaurant management systems. It provides robust APIs for menu management, order processing, customer management, inventory tracking, and analytics. The system is designed to handle high-volume transactions with real-time updates.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      images: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      category: "Backend",
      tags: ["Node.js", "Express", "MongoDB"],
      techStack: ["Node.js", "Express.js", "MongoDB", "JWT", "Socket.io", "Redis", "Docker"],
      features: [
        "RESTful API with comprehensive documentation",
        "Real-time order processing with WebSocket",
        "Menu and inventory management",
        "Customer and staff authentication",
        "Payment processing integration",
        "Analytics and reporting dashboard",
        "Multi-restaurant support"
      ],
      challenges: [
        "Implementing real-time order updates across multiple clients",
        "Designing scalable database schema for multi-tenant architecture",
        "Ensuring data consistency during high-traffic periods",
        "Implementing secure payment processing workflows"
      ],
      sourceUrl: "#",
      demoUrl: "#",
    },
    {
      title: "FitTracker",
      description:
        "A fitness tracking mobile app with workout plans, progress charts, and social sharing features.",
      longDescription:
        "FitTracker is a comprehensive fitness application that helps users track their workouts, monitor progress, and achieve their fitness goals. The app includes personalized workout plans, nutrition tracking, social features, and detailed analytics to provide a complete fitness ecosystem.",
      image:
        "https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      category: "Mobile App",
      tags: ["Flutter", "Firebase", "Charts"],
      techStack: ["Flutter", "Firebase", "Dart", "Chart.js", "Health Connect API", "Google Fit API"],
      features: [
        "Personalized workout plans and routines",
        "Exercise library with video demonstrations",
        "Progress tracking with detailed charts",
        "Nutrition logging and calorie counting",
        "Social features and community challenges",
        "Wearable device integration",
        "AI-powered workout recommendations"
      ],
      challenges: [
        "Integrating with multiple health and fitness APIs",
        "Creating accurate calorie and exercise calculations",
        "Implementing social features while maintaining privacy",
        "Optimizing battery usage for continuous tracking"
      ],
      sourceUrl: "#",
      demoUrl: "#",
    },
  ],

  services: [
    {
      title: "Basic Mobile App",
      price: "$1,200",
      icon: "fas fa-mobile-alt",
      features: [
        "Single platform (iOS or Android)",
        "Up to 5 app screens",
        "Basic Firebase integration",
        "User authentication",
      ],
      notIncluded: ["Advanced animations", "Payment processing"],
      deliveryTime: "3-4 weeks",
      isPopular: false,
    },
    {
      title: "Advanced Web App",
      price: "$2,500",
      icon: "fas fa-laptop-code",
      features: [
        "Responsive web application",
        "Up to 10 pages/screens",
        "Full Firebase integration",
        "User roles and permissions",
        "Advanced animations",
      ],
      notIncluded: ["Admin dashboard"],
      deliveryTime: "5-6 weeks",
      isPopular: true,
    },
    {
      title: "Full Business Suite",
      price: "$4,500",
      icon: "fas fa-bullseye",
      features: [
        "Web + Mobile applications",
        "Unlimited screens/pages",
        "Full Firebase or custom backend",
        "Payment processing",
        "Admin dashboard",
        "Advanced animations & custom design",
      ],
      notIncluded: [],
      deliveryTime: "8-10 weeks",
      isPopular: false,
    },
  ],
  socials: {
    github: "https://github.com/official-gabito",
    linkedin:
      "https://www.linkedin.com/in/gabriel-naandum-bb366a281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    twitter: "https://x.com/officialgabito1?s=09",
    instagram:
      "https://www.instagram.com/officialgabito2?igsh=bWNsa2R3a25ra2c4",
    Tiktok: "https://vm.tiktok.com/ZSkCrcG9A/",
    whatsapp: "https://wa.me/2349156111232",
  },
};
