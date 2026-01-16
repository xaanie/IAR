
import React from 'react';
import { AppSection } from '../types';
import { Users, Sparkles, Calendar, Sun, Landmark, MapPin, Compass, Search, Globe, ArrowRight, HelpCircle } from 'lucide-react';

interface DashboardProps {
  onNavigate: (section: AppSection) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* 1. Hero Group */}
      <section className="bg-gradient-to-br from-[#009fe3] via-[#00b4ff] to-[#008cc9] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4 md:space-y-6">
          <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            <img 
              src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=50&h=50&fit=crop" 
              className="w-4 h-4 object-cover rounded-full border border-white/30"
              alt="Flags"
            />
            <span className="text-[10px] font-black uppercase tracking-widest">Official Global Gateway</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight uppercase tracking-tighter italic">
            Taking MSU <br className="hidden md:block"/>To The World.
          </h2>
          <p className="text-blue-50 text-base md:text-lg font-medium italic opacity-90 leading-relaxed max-w-lg">
            "Bringing the world to MSU and taking MSU to the world" — The IAR Hub is your bridge to global excellence.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-5 pt-2">
            <button 
              onClick={() => onNavigate(AppSection.OPPORTUNITIES)}
              className="bg-[#ffcc00] text-blue-900 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base hover:scale-105 transition shadow-lg flex items-center space-x-3"
            >
              <Search className="w-5 h-5" />
              <span>Explore Jobs</span>
            </button>
            <button 
              onClick={() => onNavigate(AppSection.MY_PORTAL)}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base hover:bg-white/20 transition flex items-center space-x-3"
            >
              <span>My Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 p-8 md:p-12 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4 md:translate-x-0 md:translate-y-0 flex items-center space-x-4">
           <img src="/logo.svg" className="w-48 h-48 md:w-80 md:h-80" alt="IAR Logo" />
           <img src="/LOGO MSU.png" className="w-48 h-48 md:w-80 md:h-80 object-contain" alt="MSU Logo" />
        </div>
      </section>

      {/* 2. Vital Stats Cluster */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: 'Campuses', value: '3 Active', icon: Landmark, color: 'text-blue-600 bg-blue-50' },
          { label: 'Students', value: '25,000+', icon: Users, color: 'text-green-600 bg-green-50' },
          { label: 'Global Links', value: '7+ Nations', icon: Globe, color: 'text-[#ffcc00] bg-yellow-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 md:p-7 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${stat.color} flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <p className="text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-lg md:text-2xl font-black text-blue-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3. Logical Grouping: Cultural & Integration Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-blue-900 text-white rounded-lg flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">Integration & Support</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
             <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg"><Sun className="w-5 h-5 text-blue-500" /></div>
                  <h4 className="font-black text-blue-900 text-lg">Local Climate</h4>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 Gweru is temperate. October is the warmest (+30°C), while June provides crisp, cool winters (down to 5°C).
               </p>
               <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 border-t border-slate-50 pt-4">
                 <span>October (Warm)</span>
                 <span>June (Cool)</span>
               </div>
             </div>

             <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-50 rounded-lg"><Users className="w-5 h-5 text-yellow-600" /></div>
                  <h4 className="font-black text-blue-900 text-lg">Social Fabric</h4>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed mb-6">
                  Cosmopolitan and inclusive. We celebrate 16 official languages and a rich diversity of religious faiths.
               </p>
               <div className="flex items-center space-x-2 text-[10px] font-black text-green-600 uppercase pt-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span>95% Integration Rate</span>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-blue-900 rounded-[2rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-0 transition-transform">
             <Calendar className="w-32 h-32" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Next Milestone</h3>
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-black text-[#ffcc00] uppercase tracking-widest mb-1">Upcoming Event</p>
              <p className="font-bold text-sm">International Coffee Hour</p>
              <div className="flex items-center space-x-2 text-blue-200 text-[10px] mt-2">
                <Calendar className="w-3 h-3" />
                <span>Thurs, 2:00 PM • Gweru Main</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate(AppSection.EVENTS)}
                className="w-full py-4 bg-[#009fe3] text-white rounded-xl font-black hover:bg-blue-500 transition text-sm shadow-lg flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>View All Events</span>
              </button>
              <button 
                onClick={() => onNavigate(AppSection.FAQ)}
                className="w-full py-4 bg-white/5 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition text-sm flex items-center justify-center space-x-2"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Support Hub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
