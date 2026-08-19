import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Bookmark,
  Sun,
  Moon,
  BookOpen,
  Search,
  Sparkles,
  ListOrdered,
  FileText,
  Highlighter,
  MessageSquare,
  Share2,
  Plus,
  Lock,
} from 'lucide-react';

export const DocumentReaderModal: React.FC = () => {
  const {
    currentUser,
    activeReaderDoc,
    setActiveReaderDoc,
    readerInitialPage,
    addBookmark,
    bookmarks,
    addToHistory,
    setIsAIModalOpen,
    setAiPromptPreset,
    setAiContextDoc,
    generateShareUrl,
    requireAuth,
    showToast,
  } = useApp();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [themeMode, setThemeMode] = useState<'light' | 'sepia' | 'dark'>('light');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [sidebarTab, setSidebarTab] = useState<'toc' | 'bookmarks' | 'search' | null>(null);
  const [searchInDoc, setSearchInDoc] = useState<string>('');
  const [noteInput, setNoteInput] = useState<string>('');
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);

  useEffect(() => {
    if (readerInitialPage) {
      setCurrentPage(readerInitialPage);
    }
  }, [readerInitialPage, activeReaderDoc]);

  if (!activeReaderDoc) return null;

  const isGuest = !currentUser || currentUser.role === 'guest';
  const totalPages = activeReaderDoc.pagesCount || 10;

  const handleNextPage = () => {
    if (isGuest && currentPage >= 1) {
      requireAuth(
        () => setCurrentPage(2),
        `Đăng nhập bằng Email để mở khóa toàn bộ ${totalPages} trang của tài liệu "${activeReaderDoc.title}".`
      );
      return;
    }
    if (currentPage < totalPages) {
      const next = currentPage + 1;
      setCurrentPage(next);
      addToHistory(activeReaderDoc.id, next, totalPages);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
      addToHistory(activeReaderDoc.id, prev, totalPages);
    }
  };

  const handleSaveNoteBookmark = () => {
    requireAuth(() => {
      if (!noteInput.trim()) {
        showToast('Vui lòng nhập ghi chú', 'warning');
        return;
      }
      addBookmark(activeReaderDoc.id, currentPage, noteInput.trim());
      setNoteInput('');
      setIsAddingNote(false);
    }, 'Vui lòng đăng nhập Email để lưu ghi chú bài học.');
  };

  const handleAskAIAboutPage = () => {
    requireAuth(() => {
      setAiContextDoc(activeReaderDoc);
      setAiPromptPreset(
        `Giải thích chi tiết các nội dung và câu hỏi lịch sử ở trang ${currentPage} của tài liệu "${activeReaderDoc.title}"`
      );
      setIsAIModalOpen(true);
    }, 'Vui lòng đăng nhập Email để sử dụng Trợ lý AI.');
  };

  const handleShare = () => {
    generateShareUrl('doc', activeReaderDoc.id);
  };

  const currentDocBookmarks = bookmarks.filter((b) => b.documentId === activeReaderDoc.id);

  // Theme styling
  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    sepia: 'bg-[#FAF6EE] text-[#433422] border-[#E8DFC8]',
    dark: 'bg-[#1E2024] text-slate-100 border-slate-700',
  };

  return (
    <div
      id="document-reader-modal"
      className={`fixed inset-0 z-50 flex flex-col ${
        themeMode === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-900/90 backdrop-blur-md text-slate-900'
      }`}
    >
      {/* Top Navigation Toolbar */}
      <header className="h-14 px-4 bg-[#002D56] text-white border-b border-white/10 flex items-center justify-between z-10 shrink-0">
        {/* Left: Doc title & Back */}
        <div className="flex items-center space-x-3 max-w-md truncate">
          <button
            id="close-reader-btn"
            onClick={() => setActiveReaderDoc(null)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Đóng trình đọc"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-bold truncate">{activeReaderDoc.title}</h2>
            <div className="flex items-center space-x-2 text-[10px] text-blue-200">
              <span>Khối {activeReaderDoc.grade}</span>
              <span>•</span>
              <span>{activeReaderDoc.fileType.toUpperCase()}</span>
              {isGuest && (
                <span className="px-1.5 py-0.2 bg-[#F37021] text-white rounded font-bold uppercase text-[9px]">
                  Bản xem trước
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Pagination controls */}
        <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-xl text-xs">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1 rounded hover:bg-white/20 disabled:opacity-30 cursor-pointer"
            title="Trang trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-white px-2">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!isGuest && currentPage >= totalPages}
            className="p-1 rounded hover:bg-white/20 disabled:opacity-30 cursor-pointer"
            title="Trang sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Tools & Sharing */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Chia sẻ liên kết tài liệu"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleAskAIAboutPage}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-tr from-[#F37021] to-amber-500 text-white font-bold text-xs flex items-center space-x-1 shadow-md hover:scale-105 transition-all cursor-pointer"
            title="Hỏi AI phân tích trang này"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Hỏi AI</span>
          </button>

          <button
            onClick={() => setSidebarTab(sidebarTab === 'toc' ? null : 'toc')}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              sidebarTab === 'toc' ? 'bg-[#F37021] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Mục lục"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSidebarTab(sidebarTab === 'bookmarks' ? null : 'bookmarks')}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              sidebarTab === 'bookmarks' ? 'bg-[#F37021] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Ghi chú & Bookmark"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Drawer */}
        {sidebarTab && (
          <div className="w-72 bg-slate-800 text-white border-r border-slate-700 p-4 overflow-y-auto shrink-0 animate-in slide-in-from-left duration-200">
            {sidebarTab === 'toc' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-orange-400 flex items-center space-x-1.5">
                  <ListOrdered className="w-4 h-4" />
                  <span>Mục lục tài liệu</span>
                </h3>
                {activeReaderDoc.tableOfContents && activeReaderDoc.tableOfContents.length > 0 ? (
                  <div className="space-y-1.5">
                    {activeReaderDoc.tableOfContents.map((toc, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (isGuest && toc.page > 1) {
                            requireAuth(() => setCurrentPage(toc.page), `Đăng nhập Email để xem trang ${toc.page}`);
                          } else {
                            setCurrentPage(toc.page);
                          }
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          currentPage === toc.page
                            ? 'bg-[#F37021] text-white font-bold'
                            : 'hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="truncate pr-2">{toc.title}</span>
                        <span className="text-[10px] opacity-75 font-mono">Trang {toc.page}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Tài liệu gồm {totalPages} trang học tập liên tục.</p>
                )}
              </div>
            )}

            {sidebarTab === 'bookmarks' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-orange-400 flex items-center space-x-1.5">
                    <Bookmark className="w-4 h-4" />
                    <span>Ghi chú & Đánh dấu</span>
                  </h3>
                  <button
                    onClick={() => {
                      requireAuth(() => setIsAddingNote(true), 'Đăng nhập Email để tạo ghi chú');
                    }}
                    className="p-1 rounded-lg bg-[#F37021] text-white hover:bg-[#e06216] cursor-pointer"
                    title="Thêm ghi chú tại trang này"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isAddingNote && (
                  <div className="p-3 bg-slate-700/80 rounded-xl space-y-2">
                    <div className="text-xs text-slate-300">Ghi chú cho Trang {currentPage}:</div>
                    <textarea
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="Nhập nội dung cần ghi nhớ..."
                      className="w-full p-2 bg-slate-900 text-white rounded-lg text-xs border border-slate-600 focus:outline-none focus:border-[#F37021] h-20"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setIsAddingNote(false)}
                        className="px-2.5 py-1 text-xs text-slate-300 hover:text-white cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSaveNoteBookmark}
                        className="px-3 py-1 bg-[#F37021] hover:bg-[#e06216] text-white text-xs font-semibold rounded-lg cursor-pointer"
                      >
                        Lưu ghi chú
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  {currentDocBookmarks.length > 0 ? (
                    currentDocBookmarks.map((bm) => (
                      <div
                        key={bm.id}
                        onClick={() => setCurrentPage(bm.page)}
                        className="p-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600/60 cursor-pointer text-xs space-y-1 transition-colors"
                      >
                        <div className="flex justify-between text-[11px] font-bold text-orange-400">
                          <span>Trang {bm.page}</span>
                          <span className="text-slate-400 font-normal">{bm.createdAt}</span>
                        </div>
                        <p className="text-slate-200">{bm.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-4">Chưa có bookmark nào cho tài liệu này.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reader Canvas Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
          <div
            id="reader-page-sheet"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className={`w-full max-w-3xl rounded-3xl p-8 sm:p-12 shadow-2xl border transition-all duration-150 min-h-[750px] relative ${themeClasses[themeMode]}`}
          >
            {/* Header of the page */}
            <div className="border-b border-dashed pb-4 mb-6 flex justify-between items-center text-xs opacity-60">
              <span className="font-bold uppercase tracking-wider text-[#002D56]">FPT History Library • THCS & THPT</span>
              <span>Trang {currentPage} / {totalPages}</span>
            </div>

            {/* Document Rendered Content */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed font-serif">
              <h1 className="text-xl sm:text-2xl font-extrabold font-sans tracking-tight text-[#002D56]">
                {activeReaderDoc.tableOfContents && activeReaderDoc.tableOfContents[currentPage - 1]?.title
                  ? activeReaderDoc.tableOfContents[currentPage - 1].title
                  : `Phần ${currentPage}: ${activeReaderDoc.title}`}
              </h1>

              <p>
                Lịch sử là dòng chảy liên tục của các sự kiện, quá trình vận động và phát triển của xã hội loài người. Trong
                chương trình Lịch sử theo định hướng phát triển phẩm chất và năng lực (GDPT 2018), việc nắm vững bối cảnh,
                diễn biến và bản chất của các sự kiện là chìa khóa giúp học sinh FPT tư duy phản biện và đạt kết quả cao.
              </p>

              {/* Highlight callout box */}
              <div className="p-4 rounded-2xl bg-orange-50 border-l-4 border-[#F37021] my-4 text-sm font-sans space-y-1">
                <div className="font-extrabold text-[#F37021] uppercase text-xs tracking-wider">
                  Trọng tâm kiến thức cần ghi nhớ:
                </div>
                <p className="italic text-gray-700">
                  "Sự kiện có ý nghĩa quyết định cục diện chiến trường, đánh dấu bước ngoặt chuyển từ thế phòng ngự sang thế
                  tiến công chiến lược, tạo tiền đề vững chắc cho thắng lợi trọn vẹn của dân tộc."
                </p>
              </div>

              <h2 className="text-lg font-bold font-sans text-[#002D56] pt-2">
                1. Bối cảnh lịch sử và nguyên nhân
              </h2>
              <p>
                Sau những biến chuyển to lớn của tình hình quốc tế và trong nước, phong trào đấu tranh bước vào giai đoạn quyết
                liệt mới. Dưới sự lãnh đạo sáng suốt, các lực lượng đã chủ động nắm bắt thời cơ, kiên quyết chớp lấy vận hội
                lịch sử nghìn năm có một.
              </p>

              <h2 className="text-lg font-bold font-sans text-[#002D56] pt-2">
                2. Diễn biến then chốt & Nghệ thuật quân sự
              </h2>
              <p>
                Phương châm tác chiến được điều chỉnh linh hoạt, kết hợp chặt chẽ giữa tiến công quân sự và nổi dậy của quần
                chúng nhân dân. Tinh thần đoàn kết keo sơn đã trở thành sức mạnh vô địch, đập tan mọi âm mưu của đối phương.
              </p>
            </div>

            {/* If guest and page > 1: Lock overlay */}
            {isGuest && currentPage > 1 && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 text-[#F37021] flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="max-w-md space-y-1">
                  <h3 className="text-xl font-extrabold text-[#002D56]">Nội dung dành riêng cho thành viên</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Vui lòng đăng nhập bằng tài khoản Email (@fpt.edu.vn hoặc cá nhân) để mở khóa toàn bộ {totalPages} trang học tập và làm bài tập trắc nghiệm đính kèm.
                  </p>
                </div>
                <button
                  onClick={() =>
                    requireAuth(
                      () => {},
                      `Đăng nhập Email để tiếp tục đọc trang ${currentPage} của tài liệu "${activeReaderDoc.title}"`
                    )
                  }
                  className="px-6 py-3 rounded-2xl bg-[#F37021] hover:bg-[#e06216] text-white font-bold text-sm shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
                >
                  Đăng nhập bằng Email ngay
                </button>
              </div>
            )}

            {/* Footer of the sheet */}
            <div className="mt-12 pt-4 border-t border-dashed flex justify-between items-center text-xs opacity-50 font-sans">
              <span>Bản quyền học liệu thuộc về FPT Education</span>
              <span>Khối {activeReaderDoc.grade} • Môn Lịch sử</span>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Floating Page Nav for Mobile */}
      <footer className="sm:hidden h-12 bg-[#002D56] border-t border-white/10 flex items-center justify-around text-white px-4 text-xs">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="flex items-center space-x-1 disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Trang trước</span>
        </button>
        <span className="font-bold text-[#F37021]">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <span>Trang sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
