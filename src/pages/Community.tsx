import Layout from '../components/Layout';
import { Users, Globe, MessageCircle } from 'lucide-react';

const Community = () => {
  return (
    <Layout>
      <section className="relative py-32 bg-dark text-center border-b border-white/5">
        <h1 className="text-6xl font-black text-white mb-6">Nexara <span className="text-primary">Community</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Connecting creators, innovators, and business leaders across Bangladesh.</p>
      </section>

      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: 'Industry Insights', icon: Globe, desc: 'Stay updated with the latest trends in digital marketing and tech.' },
              { title: 'Networking Events', icon: Users, desc: 'Join our exclusive webinars and local meetups.' },
              { title: 'Support Forum', icon: MessageCircle, desc: 'Get help and advice from our team and fellow community members.' }
            ].map((item, i) => (
              <div key={i} className="bg-dark-lighter p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
