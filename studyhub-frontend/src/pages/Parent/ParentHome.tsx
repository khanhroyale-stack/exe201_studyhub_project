import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ParentHome — Landing page dành cho phụ huynh đã đăng nhập.
 * Không tự import Navbar/Footer — đã được cung cấp bởi Layout hoặc ParentLayout.
 */
const ParentHome: React.FC = () => {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary rounded-full blur-3xl -ml-20 -mb-20"></div>
        </div>
        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
          <h1 className="text-white font-bold text-5xl mb-4 leading-tight">
            Tìm kiếm gia sư hoàn hảo
          </h1>
          <p className="text-primary-fixed-dim text-lg mb-10">
            Hàng nghìn gia sư chất lượng đang chờ kết nối với bạn
          </p>
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 items-stretch">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">book</span>
              <input
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-surface-container-low border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                placeholder="Môn học (Toán, Lý, Tiếng Anh...)"
                type="text"
              />
            </div>
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">location_on</span>
              <input
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-surface-container-low border border-outline-variant focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                placeholder="Địa điểm (Quận, Thành phố)"
                type="text"
              />
            </div>
            <Link
              to="/tutors"
              className="md:w-auto w-full bg-primary text-on-primary px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Tìm kiếm
            </Link>
          </div>
          <p className="mt-5 text-primary-fixed/80 text-sm">
            Gợi ý phổ biến: Toán lớp 12, IELTS 7.5, Lập trình Python, Guitar cơ bản
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: '12,000+', label: 'Lớp học đã kết nối', icon: 'school', color: 'text-primary', bg: 'bg-primary-fixed/40' },
              { value: '8,500+', label: 'Gia sư xác thực', icon: 'verified_user', color: 'text-secondary', bg: 'bg-secondary-fixed/40' },
              { value: '98%', label: 'Phụ huynh hài lòng', icon: 'sentiment_satisfied', color: 'text-tertiary', bg: 'bg-tertiary-fixed/40' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-8 rounded-2xl border border-outline-variant flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
                <div className={`w-16 h-16 ${stat.bg} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined ${stat.color} text-3xl`} style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <h3 className={`font-bold text-3xl ${stat.color}`}>{stat.value}</h3>
                <p className="text-on-surface-variant font-normal text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="font-bold text-2xl text-on-surface mb-6">Thao tác nhanh</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/parent/posts/create"
              className="group bg-white border border-outline-variant rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary-fixed/40 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[22px]">post_add</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-on-surface">Đăng tin tuyển gia sư</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Tạo bài đăng mới ngay</p>
              </div>
            </Link>
            <Link
              to="/tutors"
              className="group bg-white border border-outline-variant rounded-2xl p-6 hover:border-secondary hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-secondary-fixed/40 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary text-[22px]">person_search</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-on-surface">Tìm gia sư</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Duyệt hồ sơ gia sư ngay</p>
              </div>
            </Link>
            <Link
              to="/parent/classes"
              className="group bg-white border border-outline-variant rounded-2xl p-6 hover:border-tertiary hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-tertiary-fixed/40 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-tertiary-container group-hover:text-on-tertiary transition-all">
                <span className="material-symbols-outlined text-tertiary text-[22px]">school</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-on-surface">Quản lý lớp học</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Xem lịch học của con</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentHome;
