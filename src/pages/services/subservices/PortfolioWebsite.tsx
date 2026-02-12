import React from 'react';
import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, ArrowRight, Image, Palette } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const PortfolioWebsite = () => {
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
              Portfolio <span className="text-primary">Website</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stunning portfolio websites that showcase your work beautifully and help you stand out in your industry.
            </p>
          </motion.div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Showcase Your Work?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create a portfolio website that impresses clients and showcases your talent.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioWebsite;
