import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Palette, CheckCircle, ArrowRight, Fingerprint, Type, SwatchBook, Compass } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const BrandIdentity = () => {
  const features = [
    'Logo design & variations',
    'Color palette development',
    'Typography selection',
    'Brand voice & messaging',
    'Visual identity system',
    'Brand guidelines',
    'Marketing templates',
    'Brand strategy consultation',
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
              Brand <span className="text-primary">Identity</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive brand identity design including logos, color palettes, typography, and brand guidelines that define your unique voice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Define Your Brand Essence</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We create distinctive brand identities that capture your company's essence and resonate with your target audience. From visual elements to brand voice, we ensure every touchpoint communicates your unique value.
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
                <Palette className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Fingerprint className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Unique Logo:</strong> Memorable mark that represents your brand essence
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <SwatchBook className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Color System:</strong> Strategic palette that evokes the right emotions
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Type className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Typography:</strong> Font pairings that enhance readability and brand character
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Brand Guidelines:</strong> Comprehensive rules for consistent application
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Define Your Brand?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create a brand identity that sets you apart and connects with your audience.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Brand Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BrandIdentity;
