import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, ArrowRight, TrendingUp, Globe, Target, BarChart3 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const SEONext = () => {
  const features = [
    'Technical SEO audit',
    'Keyword research & strategy',
    'On-page optimization',
    'Content optimization',
    'Backlink building',
    'Local SEO optimization',
    'Schema markup implementation',
    'Monthly ranking reports',
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
              SEO <span className="text-primary">Next</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced search engine optimization strategies to ensure your brand ranks at the top of search results and drives organic traffic.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Advanced SEO Solutions</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our SEO Next service combines cutting-edge techniques with proven strategies to boost your search rankings. We focus on sustainable, long-term results that keep you ahead of the competition.
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
                <Search className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Higher Rankings:</strong> Dominate search results for your target keywords
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Organic Traffic:</strong> Increase qualified visitors to your website
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Targeted Reach:</strong> Connect with customers actively searching for your services
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Measurable Results:</strong> Detailed analytics and performance tracking
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Rank Higher?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create an SEO strategy that puts your business at the top of search results.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get SEO Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SEONext;
