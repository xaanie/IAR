
import React from 'react';
import { BADGES } from '../constants';
import { AppSection } from '../types';
// Added missing Globe import
import { Award, Compass, Search, Rocket, ChevronRight, Share2, Target, Zap, GraduationCap, Map, Globe } from 'lucide-react';

interface SkillsDashboardProps {
  onNavigate: (section: AppSection) => void;
}

const SkillsDashboard: React.FC<SkillsDashboardProps> = ({ onNavigate }) => {
  const resourceLinks = [
    { name: 'IRO Intensive English', tag: 'Language Support', url: 'https://iro.msu.ac.zw/language', icon: Globe },
    { name: 'Innovation Hub', tag: 'Entrepreneurship', url: 'https://innovation.msu.ac.zw', icon: Zap },
    { name: 'Immersion Tours', tag: 'Field Exploration', url: 'https://iro.msu.ac.zw/tours', icon: Map },
    { name: 'SADC Career Guide', tag: 'Regional Insights', url: 'https://www.sadc.int/opportunities', icon: Search },
  ];

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Progress Summary */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Target className="w-48 h-48" />
            </div>
            <div className="flex items-center space-x-3 mb-8">
               <Target className="w-6 h-6 text-[#ffcc00]" />
               <h3 className="text-2xl font-black text-blue-900 uppercase italic tracking-tight">Global Competence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-10">
                {[
                  { label: 'Global Profile', value: 85, color: '#009fe3' },
                  { label: 'Cultural Immersion', value: 60, color: '#ffcc00' },
                  { label: 'Innovation Credits', value: 42, color: '#1e3a8a' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <span className="text-sm font-black text-blue-900">{item.value}%</span>
                    </div>
                    <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden shadow-inner p-1">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-900 rounded-[2rem] p-10 text-white flex flex-col items-center justify-center text-center space-y-6 shadow-2xl relative group">
                <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md group-hover:scale-110 transition-transform">
                  <Rocket className="w-10 h-10 text-[#ffcc00]" />
                </div>
                <div>
                   <h4 className="font-black text-xl uppercase tracking-tighter mb-2">Next Milestone</h4>
                   <p className="text-xs text-blue-200 font-medium leading-relaxed">Visit the Naletalie Ruins to unlock the <span className="text-white font-black">Ruins Explorer</span> credentials.</p>
                </div>
                <button 
                  onClick={() => handleResourceClick('https://iro.msu.ac.zw/tours')}
                  className="w-full py-4 bg-[#ffcc00] text-blue-900 rounded-2xl font-black hover:brightness-110 transition text-sm shadow-xl"
                >
                  Book Immersion
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-blue-900 uppercase tracking-widest flex items-center">
                  <Award className="w-7 h-7 mr-3 text-blue-500" />
                  Verified Credentials
               </h3>
               <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">3/12 Completed</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BADGES.map(badge => (
                <div key={badge.id} className={`p-8 rounded-[2.5rem] border transition-all duration-300 flex items-center space-x-6 ${
                  badge.isUnlocked 
                    ? 'bg-white border-slate-100 shadow-sm hover:shadow-xl group' 
                    : 'bg-slate-50 border-slate-50 opacity-40 grayscale'
                }`}>
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    badge.isUnlocked ? 'bg-blue-50' : 'bg-slate-100'
                  }`}>
                    <GraduationCap className={`w-10 h-10 ${badge.isUnlocked ? 'text-[#009fe3]' : 'text-slate-300'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-blue-900 leading-tight group-hover:text-blue-600 transition-colors">{badge.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-2 mb-4 leading-relaxed font-medium">{badge.description}</p>
                    {badge.isUnlocked ? (
                      <div className="inline-flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                         <ShieldCheck className="w-3 h-3 text-green-600" />
                         <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">Verified: {badge.earnedDate}</span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verification Pending</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Resources */}
        <div className="space-y-10">
          <div className="bg-blue-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ffcc00]"></div>
            <h3 className="text-xl font-black mb-2 uppercase tracking-tighter">IRO Hub</h3>
            <p className="text-blue-300 text-[11px] mb-10 font-bold uppercase tracking-widest">Global Preparedness Tools</p>
            <div className="space-y-5">
              {resourceLinks.map((res, i) => (
                <div 
                  key={i} 
                  onClick={() => handleResourceClick(res.url)}
                  className="flex justify-between items-center p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                     <div className="p-2 bg-white/10 rounded-xl group-hover:bg-[#ffcc00] transition-colors">
                        <res.icon className="w-5 h-5 group-hover:text-blue-900 transition-colors" />
                     </div>
                     <div>
                       <p className="font-black text-sm group-hover:text-white transition tracking-tight leading-none">{res.name}</p>
                       <p className="text-[9px] text-blue-400 uppercase font-black tracking-widest mt-1.5">{res.tag}</p>
                     </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 text-center space-y-6 shadow-sm hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
               <Share2 className="w-8 h-8 text-[#009fe3]" />
            </div>
            <div>
               <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-2">Global Visibility</p>
               <h4 className="font-black text-blue-900 leading-tight px-4">Sync MSU Credentials with Professional Networks</h4>
            </div>
            <button 
              onClick={() => window.open('https://www.linkedin.com', '_blank')}
              className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-sm hover:opacity-95 transition shadow-2xl flex items-center justify-center space-x-3"
            >
              <Award className="w-5 h-5 text-[#ffcc00]" />
              <span>Broadcast Badges</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Icon for the Credential Badge
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default SkillsDashboard;
