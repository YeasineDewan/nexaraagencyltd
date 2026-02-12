import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Search, Target, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const DigitalMarketing = () => {
  const services = [
    {
      title: 'VSMM',
      description: 'Virtual Social Media Marketing - Comprehensive social media management and strategy to amplify your brand presence across all platforms.',
      icon: Users,
      path: '/services/digital-marketing/vsmm',
    },
    {
      title: 'SEO Next',
      description: 'Advanced search engine optimization strategies to ensure your brand ranks at the top of search results.',
      icon: Search,
      path: '/services/digital-marketing/seo-next',
    },
    {
      title: 'Social Media Management',
      description: 'End-to-end social media management including content creation, scheduling, and community engagement.',
      icon: TrendingUp,
      path: '/services/digital-marketing/social-media',
    },
    {
      title: 'PPC Advertising',
      description: 'Pay-per-click campaigns that drive targeted traffic and maximize ROI through strategic ad placements.',
      icon: Target,
      path: '/services/digital-marketing/ppc',
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
              Digital <span className="text-primary">Marketing</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Elevate your online presence with strategic digital marketing solutions that drive growth, engagement, and measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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
            <h2 className="text-3xl font-black text-white mb-4">Ready to Amplify Your Digital Presence?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how our digital marketing strategies can transform your business growth.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DigitalMarketing;
