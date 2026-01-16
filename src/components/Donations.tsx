
import React from 'react';
import { Heart, Landmark, ShieldCheck, ArrowRight, Gift, Coins, Trophy } from 'lucide-react';

const tiers = [
  { icon: Coins, name: "Bronze Link", amount: "50", desc: "Funds one regional internship travel stipend." },
  { icon: Gift, name: "Silver Hub", amount: "150", desc: "Covers certification fees for two graduating students." },
  { icon: Trophy, name: "Global Guardian", amount: "500", desc: "Funds a major research immersion project for an international student." }
];

const Donations: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn pb-20">
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-3 bg-red-50 px-4 py-2 rounded-2xl border border-red-100">
           <Heart className="w-5 h-5 text-red-500 fill-current" />
           <span className="text-xs font-black text-red-700 uppercase tracking-widest">Student Support Fund</span>
        </div>
        <h3 className="text-5xl font-black text-blue-900 uppercase italic tracking-tighter">Support Our Destiny</h3>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">
          The MSU International Student Grant directly impacts the professional lives of our students. Your donations ensure no leader is left behind due to financial barriers.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <div key={i} className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#ffcc00] group-hover:text-blue-900 transition-all duration-500">
              <tier.icon className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-blue-900 mb-2">{tier.name}</h4>
            <p className="text-3xl font-black text-[#009fe3] mb-6 tracking-tighter">$ {tier.amount}</p>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1 font-medium">{tier.desc}</p>
            <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black hover:bg-blue-800 transition shadow-xl">Donate Now</button>
          </div>
        ))}
      </div>

      <div className="bg-[#ffcc00]/10 border-2 border-dashed border-[#ffcc00] p-12 rounded-[3rem] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h4 className="text-3xl font-black text-blue-900 uppercase italic tracking-tighter leading-tight">Corporate & Legacy Partnerships</h4>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Interested in establishing a dedicated scholarship or naming an Innovation Hub space? Our IAR Office facilitates high-impact corporate partnerships.
          </p>
          <button className="flex items-center space-x-3 text-blue-900 font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
            <span>Contact Partnership Lead</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
             <Landmark className="w-8 h-8 text-blue-500 mb-2" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Bank Transfer</p>
             <p className="text-sm font-bold text-blue-900 mt-1">Verified Gateway</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
             <ShieldCheck className="w-8 h-8 text-green-500 mb-2" />
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tax Deductible</p>
             <p className="text-sm font-bold text-blue-900 mt-1">Official Receipt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
