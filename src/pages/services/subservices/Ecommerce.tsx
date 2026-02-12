import React from 'react';
import Layout from '../../../components/Layout';
import { Link } from 'react-router-dom';
import { ShoppingCart, CheckCircle, ArrowRight, Shield, CreditCard, Package } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { motion } from 'framer-motion';

const Ecommerce = () => {
  const features = [
    'Secure payment gateways',
    'Inventory management',
    'Order tracking system',
    'Customer accounts',
    'Product reviews & ratings',
    'Shopping cart functionality',
    'Multi-currency support',
    'Mobile-optimized checkout',
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
              E-commerce <span className="text-primary">Solutions</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Full-featured online stores with secure payment gateways, inventory management, and seamless shopping experiences that drive sales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Complete E-commerce Platform</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Build a powerful online store that handles everything from product catalog management to secure checkout. Our e-commerce solutions are scalable, secure, and designed to grow with your business.
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
                <ShoppingCart className="text-primary" />
                Key Features
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Shield className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Secure Payments:</strong> Multiple payment gateway integrations
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Package className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Inventory Control:</strong> Real-time stock management
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CreditCard className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Order Management:</strong> Complete order processing system
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ShoppingCart className="text-primary mt-1" size={18} />
                  <div>
                    <strong className="text-white">Analytics Dashboard:</strong> Track sales and performance metrics
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Launch Your Online Store?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's build an e-commerce platform that drives sales and grows your business.
            </p>
            <Link to="/custom-quote">
              <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest">
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ecommerce;
