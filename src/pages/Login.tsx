import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, ShieldCheck, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'client' | 'employee' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        if (activeTab === 'admin') {
            if (email === 'admin@example.com' && password === 'password') {
                login(email, 'admin');
                navigate('/admin/dashboard');
            } else {
                setError('Authentication failed. Check admin credentials.');
            }
        } else if (activeTab === 'client') {
            if (email === 'client@example.com' && password === 'password') {
                login(email, 'client');
                navigate('/client/dashboard');
            } else {
                setError('Invalid client credentials. Please try again.');
            }
        } else if (activeTab === 'employee') {
            if ((email === 'EMP001' || email === 'employee@example.com') && (password === 'password123' || password === 'password')) {
                login(email, 'employee');
                navigate('/employee/dashboard');
            } else {
                setError('Employee access denied. Verify ID and password.');
            }
        }
    } finally {
        setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'client', label: 'Client', icon: User, desc: 'Project collaboration & invoices' },
    { id: 'employee', label: 'Employee', icon: Briefcase, desc: 'Task management & tracking' },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, desc: 'System control & analytics' },
  ];

  return (
    <AuthLayout 
        title="Secure Portal Access" 
        subtitle="Access your NEXARA workspace and manage your digital transformation journey."
    >
      <div className="space-y-10">
        {/* Role Selection Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-dark p-1.5 rounded-2xl border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                    setActiveTab(tab.id as any);
                    setError('');
                    setEmail('');
                    setPassword('');
                }}
                className={`relative py-3 rounded-xl text-sm font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1.5 ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-400'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-inner"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`h-4 w-4 relative z-10 ${activeTab === tab.id ? 'text-primary' : 'opacity-50'}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
        </div>

        {/* Demo credentials helper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-gray-400 bg-dark-lighter border border-white/5 rounded-2xl p-4">
          <div>
            <p className="font-black uppercase tracking-widest text-gray-500 mb-1">Client</p>
            <p>Email: <span className="text-white">client@example.com</span></p>
            <p>Password: <span className="text-white">password</span></p>
          </div>
          <div>
            <p className="font-black uppercase tracking-widest text-gray-500 mb-1">Employee</p>
            <p>ID: <span className="text-white">EMP001</span> or <span className="text-white">employee@example.com</span></p>
            <p>Password: <span className="text-white">password123</span> or <span className="text-white">password</span></p>
          </div>
          <div>
            <p className="font-black uppercase tracking-widest text-gray-500 mb-1">Admin</p>
            <p>Email: <span className="text-white">admin@example.com</span></p>
            <p>Password: <span className="text-white">password</span></p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="space-y-5">
                        <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                                {activeTab === 'employee' ? "Identity / ID" : "Corporate Email"}
                             </label>
                             <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type={activeTab === 'employee' ? "text" : "email"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-700"
                                    placeholder={activeTab === 'employee' ? "EMP001" : activeTab === 'admin' ? "admin@example.com" : "client@example.com"}
                                    required
                                />
                             </div>
                        </div>

                        <div className="space-y-2">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-500">Password</label>
                                <Link to="#" className="text-xs font-bold text-gray-600 hover:text-primary transition-colors">Forgot?</Link>
                             </div>
                             <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-700"
                                    placeholder="••••••••"
                                    required
                                />
                             </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-primary text-xs font-bold bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                {error}
              </motion.div>
            )}

            <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl bg-primary hover:bg-primary-dark border-none font-black text-lg group shadow-xl shadow-primary/20"
                isLoading={isLoading}
            >
              Authorize {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Access
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
        </form>

        <div className="space-y-8">
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-gray-600">
                    <span className="bg-dark-lighter px-4">Cloud Integrations</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="h-14 rounded-2xl border border-white/5 bg-dark hover:bg-white/5 flex items-center justify-center gap-3 transition-all text-sm font-bold text-gray-400 hover:text-white">
                    <Github size={20} /> GitHub
                </button>
                <button className="h-14 rounded-2xl border border-white/5 bg-dark hover:bg-white/5 flex items-center justify-center gap-3 transition-all text-sm font-bold text-gray-400 hover:text-white">
                    <Chrome size={20} /> Google
                </button>
            </div>

            <div className="text-center">
                <p className="text-gray-500 text-sm">
                    {activeTab === 'client' ? (
                        <>New to NEXARA? <Link to="/register" className="text-white font-bold hover:text-primary transition-colors">Initialize Registration</Link></>
                    ) : (
                        <>Internal personnel issue? <Link to="/contact" className="text-white font-bold hover:text-primary transition-colors">Contact IT Support</Link></>
                    )}
                </p>
            </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
