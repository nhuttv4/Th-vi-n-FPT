import React from 'react';
import { DocumentItem } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Eye,
  Download,
  Bookmark,
  FileText,
  User,
  Star,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface DocumentCardProps {
  doc: DocumentItem;
  viewMode: 'grid' | 'list';
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc, viewMode }) => {
  const {
    setActiveDetailDoc,
    setActiveReaderDoc,
    setActiveQuizDoc,
    toggleFavorite,
    isFavorite,
    incrementDownload,
  } = useApp();

  const isFav = isFavorite(doc.id);

  const typeLabels: Record<string, { label: string; color: string }> = {
    exercise: { label: 'Bài tập', color: 'bg-red-50 text-[#991B1B] border border-red-200' },
    outline: { label: 'Đề cương', color: 'bg-amber-50 text-[#92400E] border border-amber-200' },
    exam: { label: 'Đề thi', color: 'bg-emerald-50 text-emerald-800 border border-emerald-200' },
    ebook: { label: 'Sách Sử', color: 'bg-purple-50 text-purple-800 border border-purple-200' },
  };

  const difficultyLabels: Record<string, { label: string; color: string }> = {
    basic: { label: 'Cơ bản', color: 'text-gray-700 bg-gray-100' },
    medium: { label: 'Trung bình', color: 'text-[#92400E] bg-amber-50 border border-amber-200' },
    good: { label: 'Khá', color: 'text-[#991B1B] bg-red-50 border border-red-200' },
    advanced: { label: 'Nâng cao (9+)', color: 'text-white bg-[#991B1B]' },
  };

  if (viewMode === 'list') {
    return (
      <div
        id={`doc-card-list-${doc.id}`}
        className="group bg-[#FFFDF9] rounded-3xl border border-[#EAE1D1] hover:border-[#991B1B] p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div
          className="flex items-start space-x-4 w-full sm:w-2/3 cursor-pointer"
          onClick={() => setActiveDetailDoc(doc)}
        >
          <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-amber-50 overflow-hidden shrink-0 relative border border-amber-200">
            <img
              src={doc.thumbnailUrl}
              alt={doc.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-[#4A0C0C]/90 text-white text-[9px] font-bold uppercase">
              {doc.fileType}
            </span>
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg ${
                  typeLabels[doc.type]?.color || 'bg-gray-100'
                }`}
              >
                {typeLabels[doc.type]?.label || doc.type}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-[#92400E] border border-amber-200">
                {doc.grade === 'all' ? 'Toàn cấp THPT' : `Khối ${doc.grade}`}
              </span>
              {doc.hasAnswerKey && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 flex items-center space-x-1 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Có đáp án</span>
                </span>
              )}
            </div>

            <h3 className="font-bold text-sm sm:text-base text-[#4A0C0C] group-hover:text-[#991B1B] transition-colors line-clamp-1 font-serif">
              {doc.title}
            </h3>

            <p className="text-xs text-gray-600 line-clamp-2">{doc.description}</p>

            <div className="flex items-center space-x-3 text-[11px] text-gray-500 pt-1">
              <span className="flex items-center space-x-1">
                <User className="w-3 h-3 text-[#D97706]" />
                <span>{doc.authorName}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{doc.viewCount.toLocaleString()}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Download className="w-3 h-3" />
                <span>{doc.downloadCount.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EAE1D1]">
          <button
            id={`fav-btn-${doc.id}`}
            onClick={() => toggleFavorite(doc.id)}
            className={`p-2 rounded-2xl border transition-colors cursor-pointer ${
              isFav
                ? 'bg-red-50 border-red-200 text-[#991B1B]'
                : 'border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300'
            }`}
            title="Yêu thích"
          >
            <Bookmark className={`w-4 h-4 ${isFav ? 'fill-[#991B1B]' : ''}`} />
          </button>

          <button
            id={`download-btn-${doc.id}`}
            onClick={() => incrementDownload(doc.id)}
            className="p-2 rounded-2xl border border-gray-200 text-gray-600 hover:bg-amber-50 hover:text-[#991B1B] transition-colors cursor-pointer"
            title="Tải xuống tài liệu"
          >
            <Download className="w-4 h-4" />
          </button>

          {doc.sampleQuestions && doc.sampleQuestions.length > 0 && (
            <button
              id={`quiz-btn-${doc.id}`}
              onClick={() => setActiveQuizDoc(doc)}
              className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#92400E] font-bold text-xs transition-colors cursor-pointer border border-amber-200"
            >
              Làm đề
            </button>
          )}

          <button
            id={`read-btn-${doc.id}`}
            onClick={() => setActiveReaderDoc(doc)}
            className="px-4 py-2 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-xs transition-all shadow-xs cursor-pointer flex items-center space-x-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc ngay</span>
          </button>
        </div>
      </div>
    );
  }

  // Grid view (Bento Style)
  return (
    <div
      id={`doc-card-grid-${doc.id}`}
      className="group bg-[#FFFDF9] rounded-3xl border border-[#EAE1D1] hover:border-[#991B1B] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Cover */}
        <div
          className="relative h-44 bg-amber-50 overflow-hidden cursor-pointer"
          onClick={() => setActiveDetailDoc(doc)}
        >
          <img
            src={doc.thumbnailUrl}
            alt={doc.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-2.5 left-2.5 flex flex-col space-y-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4A0C0C]/80 text-amber-100 text-[10px] font-bold backdrop-blur-xs border border-white/10">
              {doc.grade === 'all' ? 'Toàn cấp' : `Khối ${doc.grade}`}
            </span>
          </div>

          <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5">
            <span className="px-2 py-0.5 rounded-md bg-[#991B1B] text-white text-[10px] font-black uppercase shadow-xs">
              {doc.fileType}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(doc.id);
              }}
              className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                isFav ? 'bg-[#991B1B] text-white' : 'bg-black/50 text-white hover:bg-black'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-2.5 left-2.5">
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-xs ${
                difficultyLabels[doc.difficulty]?.color || 'bg-white text-gray-700'
              }`}
            >
              {difficultyLabels[doc.difficulty]?.label || doc.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-1.5 cursor-pointer" onClick={() => setActiveDetailDoc(doc)}>
          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#991B1B] uppercase tracking-wider">
            <span>{typeLabels[doc.type]?.label || doc.type}</span>
          </div>

          <h3 className="font-bold text-sm text-[#4A0C0C] group-hover:text-[#991B1B] transition-colors line-clamp-2 font-serif">
            {doc.title}
          </h3>

          <p className="text-[11px] text-gray-600 line-clamp-2">{doc.description}</p>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
            <span className="truncate max-w-[130px] font-medium">{doc.authorName}</span>
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-0.5">
                <Eye className="w-3 h-3" />
                <span>{doc.viewCount.toLocaleString()}</span>
              </span>
              <span className="flex items-center space-x-0.5 text-amber-600 font-semibold">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{doc.rating}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 pt-0 border-t border-[#EAE1D1] flex items-center justify-between mt-2">
        <button
          onClick={() => incrementDownload(doc.id)}
          className="text-xs text-gray-500 hover:text-[#991B1B] flex items-center space-x-1 font-medium cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{doc.fileSize}</span>
        </button>

        <div className="flex items-center space-x-1.5">
          {doc.sampleQuestions && doc.sampleQuestions.length > 0 && (
            <button
              onClick={() => setActiveQuizDoc(doc)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#92400E] text-xs font-bold transition-colors cursor-pointer border border-amber-200"
            >
              Làm đề
            </button>
          )}
          <button
            onClick={() => setActiveReaderDoc(doc)}
            className="px-3.5 py-1.5 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
          >
            <BookOpen className="w-3 h-3" />
            <span>Đọc</span>
          </button>
        </div>
      </div>
    </div>
  );
};
