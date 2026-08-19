import React from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentCategory } from '../../types';
import {
  GraduationCap,
  Globe2,
  Flag,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const FeaturedCategoriesView: React.FC = () => {
  const { documents, setSelectedCategory, setCurrentView } = useApp();

  const categories = [
    {
      id: 'vietnam' as DocumentCategory,
      title: 'Lịch sử Việt Nam',
      description: 'Tiến trình lịch sử dân tộc từ thời dựng nước Văn Lang - Âu Lạc qua các triều đại phong kiến đến thời kỳ hiện đại.',
      icon: '🇻🇳',
      bannerUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80',
      color: 'from-red-500 to-amber-600',
    },
    {
      id: 'revolution' as DocumentCategory,
      title: 'Cách mạng & Kháng chiến',
      description: 'Cách mạng tháng Tám 1945, Kháng chiến chống thực dân Pháp (1945–1954) và Kháng chiến chống Mỹ cứu nước (1954–1975).',
      icon: '🚩',
      bannerUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=800&auto=format&fit=crop&q=80',
      color: 'from-orange-500 to-rose-600',
    },
    {
      id: 'world' as DocumentCategory,
      title: 'Lịch sử Thế giới Hiện đại',
      description: 'Hai cuộc Chiến tranh thế giới, Phong trào giải phóng dân tộc Á - Phi - Mỹ Latinh và sự phát triển của các trung tâm kinh tế.',
      icon: '🌍',
      bannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'thpt_prep' as DocumentCategory,
      title: 'Chuyên đề Luyện thi THPT',
      description: 'Bộ đề thi thử 2026, ma trận kiến thức, câu hỏi phân hóa điểm 8-9-10 và phương pháp so sánh tổng hợp.',
      icon: '🎓',
      bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'civilization' as DocumentCategory,
      title: 'Văn minh Nhân loại',
      description: 'Các nền văn minh phương Đông cổ đại (Ai Cập, Lưỡng Hà, Trung Hoa, Ấn Độ) và văn minh Hy Lạp - La Mã cổ đại.',
      icon: '🏛️',
      bannerUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'modern' as DocumentCategory,
      title: 'Quan hệ Quốc tế & Hội nhập',
      description: 'Trật tự thế giới hai cực Ianta, Chiến tranh Lạnh, xu thế toàn cầu hóa và tiến trình hội nhập quốc tế của Việt Nam.',
      icon: '🤝',
      bannerUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
      color: 'from-purple-600 to-pink-600',
    },
  ];

  const handleSelectCategory = (catId: DocumentCategory) => {
    setSelectedCategory(catId);
    setCurrentView('library');
  };

  return (
    <div id="categories-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Hệ thống hóa Kiến thức Lịch sử</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Chủ đề Lịch sử Nổi bật
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Lựa chọn chủ đề để khai thác tài liệu, sơ đồ tư duy, bài tập trắc nghiệm và đề thi chuyên sâu
        </p>
      </div>

      {/* Grid of 6 High-Quality Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const docCount = documents.filter((d) => d.category === cat.id).length;

          return (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group bg-white rounded-3xl border border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Banner Image */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={cat.bannerUrl}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-orange-300 transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-xs">
                  {docCount} tài liệu
                </span>
              </div>

              {/* Description */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-orange-600 group-hover:text-orange-700">
                  <span>Khám phá học liệu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
