import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeRecord, AssessmentType } from '../../types';
import {
  calculateAverageGrade,
  getGradeRank,
  formatDate,
  exportToCSV,
} from '../../utils/calculations';
import {
  Award,
  Plus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  Table,
  List,
  X,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';

export const GradesView: React.FC = () => {
  const {
    data,
    addGrade,
    updateGrade,
    deleteGrade,
    batchSaveGrades,
    selectedClassId,
    setSelectedClassId,
  } = useApp();

  // View mode: 'matrix' (Sổ điểm điện tử bảng ma trận) or 'list' (Danh sách bản ghi)
  const [viewMode, setViewMode] = useState<'matrix' | 'list'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<GradeRecord | null>(null);
  const [deleteTargetGrade, setDeleteTargetGrade] = useState<GradeRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    studentId: string;
    classId: string;
    assessmentName: string;
    type: AssessmentType;
    date: string;
    score: number;
    maxScore: number;
    weight: number;
    comment: string;
  }>({
    studentId: '',
    classId: selectedClassId !== 'all' ? selectedClassId : data.classes[0]?.id || '',
    assessmentName: '',
    type: 'quiz_15m',
    date: new Date().toISOString().split('T')[0],
    score: 8.0,
    maxScore: 10,
    weight: 1,
    comment: '',
  });

  const activeClassId =
    selectedClassId !== 'all'
      ? selectedClassId
      : data.classes[0]?.id || '';

  const activeClass = data.classes.find((c) => c.id === activeClassId);

  // Filter students for the active class (for matrix view)
  const classStudents = data.students.filter((s) => s.classId === activeClassId);

  // Distinct assessment names in this class
  const classGrades = data.grades.filter((g) => g.classId === activeClassId);
  const distinctAssessments = Array.from(
    new Set(classGrades.map((g) => g.assessmentName))
  );

  const resetForm = () => {
    const defaultClassId = selectedClassId !== 'all' ? selectedClassId : data.classes[0]?.id || '';
    const firstStudent = data.students.find((s) => s.classId === defaultClassId);
    setFormData({
      studentId: firstStudent?.id || '',
      classId: defaultClassId,
      assessmentName: 'Kiểm tra 15 phút',
      type: 'quiz_15m',
      date: new Date().toISOString().split('T')[0],
      score: 8.0,
      maxScore: 10,
      weight: 1,
      comment: '',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (grade: GradeRecord) => {
    setEditingGrade(grade);
    setFormData({
      studentId: grade.studentId,
      classId: grade.classId,
      assessmentName: grade.assessmentName,
      type: grade.type,
      date: grade.date,
      score: grade.score,
      maxScore: grade.maxScore,
      weight: grade.weight,
      comment: grade.comment,
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.assessmentName.trim() || !formData.studentId) return;

    if (formData.score < 0 || formData.score > formData.maxScore) {
      alert(`Điểm số không hợp lệ. Điểm phải nằm trong thang từ 0 đến ${formData.maxScore}.`);
      return;
    }

    if (editingGrade) {
      updateGrade(editingGrade.id, {
        studentId: formData.studentId,
        classId: formData.classId,
        assessmentName: formData.assessmentName.trim(),
        type: formData.type,
        date: formData.date,
        score: Number(formData.score),
        maxScore: Number(formData.maxScore),
        weight: Number(formData.weight),
        comment: formData.comment.trim(),
      });
      setEditingGrade(null);
    } else {
      addGrade({
        studentId: formData.studentId,
        classId: formData.classId,
        assessmentName: formData.assessmentName.trim(),
        type: formData.type,
        date: formData.date,
        score: Number(formData.score),
        maxScore: Number(formData.maxScore),
        weight: Number(formData.weight),
        comment: formData.comment.trim(),
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetGrade) return;
    deleteGrade(deleteTargetGrade.id);
    setDeleteTargetGrade(null);
  };

  // Matrix cell score inline quick-update
  const handleMatrixCellBlur = (
    studentId: string,
    assessmentName: string,
    existingGrade: GradeRecord | undefined,
    inputValue: string
  ) => {
    if (inputValue === '') return;
    const num = Number(inputValue);
    if (isNaN(num) || num < 0 || num > 10) {
      alert('Điểm số phải là số từ 0 đến 10.');
      return;
    }

    if (existingGrade) {
      if (existingGrade.score !== num) {
        updateGrade(existingGrade.id, { score: num });
      }
    } else {
      // Determine weight based on name
      const lower = assessmentName.toLowerCase();
      const weight = lower.includes('45') || lower.includes('giữa') || lower.includes('cuối') ? 2 : 1;
      addGrade({
        studentId,
        classId: activeClassId,
        assessmentName,
        type: lower.includes('miệng') ? 'oral' : lower.includes('45') ? 'test_45m' : 'quiz_15m',
        date: new Date().toISOString().split('T')[0],
        score: num,
        maxScore: 10,
        weight,
        comment: 'Nhập từ bảng sổ điểm',
      });
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (viewMode === 'matrix' && activeClass) {
      // Matrix Export
      const headers = ['Mã HS', 'Họ và Tên', 'Lớp', ...distinctAssessments, 'Điểm TB', 'Xếp loại'];
      const rows = classStudents.map((student) => {
        const studentGrades = data.grades.filter((g) => g.studentId === student.id);
        const avg = calculateAverageGrade(studentGrades);
        const rankInfo = getGradeRank(avg);

        const scoreCols = distinctAssessments.map((assName) => {
          const match = studentGrades.find((g) => g.assessmentName === assName);
          return match !== undefined ? match.score : '';
        });

        return [
          student.code,
          student.fullName,
          activeClass.code,
          ...scoreCols,
          avg !== null ? avg.toFixed(1) : '',
          rankInfo.rank,
        ];
      });

      exportToCSV(
        `So_diem_${activeClass.code}_${new Date().toISOString().split('T')[0]}`,
        headers,
        rows
      );
    } else {
      // List Export
      const headers = ['Mã HS', 'Họ và Tên', 'Lớp', 'Tên bài kiểm tra', 'Loại', 'Ngày', 'Điểm', 'Điểm tối đa', 'Hệ số', 'Nhận xét'];
      const rows = filteredGrades.map((g) => {
        const st = data.students.find((s) => s.id === g.studentId);
        const cls = data.classes.find((c) => c.id === g.classId);
        return [
          st?.code || '',
          st?.fullName || '',
          cls?.code || '',
          g.assessmentName,
          g.type,
          g.date,
          g.score,
          g.maxScore,
          g.weight,
          g.comment,
        ];
      });

      exportToCSV(
        `Bang_diem_chi_tiet_${new Date().toISOString().split('T')[0]}`,
        headers,
        rows
      );
    }
  };

  // Filter for list mode
  const filteredGrades = data.grades.filter((g) => {
    const student = data.students.find((s) => s.id === g.studentId);
    const matchesSearch =
      g.assessmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student && student.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (student && student.code.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass = selectedClassId === 'all' || g.classId === selectedClassId;
    const matchesType = typeFilter === 'all' || g.type === typeFilter;

    return matchesSearch && matchesClass && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Sổ điểm điện tử</h1>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              · Thang điểm chuẩn 10
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ghi nhận điểm số, tính điểm trung bình chính xác và xuất báo cáo kết quả của Cô Bùi Thị Ra
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Sổ điểm ma trận</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Bản ghi chi tiết</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất CSV</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nhập điểm</span>
          </button>
        </div>
      </div>

      {/* Rules Banner (Non-pill, clear pedagogical notice) */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-900">Quy tắc tính toán chính xác:</span> Điểm trung bình chỉ được tính dựa trên những đầu điểm hợp lệ đã nhập. Các cột chưa nhập điểm <strong className="text-slate-800 font-semibold">tuyệt đối không bị tính thành điểm 0</strong> và không ảnh hưởng đến xếp loại học lực của học sinh.
        </div>
      </div>

      {/* MATRIX VIEW */}
      {viewMode === 'matrix' && (
        <div className="space-y-4">
          {/* Class Selector for Matrix */}
          <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">Đang xem sổ điểm lớp:</span>
              <select
                value={activeClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 focus:outline-hidden cursor-pointer"
              >
                {data.classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.code} – {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              Sĩ số: {classStudents.length} học sinh · {distinctAssessments.length} cột kiểm tra
            </span>
          </div>

          {classStudents.length === 0 ? (
            <EmptyState
              icon={Award}
              title="Lớp học chưa có học sinh"
              description="Hãy thêm học sinh vào lớp học này trước khi nhập điểm."
            />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-3 text-center w-12 sticky left-0 bg-slate-50 z-10">STT</th>
                      <th className="py-3 px-3 w-28 sticky left-12 bg-slate-50 z-10">Mã HS</th>
                      <th className="py-3 px-4 min-w-[160px] sticky left-40 bg-slate-50 z-10">Họ và Tên</th>

                      {/* Dynamic Assessment Columns */}
                      {distinctAssessments.map((assName) => (
                        <th key={assName} className="py-3 px-3 text-center min-w-[110px] border-l border-slate-200 font-medium">
                          <span className="block truncate font-semibold text-slate-800" title={assName}>
                            {assName}
                          </span>
                        </th>
                      ))}

                      <th className="py-3 px-4 text-center min-w-[100px] border-l-2 border-slate-300 bg-slate-100 font-bold text-slate-900">
                        Điểm TB
                      </th>
                      <th className="py-3 px-4 text-center min-w-[100px] bg-slate-100 font-bold text-slate-900">
                        Xếp loại
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classStudents.map((student, idx) => {
                      const studentGrades = data.grades.filter((g) => g.studentId === student.id);
                      const avg = calculateAverageGrade(studentGrades);
                      const rankInfo = getGradeRank(avg);

                      return (
                        <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-3 text-center text-slate-400 font-mono sticky left-0 bg-white">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3 font-mono font-semibold text-slate-600 sticky left-12 bg-white">
                            {student.code}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-slate-900 sticky left-40 bg-white truncate">
                            {student.fullName}
                          </td>

                          {/* Matrix score cells with direct editing blur support */}
                          {distinctAssessments.map((assName) => {
                            const gradeRecord = studentGrades.find((g) => g.assessmentName === assName);

                            return (
                              <td key={assName} className="py-2 px-3 text-center border-l border-slate-100">
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="10"
                                  defaultValue={gradeRecord !== undefined ? gradeRecord.score : ''}
                                  placeholder="—"
                                  onBlur={(e) =>
                                    handleMatrixCellBlur(student.id, assName, gradeRecord, e.target.value)
                                  }
                                  className={`w-14 text-center py-1 rounded-md text-xs font-mono font-bold border transition-colors ${
                                    gradeRecord !== undefined
                                      ? gradeRecord.score >= 8
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                        : gradeRecord.score >= 6.5
                                        ? 'bg-sky-50 text-sky-800 border-sky-200'
                                        : gradeRecord.score >= 5
                                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                                        : 'bg-rose-50 text-rose-800 border-rose-200'
                                      : 'bg-slate-50 text-slate-400 border-dashed border-slate-300 hover:border-slate-400'
                                  } focus:bg-white focus:border-blue-500 focus:outline-hidden`}
                                />
                              </td>
                            );
                          })}

                          {/* Average Score */}
                          <td className="py-2.5 px-4 text-center border-l-2 border-slate-300 bg-slate-50/60 font-mono font-bold text-sm text-slate-900">
                            {avg !== null ? avg.toFixed(1) : '—'}
                          </td>

                          {/* Rank Label */}
                          <td className="py-2.5 px-4 text-center bg-slate-50/60">
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${rankInfo.badgeClass}`}>
                              {rankInfo.rank}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* List Search and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm theo tên bài kiểm tra, tên học sinh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Lớp:</span>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
              >
                <option value="all">Tất cả lớp</option>
                {data.classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}
                  </option>
                ))}
              </select>

              <span className="text-xs font-medium text-slate-500">Loại:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
              >
                <option value="all">Tất cả</option>
                <option value="oral">Kiểm tra miệng</option>
                <option value="quiz_15m">15 phút</option>
                <option value="test_45m">45 phút (1 tiết)</option>
                <option value="midterm">Giữa kỳ</option>
                <option value="final">Cuối kỳ</option>
                <option value="project">Dự án</option>
              </select>
            </div>
          </div>

          {filteredGrades.length === 0 ? (
            <EmptyState
              icon={Award}
              title="Không tìm thấy điểm số"
              description="Không có bản ghi điểm nào phù hợp với bộ lọc tìm kiếm."
              actionLabel="Nhập điểm mới"
              onAction={handleOpenAdd}
            />
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Học sinh</th>
                      <th className="py-3 px-4">Lớp</th>
                      <th className="py-3 px-4">Tên bài kiểm tra</th>
                      <th className="py-3 px-4">Loại đánh giá</th>
                      <th className="py-3 px-4">Ngày chấm</th>
                      <th className="py-3 px-4 font-mono">Hệ số</th>
                      <th className="py-3 px-4 font-mono">Điểm số</th>
                      <th className="py-3 px-4">Nhận xét</th>
                      <th className="py-3 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredGrades.map((g) => {
                      const student = data.students.find((s) => s.id === g.studentId);
                      const cls = data.classes.find((c) => c.id === g.classId);

                      return (
                        <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-900 block">{student?.fullName || '—'}</span>
                            <span className="text-[11px] font-mono text-slate-400">{student?.code}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-700">{cls?.code || '—'}</td>
                          <td className="py-3 px-4 font-medium text-slate-800">{g.assessmentName}</td>
                          <td className="py-3 px-4 text-slate-600">
                            {g.type === 'oral'
                              ? 'Miệng'
                              : g.type === 'quiz_15m'
                              ? '15 phút'
                              : g.type === 'test_45m'
                              ? '45 phút'
                              : g.type === 'midterm'
                              ? 'Giữa kỳ'
                              : g.type === 'final'
                              ? 'Cuối kỳ'
                              : 'Dự án'}
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-mono">{formatDate(g.date)}</td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-700">{g.weight}</td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            <span className="text-sm">{g.score}</span>
                            <span className="text-[11px] text-slate-400">/{g.maxScore}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 italic line-clamp-1">
                            {g.comment ? `"${g.comment}"` : '—'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleOpenEdit(g)}
                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                                title="Sửa điểm"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteTargetGrade(g)}
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                                title="Xóa điểm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Grade Modal */}
      {(isAddModalOpen || editingGrade) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingGrade ? 'Chỉnh sửa điểm số' : 'Nhập điểm kiểm tra mới'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingGrade(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lớp học <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.classId}
                    onChange={(e) => {
                      const newCls = e.target.value;
                      const firstStudent = data.students.find((s) => s.classId === newCls);
                      setFormData({
                        ...formData,
                        classId: newCls,
                        studentId: firstStudent?.id || '',
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    {data.classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.code} – {cls.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Học sinh <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    {data.students
                      .filter((s) => s.classId === formData.classId)
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.fullName} ({s.code})
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên bài kiểm tra / Hoạt động đánh giá <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.assessmentName}
                  onChange={(e) => setFormData({ ...formData, assessmentName: e.target.value })}
                  placeholder="Kiểm tra 15 phút: Hàm số bậc hai"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Loại đánh giá
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as AssessmentType })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="oral">Kiểm tra miệng</option>
                    <option value="quiz_15m">Kiểm tra 15 phút</option>
                    <option value="test_45m">Kiểm tra 45 phút (1 tiết)</option>
                    <option value="midterm">Kiểm tra Giữa kỳ</option>
                    <option value="final">Kiểm tra Cuối kỳ</option>
                    <option value="project">Dự án / Thực hành</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày đánh giá
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm số <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max={formData.maxScore}
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm tối đa
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.maxScore}
                    onChange={(e) => setFormData({ ...formData, maxScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hệ số điểm
                  </label>
                  <select
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white font-mono"
                  >
                    <option value={1}>Hệ số 1</option>
                    <option value={2}>Hệ số 2</option>
                    <option value={3}>Hệ số 3</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nhận xét bài kiểm tra
                </label>
                <input
                  type="text"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Làm tốt các câu nâng cao, trình bày sạch đẹp..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingGrade(null);
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {editingGrade ? 'Lưu thay đổi' : 'Lưu điểm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTargetGrade && (
        <ConfirmModal
          isOpen={true}
          title="Xác nhận xóa bản ghi điểm?"
          message={`Bạn có chắc muốn xóa điểm kiểm tra "${deleteTargetGrade.assessmentName}" của học sinh? Điểm trung bình của học sinh sẽ được tính toán lại ngay sau khi xóa.`}
          confirmLabel="Xóa điểm"
          isDestructive={true}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetGrade(null)}
        />
      )}
    </div>
  );
};
