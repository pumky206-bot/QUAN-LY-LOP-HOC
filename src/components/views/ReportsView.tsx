import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  calculateAverageGrade,
  calculateTaskCompletion,
  studentNeedsAttention,
  getGradeRank,
  formatDate,
  exportToCSV,
} from '../../utils/calculations';
import {
  BarChart3,
  Download,
  Printer,
  Filter,
  GraduationCap,
  Users,
  Award,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileSpreadsheet,
  Building,
} from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

export const ReportsView: React.FC = () => {
  const { data, selectedClassId, setSelectedClassId } = useApp();

  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [reportType, setReportType] = useState<'overview' | 'comparison' | 'attention'>('overview');

  // Filter classes
  const targetClasses = data.classes.filter((c) => {
    const matchesClass = selectedClassId === 'all' || c.id === selectedClassId;
    const matchesGrade = selectedGradeFilter === 'all' || c.grade.toString() === selectedGradeFilter;
    return matchesClass && matchesGrade;
  });

  // Calculate report metrics per class
  const classReports = targetClasses.map((cls) => {
    const students = data.students.filter((s) => s.classId === cls.id);
    const grades = data.grades.filter((g) => g.classId === cls.id);
    const avgScore = calculateAverageGrade(grades);
    const rankInfo = getGradeRank(avgScore);

    const tasks = data.tasks.filter((t) => t.classIds.includes(cls.id));
    const submissions = data.taskSubmissions.filter((ts) => ts.classId === cls.id);
    const completion = calculateTaskCompletion(submissions, tasks);

    const attentionCount = students.filter(
      (s) =>
        studentNeedsAttention(s, data.grades, data.taskSubmissions, data.tasks, data.settings)
          .needsAttention
    ).length;

    // Distribution
    let gioi = 0, kha = 0, tb = 0, yeu = 0;
    students.forEach((s) => {
      const sGrades = data.grades.filter((g) => g.studentId === s.id);
      const sAvg = calculateAverageGrade(sGrades);
      const r = getGradeRank(sAvg);
      if (r.rank === 'Giỏi') gioi++;
      else if (r.rank === 'Khá') kha++;
      else if (r.rank === 'Trung bình') tb++;
      else if (r.rank === 'Cần hỗ trợ') yeu++;
    });

    return {
      cls,
      studentCount: students.length,
      avgScore,
      rankInfo,
      completion,
      attentionCount,
      distribution: { gioi, kha, tb, yeu },
    };
  });

  // Grade group counts (THCS vs THPT)
  const thcsStudents = data.students.filter((s) => {
    const cls = data.classes.find((c) => c.id === s.classId);
    return cls && cls.grade <= 9;
  }).length;

  const thptStudents = data.students.filter((s) => {
    const cls = data.classes.find((c) => c.id === s.classId);
    return cls && cls.grade >= 10;
  }).length;

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Mã Lớp',
      'Tên Lớp',
      'Khối',
      'Sĩ số',
      'Điểm TB',
      'Xếp loại chung',
      'Tỷ lệ nộp bài (%)',
      'Bài đã nộp',
      'Chưa nộp',
      'Số HS Giỏi',
      'Số HS Khá',
      'Số HS Trung bình',
      'Số HS Cần hỗ trợ',
    ];

    const rows = classReports.map((r) => [
      r.cls.code,
      r.cls.name,
      `Khối ${r.cls.grade}`,
      r.studentCount,
      r.avgScore !== null ? r.avgScore.toFixed(1) : '',
      r.rankInfo.rank,
      `${r.completion.completionRate}%`,
      r.completion.completed,
      r.completion.pending,
      r.distribution.gioi,
      r.distribution.kha,
      r.distribution.tb,
      r.distribution.yeu,
    ]);

    exportToCSV(`Bao_cao_tong_hop_${new Date().toISOString().split('T')[0]}`, headers, rows);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header (hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 no-print">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Thống kê & Báo cáo tổng hợp</h1>
          <p className="text-xs text-slate-500 mt-1">
            Báo cáo kết quả học tập, so sánh giữa các lớp và đánh giá tỷ lệ hoàn thành nhiệm vụ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất báo cáo CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer print-include"
          >
            <Printer className="w-4 h-4" />
            <span>In báo cáo chuẩn</span>
          </button>
        </div>
      </div>

      {/* Official Print Header (Only visible during print) */}
      <div className="hidden print:block border-b-2 border-slate-800 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              {data.settings.schoolName}
            </h2>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              BÁO CÁO TỔNG KẾT HOẠT ĐỘNG GIẢNG DẠY & KẾT QUẢ HỌC TẬP
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Giáo viên phụ trách: <strong>Cô {data.settings.teacherName}</strong> · Năm học: {data.settings.currentSchoolYear}
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>Ngày in: {new Date().toLocaleDateString('vi-VN')}</p>
            <p className="font-mono text-[11px] mt-0.5">Hệ thống Quản Lý Lớp Học Ngôi Sao</p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar (hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs no-print">
        {/* Report tab mode */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
          <button
            onClick={() => setReportType('overview')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              reportType === 'overview'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tổng quan các lớp
          </button>
          <button
            onClick={() => setReportType('comparison')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              reportType === 'comparison'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            So sánh kết quả
          </button>
          <button
            onClick={() => setReportType('attention')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              reportType === 'attention'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Diện cần hỗ trợ
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Lớp:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
          >
            <option value="all">Tất cả {data.classes.length} lớp</option>
            {data.classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}
              </option>
            ))}
          </select>

          <span className="text-xs font-medium text-slate-500">Khối:</span>
          <select
            value={selectedGradeFilter}
            onChange={(e) => setSelectedGradeFilter(e.target.value)}
            className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
          >
            <option value="all">Tất cả khối</option>
            <option value="8">Khối 8 (THCS)</option>
            <option value="9">Khối 9 (THCS)</option>
            <option value="10">Khối 10 (THPT)</option>
            <option value="11">Khối 11 (THPT)</option>
            <option value="12">Khối 12 (THPT)</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block">Quy mô học sinh</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {data.students.length}
            </span>
            <span className="text-xs text-slate-400">học sinh</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
            <span>THCS: {thcsStudents} em</span>
            <span>·</span>
            <span>THPT: {thptStudents} em</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block">Số lớp phụ trách</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {data.classes.length}
            </span>
            <span className="text-xs text-slate-400">lớp học</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Khối 8, 9, 10, 11, 12
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block">Tỷ lệ hoàn thành nhiệm vụ</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-blue-700 tabular-nums">
              {(() => {
                const totalComp = calculateTaskCompletion(data.taskSubmissions, data.tasks);
                return `${totalComp.completionRate}%`;
              })()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Tính trên {data.taskSubmissions.length} lượt bài nộp
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-medium text-slate-500 block">Diện cần theo dõi</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-600 tabular-nums">
              {
                data.students.filter(
                  (s) =>
                    studentNeedsAttention(s, data.grades, data.taskSubmissions, data.tasks, data.settings)
                      .needsAttention
                ).length
              }
            </span>
            <span className="text-xs text-slate-400">em</span>
          </div>
          <div className="mt-2 text-[11px] text-rose-600 font-medium">
            Có kế hoạch hỗ trợ và phụ đạo
          </div>
        </div>
      </div>

      {/* Main Report Table by Class */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden print-page">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Bảng tổng hợp kết quả học tập & nộp bài theo từng lớp
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {classReports.length} lớp trong danh sách
          </span>
        </div>

        {classReports.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="Không có dữ liệu lớp học phù hợp"
            description="Hãy điều chỉnh bộ lọc để xem thống kê."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-3">Lớp học</th>
                  <th className="py-3 px-3">Khối</th>
                  <th className="py-3 px-3 text-center">Sĩ số</th>
                  <th className="py-3 px-3 text-center">Điểm TB</th>
                  <th className="py-3 px-3 text-center">Xếp loại chung</th>
                  <th className="py-3 px-3 text-center">Tỷ lệ nộp bài</th>
                  <th className="py-3 px-3">Phân bố Giỏi / Khá / TB / Yếu</th>
                  <th className="py-3 px-3 text-center">Cần quan tâm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classReports.map((r) => (
                  <tr key={r.cls.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      <span className="block">{r.cls.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono font-normal">
                        Mã: {r.cls.code} · {r.cls.subject}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-700">Khối {r.cls.grade}</td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                      {r.studentCount} em
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 text-sm">
                      {r.avgScore !== null ? r.avgScore.toFixed(1) : '—'}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${r.rankInfo.badgeClass}`}>
                        {r.rankInfo.rank}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center font-mono font-bold text-blue-800">
                      {r.completion.completionRate}%
                      <span className="block text-[10px] text-slate-400 font-normal">
                        ({r.completion.completed}/{r.completion.totalAssigned})
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs font-semibold" title="Giỏi">
                          G: {r.distribution.gioi}
                        </span>
                        <span className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-xs font-semibold" title="Khá">
                          K: {r.distribution.kha}
                        </span>
                        <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-xs font-semibold" title="Trung bình">
                          TB: {r.distribution.tb}
                        </span>
                        <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-xs font-semibold" title="Cần hỗ trợ">
                          Y: {r.distribution.yeu}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      {r.attentionCount > 0 ? (
                        <span className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
                          {r.attentionCount} em
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Comparison Visualizer Bars */}
      {reportType === 'comparison' && classReports.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Biểu đồ so sánh điểm trung bình giữa các lớp
          </h3>
          <div className="space-y-3">
            {classReports.map((r) => {
              const score = r.avgScore !== null ? r.avgScore : 0;
              const widthPercent = (score / 10) * 100;
              return (
                <div key={r.cls.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">{r.cls.code} – {r.cls.name}</span>
                    <span className="font-mono font-bold text-slate-900">
                      {r.avgScore !== null ? `${r.avgScore.toFixed(1)} / 10` : 'Chưa có điểm'}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${widthPercent}%` }}
                      className={`h-full rounded-full transition-all ${
                        score >= 8.0
                          ? 'bg-emerald-600'
                          : score >= 6.5
                          ? 'bg-blue-600'
                          : score >= 5.0
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Official Signature Area for Print */}
      <div className="hidden print:flex justify-between items-start mt-12 pt-8 text-xs text-slate-800">
        <div className="text-center w-48">
          <p className="font-semibold uppercase">BAN GIÁM HIỆU</p>
          <p className="text-[11px] text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
          <div className="h-20" />
        </div>

        <div className="text-center w-64">
          <p className="italic text-[11px] text-slate-500">
            Hà Nội, ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}
          </p>
          <p className="font-semibold uppercase mt-1">GIÁO VIÊN BÁO CÁO</p>
          <p className="text-[11px] text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</p>
          <div className="h-16" />
          <p className="font-bold text-slate-900 text-sm">{data.settings.teacherName}</p>
        </div>
      </div>
    </div>
  );
};
