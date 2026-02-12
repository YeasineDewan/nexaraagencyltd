import Layout from '../components/Layout';
import { ShoppingBag, Laptop, Smartphone } from 'lucide-react';

const ConcernsProducts = () => {
  return (
    <Layout>
      <section className="relative py-32 bg-dark text-center border-b border-white/5">
        <h1 className="text-6xl font-black text-white mb-6">Concerns & <span className="text-primary">Products</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover the internal tools and platforms built by Nexara Agency.</p>
      </section>

      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: 'Nexara CRM', icon: Laptop, desc: 'A comprehensive management platform for agencies and clients.' },
              { title: 'AdScope Tool', icon: Smartphone, desc: 'Advanced analytics and forecasting for digital advertising campaigns.' },
              { title: 'MediaHub', icon: ShoppingBag, desc: 'Digital asset management for high-performance creative teams.' }
            ].map((item, i) => (
              <div key={i} className="bg-dark-lighter p-12 rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all flex gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConcernsProducts;
