import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student, StudentStatus, ClassRoom } from '../../types';
import {
  calculateAverageGrade,
  calculateTaskCompletion,
  studentNeedsAttention,
  getGradeRank,
  formatDate,
  exportToCSV,
} from '../../utils/calculations';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  Flag,
  X,
  Phone,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  MessageSquare,
  Clock,
  Upload,
  FileSpreadsheet,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';
import { exportStudentsToExcelFile } from '../../utils/excelUtils';
import { ImportStudentsExcelModal } from './ImportStudentsExcelModal';

export const StudentsView: React.FC = () => {
  const {
    data,
    addStudent,
    updateStudent,
    deleteStudent,
    batchDeleteStudents,
    deleteClass,
    toggleStudentSupport,
    selectedClassId,
    setSelectedClassId,
    setActiveTab,
  } = useApp();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [supportFilter, setSupportFilter] = useState<'all' | 'needsSupport'>('all');

  // Batch Selection State
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isBatchDeleteModalOpen, setIsBatchDeleteModalOpen] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportExcelModalOpen, setIsImportExcelModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deleteTargetStudent, setDeleteTargetStudent] = useState<Student | null>(null);

  // Class Deletion State within Students View
  const [deleteTargetClass, setDeleteTargetClass] = useState<ClassRoom | null>(null);
  const [isSelectClassToDeleteModalOpen, setIsSelectClassToDeleteModalOpen] = useState(false);
  const [confirmCascadeStudentDelete, setConfirmCascadeStudentDelete] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    code: string;
    fullName: string;
    classId: string;
    birthDate: string;
    gender: 'Nam' | 'Nữ';
    parentContact: string;
    status: StudentStatus;
    needsSupport: boolean;
    notes: string;
  }>({
    code: '',
    fullName: '',
    classId: data.classes[0]?.id || '',
    birthDate: '2010-01-01',
    gender: 'Nam',
    parentContact: '',
    status: 'active',
    needsSupport: false,
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      code: 'NS' + (Math.floor(Math.random() * 9000) + 1000),
      fullName: '',
      classId: selectedClassId !== 'all' ? selectedClassId : data.classes[0]?.id || '',
      birthDate: '2010-01-01',
      gender: 'Nam',
      parentContact: '',
      status: 'active',
      needsSupport: false,
      notes: '',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      code: student.code,
      fullName: student.fullName,
      classId: student.classId,
      birthDate: student.birthDate,
      gender: student.gender,
      parentContact: student.parentContact,
      status: student.status,
      needsSupport: student.needsSupport,
      notes: student.notes,
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.code.trim()) return;

    // Check duplicate code
    const duplicate = data.students.find(
      (s) => s.code.toLowerCase() === formData.code.trim().toLowerCase() && s.id !== editingStudent?.id
    );
    if (duplicate) {
      alert(`Mã học sinh "${formData.code}" đã tồn tại. Vui lòng chọn mã khác.`);
      return;
    }

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        code: formData.code.trim(),
        fullName: formData.fullName.trim(),
        classId: formData.classId,
        birthDate: formData.birthDate,
        gender: formData.gender,
        parentContact: formData.parentContact.trim(),
        status: formData.status,
        needsSupport: formData.needsSupport,
        notes: formData.notes.trim(),
      });
      setEditingStudent(null);
    } else {
      addStudent({
        code: formData.code.trim(),
        fullName: formData.fullName.trim(),
        classId: formData.classId,
        birthDate: formData.birthDate,
        gender: formData.gender,
        parentContact: formData.parentContact.trim(),
        status: formData.status,
        needsSupport: formData.needsSupport,
        notes: formData.notes.trim(),
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetStudent) return;
    deleteStudent(deleteTargetStudent.id);
    setDeleteTargetStudent(null);
  };

  const handleExportCSV = () => {
    const headers = ['Mã HS', 'Họ và Tên', 'Lớp', 'Giới tính', 'Ngày sinh', 'Liên hệ', 'Trạng thái', 'Điểm TB', 'Cần hỗ trợ'];
    const rows = filteredStudents.map((s) => {
      const cls = data.classes.find((c) => c.id === s.classId);
      const studentGrades = data.grades.filter((g) => g.studentId === s.id);
      const avg = calculateAverageGrade(studentGrades);
      return [
        s.code,
        s.fullName,
        cls ? cls.code : '',
        s.gender,
        s.birthDate,
        s.parentContact,
        s.status === 'active' ? 'Đang học' : s.status === 'attention' ? 'Cần theo dõi' : s.status === 'transferred' ? 'Chuyển trường' : 'Nghỉ học',
        avg !== null ? avg.toFixed(1) : '',
        s.needsSupport ? 'Có' : 'Không',
      ];
    });
    exportToCSV(`Danh_sach_hoc_sinh_Ngoi_Sao_${new Date().toISOString().split('T')[0]}`, headers, rows);
  };

  const handleExportExcel = () => {
    exportStudentsToExcelFile(
      filteredStudents,
      data.classes,
      data.grades,
      calculateAverageGrade,
      getGradeRank
    );
  };

  // Filter logic
  const filteredStudents = data.students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClassId === 'all' || student.classId === selectedClassId;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesSupport = supportFilter === 'all' || student.needsSupport;

    return matchesSearch && matchesClass && matchesStatus && matchesSupport;
  });

  // Batch Selection Computations & Handlers
  const isAllSelected =
    filteredStudents.length > 0 &&
    filteredStudents.every((s) => selectedStudentIds.includes(s.id));

  const isSomeSelected =
    selectedStudentIds.length > 0 && !isAllSelected;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      const filteredIds = new Set(filteredStudents.map((s) => s.id));
      setSelectedStudentIds((prev) => prev.filter((id) => !filteredIds.has(id)));
    } else {
      const newIds = new Set(selectedStudentIds);
      filteredStudents.forEach((s) => newIds.add(s.id));
      setSelectedStudentIds(Array.from(newIds));
    }
  };

  const handleToggleSelectStudent = (id: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmBatchDelete = () => {
    if (selectedStudentIds.length === 0) return;
    batchDeleteStudents(selectedStudentIds);
    setSelectedStudentIds([]);
    setIsBatchDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Hồ sơ học sinh</h1>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              · {filteredStudents.length} học sinh
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý danh sách học sinh, thông tin cá nhân và tình trạng học tập
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Delete Class Command Button */}
          <button
            onClick={() => {
              if (selectedClassId !== 'all') {
                const cls = data.classes.find((c) => c.id === selectedClassId);
                if (cls) {
                  setDeleteTargetClass(cls);
                  setConfirmCascadeStudentDelete(false);
                }
              } else {
                setIsSelectClassToDeleteModalOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title={
              selectedClassId !== 'all'
                ? `Xóa lớp ${data.classes.find((c) => c.id === selectedClassId)?.code || ''} khỏi hệ thống`
                : 'Chọn một lớp học để xóa khỏi hệ thống'
            }
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>
              {selectedClassId !== 'all'
                ? `Xóa lớp ${data.classes.find((c) => c.id === selectedClassId)?.code || ''}`
                : 'Xóa lớp học'}
            </span>
          </button>

          {/* Import Excel Button */}
          <button
            onClick={() => setIsImportExcelModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Tải lên danh sách học sinh từ tệp Excel (.xlsx, .xls) hoặc CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tải danh sách bằng Excel</span>
          </button>

          {/* Export Excel Button */}
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Xuất danh sách ra tệp Microsoft Excel định dạng .xlsx"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất Excel</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Xuất tệp CSV"
          >
            <span>CSV</span>
          </button>

          {/* Add Student Button */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm học sinh mới</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo họ tên hoặc mã học sinh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Class filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <span className="text-xs font-medium text-slate-500">Lớp:</span>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả các lớp</option>
              {data.classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.code}
                </option>
              ))}
            </select>
            {selectedClassId !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  const cls = data.classes.find((c) => c.id === selectedClassId);
                  if (cls) {
                    setDeleteTargetClass(cls);
                    setConfirmCascadeStudentDelete(false);
                  }
                }}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer ml-0.5"
                title={`Xóa lớp ${data.classes.find((c) => c.id === selectedClassId)?.code || ''}`}
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <span className="text-xs font-medium text-slate-500">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-medium text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang học</option>
              <option value="attention">Cần theo dõi</option>
              <option value="transferred">Chuyển trường</option>
              <option value="inactive">Nghỉ học</option>
            </select>
          </div>

          {/* Support Toggle Filter */}
          <button
            onClick={() => setSupportFilter(supportFilter === 'all' ? 'needsSupport' : 'all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              supportFilter === 'needsSupport'
                ? 'bg-rose-100 text-rose-800 font-semibold border border-rose-200'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${supportFilter === 'needsSupport' ? 'text-rose-600 fill-rose-600' : 'text-slate-400'}`} />
            <span>Cần hỗ trợ</span>
          </button>
        </div>
      </div>

      {/* Batch Action Bar */}
      {selectedStudentIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 shadow-2xs animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-950 font-mono text-xs px-2.5 py-1 bg-amber-100 rounded-lg border border-amber-200/60">
              Đã chọn: {selectedStudentIds.length} học sinh
            </span>
            <button
              type="button"
              onClick={() => setSelectedStudentIds([])}
              className="text-amber-800 hover:text-amber-950 underline font-medium cursor-pointer"
            >
              Bỏ chọn tất cả
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const selectedStudents = data.students.filter((s) => selectedStudentIds.includes(s.id));
                exportStudentsToExcelFile(
                  selectedStudents,
                  data.classes,
                  data.grades,
                  calculateAverageGrade,
                  getGradeRank
                );
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 rounded-lg font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Excel ({selectedStudentIds.length} em)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBatchDeleteModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa hàng loạt ({selectedStudentIds.length} học sinh)</span>
            </button>
          </div>
        </div>
      )}

      {/* Students Table */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Không tìm thấy học sinh"
          description={
            data.students.length === 0
              ? 'Chưa có học sinh nào trong hệ thống.'
              : 'Không có học sinh nào phù hợp với điều kiện tìm kiếm và bộ lọc.'
          }
          actionLabel={data.students.length === 0 ? 'Thêm học sinh đầu tiên' : undefined}
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeSelected;
                      }}
                      onChange={handleToggleSelectAll}
                      className="rounded-xs text-blue-600 focus:ring-blue-500 cursor-pointer"
                      title={isAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả học sinh đang hiển thị'}
                    />
                  </th>
                  <th className="py-3 px-3 w-12 text-center">STT</th>
                  <th className="py-3 px-4">Mã HS</th>
                  <th className="py-3 px-4">Họ và Tên</th>
                  <th className="py-3 px-4">Lớp</th>
                  <th className="py-3 px-4">Giới tính</th>
                  <th className="py-3 px-4">Ngày sinh</th>
                  <th className="py-3 px-4">Điểm TB</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-center">Cờ hỗ trợ</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student, idx) => {
                  const studentClass = data.classes.find((c) => c.id === student.classId);
                  const studentGrades = data.grades.filter((g) => g.studentId === student.id);
                  const avg = calculateAverageGrade(studentGrades);
                  const rankInfo = getGradeRank(avg);
                  const isSelected = selectedStudentIds.includes(student.id);

                  return (
                    <tr
                      key={student.id}
                      className={`transition-colors group cursor-default ${
                        isSelected ? 'bg-amber-50/50 hover:bg-amber-50/80' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectStudent(student.id)}
                          className="rounded-xs text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      <td className="py-3 px-3 text-center text-slate-400 font-mono">
                        {idx + 1}
                      </td>

                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                        {student.code}
                      </td>

                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <button
                          onClick={() => setViewingStudent(student)}
                          className="hover:text-blue-600 hover:underline text-left cursor-pointer font-semibold"
                        >
                          {student.fullName}
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                          {studentClass?.code || '—'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-600">{student.gender}</td>

                      <td className="py-3 px-4 text-slate-500 font-mono">
                        {formatDate(student.birthDate)}
                      </td>

                      <td className="py-3 px-4 font-mono font-bold">
                        {avg !== null ? (
                          <span className={`px-2 py-0.5 rounded-sm ${rankInfo.badgeClass}`}>
                            {avg.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">Chưa có</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-sm ${
                            student.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : student.status === 'attention'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {student.status === 'active'
                            ? 'Đang học'
                            : student.status === 'attention'
                            ? 'Cần theo dõi'
                            : student.status === 'transferred'
                            ? 'Chuyển trường'
                            : 'Nghỉ học'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => toggleStudentSupport(student.id)}
                          className="p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                          title={student.needsSupport ? 'Bỏ cờ hỗ trợ' : 'Đánh dấu cần hỗ trợ'}
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

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingStudent(student)}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                            title="Xem hồ sơ chi tiết"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(student)}
                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                            title="Chỉnh sửa thông tin"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTargetStudent(student)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            title="Xóa học sinh"
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

      {/* Add / Edit Student Modal */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingStudent ? `Chỉnh sửa hồ sơ: ${editingStudent.fullName}` : 'Thêm học sinh mới'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStudent(null);
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
                    Mã học sinh <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="NS-1001"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lớp phân bổ <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.classId}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên học sinh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Minh Khang"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value as 'Nam' | 'Nữ' })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Thông tin liên hệ phụ huynh
                  </label>
                  <input
                    type="text"
                    value={formData.parentContact}
                    onChange={(e) => setFormData({ ...formData, parentContact: e.target.value })}
                    placeholder="0912.xxx.xxx (Bố/Mẹ)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trạng thái học tập
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as StudentStatus })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="active">Đang học</option>
                    <option value="attention">Cần theo dõi</option>
                    <option value="transferred">Chuyển trường</option>
                    <option value="inactive">Nghỉ học</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="needsSupportCheckbox"
                  checked={formData.needsSupport}
                  onChange={(e) => setFormData({ ...formData, needsSupport: e.target.checked })}
                  className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="needsSupportCheckbox" className="text-xs text-slate-700 cursor-pointer">
                  Đánh dấu cờ học sinh cần hỗ trợ đặc biệt (hiển thị trên trang Tổng quan)
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ghi chú riêng của giáo viên
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ghi chú về học lực, tính cách, sở thích học tập..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {editingStudent ? 'Lưu thay đổi' : 'Thêm học sinh'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comprehensive Student Profile Drawer / Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Profile Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-base shadow-2xs border border-blue-200">
                  {viewingStudent.fullName.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{viewingStudent.fullName}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {viewingStudent.code}
                    </span>
                    {viewingStudent.needsSupport && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
                        <Flag className="w-3 h-3 fill-rose-600" /> Cần hỗ trợ
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span>Lớp: {data.classes.find((c) => c.id === viewingStudent.classId)?.name || 'Chưa xếp lớp'}</span>
                      {(() => {
                        const studentCls = data.classes.find((c) => c.id === viewingStudent.classId);
                        if (!studentCls) return null;
                        return (
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteTargetClass(studentCls);
                              setConfirmCascadeStudentDelete(false);
                            }}
                            className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:underline inline-flex items-center gap-0.5 cursor-pointer ml-1"
                            title={`Xóa lớp ${studentCls.code}`}
                          >
                            <Trash2 className="w-3 h-3 text-rose-600" />
                            <span>Xóa lớp</span>
                          </button>
                        );
                      })()}
                    </span>
                    <span>·</span>
                    <span>Giới tính: {viewingStudent.gender}</span>
                    <span>·</span>
                    <span>Sinh ngày: {formatDate(viewingStudent.birthDate)}</span>
                    {viewingStudent.parentContact && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" /> {viewingStudent.parentContact}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setViewingStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Body with History */}
            <div className="mt-4 overflow-y-auto space-y-6 pr-1">
              {/* Teacher Private Notes */}
              {viewingStudent.notes && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900 block mb-0.5">Ghi chú của cô:</span>
                  {viewingStudent.notes}
                </div>
              )}

              {/* 1. Lịch sử điểm số */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Lịch sử điểm số</span>
                  </h4>
                  {(() => {
                    const sGrades = data.grades.filter((g) => g.studentId === viewingStudent.id);
                    const avg = calculateAverageGrade(sGrades);
                    return (
                      <span className="text-xs font-semibold text-slate-700">
                        Điểm trung bình: <span className="font-mono text-blue-700 font-bold">{avg !== null ? avg.toFixed(1) : 'Chưa có'}</span>
                      </span>
                    );
                  })()}
                </div>

                {data.grades.filter((g) => g.studentId === viewingStudent.id).length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center border rounded-lg bg-slate-50">
                    Chưa có bài kiểm tra nào được ghi nhận cho học sinh này.
                  </p>
                ) : (
                  <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                    {data.grades
                      .filter((g) => g.studentId === viewingStudent.id)
                      .map((g) => (
                        <div key={g.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
                          <div>
                            <span className="font-semibold text-slate-900">{g.assessmentName}</span>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                              <span>Ngày: {formatDate(g.date)}</span>
                              <span>·</span>
                              <span>Hệ số {g.weight}</span>
                              {g.comment && (
                                <>
                                  <span>·</span>
                                  <span className="italic text-slate-600">"{g.comment}"</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold font-mono text-slate-900">
                              {g.score}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">/{g.maxScore}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* 2. Nhiệm vụ và trạng thái nộp bài */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Nhiệm vụ học tập đã giao</span>
                </h4>

                {data.taskSubmissions.filter((ts) => ts.studentId === viewingStudent.id).length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center border rounded-lg bg-slate-50">
                    Chưa có nhiệm vụ nào được giao cho học sinh.
                  </p>
                ) : (
                  <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                    {data.taskSubmissions
                      .filter((ts) => ts.studentId === viewingStudent.id)
                      .map((ts) => {
                        const task = data.tasks.find((t) => t.id === ts.taskId);
                        return (
                          <div key={ts.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
                            <div>
                              <span className="font-semibold text-slate-900">
                                {task ? task.title : 'Nhiệm vụ'}
                              </span>
                              <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                                <span>Hạn: {formatDate(task?.dueDate)}</span>
                                {ts.submissionDate && <span>· Nộp ngày: {formatDate(ts.submissionDate)}</span>}
                                {ts.feedback && <span className="text-slate-600">· Nhận xét: {ts.feedback}</span>}
                              </div>
                            </div>
                            <div>
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                                  ts.status === 'graded'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : ts.status === 'submitted'
                                    ? 'bg-sky-50 text-sky-700'
                                    : ts.status === 'late'
                                    ? 'bg-amber-50 text-amber-700'
                                    : 'bg-rose-50 text-rose-700'
                                }`}
                              >
                                {ts.status === 'graded'
                                  ? `Đã chấm (${ts.score ?? '—'} đ)`
                                  : ts.status === 'submitted'
                                  ? 'Đã nộp bài'
                                  : ts.status === 'late'
                                  ? 'Nộp muộn'
                                  : 'Chưa nộp'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* 3. Lịch sử nhận xét của giáo viên */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-sky-600" />
                  <span>Nhận xét quá trình rèn luyện</span>
                </h4>

                {data.feedbacks.filter((f) => f.studentId === viewingStudent.id).length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center border rounded-lg bg-slate-50">
                    Chưa có nhận xét nào được lưu cho em {viewingStudent.fullName}.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.feedbacks
                      .filter((f) => f.studentId === viewingStudent.id)
                      .map((f) => (
                        <div key={f.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{f.teacher}</span>
                            <span className="text-slate-500 font-mono text-[11px]">{formatDate(f.date)}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{f.content}</p>
                          {f.strengths && (
                            <p className="text-emerald-700">
                              <span className="font-semibold">Điểm mạnh:</span> {f.strengths}
                            </p>
                          )}
                          {f.improvements && (
                            <p className="text-amber-700">
                              <span className="font-semibold">Cần rèn luyện:</span> {f.improvements}
                            </p>
                          )}
                          {f.recommendations && (
                            <p className="text-sky-700">
                              <span className="font-semibold">Biện pháp hỗ trợ:</span> {f.recommendations}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Footer */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setViewingStudent(null);
                  setActiveTab('feedback');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                + Ghi nhận xét mới cho em này
              </button>

              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Đóng hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTargetStudent && (
        <ConfirmModal
          isOpen={true}
          title={`Xóa học sinh: ${deleteTargetStudent.fullName}?`}
          message={`Bạn có chắc muốn xóa học sinh "${deleteTargetStudent.fullName}" (${deleteTargetStudent.code})? Mọi bản ghi điểm và bài nộp liên quan của học sinh này sẽ bị xóa khỏi hệ thống.`}
          confirmLabel="Xóa học sinh"
          isDestructive={true}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetStudent(null)}
        />
      )}

      {/* Excel Import Modal */}
      <ImportStudentsExcelModal
        isOpen={isImportExcelModalOpen}
        onClose={() => setIsImportExcelModalOpen(false)}
      />

      {/* Batch Delete Confirmation Modal */}
      {isBatchDeleteModalOpen && (
        <ConfirmModal
          isOpen={true}
          title={`Xác nhận xóa hàng loạt ${selectedStudentIds.length} học sinh?`}
          message={`CẢNH BÁO NGUY HIỂM: Bạn đang chuẩn bị xóa vĩnh viễn ${selectedStudentIds.length} học sinh đã chọn. Toàn bộ điểm số, bài nộp nhiệm vụ và nhận xét liên quan của các học sinh này sẽ bị xóa sạch khỏi hệ thống để đảm bảo tính đồng bộ. Thao tác này KHÔNG THỂ HOÀN TÁC.`}
          confirmLabel={`Xóa vĩnh viễn ${selectedStudentIds.length} học sinh`}
          cancelLabel="Hủy bỏ"
          isDestructive={true}
          onConfirm={handleConfirmBatchDelete}
          onCancel={() => setIsBatchDeleteModalOpen(false)}
        />
      )}

      {/* Modal Chọn lớp học muốn xóa (khi đang chọn 'Tất cả các lớp') */}
      {isSelectClassToDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Chọn lớp học muốn xóa</h3>
                  <p className="text-xs text-slate-500">Danh sách các lớp học hiện có trong hệ thống</p>
                </div>
              </div>
              <button
                onClick={() => setIsSelectClassToDeleteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 overflow-y-auto space-y-2 pr-1 max-h-[60vh]">
              {data.classes.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">
                  Hiện chưa có lớp học nào trong hệ thống.
                </p>
              ) : (
                data.classes.map((cls) => {
                  const studentCount = data.students.filter((s) => s.classId === cls.id).length;
                  return (
                    <div
                      key={cls.id}
                      className="p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg flex items-center justify-between gap-3 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-blue-900 bg-blue-100 px-2 py-0.5 rounded-sm font-mono">
                            {cls.code}
                          </span>
                          <span className="font-semibold text-xs text-slate-900">{cls.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Khối {cls.grade} · Môn: {cls.subject} · Sĩ số: <strong className="text-slate-700">{studentCount} học sinh</strong>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsSelectClassToDeleteModalOpen(false);
                          setDeleteTargetClass(cls);
                          setConfirmCascadeStudentDelete(false);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-white hover:bg-rose-50 border border-rose-300 rounded-lg transition-colors cursor-pointer shrink-0 shadow-2xs"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>Xóa lớp</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSelectClassToDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Xóa lớp học & Dữ liệu liên quan */}
      {deleteTargetClass && (() => {
        const classStudents = data.students.filter((s) => s.classId === deleteTargetClass.id);
        const classGrades = data.grades.filter((g) => g.classId === deleteTargetClass.id);
        const studentCount = classStudents.length;
        const gradeCount = classGrades.length;
        const hasData = studentCount > 0 || gradeCount > 0;

        const handleExecuteDeleteClass = () => {
          if (hasData && !confirmCascadeStudentDelete) {
            alert('Vui lòng đánh dấu xác nhận nếu bạn muốn xóa lớp kèm theo toàn bộ học sinh.');
            return;
          }

          deleteClass(deleteTargetClass.id, hasData ? confirmCascadeStudentDelete : false);
          setDeleteTargetClass(null);
          setConfirmCascadeStudentDelete(false);
        };

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 p-6 overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Xác nhận xóa lớp học: {deleteTargetClass.code}?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {deleteTargetClass.name} – Khối {deleteTargetClass.grade} (Năm học {deleteTargetClass.schoolYear})
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                {/* Thống kê dữ liệu trong lớp */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 gap-2 font-mono">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Sĩ số học sinh:</span>
                    <strong className="text-slate-800 text-sm">{studentCount} học sinh</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Bản ghi điểm đã nhập:</span>
                    <strong className="text-slate-800 text-sm">{gradeCount} đầu điểm</strong>
                  </div>
                </div>

                {hasData ? (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 space-y-2.5">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="block font-bold">CẢNH BÁO DỮ LIỆU LIÊN QUAN:</strong>
                        Lớp học này hiện đang chứa <strong className="font-bold underline">{studentCount} học sinh</strong> và <strong className="font-bold underline">{gradeCount} bài kiểm tra</strong>.
                        Theo quy định quản lý giáo dục, việc xóa lớp học sẽ xóa các hồ sơ học sinh thuộc lớp này khỏi hệ thống.
                      </div>
                    </div>

                    <label className="flex items-start gap-2 p-2.5 bg-white rounded-md border border-rose-200 cursor-pointer text-xs font-semibold text-rose-950 mt-1 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={confirmCascadeStudentDelete}
                        onChange={(e) => setConfirmCascadeStudentDelete(e.target.checked)}
                        className="mt-0.5 rounded-xs text-rose-600 focus:ring-rose-500 cursor-pointer"
                      />
                      <span>
                        Tôi hiểu và xác nhận muốn xóa vĩnh viễn lớp {deleteTargetClass.code} cùng toàn bộ {studentCount} học sinh và {gradeCount} điểm số liên quan.
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lớp học này hiện không có học sinh nào. Việc xóa lớp sẽ diễn ra an toàn ngay lập tức.</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTargetClass(null);
                    setConfirmCascadeStudentDelete(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  onClick={handleExecuteDeleteClass}
                  disabled={hasData && !confirmCascadeStudentDelete}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
                    hasData && !confirmCascadeStudentDelete
                      ? 'bg-rose-300 text-white cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{hasData ? 'Xác nhận xóa lớp & dữ liệu' : 'Xóa lớp học'}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
