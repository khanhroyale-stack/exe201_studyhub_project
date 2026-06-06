export const CURRENT_TUTOR = {
  id: 'TUTOR_001',
  name: 'Tuấn',
  fullName: 'Nguyễn Văn Tuấn',
  title: 'Gia sư chuyên nghiệp',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNEz7db2HdV_2w9FRNxhVtDuOjzgBJUU0_mxhaT51dcjMHNdFC4lj1cBqvSvrManfaDVjr6lE6QdurQR6vM70xpD881fVYnnizFzfa45H7iZ1B3UlWdWiz_erIQpXKh3iuwKNxMaJtSzS4sVg17Zc5urpJ2481nX1DwVsI7Xi2GANvKdmGZVqdGEmdxwU6pPDdc6y5Dsd1SaW1SO3SXTdiRvRq4-kB9tvBy7bLgaLGL7bZbiTA-0p6gRCrW1CsjJUuHrPEZqXCwpNW',
  phone: '0987654321',
  email: 'tuan.nguyen@example.com',
  address: 'Quận Cầu Giấy, Hà Nội',
  expectedIncome: 8500000,
  taughtHours: 32,
  pendingApplicationsCount: 3,
};

export const MOCK_TUTOR_POSTS = [
  {
    id: 'TP001',
    title: 'Tìm 2 học sinh mất gốc, ôn thi ĐH',
    subtitle: '200k - 250k/ca • Offline (Cầu Giấy)',
    subject: 'Toán 12',
    status: 'ACTIVE', // ACTIVE, CLOSED
  },
  {
    id: 3,
    title: 'Toán 12 - Luyện thi Đại Học',
    subject: 'Toán học',
    grade: 'Lớp 12',
    subtitle: '300k/ca • Online qua Zoom',
    status: 'CLOSED',
  }
];

export const MOCK_TUTOR_APPLICATIONS = [
  {
    id: 'APP001',
    initial: 'H',
    studentName: 'Hoàng L.',
    detail: 'Toán lớp 10 • KHTN',
    colorClass: 'bg-[#50dcff] text-[#005f71]',
  },
  {
    id: 'APP002',
    initial: 'M',
    studentName: 'Mai P.',
    detail: 'Tiếng Anh IELTS',
    colorClass: 'bg-on-tertiary-container text-tertiary-container',
  }
];

export const MOCK_TUTOR_SCHEDULE = [
  {
    id: 'SCH001',
    title: 'Toán Cao Cấp - Lớp Nhóm',
    time: 'Hôm nay, 18:00',
    detail: 'Google Meet • 3 Học viên',
    isPrimary: true,
  },
  {
    id: 'SCH002',
    title: 'Vật Lý 11 - Kèm 1:1 (Tuấn A.)',
    time: 'Ngày mai, 19:30',
    detail: '',
    isPrimary: false,
  }
];

export const MOCK_TUTOR_REVIEWS = [
  {
    id: 'REV001',
    content: '"Thầy dạy rất dễ hiểu, kiên nhẫn sửa từng lỗi sai cho con. Điểm kiểm tra vừa rồi của bé đã cải thiện rõ rệt."',
    author: '- Phụ huynh bé Nam (Toán 6)',
    rating: 5,
  }
];

export const MOCK_TUTOR_CLASSES = [
  {
    id: 'TC001',
    subject: 'Toán Học',
    subjectColor: 'bg-primary-fixed text-on-primary-fixed-variant',
    status: 'Chính thức',
    statusColor: 'bg-primary-container text-on-primary-container',
    mode: 'Online',
    modeColor: 'bg-primary-fixed text-on-primary-fixed-variant border-none',
    title: 'Luyện thi Đại học Khối A',
    studentName: 'Nguyễn Văn A',
    schedule: 'T2, T4, T6 (18:00 - 20:00)',
    price: '350.000đ/ca',
    progressStr: 'Buổi 3/10',
    progressPercent: 30,
    action: 'Điểm danh',
    actionIcon: 'how_to_reg',
    actionClass: 'bg-primary text-on-primary hover:bg-primary/90 shadow-sm',
  },
  {
    id: 'TC002',
    subject: 'Vật Lý',
    subjectColor: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    status: 'Đang dạy thử',
    statusColor: 'bg-orange-100 text-orange-800',
    mode: 'Offline',
    modeColor: 'bg-surface-container-highest text-on-surface-variant border border-outline-variant',
    title: 'Vật lý 12 Nâng cao',
    studentName: 'Trần Thị B',
    schedule: 'T3, T5 (19:00 - 21:00)',
    price: '300.000đ/ca',
    progressStr: 'Buổi 8/20',
    progressPercent: 40,
    action: 'Đã điểm danh',
    actionIcon: 'check_circle',
    actionClass: 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-70',
  },
  {
    id: 'TC003',
    subject: 'Hóa Học',
    subjectColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    status: 'Chờ dạy thử',
    statusColor: 'bg-yellow-100 text-yellow-800',
    mode: 'Online',
    modeColor: 'bg-primary-fixed text-on-primary-fixed-variant border-none',
    title: 'Hóa 11 - Cơ bản',
    studentName: 'Lê Hoàng C',
    schedule: 'Sáng CN (08:00 - 10:00)',
    price: '250.000đ/ca',
    progressStr: 'Ca 15/15',
    progressPercent: 100,
    action: 'Tổng kết',
    actionIcon: 'task_alt',
    actionClass: 'bg-surface-container text-on-surface hover:bg-surface-container-high',
  }
];

export const MOCK_TUTOR_OFFERS = [
  {
    id: 'OFF001',
    parentName: 'Phụ huynh bé Trí',
    parentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8IwMybzeHQ58NopJnuBaSr81qhSa0FwewviuCcTnxfaVd0qGAsyeTbDXTyDavvtLVgmoYtYRV7hU5wICafi34zY4XiehqPSqldqT-G3__dLDoyAXSCamO4dOPXbEuPJRw9ILZhXkAtL68Us4oTUj3wcWR6oVZS7mMwweiQSsS-JI8SvPbzPUBTBs5m1piaN0XBmCIgugy1KcEsdHMPHUV0fe3oVsIitdyEJ5OVNTV1mV7R7PAGgFf6LyTlpUTOon0EPnZ34M48tx',
    className: 'Luyện thi Đại học môn Hóa',
    schedule: 'T2, T4 (19:30 - 21:00)',
    price: '300.000đ/ca',
    mode: 'Offline',
    location: 'Quận 7, TP.HCM',
    message: 'Chào bạn, mình thấy profile của bạn rất phù hợp với bé nhà mình đang học lớp 12. Không biết bạn có rảnh lịch tối thứ 2, thứ 4 không?',
    status: 'PENDING',
    receivedAt: '2 giờ trước'
  },
  {
    id: 2,
    parentName: 'Lê Văn C',
    subject: 'Toán 10',
    schedule: 'Thứ 2, 4, 6 (18:00 - 19:30)',
    location: 'Quận 7, TP.HCM',
    status: 'ACCEPTED',
    message: 'Chào bạn, bé nhà mình năm nay lên lớp 10, học khá nhưng hay ẩu. Rất mong bạn kèm cặp thêm.',
    timeAgo: '1 ngày trước',
    price: '250.000đ/ca',
  },
  {
    id: 'OFF002',
    parentName: 'Chị Mai Lan',
    parentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcyLV-pbCBKDruyPCKCIM4TqRUMe6owsX04_nA7hfv7pkavDnwNb5qh6nKmjn0waHKwRaliXWc7bwcZdJjX7_KOXYpPyx3f7zcV2w3yuFYUc-oA2zb1MCSVTCrkgmFmt_dxPUpoQVOozyI2HLAtv-0s7NyjJK3tcu9VO8-oPwPb8OAGd_JWbWmzlUleayZJrT7fX4p9bgRArPDwTI_9mZHP6xMlK2uJzakJzfSY7-A8CCmnMoZTVWGOf3vVH2xyclpDoC7hf06Qcc',
    className: 'Tiếng Anh giao tiếp cơ bản',
    schedule: 'T7, CN (09:00 - 10:30)',
    price: '250.000đ/ca',
    mode: 'Online',
    location: 'Google Meet',
    message: 'Bé nhà mình mất gốc tiếng anh, mong muốn tìm gia sư kiên nhẫn.',
    status: 'ACCEPTED',
    receivedAt: '1 ngày trước'
  }
];

export const MOCK_TUTOR_INVOICES = [
  {
    id: 'INV-2026-05-01',
    month: 'Tháng 5/2026',
    totalSessions: 24,
    totalRevenue: 7200000,
    platformFeePercent: 10,
    platformFeeAmount: 720000,
    dueDate: '2026-06-05T23:59:59',
    status: 'PENDING',
    className: 'Toán Học 12, Vật Lý 11',
    qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8IwMybzeHQ58NopJnuBaSr81qhSa0FwewviuCcTnxfaVd0qGAsyeTbDXTyDavvtLVgmoYtYRV7hU5wICafi34zY4XiehqPSqldqT-G3__dLDoyAXSCamO4dOPXbEuPJRw9ILZhXkAtL68Us4oTUj3wcWR6oVZS7mMwweiQSsS-JI8SvPbzPUBTBs5m1piaN0XBmCIgugy1KcEsdHMPHUV0fe3oVsIitdyEJ5OVNTV1mV7R7PAGgFf6LyTlpUTOon0EPnZ34M48tx'
  },
  {
    id: 'INV-2026-04-01',
    month: 'Tháng 4/2026',
    totalSessions: 20,
    totalRevenue: 6000000,
    platformFeePercent: 10,
    platformFeeAmount: 600000,
    dueDate: '2026-05-05T23:59:59',
    status: 'PAID',
    className: 'Toán Học 12',
    qrCodeUrl: ''
  }
];
