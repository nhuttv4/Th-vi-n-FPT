import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Heart,
  MessageSquare,
  Send,
  Pin,
  Paperclip,
  Share2,
  BookOpen,
  Eye,
  GraduationCap,
  Sparkles,
  Lock,
} from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const {
    currentUser,
    activePostDetail,
    setActivePostDetail,
    addComment,
    toggleLikePost,
    togglePinPost,
    documents,
    setActiveReaderDoc,
    generateShareUrl,
    requireAuth,
    showToast,
  } = useApp();

  const [commentInput, setCommentInput] = useState('');

  if (!activePostDetail) return null;

  const isGuest = !currentUser || currentUser.role === 'guest';

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    requireAuth(() => {
      addComment(activePostDetail.id, commentInput);
      setCommentInput('');
    }, 'Vui lòng đăng nhập Email (@fpt.edu.vn hoặc cá nhân) để gửi bình luận thảo luận.');
  };

  const attachedDocs = documents.filter((d) => activePostDetail.attachedDocIds?.includes(d.id));

  const handleShare = () => {
    generateShareUrl('post', activePostDetail.id);
  };

  const handleOpenDoc = (doc: any) => {
    requireAuth(() => {
      setActiveReaderDoc(doc, 1);
      setActivePostDetail(null);
    }, `Vui lòng đăng nhập Email để đọc tài liệu "${doc.title}".`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        id="post-detail-modal"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-[#002D56] text-white p-5 sm:p-6 relative shrink-0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F37021] text-white flex items-center justify-center font-bold text-sm overflow-hidden shrink-0 ring-2 ring-white/20">
              {activePostDetail.authorAvatar ? (
                <img
                  src={activePostDetail.authorAvatar}
                  alt={activePostDetail.authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{activePostDetail.authorName.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h3 className="text-sm font-bold text-white">{activePostDetail.authorName}</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#F37021] text-white text-[9px] font-extrabold uppercase">
                  {activePostDetail.authorRole === 'admin'
                    ? 'Admin Thư viện'
                    : activePostDetail.authorRole === 'teacher'
                    ? 'Giáo viên'
                    : 'Học sinh'}
                </span>
                {activePostDetail.grade && activePostDetail.grade !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-bold">
                    Khối {activePostDetail.grade}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-blue-200 mt-0.5">
                Đăng ngày{' '}
                {new Date(activePostDetail.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Sao chép link chia sẻ bài viết (Yêu cầu đăng nhập Email)"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="close-post-detail-btn"
              onClick={() => setActivePostDetail(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guest Lock Banner */}
        {isGuest && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Đăng nhập Email để tham gia thảo luận và mở tài liệu đính kèm.</span>
            </div>
            <button
              onClick={() =>
                requireAuth(
                  () => {},
                  `Đăng nhập Email để tham gia bình luận bài viết "${activePostDetail.title}"`
                )
              }
              className="font-bold text-[#F37021] hover:underline cursor-pointer"
            >
              Đăng nhập ngay
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Post Title */}
          <div>
            {activePostDetail.isPinned && (
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-[10px] font-bold mb-2 border border-amber-200">
                <Pin className="w-3 h-3 rotate-45 text-amber-600" />
                <span>Bài viết được ghim bởi Ban Quản trị</span>
              </div>
            )}
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#002D56] leading-snug">
              {activePostDetail.title}
            </h1>
          </div>

          {/* Cover image */}
          {activePostDetail.coverImage && (
            <div className="w-full max-h-80 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={activePostDetail.coverImage}
                alt={activePostDetail.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {activePostDetail.content}
          </div>

          {/* Tags */}
          {activePostDetail.tags && activePostDetail.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {activePostDetail.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-gray-100 text-gray-600 text-xs font-semibold"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Attached Documents */}
          {attachedDocs.length > 0 && (
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#F37021] uppercase tracking-wider">
                <Paperclip className="w-4 h-4" />
                <span>Học liệu đính kèm bài viết:</span>
              </div>
              <div className="space-y-2">
                {attachedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleOpenDoc(doc)}
                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-[#F37021] flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={doc.thumbnailUrl} alt={doc.title} className="w-9 h-11 object-cover rounded-lg shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-[#002D56] group-hover:text-[#F37021] transition-colors line-clamp-1">
                          {doc.title}
                        </h4>
                        <p className="text-[10px] text-gray-400">Lớp {doc.grade} • {doc.pagesCount} trang • {doc.fileType.toUpperCase()}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#F37021] flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Học ngay</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interaction Bar */}
          <div className="flex items-center justify-between border-y border-gray-100 py-3 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleLikePost(activePostDetail.id)}
                className="flex items-center space-x-1.5 text-rose-500 font-bold hover:scale-105 transition-transform cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>{activePostDetail.likesCount} Thích</span>
              </button>

              <div className="flex items-center space-x-1.5 text-[#002D56] font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>{activePostDetail.comments.length} Bình luận</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="text-xs font-bold text-[#002D56] hover:text-[#F37021] flex items-center space-x-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ liên kết</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-[#002D56]">
              Thảo luận & Phản hồi ({activePostDetail.comments.length})
            </h3>

            {/* Comment Input Box */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder={isGuest ? 'Đăng nhập Email để tham gia thảo luận...' : 'Viết cảm nghĩ, thắc mắc hoặc câu hỏi...'}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#F37021] hover:bg-[#e06216] text-white font-bold rounded-2xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {activePostDetail.comments.length > 0 ? (
                activePostDetail.comments.map((cmt) => (
                  <div key={cmt.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#002D56]">{cmt.authorName}</span>
                        <span className="px-1.5 py-0.2 rounded bg-orange-100 text-[#F37021] text-[8px] font-extrabold uppercase">
                          {cmt.authorRole}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {new Date(cmt.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{cmt.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-gray-400">
                  Chưa có phản hồi nào. Hãy là người đầu tiên tham gia thảo luận!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
