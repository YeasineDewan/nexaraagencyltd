import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import { CheckCircle, Send, DollarSign, Target, Users, ChevronRight, Star, TrendingUp, Globe, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomQuote = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    
    // Project Details
    projectType: '',
    industry: '',
    companySize: '',
    timeline: '',
    budget: '',
    
    // Service Requirements
    services: [] as string[],
    targetAudience: '',
    competitors: '',
    goals: '',
    
    // Additional Info
    currentChallenges: '',
    expectedOutcomes: '',
    previousExperience: '',
    additionalNotes: '',
    
    // Contact Preferences
    preferredContact: 'email',
    bestTimeToContact: '',
    urgency: 'normal'
  });

  const totalSteps = 4;

  // Progress bar animation variants
  const progressVariants = {
    initial: { width: 0 },
    animate: { width: `${(currentStep / totalSteps) * 100}%` }
  };

  // Step indicator variants
  const stepVariants = {
    inactive: { scale: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
    active: { scale: 1.2, backgroundColor: 'rgb(59, 130, 246)' },
    completed: { scale: 1, backgroundColor: 'rgb(34, 197, 94)' }
  };

  // Service packages
  const servicePackages = [
    {
      id: 'starter',
      name: 'Starter Package',
      price: 'BDT 50,000 - 150,000',
      duration: '1-3 months',
      features: [
        'Basic Website Development',
        'Social Media Setup',
        'SEO Foundation',
        'Monthly Analytics Report',
        'Email Support'
      ],
      idealFor: 'Startups & Small Businesses',
      popular: false
    },
    {
      id: 'growth',
      name: 'Growth Package',
      price: 'BDT 150,000 - 500,000',
      duration: '3-6 months',
      features: [
        'Advanced Web Development',
        'Complete Digital Marketing',
        'Content Strategy & Creation',
        'PPC Campaign Management',
        'Bi-weekly Strategy Calls',
        'Priority Support'
      ],
      idealFor: 'Growing Businesses',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: 'BDT 500,000+',
      duration: '6+ months',
      features: [
        'Custom Enterprise Solutions',
        'Full-Service Marketing',
        'Multi-channel Campaigns',
        'Dedicated Account Manager',
        'Weekly Strategy Meetings',
        '24/7 Support',
        'Custom Analytics Dashboard'
      ],
      idealFor: 'Large Enterprises',
      popular: false
    }
  ];

  // Service options
  const serviceOptions = [
    { id: 'web-dev', name: 'Web Development', icon: Globe, description: 'Custom websites and web applications' },
    { id: 'mobile-app', name: 'Mobile App Development', icon: Phone, description: 'iOS and Android applications' },
    { id: 'digital-marketing', name: 'Digital Marketing', icon: TrendingUp, description: 'Comprehensive marketing strategies' },
    { id: 'seo', name: 'SEO Optimization', icon: Target, description: 'Search engine optimization' },
    { id: 'social-media', name: 'Social Media Management', icon: Users, description: 'Social media strategy and management' },
    { id: 'content', name: 'Content Creation', icon: Star, description: 'Blog posts, videos, graphics' },
    { id: 'ppc', name: 'PPC Advertising', icon: DollarSign, description: 'Pay-per-click campaign management' },
    { id: 'email-marketing', name: 'Email Marketing', icon: Mail, description: 'Email campaigns and automation' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Quote Request Received!</h2>
              <p className="text-gray-400 text-lg mb-8">
                Thank you for your detailed request. Our team will review your project requirements and prepare a comprehensive proposal within 24-48 hours.
              </p>
              <div className="bg-dark-lighter rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-white font-bold mb-4">What happens next?</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <span>Project review by our senior consultants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <span>Custom proposal preparation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <span>Proposal delivery via email</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <span>Consultation call to discuss details</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  name: '', email: '', phone: '', company: '', website: '',
                  projectType: '', industry: '', companySize: '', timeline: '', budget: '',
                  services: [], targetAudience: '', competitors: '', goals: '',
                  currentChallenges: '', expectedOutcomes: '', previousExperience: '', additionalNotes: '',
                  preferredContact: 'email', bestTimeToContact: '', urgency: 'normal'
                });
              }} className="w-full h-16 rounded-2xl">
                Submit Another Request
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-white mb-2">Tell us about yourself</h3>
              <p className="text-gray-400 mb-8">Let's start with the basics so we can understand your needs better.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Email Address *</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
                      placeholder="john@company.com"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Phone Number *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
                      placeholder="+8801XXXXXXXXX"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Company Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
                      placeholder="Acme Corporation"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Website (Optional)</label>
                  <div className="relative">
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300"
                      placeholder="https://yourcompany.com"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Company Size *</label>
                  <div className="relative">
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-dark">Select company size</option>
                      <option value="1-10" className="bg-dark">1-10 employees</option>
                      <option value="11-50" className="bg-dark">11-50 employees</option>
                      <option value="51-200" className="bg-dark">51-200 employees</option>
                      <option value="201-500" className="bg-dark">201-500 employees</option>
                      <option value="500+" className="bg-dark">500+ employees</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-white mb-2">What services do you need?</h3>
              <p className="text-gray-400 mb-8">Select all the services that match your project requirements.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-12">
                {serviceOptions.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`relative p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 group ${
                      formData.services.includes(service.id)
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-white/10 bg-dark-lighter hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        formData.services.includes(service.id) 
                          ? 'bg-primary shadow-lg shadow-primary/30' 
                          : 'bg-white/10 group-hover:bg-white/20'
                      }`}>
                        <service.icon className={`w-7 h-7 transition-all duration-300 ${
                          formData.services.includes(service.id) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg mb-2">{service.name}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                      </div>
                      {formData.services.includes(service.id) && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Project Details</h4>
              <p className="text-gray-400 mb-8">Help us understand your project context better.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Industry *</label>
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-dark">Select your industry</option>
                      <option value="ecommerce" className="bg-dark">E-commerce</option>
                      <option value="healthcare" className="bg-dark">Healthcare</option>
                      <option value="education" className="bg-dark">Education</option>
                      <option value="finance" className="bg-dark">Finance & Banking</option>
                      <option value="realestate" className="bg-dark">Real Estate</option>
                      <option value="hospitality" className="bg-dark">Hospitality & Tourism</option>
                      <option value="technology" className="bg-dark">Technology</option>
                      <option value="manufacturing" className="bg-dark">Manufacturing</option>
                      <option value="retail" className="bg-dark">Retail</option>
                      <option value="other" className="bg-dark">Other</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Timeline *</label>
                  <div className="relative">
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-dark">Select timeline</option>
                      <option value="asap" className="bg-dark">ASAP (Less than 1 month)</option>
                      <option value="1-3" className="bg-dark">1-3 months</option>
                      <option value="3-6" className="bg-dark">3-6 months</option>
                      <option value="6+" className="bg-dark">6+ months</option>
                      <option value="flexible" className="bg-dark">Flexible</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-white mb-2">Choose your package</h3>
              <p className="text-gray-400 mb-8">Select the package that best fits your project scope and budget.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {servicePackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      selectedPackage === pkg.id
                        ? 'scale-105'
                        : 'hover:scale-102'
                    }`}
                  >
                    <div className={`relative h-full p-8 rounded-3xl border-2 transition-all duration-500 overflow-hidden ${
                      selectedPackage === pkg.id
                        ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl shadow-primary/30'
                        : 'border-white/10 bg-gradient-to-br from-dark-lighter to-dark hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10'
                    } ${pkg.popular ? 'ring-2 ring-primary/30 ring-offset-4 ring-offset-dark' : ''}`}>
                      
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl" />
                      </div>
                      
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                            className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-black px-6 py-2.5 rounded-full shadow-xl shadow-primary/40 border border-primary/30"
                          >
                            ⭐ MOST POPULAR
                          </motion.div>
                        </div>
                      )}
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.15 + 0.2 }}
                            className="inline-block"
                          >
                            <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{pkg.name}</h4>
                          </motion.div>
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                          >
                            <div className="text-4xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3">
                              {pkg.price}
                            </div>
                            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{pkg.duration}</div>
                          </motion.div>
                        </div>
                        
                        {/* Features */}
                        <ul className="space-y-4 mb-8">
                          {pkg.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.15 + featureIndex * 0.08 }}
                              className="flex items-start gap-3 text-gray-300 group/item"
                            >
                              <motion.div
                                className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200"
                                whileHover={{ scale: 1.2 }}
                              >
                                <CheckCircle className="w-4 h-4 text-white" />
                              </motion.div>
                              <span className="text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Footer */}
                        <div className="text-center pt-6 border-t border-white/10">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.15 + 0.6 }}
                            className="text-xs text-gray-400 font-medium uppercase tracking-wider"
                          >
                            Perfect for: <span className="text-primary font-semibold">{pkg.idealFor}</span>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {selectedPackage === pkg.id && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="absolute top-6 right-6 z-20"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-xl shadow-primary/40 border-2 border-white/20">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Hover Effect Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none ${
                        selectedPackage === pkg.id ? 'opacity-100' : ''
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-xl font-bold text-white mb-4">Custom Budget Range</h4>
                <p className="text-gray-400 mb-6">Select your preferred budget range for better recommendations.</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {['<50k', '50k-150k', '150k-500k', '500k+'].map((range, index) => (
                    <motion.button
                      key={range}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      onClick={() => setFormData({ ...formData, budget: range })}
                      className={`relative py-4 px-6 rounded-2xl text-sm font-bold transition-all duration-300 border-2 overflow-hidden group ${
                        formData.budget === range
                          ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-dark-lighter border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <span className="relative z-10">BDT {range}</span>
                      {formData.budget === range && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-primary"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-black text-white mb-2">Tell us about your goals</h3>
              <p className="text-gray-400 mb-8">Help us understand your objectives so we can deliver the best results.</p>
              
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Target Audience *</label>
                  <div className="relative">
                    <textarea
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
                      placeholder="Describe your target customers (age, location, interests, pain points, etc.)"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Main Competitors</label>
                  <div className="relative">
                    <textarea
                      name="competitors"
                      value={formData.competitors}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
                      placeholder="List your main competitors and what you like/dislike about their approach"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Project Goals & Objectives *</label>
                  <div className="relative">
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
                      placeholder="What specific results do you want to achieve? (e.g., increase sales by 30%, get 1000 leads per month, improve brand awareness, etc.)"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Current Challenges</label>
                  <div className="relative">
                    <textarea
                      name="currentChallenges"
                      value={formData.currentChallenges}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
                      placeholder="What challenges are you currently facing that you'd like us to solve?"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Expected Outcomes</label>
                  <div className="relative">
                    <textarea
                      name="expectedOutcomes"
                      value={formData.expectedOutcomes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
                      placeholder="What does success look like for this project? How will you measure results?"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Additional Notes</label>
                  <div className="relative">
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-dark-lighter border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all duration-300 resize-none"
                      placeholder="Any other information you'd like to share with us (technical requirements, preferences, constraints, etc.)"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Progress Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-black text-white">Custom Quote Request</h1>
              <div className="text-sm font-bold text-gray-400">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            
            {/* Animated Progress Bar */}
            <div className="relative h-3 bg-dark-lighter rounded-full overflow-hidden mb-8">
              <motion.div
                key={currentStep}
                variants={progressVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary to-primary/80 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </motion.div>
            </div>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <motion.div
                  key={step}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    variants={stepVariants}
                    animate={
                      step === currentStep ? 'active' : 
                      step < currentStep ? 'completed' : 'inactive'
                    }
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold relative"
                  >
                    {step < currentStep ? (
                      <CheckCircle size={20} />
                    ) : (
                      <span>{step}</span>
                    )}
                    {step === currentStep && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-primary opacity-30"
                      />
                    )}
                  </motion.div>
                  <span className={`text-xs font-medium ${
                    step === currentStep ? 'text-primary' : 
                    step < currentStep ? 'text-emerald-500' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Personal' : 
                     step === 2 ? 'Services' : 
                     step === 3 ? 'Package' : 'Goals'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form Content */}
          <div className="bg-dark-lighter rounded-3xl border border-white/10 p-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-center mt-12 pt-8 border-t border-white/10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  currentStep === 1 
                    ? 'bg-dark text-gray-600 cursor-not-allowed' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Previous
              </motion.button>
              
              <div className="flex gap-3">
                {currentStep < totalSteps ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30"
                  >
                    Next Step
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 0, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-10 py-4 bg-gradient-to-r from-primary via-primary to-primary/90 text-white rounded-2xl font-black hover:from-primary/95 hover:via-primary/95 hover:to-primary/85 transition-all duration-300 shadow-xl shadow-primary/40 flex items-center gap-3 uppercase tracking-wider text-sm border border-primary/50"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Send size={20} />
                    </motion.div>
                    Submit Request
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomQuote;
