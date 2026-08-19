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
} from 'lucide-react';

export const DocumentDetailModal: React.FC = () => {
  const {
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
    showToast,
    collections,
    toggleDocInCollection,
  } = useApp();

  const [isCollectionPickerOpen, setIsCollectionPickerOpen] = useState(false);

  if (!activeDetailDoc) return null;

  const isFav = isFavorite(activeDetailDoc.id);

  // Related documents
  const relatedDocs = documents
    .filter(
      (d) =>
        d.id !== activeDetailDoc.id &&
        (d.category === activeDetailDoc.category || d.grade === activeDetailDoc.grade)
    )
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết tài liệu vào bộ nhớ tạm 🔗', 'success');
    } else {
      showToast('Liên kết tài liệu đã sẵn sàng để chia sẻ', 'info');
    }
  };

  const handleAskAI = () => {
    setAiContextDoc(activeDetailDoc);
    setAiPromptPreset(`Tóm tắt các ý chính và bài học lịch sử quan trọng trong tài liệu "${activeDetailDoc.title}"`);
    setIsAIModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div
        id="document-detail-modal"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-100 text-orange-800 border border-orange-200">
              {activeDetailDoc.type === 'exercise'
                ? 'Bài tập'
                : activeDetailDoc.type === 'outline'
                ? 'Đề cương'
                : activeDetailDoc.type === 'exam'
                ? 'Đề thi'
                : 'Ebook'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {activeDetailDoc.grade === 'all' ? 'Toàn cấp THPT' : `Khối ${activeDetailDoc.grade}`}
            </span>
          </div>

          <button
            id="close-detail-modal"
            onClick={() => setActiveDetailDoc(null)}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Top section: Cover & Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Cover Column */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full aspect-3/4 rounded-2xl bg-slate-100 overflow-hidden shadow-md border border-slate-200 relative group">
                <img
                  src={activeDetailDoc.thumbnailUrl}
                  alt={activeDetailDoc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[11px] font-bold uppercase">
                  {activeDetailDoc.fileType}
                </div>
              </div>

              {/* Quick File Specs */}
              <div className="w-full mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Định dạng:</span>
                  <span className="font-semibold uppercase">{activeDetailDoc.fileType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dung lượng:</span>
                  <span className="font-semibold">{activeDetailDoc.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Số trang:</span>
                  <span className="font-semibold">{activeDetailDoc.pagesCount} trang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lượt tải:</span>
                  <span className="font-semibold">{activeDetailDoc.downloadCount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {activeDetailDoc.title}
                </h2>

                {/* Author & Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center space-x-1.5 font-medium text-slate-800">
                    <User className="w-3.5 h-3.5 text-orange-500" />
                    <span>{activeDetailDoc.authorName}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Cập nhật: {activeDetailDoc.updatedAt}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Đã kiểm duyệt</span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed">
                  <p className="font-medium text-slate-900 mb-1">Mô tả tài liệu:</p>
                  {activeDetailDoc.description}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeDetailDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-slate-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* Read */}
                  <button
                    id="modal-read-doc-btn"
                    onClick={() => {
                      setActiveReaderDoc(activeDetailDoc);
                      setActiveDetailDoc(null);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md shadow-orange-500/20 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Đọc tài liệu</span>
                  </button>

                  {/* Practice Quiz */}
                  {activeDetailDoc.sampleQuestions && activeDetailDoc.sampleQuestions.length > 0 && (
                    <button
                      id="modal-quiz-btn"
                      onClick={() => {
                        setActiveQuizDoc(activeDetailDoc);
                        setActiveDetailDoc(null);
                      }}
                      className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all"
                    >
                      <HelpCircle className="w-4 h-4 text-orange-400" />
                      <span>Làm trắc nghiệm</span>
                    </button>
                  )}

                  {/* Download */}
                  <button
                    id="modal-download-btn"
                    onClick={() => incrementDownload(activeDetailDoc.id)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải xuống</span>
                  </button>
                </div>

                {/* Secondary tools: Favorite, Collection, Share, Ask AI */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => toggleFavorite(activeDetailDoc.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                      isFav
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isFav ? 'Đã yêu thích' : 'Lưu yêu thích'}</span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setIsCollectionPickerOpen(!isCollectionPickerOpen)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5"
                    >
                      <FolderPlus className="w-3.5 h-3.5 text-orange-500" />
                      <span>Thêm vào Tủ sách</span>
                    </button>

                    {isCollectionPickerOpen && (
                      <div className="absolute left-0 bottom-full mb-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                        <div className="text-[11px] font-bold text-slate-400 uppercase px-2 py-1">
                          Chọn bộ sưu tập
                        </div>
                        {collections.map((col) => {
                          const isInCol = col.documentIds.includes(activeDetailDoc.id);
                          return (
                            <button
                              key={col.id}
                              onClick={() => toggleDocInCollection(col.id, activeDetailDoc.id)}
                              className="w-full text-left px-2 py-1.5 text-xs rounded-lg hover:bg-orange-50 flex items-center justify-between"
                            >
                              <span>
                                {col.icon} {col.name}
                              </span>
                              {isInCol && <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleAskAI}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Hỏi AI về tài liệu</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents Preview (if available) */}
          {activeDetailDoc.tableOfContents && activeDetailDoc.tableOfContents.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <ListOrdered className="w-4 h-4 text-orange-500" />
                <span>Mục lục nội dung tài liệu</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDetailDoc.tableOfContents.map((toc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveReaderDoc(activeDetailDoc, toc.page);
                      setActiveDetailDoc(null);
                    }}
                    className="text-left p-3 rounded-xl bg-slate-50 hover:bg-orange-50/70 border border-slate-200/80 text-xs text-slate-800 flex items-center justify-between transition-colors group"
                  >
                    <span className="font-medium group-hover:text-orange-600 truncate mr-2">{toc.title}</span>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0">Trang {toc.page}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Documents */}
          {relatedDocs.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Tài liệu cùng chủ đề</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setActiveDetailDoc(doc)}
                    className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer transition-all flex items-center space-x-3 group"
                  >
                    <img
                      src={doc.thumbnailUrl}
                      alt={doc.title}
                      className="w-12 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-orange-600 truncate">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.grade === 'all' ? 'Toàn cấp' : `Lớp ${doc.grade}`}</p>
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
