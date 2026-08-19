import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentType, SchoolLevel, GradeLevel } from '../../types';
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
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    documents,
    readingHistory,
    bookmarks,
    favorites,
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
    setIsAIModalOpen,
    setIsProfileModalOpen,
    setAiPromptPreset,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const [aiQuickInput, setAiQuickInput] = useState('');

  const handleAiQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuickInput.trim()) {
      setAiPromptPreset(aiQuickInput.trim());
      setIsAIModalOpen(true);
      setAiQuickInput('');
    } else {
      setAiPromptPreset('Tóm tắt các kiến thức Lịch sử trọng tâm GDPT 2018');
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

  return (
    <div id="student-bento-dashboard" className="space-y-6 animate-in fade-in">
      {/* Primary Bento Grid Matrix (12 Column Architecture) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Bento Tile 1: Hero Large Banner (Col 8) */}
        <div className="lg:col-span-8 bg-[#F37021] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs flex flex-col justify-center text-white min-h-[220px]">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-3 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Kho Tri Thức Số FPT Education • THCS & THPT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1.5 tracking-tight">
              Xin chào, {currentUser?.name || 'Học sinh FPT'}!
            </h1>
            <p className="text-base sm:text-lg opacity-95 font-light mb-5 italic">
              "Khám phá lịch sử – Kiến tạo tương lai"
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  if (inProgressDoc) {
                    setActiveReaderDoc(inProgressDoc, inProgressHistory?.currentPage || 1);
                  } else {
                    setCurrentView('library');
                  }
                }}
                className="bg-white text-[#F37021] px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:shadow-lg transition-all cursor-pointer"
              >
                Tiếp tục học ngay
              </button>
              <button
                onClick={() => setCurrentView('timeline')}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Khám phá Timeline
              </button>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="bg-black/20 hover:bg-black/30 text-white px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Đổi khối lớp ({userGrade === 'all' ? 'Tất cả' : `Khối ${userGrade}`})
              </button>
            </div>
          </div>

          {/* Decorative Motif */}
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden sm:block">
            <svg viewBox="0 0 24 24" className="w-52 h-52 text-white" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"></path>
            </svg>
          </div>
        </div>

        {/* Bento Tile 2: Timeline Nổi Bật (Col 4) */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
            <h3 className="font-bold text-[#002D56] text-sm flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-[#F37021]" />
              <span>Dấu ấn Lịch sử trọng tâm</span>
            </h3>
            <button
              onClick={() => setCurrentView('timeline')}
              className="text-[10px] text-[#F37021] font-bold uppercase tracking-wider hover:underline cursor-pointer"
            >
              Xem tất cả
            </button>
          </div>

          {/* Vertical Milestones */}
          <div className="flex-1 relative flex flex-col gap-4 pl-4 border-l-2 border-gray-100 py-1 my-1">
            <div
              onClick={() => setCurrentView('timeline')}
              className="relative cursor-pointer group"
            >
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[#F37021] rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
              <p className="text-xs font-bold text-[#002D56] group-hover:text-[#F37021]">1945</p>
              <p className="text-[11px] text-gray-500 line-clamp-1">Cách mạng Tháng Tám & Tuyên ngôn Độc lập</p>
            </div>

            <div
              onClick={() => setCurrentView('timeline')}
              className="relative opacity-75 hover:opacity-100 cursor-pointer group"
            >
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white group-hover:bg-[#002D56] group-hover:scale-125 transition-all" />
              <p className="text-xs font-bold text-[#002D56]">1954</p>
              <p className="text-[11px] text-gray-500 line-clamp-1">Chiến thắng Điện Biên Phủ lừng lẫy địa cầu</p>
            </div>

            <div
              onClick={() => setCurrentView('timeline')}
              className="relative opacity-75 hover:opacity-100 cursor-pointer group"
            >
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white group-hover:bg-[#002D56] group-hover:scale-125 transition-all" />
              <p className="text-xs font-bold text-[#002D56]">1975</p>
              <p className="text-[11px] text-gray-500 line-clamp-1">Đại thắng mùa Xuân, giải phóng Miền Nam</p>
            </div>

            <div
              onClick={() => setCurrentView('timeline')}
              className="relative opacity-75 hover:opacity-100 cursor-pointer group"
            >
              <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white group-hover:bg-[#002D56] group-hover:scale-125 transition-all" />
              <p className="text-xs font-bold text-[#002D56]">1986 – Nay</p>
              <p className="text-[11px] text-gray-500 line-clamp-1">Công cuộc Đổi mới & Hội nhập quốc tế sâu rộng</p>
            </div>
          </div>
        </div>

        {/* Bento Tile 3: History AI Assistant */}
        <div className="lg:col-span-4 bg-[#002D56] rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden shadow-xs text-white min-h-[170px]">
          <div className="relative z-10 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-[#F37021] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Gemini AI Tutor</span>
            </div>
            <h3 className="text-white font-bold text-sm">Trợ lý AI Lịch sử FPT</h3>
            <p className="text-white/70 text-[11px] leading-relaxed">
              Hỏi AI phân tích sự kiện, vẽ sơ đồ tư duy hoặc tạo đề thi trắc nghiệm trúng tủ.
            </p>
          </div>

          <form onSubmit={handleAiQuickSubmit} className="relative z-10 mt-3">
            <input
              type="text"
              value={aiQuickInput}
              onChange={(e) => setAiQuickInput(e.target.value)}
              placeholder="Nhập câu hỏi (ví dụ: Nguyên nhân thắng lợi K/C chống Mỹ)..."
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/50 focus:outline-none transition-all"
            />
          </form>

          {/* Background Motif */}
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#F37021]" fill="currentColor">
              <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z"></path>
            </svg>
          </div>
        </div>

        {/* Bento Tile 4: Tiếp Tục Học (Col 8 on lg) */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
            <h3 className="font-bold text-[#002D56] text-sm flex items-center space-x-1.5">
              <PlayCircle className="w-4 h-4 text-[#F37021]" />
              <span>Tiếp Tục Học Tập</span>
            </h3>
            <span className="text-[10px] text-gray-400">
              {readingHistory.length > 0 ? `${readingHistory.length} tài liệu đã mở` : 'Bắt đầu đọc tài liệu mới'}
            </span>
          </div>

          {inProgressDoc ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Item 1 */}
              <div
                onClick={() => setActiveReaderDoc(inProgressDoc, inProgressHistory.currentPage)}
                className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-orange-50/50 border border-gray-100 cursor-pointer transition-colors"
              >
                <div className="w-10 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-[#F37021]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#002D56] truncate">{inProgressDoc.title}</p>
                  <p className="text-[10px] text-gray-400">Trang {inProgressHistory.currentPage}/{inProgressHistory.totalPages}</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-[#F37021] rounded-full" style={{ width: `${inProgressHistory.progress}%` }} />
                  </div>
                </div>
                <p className="text-[10px] font-black text-[#F37021]">{inProgressHistory.progress}%</p>
              </div>

              {/* Item 2 */}
              {documents[1] && (
                <div
                  onClick={() => setActiveReaderDoc(documents[1], 1)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-blue-50/50 border border-gray-100 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#002D56]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#002D56] truncate">{documents[1].title}</p>
                    <p className="text-[10px] text-gray-400">Khối {documents[1].grade} • {documents[1].pagesCount} trang</p>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full bg-[#002D56] rounded-full w-1/3" />
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-[#002D56]">Sẵn sàng</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-gray-400">
              Hãy chọn một tài liệu trong Thư viện để bắt đầu hành trình học tập.
            </div>
          )}
        </div>

        {/* Bento Tile 5: 4-Category Bento Subgrid (Col 8) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => handleCategoryClick('exercise')}
            className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:border-[#F37021] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-[#F37021]/10 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-[#F37021] group-hover:text-white transition-all text-[#F37021]">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <p className="text-xs font-bold text-[#002D56]">Bài Tập Trắc Nghiệm</p>
            <p className="text-[10px] text-gray-500">THCS & THPT</p>
          </div>

          <div
            onClick={() => handleCategoryClick('outline')}
            className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:border-[#F37021] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-[#002D56] group-hover:text-white transition-all text-[#002D56]">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <p className="text-xs font-bold text-[#002D56]">Đề Cương & Mindmap</p>
            <p className="text-[10px] text-gray-500">Kiến thức cô đọng</p>
          </div>

          <div
            onClick={() => handleCategoryClick('exam')}
            className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:border-[#F37021] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <p className="text-xs font-bold text-[#002D56]">Đề Thi & Kiểm Tra</p>
            <p className="text-[10px] text-gray-500">Giữa kỳ & Cuối kỳ</p>
          </div>

          <div
            onClick={() => handleCategoryClick('ebook')}
            className="bg-white rounded-3xl p-4 shadow-xs border border-gray-100 flex flex-col items-center justify-center text-center hover:border-[#F37021] hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-2 group-hover:bg-purple-600 group-hover:text-white transition-all text-purple-600">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <p className="text-xs font-bold text-[#002D56]">Sách Chuyên Đề</p>
            <p className="text-[10px] text-gray-500">Học sâu Lịch sử</p>
          </div>
        </div>

        {/* Bento Tile 6: Quick Stats Bar (Col 4) */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-4 shadow-xs flex items-center justify-between px-6">
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Tài liệu đã đọc</p>
            <p className="text-2xl font-black text-[#002D56]">{readingHistory.length}</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Yêu thích</p>
            <p className="text-2xl font-black text-[#F37021]">{favorites.length}</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Chuỗi học tập</p>
            <p className="text-2xl font-black text-emerald-600">{currentUser?.streakDays || 9} ngày</p>
          </div>
        </div>
      </section>

      {/* Secondary Bento Grid: Đề xuất học tập */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002D56] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#F37021]" />
              <span>Tài liệu Đề xuất Lịch sử FPT (GDPT 2018)</span>
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
              className="px-3 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F37021] text-xs font-bold transition-all cursor-pointer"
            >
              Khối THCS (6-9)
            </button>
            <button
              onClick={() => {
                setSelectedSchoolLevel('thpt');
                setSelectedGrade('all');
                setCurrentView('library');
              }}
              className="px-3 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#002D56] text-xs font-bold transition-all cursor-pointer"
            >
              Khối THPT (10-12)
            </button>
            <button
              onClick={() => setCurrentView('library')}
              className="text-xs font-bold text-[#F37021] hover:underline flex items-center space-x-1 cursor-pointer ml-2"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedDocs.map((doc) => (
            <div
              key={doc.id}
              className="group bg-white rounded-3xl border border-gray-100 hover:border-[#F37021] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div
                  className="relative h-40 bg-gray-100 overflow-hidden cursor-pointer"
                  onClick={() => setActiveDetailDoc(doc)}
                >
                  <img
                    src={doc.thumbnailUrl}
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#002D56]/80 text-white text-[10px] font-bold backdrop-blur-xs">
                    {['6', '7', '8', '9'].includes(doc.grade) ? `THCS • Lớp ${doc.grade}` : doc.grade === 'all' ? 'Toàn cấp' : `THPT • Lớp ${doc.grade}`}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(doc.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                      isFavorite(doc.id)
                        ? 'bg-rose-500 text-white'
                        : 'bg-black/50 text-white hover:bg-black'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 space-y-1.5 cursor-pointer" onClick={() => setActiveDetailDoc(doc)}>
                  <div className="text-[10px] font-bold text-[#F37021] uppercase tracking-wider">
                    {doc.type === 'exercise' ? 'Bài tập' : doc.type === 'outline' ? 'Đề cương' : doc.type === 'exam' ? 'Đề thi' : 'Ebook'} • {doc.fileType.toUpperCase()}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#002D56] group-hover:text-[#F37021] transition-colors line-clamp-2">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2">{doc.description}</p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between text-xs mt-2">
                <span className="text-[11px] text-gray-400">{doc.viewCount.toLocaleString()} lượt xem</span>
                <div className="flex items-center space-x-1.5">
                  {doc.sampleQuestions && doc.sampleQuestions.length > 0 && (
                    <button
                      onClick={() => setActiveQuizDoc(doc)}
                      className="px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F37021] text-xs font-bold cursor-pointer"
                    >
                      Làm đề
                    </button>
                  )}
                  <button
                    onClick={() => setActiveReaderDoc(doc)}
                    className="px-3 py-1 rounded-xl bg-[#002D56] hover:bg-[#002242] text-white text-xs font-bold cursor-pointer"
                  >
                    Đọc
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
