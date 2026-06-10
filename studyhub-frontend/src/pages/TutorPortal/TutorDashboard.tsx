import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CURRENT_TUTOR, MOCK_TUTOR_SCHEDULE, MOCK_TUTOR_REVIEWS } from '../../constants/mockTutorData';

interface EnrollmentDto {
  id: number;
  courseId: number;
  courseTitle: string;
  tutorName: string;
  parentName: string;
  studentName: string;
  studentGrade: string;
  studentLevel: string;
  notes: string;
  status: string;
}

const TutorDashboard: React.FC = () => {
  const { tutorId } = useAuth();
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);

  const fetchEnrollments = () => {
    if (!tutorId) return;
    fetch(`http://localhost:8080/api/enrollments/tutor/${tutorId}`)
      .then(res => res.json())
      .then(data => setEnrollments(Array.isArray(data) ? data.filter((e: EnrollmentDto) => e.status === 'PENDING') : []))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchEnrollments(); }, [tutorId]);

  const handleApprove = async (id: number) => {
    await fetch(`http://localhost:8080/api/enrollments/${id}/approve`, { method: 'PUT' });
    fetchEnrollments();
  };

  const handleReject = async (id: number) => {
    await fetch(`http://localhost:8080/api/enrollments/${id}/reject`, { method: 'PUT' });
    fetchEnrollments();
  };
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
            <p className="font-bold text-4xl mt-2 text-primary">{CURRENT_TUTOR.expectedIncome.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
          </div>
          <div className="absolute right-[-20%] top-[-50%] w-64 h-64 bg-primary/5 rounded-full pointer-events-none backdrop-blur-sm"></div>
        </div>
        
        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Giờ đã dạy</span>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="font-bold text-4xl text-primary">{CURRENT_TUTOR.taughtHours}</span>
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
          
          {/* Enrollment Requests */}
          <section className="glass border border-white/20 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl text-on-surface">Yêu cầu đăng ký lớp</h2>
                {enrollments.length > 0 && (
                  <span className="px-2 py-0.5 bg-error text-white text-xs font-bold rounded-full">{enrollments.length}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {enrollments.length === 0 ? (
                <p className="text-on-surface-variant text-sm text-center py-4">Không có yêu cầu nào đang chờ duyệt.</p>
              ) : enrollments.map((enroll, index) => (
                <div key={enroll.id} className="p-4 glass border border-white/30 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <p className="font-semibold text-on-surface text-sm">{enroll.studentName} <span className="text-on-surface-variant font-normal">({enroll.studentGrade || 'N/A'})</span></p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Lớp: <span className="font-medium text-on-surface">{enroll.courseTitle}</span></p>
                      {enroll.studentLevel && <p className="text-xs text-on-surface-variant">Lực học: {enroll.studentLevel}</p>}
                      {enroll.notes && <p className="text-xs text-on-surface-variant mt-1 italic">"{enroll.notes}"</p>}
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button onClick={() => handleApprove(enroll.id)} className="px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container transition-colors">Chấp nhận</button>
                      <button onClick={() => handleReject(enroll.id)} className="px-3 py-1.5 border border-outline-variant text-on-surface-variant rounded-lg text-xs font-semibold hover:bg-surface-container transition-colors">Từ chối</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <section className="glass border border-white/20 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-on-surface">Lịch dạy sắp tới</h2>
              <Link to="/tutor/schedule" className="text-primary text-sm font-semibold hover:underline">Xem lịch trình</Link>
            </div>
            <div className="flex flex-col gap-4">
              {MOCK_TUTOR_SCHEDULE.map((sch, index) => (
                <div key={sch.id} className="flex items-start gap-4 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="w-16 flex flex-col items-center justify-center glass bg-surface-container/50 rounded-2xl p-2 shrink-0">
                    <span className="text-xs font-semibold text-on-surface-variant">{sch.time.split(',')[0]}</span>
                    <span className="text-lg font-bold text-primary">{sch.time.split(',')[1].trim()}</span>
                  </div>
                  <div className={`flex-1 p-4 rounded-2xl border backdrop-blur-sm ${sch.isPrimary ? 'bg-primary/10 border-primary/20 shadow-sm' : 'glass border-white/20'}`}>
                    <h3 className="font-semibold text-on-surface">{sch.title}</h3>
                    {sch.detail && <p className="text-sm text-on-surface-variant mt-1">{sch.detail}</p>}
                  </div>
                </div>
              ))}
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
              {MOCK_TUTOR_REVIEWS.map((rev, index) => (
                <div key={rev.id} className="p-4 glass bg-surface-container/30 rounded-2xl border border-white/30 animate-slide-up hover:-translate-y-1 transition-transform shadow-sm" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-sm ${i < rev.rating ? 'text-amber-400' : 'text-outline-variant'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-sm text-on-surface italic mb-3">{rev.content}</p>
                  <p className="text-xs font-semibold text-on-surface-variant">{rev.author}</p>
                </div>
              ))}
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
