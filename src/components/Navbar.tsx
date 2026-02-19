import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronDown, ChevronRight, User, LogOut, ArrowRight, TrendingUp, Code, Palette, Video } from 'lucide-react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItem {
  name: string;
  path: string;
  description: string;
}

interface ServiceCategory {
  icon: any;
  color: string;
  description: string;
  items: ServiceItem[];
}

interface ServicesMenu {
  [key: string]: ServiceCategory;
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleServicesMouseEnter = () => {
    // Clear any existing timeout
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    // Set a timeout to close the dropdown
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
      setHoveredService(null);
      servicesTimeoutRef.current = null;
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    // Clear the close timeout when entering dropdown
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    // Set timeout when leaving dropdown
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
      setHoveredService(null);
      servicesTimeoutRef.current = null;
    }, 200);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
    };
  }, []);

  const servicesMenu: ServicesMenu = {
    'Digital Marketing': {
      icon: TrendingUp,
      color: 'from-red-500 to-orange-500',
      description: 'Grow your online presence',
      items: [
        { name: 'VSMM', path: '/services/digital-marketing/vsmm', description: 'Viral Social Media Marketing' },
        { name: 'SEO Next', path: '/services/digital-marketing/seo-next', description: 'Advanced SEO Solutions' },
        { name: 'Social Media Management', path: '/services/digital-marketing/social-media', description: 'Complete Social Strategy' },
        { name: 'PPC Advertising', path: '/services/digital-marketing/ppc', description: 'Pay-Per-Click Campaigns' },
      ]
    },
    'Web Design & Development': {
      icon: Code,
      color: 'from-red-600 to-orange-600',
      description: 'Build stunning digital experiences',
      items: [
        { name: 'Landing Page', path: '/services/web-development/landing-page', description: 'High-Converting Pages' },
        { name: 'E-commerce', path: '/services/web-development/ecommerce', description: 'Online Store Solutions' },
        { name: 'Portfolio Website', path: '/services/web-development/portfolio', description: 'Showcase Your Work' },
        { name: 'News Portal', path: '/services/web-development/news-portal', description: 'Digital News Platform' },
        { name: 'Corporate Website', path: '/services/web-development/corporate', description: 'Professional Business Sites' },
        { name: 'Web Application/CRM', path: '/services/web-development/web-app', description: 'Custom Business Solutions' },
      ]
    },
    'Creatives Solution': {
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      description: 'Design that inspires action',
      items: [
        { name: 'GoPack', path: '/services/creatives/gopack', description: 'Complete Brand Package' },
        { name: 'Brand Identity', path: '/services/creatives/brand-identity', description: 'Brand Strategy & Design' },
        { name: 'Graphic Design', path: '/services/creatives/graphic-design', description: 'Visual Communication' },
        { name: 'Content Creation', path: '/services/creatives/content-creation', description: 'Engaging Content Strategy' },
      ]
    },
    'Video Production': {
      icon: Video,
      color: 'from-red-400 to-orange-400',
      description: 'Cinematic video production',
      items: [
        { name: 'TVC/OVC', path: '/services/video-production/tvc-ovc', description: 'Television Commercials' },
        { name: 'Micro OVC', path: '/services/video-production/micro-ovc', description: 'Short Video Content' },
        { name: 'Explainer Video', path: '/services/video-production/explainer-video', description: 'Animated Explanations' },
        { name: 'Animation & Motion', path: '/services/video-production/animation-motion', description: 'Motion Graphics' },
        { name: 'Commercial Photoshoot', path: '/services/video-production/commercial-photoshoot', description: 'Professional Photography' },
      ]
    },
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      hasSubMenu: true,
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Case Study', path: '/case-study' },
    { name: 'Blog', path: '/blogs' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#0a0a0a] sticky top-0 z-[100] border-b-2 border-primary/20 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)] lg:rounded-full lg:mx-4 lg:mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3 group">
              <img 
                src="/logo.png" 
                alt="Nexara Agency Ltd" 
                className="h-10 sm:h-12 lg:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden text-primary font-black text-xl sm:text-2xl tracking-tighter uppercase">NEXARA</div>
              <span className="font-black text-xl sm:text-2xl text-primary tracking-tighter uppercase hidden sm:flex items-center gap-1 sm:gap-2">
                NEXARA <span className="text-white text-sm sm:text-lg font-bold hidden md:inline">Agency Ltd.</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative px-3"
                onMouseEnter={link.hasSubMenu ? handleServicesMouseEnter : undefined}
                onMouseLeave={link.hasSubMenu ? handleServicesMouseLeave : undefined}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-bold transition-all duration-300 py-2 px-3 rounded-lg flex items-center gap-1.5 ${
                    isActive(link.path) ? 'text-primary bg-primary/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {link.hasSubMenu && <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />}
                </Link>

                {link.hasSubMenu && (
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ 
                          type: "spring", 
                          damping: 25, 
                          stiffness: 300,
                          duration: 0.3
                        }}
                        className="fixed lg:absolute left-1/2 transform -translate-x-1/2 mt-4 w-[95vw] sm:w-[90vw] md:w-[85vw] max-w-4xl lg:w-[750px] xl:w-[850px] 2xl:w-[900px] lg:top-full lg:mt-4 top-20"
                        style={{ zIndex: 1000 }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="bg-dark-lighter/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[70vh] sm:max-h-[75vh] lg:max-h-[80vh] overflow-y-auto overscroll-contain">
                          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent h-1"></div>
                          <div className="flex flex-col lg:flex-row min-w-0 overflow-hidden">
                            {/* Left Column - Main Categories */}
                            <div className="w-full lg:w-2/5 p-2 sm:p-3 lg:border-r border-white/5 flex-shrink-0">
                              <div className="space-y-1">
                                {Object.entries(servicesMenu).map(([category, data], index) => {
                                  const Icon = data.icon;
                                  return (
                                    <motion.div
                                      key={category}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      onMouseEnter={() => setHoveredService(category)}
                                      className={`group relative px-3 lg:px-4 py-2 lg:py-3 rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-300 ${
                                        hoveredService === category
                                          ? 'bg-gradient-to-r ' + data.color + ' text-white shadow-lg scale-105'
                                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 lg:gap-3">
                                        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                                          hoveredService === category
                                            ? 'bg-white/20 text-white'
                                            : 'bg-white/5 text-gray-400 group-hover:text-white'
                                        }`}>
                                          <Icon size={14} className="lg:size-18" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="font-bold text-xs lg:text-sm mb-0.5 truncate">{category}</div>
                                          <div className={`text-xs lg:text-xs transition-all duration-300 hidden lg:block ${
                                            hoveredService === category ? 'text-white/80' : 'text-gray-500'
                                          }`}>
                                            {data.description}
                                          </div>
                                        </div>
                                        <ChevronRight 
                                          size={14} 
                                          className={`transition-all duration-300 flex-shrink-0 ${
                                            hoveredService === category ? 'text-white translate-x-1' : 'text-gray-600 group-hover:text-gray-400'
                                          }`} 
                                        />
                                      </div>
                                      
                                      {/* Hover indicator */}
                                      {hoveredService === category && (
                                        <motion.div
                                          layoutId="activeService"
                                          className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-xl lg:rounded-2xl"
                                          initial={false}
                                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                      )}
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Right Column - Sub Categories */}
                            <div className="flex-1 p-2 sm:p-4 lg:p-6 min-w-0">
                              {hoveredService && servicesMenu[hoveredService] && (
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="h-full"
                                >
                                  <div className="mb-3 lg:mb-4">
                                    <h3 className="text-lg lg:text-xl font-black text-white mb-1 lg:mb-2 flex items-center gap-2">
                                      <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-gradient-to-r ${servicesMenu[hoveredService].color} flex items-center justify-center`}>
                                        {React.createElement(servicesMenu[hoveredService].icon, { size: 12, className: "lg:size-16 text-white" })}
                                      </div>
                                      <span className="text-sm lg:text-base">{hoveredService}</span>
                                    </h3>
                                    <p className="text-xs lg:text-sm text-gray-400 hidden lg:block">
                                      {servicesMenu[hoveredService].description}
                                    </p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 lg:gap-2">
                                    {servicesMenu[hoveredService].items.map((item: ServiceItem, index) => (
                                      <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                      >
                                        <Link
                                          to={item.path}
                                          className="group p-2 lg:p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 block"
                                          onClick={() => {
                                            setIsServicesOpen(false);
                                            setHoveredService(null);
                                          }}
                                        >
                                          <div className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                              <div className="font-semibold text-xs lg:text-sm mb-0.5 lg:mb-1 group-hover:text-white transition-colors truncate">
                                                {item.name}
                                              </div>
                                              <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors hidden lg:block">
                                                {item.description}
                                              </div>
                                            </div>
                                            <ArrowRight 
                                              size={12} 
                                              className="text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 translate-x-1 flex-shrink-0" 
                                            />
                                          </div>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>

                                  {/* CTA Section */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-4 lg:mt-6 p-3 lg:p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl lg:rounded-2xl border border-primary/20"
                                  >
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                                      <div className="text-center sm:text-left">
                                        <h4 className="font-bold text-white text-xs lg:text-sm mb-1">Need a custom solution?</h4>
                                        <p className="text-xs text-gray-400 hidden sm:block">Let's discuss your specific requirements</p>
                                      </div>
                                      <Button
                                        size="sm"
                                        className="bg-primary hover:bg-primary/90 text-white px-3 lg:px-4 py-1.5 lg:py-2 text-xs font-black rounded-xl w-full sm:w-auto"
                                        onClick={() => {
                                          navigate('/contact');
                                          setIsServicesOpen(false);
                                          setHoveredService(null);
                                        }}
                                      >
                                        Get Quote
                                      </Button>
                                    </div>
                                  </motion.div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <div className="h-8 w-[1px] bg-white/10"></div>
            
            {user ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white leading-none mb-1">{user.name}</span>
                        <span className="text-[10px] text-primary uppercase font-black tracking-widest">{user.role}</span>
                    </div>
                </div>
                <Button 
                    variant="primary" 
                    size="sm" 
                    className="rounded-xl px-5 h-10 font-bold text-xs"
                    onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : user.role === 'employee' ? '/employee/dashboard' : '/client/dashboard')}
                >
                  DASHBOARD
                </Button>
                <button onClick={handleLogout} className="text-gray-500 hover:text-primary transition-all p-2 bg-white/5 rounded-lg border border-white/5">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                 <Link to="/contact">
                    <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors">GET IN TOUCH</button>
                 </Link>
                 <div className="relative">
                    <Button 
                        variant="primary" 
                        onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                        className="flex items-center gap-2 rounded-xl px-6 h-12 font-black text-xs uppercase tracking-widest"
                    >
                      Login <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
                    </Button>
                    
                    <AnimatePresence>
                    {isLoginDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 rounded-3xl shadow-2xl bg-dark-lighter border border-white/10 p-3 z-[70]"
                        onMouseLeave={() => setIsLoginDropdownOpen(false)}
                      >
                        <div className="space-y-1">
                          <Link
                            to="/login"
                            className="flex items-center px-4 py-4 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                            onClick={() => setIsLoginDropdownOpen(false)}
                          >
                             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                                <User className="h-5 w-5 text-primary" />
                             </div>
                             <div>
                                <p className="leading-none mb-1">Standard Portal</p>
                                <p className="text-[10px] font-medium text-gray-600">Client & Partner Access</p>
                             </div>
                          </Link>
                          <Link
                            to="/employee-login"
                             className="flex items-center px-4 py-4 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                            onClick={() => setIsLoginDropdownOpen(false)}
                          >
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mr-4">
                                <User className="h-5 w-5 text-emerald-500" />
                             </div>
                             <div>
                                <p className="leading-none mb-1">Employee Network</p>
                                <p className="text-[10px] font-medium text-gray-600">Authorized Personnel Only</p>
                             </div>
                          </Link>
                           <div className="border-t border-white/5 my-3"></div>
                           <Link
                            to="/register"
                             className="flex items-center justify-center px-4 py-4 text-xs font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-all uppercase tracking-[0.2em]"
                            onClick={() => setIsLoginDropdownOpen(false)}
                          >
                            Create Account
                          </Link>
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] lg:hidden bg-dark p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-12">
             <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <img 
                  src="/logo.png" 
                  alt="Nexara Agency Ltd" 
                  className="h-12 w-auto transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-primary font-extrabold text-2xl tracking-tight">NEXARA</div>
                <span className="font-extrabold text-2xl text-white tracking-tight hidden sm:flex items-center gap-2">NEXARA <span className="text-primary font-bold text-lg">Agency Ltd.</span></span>
             </Link>
             <button onClick={() => setIsOpen(false)} className="p-3 rounded-xl bg-white/5 text-primary">
                <X className="h-6 w-6" />
             </button>
          </div>

          <div className="space-y-4 mb-12">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasSubMenu ? (
                  <div>
                    <div className="text-3xl font-black uppercase tracking-tighter text-gray-700 mb-4">
                      {link.name}
                    </div>
                    <div className="ml-6 space-y-3">
                      {Object.entries(servicesMenu).map(([category, data]) => (
                        <div key={category} className="mb-4">
                          <div className="text-xl font-bold text-white mb-2">{category}</div>
                          <div className="ml-4 space-y-2">
                            {data.items.map((subItem: ServiceItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className="block text-lg text-gray-400 hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block text-3xl font-black uppercase tracking-tighter ${
                        isActive(link.path) ? 'text-primary' : 'text-gray-700 hover:text-white'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {user ? (
               <div className="space-y-4">
                  <div className="p-6 bg-dark-lighter rounded-[2rem] border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl">
                          {user.name.charAt(0)}
                      </div>
                      <div>
                          <p className="text-white font-bold">{user.name}</p>
                          <p className="text-xs text-gray-500 uppercase tracking-widest">{user.role}</p>
                      </div>
                  </div>
                  <Button
                    className="w-full h-16 rounded-[2rem]"
                    onClick={() => {
                      const dashboardPath =
                        user.role === 'admin'
                          ? '/admin/dashboard'
                          : user.role === 'employee'
                          ? '/employee/dashboard'
                          : '/client/dashboard';
                      navigate(dashboardPath);
                      setIsOpen(false);
                    }}
                  >
                    DASHBOARD
                  </Button>
                  <Button variant="secondary" className="w-full h-16 rounded-[2rem]" onClick={handleLogout}>LOGOUT</Button>
               </div>
            ) : (
               <div className="space-y-4">
                  <Link to="/login" className="block w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="secondary" className="w-full h-16 rounded-[2rem] font-black text-lg">LOGIN</Button>
                  </Link>
                  <Link to="/register" className="block w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-16 rounded-[2rem] font-black text-lg">GET STARTED</Button>
                  </Link>
               </div>
            )}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
