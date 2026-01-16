import React, { useState, useEffect } from 'react';
import { AppSection } from '../types';
import { User, Bookmark, MessageSquare, ChevronRight, Settings, Star, ArrowUpRight, Globe, X, Save, Mail, MapPin, GraduationCap, Phone, FileText } from 'lucide-react';
import { getCurrentUser, updateUserProfile } from '../services/authService';
import { User as UserType } from '../types';

interface UserPortalProps {
  onNavigate: (section: AppSection) => void;
}

const UserPortal: React.FC<UserPortalProps> = ({ onNavigate }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserType>>({});

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      setEditData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        campus: currentUser.campus,
        major: currentUser.major,
        graduationYear: currentUser.graduationYear,
        phoneNumber: currentUser.phoneNumber,
        bio: currentUser.bio,
      });
    }
  }, []);

  const handleSave = () => {
    if (!user) return;
    try {
      const updatedUser = updateUserProfile(editData);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || 'U';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 font-bold">Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12 animate-fadeIn">
      {/* User Identity Cluster */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 bg-white p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-8">
           <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#ffcc00] flex items-center justify-center text-blue-900 text-3xl md:text-5xl font-black border-4 md:border-8 border-blue-50 shadow-inner">
                {getInitials(user.firstName, user.lastName)}
              </div>
              <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 md:w-7 md:h-7 rounded-full border-4 border-white"></div>
           </div>
           <div className="space-y-2">
              <h3 className="text-2xl md:text-4xl font-black text-blue-900 leading-none tracking-tighter">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs italic">
                {user.major || 'Student'} • {user.graduationYear ? `Class of ${user.graduationYear}` : 'MSU'}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-3 md:mt-4">
                 {user.campus && (
                   <span className="bg-blue-50 text-blue-600 text-[9px] md:text-[10px] font-black uppercase px-3 py-1 rounded-lg border border-blue-100">
                     {user.campus}
                   </span>
                 )}
                 {user.profileComplete && (
                   <span className="bg-yellow-50 text-yellow-700 text-[9px] md:text-[10px] font-black uppercase px-3 py-1 rounded-lg border border-yellow-100 flex items-center gap-1">
                     <Star className="w-2.5 h-2.5 fill-yellow-600" />
                     Profile Complete
                   </span>
                 )}
              </div>
           </div>
        </div>
        <div className="flex w-full md:w-auto gap-3">
           <button 
             onClick={() => setIsEditing(!isEditing)}
             className="flex-1 md:flex-none p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-900 hover:bg-slate-100 transition-colors flex justify-center"
           >
              <Settings className="w-6 h-6" />
           </button>
           <button 
             onClick={() => setIsEditing(!isEditing)}
             className="flex-[2] md:flex-none px-6 md:px-8 py-4 bg-blue-900 text-white rounded-2xl font-black shadow-xl hover:bg-blue-800 transition-transform active:scale-95 text-sm md:text-base"
           >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
           </button>
        </div>
      </div>

      {/* Profile Edit Modal/Form */}
      {isEditing && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">Edit Profile</h4>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-slate-400 hover:text-blue-900 hover:bg-slate-50 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="text"
                  value={editData.firstName || ''}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="text"
                  value={editData.lastName || ''}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Campus</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <select
                  value={editData.campus || ''}
                  onChange={(e) => setEditData({ ...editData, campus: e.target.value as UserType['campus'] })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                >
                  <option value="">Select Campus</option>
                  <option value="Gweru Main">Gweru Main</option>
                  <option value="Harare">Harare</option>
                  <option value="Zvishavane">Zvishavane</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Major/Program</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="text"
                  value={editData.major || ''}
                  onChange={(e) => setEditData({ ...editData, major: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Graduation Year</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="text"
                  value={editData.graduationYear || ''}
                  onChange={(e) => setEditData({ ...editData, graduationYear: e.target.value })}
                  placeholder="e.g. 2025"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="tel"
                  value={editData.phoneNumber || ''}
                  onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                  placeholder="+263 77 123 4567"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">Bio</label>
            <div className="relative">
              <FileText className="absolute left-4 top-5 w-5 h-5 text-slate-300" />
              <textarea
                value={editData.bio || ''}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-8 w-full py-5 bg-[#009fe3] text-white rounded-2xl font-black hover:bg-blue-800 transition shadow-xl flex items-center justify-center space-x-3"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 md:gap-10">
        <div className="space-y-10">
           {/* Section 1: Mentorship Links */}
           <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                 <h4 className="text-lg md:text-xl font-black text-blue-900 uppercase italic tracking-tighter flex items-center">
                    <MessageSquare className="w-5 h-5 mr-3 text-[#ffcc00]" />
                    Active Mentorship
                 </h4>
                 <button onClick={() => onNavigate(AppSection.OPPORTUNITIES)} className="text-[10px] font-black text-blue-500 uppercase flex items-center gap-1 hover:underline">
                    Browse More <ArrowUpRight className="w-3 h-3" />
                 </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[
                   { name: "Dr. Chipo Rugare", role: "Head of IRO", status: "Connected", avatar: "CR", color: "bg-blue-500" },
                   { name: "Tinashe Moyo", role: "Diplomat", status: "Requested", avatar: "TM", color: "bg-[#ffcc00]" }
                 ].map((c, i) => (
                   <div key={i} className="bg-white p-5 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-[#009fe3] transition-all">
                      <div className="flex items-center space-x-4">
                         <div className={`w-10 h-10 md:w-12 md:h-12 ${c.color} rounded-xl flex items-center justify-center font-black text-white text-sm md:text-base`}>{c.avatar}</div>
                         <div>
                            <p className="font-black text-blue-900 text-sm">{c.name}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{c.role}</p>
                         </div>
                      </div>
                      <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${c.status === 'Connected' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                        {c.status}
                      </span>
                   </div>
                 ))}
              </div>
           </section>

           {/* Section 2: Saved Content */}
           <section className="space-y-6">
              <div className="flex items-center border-b border-slate-200 pb-2">
                 <h4 className="text-lg md:text-xl font-black text-blue-900 uppercase italic tracking-tighter flex items-center">
                    <Bookmark className="w-5 h-5 mr-3 text-[#ffcc00]" />
                    Saved Journeys
                 </h4>
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                 <div className="p-6 md:p-8 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4 md:space-x-6">
                       <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="Journey" />
                       <div>
                          <p className="font-black text-blue-900 text-sm md:text-base leading-tight">Tinashe's Diplomatic Path</p>
                          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Saved 2 days ago</p>
                       </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                 </div>
                 <div className="p-4 flex items-center justify-center">
                    <button onClick={() => onNavigate(AppSection.GLOBAL_DISCOVERY)} className="text-[10px] font-black text-[#009fe3] uppercase hover:underline tracking-widest">Explore All Stories</button>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
