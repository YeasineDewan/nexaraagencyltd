import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';

const Contact = () => {
  const contactInfo = [
    { icon: <Phone className="w-6 h-6" />, title: 'Call Center', details: '+8801797-242610', sub: 'Dedicated support line' },
    { icon: <Mail className="w-6 h-6" />, title: 'Direct Email', details: 'info@nexara.agency', sub: 'Inquiries within 24h' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Office Space', details: 'Banani DOHS, Dhaka', sub: 'HQ Location' },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, path: '#' },
    { icon: <Twitter size={20} />, path: '#' },
    { icon: <Linkedin size={20} />, path: '#' },
    { icon: <Instagram size={20} />, path: '#' },
  ];

  return (
    <Layout>
      {/* Premium Hero */}
      <section className="relative py-40 bg-dark overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="max-w-3xl">
                <motion.h1 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-7xl md:text-9xl font-black text-white mb-10 uppercase tracking-tighter leading-[0.9]"
                >
                    Let's <span className="text-primary">Connect.</span>
                </motion.h1>
                <p className="text-gray-500 text-xl md:text-2xl font-bold max-w-xl leading-relaxed">
                    Have a vision? We have the team to make it a digital reality. Reach out and start your evolution.
                </p>
           </div>
        </div>
      </section>

      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-4 space-y-12">
                <div>
                    <h3 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-10">Communications</h3>
                    <div className="space-y-8">
                        {contactInfo.map((info, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-8 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-dark-lighter border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    {info.icon}
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">{info.title}</h4>
                                    <p className="text-white font-bold text-lg leading-none mb-1">{info.details}</p>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{info.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5">
                    <h3 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-8">Social Presence</h3>
                    <div className="flex gap-4">
                        {socialLinks.map((link, i) => (
                            <Link key={i} to={link.path} className="w-12 h-12 rounded-xl bg-dark-lighter border border-white/10 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all duration-500">
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="p-10 bg-primary rounded-[3rem] text-white relative overflow-hidden">
                    <h4 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-tighter">
                        <MessageCircle /> 24/7 Priority
                    </h4>
                    <p className="text-white/80 mb-8 text-sm font-bold uppercase tracking-wide">Emergency technical support for active partners.</p>
                    <Button className="bg-white text-primary hover:bg-white/90 w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest border-none">
                        ENTER PORTAL
                    </Button>
                </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-8">
              <div className="bg-dark-lighter p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1/2 h-1 bg-gradient-to-l from-primary to-transparent"></div>
                
                <h3 className="text-4xl font-black text-white mb-12 uppercase tracking-tighter">Transmission Portal</h3>
                <form className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Input label="Identity / Name" placeholder="Full Name" className="bg-dark border-white/10 text-white h-16 rounded-2xl px-6" required />
                        <Input label="Corporate Email" type="email" placeholder="email@company.com" className="bg-dark border-white/10 text-white h-16 rounded-2xl px-6" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Input label="Project Classification" placeholder="Web / Mobile / Marketing" className="bg-dark border-white/10 text-white h-16 rounded-2xl px-6" />
                        <Input label="Allocated Budget" placeholder="$5k - $10k" className="bg-dark border-white/10 text-white h-16 rounded-2xl px-6" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 ml-1">Message Specifications</label>
                        <textarea 
                            rows={6} 
                            className="w-full p-8 rounded-3xl border border-white/10 bg-dark text-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none placeholder:text-gray-800"
                            placeholder="Detail your operational requirements..."
                        ></textarea>
                    </div>
                    <Button size="lg" className="w-full h-20 rounded-[2rem] text-lg font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary-dark group border-none shadow-2xl shadow-primary/20">
                        Transmit Inquiry
                        <Send className="ml-4 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Integration */}
      <section className="h-[600px] w-full relative group">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.598345155146!2d90.4005!3d23.7915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70967afc0c1%3A0xf639a0714fc2a762!2sBanani%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1634567890123!5m2!1sen!2sbd" 
            className="w-full h-full border-0 grayscale invert contrast-[1.1] brightness-[0.4] opacity-80 group-hover:opacity-100 transition-all duration-1000"
            allowFullScreen={true} 
            loading="lazy"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none border-y border-white/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-lighter/90 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-primary/30">
                <MapPin size={32} />
            </div>
            <h4 className="font-black text-white text-3xl mb-4 uppercase tracking-tighter">HQ Hub</h4>
            <p className="text-gray-400 font-bold mb-10 leading-relaxed">
                House: 21, Road: 3, <br/>
                Banani DOHS, Dhaka- 1206, <br/>
                Bangladesh
            </p>
            <div className="flex items-center justify-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-xs">
                <Globe className="w-4 h-4" />
                <span>Visit Global Operations</span>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
