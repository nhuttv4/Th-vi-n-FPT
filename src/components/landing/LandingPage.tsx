import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileText,
  HelpCircle,
  GraduationCap,
  Users,
  CheckCircle,
  Search,
  Download,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setIsAIModalOpen, setAiPromptPreset, documents } = useApp();

  return (
    <div id="landing-page" className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-800 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span>Hệ sinh thái Giáo dục số FPT Education</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              FPT History <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Library</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Kho thư viện số Lịch sử dành riêng cho học sinh THPT. Học Lịch sử dễ dàng hơn với nguồn tài liệu được tổ chức khoa học, hiện đại và luôn sẵn sàng cho hành trình kiến tạo tương lai.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                id="landing-explore-btn"
                onClick={() => setCurrentView('library')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Khám phá Thư viện</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="landing-login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base transition-all flex items-center justify-center space-x-2"
              >
                <span>Đăng nhập học tập</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-200/80 max-w-2xl mx-auto text-left">
              <div>
                <div className="text-2xl font-black text-slate-900">1,500+</div>
                <div className="text-xs text-slate-500">Học liệu & Đề thi</div>
              </div>
              <div>
                <div className="text-2xl font-black text-orange-600">100%</div>
                <div className="text-xs text-slate-500">Chuẩn GDPT 2018</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">12+</div>
                <div className="text-xs text-slate-500">Mốc Timeline lịch sử</div>
              </div>
              <div>
                <div className="text-2xl font-black text-blue-600">24/7</div>
                <div className="text-xs text-slate-500">Trợ lý AI đồng hành</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars ("Vì sao nên sử dụng?") */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-widest text-orange-600 mb-2">Vì sao chọn chúng tôi?</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Không gian học Lịch sử số toàn diện</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 transition-all duration-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">4 Nhóm học liệu phong phú</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bài tập trắc nghiệm, Đề cương ôn tập chi tiết, Đề thi thử THPT có ma trận đáp án và Sách điện tử chuyên khảo.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 transition-all duration-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Trình đọc trực tuyến Ebook/PDF</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hỗ trợ chế độ đọc ban đêm, zoom, tìm kiếm từ khóa, đánh dấu bookmark và ghi chú trực tiếp ngay trên trang sách.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 transition-all duration-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Dòng thời gian tương tác</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dễ dàng tra cứu các mốc son lịch sử Việt Nam và thế giới từ 1945 đến nay với hình ảnh minh họa, tài liệu và câu hỏi liên kết.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 transition-all duration-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Trợ lý AI History</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Giải thích nhanh nguyên nhân - kết quả sự kiện, tóm tắt bài học và tạo câu hỏi trắc nghiệm rèn luyện theo yêu cầu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Documents Preview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-orange-600">Kho tài liệu tiêu biểu</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Được học sinh THPT xem nhiều nhất</h3>
            </div>
            <button
              onClick={() => setCurrentView('library')}
              className="mt-3 sm:mt-0 text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center space-x-1"
            >
              <span>Xem tất cả tài liệu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => setCurrentView('library')}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-orange-300 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={doc.thumbnailUrl}
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-slate-900/80 text-white text-[11px] font-semibold backdrop-blur-xs">
                    {doc.grade === 'all' ? 'Toàn cấp THPT' : `Lớp ${doc.grade}`}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-orange-500 text-white text-[11px] font-bold uppercase">
                    {doc.fileType}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{doc.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>{doc.authorName}</span>
                    <span className="font-semibold text-slate-600">{doc.viewCount.toLocaleString()} lượt xem</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dành cho Học sinh & Giáo viên */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Học sinh */}
            <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-orange-500 text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Dành cho Học sinh THPT</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ôn luyện nhẹ nhàng, ghi nhớ logic và đạt điểm cao trong các bài kiểm tra học kỳ và kỳ thi Tốt nghiệp THPT Quốc gia.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Tự tạo Tủ sách và bộ sưu tập ôn tập cá nhân</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Trực tiếp làm bài trắc nghiệm và xem giải thích chi tiết</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Hỏi đáp mọi thắc mắc lịch sử với trợ lý AI 24/7</span>
                </li>
              </ul>
              <button
                onClick={() => setCurrentView('library')}
                className="pt-2 text-sm font-semibold text-orange-400 hover:text-orange-300 flex items-center space-x-1"
              >
                <span>Bắt đầu học ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Giáo viên */}
            <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700 space-y-4">
              <div className="inline-flex p-3 rounded-xl bg-blue-600 text-white">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Dành cho Giáo viên & Thầy cô</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Không gian chia sẻ học liệu chuẩn, phân quyền đăng tải bài giảng, theo dõi mức độ tương tác và đóng góp vào kho tri thức Lịch sử.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Tải lên và xuất bản giáo án, đề thi và chuyên đề</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Theo dõi lượt xem, tải và phản hồi của học sinh</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Tương tác quản lý danh mục và học liệu số thông minh</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  useApp().switchRole('teacher');
                }}
                className="pt-2 text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center space-x-1"
              >
                <span>Trải nghiệm cổng Giáo viên</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
