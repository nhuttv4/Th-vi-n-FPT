import { DocumentItem, User, PersonalCollection } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u_nhuttv4',
    name: 'Nhựt TV',
    email: 'nhuttv4@fpt.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    grade: '12',
    school: 'FPT Education',
    createdAt: '2025-09-01',
    readCount: 32,
    completedQuizzes: 18,
    streakDays: 9,
  },
  {
    id: 'u_student_thcs',
    name: 'Học sinh THCS FPT',
    email: 'student.thcs@fpt.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'student',
    grade: '9',
    school: 'THCS FPT',
    createdAt: '2025-09-05',
    readCount: 19,
    completedQuizzes: 12,
    streakDays: 5,
  },
  {
    id: 'u_teacher_1',
    name: 'Cô Trần Mai Phương',
    email: 'phuongtm.hist@fpt.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'teacher',
    grade: 'all',
    school: 'Tổ Lịch sử - THPT FPT',
    createdAt: '2024-08-15',
    readCount: 142,
    completedQuizzes: 0,
    streakDays: 45,
  },
  {
    id: 'u_admin_1',
    name: 'Ban Quản trị Thư viện FPT',
    email: 'admin.library@fpt.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    grade: 'all',
    school: 'FPT Education Campus',
    createdAt: '2024-01-01',
    readCount: 350,
    completedQuizzes: 0,
    streakDays: 120,
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc_1',
    title: 'Đề cương ôn tập Lịch sử 12 – Học kỳ I (Chương trình GDPT 2018)',
    description: 'Hệ thống hóa toàn bộ kiến thức trọng tâm Lịch sử Việt Nam từ 1919 đến 1945 và Lịch sử Thế giới hiện đại sau CTTG II. Có bảng so sánh và sơ đồ tư duy trực quan.',
    type: 'outline',
    category: 'vietnam',
    grade: '12',
    subject: 'Lịch sử 12',
    difficulty: 'medium',
    authorId: 'u_teacher_1',
    authorName: 'Cô Trần Mai Phương',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    fileUrl: '/docs/de-cuong-lich-su-12-hk1.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '4.2 MB',
    pagesCount: 18,
    tags: ['Ôn thi học kỳ', 'Lịch sử 12', 'Sơ đồ tư duy', '1919-1945', 'Việt Nam Hiện đại'],
    status: 'published',
    viewCount: 3840,
    downloadCount: 1420,
    likesCount: 512,
    rating: 4.9,
    hasAnswerKey: true,
    questionCount: 40,
    createdAt: '2025-10-15',
    updatedAt: '2025-11-20',
    tableOfContents: [
      { title: 'Phần I: Khái quát Lịch sử Thế giới 1945 - 2000', page: 1 },
      { title: 'Phần II: Phong trào Dân tộc Dân chủ ở Việt Nam (1919 - 1930)', page: 5 },
      { title: 'Phần III: Cuộc vận động giải phóng dân tộc (1939 - 1945)', page: 10 },
      { title: 'Phần IV: Cách mạng tháng Tám và sự ra đời nước VNDCCH', page: 14 },
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Trật tự thế giới hai cực I-an-ta và quan hệ quốc tế',
        content: `I. HỘI NGHỊ I-AN-TA (2/1945) VÀ THỎA THUẬN CỦA BA CƯỜNG QUỐC

1. Bối cảnh lịch sử:
Đầu năm 1945, Chiến tranh thế giới thứ hai bước vào giai đoạn kết thúc. Nhiều vấn đề cấp bách đặt ra trước các nước Đồng minh:
- Nhanh chóng tiêu diệt hoàn toàn chủ nghĩa phát xít.
- Tổ chức lại thế giới sau chiến tranh.
- Phân chia khu vực chiếm đóng và phạm vi ảnh hưởng giữa các nước thắng trận.

Từ ngày 4 đến 11/2/1945, Hội nghị cấp cao ba cường quốc (Liên Xô, Mỹ, Anh) được triệu tập tại I-an-ta (Liên Xô) với sự tham dự của I.Xtalin, Ph.Rudơven và O.Sớcsin.

2. Những quyết định quan trọng:
- Tiêu diệt tận gốc chủ nghĩa phát xít Đức và quân phiệt Nhật.
- Thành lập tổ chức Liên hợp quốc nhằm duy trì hòa bình và an ninh thế giới.
- Thỏa thuận về việc đóng quân tại các nước nhằm giải giáp quân đội phát xít và phân chia phạm vi ảnh hưởng ở châu Âu và châu Á.`,
        keyTerms: ['Hội nghị Ianta', 'Hai cực', 'Liên hợp quốc', 'Phạm vi ảnh hưởng'],
        footnotes: ['* Hội nghị diễn ra từ ngày 4 đến 11/2/1945 tại bán đảo Crưm (Liên Xô).']
      },
      {
        pageNumber: 2,
        title: 'Sự hình thành hai hệ thống đối lập và Chiến tranh Lạnh',
        content: `II. NGUYÊN NHÂN VÀ BIỂU HIỆN CỦA CHIẾN TRANH LẠNH (1947 - 1989)

1. Sự đối lập về mục tiêu và chiến lược giữa hai siêu cường:
- Mỹ chủ trương thực hiện "Chiến lược toàn cầu" nhằm đàn áp phong trào cách mạng, ngăn chặn chủ nghĩa xã hội và vươn lên làm bá chủ thế giới.
- Liên Xô kiên trì đường lối hòa bình, ủng hộ phong trào giải phóng dân tộc và bảo vệ chủ nghĩa xã hội.

2. Các mốc đánh dấu sự khởi đầu của Chiến tranh Lạnh:
- Tháng 3/1947: Học thuyết Truman tuyên bố sự tồn tại của chủ nghĩa cộng sản là nguy cơ đối với an ninh nước Mỹ.
- Tháng 6/1947: Kế hoạch Mác-san (Kế hoạch phục hưng châu Âu) viện trợ kinh tế đi kèm điều kiện chính trị.
- Tháng 4/1949: Thành lập khối quân sự NATO.
- Tháng 5/1955: Thành lập Tổ chức Hiệp ước Vácsava của các nước XHCN ở châu Âu.`,
        keyTerms: ['Chiến tranh Lạnh', 'Học thuyết Truman', 'Kế hoạch Mác-san', 'NATO', 'Vácsava'],
      },
      {
        pageNumber: 3,
        title: 'Phong trào giải phóng dân tộc ở Á, Phi, Mỹ Latinh',
        content: `III. CAO TRÀO GIẢI PHÓNG DÂN TỘC SAU NĂM 1945

1. Đặc điểm nổi bật:
- Quy mô rộng lớn trên toàn thế giới, diễn ra mạnh mẽ nhất ở châu Á, châu Phi và khu vực Mỹ Latinh.
- Đập tan hoàn toàn hệ thống thuộc địa của chủ nghĩa thực dân cũ và làm suy yếu chủ nghĩa thực dân mới.
- Hơn 100 quốc gia độc lập trẻ tuổi ra đời và trở thành lực lượng chính trị tích cực trên trường quốc tế.

2. Các mốc tiêu biểu:
- 1945: Ba nước Đông Nam Á đầu tiên tuyên bố độc lập: Inđônêxia (17/8), Việt Nam (2/9), Lào (12/10).
- 1949: Nước CHND Trung Hoa thành lập (1/10/1949), làm thay đổi sâu sắc so sánh lực lượng toàn cầu.
- 1959: Thắng lợi của Cách mạng Cuba (1/1/1959).
- 1960: "Năm châu Phi" với 17 quốc gia tuyên bố độc lập.`,
        keyTerms: ['Năm châu Phi 1960', 'Cách mạng Cuba', 'Đông Nam Á 1945']
      }
    ],
    sampleQuestions: [
      {
        id: 'q_1_1',
        question: 'Hội nghị I-an-ta (tháng 2-1945) diễn ra khi cuộc Chiến tranh thế giới thứ hai đang ở giai đoạn nào?',
        options: [
          'Bắt đầu bùng nổ quyết liệt',
          'Bước vào giai đoạn kết thúc',
          'Đang ở thế giằng co quyết định',
          'Đã hoàn toàn kết thúc thắng lợi'
        ],
        correctAnswer: 1,
        explanation: 'Đầu năm 1945, Chiến tranh thế giới thứ hai bước vào giai đoạn kết thúc, quân đội phát xít liên tiếp thất bại trên các mặt trận.'
      },
      {
        id: 'q_1_2',
        question: 'Sự kiện nào đánh dấu sự khởi đầu chính thức của cuộc "Chiến tranh Lạnh" do Mỹ phát động?',
        options: [
          'Thành lập khối quân sự NATO (1949)',
          'Công bố Kế hoạch Mác-san (1947)',
          'Thông điệp của Tổng thống Truman tại Quốc hội Mỹ (3/1947)',
          'Khủng hoảng tên lửa ở Cuba (1962)'
        ],
        correctAnswer: 2,
        explanation: 'Tháng 3/1947, Tổng thống Truman đọc thông điệp trước Quốc hội Mỹ, khẳng định sự tồn tại của Liên Xô là nguy cơ lớn, chính thức phát động Chiến tranh Lạnh.'
      }
    ]
  },
  {
    id: 'doc_2',
    title: '50 câu hỏi trắc nghiệm Chuyên đề Cách mạng tháng Tám năm 1945 (Có lời giải chi tiết)',
    description: 'Bộ câu hỏi trắc nghiệm rèn luyện kỹ năng phân hóa điểm 8-9-10. Phân tích rõ thời cơ, vai trò của Mặt trận Việt Minh và ý nghĩa lịch sử sâu sắc.',
    type: 'exercise',
    category: 'revolution',
    grade: '12',
    subject: 'Lịch sử 12',
    difficulty: 'good',
    authorId: 'u_teacher_1',
    authorName: 'Thầy Lê Văn Hùng',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    fileUrl: '/docs/50-cau-trac-nghiem-cach-mang-thang-tam.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '2.8 MB',
    pagesCount: 12,
    tags: ['Cách mạng tháng Tám', 'Trắc nghiệm 12', 'Tổng khởi nghĩa', 'Thời cơ lịch sử'],
    status: 'published',
    viewCount: 5210,
    downloadCount: 2310,
    likesCount: 890,
    rating: 5.0,
    hasAnswerKey: true,
    questionCount: 50,
    createdAt: '2025-08-20',
    updatedAt: '2025-09-02',
    sampleQuestions: [
      {
        id: 'q_2_1',
        question: 'Thời cơ "ngàn năm có một" của Cách mạng tháng Tám năm 1945 ở Việt Nam tồn tại trong khoảng thời gian nào?',
        options: [
          'Từ khi Nhật đảo chính Pháp (9/3/1945) đến khi Nhật đầu hàng Đồng minh',
          'Từ khi Nhật đầu hàng Đồng minh (15/8/1945) đến trước khi quân Đồng minh vào Đông Dương',
          'Từ khi Hội nghị Tân Trào họp đến ngày 2/9/1945',
          'Từ khi Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập đến cuối năm 1946'
        ],
        correctAnswer: 1,
        explanation: 'Thời cơ xuất hiện từ lúc Nhật tuyên bố đầu hàng (15/8/1945) và kéo dài đến trước khi quân đội các nước Đồng minh (Anh, Trung Hoa Dân Quốc) đổ bộ vào giải giáp quân Nhật.'
      },
      {
        id: 'q_2_2',
        question: 'Bốn tỉnh giành được chính quyền ở tỉnh lỵ sớm nhất trong cả nước vào tháng 8-1945 là:',
        options: [
          'Bắc Giang, Hải Dương, Hà Tĩnh, Quảng Nam',
          'Hà Nội, Huế, Sài Gòn, Hải Phòng',
          'Thái Nguyên, Tuyên Quang, Cao Bằng, Lạng Sơn',
          'Nghệ An, Hà Tĩnh, Quảng Bình, Quảng Trị'
        ],
        correctAnswer: 0,
        explanation: 'Ngày 18/8/1945, nhân dân 4 tỉnh Bắc Giang, Hải Dương, Hà Tĩnh, Quảng Nam đã nhanh chóng nổi dậy và giành được chính quyền cấp tỉnh sớm nhất cả nước.'
      },
      {
        id: 'q_2_3',
        question: 'Bài học kinh nghiệm quý báu nhất của Cách mạng tháng Tám 1945 còn nguyên giá trị đối với công cuộc bảo vệ Tổ quốc hiện nay là gì?',
        options: [
          'Tranh thủ sự giúp đỡ quốc tế tuyệt đối',
          'Tập hợp sức mạnh khối đại đoàn kết toàn dân tộc',
          'Tiến hành đấu tranh vũ trang bất kỳ lúc nào',
          'Đàm phán hòa hoãn với mọi kẻ thù'
        ],
        correctAnswer: 1,
        explanation: 'Khối đại đoàn kết toàn dân tộc dưới ngọn cờ Mặt trận Việt Minh là nguồn sức mạnh quyết định thắng lợi của Cách mạng tháng Tám và là bài học thiêng liêng trường tồn.'
      }
    ]
  },
  {
    id: 'doc_3',
    title: 'Đề thi thử THPT Quốc gia môn Lịch sử – Đề số 01 (Chuẩn cấu trúc 2026)',
    description: 'Đề thi thử chuẩn ma trận đề tham khảo Bộ Giáo dục và Đào tạo. Gồm 40 câu hỏi trắc nghiệm có mức độ phân hóa cao, kèm bảng đáp án và hướng dẫn giải chi tiết.',
    type: 'exam',
    category: 'thpt_prep',
    grade: '12',
    subject: 'Lịch sử 12',
    difficulty: 'advanced',
    authorId: 'u_admin_1',
    authorName: 'Tổ Chuyên môn FPT Education',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    fileUrl: '/docs/de-thi-thu-thpt-lich-su-01.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '3.5 MB',
    pagesCount: 8,
    tags: ['Đề thi thử THPT', 'Luyện thi 2026', 'Chuẩn cấu trúc', 'Có đáp án'],
    status: 'published',
    viewCount: 6890,
    downloadCount: 3450,
    likesCount: 1205,
    rating: 4.95,
    hasAnswerKey: true,
    questionCount: 40,
    createdAt: '2026-01-10',
    updatedAt: '2026-02-15',
    sampleQuestions: [
      {
        id: 'q_3_1',
        question: 'Chiến thắng nào của quân và dân ta trong cuộc kháng chiến chống Mỹ đã làm phá sản hoàn toàn chiến lược "Chiến tranh đặc biệt" (1961 - 1965)?',
        options: [
          'Chiến thắng Ấp Bắc (1963)',
          'Chiến thắng Bình Giã (1964)',
          'Chiến thắng Đồng Xoài, Ba Gia (1965)',
          'Chiến thắng Vạn Tường (1965)'
        ],
        correctAnswer: 1,
        explanation: 'Chiến thắng Bình Giã (12/1964) đã giáng đòn quyết định làm phá sản về cơ bản chiến lược Chiến tranh đặc biệt của đế quốc Mỹ.'
      },
      {
        id: 'q_3_2',
        question: 'Đường lối Đổi mới của Đảng Cộng sản Việt Nam được đề ra tại Đại hội đại biểu toàn quốc lần thứ mấy (tháng 12-1986)?',
        options: [
          'Đại hội IV',
          'Đại hội V',
          'Đại hội VI',
          'Đại hội VII'
        ],
        correctAnswer: 2,
        explanation: 'Đại hội VI của Đảng (12/1986) đã mở ra bước ngoặt lịch sử khi khởi xướng công cuộc Đổi mới toàn diện đất nước, trọng tâm là đổi mới kinh tế.'
      }
    ]
  },
  {
    id: 'doc_4',
    title: 'Lịch sử Việt Nam Hiện đại (1945 – 1975): Những trang vàng chói lọi',
    description: 'Ebook chuyên khảo phục vụ học sinh chuyên Lịch sử và học sinh thi học sinh giỏi THPT. Phân tích sâu sắc nghệ thuật quân sự và chiến lược ngoại giao Việt Nam.',
    type: 'ebook',
    category: 'vietnam',
    grade: '12',
    subject: 'Lịch sử Chuyên đề',
    difficulty: 'advanced',
    authorId: 'u_teacher_1',
    authorName: 'PGS. TS. Hoàng Quốc Việt',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    fileUrl: '/docs/ebook-lich-su-viet-nam-hien-dai.epub',
    thumbnailUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80',
    fileType: 'epub',
    fileSize: '15.6 MB',
    pagesCount: 240,
    tags: ['Ebook', 'Lịch sử Việt Nam', 'Chuyên sâu', 'Nghệ thuật quân sự', 'Điện Biên Phủ', '1975'],
    status: 'published',
    viewCount: 4120,
    downloadCount: 1890,
    likesCount: 760,
    rating: 4.92,
    hasAnswerKey: false,
    createdAt: '2025-05-12',
    updatedAt: '2025-11-01',
    tableOfContents: [
      { title: 'Chương 1: Bảo vệ và củng cố chính quyền cách mạng (1945 - 1946)', page: 1 },
      { title: 'Chương 2: Cuộc kháng chiến toàn quốc chống thực dân Pháp bùng nổ', page: 35 },
      { title: 'Chương 3: Bước phát triển của cuộc kháng chiến (1951 - 1953)', page: 80 },
      { title: 'Chương 4: Chiến dịch Điện Biên Phủ lịch sử và Hiệp định Giơnevơ', page: 120 },
      { title: 'Chương 5: Cuộc kháng chiến chống Mỹ cứu nước (1954 - 1975)', page: 165 },
      { title: 'Chương 6: Đại thắng mùa Xuân 1975 và bài học lịch sử muôn đời', page: 210 },
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Tình thế "Ngàn cân treo sợi tóc" sau ngày 2/9/1945',
        content: `CHƯƠNG 1: BẢO VỆ VÀ CỦNG CỐ CHÍNH QUYỀN CÁCH MẠNG (1945 - 1946)

1. Hoàn cảnh nước ta sau Cách mạng tháng Tám:
Nước Việt Nam Dân chủ Cộng hòa vừa mới ra đời đã phải đương đầu với muôn vàn khó khăn, thách thức cực kỳ hiểm nghèo:

a) Nạn ngoại xâm và nội phản:
- Từ vĩ tuyến 16 trở ra Bắc: Hơn 20 vạn quân Tưởng Giới Thạch ồ ạt kéo vào với danh nghĩa giải giáp quân Nhật, nhưng thực chất âm mưu lật đổ chính quyền cách mạng.
- Từ vĩ tuyến 16 trở vào Nam: Hơn 1 vạn quân Anh mở đường cho thực dân Pháp quay trở lại xâm lược nước ta lần thứ hai.
- Trong nước: Các lực lượng phản động tay sai (Việt Quốc, Việt Cách) điên cuồng chống phá.

b) Nạn đói, nạn dốt và khó khăn tài chính:
- Nạn đói cuối 1944 đầu 1945 cướp đi sinh mạng hơn 2 triệu đồng bào; nạn lụt lớn làm vỡ đê 9 tỉnh Bắc Bộ.
- Hơn 90% dân số mù chữ, tàn dư văn hóa nô dịch phong kiến, hủ tục lạc hậu đè nặng.
- Ngân sách nhà nước gần như trống rỗng, chỉ còn hơn 1,2 triệu đồng, trong đó hơn một nửa là tiền rách.`,
        keyTerms: ['Ngàn cân treo sợi tóc', 'Ngoại xâm nội phản', 'Giặc đói', 'Giặc dốt']
      },
      {
        pageNumber: 2,
        title: 'Biện pháp giải quyết nạn đói, nạn dốt và tài chính',
        content: `2. Các biện pháp cấp bách của Chính phủ lâm thời:

- Diệt giặc đói:
Chủ tịch Hồ Chí Minh kêu gọi toàn dân thực hành "Nhường cơm sẻ áo", lập "Hũ gạo cứu đói", tổ chức "Ngày đồng tâm" và đẩy mạnh tăng gia sản xuất "Tấc đất tấc vàng". Nhờ đó, nạn đói nhanh chóng bị đẩy lùi.

- Diệt giặc dốt:
Ngày 8/9/1945, Hồ Chủ tịch ký sắc lệnh thành lập Nha Bình dân học vụ. Phong trào xóa nạn mù chữ lan rộng khắp cả nước, chỉ trong vòng một năm đã có hơn 2,5 triệu người biết đọc, biết viết.

- Giải quyết khó khăn tài chính:
Phát động phong trào "Tuần lễ Vàng" và xây dựng "Quỹ Độc lập". Nhân dân ta đã tự nguyện quyên góp 370 kg vàng và 20 triệu đồng vào quỹ ngân khố quốc gia.`,
        keyTerms: ['Bình dân học vụ', 'Tuần lễ Vàng', 'Hũ gạo cứu đói']
      }
    ]
  },
  {
    id: 'doc_5',
    title: 'Tổng hợp kiến thức Lịch sử 10 – Khái quát Văn minh Thế giới Cổ – Trung đại',
    description: 'Tài liệu tóm lược các nền văn minh lớn: Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa, Hy Lạp - La Mã cổ đại và Văn minh Phục hưng châu Âu. Trực quan với hình ảnh hiện vật và bản đồ.',
    type: 'outline',
    category: 'civilization',
    grade: '10',
    subject: 'Lịch sử 10',
    difficulty: 'medium',
    authorId: 'u_teacher_1',
    authorName: 'Thầy Đỗ Minh Quân',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    fileUrl: '/docs/tong-hop-lich-su-10-van-minh-the-gioi.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '5.1 MB',
    pagesCount: 22,
    tags: ['Lịch sử 10', 'Văn minh Cổ đại', 'Ai Cập', 'Hy Lạp La Mã', 'Phục hưng'],
    status: 'published',
    viewCount: 3120,
    downloadCount: 1105,
    likesCount: 430,
    rating: 4.85,
    hasAnswerKey: true,
    questionCount: 30,
    createdAt: '2025-09-10',
    updatedAt: '2025-10-05',
  },
  {
    id: 'doc_6',
    title: 'Đề kiểm tra 1 tiết Lịch sử 11 – Phong trào yêu nước đầu thế kỷ XX (Có ma trận & đáp án)',
    description: 'Đề kiểm tra đánh giá định kỳ bài học Lịch sử 11 về xu hướng Cải cách (Phan Châu Trinh) và xu hướng Bạo động (Phan Bội Châu), phong trào Đông Du và Duy Tân.',
    type: 'exam',
    category: 'vietnam',
    grade: '11',
    subject: 'Lịch sử 11',
    difficulty: 'medium',
    authorId: 'u_teacher_1',
    authorName: 'Cô Trần Mai Phương',
    authorRole: 'teacher',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    fileUrl: '/docs/de-kiem-tra-1-tiet-lich-su-11.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '1.9 MB',
    pagesCount: 6,
    tags: ['Lịch sử 11', 'Phan Bội Châu', 'Phan Châu Trinh', 'Đông Du', 'Kiểm tra 1 tiết'],
    status: 'published',
    viewCount: 2450,
    downloadCount: 890,
    likesCount: 310,
    rating: 4.8,
    hasAnswerKey: true,
    questionCount: 25,
    createdAt: '2025-11-05',
    updatedAt: '2025-11-05',
  },
  {
    id: 'doc_7',
    title: '100 câu trắc nghiệm Lịch sử Thế giới Hiện đại (1945 - 2000)',
    description: 'Ngân hàng câu hỏi trắc nghiệm bao quát các chủ đề: Liên Xô và Đông Âu, các nước Á - Phi - Mỹ Latinh, Mỹ - Tây Âu - Nhật Bản và Xu thế toàn cầu hóa.',
    type: 'exercise',
    category: 'world',
    grade: '12',
    subject: 'Lịch sử 12',
    difficulty: 'good',
    authorId: 'u_admin_1',
    authorName: 'Tổ Chuyên môn FPT Education',
    authorRole: 'admin',
    fileUrl: '/docs/100-cau-trac-nghiem-the-gioi-hien-dai.docx',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=80',
    fileType: 'docx',
    fileSize: '2.1 MB',
    pagesCount: 16,
    tags: ['Lịch sử Thế giới', 'Toàn cầu hóa', 'Chiến tranh Lạnh', 'Trắc nghiệm 12'],
    status: 'published',
    viewCount: 4590,
    downloadCount: 2100,
    likesCount: 670,
    rating: 4.88,
    hasAnswerKey: true,
    questionCount: 100,
    createdAt: '2025-10-01',
    updatedAt: '2025-10-25',
  },
  {
    id: 'doc_8',
    title: 'Chuyên đề Cách mạng Công nghiệp lần thứ nhất và lần thứ hai',
    description: 'Tài liệu học tập chuyên sâu môn Lịch sử 10. Tìm hiểu động cơ hơi nước của James Watt, phát minh luyện kim, đường sắt và làn sóng điện khí hóa thế giới.',
    type: 'ebook',
    category: 'modern',
    grade: '10',
    subject: 'Lịch sử 10',
    difficulty: 'basic',
    authorId: 'u_teacher_1',
    authorName: 'Thầy Lê Văn Hùng',
    authorRole: 'teacher',
    fileUrl: '/docs/chuyen-de-cach-mang-cong-nghiep.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '6.4 MB',
    pagesCount: 45,
    tags: ['Cách mạng Công nghiệp', 'Lịch sử 10', 'Khoa học kỹ thuật', 'Cận đại'],
    status: 'published',
    viewCount: 1980,
    downloadCount: 750,
    likesCount: 280,
    rating: 4.75,
    hasAnswerKey: false,
    createdAt: '2025-09-18',
    updatedAt: '2025-09-18',
  },
  {
    id: 'doc_9',
    title: 'Sơ đồ tư duy & Tóm tắt Lịch sử 6: Nguồn gốc loài người & Văn minh Phương Đông',
    description: 'Hệ thống hóa bài học Lịch sử & Địa lí 6 GDPT 2018: Quá trình tiến hóa từ Vượn người thành Người hiện đại, nền văn minh Ai Cập, Lưỡng Hà, Ấn Độ và Nhà nước Văn Lang - Âu Lạc.',
    type: 'outline',
    category: 'ancient',
    grade: '6',
    subject: 'Lịch sử & Địa lí 6',
    difficulty: 'basic',
    authorId: 'u_teacher_1',
    authorName: 'Cô Trần Mai Phương',
    authorRole: 'teacher',
    fileUrl: '/docs/so-do-tu-duy-lich-su-6.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '3.8 MB',
    pagesCount: 14,
    tags: ['Lịch sử 6', 'THCS', 'Văn minh Cổ đại', 'Văn Lang Âu Lạc', 'Sơ đồ tư duy'],
    status: 'published',
    viewCount: 2680,
    downloadCount: 1120,
    likesCount: 390,
    rating: 4.92,
    hasAnswerKey: true,
    questionCount: 20,
    createdAt: '2025-09-20',
    updatedAt: '2025-10-10',
    tableOfContents: [
      { title: 'Bài 1: Nguồn gốc loài người và dấu tích tại Việt Nam', page: 1 },
      { title: 'Bài 2: Các nền văn minh Ai Cập, Lưỡng Hà cổ đại', page: 4 },
      { title: 'Bài 3: Văn minh Ấn Độ và Trung Quốc cổ đại', page: 8 },
      { title: 'Bài 4: Sự ra đời của Nhà nước Văn Lang - Âu Lạc', page: 11 },
    ],
    pages: [
      {
        pageNumber: 1,
        title: 'Nguồn gốc loài người và dấu tích Người tối cổ tại Việt Nam',
        content: `I. QUÁ TRÌNH TIẾN HÓA TỪ VƯỢN NGƯỜI THÀNH NGƯỜI
1. Các mốc tiến hóa:
- Vượn người (khoảng 5 - 6 triệu năm trước): Đã có thể đi bằng hai chi sau, dùng hai chi trước để cầm nắm.
- Người tối cổ (khoảng 4 triệu năm trước): Thể tích não lớn hơn, bắt đầu biết chế tác công cụ đá thô sơ và biết giữ lửa, dùng lửa.
- Người tinh khôn (khoảng 15 vạn năm trước): Hình dáng cơ thể hoàn toàn giống người ngày nay, thể tích não phát triển, biết trồng trọt và chăn nuôi.

II. DẤU TÍCH CỦA NGƯỜI NGUYÊN THỦY TRÊN ĐẤT NƯỚC VIỆT NAM
- Răng Người tối cổ được tìm thấy tại hang Thẩm Khuyên, Thẩm Hai (Lạng Sơn).
- Công cụ ghè đẽo thô sơ bằng đá cuội tại Núi Đọ, Quan Yên (Thanh Hóa), An Khê (Gia Lai), Xuân Lộc (Đồng Nai).
=> Khẳng định Việt Nam là một trong những cái nôi xuất hiện con người từ rất sớm trên thế giới.`,
        keyTerms: ['Vượn người', 'Người tối cổ', 'Người tinh khôn', 'Núi Đọ', 'Thẩm Khuyên'],
        footnotes: ['* Di chỉ An Khê (Gia Lai) có niên đại lên tới khoảng 80 vạn năm trước.']
      },
      {
        pageNumber: 2,
        title: 'Nhà nước Văn Lang và Âu Lạc',
        content: `I. NHÀ NƯỚC VĂN LANG (Thế kỉ VII TCN)
- Địa bàn: Lưu vực sông Hồng, sông Mã, sông Cả.
- Kinh đô: Bạch Hạc (Phú Thọ).
- Đứng đầu: Hùng Vương, chia nước thành 15 bộ.
- Tướng văn: Lạc hầu; Tướng võ: Lạc tướng; Đứng đầu các chiềng, chạ: Bồ chính.

II. NHÀ NƯỚC ÂU LẠC (Khoảng năm 208 TCN)
- Thục Phán hợp nhất người Tây Âu và Lạc Việt, lập ra nước Âu Lạc, xưng là An Dương Vương.
- Kinh đô chuyển về Cổ Loa (Đông Anh, Hà Nội ngày nay).
- Xây dựng thành Cổ Loa kiên cố với kiến trúc xoắn ốc 3 vòng thành độc đáo và chế tạo nỏ thần Liên Châu bắn một phát nhiều mũi tên đồng.`,
        keyTerms: ['Hùng Vương', 'Văn Lang', 'An Dương Vương', 'Âu Lạc', 'Thành Cổ Loa'],
        footnotes: ['* Thành Cổ Loa là một công trình quân sự và kiến trúc phòng thủ kỳ vĩ bậc nhất thời cổ đại Đông Nam Á.']
      }
    ],
    sampleQuestions: [
      {
        id: 'q_thcs_6_1',
        question: 'Dấu tích Người tối cổ ở Việt Nam lần đầu tiên được phát hiện thông qua di cốt răng hóa thạch tại đâu?',
        options: ['Hang Thẩm Khuyên, Thẩm Hai (Lạng Sơn)', 'Núi Đọ (Thanh Hóa)', 'Vịnh Hạ Long (Quảng Ninh)', 'Đồng Đậu (Vĩnh Phúc)'],
        correctAnswer: 0,
        explanation: 'Di cốt răng của Người tối cổ có niên đại khoảng 30 - 40 vạn năm trước được tìm thấy ở hang Thẩm Khuyên và Thẩm Hai thuộc tỉnh Lạng Sơn.'
      },
      {
        id: 'q_thcs_6_2',
        question: 'Kinh đô của Nhà nước Âu Lạc dưới thời An Dương Vương đặt tại đâu?',
        options: ['Bạch Hạc (Phú Thọ)', 'Cổ Loa (Hà Nội)', 'Hoa Lư (Ninh Bình)', 'Mê Linh (Hà Nội)'],
        correctAnswer: 1,
        explanation: 'An Dương Vương đã chuyển kinh đô từ vùng trung du Bạch Hạc về đồng bằng Cổ Loa (nay thuộc huyện Đông Anh, Hà Nội) và xây dựng thành Cổ Loa.'
      }
    ]
  },
  {
    id: 'doc_10',
    title: 'Bộ câu hỏi trắc nghiệm Lịch sử 7: Các triều đại phong kiến Việt Nam',
    description: 'Ngân hàng 60 câu trắc nghiệm Lịch sử 7 chọn lọc bao quát các thời kỳ: Ngô - Đinh - Tiền Lê, thời Lý, thời Trần và cuộc khởi nghĩa Lam Sơn thời Hậu Lê. Kèm đáp án và giải thích chi tiết.',
    type: 'exercise',
    category: 'vietnam',
    grade: '7',
    subject: 'Lịch sử & Địa lí 7',
    difficulty: 'medium',
    authorId: 'u_teacher_1',
    authorName: 'Cô Trần Mai Phương',
    authorRole: 'teacher',
    fileUrl: '/docs/trac-nghiem-lich-su-7-phong-kien.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '2.9 MB',
    pagesCount: 12,
    tags: ['Lịch sử 7', 'THCS', 'Thời Lý - Trần', 'Khởi nghĩa Lam Sơn', 'Trắc nghiệm có đáp án'],
    status: 'published',
    viewCount: 3120,
    downloadCount: 1450,
    likesCount: 420,
    rating: 4.89,
    hasAnswerKey: true,
    questionCount: 60,
    createdAt: '2025-10-05',
    updatedAt: '2025-11-02',
    sampleQuestions: [
      {
        id: 'q_thcs_7_1',
        question: 'Năm 1010, vua Lý Thái Tổ quyết định dời đô từ Hoa Lư về đâu và đổi tên là gì?',
        options: ['Đại La, đổi tên thành Thăng Long', 'Cổ Loa, đổi tên thành Đông Đô', 'Bạch Hạc, đổi tên thành Tây Đô', 'Phú Xuân, đổi tên thành Huế'],
        correctAnswer: 0,
        explanation: 'Tháng 7 năm Canh Tuất (1010), Lý Công Uẩn viết Chiếu dời đô chuyển kinh đô từ Hoa Lư về thành Đại La và đổi tên thành Thăng Long (Rồng bay lên).'
      },
      {
        id: 'q_thcs_7_2',
        question: 'Chiến thắng nào của quân dân nhà Trần đã đập tan hoàn toàn cuộc xâm lược lần thứ ba của quân Nguyên - Mông năm 1288?',
        options: ['Chiến thắng Bạch Đằng', 'Chiến thắng Đông Bộ Đầu', 'Chiến thắng Tây Kết', 'Chiến thắng Chương Dương'],
        correctAnswer: 0,
        explanation: 'Trận thủy chiến trên sông Bạch Đằng tháng 4/1288 do Quốc công Tiết chế Trần Hưng Đạo chỉ huy đã tiêu diệt toàn bộ thủy quân xâm lược Ô Mã Nhi, kết thúc thắng lợi 3 lần kháng chiến chống Nguyên Mông.'
      }
    ]
  },
  {
    id: 'doc_11',
    title: 'Chuyên đề Lịch sử 8: Phong trào Tây Sơn & Cuộc kháng chiến chống Pháp cuối thế kỉ XIX',
    description: 'Tài liệu ôn tập chuyên sâu Lịch sử 8: Phân tích thiên tài quân sự của Quang Trung - Nguyễn Huệ đại phá 29 vạn quân Thanh (1789), cùng phong trào yêu nước chống thực dân Pháp (Cần Vương, Yên Thế).',
    type: 'outline',
    category: 'vietnam',
    grade: '8',
    subject: 'Lịch sử & Địa lí 8',
    difficulty: 'good',
    authorId: 'u_admin_1',
    authorName: 'Tổ Chuyên môn THCS FPT',
    authorRole: 'admin',
    fileUrl: '/docs/chuyen-de-lich-su-8-tay-son-phap.docx',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80',
    fileType: 'docx',
    fileSize: '4.5 MB',
    pagesCount: 22,
    tags: ['Lịch sử 8', 'THCS', 'Quang Trung', 'Phong trào Cần Vương', 'Khởi nghĩa Yên Thế'],
    status: 'published',
    viewCount: 2950,
    downloadCount: 1380,
    likesCount: 460,
    rating: 4.85,
    hasAnswerKey: true,
    questionCount: 45,
    createdAt: '2025-10-12',
    updatedAt: '2025-11-15',
    sampleQuestions: [
      {
        id: 'q_thcs_8_1',
        question: 'Chiến thắng vang dội nào vào dịp Tết Kỷ Dậu (1789) đã quét sạch 29 vạn quân Mãn Thanh xâm lược?',
        options: ['Chiến thắng Ngọc Hồi - Đống Đa', 'Chiến thắng Rạch Gầm - Xoài Mút', 'Chiến thắng Chi Lăng - Xương Giang', 'Chiến thắng Tốt Động - Chúc Động'],
        correctAnswer: 0,
        explanation: 'Đêm mùng 4 rạng sáng mùng 5 Tết Kỷ Dậu (1789), nghĩa quân Tây Sơn dưới sự chỉ huy của Hoàng đế Quang Trung đã thần tốc công phá đồn Ngọc Hồi và Đống Đa, giải phóng Thăng Long.'
      }
    ]
  },
  {
    id: 'doc_12',
    title: 'Cẩm nang ôn thi vào Lớp 10 Lịch sử 9: Việt Nam từ 1918 đến 1945',
    description: 'Hệ thống toàn bộ kiến thức trọng tâm Lịch sử 9 phục vụ thi vào lớp 10 THPT: Hoạt động của Nguyễn Ái Quốc, thành lập Đảng Cộng sản Việt Nam (1930), cao trào 1930 - 1931, 1936 - 1939 và Tổng khởi nghĩa Cách mạng Tháng Tám 1945.',
    type: 'outline',
    category: 'thpt_prep',
    grade: '9',
    subject: 'Lịch sử & Địa lí 9',
    difficulty: 'advanced',
    authorId: 'u_teacher_1',
    authorName: 'Cô Trần Mai Phương',
    authorRole: 'teacher',
    fileUrl: '/docs/cam-nang-on-thi-vao-10-lich-su-9.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '5.6 MB',
    pagesCount: 28,
    tags: ['Thi vào 10', 'Lịch sử 9', 'THCS', 'Nguyễn Ái Quốc', 'Cách mạng Tháng Tám', 'Điểm 9+'],
    status: 'published',
    viewCount: 5420,
    downloadCount: 2680,
    likesCount: 890,
    rating: 4.96,
    hasAnswerKey: true,
    questionCount: 80,
    createdAt: '2025-10-25',
    updatedAt: '2025-12-01',
    pages: [
      {
        pageNumber: 1,
        title: 'Hành trình tìm đường cứu nước của Nguyễn Ái Quốc (1911 - 1920)',
        content: `I. BỐI CẢNH VÀ QUYẾT ĐỊNH XUẤT PHÁT
- Ngày 5/6/1911: Từ bến cảng Nhà Rồng (Sài Gòn), người thanh niên Nguyễn Tất Thành lên con tàu Đô đốc Latouche-Tréville ra đi tìm đường cứu nước.
- Hướng đi: Sang các nước phương Tây (Pháp, Anh, Mỹ) - nơi sản sinh ra khẩu hiệu "Tự do - Bình đẳng - Bác ái" để xem họ làm thế nào rồi trở về giúp đồng bào.

II. BƯỚC NGOẶT QUYẾT ĐỊNH NĂM 1920
- Tháng 7/1920: Người đọc bản "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa" của V.I.Lênin đăng trên báo Nhân đạo (Pháp). Luận cương đã giúp Người tìm ra con đường cứu nước đúng đắn cho dân tộc: Con đường cách mạng vô sản.
- Tháng 12/1920: Tại Đại hội Tua của Đảng Xã hội Pháp, Nguyễn Ái Quốc bỏ phiếu tán thành gia nhập Quốc tế thứ ba (Quốc tế Cộng sản) và tham gia sáng lập Đảng Cộng sản Pháp.
=> Đánh dấu bước chuyển biến quyết định từ một người yêu nước chân chính trở thành chiến sĩ cộng sản.`,
        keyTerms: ['Bến Nhà Rồng', 'Nguyễn Ái Quốc', 'Luận cương Lênin', 'Đại hội Tua', 'Cách mạng vô sản'],
        footnotes: ['* Nguyễn Ái Quốc là người Việt Nam đầu tiên tìm ra con đường cứu nước theo chủ nghĩa Mác - Lênin.']
      }
    ],
    sampleQuestions: [
      {
        id: 'q_thcs_9_1',
        question: 'Sự kiện nào đánh dấu bước ngoặt quyết định trong cuộc đời hoạt động cách mạng của Nguyễn Ái Quốc từ chủ nghĩa yêu nước đến với chủ nghĩa cộng sản?',
        options: [
          'Bỏ phiếu tán thành gia nhập Quốc tế thứ ba và sáng lập Đảng Cộng sản Pháp (12/1920)',
          'Gửi Bản yêu sách của nhân dân An Nam đến Hội nghị Véc-xai (1919)',
          'Rời bến cảng Nhà Rồng ra đi tìm đường cứu nước (1911)',
          'Thành lập Hội Việt Nam Cách mạng Thanh niên tại Quảng Châu (1925)'
        ],
        correctAnswer: 0,
        explanation: 'Tháng 12/1920 tại Đại hội Tua, việc Người bỏ phiếu tán thành Quốc tế III và sáng lập Đảng Cộng sản Pháp đánh dấu bước chuyển biến chất từ người yêu nước thành người cộng sản.'
      },
      {
        id: 'q_thcs_9_2',
        question: 'Hội nghị nào đã quyết định phát động Tổng khởi nghĩa giành chính quyền trong cả nước trước khi quân Đồng minh vào Đông Dương (8/1945)?',
        options: ['Hội nghị toàn quốc của Đảng họp tại Tân Trào (14 - 15/8/1945)', 'Hội nghị Ban Thường vụ Trung ương Đảng (9/3/1945)', 'Đại hội Quốc dân Tân Trào (16/8/1945)', 'Hội nghị Trung ương 8 (5/1941)'],
        correctAnswer: 0,
        explanation: 'Hội nghị toàn quốc của Đảng họp tại Tân Trào (Tuyên Quang) từ ngày 14 đến 15/8/1945 đã thông qua quyết định phát động Tổng khởi nghĩa trong toàn quốc.'
      }
    ]
  },
  {
    id: 'doc_13',
    title: 'Bộ đề thi thử tuyển sinh vào Lớp 10 Chuyên & THPT môn Lịch sử (Có ma trận đề)',
    description: 'Tổng hợp 10 đề thi mẫu bám sát định dạng cấu trúc đề thi tuyển sinh vào lớp 10 của các Sở GD&ĐT và Trường THPT Chuyên FPT. Có thang điểm, bảng đáp án và phân tích chi tiết từng câu hỏi.',
    type: 'exam',
    category: 'thpt_prep',
    grade: '9',
    subject: 'Lịch sử & Địa lí 9',
    difficulty: 'advanced',
    authorId: 'u_admin_1',
    authorName: 'Hội đồng Khảo thí FPT Schools',
    authorRole: 'admin',
    fileUrl: '/docs/de-thi-thu-vao-10-lich-su.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    pagesCount: 36,
    tags: ['Đề thi vào 10', 'Lịch sử 9', 'THCS', 'Đề thi mẫu', 'Có ma trận'],
    status: 'published',
    viewCount: 4180,
    downloadCount: 1950,
    likesCount: 620,
    rating: 4.93,
    hasAnswerKey: true,
    questionCount: 40,
    createdAt: '2025-11-01',
    updatedAt: '2025-11-28',
  },
  {
    id: 'doc_14',
    title: 'Ebook: Các nền văn minh cổ đại Hy Lạp & La Mã – Chiếc nôi văn hóa phương Tây',
    description: 'Sách học tập tham khảo mở rộng dành cho học sinh Lớp 6 và THCS: Khám phá kiến trúc đền Parthenon, Đấu trường La Mã Colosseum, Thế vận hội Olympic cổ đại và nguồn gốc nền dân chủ Aten.',
    type: 'ebook',
    category: 'civilization',
    grade: '6',
    subject: 'Lịch sử & Địa lí 6',
    difficulty: 'basic',
    authorId: 'u_teacher_1',
    authorName: 'Thầy Lê Văn Hùng',
    authorRole: 'teacher',
    fileUrl: '/docs/ebook-hy-lap-la-ma-co-dai.pdf',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop&q=80',
    fileType: 'pdf',
    fileSize: '8.2 MB',
    pagesCount: 52,
    tags: ['Lịch sử 6', 'THCS', 'Hy Lạp La Mã', 'Ebook', 'Văn minh nhân loại'],
    status: 'published',
    viewCount: 2240,
    downloadCount: 890,
    likesCount: 310,
    rating: 4.87,
    hasAnswerKey: false,
    createdAt: '2025-09-28',
    updatedAt: '2025-09-28',
  }
];

export const INITIAL_COLLECTIONS: PersonalCollection[] = [
  {
    id: 'col_1',
    userId: 'u_student_1',
    name: 'Ôn thi tốt nghiệp THPT 2026',
    description: 'Các tài liệu trọng tâm điểm 8+ môn Lịch sử THPT',
    icon: '🎯',
    color: 'from-orange-500 to-amber-500',
    documentIds: ['doc_1', 'doc_2', 'doc_3', 'doc_4'],
    createdAt: '2026-01-10',
  },
  {
    id: 'col_2',
    userId: 'u_student_1',
    name: 'Lịch sử Việt Nam Hiện đại',
    description: 'Tài liệu giai đoạn 1945 - 1975 và Đổi mới',
    icon: '🇻🇳',
    color: 'from-red-500 to-rose-600',
    documentIds: ['doc_2', 'doc_4'],
    createdAt: '2026-01-15',
  },
  {
    id: 'col_3',
    userId: 'u_student_1',
    name: 'Đề thi thử & Bài tập trắc nghiệm',
    description: 'Danh sách đề luyện tốc độ và rèn kỹ năng bẫy đề thi',
    icon: '📝',
    color: 'from-blue-600 to-indigo-700',
    documentIds: ['doc_3', 'doc_7'],
    createdAt: '2026-02-01',
  }
];
