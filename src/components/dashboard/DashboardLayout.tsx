import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Folder,
  FileText,
  Settings,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Image,
  CreditCard,
  MessageSquare,
  CheckSquare,
  Upload,
  Calendar,
  Bell,
  Shield,
  Mail,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export type DashboardSection =
  | 'overview'
  | 'users'
  | 'projects'
  | 'content'
  | 'media'
  | 'analytics'
  | 'settings'
  | 'invoices'
  | 'tasks'
  | 'submissions'
  | 'schedule'
  | 'messages'
  | 'support'
  | 'profile';

interface NavItem {
  id: DashboardSection;
  label: string;
  icon: LucideIcon;
}

const adminNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'content', label: 'Content (Blogs & Portfolio)', icon: FileText },
  { id: 'invoices', label: 'Invoices', icon: CreditCard },
  { id: 'media', label: 'Media Library', icon: Image },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const clientNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'My Projects', icon: Folder },
  { id: 'invoices', label: 'Invoices', icon: CreditCard },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'support', label: 'Support', icon: Shield },
  { id: 'profile', label: 'Profile & Settings', icon: Users },
];

const employeeNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'submissions', label: 'Submissions', icon: Upload },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'messages', label: 'Announcements', icon: MessageSquare },
  { id: 'profile', label: 'Profile & Settings', icon: Users },
];

interface DashboardLayoutProps {
  role: 'admin' | 'client' | 'employee';
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  activeSection?: DashboardSection;
  onSectionChange?: (section: DashboardSection) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  role,
  title,
  subtitle,
  children,
  actions,
  activeSection = 'overview',
  onSectionChange,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems =
    role === 'admin' ? adminNavItems : role === 'client' ? clientNavItems : employeeNavItems;

  const handleLogout = () => {
    logout();
    navigate(role === 'employee' ? '/employee-login' : '/login');
  };

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'invoices' && role === 'client') {
      navigate('/client/invoices');
      return;
    }
    if (item.id === 'invoices' && role === 'admin') {
      navigate('/admin/invoices');
      return;
    }
    onSectionChange?.(item.id);
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarCollapsed ? 80 : 280 }}
          className="bg-dark-lighter border-r border-white/5 flex-shrink-0 overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div>
                  <h2 className="text-lg font-black text-white uppercase tracking-tight">
                    {role === 'admin' ? 'Admin' : role === 'client' ? 'Client' : 'Talent'} Portal
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 truncate">{user?.email}</p>
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 mt-auto flex-shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-500 mt-2 text-sm sm:text-base">{subtitle}</p>
                )}
              </div>
              {actions && (
                <div className="flex items-center gap-3 flex-wrap">{actions}</div>
              )}
            </div>

            {children}
          </div>
        </main>
      </div>
    </Layout>
  );
};
