import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { THEME_CONFIGS } from '../../data/vietnamHistoryTheme';
import { HistoryThemeKey } from '../../types';
import { Palette, Check, Sparkles, X } from 'lucide-react';
import { DongSonDrumMotif } from './DongSonDrumMotif';

export const VietnamThemeSwitcher: React.FC = () => {
  const { currentTheme, setCurrentTheme, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTheme = (themeKey: HistoryThemeKey) => {
    setCurrentTheme(themeKey);
    showToast(`Đã áp dụng theme: ${THEME_CONFIGS[themeKey].name} 🎨`, 'success');
    setIsOpen(false);
  };

  const activeConfig = THEME_CONFIGS[currentTheme];

  return (
    <>
      {/* Theme Trigger Button in Header / Floating */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-white/90 hover:bg-white border border-[#EAE1D1] text-[#991B1B] text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        title="Đổi chủ đề Giao diện Sử Việt"
      >
        <Palette className="w-3.5 h-3.5 text-[#D97706] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">{activeConfig.name}</span>
      </button>

      {/* Theme Selector Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EAE1D1] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#4A0C0C] text-white p-5 sm:p-6 relative shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#D97706] text-[#4A0C0C] flex items-center justify-center font-bold">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Chủ Đề Thư Viện Sử Việt</h3>
                  <p className="text-xs text-amber-200">Lựa chọn sắc màu & phong cách thị giác mang đậm bản sắc văn hóa dân tộc</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {(Object.keys(THEME_CONFIGS) as HistoryThemeKey[]).map((key) => {
                const config = THEME_CONFIGS[key];
                const isSelected = currentTheme === key;

                return (
                  <div
                    key={key}
                    onClick={() => handleSelectTheme(key)}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group overflow-hidden ${
                      isSelected
                        ? 'border-[#991B1B] bg-gradient-to-r from-red-50/60 to-amber-50/40 shadow-sm'
                        : 'border-gray-200 hover:border-amber-300 bg-white hover:bg-amber-50/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 relative z-10">
                      {/* Color swatch dots */}
                      <div className="flex -space-x-1.5 shrink-0">
                        <div
                          className="w-7 h-7 rounded-xl shadow-xs border-2 border-white"
                          style={{ backgroundColor: config.accentColor }}
                        />
                        <div
                          className="w-7 h-7 rounded-xl shadow-xs border-2 border-white"
                          style={{ backgroundColor: config.secondaryColor }}
                        />
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-extrabold text-[#242220] group-hover:text-[#991B1B] transition-colors">
                            {config.name}
                          </h4>
                          {isSelected && (
                            <span className="px-2 py-0.2 rounded-full bg-[#991B1B] text-white text-[9px] font-bold uppercase">
                              Đang dùng
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{config.subtitle}</p>
                        <p className="text-[10px] text-[#D97706] font-semibold italic mt-0.5">"{config.tagline}"</p>
                      </div>
                    </div>

                    <div className="relative z-10">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#991B1B] text-white flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-gray-300 group-hover:border-[#991B1B]" />
                      )}
                    </div>

                    {/* Subtle motif */}
                    <div className="absolute -right-6 -bottom-6 pointer-events-none opacity-10">
                      <DongSonDrumMotif size={80} color={config.accentColor} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#FAF6EE] border-t border-[#EAE1D1] text-center text-xs text-gray-500">
              Chủ đề giao diện được áp dụng đồng bộ trên toàn bộ Thư viện, Bài tập, Bảng tin & Trình đọc học liệu.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
