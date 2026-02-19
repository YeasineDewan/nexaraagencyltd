import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpRight, Calendar, TrendingUp, Users, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';

const ViewCaseStudies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const caseStudies = [
    {
      id: 1,
      title: 'SEOK Trusted for Life',
      client: 'SEOK Corporation',
      category: 'Digital Marketing',
      description: 'Celebrating Client Success: Our Commitment to Your Triumph! At NEXARA Agency Ltd, we take pride in the success stories of our clients.',
      image: 'https://via.placeholder.com/400x300?text=SEOK+Case+Study',
      results: [
        { label: 'Booked Meetings', value: '+450%', icon: Users },
        { label: 'Average Deal Size', value: '$125K', icon: TrendingUp },
        { label: 'ROI Increase', value: '+320%', icon: Target }
      ],
      tags: ['VSMM', 'SEO', 'PPC', 'Content Strategy'],
      date: '2024-01-15',
      duration: '6 months'
    },
    {
      id: 2,
      title: 'Lucia Belia Success Journey',
      client: 'Lucia Belia Fashion',
      category: 'Brand Development',
      description: 'Partner with us for personalized solutions, steadfast support, and a track record of client triumphs. Together, let\'s achieve greatness!',
      image: 'https://via.placeholder.com/400x300?text=Lucia+Belia',
      results: [
        { label: 'Positive Replies', value: '87%', icon: Users },
        { label: 'Booked Meetings', value: '200+', icon: Calendar },
        { label: 'Brand Awareness', value: '+280%', icon: Target }
      ],
      tags: ['Brand Identity', 'Web Design', 'Social Media', 'Content Creation'],
      date: '2024-02-20',
      duration: '4 months'
    },
    {
      id: 3,
      title: 'Menova Tech Revolution',
      client: 'Menova Technologies',
      category: 'Web Development',
      description: 'Transforming a tech startup\'s digital presence with cutting-edge web solutions and comprehensive digital marketing strategies.',
      image: 'https://via.placeholder.com/400x300?text=Menova+Tech',
      results: [
        { label: 'Traffic Increase', value: '+520%', icon: TrendingUp },
        { label: 'Conversion Rate', value: '12.4%', icon: Target },
        { label: 'Lead Generation', value: '+350%', icon: Users }
      ],
      tags: ['Web Development', 'E-commerce', 'SEO', 'Performance Marketing'],
      date: '2024-03-10',
      duration: '8 months'
    },
    {
      id: 4,
      title: 'Unique Retail Transformation',
      client: 'Unique Retail Chain',
      category: 'E-commerce',
      description: 'Complete digital transformation for retail chain with integrated e-commerce platform and omnichannel marketing approach.',
      image: 'https://via.placeholder.com/400x300?text=Unique+Retail',
      results: [
        { label: 'Online Sales', value: '+680%', icon: TrendingUp },
        { label: 'Customer Retention', value: '92%', icon: Users },
        { label: 'Market Share', value: '+45%', icon: Target }
      ],
      tags: ['E-commerce', 'Mobile App', 'Digital Marketing', 'CRM'],
      date: '2024-01-28',
      duration: '12 months'
    },
    {
      id: 5,
      title: 'Surovi Healthcare Digital',
      client: 'Surovi Medical',
      category: 'Healthcare Marketing',
      description: 'Digital marketing excellence for healthcare provider with patient acquisition and brand trust building campaigns.',
      image: 'https://via.placeholder.com/400x300?text=Surovi+Health',
      results: [
        { label: 'Patient Inquiries', value: '+290%', icon: Users },
        { label: 'Appointments', value: '+180%', icon: Calendar },
        { label: 'Trust Score', value: '94%', icon: Target }
      ],
      tags: ['Healthcare Marketing', 'SEO', 'Content Marketing', 'Reputation Management'],
      date: '2024-02-15',
      duration: '9 months'
    },
    {
      id: 6,
      title: 'Nexara Internal Success',
      client: 'Nexara Agency',
      category: 'Self Promotion',
      description: 'Our own digital transformation journey - how we applied our strategies to achieve remarkable growth for our agency.',
      image: 'https://via.placeholder.com/400x300?text=Nexara+Success',
      results: [
        { label: 'Client Acquisition', value: '+420%', icon: Users },
        { label: 'Revenue Growth', value: '+380%', icon: TrendingUp },
        { label: 'Market Position', value: 'Top 3', icon: Target }
      ],
      tags: ['Brand Marketing', 'Content Strategy', 'SEO', 'Social Media'],
      date: '2024-03-01',
      duration: 'Ongoing'
    }
  ];

  const categories = ['all', 'Digital Marketing', 'Brand Development', 'Web Development', 'E-commerce', 'Healthcare Marketing'];

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || study.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-6 block">Success Stories</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-8 leading-[1.1]">
              Our <span className="text-primary">Case Studies</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses across various industries achieve remarkable growth through strategic digital solutions and data-driven marketing campaigns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-dark-lighter border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-dark border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFilter(category)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    selectedFilter === category
                      ? 'bg-primary text-white'
                      : 'bg-dark border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {filteredCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-dark-lighter rounded-[3rem] border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {study.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white mb-2">{study.title}</h3>
                    <p className="text-gray-300 text-sm">{study.client}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {study.description}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
                    {study.results.map((result, i) => (
                      <div key={i} className="text-center">
                        <result.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-black text-white mb-1">{result.value}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-white/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="text-xs text-gray-500">
                      <span className="font-bold">{study.duration}</span> • {study.date}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white hover:text-primary hover:border-primary px-6 h-10 rounded-xl"
                    >
                      View Details <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No case studies found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark-lighter border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Create Your <span className="text-primary">Success Story?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join our growing list of satisfied clients who have transformed their business with our digital solutions.
          </p>
          <div className="flex gap-6 justify-center">
            <Button className="h-14 px-8 rounded-xl font-bold">
              Get Started
            </Button>
            <Button variant="outline" className="border-white/10 text-white hover:text-primary hover:border-primary h-14 px-8 rounded-xl">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ViewCaseStudies;
