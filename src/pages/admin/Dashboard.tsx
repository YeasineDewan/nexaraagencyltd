import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Folder,
  Briefcase,
  CreditCard,
  Activity,
  AlertTriangle,
  Server,
  ShieldCheck,
  Clock,
  Image,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

const AdminDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [blogForm, setBlogForm] = useState({
    title: '',
    category: '',
    status: 'Draft',
  });

  const [blogs, setBlogs] = useState<
    { id: number; title: string; category: string; status: string; date: string }[]
  >([
    { id: 1, title: 'How NEXARA Designs High-Impact Funnels', category: 'Strategy', status: 'Published', date: 'Feb 10, 2026' },
    { id: 2, title: 'Creative Ops Playbook 2026', category: 'Operations', status: 'Draft', date: 'Feb 05, 2026' },
  ]);

  const [portfolioForm, setPortfolioForm] = useState({
    name: '',
    client: '',
    type: '',
  });

  const [portfolio, setPortfolio] = useState<
    { id: number; name: string; client: string; type: string; status: string }[]
  >([
    { id: 1, name: 'Lucia Belia Global Launch', client: 'Lucia Belia', type: 'Brand Campaign', status: 'Live' },
    { id: 2, name: 'EcoCraft D2C Funnel', client: 'EcoCraft', type: 'E-commerce', status: 'Archived' },
  ]);

  const [mediaLibrary, setMediaLibrary] = useState<
    { id: number; label: string; usage: string }[]
  >([
    { id: 1, label: 'Homepage Hero Background', usage: 'Home > Hero' },
    { id: 2, label: 'Case Study Cover - TechFlow', usage: 'Case Study' },
  ]);

  const [siteSettings, setSiteSettings] = useState({
    heroHeadline: 'Your Strategic Digital Partner For Ultimate Success.',
    heroSubtext: 'Admin-controlled marketing copy. Changes here reflect your brand voice decisions.',
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="h-10 w-40 bg-dark-lighter rounded-full animate-pulse mb-6" />
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

  if (!user || user.role !== 'admin') return null;

  const stats = [
    { name: 'Total Users', value: '120', icon: Users, color: 'bg-blue-500' },
    { name: 'Active Projects', value: '15', icon: Folder, color: 'bg-green-500' },
    { name: 'Services', value: '8', icon: Briefcase, color: 'bg-yellow-500' },
    { name: 'Revenue (Monthly)', value: '$45k', icon: CreditCard, color: 'bg-purple-500' },
  ];

  const systemHealth = [
    {
      label: 'API Latency',
      value: '184 ms',
      status: 'Optimal',
      color: 'text-emerald-400',
      icon: Activity,
    },
    {
      label: 'Uptime (30d)',
      value: '99.98%',
      status: 'Healthy',
      color: 'text-primary',
      icon: Server,
    },
    {
      label: 'Security Events',
      value: '3',
      status: 'Reviewing',
      color: 'text-amber-400',
      icon: ShieldCheck,
    },
  ];

  const recentActivity = [
    {
      time: '2 min ago',
      title: 'New client workspace provisioned',
      actor: 'Automation Bot',
      type: 'Provisioning',
    },
    {
      time: '24 min ago',
      title: 'Employee access level updated',
      actor: 'HR Ops',
      type: 'Access Control',
    },
    {
      time: '1 hr ago',
      title: 'Monthly billing report generated',
      actor: 'Finance Engine',
      type: 'Billing',
    },
    {
      time: '3 hr ago',
      title: 'Security patch deployed to production',
      actor: 'DevOps',
      type: 'Security',
    },
  ];

  const pendingApprovals = [
    {
      requester: 'Sarah Ahmed',
      item: 'Client portal role elevation',
      created: 'Today, 10:21 AM',
      risk: 'Medium',
    },
    {
      requester: 'TechFlow Inc.',
      item: 'New workspace + 12 seats',
      created: 'Yesterday, 4:36 PM',
      risk: 'Low',
    },
    {
      requester: 'Internal Script',
      item: 'API rate limit extension',
      created: 'Yesterday, 9:11 AM',
      risk: 'High',
    },
  ];

  const handleBlogChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) return;
    setBlogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: blogForm.title.trim(),
        category: blogForm.category || 'General',
        status: blogForm.status,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setBlogForm({ title: '', category: '', status: 'Draft' });
  };

  const handlePortfolioChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPortfolioForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.name.trim() || !portfolioForm.client.trim()) return;
    setPortfolio((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: portfolioForm.name.trim(),
        client: portfolioForm.client.trim(),
        type: portfolioForm.type || 'Campaign',
        status: 'Planned',
      },
    ]);
    setPortfolioForm({ name: '', client: '', type: '' });
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaLibrary((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: file.name,
        usage: 'Unassigned',
      },
    ]);
  };

  const handleSiteSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSiteSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h1 className="text-5xl font-black text-white uppercase tracking-tight">System <span className="text-primary">Admin</span></h1>
                <p className="text-gray-500 mt-2">Welcome back, {user.name}. Centralized infrastructure control.</p>
            </div>
            <div className="flex gap-4">
                <Button variant="outline" size="sm" className="rounded-xl border-white/5 bg-white/5 text-gray-400">Export Logs</Button>
                <Button variant="primary" size="sm" className="rounded-xl">System Update</Button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8 group hover:border-primary/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${stat.color} bg-opacity-10 text-white`}>
                    <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Metric</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.name}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
             Infrastructure Commands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
                 { title: 'User Governance', desc: 'Protocol for identity management & role allocation.', icon: Users },
                 { title: 'Project Nexus', desc: 'Centralized tracking of all active operational pipelines.', icon: Folder },
                 { title: 'Financial Matrix', desc: 'Analysis of global revenue streams & fiscal reporting.', icon: CreditCard }
             ].map((action, i) => (
                <button key={i} className="p-8 bg-dark border border-white/5 rounded-[2.5rem] hover:border-primary/50 transition-all text-left group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                        <action.icon size={20} />
                    </div>
                    <div className="font-black text-white mb-2 uppercase tracking-tighter text-lg">{action.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{action.desc}</div>
                </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 bg-dark-lighter border border-white/5 rounded-[3rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                Recent Control Plane Activity
              </h2>
              <button className="text-xs font-bold text-gray-500 hover:text-primary transition-colors">
                View full audit log
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 hover:bg-white/5 rounded-2xl px-3 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-dark flex items-center justify-center text-primary">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {item.actor} · <span className="uppercase tracking-widest">{item.type}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                System Health Snapshot
              </h3>
              <div className="space-y-4">
                {systemHealth.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-dark flex items-center justify-center text-gray-400">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Pending Approvals
              </h3>
              <div className="space-y-4">
                {pendingApprovals.map((request, idx) => (
                  <div key={idx} className="border border-white/5 rounded-xl p-3 bg-dark">
                    <p className="text-xs font-semibold text-white mb-1">{request.item}</p>
                    <p className="text-[11px] text-gray-500 mb-2">
                      {request.requester} · {request.created}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          request.risk === 'High'
                            ? 'bg-red-500/10 text-red-400'
                            : request.risk === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-emerald-500/10 text-emerald-400'
                        }`}
                      >
                        {request.risk} Risk
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="primary" className="rounded-full px-3 h-7 text-[10px]">
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full px-3 h-7 text-[10px] border-white/10 text-gray-400"
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content & website settings */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-12">
          <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-8 xl:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Folder className="w-4 h-4 text-primary" />
              Content Management (Blogs & Portfolio)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Blog publisher */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                  Quick Blog Publisher
                </h3>
                <form onSubmit={handleAddBlog} className="space-y-3 text-sm">
                  <input
                    name="title"
                    value={blogForm.title}
                    onChange={handleBlogChange}
                    placeholder="Blog title"
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-10 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                  <input
                    name="category"
                    value={blogForm.category}
                    onChange={handleBlogChange}
                    placeholder="Category (e.g. Strategy, Operations)"
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-10 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                  <select
                    name="status"
                    value={blogForm.status}
                    onChange={handleBlogChange}
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-10 text-white focus:ring-2 focus:ring-primary outline-none text-xs"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                  <Button
                    type="submit"
                    variant="primary"
                    className="h-10 rounded-2xl px-6 text-xs font-black tracking-widest"
                  >
                    Add Blog Entry
                  </Button>
                </form>
                <div className="mt-4 space-y-2 text-xs text-gray-400 max-h-40 overflow-y-auto pr-1">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="flex justify-between items-center bg-dark border border-white/5 rounded-2xl px-3 py-2"
                    >
                      <div>
                        <p className="text-white font-semibold truncate">{blog.title}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                          {blog.category} · {blog.date}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          blog.status === 'Published'
                            ? 'text-emerald-400'
                            : blog.status === 'Scheduled'
                            ? 'text-amber-400'
                            : 'text-gray-500'
                        }`}
                      >
                        {blog.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio uploader */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                  Portfolio Projects
                </h3>
                <form onSubmit={handleAddPortfolio} className="space-y-3 text-sm">
                  <input
                    name="name"
                    value={portfolioForm.name}
                    onChange={handlePortfolioChange}
                    placeholder="Project name"
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-10 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                  <input
                    name="client"
                    value={portfolioForm.client}
                    onChange={handlePortfolioChange}
                    placeholder="Client / Brand"
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-10 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                  <input
                    name="type"
                    value={portfolioForm.type}
                    onChange={handlePortfolioChange}
                    placeholder="Type (e.g. Web, Campaign)"
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-10 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="h-10 rounded-2xl px-6 text-xs font-black tracking-widest border-white/10"
                  >
                    Add Portfolio Item
                  </Button>
                </form>
                <div className="mt-4 space-y-2 text-xs text-gray-400 max-h-40 overflow-y-auto pr-1">
                  {portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-dark border border-white/5 rounded-2xl px-3 py-2"
                    >
                      <div>
                        <p className="text-white font-semibold truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                          {item.client} · {item.type}
                        </p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Media & site settings */}
          <div className="space-y-6">
            <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-8">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Image className="w-4 h-4 text-primary" />
                Media Library (Frontend Assets)
              </h3>
              <div className="space-y-3 text-xs text-gray-400 mb-4 max-h-40 overflow-y-auto pr-1">
                {mediaLibrary.map((media) => (
                  <div
                    key={media.id}
                    className="flex justify-between items-center bg-dark border border-white/5 rounded-2xl px-3 py-2"
                  >
                    <div>
                      <p className="text-white font-semibold truncate">{media.label}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                        {media.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <label className="block text-[11px] font-bold text-gray-500 mb-2">
                Upload New Asset
              </label>
              <input
                type="file"
                onChange={handleMediaUpload}
                className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>

            <div className="bg-dark-lighter border border-white/5 rounded-[3rem] p-8">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Website Hero Copy (Preview)
              </h3>
              <div className="space-y-3 text-xs text-gray-400 mb-4">
                <input
                  name="heroHeadline"
                  value={siteSettings.heroHeadline}
                  onChange={handleSiteSettingsChange}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 h-10 text-white focus:ring-2 focus:ring-primary outline-none text-xs"
                  placeholder="Hero headline"
                />
                <textarea
                  name="heroSubtext"
                  value={siteSettings.heroSubtext}
                  onChange={handleSiteSettingsChange}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none text-xs min-h-[80px]"
                  placeholder="Hero subtext"
                />
              </div>
              <div className="bg-dark border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-2">
                  Live Preview
                </p>
                <p className="text-sm font-black text-white mb-1">
                  {siteSettings.heroHeadline}
                </p>
                <p className="text-[11px] text-gray-400">
                  {siteSettings.heroSubtext}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
