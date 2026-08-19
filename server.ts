import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy init Gemini AI
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "FPT History Library API", timestamp: new Date().toISOString() });
});

// AI Chat / Q&A endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { question, contextDocTitle, contextDocSummary, chatHistory } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing question" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // High quality fallback answer if API key is not configured
      const fallbackResponses: Record<string, string> = {
        "cách mạng tháng tám": "Cách mạng tháng Tám năm 1945 thắng lợi do nhiều nguyên nhân:\n\n1. **Nguyên nhân khách quan**: Phát xít Nhật đầu hàng Đồng minh vô điều kiện (8/1945), tạo thời cơ 'ngàn năm có một'.\n2. **Nguyên nhân chủ quan (quyết định)**:\n- Sự lãnh đạo sáng suốt của Đảng Cộng sản Đông Dương và Chủ tịch Hồ Chí Minh với đường lối đúng đắn.\n- Khối đại đoàn kết toàn dân tộc được tập hợp vững chắc trong Mặt trận Việt Minh.\n- Quá trình chuẩn bị chu đáo suốt 15 năm (qua các cao trào 1930-1931, 1936-1939 và trực tiếp là 1939-1945).\n- Tinh thần yêu nước nồng nàn và ý chí quật cường của nhân dân Việt Nam.",
        "điện biên phủ": "Chiến dịch Điện Biên Phủ (1954) mang ý nghĩa lịch sử vô cùng to lớn:\n- Đập tan hoàn toàn kế hoạch Nava của thực dân Pháp và can thiệp Mỹ.\n- Giáng đòn quyết định buộc Pháp phải ký Hiệp định Giơ-ne-vơ (21/7/1954), công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của 3 nước Đông Dương.\n- 'Lừng lẫy năm châu, chấn động địa cầu', cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên thế giới.",
      };

      const lowerQ = question.toLowerCase();
      let matchedKey = Object.keys(fallbackResponses).find((k) => lowerQ.includes(k));
      let answer = matchedKey
        ? fallbackResponses[matchedKey]
        : `Dựa trên tài liệu Lịch sử THPT:\n\nĐối với câu hỏi "${question}": Trong chương trình Lịch sử THPT, vấn đề này gắn liền với các quy luật vận động lịch sử, bối cảnh trong nước và quốc tế tương ứng. Học sinh cần nắm vững các mốc thời gian cốt lõi, nguyên nhân, diễn biến chính và bài học kinh nghiệm được tổng kết trong sách giáo khoa Lịch sử.`;

      return res.json({
        answer: answer,
        source: "FPT History Library Knowledge Base",
        isSimulated: true,
      });
    }

    const systemPrompt = `Bạn là "History AI" - Trợ lý học tập môn Lịch sử thông minh của thư viện số FPT History Library (FPT Education), hỗ trợ cả học sinh THCS (Lớp 6, 7, 8, 9) và THPT (Lớp 10, 11, 12).
Phong cách của bạn:
- Thân thiện, chuẩn mực sư phạm, chính xác theo chương trình SGK Lịch sử & Địa lí THCS và Lịch sử THPT Việt Nam (Chương trình GDPT mới 2018).
- Giải thích logic, rõ ràng, gạch đầu dòng khoa học, làm nổi bật nguyên nhân, diễn biến, ý nghĩa lịch sử và bài học rút ra phù hợp với cấp học của học sinh.
- Nếu có ngữ cảnh tài liệu đính kèm: "${contextDocTitle || "Tài liệu chung"}", hãy ưu tiên liên hệ nội dung trong tài liệu đó.
- Luôn kết thúc bằng một gợi ý ôn tập hoặc câu hỏi tư duy mở ngắn gọn cho học sinh.
- Luôn có lưu ý ở cuối: "⚠️ AI có thể đưa ra thông tin chưa chính xác. Hãy kiểm tra lại với SGK và giáo viên Lịch sử của bạn."`;

    let userPrompt = `Câu hỏi của học sinh: ${question}\n`;
    if (contextDocTitle) {
      userPrompt += `Tài liệu đang xem: "${contextDocTitle}"\nTóm tắt tài liệu: ${contextDocSummary || "Tài liệu học tập THPT"}\n`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      answer: response.text || "Xin lỗi, hiện tại chưa thể tạo câu trả lời. Vui lòng thử lại sau.",
      source: contextDocTitle ? `Tài liệu: ${contextDocTitle}` : "Kho dữ liệu FPT History Library",
      isSimulated: false,
    });
  } catch (error: any) {
    console.error("AI chat error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// AI Quiz Generator Endpoint
app.post("/api/ai/quiz", async (req, res) => {
  try {
    const { topic, grade = "12", count = 5 } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback pre-crafted questions
      return res.json({
        topic: topic || "Lịch sử Việt Nam",
        questions: [
          {
            id: "q1",
            question: `Sự kiện nào được xem là bước ngoặt quyết định của phong trào cách mạng Việt Nam trong giai đoạn ${topic || "1930-1945"}?`,
            options: [
              "Thành lập Đảng Cộng sản Việt Nam (1930)",
              "Chiến dịch Biên giới Thu Đông (1950)",
              "Hội nghị Ianta (1945)",
              "Hiệp định Paris (1973)",
            ],
            correctAnswer: 0,
            explanation: "Sự ra đời của Đảng Cộng sản Việt Nam ngày 3/2/1930 là bước ngoặt vĩ đại, chấm dứt thời kỳ khủng hoảng về đường lối và giai cấp lãnh đạo.",
          },
          {
            id: "q2",
            question: "Mặt trận Việt Minh được thành lập vào thời gian nào?",
            options: ["Tháng 5/1941", "Tháng 8/1945", "Tháng 12/1946", "Tháng 2/1930"],
            correctAnswer: 0,
            explanation: "Mặt trận Việt Minh (Việt Nam Độc lập Đồng minh) được thành lập ngày 19/5/1941 tại Hội nghị Trung ương 8 tại Pác Bó, Cao Bằng.",
          },
          {
            id: "q3",
            question: "Hình thức đấu tranh chủ yếu trong Cách mạng tháng Tám 1945 là gì?",
            options: [
              "Kết hợp đấu tranh chính trị với đấu tranh vũ trang, trong đó chính trị đóng vai trò quyết định",
              "Chiến tranh du kích cục bộ",
              "Đấu tranh ngoại giao thuần túy",
              "Đấu tranh kinh tế bãi công",
            ],
            correctAnswer: 0,
            explanation: "Cách mạng tháng Tám là cuộc tổng khởi nghĩa kết hợp lực lượng chính trị quần chúng rộng lớn với lực lượng vũ trang làm nòng cốt xung kích.",
          },
        ],
        isSimulated: true,
      });
    }

    const prompt = `Hãy tạo ${count} câu hỏi trắc nghiệm Lịch sử chuẩn cấu trúc đề thi THPT môn Lịch sử lớp ${grade} về chủ đề: "${topic || "Lịch sử Việt Nam hiện đại"}".
Định dạng bắt buộc: Trả về JSON theo đúng cấu trúc sau:
[
  {
    "id": "q1",
    "question": "Nội dung câu hỏi trắc nghiệm rõ ràng, mang tính phân hóa",
    "options": ["Lựa chọn A", "Lựa chọn B", "Lựa chọn C", "Lựa chọn D"],
    "correctAnswer": 0,
    "explanation": "Lời giải thích chi tiết, chính xác vì sao đáp án này đúng và liên hệ SGK Lịch sử"
  }
]
Chú ý: correctAnswer là chỉ số mảng từ 0 đến 3.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    let questions = [];
    try {
      questions = JSON.parse(response.text || "[]");
    } catch {
      questions = [];
    }

    res.json({
      topic,
      questions,
      isSimulated: false,
    });
  } catch (error: any) {
    console.error("AI quiz generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate quiz" });
  }
});

// AI Summarizer Endpoint
app.post("/api/ai/summarize", async (req, res) => {
  try {
    const { title, content } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        summary: `Tài liệu "${title || "Chuyên đề Lịch sử"}" hệ thống hóa toàn bộ kiến thức trọng tâm gồm bối cảnh lịch sử, diễn tiến các sự kiện mốc chốt, nguyên nhân thắng lợi và bài học lịch sử sâu sắc cho học sinh THPT trong các kỳ thi học kỳ và THPT Quốc gia.`,
        keyPoints: [
          "Nắm chắc các mốc thời gian cốt lõi và không gian diễn ra sự kiện.",
          "Phân tích mối quan hệ nhân - quả giữa sự kiện trong nước và quốc tế.",
          "Rèn luyện kỹ năng nhận diện từ khóa và giải đề trắc nghiệm nhanh.",
        ],
        isSimulated: true,
      });
    }

    const prompt = `Bạn là trợ lý học tập Lịch sử THPT FPT. Hãy tóm tắt ngắn gọn, súc tích tài liệu lịch sử sau:
Tiêu đề: ${title}
Nội dung: ${content?.slice(0, 3000) || "Tài liệu lịch sử THPT"}

Hãy trả về JSON với cấu trúc:
{
  "summary": "Đoạn tóm tắt tổng quan 2-3 câu ngắn gọn",
  "keyPoints": ["Ý trọng tâm 1", "Ý trọng tâm 2", "Ý trọng tâm 3", "Ý trọng tâm 4"],
  "historicalSignificance": "Ý nghĩa lịch sử quan trọng nhất"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isSimulated: false });
  } catch (error: any) {
    console.error("AI summarize error:", error);
    res.status(500).json({ error: error.message || "Failed to summarize" });
  }
});

// Vite Middleware for development & static handling for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FPT History Library Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
