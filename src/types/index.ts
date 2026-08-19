export type UserRole = 'student' | 'teacher' | 'admin' | 'guest';

export type SchoolLevel = 'all' | 'thcs' | 'thpt';

export type GradeLevel = 'all' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'thcs' | 'thpt';

export type DocumentType = 'exercise' | 'outline' | 'exam' | 'ebook';

export type DocumentCategory = 
  | 'vietnam' 
  | 'world' 
  | 'revolution' 
  | 'wars' 
  | 'international' 
  | 'modern' 
  | 'ancient' 
  | 'medieval' 
  | 'civilization'
  | 'thpt_prep';

export type DifficultyLevel = 'basic' | 'medium' | 'good' | 'advanced';

export type FileFormat = 'pdf' | 'docx' | 'pptx' | 'epub' | 'link';

export type DocumentStatus = 'draft' | 'pending' | 'published' | 'hidden';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  grade: GradeLevel;
  school?: string;
  createdAt: string;
  readCount?: number;
  completedQuizzes?: number;
  streakDays?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface DocumentPage {
  pageNumber: number;
  title: string;
  content: string;
  image?: string;
  keyTerms?: string[];
  footnotes?: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  type: DocumentType;
  category: DocumentCategory;
  grade: GradeLevel;
  subject: string;
  difficulty: DifficultyLevel;
  authorId: string;
  authorName: string;
  authorRole: 'teacher' | 'admin' | 'guest';
  authorAvatar?: string;
  fileUrl: string;
  thumbnailUrl: string;
  fileType: FileFormat;
  fileSize: string;
  pagesCount: number;
  tags: string[];
  status: DocumentStatus;
  viewCount: number;
  downloadCount: number;
  likesCount: number;
  rating: number;
  hasAnswerKey?: boolean;
  questionCount?: number;
  createdAt: string;
  updatedAt: string;
  pages?: DocumentPage[];
  sampleQuestions?: QuizQuestion[];
  tableOfContents?: { title: string; page: number }[];
}

export interface PersonalCollection {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  color?: string;
  documentIds: string[];
  createdAt: string;
}

export interface ReadingHistoryItem {
  id: string;
  userId: string;
  documentId: string;
  progress: number; // 0 - 100%
  currentPage: number;
  totalPages: number;
  lastReadAt: string;
}

export interface BookmarkItem {
  id: string;
  userId: string;
  documentId: string;
  documentTitle: string;
  page: number;
  note: string;
  highlightText?: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  exactDate?: string;
  period: 'pre_1945' | '1945_1954' | '1954_1975' | '1975_1986' | '1986_present' | 'world_history';
  title: string;
  subtitle: string;
  category: 'vietnam' | 'world' | 'culture' | 'diplomacy';
  summary: string;
  detail: string;
  significance: string;
  imageUrl: string;
  relatedDocIds: string[];
  keyFigures: string[];
  quickQuiz?: QuizQuestion;
}

export interface LibraryFilterState {
  searchQuery: string;
  schoolLevel: SchoolLevel;
  grade: GradeLevel;
  type: DocumentType | 'all';
  category: DocumentCategory | 'all';
  difficulty: DifficultyLevel | 'all';
  fileType: FileFormat | 'all';
  hasAnswerKeyOnly: boolean;
  sortBy: 'newest' | 'views' | 'downloads' | 'rating';
}
