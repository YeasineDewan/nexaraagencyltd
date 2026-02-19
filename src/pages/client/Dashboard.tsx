import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout, type DashboardSection } from '../../components/dashboard/DashboardLayout';
import { StatCard } from '../../components/dashboard/StatCard';
import { Button } from '../../components/ui/Button';
import { dashboardApi } from '../../store/dashboardData';
import { motion } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  DollarSign,
  Folder,
  Calendar,
  ArrowRight,
  PhoneCall,
  Plus,
  X,
} from 'lucide-react';

const ClientDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');

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
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'client') return null;

  const stats = dashboardApi.getClientStats();
  const projects = dashboardApi.getClientProjects();
  const invoices = dashboardApi.getClientInvoices();
  const messages = dashboardApi.getClientMessages();

  const handleAddCriterion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCriterion.trim()) return;
    setServiceCriteria((prev) => [...prev, newCriterion.trim()]);
    setNewCriterion('');
  };

  const handleRemoveCriterion = (index: number) => {
    setServiceCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'In Progress':
        return 'bg-primary/10 text-primary';
      case 'Planning':
        return 'bg-amber-500/10 text-amber-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'sent':
      case 'viewed':
        return 'bg-amber-500/10 text-amber-400';
      case 'overdue':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <DashboardLayout
      role="client"
      title="Client Portal"
      subtitle={`Managing digital evolution for ${user.name}`}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      actions={
        <>
          <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            Account ID: <span className="text-primary">#{user.id.slice(0, 6).toUpperCase()}</span>
          </div>
          <Link to="/custom-quote">
            <Button variant="primary" className="rounded-xl px-8 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </Link>
        </>
      }
    >
      {/* Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Active Projects"
              value={stats.activeProjects}
              icon={Folder}
              color="text-primary"
              delay={0}
            />
            <StatCard
              label="Pending Invoices"
              value={stats.pendingInvoices}
              icon={DollarSign}
              color="text-emerald-400"
              delay={0.05}
            />
            <StatCard
              label="Total Messages"
              value={stats.totalMessages}
              icon={MessageSquare}
              color="text-indigo-400"
              delay={0.1}
            />
            <StatCard
              label="Files Shared"
              value={stats.filesShared}
              icon={FileText}
              color="text-amber-400"
              delay={0.15}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Active Workflows
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 text-left">
                      <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-wider">Deadline</th>
                      <th className="px-4 py-3 text-[10px] font-black text-gray-500 uppercase tracking-wider">Team</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.map((project, idx) => (
                      <motion.tr
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-4 font-semibold text-white">{project.name}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-dark overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${project.progress}%` }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                              />
                            </div>
                            <span className="text-xs text-white font-semibold">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">{project.deadline}</td>
                        <td className="px-4 py-4 text-xs text-gray-400">{project.team}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-lg font-bold text-white mb-4">Project Analytics</h3>
                <div className="space-y-4">
                  {projects.map((project, idx) => (
                    <div key={project.id} className="p-4 rounded-2xl bg-dark border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-semibold text-white truncate">{project.name}</p>
                        <span className={`text-[10px] font-bold uppercase ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-white font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-dark overflow-hidden mb-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1.2, delay: idx * 0.2 }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span>Budget: {project.budgetUsed}%</span>
                        <span className="text-emerald-400 font-semibold">ROI {project.roi}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black">
                    NS
                  </div>
                  <div>
                    <p className="font-semibold text-white">NEXARA Success Team</p>
                    <p className="text-[11px] text-gray-500">Response SLA: &lt; 2 hrs</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Reach out for strategy reviews, reporting, or escalation.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 rounded-xl border-white/10 text-sm flex items-center justify-center gap-2">
                    <PhoneCall className="w-4 h-4" />
                    Book Call
                  </Button>
                  <Button variant="primary" className="flex-1 rounded-xl text-sm flex items-center justify-center gap-2">
                    Open Ticket
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8 mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Recent Invoices
            </h3>
            <div className="space-y-2">
              {invoices.slice(0, 3).map((inv) => (
                <Link key={inv.id} to="/client/invoices" className="flex justify-between items-center p-4 rounded-xl bg-dark border border-white/5 hover:border-primary/30 transition-colors">
                  <span className="font-medium text-white">{inv.number}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getInvoiceStatusColor(inv.status)}`}>{inv.status}</span>
                </Link>
              ))}
            </div>
            <Link to="/client/invoices" className="inline-block mt-4 text-sm text-primary font-bold hover:underline">View all invoices →</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Link to="/custom-quote" className="group">
              <div className="p-8 bg-dark-lighter border border-white/5 rounded-[2.5rem] hover:border-primary/50 transition-all h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Initiate Project</h3>
                <p className="text-sm text-gray-500">
                  Request a custom proposal for your next digital initiative.
                </p>
              </div>
            </Link>
            <Link to="/feedback" className="group">
              <div className="p-8 bg-dark-lighter border border-white/5 rounded-[2.5rem] hover:border-emerald-500/50 transition-all h-full">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Submit Feedback</h3>
                <p className="text-sm text-gray-500">
                  Provide operational feedback to optimize our service delivery.
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">My Projects</h2>
            <Link to="/custom-quote">
              <Button variant="primary" className="rounded-xl flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8 hover:border-primary/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-white text-lg">{project.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Team: {project.team}</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-white font-semibold">{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-dark overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Budget used: {project.budgetUsed}%</span>
                    <span className="text-emerald-400 font-semibold">ROI {project.roi}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Next: {project.nextMilestone} · Due {project.deadline}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Section - shown when overview, or we could add it. Actually overview doesn't show messages. Let me add messages section content */}
      {activeSection === 'messages' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  msg.read ? 'bg-dark-lighter border-white/5' : 'bg-dark-lighter border-primary/20'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-white">{msg.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">{msg.preview}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {msg.from} · {msg.date}
                    </p>
                  </div>
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support Section */}
      {activeSection === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-4">Service Criteria & Expectations</h3>
            <p className="text-sm text-gray-500 mb-4">
              Capture what matters most so our team can align execution with your expectations.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {serviceCriteria.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative px-3 py-1.5 rounded-full bg-dark text-xs font-semibold text-gray-300 border border-white/10 group"
                >
                  {item}
                  <button
                    onClick={() => handleRemoveCriterion(idx)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs hover:bg-red-600 flex items-center justify-center"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </motion.span>
              ))}
            </div>
            <form onSubmit={handleAddCriterion} className="flex gap-3">
              <input
                type="text"
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                className="flex-1 bg-dark border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Add requirement or success metric..."
              />
              <Button type="submit" variant="primary" className="rounded-2xl px-6">
                Add
              </Button>
            </form>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-4">Dedicated Support</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your success manager for strategy reviews, reporting, or escalation.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black text-lg">
                NS
              </div>
              <div>
                <p className="font-semibold text-white">NEXARA Success Team</p>
                <p className="text-xs text-gray-500">Response SLA: &lt; 2 hrs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 rounded-xl flex items-center justify-center gap-2">
                <PhoneCall className="w-4 h-4" />
                Book Strategy Call
              </Button>
              <Button variant="primary" className="flex-1 rounded-xl flex items-center justify-center gap-2">
                Open Ticket
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <div className="max-w-2xl space-y-8">
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Account Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Full Name</label>
                <input defaultValue={user.name} className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Email</label>
                <input defaultValue={user.email} type="email" className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Company</label>
                <input placeholder="Your company name" className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <Button variant="primary" className="rounded-2xl">Save Profile</Button>
            </div>
          </div>
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { label: 'Project updates', desc: 'Get notified when project milestones are completed' },
                { label: 'Invoice reminders', desc: 'Receive reminders for pending invoices' },
                { label: 'Message alerts', desc: 'Notify when you receive new messages' },
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-dark border border-white/5 cursor-pointer hover:border-white/10">
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-white/20 bg-dark text-primary" />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ClientDashboard;
