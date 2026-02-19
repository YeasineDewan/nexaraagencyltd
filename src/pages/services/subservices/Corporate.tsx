import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Building, CheckCircle, ArrowRight, Briefcase, Globe, Shield, Zap } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const Corporate = () => {
  const features = [
    'Professional design',
    'Multi-page structure',
    'About & team sections',
    'Services showcase',
    'Career portal integration',
    'News & updates section',
    'Contact & location pages',
    'Mobile responsive',
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
              Corporate <span className="text-primary">Website</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional corporate websites that reflect your brand identity and provide comprehensive business information to stakeholders.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Enterprise-Grade Web Solutions</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We build sophisticated corporate websites that establish credibility and showcase your company's strengths. From startup to enterprise, we create digital experiences that align with your business objectives.
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
                <Building className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Briefcase className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Professional Image:</strong> Establish trust with polished, authoritative design
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Global Reach:</strong> Multi-language support and international accessibility
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Enterprise Security:</strong> SSL, data protection, and compliance features
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Scalable Architecture:</strong> Built to grow with your business needs
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Elevate Your Corporate Presence?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's build a corporate website that represents your brand with professionalism and authority.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Corporate Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Corporate;
