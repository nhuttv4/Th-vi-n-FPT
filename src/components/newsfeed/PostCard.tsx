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
        return { label: 'Thông báo', bg: 'bg-red-100 text-red-700 border-red-200' };
      case 'academic':
        return { label: 'Góc học thuật', bg: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'exam_tips':
        return { label: 'Mẹo thi 9+', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'history_fact':
        return { label: 'Khám phá', bg: 'bg-purple-100 text-purple-700 border-purple-200' };
      default:
        return { label: 'Thảo luận', bg: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
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
      className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 hover:border-[#F37021]/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        {/* Post Meta Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#002D56] text-white flex items-center justify-center font-bold text-xs overflow-hidden shrink-0 ring-2 ring-gray-100">
              {post.authorAvatar ? (
                <img src={post.authorAvatar} alt={post.authorName} className="w-full h-full object-cover" />
              ) : (
                <span>{post.authorName.charAt(0)}</span>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <h4 className="text-xs sm:text-sm font-bold text-[#002D56] group-hover:text-[#F37021] transition-colors">
                  {post.authorName}
                </h4>
                <span className="px-1.5 py-0.5 rounded-md bg-orange-100 text-[#F37021] text-[9px] font-extrabold uppercase">
                  {post.authorRole === 'admin'
                    ? 'Admin'
                    : post.authorRole === 'teacher'
                    ? 'Giáo viên'
                    : 'Học sinh'}
                </span>
                {post.grade && post.grade !== 'all' && (
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[9px] font-bold">
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
                <Pin className="w-3 h-3 rotate-45" />
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
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
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

        {/* Post Title */}
        <h3 className="text-base sm:text-lg font-extrabold text-[#002D56] group-hover:text-[#F37021] transition-colors leading-snug mb-2">
          {post.title}
        </h3>

        {/* Post Excerpt */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 mb-3">
          {post.content}
        </p>

        {/* Cover image preview if any */}
        {post.coverImage && (
          <div className="w-full h-44 rounded-2xl overflow-hidden mb-3 bg-gray-100">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        )}

        {/* Attached Document Badges */}
        {attachedDocs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {attachedDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  requireAuth(() => setActiveReaderDoc(doc, 1), `Đăng nhập Email để đọc tài liệu "${doc.title}".`);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-[#002D56] text-xs font-bold transition-all shadow-2xs"
              >
                <Paperclip className="w-3.5 h-3.5 text-[#F37021]" />
                <span className="truncate max-w-[200px]">{doc.title}</span>
                <span className="text-[10px] text-gray-400 font-normal">({doc.fileType.toUpperCase()})</span>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((t, idx) => (
              <span key={idx} className="text-[10px] font-semibold text-gray-400">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Interactions */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikePost(post.id);
            }}
            className="flex items-center space-x-1.5 hover:text-rose-500 transition-colors font-semibold cursor-pointer"
          >
            <Heart className="w-4 h-4 hover:fill-rose-500" />
            <span>{post.likesCount}</span>
          </button>

          <div className="flex items-center space-x-1.5 hover:text-[#002D56] transition-colors font-semibold">
            <MessageSquare className="w-4 h-4" />
            <span>{post.commentsCount || post.comments?.length || 0}</span>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="p-1.5 rounded-xl hover:bg-gray-100 hover:text-[#002D56] transition-colors flex items-center space-x-1 cursor-pointer"
          title="Chia sẻ bài viết"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium hidden sm:inline">Chia sẻ</span>
        </button>
      </div>
    </article>
  );
};
