import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Palette, Package, Brush, FileText, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const CreativesSolution = () => {
  const services = [
    {
      title: 'GoPack',
      description: 'Complete creative package solutions that bundle design, branding, and marketing materials for comprehensive brand identity.',
      icon: Package,
      path: '/services/creatives/gopack',
    },
    {
      title: 'Brand Identity',
      description: 'Comprehensive brand identity design including logos, color palettes, typography, and brand guidelines that define your unique voice.',
      icon: Palette,
      path: '/services/creatives/brand-identity',
    },
    {
      title: 'Graphic Design',
      description: 'Stunning visual designs for print and digital media including brochures, banners, social media graphics, and marketing materials.',
      icon: Brush,
      path: '/services/creatives/graphic-design',
    },
    {
      title: 'Content Creation',
      description: 'Engaging content creation services including copywriting, visual content, and multimedia assets that tell your brand story.',
      icon: FileText,
      path: '/services/creatives/content-creation',
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
              Creatives <span className="text-primary">Solution</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Imaginative, innovative, and impactful creative solutions that bring your brand vision to life through compelling design and storytelling.
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
            <h2 className="text-3xl font-black text-white mb-4">Ready to Elevate Your Creative Vision?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create stunning creative solutions that make your brand unforgettable.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Creative Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreativesSolution;
