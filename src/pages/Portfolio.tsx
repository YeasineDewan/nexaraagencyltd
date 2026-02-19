import { useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, Code } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web', 'Mobile', 'Design', 'Marketing', 'Video'];

  const projects = [
    { title: 'Menova Platform', client: 'Menova Corp', category: 'Web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { title: 'EcoTrack App', client: 'Green Future', category: 'Mobile', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { title: 'Global Branding', client: 'Global Matrix', category: 'Design', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { title: 'Social Campaign', client: 'Lucia Belia', category: 'Marketing', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { title: 'Corporate Identity', client: 'Unique Group', category: 'Design', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
    { title: 'Explainer Series', client: 'PRAN', category: 'Video', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      {/* Premium Hero */}
      <section className="relative py-48 bg-dark overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-9xl font-black text-white mb-10 uppercase tracking-tighter"
            >
                Our <span className="text-primary">Mastery.</span>
            </motion.h1>
            <p className="text-gray-500 text-xl font-bold uppercase tracking-[0.3em] mb-16">Witness the evolution of brands through digital excellence.</p>
            
            <div className="flex flex-wrap justify-center gap-4 bg-dark-lighter p-3 rounded-[2rem] border border-white/5 max-w-2xl mx-auto">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                            activeCategory === cat ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-600 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="group bg-dark-lighter rounded-[3rem] overflow-hidden border border-white/5 relative"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                
                                {/* Hover Actions */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <button className="w-14 h-14 rounded-full bg-white text-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                        <ExternalLink size={20} />
                                    </button>
                                    <button className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all">
                                        <Play size={20} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">{project.category}</p>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{project.title}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[8px] text-primary font-black">N</div>
                                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Partner: {project.client}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-24 text-center">
                 <Button variant="outline" className="border-white/10 text-white hover:text-primary px-12 h-16 rounded-2xl font-black uppercase tracking-widest text-xs">Load More Case Studies</Button>
            </div>
        </div>
      </section>

      {/* Trust Metrics Section */}
      <section className="py-32 bg-dark-lighter border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                    { label: 'Successful Launches', value: '450+' },
                    { label: 'Creative Awards', value: '25+' },
                    { label: 'Client Satisfaction', value: '99%' },
                    { label: 'Repeat Partnerships', value: '85%' }
                ].map((m, i) => (
                    <div key={i}>
                        <div className="text-5xl font-black text-white mb-2">{m.value}</div>
                        <div className="text-[10px] text-primary font-bold uppercase tracking-widest">{m.label}</div>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Web Apps Showcase */}
      <section className="py-32 bg-dark">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
                 <div className="mb-16 lg:mb-0">
                    <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Internal Infrastructure</h2>
                    <h3 className="text-5xl font-black text-white mb-8 uppercase tracking-tighter">Proprietary <span className="text-primary">Ecosystems.</span></h3>
                    <p className="text-gray-500 text-lg leading-relaxed mb-10">
                        We don't just build for others; we engineer our own high-performance platforms. From specialized CRM solutions to advanced POS systems, we define the standard of dynamic tech works.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {['CRM', 'LMS', 'POS', 'HRM'].map(app => (
                            <div key={app} className="p-6 bg-dark-lighter border border-white/5 rounded-2xl flex items-center justify-between group hover:border-primary/50 transition-all">
                                <span className="text-white font-bold">{app} Solution</span>
                                <ExternalLink size={16} className="text-gray-700 group-hover:text-primary transition-colors" />
                            </div>
                        ))}
                    </div>
                 </div>
                 
                 <div className="bg-dark-lighter p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                        <Code size={300} />
                    </div>
                    <div className="relative z-10">
                        <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Technical Overview</h4>
                        <ul className="space-y-4">
                            {[
                                'Secure Finance Management Modules',
                                'Real-time Messaging Frameworks',
                                'Instant Operational Overviews',
                                'Automated Attendance Protocols',
                                'Enterprise-Level Email Integration'
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button className="mt-10 h-14 rounded-xl px-8 bg-primary hover:bg-primary-dark font-black uppercase tracking-widest text-[10px]">Technical Documentation</Button>
                    </div>
                 </div>
             </div>
         </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
