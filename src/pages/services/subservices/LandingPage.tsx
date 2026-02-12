import React from 'react';
import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Code, CheckCircle, ArrowRight, Zap, Target } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const features = [
    'Mobile-responsive design',
    'Fast loading times',
    'SEO optimized',
    'Conversion-focused layouts',
    'A/B testing capabilities',
    'Analytics integration',
    'Lead capture forms',
    'Social proof elements',
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
              Landing <span className="text-primary">Page</span> Development
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              High-converting landing pages designed to capture leads, drive action, and maximize your marketing ROI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Why Choose Our Landing Pages?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our landing pages are engineered for conversion. Every element is strategically placed to guide visitors toward your primary goal, whether that's signing up, making a purchase, or requesting a quote.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-10">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <Target className="text-primary" />
                What's Included
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Zap className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Custom Design:</strong> Tailored to your brand and target audience
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Responsive Development:</strong> Perfect on all devices
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Conversion Optimization:</strong> Tested layouts that convert
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Ongoing Support:</strong> Maintenance and updates included
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Build Your High-Converting Landing Page?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create a landing page that turns visitors into customers.
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

export default LandingPage;
