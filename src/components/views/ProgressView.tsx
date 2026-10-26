import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  calculateAverageGrade,
  calculateTaskCompletion,
  isTaskOverdue,
  getGradeRank,
  formatDate,
} from '../../utils/calculations';
import {
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  BookOpen,
  Flag,
  User,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

export const ProgressView: React.FC = () => {
  const {
    data,
    selectedClassId,
    setSelectedClassId,
    toggleStudentSupport,
    setActiveTab,
  } = useApp();

  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');

  // Filter class
  const activeClassStudents = data.students.filter((s) =>
    selectedClassId === 'all' ? true : s.classId === selectedClassId
  );

  // Search filter
  const displayedStudents = activeClassStudents.filter((s) =>
    s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.code.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Class-wide progress metrics
  const classTasks = data.tasks.filter((t) =>
    selectedClassId === 'all' ? true : t.classIds.includes(selectedClassId)
  );

  const classSubmissions = data.taskSubmissions.filter((ts) =>
    selectedClassId === 'all' ? true : ts.classId === selectedClassId
  );

  const overallClassCompletion = calculateTaskCompletion(classSubmissions, classTasks);

  // Lessons progress
  const classLessons = data.lessons.filter((l) =>
    selectedClassId === 'all' ? true : l.classIds.includes(selectedClassId)
  );
  const completedLessons = classLessons.filter((l) => l.status === 'completed').length;
  const lessonProgressPercent = classLessons.length > 0 ? Math.round((completedLessons / classLessons.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tiến độ học tập & Rèn luyện</h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi tỷ lệ hoàn thành nhiệm vụ, diễn biến điểm số và phát hiện học sinh cần bổ trợ kiến thức
          </p>
        </div>

        {/* Global Class Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Phạm vi:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-hidden cursor-pointer shadow-2xs"
          >
            <option value="all">Tất cả các lớp ({data.classes.length} lớp)</option>
            {data.classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.code} – {cls.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Task Completion Rate */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Tiến độ nộp bài</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {overallClassCompletion.completionRate}%
            </span>
            <span className="text-xs text-slate-500">tổng thể</span>
          </div>
          <div className="mt-3 w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              style={{ width: `${overallClassCompletion.completionRate}%` }}
              className="bg-blue-600 h-full rounded-full transition-all"
            />
          </div>
          <span className="mt-2 block text-[11px] text-slate-500 font-mono">
            Đã nộp: {overallClassCompletion.completed} / {overallClassCompletion.totalAssigned} lượt giao
          </span>
        </div>

        {/* Metric 2: Lessons Pacing */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Tiến độ bài học</span>
            <BookOpen className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {lessonProgressPercent}%
            </span>
            <span className="text-xs text-slate-500">hoàn thành</span>
          </div>
          <div className="mt-3 w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              style={{ width: `${lessonProgressPercent}%` }}
              className="bg-sky-600 h-full rounded-full transition-all"
            />
          </div>
          <span className="mt-2 block text-[11px] text-slate-500 font-mono">
            Đã dạy: {completedLessons} / {classLessons.length} bài phân phối
          </span>
        </div>

        {/* Metric 3: Pending & Overdue Tasks */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Chưa hoàn thành</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-amber-600 tabular-nums">
              {overallClassCompletion.pending}
            </span>
            <span className="text-xs text-slate-500">lượt bài</span>
          </div>
          <span className="mt-3 block text-xs text-slate-600">
            Có {overallClassCompletion.late} bài nộp muộn sau thời hạn quy định.
          </span>
        </div>

        {/* Metric 4: Flagged for Support */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Học sinh theo dõi</span>
            <Flag className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-rose-600 tabular-nums">
              {activeClassStudents.filter((s) => s.needsSupport).length}
            </span>
            <span className="text-xs text-slate-500">/ {activeClassStudents.length} em</span>
          </div>
          <span className="mt-3 block text-xs text-rose-600 font-medium">
            Đang được cô lập kế hoạch hỗ trợ và kèm cặp riêng.
          </span>
        </div>
      </div>

      {/* Individual Student Progress Tracking Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Tiến độ chi tiết từng học sinh ({displayedStudents.length} học sinh)
            </h3>
            <p className="text-xs text-slate-500">
              Quan sát tỷ lệ nộp bài, điểm số trung bình, xu hướng học tập và tình trạng quá hạn
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm theo họ tên hoặc mã HS..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {displayedStudents.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            Không có học sinh nào phù hợp với điều kiện tìm kiếm.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-3">Học sinh</th>
                  <th className="py-3 px-3">Lớp</th>
                  <th className="py-3 px-3 w-48">Tiến độ nộp bài</th>
                  <th className="py-3 px-3 text-center">Nhiệm vụ chưa nộp</th>
                  <th className="py-3 px-3 font-mono">Điểm TB</th>
                  <th className="py-3 px-3">Xếp loại</th>
                  <th className="py-3 px-3 text-center">Xu hướng</th>
                  <th className="py-3 px-3 text-center">Cờ hỗ trợ</th>
                  <th className="py-3 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedStudents.map((student) => {
                  const studentClass = data.classes.find((c) => c.id === student.classId);
                  const studentSubmissions = data.taskSubmissions.filter((ts) => ts.studentId === student.id);
                  const completion = calculateTaskCompletion(studentSubmissions, data.tasks);

                  const studentGrades = data.grades.filter((g) => g.studentId === student.id);
                  const avg = calculateAverageGrade(studentGrades);
                  const rankInfo = getGradeRank(avg);

                  // Calculate simple score trend if at least 2 grades exist
                  let trend: 'up' | 'down' | 'steady' = 'steady';
                  if (studentGrades.length >= 2) {
                    const sorted = [...studentGrades].sort(
                      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
                    const latest = sorted[sorted.length - 1].score;
                    const previous = sorted[sorted.length - 2].score;
                    if (latest > previous + 0.3) trend = 'up';
                    else if (latest < previous - 0.3) trend = 'down';
                  }

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-900 block">{student.fullName}</span>
                        <span className="text-[11px] font-mono text-slate-400">{student.code}</span>
                      </td>

                      <td className="py-3 px-3 font-semibold text-slate-700">
                        {studentClass?.code || '—'}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                          <span className="text-slate-600">
                            {completion.completed}/{completion.totalAssigned} bài
                          </span>
                          <span className="font-bold text-blue-800">{completion.completionRate}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            style={{ width: `${completion.completionRate}%` }}
                            className={`h-full rounded-full transition-all ${
                              completion.completionRate >= 80
                                ? 'bg-blue-600'
                                : completion.completionRate >= 50
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center font-mono font-semibold">
                        {completion.pending > 0 ? (
                          <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                            {completion.pending} bài
                          </span>
                        ) : (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                            Đã nộp đủ
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {avg !== null ? avg.toFixed(1) : '—'}
                      </td>

                      <td className="py-3 px-3">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${rankInfo.badgeClass}`}>
                          {rankInfo.rank}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        {trend === 'up' && (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold" title="Điểm số bài gần nhất tăng">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Tăng</span>
                          </span>
                        )}
                        {trend === 'down' && (
                          <span className="inline-flex items-center gap-0.5 text-rose-600 font-semibold" title="Điểm số bài gần nhất giảm">
                            <ArrowDownRight className="w-4 h-4" />
                            <span>Giảm</span>
                          </span>
                        )}
                        {trend === 'steady' && (
                          <span className="inline-flex items-center gap-0.5 text-slate-400" title="Phong độ ổn định">
                            <Minus className="w-4 h-4" />
                            <span>Ổn định</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => toggleStudentSupport(student.id)}
                          className="p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                          title={student.needsSupport ? 'Bỏ đánh dấu hỗ trợ' : 'Đánh dấu cần hỗ trợ'}
                        >
                          <Flag
                            className={`w-4 h-4 mx-auto ${
                              student.needsSupport
                                ? 'text-rose-600 fill-rose-600'
                                : 'text-slate-300 hover:text-slate-500'
                            }`}
                          />
                        </button>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setActiveTab('feedback')}
                          className="text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          Ghi nhận xét &rarr;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
