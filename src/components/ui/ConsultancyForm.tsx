import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { motion, AnimatePresence } from 'framer-motion';

const ConsultancyForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    designation: '',
    contact: '',
    message: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-xl mx-auto bg-dark-lighter p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
            className="h-full bg-primary" 
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-bold">Book a Free Consultancy</h3>
        <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
                <div key={s} className={`w-2 h-2 rounded-full ${step >= s ? 'bg-primary' : 'bg-white/10'}`} />
            ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {step === 1 && (
            <div className="space-y-4">
              <Input 
                label="Name" 
                placeholder="Enter your name" 
                className="bg-dark border-white/10 text-white placeholder:text-gray-600 h-12"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                label="Company Name" 
                placeholder="Enter company name" 
                className="bg-dark border-white/10 text-white placeholder:text-gray-600 h-12"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
              <Input 
                label="Designation" 
                placeholder="Enter your designation" 
                className="bg-dark border-white/10 text-white placeholder:text-gray-600 h-12"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
               <Input 
                label="Contact Info" 
                placeholder="Phone or Email" 
                className="bg-dark border-white/10 text-white placeholder:text-gray-600 h-12"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-sm text-gray-400">
                We'll use this to reach out to you within 24 hours.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-400">Message (Optional)</label>
              <textarea 
                placeholder="How can we help you?" 
                rows={4}
                className="w-full bg-dark border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-gray-600"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex gap-4">
        {step > 1 && (
            <Button variant="outline" className="flex-1 h-12 rounded-xl border-white/10 text-white hover:bg-white/5" onClick={prevStep}>
                Previous
            </Button>
        )}
        <Button 
            className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-dark border-none" 
            onClick={step === 3 ? () => alert('Request Sent!') : nextStep}
        >
          {step === 3 ? 'Submit Request' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
};

export default ConsultancyForm;
