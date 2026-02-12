import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  MessageSquare,
  DollarSign,
  Folder,
  Calendar,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const ClientDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [serviceCriteria, setServiceCriteria] = useState<string[]>([
    'Always-on brand awareness',
    'Quarterly performance reporting',
    'Conversion-focused landing pages',
  ]);
  const [newCriterion, setNewCriterion] = useState('');

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'client')) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="h-10 w-56 bg-dark-lighter rounded-full animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8 animate-pulse"
              >
                <div className="w-10 h-10 bg-dark rounded-2xl mb-4" />
                <div className="h-6 w-20 bg-dark rounded-full mb-2" />
                <div className="h-4 w-32 bg-dark rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || user.role !== 'client') return null;

  const projects = [
    {
      id: 1,
      name: 'NEXARA V2 Web Platform',
      status: 'In Progress',
      progress: 72,
      budgetUsed: 58,
      roi: '+143%',
      deadline: 'Dec 20, 2025',
      team: 'Digital Strategy Team',
      nextMilestone: 'Homepage Design Review',
    },
    {
      id: 2,
      name: 'Q4 SEO & Content Engine',
      status: 'Active',
      progress: 54,
      budgetUsed: 41,
      roi: '+96%',
      deadline: 'Ongoing',
      team: 'Performance Marketing',
      nextMilestone: 'Keyword Strategy Update',
    },
    {
      id: 3,
      name: 'Paid Media Acceleration',
      status: 'Planning',
      progress: 18,
      budgetUsed: 10,
      roi: '+32%',
      deadline: 'Jan 15, 2026',
      team: 'Media Buying',
      nextMilestone: 'Campaign Launch',
    },
  ];

  const handleAddCriterion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCriterion.trim()) return;
    setServiceCriteria((prev) => [...prev, newCriterion.trim()]);
    setNewCriterion('');
  };

  const handleRemoveCriterion = (index: number) => {
    setServiceCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tight">
              Client <span className="text-primary">Portal</span>
            </h1>
            <p className="text-gray-500 mt-2">
              Managing digital evolution for <span className="font-semibold text-white">{user.name}</span>.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Account ID: <span className="text-primary">#{user.id.slice(0, 6).toUpperCase()}</span>
            </div>
            <Link to="/custom-quote">
              <Button variant="primary" className="rounded-xl px-8">
                NEW PROJECT
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
                { label: 'Active Projects', value: '3', icon: Folder, color: 'text-primary' },
                { label: 'Pending Invoices', value: '1', icon: DollarSign, color: 'text-emerald-500' },
                { label: 'Total Messages', value: '12', icon: MessageSquare, color: 'text-indigo-500' },
                { label: 'Files Shared', value: '45', icon: FileText, color: 'text-amber-500' }
            ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-dark-lighter p-8 rounded-[2rem] border border-white/5 flex items-center gap-6 hover:border-primary/30 transition-all"
                >
                    <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-3xl font-black text-white leading-none mb-1">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Project analytics table */}
        <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            Active Workflows
          </h2>
          <div className="overflow-x-auto">
              <table className="min-w-full">
                  <thead>
                      <tr className="border-b border-white/5 text-left">
                          <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Project Identification</th>
                          <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Operational Status</th>
                          <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Deadline</th>
                          <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Owner</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {projects.map((project, idx) => (
                        <motion.tr 
                          key={project.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <td className="px-6 py-6 whitespace-nowrap text-white font-bold">{project.name}</td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' :
                              project.status === 'In Progress' ? 'bg-primary/10 text-primary' :
                              'bg-amber-500/10 text-amber-500'
                            }`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap text-gray-500 text-sm">{project.deadline}</td>
                          <td className="px-6 py-6 whitespace-nowrap text-gray-400 text-xs">{project.team}</td>
                        </motion.tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/custom-quote"
              className="p-10 bg-dark-lighter border border-white/5 rounded-[2.5rem] hover:border-primary/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
                Initiate Project
              </h3>
              <p className="text-sm text-gray-500">
                Request a custom proposal for your next digital initiative.
              </p>
            </Link>
            <Link
              to="/feedback"
              className="p-10 bg-dark-lighter border border-white/5 rounded-[2.5rem] hover:border-emerald-500/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
                Submit Intelligence
              </h3>
              <p className="text-sm text-gray-500">
                Provide operational feedback to optimize our service delivery.
              </p>
            </Link>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
                Dedicated Support Channel
              </p>
              <h3 className="text-xl font-black text-white mb-3">Your Account Squad</h3>
              <p className="text-sm text-gray-500 mb-6">
                Reach out directly to your success manager for strategy reviews, reporting, or escalation.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black text-sm">
                  NS
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">NEXARA Success Team</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-widest">Response SLA: &lt; 2 hrs</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl border-white/10 text-white hover:border-primary text-xs font-bold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Book Strategy Call
              </Button>
              <Button
                variant="primary"
                className="flex-1 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                Open Ticket
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Service criteria & portfolio snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8 lg:col-span-2">
            <h3 className="text-xl font-black text-white mb-4">Service Criteria & Expectations</h3>
            <p className="text-sm text-gray-500 mb-4">
              Capture what matters most for your organization so our team can align execution with your
              expectations.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {serviceCriteria.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative px-3 py-1.5 rounded-full bg-dark text-xs font-semibold text-gray-300 border border-white/10 group"
                >
                  {item}
                  <button
                    onClick={() => handleRemoveCriterion(idx)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </motion.span>
              ))}
            </div>
            <form onSubmit={handleAddCriterion} className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                className="flex-1 bg-dark border border-white/10 rounded-2xl px-4 h-12 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Add a new requirement or success metric..."
              />
              <Button
                type="submit"
                variant="primary"
                className="h-12 rounded-2xl px-6 text-xs font-black uppercase tracking-widest"
              >
                Add Criterion
              </Button>
            </form>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-black text-white mb-4">Project Analytics Snapshot</h3>
            <div className="space-y-4 text-sm text-gray-400">
              {projects.map((project, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-dark border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-bold text-white">{project.name}</p>
                    <span className="text-[10px] uppercase tracking-widest text-primary">
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span>Progress</span>
                    <span className="text-white font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-dark overflow-hidden mb-1">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/80"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.2 + 0.5 }}
                    >
                      Budget used: {project.budgetUsed}%
                    </motion.span>
                    <motion.span 
                      className="text-emerald-400 font-semibold"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 + 0.7 }}
                    >
                      ROI {project.roi}
                    </motion.span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
