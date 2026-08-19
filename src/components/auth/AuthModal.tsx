import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, GradeLevel } from '../../types';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  GraduationCap,
  UserCheck,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  School,
  ArrowRight,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginWithEmail,
    authReasonMessage,
    setAuthReasonMessage,
    showToast,
    setCurrentView,
  } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [grade, setGrade] = useState<GradeLevel>('12');
  const [school, setSchool] = useState('THPT FPT Cần Thơ');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Vui lòng điền đầy đủ Email và Mật khẩu', 'warning');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      showToast('Vui lòng nhập định dạng Email hợp lệ (ví dụ: ten@fpt.edu.vn)', 'warning');
      return;
    }

    loginWithEmail(
      email.trim(),
      name.trim() || undefined,
      role,
      grade,
      school.trim() || 'FPT Education'
    );
  };

  const handleQuickFptLogin = (emailToUse: string, nameToUse: string, roleToUse: UserRole, gradeToUse: GradeLevel) => {
    loginWithEmail(emailToUse, nameToUse, roleToUse, gradeToUse, 'THPT FPT / FPT Education');
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setAuthReasonMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        id="auth-modal-card"
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header decoration with FPT branding */}
        <div className="bg-[#002D56] p-6 text-white text-center relative shrink-0">
          <button
            id="close-auth-modal"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 bg-[#F37021] text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-2 font-black text-xl tracking-wider">
            FPT
          </div>
          
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">FPT History Library</h2>
          <p className="text-xs text-blue-200 mt-0.5">Xác thực tài khoản Email để tiếp tục truy cập</p>
        </div>

        {/* Reason banner if triggered by a shared link or protected action */}
        {authReasonMessage && (
          <div className="bg-amber-50 border-b border-amber-200 p-3.5 px-6 flex items-start space-x-2.5 text-xs text-amber-900 shrink-0">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="font-semibold leading-relaxed">{authReasonMessage}</p>
          </div>
        )}

        {/* Scrollable Form Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Quick SSO with FPT Edu Email */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
              <span>Đăng nhập nhanh với Google Workspace / FPT Email</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F37021]" />
            </div>

            <button
              onClick={() => handleQuickFptLogin('nhuttv4@fpt.edu.vn', 'Thầy Nhựt TV', 'teacher', 'all')}
              type="button"
              className="w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-[#002D56] rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#F37021] text-white flex items-center justify-center font-bold text-xs">
                  F
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-[#002D56]">nhuttv4@fpt.edu.vn</p>
                  <p className="text-[10px] text-gray-500">Giáo viên Lịch sử • FPT Education</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#F37021] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickFptLogin('namnhth24@fpt.edu.vn', 'Nguyễn Hoàng Nam', 'student', '12')}
              type="button"
              className="w-full py-2.5 px-4 bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200 text-[#002D56] rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-[#002D56] text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div className="text-left">
                  <p className="text-xs font-extrabold text-[#002D56]">namnhth24@fpt.edu.vn</p>
                  <p className="text-[10px] text-gray-500">Học sinh Khối 12 • THPT FPT</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#002D56] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-gray-400 font-semibold uppercase shrink-0">
              Hoặc nhập email của bạn
            </span>
          </div>

          {/* Toggle Login / Register */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`pb-2.5 text-xs font-bold flex-1 text-center border-b-2 transition-all cursor-pointer ${
                !isRegister
                  ? 'border-[#F37021] text-[#F37021]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Đăng nhập Email
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`pb-2.5 text-xs font-bold flex-1 text-center border-b-2 transition-all cursor-pointer ${
                isRegister
                  ? 'border-[#F37021] text-[#F37021]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Đăng ký tài khoản mới
            </button>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-[#002D56] mb-1">Họ và tên của bạn</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white"
                  />
                  <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#002D56] mb-1">
                Địa chỉ Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nhuttv4@fpt.edu.vn hoặc email cá nhân"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white font-medium"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#002D56]">Mật khẩu</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() =>
                      showToast('Hệ thống hỗ trợ tự động xác thực email. Nhập mật khẩu bất kỳ để đăng nhập.', 'info')
                    }
                    className="text-[10px] text-[#F37021] hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#333] focus:outline-none focus:ring-2 focus:ring-[#F37021] focus:bg-white"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {isRegister && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Vai trò</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
                    >
                      <option value="student">Học sinh</option>
                      <option value="teacher">Giáo viên Lịch sử</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Khối lớp</label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value as GradeLevel)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#002D56] focus:ring-2 focus:ring-[#F37021]"
                    >
                      <optgroup label="Khối THCS">
                        <option value="6">Lớp 6</option>
                        <option value="7">Lớp 7</option>
                        <option value="8">Lớp 8</option>
                        <option value="9">Lớp 9</option>
                      </optgroup>
                      <optgroup label="Khối THPT">
                        <option value="10">Lớp 10</option>
                        <option value="11">Lớp 11</option>
                        <option value="12">Lớp 12 (Ôn thi THPT)</option>
                      </optgroup>
                      <option value="all">Toàn cấp / Giáo viên</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Trường học / Đơn vị</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="THPT FPT / THCS FPT..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#333] focus:ring-2 focus:ring-[#F37021]"
                    />
                    <School className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#F37021] hover:bg-[#e06216] text-white font-bold rounded-xl shadow-md shadow-orange-500/20 text-xs sm:text-sm transition-all cursor-pointer mt-2"
            >
              {isRegister ? 'Xác nhận tạo tài khoản' : 'Xác nhận đăng nhập Email'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
