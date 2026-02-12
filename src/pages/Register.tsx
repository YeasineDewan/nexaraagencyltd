import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Building, CheckCircle, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    role: 'client',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement & HTMLSelectElement;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error on input change
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!formData.company.trim()) {
      setError('Company name is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        role: formData.role as 'client' | 'employee' | 'admin',
        company: formData.company,
        phone: formData.phone,
      };
      
      // Auto-login after successful registration
      login(formData.email, formData.role as 'client' | 'employee' | 'admin');
      
      setIsSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        const dashboardPath = formData.role === 'admin' ? '/admin/dashboard' : 
                          formData.role === 'employee' ? '/employee/dashboard' : '/client/dashboard';
        navigate(dashboardPath);
      }, 2000);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
        <AuthLayout title="Registration Successful!" subtitle="Welcome to NEXARA Agency Ltd.">
            <div className="text-center py-12 space-y-8">
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle size={48} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Account Created</h3>
                    <p className="text-gray-400">Welcome aboard! Redirecting to your dashboard...</p>
                </div>
                <div className="w-full bg-dark rounded-full h-1 overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>
        </AuthLayout>
    );
  }

  return (
    <AuthLayout 
        title="Create Account" 
        subtitle="Join NEXARA Agency and start your digital transformation journey"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                        <User size={18} />
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                        placeholder="John Doe"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                        <Mail size={18} />
                    </div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                        placeholder="john@company.com"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
              Company / Organization
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                <Building size={18} />
              </div>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="Global Solutions Ltd."
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
              Phone Number
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                <User size={18} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="+8801XXXXXXXXX"
                required
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Account Type</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                <User size={18} />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm appearance-none cursor-pointer"
                required
                disabled={isLoading}
              >
                <option value="client">Client / Brand</option>
                <option value="employee">Employee</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                </div>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-12 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="Create a strong password"
                    required
                    disabled={isLoading}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-primary transition-colors"
                    disabled={isLoading}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-bold">
            By creating an account, you agree to NEXARA's Terms of Service and Privacy Policy.
        </div>

        <Button 
            type="submit" 
            className="w-full h-16 rounded-2xl bg-primary hover:bg-primary-dark border-none font-black text-lg group shadow-xl shadow-primary/20"
            isLoading={isLoading}
            disabled={isLoading}
        >
          Create Account
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="text-center pt-4">
            <p className="text-gray-500 text-sm">
                Already have an account? <Link to="/login" className="text-white font-bold hover:text-primary transition-colors">Sign In</Link>
            </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
