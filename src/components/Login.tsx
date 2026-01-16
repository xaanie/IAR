import React, { useState } from 'react';
import { Mail, Lock, X, ArrowRight } from 'lucide-react';
import { login } from '../services/authService';

interface LoginProps {
  onSuccess: () => void;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      login(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/90 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md relative animate-scaleUp overflow-hidden shadow-2xl">
        <div className="bg-[#009fe3] p-8 text-white relative">
          <h3 className="text-3xl font-black uppercase tracking-tighter italic text-center">Login to MSU Hub</h3>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 p-4 rounded-2xl text-sm font-semibold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button
              type="submit"
              className="w-full py-5 bg-[#009fe3] text-white rounded-2xl font-black hover:bg-blue-800 transition shadow-xl flex items-center justify-center space-x-3"
            >
              <span>Login</span>
              <ArrowRight className="w-5 h-5 text-[#ffcc00]" />
            </button>
            
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="w-full py-4 border-2 border-[#009fe3] text-[#009fe3] rounded-2xl font-black hover:bg-blue-50 transition"
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

