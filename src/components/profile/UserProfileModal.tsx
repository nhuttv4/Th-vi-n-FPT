import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, GradeLevel } from '../../types';
import {
  X,
  User as UserIcon,
  Mail,
  School,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  Flame,
  Bookmark,
  LogOut,
  Camera,
} from 'lucide-react';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
];

export const UserProfileModal: React.FC = () => {
  const {
    currentUser,
    isProfileModalOpen,
    setIsProfileModalOpen,
    updateUserProfile,
    readingHistory,
    bookmarks,
    favorites,
    setCurrentUser,
    setCurrentView,
    showToast,
  } = useApp();

  const [name, setName] = useState(currentUser?.name || 'Nhựt TV');
  const [school, setSchool] = useState(currentUser?.school || 'FPT Education');
  const [grade, setGrade] = useState<GradeLevel>(currentUser?.grade || '12');
  const [role, setRole] = useState<UserRole>(currentUser?.role || 'student');
  const [avatar, setAvatar] = useState(currentUser?.avatar || AVATAR_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<'info' | 'stats'>('info');

  if (!isProfileModalOpen || !currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || currentUser.name,
      school: school.trim() || currentUser.school,
      grade,
      role,
      avatar,
    });
    if (role === 'teacher') {
      setCurrentView('teacher');
    } else if (role === 'admin') {
      setCurrentView('admin');
    }
    setIsProfileModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    setIsProfileModalOpen(false);
    showToast('Đã đăng xuất tài khoản.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div
        id="user-profile-modal"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-[#002D56] text-white p-6 relative">
          <button
            id="close-profile-modal-btn"
            onClick={() => setIsProfileModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl bg-[#F37021] overflow-hidden ring-4 ring-white/20 flex items-center justify-center text-xl font-extrabold text-white">
                {avatar ? (
                  <img src={avatar} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <span>{name.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold">{currentUser.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#F37021] text-white text-[10px] font-bold uppercase tracking-wider">
                  {currentUser.role === 'admin'
                    ? 'Admin Thư viện'
                    : currentUser.role === 'teacher'
                    ? 'Giáo viên'
                    : 'Học sinh'}
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">{currentUser.email}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 mt-5 border-t border-white/10 pt-4">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'info' ? 'bg-white text-[#002D56] shadow-xs' : 'text-blue-200 hover:text-white'
              }`}
            >
              Chỉnh sửa thông tin
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'stats' ? 'bg-white text-[#002D56] shadow-xs' : 'text-blue-200 hover:text-white'
              }`}
            >
              Thống kê học tập
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'info' ? (
            <form onSubmit={handleSave} className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Chọn ảnh đại diện</label>
                <div className="flex items-center space-x-3">
                  {AVATAR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatar(preset)}
                      className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                        avatar === preset ? 'border-[#F37021] scale-110 shadow-md ring-2 ring-orange-200' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt="avatar option" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Họ và tên</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white"
                  />
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email (Read only or verified) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email học đường FPT</label>
                <div className="relative">
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* School */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Trường học / Cơ sở</label>
                <div className="relative">
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="THPT FPT Hà Nội / THCS FPT..."
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white"
                  />
                  <School className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Role & Grade Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Vai trò sử dụng</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
                  >
                    <option value="student">Học sinh</option>
                    <option value="teacher">Giáo viên Lịch sử</option>
                    <option value="admin">Quản trị viên Thư viện</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Khối lớp học tập</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as GradeLevel)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
                  >
                    <optgroup label="Khối THCS">
                      <option value="6">Lớp 6</option>
                      <option value="7">Lớp 7</option>
                      <option value="8">Lớp 8</option>
                      <option value="9">Lớp 9</option>
                    </optgroup>
                    <optgroup label="Khối THPT">
                      <option value="10">Lớp 10</option>
                      <option value="11">Lớp 11</option>
                      <option value="12">Lớp 12 (Ôn thi tốt nghiệp)</option>
                    </optgroup>
                    <option value="all">Tất cả các khối</option>
                  </select>
                </div>
              </div>

              {/* Submit & Action buttons */}
              <div className="flex items-center space-x-3 pt-3">
                <button
                  type="submit"
                  id="save-profile-btn"
                  className="flex-1 py-3 px-4 bg-[#F37021] hover:bg-[#e06216] text-white font-bold rounded-xl shadow-md shadow-orange-500/20 text-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lưu thay đổi hồ sơ</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-3 px-4 border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-600 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 text-center">
                  <div className="w-8 h-8 rounded-xl bg-[#F37021] text-white flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-[#002D56]">{readingHistory.length}</div>
                  <div className="text-[11px] font-semibold text-gray-500 mt-0.5">Tài liệu đã đọc</div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-2">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-[#002D56]">{currentUser.completedQuizzes || 0}</div>
                  <div className="text-[11px] font-semibold text-gray-500 mt-0.5">Bài trắc nghiệm đã làm</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-2">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-[#002D56]">{currentUser.streakDays || 1} ngày</div>
                  <div className="text-[11px] font-semibold text-gray-500 mt-0.5">Chuỗi học tập liên tục</div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center mx-auto mb-2">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-[#002D56]">{bookmarks.length + favorites.length}</div>
                  <div className="text-[11px] font-semibold text-gray-500 mt-0.5">Ghi chú & Yêu thích</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#F37021]" />
                  <span className="text-xs font-bold text-[#002D56]">Huy hiệu & Thành tựu Lịch sử</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 text-[11px] font-semibold">
                    🎖️ Nhà Sử học Trẻ FPT
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-[11px] font-semibold">
                    ⭐ Độc giả tích cực
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                    🎯 Hoàn thành 100% mục tiêu tuần
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
