import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';

interface ClassSessionDTO {
  id: number;
  className: string;
  subject: string;
  schedule: string;
  learningMode: string;
  status: string;
  parentName: string;
  pricePerSession: number;
}




const TutorDashboard: React.FC = () => {
  const { tutorId, name } = useAuth();
  const [classes, setClasses] = useState<ClassSessionDTO[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [realIncome, setRealIncome] = useState<number | null>(null);

  const fetchEnrollments = () => {
    if (!tutorId) return;
    apiFetch(`/enrollments/tutor/${tutorId}`)
      .then(res => res.json())
      .then(data => setEnrollments(Array.isArray(data) ? data.filter((e: any) => e.status === 'PENDING') : []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (!tutorId) { setLoading(false); return; }

    Promise.all([
      apiFetch(`/class-sessions/tutor/${tutorId}`).then(r => r.json()),
    ])
      .then(([classData]) => {
        const classList: ClassSessionDTO[] = Array.isArray(classData) ? classData : [];
        setClasses(classList);
        setLoading(false);
        // Tính thu nhập từ lesson logs tháng này
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        // Fetch lesson logs cho tất cả lớp đang hoạt động
        const activeSessions = classList.filter(c => ['TRIAL', 'CONFIRMED'].includes(c.status));
        Promise.all(
          activeSessions.map(cls =>
            apiFetch(`/lesson-logs/class/${cls.id}`)
              .then(r => r.json())
              .then(logs => {
                const thisMonthLogs = Array.isArray(logs)
                  ? logs.filter((l: any) => {
                      const d = new Date(l.sessionDate || l.createdAt);
                      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
                    })
                  : [];
                return thisMonthLogs.length * (cls.pricePerSession || 0);
              })
              .catch(() => 0)
          )
        ).then(incomes => setRealIncome(incomes.reduce((a, b) => a + b, 0)));
      })
      .catch(() => setLoading(false));

    fetchEnrollments();
  }, [tutorId]);

  const handleApprove = async (id: number) => {
    await apiFetch(`/enrollments/${id}/approve`, { method: 'PUT' });
    fetchEnrollments();
  };

  const handleReject = async (id: number) => {
    await apiFetch(`/enrollments/${id}/reject`, { method: 'PUT' });
    fetchEnrollments();
  };

  const activeClasses = classes.filter(c => ['TRIAL', 'CONFIRMED'].includes(c.status));
  const completedClasses = classes.filter(c => ['COMPLETED', 'DISBURSED'].includes(c.status));

  // Thu nhập thực tế từ lesson logs tháng này (fallback về 0 nếu chưa có logs)
  const displayIncome = realIncome ?? 0;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Bảng điều khiển Gia sư</h1>
          <p className="text-on-surface-variant mt-1">Chào mừng trở lại, {name || 'Gia sư'}! Đây là tổng quan hoạt động của bạn.</p>
        </div>
        <Link
          to="/tutor/search-classes"
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined">search</span>
          Tìm lớp mới
        </Link>
      </div>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up stagger-1">
        <div className="md:col-span-2 p-6 glass border border-white/20 rounded-3xl flex items-center justify-between relative overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="relative z-10">
            <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Thu nhập dự kiến (Tháng này)</span>
            <p className="font-bold text-4xl mt-2 text-primary">
              {loading ? '...' : `${displayIncome.toLocaleString('vi-VN')}đ`}
            </p>
            <p className="text-xs text-on-surface-variant mt-1">
              {realIncome === null ? 'Đang tính...' : `Thu nhập thực tế tháng này từ ${activeClasses.length} lớp`}
            </p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative z-10">
            <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
          </div>
        </div>

        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Lớp đang dạy</span>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="font-bold text-4xl text-primary">{loading ? '...' : activeClasses.length}</span>
            <span className="font-medium text-xs text-on-surface-variant">lớp</span>
          </div>
        </div>

        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Lớp chờ duyệt</span>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="font-bold text-4xl text-primary">{enrollments.length}</span>
            <span className="font-medium text-xs text-error">Cần xử lý</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
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

          {/* Active Classes */}
          <section className="glass border border-white/20 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-xl text-on-surface">Lớp học đang dạy</h2>
              <Link to="/tutor/classes" className="text-primary text-sm font-semibold hover:underline">Xem tất cả</Link>
            </div>
            {loading ? (
              <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
            ) : activeClasses.length === 0 ? (
              <p className="text-on-surface-variant text-sm text-center py-4">Bạn chưa có lớp học nào đang dạy.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {activeClasses.slice(0, 3).map((cls, index) => (
                  <div key={cls.id} className="p-4 glass border border-white/30 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-on-surface">{cls.className}</p>
                        {cls.subject && <span className="inline-block mt-1 px-2 py-0.5 bg-primary-container text-on-primary-container text-xs rounded font-medium">{cls.subject}</span>}
                        <p className="text-xs text-on-surface-variant mt-1">{cls.schedule}</p>
                        <p className="text-xs text-on-surface-variant">Phụ huynh: {cls.parentName}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary text-sm">{cls.pricePerSession?.toLocaleString('vi-VN')}đ</p>
                        <p className="text-xs text-on-surface-variant">/buổi</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-1 flex flex-col gap-8 animate-slide-up stagger-3">
          <section className="glass border border-white/20 rounded-3xl p-6 shadow-sm">
            <h2 className="font-semibold text-xl text-on-surface mb-6">Thống kê nhanh</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 bg-surface-container/50 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">play_lesson</span>
                  Đang dạy
                </div>
                <span className="font-bold text-primary">{activeClasses.length} lớp</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container/50 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">task_alt</span>
                  Đã hoàn thành
                </div>
                <span className="font-bold text-green-600">{completedClasses.length} lớp</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-container/50 rounded-xl">
                <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                  <span className="material-symbols-outlined text-amber-600 text-[18px]">pending_actions</span>
                  Chờ phê duyệt
                </div>
                <span className="font-bold text-amber-600">{enrollments.length}</span>
              </div>
            </div>
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
