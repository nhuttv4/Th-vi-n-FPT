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
} from 'lucide-react';
import { User, UserRole } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { documents, updateDocumentStatus, deleteDocument, setActiveDetailDoc, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'docs' | 'users' | 'moderation'>('moderation');
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
    <div id="admin-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Bảng Quản trị Hệ thống
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold">
                Admin Console
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Kiểm duyệt học liệu số, phân quyền người dùng và quản lý vận hành FPT History Library
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Tổng tài liệu thư viện</div>
          <div className="text-3xl font-black text-slate-900">{documents.length}</div>
          <div className="text-[11px] text-purple-600 font-medium">Học liệu GDPT 2018</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Tài liệu chờ kiểm duyệt</div>
          <div className="text-3xl font-black text-amber-600">{pendingDocs.length}</div>
          <div className="text-[11px] text-amber-600 font-medium">Cần xử lý phê duyệt</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Lượt xem toàn hệ thống</div>
          <div className="text-3xl font-black text-blue-600">{totalViews.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-medium">↑ 18.5% so với tháng trước</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase">Tổng người dùng kích hoạt</div>
          <div className="text-3xl font-black text-purple-600">3,420</div>
          <div className="text-[11px] text-slate-400">Học sinh & Giáo viên THPT</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'moderation' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Hàng đợi kiểm duyệt ({pendingDocs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'docs' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Toàn bộ học liệu ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'users' ? 'border-purple-600 text-purple-700' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Tài khoản người dùng ({usersList.length})</span>
        </button>
      </div>

      {/* Tab: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base">Tài liệu cần phê duyệt nội dung</h2>
            <span className="text-xs text-amber-600 font-bold">{pendingDocs.length} tài liệu chờ</span>
          </div>

          {pendingDocs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {pendingDocs.map((doc) => (
                <div key={doc.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <img src={doc.thumbnailUrl} alt={doc.title} className="w-14 h-16 object-cover rounded-xl shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          {doc.type}
                        </span>
                        <span className="text-xs text-slate-400">Lớp {doc.grade} • Tác giả: {doc.authorName}</span>
                      </div>
                      <h3
                        onClick={() => setActiveDetailDoc(doc)}
                        className="font-bold text-sm text-slate-900 hover:text-purple-600 cursor-pointer"
                      >
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{doc.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => setActiveDetailDoc(doc)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                    >
                      Xem nội dung
                    </button>
                    <button
                      onClick={() => handleRejectDoc(doc.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Từ chối</span>
                    </button>
                    <button
                      onClick={() => handleApproveDoc(doc.id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Duyệt & Công khai</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-slate-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <div>Tất cả tài liệu đã được kiểm duyệt hoàn tất!</div>
            </div>
          )}
        </div>
      )}

      {/* Tab: All Documents */}
      {activeTab === 'docs' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-100">
                <tr>
                  <th className="p-4">Tài liệu</th>
                  <th className="p-4">Tác giả</th>
                  <th className="p-4">Khối / Thể loại</th>
                  <th className="p-4">Lượt xem / Tải</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Xử lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80">
                    <td className="p-4 max-w-xs font-bold text-slate-900 truncate">
                      {doc.title}
                    </td>
                    <td className="p-4 text-slate-600">{doc.authorName}</td>
                    <td className="p-4 text-slate-600">Lớp {doc.grade} ({doc.type})</td>
                    <td className="p-4 text-slate-600 font-mono">
                      {doc.viewCount.toLocaleString()} / {doc.downloadCount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          doc.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : doc.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600"
                        title="Xóa tài liệu"
                      >
                        ✕
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
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-100">
                <tr>
                  <th className="p-4">Người dùng</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Đơn vị / Trường</th>
                  <th className="p-4">Vai trò hiện tại</th>
                  <th className="p-4 text-right">Phân quyền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-600">{u.email}</td>
                    <td className="p-4 text-slate-600">{u.school || 'THPT FPT'}</td>
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
                        className="p-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white"
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
