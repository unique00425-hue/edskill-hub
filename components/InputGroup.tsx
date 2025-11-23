import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './Icons';

interface InputGroupProps {
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputGroup: React.FC<InputGroupProps> = ({ type, placeholder, icon, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="relative w-full mb-4 group">
      {/* Left Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
        {icon}
      </div>

      <input
        type={isPassword && showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-800/50 border border-slate-800 text-white text-sm rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-slate-600"
      />

      {/* Right Icon (Toggle Password) */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        >
          {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};