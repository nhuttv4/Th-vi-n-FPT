import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  User,
  UserRole,
  DocumentItem,
  PersonalCollection,
  ReadingHistoryItem,
  BookmarkItem,
  TimelineEvent,
  GradeLevel,
  SchoolLevel,
  DocumentType,
  DocumentCategory,
} from '../types';
import { INITIAL_USERS, INITIAL_DOCUMENTS, INITIAL_COLLECTIONS } from '../data/mockData';
import { TIMELINE_EVENTS } from '../data/timelineData';

export type AppView = 
  | 'home' 
  | 'library' 
  | 'timeline' 
  | 'categories' 
  | 'personal' 
  | 'teacher' 
  | 'admin' 
  | 'landing';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  
  // Data
  documents: DocumentItem[];
  collections: PersonalCollection[];
  favorites: string[];
  readingHistory: ReadingHistoryItem[];
  bookmarks: BookmarkItem[];
  timelineEvents: TimelineEvent[];
  
  // Actions
  updateUserProfile: (updated: Partial<User>) => void;
  toggleFavorite: (docId: string) => void;
  isFavorite: (docId: string) => boolean;
  addToHistory: (docId: string, page?: number, totalPages?: number) => void;
  addBookmark: (docId: string, page: number, note: string) => void;
  removeBookmark: (bookmarkId: string) => void;
  createCollection: (name: string, description: string, icon?: string) => void;
  toggleDocInCollection: (collectionId: string, docId: string) => void;
  recordQuizCompleted: (score: number) => void;
  
  // Document Management (Teacher / Admin)
  addDocument: (newDoc: Omit<DocumentItem, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'downloadCount' | 'likesCount' | 'rating'>) => void;
  updateDocumentStatus: (docId: string, status: DocumentItem['status']) => void;
  deleteDocument: (docId: string) => void;
  incrementDownload: (docId: string) => void;
  incrementView: (docId: string) => void;
  
  // Filter presets
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedSchoolLevel: SchoolLevel;
  setSelectedSchoolLevel: (level: SchoolLevel) => void;
  selectedGrade: GradeLevel;
  setSelectedGrade: (g: GradeLevel) => void;
  selectedCategory: DocumentCategory | 'all';
  setSelectedCategory: (c: DocumentCategory | 'all') => void;
  selectedType: DocumentType | 'all';
  setSelectedType: (t: DocumentType | 'all') => void;
  
  // Modals & Active items
  activeDetailDoc: DocumentItem | null;
  setActiveDetailDoc: (doc: DocumentItem | null) => void;
  activeReaderDoc: DocumentItem | null;
  setActiveReaderDoc: (doc: DocumentItem | null, initialPage?: number) => void;
  readerInitialPage: number;
  activeQuizDoc: DocumentItem | null;
  setActiveQuizDoc: (doc: DocumentItem | null) => void;
  activeTimelineEvent: TimelineEvent | null;
  setActiveTimelineEvent: (event: TimelineEvent | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isAIModalOpen: boolean;
  setIsAIModalOpen: (open: boolean) => void;
  aiPromptPreset: string;
  setAiPromptPreset: (prompt: string) => void;
  aiContextDoc: DocumentItem | null;
  setAiContextDoc: (doc: DocumentItem | null) => void;
  
  // Notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // User state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('fpt_history_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[0];
      }
    }
    return INITIAL_USERS[0]; // Default student
  });

  // Current view
  const [currentView, setCurrentView] = useState<AppView>(() => {
    return currentUser ? 'home' : 'landing';
  });

  // Documents
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('fpt_history_docs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DOCUMENTS;
      }
    }
    return INITIAL_DOCUMENTS;
  });

  // Collections
  const [collections, setCollections] = useState<PersonalCollection[]>(() => {
    const saved = localStorage.getItem('fpt_history_collections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_COLLECTIONS;
      }
    }
    return INITIAL_COLLECTIONS;
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('fpt_history_favorites');
    return saved ? JSON.parse(saved) : ['doc_1', 'doc_2', 'doc_3'];
  });

  // Reading history
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(() => {
    const saved = localStorage.getItem('fpt_history_read_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rh_1',
        userId: 'u_student_1',
        documentId: 'doc_1',
        progress: 65,
        currentPage: 2,
        totalPages: 18,
        lastReadAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'rh_2',
        userId: 'u_student_1',
        documentId: 'doc_4',
        progress: 25,
        currentPage: 1,
        totalPages: 240,
        lastReadAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      }
    ];
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    const saved = localStorage.getItem('fpt_history_bookmarks');
    return saved ? JSON.parse(saved) : [
      {
        id: 'bm_1',
        userId: 'u_student_1',
        documentId: 'doc_1',
        documentTitle: 'Đề cương ôn tập Lịch sử 12 – Học kỳ I',
        page: 1,
        note: 'Trọng tâm ôn thi: 3 nội dung chính của Hội nghị Ianta',
        createdAt: '2026-02-10',
      }
    ];
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<SchoolLevel>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');
  const [selectedType, setSelectedType] = useState<DocumentType | 'all'>('all');

  // Modals & States
  const [activeDetailDoc, setActiveDetailDoc] = useState<DocumentItem | null>(null);
  const [activeReaderDoc, setActiveReaderDocState] = useState<DocumentItem | null>(null);
  const [readerInitialPage, setReaderInitialPage] = useState<number>(1);
  const [activeQuizDoc, setActiveQuizDoc] = useState<DocumentItem | null>(null);
  const [activeTimelineEvent, setActiveTimelineEvent] = useState<TimelineEvent | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPromptPreset, setAiPromptPreset] = useState('');
  const [aiContextDoc, setAiContextDoc] = useState<DocumentItem | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fpt_history_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('fpt_history_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('fpt_history_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('fpt_history_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('fpt_history_read_history', JSON.stringify(readingHistory));
  }, [readingHistory]);

  useEffect(() => {
    localStorage.setItem('fpt_history_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateUserProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    const newUser: User = { ...currentUser, ...updated };
    setCurrentUser(newUser);
    showToast('Cập nhật hồ sơ cá nhân thành công! ✨', 'success');
  };

  const recordQuizCompleted = (score: number) => {
    if (!currentUser) return;
    setCurrentUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        completedQuizzes: (prev.completedQuizzes || 0) + 1,
        streakDays: Math.max(prev.streakDays || 1, 1),
      };
    });
  };

  const switchRole = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUser(null);
      setCurrentView('landing');
      showToast('Đã chuyển sang chế độ Khách xem', 'info');
      return;
    }
    const matched = INITIAL_USERS.find((u) => u.role === role) || {
      ...INITIAL_USERS[0],
      role,
      name: role === 'teacher' ? 'Cô Trần Mai Phương' : role === 'admin' ? 'Ban Quản trị Thư viện' : 'Nguyễn Hoàng Nam',
    };
    setCurrentUser(matched);
    if (role === 'teacher') {
      setCurrentView('teacher');
      showToast('Đã chuyển sang quyền Giáo viên Lịch sử', 'success');
    } else if (role === 'admin') {
      setCurrentView('admin');
      showToast('Đã chuyển sang quyền Quản trị viên Thư viện', 'success');
    } else {
      setCurrentView('home');
      showToast(`Xin chào ${matched.name}!`, 'success');
    }
  };

  const toggleFavorite = (docId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setFavorites((prev) => {
      const exists = prev.includes(docId);
      if (exists) {
        showToast('Đã bỏ tài liệu khỏi danh sách Yêu thích', 'info');
        return prev.filter((id) => id !== docId);
      } else {
        showToast('Đã thêm tài liệu vào Yêu thích ❤️', 'success');
        return [...prev, docId];
      }
    });
  };

  const isFavorite = (docId: string) => favorites.includes(docId);

  const setActiveReaderDoc = (doc: DocumentItem | null, initialPage: number = 1) => {
    setActiveReaderDocState(doc);
    setReaderInitialPage(initialPage);
    if (doc && currentUser) {
      addToHistory(doc.id, initialPage, doc.pagesCount);
      incrementView(doc.id);
    }
  };

  const addToHistory = (docId: string, page: number = 1, totalPages: number = 10) => {
    if (!currentUser) return;
    setReadingHistory((prev) => {
      const existing = prev.find((h) => h.documentId === docId && h.userId === currentUser.id);
      const progress = Math.min(100, Math.round((page / totalPages) * 100));
      const newItem: ReadingHistoryItem = {
        id: existing ? existing.id : `rh_${Date.now()}`,
        userId: currentUser.id,
        documentId: docId,
        progress: Math.max(existing?.progress || 0, progress),
        currentPage: page,
        totalPages,
        lastReadAt: new Date().toISOString(),
      };
      const filtered = prev.filter((h) => !(h.documentId === docId && h.userId === currentUser.id));
      return [newItem, ...filtered];
    });
  };

  const addBookmark = (docId: string, page: number, note: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const doc = documents.find((d) => d.id === docId);
    const newBookmark: BookmarkItem = {
      id: `bm_${Date.now()}`,
      userId: currentUser.id,
      documentId: docId,
      documentTitle: doc?.title || 'Tài liệu Lịch sử',
      page,
      note,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookmarks((prev) => [newBookmark, ...prev]);
    showToast(`Đã bookmark trang ${page} vào Tủ sách 📑`, 'success');
  };

  const removeBookmark = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    showToast('Đã xóa bookmark', 'info');
  };

  const createCollection = (name: string, description: string, icon = '📁') => {
    if (!currentUser) return;
    const newCol: PersonalCollection = {
      id: `col_${Date.now()}`,
      userId: currentUser.id,
      name,
      description,
      icon,
      color: 'from-orange-500 to-amber-600',
      documentIds: [],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCollections((prev) => [newCol, ...prev]);
    showToast(`Đã tạo bộ sưu tập "${name}" 📂`, 'success');
  };

  const toggleDocInCollection = (collectionId: string, docId: string) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          const exists = c.documentIds.includes(docId);
          const newDocIds = exists
            ? c.documentIds.filter((id) => id !== docId)
            : [...c.documentIds, docId];
          showToast(
            exists
              ? `Đã xóa tài liệu khỏi bộ sưu tập "${c.name}"`
              : `Đã thêm tài liệu vào bộ sưu tập "${c.name}" 📚`,
            'success'
          );
          return { ...c, documentIds: newDocIds };
        }
        return c;
      })
    );
  };

  const addDocument = (
    newDocData: Omit<DocumentItem, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'downloadCount' | 'likesCount' | 'rating'>
  ) => {
    const newDoc: DocumentItem = {
      ...newDocData,
      id: `doc_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      viewCount: 1,
      downloadCount: 0,
      likesCount: 0,
      rating: 5.0,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast(`Đã đăng tải tài liệu "${newDoc.title}" thành công! 🎉`, 'success');
  };

  const updateDocumentStatus = (docId: string, status: DocumentItem['status']) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status, updatedAt: new Date().toISOString().split('T')[0] } : d))
    );
    showToast(`Đã cập nhật trạng thái tài liệu sang: ${status.toUpperCase()}`, 'info');
  };

  const deleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    showToast('Đã xóa tài liệu khỏi thư viện', 'warning');
  };

  const incrementDownload = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, downloadCount: d.downloadCount + 1 } : d))
    );
    showToast('Tải tài liệu thành công 📥', 'success');
  };

  const incrementView = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, viewCount: d.viewCount + 1 } : d))
    );
  };

  const contextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      switchRole,
      currentView,
      setCurrentView,
      documents,
      collections,
      favorites,
      readingHistory,
      bookmarks,
      timelineEvents: TIMELINE_EVENTS,
      updateUserProfile,
      toggleFavorite,
      isFavorite,
      addToHistory,
      addBookmark,
      removeBookmark,
      createCollection,
      toggleDocInCollection,
      recordQuizCompleted,
      addDocument,
      updateDocumentStatus,
      deleteDocument,
      incrementDownload,
      incrementView,
      searchQuery,
      setSearchQuery,
      selectedSchoolLevel,
      setSelectedSchoolLevel,
      selectedGrade,
      setSelectedGrade,
      selectedCategory,
      setSelectedCategory,
      selectedType,
      setSelectedType,
      activeDetailDoc,
      setActiveDetailDoc,
      activeReaderDoc,
      setActiveReaderDoc,
      readerInitialPage,
      activeQuizDoc,
      setActiveQuizDoc,
      activeTimelineEvent,
      setActiveTimelineEvent,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isProfileModalOpen,
      setIsProfileModalOpen,
      isAIModalOpen,
      setIsAIModalOpen,
      aiPromptPreset,
      setAiPromptPreset,
      aiContextDoc,
      setAiContextDoc,
      toasts,
      showToast,
      removeToast,
    }),
    [
      currentUser,
      currentView,
      documents,
      collections,
      favorites,
      readingHistory,
      bookmarks,
      searchQuery,
      selectedSchoolLevel,
      selectedGrade,
      selectedCategory,
      selectedType,
      activeDetailDoc,
      activeReaderDoc,
      readerInitialPage,
      activeQuizDoc,
      activeTimelineEvent,
      isAuthModalOpen,
      isProfileModalOpen,
      isAIModalOpen,
      aiPromptPreset,
      aiContextDoc,
      toasts,
    ]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
