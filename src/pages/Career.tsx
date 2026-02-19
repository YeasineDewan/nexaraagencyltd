import Layout from '../components/Layout';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const Career = () => {
  const jobs = [
    { title: 'Meta Ads Expert', status: 'Open', type: 'Full Time', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'Social Media Marketing Manager - Paid Intern', status: 'Open', type: 'Full Time, Intern', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'Digital Marketer (VSMM Manager)', status: 'Open', type: 'Full Time', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'Video Editor & Motion Designer', status: 'Open', type: 'Full Time', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'Asst. Director of Photography (DOP)', status: 'Open', type: 'Full Time', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'HR Executive', status: 'Closed', type: 'Full Time', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <Layout>
      <section className="relative py-32 bg-dark text-center border-b border-white/5">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6">Career</h1>
        <p className="text-gray-500 text-sm uppercase tracking-widest">Home | Career</p>
      </section>

      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-dark-lighter p-12 rounded-[3rem] border border-white/5 text-center mb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4"><span className="text-4xl opacity-10 font-black">!</span></div>
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-6">Disclaimer</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    NEXARA Agency does not offer jobs via direct WhatsApp or Telegram messages. We strictly follow a formal recruitment process. Please be aware that some individuals are misusing our name to mislead people with unclear intentions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job, i) => (
                    <motion.div key={i} whileHover={{ y: -10 }} className="bg-dark-lighter rounded-[2rem] overflow-hidden border border-white/5 group">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <ImageWithFallback src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" fallbackText={job.title} />
                            <div className="absolute top-4 right-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${job.status === 'Open' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {job.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{job.type}</p>
                            {job.status === 'Open' && (
                                <Button className="mt-8 w-full h-12 rounded-xl bg-primary hover:bg-primary-dark font-bold">Apply Now</Button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Career;
