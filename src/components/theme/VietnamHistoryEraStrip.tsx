import React, { useState } from 'react';
import { VIETNAM_HISTORICAL_ERAS } from '../../data/vietnamHistoryTheme';
import { VietnamHistoricalEra } from '../../types';
import { useApp } from '../../context/AppContext';
import { DongSonDrumMotif } from './DongSonDrumMotif';
import { Crown, Swords, Landmark, Compass, Flag, Globe, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const VietnamHistoryEraStrip: React.FC = () => {
  const { setSelectedCategory, setCurrentView, showToast } = useApp();
  const [activeEraModal, setActiveEraModal] = useState<VietnamHistoricalEra | null>(null);

  const getEraIcon = (iconName: string) => {
    switch (iconName) {
      case 'crown':
        return <Crown className="w-4 h-4 text-[#D97706]" />;
      case 'swords':
        return <Swords className="w-4 h-4 text-[#991B1B]" />;
      case 'landmark':
        return <Landmark className="w-4 h-4 text-[#B45309]" />;
      case 'compass':
        return <Compass className="w-4 h-4 text-[#C2410C]" />;
      case 'flag':
        return <Flag className="w-4 h-4 text-[#B91C1C]" />;
      default:
        return <Globe className="w-4 h-4 text-[#047857]" />;
    }
  };

  const handleExploreEraDocs = (era: VietnamHistoricalEra) => {
    setSelectedCategory(era.docCategory);
    setCurrentView('library');
    setActiveEraModal(null);
    showToast(`Đang lọc học liệu theo thời kỳ: ${era.name}`, 'info');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#991B1B]" />
          <h2 className="text-sm sm:text-base font-extrabold text-[#4A0C0C]">
            Các Thời Kỳ Lịch Sử Việt Nam
          </h2>
          <span className="text-[11px] text-[#78350F] font-medium hidden sm:inline">
            (Bình minh dựng nước đến Thời đại Hồ Chí Minh & Đổi mới)
          </span>
        </div>
      </div>

      {/* Grid of 6 Historical Eras */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {VIETNAM_HISTORICAL_ERAS.map((era, index) => (
          <div
            key={era.id}
            onClick={() => setActiveEraModal(era)}
            className="group relative bg-[#FFFDF9] hover:bg-[#FAF6EE] rounded-2xl p-3.5 border border-[#EAE1D1] hover:border-[#991B1B] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -right-6 -bottom-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
              <DongSonDrumMotif size={80} color="#991B1B" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {getEraIcon(era.icon)}
                </div>
                <span className="text-[10px] font-extrabold text-[#991B1B] font-mono">
                  0{index + 1}
                </span>
              </div>

              <h4 className="text-xs font-bold text-[#4A0C0C] group-hover:text-[#991B1B] transition-colors leading-snug line-clamp-2 mb-1">
                {era.name}
              </h4>
              <p className="text-[10px] text-[#92400E] font-semibold">{era.period}</p>
            </div>

            <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500 group-hover:text-[#991B1B] font-bold">
              <span>Khám phá</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Historical Era Detailed Modal */}
      {activeEraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EAE1D1] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#4A0C0C] text-white p-5 sm:p-6 relative shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-[#D97706] text-[#4A0C0C] flex items-center justify-center font-bold">
                    {getEraIcon(activeEraModal.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FCD34D]">
                      Thời kỳ Lịch sử Việt Nam
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">{activeEraModal.name}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveEraModal(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-amber-200 font-semibold mt-2">
                Niên đại: {activeEraModal.period} • {activeEraModal.dynasties}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#242220]">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-serif">
                {activeEraModal.description}
              </p>

              {/* Key Events */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#991B1B] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Các sự kiện lịch sử tiêu biểu:</span>
                </h4>
                <div className="space-y-1.5 bg-[#FAF6EE] p-3.5 rounded-2xl border border-[#EAE1D1]">
                  {activeEraModal.keyEvents.map((evt, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700">
                      <span className="text-[#991B1B] font-bold">•</span>
                      <span>{evt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Figures */}
              <div>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#991B1B] mb-2">
                  Nhân vật lịch sử & Anh hùng dân tộc:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeEraModal.keyFigures.map((fig, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-[#FEF3C7] text-[#92400E] font-bold text-xs border border-amber-200 shadow-2xs"
                    >
                      {fig}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#FAF6EE] border-t border-[#EAE1D1] flex justify-end space-x-2 shrink-0">
              <button
                onClick={() => setActiveEraModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => handleExploreEraDocs(activeEraModal)}
                className="px-4 py-2 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Xem học liệu thời kỳ này</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
