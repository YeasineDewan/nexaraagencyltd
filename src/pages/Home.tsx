import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, TrendingUp, Users as UsersIcon, FileText, ArrowRight, Sparkles, Zap, Target, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ConsultancyForm from '../components/ui/ConsultancyForm';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services = [
    { title: 'Digital Marketing', description: 'Elevate your online presence with our strategic digital marketing solutions.', icon: <TrendingUp />, color: 'text-primary' },
    { title: 'VSMM', subtitle: '(Virtual Social Media Marketing)', description: 'Unlock the true potential of social media with VSMM, your comprehensive package.', icon: <UsersIcon />, color: 'text-indigo-500' },
    { title: 'SEO', subtitle: '(Search Engine Optimization)', description: 'Ensure your brand is seen and heard online with our expert SEO strategies.', icon: <Globe />, color: 'text-orange-500' },
    { title: 'Web Design & Development', description: 'Crafting bespoke websites that enchant and engage, our web design team fuses.', icon: <Code />, color: 'text-emerald-500' },
    { title: 'Content Solutions', description: 'Enticing stories told right - your brand narratives crafted with precision.', icon: <FileText />, color: 'text-pink-500' },
    { title: 'Video Production', subtitle: '(OVC/TVC)', description: 'Crafting visual narratives that resonate, our video production team curates.', icon: <Smartphone />, color: 'text-yellow-500' }
  ];

  const clients = [
    'https://via.placeholder.com/150x50?text=Menova',
    'https://via.placeholder.com/150x50?text=Unique+Group',
    'https://via.placeholder.com/150x50?text=Surovi+Tea',
    'https://via.placeholder.com/150x50?text=Bashundhara',
    'https://via.placeholder.com/150x50?text=PRAN',
    'https://via.placeholder.com/150x50?text=Aarong'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-dark">
        {/* Advanced Animated Background */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Mouse-following gradient orbs */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-[100px]"
            animate={{
              x: 50,
              y: 50,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent blur-[80px]"
            animate={{
              x: 300,
              y: 300,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 25 }}
            style={{ animationDelay: '0.5s' }}
          />
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100, -200],
              }}
              transition={{ 
                duration: 3 + i * 0.5,
                repeat: Infinity,
                repeatDelay: i * 0.8,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-3">
                  <motion.span 
                    className="w-12 h-[2px] bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    Strategic Digital Agency
                  </motion.span>
                </h2>
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Your{' '}
                  <motion.span 
                    className="text-primary inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Strategic
                  </motion.span>
                  {' '}Digital{' '}
                  <motion.span 
                    className="text-primary inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Partner
                  </motion.span>
                  {' '}For Ultimate{' '}
                  <motion.span 
                    className="text-primary inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Success.
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Welcome to NEXARA, one of the leading Digital Marketing agencies in Bangladesh. We help businesses thrive in the digital world through innovative strategies and a results-oriented approach.
                </motion.p>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-6 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/custom-quote">
                    <Button 
                      size="lg" 
                      className="rounded-2xl bg-primary hover:bg-primary-dark px-12 h-16 font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 group overflow-hidden relative"
                    >
                      <motion.span 
                        className="relative z-10"
                        whileHover={{ scale: 1.1 }}
                      >
                        Book Free Consultation
                      </motion.span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                      <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform z-10 relative" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/services">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="rounded-2xl border-white/10 text-white hover:text-primary hover:border-primary px-10 h-16 font-bold uppercase tracking-widest text-xs group overflow-hidden relative"
                    >
                      <motion.span 
                        className="relative z-10"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        Explore All Services
                      </motion.span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-primary/40"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image with Stats */}
      <section className="relative py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="mt-20 lg:mt-0 relative"
            >
              <motion.div 
                className="relative z-10 rounded-[3.5rem] overflow-hidden border-2 border-primary/20 p-2 bg-dark-lighter shadow-2xl group"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.5 }}
              >
                 <div className="rounded-[3rem] overflow-hidden aspect-[4/5] relative">
                    <motion.img 
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                        alt="NEXARA Excellence" 
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                    />
                    <motion.div 
                        className="absolute bottom-10 left-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <div className="flex items-center gap-4 text-white mb-2">
                            <motion.div 
                                className="w-12 h-[2px] bg-primary"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            />
                            <motion.span 
                                className="text-xs font-black uppercase tracking-widest"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            >
                                Agency Insight
                            </motion.span>
                        </div>
                        <motion.h3 
                            className="text-3xl font-bold text-white uppercase tracking-tighter"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            Where Creativity <br/>Meets Results
                        </motion.h3>
                    </motion.div>
                 </div>
              </motion.div>
              {/* Animated Stats Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-10 -right-10 bg-primary p-10 rounded-[2.5rem] shadow-2xl z-20 text-white border-4 border-dark group cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-5xl font-black mb-1"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  98%
                </motion.div>
                <motion.div 
                  className="text-[10px] font-bold uppercase tracking-widest opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  Client Retention
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Marquee */}
      <section className="py-20 bg-dark-lighter border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <motion.h3 
            className="text-center text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Brands that trust NEXARA
          </motion.h3>
        </div>
        <div className="flex gap-20 items-center animate-infinite-scroll">
          {[...clients, ...clients].map((client, i) => (
            <motion.img 
              key={i} 
              src={client} 
              alt="Client" 
              className="h-10 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
            <motion.div 
              className="max-w-3xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.span 
                  className="inline-block w-12 h-[2px] bg-primary mr-3"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
                Our Capabilities
              </motion.h2>
              <motion.h3 
                className="text-5xl md:text-6xl font-black text-white mb-8 leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                High-Impact Solutions For The Modern Digital Ecosystem.
              </motion.h3>
              <motion.p 
                className="text-gray-500 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                We don't just provide services; we engineer success through a unique blend of creativity and data science.
              </motion.p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/services">
                <Button 
                  variant="outline" 
                  className="rounded-2xl border-white/10 text-white hover:text-primary hover:border-primary px-10 h-16 font-bold uppercase tracking-widest text-xs group overflow-hidden relative"
                >
                  <motion.span 
                    className="relative z-10"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    Explore All Services
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-primary/40"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-dark-lighter p-12 rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none"
                  initial={{ scale: 0.8, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                >
                  {React.cloneElement(service.icon as any, { size: 160 })}
                </motion.div>
                <motion.div 
                  className={`w-20 h-20 rounded-2xl bg-dark flex items-center justify-center mb-10 ${service.color} group-hover:bg-primary group-hover:text-white border border-white/5 transition-all duration-500 shadow-xl shadow-black/20`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                >
                  {React.cloneElement(service.icon as any, { size: 36 })}
                </motion.div>
                <motion.h4 
                  className="text-2xl font-black text-white mb-3 uppercase tracking-tighter"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.4 }}
                >
                  {service.title}
                </motion.h4>
                {service.subtitle && (
                  <motion.p 
                    className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 + 0.5 }}
                  >
                    {service.subtitle}
                  </motion.p>
                )}
                <motion.p 
                  className="text-gray-500 leading-relaxed mb-10 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.6 }}
                >
                  {service.description}
                </motion.p>
                <motion.div 
                  className="w-12 h-[3px] bg-primary group-hover:w-full transition-all duration-700"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.7 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Form Section */}
      <section className="py-32 bg-dark-lighter border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-32 items-center">
            <motion.div 
              className="mb-20 lg:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <motion.h2 
                  className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Why Choose <span className="text-primary">NEXARA</span>
                </motion.h2>
                <motion.h3 
                  className="text-5xl font-black text-white mb-8 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Transform Your Digital Presence
                </motion.h3>
                <motion.div 
                  className="space-y-6 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {[
                    { icon: <Target />, title: 'Strategic Planning', desc: 'Data-driven strategies tailored to your unique business needs and market position.' },
                    { icon: <Zap />, title: 'Creative Excellence', desc: 'Award-winning creative team that brings your brand vision to life with stunning visuals.' },
                    { icon: <Eye />, title: 'Results-Focused', desc: 'We measure success by metrics that matter - ROI, engagement, and business growth.' },
                    { icon: <Sparkles />, title: '24/7 Support', desc: 'Round-the-clock dedicated support to ensure your digital campaigns never miss a beat.' }
                  ].map((benefit, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-6 p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        {React.cloneElement(benefit.icon as any, { size: 24, className: "text-primary text-2xl" })}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <ConsultancyForm />
            </motion.div>
            <motion.div 
              className="lg:mb-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center space-y-8">
                <motion.h3 
                  className="text-5xl font-black text-white mb-8 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Join Our Elite Network
                </motion.h3>
                <motion.p 
                  className="text-gray-500 text-xl max-w-2xl mx-auto mb-16 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Connect with industry leaders and experience digital success like never before.
                </motion.p>
                <div className="flex flex-wrap justify-center gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/custom-quote">
                      <Button size="lg" className="rounded-3xl bg-primary hover:bg-primary-dark px-16 h-20 font-black uppercase tracking-[0.2em] text-lg border-none group">
                        Start Your Project
                        <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/contact">
                      <Button variant="outline" size="lg" className="rounded-3xl border-white/10 text-white hover:bg-white/5 px-16 h-20 font-black uppercase tracking-[0.2em] text-lg">
                        Talk To Experts
                        <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-32 bg-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Recent Projects
            </motion.h2>
            <motion.h3 
              className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Explore Our Latest <span className="text-primary">Success Stories</span>
            </motion.h3>
            <motion.p 
              className="text-gray-500 text-xl max-w-2xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Discover how we've helped businesses like yours achieve remarkable digital transformation.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="rounded-3xl border-white/10 text-white hover:text-primary hover:border-primary px-16 h-20 font-black uppercase tracking-[0.2em] text-lg group overflow-hidden relative">
                  <motion.span 
                    className="relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Full Portfolio
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-primary/40"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              { title: 'Menova Platform', client: 'Menova Corp', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'EcoTrack App', client: 'Green Future', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Global Branding', client: 'Global Matrix', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'TechFlow Website', client: 'TechFlow Inc', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Social Campaign', client: 'EcoCraft', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { title: 'Brand Identity', client: 'Lucia Belia', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-dark-lighter rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.h4 
                      className="text-xl font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.title}
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.client}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
