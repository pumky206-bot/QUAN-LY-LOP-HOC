import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskStatus } from '../../types';
import {
  isTaskOverdue,
  formatDate,
  calculateTaskCompletion,
} from '../../utils/calculations';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Copy,
  Edit2,
  Trash2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  X,
  Users,
  Check,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';

export const TasksView: React.FC = () => {
  const {
    data,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    saveStudentSubmission,
    selectedClassId,
    setSelectedClassId,
  } = useApp();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [trackingTask, setTrackingTask] = useState<Task | null>(null);
  const [deleteTargetTask, setDeleteTargetTask] = useState<Task | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    code: string;
    title: string;
    description: string;
    lessonId?: string;
    classIds: string[];
    assignedDate: string;
    dueDate: string;
    maxScore: number;
    status: TaskStatus;
    notes: string;
  }>({
    code: '',
    title: '',
    description: '',
    lessonId: '',
    classIds: [],
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    maxScore: 10,
    status: 'assigned',
    notes: '',
  });

  const resetForm = () => {
    setFormData({
      code: 'NV' + (Math.floor(Math.random() * 900) + 100),
      title: '',
      description: '',
      lessonId: '',
      classIds: selectedClassId !== 'all' ? [selectedClassId] : [data.classes[0]?.id || ''],
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      maxScore: 10,
      status: 'assigned',
      notes: '',
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      code: task.code,
      title: task.title,
      description: task.description,
      lessonId: task.lessonId || '',
      classIds: task.classIds,
      assignedDate: task.assignedDate,
      dueDate: task.dueDate,
      maxScore: task.maxScore,
      status: task.status,
      notes: task.notes,
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.code.trim() || formData.classIds.length === 0) {
      alert('Vui lòng nhập tên nhiệm vụ, mã nhiệm vụ và chọn ít nhất một lớp học.');
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, {
        code: formData.code.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        lessonId: formData.lessonId || undefined,
        classIds: formData.classIds,
        assignedDate: formData.assignedDate,
        dueDate: formData.dueDate,
        maxScore: Number(formData.maxScore) || 10,
        status: formData.status,
        notes: formData.notes.trim(),
      });
      setEditingTask(null);
    } else {
      addTask({
        code: formData.code.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        lessonId: formData.lessonId || undefined,
        classIds: formData.classIds,
        assignedDate: formData.assignedDate,
        dueDate: formData.dueDate,
        maxScore: Number(formData.maxScore) || 10,
        status: formData.status,
        notes: formData.notes.trim(),
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetTask) return;
    deleteTask(deleteTargetTask.id);
    setDeleteTargetTask(null);
  };

  // Filter Tasks
  const filteredTasks = data.tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass =
      selectedClassId === 'all' || task.classIds.includes(selectedClassId);

    const overdue = isTaskOverdue(task);
    let matchesStatus = true;
    if (statusFilter === 'overdue') {
      matchesStatus = overdue;
    } else if (statusFilter !== 'all') {
      matchesStatus = task.status === statusFilter;
    }

    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Nhiệm vụ học tập</h1>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              · {filteredTasks.length} nhiệm vụ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Giao bài tập, theo dõi hạn nộp và ghi nhận kết quả bài làm của từng học sinh
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Giao nhiệm vụ mới</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo tên nhiệm vụ, mã hoặc nội dung mô tả..."
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
                  {cls.code}
                </option>
              ))}
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
              <option value="assigned">Đã giao</option>
              <option value="in_progress">Đang thực hiện</option>
              <option value="completed">Đã hoàn thành</option>
              <option value="overdue">Quá hạn</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Cards List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title="Không tìm thấy nhiệm vụ"
          description={
            data.tasks.length === 0
              ? 'Chưa có nhiệm vụ học tập nào được tạo.'
              : 'Không có nhiệm vụ nào phù hợp với bộ lọc tìm kiếm.'
          }
          actionLabel={data.tasks.length === 0 ? 'Giao nhiệm vụ đầu tiên' : undefined}
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => {
            const overdue = isTaskOverdue(task);
            const assignedClassCodes = data.classes
              .filter((c) => task.classIds.includes(c.id))
              .map((c) => c.code)
              .join(', ');

            const relatedLesson = data.lessons.find((l) => l.id === task.lessonId);
            const submissions = data.taskSubmissions.filter((ts) => ts.taskId === task.id);
            const completion = calculateTaskCompletion(submissions, [task]);

            return (
              <div
                key={task.id}
                className={`bg-white rounded-xl border p-5 shadow-2xs transition-all flex flex-col justify-between ${
                  overdue ? 'border-rose-200 hover:border-rose-300' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top line with codes and badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                        {task.code}
                      </span>
                      {overdue ? (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-rose-100 text-rose-700 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Quá hạn
                        </span>
                      ) : (
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                            task.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : task.status === 'in_progress'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-sky-50 text-sky-700'
                          }`}
                        >
                          {task.status === 'completed'
                            ? 'Hoàn thành'
                            : task.status === 'in_progress'
                            ? 'Đang nộp'
                            : 'Đã giao'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => duplicateTask(task.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Sao chép nhiệm vụ"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(task)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Chỉnh sửa nhiệm vụ"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetTask(task)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        title="Xóa nhiệm vụ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-3 text-sm font-bold text-slate-900 line-clamp-2">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>
                  )}

                  {/* Dates and Meta */}
                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Giao: {formatDate(task.assignedDate)}</span>
                      </span>
                      <span
                        className={`font-semibold font-mono ${
                          overdue ? 'text-rose-600 font-bold' : 'text-slate-700'
                        }`}
                      >
                        Hạn: {formatDate(task.dueDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Lớp: {assignedClassCodes || 'Tất cả'}</span>
                      <span className="font-mono text-slate-700 font-semibold">
                        Điểm tối đa: {task.maxScore}
                      </span>
                    </div>
                  </div>

                  {/* Linked Lesson pill */}
                  {relatedLesson && (
                    <div className="mt-2.5 text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded-md border border-slate-100 truncate">
                      <span className="font-medium text-slate-500">Bài học: </span>
                      <span className="font-semibold text-slate-800">{relatedLesson.title}</span>
                    </div>
                  )}

                  {/* Submission Progress bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Tiến độ nộp bài:</span>
                      <span className="font-mono font-bold text-blue-800">
                        {completion.completed}/{completion.totalAssigned} học sinh ({completion.completionRate}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex">
                      <div
                        style={{ width: `${completion.completionRate}%` }}
                        className="bg-blue-600 h-full rounded-full transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Action: Open Submission Tracker */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setTrackingTask(task)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Quản lý nộp bài & Chấm điểm ({completion.completed}/{completion.totalAssigned})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Task Modal */}
      {(isAddModalOpen || editingTask) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingTask ? `Chỉnh sửa nhiệm vụ: ${editingTask.code}` : 'Giao nhiệm vụ học tập mới'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingTask(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mã nhiệm vụ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="NV10-01"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as TaskStatus })
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="assigned">Đã giao</option>
                    <option value="in_progress">Đang thực hiện</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="draft">Bản nháp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên nhiệm vụ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ví dụ: Phiếu bài tập số 03: Đồ thị Parabol"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Giao cho lớp học (chọn 1 hoặc nhiều) <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  {data.classes.map((cls) => {
                    const isChecked = formData.classIds.includes(cls.id);
                    return (
                      <label
                        key={cls.id}
                        className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-blue-50 border-blue-300 text-blue-800 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
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
                          className="rounded-xs text-blue-600 focus:ring-blue-500"
                        />
                        <span>{cls.code}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bài học liên quan (tùy chọn)
                </label>
                <select
                  value={formData.lessonId}
                  onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">-- Không gắn với bài học cụ thể --</option>
                  {data.lessons.map((les) => (
                    <option key={les.id} value={les.id}>
                      {les.code} - {les.title} (Khối {les.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày giao
                  </label>
                  <input
                    type="date"
                    value={formData.assignedDate}
                    onChange={(e) => setFormData({ ...formData, assignedDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hạn hoàn thành <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Thang điểm tối đa
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mô tả yêu cầu chi tiết
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Yêu cầu học sinh làm các bài nào, lưu ý cách trình bày..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ghi chú riêng của giáo viên
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Đã dặn lớp trưởng thu bài vào tiết 1 thứ Sáu..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingTask(null);
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {editingTask ? 'Lưu thay đổi' : 'Giao nhiệm vụ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Submission Tracker & Grading Drawer */}
      {trackingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold font-mono">
                    {trackingTask.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{trackingTask.title}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Hạn hoàn thành: <span className="font-semibold text-slate-700 font-mono">{formatDate(trackingTask.dueDate)}</span> · Thang điểm tối đa: {trackingTask.maxScore}
                </p>
              </div>
              <button
                onClick={() => setTrackingTask(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Submissions Table by Student */}
            <div className="mt-4 overflow-y-auto pr-1">
              {(() => {
                const targetStudents = data.students.filter((s) => trackingTask.classIds.includes(s.classId));
                if (targetStudents.length === 0) {
                  return (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      Không có học sinh nào trong các lớp được giao nhiệm vụ này.
                    </p>
                  );
                }

                return (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Học sinh</th>
                        <th className="py-2.5 px-3">Lớp</th>
                        <th className="py-2.5 px-3">Trạng thái nộp bài</th>
                        <th className="py-2.5 px-3">Điểm số (/{trackingTask.maxScore})</th>
                        <th className="py-2.5 px-3">Nhận xét của cô</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {targetStudents.map((student) => {
                        const studentClass = data.classes.find((c) => c.id === student.classId);
                        const sub = data.taskSubmissions.find(
                          (ts) => ts.taskId === trackingTask.id && ts.studentId === student.id
                        );

                        const currentStatus = sub ? sub.status : 'pending';
                        const currentScore = sub?.score !== undefined ? sub.score : '';
                        const currentFeedback = sub?.feedback || '';

                        return (
                          <tr key={student.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3">
                              <span className="font-semibold text-slate-900 block">{student.fullName}</span>
                              <span className="text-[11px] font-mono text-slate-400">{student.code}</span>
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-slate-700">
                              {studentClass?.code}
                            </td>
                            <td className="py-2.5 px-3">
                              <select
                                value={currentStatus}
                                onChange={(e) =>
                                  saveStudentSubmission(
                                    trackingTask.id,
                                    student.id,
                                    student.classId,
                                    e.target.value as any,
                                    sub?.score,
                                    sub?.feedback
                                  )
                                }
                                className={`px-2 py-1 rounded-md text-xs font-semibold border ${
                                  currentStatus === 'graded'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : currentStatus === 'submitted'
                                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                                    : currentStatus === 'late'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : 'bg-rose-50 text-rose-800 border-rose-200'
                                }`}
                              >
                                <option value="pending">Chưa nộp</option>
                                <option value="submitted">Đã nộp bài</option>
                                <option value="graded">Đã chấm điểm</option>
                                <option value="late">Nộp muộn</option>
                              </select>
                            </td>
                            <td className="py-2.5 px-3">
                              <input
                                type="number"
                                min="0"
                                max={trackingTask.maxScore}
                                step="0.25"
                                defaultValue={currentScore}
                                onBlur={(e) => {
                                  const val = e.target.value === '' ? undefined : Number(e.target.value);
                                  saveStudentSubmission(
                                    trackingTask.id,
                                    student.id,
                                    student.classId,
                                    val !== undefined ? 'graded' : currentStatus,
                                    val,
                                    sub?.feedback
                                  );
                                }}
                                placeholder="—"
                                className="w-16 px-2 py-1 border border-slate-300 rounded-md text-xs font-mono font-bold focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                            <td className="py-2.5 px-3">
                              <input
                                type="text"
                                defaultValue={currentFeedback}
                                onBlur={(e) => {
                                  saveStudentSubmission(
                                    trackingTask.id,
                                    student.id,
                                    student.classId,
                                    currentStatus,
                                    sub?.score,
                                    e.target.value
                                  );
                                }}
                                placeholder="Nhập nhận xét bài làm..."
                                className="w-full px-2 py-1 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              })()}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Mẹo: Nhập điểm và nhận xét, hệ thống sẽ tự động lưu khi bạn chuyển ô.
              </span>
              <button
                onClick={() => setTrackingTask(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Đóng bảng theo dõi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTargetTask && (
        <ConfirmModal
          isOpen={true}
          title={`Xác nhận xóa nhiệm vụ: ${deleteTargetTask.title}?`}
          message={`Bạn có chắc muốn xóa nhiệm vụ "${deleteTargetTask.title}" (${deleteTargetTask.code})? Mọi bài nộp và trạng thái hoàn thành của học sinh đối với nhiệm vụ này sẽ bị xóa.`}
          confirmLabel="Xóa nhiệm vụ"
          isDestructive={true}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetTask(null)}
        />
      )}
    </div>
  );
};
