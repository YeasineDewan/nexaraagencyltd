export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  logo: string;
  stats: {
    value: number;
    suffix: string;
    label: string;
  }[];
  tags: string[];
  color: string;
  image?: string;
  clientName: string;
  industry: string;
  duration: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'SEOK Trusted for Life',
    description: 'Celebrating Client Success: Our Commitment to Your Triumph! At NEXARA Agency Ltd, we take pride in the success stories of our clients. Through strategic digital marketing and innovative solutions, we helped SEOK achieve unprecedented growth.',
    logo: 'SEOK',
    stats: [
      { value: 320, suffix: '%', label: 'Booked Meetings' },
      { value: 150, suffix: 'K', label: 'Average Deal Size' }
    ],
    tags: ['VSMM', 'Web Design', 'SEO'],
    color: 'primary',
    clientName: 'SEOK',
    industry: 'Digital Marketing',
    duration: '6 Months'
  },
  {
    id: '2',
    title: 'Lucia Belia Success Journey',
    description: 'Partner with us for personalized solutions, steadfast support, and a track record of client triumphs. Together, let\'s achieve greatness! Our data-driven approach helped Lucia Belia transform their digital presence.',
    logo: 'Lucia Belia',
    stats: [
      { value: 85, suffix: '%', label: 'Positive Replies' },
      { value: 500, suffix: '+', label: 'Booked Meetings' }
    ],
    tags: ['Digital Marketing', 'Content', 'Analytics'],
    color: 'emerald',
    clientName: 'Lucia Belia',
    industry: 'E-commerce',
    duration: '8 Months'
  },
  {
    id: '3',
    title: 'TechStart Growth Story',
    description: 'How we helped a startup transform their digital presence and achieve 10x growth in just 6 months through comprehensive digital marketing strategies and cutting-edge technology solutions.',
    logo: 'TechStart',
    stats: [
      { value: 1000, suffix: '%', label: 'Revenue Growth' },
      { value: 50, suffix: 'K+', label: 'Monthly Users' }
    ],
    tags: ['Web Development', 'SEO', 'PPC'],
    color: 'purple',
    clientName: 'TechStart',
    industry: 'Technology',
    duration: '6 Months'
  },
  {
    id: '4',
    title: 'GlobalCorp Brand Overhaul',
    description: 'A complete digital transformation that repositioned GlobalCorp as an industry leader, resulting in increased brand recognition, customer engagement, and market share.',
    logo: 'GlobalCorp',
    stats: [
      { value: 250, suffix: '%', label: 'Brand Awareness' },
      { value: 75, suffix: '%', label: 'Lead Increase' }
    ],
    tags: ['Branding', 'Social Media', 'Content'],
    color: 'orange',
    clientName: 'GlobalCorp',
    industry: 'Corporate',
    duration: '12 Months'
  },
  {
    id: '5',
    title: 'RetailMax E-commerce Revolution',
    description: 'Complete e-commerce platform redesign with integrated marketing strategies that resulted in 500% increase in online sales and improved customer experience.',
    logo: 'RetailMax',
    stats: [
      { value: 500, suffix: '%', label: 'Sales Increase' },
      { value: 200, suffix: 'K+', label: 'Products Listed' }
    ],
    tags: ['E-commerce', 'Web Design', 'Marketing'],
    color: 'primary',
    clientName: 'RetailMax',
    industry: 'Retail',
    duration: '4 Months'
  },
  {
    id: '6',
    title: 'HealthPlus Digital Transformation',
    description: 'Comprehensive healthcare digital solution including patient portal, appointment system, and telemedicine platform that improved patient engagement by 400%.',
    logo: 'HealthPlus',
    stats: [
      { value: 400, suffix: '%', label: 'Patient Engagement' },
      { value: 10, suffix: 'K+', label: 'Monthly Appointments' }
    ],
    tags: ['Healthcare', 'Web Development', 'App'],
    color: 'emerald',
    clientName: 'HealthPlus',
    industry: 'Healthcare',
    duration: '10 Months'
  }
];

export const partners: Partner[] = [
  { id: '1', name: 'Menova', logo: 'https://via.placeholder.com/150x50?text=Menova' },
  { id: '2', name: 'Unique Group', logo: 'https://via.placeholder.com/150x50?text=Unique+Group' },
  { id: '3', name: 'Surovi Tea', logo: 'https://via.placeholder.com/150x50?text=Surovi+Tea' },
  { id: '4', name: 'Bashundhara', logo: 'https://via.placeholder.com/150x50?text=Bashundhara' },
  { id: '5', name: 'PRAN', logo: 'https://via.placeholder.com/150x50?text=PRAN' },
  { id: '6', name: 'Aarong', logo: 'https://via.placeholder.com/150x50?text=Aarong' },
  { id: '7', name: 'Unilever', logo: 'https://via.placeholder.com/150x50?text=Unilever' },
  { id: '8', name: 'Nestle', logo: 'https://via.placeholder.com/150x50?text=Nestle' }
];

export const stats: Stat[] = [
  { id: '1', value: 500, suffix: '+', label: 'Projects Completed', icon: 'BarChart3', color: 'text-primary' },
  { id: '2', value: 98, suffix: '%', label: 'Client Satisfaction', icon: 'Star', color: 'text-emerald-500' },
  { id: '3', value: 15, suffix: '+', label: 'Years Experience', icon: 'Rocket', color: 'text-purple-500' },
  { id: '4', value: 50, suffix: '+', label: 'Team Members', icon: 'Users', color: 'text-orange-500' }
];

export const processSteps: ProcessStep[] = [
  { 
    id: '1', 
    step: '01', 
    title: 'Discovery', 
    description: 'We dive deep into your business to understand goals, challenges, and opportunities through comprehensive research.', 
    icon: 'Target',
    color: 'from-primary/20 to-primary/5'
  },
  { 
    id: '2', 
    step: '02', 
    title: 'Strategy', 
    description: 'Our team crafts a comprehensive digital strategy tailored to your unique needs and market position.', 
    icon: 'BarChart3',
    color: 'from-purple-500/20 to-purple-500/5'
  },
  { 
    id: '3', 
    step: '03', 
    title: 'Implementation', 
    description: 'We bring your strategy to life with creative solutions and cutting-edge technology.', 
    icon: 'Rocket',
    color: 'from-emerald-500/20 to-emerald-500/5'
  },
  { 
    id: '4', 
    step: '04', 
    title: 'Optimization', 
    description: 'We continuously monitor, analyze, and optimize for maximum performance and growth.', 
    icon: 'Zap',
    color: 'from-orange-500/20 to-orange-500/5'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart',
    content: 'NEXARA transformed our digital presence completely. Their strategic approach helped us grow 300% in just 6 months. Highly recommended!',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'GlobalCorp',
    content: 'The team at NEXARA is exceptional. They understand our brand and deliver results that exceed expectations every single time.',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Creative Studio',
    content: 'Working with NEXARA has been a game-changer for our business. Their innovative solutions and attention to detail are unmatched.',
    rating: 5
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'CEO',
    company: 'RetailMax',
    content: 'Our e-commerce sales increased by 500% after working with NEXARA. Their expertise in digital marketing is truly remarkable.',
    rating: 5
  },
  {
    id: '5',
    name: 'Lisa Wang',
    role: 'Director',
    company: 'HealthPlus',
    content: 'The healthcare platform they built exceeded our expectations. Patient engagement improved by 400% within the first month.',
    rating: 5
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Owner',
    company: 'SEOK',
    content: 'Professional, knowledgeable, and results-driven. NEXARA helped us achieve our digital marketing goals beyond our imagination.',
    rating: 5
  }
];

export const heroStats = [
  { value: 320, suffix: '%', label: 'ROI Increase' },
  { value: 5, suffix: 'M', label: 'Impressions' },
  { value: 3, suffix: 'x', label: 'Lead Growth' }
];

export const analyticsCards = [
  { label: 'Total Revenue', value: 2.4, prefix: '$', suffix: 'M', inc: '+320%', color: 'text-emerald-500' },
  { label: 'Conversion Rate', value: 8.7, suffix: '%', inc: '+156%', color: 'text-emerald-500' },
  { label: 'Avg. CTR', value: 12.4, suffix: '%', inc: '+215%', color: 'text-emerald-500' },
  { label: 'Total Leads', value: 18.5, suffix: 'K', inc: '+287%', color: 'text-emerald-500' }
];
