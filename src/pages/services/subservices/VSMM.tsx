import React from 'react';
import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, ArrowRight, TrendingUp, MessageSquare } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const VSMM = () => {
  const features = [
    'Content creation & scheduling',
    'Community management',
    'Social media advertising',
    'Analytics & reporting',
    'Influencer partnerships',
    'Crisis management',
    'Brand monitoring',
    'Engagement optimization',
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
              VSMM - Virtual Social Media <span className="text-primary">Marketing</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive social media management and strategy to amplify your brand presence across all platforms and drive meaningful engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Complete Social Media Management</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our VSMM service provides end-to-end social media management, from content creation to community engagement. We help you build a strong online presence that connects with your audience and drives business results.
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
                <Users className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Strategic Planning:</strong> Custom social media strategies aligned with your goals
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Content Creation:</strong> Engaging posts, graphics, and videos
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Community Growth:</strong> Build and nurture your online community
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Performance Tracking:</strong> Detailed analytics and ROI reporting
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Amplify Your Social Presence?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create a social media strategy that grows your brand and engages your audience.
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

export default VSMM;
