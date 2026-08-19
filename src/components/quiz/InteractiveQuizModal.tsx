import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveQuizModal: React.FC = () => {
  const { activeQuizDoc, setActiveQuizDoc, setActiveReaderDoc, showToast } = useApp();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  if (!activeQuizDoc || !activeQuizDoc.sampleQuestions || activeQuizDoc.sampleQuestions.length === 0) {
    return null;
  }

  const questions = activeQuizDoc.sampleQuestions;
  const currentQuestion = questions[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((q) => q + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      const finalScore = score + (selectedOption === currentQuestion.correctAnswerIndex ? 1 : 0);
      if (finalScore >= questions.length * 0.7) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        id="interactive-quiz-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
              Luyện tập trắc nghiệm phân hóa
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-100 line-clamp-1">{activeQuizDoc.title}</h2>
          </div>

          <button
            onClick={() => setActiveQuizDoc(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-orange-500 h-1.5 transition-all duration-300"
            style={{
              width: `${((currentQIndex + (isQuizCompleted ? 1 : 0)) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">
          {!isQuizCompleted ? (
            <>
              {/* Question Index Badge */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>
                  Câu hỏi <span className="text-orange-600 font-bold">{currentQIndex + 1}</span> / {questions.length}
                </span>
                <span>Điểm hiện tại: {score}</span>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.question}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  let optStyle = 'border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 text-slate-800 bg-white';

                  if (selectedOption === idx) {
                    optStyle = 'border-orange-500 bg-orange-50 text-orange-950 ring-2 ring-orange-500/20';
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQuestion.correctAnswerIndex) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 font-bold';
                    } else if (selectedOption === idx) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center space-x-3.5 ${optStyle}`}
                    >
                      <span className="w-7 h-7 rounded-xl font-bold flex items-center justify-center shrink-0 text-xs bg-slate-100 text-slate-700">
                        {letter}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswerSubmitted && idx === currentQuestion.correctAnswerIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOption === idx && idx !== currentQuestion.correctAnswerIndex && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (when submitted) */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed space-y-1 animate-in fade-in">
                  <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>Giải thích chi tiết & Mẹo ghi nhớ:</span>
                  </div>
                  <p className="text-slate-600">{currentQuestion.explanation}</p>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed Results */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-md">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Hoàn thành bài luyện tập!</h3>
                <p className="text-sm text-slate-500">
                  Bạn đã trả lời đúng <span className="text-orange-600 font-bold text-lg">{score}</span> / {questions.length} câu hỏi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-950 font-medium max-w-md mx-auto">
                {score === questions.length
                  ? 'Xuất sắc! Bạn đã nắm vững toàn bộ kiến thức trọng tâm của bài học.'
                  : score >= questions.length / 2
                  ? 'Kết quả rất tốt! Hãy xem lại các câu giải thích để củng cố thêm điểm số nhé.'
                  : 'Hãy mở lại tài liệu để đọc kỹ các nội dung lý thuyết then chốt nhé!'}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {!isQuizCompleted ? (
            <>
              <button
                onClick={() => {
                  setActiveReaderDoc(activeQuizDoc);
                  setActiveQuizDoc(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center space-x-1 font-medium"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Xem lại tài liệu lý thuyết</span>
              </button>

              <div>
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center space-x-1.5"
                  >
                    <span>{currentQIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center space-x-3">
              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại đề này</span>
              </button>
              <button
                onClick={() => setActiveQuizDoc(null)}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md"
              >
                Hoàn tất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
