import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentCard } from '../library/DocumentCard';
import {
  Bookmark,
  Clock,
  BookOpen,
  Folder,
  Plus,
  Trash2,
  PlayCircle,
  ExternalLink,
  Edit,
  FolderPlus,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';

export const PersonalLibraryView: React.FC = () => {
  const {
    currentUser,
    documents,
    favorites,
    readingHistory,
    bookmarks,
    collections,
    createCollection,
    removeBookmark,
    setActiveDetailDoc,
    setActiveReaderDoc,
    setCurrentView,
    setIsAuthModalOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'bookmarks' | 'collections'>('favorites');
  const [isCreatingCol, setIsCreatingCol] = useState(false);
  const [colName, setColName] = useState('');
  const [colDesc, setColDesc] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
          <Bookmark className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Đăng nhập để xem Tủ sách cá nhân</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Tủ sách giúp bạn lưu tài liệu yêu thích, theo dõi tiến độ đọc sách, lưu bookmark và tạo các bộ sưu tập ôn tập riêng biệt.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  // Favorite docs
  const favoriteDocs = documents.filter((d) => favorites.includes(d.id));

  // History docs with progress
  const historyItems = readingHistory.map((h) => {
    const doc = documents.find((d) => d.id === h.documentId);
    return { ...h, doc };
  }).filter((item) => item.doc !== undefined);

  const handleCreateCol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colName.trim()) return;
    createCollection(colName.trim(), colDesc.trim());
    setColName('');
    setColDesc('');
    setIsCreatingCol(false);
  };

  return (
    <div id="personal-library-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Tủ sách cá nhân</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Quản lý tài liệu đã lưu, tiến độ đọc và bộ sưu tập ôn tập của {currentUser.name}
            </p>
          </div>
        </div>

        {activeTab === 'collections' && (
          <button
            onClick={() => setIsCreatingCol(true)}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-sm"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Tạo Bộ sưu tập mới</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 sm:space-x-6 overflow-x-auto pb-1 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'favorites' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Yêu thích ({favoriteDocs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'history' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Lịch sử đọc ({historyItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'bookmarks' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Ghi chú & Bookmark ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('collections')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'collections' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>Bộ sưu tập ({collections.length})</span>
        </button>
      </div>

      {/* Tab 1: Favorites */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteDocs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {favoriteDocs.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-3">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">Chưa có tài liệu yêu thích</h3>
              <p className="text-xs text-slate-400">Bấm biểu tượng Bookmark ở bất kỳ tài liệu nào để lưu vào đây.</p>
              <button
                onClick={() => setCurrentView('library')}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Khám phá Thư viện
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Reading History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {historyItems.length > 0 ? (
            historyItems.map((item) => {
              if (!item.doc) return null;
              return (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div
                    className="flex items-center space-x-4 cursor-pointer"
                    onClick={() => setActiveDetailDoc(item.doc!)}
                  >
                    <img
                      src={item.doc.thumbnailUrl}
                      alt={item.doc.title}
                      className="w-14 h-16 object-cover rounded-xl shrink-0"
                    />
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 hover:text-orange-600 line-clamp-1">
                        {item.doc.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-xs text-slate-400">
                        <span>Đang đọc trang {item.currentPage}/{item.totalPages}</span>
                        <span>•</span>
                        <span>Đã xem {new Date(item.lastReadAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="w-48 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <button
                      onClick={() => setActiveReaderDoc(item.doc!, item.currentPage)}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center space-x-1"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Đọc tiếp</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
              Bạn chưa mở đọc tài liệu nào.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Bookmarks & Notes */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length > 0 ? (
            bookmarks.map((bm) => {
              const matchedDoc = documents.find((d) => d.id === bm.documentId);
              return (
                <div
                  key={bm.id}
                  className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 flex items-start justify-between gap-4 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                        Trang {bm.page}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{bm.documentTitle}</span>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                      "{bm.note}"
                    </p>
                    <div className="text-[10px] text-slate-400">Đã lưu: {bm.createdAt}</div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {matchedDoc && (
                      <button
                        onClick={() => setActiveReaderDoc(matchedDoc, bm.page)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold"
                      >
                        Mở trang
                      </button>
                    )}
                    <button
                      onClick={() => removeBookmark(bm.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                      title="Xóa bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-xs text-slate-400">
              Chưa có bookmark hoặc ghi chú nào. Khi đang đọc sách, hãy bấm nút Bookmark để lưu lại.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Collections */}
      {activeTab === 'collections' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map((col) => {
              const colDocs = documents.filter((d) => col.documentIds.includes(d.id));

              return (
                <div
                  key={col.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{col.icon}</span>
                      <span className="text-xs font-bold text-slate-400">{colDocs.length} tài liệu</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900">{col.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{col.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-xs font-medium text-slate-600 mb-2">Tài liệu trong bộ sưu tập:</div>
                    {colDocs.length > 0 ? (
                      <div className="space-y-1">
                        {colDocs.slice(0, 2).map((d) => (
                          <div
                            key={d.id}
                            onClick={() => setActiveDetailDoc(d)}
                            className="text-xs text-slate-700 hover:text-orange-600 truncate cursor-pointer font-medium"
                          >
                            • {d.title}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">Chưa có tài liệu nào.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal create collection */}
      {isCreatingCol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Tạo Bộ sưu tập mới</h3>
            <form onSubmit={handleCreateCol} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Tên bộ sưu tập</label>
                <input
                  type="text"
                  required
                  value={colName}
                  onChange={(e) => setColName(e.target.value)}
                  placeholder="Ví dụ: Ôn thi Học kỳ 2, Chuyên đề Ianta..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mô tả ngắn</label>
                <textarea
                  value={colDesc}
                  onChange={(e) => setColDesc(e.target.value)}
                  placeholder="Ghi chú mục tiêu ôn tập của bộ sưu tập này..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 h-20"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCol(false)}
                  className="px-3 py-2 text-xs text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Tạo ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
