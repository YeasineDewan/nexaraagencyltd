import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Camera, CheckCircle, ArrowRight, Sun, ImageIcon, Palette, Award } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const CommercialPhotoshoot = () => {
  const features = [
    'Professional photography',
    'Product photography',
    'Lifestyle shoots',
    'Corporate headshots',
    'Location scouting',
    'Art direction',
    'Photo retouching',
    'High-res image delivery',
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
              Commercial <span className="text-primary">Photoshoot</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional photography services that capture your products, people, and brand with stunning visual excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Picture-Perfect Results</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our commercial photography captures the essence of your brand with professional quality images. From product shots to corporate portraits, we deliver visuals that elevate your brand and drive engagement.
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
                <Camera className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Sun className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Professional Lighting:</strong> Studio and on-location lighting setups
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">High-Resolution Images:</strong> Print-ready and web-optimized formats
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Palette className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Art Direction:</strong> Styled shots that align with your brand aesthetic
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Premium Quality:</strong> Professional retouching and color grading
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready for Stunning Photography?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's capture professional images that showcase your brand with excellence.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Book Photoshoot <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommercialPhotoshoot;
