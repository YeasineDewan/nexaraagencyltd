import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Target, CheckCircle, ArrowRight, MousePointer, DollarSign, Users, PieChart } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const PPC = () => {
  const features = [
    'Google Ads management',
    'Facebook & Instagram ads',
    'LinkedIn advertising',
    'Keyword bidding strategy',
    'A/B testing campaigns',
    'Landing page optimization',
    'Conversion tracking',
    'ROI reporting & analysis',
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
              PPC <span className="text-primary">Advertising</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Pay-per-click campaigns that drive targeted traffic and maximize ROI through strategic ad placements across all major platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Results-Driven Advertising</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our PPC experts create and manage high-performing ad campaigns that deliver measurable results. We optimize every aspect of your campaigns to maximize conversions while minimizing costs.
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
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MousePointer className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Targeted Reach:</strong> Show ads to your ideal customers at the right time
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Cost Efficiency:</strong> Optimize bids to get maximum results for your budget
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Quality Traffic:</strong> Drive visitors ready to convert into customers
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PieChart className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Transparent Reporting:</strong> Clear insights into ad spend and performance
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Maximize Your Ad ROI?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create PPC campaigns that drive targeted traffic and deliver measurable results.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get PPC Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PPC;
