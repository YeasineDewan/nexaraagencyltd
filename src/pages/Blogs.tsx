import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const Blogs = () => {
  const blogsEn = [
    { title: 'Why SMEs in Bangladesh Need Digital Marketing', date: 'August 30, 2025', comments: 'No Comments', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'How to Get Bangladeshi Media Coverage', date: 'June 29, 2025', comments: '2 Comments', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'Influencer Marketing vs Traditional Advertising', date: 'April 22, 2025', comments: '1 Comment', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { title: 'Strategic SEO Investment: When, Why and How', date: 'March 6, 2025', comments: '1 Comment', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <Layout>
      <section className="relative py-32 bg-dark text-center border-b border-white/5">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6">Blog</h1>
        <p className="text-gray-500 text-sm uppercase tracking-widest">Home | Blog</p>
      </section>

      <section className="py-32 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">Read Blogs in <span className="text-primary">English</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {blogsEn.map((blog, i) => (
                    <motion.div key={i} whileHover={{ y: -10 }} className="bg-dark-lighter rounded-3xl overflow-hidden border border-white/5 group">
                        <div className="aspect-video relative overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{blog.title}</h3>
                            <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
                                <span>{blog.date}</span>
                                <span>•</span>
                                <span>{blog.comments}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mb-32">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-10 h-14 rounded-xl font-bold">Load More</Button>
            </div>

            <h2 className="text-4xl font-bold text-white mb-16 text-center">বাংলায় <span className="text-primary">ব্লগ</span> পড়ুন</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[1,2,3,4].map((i) => (
                    <motion.div key={i} whileHover={{ y: -10 }} className="bg-dark-lighter rounded-3xl overflow-hidden border border-white/5 group">
                        <div className="aspect-video relative overflow-hidden">
                            <img src={`https://images.unsplash.com/photo-15${i}1434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80`} alt="Bangla Blog" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">ডিজিটাল মার্কেটিং কেন প্রয়োজন?</h3>
                            <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
                                <span>সেপ্টেম্বর ২৭, ২০২৫</span>
                                <span>•</span>
                                <span>কোন মন্তব্য নেই</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-20">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-10 h-14 rounded-xl font-bold">Load More</Button>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blogs;
