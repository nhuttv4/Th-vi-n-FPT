import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCard } from './PostCard';
import { PostCategory } from '../../types';
import {
  Newspaper,
  PlusCircle,
  Search,
  Pin,
  TrendingUp,
  Sparkles,
  Flame,
  ShieldCheck,
  Tag,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

export const HistoryNewsfeedView: React.FC = () => {
  const {
    currentUser,
    posts,
    setIsCreatePostModalOpen,
    setIsAuthModalOpen,
    setCurrentView,
    setSelectedCategory,
  } = useApp();

  const [selectedCategoryTab, setSelectedCategoryTab] = useState<PostCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      // Category filter
      if (selectedCategoryTab !== 'all' && p.category !== selectedCategoryTab) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchContent = p.content.toLowerCase().includes(q);
        const matchAuthor = p.authorName.toLowerCase().includes(q);
        const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchContent && !matchAuthor && !matchTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      // Pinned posts first, then chronological
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [posts, selectedCategoryTab, searchQuery]);

  const categories = [
    { id: 'all', name: 'Tất cả bài viết' },
    { id: 'announcement', name: '📢 Thông báo FPT' },
    { id: 'academic', name: '🏛️ Góc học thuật' },
    { id: 'exam_tips', name: '💡 Mẹo thi 9+' },
    { id: 'history_fact', name: '📜 Khám phá' },
    { id: 'discussion', name: '💬 Thảo luận mở' },
  ];

  const handleCreatePostClick = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCreatePostModalOpen(true);
  };

  return (
    <div id="history-newsfeed-view" className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#F37021] text-xs font-extrabold uppercase tracking-wider mb-1.5">
            <Newspaper className="w-4 h-4" />
            <span>Cộng đồng Lịch sử FPT Education</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D56] tracking-tight">
            Bảng tin & Diễn đàn Lịch sử
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            Nơi cập nhật thông báo học tập, trao đổi chuyên đề lịch sử, chia sẻ mẹo thi và giải đáp thắc mắc giữa thầy cô và học sinh THCS - THPT.
          </p>
        </div>

        {/* Action Button: Post new article */}
        <div className="shrink-0">
          <button
            id="create-new-post-btn"
            onClick={handleCreatePostClick}
            className="px-5 py-3 rounded-2xl bg-[#F37021] hover:bg-[#e06216] text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 flex items-center space-x-2 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Đăng bài viết mới</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Feed stream & Sidebar widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center: Post Stream (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter & Search Bar */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-xs space-y-3">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết, thông báo, tác giả hoặc từ khóa thảo luận..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white text-[#333]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryTab(cat.id as any)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    selectedCategoryTab === cat.id
                      ? 'bg-[#002D56] text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Post bar for logged in user */}
          {currentUser && (
            <div
              onClick={handleCreatePostClick}
              className="bg-white rounded-3xl p-4 border border-gray-100 shadow-xs flex items-center space-x-3 cursor-pointer hover:border-[#F37021] transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#002D56] text-white flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{currentUser.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 px-4 py-2.5 bg-gray-50 rounded-2xl text-xs text-gray-400 hover:bg-gray-100 transition-colors">
                Bạn có ý tưởng hay câu hỏi Lịch sử nào muốn thảo luận hôm nay?
              </div>
              <button className="p-2.5 rounded-2xl bg-[#F37021] text-white font-bold text-xs">
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Feed List */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#F37021] flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#002D56]">Không tìm thấy bài viết phù hợp</h3>
              <p className="text-xs text-gray-500">
                Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để khám phá các bài thảo luận.
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar Widgets (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Widget 1: Quản trị viên & Giáo viên đăng tin */}
          <div className="bg-[#002D56] text-white rounded-3xl p-5 shadow-xs relative overflow-hidden space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#F37021] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Góc Quản trị & Ban Cố vấn</span>
            </div>
            <h3 className="font-extrabold text-sm">Đăng thông báo & Tài liệu mới</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Quản trị viên và Giáo viên Lịch sử có thể đăng bài viết định hướng, tài liệu đính kèm và giải đáp trực tiếp các câu hỏi của học sinh.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleCreatePostClick}
                className="w-full py-2.5 px-4 bg-[#F37021] hover:bg-[#e06216] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Soạn bài viết mới</span>
              </button>
            </div>

            {/* Motif */}
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Widget 2: Chủ đề Hot đang thảo luận */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold text-[#002D56] flex items-center space-x-1.5">
                <Flame className="w-4 h-4 text-[#F37021]" />
                <span>Chủ đề thảo luận sôi nổi</span>
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                '#ĐạiSứLịchSử2026',
                '#KhángChiếnChốngMỹ',
                '#ĐiệnBiênPhủ',
                '#ChiếnLượcChiếnTranh',
                '#TrốngĐồngĐôngSơn',
                '#MẹoThi9Plus',
                '#Sử12',
                '#SửTHCS',
              ].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(tag.replace('#', ''))}
                  className="px-2.5 py-1 rounded-xl bg-gray-50 hover:bg-orange-50 hover:text-[#F37021] text-gray-600 text-xs font-medium border border-gray-100 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Widget 3: Quy tắc thảo luận học thuật */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#002D56] border-b border-gray-100 pb-2">
              <Sparkles className="w-4 h-4 text-[#F37021]" />
              <span>Văn hóa thảo luận Lịch sử FPT</span>
            </div>
            <ul className="text-[11px] text-gray-600 space-y-2 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-[#F37021] font-bold">1.</span>
                <span>Tôn trọng sự thật lịch sử và nguồn học liệu chuẩn mực GDPT 2018.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#F37021] font-bold">2.</span>
                <span>Trao đổi lịch sự, phản biện văn minh và mang tính xây dựng.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#F37021] font-bold">3.</span>
                <span>Khuyến khích chia sẻ sơ đồ tư duy, liên hệ thực tiễn và bài học lịch sử.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
