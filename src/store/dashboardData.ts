// Centralized dashboard data store - dynamic data for all dashboards
// Replace with real API calls when backend is ready

export type TaskStatus = 'New' | 'In Progress' | 'Completed' | 'Review';
export type ProjectStatus = 'Active' | 'In Progress' | 'Planning' | 'Completed' | 'On Hold';
export type Priority = 'High' | 'Medium' | 'Low';
export type ApprovalRisk = 'High' | 'Medium' | 'Low';

// Admin Data
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'employee';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  joinDate: string;
}

export interface AdminProject {
  id: number;
  name: string;
  client: string;
  type: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  deadline: string;
}

export interface AdminBlog {
  id: number;
  title: string;
  category: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  date: string;
  views?: number;
}

export interface AdminPortfolioItem {
  id: number;
  name: string;
  client: string;
  type: string;
  status: string;
}

export interface AdminActivity {
  id: string;
  time: string;
  title: string;
  actor: string;
  type: string;
  severity?: 'info' | 'warning' | 'success';
}

export interface PendingApproval {
  id: string;
  requester: string;
  item: string;
  created: string;
  risk: ApprovalRisk;
}

export interface SystemHealthItem {
  label: string;
  value: string;
  status: string;
  trend?: 'up' | 'down' | 'stable';
}

// Client Data
export interface ClientProject {
  id: number;
  name: string;
  status: ProjectStatus;
  progress: number;
  budgetUsed: number;
  roi: string;
  deadline: string;
  team: string;
  nextMilestone: string;
}

export interface ClientInvoice {
  id: string;
  number: string;
  amount: number;
  status: 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';
  dueDate: string;
  projectName: string;
}

export interface ClientMessage {
  id: string;
  subject: string;
  preview: string;
  from: string;
  date: string;
  read: boolean;
}

// Employee Data
export interface EmployeeTask {
  id: number;
  title: string;
  client: string;
  status: TaskStatus;
  due: string;
  priority: Priority;
  description: string;
  assignee?: string;
}

export interface EmployeeSubmission {
  id: number;
  project: string;
  fileName: string;
  note: string;
  status: string;
  submittedAt: string;
  reviewedBy?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'deadline' | 'review' | 'training';
  location?: string;
}

// Chart Data
export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target?: number;
}

export interface UserGrowthDataPoint {
  month: string;
  users: number;
  newClients: number;
}

// ============ MOCK DATA ============

let adminUsers: AdminUser[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastActive: '2 min ago', joinDate: 'Jan 2024' },
  { id: '2', name: 'Sarah Ahmed', email: 'sarah@nexara.com', role: 'employee', status: 'active', lastActive: '5 min ago', joinDate: 'Feb 2024' },
  { id: '3', name: 'Client User', email: 'client@example.com', role: 'client', status: 'active', lastActive: '1 hr ago', joinDate: 'Mar 2024' },
  { id: '4', name: 'John Doe', email: 'john@nexara.com', role: 'employee', status: 'active', lastActive: '30 min ago', joinDate: 'Apr 2024' },
  { id: '5', name: 'TechFlow Inc.', email: 'billing@techflow.com', role: 'client', status: 'pending', lastActive: '2 days ago', joinDate: 'May 2024' },
];

let adminProjects: AdminProject[] = [
  { id: 1, name: 'Lucia Belia Global Launch', client: 'Lucia Belia', type: 'Brand Campaign', status: 'In Progress', progress: 72, budget: 50000, deadline: 'Dec 20, 2025' },
  { id: 2, name: 'EcoCraft D2C Funnel', client: 'EcoCraft', type: 'E-commerce', status: 'Active', progress: 54, budget: 35000, deadline: 'Ongoing' },
  { id: 3, name: 'NEXARA V2 Web Platform', client: 'NEXARA', type: 'Web Development', status: 'In Progress', progress: 85, budget: 80000, deadline: 'Jan 15, 2026' },
  { id: 4, name: 'TechFlow SEO Overhaul', client: 'TechFlow', type: 'SEO', status: 'Planning', progress: 18, budget: 25000, deadline: 'Feb 28, 2026' },
];

let adminBlogs: AdminBlog[] = [
  { id: 1, title: 'How NEXARA Designs High-Impact Funnels', category: 'Strategy', status: 'Published', date: 'Feb 10, 2026', views: 1240 },
  { id: 2, title: 'Creative Ops Playbook 2026', category: 'Operations', status: 'Draft', date: 'Feb 05, 2026' },
  { id: 3, title: 'Digital Marketing Trends', category: 'Marketing', status: 'Scheduled', date: 'Feb 15, 2026' },
];

let adminPortfolio: AdminPortfolioItem[] = [
  { id: 1, name: 'Lucia Belia Global Launch', client: 'Lucia Belia', type: 'Brand Campaign', status: 'Live' },
  { id: 2, name: 'EcoCraft D2C Funnel', client: 'EcoCraft', type: 'E-commerce', status: 'Archived' },
  { id: 3, name: 'TechFlow Website Redesign', client: 'TechFlow', type: 'Web', status: 'Live' },
];

const adminActivities: AdminActivity[] = [
  { id: '1', time: '2 min ago', title: 'New client workspace provisioned', actor: 'Automation Bot', type: 'Provisioning', severity: 'success' },
  { id: '2', time: '24 min ago', title: 'Employee access level updated', actor: 'HR Ops', type: 'Access Control', severity: 'info' },
  { id: '3', time: '1 hr ago', title: 'Monthly billing report generated', actor: 'Finance Engine', type: 'Billing', severity: 'info' },
  { id: '4', time: '3 hr ago', title: 'Security patch deployed to production', actor: 'DevOps', type: 'Security', severity: 'warning' },
];

let pendingApprovalsList: PendingApproval[] = [
  { id: '1', requester: 'Sarah Ahmed', item: 'Client portal role elevation', created: 'Today, 10:21 AM', risk: 'Medium' },
  { id: '2', requester: 'TechFlow Inc.', item: 'New workspace + 12 seats', created: 'Yesterday, 4:36 PM', risk: 'Low' },
  { id: '3', requester: 'Internal Script', item: 'API rate limit extension', created: 'Yesterday, 9:11 AM', risk: 'High' },
];

const revenueChartData: RevenueDataPoint[] = [
  { month: 'Aug', revenue: 32000, target: 35000 },
  { month: 'Sep', revenue: 38000, target: 38000 },
  { month: 'Oct', revenue: 42000, target: 40000 },
  { month: 'Nov', revenue: 39500, target: 42000 },
  { month: 'Dec', revenue: 45000, target: 45000 },
  { month: 'Jan', revenue: 45200, target: 46000 },
];

const userGrowthData: UserGrowthDataPoint[] = [
  { month: 'Aug', users: 85, newClients: 12 },
  { month: 'Sep', users: 92, newClients: 8 },
  { month: 'Oct', users: 98, newClients: 15 },
  { month: 'Nov', users: 105, newClients: 10 },
  { month: 'Dec', users: 115, newClients: 14 },
  { month: 'Jan', users: 120, newClients: 11 },
];

let clientProjects: ClientProject[] = [
  { id: 1, name: 'NEXARA V2 Web Platform', status: 'In Progress', progress: 72, budgetUsed: 58, roi: '+143%', deadline: 'Dec 20, 2025', team: 'Digital Strategy Team', nextMilestone: 'Homepage Design Review' },
  { id: 2, name: 'Q4 SEO & Content Engine', status: 'Active', progress: 54, budgetUsed: 41, roi: '+96%', deadline: 'Ongoing', team: 'Performance Marketing', nextMilestone: 'Keyword Strategy Update' },
  { id: 3, name: 'Paid Media Acceleration', status: 'Planning', progress: 18, budgetUsed: 10, roi: '+32%', deadline: 'Jan 15, 2026', team: 'Media Buying', nextMilestone: 'Campaign Launch' },
];

const clientInvoices: ClientInvoice[] = [
  { id: '1', number: 'INV-2025-012', amount: 45000, status: 'paid', dueDate: '2025-01-15', projectName: 'NEXARA V2 Phase 1' },
  { id: '2', number: 'INV-2025-018', amount: 28500, status: 'sent', dueDate: '2025-02-28', projectName: 'Q4 SEO Campaign' },
];

const clientMessages: ClientMessage[] = [
  { id: '1', subject: 'Homepage Design Review Scheduled', preview: 'Your design review meeting has been scheduled for...', from: 'NEXARA Success Team', date: 'Today, 9:00 AM', read: false },
  { id: '2', subject: 'Q4 Performance Report Ready', preview: 'The quarterly performance report is now available...', from: 'Performance Marketing', date: 'Yesterday', read: true },
];

let employeeTasks: EmployeeTask[] = [
  { id: 1, title: 'Homepage hero exploration', client: 'NEXARA V2', status: 'New', due: 'Today', priority: 'High', description: 'Create hero section concepts for new website design' },
  { id: 2, title: 'SEO landing visuals', client: 'TechFlow', status: 'In Progress', due: 'Tomorrow', priority: 'Medium', description: 'Design visual assets for SEO landing pages' },
  { id: 3, title: 'Social media templates', client: 'EcoCraft', status: 'Review', due: 'This Week', priority: 'Low', description: 'Create social media template designs' },
  { id: 4, title: 'Brand guidelines update', client: 'NEXARA V2', status: 'New', due: 'Next Week', priority: 'Medium', description: 'Update brand guidelines documentation' },
  { id: 5, title: 'Case study visuals', client: 'Lucia Belia', status: 'In Progress', due: 'Tomorrow', priority: 'High', description: 'Create visuals for case study presentation' },
];

let employeeSubmissions: EmployeeSubmission[] = [
  { id: 1, project: 'NEXARA V2 Website', fileName: 'homepage-concepts.fig', note: 'Initial homepage design concepts for review', status: 'Approved', submittedAt: '2025-12-10', reviewedBy: 'Design Lead' },
  { id: 2, project: 'SEO Content Engine', fileName: 'keyword-research.xlsx', note: 'Comprehensive keyword analysis for Q4', status: 'Pending Review', submittedAt: '2025-12-12' },
];

const announcements: { id: string; title: string; content: string; date: string; type: 'info' | 'urgent' }[] = [
  { id: '1', title: 'Holiday Schedule Update', content: 'Office closed Dec 25-26. Plan your submissions accordingly.', date: '2025-12-20', type: 'info' },
  { id: '2', title: 'New Design System Launch', content: 'Updated brand guidelines are now available. Review before next submission.', date: '2025-12-18', type: 'urgent' },
  { id: '3', title: 'Q1 Performance Review', content: 'Schedule your 1:1 by Jan 15. Great work this quarter!', date: '2025-12-15', type: 'info' },
];

const scheduleItems: ScheduleItem[] = [
  { id: '1', title: 'Daily standup with Creative Squad', time: '10:00 AM', type: 'meeting' },
  { id: '2', title: 'Client review: Homepage layout', time: '2:30 PM', type: 'review' },
  { id: '3', title: 'Internal training: Design systems', time: '4:00 PM', type: 'training' },
  { id: '4', title: 'Homepage hero deadline', time: '6:00 PM', type: 'deadline' },
];

// ============ API / STORE FUNCTIONS ============

export const dashboardApi = {
  // Admin
  getAdminStats: () => ({
    totalUsers: adminUsers.length,
    activeProjects: adminProjects.filter(p => p.status !== 'Completed').length,
    services: 8,
    monthlyRevenue: 45200,
    revenueGrowth: 12.5,
    userGrowth: 4.3,
  }),

  getAdminUsers: (search?: string) => {
    let users = [...adminUsers];
    if (search) {
      const q = search.toLowerCase();
      users = users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return users;
  },

  getAdminProjects: (status?: ProjectStatus) => {
    let projects = [...adminProjects];
    if (status) projects = projects.filter(p => p.status === status);
    return projects;
  },

  getAdminBlogs: () => [...adminBlogs],

  addAdminBlog: (blog: Omit<AdminBlog, 'id' | 'date'>) => {
    const newBlog: AdminBlog = {
      ...blog,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };
    adminBlogs = [newBlog, ...adminBlogs];
    return newBlog;
  },

  getAdminPortfolio: () => [...adminPortfolio],

  addAdminPortfolio: (item: Omit<AdminPortfolioItem, 'id'>) => {
    const newItem = { ...item, id: Date.now() };
    adminPortfolio = [newItem, ...adminPortfolio];
    return newItem;
  },

  getAdminActivities: () => [...adminActivities],

  getPendingApprovals: () => [...pendingApprovalsList],

  approveRequest: (id: string) => {
    pendingApprovalsList = pendingApprovalsList.filter(a => a.id !== id);
    return { success: true };
  },

  rejectApproval: (id: string) => {
    pendingApprovalsList = pendingApprovalsList.filter(a => a.id !== id);
    return { success: true };
  },

  getRevenueChartData: () => [...revenueChartData],

  getUserGrowthData: () => [...userGrowthData],

  getSystemHealth: (): SystemHealthItem[] => [
    { label: 'API Latency', value: '184 ms', status: 'Optimal', trend: 'down' },
    { label: 'Uptime (30d)', value: '99.98%', status: 'Healthy', trend: 'stable' },
    { label: 'Security Events', value: '3', status: 'Reviewing', trend: 'up' },
  ],

  // Client
  getClientStats: (clientId?: string) => ({
    activeProjects: clientProjects.length,
    pendingInvoices: clientInvoices.filter(i => i.status === 'sent' || i.status === 'viewed').length,
    totalMessages: clientMessages.length,
    filesShared: 45,
  }),

  getClientProjects: () => [...clientProjects],

  getClientInvoices: () => [...clientInvoices],

  getClientMessages: () => [...clientMessages],

  // Employee
  getEmployeeStats: () => ({
    assignedTasks: employeeTasks.length,
    submissions: employeeSubmissions.length,
    completedThisWeek: employeeTasks.filter(t => t.status === 'Completed').length,
    portfolioAssets: 8,
  }),

  getEmployeeTasks: (status?: TaskStatus, priority?: Priority) => {
    let tasks = [...employeeTasks];
    if (status) tasks = tasks.filter(t => t.status === status);
    if (priority) tasks = tasks.filter(t => t.priority === priority);
    return tasks;
  },

  updateTaskStatus: (taskId: number, status: TaskStatus) => {
    const task = employeeTasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      return task;
    }
    return null;
  },

  getEmployeeSubmissions: () => [...employeeSubmissions],

  addEmployeeSubmission: (sub: Omit<EmployeeSubmission, 'id' | 'submittedAt'>) => {
    const newSub: EmployeeSubmission = {
      ...sub,
      id: Date.now(),
      submittedAt: new Date().toISOString().split('T')[0],
    };
    employeeSubmissions = [newSub, ...employeeSubmissions];
    return newSub;
  },

  getSchedule: () => [...scheduleItems],

  getAnnouncements: () => [...announcements],
};
