import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem, GradeLevel, DocumentType, DocumentCategory, DifficultyLevel, FileFormat } from '../../types';
import {
  PlusCircle,
  FileText,
  UploadCloud,
  Eye,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  Edit,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const {
    currentUser,
    documents,
    addDocument,
    updateDocumentStatus,
    deleteDocument,
    setActiveDetailDoc,
    showToast,
  } = useApp();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('12');
  const [type, setType] = useState<DocumentType>('outline');
  const [category, setCategory] = useState<DocumentCategory>('vietnam');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [fileType, setFileType] = useState<FileFormat>('pdf');
  const [pagesCount, setPagesCount] = useState<number>(12);
  const [hasAnswerKey, setHasAnswerKey] = useState(true);
  const [tagsInput, setTagsInput] = useState('Lịch sử 12, Ôn thi THPT');
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
  );

  // Filter docs uploaded by teachers
  const myDocs = documents.filter(
    (d) => d.authorRole === 'teacher' || d.authorName.includes('Phương') || d.authorName.includes('Giáo viên')
  );

  const totalViews = myDocs.reduce((acc, curr) => acc + curr.viewCount, 0);
  const totalDownloads = myDocs.reduce((acc, curr) => acc + curr.downloadCount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Vui lòng nhập đầy đủ tiêu đề và mô tả', 'warning');
      return;
    }

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    addDocument({
      title: title.trim(),
      description: description.trim(),
      grade,
      type,
      category,
      difficulty,
      fileType,
      fileUrl: '#',
      fileSize: '3.5 MB',
      pagesCount,
      hasAnswerKey,
      thumbnailUrl:
        thumbnailUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      authorName: currentUser?.name || 'Cô Trần Mai Phương',
      authorRole: 'teacher',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'published',
      tags: tags.length ? tags : ['Lịch sử THPT', 'FPT Education'],
      tableOfContents: [
        { title: 'Chủ đề 1: Trọng tâm lý thuyết', page: 1 },
        { title: 'Chủ đề 2: Bảng so sánh sự kiện', page: 5 },
        { title: 'Chủ đề 3: Câu hỏi trắc nghiệm minh họa', page: 9 },
      ],
      sampleQuestions: [
        {
          id: 'q_demo',
          question: `Trọng tâm cốt lõi của tài liệu "${title.trim()}" nhằm giải quyết vấn đề gì?`,
          options: [
            'Hệ thống hóa toàn bộ kiến thức theo chuẩn phân hóa GDPT 2018',
            'Chỉ tóm lược các sự kiện đơn lẻ',
            'Liệt kê niên biểu ngày tháng',
            'Ôn tập nội dung không trọng tâm',
          ],
          correctAnswerIndex: 0,
          explanation: 'Tài liệu cung cấp khung lý thuyết kèm câu hỏi vận dụng cao chuẩn cấu trúc thi tốt nghiệp.',
        },
      ],
    });

    setIsUploadModalOpen(false);
    // Reset
    setTitle('');
    setDescription('');
  };

  return (
    <div id="teacher-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Cổng Giáo viên Lịch sử</h1>
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">Tổ Bộ môn</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Quản lý học liệu, đăng tải bài giảng và theo dõi tương tác của học sinh THPT
            </p>
          </div>
        </div>

        <button
          id="teacher-upload-doc-btn"
          onClick={() => setIsUploadModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Đăng tải tài liệu mới</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Tài liệu đã đóng góp</div>
          <div className="text-3xl font-black text-slate-900">{myDocs.length}</div>
          <div className="text-[11px] text-emerald-600 flex items-center space-x-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% đã được kiểm duyệt</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Tổng lượt xem học sinh</div>
          <div className="text-3xl font-black text-blue-600">{totalViews.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">Trên toàn hệ thống THPT</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Tổng lượt tải tài liệu</div>
          <div className="text-3xl font-black text-orange-600">{totalDownloads.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">Tài liệu học tập & Đề thi</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Đánh giá trung bình</div>
          <div className="text-3xl font-black text-amber-500">4.9 / 5.0 ⭐</div>
          <div className="text-[11px] text-slate-400">Dựa trên phản hồi học sinh</div>
        </div>
      </div>

      {/* Uploaded Documents Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-base">Danh sách học liệu đã đăng tải</h2>
          <span className="text-xs text-slate-500">{myDocs.length} bài đăng</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-100">
              <tr>
                <th className="p-4">Tài liệu</th>
                <th className="p-4">Khối / Loại</th>
                <th className="p-4">Lượt xem</th>
                <th className="p-4">Lượt tải</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 max-w-xs sm:max-w-sm">
                    <div className="flex items-center space-x-3">
                      <img src={doc.thumbnailUrl} alt={doc.title} className="w-10 h-12 object-cover rounded-lg shrink-0" />
                      <div>
                        <div
                          onClick={() => setActiveDetailDoc(doc)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                        >
                          {doc.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{doc.createdAt} • {doc.fileSize}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-700">Lớp {doc.grade}</span>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">{doc.type}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700 whitespace-nowrap">
                    {doc.viewCount.toLocaleString()}
                  </td>
                  <td className="p-4 font-semibold text-slate-700 whitespace-nowrap">
                    {doc.downloadCount.toLocaleString()}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <select
                      value={doc.status}
                      onChange={(e) => updateDocumentStatus(doc.id, e.target.value as any)}
                      className="p-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white"
                    >
                      <option value="published">Đã duyệt (Công khai)</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="draft">Bản nháp</option>
                      <option value="hidden">Ẩn</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => setActiveDetailDoc(doc)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                      title="Xóa tài liệu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
                <UploadCloud className="w-5 h-5 text-blue-600" />
                <span>Đăng tải học liệu Lịch sử mới</span>
              </h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tên tài liệu / Tiêu đề bài giảng *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Đề cương chuyên đề Lịch sử 12 – Ôn thi Tốt nghiệp 2026"
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mô tả tóm tắt nội dung *</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả các chủ đề kiến thức, cấu trúc bài tập hoặc ma trận đề thi..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 h-20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Khối lớp</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as GradeLevel)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  >
                    <option value="12">Lớp 12 (Ôn thi THPT)</option>
                    <option value="11">Lớp 11</option>
                    <option value="10">Lớp 10</option>
                    <option value="all">Toàn cấp THPT</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Loại tài liệu</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as DocumentType)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  >
                    <option value="outline">Đề cương ôn tập</option>
                    <option value="exercise">Bài tập trắc nghiệm</option>
                    <option value="exam">Đề thi thử</option>
                    <option value="ebook">Sách tham khảo / Chuyên khảo</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chủ đề chính</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  >
                    <option value="vietnam">Lịch sử Việt Nam</option>
                    <option value="revolution">Cách mạng & Kháng chiến</option>
                    <option value="world">Lịch sử thế giới</option>
                    <option value="thpt_prep">Luyện thi THPT</option>
                    <option value="civilization">Văn minh nhân loại</option>
                    <option value="modern">Hiện đại & Hội nhập</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mức độ phân hóa</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  >
                    <option value="basic">Cơ bản (Tốt nghiệp)</option>
                    <option value="medium">Trung bình</option>
                    <option value="good">Khá</option>
                    <option value="advanced">Nâng cao (Điểm 9+)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Định dạng file</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as FileFormat)}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="docx">Word (.docx)</option>
                    <option value="pptx">PowerPoint (.pptx)</option>
                    <option value="epub">Ebook (.epub)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Số trang</label>
                  <input
                    type="number"
                    value={pagesCount}
                    onChange={(e) => setPagesCount(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="hasAnswer"
                  checked={hasAnswerKey}
                  onChange={(e) => setHasAnswerKey(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="hasAnswer" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Tài liệu đính kèm ma trận đáp án và lời giải chi tiết
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Từ khóa / Tags (ngăn cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Lịch sử 12, Hội nghị Ianta, Ôn thi THPT"
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md"
                >
                  Xuất bản học liệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
