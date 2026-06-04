import React from 'react';
import { MOCK_TUTOR_CLASSES } from '../../constants/mockTutorData';

const TutorClasses: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto pb-20 animate-fade-in">
      {/* Header section with Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Quản lý lớp học</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Quản lý tiến độ và lịch trình các lớp bạn đang phụ trách.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm lớp học..." 
              className="pl-10 pr-4 py-2 border border-outline-variant rounded-lg bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-sm w-full md:w-[250px]"
            />
          </div>
          <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-outline-variant mb-6">
        <button className="pb-2 border-b-2 border-primary text-primary font-label-md text-label-md">Đang dạy (3)</button>
        <button className="pb-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">Đã hoàn thành (1)</button>
        <button className="pb-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">Đã hủy (0)</button>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TUTOR_CLASSES.map((cls, idx) => (
          <div key={cls.id} className={`border border-outline-variant rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-surface-container-lowest flex flex-col group relative overflow-hidden animate-slide-up opacity-0 stagger-${(idx % 6) + 1}`}>
            <div className={`absolute top-0 right-0 ${cls.modeColor} text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider`}>
              {cls.mode}
            </div>
            
            <div className="flex items-start justify-between mb-4 pr-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-block px-2 py-1 ${cls.subjectColor} rounded text-[10px] font-bold uppercase tracking-wider`}>{cls.subject}</span>
                  <span className={`px-2 py-0.5 ${cls.statusColor} text-[10px] font-bold rounded uppercase`}>{cls.status}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-1">{cls.title}</h3>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Học sinh: <span className="font-medium text-on-surface">{cls.studentName}</span></span>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>{cls.schedule}</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">payments</span>
                <span>{cls.price}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-[12px] mb-1.5">
                <span className="text-on-surface-variant font-medium">Tiến độ khóa học</span>
                <span className="text-primary font-bold">{cls.progressStr}</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${cls.progressPercent}%` }}></div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-outline-variant flex gap-3">
              <button className={`flex-1 font-label-md text-label-md py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${cls.actionClass}`}>
                <span className="material-symbols-outlined text-[18px]">{cls.actionIcon}</span>
                {cls.action}
              </button>
              
              <div className="relative group/menu">
                <button className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors active:scale-[0.95] tooltip" title="Tùy chọn khác">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 flex flex-col p-2">
                  <button className="text-left px-4 py-2 hover:bg-surface-container rounded-lg font-body-sm text-body-sm flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                    Xin đổi lịch
                  </button>
                  <button className="text-left px-4 py-2 hover:bg-error-container hover:text-error rounded-lg font-body-sm text-body-sm flex items-center gap-2 text-error transition-colors mt-1">
                    <span className="material-symbols-outlined text-[18px]">cancel</span>
                    Báo hủy lớp
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorClasses;
