import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  parseStudentsExcelFile,
  downloadStudentTemplateExcel,
  ParsedStudentRow,
} from '../../utils/excelUtils';
import {
  X,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Info,
  Users,
  Check,
  RefreshCw,
} from 'lucide-react';

interface ImportStudentsExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportStudentsExcelModal: React.FC<ImportStudentsExcelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data, batchAddStudents, selectedClassId } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const [parsedRows, setParsedRows] = useState<ParsedStudentRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [validCount, setValidCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);

  // Configuration options
  const [defaultClassId, setDefaultClassId] = useState<string>(
    selectedClassId !== 'all' ? selectedClassId : data.classes[0]?.id || ''
  );
  const [updateExisting, setUpdateExisting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    downloadStudentTemplateExcel(data.classes);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    await processFile(selectedFile);
  };

  const processFile = async (f: File) => {
    setFile(f);
    setIsParsing(true);
    setParseError(null);

    try {
      const result = await parseStudentsExcelFile(
        f,
        data.classes,
        data.students,
        defaultClassId
      );

      setParsedRows(result.rows);
      setTotalCount(result.totalCount);
      setValidCount(result.validCount);
      setDuplicateCount(result.duplicateCount);

      if (result.rows.length === 0) {
        setParseError('Tệp tải lên không có dữ liệu hoặc không thể đọc bảng tính.');
      }
    } catch (err: any) {
      console.error(err);
      setParseError(err.message || 'Lỗi khi đọc file Excel. Vui lòng kiểm tra lại định dạng tệp.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      await processFile(droppedFile);
    }
  };

  const handleConfirmImport = () => {
    const eligibleRows = parsedRows.filter((r) => r.isValid && (updateExisting || !r.isDuplicate));

    if (eligibleRows.length === 0) {
      alert('Không có học sinh nào hợp lệ để nhập vào hệ thống.');
      return;
    }

    setIsSubmitting(true);

    const studentsToImport = eligibleRows.map((r) => ({
      code: r.code,
      fullName: r.fullName,
      classId: r.classId || defaultClassId,
      birthDate: r.birthDate,
      gender: r.gender,
      parentContact: r.parentContact,
      status: 'active' as const,
      needsSupport: false,
      notes: r.notes || 'Nhập từ file Excel',
    }));

    batchAddStudents(studentsToImport, updateExisting);

    setIsSubmitting(false);
    onClose();
  };

  const eligibleCount = parsedRows.filter((r) => r.isValid && (updateExisting || !r.isDuplicate)).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-xl border border-slate-200 p-6 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                Tải danh sách học sinh bằng file Excel (.xlsx / .xls / .csv)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Nhập danh sách học sinh hàng loạt nhanh chóng, tự động nhận diện thông tin và kiểm tra trùng lặp
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-4 overflow-y-auto space-y-5 pr-1 text-xs">
          {/* Step 1: Download Template */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-slate-900 block">Bước 1: Tải mẫu danh sách học sinh chuẩn</span>
              <p className="text-slate-600 mt-0.5">
                Tải tệp mẫu Excel có sẵn các cột chuẩn (Mã HS, Họ tên, Lớp, Ngày sinh, Giới tính, SĐT phụ huynh)
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg font-semibold transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Tải file Excel mẫu (.xlsx)</span>
            </button>
          </div>

          {/* Step 2: Upload Zone */}
          <div>
            <span className="font-bold text-slate-900 block mb-1.5">
              Bước 2: Chọn hoặc kéo thả tệp Excel từ máy tính của cô
            </span>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                file
                  ? 'border-blue-400 bg-blue-50/30'
                  : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                className="hidden"
              />

              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              {file ? (
                <div>
                  <span className="text-xs font-bold text-blue-800 block">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Bấm để chọn tệp khác hoặc kéo thả tệp mới vào đây
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Nhấn vào đây để tải lên tệp Excel (.xlsx, .xls) hoặc tệp .csv
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Hỗ trợ tệp bảng tính xuất từ VnEdu, SMAS, Google Sheets hoặc Microsoft Excel
                  </span>
                </div>
              )}
            </div>

            {isParsing && (
              <div className="mt-2 text-center text-blue-700 text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Đang xử lý và đọc dữ liệu từ tệp Excel...</span>
              </div>
            )}

            {parseError && (
              <div className="mt-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{parseError}</span>
              </div>
            )}
          </div>

          {/* Options & Configuration */}
          {parsedRows.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lớp mặc định (nếu tệp không chỉ định cột lớp)
                </label>
                <select
                  value={defaultClassId}
                  onChange={(e) => {
                    setDefaultClassId(e.target.value);
                    // Update rows that don't have a specific class
                    setParsedRows((prev) =>
                      prev.map((r) => (!r.classId ? { ...r, classId: e.target.value } : r))
                    );
                  }}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md bg-white text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  {data.classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.code} – {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={updateExisting}
                    onChange={(e) => setUpdateExisting(e.target.checked)}
                    className="rounded-xs text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-medium text-slate-800">
                    Cập nhật thông tin nếu trùng mã học sinh đã có
                  </span>
                </label>
                <span className="text-[11px] text-slate-500 pl-5 mt-0.5">
                  Nếu bỏ chọn, hệ thống sẽ bỏ qua các học sinh đã tồn tại trong danh sách.
                </span>
              </div>
            </div>
          )}

          {/* Step 3: Preview Table */}
          {parsedRows.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Xem trước dữ liệu đọc từ tệp:</span>
                  <span className="text-slate-500 font-mono">
                    ({totalCount} dòng | Hợp lệ: {validCount} | Trùng: {duplicateCount})
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-700">
                  Sẽ nhập: {eligibleCount} học sinh
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0">
                    <tr>
                      <th className="py-2 px-3 w-10 text-center">STT</th>
                      <th className="py-2 px-3">Mã HS</th>
                      <th className="py-2 px-3">Họ và Tên</th>
                      <th className="py-2 px-3">Lớp</th>
                      <th className="py-2 px-3">Giới tính</th>
                      <th className="py-2 px-3">Ngày sinh</th>
                      <th className="py-2 px-3">Phụ huynh</th>
                      <th className="py-2 px-3">Trạng thái dữ liệu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={
                          !row.isValid
                            ? 'bg-rose-50/50 text-rose-900'
                            : row.isDuplicate
                            ? updateExisting
                              ? 'bg-amber-50/40 text-amber-900'
                              : 'bg-slate-50 text-slate-400'
                            : 'hover:bg-slate-50'
                        }
                      >
                        <td className="py-2 px-3 text-center font-mono text-[11px]">{idx + 1}</td>
                        <td className="py-2 px-3 font-mono font-semibold">{row.code}</td>
                        <td className="py-2 px-3 font-semibold">{row.fullName}</td>
                        <td className="py-2 px-3 font-semibold">{row.className}</td>
                        <td className="py-2 px-3">{row.gender}</td>
                        <td className="py-2 px-3 font-mono">{row.birthDate}</td>
                        <td className="py-2 px-3">{row.parentContact || '—'}</td>
                        <td className="py-2 px-3">
                          {!row.isValid ? (
                            <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> {row.error}
                            </span>
                          ) : row.isDuplicate ? (
                            <span
                              className={`text-[11px] font-semibold flex items-center gap-1 ${
                                updateExisting ? 'text-amber-700' : 'text-slate-400'
                              }`}
                            >
                              <Info className="w-3.5 h-3.5" />
                              {updateExisting ? 'Sẽ cập nhật' : 'Đã có (Bỏ qua)'}
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Hợp lệ
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>

          <button
            type="button"
            disabled={eligibleCount === 0 || isSubmitting}
            onClick={handleConfirmImport}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
              eligibleCount > 0 && !isSubmitting
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>
              {isSubmitting
                ? 'Đang nhập...'
                : `Xác nhận nhập ${eligibleCount} học sinh vào hệ thống`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
