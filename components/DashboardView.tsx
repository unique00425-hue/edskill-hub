import React, { useState } from 'react';
import { GraduationCapIcon, ArrowRightIcon, SearchIcon } from './Icons';
import { generateLearningPath } from '../services/geminiService';
import { LearningPath } from '../types';

export const DashboardView: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    
    const result = await generateLearningPath(topic);
    if (result) {
        setPaths(prev => [result, ...prev]);
        setTopic('');
    }
    setLoading(false);
  };

  const filteredPaths = paths.filter(path => 
    path.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col max-w-md mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 pt-4">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
            <GraduationCapIcon className="w-5 h-5 text-orange-500" />
           </div>
           <div>
             <h2 className="font-bold text-lg">My Learning</h2>
             <p className="text-xs text-slate-500">Track your progress</p>
           </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <SearchIcon className="w-4 h-4" />
        </div>
        <input 
            type="text" 
            placeholder="Search topics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all"
        />
      </div>

      {/* Prompt Section */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-8 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
         
         <h3 className="text-xl font-semibold mb-4 relative z-10">Create Path</h3>
         <p className="text-slate-400 text-sm mb-6 relative z-10">AI-powered roadmaps tailored to your goals.</p>
         
         <form onSubmit={handleGenerate} className="relative z-10">
            <input 
                type="text" 
                placeholder="What do you want to master?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm focus:border-orange-500 outline-none mb-4 placeholder:text-slate-600"
            />
            <button 
                type="submit" 
                disabled={loading || !topic}
                className="w-full bg-orange-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-orange-500 text-white font-semibold rounded-xl py-3 text-sm transition-all flex items-center justify-center gap-2"
            >
                {loading ? 'Generating...' : 'Generate Roadmap'}
                {!loading && <ArrowRightIcon className="w-4 h-4" />}
            </button>
         </form>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-y-auto pb-10 scrollbar-hide">
        {loading && (
             <div className="flex flex-col gap-4 animate-pulse mb-8">
                 {[1,2].map(i => (
                     <div key={i} className="h-24 bg-slate-800/50 rounded-2xl w-full"></div>
                 ))}
             </div>
        )}

        {filteredPaths.length > 0 ? (
            filteredPaths.map((path, pIdx) => (
                <div key={pIdx} className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                         <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">{path.topic}</h3>
                         <span className="text-[10px] text-slate-500">Generated</span>
                    </div>
                    
                    <div className="space-y-4">
                        {path.steps.map((step, idx) => (
                            <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl hover:bg-slate-800/60 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-orange-500 font-bold text-xs bg-orange-500/10 px-2 py-1 rounded-md">Step {idx + 1}</span>
                                    <span className="text-slate-500 text-xs font-medium">{step.duration}</span>
                                </div>
                                <h4 className="font-semibold text-base mb-2">{step.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed mb-3">{step.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {step.resources.map((res, rIdx) => (
                                        <span key={rIdx} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-1 rounded-full border border-slate-700">
                                            {res}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        ) : (
            !loading && (
                <div className="text-center py-10 opacity-50">
                    <p className="text-slate-600 text-sm">
                        {paths.length === 0 ? "Start by generating a roadmap above." : "No paths found matching your search."}
                    </p>
                </div>
            )
        )}
      </div>

    </div>
  );
};