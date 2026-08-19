import { VietnamHistoricalEra, VietnamHistoryQuote, HistoryThemeKey } from '../types';

export interface ThemeConfig {
  key: HistoryThemeKey;
  name: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  secondaryColor: string;
  primaryBg: string;
  cardBg: string;
  borderColor: string;
  headerBg: string;
  sidebarBg: string;
  badgeBg: string;
  badgeText: string;
  quoteAuthorColor: string;
  highlightGradient: string;
  dongSonColor: string;
}

export const THEME_CONFIGS: Record<HistoryThemeKey, ThemeConfig> = {
  'hao-khi-dong-a': {
    key: 'hao-khi-dong-a',
    name: 'Hào Khí Đông A',
    subtitle: 'Sơn mài đỏ đô, Hoàng kim đồng thau & Giấy Dó cổ truyền',
    tagline: 'Khí phách ngàn năm – Hồn thiêng sông núi',
    accentColor: '#991B1B', // Deep Lacquer Red
    secondaryColor: '#D97706', // Antique Bronze Gold
    primaryBg: 'bg-[#FDFBF7]',
    cardBg: 'bg-[#FFFDF9]',
    borderColor: 'border-[#EAE1D1]',
    headerBg: 'bg-gradient-to-r from-[#691111] via-[#851919] to-[#540D0D]',
    sidebarBg: 'bg-[#4A0C0C]',
    badgeBg: 'bg-[#FEF2F2]',
    badgeText: 'text-[#991B1B]',
    quoteAuthorColor: 'text-[#D97706]',
    highlightGradient: 'from-[#991B1B] via-[#B91C1C] to-[#D97706]',
    dongSonColor: '#B45309',
  },
  'son-ha-xanh': {
    key: 'son-ha-xanh',
    name: 'Sơn Hà Xã Tắc',
    subtitle: 'Ngọc bích Thăng Long, Rừng vàng biển bạc & Hoàng thành',
    tagline: 'Giang sơn gấm vóc – Rạng rỡ ngàn đời',
    accentColor: '#065F46', // Royal Jade Green
    secondaryColor: '#D97706', // Gold Amber
    primaryBg: 'bg-[#F8FAF8]',
    cardBg: 'bg-[#FFFFFF]',
    borderColor: 'border-[#D1E7DD]',
    headerBg: 'bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#022C22]',
    sidebarBg: 'bg-[#022C22]',
    badgeBg: 'bg-[#ECFDF5]',
    badgeText: 'text-[#065F46]',
    quoteAuthorColor: 'text-[#059669]',
    highlightGradient: 'from-[#065F46] via-[#047857] to-[#D97706]',
    dongSonColor: '#047857',
  },
  'fpt-heritage': {
    key: 'fpt-heritage',
    name: 'FPT Sử Việt Học Đường',
    subtitle: 'Cam năng động FPT kết hợp Xanh Thăng Long & Họa tiết di sản',
    tagline: 'Khám phá lịch sử – Kiến tạo tương lai',
    accentColor: '#F37021', // FPT Orange
    secondaryColor: '#002D56', // FPT Navy
    primaryBg: 'bg-[#F8FAFC]',
    cardBg: 'bg-[#FFFFFF]',
    borderColor: 'border-[#E2E8F0]',
    headerBg: 'bg-gradient-to-r from-[#002D56] via-[#0A3D6B] to-[#001D38]',
    sidebarBg: 'bg-[#002D56]',
    badgeBg: 'bg-[#FFF7ED]',
    badgeText: 'text-[#F37021]',
    quoteAuthorColor: 'text-[#F37021]',
    highlightGradient: 'from-[#002D56] via-[#F37021] to-[#D97706]',
    dongSonColor: '#F37021',
  },
};

export const VIETNAM_HISTORICAL_ERAS: VietnamHistoricalEra[] = [
  {
    id: 'era_dung_nuoc',
    name: 'Thời đại Dựng nước & Giữ nước đầu tiên',
    period: '2879 TCN – 179 TCN',
    dynasties: 'Nhà nước Văn Lang (18 đời Hùng Vương) • Âu Lạc (An Dương Vương)',
    description: 'Bình minh lịch sử dân tộc với nền văn minh Sông Hồng rực rỡ, kỹ nghệ đúc trống đồng Đông Sơn đỉnh cao và truyền thống dựng nước từ đền Hùng.',
    icon: 'crown',
    color: '#D97706',
    bannerImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    keyEvents: [
      'Nhà nước Văn Lang thành lập đóng đô tại Phong Châu (Phú Thọ)',
      'Nền văn hóa Đông Sơn phát triển rực rỡ với Trống đồng',
      'Thục Phán An Dương Vương lập nước Âu Lạc, xây thành Cổ Loa',
      'Sáng chế Nỏ Thần Liên Cơ bảo vệ bờ cõi'
    ],
    keyFigures: ['Các Vua Hùng', 'An Dương Vương', 'Lạc Long Quân & Âu Cơ', 'Thánh Gióng'],
    docCategory: 'ancient',
  },
  {
    id: 'era_bac_thuoc',
    name: 'Hơn Một Ngàn Năm Chống Bắc Thuộc',
    period: '179 TCN – 938 SCN',
    dynasties: 'Khởi nghĩa Hai Bà Trưng • Bà Triệu • Lý Nam Đế (Vạn Xuân) • Mai Hắc Đế • Ngô Quyền',
    description: 'Thời kỳ kiên cường bảo tồn văn hóa cội nguồn và hàng loạt cuộc khởi nghĩa quật khởi giành lại chủ quyền dân tộc.',
    icon: 'swords',
    color: '#991B1B',
    bannerImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    keyEvents: [
      'Năm 40: Khởi nghĩa Hai Bà Trưng "Đền nợ nước, trả thù nhà"',
      'Năm 248: Khởi nghĩa Bà Triệu cưỡi voi đánh giặc',
      'Năm 542 - 544: Lý Bí khởi nghĩa lập ra nhà nước Vạn Xuân',
      'Năm 938: Chiến thắng Bạch Đằng lịch sử của Ngô Quyền chấm dứt 1000 năm Bắc thuộc'
    ],
    keyFigures: ['Trưng Trắc & Trưng Nhị', 'Triệu Thị Trinh', 'Lý Nam Đế', 'Khúc Thừa Dụ', 'Ngô Quyền'],
    docCategory: 'vietnam',
  },
  {
    id: 'era_quan_chu_thinh_vuong',
    name: 'Thời kỳ Quân chủ Độc lập & Hào khí Đông A',
    period: '938 – 1858',
    dynasties: 'Đinh • Tiền Lê • Lý • Trần • Hậu Lê • Tây Sơn • Nguyễn',
    description: 'Giai đoạn thịnh trị rực rỡ của văn hiến Đại Việt với bản Tuyên ngôn Nam Quốc Sơn Hà, 3 lần đại phá quân Nguyên Mông và chiến thắng Ngọc Hồi – Đống Đa.',
    icon: 'landmark',
    color: '#B45309',
    bannerImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&auto=format&fit=crop&q=80',
    keyEvents: [
      'Năm 1010: Lý Thái Tổ dời đô về Thăng Long, mở ra kỷ nguyên văn hiến',
      'Năm 1077: Lý Thường Kiệt đọc bài thơ thần "Nam Quốc Sơn Hà" trên phòng tuyến sông Như Nguyệt',
      '1258 - 1288: Ba lần kháng chiến chống quân xâm lược Mông - Nguyên thắng lợi rực rỡ',
      '1428: Nguyễn Trãi viết "Bình Ngô Đại Cáo" sau toàn thắng khởi nghĩa Lam Sơn',
      'Năm 1789: Quang Trung đại phá 29 vạn quân Thanh mùa xuân Kỷ Dậu'
    ],
    keyFigures: ['Lý Thái Tổ', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Trần Nhân Tông', 'Lê Lợi', 'Nguyễn Trãi', 'Quang Trung Nguyễn Huệ'],
    docCategory: 'vietnam',
  },
  {
    id: 'era_can_dai_phap',
    name: 'Phong trào Cần Vương & Đấu tranh Giải phóng Dân tộc',
    period: '1858 – 1945',
    dynasties: 'Phong trào Cần Vương • Đông Du • Duy Tân • Khởi nghĩa Yên Thế • Thành lập ĐCSVN',
    description: 'Cuộc tìm đường cứu nước đầy gian nan từ phong trào Cần Vương đến khi Nguyễn Ái Quốc tiếp thu chủ nghĩa Mác-Lênin, lãnh đạo Cách mạng Tháng Tám 1945.',
    icon: 'compass',
    color: '#C2410C',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    keyEvents: [
      'Năm 1858: Thực dân Pháp nổ súng tấn công Đà Nẵng, mở đầu xâm lược',
      '1885: Vua Hàm Nghi ban chiếu Cần Vương',
      '1911: Người thanh niên Nguyễn Tất Thành ra đi tìm đường cứu nước từ Bến Nhà Rồng',
      '3/2/1930: Thành lập Đảng Cộng sản Việt Nam tại Cửu Long (Hương Cảng)',
      '19/8/1945: Cách mạng Tháng Tám thành công rực rỡ, khai sinh nước VNDCCH'
    ],
    keyFigures: ['Phan Bội Châu', 'Phan Châu Trinh', 'Hoàng Hoa Thám', 'Nguyễn Ái Quốc (Hồ Chí Minh)', 'Võ Nguyên Giáp'],
    docCategory: 'revolution',
  },
  {
    id: 'era_ve_quoc_dien_bien',
    name: 'Hai Cuộc Kháng chiến Vệ quốc Vĩ đại',
    period: '1945 – 1975',
    dynasties: 'Kháng chiến chống thực dân Pháp (1945-1954) • Kháng chiến chống Mỹ cứu nước (1954-1975)',
    description: 'Trang sử vàng chói lọi với Chiến thắng Điện Biên Phủ 1954 và Đại thắng Mùa Xuân 1975 non sông liền một dải.',
    icon: 'flag',
    color: '#B91C1C',
    bannerImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
    keyEvents: [
      '2/9/1945: Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',
      '7/5/1954: Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu"',
      '1959 - 1975: Mở đường mòn Hồ Chí Minh huyền thoại',
      '12/1972: Chiến thắng "Hà Nội - Điện Biên Phủ trên không"',
      '30/4/1975: Chiến dịch Hồ Chí Minh toàn thắng, giải phóng hoàn toàn miền Nam'
    ],
    keyFigures: ['Chủ tịch Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp', 'Đồng chí Lê Duẩn', 'Đại tướng Nguyễn Chí Thanh', 'Anh hùng Tô Vĩnh Diện', 'Phan Đình Giót'],
    docCategory: 'wars',
  },
  {
    id: 'era_doi_moi',
    name: 'Thời kỳ Đổi mới, Xây dựng & Hội nhập Toàn cầu',
    period: '1986 – Nay',
    dynasties: 'Công cuộc Đổi mới (Đại hội VI 1986) • Công nghiệp hóa – Hiện đại hóa • Hội nhập Quốc tế',
    description: 'Hành trình vượt qua khủng hoảng kinh tế, vươn mình trở thành nền kinh tế năng động và nâng cao vị thế ngoại giao của Việt Nam trên trường quốc tế.',
    icon: 'globe',
    color: '#047857',
    bannerImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=80',
    keyEvents: [
      '12/1986: Đại hội đại biểu toàn quốc lần thứ VI đề ra đường lối Đổi Mới đất nước',
      '1995: Việt Nam chính thức gia nhập ASEAN và bình thường hóa quan hệ với Hoa Kỳ',
      '2007: Việt Nam chính thức trở thành thành viên thứ 150 của WTO',
      'Hiện nay: Chuyển đổi số quốc gia, kinh tế tri thức và khẳng định chủ quyền biển đảo thiêng liêng'
    ],
    keyFigures: ['Tổng Bí thư Nguyễn Văn Linh', 'Cố Thủ tướng Võ Văn Kiệt', 'Toàn thể nhân dân Việt Nam'],
    docCategory: 'modern',
  },
];

export const VIETNAM_HISTORY_QUOTES: VietnamHistoryQuote[] = [
  {
    id: 'q1',
    quote: 'Nam quốc sơn hà Nam đế cư,\nTiệt nhiên định phận tại thiên thư.\nNhư hà nghịch lỗ lai xâm phạm,\nNhữ đẳng hành khan thủ bại hư.',
    originalText: 'Sông núi nước Nam vua Nam ở, rành rành định phận tại sách trời. Cớ sao lũ giặc sang xâm phạm, chúng bay sẽ bị đánh tơi bời!',
    author: 'Lý Thường Kiệt',
    year: '1077',
    context: 'Bài thơ Thần ngâm vang bên phòng tuyến sông Như Nguyệt, khích lệ tinh thần quân sĩ đánh tan giặc Tống.',
    source: 'Bản Tuyên ngôn Độc lập đầu tiên của dân tộc',
  },
  {
    id: 'q2',
    quote: 'Ta thường tới bữa quên ăn, nửa đêm vỗ gối, ruột đau như cắt, nước mắt đầm đìa; chỉ căm tức rằng chưa xả thịt lột da, nuốt gan uống máu quân thù.',
    author: 'Quốc công Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn',
    year: '1285',
    context: 'Lời hịch đanh thép thôi thúc tướng sĩ đồng lòng quyết chiến trước họa xâm lăng của quân Nguyên Mông.',
    source: 'Hịch Tướng Sĩ',
  },
  {
    id: 'q3',
    quote: 'Việc nhân nghĩa cốt ở yên dân,\nQuân điếu phạt trước lo trừ bạo.\nNhư nước Đại Việt ta từ trước,\nVốn xưng nền văn hiến đã lâu.',
    author: 'Nguyễn Trãi',
    year: '1428',
    context: 'Khúc tráng ca tổng kết toàn thắng của khởi nghĩa Lam Sơn 10 năm gian khổ chống quân Minh.',
    source: 'Bình Ngô Đại Cáo (Thiên cổ hùng văn)',
  },
  {
    id: 'q4',
    quote: 'Đánh cho để dài tóc, đánh cho để đen răng, đánh cho nó chích luân bất phản, đánh cho nó phiến giáp bất hoàn, đánh cho sử tri Nam quốc anh hùng chi hữu chủ!',
    author: 'Hoàng đế Quang Trung (Nguyễn Huệ)',
    year: '1789',
    context: 'Lời thề xuất quân tại Tam Điệp – Biện Sơn trước khi thần tốc tiến quân giải phóng Thăng Long.',
    source: 'Lời hiểu dụ quân sĩ Tết Kỷ Dậu 1789',
  },
  {
    id: 'q5',
    quote: 'Dân ta phải biết sử ta\nCho tường gốc tích nước nhà Việt Nam.\nSử ta dạy cho ta bài học này: Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do.',
    author: 'Chủ tịch Hồ Chí Minh',
    year: '1942',
    context: 'Tác phẩm mở đầu bằng thể thơ lục bát để truyền bá lịch sử dân tộc cho toàn thể đồng bào.',
    source: 'Tác phẩm "Lịch sử nước ta"',
  },
  {
    id: 'q6',
    quote: 'Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập. Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy!',
    author: 'Chủ tịch Hồ Chí Minh',
    year: '1945',
    context: 'Tuyên ngôn lịch sử đọc trước quốc dân đồng bào và toàn thế giới tại Quảng trường Ba Đình.',
    source: 'Tuyên ngôn Độc lập 2/9/1945',
  },
];
