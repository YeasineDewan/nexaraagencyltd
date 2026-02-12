import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Briefcase, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (employeeId === 'EMP001' && password === 'password123') {
      login(employeeId, 'employee');
      navigate('/employee/dashboard');
    } else {
      setError('System verification failed. Invalid Employee ID or Security Key.');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
        title="Internal Network" 
        subtitle="Secure authentication for NEXARA personnel and creative talent network."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex gap-4 items-start mb-8">
            <ShieldAlert className="text-primary flex-shrink-0 mt-1" size={20} />
            <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                This environment is strictly for authorized NEXARA employees. Unauthorized access attempts are logged and reported to corporate security.
            </p>
        </div>

        <div className="space-y-5">
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Employee Designation ID</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                        <Briefcase size={18} />
                    </div>
                    <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-700 font-mono"
                        placeholder="EMP-XXX-XXXX"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Security Key</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-primary transition-colors">
                        <Lock size={18} />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-4 h-14 text-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-700"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>
        </div>

        {error && (
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary text-[11px] font-black uppercase tracking-widest bg-primary/5 p-4 rounded-xl border-l-4 border-primary"
            >
                {error}
            </motion.div>
        )}

        <Button 
            type="submit" 
            className="w-full h-16 rounded-2xl bg-primary hover:bg-primary-dark border-none font-black text-lg group"
            isLoading={isLoading}
        >
          Secure Auth Login
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="text-center pt-4">
            <Link to="/login" className="text-gray-500 text-sm hover:text-white transition-colors">
                Back to <span className="text-white font-bold">Standard Portal</span>
            </Link>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 opacity-30">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">TLS 1.3 Secure</div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Biometric Ready</div>
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AES-256 Encrypted</div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default EmployeeLogin;
