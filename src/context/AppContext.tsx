import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppData,
  ClassRoom,
  Student,
  Lesson,
  Task,
  TaskSubmission,
  GradeRecord,
  StudentFeedback,
  ActivityLog,
  AppSettings,
  ActiveTab,
  ToastMessage,
} from '../types';
import { initialAppData, initialSettings } from '../data/initialData';

const STORAGE_KEY = 'ngoi_sao_class_manager_data_v2';

interface AppContextType {
  data: AppData;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedClassId: string; // 'all' or class id
  setSelectedClassId: (id: string) => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Class methods
  addClass: (cls: Omit<ClassRoom, 'id' | 'createdAt'>) => ClassRoom;
  updateClass: (id: string, updates: Partial<ClassRoom>) => void;
  deleteClass: (id: string, cascade?: boolean) => { success: boolean; message: string };

  // Student methods
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => Student;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => { success: boolean; message: string };
  toggleStudentSupport: (id: string) => void;
  batchAddStudents: (
    newStudents: Omit<Student, 'id' | 'createdAt'>[],
    updateExisting?: boolean
  ) => { addedCount: number; updatedCount: number };
  batchDeleteStudents: (ids: string[]) => { deletedCount: number };

  // Lesson methods
  addLesson: (lesson: Omit<Lesson, 'id' | 'updatedAt'>) => Lesson;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  duplicateLesson: (id: string) => void;
  clearAllLessons: () => void;
  resetLessonsToCurriculum: () => void;

  // Task methods
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  duplicateTask: (id: string) => void;

  // Task submission methods
  updateSubmission: (id: string, updates: Partial<TaskSubmission>) => void;
  saveStudentSubmission: (taskId: string, studentId: string, classId: string, status: TaskSubmission['status'], score?: number, feedback?: string) => void;

  // Grade methods
  addGrade: (grade: Omit<GradeRecord, 'id' | 'createdAt'>) => GradeRecord;
  updateGrade: (id: string, updates: Partial<GradeRecord>) => void;
  deleteGrade: (id: string) => void;
  batchSaveGrades: (newGrades: GradeRecord[]) => void;

  // Feedback methods
  addFeedback: (fb: Omit<StudentFeedback, 'id' | 'createdAt'>) => StudentFeedback;
  updateFeedback: (id: string, updates: Partial<StudentFeedback>) => void;
  deleteFeedback: (id: string) => void;

  // Settings & Storage methods
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetToDemoData: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => { success: boolean; error?: string };
  clearAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.classes && parsed.students && parsed.lessons && parsed.tasks) {
          if (parsed.settings) {
            if (
              parsed.settings.currentSchoolYear === '2036 - 2027' ||
              parsed.settings.currentSchoolYear === '2025 - 2026' ||
              !parsed.settings.currentSchoolYear
            ) {
              parsed.settings.currentSchoolYear = '2026 - 2027';
            }
            if (Array.isArray(parsed.classes)) {
              parsed.classes = parsed.classes.map((c: any) =>
                c.schoolYear === '2036 - 2027' || c.schoolYear === '2025 - 2026'
                  ? { ...c, schoolYear: '2026 - 2027' }
                  : c
              );
            }
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Lỗi khi tải dữ liệu từ localStorage:', e);
    }
    return initialAppData;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Lỗi khi lưu dữ liệu vào localStorage:', e);
      addToast('error', 'Lỗi lưu trữ', 'Bộ nhớ trình duyệt đầy hoặc không thể lưu dữ liệu.');
    }
  }, [data]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logActivity = (action: string, category: ActivityLog['category'], details?: string) => {
    const newLog: ActivityLog = {
      id: 'act_' + Date.now(),
      timestamp: new Date().toISOString(),
      action,
      category,
      details,
    };
    return newLog;
  };

  // --- CLASS ACTIONS ---
  const addClass = (cls: Omit<ClassRoom, 'id' | 'createdAt'>): ClassRoom => {
    const newClass: ClassRoom = {
      ...cls,
      id: 'cls_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    const log = logActivity('Tạo lớp học mới', 'class', `Đã thêm lớp ${newClass.name} (${newClass.code})`);
    setData((prev) => ({
      ...prev,
      classes: [...prev.classes, newClass],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Thành công', `Đã tạo lớp ${newClass.code} thành công.`);
    return newClass;
  };

  const updateClass = (id: string, updates: Partial<ClassRoom>) => {
    setData((prev) => {
      const cls = prev.classes.find((c) => c.id === id);
      const name = cls ? cls.name : id;
      const log = logActivity('Cập nhật thông tin lớp', 'class', `Cập nhật lớp ${name}`);
      return {
        ...prev,
        classes: prev.classes.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        activities: [log, ...prev.activities],
      };
    });
    addToast('success', 'Đã lưu', 'Thông tin lớp học đã được cập nhật.');
  };

  const deleteClass = (id: string, cascade: boolean = false): { success: boolean; message: string } => {
    const cls = data.classes.find((c) => c.id === id);
    if (!cls) return { success: false, message: 'Không tìm thấy lớp học' };

    const studentCount = data.students.filter((s) => s.classId === id).length;
    const gradeCount = data.grades.filter((g) => g.classId === id).length;

    if (!cascade && (studentCount > 0 || gradeCount > 0)) {
      return {
        success: false,
        message: `Không thể xóa lớp ${cls.code} vì đang có ${studentCount} học sinh và ${gradeCount} bản ghi điểm. Vui lòng chọn xác nhận xóa kèm dữ liệu hoặc chuyển học sinh trước.`,
      };
    }

    const log = logActivity(
      'Xóa lớp học',
      'class',
      cascade && (studentCount > 0 || gradeCount > 0)
        ? `Đã xóa lớp ${cls.name} (${cls.code}) kèm ${studentCount} học sinh và ${gradeCount} bản ghi điểm liên quan`
        : `Đã xóa lớp ${cls.name} (${cls.code})`
    );

    const classStudentIds = new Set(data.students.filter((s) => s.classId === id).map((s) => s.id));

    setData((prev) => ({
      ...prev,
      classes: prev.classes.filter((c) => c.id !== id),
      students: cascade ? prev.students.filter((s) => s.classId !== id) : prev.students,
      grades: cascade ? prev.grades.filter((g) => g.classId !== id && !classStudentIds.has(g.studentId)) : prev.grades,
      feedbacks: cascade ? prev.feedbacks.filter((f) => f.classId !== id && !classStudentIds.has(f.studentId)) : prev.feedbacks,
      taskSubmissions: cascade ? prev.taskSubmissions.filter((ts) => ts.classId !== id && !classStudentIds.has(ts.studentId)) : prev.taskSubmissions,
      tasks: prev.tasks.map((t) => ({
        ...t,
        classIds: t.classIds.filter((cid) => cid !== id),
      })),
      lessons: prev.lessons.map((l) => ({
        ...l,
        classIds: l.classIds.filter((cid) => cid !== id),
      })),
      activities: [log, ...prev.activities],
    }));

    if (selectedClassId === id) {
      setSelectedClassId('all');
    }

    addToast(
      'info',
      'Đã xóa lớp học',
      cascade && studentCount > 0
        ? `Đã xóa lớp ${cls.code} cùng ${studentCount} học sinh và dữ liệu liên quan.`
        : `Đã xóa lớp ${cls.code} thành công.`
    );
    return { success: true, message: 'Đã xóa thành công' };
  };

  // --- STUDENT ACTIONS ---
  const addStudent = (student: Omit<Student, 'id' | 'createdAt'>): Student => {
    // Unique ID generation
    const newStudent: Student = {
      ...student,
      id: 'stu_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    const cls = data.classes.find((c) => c.id === student.classId);
    const log = logActivity('Thêm học sinh mới', 'student', `Thêm em ${newStudent.fullName} (${newStudent.code}) vào lớp ${cls?.code || ''}`);
    
    // Also generate initial pending submissions for any existing active tasks of that class
    const classTasks = data.tasks.filter((t) => t.classIds.includes(student.classId));
    const newSubmissions: TaskSubmission[] = classTasks.map((t) => ({
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      taskId: t.id,
      studentId: newStudent.id,
      classId: student.classId,
      status: 'pending',
      updatedAt: new Date().toISOString().split('T')[0],
    }));

    setData((prev) => ({
      ...prev,
      students: [...prev.students, newStudent],
      taskSubmissions: [...prev.taskSubmissions, ...newSubmissions],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Thành công', `Đã thêm học sinh ${newStudent.fullName}.`);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setData((prev) => {
      const student = prev.students.find((s) => s.id === id);
      const log = logActivity('Cập nhật hồ sơ học sinh', 'student', `Cập nhật thông tin em ${student?.fullName || id}`);
      return {
        ...prev,
        students: prev.students.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        activities: [log, ...prev.activities],
      };
    });
    addToast('success', 'Đã lưu', 'Hồ sơ học sinh đã được cập nhật.');
  };

  const deleteStudent = (id: string): { success: boolean; message: string } => {
    const student = data.students.find((s) => s.id === id);
    if (!student) return { success: false, message: 'Không tìm thấy học sinh' };

    const log = logActivity('Xóa học sinh', 'student', `Đã xóa học sinh ${student.fullName} (${student.code})`);
    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => s.id !== id),
      grades: prev.grades.filter((g) => g.studentId !== id),
      taskSubmissions: prev.taskSubmissions.filter((ts) => ts.studentId !== id),
      feedbacks: prev.feedbacks.filter((f) => f.studentId !== id),
      activities: [log, ...prev.activities],
    }));
    addToast('info', 'Đã xóa', `Đã xóa học sinh ${student.fullName}.`);
    return { success: true, message: 'Đã xóa thành công' };
  };

  const batchDeleteStudents = (ids: string[]): { deletedCount: number } => {
    if (!ids || ids.length === 0) return { deletedCount: 0 };
    const idSet = new Set(ids);
    const count = ids.length;

    const log = logActivity(
      'Xóa hàng loạt học sinh',
      'student',
      `Đã xóa hàng loạt ${count} học sinh và toàn bộ dữ liệu điểm số, bài nộp liên quan.`
    );

    setData((prev) => ({
      ...prev,
      students: prev.students.filter((s) => !idSet.has(s.id)),
      grades: prev.grades.filter((g) => !idSet.has(g.studentId)),
      taskSubmissions: prev.taskSubmissions.filter((ts) => !idSet.has(ts.studentId)),
      feedbacks: prev.feedbacks.filter((f) => !idSet.has(f.studentId)),
      activities: [log, ...prev.activities],
    }));

    addToast('info', 'Đã xóa hàng loạt', `Đã xóa thành công ${count} học sinh khỏi danh sách.`);
    return { deletedCount: count };
  };

  const toggleStudentSupport = (id: string) => {
    setData((prev) => {
      const student = prev.students.find((s) => s.id === id);
      const newState = !student?.needsSupport;
      const log = logActivity(
        newState ? 'Đánh dấu cần hỗ trợ' : 'Bỏ đánh dấu hỗ trợ',
        'student',
        `${newState ? 'Đã thêm cờ hỗ trợ' : 'Đã bỏ cờ hỗ trợ'} cho em ${student?.fullName}`
      );
      return {
        ...prev,
        students: prev.students.map((s) =>
          s.id === id ? { ...s, needsSupport: newState, status: newState ? 'attention' : 'active' } : s
        ),
        activities: [log, ...prev.activities],
      };
    });
    addToast('info', 'Cập nhật', 'Đã thay đổi trạng thái theo dõi của học sinh.');
  };

  const batchAddStudents = (
    newStudents: Omit<Student, 'id' | 'createdAt'>[],
    updateExisting = false
  ): { addedCount: number; updatedCount: number } => {
    let addedCount = 0;
    let updatedCount = 0;

    setData((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const existingMap = new Map<string, Student>();
      prev.students.forEach((s) => existingMap.set(s.code.toLowerCase().trim(), s));

      const updatedStudentsList = [...prev.students];
      const newSubmissionsList = [...prev.taskSubmissions];

      newStudents.forEach((raw) => {
        const codeKey = raw.code.toLowerCase().trim();
        const existing = existingMap.get(codeKey);

        if (existing) {
          if (updateExisting) {
            const idx = updatedStudentsList.findIndex((s) => s.id === existing.id);
            if (idx !== -1) {
              updatedStudentsList[idx] = {
                ...updatedStudentsList[idx],
                ...raw,
              };
              updatedCount++;
            }
          }
        } else {
          const studentId = 'stu_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
          const studentToAdd: Student = {
            ...raw,
            id: studentId,
            createdAt: today,
          };
          updatedStudentsList.push(studentToAdd);
          existingMap.set(codeKey, studentToAdd);
          addedCount++;

          // Initialize task submissions for any active tasks in assigned class
          const classTasks = prev.tasks.filter((t) => t.classIds.includes(studentToAdd.classId));
          classTasks.forEach((t) => {
            newSubmissionsList.push({
              id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
              taskId: t.id,
              studentId: studentToAdd.id,
              classId: studentToAdd.classId,
              status: 'pending',
              updatedAt: today,
            });
          });
        }
      });

      const log = logActivity(
        'Nhập danh sách từ Excel',
        'student',
        `Đã nhập thành công ${addedCount} học sinh mới${updatedCount > 0 ? ` và cập nhật ${updatedCount} học sinh` : ''}.`
      );

      return {
        ...prev,
        students: updatedStudentsList,
        taskSubmissions: newSubmissionsList,
        activities: [log, ...prev.activities],
      };
    });

    addToast(
      'success',
      'Nhập Excel thành công',
      `Đã thêm ${addedCount} học sinh mới${updatedCount > 0 ? ` và cập nhật ${updatedCount} học sinh` : ''} vào hệ thống.`
    );

    return { addedCount, updatedCount };
  };

  // --- LESSON ACTIONS ---
  const addLesson = (lesson: Omit<Lesson, 'id' | 'updatedAt'>): Lesson => {
    const newLesson: Lesson = {
      ...lesson,
      id: 'les_' + Date.now(),
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const log = logActivity('Tạo bài học mới', 'lesson', `Thêm bài học: ${newLesson.title} (${newLesson.code})`);
    setData((prev) => ({
      ...prev,
      lessons: [newLesson, ...prev.lessons],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Thành công', `Đã tạo bài học "${newLesson.title}".`);
    return newLesson;
  };

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setData((prev) => {
      const lesson = prev.lessons.find((l) => l.id === id);
      const log = logActivity('Chỉnh sửa bài học', 'lesson', `Cập nhật bài học ${lesson?.title || id}`);
      return {
        ...prev,
        lessons: prev.lessons.map((l) => (l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : l)),
        activities: [log, ...prev.activities],
      };
    });
    addToast('success', 'Đã lưu', 'Nội dung bài học đã được cập nhật.');
  };

  const deleteLesson = (id: string) => {
    const lesson = data.lessons.find((l) => l.id === id);
    const log = logActivity('Xóa bài học', 'lesson', `Đã xóa bài học: ${lesson?.title || id}`);
    setData((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((l) => l.id !== id),
      activities: [log, ...prev.activities],
    }));
    addToast('info', 'Đã xóa', 'Bài học đã được xóa.');
  };

  const duplicateLesson = (id: string) => {
    const lesson = data.lessons.find((l) => l.id === id);
    if (!lesson) return;
    const duplicated: Lesson = {
      ...lesson,
      id: 'les_' + Date.now(),
      code: lesson.code + '-CP',
      title: lesson.title + ' (Bản sao)',
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    const log = logActivity('Sao chép bài học', 'lesson', `Đã tạo bản sao bài học ${lesson.title}`);
    setData((prev) => ({
      ...prev,
      lessons: [duplicated, ...prev.lessons],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Đã sao chép', `Đã tạo bản sao "${duplicated.title}".`);
  };

  const clearAllLessons = () => {
    const log = logActivity('Xóa dữ liệu bài học', 'lesson', 'Đã xóa toàn bộ dữ liệu bài học trong mục Bài học.');
    setData((prev) => ({
      ...prev,
      lessons: [],
      activities: [log, ...prev.activities],
    }));
    addToast('info', 'Đã xóa toàn bộ bài học', 'Đã làm sạch dữ liệu trong mục Bài học.');
  };

  const resetLessonsToCurriculum = () => {
    const log = logActivity('Nạp chương trình SGK Tin học', 'lesson', `Đã nạp lại ${initialAppData.lessons.length} bài học Tin học Kết nối tri thức (Lớp 6, 7, 8, 9, 10).`);
    setData((prev) => ({
      ...prev,
      lessons: initialAppData.lessons,
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Đã nạp bài học SGK', `Đã cập nhật ${initialAppData.lessons.length} bài học Tin học Kết nối tri thức.`);
  };

  // --- TASK ACTIONS ---
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...task,
      id: 'tsk_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Automatically create submission slots for all students in assigned classes
    const targetStudents = data.students.filter((s) => task.classIds.includes(s.classId));
    const newSubmissions: TaskSubmission[] = targetStudents.map((s) => ({
      id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      taskId: newTask.id,
      studentId: s.id,
      classId: s.classId,
      status: 'pending',
      updatedAt: new Date().toISOString().split('T')[0],
    }));

    const log = logActivity('Giao nhiệm vụ mới', 'task', `Giao "${newTask.title}" cho ${targetStudents.length} học sinh`);
    setData((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
      taskSubmissions: [...prev.taskSubmissions, ...newSubmissions],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Thành công', `Đã tạo nhiệm vụ "${newTask.title}".`);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setData((prev) => {
      const task = prev.tasks.find((t) => t.id === id);
      const log = logActivity('Cập nhật nhiệm vụ', 'task', `Cập nhật nhiệm vụ: ${task?.title || id}`);
      return {
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        activities: [log, ...prev.activities],
      };
    });
    addToast('success', 'Đã lưu', 'Thông tin nhiệm vụ đã được cập nhật.');
  };

  const deleteTask = (id: string) => {
    const task = data.tasks.find((t) => t.id === id);
    const log = logActivity('Xóa nhiệm vụ', 'task', `Đã xóa nhiệm vụ: ${task?.title || id}`);
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
      taskSubmissions: prev.taskSubmissions.filter((ts) => ts.taskId !== id),
      activities: [log, ...prev.activities],
    }));
    addToast('info', 'Đã xóa', 'Nhiệm vụ đã được xóa khỏi danh sách.');
  };

  const duplicateTask = (id: string) => {
    const task = data.tasks.find((t) => t.id === id);
    if (!task) return;
    const duplicated: Task = {
      ...task,
      id: 'tsk_' + Date.now(),
      code: task.code + '-CP',
      title: task.title + ' (Bản sao)',
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    };
    const log = logActivity('Sao chép nhiệm vụ', 'task', `Đã nhân bản nhiệm vụ ${task.title}`);
    setData((prev) => ({
      ...prev,
      tasks: [duplicated, ...prev.tasks],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Đã sao chép', `Đã tạo bản sao "${duplicated.title}".`);
  };

  // --- TASK SUBMISSIONS ---
  const updateSubmission = (id: string, updates: Partial<TaskSubmission>) => {
    setData((prev) => ({
      ...prev,
      taskSubmissions: prev.taskSubmissions.map((s) =>
        s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : s
      ),
    }));
    addToast('success', 'Đã cập nhật', 'Trạng thái bài nộp đã được ghi nhận.');
  };

  const saveStudentSubmission = (
    taskId: string,
    studentId: string,
    classId: string,
    status: TaskSubmission['status'],
    score?: number,
    feedback?: string
  ) => {
    setData((prev) => {
      const existing = prev.taskSubmissions.find((s) => s.taskId === taskId && s.studentId === studentId);
      const today = new Date().toISOString().split('T')[0];
      if (existing) {
        return {
          ...prev,
          taskSubmissions: prev.taskSubmissions.map((s) =>
            s.id === existing.id
              ? { ...s, status, score, feedback, submissionDate: s.submissionDate || today, updatedAt: today }
              : s
          ),
        };
      } else {
        const newSub: TaskSubmission = {
          id: 'sub_' + Date.now(),
          taskId,
          studentId,
          classId,
          status,
          score,
          feedback,
          submissionDate: today,
          updatedAt: today,
        };
        return {
          ...prev,
          taskSubmissions: [...prev.taskSubmissions, newSub],
        };
      }
    });
    addToast('success', 'Đã lưu', 'Đã ghi nhận kết quả nhiệm vụ của học sinh.');
  };

  // --- GRADE ACTIONS ---
  const addGrade = (grade: Omit<GradeRecord, 'id' | 'createdAt'>): GradeRecord => {
    const newGrade: GradeRecord = {
      ...grade,
      id: 'grd_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString().split('T')[0],
    };
    const student = data.students.find((s) => s.id === grade.studentId);
    const log = logActivity('Nhập điểm số', 'grade', `Nhập điểm (${grade.score}/${grade.maxScore}) môn ${grade.assessmentName} cho em ${student?.fullName}`);
    setData((prev) => ({
      ...prev,
      grades: [newGrade, ...prev.grades],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Thành công', `Đã nhập điểm cho học sinh ${student?.fullName || ''}.`);
    return newGrade;
  };

  const updateGrade = (id: string, updates: Partial<GradeRecord>) => {
    setData((prev) => {
      const grade = prev.grades.find((g) => g.id === id);
      const log = logActivity('Cập nhật điểm', 'grade', `Cập nhật điểm ${grade?.assessmentName}`);
      return {
        ...prev,
        grades: prev.grades.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        activities: [log, ...prev.activities],
      };
    });
    addToast('success', 'Đã lưu', 'Bản ghi điểm số đã được cập nhật.');
  };

  const deleteGrade = (id: string) => {
    setData((prev) => ({
      ...prev,
      grades: prev.grades.filter((g) => g.id !== id),
    }));
    addToast('info', 'Đã xóa', 'Điểm đã được xóa khỏi sổ điểm.');
  };

  const batchSaveGrades = (newGrades: GradeRecord[]) => {
    setData((prev) => {
      // Replace existing by ID or add new
      const existingIds = new Set(newGrades.map((g) => g.id));
      const untouched = prev.grades.filter((g) => !existingIds.has(g.id));
      const log = logActivity('Lưu điểm đồng loạt', 'grade', `Đã lưu cập nhật ${newGrades.length} điểm số.`);
      return {
        ...prev,
        grades: [...newGrades, ...untouched],
        activities: [log, ...prev.activities],
      };
    });
    addToast('success', 'Đã lưu sổ điểm', `Đã lưu thành công ${newGrades.length} bản ghi điểm số.`);
  };

  // --- FEEDBACK ACTIONS ---
  const addFeedback = (fb: Omit<StudentFeedback, 'id' | 'createdAt'>): StudentFeedback => {
    const newFeedback: StudentFeedback = {
      ...fb,
      id: 'fb_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    const student = data.students.find((s) => s.id === fb.studentId);
    const log = logActivity('Ghi nhận xét mới', 'feedback', `Ghi nhận xét học tập cho em ${student?.fullName}`);
    setData((prev) => ({
      ...prev,
      feedbacks: [newFeedback, ...prev.feedbacks],
      activities: [log, ...prev.activities],
    }));
    addToast('success', 'Thành công', `Đã lưu nhận xét cho ${student?.fullName || ''}.`);
    return newFeedback;
  };

  const updateFeedback = (id: string, updates: Partial<StudentFeedback>) => {
    setData((prev) => ({
      ...prev,
      feedbacks: prev.feedbacks.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
    addToast('success', 'Đã lưu', 'Nhận xét đã được cập nhật.');
  };

  const deleteFeedback = (id: string) => {
    setData((prev) => ({
      ...prev,
      feedbacks: prev.feedbacks.filter((f) => f.id !== id),
    }));
    addToast('info', 'Đã xóa', 'Nhận xét đã được xóa.');
  };

  // --- SETTINGS & DATA TOOLS ---
  const updateSettings = (settings: Partial<AppSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
    addToast('success', 'Đã lưu cài đặt', 'Cài đặt hệ thống đã được cập nhật.');
  };

  const resetToDemoData = () => {
    setData(initialAppData);
    addToast('info', 'Khôi phục mẫu', 'Đã khôi phục toàn bộ dữ liệu mẫu ban đầu của Cô Bùi Thị Ra.');
  };

  const clearAllData = () => {
    const emptyData: AppData = {
      classes: [],
      students: [],
      lessons: [],
      tasks: [],
      taskSubmissions: [],
      grades: [],
      feedbacks: [],
      activities: [logActivity('Khởi tạo hệ thống mới', 'system', 'Toàn bộ dữ liệu thử nghiệm đã được làm sạch.')],
      settings: initialSettings,
    };
    setData(emptyData);
    addToast('warning', 'Làm sạch dữ liệu', 'Đã dọn sạch toàn bộ dữ liệu. Bạn có thể bắt đầu nhập mới.');
  };

  const exportDataJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('download', `QuanLyLopHoc_NgoiSao_Backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('success', 'Sao lưu thành công', 'Tệp sao lưu JSON đã được tải xuống máy tính của bạn.');
  };

  const importDataJSON = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.classes || !parsed.students || !parsed.grades) {
        return { success: false, error: 'Định dạng tệp sao lưu không hợp lệ. Thiếu các bảng dữ liệu cốt lõi.' };
      }
      setData(parsed);
      addToast('success', 'Khôi phục thành công', 'Dữ liệu lớp học đã được khôi phục từ tệp sao lưu.');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Không thể đọc tệp sao lưu JSON.' };
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        activeTab,
        setActiveTab,
        selectedClassId,
        setSelectedClassId,
        toasts,
        addToast,
        removeToast,
        addClass,
        updateClass,
        deleteClass,
        addStudent,
        updateStudent,
        deleteStudent,
        toggleStudentSupport,
        batchAddStudents,
        batchDeleteStudents,
        addLesson,
        updateLesson,
        deleteLesson,
        duplicateLesson,
        clearAllLessons,
        resetLessonsToCurriculum,
        addTask,
        updateTask,
        deleteTask,
        duplicateTask,
        updateSubmission,
        saveStudentSubmission,
        addGrade,
        updateGrade,
        deleteGrade,
        batchSaveGrades,
        addFeedback,
        updateFeedback,
        deleteFeedback,
        updateSettings,
        resetToDemoData,
        exportDataJSON,
        importDataJSON,
        clearAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
