import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Mail, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsAIModalOpen } = useApp();

  return (
    <footer id="app-footer" className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs text-gray-500 text-xs mt-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-2 md:col-span-1">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F37021] flex items-center justify-center text-white font-black text-sm shadow-xs">
              FPT
            </div>
            <span className="text-[#002D56] font-bold text-base tracking-tight">History Library</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Kho tri thức số và học liệu Lịch sử trực quan chuẩn FPT Education dành cho học sinh THPT và giáo viên trên toàn quốc.
          </p>
          <div className="flex items-center space-x-1.5 text-[11px] text-[#F37021] pt-1 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>"Khám phá lịch sử – Kiến tạo tương lai"</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[#002D56] font-bold text-xs uppercase tracking-wider mb-2.5">Kho học liệu</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#F37021] transition-colors text-left"
              >
                Đề cương ôn tập HK & THPT
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#F37021] transition-colors text-left"
              >
                Bộ câu hỏi trắc nghiệm phân hóa
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#F37021] transition-colors text-left"
              >
                Đề thi thử THPT Quốc gia 2026
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#F37021] transition-colors text-left"
              >
                Sách điện tử & Chuyên khảo Lịch sử
              </button>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-[#002D56] font-bold text-xs uppercase tracking-wider mb-2.5">Tính năng nổi bật</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button
                onClick={() => setCurrentView('timeline')}
                className="hover:text-[#F37021] transition-colors text-left"
              >
                Dòng thời gian sự kiện 1945 - 2026
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsAIModalOpen(true)}
                className="hover:text-[#F37021] transition-colors text-left flex items-center space-x-1"
              >
                <span>Trợ lý AI Lịch sử thông minh</span>
                <span className="text-[9px] bg-orange-100 text-[#F37021] px-1.5 py-0.2 rounded font-bold">AI</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('categories')}
                className="hover:text-[#F37021] transition-colors text-left"
              >
                Chủ đề Lịch sử Việt Nam & Thế giới
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('personal')}
                className="hover:text-[#F37021] transition-colors text-left"
              >
                Tủ sách cá nhân & Bookmark
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-2 text-[11px]">
          <h4 className="text-[#002D56] font-bold text-xs uppercase tracking-wider mb-2.5">FPT Education</h4>
          <div className="flex items-start space-x-2">
            <MapPin className="w-3.5 h-3.5 text-[#F37021] shrink-0 mt-0.5" />
            <span>Khu Giáo dục FPT, Khu Công nghệ cao Hòa Lạc, Hà Nội</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-[#F37021] shrink-0" />
            <span>library.history@fpt.edu.vn</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Chuẩn GDPT 2018 - Bộ Giáo dục và Đào tạo</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400">
        <p>© {new Date().getFullYear()} FPT History Library. Bản quyền thuộc Tổ chức Giáo dục FPT.</p>
        <p className="mt-1 sm:mt-0 font-medium">Bento Grid Design System</p>
      </div>
    </footer>
  );
};
