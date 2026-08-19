import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DocumentType,
  DocumentCategory,
  DifficultyLevel,
  FileFormat,
  GradeLevel,
  SchoolLevel,
  DocumentStatus,
  DocumentPage,
  QuizQuestion,
} from '../../types';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  Layers,
  GraduationCap,
} from 'lucide-react';

export const AdminUploadDocumentModal: React.FC = () => {
  const {
    currentUser,
    isAdminUploadModalOpen,
    setIsAdminUploadModalOpen,
    addDocument,
    showToast,
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<DocumentType>('outline');
  const [category, setCategory] = useState<DocumentCategory>('vietnam');
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel>('thpt');
  const [grade, setGrade] = useState<GradeLevel>('12');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [fileType, setFileType] = useState<FileFormat>('pdf');
  const [fileSize, setFileSize] = useState('3.8 MB');
  const [pagesCount, setPagesCount] = useState(12);
  const [tagsInput, setTagsInput] = useState('Lịch sử 12, Đề cương, GDPT 2018');
  const [hasAnswerKey, setHasAnswerKey] = useState(true);
  const [status, setStatus] = useState<DocumentStatus>('published');
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80'
  );

  // Sample page 1 content
  const [samplePageContent, setSamplePageContent] = useState(
    'Nội dung tổng hợp bài học Lịch sử: Trọng tâm kiến thức, bối cảnh lịch sử, diễn biến then chốt và ý nghĩa thời đại...'
  );

  if (!isAdminUploadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Vui lòng nhập đầy đủ tiêu đề và tóm tắt tài liệu', 'warning');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const generatedPages: DocumentPage[] = Array.from({ length: Math.min(pagesCount, 8) }, (_, i) => ({
      pageNumber: i + 1,
      title: `Phần ${i + 1}: Trọng tâm kiến thức & Phân tích chủ đề`,
      content:
        i === 0
          ? samplePageContent
          : `Chi tiết nội dung trang ${i + 1} của tài liệu "${title}". Bao gồm hệ thống câu hỏi, sơ đồ khái quát các mốc thời gian và hướng dẫn trả lời chi tiết.`,
      keyTerms: ['Lịch sử Việt Nam', 'GDPT 2018', 'FPT Education'],
      footnotes: ['Tài liệu lưu hành nội bộ phục vụ học tập và nghiên cứu.'],
    }));

    const sampleQuestions: QuizQuestion[] = hasAnswerKey
      ? [
          {
            id: `q_${Date.now()}_1`,
            question: `Ý nghĩa quan trọng nhất của chuyên đề "${title}" trong chương trình Lịch sử là gì?`,
            options: [
              'Tạo bước ngoặt quyết định cho tiến trình lịch sử',
              'Đánh dấu sự kết thúc của thời kỳ khủng hoảng',
              'Mở ra kỷ nguyên độc lập tự do và phát triển',
              'Tất cả các ý trên đều đúng',
            ],
            correctAnswer: 3,
            explanation: 'Tổng hòa các nhân tố lịch sử tạo nên ý nghĩa sâu rộng và toàn diện.',
          },
        ]
      : [];

    addDocument({
      title: title.trim(),
      description: description.trim(),
      type,
      category,
      grade,
      subject: 'Lịch sử',
      difficulty,
      authorId: currentUser?.id || 'u_admin',
      authorName: currentUser?.name || 'Ban Quản trị Thư viện FPT',
      authorRole: 'admin',
      authorAvatar: currentUser?.avatar,
      fileUrl: '#',
      thumbnailUrl,
      fileType,
      fileSize: fileSize.trim() || '4.2 MB',
      pagesCount: Number(pagesCount) || 10,
      tags: parsedTags.length > 0 ? parsedTags : ['Lịch sử FPT'],
      status,
      hasAnswerKey,
      questionCount: sampleQuestions.length > 0 ? 10 : undefined,
      pages: generatedPages,
      sampleQuestions,
    });

    // Reset & close
    setTitle('');
    setDescription('');
    setIsAdminUploadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div
        id="admin-upload-document-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-[#002D56] text-white p-6 relative shrink-0">
          <button
            onClick={() => setIsAdminUploadModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-[#F37021] text-xs font-bold uppercase tracking-wider mb-1">
            <Upload className="w-4 h-4" />
            <span>Quản trị viên Thư viện FPT</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Tải lên & Xuất bản Học liệu mới</h2>
          <p className="text-xs text-blue-200 mt-1">
            Thêm tài liệu, đề thi, chuyên đề cho khối THCS (6–9) và THPT (10–12) vào kho dữ liệu chung.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Document Title */}
          <div>
            <label className="block text-xs font-bold text-[#002D56] mb-1">
              Tên tài liệu / Tiêu đề giáo án <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Chuyên đề Lịch sử 12 – Toàn cảnh Chiến dịch Điện Biên Phủ 1954"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-[#002D56] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F37021]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#002D56] mb-1">
              Tóm tắt nội dung & Mục tiêu học tập <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả trọng tâm kiến thức, đối tượng học sinh, ma trận đề thi..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#333] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F37021]"
            />
          </div>

          {/* School Level & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cấp học</label>
              <select
                value={schoolLevel}
                onChange={(e) => {
                  const val = e.target.value as SchoolLevel;
                  setSchoolLevel(val);
                  if (val === 'thcs') setGrade('8');
                  else if (val === 'thpt') setGrade('12');
                  else setGrade('all');
                }}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                <option value="thpt">Khối THPT (Lớp 10 - 12)</option>
                <option value="thcs">Khối THCS (Lớp 6 - 9)</option>
                <option value="all">Toàn cấp (THCS & THPT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Khối lớp cụ thể</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLevel)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                {schoolLevel === 'thcs' ? (
                  <>
                    <option value="6">Lớp 6</option>
                    <option value="7">Lớp 7</option>
                    <option value="8">Lớp 8</option>
                    <option value="9">Lớp 9</option>
                    <option value="all">Tất cả THCS</option>
                  </>
                ) : schoolLevel === 'thpt' ? (
                  <>
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12 (Ôn thi tốt nghiệp)</option>
                    <option value="all">Tất cả THPT</option>
                  </>
                ) : (
                  <>
                    <option value="all">Tất cả các khối</option>
                    <option value="6">Lớp 6</option>
                    <option value="7">Lớp 7</option>
                    <option value="8">Lớp 8</option>
                    <option value="9">Lớp 9</option>
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Document Type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Loại tài liệu</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as DocumentType)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                <option value="outline">Đề cương ôn tập</option>
                <option value="exercise">Bài tập trắc nghiệm</option>
                <option value="exam">Đề thi & Kiểm tra</option>
                <option value="ebook">Sách chuyên đề & Ebook</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Chủ đề Lịch sử</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                <option value="vietnam">Lịch sử Việt Nam</option>
                <option value="revolution">Cách mạng & Kháng chiến</option>
                <option value="world">Lịch sử thế giới</option>
                <option value="thpt_prep">Ôn thi THPT & ĐGNL</option>
                <option value="civilization">Văn minh nhân loại</option>
                <option value="modern">Lịch sử hiện đại</option>
              </select>
            </div>
          </div>

          {/* File Format, Size, Pages Count */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Định dạng file</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as FileFormat)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="pptx">PPTX</option>
                <option value="epub">EPUB</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Dung lượng</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="VD: 3.5 MB"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Số trang</label>
              <input
                type="number"
                min={1}
                value={pagesCount}
                onChange={(e) => setPagesCount(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              />
            </div>
          </div>

          {/* Upload Simulator box */}
          <div className="p-4 bg-orange-50/50 border-2 border-dashed border-orange-200 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white text-[#F37021] shadow-2xs flex items-center justify-center mx-auto">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#002D56]">Kéo thả file tài liệu hoặc nhấn để chọn tệp</p>
              <p className="text-[11px] text-gray-500">Hỗ trợ PDF, DOCX, PPTX, EPUB (Tối đa 100MB)</p>
            </div>
          </div>

          {/* Answer key & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <input
                type="checkbox"
                id="admin-has-answer-checkbox"
                checked={hasAnswerKey}
                onChange={(e) => setHasAnswerKey(e.target.checked)}
                className="w-4 h-4 text-[#F37021] rounded-sm focus:ring-[#F37021]"
              />
              <label htmlFor="admin-has-answer-checkbox" className="text-xs font-bold text-[#002D56] cursor-pointer">
                Đính kèm đáp án chi tiết
              </label>
            </div>

            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DocumentStatus)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
              >
                <option value="published">🟢 Xuất bản ngay vào Thư viện</option>
                <option value="draft">🟡 Lưu bản nháp (Draft)</option>
                <option value="hidden">🔴 Tạm ẩn khỏi học sinh</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Thẻ từ khóa tìm kiếm (phân cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="VD: Sử 12, Đề thi thử, Điện Biên Phủ, FPT Schools"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F37021]"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 flex items-center justify-end space-x-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAdminUploadModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#e06216] text-white font-bold shadow-md shadow-orange-500/20 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Xác nhận tải lên</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
