import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { THEME_CONFIGS } from '../../data/vietnamHistoryTheme';
import { DongSonDrumMotif } from '../theme/DongSonDrumMotif';
import { ChimLacCraneMotif } from '../theme/ChimLacCraneMotif';
import { LyTranDragonMotif } from '../theme/LyTranDragonMotif';
import {
  BookOpen,
  LayoutGrid,
  Clock,
  GraduationCap,
  Bookmark,
  Sparkles,
  UserCheck,
  ShieldAlert,
  LogOut,
  PlusCircle,
  Home,
  Newspaper,
  Scroll,
  Library,
} from 'lucide-react';

interface BentoSidebarProps {
  onCloseMobile?: () => void;
}

export const BentoSidebar: React.FC<BentoSidebarProps> = ({ onCloseMobile }) => {
  const {
    currentUser,
    currentView,
    setCurrentView,
    currentTheme,
    setIsAIModalOpen,
    setAiPromptPreset,
    switchRole,
  } = useApp();

  const activeThemeConfig = THEME_CONFIGS[currentTheme] || THEME_CONFIGS['fpt-heritage'];

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    if (onCloseMobile) onCloseMobile();
  };

  // Main navigation items: "Sách Tham Khảo & Sách Điện Tử" on the left toolbar
  const navItems: { label: string; view: AppView; icon: React.ReactNode; badge?: string }[] = [
    { label: 'Trang chủ', view: 'home', icon: <Home className="w-5 h-5" /> },
    { label: 'Thư viện Học liệu', view: 'library', icon: <LayoutGrid className="w-5 h-5" /> },
    {
      label: 'Sách Tham Khảo & Ebook',
      view: 'ebooks',
      icon: <BookOpen className="w-5 h-5" />,
      badge: 'Mới',
    },
    { label: 'Bảng tin Lịch sử', view: 'newsfeed', icon: <Newspaper className="w-5 h-5" /> },
    { label: 'Dòng thời gian', view: 'timeline', icon: <Clock className="w-5 h-5" /> },
    { label: 'Thời kỳ & Chủ đề', view: 'categories', icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'Tủ sách cá nhân', view: 'personal', icon: <Bookmark className="w-5 h-5" /> },
  ];

  return (
    <aside
      id="bento-sidebar"
      className="w-20 bg-[#002D56] flex flex-col items-center py-5 gap-5 shadow-2xl shrink-0 select-none z-30 min-h-screen relative overflow-hidden transition-all duration-300 border-r border-[#F37021]/30"
    >
      {/* 1. Background Motif: Trống Đồng Đông Sơn Watermark */}
      <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-20">
        <DongSonDrumMotif size={150} color="#F37021" />
      </div>

      {/* 2. Background Motif: Rồng thời Lý uốn lượn chìm */}
      <div className="absolute top-24 -right-10 pointer-events-none opacity-15">
        <LyTranDragonMotif type="ly" size={120} color="#F37021" />
      </div>

      {/* 3. Brand Icon Logo: FPT Education + Chim Lạc Sử Việt */}
      <button
        id="sidebar-brand-logo-btn"
        onClick={() => handleNav(currentUser ? 'home' : 'landing')}
        className="w-13 h-13 bg-white rounded-2xl flex flex-col items-center justify-center p-1 shadow-lg hover:scale-105 transition-all group focus:outline-none cursor-pointer relative z-10 border-2 border-[#F37021]"
        title="FPT History Library - Khám phá lịch sử, Kiến tạo tương lai"
      >
        <div className="flex items-center space-x-0.5">
          <span className="text-[#F37021] font-black text-xs leading-none">FPT</span>
        </div>
        <div className="flex items-center justify-center mt-0.5">
          <ChimLacCraneMotif size={22} color="#002D56" />
        </div>
      </button>

      {/* 4. Main Navigation Vertical List */}
      <nav className="flex flex-col gap-2.5 text-white/70 w-full items-center px-2 relative z-10">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              id={`sidebar-nav-${item.view}`}
              onClick={() => handleNav(item.view)}
              className={`p-3 rounded-2xl transition-all relative group flex items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-[#F37021] text-white shadow-md shadow-[#F37021]/30 font-bold scale-105'
                  : 'hover:bg-white/10 text-white/80 hover:text-white'
              }`}
              title={item.label}
            >
              {item.icon}

              {/* Badge for Ebooks */}
              {item.badge && !isActive && (
                <span className="absolute -top-1 -right-1 px-1 py-0.2 bg-[#F37021] text-white text-[8px] font-black rounded-full uppercase scale-90">
                  {item.badge}
                </span>
              )}

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-white rounded-l-full" />
              )}

              {/* Floating Tooltip on Hover */}
              <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#001f3d] text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 border border-[#F37021]/40">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Divider with Dong Son motif accent */}
        <div className="w-8 h-px bg-white/20 my-1" />

        {/* Teacher portal shortcut */}
        {currentUser?.role === 'teacher' && (
          <button
            onClick={() => handleNav('teacher')}
            className={`p-3 rounded-2xl transition-all cursor-pointer relative group ${
              currentView === 'teacher' ? 'bg-[#F37021] text-white' : 'text-amber-300 hover:bg-white/10'
            }`}
            title="Cổng Giáo viên"
          >
            <UserCheck className="w-5 h-5" />
            <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#001f3d] text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-amber-400/40">
              Cổng Giáo viên FPT
            </span>
          </button>
        )}

        {/* Admin portal shortcut */}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => handleNav('admin')}
            className={`p-3 rounded-2xl transition-all cursor-pointer relative group ${
              currentView === 'admin' ? 'bg-red-600 text-white' : 'text-red-300 hover:bg-white/10'
            }`}
            title="Bảng Quản trị"
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#001f3d] text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-red-500/40">
              Bảng Quản trị Thư viện
            </span>
          </button>
        )}
      </nav>

      {/* 5. Quick AI Trigger Button */}
      <div className="pt-1 relative z-10">
        <button
          id="sidebar-ai-assistant-btn"
          onClick={() => {
            setAiPromptPreset('Tóm tắt các sự kiện trọng tâm Lịch sử Việt Nam & Phân tích các bộ sách tham khảo');
            setIsAIModalOpen(true);
          }}
          className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#F37021] to-amber-400 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer ring-2 ring-white/30 group relative"
          title="Trợ lý AI Sử Việt"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-white" />
          <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#001f3d] text-white text-xs font-bold rounded-xl shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-[#F37021]/40">
            Gemini AI Lịch Sử
          </span>
        </button>
      </div>

      {/* 6. Bottom Profile / Role actions */}
      <div className="mt-auto flex flex-col items-center gap-3 relative z-10">
        {currentUser ? (
          <button
            onClick={() => switchRole('guest')}
            className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-colors cursor-pointer"
            title="Đăng xuất tài khoản"
          >
            <LogOut className="w-5 h-5" />
          </button>
        ) : null}
      </div>
    </aside>
  );
};
