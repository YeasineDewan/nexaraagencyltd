import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Lightbulb, CheckCircle, ArrowRight, MessageCircle, Target, Sparkles, MousePointer } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const ExplainerVideo = () => {
  const features = [
    'Script development',
    'Storyboard creation',
    '2D animation',
    'Voiceover recording',
    'Custom illustrations',
    'Motion graphics',
    'Background music',
    'Multiple formats delivery',
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
              Explainer <span className="text-primary">Video</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Animated explainer videos that simplify complex concepts and engage your audience through compelling storytelling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Complex Ideas, Simply Explained</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our explainer videos transform complicated ideas into clear, engaging stories. Using animation and motion graphics, we help your audience understand your product, service, or concept in just minutes.
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
                <Lightbulb className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MessageCircle className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Clear Messaging:</strong> Simplified explanations that anyone can understand
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Audience Focused:</strong> Tailored content for your specific viewers
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Engaging Animation:</strong> Eye-catching visuals that hold attention
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MousePointer className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Call-to-Action:</strong> Videos designed to drive conversions
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Explain Your Idea?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create an explainer video that makes your complex ideas simple and memorable.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Explainer Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExplainerVideo;
