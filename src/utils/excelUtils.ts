import * as XLSX from 'xlsx';
import { Student, ClassRoom } from '../types';

export interface ParsedStudentRow {
  code: string;
  fullName: string;
  className: string;
  classId?: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ';
  parentContact: string;
  notes: string;
  isValid: boolean;
  error?: string;
  isDuplicate?: boolean;
}

/**
 * Clean and standardize date values from Excel (serial numbers, DD/MM/YYYY, YYYY-MM-DD)
 */
export function normalizeExcelDate(val: any): string {
  if (!val) return '2010-01-01';

  // If number (Excel serial date)
  if (typeof val === 'number') {
    try {
      const parsed = XLSX.SSF.parse_date_code(val);
      if (parsed) {
        const y = parsed.y;
        const m = String(parsed.m).padStart(2, '0');
        const d = String(parsed.d).padStart(2, '0');
        return `${y}-${m}-${d}`;
      }
    } catch {
      // Fallback
    }
  }

  const str = String(val).trim();
  // Check DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmyMatch) {
    const d = dmyMatch[1].padStart(2, '0');
    const m = dmyMatch[2].padStart(2, '0');
    const y = dmyMatch[3];
    return `${y}-${m}-${d}`;
  }

  // Check YYYY-MM-DD
  const ymdMatch = str.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
  if (ymdMatch) {
    const y = ymdMatch[1];
    const m = ymdMatch[2].padStart(2, '0');
    const d = ymdMatch[3].padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return '2010-01-01';
}

/**
 * Standardize gender string
 */
export function normalizeGender(val: any): 'Nam' | 'Nữ' {
  if (!val) return 'Nam';
  const str = String(val).trim().toLowerCase();
  if (str === 'nữ' || str === 'nu' || str === 'female' || str === 'f') {
    return 'Nữ';
  }
  return 'Nam';
}

/**
 * Parse uploaded Excel or CSV file
 */
export async function parseStudentsExcelFile(
  file: File,
  existingClasses: ClassRoom[],
  existingStudents: Student[],
  defaultClassId: string
): Promise<{
  rows: ParsedStudentRow[];
  totalCount: number;
  validCount: number;
  duplicateCount: number;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Parse sheet to JSON array with header row
        const rawJson: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (rawJson.length === 0) {
          resolve({ rows: [], totalCount: 0, validCount: 0, duplicateCount: 0 });
          return;
        }

        const existingCodes = new Set(existingStudents.map((s) => s.code.toLowerCase().trim()));
        const parsedRows: ParsedStudentRow[] = [];

        rawJson.forEach((row, index) => {
          // Flexible key mapping for Vietnamese header variants
          let code = '';
          let fullName = '';
          let classRaw = '';
          let birthRaw = '';
          let genderRaw = '';
          let contactRaw = '';
          let notesRaw = '';

          for (const key of Object.keys(row)) {
            const cleanKey = key.toLowerCase().trim();
            const val = row[key];

            if (cleanKey.includes('mã') || cleanKey.includes('ma hs') || cleanKey === 'code' || cleanKey === 'id') {
              code = String(val).trim();
            } else if (cleanKey.includes('họ') || cleanKey.includes('tên') || cleanKey.includes('name')) {
              fullName = String(val).trim();
            } else if (cleanKey.includes('lớp') || cleanKey.includes('class')) {
              classRaw = String(val).trim();
            } else if (cleanKey.includes('sinh') || cleanKey.includes('dob') || cleanKey.includes('date')) {
              birthRaw = val;
            } else if (cleanKey.includes('tính') || cleanKey.includes('gender') || cleanKey === 'phái') {
              genderRaw = val;
            } else if (cleanKey.includes('thoại') || cleanKey.includes('sđt') || cleanKey.includes('liên hệ') || cleanKey.includes('phone')) {
              contactRaw = String(val).trim();
            } else if (cleanKey.includes('chú') || cleanKey.includes('notes') || cleanKey.includes('nhận xét')) {
              notesRaw = String(val).trim();
            }
          }

          // If no code found, generate fallback or report error
          if (!code && fullName) {
            code = 'NS' + (1000 + index + 1);
          }

          // Determine classId
          let targetClassId = defaultClassId;
          if (classRaw) {
            const matchedClass = existingClasses.find(
              (c) =>
                c.code.toLowerCase() === classRaw.toLowerCase() ||
                c.name.toLowerCase().includes(classRaw.toLowerCase())
            );
            if (matchedClass) {
              targetClassId = matchedClass.id;
            }
          }

          const isDuplicate = existingCodes.has(code.toLowerCase());
          let isValid = true;
          let error = '';

          if (!fullName) {
            isValid = false;
            error = 'Thiếu họ và tên học sinh';
          } else if (!code) {
            isValid = false;
            error = 'Thiếu mã định danh học sinh';
          }

          const matchedClassObj = existingClasses.find((c) => c.id === targetClassId);

          parsedRows.push({
            code,
            fullName,
            className: matchedClassObj ? matchedClassObj.code : classRaw || 'Chưa xếp lớp',
            classId: targetClassId,
            birthDate: normalizeExcelDate(birthRaw),
            gender: normalizeGender(genderRaw),
            parentContact: contactRaw,
            notes: notesRaw,
            isValid,
            error,
            isDuplicate,
          });
        });

        const validCount = parsedRows.filter((r) => r.isValid && !r.isDuplicate).length;
        const duplicateCount = parsedRows.filter((r) => r.isDuplicate).length;

        resolve({
          rows: parsedRows,
          totalCount: parsedRows.length,
          validCount,
          duplicateCount,
        });
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Generate and download a standard student list template Excel file (.xlsx)
 */
export function downloadStudentTemplateExcel(classes: ClassRoom[]) {
  const sampleData = [
    {
      'Mã học sinh': 'NS10-009',
      'Họ và tên': 'Nguyễn Văn An',
      'Lớp': classes[0]?.code || '10A1',
      'Ngày sinh': '15/04/2010',
      'Giới tính': 'Nam',
      'Số điện thoại phụ huynh': '0912.333.444 (Bố)',
      'Ghi chú': 'Học sinh mới chuyển vào',
    },
    {
      'Mã học sinh': 'NS10-010',
      'Họ và tên': 'Trần Thị Mai',
      'Lớp': classes[0]?.code || '10A1',
      'Ngày sinh': '20/09/2010',
      'Giới tính': 'Nữ',
      'Số điện thoại phụ huynh': '0988.555.666 (Mẹ)',
      'Ghi chú': 'Ban cán sự lớp',
    },
    {
      'Mã học sinh': 'NS10-011',
      'Họ và tên': 'Lê Quang Huy',
      'Lớp': classes[1]?.code || '11B1',
      'Ngày sinh': '05/11/2009',
      'Giới tính': 'Nam',
      'Số điện thoại phụ huynh': '0903.777.888 (Bố)',
      'Ghi chú': 'Đội tuyển HSG Tin học',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 15 }, // Mã học sinh
    { wch: 25 }, // Họ và tên
    { wch: 12 }, // Lớp
    { wch: 15 }, // Ngày sinh
    { wch: 10 }, // Giới tính
    { wch: 25 }, // Số điện thoại phụ huynh
    { wch: 30 }, // Ghi chú
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh_Sach_Mau');

  XLSX.writeFile(workbook, 'Mau_nhap_danh_sach_hoc_sinh_Ngoi_Sao.xlsx');
}

/**
 * Export student list to formatted .xlsx file
 */
export function exportStudentsToExcelFile(
  students: Student[],
  classes: ClassRoom[],
  grades: any[],
  calculateAverageGrade: (g: any[]) => number | null,
  getGradeRank: (avg: number | null) => { rank: string }
) {
  const exportData = students.map((s, idx) => {
    const cls = classes.find((c) => c.id === s.classId);
    const sGrades = grades.filter((g) => g.studentId === s.id);
    const avg = calculateAverageGrade(sGrades);
    const rankInfo = getGradeRank(avg);

    return {
      'STT': idx + 1,
      'Mã học sinh': s.code,
      'Họ và tên': s.fullName,
      'Lớp': cls ? cls.code : '—',
      'Khối': cls ? `Khối ${cls.grade}` : '—',
      'Giới tính': s.gender,
      'Ngày sinh': s.birthDate,
      'Liên hệ phụ huynh': s.parentContact || '—',
      'Điểm trung bình': avg !== null ? avg.toFixed(1) : 'Chưa có điểm',
      'Xếp loại': rankInfo.rank,
      'Cần hỗ trợ': s.needsSupport ? 'Cần hỗ trợ' : 'Bình thường',
      'Trạng thái':
        s.status === 'active'
          ? 'Đang học'
          : s.status === 'attention'
          ? 'Cần theo dõi'
          : s.status === 'transferred'
          ? 'Chuyển trường'
          : 'Nghỉ học',
      'Ghi chú': s.notes || '',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Column widths for professional readability
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 25 },
    { wch: 10 },
    { wch: 10 },
    { wch: 10 },
    { wch: 14 },
    { wch: 25 },
    { wch: 16 },
    { wch: 14 },
    { wch: 14 },
    { wch: 14 },
    { wch: 30 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'HocSinh_NgoiSao');

  const today = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `Danh_sach_hoc_sinh_Ngoi_Sao_${today}.xlsx`);
}
