export const projectsData = [
  {
    id: 'tailor-shop',
    title: 'Tailor-Shop SaaS',
    shortDescription: 'A complete SaaS platform that digitalizes the workflow of traditional tailor shops with seamless order management.',
    description: 'A complete SaaS platform to manage custom measurements, orders, and customer communication seamlessly.',
    image: '/projects/tailorshop/tailorshop.png',
    featured: true,
    tags: ['Next.js', 'Node.js', 'PostgreSQL'], // Used in Projects.js
    featureTags: [
      { name: 'SaaS Platform', icon: '🏢', color: '#8B5CF6' },
      { name: 'Management', icon: '📊', color: '#3B82F6' },
      { name: 'Full Stack', icon: '⚙️', color: '#10B981' },
      { name: 'Responsive', icon: '📱', color: '#F59E0B' }
    ],
    liveLink: 'https://tailor-shop-lemon.vercel.app/',
    githubLink: 'https://github.com/Dipanshudaiya/Tailor-shop',
    purpose: 'To digitize the workflow of traditional tailor shops, managing custom measurements, orders, and customer communication seamlessly.',
    problem: 'Existing tailor management methods rely on physical notebooks, leading to lost measurements, missed deadlines, and poor customer communication.',
    solution: 'Tailor-Shop provides a clean UI for precise custom measurements, real-time order tracking (cutting, stitching, ready), and automated notifications.',
    realWorldImpact: 'Enables tailors to manage 5x more orders with zero measurement errors, improving customer satisfaction and business scalability.',
    keyFeatures: [
      'Digital measurement tracking and history',
      'Real-time order status management',
      'Customer database and communication',
      'Role-based access (Admin, Tailor, Customer)',
      'Responsive design for mobile and desktop',
      'Secure data storage and automated backups'
    ],
    techStackDetails: [
      { name: 'Next.js', role: 'React Framework', icon: 'https://img.icons8.com/fluency/48/nextjs.png' },
      { name: 'Node.js', role: 'Runtime Environment', icon: 'https://img.icons8.com/color/48/nodejs.png' },
      { name: 'Express.js', role: 'Web Framework', icon: 'https://img.icons8.com/color/48/express-js.png' },
      { name: 'PostgreSQL', role: 'Database', icon: 'https://img.icons8.com/color/48/postgreesql.png' },
      { name: 'Tailwind CSS', role: 'Styling Framework', icon: 'https://img.icons8.com/color/48/tailwindcss.png' },
      { name: 'Prisma ORM', role: 'Database Toolkit', icon: 'https://img.icons8.com/color/48/prisma-orm.png' }
    ],
    gallery: {
      "User Panel": ['/projects/tailorshop/tailorshop.png', '/projects/tailorshop/tailorshop1.png', '/projects/tailorshop/tailorshop2.png', '/projects/tailorshop/tailorshop3.png', '/projects/tailorshop/tailorshop4.png', '/projects/tailorshop/tailorshop5.png', '/projects/tailorshop/tailorshop6.png', '/projects/tailorshop/tailorshop7.png', '/projects/tailorshop/tailorshop8.png'],
      "Admin Panel": ['/projects/tailorshop/tailorshop9.png', '/projects/tailorshop/tailorshop10.png', '/projects/tailorshop/tailorshop11.png', '/projects/tailorshop/tailorshop12.png', '/projects/tailorshop/tailorshop13.png']
    },
    themeColorDark: '#f59e0b', // Gold/Orange for dark mode
    themeColorLight: '#d97706' // Darker gold for light mode
  },
  {
    id: 'task-management',
    title: 'Task Management App',
    shortDescription: 'A collaborative productivity app to manage tasks, kanban boards, deadlines and teams in real-time.',
    description: 'A productivity app to manage tasks, boards, deadlines and teams.',
    image: '/projects/taskboard.png',
    featured: false,
    tags: ['React', 'Tailwind CSS', 'Firebase'],
    featureTags: [
      { name: 'Real-time', icon: '⚡', color: '#8B5CF6' },
      { name: 'Kanban', icon: '📋', color: '#3B82F6' },
      { name: 'Collaboration', icon: '🤝', color: '#10B981' },
      { name: 'Interactive', icon: '🖱️', color: '#F59E0B' }
    ],
    liveLink: 'https://frontend-task-nine-lake.vercel.app/',
    githubLink: 'https://github.com/Dipanshudaiya/frontend-Task',
    purpose: 'To provide teams with a clear, visual way to organize tasks and collaborate effectively in real-time.',
    problem: 'Without proper task tracking, teams often miss deadlines and face miscommunication about who is doing what.',
    solution: 'Developed an interactive drag-and-drop Kanban board interface with real-time updates, ensuring everyone stays on the same page.',
    realWorldImpact: 'Increases team productivity by 40% through transparent task allocation and immediate progress visibility.',
    keyFeatures: [
      'Drag-and-drop Kanban boards',
      'Real-time updates and syncing across devices',
      'Task assignment and deadline tracking',
      'Customizable workflow columns',
      'Activity history and commenting',
      'Responsive interface for any screen size'
    ],
    techStackDetails: [
      { name: 'React.js', role: 'Frontend Library', icon: 'https://img.icons8.com/color/48/react-native.png' },
      { name: 'Firebase', role: 'Backend as a Service', icon: 'https://img.icons8.com/color/48/firebase.png' },
      { name: 'Tailwind CSS', role: 'Styling Framework', icon: 'https://img.icons8.com/color/48/tailwindcss.png' },
      { name: 'React DnD', role: 'Drag and Drop Library', icon: 'https://img.icons8.com/external-flat-icons-inmotus-design/48/external-Cursor-drag-and-drop-flat-icons-inmotus-design.png' },
      { name: 'Vite', role: 'Build Tool', icon: 'https://img.icons8.com/color/48/vite.png' },
      { name: 'Vercel', role: 'Hosting Platform', icon: 'https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/external-vercel-is-a-cloud-platform-for-static-sites-and-serverless-functions-logo-shadow-tal-revivo.png' }
    ],
    gallery: ['/projects/taskboard.png', '/projects/taskboard.png', '/projects/taskboard.png', '/projects/taskboard.png'],
    themeColorDark: '#8b5cf6', // Purple for dark mode
    themeColorLight: '#6d28d9' // Darker purple for light mode
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Platform Basic',
    shortDescription: 'A blazing fast, full-featured online shopping experience with secure payments and an admin dashboard.',
    description: 'A full-featured e-commerce platform with cart, orders and payments.',
    image: '/projects/ecommerce.png',
    featured: false,
    tags: ['Next.js', 'Stripe', 'MongoDB'],
    featureTags: [
      { name: 'E-Commerce', icon: '🛍️', color: '#8B5CF6' },
      { name: 'Payments', icon: '💳', color: '#3B82F6' },
      { name: 'Secure', icon: '🔒', color: '#10B981' },
      { name: 'SSR', icon: '⚡', color: '#F59E0B' }
    ],
    liveLink: 'https://react-task-sigma-eight.vercel.app/',
    githubLink: 'https://github.com/Dipanshudaiya/react-task',
    purpose: 'To create a modern, fast, and scalable online shopping experience for users and an easy management dashboard for admins.',
    problem: 'Many e-commerce sites suffer from slow load times and complicated checkout processes, resulting in high cart abandonment rates.',
    solution: 'Implemented a server-side rendered application using Next.js for blazing fast performance, integrated with Stripe for a secure 1-click checkout.',
    realWorldImpact: 'Reduces cart abandonment by 25% and handles high traffic volumes smoothly, resulting in better conversion rates.',
    keyFeatures: [
      'Full shopping cart and wishlist functionality',
      'Secure payment processing with Stripe',
      'Admin dashboard for inventory management',
      'User authentication and order history',
      'Advanced product filtering and search',
      'Optimized performance with Server-Side Rendering'
    ],
    techStackDetails: [
      { name: 'Next.js', role: 'React Framework', icon: 'https://img.icons8.com/fluency/48/nextjs.png' },
      { name: 'MongoDB', role: 'NoSQL Database', icon: 'https://img.icons8.com/color/48/mongodb.png' },
      { name: 'Stripe', role: 'Payment Gateway', icon: 'https://img.icons8.com/color/48/stripe.png' },
      { name: 'Node.js', role: 'Runtime Environment', icon: 'https://img.icons8.com/color/48/nodejs.png' },
      { name: 'Mongoose', role: 'ODM Library', icon: 'https://img.icons8.com/color/48/mongoose.png' },
      { name: 'Tailwind CSS', role: 'Styling Framework', icon: 'https://img.icons8.com/color/48/tailwindcss.png' }
    ],
    gallery: ['/projects/ecommerce.png', '/projects/ecommerce.png', '/projects/ecommerce.png', '/projects/ecommerce.png'],
    themeColorDark: '#095a3fff', // Green for dark mode
    themeColorLight: '#048153ff' // Darker green for light mode
  }
];
