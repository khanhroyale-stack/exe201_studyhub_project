import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../utils/api';

interface ClassSessionDTO {
  id: number;
  className: string;
  subject: string;
  schedule: string;
  status: string;
  parentName: string;
  pricePerSession: number;
  nextSessionDate?: string;
}

// Parse "Thứ 2, Thứ 4 - 18:30" → [1, 3] (0=T2, 1=T3, ...)
function parseDaysFromSchedule(schedule: string): number[] {
  if (!schedule) return [];
  const dayMap: Record<string, number> = {
    'thứ 2': 0, 't2': 0, 'thứ hai': 0,
    'thứ 3': 1, 't3': 1, 'thứ ba': 1,
    'thứ 4': 2, 't4': 2, 'thứ tư': 2,
    'thứ 5': 3, 't5': 3, 'thứ năm': 3,
    'thứ 6': 4, 't6': 4, 'thứ sáu': 4,
    'thứ 7': 5, 't7': 5, 'thứ bảy': 5,
    'chủ nhật': 6, 'cn': 6, 'cn.': 6,
  };
  const lower = schedule.toLowerCase();
  const days: number[] = [];
  for (const [key, val] of Object.entries(dayMap)) {
    if (lower.includes(key) && !days.includes(val)) days.push(val);
  }
  return days;
}

const TutorSchedule: React.FC = () => {
  const { tutorId, name } = useAuth();
  const [classes, setClasses] = useState<ClassSessionDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // Index của hôm nay trong weekDays (0=T2 ... 6=CN)
  const todayIdx = today.getDay() === 0 ? 6 : today.getDay() - 1;

  useEffect(() => {
    if (!tutorId) { setLoading(false); return; }
    apiFetch(`/class-sessions/tutor/${tutorId}`)
      .then(res => res.json())
      .then(data => {
        setClasses(Array.isArray(data) ? data.filter((c: any) => ['TRIAL', 'PENDING_PAYMENT', 'CONFIRMED'].includes(c.status)) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tutorId]);

  // Build calendar map: dayIdx → classes teaching on that day
  const calendarMap: Record<number, ClassSessionDTO[]> = {};
  for (let i = 0; i < 7; i++) calendarMap[i] = [];
  classes.forEach(cls => {
    const days = parseDaysFromSchedule(cls.schedule);
    days.forEach(d => {
      if (!calendarMap[d].find(c => c.id === cls.id)) {
        calendarMap[d].push(cls);
      }
    });
  });

  return (
    <div className="max-w-[1440px] mx-auto space-y-gutter pb-20 animate-fade-in">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant">
        <div>
          <h2 className="font-bold text-2xl text-on-surface mb-1">
            Tuần làm việc mới, {name || 'Gia sư'}!
          </h2>
          <p className="text-on-surface-variant text-sm">
            Bạn đang có <span className="font-bold text-primary">{classes.length}</span> lớp đang hoạt động.
          </p>
        </div>
        <Link
          to="/tutor/classes"
          className="px-4 py-2 rounded-lg border border-outline text-on-surface font-semibold text-sm hover:bg-surface-container transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">school</span>
          Quản lý lớp học
        </Link>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <section className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-on-surface">Lịch dạy tuần này</h3>
            <span className="text-sm text-on-surface-variant font-medium">
              {today.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-4 text-center border-b border-outline-variant pb-3">
            {weekDays.map((day, i) => (
              <div key={i} className={`text-xs font-bold ${i === todayIdx ? 'text-primary' : 'text-on-surface-variant'}`}>
                {day}
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2 flex-1">
              {weekDays.map((_, dayIdx) => {
                const dayClasses = calendarMap[dayIdx] || [];
                const isToday = dayIdx === todayIdx;
                return (
                  <div
                    key={dayIdx}
                    className={`min-h-[120px] rounded-xl p-2 flex flex-col gap-1.5 transition-colors ${
                      isToday ? 'bg-primary/5 border border-primary/20' : 'bg-surface border border-outline-variant/50'
                    }`}
                  >
                    {dayClasses.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-[10px] text-outline-variant">—</span>
                      </div>
                    ) : (
                      dayClasses.map(cls => (
                        <div key={cls.id} className={`bg-primary/10 border border-primary/20 rounded-lg p-1.5 ${cls.status === 'PENDING_PAYMENT' ? 'opacity-80 border-dashed border-orange-300' : ''}`}>
                          <p className="text-[9px] font-bold text-primary truncate leading-tight">{cls.subject}</p>
                          <p className="text-[8px] text-on-surface-variant truncate leading-tight">{cls.className}</p>
                          <span className={`text-[8px] font-bold px-1 py-0.5 rounded-full ${cls.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : cls.status === 'PENDING_PAYMENT' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>
                            {cls.status === 'CONFIRMED' ? '●' : cls.status === 'PENDING_PAYMENT' ? '!' : '○'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {classes.length === 0 && !loading && (
            <div className="flex-1 flex items-center justify-center flex-col text-on-surface-variant mt-4">
              <span className="material-symbols-outlined text-5xl mb-3 text-outline-variant">calendar_today</span>
              <p className="text-sm">Không có lịch dạy nào.</p>
              <Link to="/tutor/search-classes" className="mt-3 text-primary text-sm font-semibold hover:underline">Tìm lớp mới →</Link>
            </div>
          )}
        </section>

        {/* Active Classes List */}
        <section className="xl:col-span-1 bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col overflow-hidden">
          <div className="p-5 border-b border-outline-variant bg-surface-container-low">
            <h3 className="font-bold text-lg text-on-surface">Lớp đang dạy ({classes.length})</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {classes.length === 0 ? (
              <p className="text-on-surface-variant text-sm text-center py-8">Chưa có lớp nào.</p>
            ) : classes.map(cls => (
              <div key={cls.id} className="border border-outline-variant rounded-xl p-4 bg-white hover:shadow-sm transition-shadow group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    {cls.subject && <span className="inline-block px-2 py-0.5 bg-primary-container text-on-primary-container rounded text-[10px] font-bold uppercase mb-1">{cls.subject}</span>}
                    <h4 className="font-semibold text-sm text-on-surface">{cls.className}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">{cls.schedule || 'Chưa có lịch'}</p>
                  </div>
                  <Link
                    to={`/tutor/classes/${cls.id}/workspace`}
                    className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </Link>
                </div>
                <div className="text-xs text-primary font-bold">{cls.pricePerSession?.toLocaleString('vi-VN')}đ/buổi</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-outline-variant text-center">
            <Link to="/tutor/classes" className="text-primary font-semibold text-sm hover:underline">Xem tất cả lớp học</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TutorSchedule;
