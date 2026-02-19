import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Smartphone, CheckCircle, ArrowRight, Zap, Share2, Play, TrendingUp } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const MicroOVC = () => {
  const features = [
    '15-60 second videos',
    'Vertical format optimized',
    'Platform-specific edits',
    'Quick turnaround time',
    'Script & concept writing',
    'Music & sound design',
    'Captions & text overlays',
    'Hook optimization',
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
              Micro <span className="text-primary">OVC</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Short, punchy video content optimized for social media platforms that grabs attention and drives engagement in seconds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Short-Form Video Mastery</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Micro OVC delivers bite-sized video content perfect for TikTok, Instagram Reels, YouTube Shorts, and social feeds. We create scroll-stopping videos that deliver your message fast and drive action.
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
                <Smartphone className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Zap className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Instant Impact:</strong> Hook viewers in the first 3 seconds
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Share2 className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Viral Potential:</strong> Content optimized for shares and engagement
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Play className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Platform Ready:</strong> Formatted for every major social platform
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Algorithm Friendly:</strong> Designed to perform with platform algorithms
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Go Viral?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create short-form video content that stops the scroll and drives engagement.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Micro OVC Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MicroOVC;
