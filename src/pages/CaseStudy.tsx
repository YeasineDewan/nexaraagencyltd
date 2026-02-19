import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, ArrowUpRight, BarChart3, Target, Rocket, Globe, Zap, Eye, Star, ArrowRight, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Custom hook for animated counter
const useAnimatedCounter = (end: number, duration: number = 2, start: number = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration, start]);

  return { ref, count };
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', prefix = '', duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) => {
  const { ref, count } = useAnimatedCounter(end, duration);
  
  return (
    <span ref={ref} className="inline-block">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Animated Number Card Component
const AnimatedNumberCard = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  label, 
  icon, 
  color = 'text-primary',
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  label: string; 
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group bg-dark-lighter p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-dark flex items-center justify-center mb-6 ${color} group-hover:bg-primary group-hover:text-white border border-white/5 transition-all duration-500`}>
          {icon}
        </div>
        <div className={`text-4xl md:text-5xl font-black ${color} mb-2`}>
          <AnimatedCounter end={value} suffix={suffix} prefix={prefix} duration={2.5} />
        </div>
        <div className="text-gray-500 text-sm uppercase tracking-widest font-semibold">{label}</div>
      </div>
    </motion.div>
  );
};

// Floating Particle Component
const FloatingParticle = ({ delay = 0, position = { x: 0, y: 0 } }: { delay?: number; position?: { x: number; y: number } }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/50 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [0, -100, -200],
        x: [0, 20, -20],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    />
  );
};

// Gradient Orb Component
const GradientOrb = ({ className = '', delay = 0 }: { className?: string; delay?: number }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] ${className}`}
      animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
    />
  );
};

// Case Study Card Component
const CaseStudyCard = ({ 
  title, 
  description, 
  logo, 
  stats, 
  tags,
  color = 'primary',
  index = 0 
}: { 
  title: string; 
  description: string; 
  logo: string; 
  stats: { value: number; suffix: string; label: string }[];
  tags: string[];
  color?: string;
  index?: number;
}) => {
  const colorClasses: Record<string, string> = {
    primary: 'text-primary',
    emerald: 'text-emerald-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
  };
  
  const accentColor = colorClasses[color] || colorClasses.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group bg-dark-lighter p-10 md:p-12 rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
    >
      {/* Background Effect */}
      <motion.div 
        className={`absolute top-0 right-0 w-64 h-64 bg-${color}/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ backgroundColor: color === 'primary' ? 'rgba(255, 0, 0, 0.1)' : undefined }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <motion.span 
            className="px-4 py-1.5 bg-white text-dark text-[10px] font-bold uppercase tracking-widest rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Case Study
          </motion.span>
          <motion.div 
            className="text-2xl md:text-3xl font-black text-white"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {logo}
          </motion.div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + i * 0.1 }}
            >
              <div className={`text-4xl md:text-5xl font-black ${accentColor} mb-1`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
              </div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Description */}
        <motion.p 
          className="text-gray-400 text-sm leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          {description}
        </motion.p>
        
        {/* Tags */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          {tags.map((tag, i) => (
            <motion.span 
              key={i}
              className="px-4 py-1.5 rounded-full border border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Partner Logo Component
const PartnerLogo = ({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
    >
      <img 
        src={src} 
        alt={alt}
        className="h-10 md:h-12 object-contain"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </motion.div>
  );
};

// Main Case Study Component
const CaseStudy = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Parallax scroll hook
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const caseStudies = [
    {
      title: 'SEOK Trusted for Life',
      description: 'Celebrating Client Success: Our Commitment to Your Triumph! At NEXARA Agency Ltd, we take pride in the success stories of our clients. Through strategic digital marketing and innovative solutions, we helped SEOK achieve unprecedented growth.',
      logo: 'SEOK',
      stats: [
        { value: 320, suffix: '%', label: 'Booked Meetings' },
        { value: 150, suffix: 'K', label: 'Average Deal Size' }
      ],
      tags: ['VSMM', 'Web Design', 'SEO'],
      color: 'primary'
    },
    {
      title: 'Lucia Belia Success Journey',
      description: 'Partner with us for personalized solutions, steadfast support, and a track record of client triumphs. Together, let\'s achieve greatness! Our data-driven approach helped Lucia Belia transform their digital presence.',
      logo: 'Lucia Belia',
      stats: [
        { value: 85, suffix: '%', label: 'Positive Replies' },
        { value: 500, suffix: '+', label: 'Booked Meetings' }
      ],
      tags: ['Digital Marketing', 'Content', 'Analytics'],
      color: 'emerald'
    },
    {
      title: 'TechStart Growth Story',
      description: 'How we helped a startup transform their digital presence and achieve 10x growth in just 6 months through comprehensive digital marketing strategies.',
      logo: 'TechStart',
      stats: [
        { value: 1000, suffix: '%', label: 'Revenue Growth' },
        { value: 50, suffix: 'K+', label: 'Monthly Users' }
      ],
      tags: ['Web Development', 'SEO', 'PPC'],
      color: 'purple'
    },
    {
      title: 'GlobalCorp Brand Overhaul',
      description: 'A complete digital transformation that repositioned GlobalCorp as an industry leader, resulting in increased brand recognition and customer engagement.',
      logo: 'GlobalCorp',
      stats: [
        { value: 250, suffix: '%', label: 'Brand Awareness' },
        { value: 75, suffix: '%', label: 'Lead Increase' }
      ],
      tags: ['Branding', 'Social Media', 'Content'],
      color: 'orange'
    }
  ];

  const partners = [
    { name: 'Menova', logo: 'https://via.placeholder.com/150x50?text=Menova' },
    { name: 'Unique Group', logo: 'https://via.placeholder.com/150x50?text=Unique+Group' },
    { name: 'Surovi Tea', logo: 'https://via.placeholder.com/150x50?text=Surovi+Tea' },
    { name: 'Bashundhara', logo: 'https://via.placeholder.com/150x50?text=Bashundhara' },
    { name: 'PRAN', logo: 'https://via.placeholder.com/150x50?text=PRAN' },
    { name: 'Aarong', logo: 'https://via.placeholder.com/150x50?text=Aarong' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-dark">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Gradient Orbs */}
          <GradientOrb className="w-[800px] h-[800px] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent -top-40 -left-40" delay={0} />
          <GradientOrb className="w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent top-1/2 right-0" delay={2} />
          <GradientOrb className="w-[500px] h-[500px] bg-gradient-to-t from-blue-500/10 to-transparent bottom-0 left-1/3" delay={4} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <FloatingParticle 
              key={i} 
              delay={i * 0.5} 
              position={{ x: 5 + i * 8, y: 20 + (i % 4) * 15 }} 
            />
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8">
                  <motion.span 
                    className="w-12 h-[2px] bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  />
                  Case Study
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Transforming <span className="text-primary">Digital</span> <br/>
                Presence <span className="text-primary">Into</span> <br/>
                Measurable <span className="text-primary">Growth.</span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Discover how we helped our clients achieve remarkable results through strategic digital marketing, data-driven campaigns, and innovative solutions.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary-dark font-bold text-lg shadow-2xl shadow-primary/30 group overflow-hidden relative"
                    onClick={() => navigate('/case-studies')}
                  >
                    <motion.span className="relative z-10" whileHover={{ scale: 1.05 }}>
                      View Case Studies
                    </motion.span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40" 
                      initial={{ x: '-100%' }} 
                      whileHover={{ x: '0%' }} 
                      transition={{ duration: 0.3 }} 
                    />
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform z-10 relative" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="flex flex-wrap gap-8 md:gap-12 pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                    <AnimatedCounter end={320} suffix="%" duration={2.5} />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors">ROI Increase</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    <AnimatedCounter end={5} suffix="M" duration={2.5} />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors">Impressions</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    <AnimatedCounter end={3} suffix="x" duration={2.5} />
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors">Lead Growth</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Analytics Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative lg:mt-0 mt-16"
              style={{ y: y1 }}
            >
              <motion.div
                className="bg-dark-lighter p-8 md:p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Glow Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <div>
                    <h4 className="font-bold text-white text-xl">Performance Analytics</h4>
                    <div className="text-xs text-gray-500 mt-1">Last 6 Months</div>
                  </div>
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BarChart3 size={24} />
                  </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { label: 'Total Revenue', value: 2.4, prefix: '$', suffix: 'M', inc: '+320%', color: 'text-emerald-500' },
                    { label: 'Conversion Rate', value: 8.7, suffix: '%', inc: '+156%', color: 'text-emerald-500' },
                    { label: 'Avg. CTR', value: 12.4, suffix: '%', inc: '+215%', color: 'text-emerald-500' },
                    { label: 'Total Leads', value: 18.5, suffix: 'K', inc: '+287%', color: 'text-emerald-500' }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      className="bg-dark p-6 rounded-2xl border border-white/5 group-hover:border-primary/20 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-gray-500 text-xs mb-2">{stat.label}</div>
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {stat.prefix || ''}<AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />{!stat.prefix && stat.suffix}
                      </div>
                      <div className={`text-[10px] font-bold ${stat.color}`}>{stat.inc} increase</div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <motion.div 
                  className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-dark-lighter border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <motion.h3 
            className="text-center text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by Industry Leaders
          </motion.h3>
        </div>
        
        <div className="flex gap-12 md:gap-20 items-center justify-center flex-wrap px-4">
          {partners.map((partner, i) => (
            <PartnerLogo 
              key={i} 
              src={partner.logo} 
              alt={partner.name} 
              delay={i * 0.1} 
            />
          ))}
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-24 bg-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Impact</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Numbers That <span className="text-primary">Speak</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedNumberCard 
              value={500} 
              suffix="+" 
              label="Projects Completed"
              icon={<BarChart3 size={24} />}
              color="text-primary"
              delay={0}
            />
            <AnimatedNumberCard 
              value={98} 
              suffix="%" 
              label="Client Satisfaction"
              icon={<Star size={24} />}
              color="text-emerald-500"
              delay={0.1}
            />
            <AnimatedNumberCard 
              value={15} 
              suffix="+" 
              label="Years Experience"
              icon={<Rocket size={24} />}
              color="text-purple-500"
              delay={0.2}
            />
            <AnimatedNumberCard 
              value={50} 
              suffix="+" 
              label="Team Members"
              icon={<Users size={24} />}
              color="text-orange-500"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-32 bg-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GradientOrb className="w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-transparent top-1/4 -left-32" />
          <GradientOrb className="w-[500px] h-[500px] bg-gradient-to-l from-purple-500/10 to-transparent bottom-1/4 -right-32" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Featured Work</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              See How Businesses <span className="text-primary">Grow</span> With Us
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Real results from real clients. Discover how our strategic approaches have transformed businesses across industries.
            </p>
          </motion.div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 4).map((study, i) => (
              <CaseStudyCard
                key={i}
                {...study}
                index={i}
              />
            ))}
          </div>

          {/* View All Button */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                className="border-white/10 text-white hover:text-primary hover:border-primary px-10 h-14 rounded-xl group"
                onClick={() => navigate('/case-studies')}
              >
                <span className="font-bold">View All Case Studies</span>
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-32 bg-dark-lighter relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Approach</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              How We <span className="text-primary">Deliver Results</span>
            </h2>
          </motion.div>

          {/* Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'We dive deep into your business to understand goals, challenges, and opportunities.', icon: <Target size={28} />, color: 'from-primary/20 to-primary/5' },
              { step: '02', title: 'Strategy', desc: 'Our team crafts a comprehensive digital strategy tailored to your unique needs.', icon: <BarChart3 size={28} />, color: 'from-purple-500/20 to-purple-500/5' },
              { step: '03', title: 'Implementation', desc: 'We bring your strategy to life with creative solutions and cutting-edge tech.', icon: <Rocket size={28} />, color: 'from-emerald-500/20 to-emerald-500/5' },
              { step: '04', title: 'Optimization', desc: 'We continuously monitor, analyze, and optimize for maximum performance.', icon: <Zap size={28} />, color: 'from-orange-500/20 to-orange-500/5' }
            ].map((process, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className={`bg-gradient-to-br ${process.color} p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 h-full`}>
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className="w-14 h-14 rounded-2xl bg-dark flex items-center justify-center text-primary"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {process.icon}
                    </motion.div>
                    <span className="text-4xl font-black text-white/10">{process.step}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{process.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{process.desc}</p>
                </div>
                
                {/* Connector Line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-dark border-2 border-primary/30 flex items-center justify-center"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight size={12} className="text-primary" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO, TechStart', content: 'NEXARA transformed our digital presence completely. Their strategic approach helped us grow 300% in just 6 months.', rating: 5 },
              { name: 'Michael Chen', role: 'Marketing Director, GlobalCorp', content: 'The team at NEXARA is exceptional. They understand our brand and deliver results that exceed expectations.', rating: 5 },
              { name: 'Emily Rodriguez', role: 'Founder, Creative Studio', content: 'Working with NEXARA has been a game-changer. Their innovative solutions and attention to detail are unmatched.', rating: 5 }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="group bg-dark-lighter p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.1 }}
                    >
                      <Star size={16} className="text-primary fill-primary" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary/10 via-dark to-dark relative overflow-hidden">
        <GradientOrb className="w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-transparent top-0 left-0" />
        <GradientOrb className="w-[400px] h-[400px] bg-gradient-to-l from-purple-500/20 to-transparent bottom-0 right-0" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Ready to <span className="text-primary">Transform</span> Your Business?
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              Join hundreds of successful businesses that have achieved extraordinary growth with NEXARA. Let's create your success story together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="rounded-2xl bg-primary hover:bg-primary-dark px-12 h-16 font-bold shadow-2xl shadow-primary/30 group"
                  onClick={() => navigate('/custom-quote')}
                >
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl border-white/20 text-white hover:bg-white/5 px-12 h-16 font-bold"
                  onClick={() => navigate('/contact')}
                >
                  Talk to Experts
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudy;
