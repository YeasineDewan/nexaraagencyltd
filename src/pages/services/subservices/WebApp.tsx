import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { Database, CheckCircle, ArrowRight, Cloud, Lock, Users, LineChart } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const WebApp = () => {
  const features = [
    'Custom web application development',
    'CRM system integration',
    'Database design & management',
    'User authentication & roles',
    'API development & integration',
    'Real-time data processing',
    'Cloud deployment',
    'Ongoing maintenance & support',
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
              Web Application / <span className="text-primary">CRM</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Custom web applications and CRM systems tailored to streamline your operations, boost productivity, and drive business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Bespoke Business Solutions</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We develop powerful web applications and CRM systems that automate workflows, manage customer relationships, and provide actionable insights. From concept to deployment, we build software that works exactly how your business needs it.
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
                <Database className="text-primary" />
                What We Deliver
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Cloud className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Cloud-Based Access:</strong> Work from anywhere with secure cloud deployment
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Enterprise Security:</strong> Multi-layer authentication and data protection
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Team Collaboration:</strong> Role-based access and workflow management
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <LineChart className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Business Intelligence:</strong> Dashboards and analytics for data-driven decisions
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's build a custom web application or CRM that streamlines your operations and drives growth.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebApp;
