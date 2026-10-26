export type SchoolGrade = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type StudentStatus = 'active' | 'attention' | 'transferred' | 'inactive';

export type LessonStatus = 'draft' | 'planned' | 'completed';

export type TaskStatus = 'draft' | 'assigned' | 'in_progress' | 'completed';

export type SubmissionStatus = 'pending' | 'submitted' | 'graded' | 'late';

export type AssessmentType = 'oral' | 'quiz_15m' | 'test_45m' | 'midterm' | 'final' | 'project';

export interface ClassRoom {
  id: string;
  code: string;
  name: string;
  grade: SchoolGrade;
  schoolYear: string;
  subject: string;
  teacher: string;
  room: string;
  notes: string;
  createdAt: string;
}

export interface Student {
  id: string;
  code: string;
  fullName: string;
  classId: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ';
  parentContact: string;
  status: StudentStatus;
  needsSupport: boolean;
  notes: string;
  createdAt: string;
}

export interface Lesson {
  id: string;
  code: string;
  title: string;
  subject: string;
  grade: SchoolGrade;
  classIds: string[];
  topic: string;
  objectives: string;
  contentSummary: string;
  date: string; // YYYY-MM-DD
  resources: string;
  status: LessonStatus;
  updatedAt: string;
}

export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  lessonId?: string;
  classIds: string[];
  assignedDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  maxScore: number;
  status: TaskStatus;
  notes: string;
  createdAt: string;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  studentId: string;
  classId: string;
  status: SubmissionStatus;
  submissionDate?: string;
  score?: number;
  feedback?: string;
  updatedAt: string;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  classId: string;
  lessonId?: string;
  taskId?: string;
  assessmentName: string;
  type: AssessmentType;
  date: string; // YYYY-MM-DD
  score: number; // 0 to maxScore
  maxScore: number; // Default 10
  weight: number; // Hệ số: 1, 2, 3
  comment: string;
  createdAt: string;
}

export interface StudentFeedback {
  id: string;
  studentId: string;
  classId: string;
  date: string; // YYYY-MM-DD
  content: string;
  strengths: string;
  improvements: string;
  recommendations: string;
  relatedLessonOrTask?: string;
  teacher: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'grade' | 'task' | 'student' | 'lesson' | 'feedback' | 'class' | 'system';
  details?: string;
}

export interface AppSettings {
  teacherName: string;
  schoolName: string;
  currentSchoolYear: string;
  attentionScoreThreshold: number; // e.g. 6.5
  attentionCompletionThreshold: number; // e.g. 75 (%)
}

export interface AppData {
  classes: ClassRoom[];
  students: Student[];
  lessons: Lesson[];
  tasks: Task[];
  taskSubmissions: TaskSubmission[];
  grades: GradeRecord[];
  feedbacks: StudentFeedback[];
  activities: ActivityLog[];
  settings: AppSettings;
}

export type ActiveTab = 
  | 'dashboard'
  | 'classes'
  | 'students'
  | 'lessons'
  | 'tasks'
  | 'grades'
  | 'progress'
  | 'feedback'
  | 'reports';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
