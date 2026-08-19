import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
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
} from 'lucide-react';

interface BentoSidebarProps {
  onCloseMobile?: () => void;
}

export const BentoSidebar: React.FC<BentoSidebarProps> = ({ onCloseMobile }) => {
  const {
    currentUser,
    currentView,
    setCurrentView,
    setIsAIModalOpen,
    setAiPromptPreset,
    setIsAuthModalOpen,
    switchRole,
  } = useApp();

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    if (onCloseMobile) onCloseMobile();
  };

  const navItems = [
    { label: 'Trang chủ', view: 'home' as AppView, icon: <Home className="w-5 h-5" /> },
    { label: 'Thư viện', view: 'library' as AppView, icon: <LayoutGrid className="w-5 h-5" /> },
    { label: 'Dòng thời gian', view: 'timeline' as AppView, icon: <Clock className="w-5 h-5" /> },
    { label: 'Chủ đề', view: 'categories' as AppView, icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'Tủ sách cá nhân', view: 'personal' as AppView, icon: <Bookmark className="w-5 h-5" /> },
  ];

  return (
    <aside
      id="bento-sidebar"
      className="w-20 bg-[#002D56] flex flex-col items-center py-6 gap-6 shadow-xl shrink-0 select-none z-30 min-h-screen"
    >
      {/* Brand Icon Logo */}
      <button
        onClick={() => handleNav(currentUser ? 'home' : 'landing')}
        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 shadow-md hover:scale-105 transition-transform group focus:outline-none"
        title="FPT History Library"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#F37021" strokeWidth="2.5" className="w-full h-full">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      </button>

      {/* Main Navigation Vertical List */}
      <nav className="flex flex-col gap-3 text-white/60 w-full items-center px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              id={`sidebar-nav-${item.view}`}
              onClick={() => handleNav(item.view)}
              className={`p-3 rounded-2xl transition-all relative group flex items-center justify-center ${
                isActive
                  ? 'bg-white/20 text-white shadow-inner font-bold'
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
              title={item.label}
            >
              {item.icon}
              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#F37021]" />
              )}
            </button>
          );
        })}

        {/* Teacher portal shortcut */}
        {currentUser?.role === 'teacher' && (
          <button
            onClick={() => handleNav('teacher')}
            className={`p-3 rounded-2xl transition-all ${
              currentView === 'teacher' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:bg-white/10'
            }`}
            title="Cổng Giáo viên"
          >
            <UserCheck className="w-5 h-5" />
          </button>
        )}

        {/* Admin portal shortcut */}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => handleNav('admin')}
            className={`p-3 rounded-2xl transition-all ${
              currentView === 'admin' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-white/10'
            }`}
            title="Bảng Quản trị"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>
        )}
      </nav>

      {/* Quick AI Trigger Button */}
      <div className="pt-2">
        <button
          onClick={() => {
            setAiPromptPreset('Tóm tắt các sự kiện trọng tâm Lịch sử 12');
            setIsAIModalOpen(true);
          }}
          className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#F37021] to-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
          title="Trợ lý AI History"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </button>
      </div>

      {/* Bottom Profile / Role actions */}
      <div className="mt-auto flex flex-col items-center gap-3">
        {currentUser ? (
          <button
            onClick={() => switchRole('guest')}
            className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-colors"
            title="Đăng xuất / Quay về Landing Page"
          >
            <LogOut className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-2xl transition-colors"
            title="Đăng nhập"
          >
            <UserCheck className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
};
