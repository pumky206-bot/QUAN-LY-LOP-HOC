import { AppData, ClassRoom, Student, Lesson, Task, TaskSubmission, GradeRecord, StudentFeedback, ActivityLog, AppSettings } from '../types';

export const initialSettings: AppSettings = {
  "teacherName": "Bùi Thị Ra",
  "schoolName": "Trường THCS, THPT Ngôi Sao",
  "currentSchoolYear": "2026 - 2027",
  "attentionScoreThreshold": 6.5,
  "attentionCompletionThreshold": 75
};

export const initialClasses: ClassRoom[] = [
  {
    "id": "cls_6a1",
    "code": "6A1",
    "name": "Lớp 6A1 (Khối THCS - Tin học 6)",
    "grade": 6,
    "schoolYear": "2026 - 2027",
    "subject": "Tin học 6",
    "teacher": "Cô Bùi Thị Ra",
    "room": "Phòng thực hành Tin học 1 (Tầng 2)",
    "notes": "Lớp mới làm quen Tin học THCS, rất hứng thú với sơ đồ tư duy và thuật toán trực quan.",
    "createdAt": "2026-08-20"
  },
  {
    "id": "cls_7a1",
    "code": "7A1",
    "name": "Lớp 7A1 (Khối THCS - Tin học 7)",
    "grade": 7,
    "schoolYear": "2026 - 2027",
    "subject": "Tin học 7",
    "teacher": "Cô Bùi Thị Ra",
    "room": "Phòng thực hành Tin học 2 (Tầng 2)",
    "notes": "Lớp tích cực, thao tác bảng tính và làm bài trình chiếu nhanh nhẹn, sáng tạo.",
    "createdAt": "2026-08-20"
  },
  {
    "id": "cls_8a1",
    "code": "8A1",
    "name": "Lớp 8A1 (Khối THCS - Tin học 8)",
    "grade": 8,
    "schoolYear": "2026 - 2027",
    "subject": "Tin học 8",
    "teacher": "Cô Bùi Thị Ra",
    "room": "Phòng thực hành Tin học 1 (Tầng 2)",
    "notes": "Nhiều học sinh có năng khiếu đồ hoạ, xử lý ảnh và tư duy lập trình khối lệnh gỡ lỗi tốt.",
    "createdAt": "2026-08-22"
  },
  {
    "id": "cls_9a1",
    "code": "9A1",
    "name": "Lớp 9A1 (Khối THCS - Tin học 9)",
    "grade": 9,
    "schoolYear": "2026 - 2027",
    "subject": "Tin học 9",
    "teacher": "Cô Bùi Thị Ra",
    "room": "Phòng thực hành Tin học 2 (Tầng 2)",
    "notes": "Khối cuối cấp THCS, thành thạo các hàm tính toán nâng cao (COUNTIF, SUMIF, IF) và dựng video kịch bản.",
    "createdAt": "2026-08-22"
  },
  {
    "id": "cls_10a1",
    "code": "10A1",
    "name": "Lớp 10A1 (Khối THPT - Tin học 10)",
    "grade": 10,
    "schoolYear": "2026 - 2027",
    "subject": "Tin học 10",
    "teacher": "Cô Bùi Thị Ra",
    "room": "Phòng máy Lab Chuyên Tin (Tầng 3 Nhà A)",
    "notes": "Lớp chuyên định hướng Khoa học máy tính & CNTT, đang lập trình Python và thiết kế vector Inkscape.",
    "createdAt": "2026-08-25"
  }
];

export const initialStudents: Student[] = [
  {
    "id": "stu_6001",
    "code": "NS06-001",
    "fullName": "Nguyễn Đăng Khôi",
    "classId": "cls_6a1",
    "birthDate": "2014-03-15",
    "gender": "Nam",
    "parentContact": "0912.111.222 (Bố)",
    "status": "active",
    "needsSupport": false,
    "notes": "Say mê máy tính, vẽ sơ đồ tư duy Mindmap rất đẹp.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_6002",
    "code": "NS06-002",
    "fullName": "Lê Mai Anh",
    "classId": "cls_6a1",
    "birthDate": "2014-07-20",
    "gender": "Nữ",
    "parentContact": "0983.333.444 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Gõ phím mười ngón nhanh, trình bày bảng biểu rõ ràng.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_6003",
    "code": "NS06-003",
    "fullName": "Phạm Bảo Nam",
    "classId": "cls_6a1",
    "birthDate": "2014-11-05",
    "gender": "Nam",
    "parentContact": "0904.555.666 (Bố)",
    "status": "attention",
    "needsSupport": true,
    "notes": "Còn lúng túng khi thao tác lưu trữ thư mục và gửi email.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_6004",
    "code": "NS06-004",
    "fullName": "Hoàng Trúc Linh",
    "classId": "cls_6a1",
    "birthDate": "2014-01-28",
    "gender": "Nữ",
    "parentContact": "0975.777.888 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Tư duy logic thuật toán rất sáng tạo.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_7001",
    "code": "NS07-001",
    "fullName": "Trần Minh Quân",
    "classId": "cls_7a1",
    "birthDate": "2013-05-12",
    "gender": "Nam",
    "parentContact": "0913.222.333 (Bố)",
    "status": "active",
    "needsSupport": false,
    "notes": "Thành thạo công thức tính toán và biểu đồ trên Excel.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_7002",
    "code": "NS07-002",
    "fullName": "Đặng Ngọc Diệp",
    "classId": "cls_7a1",
    "birthDate": "2013-09-18",
    "gender": "Nữ",
    "parentContact": "0984.444.555 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Thuyết trình PowerPoint lưu loát, hiệu ứng trang nhã.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_7003",
    "code": "NS07-003",
    "fullName": "Vũ Hải Long",
    "classId": "cls_7a1",
    "birthDate": "2013-12-02",
    "gender": "Nam",
    "parentContact": "0905.666.777 (Bố)",
    "status": "active",
    "needsSupport": false,
    "notes": "Hiểu nhanh thuật toán tìm kiếm nhị phân và sắp xếp.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_7004",
    "code": "NS07-004",
    "fullName": "Bùi Kim Ngân",
    "classId": "cls_7a1",
    "birthDate": "2013-04-25",
    "gender": "Nữ",
    "parentContact": "0976.888.999 (Mẹ)",
    "status": "attention",
    "needsSupport": true,
    "notes": "Cần hướng dẫn thêm phần khoá địa chỉ tuyệt đối trong bảng tính.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_8001",
    "code": "NS08-001",
    "fullName": "Đoàn Nhật Minh",
    "classId": "cls_8a1",
    "birthDate": "2012-04-18",
    "gender": "Nam",
    "parentContact": "0915.666.888 (Bố)",
    "status": "active",
    "needsSupport": false,
    "notes": "Xử lý hình ảnh và tách nền trên GIMP/Photoshop rất khéo.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_8002",
    "code": "NS08-002",
    "fullName": "Phạm Ngọc Ánh",
    "classId": "cls_8a1",
    "birthDate": "2012-06-25",
    "gender": "Nữ",
    "parentContact": "0977.111.999 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Trình bày văn bản nâng cao chuẩn mẫu, sáng tạo.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_8003",
    "code": "NS08-003",
    "fullName": "Vũ Quốc Huy",
    "classId": "cls_8a1",
    "birthDate": "2012-11-09",
    "gender": "Nam",
    "parentContact": "0902.333.777 (Bố)",
    "status": "active",
    "needsSupport": false,
    "notes": "Lập trình điều khiển thuật toán thông minh, tìm lỗi nhanh.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_9001",
    "code": "NS09-001",
    "fullName": "Tạ Minh Triết",
    "classId": "cls_9a1",
    "birthDate": "2011-05-10",
    "gender": "Nam",
    "parentContact": "0912.888.777 (Bố)",
    "status": "active",
    "needsSupport": false,
    "notes": "Giải bài toán tin học xuất sắc, đạt giải HSG Tin học cấp trường.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_9002",
    "code": "NS09-002",
    "fullName": "Lý Kim Chi",
    "classId": "cls_9a1",
    "birthDate": "2011-10-22",
    "gender": "Nữ",
    "parentContact": "0989.444.666 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Kỹ năng dựng video kịch bản truyền thông rất chuyên nghiệp.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_9003",
    "code": "NS09-003",
    "fullName": "Dương Gia Hân",
    "classId": "cls_9a1",
    "birthDate": "2011-08-15",
    "gender": "Nữ",
    "parentContact": "0933.222.111 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Sử dụng thành thạo hàm COUNTIF, SUMIF và bảng kiểm soát dữ liệu.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_9004",
    "code": "NS09-004",
    "fullName": "Chu Văn An",
    "classId": "cls_9a1",
    "birthDate": "2011-12-11",
    "gender": "Nam",
    "parentContact": "0966.555.444 (Bố)",
    "status": "attention",
    "needsSupport": true,
    "notes": "Cần hỗ trợ về cú pháp lồng hàm IF trong bảng tính điện tử.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_1001",
    "code": "NS10-001",
    "fullName": "Nguyễn Minh Khang",
    "classId": "cls_10a1",
    "birthDate": "2010-04-12",
    "gender": "Nam",
    "parentContact": "0912.456.789 (Bố)",
    "status": "active",
    "needsSupport": false,
    "notes": "Đội tuyển HSG Tin học, code Python thành thạo các cấu trúc dữ liệu list, string.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_1002",
    "code": "NS10-002",
    "fullName": "Trần Phương Linh",
    "classId": "cls_10a1",
    "birthDate": "2010-09-25",
    "gender": "Nữ",
    "parentContact": "0983.112.233 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Thiết kế vector Inkscape ấn tượng, tư duy lập trình cấu trúc tốt.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_1003",
    "code": "NS10-003",
    "fullName": "Lê Hoàng Nam",
    "classId": "cls_10a1",
    "birthDate": "2010-01-18",
    "gender": "Nam",
    "parentContact": "0904.556.778 (Bố)",
    "status": "attention",
    "needsSupport": true,
    "notes": "Hay nhầm lẫn thụt lề (IndentationError) và phạm vi biến trong hàm Python.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_1004",
    "code": "NS10-004",
    "fullName": "Phạm Thu Thảo",
    "classId": "cls_10a1",
    "birthDate": "2010-11-03",
    "gender": "Nữ",
    "parentContact": "0975.334.455 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Chăm chỉ hoàn thiện bài tập lớn và dự án lập trình Python.",
    "createdAt": "2026-08-28"
  },
  {
    "id": "stu_1005",
    "code": "NS10-005",
    "fullName": "Đỗ Gia Huy",
    "classId": "cls_10a1",
    "birthDate": "2010-06-30",
    "gender": "Nam",
    "parentContact": "0966.889.900 (Mẹ)",
    "status": "active",
    "needsSupport": false,
    "notes": "Tư duy thuật toán tốt, giải quyết bài toán kiểm thử và gỡ lỗi nhanh.",
    "createdAt": "2026-08-28"
  }
];

export const initialLessons: Lesson[] = [
  {
    "id": "les_tin6_1",
    "code": "TH06-01",
    "title": "Bài 1. Thông tin và dữ liệu",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Phân biệt thông tin và dữ liệu; nêu được tầm quan trọng của thông tin trong đời sống.",
    "contentSummary": "Khái niệm thông tin, dữ liệu, vật mang tin; mối quan hệ giữa thông tin và hành vi của con người.",
    "date": "2026-09-08",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 5), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_2",
    "code": "TH06-02",
    "title": "Bài 2. Xử lí thông tin",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Nêu được các bước trong quy trình xử lí thông tin của con người và máy tính.",
    "contentSummary": "Quy trình 4 bước: Thu nhận thông tin - Lưu trữ - Xử lí - Truyền đạt; vai trò của máy tính số.",
    "date": "2026-09-15",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 8), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_3",
    "code": "TH06-03",
    "title": "Bài 3. Thông tin trong máy tính",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Biết máy tính biểu diễn thông tin bằng dãy bit (0 và 1); nắm được các đơn vị đo dung lượng thông tin.",
    "contentSummary": "Khái niệm bit, byte, KB, MB, GB, TB; biểu diễn văn bản, hình ảnh, âm thanh dưới dạng dãy nhị phân.",
    "date": "2026-09-22",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 12), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_4",
    "code": "TH06-04",
    "title": "Bài 4. Mạng máy tính",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 2. Mạng máy tính và Internet",
    "objectives": "Nêu được khái niệm và các thành phần chính của mạng máy tính; lợi ích của kết nối mạng.",
    "contentSummary": "Thiết bị đầu cuối, thiết bị kết nối (Switch, Modem, Router), môi trường truyền dẫn có dây và không dây (Wi-Fi).",
    "date": "2026-09-29",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 16), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_5",
    "code": "TH06-05",
    "title": "Bài 5. Internet",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 2. Mạng máy tính và Internet",
    "objectives": "Hiểu đặc điểm chính của mạng Internet toàn cầu; biết các dịch vụ cơ bản của Internet.",
    "contentSummary": "Mạng toàn cầu Internet, lợi ích tra cứu học tập, giải trí, kết nối bạn bè và những nguy cơ cần phòng tránh.",
    "date": "2026-10-06",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 20), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_6",
    "code": "TH06-06",
    "title": "Bài 6. Mạng thông tin toàn cầu",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Biết khái niệm World Wide Web (WWW), website, trang web, địa chỉ URL và trình duyệt web.",
    "contentSummary": "Cách truy cập website, duyệt web bằng Chrome/Edge, tìm hiểu siêu văn bản và siêu liên kết.",
    "date": "2026-10-13",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 23), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_7",
    "code": "TH06-07",
    "title": "Bài 7. Tìm kiếm thông tin trên Internet",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Sử dụng thành thạo máy tìm kiếm để tìm thông tin bằng từ khoá hiệu quả.",
    "contentSummary": "Kĩ năng chọn từ khoá chính xác, sử dụng dấu ngoặc kép để tìm cụm từ chính xác; đánh giá kết quả tìm kiếm.",
    "date": "2026-10-20",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 28), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_8",
    "code": "TH06-08",
    "title": "Bài 8. Thư điện tử",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Biết cấu trúc địa chỉ email; các bước tạo, soạn, gửi và nhận thư điện tử đính kèm tệp.",
    "contentSummary": "Ưu thế của email so với thư truyền thống; cú pháp địa chỉ email; quy tắc an toàn và lịch sự khi gửi thư.",
    "date": "2026-10-27",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 32), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_9",
    "code": "TH06-09",
    "title": "Bài 9. An toàn thông tin trên Internet",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số",
    "objectives": "Nhận biết các mối nguy hiểm trên không gian mạng và cách bảo vệ thông tin cá nhân.",
    "contentSummary": "Bảo mật mật khẩu mạnh, tránh bấm liên kết lạ, phòng ngừa mã độc và virus máy tính; quy tắc ứng xử chuẩn mực.",
    "date": "2026-11-03",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 37), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_10",
    "code": "TH06-10",
    "title": "Bài 10. Sơ đồ tư duy",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 5. Ứng dụng tin học",
    "objectives": "Hiểu lợi ích của sơ đồ tư duy; biết sử dụng phần mềm tạo sơ đồ tư duy phục vụ học tập.",
    "contentSummary": "Các thành phần của sơ đồ tư duy: chủ đề chính, nhánh cấp 1, cấp 2, từ khoá, hình ảnh; thực hành phần mềm Mindmap.",
    "date": "2026-11-10",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 42), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_11",
    "code": "TH06-11",
    "title": "Bài 11. Định dạng văn bản",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 5. Ứng dụng tin học",
    "objectives": "Thành thạo định dạng kí tự, định dạng đoạn văn bản trong phần mềm soạn thảo Word.",
    "contentSummary": "Phông chữ, cỡ chữ, kiểu chữ, màu sắc; căn lề trái/phải/giữa/đều, khoảng cách dòng và thụt lề đầu dòng.",
    "date": "2026-11-17",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 48), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_12",
    "code": "TH06-12",
    "title": "Bài 12. Trình bày thông tin ở dạng bảng",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 5. Ứng dụng tin học",
    "objectives": "Biết tạo bảng biểu, chèn/xoá dòng, cột, gộp ô và định dạng bảng văn bản rõ ràng.",
    "contentSummary": "Chèn bảng trong văn bản Word; định dạng đường viền, màu nền và căn chỉnh dữ liệu trong ô.",
    "date": "2026-11-24",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 53), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_13",
    "code": "TH06-13",
    "title": "Bài 13. Thực hành: Tìm kiếm và thay thế",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 5. Ứng dụng tin học",
    "objectives": "Sử dụng thành thạo công cụ Find & Replace để sửa lỗi văn bản tự động và nhanh chóng.",
    "contentSummary": "Thực hành thao tác tìm kiếm cụm từ và thay thế hàng loạt trong bài văn dài.",
    "date": "2026-12-01",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 58), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_14",
    "code": "TH06-14",
    "title": "Bài 14. Thực hành tổng hợp: Hoàn thiện sổ lưu niệm",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 5. Ứng dụng tin học",
    "objectives": "Vận dụng tổng hợp các kĩ năng soạn thảo, chèn ảnh, bảng biểu để thiết kế sổ lưu niệm lớp.",
    "contentSummary": "Dự án thực hành nhóm: xây dựng trang giới thiệu tập thể lớp 6A1 với hình ảnh, bảng phân công và bài viết.",
    "date": "2026-12-08",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 61), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_15",
    "code": "TH06-15",
    "title": "Bài 15. Thuật toán",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Hiểu khái niệm thuật toán; mô tả thuật toán bằng phương pháp liệt kê và sơ đồ khối.",
    "contentSummary": "Định nghĩa thuật toán; các hình khối chuẩn trong sơ đồ khối (hình oval, hình bình hành, hình chữ nhật, hình thoi).",
    "date": "2026-12-15",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 63), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_16",
    "code": "TH06-16",
    "title": "Bài 16. Các cấu trúc điều khiển",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Nhận biết và vận dụng 3 cấu trúc điều khiển cơ bản: Tuần tự, Rẽ nhánh, Lặp.",
    "contentSummary": "Cấu trúc tuần tự từng bước; cấu trúc rẽ nhánh Nếu... Thì...; cấu trúc lặp Lặp lại cho đến khi...",
    "date": "2026-12-22",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 67), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin6_17",
    "code": "TH06-17",
    "title": "Bài 17. Chương trình máy tính",
    "subject": "Tin học 6",
    "grade": 6,
    "classIds": [
      "cls_6a1"
    ],
    "topic": "Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Hiểu mối liên hệ giữa thuật toán và chương trình; bước đầu làm quen môi trường lập trình trực quan.",
    "contentSummary": "Khái niệm ngôn ngữ lập trình; chuyển đổi thuật toán sang khối lệnh Scratch trực quan sinh động.",
    "date": "2026-12-29",
    "resources": "Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống (Trang 71), Tài liệu PDF: /assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_1",
    "code": "TH07-01",
    "title": "Bài 1. Thiết bị vào – ra",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Nhận biết chức năng và phân loại các thiết bị vào (input) và thiết bị ra (output) của máy tính.",
    "contentSummary": "Bàn phím, chuột, micro, máy quét; màn hình, máy in, loa; các cổng kết nối phổ biến USB, HDMI.",
    "date": "2026-09-08",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 5), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_2",
    "code": "TH07-02",
    "title": "Bài 2. Phần mềm máy tính",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Phân biệt phần mềm hệ thống (hệ điều hành) và phần mềm ứng dụng; biết vai trò của hệ điều hành.",
    "contentSummary": "Hệ điều hành Windows, Android, iOS; phần mềm ứng dụng học tập, văn phòng, trình duyệt web.",
    "date": "2026-09-15",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 10), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_3",
    "code": "TH07-03",
    "title": "Bài 3. Quản lí dữ liệu trong máy tính",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Tổ chức cây thư mục hợp lí, thực hiện các thao tác tệp và thư mục an toàn.",
    "contentSummary": "Cây thư mục, đường dẫn tệp, phần mở rộng tệp (.docx, .xlsx, .pdf, .png); sao chép, di chuyển, đổi tên tệp.",
    "date": "2026-09-22",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 13), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_4",
    "code": "TH07-04",
    "title": "Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Biết đặc điểm của mạng xã hội, các kênh trao đổi thông tin và cách sử dụng có trách nhiệm.",
    "contentSummary": "Mạng xã hội phổ biến (Facebook, Zalo, YouTube); chia sẻ thông tin văn minh, tôn trọng người khác.",
    "date": "2026-09-29",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 18), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_5",
    "code": "TH07-05",
    "title": "Bài 5. Ứng xử trên mạng",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
    "objectives": "Hiểu quy tắc ứng xử trên mạng, phòng tránh bạo lực mạng và tôn trọng bản quyền số.",
    "contentSummary": "Bộ quy tắc ứng xử trên mạng xã hội; văn hoá giao tiếp trực tuyến; tác hại của tin giả (fake news).",
    "date": "2026-10-06",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 23), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_6",
    "code": "TH07-06",
    "title": "Bài 6. Làm quen với phần mềm bảng tính",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Nắm được giao diện, ô, hàng, cột, bảng tính tính toán điện tử Excel.",
    "contentSummary": "Địa chỉ ô tính, thanh công thức, khối ô tính; nhập dữ liệu số, kí tự, ngày tháng trong bảng tính.",
    "date": "2026-10-13",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 28), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_7",
    "code": "TH07-07",
    "title": "Bài 7. Tính toán tự động trên bảng tính",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Biết nhập công thức toán học bắt đầu bằng dấu bằng (=), sử dụng địa chỉ ô trong tính toán.",
    "contentSummary": "Các phép toán +, -, *, /, ^; tính toán tự động cập nhật khi thay đổi dữ liệu; sao chép công thức.",
    "date": "2026-10-20",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 34), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_8",
    "code": "TH07-08",
    "title": "Bài 8. Công cụ hỗ trợ tính toán",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Sử dụng thành thạo các hàm cơ bản SUM, AVERAGE, MAX, MIN, COUNT trong bảng tính.",
    "contentSummary": "Cú pháp hàm tính tổng SUM, tính trung bình cộng AVERAGE, tìm giá trị lớn nhất MAX, nhỏ nhất MIN.",
    "date": "2026-10-27",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 39), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_9",
    "code": "TH07-09",
    "title": "Bài 9. Trình bày bảng tính",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Định dạng dữ liệu số, kẻ đường viền bảng, căn lề ô tính đẹp mắt, khoa học.",
    "contentSummary": "Định dạng kiểu số thập phân, tiền tệ, phần trăm; tô màu nền bảng điểm lớp học.",
    "date": "2026-11-03",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 45), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_10",
    "code": "TH07-10",
    "title": "Bài 10. Hoàn thiện bảng tính",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Thiết lập trang in, ngắt trang và in bảng tính đúng quy cách; rà soát lỗi bảng tính.",
    "contentSummary": "Xem trước khi in (Print Preview), căn chỉnh vừa khít một trang giấy, in ấn bảng tính thực tế.",
    "date": "2026-11-10",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 51), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_11",
    "code": "TH07-11",
    "title": "Bài 11. Tạo bài trình chiếu",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Tạo trang chiếu mới, chèn văn bản, bố cục trang chiếu (layout) trong PowerPoint.",
    "contentSummary": "Khái niệm bài trình chiếu; tiêu đề trang, nội dung chính; chọn mẫu bố cục phù hợp chủ đề.",
    "date": "2026-11-17",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 55), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_12",
    "code": "TH07-12",
    "title": "Bài 12. Định dạng đối tượng trên trang chiếu",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Chèn và định dạng hình ảnh, sơ đồ, hiệu ứng chuyển trang (Transition) và hiệu ứng đối tượng (Animation).",
    "contentSummary": "Nguyên tắc thiết kế trang chiếu không quá nhiều chữ; phối hợp màu sắc tương phản rõ ràng.",
    "date": "2026-11-24",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 61), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_13",
    "code": "TH07-13",
    "title": "Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Hoàn thiện và báo cáo bài thuyết trình chuyên đề khoa học công nghệ của nhóm học sinh.",
    "contentSummary": "Trình diễn toàn màn hình (Slide Show), sử dụng bút laser ảo và kĩ năng trả lời câu hỏi phản biện.",
    "date": "2026-12-01",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 68), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_14",
    "code": "TH07-14",
    "title": "Bài 14. Thuật toán tìm kiếm tuần tự",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Hiểu nguyên lý hoạt động và mô tả được thuật toán tìm kiếm tuần tự (Sequential Search).",
    "contentSummary": "Duyệt từng phần tử từ đầu đến cuối danh sách cho đến khi tìm thấy hoặc hết danh sách.",
    "date": "2026-12-08",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 71), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_15",
    "code": "TH07-15",
    "title": "Bài 15. Thuật toán tìm kiếm nhị phân",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Nắm vững điều kiện áp dụng (danh sách đã sắp xếp) và các bước chia đôi của tìm kiếm nhị phân (Binary Search).",
    "contentSummary": "So sánh phần tử giữa, thu hẹp nửa trái hoặc nửa phải; so sánh tốc độ vượt trội với tìm kiếm tuần tự.",
    "date": "2026-12-15",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 74), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin7_16",
    "code": "TH07-16",
    "title": "Bài 16. Thuật toán sắp xếp",
    "subject": "Tin học 7",
    "grade": 7,
    "classIds": [
      "cls_7a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Mô tả thuật toán sắp xếp nổi bọt (Bubble Sort) và thuật toán sắp xếp chọn (Selection Sort).",
    "contentSummary": "Quy trình hoán đổi các cặp phần tử liền kề; sắp xếp danh sách điểm học sinh tăng dần/giảm dần.",
    "date": "2026-12-22",
    "resources": "Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống (Trang 78), Tài liệu PDF: /assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_1",
    "code": "TH08-01",
    "title": "Bài 1. Lược sử công cụ tính toán",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Trình bày sơ lược lịch sử phát triển máy tính từ bàn tính cơ khí đến máy tính điện tử và AI.",
    "contentSummary": "Bàn tính gảy, máy tính cơ khí Pascaline, máy tính thế hệ đèn điện tử chân không đến vi mạch tích hợp và siêu máy tính.",
    "date": "2026-09-08",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 5), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_2",
    "code": "TH08-02",
    "title": "Bài 2. Thông tin trong môi trường số",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Nhận biết đặc điểm thông tin số: dễ nhân bản, dễ lan truyền, khó xóa bỏ hoàn toàn.",
    "contentSummary": "Tính chính xác, độ tin cậy của thông tin trên mạng; tác động của thông tin số đối với xã hội.",
    "date": "2026-09-15",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 10), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_3",
    "code": "TH08-03",
    "title": "Bài 3. Thực hành: Khai thác thông tin số",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Tìm kiếm, đánh giá và trích dẫn thông tin số phục vụ dự án học tập đúng quy định.",
    "contentSummary": "Kĩ năng lọc nguồn tin uy tín (.edu, .gov); cách ghi nguồn tác giả và tài liệu tham khảo.",
    "date": "2026-09-22",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 14), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_4",
    "code": "TH08-04",
    "title": "Bài 4. Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
    "objectives": "Tuân thủ luật sở hữu trí tuệ, tôn trọng bản quyền phần mềm và dữ liệu số.",
    "contentSummary": "Khái niệm bản quyền, phần mềm bản quyền vs phần mềm lậu; trách nhiệm pháp lý khi chia sẻ tài liệu số.",
    "date": "2026-09-29",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 18), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_5",
    "code": "TH08-05",
    "title": "Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Vận dụng công thức và hàm bảng tính để giải quyết bài toán quản lí thu chi, tính điểm trung bình.",
    "contentSummary": "Sử dụng địa chỉ tương đối và địa chỉ tuyệt đối ($A$1) khi sao chép công thức toán học.",
    "date": "2026-10-06",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 21), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_6",
    "code": "TH08-06",
    "title": "Bài 6. Sắp xếp và lọc dữ liệu",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Sử dụng thành thạo công cụ Sort & Filter trên bảng dữ liệu Excel để tra cứu thông tin.",
    "contentSummary": "Sắp xếp danh sách nhiều tiêu chí; lọc tự động (AutoFilter) trích xuất học sinh đạt điểm giỏi.",
    "date": "2026-10-13",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 27), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_7",
    "code": "TH08-07",
    "title": "Bài 7. Trực quan hoá dữ liệu",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Biết chọn dạng biểu đồ thích hợp (cột, tròn, đường) để trực quan hoá số liệu thống kê.",
    "contentSummary": "Tạo biểu đồ hình cột so sánh, biểu đồ hình tròn tỷ lệ cơ cấu; gắn nhãn dữ liệu và tiêu đề biểu đồ.",
    "date": "2026-10-20",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 32), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_8a",
    "code": "TH08-8a",
    "title": "Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao",
    "objectives": "Tạo danh sách dấu đầu dòng (Bullet) và danh sách có thứ tự (Numbering); chèn và định dạng ảnh.",
    "contentSummary": "Căn chỉnh ảnh với dòng văn bản (Wrap Text), hiệu ứng đường viền ảnh chuyên nghiệp trong Word.",
    "date": "2026-10-27",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 36), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_9a",
    "code": "TH08-9a",
    "title": "Bài 9a. Tạo đầu trang, chân trang cho văn bản",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao",
    "objectives": "Biết chèn Header & Footer, đánh số trang tự động cho báo cáo học tập nhiều trang.",
    "contentSummary": "Thiết lập số trang khác nhau giữa trang bìa và trang nội dung văn bản.",
    "date": "2026-11-03",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 42), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_10a",
    "code": "TH08-10a",
    "title": "Bài 10a. Định dạng nâng cao cho trang chiếu",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao",
    "objectives": "Áp dụng thiết kế đồng bộ Theme, màu sắc, phông chữ chuẩn cho bài thuyết trình.",
    "contentSummary": "Sử dụng Slide Master định dạng chung toàn bộ slide trình chiếu nhanh chóng, chuyên nghiệp.",
    "date": "2026-11-10",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 46), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_11a",
    "code": "TH08-11a",
    "title": "Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao",
    "objectives": "Khai thác bản mẫu Template có sẵn để tạo bài trình chiếu đẹp mắt, tiết kiệm thời gian.",
    "contentSummary": "Tìm kiếm và tuỳ biến template bài giảng điện tử sinh động theo chủ đề bài học.",
    "date": "2026-11-17",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 51), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_8b",
    "code": "TH08-8b",
    "title": "Bài 8b. Phần mềm chỉnh sửa ảnh",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh",
    "objectives": "Làm quen giao diện phần mềm chỉnh sửa ảnh, khái niệm lớp (layer), vùng chọn.",
    "contentSummary": "Công cụ chọn vùng hình chữ nhật, tự do (Lasso); tạo mới, ẩn/hiện và sắp xếp các lớp ảnh.",
    "date": "2026-11-24",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 56), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_9b",
    "code": "TH08-9b",
    "title": "Bài 9b. Thay đổi khung hình, kích thước ảnh",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh",
    "objectives": "Thực hiện cắt cúp ảnh (Crop), phóng to, thu nhỏ kích thước và độ phân giải ảnh chuẩn.",
    "contentSummary": "Bảo toàn tỷ lệ khung hình ảnh; xoay ảnh nghiêng, lật gương ảnh chính xác.",
    "date": "2026-12-01",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 62), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_10b",
    "code": "TH08-10b",
    "title": "Bài 10b. Thêm văn bản, tạo hiệu ứng cho ảnh",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh",
    "objectives": "Chèn chữ nghệ thuật, áp dụng hiệu ứng đổ bóng, viền sáng và bộ lọc màu sắc (Filter).",
    "contentSummary": "Định dạng phông chữ tiếng Việt; tạo áp phích quảng bá sự kiện trường học.",
    "date": "2026-12-08",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 66), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_11b",
    "code": "TH08-11b",
    "title": "Bài 11b. Thực hành tổng hợp: Chỉnh sửa ảnh",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh",
    "objectives": "Hoàn thiện sản phẩm ảnh nghệ thuật: thiệp chúc mừng hoặc poster tuyên truyền trường học.",
    "contentSummary": "Tích hợp ghép ảnh nhiều lớp, làm mờ hậu cảnh và xuất file ảnh định dạng PNG/JPEG chất lượng cao.",
    "date": "2026-12-15",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 70), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_12",
    "code": "TH08-12",
    "title": "Bài 12. Từ thuật toán đến chương trình",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Chuyển đổi bài toán thực tế thành thuật toán và viết chương trình chạy trên máy tính.",
    "contentSummary": "Mô tả bài toán qua Input, Output và các bước thực thi tuần tự trong môi trường lập trình.",
    "date": "2026-12-22",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 73), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_13",
    "code": "TH08-13",
    "title": "Bài 13. Biểu diễn dữ liệu",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Hiểu khái niệm biến số, hằng số và các kiểu dữ liệu số nguyên, số thực, xâu kí tự.",
    "contentSummary": "Khai báo biến, gán giá trị cho biến và sử dụng biến trong biểu thức tính toán.",
    "date": "2026-12-29",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 76), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_14",
    "code": "TH08-14",
    "title": "Bài 14. Cấu trúc điều khiển",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Lập trình câu lệnh điều kiện If-Else và câu lệnh lặp For/While trong chương trình.",
    "contentSummary": "Xây dựng bài toán kiểm tra tính chẵn lẻ, tính tổng dãy số tự nhiên bằng vòng lặp.",
    "date": "2027-01-05",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 80), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_15",
    "code": "TH08-15",
    "title": "Bài 15. Gỡ lỗi",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Phân biệt lỗi cú pháp (Syntax error) và lỗi ngữ nghĩa (Logic error); biết cách đặt breakpoint gỡ lỗi.",
    "contentSummary": "Phương pháp gỡ lỗi từng bước, quan sát giá trị biến để sửa sai thuật toán.",
    "date": "2027-01-12",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 86), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin8_16",
    "code": "TH08-16",
    "title": "Bài 16. Tin học với nghề nghiệp",
    "subject": "Tin học 8",
    "grade": 8,
    "classIds": [
      "cls_8a1"
    ],
    "topic": "Chủ đề 6. Hướng nghiệp với Tin học",
    "objectives": "Tìm hiểu các ngành nghề trong lĩnh vực công nghệ thông tin và kĩ năng cần chuẩn bị.",
    "contentSummary": "Nghề lập trình viên, thiết kế đồ hoạ, quản trị mạng, an ninh mạng, chuyên viên phân tích dữ liệu.",
    "date": "2027-01-19",
    "resources": "Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống (Trang 91), Tài liệu PDF: /assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_1",
    "code": "TH09-01",
    "title": "Bài 1. Thế giới kĩ thuật số",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 1. Máy tính và cộng đồng",
    "objectives": "Nhận biết sự phổ biến của thiết bị kĩ thuật số trong đời sống và cuộc cách mạng công nghiệp 4.0.",
    "contentSummary": "Internet vạn vật (IoT), trí tuệ nhân tạo (AI), điện toán đám mây và tác động đến cuộc sống con người.",
    "date": "2026-09-08",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 5), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_2",
    "code": "TH09-02",
    "title": "Bài 2. Thông tin trong giải quyết vấn đề",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Biết thu thập, phân tích thông tin để đưa ra quyết định hợp lý trong tình huống thực tế.",
    "contentSummary": "Xác định vấn đề, các tiêu chí lựa chọn giải pháp dựa trên dữ liệu thu thập được.",
    "date": "2026-09-15",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 9), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_3",
    "code": "TH09-03",
    "title": "Bài 3. Thực hành: Đánh giá chất lượng thông tin",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
    "objectives": "Đánh giá độ chính xác, tính cập nhật và mục đích của thông tin trên mạng Internet.",
    "contentSummary": "Thực hành phân tích các bài viết mạng xã hội, nhận diện dấu hiệu lừa đảo và tin giả.",
    "date": "2026-09-22",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 12), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_4",
    "code": "TH09-04",
    "title": "Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
    "objectives": "Hiểu các quy định cơ bản của Luật An ninh mạng và trách nhiệm khi dùng dịch vụ số.",
    "contentSummary": "Bảo vệ dữ liệu cá nhân, quyền riêng tư; các hành vi bị nghiêm cấm trên không gian mạng.",
    "date": "2026-09-29",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 15), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_5",
    "code": "TH09-05",
    "title": "Bài 5. Tìm hiểu phần mềm mô phỏng",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Hiểu khái niệm và vai trò của phần mềm mô phỏng trong học tập khoa học và đời sống.",
    "contentSummary": "Mô phỏng thí nghiệm vật lý, hoá học ảo PhET; mô phỏng giao thông và hệ mặt trời.",
    "date": "2026-10-06",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 20), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_6",
    "code": "TH09-06",
    "title": "Bài 6. Thực hành: Khai thác phần mềm mô phỏng",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Thực hành quan sát và làm thí nghiệm ảo trên phần mềm mô phỏng giáo dục.",
    "contentSummary": "Thao tác thay đổi các tham số đầu vào và quan sát hiện tượng tương tác trên mô hình.",
    "date": "2026-10-13",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 23), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_7",
    "code": "TH09-07",
    "title": "Bài 7. Trình bày thông tin trong trao đổi và hợp tác",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Sử dụng các công cụ trực quan để trao đổi, làm việc nhóm trực tuyến hiệu quả.",
    "contentSummary": "Chia sẻ tài liệu dùng chung Google Docs/OneDrive; bình luận phản hồi trong làm việc nhóm.",
    "date": "2026-10-20",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 27), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_8",
    "code": "TH09-08",
    "title": "Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Thiết kế báo cáo trình diễn nhóm kết hợp bảng biểu, đồ thị và hình ảnh tương tác.",
    "contentSummary": "Phân công công việc nhóm; chuẩn bị slide tổng kết hoạt động ngoại khoá lớp 9A1.",
    "date": "2026-10-27",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 30), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_9a",
    "code": "TH09-9a",
    "title": "Bài 9a. Sử dụng công cụ xác thực dữ liệu",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao",
    "objectives": "Sử dụng Data Validation để kiểm soát giá trị nhập vào ô tính (giới hạn số, danh sách thả xuống Dropdown).",
    "contentSummary": "Tạo danh sách chọn lớp, giới hạn điểm số từ 0 đến 10; hiển thị thông báo lỗi khi nhập sai.",
    "date": "2026-11-03",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 34), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_10a",
    "code": "TH09-10a",
    "title": "Bài 10a. Sử dụng hàm COUNTIF",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao",
    "objectives": "Thành thạo hàm COUNTIF để đếm số ô thoả mãn điều kiện trong bảng tính điện tử.",
    "contentSummary": "Đếm số học sinh đạt điểm xuất sắc; đếm số buổi nghỉ học có phép/không phép.",
    "date": "2026-11-10",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 41), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_11a",
    "code": "TH09-11a",
    "title": "Bài 11a. Sử dụng hàm SUMIF",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao",
    "objectives": "Áp dụng hàm SUMIF để tính tổng các giá trị thoả mãn điều kiện cho trước.",
    "contentSummary": "Tính tổng học bổng lớp, tính tổng chi phí sinh hoạt theo từng nhóm danh mục.",
    "date": "2026-11-17",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 45), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_12a",
    "code": "TH09-12a",
    "title": "Bài 12a. Sử dụng hàm IF",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao",
    "objectives": "Nắm vững cú pháp hàm điều kiện IF(logical_test, value_if_true, value_if_false) và IF lồng nhau.",
    "contentSummary": "Xếp loại học lực học sinh tự động căn cứ vào điểm trung bình môn.",
    "date": "2026-11-24",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 48), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_13a",
    "code": "TH09-13a",
    "title": "Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao",
    "objectives": "Vận dụng tổng hợp các hàm IF, COUNTIF, SUMIF và Data Validation để hoàn thiện bảng tính thu chi.",
    "contentSummary": "Dự án thực tế: Lập bảng tính kế hoạch tài chính cá nhân và gia đình theo tháng.",
    "date": "2026-12-01",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 52), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_9b",
    "code": "TH09-9b",
    "title": "Bài 9b. Các chức năng chính của phần mềm làm video",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm làm video",
    "objectives": "Nhận biết giao diện Timeline, thư viện media và các công cụ cắt ghép video cơ bản.",
    "contentSummary": "Giao diện làm việc của Video Editor/CapCut; thêm video, hình ảnh và nhạc nền.",
    "date": "2026-12-08",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 55), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_10b",
    "code": "TH09-10b",
    "title": "Bài 10b. Chuẩn bị dữ liệu và dựng video",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm làm video",
    "objectives": "Lập kịch bản phân cảnh (Storyboard), sắp xếp trình tự clip và hình ảnh trên Timeline.",
    "contentSummary": "Kĩ năng chọn góc quay; đồng bộ âm thanh giọng nói và phụ đề video.",
    "date": "2026-12-15",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 60), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_11b",
    "code": "TH09-11b",
    "title": "Bài 11b. Thực hành: Dựng video theo kịch bản",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm làm video",
    "objectives": "Thực hiện cắt tỉa đoạn phim thừa (Trim/Split), thêm hiệu ứng chuyển cảnh mềm mại.",
    "contentSummary": "Chèn hiệu ứng Fade in/Fade out âm thanh; lồng tiếng giới thiệu danh lam thắng cảnh.",
    "date": "2026-12-22",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 65), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_12b",
    "code": "TH09-12b",
    "title": "Bài 12b. Hoàn thành việc dựng video",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm làm video",
    "objectives": "Thêm tiêu đề mở đầu, phụ đề chạy chữ và danh đề kết thúc (Credits) video.",
    "contentSummary": "Định dạng kiểu chữ phụ đề dễ đọc, canh chỉnh thời lượng hiển thị khớp lời thoại.",
    "date": "2026-12-29",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 69), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_13b",
    "code": "TH09-13b",
    "title": "Bài 13b. Biên tập và xuất video",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 4b. Làm quen với phần mềm làm video",
    "objectives": "Xem trước, chỉnh màu và xuất tệp video hoàn chỉnh chuẩn Full HD 1080p.",
    "contentSummary": "Chọn định dạng MP4 nén dung lượng phù hợp chia sẻ lên Internet; báo cáo sản phẩm.",
    "date": "2027-01-05",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 73), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_14",
    "code": "TH09-14",
    "title": "Bài 14. Giải quyết vấn đề",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Phân tích vấn đề phức tạp thành các bài toán con nhỏ hơn theo phương pháp chia để trị.",
    "contentSummary": "Quy trình tư duy máy tính (Computational Thinking): Phân rã, Nhận diện mẫu, Trừu tượng hoá, Thiết kế thuật toán.",
    "date": "2027-01-12",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 76), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_15",
    "code": "TH09-15",
    "title": "Bài 15. Bài toán tin học",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Xác định rõ Input, Output và tính đúng đắn của giải thuật cho bài toán tin học.",
    "contentSummary": "Ví dụ bài toán tìm ước chung lớn nhất (UCLN), bài toán kiểm tra số nguyên tố.",
    "date": "2027-01-19",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 79), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_16",
    "code": "TH09-16",
    "title": "Bài 16. Thực hành: Lập chương trình máy tính",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Viết và chạy thử chương trình giải bài toán trên máy tính, kiểm tra các trường hợp biên.",
    "contentSummary": "Thực hành lập trình tính toán và kiểm tra kết quả với bộ dữ liệu mẫu.",
    "date": "2027-01-26",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 83), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin9_17",
    "code": "TH09-17",
    "title": "Bài 17. Tin học và thế giới nghề nghiệp",
    "subject": "Tin học 9",
    "grade": 9,
    "classIds": [
      "cls_9a1"
    ],
    "topic": "Chủ đề 6. Hướng nghiệp với tin học",
    "objectives": "Tìm hiểu xu hướng nghề nghiệp trong kỉ nguyên số và cơ hội việc làm ngành CNTT.",
    "contentSummary": "Các nhóm ngành Công nghệ phần mềm, Hệ thống thông tin, An toàn thông tin, Trí tuệ nhân tạo.",
    "date": "2027-02-02",
    "resources": "Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống (Trang 87), Tài liệu PDF: /assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_1",
    "code": "TH010-01",
    "title": "Bài 1. Thông tin và xử lí thông tin",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 1. Máy tính và xã hội tri thức",
    "objectives": "Phân biệt thông tin và dữ liệu ở mức độ chuyên sâu; hiểu chu trình chuyển đổi thông tin thành tri thức.",
    "contentSummary": "Dữ liệu số, quá trình thu thập, xử lý và tạo ra quyết định thông minh của con người và hệ thống số.",
    "date": "2026-09-08",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 6), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_2",
    "code": "TH010-02",
    "title": "Bài 2. Vai trò của thiết bị thông minh và tin học đối với xã hội",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 1. Máy tính và xã hội tri thức",
    "objectives": "Hiểu các đặc tính của thiết bị thông minh (Smart devices) và đóng góp của tin học trong công nghiệp 4.0.",
    "contentSummary": "Điện thoại thông minh, đồng hồ thông minh, hệ thống cảm biến IoT trong y tế, nông nghiệp công nghệ cao.",
    "date": "2026-09-15",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 11), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_3",
    "code": "TH010-03",
    "title": "Bài 3. Một số kiểu dữ liệu và dữ liệu văn bản",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 1. Máy tính và xã hội tri thức",
    "objectives": "Biết cách mã hoá văn bản bằng bảng mã ASCII và Unicode (UTF-8, UTF-16).",
    "contentSummary": "Mã nhị phân biểu diễn kí tự; tầm quan trọng của chuẩn quốc tế Unicode trong hiển thị tiếng Việt.",
    "date": "2026-09-22",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 16), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_4",
    "code": "TH010-04",
    "title": "Bài 4. Hệ nhị phân và dữ liệu số nguyên",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 1. Máy tính và xã hội tri thức",
    "objectives": "Chuyển đổi số giữa hệ thập phân (hệ 10), hệ nhị phân (hệ 2) và hệ thập lục phân (hệ 16).",
    "contentSummary": "Quy tắc chia cho 2 lấy dư; biểu diễn số nguyên có dấu bằng phương pháp bù 2 (Two's complement).",
    "date": "2026-09-29",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 20), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_5",
    "code": "TH010-05",
    "title": "Bài 5. Dữ liệu lôgic",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 1. Máy tính và xã hội tri thức",
    "objectives": "Hiểu đại số Boole và các phép toán logic cơ bản: AND, OR, NOT, XOR.",
    "contentSummary": "Bảng chân trị (Truth table); ứng dụng của biểu thức logic trong điều kiện rẽ nhánh chương trình.",
    "date": "2026-10-06",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 24), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_6",
    "code": "TH010-06",
    "title": "Bài 6. Dữ liệu âm thanh và hình ảnh",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 1. Máy tính và xã hội tri thức",
    "objectives": "Hiểu nguyên lý số hoá âm thanh (lấy mẫu và lượng tử hoá) và số hoá ảnh raster (điểm ảnh pixel, kênh màu RGB).",
    "contentSummary": "Độ sâu màu 24-bit TrueColor; tần số lấy mẫu âm thanh; các chuẩn nén MP3, WAV, JPEG, PNG.",
    "date": "2026-10-13",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 28), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "completed",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_7",
    "code": "TH010-07",
    "title": "Bài 7. Thực hành sử dụng thiết bị số thông dụng",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 1. Máy tính và xã hội tri thức",
    "objectives": "Kết nối và truyền dữ liệu an toàn giữa máy tính, điện thoại, máy ảnh và thiết bị lưu trữ số.",
    "contentSummary": "Kết nối qua cáp USB Type-C, Bluetooth, AirDrop; sao lưu dữ liệu lên đám mây Google Drive/OneDrive.",
    "date": "2026-10-20",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 33), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_8",
    "code": "TH010-08",
    "title": "Bài 8. Mạng máy tính trong cuộc sống hiện đại",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 2. Mạng máy tính và Internet",
    "objectives": "Hiểu kiến trúc mạng LAN, WAN, giao thức TCP/IP, địa chỉ IP (IPv4, IPv6) và tên miền DNS.",
    "contentSummary": "Cách gói dữ liệu di chuyển trên Internet; dịch vụ định tuyến Router và nhà cung cấp dịch vụ mạng ISP.",
    "date": "2026-10-27",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 38), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_9",
    "code": "TH010-09",
    "title": "Bài 9. An toàn trên không gian mạng",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 2. Mạng máy tính và Internet",
    "objectives": "Nhận biết các hình thức tấn công mạng: Virus, Trojan, Ransomware, Phishing; biết cách phòng ngừa.",
    "contentSummary": "Xác thực hai yếu tố (2FA), tường lửa (Firewall), mã hoá đường truyền HTTPS; bảo mật dữ liệu học tập.",
    "date": "2026-11-03",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 44), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_10",
    "code": "TH010-10",
    "title": "Bài 10. Thực hành khai thác tài nguyên trên Internet",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 2. Mạng máy tính và Internet",
    "objectives": "Tìm kiếm tài liệu học thuật, sử dụng từ khoá nâng cao (filetype:pdf, site:.edu.vn) và dịch vụ lưu trữ số.",
    "contentSummary": "Thực hành khai thác thư viện số mở và tài nguyên học liệu số an toàn.",
    "date": "2026-11-10",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 50), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_11",
    "code": "TH010-11",
    "title": "Bài 11. Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số",
    "objectives": "Nắm vững các giấy phép phần mềm mã nguồn mở (GPL, MIT, Creative Commons); tôn trọng quyền tác giả.",
    "contentSummary": "Vi phạm bản quyền số và chế tài xử lý theo Luật Sở hữu trí tuệ; quy tắc văn hoá tranh luận trên mạng.",
    "date": "2026-11-17",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 55), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_12",
    "code": "TH010-12",
    "title": "Bài 12. Phần mềm thiết kế đồ hoạ",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Phân biệt đồ hoạ raster (điểm ảnh) và đồ hoạ vector; làm quen giao diện phần mềm Inkscape.",
    "contentSummary": "Ưu thế không vỡ hạt khi phóng to của đồ hoạ vector; thanh công cụ vẽ hình cơ bản trong Inkscape.",
    "date": "2026-11-24",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 63), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "planned",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_13",
    "code": "TH010-13",
    "title": "Bài 13. Bổ sung các đối tượng đồ hoạ",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Vẽ hình chữ nhật, elip, ngôi sao, đường cong Bezier; tô màu tô (Fill) và màu viền (Stroke).",
    "contentSummary": "Căn chỉnh đối tượng (Align & Distribute); quản lí thứ tự lớp vẽ chồng nhau (Z-order).",
    "date": "2026-12-01",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 69), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_14",
    "code": "TH010-14",
    "title": "Bài 14. Làm việc với đối tượng đường và văn bản",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Chuyển hình khối sang đường (Object to Path), chỉnh sửa điểm nút (Nodes); chèn chữ uốn lượn theo đường cong.",
    "contentSummary": "Công cụ Node tool; uốn chữ theo đường cong thẩm mĩ để thiết kế logo và huy hiệu.",
    "date": "2026-12-08",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 75), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_15",
    "code": "TH010-15",
    "title": "Bài 15. Hoàn thiện hình ảnh đồ hoạ",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 4. Ứng dụng tin học",
    "objectives": "Sử dụng các phép toán hợp (Union), giao (Intersection), hiệu (Difference) để tạo hình phức tạp.",
    "contentSummary": "Xuất sản phẩm thiết kế đồ hoạ vector sang định dạng SVG và PNG chất lượng cao.",
    "date": "2026-12-15",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 82), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_16",
    "code": "TH010-16",
    "title": "Bài 16. Ngôn ngữ lập trình bậc cao và Python",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Làm quen môi trường tương tác Python IDLE, lệnh xuất print(), kiểu chú thích (#).",
    "contentSummary": "Lịch sử ngôn ngữ Python; so sánh chế độ tương tác (Interactive mode) và chế độ soạn thảo kịch bản (Script mode).",
    "date": "2026-12-22",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 86), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_17",
    "code": "TH010-17",
    "title": "Bài 17. Biến và lệnh gán",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Quy tắc đặt tên biến trong Python; sử dụng toán tử gán (=) và các phép toán số học (+, -, *, /, //, %, **).",
    "contentSummary": "Phép chia nguyên //, phép chia dư % và luỹ thừa **; phân biệt số nguyên int và số thực float.",
    "date": "2026-12-29",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 91), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_18",
    "code": "TH010-18",
    "title": "Bài 18. Các lệnh vào ra đơn giản",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Nhập dữ liệu bằng input(), ép kiểu dữ liệu int(), float(), str(); định dạng chuỗi xuất f-string.",
    "contentSummary": "Cú pháp x = int(input()); xử lý lỗi nhập sai kiểu dữ liệu (ValueError) cơ bản.",
    "date": "2027-01-05",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 97), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_19",
    "code": "TH010-19",
    "title": "Bài 19. Câu lệnh rẽ nhánh if",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Sử dụng câu lệnh if, if-else, if-elif-else; quy tắc thụt đầu dòng (indentation 4 dấu cách) bắt buộc trong Python.",
    "contentSummary": "Các toán tử so sánh (==, !=, >, <, >=, <=) và logic (and, or, not); giải phương trình bậc nhất, bậc hai.",
    "date": "2027-01-12",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 101), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_20",
    "code": "TH010-20",
    "title": "Bài 20. Câu lệnh lặp for",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Lập trình vòng lặp với số lần biết trước dùng hàm range(start, stop, step).",
    "contentSummary": "Tính tổng 1 đến n; in bảng cửu chương; duyệt qua từng phần tử của dãy số.",
    "date": "2027-01-19",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 105), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_21",
    "code": "TH010-21",
    "title": "Bài 21. Câu lệnh lặp while",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Sử dụng vòng lặp với số lần chưa biết trước while condition; tránh vòng lặp vô tận (infinite loop).",
    "contentSummary": "Bài toán tìm số đảo ngược, tính ước chung lớn nhất Euclid bằng vòng lặp while.",
    "date": "2027-01-26",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 108), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_22",
    "code": "TH010-22",
    "title": "Bài 22. Kiểu dữ liệu danh sách",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Tạo danh sách list [], truy cập phần tử qua chỉ số (index 0 đến len-1); duyệt mảng bằng vòng for.",
    "contentSummary": "Chỉ số dương, chỉ số âm (-1 phần tử cuối); độ dài danh sách len(); kiểm tra phần tử với in.",
    "date": "2027-02-02",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 111), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_23",
    "code": "TH010-23",
    "title": "Bài 23. Một số lệnh làm việc với dữ liệu danh sách",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Sử dụng thành thạo các phương thức append(), insert(), remove(), pop(), sort(), reverse().",
    "contentSummary": "Thêm, xoá, sắp xếp danh sách điểm học sinh; kĩ thuật trích xuất danh sách con (slicing list).",
    "date": "2027-02-09",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 115), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_24",
    "code": "TH010-24",
    "title": "Bài 24. Xâu kí tự",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Làm việc với chuỗi string; ghép chuỗi (+), nhân chuỗi (*); truy cập từng kí tự trong chuỗi.",
    "contentSummary": "Tính bất biến (immutable) của xâu trong Python; duyệt từng kí tự và đếm số kí tự đặc biệt.",
    "date": "2027-02-16",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 119), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_25",
    "code": "TH010-25",
    "title": "Bài 25. Một số lệnh làm việc với xâu kí tự",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Sử dụng các phương thức xử lý xâu: find(), count(), split(), join(), replace(), lower(), upper().",
    "contentSummary": "Tách từ trong câu thành danh sách từ bằng split(); chuẩn hoá họ tên học sinh.",
    "date": "2027-02-23",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 123), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_26",
    "code": "TH010-26",
    "title": "Bài 26. Hàm trong Python",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Hiểu khái niệm chương trình con, định nghĩa hàm với từ khoá def và trả về giá trị bằng return.",
    "contentSummary": "Cấu trúc định nghĩa hàm; tái sử dụng mã nguồn và module hoá chương trình lớn.",
    "date": "2027-03-02",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 127), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_27",
    "code": "TH010-27",
    "title": "Bài 27. Tham số của hàm",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Phân biệt tham số hình thức (parameters) và đối số thực sự (arguments); tham số mặc định (default values).",
    "contentSummary": "Truyền giá trị cho hàm; viết hàm kiểm tra số nguyên tố và hàm tính giai thừa n!.",
    "date": "2027-03-09",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 131), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_28",
    "code": "TH010-28",
    "title": "Bài 28. Phạm vi của biến",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Phân biệt biến cục bộ (Local variable) bên trong hàm và biến toàn cục (Global variable).",
    "contentSummary": "Sử dụng từ khoá global một cách thận trọng; tránh xung đột tên biến.",
    "date": "2027-03-16",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 136), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_29",
    "code": "TH010-29",
    "title": "Bài 29. Nhận biết lỗi chương trình",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Nhận biết thông báo lỗi SyntaxError, NameError, TypeError, IndexError, ZeroDivisionError.",
    "contentSummary": "Đọc hiểu thông báo lỗi Traceback; dự đoán vị trí xảy ra lỗi trong mã nguồn Python.",
    "date": "2027-03-23",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 141), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_30",
    "code": "TH010-30",
    "title": "Bài 30. Kiểm thử và gỡ lỗi chương trình",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Thiết kế bộ dữ liệu kiểm thử (test cases) bao gồm ca thông thường và ca biên (edge cases).",
    "contentSummary": "Kĩ thuật in chẩn đoán (print debugging); gỡ lỗi bằng cách chia nhỏ chương trình.",
    "date": "2027-03-30",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 145), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_31",
    "code": "TH010-31",
    "title": "Bài 31. Thực hành viết chương trình đơn giản",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Vận dụng tổng hợp hàm, danh sách, rẽ nhánh và vòng lặp để giải quyết bài toán thực tế.",
    "contentSummary": "Xây dựng chương trình quản trị điểm học tập và thống kê xếp loại cho lớp 10A1.",
    "date": "2027-04-06",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 149), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_32",
    "code": "TH010-32",
    "title": "Bài 32. Ôn tập lập trình Python",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính",
    "objectives": "Hệ thống hoá toàn bộ kiến thức lập trình cơ bản trong chương trình Tin học 10.",
    "contentSummary": "Giải đề luyện tập tổng hợp, tối ưu thuật toán và chuẩn hoá phong cách viết code PEP 8.",
    "date": "2027-04-13",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 153), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_33",
    "code": "TH010-33",
    "title": "Bài 33. Nghề thiết kế đồ hoạ máy tính",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 6. Hướng nghiệp với Tin học",
    "objectives": "Tìm hiểu đặc thù công việc, cơ hội nghề nghiệp và yêu cầu năng lực của hoạ sĩ thiết kế đồ hoạ số.",
    "contentSummary": "Thiết kế giao diện UI/UX, đồ hoạ 3D, thiết kế quảng cáo truyền thông số.",
    "date": "2027-04-20",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 156), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  },
  {
    "id": "les_tin10_34",
    "code": "TH010-34",
    "title": "Bài 34. Nghề phát triển phần mềm",
    "subject": "Tin học 10",
    "grade": 10,
    "classIds": [
      "cls_10a1"
    ],
    "topic": "Chủ đề 6. Hướng nghiệp với Tin học",
    "objectives": "Tìm hiểu quy trình sản xuất phần mềm và vai trò của kĩ sư phần mềm (Software Engineer) trong xã hội.",
    "contentSummary": "Quy trình: Phân tích yêu cầu - Thiết kế - Lập trình - Kiểm thử - Triển khai và bảo trì.",
    "date": "2027-04-27",
    "resources": "Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống (Trang 160), Tài liệu PDF: /assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.",
    "status": "draft",
    "updatedAt": "2026-03-20"
  }
];

export const initialTasks: Task[] = [
  {
    "id": "tsk_th6_01",
    "code": "NV-TH6-01",
    "title": "Thực hành tạo Sơ đồ tư duy: Chủ đề \"Máy tính và Internet\"",
    "description": "Sử dụng phần mềm sơ đồ tư duy hoặc vẽ trên giấy để hệ thống hoá các thành phần mạng máy tính và dịch vụ Internet.",
    "lessonId": "les_tin6_10",
    "classIds": [
      "cls_6a1"
    ],
    "assignedDate": "2026-11-10",
    "dueDate": "2026-11-17",
    "maxScore": 10,
    "status": "completed",
    "notes": "Khuyến khích học sinh sáng tạo màu sắc và hình ảnh minh hoạ.",
    "createdAt": "2026-11-10"
  },
  {
    "id": "tsk_th7_01",
    "code": "NV-TH7-01",
    "title": "Lập bảng tính Excel: Bảng điểm và Tính điểm trung bình môn",
    "description": "Tạo bảng tính, nhập dữ liệu 10 học sinh, sử dụng công thức tính tự động và các hàm AVERAGE, MAX, MIN.",
    "lessonId": "les_tin7_8",
    "classIds": [
      "cls_7a1"
    ],
    "assignedDate": "2026-11-05",
    "dueDate": "2026-11-12",
    "maxScore": 10,
    "status": "completed",
    "notes": "Yêu cầu định dạng số thập phân có 1 chữ số sau dấu phẩy.",
    "createdAt": "2026-11-05"
  },
  {
    "id": "tsk_th8_01",
    "code": "NV-TH8-01",
    "title": "Thực hành Chỉnh sửa ảnh: Thiết kế Poster Tuyên truyền An toàn số",
    "description": "Sử dụng các lớp (layer), chèn hình ảnh, tạo hiệu ứng chữ và phối màu hài hoà.",
    "lessonId": "les_tin8_11b",
    "classIds": [
      "cls_8a1"
    ],
    "assignedDate": "2026-11-18",
    "dueDate": "2026-11-25",
    "maxScore": 10,
    "status": "completed",
    "notes": "Xuất tệp định dạng .png nộp lên hệ thống.",
    "createdAt": "2026-11-18"
  },
  {
    "id": "tsk_th9_01",
    "code": "NV-TH9-01",
    "title": "Bảng tính nâng cao: Sử dụng hàm IF, COUNTIF thống kê khảo sát",
    "description": "Sử dụng hàm IF để tự động xếp loại và hàm COUNTIF đếm số lượng học sinh theo từng mức đạt được.",
    "lessonId": "les_tin9_12a",
    "classIds": [
      "cls_9a1"
    ],
    "assignedDate": "2026-12-02",
    "dueDate": "2026-12-09",
    "maxScore": 10,
    "status": "completed",
    "notes": "Kết hợp tính năng Data Validation cho cột nhập điểm.",
    "createdAt": "2026-12-02"
  },
  {
    "id": "tsk_th10_01",
    "code": "NV-TH10-01",
    "title": "Lập trình Python: Xây dựng hàm kiểm tra và xử lý Danh sách (List)",
    "description": "Viết chương trình Python gồm các hàm: nhập danh sách n số nguyên, tìm số lớn nhất, lọc các số chẵn và tính trung bình cộng.",
    "lessonId": "les_tin10_26",
    "classIds": [
      "cls_10a1"
    ],
    "assignedDate": "2026-12-10",
    "dueDate": "2026-12-18",
    "maxScore": 10,
    "status": "completed",
    "notes": "Yêu cầu chú thích mã nguồn rõ ràng theo chuẩn PEP 8.",
    "createdAt": "2026-12-10"
  },
  {
    "id": "tsk_th10_02",
    "code": "NV-TH10-02",
    "title": "Dự án Python Mini: Chương trình Quản trị Điểm học tập",
    "description": "Áp dụng hàm, vòng lặp, câu lệnh rẽ nhánh và kiểu dữ liệu xâu/danh sách để quản lí danh sách điểm và xếp loại học lực.",
    "lessonId": "les_tin10_31",
    "classIds": [
      "cls_10a1"
    ],
    "assignedDate": "2027-02-15",
    "dueDate": "2027-02-28",
    "maxScore": 10,
    "status": "in_progress",
    "notes": "Dự án học kì II, học sinh có thể làm việc theo cặp 2 bạn.",
    "createdAt": "2027-02-15"
  }
];

export const initialTaskSubmissions: TaskSubmission[] = [
  {
    "id": "sub_th6_01",
    "taskId": "tsk_th6_01",
    "studentId": "stu_6001",
    "classId": "cls_6a1",
    "status": "graded",
    "submissionDate": "2026-11-14",
    "score": 9.5,
    "feedback": "Sơ đồ tư duy trực quan, phối màu rất khoa học!",
    "updatedAt": "2026-11-15"
  },
  {
    "id": "sub_th6_02",
    "taskId": "tsk_th6_01",
    "studentId": "stu_6002",
    "classId": "cls_6a1",
    "status": "graded",
    "submissionDate": "2026-11-15",
    "score": 9,
    "feedback": "Đầy đủ các nhánh kiến thức quan trọng.",
    "updatedAt": "2026-11-15"
  },
  {
    "id": "sub_th6_03",
    "taskId": "tsk_th6_01",
    "studentId": "stu_6003",
    "classId": "cls_6a1",
    "status": "late",
    "submissionDate": "2026-11-18",
    "score": 7,
    "feedback": "Nộp muộn 1 ngày, cần bổ sung thêm nhánh ứng dụng.",
    "updatedAt": "2026-11-19"
  },
  {
    "id": "sub_th6_04",
    "taskId": "tsk_th6_01",
    "studentId": "stu_6004",
    "classId": "cls_6a1",
    "status": "graded",
    "submissionDate": "2026-11-15",
    "score": 9.5,
    "feedback": "Rất sáng tạo!",
    "updatedAt": "2026-11-16"
  },
  {
    "id": "sub_th7_01",
    "taskId": "tsk_th7_01",
    "studentId": "stu_7001",
    "classId": "cls_7a1",
    "status": "graded",
    "submissionDate": "2026-11-10",
    "score": 10,
    "feedback": "Bài làm xuất sắc, công thức và định dạng chuẩn mực.",
    "updatedAt": "2026-11-11"
  },
  {
    "id": "sub_th7_02",
    "taskId": "tsk_th7_01",
    "studentId": "stu_7002",
    "classId": "cls_7a1",
    "status": "graded",
    "submissionDate": "2026-11-11",
    "score": 9,
    "feedback": "Tốt, bảng tính trình bày rõ ràng.",
    "updatedAt": "2026-11-12"
  },
  {
    "id": "sub_th7_03",
    "taskId": "tsk_th7_01",
    "studentId": "stu_7003",
    "classId": "cls_7a1",
    "status": "graded",
    "submissionDate": "2026-11-11",
    "score": 8.5,
    "feedback": "Cần chú ý định dạng đường viền bảng đồng đều hơn.",
    "updatedAt": "2026-11-12"
  },
  {
    "id": "sub_th7_04",
    "taskId": "tsk_th7_01",
    "studentId": "stu_7004",
    "classId": "cls_7a1",
    "status": "graded",
    "submissionDate": "2026-11-12",
    "score": 7.5,
    "feedback": "Đã hoàn thành công thức cơ bản.",
    "updatedAt": "2026-11-13"
  },
  {
    "id": "sub_th10_01",
    "taskId": "tsk_th10_01",
    "studentId": "stu_1001",
    "classId": "cls_10a1",
    "status": "graded",
    "submissionDate": "2026-12-15",
    "score": 10,
    "feedback": "Mã nguồn Python chuẩn mực, thuật toán tối ưu O(n), chú thích chi tiết.",
    "updatedAt": "2026-12-16"
  },
  {
    "id": "sub_th10_02",
    "taskId": "tsk_th10_01",
    "studentId": "stu_1002",
    "classId": "cls_10a1",
    "status": "graded",
    "submissionDate": "2026-12-16",
    "score": 9.5,
    "feedback": "Hàm xử lý danh sách rất chặt chẽ, kiểm thử đầy đủ.",
    "updatedAt": "2026-12-17"
  },
  {
    "id": "sub_th10_03",
    "taskId": "tsk_th10_01",
    "studentId": "stu_1003",
    "classId": "cls_10a1",
    "status": "late",
    "submissionDate": "2026-12-19",
    "score": 7,
    "feedback": "Lỗi cú pháp thụt lề ở câu lệnh if ban đầu, đã sửa lại tốt.",
    "updatedAt": "2026-12-20"
  },
  {
    "id": "sub_th10_04",
    "taskId": "tsk_th10_01",
    "studentId": "stu_1004",
    "classId": "cls_10a1",
    "status": "graded",
    "submissionDate": "2026-12-16",
    "score": 9,
    "feedback": "Bài giải rõ ràng, đúng yêu cầu.",
    "updatedAt": "2026-12-17"
  },
  {
    "id": "sub_th10_05",
    "taskId": "tsk_th10_01",
    "studentId": "stu_1005",
    "classId": "cls_10a1",
    "status": "graded",
    "submissionDate": "2026-12-17",
    "score": 9.5,
    "feedback": "Tư duy thuật toán tốt, có mở rộng thêm hàm đếm số nguyên tố.",
    "updatedAt": "2026-12-18"
  }
];

export const initialGradeRecords: GradeRecord[] = [
  {
    "id": "grd_6_01",
    "studentId": "stu_6001",
    "classId": "cls_6a1",
    "assessmentName": "Kiểm tra 15p: Thông tin & Mạng máy tính",
    "type": "quiz_15m",
    "date": "2026-10-15",
    "score": 10,
    "maxScore": 10,
    "weight": 1,
    "comment": "Xuất sắc, nắm chắc kiến thức cơ bản.",
    "createdAt": "2026-10-15"
  },
  {
    "id": "grd_6_02",
    "studentId": "stu_6002",
    "classId": "cls_6a1",
    "assessmentName": "Kiểm tra 15p: Thông tin & Mạng máy tính",
    "type": "quiz_15m",
    "date": "2026-10-15",
    "score": 9,
    "maxScore": 10,
    "weight": 1,
    "comment": "Làm bài cẩn thận.",
    "createdAt": "2026-10-15"
  },
  {
    "id": "grd_6_03",
    "studentId": "stu_6003",
    "classId": "cls_6a1",
    "assessmentName": "Kiểm tra 15p: Thông tin & Mạng máy tính",
    "type": "quiz_15m",
    "date": "2026-10-15",
    "score": 6.5,
    "maxScore": 10,
    "weight": 1,
    "comment": "Cần ôn lại các đơn vị đo dung lượng thông tin (KB, MB, GB).",
    "createdAt": "2026-10-15"
  },
  {
    "id": "grd_6_04",
    "studentId": "stu_6004",
    "classId": "cls_6a1",
    "assessmentName": "Kiểm tra 15p: Thông tin & Mạng máy tính",
    "type": "quiz_15m",
    "date": "2026-10-15",
    "score": 9.5,
    "maxScore": 10,
    "weight": 1,
    "comment": "Hiểu bài rất nhanh.",
    "createdAt": "2026-10-15"
  },
  {
    "id": "grd_7_01",
    "studentId": "stu_7001",
    "classId": "cls_7a1",
    "assessmentName": "Thực hành 45p: Bảng tính điện tử Excel",
    "type": "test_45m",
    "date": "2026-11-20",
    "score": 9.8,
    "maxScore": 10,
    "weight": 2,
    "comment": "Thao tác bảng tính siêu nhanh, điểm tuyệt đối.",
    "createdAt": "2026-11-20"
  },
  {
    "id": "grd_7_02",
    "studentId": "stu_7002",
    "classId": "cls_7a1",
    "assessmentName": "Thực hành 45p: Bảng tính điện tử Excel",
    "type": "test_45m",
    "date": "2026-11-20",
    "score": 9,
    "maxScore": 10,
    "weight": 2,
    "comment": "Biểu đồ trực quan, đẹp mắt.",
    "createdAt": "2026-11-20"
  },
  {
    "id": "grd_7_03",
    "studentId": "stu_7003",
    "classId": "cls_7a1",
    "assessmentName": "Thực hành 45p: Bảng tính điện tử Excel",
    "type": "test_45m",
    "date": "2026-11-20",
    "score": 8.5,
    "maxScore": 10,
    "weight": 2,
    "comment": "Thực hiện tốt các hàm SUM, AVERAGE.",
    "createdAt": "2026-11-20"
  },
  {
    "id": "grd_7_04",
    "studentId": "stu_7004",
    "classId": "cls_7a1",
    "assessmentName": "Thực hành 45p: Bảng tính điện tử Excel",
    "type": "test_45m",
    "date": "2026-11-20",
    "score": 6.8,
    "maxScore": 10,
    "weight": 2,
    "comment": "Cần chú ý khoá ô cố định $ khi kéo công thức.",
    "createdAt": "2026-11-20"
  },
  {
    "id": "grd_8_01",
    "studentId": "stu_8001",
    "classId": "cls_8a1",
    "assessmentName": "Kiểm tra Giữa kỳ I: Tin học 8",
    "type": "midterm",
    "date": "2026-11-08",
    "score": 9.5,
    "maxScore": 10,
    "weight": 2,
    "comment": "Kỹ năng chỉnh sửa ảnh và văn bản nâng cao xuất sắc.",
    "createdAt": "2026-11-08"
  },
  {
    "id": "grd_8_02",
    "studentId": "stu_8002",
    "classId": "cls_8a1",
    "assessmentName": "Kiểm tra Giữa kỳ I: Tin học 8",
    "type": "midterm",
    "date": "2026-11-08",
    "score": 9,
    "maxScore": 10,
    "weight": 2,
    "comment": "Bài trình bày rõ ràng, thẩm mĩ cao.",
    "createdAt": "2026-11-08"
  },
  {
    "id": "grd_8_03",
    "studentId": "stu_8003",
    "classId": "cls_8a1",
    "assessmentName": "Kiểm tra Giữa kỳ I: Tin học 8",
    "type": "midterm",
    "date": "2026-11-08",
    "score": 8.8,
    "maxScore": 10,
    "weight": 2,
    "comment": "Thuật toán gỡ lỗi logic chính xác.",
    "createdAt": "2026-11-08"
  },
  {
    "id": "grd_9_01",
    "studentId": "stu_9001",
    "classId": "cls_9a1",
    "assessmentName": "Kiểm tra Học kì I: Tin học 9",
    "type": "final",
    "date": "2026-12-22",
    "score": 9.8,
    "maxScore": 10,
    "weight": 3,
    "comment": "Top 1 khối 9 môn Tin học.",
    "createdAt": "2026-12-22"
  },
  {
    "id": "grd_9_02",
    "studentId": "stu_9002",
    "classId": "cls_9a1",
    "assessmentName": "Kiểm tra Học kì I: Tin học 9",
    "type": "final",
    "date": "2026-12-22",
    "score": 9.2,
    "maxScore": 10,
    "weight": 3,
    "comment": "Dựng video kịch bản truyền thông rất chuyên nghiệp.",
    "createdAt": "2026-12-22"
  },
  {
    "id": "grd_9_03",
    "studentId": "stu_9003",
    "classId": "cls_9a1",
    "assessmentName": "Kiểm tra Học kì I: Tin học 9",
    "type": "final",
    "date": "2026-12-22",
    "score": 8.7,
    "maxScore": 10,
    "weight": 3,
    "comment": "Thành thạo các hàm tính toán nâng cao.",
    "createdAt": "2026-12-22"
  },
  {
    "id": "grd_9_04",
    "studentId": "stu_9004",
    "classId": "cls_9a1",
    "assessmentName": "Kiểm tra Học kì I: Tin học 9",
    "type": "final",
    "date": "2026-12-22",
    "score": 6.5,
    "maxScore": 10,
    "weight": 3,
    "comment": "Cần rèn luyện thêm cú pháp hàm điều kiện IF.",
    "createdAt": "2026-12-22"
  },
  {
    "id": "grd_10_01",
    "studentId": "stu_1001",
    "classId": "cls_10a1",
    "assessmentName": "Kiểm tra Thực hành: Lập trình Python cơ bản",
    "type": "test_45m",
    "date": "2026-12-18",
    "score": 10,
    "maxScore": 10,
    "weight": 2,
    "comment": "Bài làm mẫu mực, tư duy thuật toán sắc sảo.",
    "createdAt": "2026-12-18"
  },
  {
    "id": "grd_10_02",
    "studentId": "stu_1002",
    "classId": "cls_10a1",
    "assessmentName": "Kiểm tra Thực hành: Lập trình Python cơ bản",
    "type": "test_45m",
    "date": "2026-12-18",
    "score": 9.5,
    "maxScore": 10,
    "weight": 2,
    "comment": "Xử lý cấu trúc dữ liệu list và xâu rất tốt.",
    "createdAt": "2026-12-18"
  },
  {
    "id": "grd_10_03",
    "studentId": "stu_1003",
    "classId": "cls_10a1",
    "assessmentName": "Kiểm tra Thực hành: Lập trình Python cơ bản",
    "type": "test_45m",
    "date": "2026-12-18",
    "score": 6.8,
    "maxScore": 10,
    "weight": 2,
    "comment": "Cần chú ý lỗi thụt dòng IndentationError và phạm vi biến.",
    "createdAt": "2026-12-18"
  },
  {
    "id": "grd_10_04",
    "studentId": "stu_1004",
    "classId": "cls_10a1",
    "assessmentName": "Kiểm tra Thực hành: Lập trình Python cơ bản",
    "type": "test_45m",
    "date": "2026-12-18",
    "score": 8.8,
    "maxScore": 10,
    "weight": 2,
    "comment": "Viết code rõ ràng, chạy đúng các test cases.",
    "createdAt": "2026-12-18"
  },
  {
    "id": "grd_10_05",
    "studentId": "stu_1005",
    "classId": "cls_10a1",
    "assessmentName": "Kiểm tra Thực hành: Lập trình Python cơ bản",
    "type": "test_45m",
    "date": "2026-12-18",
    "score": 9.2,
    "maxScore": 10,
    "weight": 2,
    "comment": "Tối ưu thuật toán tốt, giải thích bài chặt chẽ.",
    "createdAt": "2026-12-18"
  }
];

export const initialStudentFeedback: StudentFeedback[] = [
  {
    "id": "fb_1001",
    "studentId": "stu_1001",
    "classId": "cls_10a1",
    "teacher": "Cô Bùi Thị Ra",
    "date": "2026-12-20",
    "content": "Minh Khang tiếp thu kiến thức lập trình Python rất nhanh, tư duy giải thuật thông minh và thường xuyên chủ động hỗ trợ các bạn trong giờ thực hành.",
    "strengths": "Tư duy logic tốt, lập trình Python tự nhiên, nắm chắc các cấu trúc dữ liệu mảng và hàm.",
    "improvements": "Có thể chia sẻ cách tiếp cận nhiều hơn cho các bạn trong nhóm.",
    "recommendations": "Tiếp tục bồi dưỡng vào đội tuyển Học sinh giỏi Tin học cấp trường và Thành phố.",
    "relatedLessonOrTask": "les_tin10_26",
    "createdAt": "2026-12-20"
  },
  {
    "id": "fb_1003",
    "studentId": "stu_1003",
    "classId": "cls_10a1",
    "teacher": "Cô Bùi Thị Ra",
    "date": "2026-12-20",
    "content": "Hoàng Nam có năng khiếu tự nhiên với máy tính nhưng thời gian gần đây còn nộp bài thực hành muộn và hay quên lưu mã nguồn đúng quy định.",
    "strengths": "Thao tác máy nhanh, hiểu ý tưởng bài toán.",
    "improvements": "Cần cẩn thận với thụt lề Python và kiểm thử kỹ trước khi nộp.",
    "recommendations": "Cần rèn luyện tính kiên nhẫn khi đọc thông báo lỗi compiler/interpreter và tuân thủ thời hạn nộp bài.",
    "relatedLessonOrTask": "les_tin10_19",
    "createdAt": "2026-12-20"
  },
  {
    "id": "fb_6003",
    "studentId": "stu_6003",
    "classId": "cls_6a1",
    "teacher": "Cô Bùi Thị Ra",
    "date": "2026-11-20",
    "content": "Bảo Nam còn nhút nhát trong giờ thực hành máy tính, thao tác bàn phím và chuột chưa quen tay.",
    "strengths": "Chăm chú lắng nghe cô giáo giảng bài.",
    "improvements": "Thao tác gõ phím mười ngón và quản lí thư mục lưu tệp cần rèn thêm.",
    "recommendations": "Cô sẽ xếp bạn Đăng Khôi ngồi kèm để hỗ trợ thao tác lưu trữ tệp tin và hướng dẫn gõ mười ngón.",
    "relatedLessonOrTask": "les_tin6_10",
    "createdAt": "2026-11-20"
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    "id": "act_001",
    "action": "Cập nhật hệ thống bài học",
    "category": "lesson",
    "details": "Đã xóa dữ liệu cũ và nạp 109 bài học Tin học theo chuẩn SGK Kết nối tri thức với cuộc sống (Lớp 6, 7, 8, 9, 10).",
    "timestamp": "2026-03-20 09:30"
  },
  {
    "id": "act_002",
    "action": "Cập nhật danh sách lớp",
    "category": "class",
    "details": "Đã thiết lập các lớp 6A1, 7A1, 8A1, 9A1, 10A1 cho môn Tin học kèm phòng thực hành máy tính.",
    "timestamp": "2026-03-20 09:35"
  }
];

export const initialAppData: AppData = {
  settings: initialSettings,
  classes: initialClasses,
  students: initialStudents,
  lessons: initialLessons,
  tasks: initialTasks,
  taskSubmissions: initialTaskSubmissions,
  grades: initialGradeRecords,
  feedbacks: initialStudentFeedback,
  activities: initialActivityLogs,
};
