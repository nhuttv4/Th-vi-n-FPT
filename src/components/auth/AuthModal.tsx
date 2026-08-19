import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, Mail, Lock, User as UserIcon, GraduationCap, UserCheck, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setCurrentUser, showToast, setCurrentView } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [grade, setGrade] = useState<'10' | '11' | '12'>('12');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Vui lòng điền đầy đủ Email và Mật khẩu', 'warning');
      return;
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim() || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Học sinh FPT'),
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role,
      grade,
      school: 'THPT FPT',
      createdAt: new Date().toISOString().split('T')[0],
      readCount: 1,
      completedQuizzes: 0,
      streakDays: 1,
    };

    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Đăng nhập thành công! Chào mừng ${newUser.name}`, 'success');
    if (role === 'teacher') {
      setCurrentView('teacher');
    } else if (role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('home');
    }
  };

  const handleQuickDemoLogin = (demoRole: UserRole) => {
    const demoUser = {
      student: {
        id: 'u_student_1',
        name: 'Nguyễn Hoàng Nam',
        email: 'namnhth24@fpt.edu.vn',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'student' as UserRole,
        grade: '12' as const,
        school: 'THPT FPT Hà Nội',
        createdAt: '2025-09-01',
      },
      teacher: {
        id: 'u_teacher_1',
        name: 'Cô Trần Mai Phương',
        email: 'phuongtm.hist@fpt.edu.vn',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: 'teacher' as UserRole,
        grade: 'all' as const,
        school: 'Tổ Lịch sử - THPT FPT',
        createdAt: '2024-08-15',
      },
      admin: {
        id: 'u_admin_1',
        name: 'Ban Quản trị Thư viện FPT',
        email: 'admin.library@fpt.edu.vn',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        role: 'admin' as UserRole,
        grade: 'all' as const,
        school: 'FPT Education Campus',
        createdAt: '2024-01-01',
      },
      guest: null
    };

    if (demoRole === 'guest') {
      setCurrentUser(null);
      setCurrentView('landing');
    } else {
      setCurrentUser(demoUser[demoRole]);
      if (demoRole === 'teacher') setCurrentView('teacher');
      else if (demoRole === 'admin') setCurrentView('admin');
      else setCurrentView('home');
    }

    setIsAuthModalOpen(false);
    showToast(`Đã đăng nhập bằng tài khoản ${demoRole.toUpperCase()}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div
        id="auth-modal-card"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white text-center relative">
          <button
            id="close-auth-modal"
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-white rounded-xl mx-auto flex items-center justify-center shadow-md mb-3 text-orange-600 font-extrabold text-2xl">
            FPT
          </div>
          <h2 className="text-xl font-bold tracking-tight">FPT History Library</h2>
          <p className="text-xs text-orange-100 mt-1">Khám phá lịch sử – Kiến tạo tương lai</p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Truy cập nhanh Demo</span>
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('student')}
              className="px-2 py-1.5 rounded-lg border border-orange-200 bg-orange-50/70 hover:bg-orange-100 text-orange-700 text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Học sinh</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('teacher')}
              className="px-2 py-1.5 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Giáo viên</span>
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-2 py-1.5 rounded-lg border border-purple-200 bg-purple-50/70 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-5">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`pb-2.5 text-sm font-semibold flex-1 text-center border-b-2 transition-all ${
                !isRegister ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`pb-2.5 text-sm font-semibold flex-1 text-center border-b-2 transition-all ${
                isRegister ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Đăng ký tài khoản
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Họ và tên</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Email học đường / Email cá nhân</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vidu@fpt.edu.vn"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-700">Mật khẩu</label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => showToast('Vui lòng liên hệ Admin để khôi phục mật khẩu tài khoản học đường.', 'info')}
                    className="text-[11px] text-orange-600 hover:underline"
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
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {isRegister && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Vai trò</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="student">Học sinh</option>
                    <option value="teacher">Giáo viên Lịch sử</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Khối lớp</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as any)}
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12 (Ôn thi THPT)</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md shadow-orange-500/20 text-sm transition-all"
            >
              {isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
            </button>
          </form>

          {/* Google Sign-in demo */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <button
              onClick={() => handleQuickDemoLogin('student')}
              type="button"
              className="w-full py-2 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Đăng nhập bằng tài khoản Google (@fpt.edu.vn)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
