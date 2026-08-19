import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCategory, GradeLevel } from '../../types';
import {
  X,
  Send,
  Pin,
  Image as ImageIcon,
  Paperclip,
  Tag,
  BookOpen,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';

const COVER_PRESETS = [
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&auto=format&fit=crop&q=80',
];

export const CreatePostModal: React.FC = () => {
  const {
    currentUser,
    documents,
    isCreatePostModalOpen,
    setIsCreatePostModalOpen,
    addPost,
    showToast,
  } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('announcement');
  const [grade, setGrade] = useState<GradeLevel>('all');
  const [coverImage, setCoverImage] = useState(COVER_PRESETS[0]);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState('Lịch sử FPT, Thông báo');
  const [isPinned, setIsPinned] = useState(false);

  if (!isCreatePostModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết', 'warning');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addPost({
      title: title.trim(),
      content: content.trim(),
      category,
      grade,
      coverImage,
      attachedDocIds: selectedDocIds,
      tags: parsedTags.length > 0 ? parsedTags : ['Lịch sử FPT'],
      isPinned: currentUser?.role === 'admin' ? isPinned : false,
    });

    // Reset & close
    setTitle('');
    setContent('');
    setSelectedDocIds([]);
    setIsCreatePostModalOpen(false);
  };

  const toggleDocAttachment = (docId: string) => {
    if (selectedDocIds.includes(docId)) {
      setSelectedDocIds(selectedDocIds.filter((id) => id !== docId));
    } else {
      setSelectedDocIds([...selectedDocIds, docId]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in">
      <div
        id="create-post-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#002D56] text-white p-6 relative shrink-0">
          <button
            onClick={() => setIsCreatePostModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-[#F37021] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Bảng tin Lịch sử FPT</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Đăng bài viết & Thông báo mới</h2>
          <p className="text-xs text-blue-200 mt-1">
            Đăng tin tức, góc học thuật, mẹo ôn thi hoặc chủ đề thảo luận cho học sinh THCS & THPT.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Post Title */}
          <div>
            <label className="block text-xs font-bold text-[#002D56] mb-1">
              Tiêu đề bài viết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề thông báo hoặc chuyên đề thảo luận..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-[#002D56] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F37021]"
            />
          </div>

          {/* Category & Grade Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Chuyên mục bài viết</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PostCategory)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                <option value="announcement">📢 Thông báo & Sự kiện FPT</option>
                <option value="academic">🏛️ Góc học thuật & Phân tích</option>
                <option value="exam_tips">💡 Bí kíp 9+ & Mẹo ôn thi</option>
                <option value="history_fact">📜 Khám phá & Sự kiện lịch sử</option>
                <option value="discussion">💬 Thảo luận mở & Diễn đàn</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Dành cho Khối lớp</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLevel)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                <option value="all">Toàn bộ THCS & THPT</option>
                <optgroup label="Khối THCS">
                  <option value="6">Lớp 6</option>
                  <option value="7">Lớp 7</option>
                  <option value="8">Lớp 8</option>
                  <option value="9">Lớp 9</option>
                </optgroup>
                <optgroup label="Khối THPT">
                  <option value="10">Lớp 10</option>
                  <option value="11">Lớp 11</option>
                  <option value="12">Lớp 12 (Ôn thi tốt nghiệp)</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Cover Image Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center space-x-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#F37021]" />
              <span>Ảnh bìa bài viết</span>
            </label>
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {COVER_PRESETS.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCoverImage(img)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    coverImage === img ? 'border-[#F37021] ring-2 ring-orange-200 scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="cover option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-xs font-bold text-[#002D56] mb-1">
              Nội dung bài viết <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Soạn nội dung bài viết, phân tích chuyên đề, câu hỏi gợi mở thảo luận..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs leading-relaxed text-[#333] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F37021]"
            />
          </div>

          {/* Attach Documents from Library */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center space-x-1.5">
              <Paperclip className="w-3.5 h-3.5 text-blue-600" />
              <span>Đính kèm tài liệu học liệu liên quan (tùy chọn)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 bg-gray-50 border border-gray-200 rounded-xl">
              {documents.slice(0, 8).map((doc) => {
                const isSelected = selectedDocIds.includes(doc.id);
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => toggleDocAttachment(doc.id)}
                    className={`p-2 rounded-lg text-left flex items-center space-x-2 transition-all cursor-pointer text-xs border ${
                      isSelected
                        ? 'bg-orange-100 border-orange-300 text-[#002D56] font-bold'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#F37021]' : 'text-gray-400'}`} />
                    <span className="truncate flex-1">{doc.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <span>Thẻ từ khóa (phân cách bằng dấu phẩy)</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="VD: Lịch sử 12, Đề thi thử, Điện Biên Phủ, FPT Schools"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F37021]"
            />
          </div>

          {/* Pin Post (Admin only) */}
          {currentUser?.role === 'admin' && (
            <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <input
                type="checkbox"
                id="pin-post-checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 text-[#F37021] rounded-sm focus:ring-[#F37021]"
              />
              <label htmlFor="pin-post-checkbox" className="text-xs font-bold text-amber-900 flex items-center space-x-1 cursor-pointer">
                <Pin className="w-3.5 h-3.5 text-amber-600 rotate-45" />
                <span>Ghim bài viết này lên đầu Bảng tin</span>
              </label>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsCreatePostModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#e06216] text-white font-bold shadow-md shadow-orange-500/20 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Đăng bài ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
