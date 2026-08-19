import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentCard } from './DocumentCard';
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Layers,
} from 'lucide-react';
import { DocumentType, DocumentCategory, DifficultyLevel, FileFormat, GradeLevel, SchoolLevel } from '../../types';

export const LibraryView: React.FC = () => {
  const {
    documents,
    searchQuery,
    setSearchQuery,
    selectedSchoolLevel,
    setSelectedSchoolLevel,
    selectedGrade,
    setSelectedGrade,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    setIsAIModalOpen,
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedFormat, setSelectedFormat] = useState<FileFormat | 'all'>('all');
  const [hasAnswerOnly, setHasAnswerOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'views' | 'downloads' | 'rating'>('newest');

  // Clear all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSchoolLevel('all');
    setSelectedGrade('all');
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedFormat('all');
    setHasAnswerOnly(false);
    setSortBy('newest');
  };

  // Filter logic
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Only published docs for standard library
      if (doc.status === 'hidden') return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchDesc = doc.description.toLowerCase().includes(q);
        const matchAuthor = doc.authorName.toLowerCase().includes(q);
        const matchTag = doc.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchAuthor && !matchTag) {
          return false;
        }
      }

      // School Level filter
      if (selectedSchoolLevel === 'thcs') {
        const isThcs = ['6', '7', '8', '9'].includes(doc.grade) || doc.grade === 'all';
        if (!isThcs) return false;
      } else if (selectedSchoolLevel === 'thpt') {
        const isThpt = ['10', '11', '12'].includes(doc.grade) || doc.grade === 'all';
        if (!isThpt) return false;
      }

      // Specific Grade filter
      if (selectedGrade !== 'all' && doc.grade !== selectedGrade && doc.grade !== 'all') {
        return false;
      }

      // Type
      if (selectedType !== 'all' && doc.type !== selectedType) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'all' && doc.difficulty !== selectedDifficulty) {
        return false;
      }

      // Format
      if (selectedFormat !== 'all' && doc.fileType !== selectedFormat) {
        return false;
      }

      // Answer key
      if (hasAnswerOnly && !doc.hasAnswerKey) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'views') return b.viewCount - a.viewCount;
      if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    documents,
    searchQuery,
    selectedSchoolLevel,
    selectedGrade,
    selectedType,
    selectedCategory,
    selectedDifficulty,
    selectedFormat,
    hasAnswerOnly,
    sortBy,
  ]);

  const categoriesList: { id: DocumentCategory | 'all'; name: string }[] = [
    { id: 'all', name: 'Tất cả chủ đề' },
    { id: 'vietnam', name: 'Lịch sử Việt Nam' },
    { id: 'revolution', name: 'Cách mạng & Kháng chiến' },
    { id: 'world', name: 'Lịch sử thế giới' },
    { id: 'thpt_prep', name: 'Ôn thi & Luyện đề' },
    { id: 'civilization', name: 'Văn minh nhân loại' },
    { id: 'modern', name: 'Lịch sử hiện đại' },
  ];

  const typesList: { id: DocumentType | 'all'; name: string }[] = [
    { id: 'all', name: 'Tất cả loại' },
    { id: 'outline', name: 'Đề cương ôn tập' },
    { id: 'exercise', name: 'Bài tập trắc nghiệm' },
    { id: 'exam', name: 'Đề thi mẫu' },
    { id: 'ebook', name: 'Sách & Chuyên đề' },
  ];

  const isFilterActive =
    searchQuery !== '' ||
    selectedSchoolLevel !== 'all' ||
    selectedGrade !== 'all' ||
    selectedType !== 'all' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedFormat !== 'all' ||
    hasAnswerOnly;

  return (
    <div id="library-view" className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#F37021] text-xs font-extrabold uppercase tracking-wider mb-1.5">
            <Layers className="w-4 h-4" />
            <span>Kho học liệu số FPT Education</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D56] tracking-tight">
            Thư viện Lịch sử THCS & THPT
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            Khai thác kho giáo án, đề thi, chuyên đề ôn tập chuẩn chương trình GDPT 2018 cho học sinh từ Lớp 6 đến Lớp 12.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200">
            <button
              id="view-grid-btn"
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-[#F37021]' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Dạng lưới"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="view-list-btn"
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-white shadow-xs text-[#F37021]' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Dạng danh sách"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsAIModalOpen(true)}
            className="px-3.5 py-2.5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-[#F37021] text-xs font-bold flex items-center space-x-1.5 border border-orange-200 shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trợ lý AI</span>
          </button>
        </div>
      </div>

      {/* School Level Filter Bar (THCS vs THPT) */}
      <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Level Tabs */}
        <div className="flex items-center bg-gray-100 p-1 rounded-2xl border border-gray-200 text-xs font-bold">
          <button
            onClick={() => {
              setSelectedSchoolLevel('all');
              setSelectedGrade('all');
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedSchoolLevel === 'all'
                ? 'bg-[#002D56] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tất cả cấp học
          </button>
          <button
            onClick={() => {
              setSelectedSchoolLevel('thcs');
              if (['10', '11', '12'].includes(selectedGrade)) setSelectedGrade('all');
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedSchoolLevel === 'thcs'
                ? 'bg-[#F37021] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Khối THCS (Lớp 6, 7, 8, 9)
          </button>
          <button
            onClick={() => {
              setSelectedSchoolLevel('thpt');
              if (['6', '7', '8', '9'].includes(selectedGrade)) setSelectedGrade('all');
            }}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedSchoolLevel === 'thpt'
                ? 'bg-[#002D56] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Khối THPT (Lớp 10, 11, 12)
          </button>
        </div>

        {/* Specific Grade Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs font-bold">
          <span className="text-gray-400 font-semibold mr-1 text-[11px]">Khối:</span>
          {(selectedSchoolLevel === 'thcs'
            ? [
                { id: 'all', label: 'Tất cả THCS' },
                { id: '6', label: 'Lớp 6' },
                { id: '7', label: 'Lớp 7' },
                { id: '8', label: 'Lớp 8' },
                { id: '9', label: 'Lớp 9' },
              ]
            : selectedSchoolLevel === 'thpt'
            ? [
                { id: 'all', label: 'Tất cả THPT' },
                { id: '10', label: 'Lớp 10' },
                { id: '11', label: 'Lớp 11' },
                { id: '12', label: 'Lớp 12' },
              ]
            : [
                { id: 'all', label: 'Tất cả' },
                { id: '6', label: 'Lớp 6' },
                { id: '7', label: 'Lớp 7' },
                { id: '8', label: 'Lớp 8' },
                { id: '9', label: 'Lớp 9' },
                { id: '10', label: 'Lớp 10' },
                { id: '11', label: 'Lớp 11' },
                { id: '12', label: 'Lớp 12' },
              ]
          ).map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGrade(g.id as GradeLevel)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                selectedGrade === g.id
                  ? 'bg-orange-500 text-white shadow-xs font-extrabold'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Sort Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search bar */}
        <div className="md:col-span-8 relative">
          <input
            id="library-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên bài học, thời kỳ lịch sử, tác giả hoặc từ khóa..."
            className="w-full pl-11 pr-4 py-3 bg-white text-xs sm:text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F37021]/20 focus:border-[#F37021] shadow-xs text-[#333]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Sort dropdown */}
        <div className="md:col-span-4">
          <select
            id="sort-by-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full py-3 px-4 bg-white border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-[#F37021] focus:outline-none shadow-xs cursor-pointer"
          >
            <option value="newest">Sắp xếp: Mới nhất</option>
            <option value="views">Sắp xếp: Xem nhiều nhất</option>
            <option value="downloads">Sắp xếp: Tải nhiều nhất</option>
            <option value="rating">Sắp xếp: Đánh giá cao nhất</option>
          </select>
        </div>
      </div>

      {/* Secondary filter chips & Reset button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Type pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {typesList.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedType === t.id
                  ? 'bg-[#002D56] text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Action tags */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setHasAnswerOnly(!hasAnswerOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center space-x-1.5 transition-colors cursor-pointer ${
              hasAnswerOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Có đáp án chi tiết</span>
          </button>

          {isFilterActive && (
            <button
              id="reset-filters-btn"
              onClick={handleResetFilters}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* Category selector row */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        <span className="text-gray-400 font-bold shrink-0">Chủ đề:</span>
        {categoriesList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-orange-100 text-[#F37021] border border-orange-300 font-bold'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
        <div>
          Tìm thấy <span className="font-extrabold text-[#002D56]">{filteredDocuments.length}</span> tài liệu phù hợp
        </div>
        {searchQuery && (
          <div>
            Từ khóa: <span className="font-bold text-[#F37021]">"{searchQuery}"</span>
          </div>
        )}
      </div>

      {/* Document Grid / List */}
      {filteredDocuments.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} viewMode="list" />
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4 max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#F37021] flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#002D56]">Không tìm thấy tài liệu phù hợp</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Thử chọn cấp học khác (THCS / THPT) hoặc nhấn nút xóa bộ lọc để xem toàn bộ kho học liệu Lịch sử FPT.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#e06216] text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
