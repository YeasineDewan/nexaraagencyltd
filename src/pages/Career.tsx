import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, Briefcase, MapPin, Clock, DollarSign, Star, Quote, Upload, CheckCircle, Target, Eye, Zap, Sparkles, Heart, Lightbulb, Users } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  type: string;
  location: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  image: string;
}

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
  date: string;
}

const Career = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    experience: '',
    currentCompany: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    portfolio: '',
    linkedIn: '',
    coverLetter: '',
    resume: null as File | null
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Meta Ads Expert',
      status: 'Open',
      type: 'Full Time',
      location: 'Remote',
      salary: '$50k - $80k',
      experience: '3+ years',
      description: 'We are looking for an experienced Meta Ads Expert to manage and optimize advertising campaigns across Facebook and Instagram platforms.',
      requirements: ['3+ years of Meta Ads experience', 'Proven track record of ROI optimization', 'Strong analytical skills', 'Experience with A/B testing'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '2',
      title: 'Social Media Marketing Manager - Paid Intern',
      status: 'Open',
      type: 'Full Time, Intern',
      location: 'Hybrid',
      salary: '$20k - $30k',
      experience: '0-1 years',
      description: 'Join our team as a paid intern and learn social media marketing from industry experts while working on real client projects.',
      requirements: ['Basic understanding of social media platforms', 'Creative mindset', 'Good communication skills', 'Willingness to learn'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '3',
      title: 'Digital Marketer (VSMM Manager)',
      status: 'Open',
      type: 'Full Time',
      location: 'On-site',
      salary: '$45k - $70k',
      experience: '2+ years',
      description: 'Seeking a versatile digital marketer to manage various social media marketing campaigns and drive brand growth.',
      requirements: ['2+ years in digital marketing', 'Multi-platform expertise', 'Content strategy experience', 'Analytics proficiency'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '4',
      title: 'Video Editor & Motion Designer',
      status: 'Open',
      type: 'Full Time',
      location: 'Remote',
      salary: '$40k - $65k',
      experience: '2+ years',
      description: 'Creative video editor and motion designer needed to produce engaging content for social media and advertising campaigns.',
      requirements: ['Proficiency in Adobe Premiere/After Effects', 'Motion graphics experience', 'Portfolio required', 'Fast turnaround capability'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '5',
      title: 'Asst. Director of Photography (DOP)',
      status: 'Open',
      type: 'Full Time',
      location: 'On-site',
      salary: '$35k - $55k',
      experience: '1-2 years',
      description: 'Assistant DOP to support our lead cinematographer in creating stunning visual content for brands and campaigns.',
      requirements: ['Understanding of camera equipment', 'Lighting knowledge', 'Creative eye for composition', 'Team player'],
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: '6',
      title: 'HR Executive',
      status: 'Closed',
      type: 'Full Time',
      location: 'On-site',
      salary: '$30k - $45k',
      experience: '2+ years',
      description: 'HR Executive to manage recruitment, employee relations, and organizational development.',
      requirements: ['HR experience', 'Strong interpersonal skills', 'Knowledge of labor laws', 'Organizational skills'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Video Editor',
      rating: 5,
      review: 'Working at NEXARA has been an incredible journey. The creative freedom and collaborative environment have helped me grow exponentially as a professional.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      date: '2 months ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Digital Marketing Manager',
      rating: 5,
      review: 'The team culture here is outstanding. Management truly cares about employee growth and provides excellent opportunities for skill development.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      date: '3 months ago'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Meta Ads Specialist',
      rating: 5,
      review: 'Best decision of my career! The projects are challenging, the team is supportive, and the work-life balance is genuinely respected.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      date: '1 month ago'
    },
    {
      id: '4',
      name: 'David Kumar',
      role: 'Content Strategist',
      rating: 4,
      review: 'Great place to work with cutting-edge projects and a forward-thinking approach. The learning curve is steep but rewarding.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      date: '4 months ago'
    }
  ];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setFormData(prev => ({ ...prev, position: job.title }));
    setShowApplicationForm(true);
    setSubmitStatus('idle');
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    setFormData({
      position: '',
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      experience: '',
      currentCompany: '',
      currentSalary: '',
      expectedSalary: '',
      noticePeriod: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      portfolio: '',
      linkedIn: '',
      coverLetter: '',
      resume: null
    });
    setSubmitStatus('idle');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setTimeout(() => {
      handleCloseForm();
    }, 2000);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-dark text-center border-b border-white/5 overflow-hidden">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                initial={{ 
                  opacity: 0,
                  x: `${randomX}%`,
                  y: `${randomY}%`,
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [`${randomY}%`, `${randomY - 10}%`, `${randomY - 20}%`],
                  x: [`${randomX}%`, `${randomX + (Math.random() - 0.5) * 5}%`, `${randomX + (Math.random() - 0.5) * 5}%`],
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-[100px] -top-32 -left-32"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-transparent blur-[80px] -bottom-32 -right-32"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Staggered text animation */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {['Join', 'Our', 'Team'].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-4"
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + i * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.1, color: '#ef4444' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Build your career with a team that values innovation, creativity, and growth
            </motion.p>
            
            <motion.p 
              className="text-gray-500 text-sm uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Home | Career
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-dark-lighter p-12 rounded-3xl border border-red-500/20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="text-4xl opacity-10 font-black text-red-500">!</span>
            </div>
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-6">⚠️ Important Notice</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              NEXARA Agency does not offer jobs via direct WhatsApp or Telegram messages. We strictly follow a formal recruitment process. Please be aware that some individuals are misusing our name to mislead people with unclear intentions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-dark-lighter relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Story
            </motion.h2>
            <motion.h3 
              className="text-4xl md:text-5xl font-black text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Building Dreams, One Career at a Time
            </motion.h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                At NEXARA, we believe that great companies are built by great people. Our journey started with a simple vision: to create a workplace where creativity thrives, innovation flourishes, and careers grow.
              </motion.p>
              <motion.p 
                className="text-gray-400 leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Today, we're a team of passionate professionals who are reshaping the digital marketing landscape. Every team member brings unique talents, fresh perspectives, and an unwavering commitment to excellence.
              </motion.p>
              <motion.p 
                className="text-gray-400 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Join us, and be part of a story that's still being written—a story of growth, innovation, and endless possibilities.
              </motion.p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl shadow-2xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
              >
                <div className="text-4xl font-black text-white">15+</div>
                <div className="text-sm text-white/80 uppercase tracking-wider">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 bg-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Our Values</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">What Drives Us</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These core values shape our culture and guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: <Heart />, title: 'Passion', desc: 'We love what we do and it shows in every project', color: 'text-red-500' },
              { icon: <Lightbulb />, title: 'Innovation', desc: 'Constantly pushing boundaries and exploring new possibilities', color: 'text-yellow-500' },
              { icon: <Users />, title: 'Collaboration', desc: 'Together we achieve more than we ever could alone', color: 'text-blue-500' },
              { icon: <Target />, title: 'Excellence', desc: 'Striving for perfection in every detail, every time', color: 'text-emerald-500' }
            ].map((value, i) => (
              <motion.div
                key={i}
                className="group relative bg-dark-lighter p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ 
                  y: -15,
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
                }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                />
                
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-dark flex items-center justify-center mb-6 ${value.color} group-hover:bg-primary group-hover:text-white transition-all duration-500 relative z-10`}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {value.icon}
                </motion.div>
                
                <motion.h4 
                  className="text-xl font-black text-white mb-3 relative z-10 group-hover:text-primary transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {value.title}
                </motion.h4>
                
                <motion.p 
                  className="text-gray-400 text-sm leading-relaxed relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {value.desc}
                </motion.p>

                {/* Floating particles on hover */}
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ x: '50%', y: '50%', scale: 0 }}
                    whileHover={{
                      x: `${50 + (Math.random() - 0.5) * 100}%`,
                      y: `${50 + (Math.random() - 0.5) * 100}%`,
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 1.5, delay: j * 0.1, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-dark-lighter relative overflow-hidden">
        {/* Parallax background elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px] top-20 left-20"
            initial={{ x: 0, y: 0 }}
            whileInView={{ x: [0, 50, 0], y: [0, 50, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[60px] bottom-20 right-20"
            initial={{ x: 0, y: 0 }}
            whileInView={{ x: [0, -50, 0], y: [0, -50, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Mission */}
            <motion.div
              className="bg-dark p-12 rounded-3xl border border-white/5 relative overflow-hidden"
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div
                className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 relative z-10"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                whileHover={{ rotate: 360 }}
              >
                <Target className="w-8 h-8 text-primary" />
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-black text-white mb-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our Mission
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed text-lg relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                To empower businesses and individuals through innovative digital solutions while fostering a culture of creativity, growth, and excellence. We strive to be the catalyst that transforms visions into reality.
              </motion.p>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="bg-dark p-12 rounded-3xl border border-white/5 relative overflow-hidden"
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              
              <motion.div
                className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 relative z-10"
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                whileHover={{ rotate: -360 }}
              >
                <Eye className="w-8 h-8 text-purple-500" />
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-black text-white mb-6 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our Vision
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed text-lg relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                To become the leading digital agency globally, recognized for innovation, excellence, and transformative impact. We envision a future where every business thrives in the digital ecosystem, powered by our cutting-edge solutions.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Open Positions</h2>
            <p className="text-gray-400 text-lg">Find your perfect role and apply today</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-dark-lighter rounded-2xl overflow-hidden border border-white/5 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-lighter via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        job.status === 'Open' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Briefcase className="w-4 h-4 mr-2 text-primary" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-primary" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  {job.status === 'Open' && (
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="relative w-full h-12 rounded-xl bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary font-bold text-white overflow-hidden group/btn transition-all duration-300 hover:shadow-xl hover:shadow-primary/50"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Apply Now
                        <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Reviews */}
      <section className="py-20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What Our Team Says</h2>
            <p className="text-gray-400 text-lg">Hear from the people who make NEXARA great</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 relative"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                
                <div className="flex items-center mb-6">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/200';
                    }}
                  />
                  <div className="ml-4">
                    <h4 className="text-white font-bold text-lg">{review.name}</h4>
                    <p className="text-gray-400 text-sm">{review.role}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-500 text-sm">{review.date}</span>
                </div>

                <p className="text-gray-300 leading-relaxed">{review.review}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-lighter rounded-3xl border border-white/10 w-full max-w-4xl h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {submitStatus === 'success' ? (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Application Submitted!</h3>
                  <p className="text-gray-400">
                    Thank you for applying. We'll review your application and get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="sticky top-0 bg-dark-lighter border-b border-white/10 p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedJob.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">Fill out the form below to apply</p>
                    </div>
                    <button
                      onClick={handleCloseForm}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                    {/* Personal Information */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Personal Information</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Date of Birth *</label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="+1 234 567 8900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Address Details</h4>
                      
                      <div>
                        <label className="block text-white font-medium mb-1.5 text-sm">Street Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                          placeholder="123 Main Street, Apt 4B"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="New York"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">State/Province *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="NY"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">ZIP/Postal Code *</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="10001"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Country *</label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="United States"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Professional Details</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Years of Experience *</label>
                          <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="3 years"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Current Company</label>
                          <input
                            type="text"
                            name="currentCompany"
                            value={formData.currentCompany}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="ABC Corp"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Current Salary</label>
                          <input
                            type="text"
                            name="currentSalary"
                            value={formData.currentSalary}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="$50,000"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Expected Salary *</label>
                          <input
                            type="text"
                            name="expectedSalary"
                            value={formData.expectedSalary}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="$60,000"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Notice Period *</label>
                          <input
                            type="text"
                            name="noticePeriod"
                            value={formData.noticePeriod}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="30 days"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">Portfolio URL</label>
                          <input
                            type="url"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="https://yourportfolio.com"
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-1.5 text-sm">LinkedIn Profile</label>
                          <input
                            type="url"
                            name="linkedIn"
                            value={formData.linkedIn}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors"
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Documents & Additional Info</h4>
                      
                      <div>
                        <label className="block text-white font-medium mb-1.5 text-sm">Resume/CV *</label>
                        <div className="relative">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            required
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            id="resume-upload"
                          />
                          <label
                            htmlFor="resume-upload"
                            className="flex items-center justify-center w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-gray-400 text-sm hover:border-primary hover:text-white cursor-pointer transition-colors"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {formData.resume ? formData.resume.name : 'Upload Resume (PDF, DOC, DOCX)'}
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-1.5 text-sm">Cover Letter *</label>
                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-white text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                          placeholder="Tell us why you're a great fit for this role..."
                        />
                      </div>
                    </div>

                    <div className="sticky bottom-0 bg-dark-lighter border-t border-white/10 p-4 flex gap-3">
                      <button
                        type="button"
                        onClick={handleCloseForm}
                        className="flex-1 h-12 rounded-xl border border-white/10 bg-transparent text-white hover:bg-white/5 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="relative flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary font-bold text-white overflow-hidden group/submit transition-all duration-300 hover:shadow-xl hover:shadow-primary/50"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Submit Application
                          <CheckCircle className="w-5 h-5 ml-2 group-hover/submit:scale-110 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/submit:translate-x-0 transition-transform duration-300" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Career;
