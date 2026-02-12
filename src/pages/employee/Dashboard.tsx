import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import {
  CheckSquare,
  Upload,
  Image,
  Clock,
  Calendar,
  FileText,
  ArrowRight,
  TrendingUp,
  Users,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const EmployeeDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  type TaskStatus = 'New' | 'In Progress' | 'Completed' | 'Review';

  const [tasks, setTasks] = useState<
    { id: number; title: string; client: string; status: TaskStatus; due: string; priority: 'High' | 'Medium' | 'Low'; description: string }[]
  >([
    { id: 1, title: 'Homepage hero exploration', client: 'NEXARA V2', status: 'New', due: 'Today', priority: 'High', description: 'Create hero section concepts for new website design' },
    { id: 2, title: 'SEO landing visuals', client: 'TechFlow', status: 'In Progress', due: 'Tomorrow', priority: 'Medium', description: 'Design visual assets for SEO landing pages' },
    { id: 3, title: 'Social media templates', client: 'EcoCraft', status: 'Review', due: 'This Week', priority: 'Low', description: 'Create social media template designs' },
    { id: 4, title: 'Brand guidelines update', client: 'NEXARA V2', status: 'New', due: 'Next Week', priority: 'Medium', description: 'Update brand guidelines documentation' },
  ]);

  const [submissions, setSubmissions] = useState<
    { id: number; project: string; fileName: string; note: string; status: string; submittedAt: string; reviewedBy?: string }[]
  >([
    { id: 1, project: 'NEXARA V2 Website', fileName: 'homepage-concepts.fig', note: 'Initial homepage design concepts for review', status: 'Approved', submittedAt: '2025-12-10', reviewedBy: 'Design Lead' },
    { id: 2, project: 'SEO Content Engine', fileName: 'keyword-research.xlsx', note: 'Comprehensive keyword analysis for Q4', status: 'Pending Review', submittedAt: '2025-12-12' },
  ]);

  const [submissionForm, setSubmissionForm] = useState({
    project: '',
    note: '',
    fileName: '',
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'employee')) {
      navigate('/employee-login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="h-10 w-40 bg-dark-lighter rounded-full animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8 animate-pulse"
              >
                <div className="h-6 w-20 bg-dark rounded-full mb-3" />
                <div className="h-4 w-32 bg-dark rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || user.role !== 'employee') return null;

  const updateTaskStatus = (id: number, next: TaskStatus) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: next } : task)));
  };

  const handleSubmissionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubmissionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSubmissionForm((prev) => ({ ...prev, fileName: file ? file.name : '' }));
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionForm.project || !submissionForm.fileName) {
      alert('Please select a project and upload a file');
      return;
    }
    
    try {
      setSubmissions((prev) => [
        ...prev,
        {
          id: Date.now(),
          project: submissionForm.project,
          fileName: submissionForm.fileName,
          note: submissionForm.note,
          status: 'Pending Review',
          submittedAt: new Date().toISOString().split('T')[0],
        },
      ]);
      setSubmissionForm({
        project: '',
        note: '',
        fileName: '',
      });
      alert('File submitted successfully for review!');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit file. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tight">
              Talent <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-gray-500 mt-2">
              NEXARA internal network session for{' '}
              <span className="font-semibold text-white">{user.name}</span>.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              Profile ID: <span className="text-primary">#{user.id.slice(0, 6).toUpperCase()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-white/5 bg-white/5 text-gray-400"
            >
              View Guidelines
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="rounded-xl"
              onClick={() => {
                const element = document.getElementById('submission-panel');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Submit Work
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
                { label: 'Assigned Tasks', value: tasks.length.toString(), icon: CheckSquare, color: 'text-primary' },
                { label: 'Global Submissions', value: submissions.length.toString(), icon: Upload, color: 'text-emerald-500' },
                { label: 'Portfolio Assets', value: '8', icon: Image, color: 'text-indigo-500' }
            ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-dark-lighter border border-white/5 p-10 rounded-[2.5rem] flex justify-between items-center group hover:border-primary/30 transition-all"
                >
                    <div>
                        <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</div>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon size={24} />
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-dark-lighter border border-white/5 rounded-[3rem] p-12">
            <h2 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              Active Mission Directives
            </h2>
            <div className="space-y-4">
              {tasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex justify-between items-center p-8 bg-dark rounded-[2rem] border border-white/5 hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-2 h-12 bg-white/5 rounded-full overflow-hidden group-hover:bg-primary/20 transition-colors">
                      <div
                        className={`w-full h-1/2 ${
                          task.status === 'New' || task.status === 'In Progress'
                            ? 'bg-primary'
                            : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-black text-white uppercase tracking-tighter mb-1">
                        {task.title}
                      </p>
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                        Client: {task.client}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Due {task.due}
                      </p>
                      <div className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mt-2 ${
                        task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                        task.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {task.priority} Priority
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border cursor-pointer transition-all ${
                      task.status === 'Completed' || task.status === 'Review'
                        ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'text-primary bg-primary/10 border-primary/30 hover:bg-primary/20'
                    }`}
                    onClick={() => updateTaskStatus(task.id, task.status === 'New' ? 'In Progress' : task.status === 'In Progress' ? 'Completed' : 'Review')}
                  >
                    {task.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Today&apos;s Schedule
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Daily standup with Creative Squad</span>
                  <span className="text-[11px] text-gray-500">10:00 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Client review: Homepage layout</span>
                  <span className="text-[11px] text-gray-500">2:30 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Internal training: Design systems</span>
                  <span className="text-[11px] text-gray-500">4:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Quick Resources
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <button className="w-full text-left px-4 py-3 rounded-2xl bg-dark hover:bg-white/5 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between">
                  <span>Brand Identity Guidelines</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-2xl bg-dark hover:bg-white/5 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between">
                  <span>Submission Quality Checklist</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-2xl bg-dark hover:bg-white/5 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between">
                  <span>Performance & Incentive Policy</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* File submission & history */}
        <div
          id="submission-panel"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        >
          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-10 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Upload className="w-5 h-5 text-primary" />
              Submit Files For Review
            </h2>
            <form onSubmit={handleSubmitWork} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                    Project
                  </label>
                  <select
                    name="project"
                    value={submissionForm.project}
                    onChange={handleSubmissionChange}
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-12 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                    required
                  >
                    <option value="">Select project</option>
                    <option value="NEXARA V2 Website">NEXARA V2 Website</option>
                    <option value="SEO Content Engine">SEO Content Engine</option>
                    <option value="Social Media Campaign">Social Media Campaign</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                    Attach File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                  {submissionForm.fileName && (
                    <p className="text-[11px] text-gray-500 mt-1">
                      Selected: <span className="text-white">{submissionForm.fileName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                  Notes for reviewer
                </label>
                <textarea
                  name="note"
                  value={submissionForm.note}
                  onChange={handleSubmissionChange}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary outline-none min-h-[100px]"
                  placeholder="Mention design decisions, open questions, or specific feedback you’re looking for."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="h-12 rounded-2xl px-8 font-black text-sm tracking-widest flex items-center gap-2"
              >
                Upload For Review
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Upload className="w-5 h-5 text-primary" />
              Submission History
            </h2>
            {submissions.length === 0 ? (
              <p className="text-sm text-gray-500">
                You haven&apos;t submitted any files yet. Once you upload work, tracking will appear here.
              </p>
            ) : (
              <div className="space-y-3 text-sm text-gray-300">
                {submissions.map((item) => (
                  <div
                    key={item.id}
                    className="border border-white/5 rounded-2xl p-3 bg-dark flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white text-xs">{item.project}</span>
                      <span className="text-[10px] uppercase tracking-widest text-primary">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">File: {item.fileName}</p>
                    {item.note && (
                      <p className="text-[11px] text-gray-500 truncate">
                        Note: {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
