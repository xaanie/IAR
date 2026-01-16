
import React, { useState } from 'react';
import { AppSection } from '../types';
import { ArrowRight, Heart, Users, Sparkles, Calendar, MapPin, Clock, HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { UPCOMING_EVENTS } from '../constants';

interface LandingPageProps {
  onNavigate: (section: AppSection) => void;
  onRegister?: () => void;
  onLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onRegister, onLogin }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const avatarIds = [
    'photo-1494790108377-be9c29b29330',
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1500648767791-00dcc994a43e',
    'photo-1534528741775-53994a69daeb'
  ];

  const faqs = [
    {
      q: "Who can join the MSU Global Hub?",
      a: "Current MSU students across all campuses (Gweru, Harare, Zvishavane) and verified alumni are welcome to join. External partners can join as mentors through our volunteering portal."
    },
    {
      q: "How do I earn Global Competence badges?",
      a: "Badges are earned by completing specific learning modules, attending cultural immersion sessions, or finishing certified mock interview paths. Once completed, badges appear on your profile automatically."
    },
    {
      q: "Are the job opportunities for international students only?",
      a: "No. We list both regional (SADC) and international opportunities. Some roles are specifically marked with the 'Help Badge' indicating alumni are ready to assist with referrals."
    },
    {
      q: "How can I volunteer as an alumni mentor?",
      a: "Visit the Volunteering section from the sidebar. You'll need to fill out a short profile highlighting your industry expertise and availability for mentorship sessions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" className="w-12 h-12" alt="IAR Logo" />
          <img src="/LOGO MSU.png" className="w-12 h-12 object-contain" alt="MSU Logo" />
          <h1 className="text-2xl font-black text-blue-900 tracking-tighter italic uppercase">MSU Global Hub</h1>
        </div>
        <div className="hidden md:flex space-x-8 items-center">
          <button onClick={() => onNavigate(AppSection.VOLUNTEERING)} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">Volunteering</button>
          <button onClick={() => onNavigate(AppSection.DONATIONS)} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">Donations</button>
          <button onClick={() => onNavigate(AppSection.FAQ)} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">FAQ</button>
          {onLogin && (
            <button 
              onClick={onLogin}
              className="text-sm font-bold text-slate-500 hover:text-blue-600 transition border border-slate-200 px-4 py-2 rounded-xl"
            >
              Login
            </button>
          )}
          <button 
            onClick={onRegister || (() => onNavigate(AppSection.ONBOARDING))}
            className="bg-[#009fe3] text-white px-6 py-2.5 rounded-xl text-sm font-black hover:brightness-110 transition shadow-lg shadow-blue-200"
          >
            Register
          </button>
          <button 
            onClick={() => onNavigate(AppSection.ONBOARDING)}
            className="bg-[#ffcc00] text-blue-900 px-6 py-2.5 rounded-xl text-sm font-black hover:brightness-110 transition shadow-lg shadow-yellow-200"
          >
            Launch Hub
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="space-y-8 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full border border-blue-100 mx-auto">
              <Sparkles className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-xs font-black uppercase tracking-widest">Taking MSU to the World</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-blue-900 leading-[0.95] uppercase tracking-tighter">
              A Global Community for <br/> <span className="text-[#009fe3]">Midlands</span> Leaders.
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              The MSU International & Alumni Relations Office connects current students with global mentors, opportunities, and the legacy of our university.
            </p>
            <div className="flex justify-center pt-6">
              <img src="/iaro_flags.29c2a07e1d71.png" className="w-full max-w-2xl h-auto object-contain" alt="International Flags" />
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button 
                onClick={onRegister || (() => onNavigate(AppSection.ONBOARDING))}
                className="bg-[#009fe3] text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center space-x-3"
              >
                <span>Register</span>
                <ArrowRight className="w-5 h-5 text-[#ffcc00]" />
              </button>
              {onLogin && (
                <button 
                  onClick={onLogin}
                  className="bg-[#ffcc00] text-blue-900 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center space-x-3"
                >
                  <span>Login</span>
                  <ArrowRight className="w-5 h-5 text-blue-900" />
                </button>
              )}
              <button 
                onClick={() => onNavigate(AppSection.DASHBOARD)}
                className="bg-slate-100 text-blue-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-200 transition flex items-center justify-center"
              >
                Guest Access
              </button>
            </div>
            <div className="flex flex-col items-center space-y-6 pt-8">
              <div className="flex -space-x-3">
                {avatarIds.map((id, i) => (
                  <img key={i} src={`https://images.unsplash.com/${id}?w=100&h=100&fit=crop`} className="w-12 h-12 rounded-full border-4 border-white shadow-lg" alt="Community member" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400">Join <span className="text-blue-900">25,000+</span> Alumni Worldwide</p>
            </div>
          </div>
        </div>

        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full opacity-30 -mr-96 -mt-96 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffcc00]/10 rounded-full opacity-30 -ml-48 -mb-48 pointer-events-none"></div>
      </header>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">Connecting Every Dimension</h3>
            <p className="text-lg text-slate-500 font-medium">From Gweru to the world, our platform bridges the gap between study and global professional success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, title: 'Alumni Network', desc: 'Connect with mentors who walked the same campuses and now lead global industries.', color: 'text-blue-500' },
              { icon: Heart, title: 'Regional Impact', desc: 'Participate in missions and support the International Student Grant fund.', color: 'text-red-500' },
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group border border-slate-100">
                <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${f.color}`}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-blue-900 mb-4">{f.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {UPCOMING_EVENTS.length > 0 && (
        <section className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Calendar className="w-6 h-6 text-[#009fe3]" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Community Hub</span>
              </div>
              <h3 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">Upcoming Events</h3>
              <p className="text-lg text-slate-500 font-medium">Join us for exciting gatherings that bring the global MSU community together.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UPCOMING_EVENTS.slice(0, 3).map((event) => (
                <div key={event.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer" onClick={() => onNavigate(AppSection.EVENTS)}>
                  <div className="h-64 overflow-hidden relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                      <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-blue-900 flex flex-col items-center min-w-[50px]">
                        <span className="text-[8px] font-black uppercase tracking-widest leading-none mb-1 opacity-60">{event.date.split(' ')[0]}</span>
                        <span className="text-lg font-black leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                      </div>
                      <h4 className="text-white text-xl font-black italic uppercase tracking-tighter leading-tight drop-shadow-md">{event.title}</h4>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 text-slate-500">
                      <div className="p-2 bg-slate-50 rounded-lg"><Clock className="w-3.5 h-3.5 text-blue-500" /></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-500">
                      <div className="p-2 bg-slate-50 rounded-lg"><MapPin className="w-3.5 h-3.5 text-blue-500" /></div>
                      <span className="text-[10px] font-black uppercase tracking-widest truncate">{event.location}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2">{event.description}</p>
                    <button className="w-full mt-4 py-3 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition flex items-center justify-center space-x-2">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 text-yellow-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center pt-4">
              <button 
                onClick={() => onNavigate(AppSection.EVENTS)}
                className="bg-blue-50 text-blue-900 px-10 py-4 rounded-2xl font-black text-sm hover:bg-blue-100 transition flex items-center justify-center space-x-2 mx-auto"
              >
                <span>View All Events</span>
                <ArrowRight className="w-4 h-4 text-[#009fe3]" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Social Impact / Donation CTA */}
      <section className="py-24 bg-[#009fe3] text-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Heart className="w-16 h-16 text-[#ffcc00] mx-auto animate-pulse" />
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Our Hands • Our Minds • Our Destiny</h3>
          <p className="text-xl text-blue-50 font-medium leading-relaxed">
            Support the Midlands State University Global Fund. Your contribution directly funds student certification fees and international travel for research.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => onNavigate(AppSection.DONATIONS)}
              className="bg-[#ffcc00] text-blue-900 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl"
            >
              Support the Hub
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <HelpCircle className="w-16 h-16 text-[#ffcc00] mx-auto mb-4" />
            <h3 className="text-4xl font-black text-blue-900 uppercase italic tracking-tighter">Frequently Asked Questions</h3>
            <p className="text-slate-500 font-medium">Everything you need to know about the MSU Global Hub ecosystem.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:border-blue-200 transition-colors">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full p-8 text-left flex justify-between items-center group"
                >
                  <span className="text-lg font-black text-blue-900 leading-tight pr-6">{faq.q}</span>
                  {openFaqIndex === i ? <ChevronUp className="w-6 h-6 text-blue-500" /> : <ChevronDown className="w-6 h-6 text-slate-300 group-hover:text-blue-500" />}
                </button>
                {openFaqIndex === i && (
                  <div className="px-8 pb-8 animate-fadeIn">
                    <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#009fe3] p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-md">
              <h4 className="text-2xl font-black italic uppercase">Still have questions?</h4>
              <p className="text-blue-100 font-medium leading-relaxed">Our IAR Office team is ready to assist you with any platform-related issues or partnership inquiries.</p>
            </div>
            <button 
              onClick={() => onNavigate(AppSection.FAQ)}
              className="relative z-10 bg-[#ffcc00] text-blue-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition flex items-center space-x-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span>View Full FAQ</span>
            </button>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Link */}
      <footer className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" className="w-10 h-10 grayscale opacity-50" alt="IAR Logo" />
            <img src="/LOGO MSU.png" className="w-10 h-10 object-contain grayscale opacity-50" alt="MSU Logo" />
            <p className="text-sm font-bold text-slate-400">© 2024 Midlands State University. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-8">
            <button onClick={() => onNavigate(AppSection.FAQ)} className="text-sm font-bold text-slate-400 hover:text-blue-600 transition">FAQ</button>
            <button onClick={() => onNavigate(AppSection.VOLUNTEERING)} className="text-sm font-bold text-slate-400 hover:text-blue-600 transition">Volunteering</button>
            <a href="https://msu.ac.zw" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition">Official Site</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
