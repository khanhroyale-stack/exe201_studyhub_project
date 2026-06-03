import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const mockClasses = [
  {
    id: 1,
    title: "Ôn thi Đại học Toán Lý Anh",
    description: "Cần tìm gia sư ôn thi khối A1 cho học sinh lớp 12 tại nhà. Yêu cầu có kinh nghiệm luyện thi...",
    location: "Quận 1, TP. HCM",
    locationType: "location_on",
    price: "350.000đ/buổi",
    schedule: "3 buổi/tuần (T2-4-6)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASsPYHLUK76qHBGC2Kh2tTDyxQCOiun2cE3J2ggWy_EHxGuDCjIF3dbcph8YmU3HGua_DVC_ZSbGnI5nOhTA0uCm7jm1FpXUKEK1SfOeMwGktcnEKW0B588v8LW9Larab88U0JmZswkug1jxlw93eORM2tcJGIHuBS8Zo-WRJFReA7cSAxJL6QdiHRUDpH01sQrXVSnEenK2T8ENxMig0ZEig7vtzsbdZLl5-Y3u82bZ5bHFx-egkrCZS5lu2lbUAxtg9sMttVXk7-"
  },
  {
    id: 2,
    title: "IELTS Speaking 1 kèm 1",
    description: "Luyện Speaking cấp tốc đầu ra 7.0 cho sinh viên. Học qua Zoom linh hoạt thời gian...",
    location: "Trực tuyến (Online)",
    locationType: "computer",
    price: "250.000đ/giờ",
    schedule: "Thời gian linh hoạt",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfLmZEzSUGSdU1piqw8qrUCRdFW2DhbzeP_iwre1Ry_Ei9_68aX7AlGY4i_gGX41KdP9pa4phE84ZVQJ1Xre6uxOT4uzghaDGDo3s16XI9WKvZirsJy6Ia_czkuoorRCfAf-LPuYkOCKtDErSxnLNBSAI9su6eKJh4Gsd7JvdforZzaLC7MmnkRjbFgSE2yewfgwW_yx8bT24Paw_jh3KwTWJ7hORJD_JaydX--ueSlZtB0215rWI059T6fkcnGQuNhNtTg_Z0xLa8"
  },
  {
    id: 3,
    title: "Phụ đạo Hóa lớp 10",
    description: "Củng cố kiến thức cơ bản cho học sinh mất gốc. Dạy chậm, kỹ kiến thức SGK...",
    location: "Hà Đông, Hà Nội",
    locationType: "location_on",
    price: "200.000đ/buổi",
    schedule: "2 buổi/tuần",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeJMTRHS5AFfTnkNaH0zjyUxUT3ObjXvyPpGe3qWKelGdYAOxLD6MJLoNQQR0Q6pDqYJo4D9pTjaZZakKykw0Abyao5ydkBiat6bQJL5vbzxAlVFZ2cDLDemPs2YYdarn9Qot6T8UKHlVfzVP6K9kySjUE5ANb2cbswT5a0WRLqOlqLaqqkqi5SpJaQogz94BznvHPrwyTdVRwaJLmsqAP_t-iH0xgVBVzs8GCailExAndK5c18DznIYDLDfrGToNpfsmI64aI08oe"
  }
];

const Homepage: React.FC = () => {
  return (
    <div className="bg-background text-on-background">
      <Navbar />
      <main className="mt-[72px] min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <img alt="Education Hero" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfLmZEzSUGSdU1piqw8qrUCRdFW2DhbzeP_iwre1Ry_Ei9_68aX7AlGY4i_gGX41KdP9pa4phE84ZVQJ1Xre6uxOT4uzghaDGDo3s16XI9WKvZirsJy6Ia_czkuoorRCfAf-LPuYkOCKtDErSxnLNBSAI9su6eKJh4Gsd7JvdforZzaLC7MmnkRjbFgSE2yewfgwW_yx8bT24Paw_jh3KwTWJ7hORJD_JaydX--ueSlZtB0215rWI059T6fkcnGQuNhNtTg_Z0xLa8" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 px-margin-desktop w-full max-w-6xl mx-auto text-center">
            <h1 className="font-headline-xl text-headline-xl text-on-primary mb-4 leading-tight">Tìm gia sư giỏi nhất cho bạn</h1>
            <p className="font-headline-sm text-headline-sm text-secondary-fixed italic mb-12">"Tiết kiệm, học giỏi, kết nối tri thức"</p>
            {/* Search Block */}
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-[32px] shadow-2xl border border-white/20 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="lg:col-span-1">
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-2">Tìm kiếm</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style={{ fontSize: '20px' }}>search</span>
                    <input className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-10 pr-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Nhập môn học..." type="text" />
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-2">Môn học</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>Tất cả môn học</option>
                    <option>Toán học</option>
                    <option>Vật lý</option>
                    <option>Hóa học</option>
                    <option>Tiếng Anh</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-bold text-on-surface mb-2">Học phí (VND/buổi)</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>Tất cả mức giá</option>
                    <option>Dưới 200.000</option>
                    <option>200.000 - 400.000</option>
                    <option>Trên 400.000</option>
                  </select>
                </div>
                <div>
                  <button className="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold text-body-md shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-[0.98]">
                    Tìm kiếm
                  </button>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant flex flex-wrap items-center gap-8">
                <span className="font-label-md text-label-md font-bold text-on-surface">Hình thức học:</span>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all" type="checkbox" />
                    <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Học trực tuyến (Online)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all" type="checkbox" />
                    <span className="text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Học trực tiếp (Offline)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="px-margin-desktop py-12 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-[24px] shadow-md border border-outline-variant flex items-center gap-5">
              <div className="w-14 h-14 bg-primary-fixed rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface">Thống kê lớp học</p>
                <p className="text-body-md text-on-surface-variant">Hơn 500+ lớp mới mỗi ngày</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[24px] shadow-md border border-outline-variant flex items-center gap-5">
              <div className="w-14 h-14 bg-secondary-fixed rounded-full flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">group_add</span>
              </div>
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface">12,000+</p>
                <p className="text-body-md text-on-surface-variant">Lớp học đã kết nối thành công</p>
              </div>
            </div>
          </div>
        </section>

        {/* Class List Section */}
        <section className="px-margin-desktop py-16 max-w-[1440px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Danh sách lớp học</h2>
              <p className="text-body-lg text-on-surface-variant mt-2">Khám phá các lớp học phù hợp với nhu cầu của bạn</p>
            </div>
            <Link to="/classes" className="text-primary font-bold flex items-center gap-2 hover:underline transition-all group">
              Xem tất cả <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-[32px] border border-outline-variant overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={cls.image} />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">{cls.title}</h3>
                  <p className="text-body-md text-on-surface-variant line-clamp-2 mb-6">{cls.description}</p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">{cls.locationType}</span>
                      <span className="text-body-md">{cls.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">payments</span>
                      <span className="text-body-md font-bold text-secondary">{cls.price}</span>
                    </div>
                    <div className="flex items-center gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">event</span>
                      <span className="text-body-md">{cls.schedule}</span>
                    </div>
                  </div>
                  <Link to={`/classes/${cls.id}`} className="mt-auto block text-center w-full border-2 border-primary text-primary py-3 rounded-xl font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all font-bold">
                    Chi tiết lớp học
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-margin-desktop py-20 max-w-[1440px] mx-auto">
          <div className="bg-primary rounded-[48px] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[300px] text-white">auto_stories</span>
            </div>
            <div className="relative z-10 text-center md:text-left md:max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6">Bạn là một gia sư tài năng?</h2>
              <p className="text-body-lg text-on-primary/80 mb-10">Hãy gia nhập mạng lưới hàng nghìn gia sư của StudyHub để kết nối với hàng vạn học viên trên toàn quốc.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold hover:bg-surface-container-low transition-all active:scale-95">Đăng ký dạy ngay</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAB */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-secondary text-on-secondary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group">
        <span className="material-symbols-outlined text-3xl">chat</span>
        <span className="absolute right-full mr-4 bg-on-surface text-surface px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-lg">Hỗ trợ trực tuyến</span>
      </button>

      <Footer />
    </div>
  );
};

export default Homepage;
