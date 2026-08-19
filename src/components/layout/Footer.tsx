import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Mail, MapPin, Sparkles, Scroll } from 'lucide-react';
import { DongSonDrumMotif } from '../theme/DongSonDrumMotif';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsAIModalOpen } = useApp();

  return (
    <footer
      id="app-footer"
      className="bg-[#FFFDF9] border border-[#EAE1D1] rounded-3xl p-6 sm:p-8 shadow-2xs text-[#4A0C0C]/80 text-xs mt-6 relative overflow-hidden"
    >
      <div className="absolute -right-10 -bottom-10 pointer-events-none opacity-10">
        <DongSonDrumMotif size={200} color="#991B1B" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* Brand Col */}
        <div className="space-y-2 md:col-span-1">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#991B1B] flex items-center justify-center text-[#FEF3C7] font-black text-sm shadow-xs">
              <Scroll className="w-4 h-4" />
            </div>
            <span className="text-[#4A0C0C] font-bold text-base tracking-tight font-serif">
              Thư Viện Sử Việt
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed font-serif">
            Kho tri thức số và học liệu Lịch sử trực quan chuẩn FPT Education & GDPT 2018. Hào khí ngàn năm – Kiến tạo tương lai.
          </p>
          <div className="flex items-center space-x-1.5 text-[11px] text-[#991B1B] pt-1 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>"Dân ta phải biết sử ta" — Hồ Chí Minh</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[#4A0C0C] font-bold text-xs uppercase tracking-wider mb-2.5">Kho học liệu</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#991B1B] transition-colors text-left cursor-pointer"
              >
                Đề cương ôn tập HK & THPT
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#991B1B] transition-colors text-left cursor-pointer"
              >
                Bộ câu hỏi trắc nghiệm Sử học
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#991B1B] transition-colors text-left cursor-pointer"
              >
                Đề thi thử THPT Quốc gia 2026
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('library')}
                className="hover:text-[#991B1B] transition-colors text-left cursor-pointer"
              >
                Sách điện tử & Chuyên khảo Lịch sử
              </button>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-[#4A0C0C] font-bold text-xs uppercase tracking-wider mb-2.5">Tính năng nổi bật</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li>
              <button
                onClick={() => setCurrentView('timeline')}
                className="hover:text-[#991B1B] transition-colors text-left cursor-pointer"
              >
                Dòng thời gian Sử Việt qua các triều đại
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsAIModalOpen(true)}
                className="hover:text-[#991B1B] transition-colors text-left flex items-center space-x-1 cursor-pointer"
              >
                <span>Trợ lý AI Lịch sử thông minh</span>
                <span className="text-[9px] bg-red-100 text-[#991B1B] px-1.5 py-0.2 rounded font-bold">AI</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('categories')}
                className="hover:text-[#991B1B] transition-colors text-left cursor-pointer"
              >
                Chủ đề Lịch sử Việt Nam & Thế giới
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('newsfeed')}
                className="hover:text-[#991B1B] transition-colors text-left cursor-pointer"
              >
                Bảng tin Lịch sử & Diễn đàn thảo luận
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-2 text-[11px]">
          <h4 className="text-[#4A0C0C] font-bold text-xs uppercase tracking-wider mb-2.5">FPT Education</h4>
          <div className="flex items-start space-x-2">
            <MapPin className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5" />
            <span>Khu Giáo dục FPT, Khu Công nghệ cao Hòa Lạc, Hà Nội</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-[#991B1B] shrink-0" />
            <span>library.history@fpt.edu.vn</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Chuẩn GDPT 2018 - Bộ Giáo dục và Đào tạo</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#EAE1D1] flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400 relative z-10">
        <p>© {new Date().getFullYear()} Thư Viện Lịch Sử Việt Nam • FPT Education.</p>
        <p className="mt-1 sm:mt-0 font-medium font-serif italic">Hào Khí Đông A — Bản Sắc Văn Hóa Dân Tộc</p>
      </div>
    </footer>
  );
};
