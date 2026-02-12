import Layout from '../components/Layout';
import { Camera, Music, Video } from 'lucide-react';

const ArtistModelList = () => {
  return (
    <Layout>
      <section className="relative py-32 bg-dark text-center border-b border-white/5">
        <h1 className="text-6xl font-black text-white mb-6">Artist & <span className="text-primary">Model</span> List</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Our curated network of creative talent for your commercial and digital needs.</p>
      </section>

      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/5">
                <img 
                  src={`https://images.unsplash.com/photo-150${i}434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`} 
                  alt="Artist" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold">Talent Name</h4>
                  <p className="text-primary text-[10px] uppercase font-bold tracking-widest">Commercial Model</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center gap-12 text-gray-500">
             <div className="flex items-center gap-2"><Camera size={20} /><span>Photographers</span></div>
             <div className="flex items-center gap-2"><Music size={20} /><span>Voice Artists</span></div>
             <div className="flex items-center gap-2"><Video size={20} /><span>Actors</span></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArtistModelList;
