import React from 'react';
import Layout from '../components/Layout';
import { Check, Zap, TrendingUp, Users as UsersIcon, Globe, Code, FileText, Smartphone, Video, Lightbulb, BarChart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesWithPricing = () => {
  const allServices = [
    { title: 'Digital Marketing', desc: 'Elevate your online presence with our strategic digital marketing solutions.', icon: <TrendingUp /> },
    { title: 'VSMM', subtitle: '(Virtual Social Media Marketing)', desc: 'Unlock the true potential of social media with VSMM.', icon: <UsersIcon /> },
    { title: 'SEO', subtitle: '(Search Engine Optimization)', desc: 'Ensure your brand is seen and heard online with expert SEO.', icon: <Globe /> },
    { title: 'Web Design and Development', desc: 'Crafting bespoke websites that enchant and engage.', icon: <Code /> },
    { title: 'Web Application/CRM', desc: 'Streamline your operations with tailored web applications.', icon: <FileText /> },
    { title: 'Content Solutions', desc: 'Enticing stories told right - your brand narratives crafted.', icon: <FileText /> },
    { title: 'Video Production (OVC/TVC)', desc: 'Crafting visual narratives that resonate with your audience.', icon: <Video /> },
    { title: 'Commercial Photoshoot', desc: 'Capturing moments that matter, our commercial photoshoots ensure.', icon: <Smartphone /> },
    { title: 'Creative Solutions', desc: 'Imaginative, innovative, and impactful our creative solutions.', icon: <Lightbulb /> },
    { title: 'Animation', desc: 'Bringing stories to life with dynamic motion and animation.', icon: <Video /> },
    { title: 'Marketing Consultancy', desc: 'Guiding your brand with expert insights and strategic paths.', icon: <BarChart /> },
    { title: 'AI/Automation Consultancy', desc: 'Navigate the future with our AI and automation consultancy.', icon: <Zap /> }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-20 sm:py-32 bg-dark overflow-hidden text-center border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 sm:mb-8">
             From Strategy To Screen: <br/>
             <span className="text-primary">NEXARA</span> - Fueling Your Digital Evolution With Excellence.
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
             Since our establishment in 2016, NEXARA has been the cornerstone of success for numerous international and local businesses.
           </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Need consultation from experts?</h2>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12 rounded-xl">Call Now</Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12 rounded-xl">Message Now</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {allServices.map((service, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-dark-lighter p-10 rounded-3xl border border-white/5 hover:border-primary/50 transition-all group"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                            {React.cloneElement(service.icon as any, { size: 32 })}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                        {service.subtitle && <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">{service.subtitle}</p>}
                        <p className="text-gray-500 leading-relaxed mb-8">{service.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Pricing Teasers (requested "tears" as in tiers) */}
      <section className="py-32 bg-dark-lighter border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Pricing Models</h2>
                <h3 className="text-5xl font-bold text-white mb-6">Choose Your Growth Plan</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[
                    { name: 'Startup', price: '999', features: ['Core Features', 'Single Channel', 'Basic Support', 'Standard Reporting'] },
                    { name: 'Professional', price: '2,499', features: ['Full Strategy', 'Multi-channel', 'Priority Support', 'Advanced Analytics'], popular: true },
                    { name: 'Enterprise', price: 'Custom', features: ['Unlimited Access', 'Custom AI Models', 'Dedicated Team', '24/7 Global Support'] }
                ].map((tier, i) => (
                    <div key={i} className={`bg-dark p-12 rounded-[3rem] border ${tier.popular ? 'border-primary ring-4 ring-primary/10' : 'border-white/5'} transition-all`}>
                        <h4 className="text-2xl font-bold text-white mb-2">{tier.name}</h4>
                        <div className="mb-10">
                            <span className="text-4xl font-black text-white">${tier.price}</span>
                            {tier.price !== 'Custom' && <span className="text-gray-500 ml-2">/ starting</span>}
                        </div>
                        <ul className="space-y-4 mb-10">
                            {tier.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-gray-400 text-sm">
                                    <Check className="text-primary" size={16} /> {f}
                                </li>
                            ))}
                        </ul>
                        <Link to="/custom-quote">
                            <Button className={`w-full h-14 rounded-2xl font-bold ${tier.popular ? 'bg-primary hover:bg-primary-dark' : 'bg-white/5 hover:bg-white/10'}`}>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesWithPricing;
