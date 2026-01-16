
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

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

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn py-10">
      <div className="text-center space-y-4">
        <HelpCircle className="w-16 h-16 text-[#ffcc00] mx-auto mb-4" />
        <h3 className="text-4xl font-black text-blue-900 uppercase italic tracking-tighter">Help & Frequently Asked Questions</h3>
        <p className="text-slate-500 font-medium">Everything you need to know about the MSU Global Hub ecosystem.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:border-blue-200 transition-colors">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-8 text-left flex justify-between items-center group"
            >
              <span className="text-lg font-black text-blue-900 leading-tight pr-6">{faq.q}</span>
              {openIndex === i ? <ChevronUp className="w-6 h-6 text-blue-500" /> : <ChevronDown className="w-6 h-6 text-slate-300 group-hover:text-blue-500" />}
            </button>
            {openIndex === i && (
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
        <button className="relative z-10 bg-[#ffcc00] text-blue-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition flex items-center space-x-3">
          <MessageCircle className="w-5 h-5" />
          <span>Contact IAR Support</span>
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      </div>
    </div>
  );
};

export default FAQ;
