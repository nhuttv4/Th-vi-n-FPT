import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  BookOpen,
  Download,
  Bookmark,
  Share2,
  Calendar,
  User,
  Eye,
  FileText,
  Sparkles,
  CheckCircle2,
  ListOrdered,
  HelpCircle,
  ShieldCheck,
  FolderPlus,
  Lock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const DocumentDetailModal: React.FC = () => {
  const {
    currentUser,
    activeDetailDoc,
    setActiveDetailDoc,
    setActiveReaderDoc,
    setActiveQuizDoc,
    toggleFavorite,
    isFavorite,
    incrementDownload,
    documents,
    setIsAIModalOpen,
    setAiPromptPreset,
    setAiContextDoc,
    generateShareUrl,
    requireAuth,
    showToast,
    collections,
    toggleDocInCollection,
  } = useApp();

  const [isCollectionPickerOpen, setIsCollectionPickerOpen] = useState(false);

  if (!activeDetailDoc) return null;

  const isFav = isFavorite(activeDetailDoc.id);
  const isGuest = !currentUser || currentUser.role === 'guest';

  // Related documents
  const relatedDocs = documents
    .filter(
      (d) =>
        d.id !== activeDetailDoc.id &&
        (d.category === activeDetailDoc.category || d.grade === activeDetailDoc.grade)
    )
    .slice(0, 3);

  const handleShare = () => {
    generateShareUrl('doc', activeDetailDoc.id);
  };

  const handleReadFull = () => {
    requireAuth(() => {
      setActiveReaderDoc(activeDetailDoc, 1);
      setActiveDetailDoc(null);
    }, `Vui lòng đăng nhập Email để đọc toàn bộ ${activeDetailDoc.pagesCount} trang tài liệu "${activeDetailDoc.title}".`);
  };

  const handleTakeQuiz = () => {
    requireAuth(() => {
      setActiveQuizDoc(activeDetailDoc);
      setActiveDetailDoc(null);
    }, `Vui lòng đăng nhập Email để làm bài tập trắc nghiệm và lưu kết quả.`);
  };

  const handleAskAI = () => {
    requireAuth(() => {
      setAiContextDoc(activeDetailDoc);
      setAiPromptPreset(`Tóm tắt các ý chính và bài học lịch sử quan trọng trong tài liệu "${activeDetailDoc.title}"`);
      setIsAIModalOpen(true);
    }, `Vui lòng đăng nhập Email để sử dụng Trợ lý AI phân tích học liệu.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div
        id="document-detail-modal"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-100 text-[#F37021] border border-orange-200">
              {activeDetailDoc.type === 'exercise'
                ? 'Bài tập'
                : activeDetailDoc.type === 'outline'
                ? 'Đề cương'
                : activeDetailDoc.type === 'exam'
                ? 'Đề thi'
                : 'Ebook'}
            </span>
            <span className="text-xs text-gray-500 font-bold">
              {['6', '7', '8', '9'].includes(activeDetailDoc.grade)
                ? `THCS • Lớp ${activeDetailDoc.grade}`
                : activeDetailDoc.grade === 'all'
                ? 'Toàn cấp THCS & THPT'
                : `THPT • Lớp ${activeDetailDoc.grade}`}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-[#F37021] text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Sao chép link chia sẻ yêu cầu đăng nhập Email"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Chia sẻ link</span>
            </button>
            <button
              id="close-detail-modal"
              onClick={() => setActiveDetailDoc(null)}
              className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guest Lock Notification Banner */}
        {isGuest && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="font-semibold">
                Liên kết chia sẻ nội bộ: Bạn cần đăng nhập Email để mở khóa toàn bộ {activeDetailDoc.pagesCount} trang & tải tài liệu.
              </span>
            </div>
            <button
              onClick={() =>
                requireAuth(
                  () => {},
                  `Đăng nhập Email để mở khóa học liệu "${activeDetailDoc.title}"`
                )
              }
              className="px-3 py-1.5 bg-[#F37021] hover:bg-[#e06216] text-white font-bold rounded-xl text-xs shrink-0 self-start sm:self-auto cursor-pointer"
            >
              Đăng nhập bằng Email
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top section: Cover & Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Cover Column */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full aspect-3/4 rounded-2xl bg-gray-100 overflow-hidden shadow-md border border-gray-100 relative group">
                <img
                  src={activeDetailDoc.thumbnailUrl}
                  alt={activeDetailDoc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#002D56]/80 text-white text-[11px] font-bold uppercase backdrop-blur-xs">
                  {activeDetailDoc.fileType}
                </div>
                {isGuest && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="px-3 py-1.5 rounded-full bg-white/90 text-[#002D56] text-xs font-bold flex items-center space-x-1.5 shadow-md">
                      <Lock className="w-3.5 h-3.5 text-[#F37021]" />
                      <span>Xem trước</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick File Specs */}
              <div className="w-full mt-4 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Định dạng tệp:</span>
                  <span className="font-bold uppercase text-[#002D56]">{activeDetailDoc.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dung lượng:</span>
                  <span className="font-semibold">{activeDetailDoc.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Số trang học tập:</span>
                  <span className="font-semibold text-[#002D56]">{activeDetailDoc.pagesCount} trang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lượt tải:</span>
                  <span className="font-semibold">{activeDetailDoc.downloadCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span className="font-medium text-[#002D56]">Tác giả: {activeDetailDoc.authorName}</span>
                  <span>•</span>
                  <span>Ngày đăng: {activeDetailDoc.createdAt}</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-extrabold text-[#002D56] leading-snug">
                  {activeDetailDoc.title}
                </h1>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {activeDetailDoc.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeDetailDoc.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-600 text-[11px] font-semibold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Table of contents preview */}
                {activeDetailDoc.tableOfContents && activeDetailDoc.tableOfContents.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-xs font-bold text-[#002D56] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <ListOrdered className="w-3.5 h-3.5 text-[#F37021]" />
                      <span>Mục lục nội dung chính:</span>
                    </h3>
                    <div className="space-y-1 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs">
                      {activeDetailDoc.tableOfContents.slice(0, 3).map((toc, i) => (
                        <div key={i} className="flex justify-between text-gray-600 py-0.5">
                          <span className="font-medium truncate pr-2">{i + 1}. {toc.title}</span>
                          <span className="text-gray-400 font-mono text-[10px]">Trang {toc.page}</span>
                        </div>
                      ))}
                      {activeDetailDoc.tableOfContents.length > 3 && (
                        <div className="text-[10px] text-gray-400 pt-1 text-center font-medium">
                          + và {activeDetailDoc.tableOfContents.length - 3} phần kiến thức khác
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={handleReadFull}
                    className="flex-1 min-w-[140px] py-3 px-4 rounded-2xl bg-[#002D56] hover:bg-[#002242] text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Đọc toàn bộ tài liệu</span>
                  </button>

                  {activeDetailDoc.sampleQuestions && activeDetailDoc.sampleQuestions.length > 0 && (
                    <button
                      onClick={handleTakeQuiz}
                      className="py-3 px-4 rounded-2xl bg-orange-50 hover:bg-orange-100 text-[#F37021] font-bold text-xs sm:text-sm flex items-center space-x-2 border border-orange-200 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Làm trắc nghiệm</span>
                    </button>
                  )}

                  <button
                    onClick={() => incrementDownload(activeDetailDoc.id)}
                    className="py-3 px-4 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải về</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(activeDetailDoc.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      isFav
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                    }`}
                    title={isFav ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleAskAI}
                    className="p-3 rounded-2xl bg-gradient-to-tr from-[#F37021] to-amber-500 text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                    title="Hỏi AI Tutor về tài liệu này"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Documents Subgrid */}
          {relatedDocs.length > 0 && (
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h3 className="font-bold text-xs sm:text-sm text-[#002D56]">Học liệu liên quan khác:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setActiveDetailDoc(doc)}
                    className="p-3 rounded-2xl bg-gray-50 hover:bg-orange-50/50 border border-gray-100 cursor-pointer transition-all flex items-center space-x-3"
                  >
                    <img src={doc.thumbnailUrl} alt={doc.title} className="w-10 h-12 object-cover rounded-xl shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-[#002D56] truncate">{doc.title}</p>
                      <p className="text-[10px] text-gray-400">Lớp {doc.grade} • {doc.pagesCount} trang</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
