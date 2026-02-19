import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout, type DashboardSection } from '../../components/dashboard/DashboardLayout';
import { StatCard } from '../../components/dashboard/StatCard';
import { EmptyState } from '../../components/dashboard/EmptyState';
import { Button } from '../../components/ui/Button';
import { dashboardApi } from '../../store/dashboardData';
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
  Search,
  Plus,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
// Simple CSS-based charts (no recharts dependency)

const AdminDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');

  // Forms
  const [blogForm, setBlogForm] = useState({ title: '', category: '', status: 'Draft' as const });
  const [portfolioForm, setPortfolioForm] = useState({ name: '', client: '', type: '' });
  const [userSearch, setUserSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [mediaLibrary, setMediaLibrary] = useState<{ id: number; label: string; usage: string }[]>(
    [
      { id: 1, label: 'Homepage Hero Background', usage: 'Home > Hero' },
      { id: 2, label: 'Case Study Cover - TechFlow', usage: 'Case Study' },
    ]
  );
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    employee: '',
    title: '',
    description: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    deadline: '',
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'client' as 'admin' | 'client' | 'employee',
    status: 'active' as 'active' | 'pending' | 'inactive',
  });
  const [siteSettings, setSiteSettings] = useState({
    heroHeadline: 'Your Strategic Digital Partner For Ultimate Success.',
    heroSubtext: 'Admin-controlled marketing copy. Changes here reflect your brand voice decisions.',
  });
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'NEXARA Agency | Your Strategic Digital Partner',
    metaDescription: 'NEXARA is your strategic digital partner for web development, digital marketing, and creative solutions. Transform your business with our expert team.',
    metaKeywords: 'digital agency, web development, digital marketing, branding, NEXARA',
    ogImage: '',
    canonicalUrl: 'https://nexara.com',
    robotsIndex: true,
    robotsFollow: true,
  });
  const [trackingSettings, setTrackingSettings] = useState({
    gtmId: '',
    ga4Id: '',
    facebookPixelId: '',
    linkedinId: '',
    tiktokPixelId: '',
    twitterPixelId: '',
    hotjarId: '',
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
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

  if (!user || user.role !== 'admin') return null;

  const stats = dashboardApi.getAdminStats();
  const adminUsers = dashboardApi.getAdminUsers(userSearch);
  const adminProjects = dashboardApi.getAdminProjects(
    projectFilter === 'all' ? undefined : (projectFilter as any)
  );
  const blogs = dashboardApi.getAdminBlogs();
  const portfolio = dashboardApi.getAdminPortfolio();
  const activities = dashboardApi.getAdminActivities();
  const pendingApprovals = dashboardApi.getPendingApprovals();
  const revenueData = dashboardApi.getRevenueChartData();
  const userGrowthData = dashboardApi.getUserGrowthData();
  const systemHealth = dashboardApi.getSystemHealth();

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) return;
    dashboardApi.addAdminBlog(blogForm);
    setBlogForm({ title: '', category: '', status: 'Draft' });
    setRefreshKey((k) => k + 1);
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioForm.name.trim() || !portfolioForm.client.trim()) return;
    dashboardApi.addAdminPortfolio({
      ...portfolioForm,
      type: portfolioForm.type || 'Campaign',
      status: 'Planned',
    });
    setPortfolioForm({ name: '', client: '', type: '' });
    setRefreshKey((k) => k + 1);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaLibrary((prev) => [
      ...prev,
      { id: Date.now(), label: file.name, usage: 'Unassigned' },
    ]);
    e.target.value = '';
  };

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.employee || !taskForm.title) return;
    alert(`Task "${taskForm.title}" assigned to ${taskForm.employee}`);
    setTaskForm({ employee: '', title: '', description: '', priority: 'Medium', deadline: '' });
    setShowTaskModal(false);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) return;
    alert(`User ${userForm.name} added successfully`);
    setUserForm({ name: '', email: '', role: 'client', status: 'active' });
    setShowUserModal(false);
  };

  const handleApprove = (id: string) => {
    dashboardApi.approveRequest(id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <DashboardLayout
      role="admin"
      title="System Admin"
      subtitle={`Welcome back, ${user.name}. Centralized infrastructure control.`}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      actions={
        <>
          <Button variant="outline" size="sm" className="rounded-xl border-white/5">
            Export Logs
          </Button>
          <Link to="/admin/invoices">
            <Button variant="outline" size="sm" className="rounded-xl border-white/5">
              Invoices
            </Button>
          </Link>
          <Button variant="primary" size="sm" className="rounded-xl">
            System Update
          </Button>
        </>
      }
    >
      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total Users"
              value={stats.totalUsers}
              icon={Users}
              color="text-blue-400"
              trend={{ value: stats.userGrowth, label: 'vs last month' }}
              delay={0}
            />
            <StatCard
              label="Active Projects"
              value={stats.activeProjects}
              icon={Folder}
              color="text-emerald-400"
              delay={0.05}
            />
            <StatCard
              label="Services"
              value={stats.services}
              icon={Briefcase}
              color="text-amber-400"
              delay={0.1}
            />
            <StatCard
              label="Monthly Revenue"
              value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}k`}
              icon={CreditCard}
              color="text-purple-400"
              trend={{ value: stats.revenueGrowth, label: 'vs last month' }}
              delay={0.15}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Revenue Trend
              </h3>
              <div className="h-64 flex items-end gap-1">
                {revenueData.map((d, i) => (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center gap-2 group"
                    title={`${d.month}: $${d.revenue.toLocaleString()}`}
                  >
                    <div
                      className="w-full bg-gradient-to-t from-primary/40 to-primary rounded-t transition-all hover:from-primary/60 hover:to-primary min-h-[4px]"
                      style={{
                        height: `${(d.revenue / Math.max(...revenueData.map((x) => x.revenue))) * 100}%`,
                        minHeight: '20px',
                      }}
                    />
                    <span className="text-[10px] text-gray-500 font-medium">{d.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>${(Math.min(...revenueData.map((d) => d.revenue)) / 1000).toFixed(0)}k</span>
                <span>${(Math.max(...revenueData.map((d) => d.revenue)) / 1000).toFixed(0)}k</span>
              </div>
            </div>

            <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Growth
              </h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {userGrowthData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex gap-1 items-end h-40">
                      <div
                        className="flex-1 bg-primary/70 rounded-t transition-all hover:bg-primary"
                        style={{
                          height: `${(d.users / Math.max(...userGrowthData.map((x) => x.users))) * 100}%`,
                          minHeight: '16px',
                        }}
                        title={`Users: ${d.users}`}
                      />
                      <div
                        className="flex-1 bg-emerald-500/70 rounded-t transition-all hover:bg-emerald-500"
                        style={{
                          height: `${(d.newClients / 15) * 100}%`,
                          minHeight: '8px',
                        }}
                        title={`New: ${d.newClients}`}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium mt-2">{d.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-primary" /> Users
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded bg-emerald-500" /> New Clients
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-2">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-dark flex items-center justify-center text-primary">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.actor} · <span className="uppercase tracking-wider">{item.type}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  System Health
                </h3>
                <div className="space-y-4">
                  {systemHealth.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-dark flex items-center justify-center text-gray-400">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                          <p className="text-sm font-semibold text-white">{item.value}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Pending Approvals
                </h3>
                <div className="space-y-3">
                  {pendingApprovals.length === 0 ? (
                    <p className="text-sm text-gray-500">No pending approvals</p>
                  ) : (
                    pendingApprovals.map((req) => (
                      <div
                        key={req.id}
                        className="border border-white/5 rounded-xl p-3 bg-dark"
                      >
                        <p className="text-xs font-semibold text-white mb-1">{req.item}</p>
                        <p className="text-[11px] text-gray-500 mb-2">
                          {req.requester} · {req.created}
                        </p>
                        <div className="flex justify-between items-center">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              req.risk === 'High'
                                ? 'bg-red-500/10 text-red-400'
                                : req.risk === 'Medium'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-emerald-500/10 text-emerald-400'
                            }`}
                          >
                            {req.risk}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="primary" className="rounded-full px-3 h-7 text-[10px]" onClick={() => handleApprove(req.id)}>
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-full px-3 h-7 text-[10px]">
                              Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Section */}
      {activeSection === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-lighter border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-xl border-white/10" onClick={() => setShowTaskModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Assign Task
              </Button>
              <Button variant="primary" size="sm" className="rounded-xl" onClick={() => setShowUserModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {adminUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">{u.name}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold capitalize bg-white/10 text-gray-300">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            u.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : u.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-gray-500/10 text-gray-400'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{u.lastActive}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="Edit User">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors" title="Delete User">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Task Assignment Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-white mb-6">Assign New Task</h3>
            <form onSubmit={handleAssignTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Assign To *</label>
                <select
                  value={taskForm.employee}
                  onChange={(e) => setTaskForm(p => ({ ...p, employee: e.target.value }))}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  required
                >
                  <option value="">Select Employee</option>
                  {adminUsers.filter(u => u.role === 'employee').map(u => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Task Title *</label>
                <input
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="Enter task title"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Task details and requirements"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white min-h-[100px] focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm(p => ({ ...p, priority: e.target.value as any }))}
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={taskForm.deadline}
                    onChange={(e) => setTaskForm(p => ({ ...p, deadline: e.target.value }))}
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1 rounded-2xl">
                  Assign Task
                </Button>
                <Button type="button" variant="outline" className="flex-1 rounded-2xl border-white/10" onClick={() => setShowTaskModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-lighter border border-white/10 rounded-3xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-black text-white mb-6">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Full Name *</label>
                <input
                  value={userForm.name}
                  onChange={(e) => setUserForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="user@example.com"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm(p => ({ ...p, role: e.target.value as any }))}
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="client">Client</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Status</label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm(p => ({ ...p, status: e.target.value as any }))}
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1 rounded-2xl">
                  Add User
                </Button>
                <Button type="button" variant="outline" className="flex-1 rounded-2xl border-white/10" onClick={() => setShowUserModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-4 py-2 bg-dark-lighter border border-white/10 rounded-xl text-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="In Progress">In Progress</option>
              <option value="Planning">Planning</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {adminProjects.map((project) => (
              <div
                key={project.id}
                className="bg-dark-lighter border border-white/5 rounded-[2rem] p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-white truncate">{project.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      project.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : project.status === 'In Progress'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">Client: {project.client}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-white font-semibold">{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-dark overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Deadline: {project.deadline}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      {activeSection === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Quick Blog Publisher</h3>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <input
                value={blogForm.title}
                onChange={(e) => setBlogForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Blog title"
                className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <input
                value={blogForm.category}
                onChange={(e) => setBlogForm((p) => ({ ...p, category: e.target.value }))}
                placeholder="Category"
                className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <select
                value={blogForm.status}
                onChange={(e) => setBlogForm((p) => ({ ...p, status: e.target.value as any }))}
                className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Scheduled">Scheduled</option>
              </select>
              <Button type="submit" variant="primary" className="w-full rounded-2xl">
                Add Blog Entry
              </Button>
            </form>
            <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex justify-between items-center bg-dark rounded-xl px-4 py-3 border border-white/5"
                >
                  <div>
                    <p className="text-sm font-semibold text-white truncate">{blog.title}</p>
                    <p className="text-xs text-gray-500">{blog.category} · {blog.date}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold ${
                      blog.status === 'Published' ? 'text-emerald-400' : blog.status === 'Scheduled' ? 'text-amber-400' : 'text-gray-500'
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Portfolio Projects</h3>
            <form onSubmit={handleAddPortfolio} className="space-y-4">
              <input
                value={portfolioForm.name}
                onChange={(e) => setPortfolioForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Project name"
                className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <input
                value={portfolioForm.client}
                onChange={(e) => setPortfolioForm((p) => ({ ...p, client: e.target.value }))}
                placeholder="Client / Brand"
                className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <input
                value={portfolioForm.type}
                onChange={(e) => setPortfolioForm((p) => ({ ...p, type: e.target.value }))}
                placeholder="Type"
                className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
              />
              <Button type="submit" variant="outline" className="w-full rounded-2xl border-white/10">
                Add Portfolio Item
              </Button>
            </form>
            <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-dark rounded-xl px-4 py-3 border border-white/5"
                >
                  <div>
                    <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.client} · {item.type}</p>
                  </div>
                  <span className="text-[10px] font-bold text-primary">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Media Section */}
      {activeSection === 'media' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black text-white">Media Library</h2>
              <p className="text-sm text-gray-500 mt-1">Manage all your digital assets in one place</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-xl border-white/10">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <label htmlFor="media-upload" className="cursor-pointer">
                <input id="media-upload" type="file" onChange={handleMediaUpload} className="hidden" accept="image/*,video/*" />
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Asset
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaLibrary.map((media) => (
              <div
                key={media.id}
                className="group bg-dark-lighter rounded-2xl border border-white/5 hover:border-primary/30 transition-all overflow-hidden"
              >
                <div className="aspect-video bg-dark flex items-center justify-center relative overflow-hidden">
                  <Image className="w-12 h-12 text-gray-600" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-dark/80 rounded-lg hover:bg-primary transition-colors">
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-dark/80 rounded-lg hover:bg-red-500 transition-colors">
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-white truncate mb-1">{media.label}</p>
                  <p className="text-xs text-gray-500 mb-3">{media.usage}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Active</span>
                    <button className="text-xs text-gray-500 hover:text-white transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {activeSection === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6">Revenue Overview</h3>
              <div className="h-72 flex items-end gap-1">
                {revenueData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/60 rounded-t hover:bg-primary transition-all"
                      style={{
                        height: `${(d.revenue / Math.max(...revenueData.map((x) => x.revenue))) * 100}%`,
                        minHeight: '24px',
                      }}
                      title={`${d.month}: $${d.revenue.toLocaleString()}`}
                    />
                    <span className="text-[10px] text-gray-500 mt-2">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6">User Growth</h3>
              <div className="h-72 flex items-end gap-2">
                {userGrowthData.map((d) => (
                  <div key={d.month} className="flex-1 flex gap-1 items-end">
                    <div
                      className="flex-1 bg-primary/60 rounded-t"
                      style={{
                        height: `${(d.users / 120) * 100}%`,
                        minHeight: '20px',
                      }}
                      title={`Users: ${d.users}`}
                    />
                    <div
                      className="flex-1 bg-emerald-500/60 rounded-t"
                      style={{
                        height: `${(d.newClients / 15) * 100}%`,
                        minHeight: '12px',
                      }}
                      title={`New: ${d.newClients}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-primary" /> Users</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> New</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === 'settings' && (
        <div className="space-y-8">
          {/* Website Hero */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Website Hero Copy</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Headline</label>
                <input
                  value={siteSettings.heroHeadline}
                  onChange={(e) => setSiteSettings((p) => ({ ...p, heroHeadline: e.target.value }))}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Subtext</label>
                <textarea
                  value={siteSettings.heroSubtext}
                  onChange={(e) => setSiteSettings((p) => ({ ...p, heroSubtext: e.target.value }))}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white min-h-[100px] focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="bg-dark rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Preview</p>
                <p className="text-lg font-bold text-white mb-1">{siteSettings.heroHeadline}</p>
                <p className="text-sm text-gray-400">{siteSettings.heroSubtext}</p>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              SEO Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Meta Title</label>
                <input
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSeoSettings((p) => ({ ...p, metaTitle: e.target.value }))}
                  placeholder="Page title (50-60 chars)"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Meta Description</label>
                <textarea
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSeoSettings((p) => ({ ...p, metaDescription: e.target.value }))}
                  placeholder="Description (150-160 chars)"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white min-h-[80px] focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Meta Keywords</label>
                <input
                  value={seoSettings.metaKeywords}
                  onChange={(e) => setSeoSettings((p) => ({ ...p, metaKeywords: e.target.value }))}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">OG Image URL</label>
                <input
                  value={seoSettings.ogImage}
                  onChange={(e) => setSeoSettings((p) => ({ ...p, ogImage: e.target.value }))}
                  placeholder="https://example.com/og-image.jpg"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Canonical URL</label>
                <input
                  value={seoSettings.canonicalUrl}
                  onChange={(e) => setSeoSettings((p) => ({ ...p, canonicalUrl: e.target.value }))}
                  placeholder="https://nexara.com"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={seoSettings.robotsIndex} onChange={(e) => setSeoSettings((p) => ({ ...p, robotsIndex: e.target.checked }))} className="rounded border-white/20 bg-dark text-primary" />
                  <span className="text-sm text-gray-300">Allow search engines to index</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={seoSettings.robotsFollow} onChange={(e) => setSeoSettings((p) => ({ ...p, robotsFollow: e.target.checked }))} className="rounded border-white/20 bg-dark text-primary" />
                  <span className="text-sm text-gray-300">Follow links</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tracking: GTM, Pixel, etc. */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Tracking & Analytics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Google Tag Manager ID</label>
                <input
                  value={trackingSettings.gtmId}
                  onChange={(e) => setTrackingSettings((p) => ({ ...p, gtmId: e.target.value }))}
                  placeholder="GTM-XXXXXXX"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Google Analytics 4 ID</label>
                <input
                  value={trackingSettings.ga4Id}
                  onChange={(e) => setTrackingSettings((p) => ({ ...p, ga4Id: e.target.value }))}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Facebook Pixel ID</label>
                <input
                  value={trackingSettings.facebookPixelId}
                  onChange={(e) => setTrackingSettings((p) => ({ ...p, facebookPixelId: e.target.value }))}
                  placeholder="1234567890123456"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">LinkedIn Insight Tag ID</label>
                <input
                  value={trackingSettings.linkedinId}
                  onChange={(e) => setTrackingSettings((p) => ({ ...p, linkedinId: e.target.value }))}
                  placeholder="1234567"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">TikTok Pixel ID</label>
                <input
                  value={trackingSettings.tiktokPixelId}
                  onChange={(e) => setTrackingSettings((p) => ({ ...p, tiktokPixelId: e.target.value }))}
                  placeholder="XXXXXXXXXX"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Twitter/X Pixel ID</label>
                <input
                  value={trackingSettings.twitterPixelId}
                  onChange={(e) => setTrackingSettings((p) => ({ ...p, twitterPixelId: e.target.value }))}
                  placeholder="oXXXX"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Hotjar Site ID</label>
                <input
                  value={trackingSettings.hotjarId}
                  onChange={(e) => setTrackingSettings((p) => ({ ...p, hotjarId: e.target.value }))}
                  placeholder="1234567"
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button variant="primary" className="rounded-2xl px-8">
                Save Tracking Settings
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4">These tracking codes will be injected into your site. Leave blank to disable.</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
