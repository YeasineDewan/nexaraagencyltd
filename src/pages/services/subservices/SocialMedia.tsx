import React from 'react';
import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle, ArrowRight, Calendar, MessageCircle, BarChart2, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const SocialMedia = () => {
  const features = [
    'Content calendar management',
    'Post creation & scheduling',
    'Community engagement',
    'Social listening',
    'Hashtag strategy',
    'Competitor analysis',
    'Monthly analytics reports',
    'Crisis management',
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
              Social Media <span className="text-primary">Management</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              End-to-end social media management including content creation, scheduling, and community engagement to grow your brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Complete Social Strategy</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We handle every aspect of your social media presence. From crafting compelling content to engaging with your community, we ensure your brand stays active and relevant across all platforms.
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
                <TrendingUp className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Calendar className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Strategic Planning:</strong> Consistent posting schedule aligned with your goals
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Creative Content:</strong> Eye-catching posts that drive engagement
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Active Engagement:</strong> Respond to comments and build relationships
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart2 className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Growth Analytics:</strong> Track followers, engagement, and reach
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Dominate Social Media?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's build a social media presence that engages your audience and grows your brand.
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

export default SocialMedia;
