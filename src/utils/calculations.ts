import { GradeRecord, Task, TaskSubmission, Student, AppSettings } from '../types';

/**
 * Format date string (YYYY-MM-DD) to Vietnamese standard (DD/MM/YYYY)
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '—';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('vi-VN');
  } catch {
    return dateString || '—';
  }
}

/**
 * Check if a task is overdue based on current date.
 * Rule: Completed tasks are NEVER overdue.
 */
export function isTaskOverdue(task: Task, referenceDate = new Date()): boolean {
  if (task.status === 'completed') return false;
  if (!task.dueDate) return false;
  
  const due = new Date(task.dueDate + 'T23:59:59');
  return due < referenceDate;
}

/**
 * Calculate weighted average score from valid grade records.
 * Rule: Only non-null, valid numeric scores are computed.
 * Unentered scores are NEVER treated as 0.
 */
export function calculateAverageGrade(grades: GradeRecord[]): number | null {
  if (!grades || grades.length === 0) return null;

  let totalWeightedScore = 0;
  let totalWeights = 0;

  for (const g of grades) {
    if (typeof g.score === 'number' && !isNaN(g.score) && g.maxScore > 0) {
      // Normalize score to standard base 10 scale
      const normalizedScore = (g.score / g.maxScore) * 10;
      const weight = g.weight && g.weight > 0 ? g.weight : 1;
      
      totalWeightedScore += normalizedScore * weight;
      totalWeights += weight;
    }
  }

  if (totalWeights === 0) return null;
  const avg = totalWeightedScore / totalWeights;
  return Math.round(avg * 10) / 10;
}

/**
 * Categorize student performance based on Vietnamese educational grading standards
 */
export function getGradeRank(avg: number | null): {
  rank: 'Giỏi' | 'Khá' | 'Trung bình' | 'Cần hỗ trợ' | 'Chưa có điểm';
  color: string;
  badgeClass: string;
} {
  if (avg === null) {
    return { rank: 'Chưa có điểm', color: '#94a3b8', badgeClass: 'text-slate-500 bg-slate-100' };
  }
  if (avg >= 8.0) {
    return { rank: 'Giỏi', color: '#16a34a', badgeClass: 'text-emerald-700 bg-emerald-50' };
  }
  if (avg >= 6.5) {
    return { rank: 'Khá', color: '#0284c7', badgeClass: 'text-sky-700 bg-sky-50' };
  }
  if (avg >= 5.0) {
    return { rank: 'Trung bình', color: '#d97706', badgeClass: 'text-amber-700 bg-amber-50' };
  }
  return { rank: 'Cần hỗ trợ', color: '#dc2626', badgeClass: 'text-rose-700 bg-rose-50' };
}

/**
 * Calculate task completion metrics for a student or a class
 */
export function calculateTaskCompletion(
  submissions: TaskSubmission[],
  tasks: Task[]
): {
  totalAssigned: number;
  completed: number;
  pending: number;
  late: number;
  completionRate: number;
} {
  const totalAssigned = submissions.length;
  if (totalAssigned === 0) {
    return { totalAssigned: 0, completed: 0, pending: 0, late: 0, completionRate: 0 };
  }

  const completed = submissions.filter(s => s.status === 'submitted' || s.status === 'graded').length;
  const late = submissions.filter(s => s.status === 'late').length;
  const pending = submissions.filter(s => s.status === 'pending').length;
  
  const completionRate = Math.round(((completed + late) / totalAssigned) * 100);

  return {
    totalAssigned,
    completed: completed + late,
    pending,
    late,
    completionRate,
  };
}

/**
 * Determine if a student needs attention based on configurable teacher criteria
 */
export function studentNeedsAttention(
  student: Student,
  grades: GradeRecord[],
  submissions: TaskSubmission[],
  tasks: Task[],
  settings: AppSettings
): {
  needsAttention: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Manual teacher flag
  if (student.needsSupport || student.status === 'attention') {
    reasons.push('Giáo viên đánh dấu cần hỗ trợ đặc biệt');
  }

  // Score threshold
  const studentGrades = grades.filter(g => g.studentId === student.id);
  const avg = calculateAverageGrade(studentGrades);
  if (avg !== null && avg < settings.attentionScoreThreshold) {
    reasons.push(`Điểm trung bình (${avg}) dưới ngưỡng quy định (${settings.attentionScoreThreshold})`);
  }

  // Task completion threshold
  const studentSubmissions = submissions.filter(s => s.studentId === student.id);
  if (studentSubmissions.length > 0) {
    const { completionRate } = calculateTaskCompletion(studentSubmissions, tasks);
    if (completionRate < settings.attentionCompletionThreshold) {
      reasons.push(`Tỷ lệ nộp bài (${completionRate}%) dưới ngưỡng quy định (${settings.attentionCompletionThreshold}%)`);
    }
  }

  // Overdue check
  const now = new Date();
  const overdueSubmissions = studentSubmissions.filter(s => {
    if (s.status === 'submitted' || s.status === 'graded') return false;
    const task = tasks.find(t => t.id === s.taskId);
    return task && isTaskOverdue(task, now);
  });

  if (overdueSubmissions.length >= 2) {
    reasons.push(`Có ${overdueSubmissions.length} nhiệm vụ đã quá hạn chưa nộp`);
  }

  return {
    needsAttention: reasons.length > 0,
    reasons,
  };
}

/**
 * Export data array to CSV with UTF-8 BOM for proper Vietnamese character rendering in Microsoft Excel
 */
export function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]): void {
  const processCell = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const stringVal = String(val).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const headerLine = headers.map(processCell).join(',');
  const rowLines = rows.map(r => r.map(processCell).join(','));
  const csvContent = '\uFEFF' + [headerLine, ...rowLines].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
