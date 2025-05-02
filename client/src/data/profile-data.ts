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
    "Mobile-First Designer"
  ],
  cvUrl: "#", // URL to download CV
  quickFacts: [
    {
      title: "Experience",
      value: "3+ Years",
      icon: "fas fa-user-graduate"
    },
    {
      title: "Projects",
      value: "20+ Completed",
      icon: "fas fa-code-branch"
    },
    {
      title: "Location",
      value: "Delta State, Nigeria",
      icon: "fas fa-map-marker-alt"
    },
    {
      title: "Education",
      value: "Computer Science",
      icon: "fas fa-graduation-cap"
    }
  ],
  workHistory: [
    {
      title: "Senior Developer",
      subtitle: "TechFusion (2022-Present)"
    },
    {
      title: "Frontend Developer",
      subtitle: "WebSolutions (2020-2022)"
    },
    {
      title: "Freelance Developer",
      subtitle: "Self-employed (2019-2020)"
    }
  ],
  education: [
    {
      title: "B.Sc Computer Science",
      subtitle: "University of Nigeria (2016-2020)"
    },
    {
      title: "Web Development",
      subtitle: "Udacity Nanodegree (2019)"
    },
    {
      title: "Flutter Masterclass",
      subtitle: "Google Developer Program (2020)"
    }
  ],
  softSkills: [
    {
      title: "Problem Solving",
      subtitle: "Analytical approach"
    },
    {
      title: "Communication",
      subtitle: "Clear & effective"
    },
    {
      title: "Team Leadership",
      subtitle: "Collaborative mindset"
    }
  ],
  hobbies: [
    {
      title: "Coding Challenges",
      subtitle: "Daily problem solving"
    },
    {
      title: "Reading",
      subtitle: "Tech blogs & books"
    },
    {
      title: "Photography",
      subtitle: "Urban & nature"
    }
  ],
  skills_categories: {
    frontend: [
      { name: "React", percentage: 90 },
      { name: "JavaScript", percentage: 85 },
      { name: "HTML/CSS", percentage: 95 },
      { name: "Responsive Design", percentage: 90 }
    ],
    mobile: [
      { name: "Flutter", percentage: 95 },
      { name: "Dart", percentage: 90 },
      { name: "React Native", percentage: 80 },
      { name: "Mobile UI Design", percentage: 85 }
    ],
    backend: [
      { name: "Node.js", percentage: 85 },
      { name: "Firebase", percentage: 90 },
      { name: "SQL", percentage: 80 },
      { name: "RESTful APIs", percentage: 85 }
    ]
  },
  technologies: [
    { name: "React", icon: "fab fa-react" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Firebase", icon: "fas fa-fire" },
    { name: "SQL", icon: "fas fa-database" },
    { name: "Git", icon: "fab fa-git-alt" }
  ],
  projects: [
    {
      title: "ShopEase Mobile App",
      description: "A Flutter e-commerce app with Firebase backend, cart management, and payment integration.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      category: "Mobile App",
      tags: ["Flutter", "Firebase", "Dart"],
      sourceUrl: "#",
      demoUrl: "#"
    },
    {
      title: "TaskFlow Dashboard",
      description: "A React project management dashboard with task tracking, team collaboration, and data visualization.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1672&q=80",
      category: "Web App",
      tags: ["React", "Firebase", "JavaScript"],
      sourceUrl: "#",
      demoUrl: "#"
    },
    {
      title: "RestaurantAPI",
      description: "A Node.js RESTful API for restaurant management with order processing and menu database.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "Backend",
      tags: ["Node.js", "Express", "MongoDB"],
      sourceUrl: "#",
      demoUrl: "#"
    },
    {
      title: "FitTracker",
      description: "A fitness tracking mobile app with workout plans, progress charts, and social sharing features.",
      image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "Mobile App",
      tags: ["Flutter", "Firebase", "Charts"],
      sourceUrl: "#",
      demoUrl: "#"
    }
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
        "User authentication"
      ],
      notIncluded: [
        "Advanced animations",
        "Payment processing"
      ],
      deliveryTime: "3-4 weeks",
      isPopular: false
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
        "Advanced animations"
      ],
      notIncluded: [
        "Admin dashboard"
      ],
      deliveryTime: "5-6 weeks",
      isPopular: true
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
        "Advanced animations & custom design"
      ],
      notIncluded: [],
      deliveryTime: "8-10 weeks",
      isPopular: false
    }
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/2349156111232"
  }
};
