const fs = require('fs');

const textbookFiles = {
  6: '/assets/aistudio/Sach_giao_khoa__Tin_hoc_6_Ket_noi_tri_thuc_af7d4689.pdf',
  7: '/assets/aistudio/sach-tin-hoc-lop-7-ket-noi-tri-thuc-voi-cuoc_c6da1e5b.pdf',
  8: '/assets/aistudio/SGK_TIN_HOC_8_KNTTVCS_effbce43.pdf',
  9: '/assets/aistudio/Tin_hoc_9_Ket_noi_tri_thuc_86be184f.pdf',
  10: '/assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf',
};

const textbookNames = {
  6: 'Sách giáo khoa Tin học 6 - Kết nối tri thức với cuộc sống',
  7: 'Sách giáo khoa Tin học 7 - Kết nối tri thức với cuộc sống',
  8: 'Sách giáo khoa Tin học 8 - Kết nối tri thức với cuộc sống',
  9: 'Sách giáo khoa Tin học 9 - Kết nối tri thức với cuộc sống',
  10: 'Sách giáo khoa Tin học 10 - Kết nối tri thức với cuộc sống',
};

// 1. Classes
const initialClasses = [
  {
    id: 'cls_6a1',
    code: '6A1',
    name: 'Lớp 6A1 (Khối THCS - Tin học 6)',
    grade: 6,
    schoolYear: '2026 - 2027',
    subject: 'Tin học 6',
    teacher: 'Cô Bùi Thị Ra',
    room: 'Phòng thực hành Tin học 1 (Tầng 2)',
    notes: 'Lớp mới làm quen Tin học THCS, rất hứng thú với sơ đồ tư duy và thuật toán trực quan.',
    createdAt: '2026-08-20',
  },
  {
    id: 'cls_7a1',
    code: '7A1',
    name: 'Lớp 7A1 (Khối THCS - Tin học 7)',
    grade: 7,
    schoolYear: '2026 - 2027',
    subject: 'Tin học 7',
    teacher: 'Cô Bùi Thị Ra',
    room: 'Phòng thực hành Tin học 2 (Tầng 2)',
    notes: 'Lớp tích cực, thao tác bảng tính và làm bài trình chiếu nhanh nhẹn, sáng tạo.',
    createdAt: '2026-08-20',
  },
  {
    id: 'cls_8a1',
    code: '8A1',
    name: 'Lớp 8A1 (Khối THCS - Tin học 8)',
    grade: 8,
    schoolYear: '2026 - 2027',
    subject: 'Tin học 8',
    teacher: 'Cô Bùi Thị Ra',
    room: 'Phòng thực hành Tin học 1 (Tầng 2)',
    notes: 'Nhiều học sinh có năng khiếu đồ hoạ, xử lý ảnh và tư duy lập trình khối lệnh gỡ lỗi tốt.',
    createdAt: '2026-08-22',
  },
  {
    id: 'cls_9a1',
    code: '9A1',
    name: 'Lớp 9A1 (Khối THCS - Tin học 9)',
    grade: 9,
    schoolYear: '2026 - 2027',
    subject: 'Tin học 9',
    teacher: 'Cô Bùi Thị Ra',
    room: 'Phòng thực hành Tin học 2 (Tầng 2)',
    notes: 'Khối cuối cấp THCS, thành thạo các hàm tính toán nâng cao (COUNTIF, SUMIF, IF) và dựng video kịch bản.',
    createdAt: '2026-08-22',
  },
  {
    id: 'cls_10a1',
    code: '10A1',
    name: 'Lớp 10A1 (Khối THPT - Tin học 10)',
    grade: 10,
    schoolYear: '2026 - 2027',
    subject: 'Tin học 10',
    teacher: 'Cô Bùi Thị Ra',
    room: 'Phòng máy Lab Chuyên Tin (Tầng 3 Nhà A)',
    notes: 'Lớp chuyên định hướng Khoa học máy tính & CNTT, đang lập trình Python và thiết kế vector Inkscape.',
    createdAt: '2026-08-25',
  },
];

// 2. Students
const initialStudents = [
  // Lớp 6A1
  { id: 'stu_6001', code: 'NS06-001', fullName: 'Nguyễn Đăng Khôi', classId: 'cls_6a1', birthDate: '2014-03-15', gender: 'Nam', parentContact: '0912.111.222 (Bố)', status: 'active', needsSupport: false, notes: 'Say mê máy tính, vẽ sơ đồ tư duy Mindmap rất đẹp.', createdAt: '2026-08-28' },
  { id: 'stu_6002', code: 'NS06-002', fullName: 'Lê Mai Anh', classId: 'cls_6a1', birthDate: '2014-07-20', gender: 'Nữ', parentContact: '0983.333.444 (Mẹ)', status: 'active', needsSupport: false, notes: 'Gõ phím mười ngón nhanh, trình bày bảng biểu rõ ràng.', createdAt: '2026-08-28' },
  { id: 'stu_6003', code: 'NS06-003', fullName: 'Phạm Bảo Nam', classId: 'cls_6a1', birthDate: '2014-11-05', gender: 'Nam', parentContact: '0904.555.666 (Bố)', status: 'attention', needsSupport: true, notes: 'Còn lúng túng khi thao tác lưu trữ thư mục và gửi email.', createdAt: '2026-08-28' },
  { id: 'stu_6004', code: 'NS06-004', fullName: 'Hoàng Trúc Linh', classId: 'cls_6a1', birthDate: '2014-01-28', gender: 'Nữ', parentContact: '0975.777.888 (Mẹ)', status: 'active', needsSupport: false, notes: 'Tư duy logic thuật toán rất sáng tạo.', createdAt: '2026-08-28' },

  // Lớp 7A1
  { id: 'stu_7001', code: 'NS07-001', fullName: 'Trần Minh Quân', classId: 'cls_7a1', birthDate: '2013-05-12', gender: 'Nam', parentContact: '0913.222.333 (Bố)', status: 'active', needsSupport: false, notes: 'Thành thạo công thức tính toán và biểu đồ trên Excel.', createdAt: '2026-08-28' },
  { id: 'stu_7002', code: 'NS07-002', fullName: 'Đặng Ngọc Diệp', classId: 'cls_7a1', birthDate: '2013-09-18', gender: 'Nữ', parentContact: '0984.444.555 (Mẹ)', status: 'active', needsSupport: false, notes: 'Thuyết trình PowerPoint lưu loát, hiệu ứng trang nhã.', createdAt: '2026-08-28' },
  { id: 'stu_7003', code: 'NS07-003', fullName: 'Vũ Hải Long', classId: 'cls_7a1', birthDate: '2013-12-02', gender: 'Nam', parentContact: '0905.666.777 (Bố)', status: 'active', needsSupport: false, notes: 'Hiểu nhanh thuật toán tìm kiếm nhị phân và sắp xếp.', createdAt: '2026-08-28' },
  { id: 'stu_7004', code: 'NS07-004', fullName: 'Bùi Kim Ngân', classId: 'cls_7a1', birthDate: '2013-04-25', gender: 'Nữ', parentContact: '0976.888.999 (Mẹ)', status: 'attention', needsSupport: true, notes: 'Cần hướng dẫn thêm phần khoá địa chỉ tuyệt đối trong bảng tính.', createdAt: '2026-08-28' },

  // Lớp 8A1
  { id: 'stu_8001', code: 'NS08-001', fullName: 'Đoàn Nhật Minh', classId: 'cls_8a1', birthDate: '2012-04-18', gender: 'Nam', parentContact: '0915.666.888 (Bố)', status: 'active', needsSupport: false, notes: 'Xử lý hình ảnh và tách nền trên GIMP/Photoshop rất khéo.', createdAt: '2026-08-28' },
  { id: 'stu_8002', code: 'NS08-002', fullName: 'Phạm Ngọc Ánh', classId: 'cls_8a1', birthDate: '2012-06-25', gender: 'Nữ', parentContact: '0977.111.999 (Mẹ)', status: 'active', needsSupport: false, notes: 'Trình bày văn bản nâng cao chuẩn mẫu, sáng tạo.', createdAt: '2026-08-28' },
  { id: 'stu_8003', code: 'NS08-003', fullName: 'Vũ Quốc Huy', classId: 'cls_8a1', birthDate: '2012-11-09', gender: 'Nam', parentContact: '0902.333.777 (Bố)', status: 'active', needsSupport: false, notes: 'Lập trình điều khiển thuật toán thông minh, tìm lỗi nhanh.', createdAt: '2026-08-28' },

  // Lớp 9A1
  { id: 'stu_9001', code: 'NS09-001', fullName: 'Tạ Minh Triết', classId: 'cls_9a1', birthDate: '2011-05-10', gender: 'Nam', parentContact: '0912.888.777 (Bố)', status: 'active', needsSupport: false, notes: 'Giải bài toán tin học xuất sắc, đạt giải HSG Tin học cấp trường.', createdAt: '2026-08-28' },
  { id: 'stu_9002', code: 'NS09-002', fullName: 'Lý Kim Chi', classId: 'cls_9a1', birthDate: '2011-10-22', gender: 'Nữ', parentContact: '0989.444.666 (Mẹ)', status: 'active', needsSupport: false, notes: 'Kỹ năng dựng video kịch bản truyền thông rất chuyên nghiệp.', createdAt: '2026-08-28' },
  { id: 'stu_9003', code: 'NS09-003', fullName: 'Dương Gia Hân', classId: 'cls_9a1', birthDate: '2011-08-15', gender: 'Nữ', parentContact: '0933.222.111 (Mẹ)', status: 'active', needsSupport: false, notes: 'Sử dụng thành thạo hàm COUNTIF, SUMIF và bảng kiểm soát dữ liệu.', createdAt: '2026-08-28' },
  { id: 'stu_9004', code: 'NS09-004', fullName: 'Chu Văn An', classId: 'cls_9a1', birthDate: '2011-12-11', gender: 'Nam', parentContact: '0966.555.444 (Bố)', status: 'attention', needsSupport: true, notes: 'Cần hỗ trợ về cú pháp lồng hàm IF trong bảng tính điện tử.', createdAt: '2026-08-28' },

  // Lớp 10A1
  { id: 'stu_1001', code: 'NS10-001', fullName: 'Nguyễn Minh Khang', classId: 'cls_10a1', birthDate: '2010-04-12', gender: 'Nam', parentContact: '0912.456.789 (Bố)', status: 'active', needsSupport: false, notes: 'Đội tuyển HSG Tin học, code Python thành thạo các cấu trúc dữ liệu list, string.', createdAt: '2026-08-28' },
  { id: 'stu_1002', code: 'NS10-002', fullName: 'Trần Phương Linh', classId: 'cls_10a1', birthDate: '2010-09-25', gender: 'Nữ', parentContact: '0983.112.233 (Mẹ)', status: 'active', needsSupport: false, notes: 'Thiết kế vector Inkscape ấn tượng, tư duy lập trình cấu trúc tốt.', createdAt: '2026-08-28' },
  { id: 'stu_1003', code: 'NS10-003', fullName: 'Lê Hoàng Nam', classId: 'cls_10a1', birthDate: '2010-01-18', gender: 'Nam', parentContact: '0904.556.778 (Bố)', status: 'attention', needsSupport: true, notes: 'Hay nhầm lẫn thụt lề (IndentationError) và phạm vi biến trong hàm Python.', createdAt: '2026-08-28' },
  { id: 'stu_1004', code: 'NS10-004', fullName: 'Phạm Thu Thảo', classId: 'cls_10a1', birthDate: '2010-11-03', gender: 'Nữ', parentContact: '0975.334.455 (Mẹ)', status: 'active', needsSupport: false, notes: 'Chăm chỉ hoàn thiện bài tập lớn và dự án lập trình Python.', createdAt: '2026-08-28' },
  { id: 'stu_1005', code: 'NS10-005', fullName: 'Đỗ Gia Huy', classId: 'cls_10a1', birthDate: '2010-06-30', gender: 'Nam', parentContact: '0966.889.900 (Mẹ)', status: 'active', needsSupport: false, notes: 'Tư duy thuật toán tốt, giải quyết bài toán kiểm thử và gỡ lỗi nhanh.', createdAt: '2026-08-28' },
];

// 3. Lessons from all 5 attached textbooks
const lessonsGrade6 = [
  { num: 1, title: 'Bài 1. Thông tin và dữ liệu', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 5, obj: 'Phân biệt thông tin và dữ liệu; nêu được tầm quan trọng của thông tin trong đời sống.', sum: 'Khái niệm thông tin, dữ liệu, vật mang tin; mối quan hệ giữa thông tin và hành vi của con người.' },
  { num: 2, title: 'Bài 2. Xử lí thông tin', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 8, obj: 'Nêu được các bước trong quy trình xử lí thông tin của con người và máy tính.', sum: 'Quy trình 4 bước: Thu nhận thông tin - Lưu trữ - Xử lí - Truyền đạt; vai trò của máy tính số.' },
  { num: 3, title: 'Bài 3. Thông tin trong máy tính', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 12, obj: 'Biết máy tính biểu diễn thông tin bằng dãy bit (0 và 1); nắm được các đơn vị đo dung lượng thông tin.', sum: 'Khái niệm bit, byte, KB, MB, GB, TB; biểu diễn văn bản, hình ảnh, âm thanh dưới dạng dãy nhị phân.' },
  { num: 4, title: 'Bài 4. Mạng máy tính', topic: 'Chủ đề 2. Mạng máy tính và Internet', page: 16, obj: 'Nêu được khái niệm và các thành phần chính của mạng máy tính; lợi ích của kết nối mạng.', sum: 'Thiết bị đầu cuối, thiết bị kết nối (Switch, Modem, Router), môi trường truyền dẫn có dây và không dây (Wi-Fi).' },
  { num: 5, title: 'Bài 5. Internet', topic: 'Chủ đề 2. Mạng máy tính và Internet', page: 20, obj: 'Hiểu đặc điểm chính của mạng Internet toàn cầu; biết các dịch vụ cơ bản của Internet.', sum: 'Mạng toàn cầu Internet, lợi ích tra cứu học tập, giải trí, kết nối bạn bè và những nguy cơ cần phòng tránh.' },
  { num: 6, title: 'Bài 6. Mạng thông tin toàn cầu', topic: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 23, obj: 'Biết khái niệm World Wide Web (WWW), website, trang web, địa chỉ URL và trình duyệt web.', sum: 'Cách truy cập website, duyệt web bằng Chrome/Edge, tìm hiểu siêu văn bản và siêu liên kết.' },
  { num: 7, title: 'Bài 7. Tìm kiếm thông tin trên Internet', topic: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 28, obj: 'Sử dụng thành thạo máy tìm kiếm để tìm thông tin bằng từ khoá hiệu quả.', sum: 'Kĩ năng chọn từ khoá chính xác, sử dụng dấu ngoặc kép để tìm cụm từ chính xác; đánh giá kết quả tìm kiếm.' },
  { num: 8, title: 'Bài 8. Thư điện tử', topic: 'Chủ đề 3. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 32, obj: 'Biết cấu trúc địa chỉ email; các bước tạo, soạn, gửi và nhận thư điện tử đính kèm tệp.', sum: 'Ưu thế của email so với thư truyền thống; cú pháp địa chỉ email; quy tắc an toàn và lịch sự khi gửi thư.' },
  { num: 9, title: 'Bài 9. An toàn thông tin trên Internet', topic: 'Chủ đề 4. Đạo đức, pháp luật và văn hoá trong môi trường số', page: 37, obj: 'Nhận biết các mối nguy hiểm trên không gian mạng và cách bảo vệ thông tin cá nhân.', sum: 'Bảo mật mật khẩu mạnh, tránh bấm liên kết lạ, phòng ngừa mã độc và virus máy tính; quy tắc ứng xử chuẩn mực.' },
  { num: 10, title: 'Bài 10. Sơ đồ tư duy', topic: 'Chủ đề 5. Ứng dụng tin học', page: 42, obj: 'Hiểu lợi ích của sơ đồ tư duy; biết sử dụng phần mềm tạo sơ đồ tư duy phục vụ học tập.', sum: 'Các thành phần của sơ đồ tư duy: chủ đề chính, nhánh cấp 1, cấp 2, từ khoá, hình ảnh; thực hành phần mềm Mindmap.' },
  { num: 11, title: 'Bài 11. Định dạng văn bản', topic: 'Chủ đề 5. Ứng dụng tin học', page: 48, obj: 'Thành thạo định dạng kí tự, định dạng đoạn văn bản trong phần mềm soạn thảo Word.', sum: 'Phông chữ, cỡ chữ, kiểu chữ, màu sắc; căn lề trái/phải/giữa/đều, khoảng cách dòng và thụt lề đầu dòng.' },
  { num: 12, title: 'Bài 12. Trình bày thông tin ở dạng bảng', topic: 'Chủ đề 5. Ứng dụng tin học', page: 53, obj: 'Biết tạo bảng biểu, chèn/xoá dòng, cột, gộp ô và định dạng bảng văn bản rõ ràng.', sum: 'Chèn bảng trong văn bản Word; định dạng đường viền, màu nền và căn chỉnh dữ liệu trong ô.' },
  { num: 13, title: 'Bài 13. Thực hành: Tìm kiếm và thay thế', topic: 'Chủ đề 5. Ứng dụng tin học', page: 58, obj: 'Sử dụng thành thạo công cụ Find & Replace để sửa lỗi văn bản tự động và nhanh chóng.', sum: 'Thực hành thao tác tìm kiếm cụm từ và thay thế hàng loạt trong bài văn dài.' },
  { num: 14, title: 'Bài 14. Thực hành tổng hợp: Hoàn thiện sổ lưu niệm', topic: 'Chủ đề 5. Ứng dụng tin học', page: 61, obj: 'Vận dụng tổng hợp các kĩ năng soạn thảo, chèn ảnh, bảng biểu để thiết kế sổ lưu niệm lớp.', sum: 'Dự án thực hành nhóm: xây dựng trang giới thiệu tập thể lớp 6A1 với hình ảnh, bảng phân công và bài viết.' },
  { num: 15, title: 'Bài 15. Thuật toán', topic: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 63, obj: 'Hiểu khái niệm thuật toán; mô tả thuật toán bằng phương pháp liệt kê và sơ đồ khối.', sum: 'Định nghĩa thuật toán; các hình khối chuẩn trong sơ đồ khối (hình oval, hình bình hành, hình chữ nhật, hình thoi).' },
  { num: 16, title: 'Bài 16. Các cấu trúc điều khiển', topic: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 67, obj: 'Nhận biết và vận dụng 3 cấu trúc điều khiển cơ bản: Tuần tự, Rẽ nhánh, Lặp.', sum: 'Cấu trúc tuần tự từng bước; cấu trúc rẽ nhánh Nếu... Thì...; cấu trúc lặp Lặp lại cho đến khi...' },
  { num: 17, title: 'Bài 17. Chương trình máy tính', topic: 'Chủ đề 6. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 71, obj: 'Hiểu mối liên hệ giữa thuật toán và chương trình; bước đầu làm quen môi trường lập trình trực quan.', sum: 'Khái niệm ngôn ngữ lập trình; chuyển đổi thuật toán sang khối lệnh Scratch trực quan sinh động.' },
];

const lessonsGrade7 = [
  { num: 1, title: 'Bài 1. Thiết bị vào – ra', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 5, obj: 'Nhận biết chức năng và phân loại các thiết bị vào (input) và thiết bị ra (output) của máy tính.', sum: 'Bàn phím, chuột, micro, máy quét; màn hình, máy in, loa; các cổng kết nối phổ biến USB, HDMI.' },
  { num: 2, title: 'Bài 2. Phần mềm máy tính', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 10, obj: 'Phân biệt phần mềm hệ thống (hệ điều hành) và phần mềm ứng dụng; biết vai trò của hệ điều hành.', sum: 'Hệ điều hành Windows, Android, iOS; phần mềm ứng dụng học tập, văn phòng, trình duyệt web.' },
  { num: 3, title: 'Bài 3. Quản lí dữ liệu trong máy tính', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 13, obj: 'Tổ chức cây thư mục hợp lí, thực hiện các thao tác tệp và thư mục an toàn.', sum: 'Cây thư mục, đường dẫn tệp, phần mở rộng tệp (.docx, .xlsx, .pdf, .png); sao chép, di chuyển, đổi tên tệp.' },
  { num: 4, title: 'Bài 4. Mạng xã hội và một số kênh trao đổi thông tin trên Internet', topic: 'Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 18, obj: 'Biết đặc điểm của mạng xã hội, các kênh trao đổi thông tin và cách sử dụng có trách nhiệm.', sum: 'Mạng xã hội phổ biến (Facebook, Zalo, YouTube); chia sẻ thông tin văn minh, tôn trọng người khác.' },
  { num: 5, title: 'Bài 5. Ứng xử trên mạng', topic: 'Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số', page: 23, obj: 'Hiểu quy tắc ứng xử trên mạng, phòng tránh bạo lực mạng và tôn trọng bản quyền số.', sum: 'Bộ quy tắc ứng xử trên mạng xã hội; văn hoá giao tiếp trực tuyến; tác hại của tin giả (fake news).' },
  { num: 6, title: 'Bài 6. Làm quen với phần mềm bảng tính', topic: 'Chủ đề 4. Ứng dụng tin học', page: 28, obj: 'Nắm được giao diện, ô, hàng, cột, bảng tính tính toán điện tử Excel.', sum: 'Địa chỉ ô tính, thanh công thức, khối ô tính; nhập dữ liệu số, kí tự, ngày tháng trong bảng tính.' },
  { num: 7, title: 'Bài 7. Tính toán tự động trên bảng tính', topic: 'Chủ đề 4. Ứng dụng tin học', page: 34, obj: 'Biết nhập công thức toán học bắt đầu bằng dấu bằng (=), sử dụng địa chỉ ô trong tính toán.', sum: 'Các phép toán +, -, *, /, ^; tính toán tự động cập nhật khi thay đổi dữ liệu; sao chép công thức.' },
  { num: 8, title: 'Bài 8. Công cụ hỗ trợ tính toán', topic: 'Chủ đề 4. Ứng dụng tin học', page: 39, obj: 'Sử dụng thành thạo các hàm cơ bản SUM, AVERAGE, MAX, MIN, COUNT trong bảng tính.', sum: 'Cú pháp hàm tính tổng SUM, tính trung bình cộng AVERAGE, tìm giá trị lớn nhất MAX, nhỏ nhất MIN.' },
  { num: 9, title: 'Bài 9. Trình bày bảng tính', topic: 'Chủ đề 4. Ứng dụng tin học', page: 45, obj: 'Định dạng dữ liệu số, kẻ đường viền bảng, căn lề ô tính đẹp mắt, khoa học.', sum: 'Định dạng kiểu số thập phân, tiền tệ, phần trăm; tô màu nền bảng điểm lớp học.' },
  { num: 10, title: 'Bài 10. Hoàn thiện bảng tính', topic: 'Chủ đề 4. Ứng dụng tin học', page: 51, obj: 'Thiết lập trang in, ngắt trang và in bảng tính đúng quy cách; rà soát lỗi bảng tính.', sum: 'Xem trước khi in (Print Preview), căn chỉnh vừa khít một trang giấy, in ấn bảng tính thực tế.' },
  { num: 11, title: 'Bài 11. Tạo bài trình chiếu', topic: 'Chủ đề 4. Ứng dụng tin học', page: 55, obj: 'Tạo trang chiếu mới, chèn văn bản, bố cục trang chiếu (layout) trong PowerPoint.', sum: 'Khái niệm bài trình chiếu; tiêu đề trang, nội dung chính; chọn mẫu bố cục phù hợp chủ đề.' },
  { num: 12, title: 'Bài 12. Định dạng đối tượng trên trang chiếu', topic: 'Chủ đề 4. Ứng dụng tin học', page: 61, obj: 'Chèn và định dạng hình ảnh, sơ đồ, hiệu ứng chuyển trang (Transition) và hiệu ứng đối tượng (Animation).', sum: 'Nguyên tắc thiết kế trang chiếu không quá nhiều chữ; phối hợp màu sắc tương phản rõ ràng.' },
  { num: 13, title: 'Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu', topic: 'Chủ đề 4. Ứng dụng tin học', page: 68, obj: 'Hoàn thiện và báo cáo bài thuyết trình chuyên đề khoa học công nghệ của nhóm học sinh.', sum: 'Trình diễn toàn màn hình (Slide Show), sử dụng bút laser ảo và kĩ năng trả lời câu hỏi phản biện.' },
  { num: 14, title: 'Bài 14. Thuật toán tìm kiếm tuần tự', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 71, obj: 'Hiểu nguyên lý hoạt động và mô tả được thuật toán tìm kiếm tuần tự (Sequential Search).', sum: 'Duyệt từng phần tử từ đầu đến cuối danh sách cho đến khi tìm thấy hoặc hết danh sách.' },
  { num: 15, title: 'Bài 15. Thuật toán tìm kiếm nhị phân', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 74, obj: 'Nắm vững điều kiện áp dụng (danh sách đã sắp xếp) và các bước chia đôi của tìm kiếm nhị phân (Binary Search).', sum: 'So sánh phần tử giữa, thu hẹp nửa trái hoặc nửa phải; so sánh tốc độ vượt trội với tìm kiếm tuần tự.' },
  { num: 16, title: 'Bài 16. Thuật toán sắp xếp', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 78, obj: 'Mô tả thuật toán sắp xếp nổi bọt (Bubble Sort) và thuật toán sắp xếp chọn (Selection Sort).', sum: 'Quy trình hoán đổi các cặp phần tử liền kề; sắp xếp danh sách điểm học sinh tăng dần/giảm dần.' },
];

const lessonsGrade8 = [
  { num: 1, title: 'Bài 1. Lược sử công cụ tính toán', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 5, obj: 'Trình bày sơ lược lịch sử phát triển máy tính từ bàn tính cơ khí đến máy tính điện tử và AI.', sum: 'Bàn tính gảy, máy tính cơ khí Pascaline, máy tính thế hệ đèn điện tử chân không đến vi mạch tích hợp và siêu máy tính.' },
  { num: 2, title: 'Bài 2. Thông tin trong môi trường số', topic: 'Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 10, obj: 'Nhận biết đặc điểm thông tin số: dễ nhân bản, dễ lan truyền, khó xóa bỏ hoàn toàn.', sum: 'Tính chính xác, độ tin cậy của thông tin trên mạng; tác động của thông tin số đối với xã hội.' },
  { num: 3, title: 'Bài 3. Thực hành: Khai thác thông tin số', topic: 'Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 14, obj: 'Tìm kiếm, đánh giá và trích dẫn thông tin số phục vụ dự án học tập đúng quy định.', sum: 'Kĩ năng lọc nguồn tin uy tín (.edu, .gov); cách ghi nguồn tác giả và tài liệu tham khảo.' },
  { num: 4, title: 'Bài 4. Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số', topic: 'Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số', page: 18, obj: 'Tuân thủ luật sở hữu trí tuệ, tôn trọng bản quyền phần mềm và dữ liệu số.', sum: 'Khái niệm bản quyền, phần mềm bản quyền vs phần mềm lậu; trách nhiệm pháp lý khi chia sẻ tài liệu số.' },
  { num: 5, title: 'Bài 5. Sử dụng bảng tính giải quyết bài toán thực tế', topic: 'Chủ đề 4. Ứng dụng tin học', page: 21, obj: 'Vận dụng công thức và hàm bảng tính để giải quyết bài toán quản lí thu chi, tính điểm trung bình.', sum: 'Sử dụng địa chỉ tương đối và địa chỉ tuyệt đối ($A$1) khi sao chép công thức toán học.' },
  { num: 6, title: 'Bài 6. Sắp xếp và lọc dữ liệu', topic: 'Chủ đề 4. Ứng dụng tin học', page: 27, obj: 'Sử dụng thành thạo công cụ Sort & Filter trên bảng dữ liệu Excel để tra cứu thông tin.', sum: 'Sắp xếp danh sách nhiều tiêu chí; lọc tự động (AutoFilter) trích xuất học sinh đạt điểm giỏi.' },
  { num: 7, title: 'Bài 7. Trực quan hoá dữ liệu', topic: 'Chủ đề 4. Ứng dụng tin học', page: 32, obj: 'Biết chọn dạng biểu đồ thích hợp (cột, tròn, đường) để trực quan hoá số liệu thống kê.', sum: 'Tạo biểu đồ hình cột so sánh, biểu đồ hình tròn tỷ lệ cơ cấu; gắn nhãn dữ liệu và tiêu đề biểu đồ.' },
  { num: '8a', title: 'Bài 8a. Làm việc với danh sách dạng liệt kê và hình ảnh trong văn bản', topic: 'Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao', page: 36, obj: 'Tạo danh sách dấu đầu dòng (Bullet) và danh sách có thứ tự (Numbering); chèn và định dạng ảnh.', sum: 'Căn chỉnh ảnh với dòng văn bản (Wrap Text), hiệu ứng đường viền ảnh chuyên nghiệp trong Word.' },
  { num: '9a', title: 'Bài 9a. Tạo đầu trang, chân trang cho văn bản', topic: 'Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao', page: 42, obj: 'Biết chèn Header & Footer, đánh số trang tự động cho báo cáo học tập nhiều trang.', sum: 'Thiết lập số trang khác nhau giữa trang bìa và trang nội dung văn bản.' },
  { num: '10a', title: 'Bài 10a. Định dạng nâng cao cho trang chiếu', topic: 'Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao', page: 46, obj: 'Áp dụng thiết kế đồng bộ Theme, màu sắc, phông chữ chuẩn cho bài thuyết trình.', sum: 'Sử dụng Slide Master định dạng chung toàn bộ slide trình chiếu nhanh chóng, chuyên nghiệp.' },
  { num: '11a', title: 'Bài 11a. Sử dụng bản mẫu tạo bài trình chiếu', topic: 'Chủ đề 4a. Soạn thảo văn bản và trình chiếu nâng cao', page: 51, obj: 'Khai thác bản mẫu Template có sẵn để tạo bài trình chiếu đẹp mắt, tiết kiệm thời gian.', sum: 'Tìm kiếm và tuỳ biến template bài giảng điện tử sinh động theo chủ đề bài học.' },
  { num: '8b', title: 'Bài 8b. Phần mềm chỉnh sửa ảnh', topic: 'Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh', page: 56, obj: 'Làm quen giao diện phần mềm chỉnh sửa ảnh, khái niệm lớp (layer), vùng chọn.', sum: 'Công cụ chọn vùng hình chữ nhật, tự do (Lasso); tạo mới, ẩn/hiện và sắp xếp các lớp ảnh.' },
  { num: '9b', title: 'Bài 9b. Thay đổi khung hình, kích thước ảnh', topic: 'Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh', page: 62, obj: 'Thực hiện cắt cúp ảnh (Crop), phóng to, thu nhỏ kích thước và độ phân giải ảnh chuẩn.', sum: 'Bảo toàn tỷ lệ khung hình ảnh; xoay ảnh nghiêng, lật gương ảnh chính xác.' },
  { num: '10b', title: 'Bài 10b. Thêm văn bản, tạo hiệu ứng cho ảnh', topic: 'Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh', page: 66, obj: 'Chèn chữ nghệ thuật, áp dụng hiệu ứng đổ bóng, viền sáng và bộ lọc màu sắc (Filter).', sum: 'Định dạng phông chữ tiếng Việt; tạo áp phích quảng bá sự kiện trường học.' },
  { num: '11b', title: 'Bài 11b. Thực hành tổng hợp: Chỉnh sửa ảnh', topic: 'Chủ đề 4b. Làm quen với phần mềm chỉnh sửa ảnh', page: 70, obj: 'Hoàn thiện sản phẩm ảnh nghệ thuật: thiệp chúc mừng hoặc poster tuyên truyền trường học.', sum: 'Tích hợp ghép ảnh nhiều lớp, làm mờ hậu cảnh và xuất file ảnh định dạng PNG/JPEG chất lượng cao.' },
  { num: 12, title: 'Bài 12. Từ thuật toán đến chương trình', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 73, obj: 'Chuyển đổi bài toán thực tế thành thuật toán và viết chương trình chạy trên máy tính.', sum: 'Mô tả bài toán qua Input, Output và các bước thực thi tuần tự trong môi trường lập trình.' },
  { num: 13, title: 'Bài 13. Biểu diễn dữ liệu', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 76, obj: 'Hiểu khái niệm biến số, hằng số và các kiểu dữ liệu số nguyên, số thực, xâu kí tự.', sum: 'Khai báo biến, gán giá trị cho biến và sử dụng biến trong biểu thức tính toán.' },
  { num: 14, title: 'Bài 14. Cấu trúc điều khiển', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 80, obj: 'Lập trình câu lệnh điều kiện If-Else và câu lệnh lặp For/While trong chương trình.', sum: 'Xây dựng bài toán kiểm tra tính chẵn lẻ, tính tổng dãy số tự nhiên bằng vòng lặp.' },
  { num: 15, title: 'Bài 15. Gỡ lỗi', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 86, obj: 'Phân biệt lỗi cú pháp (Syntax error) và lỗi ngữ nghĩa (Logic error); biết cách đặt breakpoint gỡ lỗi.', sum: 'Phương pháp gỡ lỗi từng bước, quan sát giá trị biến để sửa sai thuật toán.' },
  { num: 16, title: 'Bài 16. Tin học với nghề nghiệp', topic: 'Chủ đề 6. Hướng nghiệp với Tin học', page: 91, obj: 'Tìm hiểu các ngành nghề trong lĩnh vực công nghệ thông tin và kĩ năng cần chuẩn bị.', sum: 'Nghề lập trình viên, thiết kế đồ hoạ, quản trị mạng, an ninh mạng, chuyên viên phân tích dữ liệu.' },
];

const lessonsGrade9 = [
  { num: 1, title: 'Bài 1. Thế giới kĩ thuật số', topic: 'Chủ đề 1. Máy tính và cộng đồng', page: 5, obj: 'Nhận biết sự phổ biến của thiết bị kĩ thuật số trong đời sống và cuộc cách mạng công nghiệp 4.0.', sum: 'Internet vạn vật (IoT), trí tuệ nhân tạo (AI), điện toán đám mây và tác động đến cuộc sống con người.' },
  { num: 2, title: 'Bài 2. Thông tin trong giải quyết vấn đề', topic: 'Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 9, obj: 'Biết thu thập, phân tích thông tin để đưa ra quyết định hợp lý trong tình huống thực tế.', sum: 'Xác định vấn đề, các tiêu chí lựa chọn giải pháp dựa trên dữ liệu thu thập được.' },
  { num: 3, title: 'Bài 3. Thực hành: Đánh giá chất lượng thông tin', topic: 'Chủ đề 2. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', page: 12, obj: 'Đánh giá độ chính xác, tính cập nhật và mục đích của thông tin trên mạng Internet.', sum: 'Thực hành phân tích các bài viết mạng xã hội, nhận diện dấu hiệu lừa đảo và tin giả.' },
  { num: 4, title: 'Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet', topic: 'Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số', page: 15, obj: 'Hiểu các quy định cơ bản của Luật An ninh mạng và trách nhiệm khi dùng dịch vụ số.', sum: 'Bảo vệ dữ liệu cá nhân, quyền riêng tư; các hành vi bị nghiêm cấm trên không gian mạng.' },
  { num: 5, title: 'Bài 5. Tìm hiểu phần mềm mô phỏng', topic: 'Chủ đề 4. Ứng dụng tin học', page: 20, obj: 'Hiểu khái niệm và vai trò của phần mềm mô phỏng trong học tập khoa học và đời sống.', sum: 'Mô phỏng thí nghiệm vật lý, hoá học ảo PhET; mô phỏng giao thông và hệ mặt trời.' },
  { num: 6, title: 'Bài 6. Thực hành: Khai thác phần mềm mô phỏng', topic: 'Chủ đề 4. Ứng dụng tin học', page: 23, obj: 'Thực hành quan sát và làm thí nghiệm ảo trên phần mềm mô phỏng giáo dục.', sum: 'Thao tác thay đổi các tham số đầu vào và quan sát hiện tượng tương tác trên mô hình.' },
  { num: 7, title: 'Bài 7. Trình bày thông tin trong trao đổi và hợp tác', topic: 'Chủ đề 4. Ứng dụng tin học', page: 27, obj: 'Sử dụng các công cụ trực quan để trao đổi, làm việc nhóm trực tuyến hiệu quả.', sum: 'Chia sẻ tài liệu dùng chung Google Docs/OneDrive; bình luận phản hồi trong làm việc nhóm.' },
  { num: 8, title: 'Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác', topic: 'Chủ đề 4. Ứng dụng tin học', page: 30, obj: 'Thiết kế báo cáo trình diễn nhóm kết hợp bảng biểu, đồ thị và hình ảnh tương tác.', sum: 'Phân công công việc nhóm; chuẩn bị slide tổng kết hoạt động ngoại khoá lớp 9A1.' },
  { num: '9a', title: 'Bài 9a. Sử dụng công cụ xác thực dữ liệu', topic: 'Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao', page: 34, obj: 'Sử dụng Data Validation để kiểm soát giá trị nhập vào ô tính (giới hạn số, danh sách thả xuống Dropdown).', sum: 'Tạo danh sách chọn lớp, giới hạn điểm số từ 0 đến 10; hiển thị thông báo lỗi khi nhập sai.' },
  { num: '10a', title: 'Bài 10a. Sử dụng hàm COUNTIF', topic: 'Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao', page: 41, obj: 'Thành thạo hàm COUNTIF để đếm số ô thoả mãn điều kiện trong bảng tính điện tử.', sum: 'Đếm số học sinh đạt điểm xuất sắc; đếm số buổi nghỉ học có phép/không phép.' },
  { num: '11a', title: 'Bài 11a. Sử dụng hàm SUMIF', topic: 'Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao', page: 45, obj: 'Áp dụng hàm SUMIF để tính tổng các giá trị thoả mãn điều kiện cho trước.', sum: 'Tính tổng học bổng lớp, tính tổng chi phí sinh hoạt theo từng nhóm danh mục.' },
  { num: '12a', title: 'Bài 12a. Sử dụng hàm IF', topic: 'Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao', page: 48, obj: 'Nắm vững cú pháp hàm điều kiện IF(logical_test, value_if_true, value_if_false) và IF lồng nhau.', sum: 'Xếp loại học lực học sinh tự động căn cứ vào điểm trung bình môn.' },
  { num: '13a', title: 'Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình', topic: 'Chủ đề 4a. Sử dụng bảng tính điện tử nâng cao', page: 52, obj: 'Vận dụng tổng hợp các hàm IF, COUNTIF, SUMIF và Data Validation để hoàn thiện bảng tính thu chi.', sum: 'Dự án thực tế: Lập bảng tính kế hoạch tài chính cá nhân và gia đình theo tháng.' },
  { num: '9b', title: 'Bài 9b. Các chức năng chính của phần mềm làm video', topic: 'Chủ đề 4b. Làm quen với phần mềm làm video', page: 55, obj: 'Nhận biết giao diện Timeline, thư viện media và các công cụ cắt ghép video cơ bản.', sum: 'Giao diện làm việc của Video Editor/CapCut; thêm video, hình ảnh và nhạc nền.' },
  { num: '10b', title: 'Bài 10b. Chuẩn bị dữ liệu và dựng video', topic: 'Chủ đề 4b. Làm quen với phần mềm làm video', page: 60, obj: 'Lập kịch bản phân cảnh (Storyboard), sắp xếp trình tự clip và hình ảnh trên Timeline.', sum: 'Kĩ năng chọn góc quay; đồng bộ âm thanh giọng nói và phụ đề video.' },
  { num: '11b', title: 'Bài 11b. Thực hành: Dựng video theo kịch bản', topic: 'Chủ đề 4b. Làm quen với phần mềm làm video', page: 65, obj: 'Thực hiện cắt tỉa đoạn phim thừa (Trim/Split), thêm hiệu ứng chuyển cảnh mềm mại.', sum: 'Chèn hiệu ứng Fade in/Fade out âm thanh; lồng tiếng giới thiệu danh lam thắng cảnh.' },
  { num: '12b', title: 'Bài 12b. Hoàn thành việc dựng video', topic: 'Chủ đề 4b. Làm quen với phần mềm làm video', page: 69, obj: 'Thêm tiêu đề mở đầu, phụ đề chạy chữ và danh đề kết thúc (Credits) video.', sum: 'Định dạng kiểu chữ phụ đề dễ đọc, canh chỉnh thời lượng hiển thị khớp lời thoại.' },
  { num: '13b', title: 'Bài 13b. Biên tập và xuất video', topic: 'Chủ đề 4b. Làm quen với phần mềm làm video', page: 73, obj: 'Xem trước, chỉnh màu và xuất tệp video hoàn chỉnh chuẩn Full HD 1080p.', sum: 'Chọn định dạng MP4 nén dung lượng phù hợp chia sẻ lên Internet; báo cáo sản phẩm.' },
  { num: 14, title: 'Bài 14. Giải quyết vấn đề', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 76, obj: 'Phân tích vấn đề phức tạp thành các bài toán con nhỏ hơn theo phương pháp chia để trị.', sum: 'Quy trình tư duy máy tính (Computational Thinking): Phân rã, Nhận diện mẫu, Trừu tượng hoá, Thiết kế thuật toán.' },
  { num: 15, title: 'Bài 15. Bài toán tin học', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 79, obj: 'Xác định rõ Input, Output và tính đúng đắn của giải thuật cho bài toán tin học.', sum: 'Ví dụ bài toán tìm ước chung lớn nhất (UCLN), bài toán kiểm tra số nguyên tố.' },
  { num: 16, title: 'Bài 16. Thực hành: Lập chương trình máy tính', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 83, obj: 'Viết và chạy thử chương trình giải bài toán trên máy tính, kiểm tra các trường hợp biên.', sum: 'Thực hành lập trình tính toán và kiểm tra kết quả với bộ dữ liệu mẫu.' },
  { num: 17, title: 'Bài 17. Tin học và thế giới nghề nghiệp', topic: 'Chủ đề 6. Hướng nghiệp với tin học', page: 87, obj: 'Tìm hiểu xu hướng nghề nghiệp trong kỉ nguyên số và cơ hội việc làm ngành CNTT.', sum: 'Các nhóm ngành Công nghệ phần mềm, Hệ thống thông tin, An toàn thông tin, Trí tuệ nhân tạo.' },
];

const lessonsGrade10 = [
  { num: 1, title: 'Bài 1. Thông tin và xử lí thông tin', topic: 'Chủ đề 1. Máy tính và xã hội tri thức', page: 6, obj: 'Phân biệt thông tin và dữ liệu ở mức độ chuyên sâu; hiểu chu trình chuyển đổi thông tin thành tri thức.', sum: 'Dữ liệu số, quá trình thu thập, xử lý và tạo ra quyết định thông minh của con người và hệ thống số.' },
  { num: 2, title: 'Bài 2. Vai trò của thiết bị thông minh và tin học đối với xã hội', topic: 'Chủ đề 1. Máy tính và xã hội tri thức', page: 11, obj: 'Hiểu các đặc tính của thiết bị thông minh (Smart devices) và đóng góp của tin học trong công nghiệp 4.0.', sum: 'Điện thoại thông minh, đồng hồ thông minh, hệ thống cảm biến IoT trong y tế, nông nghiệp công nghệ cao.' },
  { num: 3, title: 'Bài 3. Một số kiểu dữ liệu và dữ liệu văn bản', topic: 'Chủ đề 1. Máy tính và xã hội tri thức', page: 16, obj: 'Biết cách mã hoá văn bản bằng bảng mã ASCII và Unicode (UTF-8, UTF-16).', sum: 'Mã nhị phân biểu diễn kí tự; tầm quan trọng của chuẩn quốc tế Unicode trong hiển thị tiếng Việt.' },
  { num: 4, title: 'Bài 4. Hệ nhị phân và dữ liệu số nguyên', topic: 'Chủ đề 1. Máy tính và xã hội tri thức', page: 20, obj: 'Chuyển đổi số giữa hệ thập phân (hệ 10), hệ nhị phân (hệ 2) và hệ thập lục phân (hệ 16).', sum: 'Quy tắc chia cho 2 lấy dư; biểu diễn số nguyên có dấu bằng phương pháp bù 2 (Two\'s complement).' },
  { num: 5, title: 'Bài 5. Dữ liệu lôgic', topic: 'Chủ đề 1. Máy tính và xã hội tri thức', page: 24, obj: 'Hiểu đại số Boole và các phép toán logic cơ bản: AND, OR, NOT, XOR.', sum: 'Bảng chân trị (Truth table); ứng dụng của biểu thức logic trong điều kiện rẽ nhánh chương trình.' },
  { num: 6, title: 'Bài 6. Dữ liệu âm thanh và hình ảnh', topic: 'Chủ đề 1. Máy tính và xã hội tri thức', page: 28, obj: 'Hiểu nguyên lý số hoá âm thanh (lấy mẫu và lượng tử hoá) và số hoá ảnh raster (điểm ảnh pixel, kênh màu RGB).', sum: 'Độ sâu màu 24-bit TrueColor; tần số lấy mẫu âm thanh; các chuẩn nén MP3, WAV, JPEG, PNG.' },
  { num: 7, title: 'Bài 7. Thực hành sử dụng thiết bị số thông dụng', topic: 'Chủ đề 1. Máy tính và xã hội tri thức', page: 33, obj: 'Kết nối và truyền dữ liệu an toàn giữa máy tính, điện thoại, máy ảnh và thiết bị lưu trữ số.', sum: 'Kết nối qua cáp USB Type-C, Bluetooth, AirDrop; sao lưu dữ liệu lên đám mây Google Drive/OneDrive.' },
  { num: 8, title: 'Bài 8. Mạng máy tính trong cuộc sống hiện đại', topic: 'Chủ đề 2. Mạng máy tính và Internet', page: 38, obj: 'Hiểu kiến trúc mạng LAN, WAN, giao thức TCP/IP, địa chỉ IP (IPv4, IPv6) và tên miền DNS.', sum: 'Cách gói dữ liệu di chuyển trên Internet; dịch vụ định tuyến Router và nhà cung cấp dịch vụ mạng ISP.' },
  { num: 9, title: 'Bài 9. An toàn trên không gian mạng', topic: 'Chủ đề 2. Mạng máy tính và Internet', page: 44, obj: 'Nhận biết các hình thức tấn công mạng: Virus, Trojan, Ransomware, Phishing; biết cách phòng ngừa.', sum: 'Xác thực hai yếu tố (2FA), tường lửa (Firewall), mã hoá đường truyền HTTPS; bảo mật dữ liệu học tập.' },
  { num: 10, title: 'Bài 10. Thực hành khai thác tài nguyên trên Internet', topic: 'Chủ đề 2. Mạng máy tính và Internet', page: 50, obj: 'Tìm kiếm tài liệu học thuật, sử dụng từ khoá nâng cao (filetype:pdf, site:.edu.vn) và dịch vụ lưu trữ số.', sum: 'Thực hành khai thác thư viện số mở và tài nguyên học liệu số an toàn.' },
  { num: 11, title: 'Bài 11. Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền', topic: 'Chủ đề 3. Đạo đức, pháp luật và văn hoá trong môi trường số', page: 55, obj: 'Nắm vững các giấy phép phần mềm mã nguồn mở (GPL, MIT, Creative Commons); tôn trọng quyền tác giả.', sum: 'Vi phạm bản quyền số và chế tài xử lý theo Luật Sở hữu trí tuệ; quy tắc văn hoá tranh luận trên mạng.' },
  { num: 12, title: 'Bài 12. Phần mềm thiết kế đồ hoạ', topic: 'Chủ đề 4. Ứng dụng tin học', page: 63, obj: 'Phân biệt đồ hoạ raster (điểm ảnh) và đồ hoạ vector; làm quen giao diện phần mềm Inkscape.', sum: 'Ưu thế không vỡ hạt khi phóng to của đồ hoạ vector; thanh công cụ vẽ hình cơ bản trong Inkscape.' },
  { num: 13, title: 'Bài 13. Bổ sung các đối tượng đồ hoạ', topic: 'Chủ đề 4. Ứng dụng tin học', page: 69, obj: 'Vẽ hình chữ nhật, elip, ngôi sao, đường cong Bezier; tô màu tô (Fill) và màu viền (Stroke).', sum: 'Căn chỉnh đối tượng (Align & Distribute); quản lí thứ tự lớp vẽ chồng nhau (Z-order).' },
  { num: 14, title: 'Bài 14. Làm việc với đối tượng đường và văn bản', topic: 'Chủ đề 4. Ứng dụng tin học', page: 75, obj: 'Chuyển hình khối sang đường (Object to Path), chỉnh sửa điểm nút (Nodes); chèn chữ uốn lượn theo đường cong.', sum: 'Công cụ Node tool; uốn chữ theo đường cong thẩm mĩ để thiết kế logo và huy hiệu.' },
  { num: 15, title: 'Bài 15. Hoàn thiện hình ảnh đồ hoạ', topic: 'Chủ đề 4. Ứng dụng tin học', page: 82, obj: 'Sử dụng các phép toán hợp (Union), giao (Intersection), hiệu (Difference) để tạo hình phức tạp.', sum: 'Xuất sản phẩm thiết kế đồ hoạ vector sang định dạng SVG và PNG chất lượng cao.' },
  { num: 16, title: 'Bài 16. Ngôn ngữ lập trình bậc cao và Python', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 86, obj: 'Làm quen môi trường tương tác Python IDLE, lệnh xuất print(), kiểu chú thích (#).', sum: 'Lịch sử ngôn ngữ Python; so sánh chế độ tương tác (Interactive mode) và chế độ soạn thảo kịch bản (Script mode).' },
  { num: 17, title: 'Bài 17. Biến và lệnh gán', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 91, obj: 'Quy tắc đặt tên biến trong Python; sử dụng toán tử gán (=) và các phép toán số học (+, -, *, /, //, %, **).', sum: 'Phép chia nguyên //, phép chia dư % và luỹ thừa **; phân biệt số nguyên int và số thực float.' },
  { num: 18, title: 'Bài 18. Các lệnh vào ra đơn giản', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 97, obj: 'Nhập dữ liệu bằng input(), ép kiểu dữ liệu int(), float(), str(); định dạng chuỗi xuất f-string.', sum: 'Cú pháp x = int(input()); xử lý lỗi nhập sai kiểu dữ liệu (ValueError) cơ bản.' },
  { num: 19, title: 'Bài 19. Câu lệnh rẽ nhánh if', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 101, obj: 'Sử dụng câu lệnh if, if-else, if-elif-else; quy tắc thụt đầu dòng (indentation 4 dấu cách) bắt buộc trong Python.', sum: 'Các toán tử so sánh (==, !=, >, <, >=, <=) và logic (and, or, not); giải phương trình bậc nhất, bậc hai.' },
  { num: 20, title: 'Bài 20. Câu lệnh lặp for', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 105, obj: 'Lập trình vòng lặp với số lần biết trước dùng hàm range(start, stop, step).', sum: 'Tính tổng 1 đến n; in bảng cửu chương; duyệt qua từng phần tử của dãy số.' },
  { num: 21, title: 'Bài 21. Câu lệnh lặp while', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 108, obj: 'Sử dụng vòng lặp với số lần chưa biết trước while condition; tránh vòng lặp vô tận (infinite loop).', sum: 'Bài toán tìm số đảo ngược, tính ước chung lớn nhất Euclid bằng vòng lặp while.' },
  { num: 22, title: 'Bài 22. Kiểu dữ liệu danh sách', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 111, obj: 'Tạo danh sách list [], truy cập phần tử qua chỉ số (index 0 đến len-1); duyệt mảng bằng vòng for.', sum: 'Chỉ số dương, chỉ số âm (-1 phần tử cuối); độ dài danh sách len(); kiểm tra phần tử với in.' },
  { num: 23, title: 'Bài 23. Một số lệnh làm việc với dữ liệu danh sách', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 115, obj: 'Sử dụng thành thạo các phương thức append(), insert(), remove(), pop(), sort(), reverse().', sum: 'Thêm, xoá, sắp xếp danh sách điểm học sinh; kĩ thuật trích xuất danh sách con (slicing list).' },
  { num: 24, title: 'Bài 24. Xâu kí tự', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 119, obj: 'Làm việc với chuỗi string; ghép chuỗi (+), nhân chuỗi (*); truy cập từng kí tự trong chuỗi.', sum: 'Tính bất biến (immutable) của xâu trong Python; duyệt từng kí tự và đếm số kí tự đặc biệt.' },
  { num: 25, title: 'Bài 25. Một số lệnh làm việc với xâu kí tự', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 123, obj: 'Sử dụng các phương thức xử lý xâu: find(), count(), split(), join(), replace(), lower(), upper().', sum: 'Tách từ trong câu thành danh sách từ bằng split(); chuẩn hoá họ tên học sinh.' },
  { num: 26, title: 'Bài 26. Hàm trong Python', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 127, obj: 'Hiểu khái niệm chương trình con, định nghĩa hàm với từ khoá def và trả về giá trị bằng return.', sum: 'Cấu trúc định nghĩa hàm; tái sử dụng mã nguồn và module hoá chương trình lớn.' },
  { num: 27, title: 'Bài 27. Tham số của hàm', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 131, obj: 'Phân biệt tham số hình thức (parameters) và đối số thực sự (arguments); tham số mặc định (default values).', sum: 'Truyền giá trị cho hàm; viết hàm kiểm tra số nguyên tố và hàm tính giai thừa n!.' },
  { num: 28, title: 'Bài 28. Phạm vi của biến', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 136, obj: 'Phân biệt biến cục bộ (Local variable) bên trong hàm và biến toàn cục (Global variable).', sum: 'Sử dụng từ khoá global một cách thận trọng; tránh xung đột tên biến.' },
  { num: 29, title: 'Bài 29. Nhận biết lỗi chương trình', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 141, obj: 'Nhận biết thông báo lỗi SyntaxError, NameError, TypeError, IndexError, ZeroDivisionError.', sum: 'Đọc hiểu thông báo lỗi Traceback; dự đoán vị trí xảy ra lỗi trong mã nguồn Python.' },
  { num: 30, title: 'Bài 30. Kiểm thử và gỡ lỗi chương trình', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 145, obj: 'Thiết kế bộ dữ liệu kiểm thử (test cases) bao gồm ca thông thường và ca biên (edge cases).', sum: 'Kĩ thuật in chẩn đoán (print debugging); gỡ lỗi bằng cách chia nhỏ chương trình.' },
  { num: 31, title: 'Bài 31. Thực hành viết chương trình đơn giản', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 149, obj: 'Vận dụng tổng hợp hàm, danh sách, rẽ nhánh và vòng lặp để giải quyết bài toán thực tế.', sum: 'Xây dựng chương trình quản trị điểm học tập và thống kê xếp loại cho lớp 10A1.' },
  { num: 32, title: 'Bài 32. Ôn tập lập trình Python', topic: 'Chủ đề 5. Giải quyết vấn đề với sự trợ giúp của máy tính', page: 153, obj: 'Hệ thống hoá toàn bộ kiến thức lập trình cơ bản trong chương trình Tin học 10.', sum: 'Giải đề luyện tập tổng hợp, tối ưu thuật toán và chuẩn hoá phong cách viết code PEP 8.' },
  { num: 33, title: 'Bài 33. Nghề thiết kế đồ hoạ máy tính', topic: 'Chủ đề 6. Hướng nghiệp với Tin học', page: 156, obj: 'Tìm hiểu đặc thù công việc, cơ hội nghề nghiệp và yêu cầu năng lực của hoạ sĩ thiết kế đồ hoạ số.', sum: 'Thiết kế giao diện UI/UX, đồ hoạ 3D, thiết kế quảng cáo truyền thông số.' },
  { num: 34, title: 'Bài 34. Nghề phát triển phần mềm', topic: 'Chủ đề 6. Hướng nghiệp với Tin học', page: 160, obj: 'Tìm hiểu quy trình sản xuất phần mềm và vai trò của kĩ sư phần mềm (Software Engineer) trong xã hội.', sum: 'Quy trình: Phân tích yêu cầu - Thiết kế - Lập trình - Kiểm thử - Triển khai và bảo trì.' },
];

function buildLessons() {
  const all = [];

  function addGradeLessons(grade, list, classId, dateStart) {
    const d = new Date(dateStart);
    list.forEach((item, idx) => {
      // Calculate realistic date (e.g. 1-2 lessons per week)
      const lessonDate = new Date(d.getTime() + idx * 7 * 24 * 60 * 60 * 1000);
      const dateStr = lessonDate.toISOString().split('T')[0];
      const isPast = lessonDate < new Date('2026-04-01');
      const status = isPast ? 'completed' : (idx < 6 ? 'completed' : (idx < 12 ? 'planned' : 'draft'));

      all.push({
        id: `les_tin${grade}_${String(item.num).replace(/[^0-9a-z]/gi, '')}`,
        code: `TH0${grade}-${String(item.num).padStart(2, '0')}`,
        title: item.title,
        subject: `Tin học ${grade}`,
        grade: grade,
        classIds: [classId],
        topic: item.topic,
        objectives: item.obj,
        contentSummary: item.sum,
        date: dateStr,
        resources: `${textbookNames[grade]} (Trang ${item.page}), Tài liệu PDF: ${textbookFiles[grade]}, Bài giảng điện tử trình chiếu & Phiếu thực hành máy tính.`,
        status: status,
        updatedAt: '2026-03-20',
      });
    });
  }

  addGradeLessons(6, lessonsGrade6, 'cls_6a1', '2026-09-08');
  addGradeLessons(7, lessonsGrade7, 'cls_7a1', '2026-09-08');
  addGradeLessons(8, lessonsGrade8, 'cls_8a1', '2026-09-08');
  addGradeLessons(9, lessonsGrade9, 'cls_9a1', '2026-09-08');
  addGradeLessons(10, lessonsGrade10, 'cls_10a1', '2026-09-08');

  return all;
}

const initialLessons = buildLessons();

// 4. Tasks for Tin học classes
const initialTasks = [
  {
    id: 'tsk_th6_01',
    code: 'NV-TH6-01',
    title: 'Thực hành tạo Sơ đồ tư duy: Chủ đề "Máy tính và Internet"',
    description: 'Sử dụng phần mềm sơ đồ tư duy hoặc vẽ trên giấy để hệ thống hoá các thành phần mạng máy tính và dịch vụ Internet.',
    lessonId: 'les_tin6_10',
    classIds: ['cls_6a1'],
    assignedDate: '2026-11-10',
    dueDate: '2026-11-17',
    maxScore: 10,
    status: 'completed',
    notes: 'Khuyến khích học sinh sáng tạo màu sắc và hình ảnh minh hoạ.',
    createdAt: '2026-11-10',
  },
  {
    id: 'tsk_th7_01',
    code: 'NV-TH7-01',
    title: 'Lập bảng tính Excel: Bảng điểm và Tính điểm trung bình môn',
    description: 'Tạo bảng tính, nhập dữ liệu 10 học sinh, sử dụng công thức tính tự động và các hàm AVERAGE, MAX, MIN.',
    lessonId: 'les_tin7_8',
    classIds: ['cls_7a1'],
    assignedDate: '2026-11-05',
    dueDate: '2026-11-12',
    maxScore: 10,
    status: 'completed',
    notes: 'Yêu cầu định dạng số thập phân có 1 chữ số sau dấu phẩy.',
    createdAt: '2026-11-05',
  },
  {
    id: 'tsk_th8_01',
    code: 'NV-TH8-01',
    title: 'Thực hành Chỉnh sửa ảnh: Thiết kế Poster Tuyên truyền An toàn số',
    description: 'Sử dụng các lớp (layer), chèn hình ảnh, tạo hiệu ứng chữ và phối màu hài hoà.',
    lessonId: 'les_tin8_11b',
    classIds: ['cls_8a1'],
    assignedDate: '2026-11-18',
    dueDate: '2026-11-25',
    maxScore: 10,
    status: 'completed',
    notes: 'Xuất tệp định dạng .png nộp lên hệ thống.',
    createdAt: '2026-11-18',
  },
  {
    id: 'tsk_th9_01',
    code: 'NV-TH9-01',
    title: 'Bảng tính nâng cao: Sử dụng hàm IF, COUNTIF thống kê khảo sát',
    description: 'Sử dụng hàm IF để tự động xếp loại và hàm COUNTIF đếm số lượng học sinh theo từng mức đạt được.',
    lessonId: 'les_tin9_12a',
    classIds: ['cls_9a1'],
    assignedDate: '2026-12-02',
    dueDate: '2026-12-09',
    maxScore: 10,
    status: 'completed',
    notes: 'Kết hợp tính năng Data Validation cho cột nhập điểm.',
    createdAt: '2026-12-02',
  },
  {
    id: 'tsk_th10_01',
    code: 'NV-TH10-01',
    title: 'Lập trình Python: Xây dựng hàm kiểm tra và xử lý Danh sách (List)',
    description: 'Viết chương trình Python gồm các hàm: nhập danh sách n số nguyên, tìm số lớn nhất, lọc các số chẵn và tính trung bình cộng.',
    lessonId: 'les_tin10_26',
    classIds: ['cls_10a1'],
    assignedDate: '2026-12-10',
    dueDate: '2026-12-18',
    maxScore: 10,
    status: 'completed',
    notes: 'Yêu cầu chú thích mã nguồn rõ ràng theo chuẩn PEP 8.',
    createdAt: '2026-12-10',
  },
  {
    id: 'tsk_th10_02',
    code: 'NV-TH10-02',
    title: 'Dự án Python Mini: Chương trình Quản trị Điểm học tập',
    description: 'Áp dụng hàm, vòng lặp, câu lệnh rẽ nhánh và kiểu dữ liệu xâu/danh sách để quản lí danh sách điểm và xếp loại học lực.',
    lessonId: 'les_tin10_31',
    classIds: ['cls_10a1'],
    assignedDate: '2027-02-15',
    dueDate: '2027-02-28',
    maxScore: 10,
    status: 'in_progress',
    notes: 'Dự án học kì II, học sinh có thể làm việc theo cặp 2 bạn.',
    createdAt: '2027-02-15',
  },
];

// 5. Submissions
const initialTaskSubmissions = [
  { id: 'sub_th6_01', taskId: 'tsk_th6_01', studentId: 'stu_6001', classId: 'cls_6a1', status: 'graded', submissionDate: '2026-11-14', score: 9.5, feedback: 'Sơ đồ tư duy trực quan, phối màu rất khoa học!', updatedAt: '2026-11-15' },
  { id: 'sub_th6_02', taskId: 'tsk_th6_01', studentId: 'stu_6002', classId: 'cls_6a1', status: 'graded', submissionDate: '2026-11-15', score: 9.0, feedback: 'Đầy đủ các nhánh kiến thức quan trọng.', updatedAt: '2026-11-15' },
  { id: 'sub_th6_03', taskId: 'tsk_th6_01', studentId: 'stu_6003', classId: 'cls_6a1', status: 'late', submissionDate: '2026-11-18', score: 7.0, feedback: 'Nộp muộn 1 ngày, cần bổ sung thêm nhánh ứng dụng.', updatedAt: '2026-11-19' },
  { id: 'sub_th6_04', taskId: 'tsk_th6_01', studentId: 'stu_6004', classId: 'cls_6a1', status: 'graded', submissionDate: '2026-11-15', score: 9.5, feedback: 'Rất sáng tạo!', updatedAt: '2026-11-16' },

  { id: 'sub_th7_01', taskId: 'tsk_th7_01', studentId: 'stu_7001', classId: 'cls_7a1', status: 'graded', submissionDate: '2026-11-10', score: 10.0, feedback: 'Bài làm xuất sắc, công thức và định dạng chuẩn mực.', updatedAt: '2026-11-11' },
  { id: 'sub_th7_02', taskId: 'tsk_th7_01', studentId: 'stu_7002', classId: 'cls_7a1', status: 'graded', submissionDate: '2026-11-11', score: 9.0, feedback: 'Tốt, bảng tính trình bày rõ ràng.', updatedAt: '2026-11-12' },
  { id: 'sub_th7_03', taskId: 'tsk_th7_01', studentId: 'stu_7003', classId: 'cls_7a1', status: 'graded', submissionDate: '2026-11-11', score: 8.5, feedback: 'Cần chú ý định dạng đường viền bảng đồng đều hơn.', updatedAt: '2026-11-12' },
  { id: 'sub_th7_04', taskId: 'tsk_th7_01', studentId: 'stu_7004', classId: 'cls_7a1', status: 'graded', submissionDate: '2026-11-12', score: 7.5, feedback: 'Đã hoàn thành công thức cơ bản.', updatedAt: '2026-11-13' },

  { id: 'sub_th10_01', taskId: 'tsk_th10_01', studentId: 'stu_1001', classId: 'cls_10a1', status: 'graded', submissionDate: '2026-12-15', score: 10.0, feedback: 'Mã nguồn Python chuẩn mực, thuật toán tối ưu O(n), chú thích chi tiết.', updatedAt: '2026-12-16' },
  { id: 'sub_th10_02', taskId: 'tsk_th10_01', studentId: 'stu_1002', classId: 'cls_10a1', status: 'graded', submissionDate: '2026-12-16', score: 9.5, feedback: 'Hàm xử lý danh sách rất chặt chẽ, kiểm thử đầy đủ.', updatedAt: '2026-12-17' },
  { id: 'sub_th10_03', taskId: 'tsk_th10_01', studentId: 'stu_1003', classId: 'cls_10a1', status: 'late', submissionDate: '2026-12-19', score: 7.0, feedback: 'Lỗi cú pháp thụt lề ở câu lệnh if ban đầu, đã sửa lại tốt.', updatedAt: '2026-12-20' },
  { id: 'sub_th10_04', taskId: 'tsk_th10_01', studentId: 'stu_1004', classId: 'cls_10a1', status: 'graded', submissionDate: '2026-12-16', score: 9.0, feedback: 'Bài giải rõ ràng, đúng yêu cầu.', updatedAt: '2026-12-17' },
  { id: 'sub_th10_05', taskId: 'tsk_th10_01', studentId: 'stu_1005', classId: 'cls_10a1', status: 'graded', submissionDate: '2026-12-17', score: 9.5, feedback: 'Tư duy thuật toán tốt, có mở rộng thêm hàm đếm số nguyên tố.', updatedAt: '2026-12-18' },
];

// 6. Grades
const initialGradeRecords = [
  // Lớp 6A1
  { id: 'grd_6_01', studentId: 'stu_6001', classId: 'cls_6a1', assessmentName: 'Kiểm tra 15p: Thông tin & Mạng máy tính', type: 'quiz_15m', date: '2026-10-15', score: 10, maxScore: 10, weight: 1, comment: 'Xuất sắc, nắm chắc kiến thức cơ bản.', createdAt: '2026-10-15' },
  { id: 'grd_6_02', studentId: 'stu_6002', classId: 'cls_6a1', assessmentName: 'Kiểm tra 15p: Thông tin & Mạng máy tính', type: 'quiz_15m', date: '2026-10-15', score: 9.0, maxScore: 10, weight: 1, comment: 'Làm bài cẩn thận.', createdAt: '2026-10-15' },
  { id: 'grd_6_03', studentId: 'stu_6003', classId: 'cls_6a1', assessmentName: 'Kiểm tra 15p: Thông tin & Mạng máy tính', type: 'quiz_15m', date: '2026-10-15', score: 6.5, maxScore: 10, weight: 1, comment: 'Cần ôn lại các đơn vị đo dung lượng thông tin (KB, MB, GB).', createdAt: '2026-10-15' },
  { id: 'grd_6_04', studentId: 'stu_6004', classId: 'cls_6a1', assessmentName: 'Kiểm tra 15p: Thông tin & Mạng máy tính', type: 'quiz_15m', date: '2026-10-15', score: 9.5, maxScore: 10, weight: 1, comment: 'Hiểu bài rất nhanh.', createdAt: '2026-10-15' },

  // Lớp 7A1
  { id: 'grd_7_01', studentId: 'stu_7001', classId: 'cls_7a1', assessmentName: 'Thực hành 45p: Bảng tính điện tử Excel', type: 'test_45m', date: '2026-11-20', score: 9.8, maxScore: 10, weight: 2, comment: 'Thao tác bảng tính siêu nhanh, điểm tuyệt đối.', createdAt: '2026-11-20' },
  { id: 'grd_7_02', studentId: 'stu_7002', classId: 'cls_7a1', assessmentName: 'Thực hành 45p: Bảng tính điện tử Excel', type: 'test_45m', date: '2026-11-20', score: 9.0, maxScore: 10, weight: 2, comment: 'Biểu đồ trực quan, đẹp mắt.', createdAt: '2026-11-20' },
  { id: 'grd_7_03', studentId: 'stu_7003', classId: 'cls_7a1', assessmentName: 'Thực hành 45p: Bảng tính điện tử Excel', type: 'test_45m', date: '2026-11-20', score: 8.5, maxScore: 10, weight: 2, comment: 'Thực hiện tốt các hàm SUM, AVERAGE.', createdAt: '2026-11-20' },
  { id: 'grd_7_04', studentId: 'stu_7004', classId: 'cls_7a1', assessmentName: 'Thực hành 45p: Bảng tính điện tử Excel', type: 'test_45m', date: '2026-11-20', score: 6.8, maxScore: 10, weight: 2, comment: 'Cần chú ý khoá ô cố định $ khi kéo công thức.', createdAt: '2026-11-20' },

  // Lớp 8A1
  { id: 'grd_8_01', studentId: 'stu_8001', classId: 'cls_8a1', assessmentName: 'Kiểm tra Giữa kỳ I: Tin học 8', type: 'midterm', date: '2026-11-08', score: 9.5, maxScore: 10, weight: 2, comment: 'Kỹ năng chỉnh sửa ảnh và văn bản nâng cao xuất sắc.', createdAt: '2026-11-08' },
  { id: 'grd_8_02', studentId: 'stu_8002', classId: 'cls_8a1', assessmentName: 'Kiểm tra Giữa kỳ I: Tin học 8', type: 'midterm', date: '2026-11-08', score: 9.0, maxScore: 10, weight: 2, comment: 'Bài trình bày rõ ràng, thẩm mĩ cao.', createdAt: '2026-11-08' },
  { id: 'grd_8_03', studentId: 'stu_8003', classId: 'cls_8a1', assessmentName: 'Kiểm tra Giữa kỳ I: Tin học 8', type: 'midterm', date: '2026-11-08', score: 8.8, maxScore: 10, weight: 2, comment: 'Thuật toán gỡ lỗi logic chính xác.', createdAt: '2026-11-08' },

  // Lớp 9A1
  { id: 'grd_9_01', studentId: 'stu_9001', classId: 'cls_9a1', assessmentName: 'Kiểm tra Học kì I: Tin học 9', type: 'final', date: '2026-12-22', score: 9.8, maxScore: 10, weight: 3, comment: 'Top 1 khối 9 môn Tin học.', createdAt: '2026-12-22' },
  { id: 'grd_9_02', studentId: 'stu_9002', classId: 'cls_9a1', assessmentName: 'Kiểm tra Học kì I: Tin học 9', type: 'final', date: '2026-12-22', score: 9.2, maxScore: 10, weight: 3, comment: 'Dựng video kịch bản truyền thông rất chuyên nghiệp.', createdAt: '2026-12-22' },
  { id: 'grd_9_03', studentId: 'stu_9003', classId: 'cls_9a1', assessmentName: 'Kiểm tra Học kì I: Tin học 9', type: 'final', date: '2026-12-22', score: 8.7, maxScore: 10, weight: 3, comment: 'Thành thạo các hàm tính toán nâng cao.', createdAt: '2026-12-22' },
  { id: 'grd_9_04', studentId: 'stu_9004', classId: 'cls_9a1', assessmentName: 'Kiểm tra Học kì I: Tin học 9', type: 'final', date: '2026-12-22', score: 6.5, maxScore: 10, weight: 3, comment: 'Cần rèn luyện thêm cú pháp hàm điều kiện IF.', createdAt: '2026-12-22' },

  // Lớp 10A1
  { id: 'grd_10_01', studentId: 'stu_1001', classId: 'cls_10a1', assessmentName: 'Kiểm tra Thực hành: Lập trình Python cơ bản', type: 'test_45m', date: '2026-12-18', score: 10, maxScore: 10, weight: 2, comment: 'Bài làm mẫu mực, tư duy thuật toán sắc sảo.', createdAt: '2026-12-18' },
  { id: 'grd_10_02', studentId: 'stu_1002', classId: 'cls_10a1', assessmentName: 'Kiểm tra Thực hành: Lập trình Python cơ bản', type: 'test_45m', date: '2026-12-18', score: 9.5, maxScore: 10, weight: 2, comment: 'Xử lý cấu trúc dữ liệu list và xâu rất tốt.', createdAt: '2026-12-18' },
  { id: 'grd_10_03', studentId: 'stu_1003', classId: 'cls_10a1', assessmentName: 'Kiểm tra Thực hành: Lập trình Python cơ bản', type: 'test_45m', date: '2026-12-18', score: 6.8, maxScore: 10, weight: 2, comment: 'Cần chú ý lỗi thụt dòng IndentationError và phạm vi biến.', createdAt: '2026-12-18' },
  { id: 'grd_10_04', studentId: 'stu_1004', classId: 'cls_10a1', assessmentName: 'Kiểm tra Thực hành: Lập trình Python cơ bản', type: 'test_45m', date: '2026-12-18', score: 8.8, maxScore: 10, weight: 2, comment: 'Viết code rõ ràng, chạy đúng các test cases.', createdAt: '2026-12-18' },
  { id: 'grd_10_05', studentId: 'stu_1005', classId: 'cls_10a1', assessmentName: 'Kiểm tra Thực hành: Lập trình Python cơ bản', type: 'test_45m', date: '2026-12-18', score: 9.2, maxScore: 10, weight: 2, comment: 'Tối ưu thuật toán tốt, giải thích bài chặt chẽ.', createdAt: '2026-12-18' },
];

// 7. Student Feedback
const initialStudentFeedback = [
  {
    id: 'fb_1001',
    studentId: 'stu_1001',
    classId: 'cls_10a1',
    teacher: 'Cô Bùi Thị Ra',
    date: '2026-12-20',
    content: 'Minh Khang tiếp thu kiến thức lập trình Python rất nhanh, tư duy giải thuật thông minh và thường xuyên chủ động hỗ trợ các bạn trong giờ thực hành.',
    strengths: 'Tư duy logic tốt, lập trình Python tự nhiên, nắm chắc các cấu trúc dữ liệu mảng và hàm.',
    improvements: 'Có thể chia sẻ cách tiếp cận nhiều hơn cho các bạn trong nhóm.',
    recommendations: 'Tiếp tục bồi dưỡng vào đội tuyển Học sinh giỏi Tin học cấp trường và Thành phố.',
    relatedLessonOrTask: 'les_tin10_26',
    createdAt: '2026-12-20',
  },
  {
    id: 'fb_1003',
    studentId: 'stu_1003',
    classId: 'cls_10a1',
    teacher: 'Cô Bùi Thị Ra',
    date: '2026-12-20',
    content: 'Hoàng Nam có năng khiếu tự nhiên với máy tính nhưng thời gian gần đây còn nộp bài thực hành muộn và hay quên lưu mã nguồn đúng quy định.',
    strengths: 'Thao tác máy nhanh, hiểu ý tưởng bài toán.',
    improvements: 'Cần cẩn thận với thụt lề Python và kiểm thử kỹ trước khi nộp.',
    recommendations: 'Cần rèn luyện tính kiên nhẫn khi đọc thông báo lỗi compiler/interpreter và tuân thủ thời hạn nộp bài.',
    relatedLessonOrTask: 'les_tin10_19',
    createdAt: '2026-12-20',
  },
  {
    id: 'fb_6003',
    studentId: 'stu_6003',
    classId: 'cls_6a1',
    teacher: 'Cô Bùi Thị Ra',
    date: '2026-11-20',
    content: 'Bảo Nam còn nhút nhát trong giờ thực hành máy tính, thao tác bàn phím và chuột chưa quen tay.',
    strengths: 'Chăm chú lắng nghe cô giáo giảng bài.',
    improvements: 'Thao tác gõ phím mười ngón và quản lí thư mục lưu tệp cần rèn thêm.',
    recommendations: 'Cô sẽ xếp bạn Đăng Khôi ngồi kèm để hỗ trợ thao tác lưu trữ tệp tin và hướng dẫn gõ mười ngón.',
    relatedLessonOrTask: 'les_tin6_10',
    createdAt: '2026-11-20',
  },
];

// 8. Settings
const initialSettings = {
  teacherName: 'Bùi Thị Ra',
  schoolName: 'Trường THCS, THPT Ngôi Sao',
  currentSchoolYear: '2026 - 2027',
  attentionScoreThreshold: 6.5,
  attentionCompletionThreshold: 75,
};

// 9. Activity Logs
const initialActivityLogs = [
  {
    id: 'act_001',
    action: 'Cập nhật hệ thống bài học',
    category: 'lesson',
    details: 'Đã xóa dữ liệu cũ và nạp 109 bài học Tin học theo chuẩn SGK Kết nối tri thức với cuộc sống (Lớp 6, 7, 8, 9, 10).',
    timestamp: '2026-03-20 09:30',
  },
  {
    id: 'act_002',
    action: 'Cập nhật danh sách lớp',
    category: 'class',
    details: 'Đã thiết lập các lớp 6A1, 7A1, 8A1, 9A1, 10A1 cho môn Tin học kèm phòng thực hành máy tính.',
    timestamp: '2026-03-20 09:35',
  },
];

const fileContent = `import { AppData, ClassRoom, Student, Lesson, Task, TaskSubmission, GradeRecord, StudentFeedback, ActivityLog, AppSettings } from '../types';

export const initialSettings: AppSettings = ${JSON.stringify(initialSettings, null, 2)};

export const initialClasses: ClassRoom[] = ${JSON.stringify(initialClasses, null, 2)};

export const initialStudents: Student[] = ${JSON.stringify(initialStudents, null, 2)};

export const initialLessons: Lesson[] = ${JSON.stringify(initialLessons, null, 2)};

export const initialTasks: Task[] = ${JSON.stringify(initialTasks, null, 2)};

export const initialTaskSubmissions: TaskSubmission[] = ${JSON.stringify(initialTaskSubmissions, null, 2)};

export const initialGradeRecords: GradeRecord[] = ${JSON.stringify(initialGradeRecords, null, 2)};

export const initialStudentFeedback: StudentFeedback[] = ${JSON.stringify(initialStudentFeedback, null, 2)};

export const initialActivityLogs: ActivityLog[] = ${JSON.stringify(initialActivityLogs, null, 2)};

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
`;

fs.writeFileSync('src/data/initialData.ts', fileContent, 'utf-8');
console.log(`Generated initialData.ts successfully! Total lessons: ${initialLessons.length}`);
