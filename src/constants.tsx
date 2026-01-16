
import { CareerStory, JobOpportunity, Product, MSUEvent, Badge } from './types';

export const CAREER_STORIES: CareerStory[] = [
  {
    id: '1',
    name: 'Joseph Tropp',
    major: 'Computer Science',
    graduationYear: '2022',
    role: 'Full Stack Developer',
    company: 'EcoCash Holdings',
    storyPreview: "Navigating between the tech labs at Gweru Main and the serene research field at Antelope Park taught me that CS is about solving real-world challenges.",
    fullStory: "Joseph's journey began with a fascination for automation. While studying at Gweru Main, he spent weekends at Antelope Park, where he saw a need for digital wildlife tracking systems. This unique mix of high-tech learning and field experience at one of MSU's partner sites solidified his decision to major in Computer Science.",
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'Farai Sibanda',
    major: 'Peace & Governance',
    graduationYear: '2021',
    role: 'Policy Advisor',
    company: 'African Union',
    storyPreview: "I chose my major to understand the delicate balance of regional stability in the SADC region. MSU provided the perfect governance framework.",
    fullStory: "Farai's path was driven by a passion for social justice. The multi-campus environment at MSU allowed him to understand the diverse cultural fabric of Zimbabwe, which is essential for his current work advising on continental policy at the AU.",
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'Faiga Kolodny',
    major: 'Data Science',
    graduationYear: '2023',
    role: 'Data Analyst',
    company: 'Simbisa Brands',
    storyPreview: "Data Science felt like a bridge between my love for math and my desire to help Zimbabwean businesses grow through analytics.",
    fullStory: "Faiga initially struggled to choose between statistics and business. Through the MSU Major Discovery Hub, she realized that Data Science aligned her analytical strengths with the growing data needs of regional enterprises. She now leads optimization projects for retail outlets across the country.",
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
  },
  {
    id: '4',
    name: 'Tinashe Moyo',
    major: 'International Relations',
    graduationYear: '2020',
    role: 'Diplomatic Attaché',
    company: 'Ministry of Foreign Affairs',
    storyPreview: "MSU's Global Hub opened doors to international diplomacy. Choosing IR allowed me to represent Zimbabwe on the world stage.",
    fullStory: "Coming from a small town, Tinashe's worldview expanded exponentially at MSU. By choosing International Relations, he participated in the IRO's immersion tours, which eventually led to a prestigious attachment at the Ministry of Foreign Affairs.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  }
];

export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'j1',
    title: 'International Relations Intern',
    company: 'UNICEF Zimbabwe',
    location: 'Harare, Zimbabwe',
    hasHelpBadge: true,
    alumniContact: { name: 'Dr. Chipo Rugare', role: 'Head of IRO' },
    description: 'Supporting the socio-cultural integration of international students.'
  },
  {
    id: 'j2',
    title: 'Cultural Immersion Coordinator',
    company: 'Antelope Park',
    location: 'Gweru, Zimbabwe',
    hasHelpBadge: true,
    alumniContact: { name: 'Gift Zulu', role: 'Manager' },
    description: 'Liaising between international researchers and local tourism facilities.'
  },
  {
    id: 'j3',
    title: 'Data Analyst (Diplomacy)',
    company: 'SADC Secretariat',
    location: 'Gaborone, Botswana',
    hasHelpBadge: false,
    description: 'Analyzing regional trade patterns and diplomatic relations.'
  }
];

export const STORE_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'IAR Logo T-Shirt - White',
    price: 10.00,
    description: 'Classic white t-shirt featuring the official IAR (International & Alumni Relations Office) logo. Perfect for showing your MSU Global Hub pride. Comfortable cotton blend fabric with the distinctive globe and graduation cap design.',
    image: '/Screenshot 2026-01-16 171230.png',
    category: 'Apparel'
  },
  {
    id: 'p2',
    name: 'IAR Logo T-Shirt - Lime Green',
    price: 10.00,
    description: 'Vibrant lime green t-shirt showcasing the IAR logo in bold blue. Stand out with this eye-catching color while representing the International & Alumni Relations Office. Made from soft, breathable cotton.',
    image: '/Screenshot 2026-01-16 171246.png',
    category: 'Apparel'
  },
  {
    id: 'p3',
    name: 'IAR Logo T-Shirt - Yellow',
    price: 10.00,
    description: 'Bright yellow t-shirt with the iconic IAR logo featuring the globe and graduation cap. Perfect for alumni events and campus activities. High-quality cotton construction for comfort and durability.',
    image: '/Screenshot 2026-01-16 171303.png',
    category: 'Apparel'
  },
  {
    id: 'p4',
    name: 'MSU Alumni Reunion 2026 T-Shirt',
    price: 10.00,
    description: 'Commemorative white t-shirt for the MSU Alumni Reunion 2026. Features a vibrant barbecue scene design celebrating community and tradition. Perfect keepsake from this special gathering of MSU alumni and students.',
    image: '/Screenshot 2026-01-16 171759.png',
    category: 'Apparel'
  }
];

export const UPCOMING_EVENTS: MSUEvent[] = [
  {
    id: 'e5',
    title: 'MSU Alumni Reunion 2025',
    date: 'March 06, 2026',
    time: '09:30 AM - 5:00 PM',
    location: 'Main Campus Gweru',
    category: 'Social',
    description: 'Join us for a full day celebration of global community and local culture. Enjoy delicious grilled meals, traditional Zimbabwean cuisine, and connect with students and alumni from around the world. Full day event.',
    image: '/brai-bg (1).jpg'
  },
  {
    id: 'e1',
    title: 'International Coffee Hour',
    date: 'March 28, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Gweru Main Campus, IRO Lounge',
    category: 'Social',
    description: 'Connect with international students over coffee and traditional Zimbabwean snacks. A great way to build global friendships.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop'
  },
  {
    id: 'e2',
    title: 'Alumni Networking Night',
    date: 'April 05, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Meikles Hotel, Harare',
    category: 'Networking',
    description: 'An exclusive evening for final year students and alumni to network and share career insights in the heart of the capital.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop'
  },
  {
    id: 'e3',
    title: 'Innovation Hub Workshop',
    date: 'April 12, 2024',
    time: '10:00 AM - 1:00 PM',
    location: 'Zvishavane Campus Hub',
    category: 'Academic',
    description: 'Hands-on workshop on starting tech-ventures in the SADC region. Led by successful MSU alumni entrepreneurs.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop'
  },
  {
    id: 'e4',
    title: 'Great Zimbabwe Cultural Tour',
    date: 'April 20, 2024',
    time: 'Full Day',
    location: 'Departure from Gweru Main',
    category: 'Cultural',
    description: 'A guided immersion tour to the Great Zimbabwe Ruins. Earn your Cultural Explorer badge on this trip.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop'
  },
];

// Verified credentials and badges for the MSU Global Hub
export const BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'Cultural Explorer',
    description: 'Completed the Great Zimbabwe immersion tour and submitted a verified reflection.',
    isUnlocked: true,
    earnedDate: 'Jan 2024'
  },
  {
    id: 'b2',
    title: 'Global Networker',
    description: 'Successfully connected with at least 5 alumni mentors via the IRO portal.',
    isUnlocked: true,
    earnedDate: 'Feb 2024'
  },
  {
    id: 'b3',
    title: 'Career Ready',
    description: 'Completed the baseline mock interview series with industry experts.',
    isUnlocked: true,
    earnedDate: 'Mar 2024'
  },
  {
    id: 'b4',
    title: 'Innovation Fellow',
    description: 'Attended a hands-on workshop at the Zvishavane Campus Hub.',
    isUnlocked: false
  },
  {
    id: 'b5',
    title: 'Language Bridge',
    description: 'Completed the IRO Intensive English language support module.',
    isUnlocked: false
  },
  {
    id: 'b6',
    title: 'SADC Ambassador',
    description: 'Completed regional trade and diplomatic relations induction.',
    isUnlocked: false
  }
];
