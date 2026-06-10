import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tutorPortalApi, ClassSession, LessonSchedule } from '../../services/tutorPortalApi';

const TutorSchedule: React.FC = () => {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [lessons, setLessons] = useState<LessonSchedule[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesData, lessonsData] = await Promise.all([
          tutorPortalApi.getClasses(),
          tutorPortalApi.getSchedule() // get current week lessons
        ]);
        setClasses(classesData.filter(c => ['TRIAL_WAITING', 'TRIAL_PROGRESS', 'OFFICIAL'].includes(c.status)));
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAttendance = async (classId: number) => {
    setLoadingId(classId);
    setSuccessMsg('');
    try {
      await tutorPortalApi.markAttendance(classId);
      setSuccessMsg('Điểm danh thành công!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Lỗi điểm danh:', error);
      alert('Có lỗi xảy ra khi điểm danh.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleLessonAttendance = async (lessonId: number) => {
    try {
      await tutorPortalApi.markLessonAttendance(lessonId);
      setSuccessMsg('Điểm danh buổi học thành công!');
      setTimeout(() => setSuccessMsg(''), 3000);
      // update local state
      setLessons(prev => prev.map(l => l.lessonId === lessonId ? { ...l, status: 'PRESENT' } : l));
    } catch (error) {
      console.error('Lỗi điểm danh buổi học:', error);
      alert('Có lỗi xảy ra khi điểm danh.');
    }
  };

  const handleRequestChange = async (lessonId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xin đổi lịch buổi học này?')) {
      try {
        await tutorPortalApi.requestScheduleChange(lessonId);
        alert('Yêu cầu đổi lịch đã được gửi!');
      } catch (error) {
        console.error('Lỗi xin đổi lịch:', error);
        alert('Có lỗi xảy ra.');
      }
    }
  };

  const getLessonsForDay = (dayIndex: number) => {
    // JS getDay(): 0 is Sunday, 1 is Monday.
    return lessons.filter(l => {
      if (!l.date) return false;
      const d = new Date(l.date);
      return d.getDay() === dayIndex;
    });
  };

  // Helper to map 0-6 index (where 0 is Mon, 6 is Sun) to actual JS day
  const jsDays = [1, 2, 3, 4, 5, 6, 0];
  const bgColors = ['bg-primary-fixed', 'bg-secondary-container', 'bg-tertiary-fixed', 'bg-error-container', 'bg-primary-container'];
  const textColors = ['text-on-primary-fixed-variant', 'text-on-secondary-container', 'text-on-tertiary-fixed-variant', 'text-on-error-container', 'text-on-primary-container'];
  const borderColors = ['border-primary-fixed-dim', 'border-secondary', 'border-tertiary-fixed-dim', 'border-error', 'border-primary'];

  return (
    <div className="max-w-[1440px] mx-auto space-y-gutter">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-gutter rounded-2xl border border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Tuần làm việc mới, Hoàng!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Bạn có {classes.length} ca dạy trong tuần này.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-outline text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tạo lịch trống
          </button>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
        {/* Calendar Widget (Takes up 2 columns on large screens) */}
        <section className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-gutter flex flex-col min-h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Lịch tuần này</h3>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined">chevron_left</span></button>
              <span className="font-label-md text-label-md text-on-surface">Tháng 10, 2024</span>
              <button className="p-1 rounded hover:bg-surface-container text-on-surface-variant"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
          {/* Calendar Grid */}
          <div className="flex-1 flex flex-col">
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center border-b border-outline-variant pb-2">
              <div className="font-label-sm text-label-sm text-on-surface-variant">T2</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">T3</div>
              <div className="font-label-sm text-label-sm text-primary font-bold">T4</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">T5</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">T6</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">T7</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">CN</div>
            </div>
            {/* Simplified Time Grid (Decorative for layout) */}
            <div className="flex-1 grid grid-cols-7 gap-2 relative min-h-[400px]">
              {/* Background Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-t border-outline w-full h-[1px]"></div>
                <div className="border-t border-outline w-full h-[1px]"></div>
                <div className="border-t border-outline w-full h-[1px]"></div>
                <div className="border-t border-outline w-full h-[1px]"></div>
              </div>
              {/* Columns */}
              {jsDays.map((dayIndex, colIdx) => {
                const dayLessons = getLessonsForDay(dayIndex);
                const isToday = new Date().getDay() === dayIndex;
                return (
                  <div key={colIdx} className={`col-span-1 relative ${isToday ? 'bg-surface-container-lowest border-x border-outline-variant/30' : ''}`}>
                    {dayLessons.map((lesson, idx) => {
                      const colorIdx = (lesson.classId || lesson.lessonId) % bgColors.length;
                      // Calculate top position based on start time (mock calculation for demo)
                      // Let's assume 18:00 is 10%, 20:00 is 60%
                      let topPercent = 10 + (idx * 25); 
                      if (lesson.startTime) {
                        const [hours] = lesson.startTime.split(':').map(Number);
                        topPercent = Math.max(0, (hours - 14) * 15); // e.g. 14:00 is 0%, 18:00 is 60%
                      }
                      
                      return (
                        <div key={lesson.lessonId} 
                             className={`absolute left-0 right-0 ${bgColors[colorIdx]} border ${borderColors[colorIdx]} rounded-lg p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow group`}
                             style={{ top: `${topPercent}%` }}>
                          <p className={`font-label-sm text-label-sm ${textColors[colorIdx]} font-bold truncate`}>{lesson.className}</p>
                          <p className={`text-[10px] ${textColors[colorIdx]} mt-1`}>
                            {lesson.startTime?.substring(0, 5)} - {lesson.endTime?.substring(0, 5)}
                          </p>
                          {lesson.status === 'PRESENT' && (
                            <div className="mt-1 flex items-center gap-1 text-[10px] text-green-700 font-bold bg-green-100/50 rounded px-1 w-fit">
                              <span className="material-symbols-outlined text-[12px]">check_circle</span> Điểm danh
                            </div>
                          )}
                          {/* Hover Action Menu */}
                          {lesson.status !== 'PRESENT' && (
                            <div className="hidden group-hover:flex absolute top-full left-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg p-1 z-10 w-32 flex-col gap-1">
                              <button onClick={() => handleLessonAttendance(lesson.lessonId)} className="text-left px-2 py-1 text-[11px] font-label-sm hover:bg-surface-container rounded text-on-surface w-full">Vào lớp (Điểm danh)</button>
                              <button onClick={() => handleRequestChange(lesson.lessonId)} className="text-left px-2 py-1 text-[11px] font-label-sm hover:bg-surface-container rounded text-error w-full">Xin nghỉ/Đổi ca</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Active Classes List */}
        <section className="xl:col-span-1 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant shrink-0 p-gutter bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Lớp đang dạy</h3>
            </div>
            {successMsg && <div className="bg-green-100 text-green-800 p-2 rounded text-sm text-center font-medium">{successMsg}</div>}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-gutter space-y-4">
              {classes.length === 0 ? (
                <div className="text-center py-6 text-on-surface-variant text-body-sm">Bạn chưa có lớp học nào đang diễn ra.</div>
              ) : classes.map(cls => (
                <div key={cls.id} className="border border-outline-variant rounded-xl p-4 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-shadow duration-150 bg-surface-container-lowest group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-[10px] font-bold uppercase tracking-wider mb-1">{cls.subject || 'Môn học'}</span>
                      <h4 className="font-label-md text-label-md text-on-surface">{cls.className}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Học sinh: {cls.parentName}</p>
                    </div>
                    <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                  </div>
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-on-surface-variant">Tiến độ khóa học</span>
                      <span className="text-primary font-bold">{cls.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${cls.progress}%` }}></div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => handleAttendance(cls.id)}
                      disabled={loadingId === cls.id}
                      className="flex-1 bg-primary text-on-primary font-label-sm text-label-sm py-2 rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                      {loadingId === cls.id ? 'Đang gửi...' : 'Điểm danh'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-outline-variant bg-surface-container-lowest text-center">
              <Link to="/tutor/classes" className="text-primary font-label-sm text-label-sm hover:underline">Xem tất cả lớp học</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TutorSchedule;
