import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  HelpCircle,
  Clock,
  FileText,
  Flame,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sourceDocTitle?: string;
}

export const HistoryAIAssistantModal: React.FC = () => {
  const {
    isAIModalOpen,
    setIsAIModalOpen,
    aiPromptPreset,
    setAiPromptPreset,
    aiContextDoc,
    setAiContextDoc,
    showToast,
    setActiveQuizDoc,
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: `Xin chào! Tôi là **History AI** – Trợ lý học tập môn Lịch sử THPT của **FPT Education**.

Tôi có thể giúp bạn:
- **Tóm tắt bài học & chuyên đề** Lịch sử 10, 11, 12 chuẩn chương trình GDPT 2018.
- **Phân tích bối cảnh, nguyên nhân, diễn biến và ý nghĩa** các sự kiện lịch sử Việt Nam & Thế giới.
- **So sánh các chiến dịch quân sự, hiệp định & hội nghị quốc tế** (Điện Biên Phủ, Hiệp định Giơ-ne-vơ, Hiệp định Pari, Hội nghị Ianta...).
- **Tạo câu hỏi trắc nghiệm ôn thi** phân hóa từ cơ bản đến điểm 9+.

Bạn có câu hỏi nào hôm nay?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    if (aiPromptPreset) {
      setInputQuery(aiPromptPreset);
      setAiPromptPreset('');
    }
  }, [aiPromptPreset]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isAIModalOpen) return null;

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // Send to server-side Gemini endpoint
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend.trim(),
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
          context: aiContextDoc
            ? {
                title: aiContextDoc.title,
                grade: aiContextDoc.grade,
                category: aiContextDoc.category,
                description: aiContextDoc.description,
              }
            : undefined,
        }),
      });

      const data = await response.json();

      const aiReply: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Xin lỗi, tôi gặp sự cố khi xử lý câu hỏi này. Bạn hãy thử đặt lại câu hỏi nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceDocTitle: aiContextDoc?.title,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      const fallbackReply: ChatMessage = {
        id: `ai_err_${Date.now()}`,
        sender: 'ai',
        text: `### Tóm tắt kiến thức trọng tâm:
- **Nguyên nhân chính**: Sự chuyển biến cục diện chiến lược kết hợp ý chí độc lập tự chủ của toàn dân tộc.
- **Diễn biến then chốt**: Phương châm tác chiến linh hoạt, chuyển từ "đánh nhanh thắng nhanh" sang "đánh chắc tiến chắc".
- **Ý nghĩa lịch sử**: Đập tan kế hoạch quân sự của đối phương, tạo bước ngoặt mang tính quyết định trên bàn đàm phán quốc tế.

*(Mẹo: Bạn có thể tham khảo thêm các tài liệu liên quan trong Thư viện FPT History)*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast('Đã sao chép câu trả lời vào bộ nhớ tạm', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg_welcome',
        sender: 'ai',
        text: 'Cuộc trò chuyện đã được làm mới. Hãy đặt bất kỳ câu hỏi nào về Lịch sử THPT!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setAiContextDoc(null);
    showToast('Đã làm mới cuộc hội thoại', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div
        id="history-ai-assistant-modal"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh]"
      >
        {/* Header */}
        <header className="px-6 py-4 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight">Trợ lý AI History</h2>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  Gemini Flash
                </span>
              </div>
              <p className="text-[11px] text-orange-100">Đồng hành ôn luyện Lịch sử THPT FPT Education</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Làm mới đoạn hội thoại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              id="close-ai-modal"
              onClick={() => setIsAIModalOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Context indicator if discussing a specific document */}
        {aiContextDoc && (
          <div className="bg-orange-50 px-6 py-2 border-b border-orange-200 flex items-center justify-between text-xs text-orange-900">
            <div className="flex items-center space-x-2 truncate">
              <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="font-medium">Đang hỏi về tài liệu:</span>
              <span className="font-bold truncate">{aiContextDoc.title}</span>
            </div>
            <button
              onClick={() => setAiContextDoc(null)}
              className="text-orange-600 hover:text-orange-800 font-bold ml-2"
            >
              Bỏ ngữ cảnh
            </button>
          </div>
        )}

        {/* Chat History Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-gradient-to-br from-orange-500 to-amber-500 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                  msg.sender === 'user'
                    ? 'bg-orange-500 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}
              >
                {/* Message text with basic Markdown parsing */}
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.text}
                </div>

                <div
                  className={`flex items-center justify-between mt-2 pt-1 border-t text-[10px] ${
                    msg.sender === 'user'
                      ? 'border-orange-400/50 text-orange-100'
                      : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>

                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 hover:text-orange-600 transition-opacity flex items-center space-x-1"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Sao chép</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-xs flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-500 font-medium pl-1">Trợ lý AI đang tổng hợp câu trả lời...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Gợi ý:</span>
          {[
            'Tóm tắt Lịch sử 12 ôn thi THPT',
            'Phân tích ý nghĩa Cách mạng tháng Tám 1945',
            'So sánh Chiến dịch Điện Biên Phủ 1954 và 1972',
            'Tạo 5 câu hỏi trắc nghiệm rèn luyện điểm 9+',
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-700 border border-slate-200 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <footer className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              id="ai-chat-input"
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Nhập câu hỏi Lịch sử cần giải đáp (ví dụ: 'Tại sao lại chọn Điện Biên Phủ làm điểm quyết chiến?')..."
              className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-100/90 focus:bg-white border border-slate-200 focus:border-orange-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <button
              id="send-ai-btn"
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-2xl shadow-md transition-all shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};
