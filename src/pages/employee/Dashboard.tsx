import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout, type DashboardSection } from '../../components/dashboard/DashboardLayout';
import { StatCard } from '../../components/dashboard/StatCard';
import { Button } from '../../components/ui/Button';
import { dashboardApi } from '../../store/dashboardData';
import type { TaskStatus, Priority } from '../../store/dashboardData';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Upload,
  Image,
  Clock,
  Calendar,
  FileText,
  ArrowRight,
  Filter,
  ChevronDown,
  Shield,
  Bell,
  Search,
  X,
  MessageCircle,
  User,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  MoreHorizontal,
  Camera,
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user, isLoading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');

  const [taskFilter, setTaskFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [submissionForm, setSubmissionForm] = useState({
    project: '',
    blogTitle: '',
    blogDescription: '',
    authorName: '',
    reference: '',
    tags: '',
    fileName: '',
    featuredImage: '',
  });
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: '',
    position: '',
    bio: '',
  });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'employee')) {
      navigate('/employee-login');
    }
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        department: '',
        position: '',
        bio: '',
      });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'employee') return null;

  const stats = dashboardApi.getEmployeeStats();
  const tasks = dashboardApi.getEmployeeTasks(
    taskFilter === 'all' ? undefined : taskFilter,
    priorityFilter === 'all' ? undefined : priorityFilter
  );
  const submissions = dashboardApi.getEmployeeSubmissions();
  const schedule = dashboardApi.getSchedule();
  const announcements = dashboardApi.getAnnouncements();

  const updateTaskStatus = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const next: TaskStatus =
      task.status === 'New'
        ? 'In Progress'
        : task.status === 'In Progress'
        ? 'Completed'
        : task.status === 'Completed'
        ? 'Review'
        : task.status;
    dashboardApi.updateTaskStatus(taskId, next);
    setRefreshKey((k) => k + 1);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        updateProfile({ profileImage: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ 
      name: profileForm.name,
      email: profileForm.email 
    });
    alert('Profile updated successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSubmissionForm((prev) => ({ ...prev, fileName: file ? file.name : '' }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSubmissionForm((prev) => ({ ...prev, featuredImage: file ? file.name : '' }));
  };

  const openTaskModal = (task: any) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = taskFilter === 'all' || task.status === taskFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesFilter && matchesPriority;
  });

  const getTaskProgress = (status: TaskStatus) => {
    switch (status) {
      case 'New': return 0;
      case 'In Progress': return 50;
      case 'Completed': return 75;
      case 'Review': return 90;
      default: return 0;
    }
  };

  const getTaskTimeSpent = (task: any) => {
    // Simulate time tracking - in real app this would come from backend
    const hours = Math.floor(Math.random() * 20) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionForm.project || !submissionForm.fileName) return;
    dashboardApi.addEmployeeSubmission({
      project: submissionForm.project,
      fileName: submissionForm.fileName,
      note: `${submissionForm.blogTitle}\n${submissionForm.blogDescription}\nAuthor: ${submissionForm.authorName}\nReference: ${submissionForm.reference}\nTags: ${submissionForm.tags}`,
      status: 'Pending Review',
    });
    setSubmissionForm({ 
      project: '', 
      blogTitle: '', 
      blogDescription: '', 
      authorName: '', 
      reference: '', 
      tags: '', 
      fileName: '', 
      featuredImage: '' 
    });
    setRefreshKey((k) => k + 1);
  };

  const getTaskStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
      case 'Review':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
      case 'In Progress':
        return 'bg-primary/10 text-primary border-primary/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-400';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  const getScheduleTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-primary/10 text-primary';
      case 'deadline':
        return 'bg-red-500/10 text-red-400';
      case 'review':
        return 'bg-amber-500/10 text-amber-400';
      default:
        return 'bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <DashboardLayout
      role="employee"
      title="Talent Dashboard"
      subtitle={`NEXARA internal network session for ${user.name}`}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      actions={
        <>
          <div className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            Profile ID: <span className="text-primary">#{user.id.slice(0, 6).toUpperCase()}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-white/5"
          >
            View Guidelines
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-white/5"
            onClick={() => setActiveSection('settings')}
          >
            Settings
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="rounded-xl"
            onClick={() => setActiveSection('submissions')}
          >
            Submit Work
          </Button>
        </>
      }
    >
      {/* Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <StatCard
              label="Assigned Tasks"
              value={stats.assignedTasks}
              icon={CheckSquare}
              color="text-primary"
              delay={0}
            />
            <StatCard
              label="Submissions"
              value={stats.submissions}
              icon={Upload}
              color="text-emerald-400"
              delay={0.05}
            />
            <StatCard
              label="Portfolio Assets"
              value={stats.portfolioAssets}
              icon={Image}
              color="text-indigo-400"
              delay={0.1}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Active Tasks
              </h3>
              <div className="space-y-4">
                {tasks.slice(0, 4).map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex justify-between items-center p-6 bg-dark rounded-2xl border border-white/5 hover:bg-white/5 transition-all"
                  >
                    <div>
                      <p className="font-bold text-white mb-1">{task.title}</p>
                      <p className="text-xs text-gray-500">Client: {task.client}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due {task.due}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => updateTaskStatus(task.id)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold border cursor-pointer transition-all ${getTaskStatusColor(task.status)}`}
                    >
                      {task.status}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today&apos;s Schedule
                </h3>
                <div className="space-y-3">
                  {schedule.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-3 px-4 rounded-xl bg-dark border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <span className={`text-[10px] font-bold uppercase ${getScheduleTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Quick Resources
                </h3>
                <div className="space-y-2">
                  {['Brand Identity Guidelines', 'Submission Quality Checklist', 'Performance Policy'].map(
                    (label) => (
                      <button
                        key={label}
                        className="w-full text-left px-4 py-3 rounded-xl bg-dark hover:bg-white/5 border border-white/5 hover:border-primary/40 transition-all flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-300">{label}</span>
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Section */}
      {activeSection === 'tasks' && (
        <div className="space-y-6">
          {/* Enhanced Filters and Search */}
          <div className="bg-dark-lighter border border-white/5 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Bar */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks by title, description, or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-dark border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Status</label>
                <select
                  value={taskFilter}
                  onChange={(e) => setTaskFilter(e.target.value as any)}
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Review">Review</option>
                </select>
              </div>
              
              {/* Priority Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as any)}
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="all">All Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Task Stats */}
              <div className="text-center">
                <div className="text-2xl font-black text-primary">{filteredTasks.length}</div>
                <div className="text-xs text-gray-500">Active Tasks</div>
              </div>
            </div>
          </div>

          {/* Task Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-dark-lighter border border-white/5 rounded-2xl hover:border-primary/20 transition-all cursor-pointer group"
                onClick={() => openTaskModal(task)}
              >
                {/* Task Header */}
                <div className="p-6 border-b border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-primary transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  {/* Task Meta */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">Client: {task.client}</span>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due {task.due}
                    </span>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-500">PROGRESS</span>
                      <span className="text-xs font-bold text-primary">{getTaskProgress(task.status)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${getTaskProgress(task.status)}%` }}
                      />
                    </div>
                  </div>

                  {/* Time Tracking */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Time Spent: {getTaskTimeSpent(task)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Assigned to: You</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Start/Pause timer functionality
                      }}
                      className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      Start Timer
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateTaskStatus(task.id);
                      }}
                      className={`flex-1 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${getTaskStatusColor(task.status)}`}
                    >
                      {task.status === 'New' ? 'Start Task' : 
                       task.status === 'In Progress' ? 'Mark Complete' : 
                       task.status === 'Completed' ? 'Submit for Review' : 'View Details'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Task Analytics */}
          <div className="bg-dark-lighter border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Task Analytics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Completed This Week', 
                  value: tasks.filter(t => t.status === 'Completed').length, 
                  color: 'text-emerald-400',
                  icon: CheckCircle 
                },
                { 
                  label: 'In Progress', 
                  value: tasks.filter(t => t.status === 'In Progress').length, 
                  color: 'text-primary',
                  icon: Play 
                },
                { 
                  label: 'Overdue', 
                  value: tasks.filter(t => {
                    const dueDate = new Date(t.due);
                    return dueDate < new Date() && t.status !== 'Completed';
                  }).length, 
                  color: 'text-red-400',
                  icon: AlertCircle 
                },
                { 
                  label: 'Avg. Completion Time', 
                  value: '2.5 days', 
                  color: 'text-purple-400',
                  icon: Clock 
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-dark rounded-xl border border-white/5"
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-dark-lighter border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
              <button
                onClick={closeTaskModal}
                className="p-2 hover:bg-white/5 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Task Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-primary mb-3">Task Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Client</label>
                      <p className="text-white font-medium">{selectedTask.client}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Priority</label>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Status</label>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getTaskStatusColor(selectedTask.status)}`}>
                        {selectedTask.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Due Date</label>
                      <p className="text-white font-medium">{selectedTask.due}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary mb-3">Description</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedTask.description}</p>
                </div>
              </div>

              {/* Progress & Time */}
              <div className="bg-dark p-4 rounded-xl">
                <h4 className="text-sm font-bold text-primary mb-3">Progress & Time Tracking</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Progress</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                          style={{ width: `${getTaskProgress(selectedTask.status)}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-primary">{getTaskProgress(selectedTask.status)}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Time Spent</label>
                    <p className="text-white font-medium">{getTaskTimeSpent(selectedTask)}</p>
                  </div>
                </div>
              </div>

              {/* Collaboration */}
              <div>
                <h4 className="text-sm font-bold text-primary mb-3">Team Collaboration</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-dark rounded-xl">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Comments</p>
                      <p className="text-sm text-white font-medium">3 new messages</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-dark rounded-xl">
                    <User className="w-4 h-4 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Team Members</p>
                      <p className="text-sm text-white font-medium">You + 2 others</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
                  Start Timer
                </button>
                <button className="px-6 py-3 bg-dark border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 transition-colors">
                  View Files
                </button>
                <button 
                  onClick={() => {
                    updateTaskStatus(selectedTask.id);
                    closeTaskModal();
                  }}
                  className="px-6 py-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-medium hover:bg-emerald-500/30 transition-colors"
                >
                  Update Status
                </button>
                <button className="px-6 py-3 bg-dark border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 transition-colors">
                  Add Comment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Submissions Section */}
      {activeSection === 'submissions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Submit Blog/Content For Review
            </h3>
            <form onSubmit={handleSubmitWork} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Basic Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Project *</label>
                    <select
                      value={submissionForm.project}
                      onChange={(e) =>
                        setSubmissionForm((p) => ({ ...p, project: e.target.value }))
                      }
                      className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                      required
                    >
                      <option value="">Select project</option>
                      <option value="NEXARA V2 Website">NEXARA V2 Website</option>
                      <option value="SEO Content Engine">SEO Content Engine</option>
                      <option value="Social Media Campaign">Social Media Campaign</option>
                      <option value="Blog Content">Blog Content</option>
                      <option value="Client Project">Client Project</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Author Name *</label>
                    <input
                      type="text"
                      value={submissionForm.authorName}
                      onChange={(e) =>
                        setSubmissionForm((p) => ({ ...p, authorName: e.target.value }))
                      }
                      className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Blog Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Blog Details</h4>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Blog Title *</label>
                  <input
                    type="text"
                    value={submissionForm.blogTitle}
                    onChange={(e) =>
                      setSubmissionForm((p) => ({ ...p, blogTitle: e.target.value }))
                    }
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Enter engaging blog title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Blog Description *</label>
                  <textarea
                    value={submissionForm.blogDescription}
                    onChange={(e) =>
                      setSubmissionForm((p) => ({ ...p, blogDescription: e.target.value }))
                    }
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-sm text-white min-h-[150px] focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Write comprehensive blog content..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Tags</label>
                  <input
                    type="text"
                    value={submissionForm.tags}
                    onChange={(e) =>
                      setSubmissionForm((p) => ({ ...p, tags: e.target.value }))
                    }
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="digital marketing, seo, social media (comma separated)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Reference/Source</label>
                  <input
                    type="text"
                    value={submissionForm.reference}
                    onChange={(e) =>
                      setSubmissionForm((p) => ({ ...p, reference: e.target.value }))
                    }
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Reference links, sources, or inspiration"
                  />
                </div>
              </div>

              {/* Media Upload */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Media Files</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Featured Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                    {submissionForm.featuredImage && (
                      <p className="text-xs text-gray-500 mt-1">Selected: {submissionForm.featuredImage}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Document File *</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                      required
                    />
                    {submissionForm.fileName && (
                      <p className="text-xs text-gray-500 mt-1">Selected: {submissionForm.fileName}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" variant="primary" className="rounded-2xl px-8 flex items-center gap-2">
                Submit For Review
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Submission History</h3>
            <div className="space-y-3">
              {submissions.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-dark border border-white/5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white text-sm">{item.project}</span>
                    <span
                      className={`text-[10px] font-bold ${
                        item.status === 'Approved'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">File: {item.fileName}</p>
                  {item.note && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.note}</p>
                  )}
                  <p className="text-[11px] text-gray-600 mt-2">{item.submittedAt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Announcements Section */}
      {activeSection === 'messages' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Announcements</h2>
          <div className="space-y-4">
            {announcements.map((a) => (
              <div
                key={a.id}
                className={`p-6 rounded-2xl border ${
                  a.type === 'urgent' ? 'bg-primary/5 border-primary/30' : 'bg-dark-lighter border-white/5'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white">{a.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    a.type === 'urgent' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-gray-400'
                  }`}>
                    {a.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{a.content}</p>
                <p className="text-xs text-gray-600">{a.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Section */}
      {activeSection === 'schedule' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">My Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-dark-lighter border border-white/5 rounded-2xl hover:border-primary/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold ${getScheduleTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === 'settings' && (
        <div className="max-w-4xl space-y-8">
          {/* Account Settings */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Account Settings
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter current password" 
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter new password" 
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm new password" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <Button variant="primary" className="rounded-2xl px-8">
                Update Password
              </Button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {[
                { 
                  label: 'Email Notifications', 
                  desc: 'Receive email updates about your tasks and submissions',
                  enabled: true 
                },
                { 
                  label: 'Desktop Notifications', 
                  desc: 'Get browser notifications for important updates',
                  enabled: false 
                },
                { 
                  label: 'SMS Alerts', 
                  desc: 'Receive text messages for urgent tasks',
                  enabled: false 
                },
                { 
                  label: 'Weekly Summary', 
                  desc: 'Get a weekly summary of your activities',
                  enabled: true 
                },
                { 
                  label: 'New Task Assignments', 
                  desc: 'Instant notification when new tasks are assigned',
                  enabled: true 
                },
                { 
                  label: 'Submission Feedback', 
                  desc: 'Notify when submissions are reviewed or approved',
                  enabled: true 
                },
                { 
                  label: 'Team Announcements', 
                  desc: 'Important updates from leadership and HR',
                  enabled: true 
                },
                { 
                  label: 'System Maintenance', 
                  desc: 'Alerts about scheduled system maintenance',
                  enabled: true 
                }
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-dark border border-white/5 cursor-pointer hover:border-white/10 transition-all">
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      defaultChecked={item.enabled} 
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-6 bg-gray-600 rounded-full peer-checked:bg-primary transition-colors cursor-pointer">
                      <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-6 translate-x-0.5"></div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              Privacy Settings
            </h3>
            <div className="space-y-4">
              {[
                { 
                  label: 'Profile Visibility', 
                  desc: 'Control who can see your profile information',
                  value: 'team_only',
                  options: [
                    { value: 'public', label: 'Public' },
                    { value: 'team_only', label: 'Team Only' },
                    { value: 'private', label: 'Private' }
                  ]
                },
                { 
                  label: 'Activity Status', 
                  desc: 'Show when you are active or online',
                  value: 'show',
                  options: [
                    { value: 'show', label: 'Show Status' },
                    { value: 'hide', label: 'Hide Status' }
                  ]
                },
                { 
                  label: 'Data Sharing', 
                  desc: 'Share your performance metrics with team',
                  value: 'limited',
                  options: [
                    { value: 'full', label: 'Full Sharing' },
                    { value: 'limited', label: 'Limited Sharing' },
                    { value: 'none', label: 'No Sharing' }
                  ]
                }
              ].map((setting) => (
                <div key={setting.label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">{setting.label}</p>
                      <p className="text-xs text-gray-500">{setting.desc}</p>
                    </div>
                  </div>
                  <select 
                    defaultValue={setting.value}
                    className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    {setting.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-pink-500"></div>
              Appearance Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Theme</label>
                <select className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option value="dark">Dark Mode (Default)</option>
                  <option value="light">Light Mode</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Language</label>
                <select className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option value="en">English</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Time Zone</label>
                <select className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary outline-none">
                  <option value="utc+6">UTC+6 (Bangladesh Standard Time)</option>
                  <option value="utc+0">UTC+0 (Greenwich Mean Time)</option>
                  <option value="utc-5">UTC-5 (Eastern Time)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="rounded-2xl px-8">
              Save All Settings
            </Button>
            <Button variant="outline" className="rounded-2xl px-8 border-white/10">
              Reset to Default
            </Button>
            <Button variant="outline" className="rounded-2xl px-8 border-red-500/30 text-red-400 hover:bg-red-500/10">
              Delete Account
            </Button>
          </div>
        </div>
      )}

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <div className="max-w-4xl space-y-8">
          {/* Personal Information */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Picture */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1">
                      <div className="w-full h-full rounded-full bg-dark-lighter flex items-center justify-center overflow-hidden">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl font-bold text-primary">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <label htmlFor="profile-upload" className="absolute bottom-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition-colors cursor-pointer">
                      <Camera className="w-4 h-4" />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Profile Photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-upload"
                    onChange={handleProfileImageChange}
                  />
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer text-xs text-primary hover:text-primary-dark transition-colors"
                  >
                    Change Photo
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Full Name *</label>
                    <input 
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Date of Birth</label>
                    <input 
                      type="date" 
                      className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Email / Employee ID *</label>
                    <input 
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+880 1XXX XXXXXX" 
                      className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Professional Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Department *</label>
                <select 
                  value={profileForm.department}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="">Select Department</option>
                  <option value="creative">Creative Design</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="development">Web Development</option>
                  <option value="content">Content Creation</option>
                  <option value="video">Video Production</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Role/Position *</label>
                <input 
                  value={profileForm.position}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, position: e.target.value }))}
                  placeholder="e.g. Senior Graphic Designer" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Employee ID</label>
                <input 
                  value={user.employeeId || `EMP-${user.id.slice(0, 6).toUpperCase()}`}
                  disabled 
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-4 py-3 text-gray-400 focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Join Date</label>
                <input 
                  defaultValue="2024-01-15"
                  disabled 
                  className="w-full bg-dark/50 border border-white/10 rounded-2xl px-4 py-3 text-gray-400 focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-bold text-gray-500 mb-2">Bio/Professional Summary</label>
              <textarea 
                value={profileForm.bio}
                onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white min-h-[100px] focus:ring-2 focus:ring-primary outline-none" 
                placeholder="Brief description of your professional background and expertise..."
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-2">Street Address</label>
                <input 
                  placeholder="123, Main Street, Apartment 4B" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">City</label>
                <input 
                  placeholder="Dhaka" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Postal Code</label>
                <input 
                  placeholder="1200" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Country</label>
                <select className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none">
                  <option value="bangladesh">Bangladesh</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Work Location</label>
                <select className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none">
                  <option value="office">Office - Dhaka</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-dark-lighter border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Skills & Expertise
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Primary Skills</label>
                <input 
                  placeholder="Graphic Design, Adobe Creative Suite, UI/UX" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Secondary Skills</label>
                <input 
                  placeholder="Video Editing, Motion Graphics, Brand Strategy" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">Languages</label>
                <input 
                  placeholder="Bengali (Native), English (Fluent)" 
                  className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="rounded-2xl px-8" onClick={handleProfileUpdate}>
              Save Profile Changes
            </Button>
            <Button variant="outline" className="rounded-2xl px-8 border-white/10">
              Download Resume
            </Button>
            <Button variant="outline" className="rounded-2xl px-8 border-white/10">
              Export Profile Data
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
