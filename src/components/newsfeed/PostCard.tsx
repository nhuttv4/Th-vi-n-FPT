import React from 'react';
import { useApp } from '../../context/AppContext';
import { HistoryPost } from '../../types';
import {
  MessageSquare,
  Heart,
  Pin,
  Eye,
  Paperclip,
  Share2,
  MoreVertical,
  BookOpen,
  Trash2,
  Sparkles,
} from 'lucide-react';

interface PostCardProps {
  post: HistoryPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    currentUser,
    documents,
    setActivePostDetail,
    toggleLikePost,
    togglePinPost,
    deletePost,
    setActiveReaderDoc,
    generateShareUrl,
    requireAuth,
    showToast,
  } = useApp();

  const getCategoryBadge = (cat: HistoryPost['category']) => {
    switch (cat) {
      case 'announcement':
        return { label: 'Thông báo', bg: 'bg-red-50 text-[#991B1B] border border-red-200' };
      case 'academic':
        return { label: 'Góc học thuật', bg: 'bg-amber-50 text-[#92400E] border border-amber-200' };
      case 'exam_tips':
        return { label: 'Mẹo thi 9+', bg: 'bg-amber-100 text-amber-900 border border-amber-300' };
      case 'history_fact':
        return { label: 'Khám phá Sử Việt', bg: 'bg-purple-50 text-purple-800 border border-purple-200' };
      default:
        return { label: 'Thảo luận mở', bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200' };
    }
  };

  const badge = getCategoryBadge(post.category);

  // Attached docs
  const attachedDocs = documents.filter((d) => post.attachedDocIds?.includes(d.id));

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    generateShareUrl('post', post.id);
  };

  return (
    <article
      id={`post-${post.id}`}
      onClick={() => setActivePostDetail(post)}
      className="bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 border border-[#EAE1D1] hover:border-[#991B1B]/60 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Post Meta Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A0C0C] text-[#FEF3C7] flex items-center justify-center font-bold text-xs overflow-hidden shrink-0 ring-2 ring-amber-200">
              {post.authorAvatar ? (
                <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
              ) : (
                <span>{post.authorName.charAt(0)}</span>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h4 className="text-xs sm:text-sm font-bold text-[#4A0C0C] group-hover:text-[#991B1B] transition-colors font-serif">
                  {post.authorName}
                </h4>
                <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[#991B1B] text-[9px] font-extrabold uppercase">
                  {post.authorRole === 'admin'
                    ? 'Admin'
                    : post.authorRole === 'teacher'
                    ? 'Giáo viên'
                    : 'Học sinh'}
                </span>
                {post.grade && post.grade !== 'all' && (
                  <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-[#92400E] border border-amber-200 text-[9px] font-bold">
                    Khối {post.grade}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {post.isPinned && (
              <span className="px-2 py-1 rounded-xl bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center space-x-1 border border-amber-200 shadow-2xs">
                <Pin className="w-3 h-3 rotate-45 text-[#991B1B]" />
                <span>Ghim</span>
              </span>
            )}
            <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${badge.bg}`}>
              {badge.label}
            </span>

            {currentUser?.role === 'admin' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePinPost(post.id);
                }}
                className="p-1.5 rounded-xl hover:bg-amber-100 text-gray-400 hover:text-amber-700 transition-colors cursor-pointer"
                title="Ghim/Bỏ ghim"
              >
                <Pin className="w-3.5 h-3.5" />
              </button>
            )}

            {(currentUser?.role === 'admin' || (currentUser && currentUser.id === post.authorId)) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(post.id);
                }}
                className="p-1.5 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                title="Xóa bài viết"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Post Title & Content */}
        <div className="space-y-2 mb-3">
          <h3 className="font-extrabold text-sm sm:text-base text-[#4A0C0C] group-hover:text-[#991B1B] transition-colors leading-snug font-serif">
            {post.title}
          </h3>

          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 whitespace-pre-line font-normal">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-amber-50 text-[#92400E] border border-amber-200 text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Attached Documents Preview (If any) */}
        {attachedDocs.length > 0 && (
          <div className="mb-3 p-3 rounded-2xl bg-[#FAF6EE] border border-[#EAE1D1] space-y-2">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#991B1B]">
              <Paperclip className="w-3.5 h-3.5" />
              <span>Tài liệu Lịch sử đính kèm ({attachedDocs.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {attachedDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveReaderDoc(doc);
                  }}
                  className="p-2.5 rounded-xl bg-white border border-[#EAE1D1] hover:border-[#991B1B] flex items-center justify-between gap-2 transition-all cursor-pointer group/doc"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-[#991B1B] flex items-center justify-center shrink-0 border border-red-200">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#4A0C0C] truncate group-hover/doc:text-[#991B1B]">
                        {doc.title}
                      </p>
                      <p className="text-[9px] text-gray-500">Khối {doc.grade} • {doc.pagesCount} trang</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#991B1B] shrink-0">Đọc ngay →</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Post Footer Actions */}
      <div className="pt-3 border-t border-[#EAE1D1] flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikePost(post.id);
            }}
            className="flex items-center space-x-1.5 hover:text-rose-500 transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                currentUser && post.likedUserIds?.includes(currentUser.id)
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-gray-400'
              }`}
            />
            <span className="font-semibold text-[11px]">{post.likesCount}</span>
          </button>

          <div className="flex items-center space-x-1.5 hover:text-[#991B1B] transition-colors">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-[11px]">{post.commentsCount} bình luận</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-[11px] text-gray-400">
            <Eye className="w-3.5 h-3.5" />
            <span>{post.viewCount} lượt xem</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="p-1.5 rounded-xl hover:bg-amber-100 text-gray-500 hover:text-[#991B1B] flex items-center space-x-1 transition-colors cursor-pointer text-[11px] font-medium"
            title="Chia sẻ bài viết"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chia sẻ</span>
          </button>

          <span className="text-[11px] font-bold text-[#991B1B] group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5">
            <span>Thảo luận</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </article>
  );
};
