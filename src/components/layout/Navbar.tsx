import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  BookOpen,
  Search,
  Clock,
  LayoutGrid,
  Bookmark,
  Sparkles,
  UserCheck,
  ShieldAlert,
  GraduationCap,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,
  X,
  PlusCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchRole,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    setIsAuthModalOpen,
    setIsAIModalOpen,
    setAiPromptPreset,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      setSearchQuery(navSearchInput.trim());
      setCurrentView('library');
    }
  };

  const navItems: { label: string; view: AppView; icon: React.ReactNode }[] = [
    { label: 'Trang chủ', view: 'home', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Thư viện', view: 'library', icon: <LayoutGrid className="w-4 h-4" /> },
    { label: 'Dòng thời gian', view: 'timeline', icon: <Clock className="w-4 h-4" /> },
    { label: 'Chủ đề', view: 'categories', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Tủ sách', view: 'personal', icon: <Bookmark className="w-4 h-4" /> },
  ];

  return (
    <header id="main-navbar" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Brand & Utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-button"
              onClick={() => setCurrentView(currentUser ? 'home' : 'landing')}
              className="flex items-center space-x-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-xl tracking-tighter">FPT</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">History Library</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
                    THPT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">Khám phá lịch sử – Kiến tạo tương lai</p>
              </div>
            </button>
          </div>

          {/* Search bar on desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <form onSubmit={handleNavSearch} className="relative w-full">
              <input
                id="navbar-search-input"
                type="text"
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                placeholder="Tìm tài liệu, bài tập, đề thi Lịch sử..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-orange-500 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Quick Role Switcher Pill & AI Assistant */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Assistant Button */}
            <button
              id="navbar-ai-assistant-btn"
              onClick={() => {
                setAiPromptPreset('Tóm tắt các sự kiện trọng tâm Lịch sử 12');
                setIsAIModalOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm hover:shadow-orange-500/25 hover:opacity-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">Trợ lý</span> <span>AI History</span>
            </button>

            {/* Quick Role Switcher for Demo testing */}
            <div className="relative">
              <button
                id="role-switch-dropdown-btn"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                title="Chuyển đổi nhanh vai trò người dùng để trải nghiệm"
              >
                {currentUser?.role === 'admin' ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                ) : currentUser?.role === 'teacher' ? (
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                ) : currentUser ? (
                  <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                ) : (
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span className="font-semibold capitalize">
                  {currentUser?.role === 'admin'
                    ? 'Admin'
                    : currentUser?.role === 'teacher'
                    ? 'Giáo viên'
                    : currentUser
                    ? 'Học sinh'
                    : 'Khách'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRoleDropdownOpen && (
                <div
                  id="role-dropdown-menu"
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Chuyển vai trò Demo
                  </div>
                  <button
                    onClick={() => {
                      switchRole('student');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-orange-50 ${
                      currentUser?.role === 'student' ? 'text-orange-600 font-semibold bg-orange-50/60' : 'text-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="font-medium">Học sinh (Nguyễn Hoàng Nam)</div>
                      <div className="text-[10px] text-slate-400">Lớp 12 - Học & Đọc tài liệu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchRole('teacher');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-blue-50 ${
                      currentUser?.role === 'teacher' ? 'text-blue-600 font-semibold bg-blue-50/60' : 'text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-medium">Giáo viên (Cô Mai Phương)</div>
                      <div className="text-[10px] text-slate-400">Đăng & Quản lý bài giảng</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-purple-50 ${
                      currentUser?.role === 'admin' ? 'text-purple-600 font-semibold bg-purple-50/60' : 'text-slate-700'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-500" />
                    <div>
                      <div className="font-medium">Quản trị viên (Admin Thư viện)</div>
                      <div className="text-[10px] text-slate-400">Duyệt tài liệu, thống kê & user</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      switchRole('guest');
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-slate-50 text-slate-600"
                  >
                    <LogOut className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="font-medium">Đăng xuất / Trang Giới thiệu</div>
                      <div className="text-[10px] text-slate-400">Chế độ Landing page</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Auth / Avatar button */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-orange-500 ring-2 ring-orange-500/20"
                />
              </div>
            ) : (
              <button
                id="navbar-login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Đăng nhập
              </button>
            )}

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Mở menu điều hướng"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links bar */}
        <nav className="hidden md:flex items-center space-x-1 py-1.5 border-t border-slate-100">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                id={`nav-link-${item.view}`}
                onClick={() => setCurrentView(item.view)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Special role portals */}
          {currentUser?.role === 'teacher' && (
            <button
              id="nav-link-teacher"
              onClick={() => setCurrentView('teacher')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentView === 'teacher'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Quản lý Giáo viên</span>
            </button>
          )}

          {currentUser?.role === 'admin' && (
            <button
              id="nav-link-admin"
              onClick={() => setCurrentView('admin')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentView === 'admin'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Bảng Quản trị Admin</span>
            </button>
          )}
        </nav>
      </div>

      {/* Mobile navigation drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          <form onSubmit={handleNavSearch} className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                placeholder="Tìm tài liệu Lịch sử..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </form>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 p-2.5 rounded-lg text-sm font-medium ${
                  currentView === item.view ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {currentUser?.role === 'teacher' && (
            <button
              onClick={() => {
                setCurrentView('teacher');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Cổng Giáo viên</span>
            </button>
          )}

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => {
                setCurrentView('admin');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 p-2.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Bảng Quản trị Admin</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
