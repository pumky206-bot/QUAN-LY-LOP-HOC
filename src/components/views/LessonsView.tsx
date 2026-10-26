import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson, LessonStatus, SchoolGrade } from '../../types';
import { formatDate } from '../../utils/calculations';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Copy,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  FileText,
  Calendar,
  X,
  ExternalLink,
  Book,
  RotateCcw,
  Download,
  GraduationCap,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';

const TEXTBOOK_PDFS: Record<number, { name: string; shortName: string; url: string }> = {
  6: {
    name: 'Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống',
    shortName: 'SGK Tin học 6',
    url: '/assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf',
  },
  7: {
    name: 'Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống',
    shortName: 'SGK Tin học 7',
    url: '/assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf',
  },
  8: {
    name: 'Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống',
    shortName: 'SGK Tin học 8',
    url: '/assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf',
  },
  9: {
    name: 'Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống',
    shortName: 'SGK Tin học 9',
    url: '/assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf',
  },
  10: {
    name: 'Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống',
    shortName: 'SGK Tin học 10',
    url: '/assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf',
  },
};

export const LessonsView: React.FC = () => {
  const {
    data,
    addLesson,
    updateLesson,
    deleteLesson,
    duplicateLesson,
    clearAllLessons,
    resetLessonsToCurriculum,
    selectedClassId,
    setSelectedClassId,
    setActiveTab,
  } = useApp();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [viewingLesson, setViewingLesson] = useState<Lesson | null>(null);
  const [deleteTargetLesson, setDeleteTargetLesson] = useState<Lesson | null>(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [activePdfModal, setActivePdfModal] = useState<{ grade: number; name: string; url: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    code: string;
    title: string;
    subject: string;
    grade: SchoolGrade;
    classIds: string[];
    topic: string;
    objectives: string;
    contentSummary: string;
    date: string;
    resources: string;
    status: LessonStatus;
  }>({
    code: '',
    title: '',
    subject: 'Tin học',
    grade: 10,
    classIds: [],
    topic: '',
    objectives: '',
    contentSummary: '',
    date: new Date().toISOString().split('T')[0],
    resources: '',
    status: 'planned',
  });

  const resetForm = () => {
    const defaultGrade = selectedClassId !== 'all' 
      ? data.classes.find(c => c.id === selectedClassId)?.grade || 10
      : 10;
    setFormData({
      code: 'TH' + (Math.floor(Math.random() * 900) + 100),
      title: '',
      subject: `Tin học ${defaultGrade}`,
      grade: defaultGrade,
      classIds: selectedClassId !== 'all' ? [selectedClassId] : [data.classes[0]?.id || ''],
      topic: '',
      objectives: '',
      contentSummary: '',
      date: new Date().toISOString().split('T')[0],
      resources: TEXTBOOK_PDFS[defaultGrade] ? `${TEXTBOOK_PDFS[defaultGrade].name}, File: ${TEXTBOOK_PDFS[defaultGrade].url}` : '',
      status: 'planned',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormData({
      code: lesson.code,
      title: lesson.title,
      subject: lesson.subject,
      grade: lesson.grade,
      classIds: lesson.classIds,
      topic: lesson.topic,
      objectives: lesson.objectives,
      contentSummary: lesson.contentSummary,
      date: lesson.date,
      resources: lesson.resources,
      status: lesson.status,
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.code.trim()) return;

    if (editingLesson) {
      updateLesson(editingLesson.id, {
        code: formData.code.trim(),
        title: formData.title.trim(),
        subject: formData.subject.trim(),
        grade: formData.grade,
        classIds: formData.classIds,
        topic: formData.topic.trim(),
        objectives: formData.objectives.trim(),
        contentSummary: formData.contentSummary.trim(),
        date: formData.date,
        resources: formData.resources.trim(),
        status: formData.status,
      });
      setEditingLesson(null);
    } else {
      addLesson({
        code: formData.code.trim(),
        title: formData.title.trim(),
        subject: formData.subject.trim(),
        grade: formData.grade,
        classIds: formData.classIds,
        topic: formData.topic.trim(),
        objectives: formData.objectives.trim(),
        contentSummary: formData.contentSummary.trim(),
        date: formData.date,
        resources: formData.resources.trim(),
        status: formData.status,
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetLesson) return;
    deleteLesson(deleteTargetLesson.id);
    setDeleteTargetLesson(null);
  };

  // Filter lessons
  const filteredLessons = data.lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = gradeFilter === 'all' || lesson.grade.toString() === gradeFilter;
    const matchesClass =
      selectedClassId === 'all' || lesson.classIds.includes(selectedClassId);
    const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;

    return matchesSearch && matchesGrade && matchesClass && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Kế hoạch bài học</h1>
            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold border border-blue-200">
              {filteredLessons.length} / {data.lessons.length} bài học
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Chương trình Tin học Bộ sách Kết nối tri thức với cuộc sống (Lớp 6, 7, 8, 9, 10) · Cô Bùi Thị Ra
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Clear lessons button */}
          <button
            onClick={() => setIsClearAllModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            title="Xóa toàn bộ dữ liệu bài học hiện tại"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa bài học</span>
          </button>

          {/* Reload curriculum button */}
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Nạp lại 109 bài học chuẩn theo 5 sách giáo khoa Kết nối tri thức"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            <span>Nạp SGK chuẩn</span>
          </button>

          {/* Create new lesson */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo bài học mới</span>
          </button>
        </div>
      </div>

      {/* Textbook Quick Access Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-4 shadow-sm border border-blue-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <Book className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Sách Giáo Khoa Tin Học Đính Kèm (Kết Nối Tri Thức Với Cuộc Sống)
                <span className="text-[10px] bg-blue-400/20 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30">
                  5 Bộ Sách PDF
                </span>
              </h2>
              <p className="text-xs text-blue-200 mt-0.5">
                Bấm vào từng khối lớp để mở và đọc trực tiếp sách giáo khoa điện tử:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {([6, 7, 8, 9, 10] as const).map((grade) => {
              const tb = TEXTBOOK_PDFS[grade];
              return (
                <button
                  key={grade}
                  onClick={() => setActivePdfModal({ grade, name: tb.name, url: tb.url })}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 rounded-lg transition-all cursor-pointer backdrop-blur-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                  <span>Tin học {grade}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo tên bài học, chủ đề, mã bài hoặc môn học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-800 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Class Filter */}
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
                  {cls.code} - {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <span className="text-xs font-medium text-slate-500">Khối:</span>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="text-xs font-medium text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả các khối</option>
              <option value="6">Khối 6 (THCS)</option>
              <option value="7">Khối 7 (THCS)</option>
              <option value="8">Khối 8 (THCS)</option>
              <option value="9">Khối 9 (THCS)</option>
              <option value="10">Khối 10 (THPT)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <span className="text-xs font-medium text-slate-500">Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-medium text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả</option>
              <option value="completed">Đã hoàn thành</option>
              <option value="planned">Đã lên kế hoạch</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lesson Cards Grid */}
      {filteredLessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={data.lessons.length === 0 ? 'Dữ liệu bài học trống' : 'Không tìm thấy bài học'}
          description={
            data.lessons.length === 0
              ? 'Mục Bài học hiện tại chưa có dữ liệu. Bạn có thể bấm "Nạp SGK chuẩn" để tải 109 bài học Tin học Kết nối tri thức hoặc "Tạo bài học mới".'
              : 'Không có bài học nào phù hợp với bộ lọc tìm kiếm hoặc lớp học hiện tại.'
          }
          actionLabel={data.lessons.length === 0 ? 'Nạp lại bài học SGK chuẩn' : undefined}
          onAction={data.lessons.length === 0 ? resetLessonsToCurriculum : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => {
            const assignedClassCodes = data.classes
              .filter((c) => lesson.classIds.includes(c.id))
              .map((c) => c.code)
              .join(', ');

            const relatedTasks = data.tasks.filter((t) => t.lessonId === lesson.id);
            const textbook = TEXTBOOK_PDFS[lesson.grade];

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-sm">
                        {lesson.code}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                        Khối {lesson.grade}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                          lesson.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : lesson.status === 'planned'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {lesson.status === 'completed'
                          ? 'Đã dạy'
                          : lesson.status === 'planned'
                          ? 'Kế hoạch'
                          : 'Nháp'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setViewingLesson(lesson)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-50 cursor-pointer"
                        title="Xem chi tiết bài học"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => duplicateLesson(lesson.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-50 cursor-pointer"
                        title="Tạo bản sao"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(lesson)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-50 cursor-pointer"
                        title="Chỉnh sửa bài học"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetLesson(lesson)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-50 cursor-pointer"
                        title="Xóa bài học"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Topic */}
                  <div className="mt-3">
                    <h3
                      onClick={() => setViewingLesson(lesson)}
                      className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {lesson.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 mt-1 line-clamp-1">
                      {lesson.topic}
                    </p>
                  </div>

                  {/* Objectives summary */}
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed bg-slate-50/70 p-2 rounded-lg border border-slate-100">
                    {lesson.objectives || lesson.contentSummary || 'Chưa ghi mục tiêu cụ thể.'}
                  </p>

                  {/* Textbook Quick Read Button */}
                  {textbook && (
                    <div className="mt-2.5">
                      <button
                        onClick={() => setActivePdfModal({ grade: lesson.grade, name: textbook.name, url: textbook.url })}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100/80 px-2.5 py-1 rounded-md border border-blue-200/60 transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>Mở SGK Tin học {lesson.grade} (PDF)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer metadata */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(lesson.date)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {assignedClassCodes ? (
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                        {assignedClassCodes}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Chưa gán lớp</span>
                    )}

                    {relatedTasks.length > 0 && (
                      <span className="font-mono text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded-sm">
                        {relatedTasks.length} nhiệm vụ
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PDF Viewer Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-blue-600 rounded-lg">
                  <Book className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{activePdfModal.name}</h3>
                  <p className="text-[11px] text-blue-300">Bộ sách giáo khoa Kết nối tri thức với cuộc sống · Bản gốc đính kèm</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePdfModal.url}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Tải về máy</span>
                </a>
                <a
                  href={activePdfModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  title="Mở trong tab mới"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF iframe */}
            <div className="flex-1 w-full h-full bg-slate-100">
              <iframe
                src={`${activePdfModal.url}#view=FitH`}
                title={activePdfModal.name}
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Lesson Modal */}
      {(isAddModalOpen || editingLesson) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingLesson ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingLesson(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 overflow-y-auto space-y-4 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mã bài học <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Ví dụ: TH06-01, TH10-16..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Khối lớp <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => {
                      const newGrade = Number(e.target.value) as SchoolGrade;
                      const tb = TEXTBOOK_PDFS[newGrade];
                      setFormData({
                        ...formData,
                        grade: newGrade,
                        subject: `Tin học ${newGrade}`,
                        resources: tb ? `${tb.name}, File: ${tb.url}` : formData.resources,
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  >
                    <option value={6}>Khối 6 (THCS)</option>
                    <option value={7}>Khối 7 (THCS)</option>
                    <option value={8}>Khối 8 (THCS)</option>
                    <option value={9}>Khối 9 (THCS)</option>
                    <option value={10}>Khối 10 (THPT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên bài học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ví dụ: Bài 1. Thông tin và dữ liệu"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Môn học
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Tin học 6, Tin học 10..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày dạy dự kiến
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chủ đề / Chương bài học
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Ví dụ: Chủ đề 1. Máy tính và cộng đồng"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phân công lớp giảng dạy
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  {data.classes.map((cls) => {
                    const isChecked = formData.classIds.includes(cls.id);
                    return (
                      <label key={cls.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, classIds: [...formData.classIds, cls.id] });
                            } else {
                              setFormData({
                                ...formData,
                                classIds: formData.classIds.filter((id) => id !== cls.id),
                              });
                            }
                          }}
                          className="rounded-sm text-blue-600 focus:ring-blue-500"
                        />
                        <span>{cls.code}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mục tiêu cần đạt (YCCĐ)
                </label>
                <textarea
                  rows={2}
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  placeholder="Mục tiêu kiến thức, năng lực và phẩm chất cần đạt..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tóm tắt nội dung trọng tâm
                </label>
                <textarea
                  rows={3}
                  value={formData.contentSummary}
                  onChange={(e) => setFormData({ ...formData, contentSummary: e.target.value })}
                  placeholder="Các hoạt động chính: Khởi động, Hình thành kiến thức, Luyện tập, Vận dụng..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tài nguyên & Học liệu đính kèm
                </label>
                <input
                  type="text"
                  value={formData.resources}
                  onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
                  placeholder="Sách giáo khoa, liên kết PDF, slide trình chiếu PowerPoint..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trạng thái
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as LessonStatus })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  <option value="planned">Đã lên kế hoạch</option>
                  <option value="completed">Đã hoàn thành</option>
                  <option value="draft">Bản nháp</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingLesson(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {editingLesson ? 'Lưu thay đổi' : 'Tạo bài học'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lesson Details View Modal */}
      {viewingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold font-mono">
                    {viewingLesson.code}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                    Khối {viewingLesson.grade}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{viewingLesson.title}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Chủ đề: {viewingLesson.topic} · Ngày dạy: {formatDate(viewingLesson.date)}
                </p>
              </div>
              <button
                onClick={() => setViewingLesson(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 overflow-y-auto space-y-4 pr-1 text-xs text-slate-700 leading-relaxed">
              <div>
                <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wider mb-1">
                  Mục tiêu bài học (YCCĐ):
                </span>
                <p className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  {viewingLesson.objectives || 'Chưa ghi mục tiêu cụ thể.'}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wider mb-1">
                  Nội dung trọng tâm:
                </span>
                <p className="p-3 bg-slate-50 rounded-lg border border-slate-100 whitespace-pre-line">
                  {viewingLesson.contentSummary || 'Chưa có tóm tắt nội dung.'}
                </p>
              </div>

              {viewingLesson.resources && (
                <div>
                  <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wider mb-1">
                    Tài liệu & Học liệu đính kèm:
                  </span>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-2">
                    <p>{viewingLesson.resources}</p>
                    {TEXTBOOK_PDFS[viewingLesson.grade] && (
                      <button
                        onClick={() => {
                          const tb = TEXTBOOK_PDFS[viewingLesson.grade];
                          setActivePdfModal({ grade: viewingLesson.grade, name: tb.name, url: tb.url });
                        }}
                        className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer mt-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Mở trực tiếp Sách Giáo Khoa Tin học {viewingLesson.grade} (PDF)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Linked Tasks */}
              <div>
                <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wider mb-1">
                  Nhiệm vụ học tập liên kết:
                </span>
                {data.tasks.filter((t) => t.lessonId === viewingLesson.id).length === 0 ? (
                  <p className="text-slate-500 italic p-3 border rounded-lg bg-slate-50">
                    Chưa có nhiệm vụ học tập nào được liên kết với bài học này.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {data.tasks
                      .filter((t) => t.lessonId === viewingLesson.id)
                      .map((t) => (
                        <div key={t.id} className="p-2.5 bg-blue-50/50 border border-blue-200/60 rounded-lg flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-slate-900">{t.title}</span>
                            <span className="text-[11px] text-slate-500 block">Hạn nộp: {formatDate(t.dueDate)}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-blue-800">{t.maxScore} điểm</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setViewingLesson(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Lesson Confirmation */}
      {deleteTargetLesson && (
        <ConfirmModal
          isOpen={true}
          title={`Xác nhận xóa bài học: ${deleteTargetLesson.title}?`}
          message={`Bạn có chắc muốn xóa bài học "${deleteTargetLesson.title}" (${deleteTargetLesson.code})? Thao tác này không thể hoàn tác.`}
          confirmLabel="Xóa bài học"
          isDestructive={true}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetLesson(null)}
        />
      )}

      {/* Clear All Lessons Modal */}
      {isClearAllModalOpen && (
        <ConfirmModal
          isOpen={true}
          title="Xác nhận xóa toàn bộ dữ liệu bài học?"
          message={`Bạn có chắc chắn muốn xóa toàn bộ ${data.lessons.length} bài học trong hệ thống? Sau khi xóa, bạn có thể tự tạo bài học mới hoặc bấm 'Nạp SGK chuẩn' bất cứ lúc nào.`}
          confirmLabel="Xóa tất cả bài học"
          isDestructive={true}
          onConfirm={() => {
            clearAllLessons();
            setIsClearAllModalOpen(false);
          }}
          onCancel={() => setIsClearAllModalOpen(false)}
        />
      )}

      {/* Reset to Curriculum Modal */}
      {isResetModalOpen && (
        <ConfirmModal
          isOpen={true}
          title="Nạp lại chương trình bài học SGK Tin học Kết nối tri thức?"
          message="Hệ thống sẽ nạp lại đầy đủ 109 bài học theo chuẩn 5 bộ sách giáo khoa Tin học 6, 7, 8, 9, 10 Kết nối tri thức với cuộc sống đính kèm. Bạn có muốn tiếp tục?"
          confirmLabel="Nạp 109 bài học SGK"
          isDestructive={false}
          onConfirm={() => {
            resetLessonsToCurriculum();
            setIsResetModalOpen(false);
          }}
          onCancel={() => setIsResetModalOpen(false)}
        />
      )}
    </div>
  );
};
