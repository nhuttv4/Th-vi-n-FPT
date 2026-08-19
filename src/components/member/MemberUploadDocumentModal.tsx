import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  UploadCloud,
  FileText,
  BookOpen,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  Tag,
  GraduationCap,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DocumentType, DocumentCategory, GradeLevel, DifficultyLevel, FileFormat, QuizQuestion } from '../../types';
import { ChimLacCraneMotif } from '../theme/ChimLacCraneMotif';
import { DongSonDrumMotif } from '../theme/VietnamDecorativeBorders';

export const MemberUploadDocumentModal: React.FC = () => {
  const { isMemberUploadModalOpen, setIsMemberUploadModalOpen, addDocument, currentUser, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<DocumentType>('outline');
  const [category, setCategory] = useState<DocumentCategory>('vietnam');
  const [grade, setGrade] = useState<GradeLevel>('12');
  const [subject, setSubject] = useState('Lịch sử Việt Nam');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [fileFormat, setFileFormat] = useState<FileFormat>('pdf');
  const [tagsInput, setTagsInput] = useState('Lịch sử 12, Đề cương ôn tập, Hào khí Đông A');
  const [hasAnswerKey, setHasAnswerKey] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('3.8 MB');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Optional quiz questions
  const [includeQuiz, setIncludeQuiz] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOpt1, setQuizOpt1] = useState('');
  const [quizOpt2, setQuizOpt2] = useState('');
  const [quizOpt3, setQuizOpt3] = useState('');
  const [quizOpt4, setQuizOpt4] = useState('');
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizExplanation, setQuizExplanation] = useState('');

  if (!isMemberUploadModalOpen) return null;

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (file.name.endsWith('.docx')) setFileFormat('docx');
      else if (file.name.endsWith('.pptx')) setFileFormat('pptx');
      else if (file.name.endsWith('.epub')) setFileFormat('epub');
      else setFileFormat('pdf');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (file.name.endsWith('.docx')) setFileFormat('docx');
      else if (file.name.endsWith('.pptx')) setFileFormat('pptx');
      else if (file.name.endsWith('.epub')) setFileFormat('epub');
      else setFileFormat('pdf');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Vui lòng nhập tên tài liệu / học liệu', 'warning');
      return;
    }
    if (!description.trim()) {
      showToast('Vui lòng nhập mô tả tóm tắt nội dung tài liệu', 'warning');
      return;
    }

    setIsSubmitting(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const sampleQuestions: QuizQuestion[] = [];
    if (includeQuiz && quizQuestion.trim()) {
      sampleQuestions.push({
        id: `q_user_${Date.now()}`,
        question: quizQuestion.trim(),
        options: [
          quizOpt1 || 'Phương án A',
          quizOpt2 || 'Phương án B',
          quizOpt3 || 'Phương án C',
          quizOpt4 || 'Phương án D',
        ],
        correctAnswer: quizCorrect,
        explanation: quizExplanation.trim() || 'Giải thích chi tiết của tác giả.',
      });
    }

    const defaultThumbs: Record<string, string> = {
      vietnam: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80',
      civilization: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      wars: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      revolution: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    };

    setTimeout(() => {
      addDocument({
        title: title.trim(),
        description: description.trim(),
        type,
        category,
        grade,
        subject: subject.trim() || 'Lịch sử',
        difficulty,
        authorId: currentUser?.id || 'u_guest',
        authorName: currentUser?.name || 'Thành viên FPT',
        authorRole: currentUser?.role || 'student',
        authorAvatar: currentUser?.avatar,
        fileUrl: `/uploads/${fileName || 'hoc-lieu-lich-su.pdf'}`,
        thumbnailUrl: defaultThumbs[category] || defaultThumbs.vietnam,
        fileType: fileFormat,
        fileSize: fileSize || '2.5 MB',
        pagesCount: type === 'ebook' ? 45 : 12,
        tags: tags.length > 0 ? tags : ['Học liệu đóng góp', 'Lịch sử FPT'],
        status: 'pending',
        hasAnswerKey,
        questionCount: hasAnswerKey ? questionCount : undefined,
        sampleQuestions: sampleQuestions.length > 0 ? sampleQuestions : undefined,
      });

      setIsSubmitting(false);
      setIsMemberUploadModalOpen(false);

      // Reset
      setTitle('');
      setDescription('');
      setFileName('');
      setIncludeQuiz(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EAE1D1] overflow-hidden my-8"
        >
          {/* Decorative History Background Motif */}
          <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-5 overflow-hidden">
            <DongSonDrumMotif className="w-full h-full text-[#F37021]" />
          </div>

          {/* Header */}
          <div className="relative px-6 py-5 border-b border-[#EAE1D1] bg-gradient-to-r from-[#002D56] to-[#0A4D8C] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F37021] text-white flex items-center justify-center shadow-md">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Đóng Góp Tài Liệu & Học Liệu Lịch Sử</h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Phê duyệt bởi Admin
                  </span>
                </div>
                <p className="text-xs text-blue-100 flex items-center gap-1.5 mt-0.5">
                  <ChimLacCraneMotif className="w-3.5 h-3.5 text-[#F37021] inline" />
                  Chia sẻ tri thức sử học tới cộng đồng FPT Education
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMemberUploadModalOpen(false)}
              className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Important Approval Notice */}
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-amber-900">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-amber-950">Quy trình kiểm duyệt chuẩn Thư viện FPT:</p>
              <p className="text-amber-800 leading-relaxed">
                Tài liệu của bạn sau khi gửi sẽ được <strong>Ban Quản trị phê duyệt</strong> về mặt tính chính xác sử liệu và định dạng. Sau khi được duyệt, tài liệu sẽ hiển thị công khai trên toàn hệ thống và bạn nhận điểm tích lũy học tập!
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#002D56] uppercase tracking-wider mb-1.5">
                Tên tài liệu / Học liệu / Chuyên đề <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Sơ đồ tư duy 56 ngày đêm Chiến dịch Điện Biên Phủ 1954..."
                className="w-full px-4 py-2.5 bg-white border border-[#EAE1D1] rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#F37021] focus:ring-2 focus:ring-[#F37021]/15 transition-all"
                required
              />
            </div>

            {/* Type & Grade & Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#002D56] uppercase tracking-wider mb-1.5">
                  Phân loại học liệu
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as DocumentType)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAE1D1] rounded-2xl text-xs font-medium text-gray-800 focus:outline-hidden focus:border-[#F37021]"
                >
                  <option value="outline">Đề cương & Sơ đồ tư duy</option>
                  <option value="ebook">Sách tham khảo & Chuyên khảo</option>
                  <option value="exam">Đề thi & Đề kiểm tra</option>
                  <option value="exercise">Bộ câu hỏi & Trắc nghiệm</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002D56] uppercase tracking-wider mb-1.5">
                  Khối lớp áp dụng
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as GradeLevel)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAE1D1] rounded-2xl text-xs font-medium text-gray-800 focus:outline-hidden focus:border-[#F37021]"
                >
                  <option value="all">Toàn cấp (THCS & THPT)</option>
                  <option value="6">Lớp 6 (THCS)</option>
                  <option value="7">Lớp 7 (THCS)</option>
                  <option value="8">Lớp 8 (THCS)</option>
                  <option value="9">Lớp 9 (THCS)</option>
                  <option value="10">Lớp 10 (THPT)</option>
                  <option value="11">Lớp 11 (THPT)</option>
                  <option value="12">Lớp 12 (Ôn thi 9+ THPT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002D56] uppercase tracking-wider mb-1.5">
                  Chủ đề / Thời kỳ
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAE1D1] rounded-2xl text-xs font-medium text-gray-800 focus:outline-hidden focus:border-[#F37021]"
                >
                  <option value="vietnam">Lịch sử Việt Nam (Thời Lý - Trần - Lê)</option>
                  <option value="wars">Kháng chiến chống Pháp & Mỹ (1945-1975)</option>
                  <option value="revolution">Cách mạng Tháng Tám 1945 & Đổi Mới</option>
                  <option value="civilization">Văn minh Đại Việt & Di sản Dân tộc</option>
                  <option value="world">Lịch sử Thế giới</option>
                  <option value="thpt_prep">Luyện thi tốt nghiệp 9+ & ĐGNL</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#002D56] uppercase tracking-wider mb-1.5">
                Tóm tắt nội dung & Mục tiêu học tập <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Mô tả các trọng tâm kiến thức, sự kiện lịch sử, công thức ghi nhớ hoặc hướng dẫn học tập có trong tài liệu..."
                className="w-full px-4 py-2.5 bg-white border border-[#EAE1D1] rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#F37021] focus:ring-2 focus:ring-[#F37021]/15 transition-all"
                required
              />
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="block text-xs font-bold text-[#002D56] uppercase tracking-wider mb-1.5">
                Tệp tài liệu đính kèm (PDF, DOCX, PPTX, EPUB)
              </label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-[#EAE1D1] hover:border-[#F37021] bg-white rounded-2xl p-5 text-center transition-colors cursor-pointer group"
                onClick={() => document.getElementById('member-file-input')?.click()}
              >
                <input
                  id="member-file-input"
                  type="file"
                  accept=".pdf,.docx,.pptx,.epub"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-50 text-[#F37021] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                {fileName ? (
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#002D56]">
                    <FileText className="w-4 h-4 text-[#F37021]" />
                    <span>{fileName}</span>
                    <span className="text-xs text-gray-500">({fileSize})</span>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Kéo thả tệp tài liệu vào đây hoặc nhấp để chọn</p>
                    <p className="text-xs text-gray-400 mt-1">Hỗ trợ PDF, Microsoft Word, PowerPoint, Ebook (Tối đa 50MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags & Answer key */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#002D56] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#F37021]" /> Từ khóa tìm kiếm (phân cách bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="VD: Điện Biên Phủ, Lịch sử 12, Đề cương"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAE1D1] rounded-2xl text-xs text-gray-800 focus:outline-hidden focus:border-[#F37021]"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-white border border-[#EAE1D1] rounded-2xl">
                  <input
                    type="checkbox"
                    checked={hasAnswerKey}
                    onChange={(e) => setHasAnswerKey(e.target.checked)}
                    className="w-4 h-4 text-[#F37021] rounded-sm focus:ring-[#F37021]"
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    Tài liệu có kèm đáp án & lời giải chi tiết
                  </span>
                </label>
              </div>
            </div>

            {/* Option to attach Quick Self-Test Quiz */}
            <div className="pt-2 border-t border-[#EAE1D1]">
              <button
                type="button"
                onClick={() => setIncludeQuiz(!includeQuiz)}
                className="flex items-center gap-2 text-xs font-bold text-[#002D56] hover:text-[#F37021] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#F37021]" />
                {includeQuiz ? 'Ẩn câu hỏi trắc nghiệm minh họa' : '+ Đính kèm 1 câu hỏi trắc nghiệm tự luyện mẫu'}
              </button>

              {includeQuiz && (
                <div className="mt-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-200/70 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Nội dung câu hỏi trắc nghiệm:</label>
                    <input
                      type="text"
                      value={quizQuestion}
                      onChange={(e) => setQuizQuestion(e.target.value)}
                      placeholder="VD: Chiến thắng nào đã kết thúc thắng lợi cuộc kháng chiến chống Pháp (1945-1954)?"
                      className="w-full px-3 py-2 bg-white border border-orange-200 rounded-xl text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={quizOpt1}
                      onChange={(e) => setQuizOpt1(e.target.value)}
                      placeholder="Đáp án A (VD: Chiến dịch Điện Biên Phủ)"
                      className="px-3 py-1.5 bg-white border border-orange-200 rounded-xl text-xs"
                    />
                    <input
                      type="text"
                      value={quizOpt2}
                      onChange={(e) => setQuizOpt2(e.target.value)}
                      placeholder="Đáp án B (VD: Chiến dịch Việt Bắc 1947)"
                      className="px-3 py-1.5 bg-white border border-orange-200 rounded-xl text-xs"
                    />
                    <input
                      type="text"
                      value={quizOpt3}
                      onChange={(e) => setQuizOpt3(e.target.value)}
                      placeholder="Đáp án C (VD: Chiến dịch Biên giới 1950)"
                      className="px-3 py-1.5 bg-white border border-orange-200 rounded-xl text-xs"
                    />
                    <input
                      type="text"
                      value={quizOpt4}
                      onChange={(e) => setQuizOpt4(e.target.value)}
                      placeholder="Đáp án D (VD: Chiến dịch Tây Bắc 1952)"
                      className="px-3 py-1.5 bg-white border border-orange-200 rounded-xl text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-gray-700">Đáp án đúng:</span>
                    <div className="flex gap-2">
                      {['A', 'B', 'C', 'D'].map((letter, idx) => (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => setQuizCorrect(idx)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            quizCorrect === idx
                              ? 'bg-[#F37021] text-white'
                              : 'bg-white text-gray-700 border border-gray-200'
                          }`}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="pt-4 border-t border-[#EAE1D1] flex items-center justify-between">
              <p className="text-[11px] text-gray-500">
                Đăng nhập bởi: <strong className="text-[#002D56]">{currentUser?.name}</strong> ({currentUser?.email})
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMemberUploadModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#F37021] hover:bg-[#D95F16] text-white rounded-2xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang gửi hồ sơ...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Gửi Học Liệu Phê Duyệt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
