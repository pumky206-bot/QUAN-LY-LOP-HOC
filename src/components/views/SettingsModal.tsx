import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, Upload, RotateCcw, Trash2, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    data,
    updateSettings,
    exportDataJSON,
    importDataJSON,
    resetToDemoData,
    clearAllData,
  } = useApp();

  const [teacherName, setTeacherName] = useState(data.settings.teacherName);
  const [schoolName, setSchoolName] = useState(data.settings.schoolName);
  const [schoolYear, setSchoolYear] = useState(data.settings.currentSchoolYear);
  const [scoreThreshold, setScoreThreshold] = useState(data.settings.attentionScoreThreshold.toString());
  const [completionThreshold, setCompletionThreshold] = useState(data.settings.attentionCompletionThreshold.toString());
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      teacherName: teacherName.trim() || 'Cô Bùi Thị Ra',
      schoolName: schoolName.trim() || 'Trường THCS, THPT Ngôi Sao',
      currentSchoolYear: schoolYear.trim() || '2026 - 2027',
      attentionScoreThreshold: parseFloat(scoreThreshold) || 6.5,
      attentionCompletionThreshold: parseFloat(completionThreshold) || 75,
    });
    onClose();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importDataJSON(content);
      if (!res.success) {
        setImportError(res.error || 'Tệp sao lưu không hợp lệ');
      } else {
        onClose();
      }
    };
    reader.readAsText(file);
  };

  const handleImportRawText = () => {
    if (!importJsonText.trim()) return;
    const res = importDataJSON(importJsonText);
    if (!res.success) {
      setImportError(res.error || 'Dữ liệu JSON không hợp lệ');
    } else {
      setImportJsonText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-900">Quản lý Dữ liệu & Cài đặt hệ thống</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cấu hình thông tin giáo viên, tiêu chí cảnh báo và sao lưu an toàn
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content with tabs/sections */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 1: Teacher & School Info */}
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 border-b pb-2">
              1. Thông tin Giáo viên & Năm học
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên giáo viên
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Đơn vị công tác (Trường học)
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Năm học hiện tại
                </label>
                <input
                  type="text"
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  placeholder="2026 - 2027"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ngưỡng điểm cần theo dõi (&lt;)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={scoreThreshold}
                  onChange={(e) => setScoreThreshold(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Học sinh có điểm TB dưới mức này sẽ được báo cần quan tâm.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ngưỡng nộp nhiệm vụ cần theo dõi (&lt; %)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={completionThreshold}
                  onChange={(e) => setCompletionThreshold(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Tỷ lệ nộp bài dưới mức này sẽ được đưa vào diện nhắc nhở.
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Lưu cấu hình
              </button>
            </div>
          </form>

          {/* Section 2: Backup & Restore */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900">
              2. Sao lưu và Khôi phục dữ liệu (JSON)
            </h4>
            <p className="text-xs text-slate-500">
              Dữ liệu được lưu trữ tự động trong trình duyệt qua LocalStorage. Bạn có thể xuất tệp sao lưu JSON để lưu trữ ngoài hoặc chuyển sang máy tính khác.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={exportDataJSON}
                className="flex items-center justify-center gap-2 p-3 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-600" />
                Xuất tệp sao lưu (Backup JSON)
              </button>

              <label className="flex items-center justify-center gap-2 p-3 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-slate-600" />
                <span>Khôi phục từ tệp (.json)</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>

            {importError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{importError}</span>
              </div>
            )}
          </div>

          {/* Section 3: Data Reset & Clean */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900">
              3. Quản lý trạng thái dữ liệu thử nghiệm
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Khôi phục lại toàn bộ dữ liệu mẫu ban đầu của Cô Bùi Thị Ra?')) {
                    resetToDemoData();
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                Nạp lại dữ liệu mẫu chuẩn
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('CẢNH BÁO: Hành động này sẽ dọn sạch toàn bộ lớp học, học sinh, điểm số để bắt đầu từ bảng trắng. Bạn có chắc chắn?')) {
                    clearAllData();
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                Làm sạch dữ liệu thử nghiệm
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Chế độ an toàn dữ liệu cục bộ</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
