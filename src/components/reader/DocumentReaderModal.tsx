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
} from 'lucide-react';

export const DocumentReaderModal: React.FC = () => {
  const {
    activeReaderDoc,
    setActiveReaderDoc,
    readerInitialPage,
    addBookmark,
    bookmarks,
    addToHistory,
    setIsAIModalOpen,
    setAiPromptPreset,
    setAiContextDoc,
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

  const totalPages = activeReaderDoc.pagesCount || 10;

  const handleNextPage = () => {
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
    if (!noteInput.trim()) {
      showToast('Vui lòng nhập ghi chú', 'warning');
      return;
    }
    addBookmark(activeReaderDoc.id, currentPage, noteInput.trim());
    setNoteInput('');
    setIsAddingNote(false);
  };

  const handleAskAIAboutPage = () => {
    setAiContextDoc(activeReaderDoc);
    setAiPromptPreset(
      `Giải thích chi tiết các nội dung và câu hỏi lịch sử ở trang ${currentPage} của tài liệu "${activeReaderDoc.title}"`
    );
    setIsAIModalOpen(true);
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
      <header className="h-14 px-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between z-10 shrink-0">
        {/* Left: Doc title & Back */}
        <div className="flex items-center space-x-3 max-w-md truncate">
          <button
            id="close-reader-btn"
            onClick={() => setActiveReaderDoc(null)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Đóng trình đọc"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-bold truncate text-slate-100">{activeReaderDoc.title}</h2>
            <p className="text-[11px] text-orange-400 truncate">
              {activeReaderDoc.fileType.toUpperCase()} • Lớp {activeReaderDoc.grade} • {activeReaderDoc.authorName}
            </p>
          </div>
        </div>

        {/* Center: Page Controls */}
        <div className="flex items-center space-x-2 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700 text-xs">
          <button
            id="reader-prev-page"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono font-medium px-1">
            Trang <span className="text-orange-400 font-bold">{currentPage}</span> / {totalPages}
          </span>

          <button
            id="reader-next-page"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Tools & Settings */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs">
          {/* Zoom */}
          <div className="hidden sm:flex items-center space-x-1 bg-slate-800 px-2 py-1 rounded-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
              className="text-slate-300 hover:text-white p-0.5"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1 text-slate-300">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="text-slate-300 hover:text-white p-0.5"
              title="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => setThemeMode('light')}
              className={`p-1 rounded ${themeMode === 'light' ? 'bg-orange-500 text-white' : 'text-slate-400'}`}
              title="Giao diện Sáng"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`px-1.5 py-0.5 rounded font-serif text-xs ${
                themeMode === 'sepia' ? 'bg-amber-600 text-white' : 'text-slate-400'
              }`}
              title="Giao diện Đọc sách (Sepia)"
            >
              A
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-1 rounded ${themeMode === 'dark' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
              title="Giao diện Tối"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* AI Helper Button */}
          <button
            onClick={handleAskAIAboutPage}
            className="px-2.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center space-x-1 shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hỏi AI trang này</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Drawer (TOC, Notes, Search) */}
        <aside className="w-12 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-4 space-y-3 z-10 shrink-0">
          <button
            onClick={() => setSidebarTab(sidebarTab === 'toc' ? null : 'toc')}
            className={`p-2 rounded-xl transition-colors ${
              sidebarTab === 'toc' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Mục lục tài liệu"
          >
            <ListOrdered className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSidebarTab(sidebarTab === 'bookmarks' ? null : 'bookmarks')}
            className={`p-2 rounded-xl transition-colors ${
              sidebarTab === 'bookmarks' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Ghi chú & Bookmark"
          >
            <Bookmark className="w-5 h-5" />
          </button>

          <button
            onClick={() => setSidebarTab(sidebarTab === 'search' ? null : 'search')}
            className={`p-2 rounded-xl transition-colors ${
              sidebarTab === 'search' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Tìm kiếm trong tài liệu"
          >
            <Search className="w-5 h-5" />
          </button>
        </aside>

        {/* Sidebar Expansion Panel */}
        {sidebarTab && (
          <div className="w-72 sm:w-80 bg-slate-800 text-slate-100 border-r border-slate-700 p-4 overflow-y-auto space-y-4 shrink-0 animate-in slide-in-from-left duration-200">
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
                        onClick={() => setCurrentPage(toc.page)}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                          currentPage === toc.page
                            ? 'bg-orange-500 text-white font-bold'
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
                    onClick={() => setIsAddingNote(true)}
                    className="p-1 rounded bg-orange-500 text-white hover:bg-orange-600"
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
                      placeholder="Nhập nội dung cần ghi nhớ, trọng tâm thi..."
                      className="w-full p-2 bg-slate-800 text-white rounded-lg text-xs border border-slate-600 focus:outline-none focus:border-orange-500 h-20"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setIsAddingNote(false)}
                        className="px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSaveNoteBookmark}
                        className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-md"
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

            {sidebarTab === 'search' && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-orange-400 flex items-center space-x-1.5">
                  <Search className="w-4 h-4" />
                  <span>Tìm trong tài liệu</span>
                </h3>
                <input
                  type="text"
                  value={searchInDoc}
                  onChange={(e) => setSearchInDoc(e.target.value)}
                  placeholder="Nhập từ khóa tìm kiếm..."
                  className="w-full p-2 text-xs bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <div className="text-[11px] text-slate-400">
                  {searchInDoc ? (
                    <div className="space-y-1.5 pt-2">
                      <div className="p-2 rounded bg-slate-700/60 cursor-pointer hover:bg-slate-700 text-slate-200">
                        <span className="text-orange-400 font-bold">Trang 1:</span> "...tóm tắt nguyên nhân bùng nổ{' '}
                        <mark className="bg-orange-500 text-white px-0.5 rounded">{searchInDoc}</mark>..."
                      </div>
                      <div className="p-2 rounded bg-slate-700/60 cursor-pointer hover:bg-slate-700 text-slate-200">
                        <span className="text-orange-400 font-bold">Trang 2:</span> "...ý nghĩa lịch sử và tác động của{' '}
                        <mark className="bg-orange-500 text-white px-0.5 rounded">{searchInDoc}</mark> đối với cách mạng..."
                      </div>
                    </div>
                  ) : (
                    'Nhập cụm từ để tra cứu trực tiếp trong trang tài liệu.'
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
            className={`w-full max-w-3xl rounded-2xl p-8 sm:p-12 shadow-2xl border transition-all duration-150 min-h-[750px] ${themeClasses[themeMode]}`}
          >
            {/* Header of the page */}
            <div className="border-b border-dashed pb-4 mb-6 flex justify-between items-center text-xs opacity-60">
              <span className="font-semibold uppercase tracking-wider">FPT History Library • THPT</span>
              <span>Trang {currentPage} / {totalPages}</span>
            </div>

            {/* Document Rendered Content */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed font-serif">
              <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-orange-600">
                {activeReaderDoc.tableOfContents && activeReaderDoc.tableOfContents[currentPage - 1]?.title
                  ? activeReaderDoc.tableOfContents[currentPage - 1].title
                  : `Phần ${currentPage}: ${activeReaderDoc.title}`}
              </h1>

              <p>
                Lịch sử là dòng chảy liên tục của các sự kiện, quá trình vận động và phát triển của xã hội loài người. Trong
                chương trình Lịch sử THPT theo định hướng phát triển năng lực (GDPT 2018), việc nắm vững bối cảnh, diễn biến
                và bản chất của các sự kiện là chìa khóa giúp học sinh tư duy phản biện và đạt kết quả cao.
              </p>

              {/* Highlight callout box */}
              <div className="p-4 rounded-xl bg-orange-500/10 border-l-4 border-orange-500 my-4 text-sm font-sans space-y-1">
                <div className="font-bold text-orange-600 uppercase text-xs tracking-wider">Trọng tâm kiến thức cần ghi nhớ:</div>
                <p className="italic">
                  "Sự kiện có ý nghĩa quyết định cục diện chiến trường, đánh dấu bước ngoặt chuyển từ thế phòng ngự sang thế
                  tiến công chiến lược, tạo tiền đề vững chắc cho thắng lợi trọn vẹn."
                </p>
              </div>

              <h2 className="text-lg font-bold font-sans text-slate-800 dark:text-slate-200 pt-2">
                1. Bối cảnh lịch sử và nguyên nhân
              </h2>
              <p>
                Sau những biến chuyển to lớn của tình hình quốc tế và trong nước, phong trào đấu tranh bước vào giai đoạn quyết
                liệt mới. Dưới sự lãnh đạo sáng suốt, các lực lượng đã chủ động nắm bắt thời cơ, kiên quyết chớp lấy vận hội
                lịch sử nghìn năm có một.
              </p>

              <h2 className="text-lg font-bold font-sans text-slate-800 dark:text-slate-200 pt-2">
                2. Diễn biến then chốt & Nghệ thuật quân sự
              </h2>
              <p>
                Phương châm tác chiến được điều chỉnh linh hoạt, kết hợp chặt chẽ giữa tiến công quân sự và nổi dậy của quần
                chúng nhân dân. Tinh thần đoàn kết keo sơn đã trở thành sức mạnh vô địch, đập tan mọi âm mưu của đối phương.
              </p>

              {/* Sample questions inside the document */}
              {activeReaderDoc.sampleQuestions && activeReaderDoc.sampleQuestions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 font-sans">
                  <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wide mb-3">
                    Câu hỏi ôn tập & củng cố kiến thức:
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 text-xs sm:text-sm space-y-2">
                    <p className="font-semibold">
                      Câu 1: {activeReaderDoc.sampleQuestions[0].question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                      {activeReaderDoc.sampleQuestions[0].options.map((opt, i) => (
                        <div key={i} className="p-2 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                          {String.fromCharCode(65 + i)}. {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer of the sheet */}
            <div className="mt-12 pt-4 border-t border-dashed flex justify-between items-center text-xs opacity-50 font-sans">
              <span>Bản quyền học liệu thuộc về FPT Education</span>
              <span>Lớp {activeReaderDoc.grade} • Môn Lịch sử</span>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Floating Page Nav for Mobile */}
      <footer className="sm:hidden h-12 bg-slate-900 border-t border-slate-800 flex items-center justify-around text-white px-4 text-xs">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="flex items-center space-x-1 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Trang trước</span>
        </button>
        <span className="font-bold text-orange-400">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="flex items-center space-x-1 disabled:opacity-30"
        >
          <span>Trang sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
