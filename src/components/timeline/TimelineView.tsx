import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { TimelineEvent } from '../../types';
import {
  Clock,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  Users,
  Award,
  ChevronRight,
  FileText,
  X,
} from 'lucide-react';

export const TimelineView: React.FC = () => {
  const {
    timelineEvents,
    documents,
    setActiveDetailDoc,
    setIsAIModalOpen,
    setAiPromptPreset,
  } = useApp();

  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [timelineSearch, setTimelineSearch] = useState<string>('');
  const [activeModalEvent, setActiveModalEvent] = useState<TimelineEvent | null>(null);

  const eras = [
    { id: 'all', name: 'Tất cả các thời kỳ' },
    { id: '1945-1954', name: 'Kháng chiến chống Pháp (1945–1954)' },
    { id: '1954-1975', name: 'Kháng chiến chống Mỹ (1954–1975)' },
    { id: '1975-now', name: 'Thống nhất & Đổi mới (1975–nay)' },
    { id: 'world_modern', name: 'Lịch sử thế giới hiện đại' },
  ];

  const filteredEvents = useMemo(() => {
    return timelineEvents.filter((event) => {
      // Era filter
      if (selectedEra !== 'all' && event.era !== selectedEra) {
        return false;
      }
      // Search filter
      if (timelineSearch.trim()) {
        const q = timelineSearch.toLowerCase();
        const matchTitle = event.title.toLowerCase().includes(q);
        const matchDesc = event.description.toLowerCase().includes(q);
        const matchSignificance = event.significance.toLowerCase().includes(q);
        const matchFigures = event.keyFigures?.some((f) => f.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchSignificance && !matchFigures) {
          return false;
        }
      }
      return true;
    });
  }, [timelineEvents, selectedEra, timelineSearch]);

  const handleAskAIAboutEvent = (event: TimelineEvent) => {
    setAiPromptPreset(
      `Phân tích bối cảnh, nguyên nhân, diễn biến chính và ý nghĩa lịch sử sâu sắc của sự kiện "${event.title}" (${event.year})`
    );
    setIsAIModalOpen(true);
  };

  return (
    <div id="timeline-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Trực quan hóa Dòng lịch sử</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dòng thời gian Sự kiện Lịch sử
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Khám phá các mốc son lịch sử trọng tâm từ năm 1945 đến nay với học liệu và tư liệu liên kết
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            value={timelineSearch}
            onChange={(e) => setTimelineSearch(e.target.value)}
            placeholder="Tìm mốc lịch sử..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Era selector tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => setSelectedEra(era.id)}
            className={`shrink-0 px-4 py-2 rounded-xl font-semibold transition-all ${
              selectedEra === era.id
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {era.name}
          </button>
        ))}
      </div>

      {/* Timeline Vertical Track */}
      <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-amber-400 before:to-slate-300">
        {filteredEvents.map((event, index) => {
          // Find connected documents
          const connectedDocs = documents.filter((d) => event.relatedDocIds.includes(d.id));

          return (
            <div
              key={event.id}
              id={`timeline-node-${event.id}`}
              className="relative group"
            >
              {/* Timeline Pin Indicator */}
              <div className="absolute -left-6 sm:-left-10 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-4 border-orange-500 shadow-md group-hover:scale-125 transition-transform flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
              </div>

              {/* Event Card */}
              <div className="bg-white rounded-2xl border border-slate-200 hover:border-orange-300 p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all space-y-4">
                {/* Year & Date Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm sm:text-base font-black px-3 py-1 rounded-xl bg-orange-500 text-white shadow-xs">
                      {event.year}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleAskAIAboutEvent(event)}
                    className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center space-x-1 border border-purple-200 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Hỏi AI về sự kiện</span>
                  </button>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {event.imageUrl && (
                    <div className="md:col-span-4 rounded-xl overflow-hidden aspect-video sm:aspect-4/3 bg-slate-100 shadow-xs border border-slate-200">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className={`${event.imageUrl ? 'md:col-span-8' : 'md:col-span-12'} space-y-3`}>
                    <h3
                      onClick={() => setActiveModalEvent(event)}
                      className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 cursor-pointer transition-colors"
                    >
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{event.description}</p>

                    {/* Historical Significance Callout */}
                    <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs text-orange-950 flex items-start space-x-2">
                      <Award className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Ý nghĩa lịch sử: </span>
                        <span>{event.significance}</span>
                      </div>
                    </div>

                    {/* Key figures */}
                    {event.keyFigures && event.keyFigures.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 pt-1">
                        <span className="font-medium flex items-center space-x-1 text-slate-700">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>Nhân vật then chốt:</span>
                        </span>
                        {event.keyFigures.map((fig) => (
                          <span key={fig} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            {fig}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Linked Library Documents */}
                {connectedDocs.length > 0 && (
                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                      <span>Học liệu liên quan trong Thư viện:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {connectedDocs.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => setActiveDetailDoc(doc)}
                          className="p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50/80 border border-slate-200/80 cursor-pointer flex items-center justify-between transition-colors group/item"
                        >
                          <div className="flex items-center space-x-2 min-w-0">
                            <FileText className="w-4 h-4 text-orange-500 shrink-0" />
                            <span className="text-xs font-semibold text-slate-800 truncate group-hover/item:text-orange-600">
                              {doc.title}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-orange-600 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Detail Modal (when clicked) */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-xl bg-orange-500 text-white font-black text-sm">
                  Năm {activeModalEvent.year} • {activeModalEvent.date}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  {activeModalEvent.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalEvent(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModalEvent.imageUrl && (
              <img
                src={activeModalEvent.imageUrl}
                alt={activeModalEvent.title}
                className="w-full h-52 object-cover rounded-2xl"
              />
            )}

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{activeModalEvent.description}</p>
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-950">
                <span className="font-bold">Ý nghĩa: </span>
                {activeModalEvent.significance}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  handleAskAIAboutEvent(activeModalEvent);
                  setActiveModalEvent(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hỏi AI chi tiết</span>
              </button>
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
