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
  HistoryPost,
  PostComment,
  HistoryThemeKey,
} from '../types';
import { INITIAL_USERS, INITIAL_DOCUMENTS, INITIAL_COLLECTIONS } from '../data/mockData';
import { TIMELINE_EVENTS } from '../data/timelineData';
import { INITIAL_POSTS } from '../data/newsfeedData';
import { THEME_CONFIGS } from '../data/vietnamHistoryTheme';

export type AppView = 
  | 'home' 
  | 'library' 
  | 'ebooks'
  | 'newsfeed'
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
  currentTheme: HistoryThemeKey;
  setCurrentTheme: (theme: HistoryThemeKey) => void;
  
  // Data
  documents: DocumentItem[];
  collections: PersonalCollection[];
  favorites: string[];
  readingHistory: ReadingHistoryItem[];
  bookmarks: BookmarkItem[];
  timelineEvents: TimelineEvent[];
  posts: HistoryPost[];
  
  // Permissions & Auth helpers
  authReasonMessage: string;
  setAuthReasonMessage: (msg: string) => void;
  requireAuth: (action: () => void, customReason?: string) => boolean;
  generateShareUrl: (type: 'doc' | 'post' | 'timeline', id: string) => string;
  loginWithEmail: (email: string, name?: string, role?: UserRole, grade?: GradeLevel, school?: string) => void;
  logoutUser: () => void;

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

  // Newsfeed Actions (Admin & Users)
  addPost: (newPostData: Partial<HistoryPost>) => void;
  addComment: (postId: string, content: string) => void;
  toggleLikePost: (postId: string) => void;
  togglePinPost: (postId: string) => void;
  deletePost: (postId: string) => void;
  
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
  activePostDetail: HistoryPost | null;
  setActivePostDetail: (post: HistoryPost | null) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isCreatePostModalOpen: boolean;
  setIsCreatePostModalOpen: (open: boolean) => void;
  isAdminUploadModalOpen: boolean;
  setIsAdminUploadModalOpen: (open: boolean) => void;
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
    return INITIAL_USERS[0]; // Default logged-in user
  });

  // Vietnam History Theme state
  const [currentTheme, setCurrentTheme] = useState<HistoryThemeKey>(() => {
    const saved = localStorage.getItem('fpt_history_theme');
    if (saved && (saved === 'hao-khi-dong-a' || saved === 'son-ha-xanh' || saved === 'fpt-heritage')) {
      return saved as HistoryThemeKey;
    }
    return 'hao-khi-dong-a'; // Default Vietnamese History Heritage theme
  });

  useEffect(() => {
    localStorage.setItem('fpt_history_theme', currentTheme);
  }, [currentTheme]);

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

  // Newsfeed Posts
  const [posts, setPosts] = useState<HistoryPost[]>(() => {
    const saved = localStorage.getItem('fpt_history_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_POSTS;
      }
    }
    return INITIAL_POSTS;
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
        userId: 'u_nhuttv4',
        documentId: 'doc_1',
        progress: 65,
        currentPage: 2,
        totalPages: 18,
        lastReadAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'rh_2',
        userId: 'u_nhuttv4',
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
        userId: 'u_nhuttv4',
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
  const [activePostDetail, setActivePostDetail] = useState<HistoryPost | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isAdminUploadModalOpen, setIsAdminUploadModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPromptPreset, setAiPromptPreset] = useState('');
  const [aiContextDoc, setAiContextDoc] = useState<DocumentItem | null>(null);

  // Auth Protection & Pending Action
  const [authReasonMessage, setAuthReasonMessage] = useState<string>('');
  const [pendingAuthCallback, setPendingAuthCallback] = useState<(() => void) | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `t_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper: Require authentication with Email
  const requireAuth = (action: () => void, customReason?: string): boolean => {
    if (currentUser && currentUser.role !== 'guest') {
      action();
      return true;
    }
    const reason = customReason || 'Vui lòng đăng nhập bằng Email để sử dụng tính năng và mở khóa toàn bộ tài liệu.';
    setAuthReasonMessage(reason);
    setPendingAuthCallback(() => action);
    setIsAuthModalOpen(true);
    showToast('🔒 Yêu cầu đăng nhập Email (@fpt.edu.vn hoặc cá nhân)', 'warning');
    return false;
  };

  // Helper: Generate share URL
  const generateShareUrl = (type: 'doc' | 'post' | 'timeline', id: string): string => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?type=${type}&id=${id}&ref=share_email_auth`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast('Đã sao chép liên kết chia sẻ (Người nhận cần đăng nhập Email để mở khóa) 📋', 'success');
    } else {
      showToast(`Liên kết: ${shareUrl}`, 'info');
    }
    return shareUrl;
  };

  // Helper: Login with Email
  const loginWithEmail = (
    email: string,
    name?: string,
    role: UserRole = 'student',
    grade: GradeLevel = '12',
    school?: string
  ) => {
    const trimmedEmail = email.trim();
    const isFptEdu = trimmedEmail.toLowerCase().includes('fpt.edu.vn') || trimmedEmail.toLowerCase().includes('fe.edu.vn');
    const detectedSchool = school || (isFptEdu ? 'THPT FPT Cần Thơ / FPT Education' : 'Trường THPT / THCS');
    const detectedName = name?.trim() || trimmedEmail.split('@')[0].toUpperCase();

    const loggedUser: User = {
      id: `u_${Date.now()}`,
      name: detectedName,
      email: trimmedEmail,
      avatar: isFptEdu
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role,
      grade,
      school: detectedSchool,
      createdAt: new Date().toISOString().split('T')[0],
      readCount: 2,
      completedQuizzes: 1,
      streakDays: 9,
    };

    setCurrentUser(loggedUser);
    localStorage.setItem('fpt_history_user', JSON.stringify(loggedUser));
    setIsAuthModalOpen(false);
    setAuthReasonMessage('');
    showToast(`Đăng nhập thành công với email: ${trimmedEmail} 🎉`, 'success');

    // If pending callback exists, execute it
    if (pendingAuthCallback) {
      setTimeout(() => {
        pendingAuthCallback();
        setPendingAuthCallback(null);
      }, 300);
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('fpt_history_user');
    setCurrentView('landing');
    showToast('Đã đăng xuất tài khoản', 'info');
  };

  // Deep Link Check on Mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const docId = params.get('docId') || (params.get('type') === 'doc' ? params.get('id') : null);
      const postId = params.get('postId') || (params.get('type') === 'post' ? params.get('id') : null);
      const shareParam = params.get('share') || params.get('ref');

      if (docId) {
        const foundDoc = documents.find((d) => d.id === docId);
        if (foundDoc) {
          setActiveDetailDoc(foundDoc);
          if (!currentUser || currentUser.role === 'guest') {
            setAuthReasonMessage(`Bạn đang mở liên kết tài liệu "${foundDoc.title}". Vui lòng đăng nhập bằng Email để đọc toàn bộ và làm bài tập.`);
            setIsAuthModalOpen(true);
            showToast('🔒 Liên kết chia sẻ yêu cầu đăng nhập Email', 'warning');
          } else {
            showToast(`Đã mở tài liệu chia sẻ: ${foundDoc.title}`, 'info');
          }
        }
      } else if (postId) {
        const foundPost = posts.find((p) => p.id === postId);
        if (foundPost) {
          setActivePostDetail(foundPost);
          if (!currentUser || currentUser.role === 'guest') {
            setAuthReasonMessage(`Bạn đang mở bài viết chia sẻ "${foundPost.title}". Vui lòng đăng nhập Email để tham gia thảo luận.`);
            setIsAuthModalOpen(true);
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save documents, collections, favorites, readingHistory, bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('fpt_history_docs', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('fpt_history_posts', JSON.stringify(posts));
  }, [posts]);

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

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('fpt_history_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('fpt_history_user');
    }
  }, [currentUser]);

  // Switch role simulator
  const switchRole = (role: UserRole) => {
    if (role === 'guest') {
      logoutUser();
      return;
    }
    const targetUser = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(targetUser);
    localStorage.setItem('fpt_history_user', JSON.stringify(targetUser));
    if (role === 'teacher') setCurrentView('teacher');
    else if (role === 'admin') setCurrentView('admin');
    else setCurrentView('home');
    showToast(`Đã chuyển sang vai trò ${role.toUpperCase()}: ${targetUser.name}`, 'info');
  };

  const updateUserProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    const newProfile = { ...currentUser, ...updated };
    setCurrentUser(newProfile);
    localStorage.setItem('fpt_history_user', JSON.stringify(newProfile));
    showToast('Đã cập nhật thông tin cá nhân', 'success');
  };

  const toggleFavorite = (docId: string) => {
    requireAuth(() => {
      setFavorites((prev) => {
        if (prev.includes(docId)) {
          showToast('Đã xóa tài liệu khỏi danh sách yêu thích', 'info');
          return prev.filter((id) => id !== docId);
        } else {
          showToast('Đã thêm tài liệu vào danh sách yêu thích ❤️', 'success');
          return [...prev, docId];
        }
      });
    }, 'Vui lòng đăng nhập Email để lưu tài liệu vào danh sách Yêu thích.');
  };

  const isFavorite = (docId: string) => favorites.includes(docId);

  const setActiveReaderDoc = (doc: DocumentItem | null, initialPage: number = 1) => {
    setActiveReaderDocState(doc);
    setReaderInitialPage(initialPage);
    if (doc) {
      addToHistory(doc.id, initialPage, doc.pagesCount);
      incrementView(doc.id);
    }
  };

  const addToHistory = (docId: string, page: number = 1, totalPages: number = 10) => {
    if (!currentUser) return;
    const progress = Math.min(100, Math.round((page / totalPages) * 100));
    setReadingHistory((prev) => {
      const existing = prev.filter((h) => h.documentId !== docId);
      const newHistoryItem: ReadingHistoryItem = {
        id: `rh_${Date.now()}`,
        userId: currentUser.id,
        documentId: docId,
        progress,
        currentPage: page,
        totalPages,
        lastReadAt: new Date().toISOString(),
      };
      return [newHistoryItem, ...existing];
    });
  };

  const addBookmark = (docId: string, page: number, note: string) => {
    requireAuth(() => {
      const doc = documents.find((d) => d.id === docId);
      const newBm: BookmarkItem = {
        id: `bm_${Date.now()}`,
        userId: currentUser?.id || 'u_guest',
        documentId: docId,
        documentTitle: doc ? doc.title : 'Tài liệu Lịch sử',
        page,
        note,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setBookmarks((prev) => [newBm, ...prev]);
      showToast('Đã lưu đánh dấu và ghi chú bài học 📌', 'success');
    }, 'Vui lòng đăng nhập Email để lưu ghi chú và bookmark tài liệu.');
  };

  const removeBookmark = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId));
    showToast('Đã xóa đánh dấu', 'info');
  };

  const createCollection = (name: string, description: string, icon: string = 'folder') => {
    requireAuth(() => {
      const newCol: PersonalCollection = {
        id: `col_${Date.now()}`,
        userId: currentUser?.id || 'u_guest',
        name,
        description,
        icon,
        documentIds: [],
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCollections((prev) => [...prev, newCol]);
      showToast(`Đã tạo bộ sưu tập "${name}" 📁`, 'success');
    }, 'Vui lòng đăng nhập Email để tạo tủ sách cá nhân.');
  };

  const toggleDocInCollection = (collectionId: string, docId: string) => {
    requireAuth(() => {
      setCollections((prev) =>
        prev.map((c) => {
          if (c.id === collectionId) {
            const hasDoc = c.documentIds.includes(docId);
            const newDocIds = hasDoc
              ? c.documentIds.filter((id) => id !== docId)
              : [...c.documentIds, docId];
            showToast(
              hasDoc ? `Đã xóa tài liệu khỏi bộ sưu tập` : `Đã thêm tài liệu vào bộ sưu tập`,
              'info'
            );
            return { ...c, documentIds: newDocIds };
          }
          return c;
        })
      );
    }, 'Vui lòng đăng nhập Email để quản lý bộ sưu tập cá nhân.');
  };

  const recordQuizCompleted = (score: number) => {
    if (currentUser) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              completedQuizzes: (prev.completedQuizzes || 0) + 1,
            }
          : null
      );
    }
  };

  const addDocument = (
    newDoc: Omit<DocumentItem, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'downloadCount' | 'likesCount' | 'rating'>
  ) => {
    const created: DocumentItem = {
      ...newDoc,
      id: `doc_${Date.now()}`,
      viewCount: 1,
      downloadCount: 0,
      likesCount: 0,
      rating: 5.0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setDocuments((prev) => [created, ...prev]);
    showToast('Tài liệu đã được tải lên và lưu vào cơ sở dữ liệu 🎉', 'success');
  };

  const updateDocumentStatus = (docId: string, status: DocumentItem['status']) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status, updatedAt: new Date().toISOString().split('T')[0] } : d))
    );
  };

  const deleteDocument = (docId: string) => {
    if (currentUser?.role !== 'admin' && currentUser?.role !== 'teacher') {
      showToast('Bạn không có quyền xóa học liệu này', 'error');
      return;
    }
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    showToast('Đã xóa tài liệu khỏi thư viện', 'warning');
  };

  const incrementDownload = (docId: string) => {
    requireAuth(() => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? { ...d, downloadCount: d.downloadCount + 1 } : d))
      );
      showToast('Đang chuẩn bị file tải xuống... 📥', 'success');
    }, 'Vui lòng đăng nhập Email (@fpt.edu.vn hoặc cá nhân) để tải tài liệu PDF/DOCX.');
  };

  const incrementView = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, viewCount: d.viewCount + 1 } : d))
    );
  };

  const addPost = (newPostData: Partial<HistoryPost>) => {
    requireAuth(() => {
      const newPost: HistoryPost = {
        id: `post_${Date.now()}`,
        title: newPostData.title || 'Thông báo mới',
        content: newPostData.content || '',
        category: newPostData.category || 'discussion',
        authorId: currentUser?.id || 'u_guest',
        authorName: currentUser?.name || 'Thành viên FPT',
        authorRole: currentUser?.role || 'student',
        authorAvatar: currentUser?.avatar,
        coverImage: newPostData.coverImage,
        tags: newPostData.tags || ['Lịch sử FPT'],
        grade: newPostData.grade || 'all',
        likesCount: 0,
        commentsCount: 0,
        viewsCount: 1,
        isPinned: false,
        attachedDocIds: newPostData.attachedDocIds || [],
        createdAt: new Date().toISOString(),
        comments: [],
      };
      setPosts((prev) => [newPost, ...prev]);
      showToast('Đã đăng bài viết thành công lên Bảng tin 🎉', 'success');
    }, 'Vui lòng đăng nhập bằng Email để đăng bài viết mới lên Bảng tin.');
  };

  const addComment = (postId: string, content: string) => {
    requireAuth(() => {
      if (!content.trim()) return;
      const newComment: PostComment = {
        id: `cmt_${Date.now()}`,
        postId,
        authorId: currentUser?.id || 'u_guest',
        authorName: currentUser?.name || 'Thành viên FPT',
        authorRole: currentUser?.role || 'student',
        authorAvatar: currentUser?.avatar,
        content: content.trim(),
        likesCount: 0,
        createdAt: new Date().toISOString(),
      };

      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            const updatedComments = [...p.comments, newComment];
            const updatedPost = {
              ...p,
              comments: updatedComments,
              commentsCount: updatedComments.length,
            };
            if (activePostDetail?.id === postId) {
              setActivePostDetail(updatedPost);
            }
            return updatedPost;
          }
          return p;
        })
      );
      showToast('Đã gửi phản hồi thảo luận 💬', 'success');
    }, 'Vui lòng đăng nhập Email (@fpt.edu.vn hoặc cá nhân) để tham gia bình luận thảo luận.');
  };

  const toggleLikePost = (postId: string) => {
    requireAuth(() => {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            const updatedPost = {
              ...p,
              likesCount: p.likesCount + 1,
            };
            if (activePostDetail?.id === postId) {
              setActivePostDetail(updatedPost);
            }
            return updatedPost;
          }
          return p;
        })
      );
    }, 'Vui lòng đăng nhập Email để thả tim bài viết.');
  };

  const togglePinPost = (postId: string) => {
    if (currentUser?.role !== 'admin') {
      showToast('Chỉ Quản trị viên mới có quyền ghim bài viết', 'warning');
      return;
    }
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updated = { ...p, isPinned: !p.isPinned };
          if (activePostDetail?.id === postId) {
            setActivePostDetail(updated);
          }
          return updated;
        }
        return p;
      })
    );
    showToast('Đã cập nhật trạng thái ghim bài viết 📌', 'info');
  };

  const deletePost = (postId: string) => {
    if (currentUser?.role !== 'admin' && currentUser?.role !== 'teacher') {
      showToast('Bạn không có quyền xóa bài viết này', 'error');
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (activePostDetail?.id === postId) {
      setActivePostDetail(null);
    }
    showToast('Đã xóa bài viết khỏi Bảng tin', 'warning');
  };

  const contextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      switchRole,
      currentView,
      setCurrentView,
      currentTheme,
      setCurrentTheme,
      documents,
      posts,
      collections,
      favorites,
      readingHistory,
      bookmarks,
      timelineEvents: TIMELINE_EVENTS,
      authReasonMessage,
      setAuthReasonMessage,
      requireAuth,
      generateShareUrl,
      loginWithEmail,
      logoutUser,
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
      addPost,
      addComment,
      toggleLikePost,
      togglePinPost,
      deletePost,
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
      activePostDetail,
      setActivePostDetail,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isProfileModalOpen,
      setIsProfileModalOpen,
      isCreatePostModalOpen,
      setIsCreatePostModalOpen,
      isAdminUploadModalOpen,
      setIsAdminUploadModalOpen,
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
      currentTheme,
      documents,
      posts,
      collections,
      favorites,
      readingHistory,
      bookmarks,
      authReasonMessage,
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
      activePostDetail,
      isAuthModalOpen,
      isProfileModalOpen,
      isCreatePostModalOpen,
      isAdminUploadModalOpen,
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
