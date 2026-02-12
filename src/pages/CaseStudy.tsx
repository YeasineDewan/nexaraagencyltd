import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CaseStudy = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 bg-dark border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8 block">Case Study</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1]">
                        Transforming Digital <br/>
                        <span className="text-primary">Presence</span> Into Measurable <br/>
                        <span className="text-primary">Growth.</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-12 max-w-xl leading-relaxed">
                        Discover how we helped our client achieve remarkable results through strategic digital marketing, data-driven campaigns, and innovative solutions.
                    </p>
                    <Button className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary-dark font-bold text-lg" onClick={() => navigate('/case-studies')}>
                        View Case Studies
                    </Button>
                    
                    <div className="mt-20 flex gap-12">
                        <div>
                            <div className="text-4xl font-black text-primary mb-2">+320%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">ROI Increase</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">5.2M</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Impressions</div>
                        </div>
                        <div>
                            <div className="text-4xl font-black text-white mb-2">3x</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Lead Growth</div>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-16 lg:mt-0"
                >
                    <div className="bg-dark-lighter p-8 rounded-[3rem] border border-white/5 relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="font-bold text-white">Performance Analytics</h4>
                            <div className="text-xs text-gray-500">Last 6 Months</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Total Revenue', value: '$2.4M', inc: '+320% increase', color: 'text-emerald-500' },
                                { label: 'Conversion Rate', value: '8.7%', inc: '+156% increase', color: 'text-emerald-500' },
                                { label: 'Avg. CTR', value: '12.4%', inc: '+215% increase', color: 'text-emerald-500' },
                                { label: 'Total Leads', value: '18.5K', inc: '+287% increase', color: 'text-emerald-500' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-dark p-6 rounded-2xl border border-white/5">
                                    <div className="text-gray-500 text-xs mb-2">{stat.label}</div>
                                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className={`text-[10px] font-bold ${stat.color}`}>{stat.inc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Partners Marquee Placeholder */}
      <section className="py-12 bg-dark-lighter border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
            <div className="flex justify-center gap-16 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="https://via.placeholder.com/150x40?text=Menova" alt="Partner" />
                <img src="https://via.placeholder.com/150x40?text=Unique" alt="Partner" />
                <img src="https://via.placeholder.com/150x40?text=Surovi" alt="Partner" />
                <img src="https://via.placeholder.com/150x40?text=Nexara" alt="Partner" />
            </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">See How Businesses <span className="text-primary">Grow</span> With Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { title: 'SEOK Trusted for Life', desc: 'Celebrating Client Success: Our Commitment to Your Triumph! At NEXARA Agency Ltd, we take pride in the success stories of our clients.', logo: 'SEOK', stats: ['+0% Booked Meetings', '$0K Average Deal Size'] },
                    { title: 'Lucia Belia Success Journey', desc: 'Partner with us for personalized solutions, steadfast support, and a track record of client triumphs. Together, let\'s achieve greatness!', logo: 'Lucia Belia', stats: ['0% Positive Replies', '0+ Booked Meetings'] }
                ].map((story, i) => (
                    <div key={i} className="bg-dark-lighter p-12 rounded-[3rem] border border-white/5 group hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start mb-8">
                            <span className="px-4 py-1.5 bg-white text-dark text-[10px] font-bold uppercase tracking-widest rounded-full">Case Study</span>
                            <div className="text-2xl font-black text-white">{story.logo}</div>
                        </div>
                        <div className="flex gap-12 mb-10">
                            {story.stats.map((s, j) => (
                                <div key={j}>
                                    <div className="text-5xl font-black text-primary mb-2">{s.split(' ')[0]}</div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{s.split(' ').slice(1).join(' ')}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10">"{story.desc}"</p>
                        <div className="flex flex-wrap gap-2">
                            {['VSMM', 'Web Design', 'SEO'].map(t => (
                                <span key={t} className="px-4 py-1.5 rounded-full border border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 text-center">
                <Button variant="outline" className="border-white/10 text-white hover:text-primary hover:border-primary px-10 h-14 rounded-xl" onClick={() => navigate('/case-studies')}>View All Case Studies</Button>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudy;
