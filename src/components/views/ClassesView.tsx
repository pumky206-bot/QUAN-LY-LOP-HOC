import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassRoom, SchoolGrade } from '../../types';
import {
  calculateAverageGrade,
  calculateTaskCompletion,
} from '../../utils/calculations';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Users,
  BookOpen,
  CheckSquare,
  Award,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  X,
  AlertCircle,
  Building,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';

export const ClassesView: React.FC = () => {
  const { data, addClass, updateClass, deleteClass, setActiveTab, setSelectedClassId } = useApp();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);
  const [viewingClass, setViewingClass] = useState<ClassRoom | null>(null);
  const [deleteTargetClass, setDeleteTargetClass] = useState<ClassRoom | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    code: string;
    name: string;
    grade: SchoolGrade;
    schoolYear: string;
    subject: string;
    teacher: string;
    room: string;
    notes: string;
  }>({
    code: '',
    name: '',
    grade: 10,
    schoolYear: data.settings.currentSchoolYear,
    subject: 'Tin học',
    teacher: data.settings.teacherName,
    room: '',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      grade: 10,
      schoolYear: data.settings.currentSchoolYear,
      subject: 'Tin học',
      teacher: data.settings.teacherName,
      room: '',
      notes: '',
    });
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (cls: ClassRoom) => {
    setEditingClass(cls);
    setFormData({
      code: cls.code,
      name: cls.name,
      grade: cls.grade,
      schoolYear: cls.schoolYear,
      subject: cls.subject,
      teacher: cls.teacher,
      room: cls.room,
      notes: cls.notes,
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.name.trim()) return;

    if (editingClass) {
      updateClass(editingClass.id, {
        code: formData.code.trim(),
        name: formData.name.trim(),
        grade: formData.grade,
        schoolYear: formData.schoolYear.trim(),
        subject: formData.subject.trim(),
        teacher: formData.teacher.trim(),
        room: formData.room.trim(),
        notes: formData.notes.trim(),
      });
      setEditingClass(null);
    } else {
      addClass({
        code: formData.code.trim(),
        name: formData.name.trim(),
        grade: formData.grade,
        schoolYear: formData.schoolYear.trim(),
        subject: formData.subject.trim(),
        teacher: formData.teacher.trim(),
        room: formData.room.trim(),
        notes: formData.notes.trim(),
      });
      setIsCreateModalOpen(false);
    }
    resetForm();
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetClass) return;
    deleteClass(deleteTargetClass.id);
    setDeleteTargetClass(null);
  };

  // Filtered classes list
  const filteredClasses = data.classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = gradeFilter === 'all' || cls.grade.toString() === gradeFilter;

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý lớp học</h1>
          <p className="text-xs text-slate-500 mt-1">
            Danh sách các lớp THCS & THPT do Cô {data.settings.teacherName} phụ trách
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm lớp học mới</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo mã lớp, tên lớp hoặc môn phụ trách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-600">Khối:</span>
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
          >
            <option value="all">Tất cả khối</option>
            <option value="6">Khối 6 (THCS)</option>
            <option value="7">Khối 7 (THCS)</option>
            <option value="8">Khối 8 (THCS)</option>
            <option value="9">Khối 9 (THCS)</option>
            <option value="10">Khối 10 (THPT)</option>
            <option value="11">Khối 11 (THPT)</option>
            <option value="12">Khối 12 (THPT)</option>
          </select>
        </div>
      </div>

      {/* Classes Grid */}
      {filteredClasses.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="Không tìm thấy lớp học"
          description={
            data.classes.length === 0
              ? 'Chưa có lớp học nào trong hệ thống.'
              : 'Không có lớp học nào phù hợp với điều kiện tìm kiếm và bộ lọc.'
          }
          actionLabel={data.classes.length === 0 ? 'Thêm lớp học đầu tiên' : undefined}
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((cls) => {
            // Computed live metrics for each class
            const studentsInClass = data.students.filter((s) => s.classId === cls.id);
            const classGrades = data.grades.filter((g) => g.classId === cls.id);
            const classAvg = calculateAverageGrade(classGrades);
            const classLessons = data.lessons.filter((l) => l.classIds.includes(cls.id));
            const classTasks = data.tasks.filter((t) => t.classIds.includes(cls.id));
            const classSubmissions = data.taskSubmissions.filter((ts) => ts.classId === cls.id);
            const completion = calculateTaskCompletion(classSubmissions, classTasks);

            return (
              <div
                key={cls.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of Class Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-800 flex items-center justify-center font-bold text-sm">
                        {cls.code}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {cls.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-semibold text-slate-700">Khối {cls.grade}</span>
                          <span aria-hidden="true">·</span>
                          <span>{cls.subject}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(cls)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Chỉnh sửa thông tin lớp"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetClass(cls)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        title="Xóa lớp học"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Room & Teacher info */}
                  {cls.room && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cls.room}</span>
                      <span aria-hidden="true">·</span>
                      <span>GV: {cls.teacher}</span>
                    </div>
                  )}

                  {/* Class Notes */}
                  {cls.notes && (
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-md">
                      {cls.notes}
                    </p>
                  )}

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-[11px] text-slate-500 block">Sĩ số</span>
                      <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                        {studentsInClass.length} em
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-[11px] text-slate-500 block">Điểm TB</span>
                      <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                        {classAvg !== null ? classAvg.toFixed(1) : '—'}
                      </span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-[11px] text-slate-500 block">Tỷ lệ nộp</span>
                      <span className="text-sm font-bold text-blue-700 font-mono tabular-nums">
                        {completion.completionRate}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setViewingClass(cls)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Chi tiết lớp</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedClassId(cls.id);
                      setActiveTab('students');
                    }}
                    className="py-1.5 px-3 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    Học sinh ({studentsInClass.length})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Class Modal */}
      {(isCreateModalOpen || editingClass) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingClass ? `Chỉnh sửa lớp: ${editingClass.code}` : 'Thêm lớp học mới'}
              </h3>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingClass(null);
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
                    Mã lớp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Ví dụ: 10A1, 9B2..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Khối học <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grade: parseInt(e.target.value, 10) as SchoolGrade,
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value={6}>Khối 6 (THCS)</option>
                    <option value={7}>Khối 7 (THCS)</option>
                    <option value={8}>Khối 8 (THCS)</option>
                    <option value={9}>Khối 9 (THCS)</option>
                    <option value={10}>Khối 10 (THPT)</option>
                    <option value={11}>Khối 11 (THPT)</option>
                    <option value={12}>Khối 12 (THPT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên đầy đủ của lớp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Lớp 10A1 (Khối THPT - Tin học 10)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Môn học phụ trách
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Tin học"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Năm học
                  </label>
                  <input
                    type="text"
                    value={formData.schoolYear}
                    onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phòng học
                  </label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="Phòng 301 - Nhà A"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Giáo viên phụ trách
                  </label>
                  <input
                    type="text"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ghi chú về lớp
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Đặc điểm nề nếp, tinh thần học tập..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingClass(null);
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {editingClass ? 'Lưu thay đổi' : 'Tạo lớp học'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Class Detail Drawer / Modal */}
      {viewingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold font-mono">
                    {viewingClass.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{viewingClass.name}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Khối {viewingClass.grade} · Môn {viewingClass.subject} · GV: {viewingClass.teacher} · Năm học {viewingClass.schoolYear}
                </p>
              </div>
              <button
                onClick={() => setViewingClass(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Tabs / Details */}
            <div className="mt-4 overflow-y-auto space-y-4 pr-1">
              {/* Students in this class */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Danh sách học sinh ({data.students.filter((s) => s.classId === viewingClass.id).length} em)
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedClassId(viewingClass.id);
                      setViewingClass(null);
                      setActiveTab('students');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                  >
                    Xem chi tiết tại mục Học sinh &rarr;
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                  {data.students.filter((s) => s.classId === viewingClass.id).length === 0 ? (
                    <div className="p-4 text-center text-slate-500">Chưa có học sinh nào trong lớp này.</div>
                  ) : (
                    data.students
                      .filter((s) => s.classId === viewingClass.id)
                      .map((s, idx) => {
                        const sGrades = data.grades.filter((g) => g.studentId === s.id);
                        const avg = calculateAverageGrade(sGrades);
                        return (
                          <div key={s.id} className="p-2.5 flex items-center justify-between bg-white hover:bg-slate-50">
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</span>
                              <span className="font-semibold text-slate-900">{s.fullName}</span>
                              <span className="text-slate-400 font-mono text-[11px]">({s.code})</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-slate-500">Điểm TB:</span>
                              <span className="font-bold font-mono text-slate-900">
                                {avg !== null ? avg.toFixed(1) : '—'}
                              </span>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </div>

              {/* Related Lessons */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Bài học áp dụng cho lớp
                </h4>
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2 text-xs">
                  {data.lessons.filter((l) => l.classIds.includes(viewingClass.id)).length === 0 ? (
                    <p className="text-slate-500">Chưa có bài học nào được gán cho lớp này.</p>
                  ) : (
                    data.lessons
                      .filter((l) => l.classIds.includes(viewingClass.id))
                      .map((l) => (
                        <div key={l.id} className="flex items-center justify-between bg-white p-2 rounded-md border border-slate-200">
                          <div>
                            <span className="font-semibold text-slate-900">{l.title}</span>
                            <span className="text-slate-500 block text-[11px]">{l.topic}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500">{l.date}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setViewingClass(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetClass && (
        <ConfirmModal
          isOpen={true}
          title={`Xác nhận xóa lớp học: ${deleteTargetClass.code}?`}
          message={`Bạn có chắc muốn xóa lớp "${deleteTargetClass.name}"? Hệ thống sẽ ngăn chặn xóa nếu lớp đang chứa học sinh hoặc dữ liệu điểm để bảo vệ tính toàn vẹn dữ liệu.`}
          confirmLabel="Xóa lớp học"
          isDestructive={true}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetClass(null)}
        />
      )}
    </div>
  );
};
