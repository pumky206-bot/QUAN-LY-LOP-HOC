import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentFeedback } from '../../types';
import { formatDate } from '../../utils/calculations';
import {
  MessageSquareText,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Sparkles,
  Calendar,
  X,
  User,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';

// Pre-crafted pedagogical comment templates
const FEEDBACK_TEMPLATES = [
  {
    title: 'Học lực xuất sắc & Tư duy sáng tạo',
    content: 'Em nắm vững toàn diện kiến thức lý thuyết, tư duy logic sắc bén và giải quyết nhanh các bài toán vận dụng cao.',
    strengths: 'Chủ động tự học, tinh thần sáng tạo, tích cực giúp đỡ bạn trong giờ sinh hoạt nhóm.',
    improvements: 'Rèn luyện thêm kỹ năng diễn giải tự luận chặt chẽ từng bước.',
    recommendations: 'Tiếp tục bồi dưỡng vào đội tuyển học sinh giỏi môn Tin học của trường.',
  },
  {
    title: 'Có tiến bộ rõ rệt',
    content: 'Thời gian gần đây em có sự nỗ lực vượt bậc, điểm kiểm tra thường xuyên cải thiện đáng khen ngợi.',
    strengths: 'Chăm chú lắng nghe cô giảng, không ngại hỏi lại những phần chưa hiểu.',
    improvements: 'Cần duy trì đều đặn phong độ làm bài tập về nhà mỗi ngày.',
    recommendations: 'Tiếp tục biểu dương em trước lớp để tạo động lực duy trì thành tích.',
  },
  {
    title: 'Cần củng cố kiến thức nền tảng',
    content: 'Em còn gặp lúng túng ở các bài toán cơ bản, kỹ năng biến đổi công thức còn chậm và hay nhầm dấu.',
    strengths: 'Ý thức nề nếp tốt, lễ phép, đi học chuyên cần.',
    improvements: 'Cần rèn luyện tính kiên nhẫn khi gặp bài toán cần thực hiện nhiều bước biến đổi.',
    recommendations: 'Xếp bạn học khá kèm cặp và cô sẽ dành thêm 20 phút phụ đạo sau giờ học ngày thứ Năm.',
  },
  {
    title: 'Cần nhắc nhở kỷ luật & Hạn nộp bài',
    content: 'Em có năng lực tiếp thu tốt nhưng còn xao nhãng trong việc hoàn thành bài tập về nhà đúng thời hạn.',
    strengths: 'Hiểu bài nhanh ngay trên lớp khi được chỉ định phát biểu.',
    improvements: 'Thiếu tính chủ động và tính tự giác trong giờ tự học ở nhà.',
    recommendations: 'Cô đã liên hệ với phụ huynh để gia đình cùng phối hợp nhắc nhở lịch làm bài buổi tối.',
  },
  {
    title: 'Học sinh tích cực xây dựng bài',
    content: 'Rất hăng hái phát biểu, tác phong nhanh nhẹn và có tinh thần đồng đội cao.',
    strengths: 'Tự tin trước đám đông, khả năng thuyết trình bài giải mạch lạc.',
    improvements: 'Cần kiểm tra kỹ kết quả tính toán trước khi nộp bài thi.',
    recommendations: 'Khuyến khích em tham gia câu lạc bộ Tin học & Lập trình và các hoạt động học thuật.',
  },
];

export const FeedbackView: React.FC = () => {
  const {
    data,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    selectedClassId,
    setSelectedClassId,
  } = useApp();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<StudentFeedback | null>(null);
  const [deleteTargetFeedback, setDeleteTargetFeedback] = useState<StudentFeedback | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    studentId: string;
    classId: string;
    date: string;
    content: string;
    strengths: string;
    improvements: string;
    recommendations: string;
    relatedLessonOrTask: string;
    teacher: string;
  }>({
    studentId: '',
    classId: selectedClassId !== 'all' ? selectedClassId : data.classes[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    strengths: '',
    improvements: '',
    recommendations: '',
    relatedLessonOrTask: '',
    teacher: data.settings.teacherName,
  });

  const resetForm = () => {
    const defaultClassId = selectedClassId !== 'all' ? selectedClassId : data.classes[0]?.id || '';
    const firstStudent = data.students.find((s) => s.classId === defaultClassId);
    setFormData({
      studentId: firstStudent?.id || '',
      classId: defaultClassId,
      date: new Date().toISOString().split('T')[0],
      content: '',
      strengths: '',
      improvements: '',
      recommendations: '',
      relatedLessonOrTask: '',
      teacher: data.settings.teacherName,
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (fb: StudentFeedback) => {
    setEditingFeedback(fb);
    setFormData({
      studentId: fb.studentId,
      classId: fb.classId,
      date: fb.date,
      content: fb.content,
      strengths: fb.strengths,
      improvements: fb.improvements,
      recommendations: fb.recommendations,
      relatedLessonOrTask: fb.relatedLessonOrTask || '',
      teacher: fb.teacher,
    });
  };

  const handleApplyTemplate = (tpl: typeof FEEDBACK_TEMPLATES[0]) => {
    setFormData((prev) => ({
      ...prev,
      content: tpl.content,
      strengths: tpl.strengths,
      improvements: tpl.improvements,
      recommendations: tpl.recommendations,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.content.trim()) {
      alert('Vui lòng chọn học sinh và nhập nội dung nhận xét.');
      return;
    }

    if (editingFeedback) {
      updateFeedback(editingFeedback.id, {
        studentId: formData.studentId,
        classId: formData.classId,
        date: formData.date,
        content: formData.content.trim(),
        strengths: formData.strengths.trim(),
        improvements: formData.improvements.trim(),
        recommendations: formData.recommendations.trim(),
        relatedLessonOrTask: formData.relatedLessonOrTask.trim(),
        teacher: formData.teacher.trim(),
      });
      setEditingFeedback(null);
    } else {
      addFeedback({
        studentId: formData.studentId,
        classId: formData.classId,
        date: formData.date,
        content: formData.content.trim(),
        strengths: formData.strengths.trim(),
        improvements: formData.improvements.trim(),
        recommendations: formData.recommendations.trim(),
        relatedLessonOrTask: formData.relatedLessonOrTask.trim(),
        teacher: formData.teacher.trim(),
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteTargetFeedback) return;
    deleteFeedback(deleteTargetFeedback.id);
    setDeleteTargetFeedback(null);
  };

  // Filter feedbacks
  const filteredFeedbacks = data.feedbacks.filter((fb) => {
    const student = data.students.find((s) => s.id === fb.studentId);
    const matchesSearch =
      fb.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.strengths.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.improvements.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student && student.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesClass = selectedClassId === 'all' || fb.classId === selectedClassId;
    const matchesStudent =
      selectedStudentFilter === 'all' || fb.studentId === selectedStudentFilter;

    return matchesSearch && matchesClass && matchesStudent;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Nhận xét & Đánh giá rèn luyện</h1>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              · {filteredFeedbacks.length} nhận xét
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ghi nhận định kỳ những điểm mạnh, nội dung cần cải thiện và kế hoạch hỗ trợ từng học sinh
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ghi nhận xét mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm theo nội dung nhận xét hoặc họ tên học sinh..."
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
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setSelectedStudentFilter('all');
              }}
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

          {/* Student Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <span className="text-xs font-medium text-slate-500">Học sinh:</span>
            <select
              value={selectedStudentFilter}
              onChange={(e) => setSelectedStudentFilter(e.target.value)}
              className="text-xs font-medium text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả học sinh</option>
              {data.students
                .filter((s) => selectedClassId === 'all' || s.classId === selectedClassId)
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName} ({s.code})
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Feedbacks List */}
      {filteredFeedbacks.length === 0 ? (
        <EmptyState
          icon={MessageSquareText}
          title="Không tìm thấy nhận xét"
          description={
            data.feedbacks.length === 0
              ? 'Chưa có nhận xét nào được lưu trong hệ thống.'
              : 'Không có nhận xét nào phù hợp với bộ lọc tìm kiếm.'
          }
          actionLabel={data.feedbacks.length === 0 ? 'Ghi nhận xét đầu tiên' : undefined}
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeedbacks.map((fb) => {
            const student = data.students.find((s) => s.id === fb.studentId);
            const studentClass = data.classes.find((c) => c.id === fb.classId);

            return (
              <div
                key={fb.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Student Info */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                        {student ? student.fullName.split(' ').slice(-1)[0][0] : 'HS'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900">
                            {student?.fullName || 'Học sinh'}
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400">
                            ({student?.code})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-semibold text-slate-700">{studentClass?.code}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{formatDate(fb.date)}</span>
                          <span aria-hidden="true">·</span>
                          <span>GV: {fb.teacher}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(fb)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Sửa nhận xét"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetFeedback(fb)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        title="Xóa nhận xét"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="mt-3 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-800 whitespace-pre-line">{fb.content}</p>

                    {fb.strengths && (
                      <div className="mt-2.5 p-2 bg-emerald-50/60 rounded-md border border-emerald-100/70 text-emerald-900">
                        <span className="font-semibold text-emerald-800 block text-[11px] uppercase tracking-wider mb-0.5">
                          Điểm mạnh:
                        </span>
                        <span>{fb.strengths}</span>
                      </div>
                    )}

                    {fb.improvements && (
                      <div className="mt-2 p-2 bg-amber-50/60 rounded-md border border-amber-100/70 text-amber-900">
                        <span className="font-semibold text-amber-800 block text-[11px] uppercase tracking-wider mb-0.5">
                          Cần cải thiện:
                        </span>
                        <span>{fb.improvements}</span>
                      </div>
                    )}

                    {fb.recommendations && (
                      <div className="mt-2 p-2 bg-sky-50/60 rounded-md border border-sky-100/70 text-sky-900">
                        <span className="font-semibold text-sky-800 block text-[11px] uppercase tracking-wider mb-0.5">
                          Kế hoạch hỗ trợ của cô:
                        </span>
                        <span>{fb.recommendations}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Related Lesson */}
                {fb.relatedLessonOrTask && (
                  <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                    <span>Liên quan: </span>
                    <span className="font-semibold text-slate-700">{fb.relatedLessonOrTask}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Feedback Modal with Suggestion Templates */}
      {(isAddModalOpen || editingFeedback) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingFeedback ? 'Chỉnh sửa nhận xét học tập' : 'Ghi nhận xét & Kế hoạch rèn luyện'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingFeedback(null);
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

              {/* Template Picker Pills (Constructive suggestions) */}
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-bold text-slate-900">
                    Gợi ý mẫu câu sư phạm tích cực (nhấn để áp dụng và chỉnh sửa):
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FEEDBACK_TEMPLATES.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl)}
                      className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer text-left"
                    >
                      {tpl.title}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung nhận xét tổng thể <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Ghi nhận xét về thái độ học tập, sự tiếp thu và tiến bộ..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm mạnh của học sinh
                  </label>
                  <textarea
                    rows={2}
                    value={formData.strengths}
                    onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                    placeholder="Tư duy nhanh, chịu khó học hỏi, trình bày cẩn thận..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nội dung cần cải thiện
                  </label>
                  <textarea
                    rows={2}
                    value={formData.improvements}
                    onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
                    placeholder="Cần kiểm tra kỹ kết quả, nộp bài đúng hạn..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Đề xuất biện pháp hỗ trợ từ giáo viên & gia đình
                </label>
                <input
                  type="text"
                  value={formData.recommendations}
                  onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
                  placeholder="Phụ đạo thêm sau giờ học, phối hợp với phụ huynh theo dõi..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bài học hoặc nhiệm vụ liên quan (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={formData.relatedLessonOrTask}
                    onChange={(e) => setFormData({ ...formData, relatedLessonOrTask: e.target.value })}
                    placeholder="Kiểm tra 45 phút, Phiếu bài tập số 03..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày nhận xét
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingFeedback(null);
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  {editingFeedback ? 'Lưu thay đổi' : 'Lưu nhận xét'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTargetFeedback && (
        <ConfirmModal
          isOpen={true}
          title="Xác nhận xóa nhận xét?"
          message="Bạn có chắc muốn xóa nhận xét này? Thao tác này sẽ xóa bản ghi khỏi hồ sơ học sinh."
          confirmLabel="Xóa nhận xét"
          isDestructive={true}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetFeedback(null)}
        />
      )}
    </div>
  );
};
