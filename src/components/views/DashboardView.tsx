import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  calculateAverageGrade,
  calculateTaskCompletion,
  studentNeedsAttention,
  isTaskOverdue,
  formatDate,
  getGradeRank,
} from '../../utils/calculations';
import {
  GraduationCap,
  Users,
  BookOpen,
  CheckSquare,
  Award,
  AlertCircle,
  TrendingUp,
  Clock,
  Calendar,
  ArrowRight,
  Filter,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

export const DashboardView: React.FC = () => {
  const { data, selectedClassId, setSelectedClassId, setActiveTab } = useApp();
  const [timeFilter, setTimeFilter] = useState<'all' | 'recent'>('all');

  // Filter entities according to selectedClassId
  const filteredClasses =
    selectedClassId === 'all'
      ? data.classes
      : data.classes.filter((c) => c.id === selectedClassId);

  const filteredStudents =
    selectedClassId === 'all'
      ? data.students
      : data.students.filter((s) => s.classId === selectedClassId);

  const filteredLessons =
    selectedClassId === 'all'
      ? data.lessons
      : data.lessons.filter((l) => l.classIds.includes(selectedClassId));

  const filteredTasks =
    selectedClassId === 'all'
      ? data.tasks
      : data.tasks.filter((t) => t.classIds.includes(selectedClassId));

  const filteredGrades =
    selectedClassId === 'all'
      ? data.grades
      : data.grades.filter((g) => g.classId === selectedClassId);

  const filteredSubmissions =
    selectedClassId === 'all'
      ? data.taskSubmissions
      : data.taskSubmissions.filter((ts) => ts.classId === selectedClassId);

  // Computed metrics
  const totalClasses = filteredClasses.length;
  const totalStudents = filteredStudents.length;
  const totalLessons = filteredLessons.length;
  const totalTasks = filteredTasks.length;

  const completedTasksCount = filteredTasks.filter((t) => t.status === 'completed').length;
  const averageGrade = calculateAverageGrade(filteredGrades);
  const taskCompletion = calculateTaskCompletion(filteredSubmissions, filteredTasks);

  // Attention students list
  const attentionStudents = filteredStudents
    .map((student) => {
      const check = studentNeedsAttention(
        student,
        data.grades,
        data.taskSubmissions,
        data.tasks,
        data.settings
      );
      const studentGrades = data.grades.filter((g) => g.studentId === student.id);
      const avg = calculateAverageGrade(studentGrades);
      const studentClass = data.classes.find((c) => c.id === student.classId);
      return {
        student,
        studentClass,
        avg,
        reasons: check.reasons,
        needsAttention: check.needsAttention,
      };
    })
    .filter((s) => s.needsAttention);

  // Grade Distribution
  const gradeDistribution = {
    gioi: 0,
    kha: 0,
    tb: 0,
    yeu: 0,
    chuaCo: 0,
  };

  filteredStudents.forEach((student) => {
    const studentGrades = data.grades.filter((g) => g.studentId === student.id);
    const avg = calculateAverageGrade(studentGrades);
    const rankInfo = getGradeRank(avg);
    if (rankInfo.rank === 'Giỏi') gradeDistribution.gioi++;
    else if (rankInfo.rank === 'Khá') gradeDistribution.kha++;
    else if (rankInfo.rank === 'Trung bình') gradeDistribution.tb++;
    else if (rankInfo.rank === 'Cần hỗ trợ') gradeDistribution.yeu++;
    else gradeDistribution.chuaCo++;
  });

  // Upcoming and overdue tasks
  const now = new Date();
  const upcomingTasks = filteredTasks
    .filter((t) => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Recent activities
  const recentActivities = data.activities.slice(0, 6);

  if (data.classes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Tổng quan quản trị lớp học</h2>
          <p className="text-xs text-slate-500 mt-1">Bảng theo dõi trung tâm hoạt động giảng dạy của Cô Bùi Thị Ra</p>
        </div>
        <EmptyState
          icon={GraduationCap}
          title="Chưa có dữ liệu lớp học"
          description="Hệ thống đang ở trạng thái mới. Cô hãy tạo lớp học đầu tiên hoặc nhấn nạp lại dữ liệu mẫu để trải nghiệm đầy đủ các tính năng."
          actionLabel="Tạo lớp học mới"
          onAction={() => setActiveTab('classes')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Tổng quan quản trị lớp học
            </h1>
            <span className="text-xs text-slate-500 font-mono">· {data.settings.currentSchoolYear}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi lớp học, tiến độ học tập và kết quả của học sinh theo thời gian thực
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả {data.classes.length} lớp học</option>
              {data.classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} – {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                timeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cả học kỳ
            </button>
            <button
              onClick={() => setTimeFilter('recent')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                timeFilter === 'recent'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gần đây
            </button>
          </div>
        </div>
      </div>

      {/* 8 Primary KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* 1. Lớp học */}
        <div
          onClick={() => setActiveTab('classes')}
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Lớp học</span>
            <GraduationCap className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{totalClasses}</span>
            <span className="text-[11px] text-slate-400">lớp</span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-500 truncate">THCS & THPT</span>
        </div>

        {/* 2. Học sinh */}
        <div
          onClick={() => setActiveTab('students')}
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Học sinh</span>
            <Users className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{totalStudents}</span>
            <span className="text-[11px] text-slate-400">em</span>
          </div>
          <span className="mt-1 block text-[11px] text-blue-600 truncate">Hồ sơ quản lý</span>
        </div>

        {/* 3. Bài học */}
        <div
          onClick={() => setActiveTab('lessons')}
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Bài học</span>
            <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{totalLessons}</span>
            <span className="text-[11px] text-slate-400">bài</span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-500 truncate">Theo phân phối</span>
        </div>

        {/* 4. Tổng nhiệm vụ */}
        <div
          onClick={() => setActiveTab('tasks')}
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Nhiệm vụ</span>
            <CheckSquare className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">{totalTasks}</span>
            <span className="text-[11px] text-slate-400">nhiệm vụ</span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-500 truncate">Đã tạo & giao</span>
        </div>

        {/* 5. Nhiệm vụ hoàn thành */}
        <div
          onClick={() => setActiveTab('tasks')}
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Đã hoàn thành</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-emerald-600 font-mono tabular-nums">{completedTasksCount}</span>
            <span className="text-[11px] text-slate-400">/{totalTasks}</span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-500 truncate">Đã đóng hạn</span>
        </div>

        {/* 6. Điểm trung bình */}
        <div
          onClick={() => setActiveTab('grades')}
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Điểm TB</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {averageGrade !== null ? averageGrade.toFixed(1) : '—'}
            </span>
            <span className="text-[11px] text-slate-400">/10</span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-500 truncate">
            {filteredGrades.length} đầu điểm
          </span>
        </div>

        {/* 7. Tỷ lệ nộp bài */}
        <div
          onClick={() => setActiveTab('progress')}
          className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Tỷ lệ nộp</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-bold text-blue-700 font-mono tabular-nums">
              {taskCompletion.completionRate}%
            </span>
          </div>
          <span className="mt-1 block text-[11px] text-slate-500 truncate">
            {taskCompletion.completed}/{taskCompletion.totalAssigned} lượt nộp
          </span>
        </div>

        {/* 8. Học sinh cần quan tâm */}
        <div
          onClick={() => setActiveTab('students')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-2xs group ${
            attentionStudents.length > 0
              ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Cần hỗ trợ</span>
            <AlertCircle
              className={`w-4 h-4 ${
                attentionStudents.length > 0 ? 'text-rose-600' : 'text-slate-400'
              }`}
            />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span
              className={`text-xl font-bold font-mono tabular-nums ${
                attentionStudents.length > 0 ? 'text-rose-600' : 'text-slate-900'
              }`}
            >
              {attentionStudents.length}
            </span>
            <span className="text-[11px] text-slate-400">em</span>
          </div>
          <span className="mt-1 block text-[11px] text-rose-600 truncate">
            Điểm/Hạn nộp
          </span>
        </div>
      </div>

      {/* Main Grid: Left Charts & Lists, Right Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 & 2: Analytics & Attention list */}
        <div className="lg:col-span-2 space-y-6">
          {/* Grade Distribution Bar & Stats */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Phân bố xếp loại học lực ({totalStudents} học sinh)
                </h3>
                <p className="text-xs text-slate-500">
                  Dựa trên điểm trung bình thực tế đã ghi nhận trong sổ điểm
                </p>
              </div>
              <button
                onClick={() => setActiveTab('grades')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Xem sổ điểm</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Distribution Segmented Bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
              {totalStudents > 0 ? (
                <>
                  <div
                    style={{ width: `${(gradeDistribution.gioi / totalStudents) * 100}%` }}
                    className="bg-emerald-500 h-full transition-all"
                    title={`Giỏi: ${gradeDistribution.gioi} học sinh`}
                  />
                  <div
                    style={{ width: `${(gradeDistribution.kha / totalStudents) * 100}%` }}
                    className="bg-sky-500 h-full transition-all"
                    title={`Khá: ${gradeDistribution.kha} học sinh`}
                  />
                  <div
                    style={{ width: `${(gradeDistribution.tb / totalStudents) * 100}%` }}
                    className="bg-amber-500 h-full transition-all"
                    title={`Trung bình: ${gradeDistribution.tb} học sinh`}
                  />
                  <div
                    style={{ width: `${(gradeDistribution.yeu / totalStudents) * 100}%` }}
                    className="bg-rose-500 h-full transition-all"
                    title={`Cần hỗ trợ: ${gradeDistribution.yeu} học sinh`}
                  />
                  <div
                    style={{ width: `${(gradeDistribution.chuaCo / totalStudents) * 100}%` }}
                    className="bg-slate-300 h-full transition-all"
                    title={`Chưa có điểm: ${gradeDistribution.chuaCo} học sinh`}
                  />
                </>
              ) : (
                <div className="w-full bg-slate-200 h-full" />
              )}
            </div>

            {/* Legend & Count row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500 shrink-0" />
                <span className="text-slate-600">Giỏi (&ge; 8.0):</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {gradeDistribution.gioi} ({totalStudents ? Math.round((gradeDistribution.gioi / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-xs bg-sky-500 shrink-0" />
                <span className="text-slate-600">Khá (6.5-7.9):</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {gradeDistribution.kha} ({totalStudents ? Math.round((gradeDistribution.kha / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-xs bg-amber-500 shrink-0" />
                <span className="text-slate-600">TB (5.0-6.4):</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {gradeDistribution.tb} ({totalStudents ? Math.round((gradeDistribution.tb / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-xs bg-rose-500 shrink-0" />
                <span className="text-slate-600">Cần hỗ trợ (&lt; 5.0):</span>
                <span className="font-semibold text-rose-600 font-mono tabular-nums">
                  {gradeDistribution.yeu} ({totalStudents ? Math.round((gradeDistribution.yeu / totalStudents) * 100) : 0}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-xs bg-slate-300 shrink-0" />
                <span className="text-slate-500">Chưa có điểm:</span>
                <span className="font-semibold text-slate-700 font-mono tabular-nums">
                  {gradeDistribution.chuaCo}
                </span>
              </div>
            </div>
          </div>

          {/* Attention Students Watchlist */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Danh sách học sinh cần quan tâm & hỗ trợ
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-mono font-semibold">
                    {attentionStudents.length} em
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tự động tổng hợp dựa trên ngưỡng điểm (&lt;{data.settings.attentionScoreThreshold}), bài tập quá hạn hoặc cờ theo dõi của cô
                </p>
              </div>
              <button
                onClick={() => setActiveTab('students')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Tất cả học sinh</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {attentionStudents.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                Tất cả học sinh trong phạm vi lọc đều đang duy trì tiến độ học tập tốt!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {attentionStudents.map(({ student, studentClass, avg, reasons }) => (
                  <div
                    key={student.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/70 rounded-lg px-2 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900">
                          {student.fullName}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          ({student.code})
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 bg-slate-100 rounded-sm text-slate-600 font-medium">
                          {studentClass?.code || 'Chưa xếp lớp'}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-rose-600">
                        {reasons.map((r, i) => (
                          <span key={i} className="inline-flex items-center gap-1 bg-rose-50 px-1.5 py-0.5 rounded-xs border border-rose-100">
                            · {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-500 block">Điểm TB</span>
                        <span className="text-xs font-bold font-mono text-slate-900">
                          {avg !== null ? avg.toFixed(1) : '—'}
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('feedback')}
                        className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Ghi nhận xét
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Upcoming Deadlines & Recent Activities */}
        <div className="space-y-6">
          {/* Upcoming & Overdue Tasks */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-semibold text-slate-900">Nhiệm vụ sắp tới</h3>
              </div>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                Xem tất cả
              </button>
            </div>

            {upcomingTasks.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                Không có nhiệm vụ nào đang đến hạn.
              </p>
            ) : (
              <div className="space-y-2.5">
                {upcomingTasks.map((task) => {
                  const overdue = isTaskOverdue(task, now);
                  const assignedClasses = data.classes
                    .filter((c) => task.classIds.includes(c.id))
                    .map((c) => c.code)
                    .join(', ');

                  return (
                    <div
                      key={task.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        overdue
                          ? 'bg-rose-50/50 border-rose-200'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                          {task.title}
                        </span>
                        {overdue ? (
                          <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-sm shrink-0">
                            Quá hạn
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                            Hạn: {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Lớp: {assignedClasses || 'Tất cả'}</span>
                        <span className="font-mono">{task.maxScore} điểm</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-semibold text-slate-900">Hoạt động gần đây</h3>
              </div>
            </div>

            {recentActivities.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">Chưa có hoạt động nào được ghi nhận.</p>
            ) : (
              <div className="relative pl-4 space-y-4 border-l border-slate-200">
                {recentActivities.map((act) => (
                  <div key={act.id} className="relative group">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white" />
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">
                        {act.action}
                      </span>
                      {act.details && (
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          {act.details}
                        </p>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                        {new Date(act.timestamp).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        · {new Date(act.timestamp).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
