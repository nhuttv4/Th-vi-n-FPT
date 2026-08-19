import React, { useState, useEffect } from 'react';
import { VIETNAM_HISTORY_QUOTES } from '../../data/vietnamHistoryTheme';
import { useApp } from '../../context/AppContext';
import { DongSonDrumMotif } from './DongSonDrumMotif';
import { Scroll, ChevronLeft, ChevronRight, Quote, Sparkles, Share2, BookOpen } from 'lucide-react';

export const VietnamHistoryQuoteBanner: React.FC = () => {
  const { currentTheme, showToast, setIsAIModalOpen, setAiPromptPreset } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const currentQuote = VIETNAM_HISTORY_QUOTES[currentIndex];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VIETNAM_HISTORY_QUOTES.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % VIETNAM_HISTORY_QUOTES.length);
  };

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + VIETNAM_HISTORY_QUOTES.length) % VIETNAM_HISTORY_QUOTES.length);
  };

  const handleCopyQuote = () => {
    const textToCopy = `"${currentQuote.quote}" - ${currentQuote.author} (${currentQuote.year})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      showToast('Đã sao chép danh ngôn Hào khí Sử Việt 📜', 'success');
    }
  };

  const handleAskAIAboutQuote = () => {
    setAiPromptPreset(
      `Phân tích bối cảnh lịch sử, ý nghĩa và giá trị tư tưởng của câu nói/bài thơ: "${currentQuote.quote.replace(/\n/g, ' ')}" của ${currentQuote.author} (${currentQuote.year})`
    );
    setIsAIModalOpen(true);
  };

  return (
    <div
      id="vietnam-history-quote-banner"
      className="relative w-full rounded-3xl overflow-hidden shadow-md border border-[#EAE1D1] bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1] p-5 sm:p-7 text-[#242220] transition-all"
    >
      {/* Background Dong Son Drum Motif Watermarks */}
      <div className="absolute -right-8 -bottom-8 pointer-events-none">
        <DongSonDrumMotif size={220} opacity={0.12} color="#991B1B" />
      </div>
      <div className="absolute -left-10 -top-10 pointer-events-none">
        <DongSonDrumMotif size={180} opacity={0.08} color="#D97706" />
      </div>

      {/* Decorative Red & Gold Top Ribbon */}
      <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-[#991B1B] text-[#FEF3C7] flex items-center justify-center shadow-xs">
            <Scroll className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#991B1B] block">
              Hồn Thiêng Đất Việt • Danh Ngôn Lịch Sử
            </span>
            <span className="text-xs font-bold text-[#78350F]">
              {currentQuote.source} ({currentQuote.year})
            </span>
          </div>
        </div>

        {/* Carousel controls & actions */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleAskAIAboutQuote}
            className="px-2.5 py-1 rounded-xl bg-[#991B1B]/10 hover:bg-[#991B1B]/20 text-[#991B1B] text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer"
            title="Hỏi AI phân tích danh ngôn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="hidden sm:inline">Phân tích</span>
          </button>

          <button
            onClick={handleCopyQuote}
            className="p-1.5 rounded-xl hover:bg-amber-100 text-[#78350F] transition-colors cursor-pointer"
            title="Sao chép danh ngôn"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-1 pl-2 border-l border-amber-200">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-[#991B1B] shadow-2xs transition-colors cursor-pointer"
              title="Danh ngôn trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-[#991B1B] shadow-2xs transition-colors cursor-pointer"
              title="Danh ngôn tiếp theo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Quote Content */}
      <div className="relative z-10 space-y-3">
        <div className="relative pl-6 pr-2">
          <Quote className="w-6 h-6 text-[#D97706]/40 absolute left-0 top-0 rotate-180" />
          <p className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#4A0C0C] leading-relaxed whitespace-pre-line italic">
            "{currentQuote.quote}"
          </p>
        </div>

        {currentQuote.originalText && (
          <div className="pl-6 text-xs text-[#78350F] font-serif italic border-l-2 border-[#D97706]/40 ml-1 py-0.5">
            Dịch nghĩa: "{currentQuote.originalText}"
          </div>
        )}

        {/* Author & Context Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-[#EAE1D1]/80 text-xs gap-1.5">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-[#991B1B] text-xs sm:text-sm">
              — {currentQuote.author}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] font-bold text-[10px] border border-amber-200">
              Năm {currentQuote.year}
            </span>
          </div>
          <p className="text-[11px] text-gray-600 line-clamp-1 max-w-xl">
            {currentQuote.context}
          </p>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center space-x-1.5 mt-3 relative z-10">
        {VIETNAM_HISTORY_QUOTES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIsAutoPlay(false);
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              currentIndex === idx ? 'w-6 bg-[#991B1B]' : 'w-2 bg-[#EAE1D1] hover:bg-[#D97706]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
