import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_USERS } from '../../data/mockData';
import {
  ShieldAlert,
  Users,
  FileText,
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Search,
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
  Upload,
  PlusCircle,
  Newspaper,
  Pin,
  Trash2,
} from 'lucide-react';
import { User, UserRole, HistoryPost } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    documents,
    posts,
    updateDocumentStatus,
    deleteDocument,
    deletePost,
    togglePinPost,
    setActiveDetailDoc,
    setActivePostDetail,
    setIsAdminUploadModalOpen,
    setIsCreatePostModalOpen,
    setCurrentView,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'docs' | 'posts' | 'users'>('moderation');
  const [usersList, setUsersList] = useState<User[]>(INITIAL_USERS);
  const [adminSearch, setAdminSearch] = useState('');

  const pendingDocs = documents.filter((d) => d.status === 'pending' || d.status === 'draft');
  const totalViews = documents.reduce((acc, curr) => acc + curr.viewCount, 0);
  const totalDownloads = documents.reduce((acc, curr) => acc + curr.downloadCount, 0);

  const handleApproveDoc = (docId: string) => {
    updateDocumentStatus(docId, 'published');
    showToast('Đã phê duyệt tài liệu và công khai lên Thư viện 🎉', 'success');
  };

  const handleRejectDoc = (docId: string) => {
    updateDocumentStatus(docId, 'hidden');
    showToast('Đã từ chối tài liệu', 'warning');
  };

  const handleToggleUserRole = (userId: string, newRole: UserRole) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    showToast('Đã cập nhật quyền hạn người dùng', 'info');
  };

  return (
    <div id="admin-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#002D56] text-[#F37021] flex items-center justify-center shadow-md">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002D56] tracking-tight">
                Bảng Quản trị FPT History Library
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-orange-100 text-[#F37021] text-xs font-bold">
                Admin Console
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Kiểm duyệt học liệu số THCS & THPT, quản lý bảng tin và phân quyền người dùng
            </p>
          </div>
        </div>

        {/* Quick Admin Actions */}
        <div className="flex items-center space-x-3 flex-wrap gap-y-2">
          <button
            id="admin-upload-doc-btn"
            onClick={() => setIsAdminUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#F37021] hover:bg-[#e06216] text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Tải lên học liệu mới</span>
          </button>

          <button
            id="admin-create-post-btn"
            onClick={() => setIsCreatePostModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#002D56] hover:bg-[#002242] text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all cursor-pointer"
          >
            <Newspaper className="w-4 h-4" />
            <span>Đăng bài lên Bảng tin</span>
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase">Tổng tài liệu thư viện</div>
          <div className="text-3xl font-black text-[#002D56]">{documents.length}</div>
          <div className="text-[11px] text-[#F37021] font-bold">Khối THCS & THPT (GDPT 2018)</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase">Bài viết bảng tin</div>
          <div className="text-3xl font-black text-[#F37021]">{posts.length}</div>
          <div className="text-[11px] text-gray-500 font-medium">Thông báo & Thảo luận sôi nổi</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase">Lượt xem toàn hệ thống</div>
          <div className="text-3xl font-black text-blue-600">{totalViews.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-medium">↑ 24.5% tương tác học tập</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase">Tài liệu chờ duyệt</div>
          <div className="text-3xl font-black text-amber-600">{pendingDocs.length}</div>
          <div className="text-[11px] text-amber-600 font-medium">Cần xử lý kiểm duyệt</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-gray-200 space-x-6 text-xs sm:text-sm font-bold overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'moderation'
              ? 'border-[#F37021] text-[#F37021]'
              : 'border-transparent text-gray-500 hover:text-[#002D56]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Hàng đợi kiểm duyệt ({pendingDocs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'docs'
              ? 'border-[#F37021] text-[#F37021]'
              : 'border-transparent text-gray-500 hover:text-[#002D56]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Toàn bộ học liệu ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'posts'
              ? 'border-[#F37021] text-[#F37021]'
              : 'border-transparent text-gray-500 hover:text-[#002D56]'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Quản lý Bảng tin ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'users'
              ? 'border-[#F37021] text-[#F37021]'
              : 'border-transparent text-gray-500 hover:text-[#002D56]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Tài khoản người dùng ({usersList.length})</span>
        </button>
      </div>

      {/* Tab: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-[#002D56] text-sm sm:text-base">Tài liệu cần phê duyệt nội dung</h2>
            <span className="text-xs text-amber-600 font-bold">{pendingDocs.length} tài liệu chờ</span>
          </div>

          {pendingDocs.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {pendingDocs.map((doc) => (
                <div key={doc.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <img src={doc.thumbnailUrl} alt={doc.title} className="w-14 h-16 object-cover rounded-xl shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          {doc.type}
                        </span>
                        <span className="text-xs text-gray-400">Lớp {doc.grade} • Tác giả: {doc.authorName}</span>
                      </div>
                      <h3
                        onClick={() => setActiveDetailDoc(doc)}
                        className="font-bold text-sm text-[#002D56] hover:text-[#F37021] cursor-pointer"
                      >
                        {doc.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{doc.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => setActiveDetailDoc(doc)}
                      className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                    >
                      Xem nội dung
                    </button>
                    <button
                      onClick={() => handleRejectDoc(doc.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Từ chối</span>
                    </button>
                    <button
                      onClick={() => handleApproveDoc(doc.id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Duyệt & Công khai</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-gray-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div>Tất cả tài liệu đã được kiểm duyệt hoàn tất!</div>
            </div>
          )}
        </div>
      )}

      {/* Tab: All Documents */}
      {activeTab === 'docs' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-[#002D56] text-sm">Danh mục tài liệu toàn thư viện ({documents.length})</h3>
            <button
              onClick={() => setIsAdminUploadModalOpen(true)}
              className="px-4 py-2 bg-[#F37021] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Tải tài liệu mới</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
                <tr>
                  <th className="p-3">Tài liệu</th>
                  <th className="p-3">Tác giả</th>
                  <th className="p-3">Khối / Thể loại</th>
                  <th className="p-3">Lượt xem / Tải</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 text-right">Xử lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50/80">
                    <td className="p-3 max-w-xs font-bold text-[#002D56] truncate">
                      {doc.title}
                    </td>
                    <td className="p-3 text-gray-600">{doc.authorName}</td>
                    <td className="p-3 text-gray-600">Lớp {doc.grade} ({doc.type})</td>
                    <td className="p-3 text-gray-600 font-mono">
                      {doc.viewCount.toLocaleString()} / {doc.downloadCount.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          doc.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : doc.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => setActiveDetailDoc(doc)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-semibold cursor-pointer"
                      >
                        Xem
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-[11px] font-semibold cursor-pointer"
                        title="Xóa tài liệu"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Posts Management */}
      {activeTab === 'posts' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-[#002D56] text-sm">Danh sách bài viết Bảng tin Lịch sử ({posts.length})</h3>
            <button
              onClick={() => setIsCreatePostModalOpen(true)}
              className="px-4 py-2 bg-[#F37021] text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Đăng bài mới</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
                <tr>
                  <th className="p-3">Tiêu đề bài viết</th>
                  <th className="p-3">Tác giả</th>
                  <th className="p-3">Chuyên mục</th>
                  <th className="p-3">Tương tác</th>
                  <th className="p-3">Ghim</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/80">
                    <td className="p-3 max-w-sm font-bold text-[#002D56] truncate">
                      {post.title}
                    </td>
                    <td className="p-3 text-gray-600">{post.authorName}</td>
                    <td className="p-3 text-gray-600 uppercase text-[10px] font-bold">
                      {post.category}
                    </td>
                    <td className="p-3 text-gray-600">
                      ❤️ {post.likesCount} • 💬 {post.commentsCount}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => togglePinPost(post.id)}
                        className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer ${
                          post.isPinned ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <Pin className="w-3.5 h-3.5" />
                        <span>{post.isPinned ? 'Đã ghim' : 'Chưa ghim'}</span>
                      </button>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => setActivePostDetail(post)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-[#002D56] rounded text-[11px] font-semibold cursor-pointer"
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-[11px] font-semibold cursor-pointer"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Users Management */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase border-b border-gray-100">
                <tr>
                  <th className="p-4">Người dùng</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Đơn vị / Trường</th>
                  <th className="p-4">Vai trò hiện tại</th>
                  <th className="p-4 text-right">Phân quyền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/80">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-bold text-[#002D56]">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-gray-600">{u.email}</td>
                    <td className="p-4 text-gray-600">{u.school || 'THPT FPT'}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : u.role === 'teacher'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleToggleUserRole(u.id, e.target.value as UserRole)}
                        className="p-1.5 rounded-lg text-xs font-semibold border border-gray-200 bg-white cursor-pointer"
                      >
                        <option value="student">Học sinh</option>
                        <option value="teacher">Giáo viên Lịch sử</option>
                        <option value="admin">Quản trị viên</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
