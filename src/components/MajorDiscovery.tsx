
import React, { useState } from 'react';
import { CAREER_STORIES } from '../constants';
import { CareerStory, AppSection } from '../types';
import { BookOpen, UserCheck, MessageSquare, ChevronRight, Bookmark, X, GraduationCap, Sparkles } from 'lucide-react';

interface MajorDiscoveryProps {
  onNavigate: (section: AppSection) => void;
}

const MajorDiscovery: React.FC<MajorDiscoveryProps> = ({ onNavigate }) => {
  const [selectedStory, setSelectedStory] = useState<CareerStory | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="max-w-3xl">
        <div className="flex items-center space-x-3 mb-3">
           <BookOpen className="w-6 h-6 text-blue-500" />
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Major Discovery Hub</span>
        </div>
        <h3 className="text-3xl font-black text-blue-900 mb-2 uppercase italic tracking-tight">Major Journeys</h3>
        <p className="text-slate-500 font-medium">
          Hear directly from alumni about how they decided on their majors and how their paths led to global success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CAREER_STORIES.map(story => (
          <div key={story.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
            <div className="h-52 overflow-hidden relative">
              <img src={story.avatar} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5">
                <div className="flex items-center space-x-2 bg-[#ffcc00] text-blue-900 px-3 py-1 rounded-lg">
                   <GraduationCap className="w-3.5 h-3.5" />
                   <span className="text-[10px] font-black uppercase tracking-wider">{story.major}</span>
                </div>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h4 className="text-xl font-black text-blue-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">{story.name}</h4>
              <p className="text-xs text-slate-400 font-bold mb-4 uppercase tracking-tighter">{story.role} @ {story.company}</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">"{story.storyPreview}"</p>
              <button 
                onClick={() => setSelectedStory(story)}
                className="w-full py-4 bg-slate-50 text-blue-900 rounded-2xl font-black hover:bg-blue-900 hover:text-white transition duration-300 text-sm flex items-center justify-center space-x-2"
              >
                <span>Read Journey</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Dynamic Placeholder for "Share Your Story" */}
        <div className="bg-white rounded-[2rem] border-2 border-dashed border-blue-100 flex flex-col items-center justify-center p-10 text-center space-y-6 group hover:border-[#ffcc00] transition-colors">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <MessageSquare className="w-10 h-10 text-[#009fe3]" />
          </div>
          <div>
             <h4 className="text-xl font-black text-blue-900 uppercase tracking-tighter">Share Your Major Journey</h4>
             <p className="text-xs text-slate-400 font-bold mt-2 leading-relaxed">Help current students align their choice with personal strengths.</p>
          </div>
          <a 
            href="mailto:iro@msu.ac.zw?subject=MSU%20Major%20Journey" 
            className="px-8 py-4 bg-blue-900 text-white rounded-2xl font-black hover:bg-blue-800 transition shadow-lg flex items-center space-x-2"
          >
            <span>Draft Your Story</span>
            <ChevronRight className="w-4 h-4 text-[#ffcc00]" />
          </a>
        </div>
      </div>

      {/* Full Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-blue-900/80 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-scaleUp shadow-2xl">
            <button 
              onClick={() => setSelectedStory(null)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-blue-900 transition shadow-sm z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-10">
              <div className="flex items-center space-x-8 mb-12">
                <img src={selectedStory.avatar} className="w-28 h-28 rounded-[2rem] object-cover shadow-2xl border-4 border-white" />
                <div>
                  <h3 className="text-4xl font-black text-blue-900 leading-tight tracking-tighter">{selectedStory.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-[#ffcc00] rounded-full"></div>
                    <p className="text-lg text-slate-400 font-bold uppercase tracking-tighter">{selectedStory.major}, Class of {selectedStory.graduationYear}</p>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none">
                <div className="flex items-center space-x-2 mb-6">
                   <div className="w-10 h-1 bg-blue-500 rounded-full"></div>
                   <h4 className="text-2xl font-black text-blue-900 italic">How I Decided on My Major</h4>
                </div>
                <p className="text-slate-500 text-lg leading-relaxed mb-10 italic">
                  {selectedStory.storyPreview}
                </p>
                <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 mb-10 relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <GraduationCap className="w-24 h-24" />
                  </div>
                  <h5 className="font-black text-blue-900 text-xl mb-4 italic flex items-center">
                    <Sparkles className="w-5 h-5 mr-3 text-[#ffcc00]" />
                    Words of Wisdom
                  </h5>
                  <p className="text-blue-800 italic leading-relaxed font-medium">"{selectedStory.fullStory}"</p>
                </div>
              </div>

              <div className="mt-14 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    setSelectedStory(null);
                    onNavigate(AppSection.OPPORTUNITIES);
                  }}
                  className="flex-1 py-5 bg-[#009fe3] text-white rounded-2xl font-black hover:bg-blue-600 transition shadow-xl flex items-center justify-center space-x-3"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Connect with {selectedStory.name.split(' ')[0]}</span>
                </button>
                <button 
                  onClick={() => {
                    alert('Journey bookmarked!');
                    setSelectedStory(null);
                  }}
                  className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black hover:border-blue-200 hover:text-blue-900 transition flex items-center justify-center space-x-3"
                >
                  <Bookmark className="w-5 h-5" />
                  <span>Save Journey</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MajorDiscovery;
