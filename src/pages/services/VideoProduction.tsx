import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Video, Film, PlayCircle, Zap, Camera, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const VideoProduction = () => {
  const services = [
    {
      title: 'TVC/OVC',
      description: 'Television Commercials and Online Video Commercials that captivate audiences and drive brand awareness across traditional and digital platforms.',
      icon: Film,
      path: '/services/video-production/tvc-ovc',
    },
    {
      title: 'Micro OVC',
      description: 'Short-form video content optimized for social media platforms, designed to engage viewers and maximize shareability.',
      icon: PlayCircle,
      path: '/services/video-production/micro-ovc',
    },
    {
      title: 'Explainer Video',
      description: 'Clear, concise explainer videos that simplify complex concepts and help your audience understand your products or services.',
      icon: Video,
      path: '/services/video-production/explainer-video',
    },
    {
      title: 'Animation & Motion',
      description: 'Dynamic animated content and motion graphics that bring your brand stories to life with creativity and visual impact.',
      icon: Zap,
      path: '/services/video-production/animation-motion',
    },
    {
      title: 'Commercial Photoshoot',
      description: 'Professional commercial photography services that capture your products, services, and brand essence in stunning visuals.',
      icon: Camera,
      path: '/services/video-production/commercial-photoshoot',
    },
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
              Video <span className="text-primary">Production</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Crafting visual narratives that resonate with your audience through professional video production, animation, and commercial photography.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, i) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-lighter p-10 rounded-[3rem] border border-white/5 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <service.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">{service.description}</p>
                <Link to={service.path}>
                  <Button variant="outline" className="rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-white">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Tell Your Visual Story?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create compelling video content that engages your audience and drives results.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VideoProduction;
