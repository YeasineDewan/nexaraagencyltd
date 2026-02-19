import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, ArrowRight, Palette, FileText, Image, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const GoPack = () => {
  const features = [
    'Complete brand identity',
    'Logo design & variations',
    'Business card design',
    'Letterhead & stationery',
    'Social media templates',
    'Brand guidelines document',
    'Marketing collateral',
    'Email signature design',
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
              Go<span className="text-primary">Pack</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Complete creative package solutions that bundle design, branding, and marketing materials for comprehensive brand identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">All-in-One Brand Package</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                GoPack provides everything you need to launch or refresh your brand. From logo to marketing materials, we deliver a complete brand identity package that ensures consistency across all touchpoints.
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
                <Package className="text-primary" />
                What's Included
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Palette className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Brand Identity:</strong> Logo, color palette, and typography system
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Stationery Suite:</strong> Business cards, letterhead, and envelopes
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Image className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Marketing Materials:</strong> Brochures, flyers, and social graphics
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Brand Guidelines:</strong> Complete usage rules and standards
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready for a Complete Brand Makeover?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get everything you need to establish a professional brand presence in one comprehensive package.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get GoPack Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GoPack;
