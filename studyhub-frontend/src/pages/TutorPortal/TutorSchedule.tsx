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
        // Sort lessons by date and time
        const sortedLessons = [...lessonsData].sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.startTime || '00:00:00'}`);
          const dateB = new Date(`${b.date}T${b.startTime || '00:00:00'}`);
          return dateA.getTime() - dateB.getTime();
        });
        setLessons(sortedLessons);
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

  const formatShortDate = (dateString?: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return `${dayNames[d.getDay()]}, ${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  // Group lessons by date
  const groupedLessons = lessons.reduce((acc, lesson) => {
    const key = lesson.date || 'Unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(lesson);
    return acc;
  }, {} as Record<string, LessonSchedule[]>);

  const currentDate = new Date();
  const currentMonthLabel = `Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`;

  const bgColors = ['bg-primary-container', 'bg-secondary-container', 'bg-tertiary-container', 'bg-surface-variant'];
  const borderColors = ['border-primary', 'border-secondary', 'border-tertiary', 'border-outline-variant'];

  return (
    <div className="max-w-[1440px] mx-auto space-y-gutter pb-10">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-gutter rounded-2xl border border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Tuần làm việc mới, Hoàng!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Bạn có {lessons.length} ca dạy trong tuần này.</p>
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
        {/* Timeline/Agenda Widget */}
        <section className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-gutter flex flex-col min-h-[600px]">
          <div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span> Lịch tuần này
            </h3>
            <div className="flex items-center gap-2 bg-surface-container py-1 px-3 rounded-full">
              <button className="p-1 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
              <span className="font-label-md text-label-md text-on-surface px-2">{currentMonthLabel}</span>
              <button className="p-1 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {Object.keys(groupedLessons).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
                <span className="material-symbols-outlined text-6xl mb-4 opacity-50">event_busy</span>
                <p className="font-body-lg text-body-lg">Chưa có lịch dạy nào trong tuần này.</p>
              </div>
            ) : (
              Object.keys(groupedLessons).sort().map(date => {
                const dayLessons = groupedLessons[date];
                const isToday = new Date().toISOString().split('T')[0] === date;
                
                return (
                  <div key={date} className="relative">
                    {/* Day Header */}
                    <div className="flex items-center gap-4 mb-4 sticky top-0 bg-surface-container-lowest z-10 py-2">
                      <div className={`px-4 py-1.5 rounded-full font-label-md text-label-md ${isToday ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                        {formatShortDate(date)} {isToday && '(Hôm nay)'}
                      </div>
                      <div className="h-[1px] flex-1 bg-outline-variant/50"></div>
                    </div>
                    
                    {/* Lessons List for the Day */}
                    <div className="space-y-3 pl-2 md:pl-6 border-l-2 border-outline-variant/30 ml-4">
                      {dayLessons.map((lesson, idx) => {
                        const isCompleted = lesson.status === 'PRESENT';
                        const colorIdx = (lesson.lessonId || idx) % bgColors.length;
                        
                        return (
                          <div key={lesson.lessonId} className={`relative p-4 rounded-xl border ${isCompleted ? 'bg-surface-container border-outline-variant opacity-70' : `${bgColors[colorIdx]} ${borderColors[colorIdx]} shadow-sm`} flex flex-col md:flex-row gap-4 justify-between items-start md:items-center transition-all hover:shadow-md`}>
                            {/* Timeline dot */}
                            <div className={`absolute -left-[29px] w-4 h-4 rounded-full border-4 border-surface-container-lowest ${isCompleted ? 'bg-outline' : 'bg-primary'}`}></div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start sm:items-center w-full">
                              {/* Time Box */}
                              <div className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-[100px] shrink-0 ${isCompleted ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-surface-container-lowest text-on-surface'}`}>
                                <span className="font-headline-sm text-headline-sm">{formatTime(lesson.startTime)}</span>
                                <span className="font-body-sm text-body-sm opacity-70">đến {formatTime(lesson.endTime)}</span>
                              </div>
                              
                              {/* Class Info */}
                              <div className="flex-1">
                                <span className="inline-block px-2 py-0.5 bg-surface-container-highest text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider mb-1">
                                  {lesson.subject || 'Môn học'}
                                </span>
                                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">{lesson.className}</h4>
                                <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
                                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">person</span> Phụ huynh: {lesson.parentName}</span>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                                {isCompleted ? (
                                  <div className="flex items-center gap-2 text-primary font-label-md text-label-md px-4 py-2 bg-primary-container/20 rounded-lg w-full justify-center">
                                    <span className="material-symbols-outlined text-[18px]">check_circle</span> Đã điểm danh
                                  </div>
                                ) : (
                                  <>
                                    <button onClick={() => handleLessonAttendance(lesson.lessonId)} className="flex-1 md:w-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                                      <span className="material-symbols-outlined text-[18px]">meeting_room</span> Vào lớp
                                    </button>
                                    <button onClick={() => handleRequestChange(lesson.lessonId)} className="flex-1 md:w-full bg-transparent border border-outline hover:bg-error-container hover:text-on-error-container hover:border-error-container text-on-surface-variant font-label-md text-label-md px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                                      <span className="material-symbols-outlined text-[18px]">edit_calendar</span> Đổi lịch
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Active Classes List */}
        <section className="xl:col-span-1 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant shrink-0 p-gutter bg-surface-container-lowest">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">school</span> Lớp đang dạy
              </h3>
            </div>
            
            {successMsg && (
              <div className="mx-gutter mt-gutter bg-primary-container text-on-primary-container p-3 rounded-lg text-sm text-center font-medium flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">check_circle</span> {successMsg}
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-gutter space-y-4">
              {classes.length === 0 ? (
                <div className="text-center py-8 bg-surface-container-lowest rounded-xl border border-dashed border-outline">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">inbox</span>
                  <p className="text-on-surface-variant font-body-sm text-body-sm">Bạn chưa có lớp học nào đang diễn ra.</p>
                </div>
              ) : classes.map(cls => (
                <div key={cls.id} className="border border-outline-variant rounded-xl p-5 hover:shadow-[0px_8px_16px_rgba(0,0,0,0.04)] transition-all duration-200 bg-surface-container-lowest group relative overflow-hidden">
                  {/* Status Indicator */}
                  <div className={`absolute top-0 left-0 w-1 h-full ${cls.status === 'TRIAL_PROGRESS' ? 'bg-tertiary' : 'bg-primary'}`}></div>
                  
                  <div className="flex justify-between items-start mb-3 pl-1">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-surface-container-high text-on-surface rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                        {cls.subject || 'Môn học'}
                      </span>
                      <h4 className="font-title-md text-title-md text-on-surface leading-tight mb-1">{cls.className}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Phụ huynh: <span className="font-medium text-on-surface">{cls.parentName}</span></p>
                    </div>
                    <button className="text-on-surface-variant hover:bg-surface-container p-1 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                  </div>
                  
                  {/* Progress */}
                  <div className="mt-4 mb-5 pl-1">
                    <div className="flex justify-between text-[11px] mb-1.5">
                      <span className="text-on-surface-variant font-medium">Tiến độ khóa học</span>
                      <span className="text-primary font-bold">{cls.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${cls.progress}%` }}></div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-outline-variant/50 pl-1">
                    <button 
                      onClick={() => handleAttendance(cls.id)}
                      disabled={loadingId === cls.id}
                      className="flex-1 bg-surface-container-high text-on-surface font-label-md text-label-md py-2.5 rounded-lg hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:bg-surface-container-high disabled:hover:text-on-surface"
                    >
                      {loadingId === cls.id ? (
                        <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">rule</span>
                      )}
                      {loadingId === cls.id ? 'Đang gửi...' : 'Điểm danh tay'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-outline-variant bg-surface-container-lowest text-center shrink-0">
              <Link to="/tutor/classes" className="inline-flex items-center gap-1 text-primary font-label-md text-label-md hover:text-primary-container transition-colors">
                Xem tất cả lớp học <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TutorSchedule;
