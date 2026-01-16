
import React, { useState, useMemo } from 'react';
import { UPCOMING_EVENTS } from '../constants';
import { 
  Calendar, MapPin, Clock, Tag, ChevronRight, Search, 
  Share2, Plus, X, Check, Send, Sparkles, Globe, 
  MessageSquare, User
} from 'lucide-react';

const Events: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'propose' | 'host'>('propose');

  const categories = ['All', 'Cultural', 'Academic', 'Networking', 'Social'];

  const filteredEvents = useMemo(() => {
    return UPCOMING_EVENTS.filter(event => {
      const matchesCategory = filter === 'All' || event.category === filter;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchTerm]);

  const toggleRegistration = (eventId: string) => {
    setRegisteredEvents(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const handleShare = async (title: string, text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MSU Global Event: ${title}`,
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.debug('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(`${title}: ${text} - Check it out at MSU Global Hub!`);
      alert('Event details copied to clipboard!');
    }
  };

  const openModal = (type: 'propose' | 'host') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Cultural': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Academic': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Networking': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Social': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3 mb-3">
             <Calendar className="w-6 h-6 text-[#009fe3]" />
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Community Hub</span>
          </div>
          <h3 className="text-4xl font-black text-blue-900 mb-2 uppercase italic tracking-tight">Upcoming Events</h3>
          <p className="text-slate-500 font-medium leading-relaxed">
            Stay connected with the global community. Join workshops, cultural tours, and networking sessions designed to elevate your MSU experience.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 transition shadow-sm w-full sm:w-64"
              />
           </div>
           <button 
             onClick={() => openModal('propose')}
             className="bg-blue-900 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg hover:bg-blue-800 transition flex items-center justify-center space-x-2 whitespace-nowrap"
           >
              <Plus className="w-4 h-4 text-yellow-400" />
              <span>Propose Event</span>
           </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              filter === cat 
                ? 'bg-blue-900 text-white border-blue-900 shadow-md scale-105' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200 hover:text-blue-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map(event => {
          const isRegistered = registeredEvents.has(event.id);
          return (
            <div key={event.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6">
                   <div className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm ${getCategoryColor(event.category)}`}>
                      {event.category}
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                   <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl text-blue-900 flex flex-col items-center min-w-[50px]">
                      <span className="text-[8px] font-black uppercase tracking-widest leading-none mb-1 opacity-60">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-black leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                   </div>
                   <h4 className="text-white text-2xl font-black italic uppercase tracking-tighter leading-tight drop-shadow-md">{event.title}</h4>
                </div>
              </div>
              
              <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center space-x-3 text-slate-500">
                      <div className="p-2 bg-slate-50 rounded-lg"><Clock className="w-3.5 h-3.5 text-blue-500" /></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{event.time}</span>
                   </div>
                   <div className="flex items-center space-x-3 text-slate-500">
                      <div className="p-2 bg-slate-50 rounded-lg"><MapPin className="w-3.5 h-3.5 text-blue-500" /></div>
                      <span className="text-[10px] font-black uppercase tracking-widest truncate">{event.location}</span>
                   </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed font-medium flex-1">
                  {event.description}
                </p>

                <div className="flex items-center space-x-4 pt-4">
                  <button 
                    onClick={() => toggleRegistration(event.id)}
                    className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center space-x-3 ${
                      isRegistered 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-900 text-white hover:bg-blue-800'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Registered</span>
                      </>
                    ) : (
                      <>
                        <span>Register Interest</span>
                        <ChevronRight className="w-4 h-4 text-yellow-400" />
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => handleShare(event.title, event.description)}
                    className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-900 hover:bg-blue-50 transition-colors shadow-sm"
                  >
                     <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
             <Calendar className="w-12 h-12 text-slate-200 mx-auto" />
             <p className="text-slate-400 font-bold uppercase tracking-widest">No events found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Community Spotlight CTA */}
      <section className="bg-gradient-to-br from-blue-900 to-[#009fe3] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group mt-12">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
           <Calendar className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
           <div className="max-w-xl space-y-6">
              <h4 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-tight">Bring the World to your Campus</h4>
              <p className="text-blue-100 text-lg font-medium leading-relaxed opacity-90">
                 Are you an international student with a cultural story to tell? Or an alumni with industry secrets? Host a global webinar or a campus session today.
              </p>
              <div className="flex flex-wrap gap-4">
                 <button 
                   onClick={() => openModal('host')}
                   className="px-10 py-4 bg-yellow-400 text-blue-900 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all"
                 >
                   Host a Session
                 </button>
                 <a 
                   href="https://msu.ac.zw" 
                   target="_blank" 
                   className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all flex items-center space-x-2"
                 >
                   <span>Volunteer Handbook</span>
                   <ChevronRight className="w-4 h-4 text-yellow-400" />
                 </a>
              </div>
           </div>
           <div className="hidden lg:block w-72 h-72 bg-white/5 rounded-full border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                 <Tag className="w-24 h-24 text-white opacity-20 animate-pulse" />
              </div>
           </div>
        </div>
      </section>

      {/* Proposal/Hosting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-900/90 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative animate-scaleUp overflow-hidden shadow-2xl">
            <div className="bg-[#009fe3] p-10 text-white relative">
              <div className="flex items-center space-x-4 mb-3">
                 {modalType === 'propose' ? <Sparkles className="w-8 h-8 text-yellow-400" /> : <Globe className="w-8 h-8 text-yellow-400" />}
                 <h3 className="text-3xl font-black uppercase tracking-tighter italic">
                   {modalType === 'propose' ? 'Propose New Event' : 'Host a Global Session'}
                 </h3>
              </div>
              <p className="text-blue-100 font-bold opacity-90 leading-relaxed">
                {modalType === 'propose' 
                  ? 'Submit your ideas for community-driven events that celebrate global diversity at MSU.' 
                  : 'Share your expertise or cultural heritage with the global MSU student body.'}
              </p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-white/50 hover:text-white bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Request submitted to IAR Office!'); setIsModalOpen(false); }} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Session Title</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input type="text" placeholder="e.g. Regional Trade Insights" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Target Audience</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold appearance-none">
                       <option>All Students</option>
                       <option>International Only</option>
                       <option>Alumni Only</option>
                       <option>Final Year Students</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Description & Objectives</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-slate-300" />
                  <textarea 
                    placeholder="Briefly describe what attendees will learn or experience..." 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold min-h-[120px] resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-5 border-2 border-slate-100 text-slate-400 rounded-2xl font-black hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-blue-900 text-white rounded-2xl font-black hover:bg-blue-800 transition shadow-2xl flex items-center justify-center space-x-3"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Request</span>
                </button>
              </div>
              <p className="text-center text-[9px] text-slate-400 uppercase tracking-widest font-black pt-2">
                Processed via International & Alumni Relations Office (IRO)
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
