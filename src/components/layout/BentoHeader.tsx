import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Sparkles,
  ChevronDown,
  GraduationCap,
  UserCheck,
  ShieldAlert,
  LogIn,
  LogOut,
  Menu,
  User as UserIcon,
  Settings,
  BookOpen,
  Mail,
} from 'lucide-react';

interface BentoHeaderProps {
  onToggleMobileSidebar: () => void;
}

export const BentoHeader: React.FC<BentoHeaderProps> = ({ onToggleMobileSidebar }) => {
  const {
    currentUser,
    switchRole,
    logoutUser,
    searchQuery,
    setSearchQuery,
    setCurrentView,
    setIsAuthModalOpen,
    setIsProfileModalOpen,
    setIsAIModalOpen,
    setAiPromptPreset,
  } = useApp();

  const [headerSearch, setHeaderSearch] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      setSearchQuery(headerSearch.trim());
      setCurrentView('library');
    }
  };

  return (
    <header className="flex items-center justify-between gap-3 sm:gap-6 pb-2">
      {/* Mobile hamburger button */}
      <button
        onClick={onToggleMobileSidebar}
        className="md:hidden p-2.5 rounded-2xl bg-white border border-gray-200 text-[#002D56] shadow-xs cursor-pointer"
        aria-label="Mở menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Bento-styled Top Search Bar */}
      <div className="flex-1 relative max-w-2xl">
        <form onSubmit={handleSearchSubmit}>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </span>
          <input
            id="bento-header-search"
            type="text"
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            placeholder="Tìm kiếm tài liệu Lịch sử: THCS, THPT, Đề thi, Sơ đồ tư duy..."
            className="w-full pl-11 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-[#F37021]/20 focus:border-[#F37021] text-xs sm:text-sm text-[#333] transition-all"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* AI Assistant Quick Button */}
        <button
          onClick={() => {
            setAiPromptPreset('Tóm tắt các kiến thức Lịch sử trọng tâm');
            setIsAIModalOpen(true);
          }}
          className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl bg-[#002D56] hover:bg-[#002242] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F37021] animate-pulse" />
          <span className="hidden sm:inline">Hỏi AI History</span>
        </button>

        {/* User Account & Profile Menu */}
        {currentUser ? (
          <div className="relative">
            <button
              id="user-profile-menu-btn"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-white border border-gray-200 hover:border-[#F37021] shadow-xs transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F37021] flex items-center justify-center text-white font-black text-xs overflow-hidden shadow-xs ring-1 ring-orange-200">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{currentUser.name.charAt(0).toUpperCase()}</span>
                )}
              </div>

              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-[#002D56] leading-tight flex items-center gap-1">
                  <span>{currentUser.name}</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-orange-100 text-[#F37021] text-[9px] font-extrabold uppercase">
                    {currentUser.role === 'admin'
                      ? 'Admin'
                      : currentUser.role === 'teacher'
                      ? 'Giáo viên'
                      : `Khối ${currentUser.grade}`}
                  </span>
                </p>
                <p className="text-[10px] text-gray-500 truncate max-w-[140px]">{currentUser.email}</p>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-[#002D56]">{currentUser.name}</p>
                  <p className="text-[11px] text-gray-500">{currentUser.email}</p>
                  <p className="text-[10px] text-[#F37021] font-semibold mt-0.5">{currentUser.school || 'FPT Education'}</p>
                </div>

                <button
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-orange-50 text-[#002D56] font-medium cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-[#F37021]" />
                  <span>Hồ sơ & Đổi khối lớp / vai trò</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('personal');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-orange-50 text-[#002D56] font-medium cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Tài liệu & Ghi chú của tôi</span>
                </button>

                <div className="my-1 border-t border-gray-100" />

                {/* Quick Role Toggle */}
                <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Chuyển quyền nhanh
                </div>
                <button
                  onClick={() => {
                    switchRole('student');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-1.5 text-left text-xs flex items-center space-x-2 hover:bg-gray-50 text-gray-700 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-orange-500" />
                  <span>Học sinh</span>
                </button>
                <button
                  onClick={() => {
                    switchRole('teacher');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-1.5 text-left text-xs flex items-center space-x-2 hover:bg-gray-50 text-gray-700 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Giáo viên</span>
                </button>
                <button
                  onClick={() => {
                    switchRole('admin');
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-1.5 text-left text-xs flex items-center space-x-2 hover:bg-gray-50 text-gray-700 cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                  <span>Quản trị viên</span>
                </button>

                <div className="my-1 border-t border-gray-100" />

                <button
                  onClick={() => {
                    logoutUser();
                    setIsProfileDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-red-50 text-red-600 font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-[#F37021] hover:bg-[#e06216] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Đăng nhập Email</span>
          </button>
        )}
      </div>
    </header>
  );
};
