import { useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, ChevronLeft, ChevronRight, Quote, Building, User, Calendar, TrendingUp, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const GiveFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    feedback: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Client testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechVision Solutions",
      role: "CEO",
      rating: 5,
      comment: "NEXARA transformed our digital presence completely. Their strategic approach to SEO and social media marketing increased our leads by 300% in just 6 months.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      date: "2024",
      project: "Digital Marketing Campaign"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Retail Co.",
      role: "Marketing Director",
      rating: 5,
      comment: "The team's expertise in e-commerce marketing is unmatched. They helped us achieve record-breaking sales during our peak season with innovative campaigns.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      date: "2024",
      project: "E-commerce Optimization"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Fashion Forward Ltd.",
      role: "Brand Manager",
      rating: 5,
      comment: "Creative, professional, and results-oriented. NEXARA's content strategy elevated our brand identity and engagement across all platforms.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      date: "2024",
      project: "Brand Development"
    },
    {
      id: 4,
      name: "David Kim",
      company: "StartUp Hub",
      role: "Founder",
      rating: 5,
      comment: "From startup to scale-up, NEXARA has been our growth partner. Their data-driven approach to marketing helped us secure our Series A funding.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f3d?w=100&h=100&fit=crop&crop=face",
      date: "2024",
      project: "Growth Strategy"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      company: "HealthPlus Medical",
      role: "Operations Director",
      rating: 5,
      comment: "Outstanding service and measurable results. Their healthcare marketing expertise helped us reach more patients while maintaining compliance.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      date: "2024",
      project: "Healthcare Marketing"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', feedback: '', type: 'general' });
      setRating(0);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="relative py-32 bg-dark text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <Star className="w-12 h-12 fill-current" />
            </div>
            <h1 className="text-5xl font-black text-white mb-4">Thank You!</h1>
            <p className="text-gray-400 text-lg">Your feedback has been received. We appreciate your time and input.</p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-dark via-dark-lighter to-dark overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
              Client <span className="text-primary">Voices</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
              Real experiences from real clients. Your feedback helps us continuously improve and deliver exceptional results.
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-primary">500+</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary">4.9/5</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary">98%</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-400 text-lg">Don't just take our word for it - hear from our partners</p>
          </motion.div>

          <div className="relative">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${i < testimonials[currentTestimonial].rating ? 'text-primary fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <Quote className="text-primary/20 w-12 h-12 mb-4" />
                      <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                        "{testimonials[currentTestimonial].comment}"
                      </p>
                      <div>
                        <h4 className="text-white font-bold text-xl">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-primary font-semibold">{testimonials[currentTestimonial].role}</p>
                        <p className="text-gray-400">{testimonials[currentTestimonial].company}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {testimonials[currentTestimonial].date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building size={14} />
                            {testimonials[currentTestimonial].project}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial ? 'bg-primary w-8' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-primary hover:border-primary transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-4">Share Your Experience</h2>
            <p className="text-gray-400 text-lg">Your feedback helps us serve you better</p>
          </motion.div>

          <Card className="bg-dark-lighter p-8 md:p-12 border-white/5 rounded-[2rem]">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating Stars */}
              <div className="text-center">
                <label className="block text-gray-400 font-bold mb-4">Rate Your Experience</label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="transition-all transform hover:scale-110"
                    >
                      <Star
                        size={48}
                        className={`${
                          star <= (hoveredStar || rating)
                            ? 'text-primary fill-current'
                            : 'text-gray-600'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 font-bold mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-bold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-2">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="Your Company Ltd."
                />
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-2">Feedback Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                >
                  <option value="general">General Feedback</option>
                  <option value="service">Service Quality</option>
                  <option value="support">Customer Support</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-bold mb-2">Your Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full bg-dark border border-white/10 rounded-2xl p-6 text-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none placeholder:text-gray-700"
                  placeholder="Tell us what you loved or how we can improve..."
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full h-16 rounded-2xl bg-primary hover:bg-primary-dark font-bold text-lg border-none shadow-xl shadow-primary/20"
                isLoading={isSubmitting}
                disabled={!rating || !formData.feedback}
              >
                Submit Feedback <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, label: "Client Growth", value: "150%", desc: "Year over year" },
              { icon: Award, label: "Awards Won", value: "25+", desc: "Industry recognition" },
              { icon: User, label: "Team Size", value: "50+", desc: "Marketing experts" },
              { icon: Star, label: "Client Retention", value: "95%", desc: "Long-term partnerships" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-primary w-8 h-8" />
                </div>
                <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-white font-bold mb-1">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GiveFeedback;
