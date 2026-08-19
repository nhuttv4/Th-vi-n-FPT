import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem, GradeLevel, SchoolLevel } from '../../types';
import { DongSonDrumMotif } from '../theme/DongSonDrumMotif';
import { ChimLacCraneMotif } from '../theme/ChimLacCraneMotif';
import { LyTranDragonMotif } from '../theme/LyTranDragonMotif';
import { VietnamDecorativeBorder } from '../theme/VietnamDecorativeBorders';
import {
  BookOpen,
  Search,
  Bookmark,
  Download,
  Eye,
  Star,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
  Filter,
  CheckCircle2,
  FileText,
  RotateCcw,
  Library,
  Scroll,
  Flame,
} from 'lucide-react';

export const EbooksReferenceView: React.FC = () => {
  const {
    documents,
    setActiveDetailDoc,
    setActiveReaderDoc,
    toggleFavorite,
    isFavorite,
    incrementDownload,
    setIsAIModalOpen,
    setAiPromptPreset,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');
  const [selectedGradeTab, setSelectedGradeTab] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'views' | 'newest'>('rating');

  // Filter only ebooks and reference books
  const ebookDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Must be ebook or comprehensive outline/reference
      const isEbookOrRef = doc.type === 'ebook' || doc.pagesCount >= 10 || doc.tags.some(t => t.toLowerCase().includes('sách') || t.toLowerCase().includes('chuyên đề') || t.toLowerCase().includes('cẩm nang'));
      if (!isEbookOrRef) return false;

      // Category tab filter
      if (selectedCategoryTab !== 'all') {
        if (selectedCategoryTab === 'chinh-su') {
          if (doc.category !== 'vietnam' && !doc.title.includes('Sử Ký') && !doc.title.includes('Quân Sự')) return false;
        } else if (selectedCategoryTab === 'thpt-prep') {
          if (doc.category !== 'thpt_prep' && !doc.title.includes('Luyện Thi') && !doc.title.includes('9+')) return false;
        } else if (selectedCategoryTab === 'di-san') {
          if (doc.category !== 'civilization' && !doc.title.includes('Văn Minh') && !doc.title.includes('Di Sản')) return false;
        } else if (selectedCategoryTab === 'thcs') {
          if (!['6', '7', '8', '9'].includes(doc.grade)) return false;
        }
      }

      // Grade tab filter
      if (selectedGradeTab !== 'all') {
        if (doc.grade !== selectedGradeTab && doc.grade !== 'all') return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchDesc = doc.description.toLowerCase().includes(q);
        const matchAuthor = doc.authorName.toLowerCase().includes(q);
        const matchTag = doc.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchAuthor && !matchTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'views') return b.viewCount - a.viewCount;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.rating - a.rating;
    });
  }, [documents, selectedCategoryTab, selectedGradeTab, searchQuery, sortBy]);

  // Featured Masterpiece (Đại Việt Sử Ký Toàn Thư / Nghệ Thuật Quân Sự)
  const featuredBook = documents.find(d => d.id === 'doc_15') || ebookDocuments[0] || documents[0];

  const categories = [
    { id: 'all', label: 'Tất cả Sách & Ebook' },
    { id: 'chinh-su', label: '📜 Chính Sử & Chuyên Khảo Đại Việt' },
    { id: 'thpt-prep', label: '🎯 Cẩm Nang Luyện Thi 9+' },
    { id: 'di-san', label: '🏛️ Di Sản & Văn Minh Dân Tộc' },
    { id: 'thcs', label: '🎒 Sách Tham Khảo Khối THCS' },
  ];

  const grades = [
    { id: 'all', label: 'Toàn bộ khối lớp' },
    { id: '6', label: 'Lớp 6' },
    { id: '7', label: 'Lớp 7' },
    { id: '8', label: 'Lớp 8' },
    { id: '9', label: 'Lớp 9' },
    { id: '10', label: 'Lớp 10' },
    { id: '11', label: 'Lớp 11' },
    { id: '12', label: 'Lớp 12' },
  ];

  const handleAskAIAboutBook = (book: DocumentItem) => {
    setAiPromptPreset(`Hãy tóm tắt nội dung chính, giá trị lịch sử và phân tích các bài học kinh nghiệm từ cuốn sách: "${book.title}".`);
    setIsAIModalOpen(true);
  };

  return (
    <div id="ebooks-reference-view" className="space-y-6 animate-in fade-in">
      {/* 1. Header Banner with FPT Branding + Ly/Tran Dragon & Chim Lac Motifs */}
      <div className="bg-[#002D56] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-[#F37021]/30">
        {/* Dong Son Watermark Background */}
        <div className="absolute -right-12 -bottom-12 pointer-events-none opacity-20">
          <DongSonDrumMotif size={280} color="#FEF3C7" />
        </div>

        {/* Chim Lac Top Left Motif */}
        <div className="absolute top-3 right-8 pointer-events-none opacity-25 hidden md:block">
          <ChimLacCraneMotif size={90} color="#F37021" direction="left" />
        </div>

        {/* Ly Dragon Motif Accents */}
        <div className="absolute -left-6 bottom-0 pointer-events-none opacity-15">
          <LyTranDragonMotif type="ly" size={130} color="#F37021" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold backdrop-blur-xs border border-amber-300/30">
            <Scroll className="w-3.5 h-3.5 text-[#F37021]" />
            <span>FPT History Library • Tủ Sách Điện Tử & Tham Khảo Lịch Sử</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-serif text-white">
            Sách Tham Khảo & Sách Điện Tử
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Không gian lưu trữ và tra cứu các bộ quốc sử Đại Việt, chuyên khảo khảo cứu văn hóa thời Lý – Trần, sách giáo khoa số hóa và cẩm nang bứt phá điểm 9+ môn Lịch sử chuẩn GDPT 2018.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-xl bg-orange-500/20 text-[#F37021] font-bold border border-orange-500/30 flex items-center space-x-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{ebookDocuments.length} Đầu sách số hóa</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đọc trực tuyến & Tải PDF/EPUB</span>
            </span>
          </div>
        </div>

        {/* Decorative Traditional Border at Bottom */}
        <div className="mt-4 pt-3 border-t border-white/10 opacity-70">
          <VietnamDecorativeBorder patternType="ly-lotus" color="#F37021" height={12} />
        </div>
      </div>

      {/* 2. Featured Masterpiece Spotlight Card */}
      {featuredBook && (
        <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs hover:border-[#F37021]/50 transition-all relative overflow-hidden">
          <div className="flex items-center space-x-2 text-[#002D56] text-xs font-black uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-[#F37021]" />
            <span>Tác Phẩm Lịch Sử Tiêu Biểu Tuyển Chọn</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Book Cover with 3D Spine effect */}
            <div className="lg:col-span-4 flex justify-center">
              <div
                onClick={() => setActiveDetailDoc(featuredBook)}
                className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border-4 border-amber-100 transform hover:-rotate-1 transition-all"
              >
                <img
                  src={featuredBook.thumbnailUrl}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="px-2 py-0.5 rounded-md bg-[#F37021] text-[10px] font-black uppercase w-fit mb-1 shadow-xs">
                    {featuredBook.fileType}
                  </span>
                  <p className="text-xs font-bold line-clamp-2">{featuredBook.title}</p>
                </div>
              </div>
            </div>

            {/* Book Info & Description */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-orange-50 text-[#F37021] text-xs font-extrabold border border-orange-200">
                  Bản Số Hóa Đặc Biệt
                </span>
                <span className="px-3 py-1 rounded-xl bg-blue-50 text-[#002D56] text-xs font-bold">
                  {featuredBook.pagesCount} Trang • {featuredBook.fileSize}
                </span>
                <span className="flex items-center text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span>{featuredBook.rating} / 5.0</span>
                </span>
              </div>

              <h2
                onClick={() => setActiveDetailDoc(featuredBook)}
                className="text-xl sm:text-2xl font-black text-[#002D56] hover:text-[#F37021] transition-colors cursor-pointer font-serif"
              >
                {featuredBook.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                {featuredBook.description}
              </p>

              <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                <span>Tác giả: <strong className="text-[#002D56]">{featuredBook.authorName}</strong></span>
                <span>•</span>
                <span>Lượt đọc: <strong className="text-[#F37021]">{featuredBook.viewCount.toLocaleString()}</strong></span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  id="featured-read-btn"
                  onClick={() => setActiveReaderDoc(featuredBook, 1)}
                  className="px-5 py-2.5 rounded-2xl bg-[#002D56] hover:bg-[#001f3d] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#F37021]" />
                  <span>Đọc Sách Trực Tuyến</span>
                </button>

                <button
                  onClick={() => handleAskAIAboutBook(featuredBook)}
                  className="px-4 py-2.5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-[#F37021] font-bold text-xs sm:text-sm border border-orange-200 transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F37021]" />
                  <span>Hỏi AI Phân Tích Sách</span>
                </button>

                <button
                  onClick={() => toggleFavorite(featuredBook.id)}
                  className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                    isFavorite(featuredBook.id)
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Lưu vào tủ sách"
                >
                  <Bookmark className={`w-4 h-4 ${isFavorite(featuredBook.id) ? 'fill-rose-600' : ''}`} />
                </button>

                <button
                  onClick={() => incrementDownload(featuredBook.id)}
                  className="p-2.5 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  title="Tải về máy"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-xs space-y-4">
        {/* Search input & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sách tham khảo, tác giả, chuyên khảo thời Lý - Trần, chính sử..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-[#002D56] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
              >
                Xóa
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
            <span className="text-xs text-gray-500 font-medium">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#002D56] focus:outline-none focus:ring-2 focus:ring-[#F37021]"
            >
              <option value="rating">⭐ Đánh giá cao nhất</option>
              <option value="views">🔥 Lượt đọc nhiều nhất</option>
              <option value="newest">🕒 Mới cập nhật</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryTab(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategoryTab === cat.id
                  ? 'bg-[#002D56] text-white shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grade Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-gray-100 pt-3">
          <span className="text-[11px] text-gray-400 font-bold shrink-0">Phân theo khối:</span>
          {grades.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGradeTab(g.id)}
              className={`shrink-0 px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                selectedGradeTab === g.id
                  ? 'bg-[#F37021] text-white shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Book Grid Display */}
      {ebookDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {ebookDocuments.map((book) => {
            const isFav = isFavorite(book.id);
            return (
              <div
                key={book.id}
                id={`ebook-card-${book.id}`}
                className="bg-white rounded-3xl border border-gray-100 hover:border-[#F37021] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Book Cover Header with Motif */}
                  <div
                    onClick={() => setActiveDetailDoc(book)}
                    className="relative aspect-[16/10] bg-slate-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={book.thumbnailUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Grade Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#002D56]/85 text-white text-[10px] font-bold backdrop-blur-xs">
                        {book.grade === 'all' ? 'Toàn cấp' : `Khối ${book.grade}`}
                      </span>
                    </div>

                    {/* Format & Favorite */}
                    <div className="absolute top-2.5 right-2.5 flex items-center space-x-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#F37021] text-white text-[10px] font-black uppercase shadow-xs">
                        {book.fileType}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(book.id);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                          isFav ? 'bg-rose-500 text-white' : 'bg-black/50 text-white hover:bg-black'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-lg bg-white/90 text-[#002D56] text-[10px] font-bold shadow-xs">
                        {book.pagesCount} trang
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-1.5 cursor-pointer" onClick={() => setActiveDetailDoc(book)}>
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#F37021] uppercase tracking-wider">
                      <span>Sách Tham Khảo & Ebook</span>
                    </div>

                    <h3 className="font-bold text-sm text-[#002D56] group-hover:text-[#F37021] transition-colors line-clamp-2 font-serif">
                      {book.title}
                    </h3>

                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                      <span className="truncate max-w-[130px] font-medium text-gray-600">{book.authorName}</span>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center space-x-0.5">
                          <Eye className="w-3 h-3" />
                          <span>{book.viewCount.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-0.5 text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{book.rating}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                  <button
                    onClick={() => incrementDownload(book.id)}
                    className="text-xs text-gray-500 hover:text-[#F37021] flex items-center space-x-1 font-medium cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{book.fileSize}</span>
                  </button>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleAskAIAboutBook(book)}
                      className="p-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F37021] transition-colors cursor-pointer"
                      title="Hỏi AI phân tích sách"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveReaderDoc(book, 1)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#002D56] hover:bg-[#001f3d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center space-x-1"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#F37021]" />
                      <span>Đọc ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#F37021] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#002D56]">Không tìm thấy đầu sách phù hợp</h3>
          <p className="text-xs text-gray-500">
            Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục "Tất cả Sách & Ebook".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategoryTab('all');
              setSelectedGradeTab('all');
            }}
            className="px-4 py-2 bg-[#002D56] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
