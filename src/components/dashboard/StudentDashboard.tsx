import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentType, SchoolLevel, GradeLevel } from '../../types';
import { THEME_CONFIGS } from '../../data/vietnamHistoryTheme';
import { VietnamHistoryQuoteBanner } from '../theme/VietnamHistoryQuoteBanner';
import { VietnamHistoryEraStrip } from '../theme/VietnamHistoryEraStrip';
import { DongSonDrumMotif } from '../theme/DongSonDrumMotif';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  PlayCircle,
  Clock,
  Bookmark,
  TrendingUp,
  Flame,
  Search,
  GraduationCap,
  Award,
  Newspaper,
  MessageSquare,
  Heart,
  Pin,
  PlusCircle,
  Scroll,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    documents,
    posts,
    readingHistory,
    bookmarks,
    favorites,
    currentTheme,
    setCurrentView,
    selectedSchoolLevel,
    setSelectedSchoolLevel,
    selectedGrade,
    setSelectedGrade,
    setSelectedType,
    setSelectedCategory,
    setSearchQuery,
    setActiveDetailDoc,
    setActiveReaderDoc,
    setActiveQuizDoc,
    setActivePostDetail,
    setIsCreatePostModalOpen,
    setIsAIModalOpen,
    setIsProfileModalOpen,
    setAiPromptPreset,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const [aiQuickInput, setAiQuickInput] = useState('');
  const activeThemeConfig = THEME_CONFIGS[currentTheme];

  const handleAiQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuickInput.trim()) {
      setAiPromptPreset(aiQuickInput.trim());
      setIsAIModalOpen(true);
      setAiQuickInput('');
    } else {
      setAiPromptPreset('Tóm tắt các kiến thức trọng tâm Lịch sử Việt Nam GDPT 2018');
      setIsAIModalOpen(true);
    }
  };

  // Find in-progress document
  const inProgressHistory = readingHistory[0];
  const inProgressDoc = inProgressHistory
    ? documents.find((d) => d.id === inProgressHistory.documentId)
    : null;

  // Grade recommended
  const userGrade = currentUser?.grade || '12';
  const isThcs = ['6', '7', '8', '9'].includes(userGrade);
  
  const recommendedDocs = documents
    .filter((d) => {
      if (selectedGrade !== 'all') {
        return d.grade === selectedGrade || d.grade === 'all';
      }
      if (selectedSchoolLevel === 'thcs') {
        return ['6', '7', '8', '9'].includes(d.grade) || d.grade === 'all';
      }
      if (selectedSchoolLevel === 'thpt') {
        return ['10', '11', '12'].includes(d.grade) || d.grade === 'all';
      }
      return d.grade === userGrade || d.grade === 'all';
    })
    .slice(0, 4);

  const handleCategoryClick = (type: DocumentType) => {
    setSelectedType(type);
    setCurrentView('library');
  };

  const latestPosts = posts.slice(0, 2);

  return (
    <div id="student-bento-dashboard" className="space-y-6 animate-in fade-in">
      {/* 1. Vietnam History Quotes Banner */}
      <VietnamHistoryQuoteBanner />

      {/* 2. Vietnam Historical Eras Strip */}
      <VietnamHistoryEraStrip />

      {/* 3. Primary Bento Grid Matrix */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Bento Tile 1: Hero Large Banner (Col 8) */}
        <div className={`lg:col-span-8 ${activeThemeConfig.headerBg} rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md flex flex-col justify-center text-white min-h-[230px]`}>
          {/* Dong Son Motif Background Accent */}
          <div className="absolute -right-8 -bottom-8 pointer-events-none">
            <DongSonDrumMotif size={240} opacity={0.18} color="#FEF3C7" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-[11px] font-bold mb-3 backdrop-blur-xs border border-white/10">
              <Scroll className="w-3.5 h-3.5 text-amber-300" />
              <span>Thư Viện Sử Việt • Hào Khí Đông A • GDPT 2018</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1.5 tracking-tight font-serif">
              Xin chào, {currentUser?.name || 'Học sinh FPT'}!
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 font-medium leading-relaxed max-w-lg">
              {currentUser?.school || 'FPT Education'} • Khối {userGrade === 'all' ? '12' : userGrade} {isThcs ? '(Cấp THCS)' : '(Cấp THPT)'}. Cùng khám phá trang sử vàng chói lọi của dân tộc Việt Nam!
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <button
                id="hero-explore-library-btn"
                onClick={() => setCurrentView('library')}
                className="px-4 py-2 bg-[#FEF3C7] text-[#991B1B] hover:bg-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Kho Học Liệu Sử Việt</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('timeline')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center space-x-1.5 cursor-pointer backdrop-blur-xs border border-white/20"
              >
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Dòng Thời Gian Lịch Sử</span>
              </button>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs transition-all flex items-center space-x-1.5 cursor-pointer backdrop-blur-xs"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Đổi khối lớp ({userGrade})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bento Tile 2: User Rank & Quick Stats (Col 4) */}
        <div className="lg:col-span-4 bg-[#242220] text-white rounded-3xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#3E3A36]">
          <div className="absolute -right-6 -bottom-6 pointer-events-none">
            <DongSonDrumMotif size={140} opacity={0.1} color="#D97706" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#D97706]">
                Hồ Sơ Học Tập Sử Việt
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold">
                {currentUser?.role === 'admin' ? 'Quản trị viên' : currentUser?.role === 'teacher' ? 'Giáo viên' : 'Học sinh'}
              </span>
            </div>
            <h3 className="text-base font-extrabold">{currentUser?.name}</h3>
            <p className="text-xs text-amber-200/70">{currentUser?.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 my-3 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center">
              <div className="text-lg font-black text-amber-400">🔥 {currentUser?.streakDays || 9}</div>
              <div className="text-[10px] text-gray-300 font-medium">Ngày chuyên cần</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 text-center">
              <div className="text-lg font-black text-[#D97706]">📜 {readingHistory.length}</div>
              <div className="text-[10px] text-gray-300 font-medium">Tài liệu đã học</div>
            </div>
          </div>

          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold text-center text-amber-200 transition-all cursor-pointer relative z-10"
          >
            Tùy chỉnh thông tin hồ sơ
          </button>
        </div>

        {/* Bento Tile 3: AI Quick Assistant prompt (Col 4) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#4A0C0C] to-[#2B0707] rounded-3xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden border border-[#691111]">
          <div className="relative z-10 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-[#FCD34D] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#D97706]" />
              <span>Gemini AI Sử Việt</span>
            </div>
            <h3 className="text-white font-bold text-sm">Trợ lý AI Lịch Sử Việt Nam</h3>
            <p className="text-amber-100/70 text-[11px] leading-relaxed">
              Hỏi AI phân tích sự kiện, giải mã các triều đại, vẽ sơ đồ tư duy hoặc giải bài tập Lịch sử.
            </p>
          </div>

          <form onSubmit={handleAiQuickSubmit} className="relative z-10 mt-3">
            <input
              type="text"
              value={aiQuickInput}
              onChange={(e) => setAiQuickInput(e.target.value)}
              placeholder="Nhập câu hỏi (VD: Ý nghĩa chiến thắng Bạch Đằng 938)..."
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-amber-200/50 focus:outline-none transition-all"
            />
          </form>
        </div>

        {/* Bento Tile 4: Tiếp Tục Học (Col 8 on lg) */}
        <div className="lg:col-span-8 bg-[#FFFDF9] border border-[#EAE1D1] rounded-3xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-[#EAE1D1] pb-2">
            <h3 className="font-bold text-[#4A0C0C] text-sm flex items-center space-x-1.5 font-serif">
              <PlayCircle className="w-4 h-4 text-[#991B1B]" />
              <span>Tiếp Tục Học Tập</span>
            </h3>
            <span className="text-[10px] text-gray-500">
              {readingHistory.length > 0 ? `${readingHistory.length} tài liệu đang học` : 'Bắt đầu đọc tài liệu mới'}
            </span>
          </div>

          {inProgressDoc ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Item 1 */}
              <div
                onClick={() => setActiveReaderDoc(inProgressDoc, inProgressHistory.currentPage)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF6EE] hover:bg-amber-100/40 border border-[#EAE1D1] cursor-pointer transition-colors"
              >
                <div className="w-10 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0 border border-red-200">
                  <BookOpen className="w-5 h-5 text-[#991B1B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#4A0C0C] truncate">{inProgressDoc.title}</p>
                  <p className="text-[10px] text-gray-500">Trang {inProgressHistory.currentPage}/{inProgressHistory.totalPages}</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-[#991B1B] rounded-full" style={{ width: `${inProgressHistory.progress}%` }} />
                  </div>
                </div>
                <p className="text-[10px] font-black text-[#991B1B]">{inProgressHistory.progress}%</p>
              </div>

              {/* Item 2 */}
              {documents[1] && (
                <div
                  onClick={() => setActiveReaderDoc(documents[1], 1)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF6EE] hover:bg-amber-100/40 border border-[#EAE1D1] cursor-pointer transition-colors"
                >
                  <div className="w-10 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 border border-amber-200">
                    <FileText className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#4A0C0C] truncate">{documents[1].title}</p>
                    <p className="text-[10px] text-gray-500">Khối {documents[1].grade} • {documents[1].pagesCount} trang</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#D97706] rounded-full w-1/3" />
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-[#B45309]">Sẵn sàng</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-gray-500 font-serif italic">
              Hãy chọn một tài liệu trong Thư viện để bắt đầu hành trình tìm hiểu Lịch sử Việt Nam.
            </div>
          )}
        </div>

        {/* Bento Tile 5: 4-Category Bento Subgrid (Col 8) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => handleCategoryClick('exercise')}
            className="bg-[#FFFDF9] rounded-3xl p-4 shadow-2xs border border-[#EAE1D1] flex flex-col items-center justify-center text-center hover:border-[#991B1B] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-[#991B1B] group-hover:text-white transition-all text-[#991B1B]">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-[#4A0C0C]">Trắc Nghiệm Lịch Sử</p>
            <p className="text-[10px] text-gray-500">THCS & THPT</p>
          </div>

          <div
            onClick={() => handleCategoryClick('outline')}
            className="bg-[#FFFDF9] rounded-3xl p-4 shadow-2xs border border-[#EAE1D1] flex flex-col items-center justify-center text-center hover:border-[#D97706] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-[#D97706] group-hover:text-white transition-all text-[#D97706]">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-[#4A0C0C]">Đề Cương & Mindmap</p>
            <p className="text-[10px] text-gray-500">Kiến thức cô đọng</p>
          </div>

          <div
            onClick={() => handleCategoryClick('exam')}
            className="bg-[#FFFDF9] rounded-3xl p-4 shadow-2xs border border-[#EAE1D1] flex flex-col items-center justify-center text-center hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-700">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-[#4A0C0C]">Đề Thi & Khảo Sát</p>
            <p className="text-[10px] text-gray-500">Giữa kỳ, Cuối kỳ & TN</p>
          </div>

          <div
            onClick={() => setCurrentView('ebooks')}
            className="bg-[#FFFDF9] rounded-3xl p-4 shadow-2xs border border-[#EAE1D1] flex flex-col items-center justify-center text-center hover:border-[#F37021] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-[#F37021] group-hover:text-white transition-all text-[#F37021]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-[#002D56]">Sách Tham Khảo & Ebook</p>
            <p className="text-[10px] text-gray-500">Chính sử & Khảo cứu 9+</p>
          </div>
        </div>

        {/* Bento Tile 6: Quick Stats Bar (Col 4) */}
        <div className="lg:col-span-4 bg-[#FFFDF9] border border-[#EAE1D1] rounded-3xl p-4 shadow-2xs flex items-center justify-between px-6">
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Tài liệu đã đọc</p>
            <p className="text-2xl font-black text-[#4A0C0C]">{readingHistory.length}</p>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Yêu thích</p>
            <p className="text-2xl font-black text-[#991B1B]">{favorites.length}</p>
          </div>
          <div className="h-8 w-px bg-amber-200" />
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Chuỗi chuyên cần</p>
            <p className="text-2xl font-black text-emerald-600">{currentUser?.streakDays || 9} ngày</p>
          </div>
        </div>
      </section>

      {/* 4. Bảng tin Lịch sử Mới nhất (Newsfeed Widget) */}
      <section className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#EAE1D1] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE1D1] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-[#991B1B] flex items-center justify-center">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#4A0C0C]">
                Bảng Tin Lịch Sử & Thảo Luận Mới Nhất
              </h2>
              <p className="text-[11px] text-gray-500">Cập nhật thông báo từ Quản trị viên & Giáo viên Sử học</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCreatePostModalOpen(true)}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-[#991B1B] text-xs font-bold rounded-xl flex items-center space-x-1 transition-colors cursor-pointer border border-red-200"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng bài</span>
            </button>
            <button
              onClick={() => setCurrentView('newsfeed')}
              className="text-xs font-bold text-[#991B1B] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Xem tất cả ({posts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePostDetail(post)}
              className="p-4 rounded-2xl bg-[#FAF6EE] hover:bg-amber-100/40 border border-[#EAE1D1] hover:border-[#991B1B]/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-[#4A0C0C]">{post.authorName}</span>
                    <span className="px-1.5 py-0.2 rounded bg-red-100 text-[#991B1B] font-extrabold uppercase text-[8px]">
                      {post.authorRole}
                    </span>
                  </div>
                  {post.isPinned && (
                    <span className="flex items-center text-amber-700 font-bold text-[9px]">
                      <Pin className="w-3 h-3 rotate-45 mr-0.5" /> Ghim
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[#4A0C0C] line-clamp-1 mb-1">
                  {post.title}
                </h3>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-[#EAE1D1] flex items-center justify-between text-[11px] text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1 text-rose-500 font-semibold">
                    <Heart className="w-3 h-3 fill-rose-500" />
                    <span>{post.likesCount}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-blue-600 font-semibold">
                    <MessageSquare className="w-3 h-3" />
                    <span>{post.commentsCount} phản hồi</span>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#991B1B]">Xem chi tiết →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Secondary Bento Grid: Đề xuất học tập */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#4A0C0C] flex items-center space-x-2 font-serif">
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              <span>Học Liệu Lịch Sử Trọng Tâm (GDPT 2018)</span>
            </h2>
            <p className="text-xs text-gray-500">Dành cho Khối {userGrade === 'all' ? 'THCS & THPT' : userGrade}</p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Level Filters on Dashboard */}
            <button
              onClick={() => {
                setSelectedSchoolLevel('thcs');
                setSelectedGrade('all');
                setCurrentView('library');
              }}
              className="px-3 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#92400E] text-xs font-bold transition-all cursor-pointer border border-amber-200"
            >
              Khối THCS (6-9)
            </button>
            <button
              onClick={() => {
                setSelectedSchoolLevel('thpt');
                setSelectedGrade('all');
                setCurrentView('library');
              }}
              className="px-3 py-1 rounded-xl bg-red-50 hover:bg-red-100 text-[#991B1B] text-xs font-bold transition-all cursor-pointer border border-red-200"
            >
              Khối THPT (10-12)
            </button>
            <button
              onClick={() => setCurrentView('library')}
              className="text-xs font-bold text-[#991B1B] hover:underline flex items-center space-x-1 cursor-pointer ml-2"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Recommended Documents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedDocs.map((doc) => {
            const isFav = isFavorite(doc.id);
            return (
              <div
                key={doc.id}
                id={`recommended-doc-${doc.id}`}
                className="bg-[#FFFDF9] rounded-3xl p-4 border border-[#EAE1D1] shadow-2xs hover:shadow-md hover:border-[#991B1B] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div
                    onClick={() => setActiveDetailDoc(doc)}
                    className="relative aspect-video rounded-2xl overflow-hidden mb-3 bg-amber-50 cursor-pointer"
                  >
                    <img
                      src={doc.thumbnailUrl}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#4A0C0C]/80 backdrop-blur-xs text-white text-[9px] font-extrabold uppercase">
                      {doc.type === 'exercise'
                        ? 'Trắc nghiệm'
                        : doc.type === 'outline'
                        ? 'Đề cương'
                        : doc.type === 'exam'
                        ? 'Đề thi'
                        : 'Ebook'}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(doc.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-600 transition-colors cursor-pointer"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-[#991B1B] text-[#991B1B]' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[10px] text-gray-500 mb-1">
                    <span className="font-bold text-[#991B1B]">Khối {doc.grade}</span>
                    <span>•</span>
                    <span>{doc.pagesCount} trang</span>
                    <span>•</span>
                    <span>⭐ {doc.rating}</span>
                  </div>

                  <h3
                    onClick={() => setActiveDetailDoc(doc)}
                    className="font-bold text-xs sm:text-sm text-[#4A0C0C] group-hover:text-[#991B1B] transition-colors line-clamp-2 cursor-pointer mb-2"
                  >
                    {doc.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-[#EAE1D1] flex items-center justify-between">
                  <button
                    onClick={() => setActiveReaderDoc(doc, 1)}
                    className="px-3 py-1.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Đọc ngay</span>
                  </button>

                  <button
                    onClick={() => setActiveDetailDoc(doc)}
                    className="text-xs font-bold text-gray-500 hover:text-[#991B1B] transition-colors cursor-pointer"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
