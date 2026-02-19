import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, ArrowRight, Type, Video, Mic, BookOpen } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const ContentCreation = () => {
  const features = [
    'Blog post writing',
    'Website copywriting',
    'Social media content',
    'Video script writing',
    'Email newsletters',
    'Product descriptions',
    'Press releases',
    'SEO-optimized content',
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
              Content <span className="text-primary">Creation</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Engaging content creation services including copywriting, visual content, and multimedia assets that tell your brand story.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Compelling Content That Converts</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We craft compelling content that resonates with your audience and drives action. From blog posts to video scripts, our content tells your brand story in a way that connects and converts.
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
                <FileText className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Type className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Written Content:</strong> Blogs, articles, and website copy that engages
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Video className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Video Scripts:</strong> Compelling narratives for your video content
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mic className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Audio Content:</strong> Podcast scripts and voiceover content
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <BookOpen className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Brand Storytelling:</strong> Content that builds emotional connections
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Tell Your Story?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create content that captures your brand voice and engages your audience.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Content Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContentCreation;
