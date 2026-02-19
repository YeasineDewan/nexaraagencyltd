import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: { value: number; label: string };
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color = 'text-primary',
  trend,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="bg-dark-lighter border border-white/5 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 group hover:border-primary/30 transition-all duration-300"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{label}</p>
        <p className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</p>
        {trend && (
          <p className={`text-xs font-bold ${trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
      </div>
      <div
        className={`p-4 rounded-2xl bg-white/5 ${color} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </motion.div>
);
