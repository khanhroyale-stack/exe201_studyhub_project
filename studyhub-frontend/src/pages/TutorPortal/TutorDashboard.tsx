import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tutorPortalApi } from '../../services/tutorPortalApi';
import { TutorFeedback, UnifiedClass, LessonSchedule } from '../../types/shared';
const CURRENT_TUTOR = {
  name: 'Nguyễn Hoàng Nam',
  pendingApplicationsCount: 2
};

const TutorDashboard: React.FC = () => {
  const [reviews, setReviews] = useState<TutorFeedback[]>([]);
  const [schedule, setSchedule] = useState<LessonSchedule[]>([]);
  const [expectedIncome, setExpectedIncome] = useState(0);
  const [taughtHours, setTaughtHours] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revs = await tutorPortalApi.getReviews();
        setReviews(revs.slice(0, 3)); // Top 3

        const sched = await tutorPortalApi.getSchedule();
        setSchedule(sched.slice(0, 3)); // Next 3

        const billing = await tutorPortalApi.getBilling();
        const income = billing.reduce((sum, b) => sum + (b.totalRevenue || 0), 0);
        const sessions = billing.reduce((sum, b) => sum + (b.totalSessions || 0), 0);
        setExpectedIncome(income);
        setTaughtHours(sessions * 1.5); // Assuming 1.5 hrs per session
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Bảng điều khiển Gia sư</h1>
          <p className="text-on-surface-variant mt-1">Chào mừng trở lại, {CURRENT_TUTOR.name}! Đây là tổng quan hoạt động của bạn.</p>
        </div>
        <Link 
          to="/tutor/create-post" 
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Tạo tin tìm học viên
        </Link>
      </div>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up stagger-1">
        <div className="md:col-span-2 p-6 glass border border-white/20 rounded-3xl flex items-center justify-between relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="relative z-10">
            <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Thu nhập dự kiến (Tháng này)</span>
            <p className="font-bold text-4xl mt-2 text-primary">{expectedIncome.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
          </div>
          <div className="absolute right-[-20%] top-[-50%] w-64 h-64 bg-primary/5 rounded-full pointer-events-none backdrop-blur-sm"></div>
        </div>
        
        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Giờ đã dạy</span>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="font-bold text-4xl text-primary">{taughtHours}</span>
            <span className="font-medium text-xs text-on-surface-variant">giờ</span>
          </div>
        </div>
        
        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Lớp chờ duyệt</span>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="font-bold text-4xl text-primary">{CURRENT_TUTOR.pendingApplicationsCount}</span>
            <span className="font-medium text-xs text-error">Cần xử lý</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Applications and Schedule */}
        <div className="lg:col-span-2 flex flex-col gap-8 animate-slide-up stagger-2">
          
          {/* Applications */}
          <section className="glass border border-white/20 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-on-surface">Hồ sơ chờ bạn duyệt</h2>
              <Link to="/tutor/classes" className="text-primary text-sm font-semibold hover:underline">Xem tất cả</Link>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-on-surface-variant text-center py-4 italic">
                Chức năng đang cập nhật (Quản lý hồ sơ trên Portal)
              </div>
            </div>
          </section>

          {/* Schedule */}
          <section className="glass border border-white/20 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-on-surface">Lịch dạy sắp tới</h2>
              <Link to="/tutor/schedule" className="text-primary text-sm font-semibold hover:underline">Xem lịch trình</Link>
            </div>
            <div className="flex flex-col gap-4">
              {schedule.map((sch, index) => (
                <div key={sch.lessonId} className="flex items-start gap-4 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="w-16 flex flex-col items-center justify-center glass bg-surface-container/50 rounded-2xl p-2 shrink-0">
                    <span className="text-xs font-semibold text-on-surface-variant">{new Date(sch.date).toLocaleDateString('vi-VN', { weekday: 'short' })}</span>
                    <span className="text-lg font-bold text-primary">{sch.startTime}</span>
                  </div>
                  <div className={`flex-1 p-4 rounded-2xl border backdrop-blur-sm glass border-white/20`}>
                    <h3 className="font-semibold text-on-surface">{sch.className}</h3>
                    <p className="text-sm text-on-surface-variant mt-1">{sch.subject} - {sch.status}</p>
                  </div>
                </div>
              ))}
              {schedule.length === 0 && <div className="text-center text-on-surface-variant py-4 italic">Không có lịch học nào sắp tới.</div>}
            </div>
          </section>
        </div>

        {/* Right Column: Reviews */}
        <div className="lg:col-span-1 flex flex-col gap-8 animate-slide-up stagger-3">
          
          <section className="glass border border-white/20 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-on-surface">Đánh giá mới nhất</h2>
            </div>
            <div className="flex flex-col gap-4">
              {reviews.map((rev, index) => (
                <div key={rev.id} className="p-4 glass bg-surface-container/30 rounded-2xl border border-white/30 animate-slide-up hover:-translate-y-1 transition-transform shadow-sm" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-sm ${i < rev.rating ? 'text-amber-400' : 'text-outline-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-sm text-on-surface italic mb-3">{rev.comment}</p>
                  <p className="text-xs font-semibold text-on-surface-variant">{rev.parentName}</p>
                </div>
              ))}
              {reviews.length === 0 && <div className="text-center text-on-surface-variant py-4 italic">Chưa có đánh giá nào.</div>}
            </div>
            <button className="w-full mt-4 py-2 border border-outline-variant rounded-lg text-sm font-semibold text-primary hover:bg-primary-fixed/20 transition-colors">
              Xem tất cả đánh giá
            </button>
          </section>

          <section className="glass border border-white/20 bg-primary/5 rounded-3xl p-6 text-center shadow-sm">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">lightbulb</span>
            </div>
            <h3 className="font-semibold text-on-surface mb-2">Mẹo tăng thu nhập</h3>
            <p className="text-sm text-on-surface-variant mb-4">Hoàn thiện hồ sơ chi tiết và xin đánh giá từ phụ huynh để nâng cao uy tín của bạn.</p>
            <Link to="/tutor/settings" className="text-primary font-semibold text-sm hover:underline">Cập nhật hồ sơ</Link>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
