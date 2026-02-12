import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
               <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                 <path d="M 5 0 L 0 0 0 5" fill="none" stroke="white" strokeWidth="0.1"/>
               </pattern>
             </defs>
             <rect width="100" height="100" fill="url(#grid)" />
           </svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl z-10"
      >
        <div className="mb-12">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-8 group">
                <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                Back to Home
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary rounded-xl p-2.5 shadow-lg shadow-primary/20">
                    <span className="text-white font-bold text-2xl">N</span>
                </div>
                <span className="font-extrabold text-3xl text-white tracking-tight uppercase">NEXARA<span className="text-primary">.</span></span>
            </div>
            
            <h1 className="text-5xl font-black text-white mb-4 leading-tight">{title}</h1>
            <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>

        <div className="bg-dark-lighter border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-30"></div>
            <div className="p-8 md:p-12">
                {children}
            </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} NEXARA Agency Ltd. Secure Authentication Environment.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
