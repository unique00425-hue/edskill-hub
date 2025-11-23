import React, { useState } from 'react';
import { GraduationCapIcon, MailIcon, LockIcon, GoogleIcon } from './Icons';
import { InputGroup } from './InputGroup';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#0f172a]">
      {/* Background subtle elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm z-10 flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-slate-700/50">
            <GraduationCapIcon className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">EdSkill Hub</h1>
          <p className="text-slate-500 text-sm tracking-wide">Learn. Lead. Earn. Empower.</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="w-full">
          <InputGroup
            type="email"
            placeholder="Email"
            icon={<MailIcon className="w-5 h-5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup
            type="password"
            placeholder="Password"
            icon={<LockIcon className="w-5 h-5" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end mb-6">
            <button type="button" className="text-xs text-orange-500 hover:text-orange-400 font-medium">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-2xl py-4 text-sm shadow-lg shadow-orange-900/20 transition-all active:scale-[0.98] flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500 text-sm">
          Don't have an account? <button className="text-orange-500 font-medium hover:underline">Sign Up</button>
        </p>

        {/* Divider */}
        <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative bg-[#0f172a] px-4">
                <span className="text-xs text-slate-600 uppercase">or continue with</span>
            </div>
        </div>

        {/* Social Login */}
        <button className="w-full bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white font-medium rounded-2xl py-3.5 text-sm transition-all flex items-center justify-center gap-3">
          <GoogleIcon className="w-5 h-5" />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};