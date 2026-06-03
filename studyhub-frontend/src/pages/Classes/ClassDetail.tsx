import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch class details based on ID
  // For now, we use the static design mock data
  console.log(`Loading details for class ID: ${id}`);

  return (
    <div className="bg-background text-on-surface">
      <Navbar />
      <main className="pt-[104px] pb-20 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto min-h-screen">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-on-surface-variant font-label-sm text-label-sm">
          <Link className="hover:text-primary" to="/classes">Lớp học</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="hover:text-primary cursor-pointer">Toán học</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-bold">Ôn thi Đại học môn Toán - Lớp 12</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Section Card */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-[320px] w-full">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKRBHavWds6K9jfgWlpBzmpW2bcbShYFBmG11tiOeWa4sEiq-e6KcwLHhVCUwqFzx9ofSC46l5s7wZe5pnDkEWAia15O_T1yM-Df3GJlK95VmalYW0qfkLd0JGCRtO1rBwfK583CY_FjeA91tcpcAoz2uHawaDVCvgTgtpXUkVKElw1fwuZQUBdeQu0yRXD8ZQ1MUB9QstQU6CYXsPImASVmdl9EACYQhnpy_p8_TH5jrarm7YirszgN7q2dyOmddkl6ObrQrI8q-O" alt="Class cover" />
              </div>
              <div className="p-8">
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Ôn thi Đại học môn Toán - Lớp 12: Chuyên sâu Giải tích & Hình học</h1>
                <div className="flex flex-wrap items-center gap-6 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <img alt="Tutor" className="w-6 h-6 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4o31wlh2jMd6bo7cEs_wlLXYzkda_jnm0jFL9fxAWJDJstX7ohDwYfCfxzLx1qKnSAA5R_WgEMJoI2FYGaVTHnwdOgMR1Zc5ijnn7Dh2D0d_I-GpmfuCG_p9ZkS-wKUg5C2Mh2JI-0-FCZ27__qoB2hotZ0yE1RnQBFeGegpn3Z39CgbIrkrBGuoN_2MfOeRpZwP4CqnkVvVmvQewS3znb-CzWRRW16ldlVOVmuiTEp3jRQnS2zuLpC4a1jHR3joz0MLXIwfpZxm8" />
                    <span className="font-label-md text-label-md font-bold text-on-surface">Thầy Nguyễn Hoàng Nam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-md text-label-md">4.9 (128 đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                    <span className="font-label-md text-label-md">15/20 Học viên</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Description & Requirements */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 space-y-6">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Mô tả lớp học</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Khóa học này được thiết kế đặc biệt dành cho học sinh lớp 12 đang chuẩn bị cho kỳ thi Tốt nghiệp THPT và xét tuyển Đại học. Chúng tôi sẽ tập trung vào các chuyên đề trọng tâm bao gồm: Khảo sát hàm số, Nguyên hàm - Tích phân, Số phức và Hình học không gian Oxyz.
                  <br /><br />
                  Mỗi buổi học sẽ kết hợp giữa lý thuyết cô đọng và thực hành giải các dạng đề thi minh họa của Bộ Giáo dục. Học sinh sẽ được tiếp cận với các phương pháp giải nhanh bằng máy tính cầm tay Casio và tư duy giải trắc nghiệm tối ưu.
                </p>
              </div>
              <hr className="border-outline-variant" />
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Yêu cầu khóa học</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Đã nắm vững kiến thức toán học cơ bản lớp 10 và 11.</span>
                  </li>
                  <li className="flex items-start gap-3 text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Có máy tính cầm tay (fx-580VNX hoặc tương đương).</span>
                  </li>
                  <li className="flex items-start gap-3 text-body-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span>Tinh thần tự giác và hoàn thành bài tập về nhà đầy đủ.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Tutor Profile */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <img alt="Tutor avatar" className="w-32 h-32 rounded-full border-4 border-surface-container-high object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf8IwMybzeHQ58NopJnuBaSr81qhSa0FwewviuCcTnxfaVd0qGAsyeTbDXTyDavvtLVgmoYtYRV7hU5wICafi34zY4XiehqPSqldqT-G3__dLDoyAXSCamO4dOPXbEuPJRw9ILZhXkAtL68Us4oTUj3wcWR6oVZS7mMwweiQSsS-JI8SvPbzPUBTBs5m1piaN0XBmCIgugy1KcEsdHMPHUV0fe3oVsIitdyEJ5OVNTV1mV7R7PAGgFf6LyTlpUTOon0EPnZ34M48tx" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Thầy Nguyễn Hoàng Nam</h3>
                      <p className="text-primary font-label-md text-label-md uppercase tracking-wider">Thạc sĩ Toán học - ĐH Sư Phạm HN</p>
                    </div>
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary-container/10 transition-colors">Xem hồ sơ</button>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <div className="bg-surface-container-low px-3 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      <span className="font-label-sm text-label-sm">Đã xác minh</span>
                    </div>
                    <div className="bg-surface-container-low px-3 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">history</span>
                      <span className="font-label-sm text-label-sm">8 năm kinh nghiệm</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Với hơn 8 năm kinh nghiệm luyện thi Đại học, thầy Nam đã giúp hàng nghìn học sinh đạt điểm 9+ môn Toán. Phương pháp giảng dạy của thầy tập trung vào bản chất vấn đề, giúp học sinh không chỉ giải bài tập mà còn hiểu sâu kiến thức.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Sticky Card */}
          <div className="lg:col-span-4 sticky top-[96px]">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6">
              <div>
                <span className="text-on-surface-variant font-label-sm text-label-sm block mb-1">Học phí mỗi buổi</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg text-primary">350.000đ</span>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">/ buổi (120 phút)</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Lịch học</p>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">Thứ 2 - Thứ 4 - Thứ 6</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Giờ học</p>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">18:30 - 20:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Hình thức</p>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">Trực tuyến qua Zoom</p>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary-container transition-all active:scale-95">
                Đăng ký ngay
              </button>
              <div className="text-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant">Liên hệ tư vấn miễn phí: <span className="font-bold text-on-surface">1900 8198</span></p>
              </div>
              <div className="pt-4 border-t border-outline-variant space-y-3">
                <div className="flex justify-between font-label-md text-label-md">
                  <span className="text-on-surface-variant">Lộ trình học</span>
                  <span className="text-on-surface">24 buổi</span>
                </div>
                <div className="flex justify-between font-label-md text-label-md">
                  <span className="text-on-surface-variant">Tài liệu tặng kèm</span>
                  <span className="text-on-surface">Sách bài tập + PDF</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h4 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">info</span>
                Chính sách bảo hành
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Hoàn trả học phí nếu học sinh không tiến bộ sau 1 tháng tham gia đầy đủ các buổi học.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClassDetail;
