import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Smartphone, CheckCircle, Globe, TrendingUp, Users as UsersIcon, FileText, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ConsultancyForm from '../components/ui/ConsultancyForm';

const Home = () => {
  const services = [
    { title: 'Digital Marketing', description: 'Elevate your online presence with our strategic digital marketing solutions.', icon: <TrendingUp />, color: 'text-primary' },
    { title: 'VSMM', subtitle: '(Virtual Social Media Marketing)', description: 'Unlock the true potential of social media with VSMM, your comprehensive package.', icon: <UsersIcon />, color: 'text-indigo-500' },
    { title: 'SEO', subtitle: '(Search Engine Optimization)', description: 'Ensure your brand is seen and heard online with our expert SEO strategies.', icon: <Globe />, color: 'text-orange-500' },
    { title: 'Web Design & Development', description: 'Crafting bespoke websites that enchant and engage, our web design team fuses.', icon: <Code />, color: 'text-emerald-500' },
    { title: 'Content Solutions', description: 'Enticing stories told right - your brand narratives crafted with precision.', icon: <FileText />, color: 'text-pink-500' },
    { title: 'Video Production', subtitle: '(OVC/TVC)', description: 'Crafting visual narratives that resonate, our video production team curates.', icon: <Smartphone />, color: 'text-yellow-500' }
  ];

  const clients = [
    'https://via.placeholder.com/150x50?text=Menova',
    'https://via.placeholder.com/150x50?text=Unique+Group',
    'https://via.placeholder.com/150x50?text=Surovi+Tea',
    'https://via.placeholder.com/150x50?text=Bashundhara',
    'https://via.placeholder.com/150x50?text=PRAN',
    'https://via.placeholder.com/150x50?text=Aarong'
  ];

  const reviews = [
    { name: 'Roxane Davis', role: 'CMO, Lucia Belia', content: 'Working with NEXARA has been a game-changer for our business. Their team\'s dedication, expertise, and personalized solutions have catapulted our success.', rating: 5 },
    { name: 'John Smith', role: 'CEO, TechFlow', content: 'The ROI we saw after their SEO campaign was unprecedented. Highly recommended for any serious business looking to scale.', rating: 5 },
    { name: 'Sarah Ahmed', role: 'Founder, EcoCraft', content: 'Their creative approach to our brand video was exactly what we needed to stand out in a crowded market.', rating: 4 }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-dark">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-3">
                <span className="w-12 h-[2px] bg-primary"></span>
                Strategic Digital Agency
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-10">
                Your <span className="text-primary">Strategic</span> Digital <span className="text-primary">Partner</span> For Ultimate <span className="text-primary">Success.</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
                Welcome to NEXARA, one of the leading Digital Marketing agencies in Bangladesh. We help businesses thrive in the digital world through innovative strategies and a results-oriented approach.
              </p>
              <div className="flex flex-wrap gap-6 mb-16">
                <Link to="/custom-quote">
                    <Button size="lg" className="rounded-2xl bg-primary hover:bg-primary-dark px-12 h-16 font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 group">
                        Book Free Consultation
                        <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
                <Link to="/services">
                    <Button variant="outline" size="lg" className="rounded-2xl border-white/10 text-white hover:bg-white/5 px-12 h-16 font-black uppercase tracking-widest text-sm">
                        Our Working Scope
                    </Button>
                </Link>
              </div>
              
              <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-6">Registered Corporate Member</p>
                  <div className="flex items-center gap-10 grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                    <img src="https://via.placeholder.com/100x30?text=BASIS" alt="BASIS" className="h-6" />
                    <img src="https://via.placeholder.com/100x30?text=e-CAB" alt="e-CAB" className="h-6" />
                    <img src="https://via.placeholder.com/100x30?text=E-CLUB" alt="E-CLUB" className="h-6" />
                  </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="mt-20 lg:mt-0 relative"
            >
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden border-2 border-primary/20 p-2 bg-dark-lighter shadow-2xl group">
                 <div className="rounded-[3rem] overflow-hidden aspect-[4/5] relative">
                    <img 
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                        alt="NEXARA Excellence" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10">
                        <div className="flex items-center gap-4 text-white mb-2">
                            <div className="w-12 h-[2px] bg-primary"></div>
                            <span className="text-xs font-black uppercase tracking-widest">Agency Insight</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Where Creativity <br/>Meets Results</h3>
                    </div>
                 </div>
              </div>
              {/* Stats Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-10 -right-10 bg-primary p-10 rounded-[2.5rem] shadow-2xl z-20 text-white border-4 border-dark group cursor-default"
              >
                <div className="text-5xl font-black mb-1">98%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Client Retention</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Marquee */}
      <section className="py-20 bg-dark-lighter border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10">
             <h3 className="text-center text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Brands that trust NEXARA</h3>
        </div>
        <div className="flex gap-20 items-center animate-infinite-scroll">
            {[...clients, ...clients].map((client, i) => (
                    <img 
                        key={i} 
                        src={client} 
                        alt="Client" 
                        className="h-10 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
            ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
             <div className="max-w-3xl">
                <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Our Capabilities</h2>
                <h3 className="text-5xl md:text-6xl font-black text-white mb-8 leading-[1.1]">High-Impact Solutions For The Modern Digital Ecosystem.</h3>
                <p className="text-gray-500 text-lg">We don't just provide services; we engineer success through a unique blend of creativity and data science.</p>
             </div>
             <Link to="/services">
                <Button variant="outline" className="rounded-2xl border-white/10 text-white hover:text-primary hover:border-primary px-10 h-16 font-bold uppercase tracking-widest text-xs">Explore All Services</Button>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-dark-lighter p-12 rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    {React.cloneElement(service.icon as any, { size: 160 })}
                </div>
                <div className={`w-20 h-20 rounded-2xl bg-dark flex items-center justify-center mb-10 ${service.color} group-hover:bg-primary group-hover:text-white border border-white/5 transition-all duration-500 shadow-xl shadow-black/20`}>
                    {React.cloneElement(service.icon as any, { size: 36 })}
                </div>
                <h4 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">{service.title}</h4>
                {service.subtitle && <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-6">{service.subtitle}</p>}
                <p className="text-gray-500 leading-relaxed mb-10 text-sm">{service.description}</p>
                <div className="w-12 h-[3px] bg-primary group-hover:w-full transition-all duration-700"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Form Section */}
      <section className="py-32 bg-dark-lighter border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-32 items-center">
                <div className="mb-20 lg:mb-0">
                    <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Why Partner With Us?</h2>
                    <h3 className="text-5xl md:text-7xl font-black text-white mb-12 leading-tight">Elite Talent. <br/><span className="text-primary">Measurable</span> Impact.</h3>
                    
                    <div className="space-y-10">
                        {[
                            { title: 'Strategic Intelligence', desc: 'Data-driven insights merged with human creativity to deliver unprecedented market growth.' },
                            { title: 'Dynamic Tech Stack', desc: 'Proprietary tools and high-performance frameworks engineered for scalability.' },
                            { title: 'Client-First Philosophy', desc: 'Transparent communication protocols and dedicated account management for ultimate peace of mind.' }
                        ].map((benefit, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex gap-8 group"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter group-hover:text-primary transition-colors">{benefit.title}</h4>
                                    <p className="text-gray-500 leading-relaxed text-sm">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20">
                         <Link to="/about" className="text-primary font-black uppercase tracking-[0.3em] text-xs flex items-center gap-4 group">
                            LEARN MORE ABOUT OUR STORY
                            <ArrowRight className="group-hover:translate-x-3 transition-transform" size={16} />
                         </Link>
                    </div>
                </div>
                
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
                    <ConsultancyForm />
                </div>
            </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-dark">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
                <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Testimonials</h2>
                <h3 className="text-5xl md:text-6xl font-black text-white">Client Intelligence</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-dark-lighter p-12 rounded-[3rem] border border-white/5 relative overflow-hidden"
                    >
                        <div className="flex gap-1 mb-8">
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} size={16} className={j < review.rating ? 'text-primary fill-primary' : 'text-gray-700'} />
                            ))}
                        </div>
                        <p className="text-gray-400 italic mb-10 leading-relaxed text-lg">"{review.content}"</p>
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black text-xl">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{review.name}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{review.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* Moments Gallery */}
      <section className="py-32 bg-dark-lighter border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                <div className="max-w-2xl">
                    <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Behind the scenes</h2>
                    <h3 className="text-5xl font-black text-white">Memories & <span className="text-primary">Moments</span></h3>
                </div>
                <Link to="/portfolio">
                    <Button variant="outline" className="border-white/10 text-white hover:text-primary px-10 h-14 rounded-xl font-bold uppercase tracking-widest text-xs">View Full Portfolio</Button>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2 md:row-span-2 rounded-[3rem] overflow-hidden group border border-white/10 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Moment 1" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="rounded-[2.5rem] overflow-hidden group border border-white/10 aspect-square md:aspect-auto">
                    <img 
                        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Moment 2" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
                </div>
                <div className="rounded-[2.5rem] overflow-hidden group border border-white/10 aspect-square md:aspect-auto">
                    <img 
                        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                        alt="Moment 3" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
                </div>
                 <div className="md:col-span-2 rounded-[2.5rem] overflow-hidden group border border-white/10 h-80 md:h-64 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                        alt="Moment 4" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                    />
                </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-7xl md:text-9xl font-black text-white mb-12 leading-none uppercase tracking-tighter">Ready To <br/><span className="text-primary">Evolve?</span></h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
                Join our elite network of brands and experience digital success like never before.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
                <Link to="/custom-quote">
                    <Button size="lg" className="rounded-3xl bg-primary hover:bg-primary-dark px-16 h-20 font-black uppercase tracking-[0.2em] text-lg border-none group">
                        Start Your Project
                        <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </Link>
                <Link to="/contact">
                    <Button variant="outline" size="lg" className="rounded-3xl border-white/10 text-white hover:bg-white/5 px-16 h-20 font-black uppercase tracking-[0.2em] text-lg">
                        Talk To Experts
                    </Button>
                </Link>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
