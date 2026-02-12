import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Code, ShoppingCart, Briefcase, Newspaper, Building, Database, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const WebDevelopment = () => {
  const services = [
    {
      title: 'Landing Page',
      description: 'High-converting landing pages designed to capture leads and drive action. Optimized for performance and user experience.',
      icon: Code,
      path: '/services/web-development/landing-page',
    },
    {
      title: 'E-commerce',
      description: 'Full-featured online stores with secure payment gateways, inventory management, and seamless shopping experiences.',
      icon: ShoppingCart,
      path: '/services/web-development/ecommerce',
    },
    {
      title: 'Portfolio Website',
      description: 'Stunning portfolio websites that showcase your work beautifully and help you stand out in your industry.',
      icon: Briefcase,
      path: '/services/web-development/portfolio',
    },
    {
      title: 'News Portal',
      description: 'Dynamic news websites with content management systems, real-time updates, and engaging reader experiences.',
      icon: Newspaper,
      path: '/services/web-development/news-portal',
    },
    {
      title: 'Corporate Website',
      description: 'Professional corporate websites that reflect your brand identity and provide comprehensive business information.',
      icon: Building,
      path: '/services/web-development/corporate',
    },
    {
      title: 'Web Application/CRM',
      description: 'Custom web applications and CRM systems tailored to streamline your operations and boost productivity.',
      icon: Database,
      path: '/services/web-development/web-app',
    },
  ];

  return (
    <Layout>
      <section className="relative py-32 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl font-black text-white mb-6 uppercase tracking-tight">
              Web Design & <span className="text-primary">Development</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Crafting bespoke websites and web applications that enchant, engage, and deliver exceptional user experiences across all devices.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, i) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-lighter p-10 rounded-[3rem] border border-white/5 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <service.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{service.description}</p>
                <Link to={service.path}>
                  <Button variant="outline" className="rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-white">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Build Your Digital Presence?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a web solution that drives results.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebDevelopment;
