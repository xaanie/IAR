
import React from 'react';
import { Users, Mic2, ExternalLink, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { AppSection } from '../types';

interface VolunteeringProps {
  onNavigate: (section: AppSection) => void;
}

const Volunteering: React.FC<VolunteeringProps> = ({ onNavigate }) => {
  const roles = [
    { icon: Users, title: "Super Mentor", desc: "Commit to 2 hours monthly of virtual 1-on-1 career mentorship for final-year students." },
    { icon: Mic2, title: "Guest Speaker", desc: "Share your journey in our 'Global Journey' webinar series. Inspire hundreds with one hour." },
    { icon: ExternalLink, title: "Industry Link", desc: "Provide internal referrals for your current organisation's internship or entry-level openings." }
  ];

  return (
    <div className="space-y-16 animate-fadeIn pb-20">
      <section className="bg-gradient-to-r from-blue-900 to-[#009fe3] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-[#ffcc00] fill-current" />
            <span className="text-xs font-black uppercase tracking-widest">Lead from the Front</span>
          </div>
          <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-tight">Give Back to Your Alma Mater</h3>
          <p className="text-xl text-blue-100 font-medium leading-relaxed opacity-90">
            Join the MSU Alumni Volunteering Network. Your experience is the roadmap current students need to navigate the global professional terrain.
          </p>
          <button className="bg-[#ffcc00] text-blue-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition">Apply as Volunteer</button>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full -mr-24 -mt-24 pointer-events-none"></div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roles.map((role, i) => (
          <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#009fe3] group-hover:text-white transition-all">
              <role.icon className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-blue-900 mb-4">{role.title}</h4>
            <p className="text-slate-500 leading-relaxed font-medium mb-8">{role.desc}</p>
            <button className="flex items-center space-x-2 text-sm font-black text-blue-900 uppercase tracking-widest hover:translate-x-1 transition-transform">
              <span>Learn Requirements</span>
              <ArrowRight className="w-4 h-4 text-[#ffcc00]" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="w-full md:w-1/3">
           <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" 
              className="rounded-[2rem] w-full h-64 object-cover shadow-2xl" 
              alt="Mentorship session"
           />
        </div>
        <div className="flex-1 space-y-6">
          <div className="flex items-center space-x-2 text-green-600">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-sm font-black uppercase tracking-widest">Official Support</span>
          </div>
          <h4 className="text-3xl font-black text-blue-900 uppercase italic tracking-tighter">Impactful Mentorship</h4>
          <p className="text-slate-500 font-medium leading-relaxed">
            All volunteers undergo a brief onboarding by the IRO Office. Once active, you'll gain access to exclusive Alumni-only networking events on campus and regionally across the SADC region.
          </p>
          <div className="flex gap-4">
             <button className="px-8 py-3 bg-blue-900 text-white rounded-xl font-black hover:bg-blue-800 transition">Complete Profile</button>
             <button onClick={() => onNavigate(AppSection.FAQ)} className="px-8 py-3 bg-slate-50 text-slate-500 border border-slate-100 rounded-xl font-bold hover:bg-slate-100 transition">View FAQ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteering;
