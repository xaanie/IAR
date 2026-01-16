
import React, { useState } from 'react';
import { JOB_OPPORTUNITIES } from '../constants';
import { JobOpportunity } from '../types';
import { generateOutreachTemplate } from '../services/geminiService';
// Added missing Sparkles import
import { Briefcase, MapPin, Award, UserPlus, Info, MessageCircle, Send, X, ShieldCheck, Sparkles } from 'lucide-react';

const OpportunityPortal: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [outreachTemplate, setOutreachTemplate] = useState<string>('');
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  const handleOpenReferral = async (job: JobOpportunity) => {
    setSelectedJob(job);
    if (job.alumniContact) {
      setIsLoadingTemplate(true);
      const template = await generateOutreachTemplate(
        job.alumniContact.name, 
        job.alumniContact.role, 
        job.company
      );
      setOutreachTemplate(template);
      setIsLoadingTemplate(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3 mb-3">
             <Briefcase className="w-6 h-6 text-blue-500" />
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Career Network</span>
          </div>
          <h3 className="text-4xl font-black text-blue-900 mb-2 uppercase italic tracking-tight">Global Opportunities</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Connect with the <span className="text-[#009fe3] font-black">IRO Alumni Network</span>. Find your next breakthrough in the SADC region and beyond.
          </p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm self-start">
          <button className="px-8 py-3 bg-[#009fe3] text-white rounded-xl text-xs font-black shadow-lg">Regional</button>
          <button className="px-8 py-3 text-slate-400 hover:text-blue-900 text-xs font-black transition">International</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {JOB_OPPORTUNITIES.map(job => (
          <div key={job.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <h4 className="text-2xl font-black text-blue-900 tracking-tight group-hover:text-blue-600 transition-colors">{job.title}</h4>
                {job.hasHelpBadge && (
                  <div className="flex items-center space-x-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-xl border border-yellow-100 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">IRO Certified</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                 <div className="flex items-center space-x-2">
                    <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                    <span>{job.company}</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{job.location}</span>
                 </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-medium">{job.description}</p>
            </div>

            <div className="flex flex-col md:items-end space-y-6">
              {job.hasHelpBadge && job.alumniContact && (
                <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xs font-black text-blue-900 border-2 border-white shadow-sm">
                    {job.alumniContact.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-black uppercase leading-none mb-1">Lead Contact</span>
                    <span className="text-sm font-black text-blue-900 leading-none">{job.alumniContact.name}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-900 hover:bg-blue-50 transition shadow-sm">
                  <Info className="w-5 h-5" />
                </button>
                {job.hasHelpBadge ? (
                  <button 
                    onClick={() => handleOpenReferral(job)}
                    className="px-8 py-4 bg-[#ffcc00] text-blue-900 rounded-2xl font-black hover:brightness-105 transition text-sm shadow-xl flex items-center space-x-3"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Request Referral</span>
                  </button>
                ) : (
                  <button className="px-8 py-4 bg-blue-900 text-white rounded-2xl font-black hover:bg-blue-800 transition text-sm shadow-xl flex items-center space-x-3">
                    <Send className="w-5 h-5" />
                    <span>Quick Apply</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Referral Modal */}
      {selectedJob && selectedJob.alumniContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/90 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl relative animate-scaleUp overflow-hidden shadow-2xl">
            <div className="bg-[#009fe3] p-12 text-white relative">
              <div className="flex items-center space-x-4 mb-3">
                 <MessageCircle className="w-8 h-8 text-[#ffcc00]" />
                 <h3 className="text-3xl font-black uppercase tracking-tighter">Global Outreach</h3>
              </div>
              <p className="text-blue-100 font-bold opacity-90">Message for {selectedJob.alumniContact.name} • {selectedJob.company}</p>
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-10 right-10 text-white/50 hover:text-white bg-white/10 w-12 h-12 rounded-full flex items-center justify-center transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-12 space-y-8">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 relative overflow-hidden flex items-start space-x-4">
                <Sparkles className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <p className="text-sm text-blue-900 font-bold leading-relaxed">
                  Our Global Hub assistant has analyzed your profile to draft a professional link between your hands and {selectedJob.alumniContact.name.split(' ')[0]}'s experience.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Official Draft</label>
                {isLoadingTemplate ? (
                  <div className="w-full h-44 bg-slate-50 rounded-3xl flex flex-col items-center justify-center animate-pulse border-2 border-dashed border-slate-100">
                    <div className="w-10 h-10 border-4 border-[#009fe3] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <span className="text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Analyzing Connections...</span>
                  </div>
                ) : (
                  <textarea 
                    className="w-full h-48 p-8 bg-slate-50 border border-slate-100 rounded-[2rem] text-slate-800 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none shadow-inner leading-relaxed"
                    value={outreachTemplate}
                    onChange={(e) => setOutreachTemplate(e.target.value)}
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 py-5 border-2 border-slate-100 text-slate-400 rounded-2xl font-black hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-5 bg-blue-900 text-white rounded-2xl font-black hover:bg-blue-800 transition shadow-2xl flex items-center justify-center space-x-3"
                  onClick={() => {
                    alert('Official link request dispatched via IRO channels!');
                    setSelectedJob(null);
                  }}
                >
                  <Send className="w-5 h-5" />
                  <span>Send Link</span>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-4 pt-6">
                 <div className="h-px w-24 bg-slate-100"></div>
                 <p className="text-[9px] text-slate-300 uppercase tracking-widest font-black text-center">
                   Verified by International & Alumni Relations Office
                 </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityPortal;
