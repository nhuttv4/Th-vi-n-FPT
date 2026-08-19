import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BentoSidebar } from './components/layout/BentoSidebar';
import { BentoHeader } from './components/layout/BentoHeader';
import { Footer } from './components/layout/Footer';
import { THEME_CONFIGS } from './data/vietnamHistoryTheme';

// Dynamic Views
import { LandingPage } from './components/landing/LandingPage';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { LibraryView } from './components/library/LibraryView';
import { EbooksReferenceView } from './components/ebooks/EbooksReferenceView';
import { HistoryNewsfeedView } from './components/newsfeed/HistoryNewsfeedView';
import { TimelineView } from './components/timeline/TimelineView';
import { FeaturedCategoriesView } from './components/categories/FeaturedCategoriesView';
import { PersonalLibraryView } from './components/personal/PersonalLibraryView';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals & Toasts
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { DocumentDetailModal } from './components/library/DocumentDetailModal';
import { DocumentReaderModal } from './components/reader/DocumentReaderModal';
import { HistoryAIAssistantModal } from './components/ai/HistoryAIAssistantModal';
import { InteractiveQuizModal } from './components/quiz/InteractiveQuizModal';
import { CreatePostModal } from './components/newsfeed/CreatePostModal';
import { PostDetailModal } from './components/newsfeed/PostDetailModal';
import { AdminUploadDocumentModal } from './components/admin/AdminUploadDocumentModal';

const AppContent: React.FC = () => {
  const { currentView, currentTheme } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const activeThemeConfig = THEME_CONFIGS[currentTheme] || THEME_CONFIGS['hao-khi-dong-a'];

  // If in landing view, render full landing page experience
  if (currentView === 'landing') {
    return (
      <div
        id="app-root"
        className={`min-h-screen flex flex-col ${activeThemeConfig.primaryBg} text-[#242220] font-sans selection:bg-[#991B1B] selection:text-white transition-colors duration-300`}
      >
        <LandingPage />
        <Footer />
        <ToastContainer />
        <AuthModal />
        <UserProfileModal />
        <DocumentDetailModal />
        <DocumentReaderModal />
        <HistoryAIAssistantModal />
        <InteractiveQuizModal />
        <CreatePostModal />
        <PostDetailModal />
        <AdminUploadDocumentModal />
      </div>
    );
  }

  return (
    <div
      id="app-root"
      className={`flex min-h-screen ${activeThemeConfig.primaryBg} text-[#242220] font-sans selection:bg-[#991B1B] selection:text-white antialiased transition-colors duration-300`}
    >
      {/* Desktop Left Bento Navigation Rail */}
      <div className="hidden md:flex shrink-0">
        <BentoSidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 flex">
            <BentoSidebar onCloseMobile={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <div className="p-3 sm:p-5 lg:p-7 flex-1 flex flex-col gap-5 max-w-[1600px] w-full mx-auto">
          {/* Bento Header with Search, Vietnam Theme Selector & Profile */}
          <BentoHeader onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)} />

          {/* Dynamic Active View */}
          <main className="flex-1">
            {currentView === 'home' && <StudentDashboard />}
            {currentView === 'library' && <LibraryView />}
            {currentView === 'ebooks' && <EbooksReferenceView />}
            {currentView === 'newsfeed' && <HistoryNewsfeedView />}
            {currentView === 'timeline' && <TimelineView />}
            {currentView === 'categories' && <FeaturedCategoriesView />}
            {currentView === 'personal' && <PersonalLibraryView />}
            {currentView === 'teacher' && <TeacherDashboard />}
            {currentView === 'admin' && <AdminDashboard />}
          </main>

          {/* Clean Bento Footer */}
          <Footer />
        </div>
      </div>

      {/* Global Interactive Modals & Toasts */}
      <ToastContainer />
      <AuthModal />
      <UserProfileModal />
      <DocumentDetailModal />
      <DocumentReaderModal />
      <HistoryAIAssistantModal />
      <InteractiveQuizModal />
      <CreatePostModal />
      <PostDetailModal />
      <AdminUploadDocumentModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
