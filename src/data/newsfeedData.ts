import { HistoryPost } from '../types';

export const INITIAL_POSTS: HistoryPost[] = [
  {
    id: 'post_1',
    title: 'Thông báo: Phát động Cuộc thi "Đại sứ Văn hóa Lịch sử FPT 2026" dành cho THCS & THPT',
    content: `Kính gửi quý Thầy Cô và các bạn học sinh FPT Education,

Ban Quản trị Thư viện số FPT History Library trân trọng thông báo về Cuộc thi **"Đại sứ Văn hóa Lịch sử FPT 2026"**. 

🎯 **Mục đích cuộc thi:**
- Khơi dậy niềm tự hào dân tộc, tình yêu quê hương đất nước qua lăng kính lịch sử và chuyển đổi số.
- Khuyến khích học sinh sáng tạo các sản phẩm học liệu: infographic, video ngắn tái hiện nhân vật lịch sử, podcast lịch sử và sơ đồ tư duy liên môn.

📅 **Thời gian diễn ra:**
- Nhận bài dự thi: Từ 20/08/2026 đến hết 20/09/2026.
- Vòng bình chọn trực tuyến trên FPT History Library: 22/09 - 30/09/2026.
- Công bố và trao giải tại FPT Edu TechDay 2026.

🎁 **Cơ cấu giải thưởng:**
- 01 Giải Nhất: 10.000.000 VNĐ + Kỷ niệm chương & Học bổng FPT.
- 02 Giải Nhì: 5.000.000 VNĐ.
- 05 Giải Ba & 10 Giải Khuyến khích.

Các bạn học sinh có thể tham khảo thêm tài liệu đính kèm bên dưới để nắm rõ thể lệ chi tiết và tiêu chí chấm điểm nhé!`,
    category: 'announcement',
    grade: 'all',
    authorId: 'u_admin',
    authorName: 'Quản trị viên Thư viện FPT',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80',
    attachedDocIds: ['doc_1', 'doc_3'],
    tags: ['Thông báo FPT', 'Cuộc thi Lịch sử', 'Sự kiện 2026', 'Học sinh FPT'],
    isPinned: true,
    likesCount: 148,
    commentsCount: 18,
    viewsCount: 1250,
    createdAt: '2026-08-15T08:30:00Z',
    comments: [
      {
        id: 'c_1_1',
        postId: 'post_1',
        authorId: 'u_nhuttv4',
        authorName: 'Nhựt TV',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Cuộc thi tuyệt vời quá Thầy Cô ơi! Nhóm em ở THPT FPT Cần Thơ đang lên ý tưởng làm video 3D tái hiện chiến dịch Điện Biên Phủ trên không.',
        createdAt: '2026-08-15T09:15:00Z',
        likesCount: 12,
      },
      {
        id: 'c_1_2',
        postId: 'post_1',
        authorId: 'u_teacher1',
        authorName: 'ThS. Nguyễn Văn Hùng',
        authorRole: 'teacher',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        content: 'Thầy ủng hộ các em học sinh FPT School tham gia mạnh mẽ. Các em có thể liên hệ các thầy cô tổ Sử để được cố vấn kiến thức lịch sử chính xác nhé.',
        createdAt: '2026-08-15T10:00:00Z',
        likesCount: 8,
      },
      {
        id: 'c_1_3',
        postId: 'post_1',
        authorId: 'u_st2',
        authorName: 'Trần Bảo Ngọc',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        content: 'Khối THCS lớp 8 tụi em làm bài vẽ tranh minh họa lịch sử và sơ đồ tư duy có được gửi dự thi không ạ?',
        createdAt: '2026-08-15T14:20:00Z',
        likesCount: 5,
      },
    ],
  },
  {
    id: 'post_2',
    title: 'Góc học thuật: Phân tích nghệ thuật quân sự "Lấy ít địch nhiều, lấy yếu thắng mạnh" trong 3 lần kháng chiến chống Mông - Nguyên',
    content: `Trong tiến trình lịch sử dựng nước và giữ nước của dân tộc Việt Nam, ba lần kháng chiến chống quân xâm lược Mông - Nguyên (1258, 1285, 1288) dưới thời nhà Trần là những trang sử vàng chói lọi bậc nhất.

⚔️ **1. Nghệ thuật tạo thời cơ và chớp thời cơ:**
Nhà Trần chủ động thực hiện chiến lược "Vườn không nhà trống", triệt phá nguồn lương thảo nuôi quân của giặc khiến kỵ binh thiện chiến thảo nguyên rơi vào thế bị động, suy giảm sĩ khí.

🛡️ **2. Khối đại đoàn kết toàn dân tộc:**
Hội nghị Diên Hồng với tiếng hô "ĐÁNH!" vang dội của các bậc phụ lão và Hội nghị Bình Than thể hiện ý chí đồng lòng vua tôi, cả nước một lòng đánh giặc.

🌊 **3. Trận Bạch Đằng năm 1288 - Đỉnh cao mưu lược:**
Quốc công Tiết chế Trần Hưng Đạo đã vận dụng tài tình quy luật thủy triều, bày trận địa cọc gỗ chôn ngầm dưới lòng sông, tiêu diệt hoàn toàn thủy quân của Ô Mã Nhi và Phàn Tiếp.

👉 **Câu hỏi thảo luận dành cho các bạn học sinh:**
Theo các bạn, yếu tố quyết định nhất làm nên chiến thắng của quân dân Đại Việt trước đội quân hùng mạnh bậc nhất thế giới thời bấy giờ là gì? Cùng bình luận quan điểm bên dưới nhé!`,
    category: 'academic',
    grade: '7',
    authorId: 'u_admin',
    authorName: 'Quản trị viên Thư viện FPT',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    attachedDocIds: ['doc_4', 'doc_1'],
    tags: ['Nhà Trần', 'Kháng chiến Mông Nguyên', 'Nghệ thuật quân sự', 'Sử 7', 'Sử 11'],
    isPinned: false,
    likesCount: 92,
    commentsCount: 14,
    viewsCount: 890,
    createdAt: '2026-08-16T11:00:00Z',
    comments: [
      {
        id: 'c_2_1',
        postId: 'post_2',
        authorId: 'u_nhuttv4',
        authorName: 'Nhựt TV',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Theo em, yếu tố lòng dân và tinh thần "Vua tôi đồng lòng, anh em hòa mục, cả nước góp sức" (Lời Trần Quốc Tuấn) chính là cội nguồn cốt lõi nhất. Vũ khí tốt đến đâu nhưng không có lòng dân thì không thể duy trì trường kỳ kháng chiến.',
        createdAt: '2026-08-16T13:45:00Z',
        likesCount: 15,
      },
      {
        id: 'c_2_2',
        postId: 'post_2',
        authorId: 'u_st3',
        authorName: 'Lê Hoàng Nam',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        content: 'Thêm vào đó là việc khai thác tối đa địa hình sông nước bùn lầy, khí hậu nhiệt đới gió mùa của nước ta để khắc chế sở trường kỵ binh thảo nguyên.',
        createdAt: '2026-08-16T15:10:00Z',
        likesCount: 7,
      },
    ],
  },
  {
    id: 'post_3',
    title: 'Bí kíp 9+ Lịch sử THPT: Mẹo nhớ nhanh mốc thời gian và so sánh các chiến dịch quan trọng (1946 - 1975)',
    content: `Chào các sĩ tử 2k8 và 2k9 FPT Education!

Kỳ thi tốt nghiệp THPT và ĐGNL đang đến gần, để tránh "học vẹt" hàng trăm mốc thời gian dễ nhầm lẫn, Thầy chia sẻ phương pháp học Lịch sử theo trục sơ đồ mạng nhện và bảng so sánh ma trận.

📌 **1. Công thức 4 bước làm chủ bài thi trắc nghiệm:**
- **Bước 1 (Từ khóa then chốt):** Xác định ngay bối cảnh thế giới/trong nước tạo nên bước ngoặt.
- **Bước 2 (Ý nghĩa quyết định):** Ví dụ Chiến dịch Biên giới 1950 giành thế chủ động trên chiến trường chính Bắc Bộ; Điện Biên Phủ 1954 đánh bại kế hoạch Nava; Tây Nguyên 1975 chuyển từ tiến công chiến lược sang tổng tiến công.
- **Bước 3 (So sánh đối sánh):** So sánh điểm giống và khác giữa các kế hoạch quân sự của Pháp (Rơve, Đờ Lát, Nava) hoặc chiến lược chiến tranh của Mỹ (Đơn phương, Đặc biệt, Cục bộ, Việt Nam hóa).

📑 **Tài liệu đính kèm:** Các em tải ngay bộ đề cương ôn tập tổng hợp 12 bên dưới để luyện đề nhé!`,
    category: 'exam_tips',
    grade: '12',
    authorId: 'u_admin',
    authorName: 'Quản trị viên Thư viện FPT',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    attachedDocIds: ['doc_1', 'doc_2'],
    tags: ['Ôn thi THPT', 'Lịch sử 12', 'Mẹo thi 9+', 'Chiến dịch', 'GDPT 2018'],
    isPinned: false,
    likesCount: 175,
    commentsCount: 22,
    viewsCount: 1620,
    createdAt: '2026-08-17T09:00:00Z',
    comments: [
      {
        id: 'c_3_1',
        postId: 'post_3',
        authorId: 'u_nhuttv4',
        authorName: 'Nhựt TV',
        authorRole: 'student',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Bài viết cực kỳ hữu ích ạ! Nhờ cách phân chia này mà em không còn bị lú lẫn giữa Chiến lược Chiến tranh đặc biệt và Chiến tranh cục bộ nữa.',
        createdAt: '2026-08-17T10:15:00Z',
        likesCount: 9,
      },
    ],
  },
  {
    id: 'post_4',
    title: 'Khám phá văn minh Lịch sử: Sự kỳ vĩ của Trống đồng Đông Sơn và nền văn minh Văn Lang - Âu Lạc',
    content: `Các bạn học sinh thân mến,

Nền văn hóa Đông Sơn (thế kỷ VII TCN - thế kỷ I SCN) là đỉnh cao của thời kỳ đồ đồng tại Việt Nam. 

🪘 **Hoa văn trên trống đồng Đông Sơn:**
Hình tượng ngôi sao nhiều cánh ở tâm tượng trưng cho thần Mặt Trời, xung quanh là hình chim Lạc bay, người giã gạo, chèo thuyền chiến và lễ hội múa hát. Đây là cuốn bách khoa toàn thư bằng đồng phản ánh sinh động đời sống tâm linh, kỹ thuật luyện kim điêu luyện của cư dân Việt cổ.

Bạn ấn tượng nhất với chi tiết hoa văn nào trên Trống đồng Đông Sơn? Cùng chia sẻ với cộng đồng nhé!`,
    category: 'history_fact',
    grade: '6',
    authorId: 'u_admin',
    authorName: 'Quản trị viên Thư viện FPT',
    authorRole: 'admin',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80',
    attachedDocIds: ['doc_3'],
    tags: ['Văn minh Đông Sơn', 'Sử 6', 'Văn Lang Âu Lạc', 'Khảo cổ học'],
    isPinned: false,
    likesCount: 64,
    commentsCount: 9,
    viewsCount: 640,
    createdAt: '2026-08-17T15:30:00Z',
    comments: [],
  },
];
