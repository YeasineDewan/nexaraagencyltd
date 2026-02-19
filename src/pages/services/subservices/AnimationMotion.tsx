import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Play, CheckCircle, ArrowRight, Sparkles, Layers, Monitor, Wand2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const AnimationMotion = () => {
  const features = [
    '2D motion graphics',
    '3D animation',
    'Logo animations',
    'UI/UX motion design',
    'Title sequences',
    'Visual effects',
    'Character animation',
    'Animated infographics',
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
              Animation & <span className="text-primary">Motion</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Dynamic motion graphics and animations that bring your brand to life with captivating visual storytelling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Motion That Captivates</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We create stunning motion graphics and animations that add energy and excitement to your brand. From logo animations to complex visual effects, we bring static elements to life with fluid, engaging motion.
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
                <Play className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Sparkles className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Visual Impact:</strong> Eye-catching animations that grab and hold attention
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Layers className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Brand Enhancement:</strong> Motion that reinforces your brand identity
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Multi-Platform:</strong> Optimized for web, social, and broadcast
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Wand2 className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Creative Excellence:</strong> Cutting-edge techniques and creative execution
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Add Motion to Your Brand?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create animations and motion graphics that bring your brand to life.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Animation Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AnimationMotion;
