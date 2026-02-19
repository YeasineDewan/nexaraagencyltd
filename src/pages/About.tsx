import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Users, Target, Heart, Award, ShieldCheck, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Founded In', value: '2016' },
    { label: 'Team Members', value: '26+' },
    { label: 'Projects Done', value: '450+' },
    { label: 'Client Retention', value: '98%' },
  ];

  const values = [
    { title: 'Goal Oriented', desc: 'Every campaign we run is focused on specific, measurable business goals.', icon: <Target className="text-primary" /> },
    { title: 'Client Passion', desc: 'Your success is our obsession. We treat your business like our own.', icon: <Heart className="text-primary" /> },
    { title: 'Expert Talent', desc: 'Our team consists of industry veterans and creative geniuses.', icon: <Users className="text-primary" /> },
    { title: 'Solid Commitment', desc: 'We deliver what we promise, with no hidden surprises or delays.', icon: <ShieldCheck className="text-primary" /> },
  ];

  const team = [
    { name: 'Ahmad Faisal', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Sarah J.', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Michael Chen', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { name: 'Elena Sofia', role: 'Chief Marketing Officer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ];

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative py-48 bg-dark overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
           <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 sm:mb-8 uppercase tracking-tighter"
            >
                About <span className="text-primary">Nexara</span>
            </motion.h1>
           <p className="text-gray-500 text-sm font-black uppercase tracking-[0.4em] mb-12">Driven by results • Inspired by innovation</p>
           
           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto border-t border-white/5 pt-8 sm:pt-12">
                {stats.map((stat, i) => (
                    <div key={i}>
                        <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] text-primary font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
           </div>
        </div>
      </section>

      {/* Our Story & Philosophy */}
      <section className="py-20 sm:py-32 bg-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-32 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl font-black text-white mb-10 uppercase tracking-tight">Our <span className="text-primary">Story</span></h2>
                    <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                        <p>
                            10 September 2016 we started our journey with some energetic people. Now the number has grown with 26 awesome team members and we hope the number will be growing in the upcoming days.
                        </p>
                        <p>
                            With this 5 years journey, we have worked with so many international & local businesses. From the very beginning, we were focused on delivering the actual value of our client's business and that's how our business has grown with their reference.
                        </p>
                        <p className="p-8 bg-primary/5 border-l-4 border-primary italic rounded-r-3xl">
                            "Professional work with solid commitment is the major strength of our team. Marketing is a major part of a business and we work on this challenging part."
                        </p>
                        <p>
                            We have run so many growth experiments to ensure clients' business growth. After conducting a huge number of successful marketing campaigns our experience has become an asset to us. Now we know how to grow a business through internet marketing.
                        </p>
                    </div>
                </motion.div>
                
                <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="mt-16 lg:mt-0 relative"
                >
                    <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative z-10">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" alt="Team" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-32 bg-dark-lighter border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
                <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Our DNA</h2>
                <h3 className="text-5xl md:text-6xl font-black text-white">The NEXARA Philosophy</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {values.map((val, i) => (
                    <div key={i} className="bg-dark p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all group">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            {React.cloneElement(val.icon as any, { size: 32, className: 'group-hover:text-white transition-colors' })}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{val.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="py-20 sm:py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                <div className="max-w-2xl">
                    <h2 className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-6">Expert Talent</h2>
                    <h3 className="text-5xl font-black text-white">Meet The <span className="text-primary">Architects</span> Of Digital Success.</h3>
                </div>
                <Link to="/career">
                    <Button variant="outline" className="border-white/10 text-white hover:text-primary px-10 h-16 rounded-2xl font-bold uppercase tracking-widest text-xs">Join Our Team</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {team.map((member, i) => (
                    <motion.div 
                        key={i} 
                        whileHover={{ y: -10 }}
                        className="group bg-dark-lighter rounded-[3rem] overflow-hidden border border-white/5"
                    >
                        <div className="aspect-[3/4] overflow-hidden relative">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                        </div>
                        <div className="p-8 text-center">
                            <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest">{member.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Missions & Vision Grid */}
      <section className="py-20 sm:py-32 bg-dark-lighter">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-dark p-16 rounded-[4rem] border border-white/5 relative overflow-hidden group">
                    <div className="w-16 h-[2px] bg-primary mb-10 group-hover:w-full transition-all duration-700"></div>
                    <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Strategic Mission</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                        Our goal is to establish a unique and highly effective online appearance for our clients. We strive to deliver actual value by focusing mainly on three pillars: Strategy, Execution, and Growth.
                    </p>
                    <div className="flex items-center gap-4 text-primary font-bold">
                        <Award size={24} />
                        <span className="text-xs uppercase tracking-widest">Industry Distinction</span>
                    </div>
                </div>

                <div className="bg-dark p-16 rounded-[4rem] border border-white/5 relative overflow-hidden group">
                    <div className="w-16 h-[2px] bg-primary mb-10 group-hover:w-full transition-all duration-700"></div>
                    <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Global Vision</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                        NEXARA Agency strives to be and remain a hub of distinction in the creative and innovative internet marketing universe. We attract global partners by setting new benchmarks in excellence.
                    </p>
                    <div className="flex items-center gap-4 text-primary font-bold">
                        <Globe size={24} />
                        <span className="text-xs uppercase tracking-widest">Universal Growth</span>
                    </div>
                </div>
             </div>
         </div>
      </section>
    </Layout>
  );
};

export default About;
