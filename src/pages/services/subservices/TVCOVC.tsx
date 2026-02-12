import React from 'react';
import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Film, CheckCircle, ArrowRight, Video, PlayCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const TVCOVC = () => {
  const features = [
    'Professional production team',
    'High-quality cinematography',
    'Scriptwriting & storyboarding',
    'Post-production editing',
    'Color grading & effects',
    'Multi-platform optimization',
    'Broadcast-ready formats',
    'Digital distribution support',
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
              TVC / <span className="text-primary">OVC</span> Production
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Television Commercials and Online Video Commercials that captivate audiences and drive brand awareness across traditional and digital platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Professional Commercial Production</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                From concept to broadcast, we create compelling TVCs and OVCs that tell your brand story effectively. Our production process ensures every frame is crafted to maximize impact and engagement.
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
                <Film className="text-primary" />
                Production Process
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <PlayCircle className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Pre-Production:</strong> Concept development, scripting, and planning
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Video className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Production:</strong> Professional filming with high-end equipment
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Film className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Post-Production:</strong> Editing, color correction, and effects
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PlayCircle className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Distribution:</strong> Format optimization for TV and digital platforms
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Create Your Commercial?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's produce a commercial that captures attention and drives results.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Start Production <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TVCOVC;
