import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Brush, CheckCircle, ArrowRight, LayoutGrid, Image, PenTool, Layers } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const GraphicDesign = () => {
  const features = [
    'Print design & layout',
    'Digital graphics',
    'Social media visuals',
    'Marketing materials',
    'Packaging design',
    'Infographics',
    'Illustrations',
    'Photo editing',
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
              Graphic <span className="text-primary">Design</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Stunning visual designs for print and digital media including brochures, banners, social media graphics, and marketing materials.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Visual Communication Excellence</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We create compelling visual designs that communicate your message effectively and leave a lasting impression. From print to digital, our designs capture attention and drive engagement.
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
                <Brush className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <LayoutGrid className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Print Design:</strong> Brochures, flyers, posters, and business cards
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Image className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Digital Graphics:</strong> Social posts, banners, and web assets
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PenTool className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Custom Illustrations:</strong> Unique artwork tailored to your brand
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Layers className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Marketing Collateral:</strong> Complete suite of promotional materials
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready for Stunning Visuals?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create graphic designs that capture attention and communicate your brand message.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Get Design Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GraphicDesign;
