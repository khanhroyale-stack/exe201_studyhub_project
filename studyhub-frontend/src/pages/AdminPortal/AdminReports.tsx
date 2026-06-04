import React from 'react';

const AdminReports: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Báo cáo &amp; Phân tích</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Hiệu suất nền tảng, chất lượng gia sư và hoạt động của hệ thống.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            30 ngày qua
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Xuất PDF
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* KPIs */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Gia sư Đang hoạt động</span>
              <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-1.5 rounded-md">school</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl text-on-surface">1,432</span>
              <span className="font-body-sm text-body-sm text-secondary font-medium flex items-center">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> 12%
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Đánh giá Trung bình</span>
              <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-1.5 rounded-md">star</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl text-on-surface">4.8</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">/ 5.0</span>
            </div>
          </div>
        </div>

        {/* Main Chart: Growth */}
        <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Tăng trưởng nền tảng</h3>
            <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-low rounded-md transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="flex-1 relative min-h-[200px] flex items-end gap-2 w-full pt-4">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path className="opacity-80" d="M0,80 Q10,75 20,60 T40,50 T60,30 T80,40 T100,10" fill="none" stroke="#003d9b" strokeWidth="2"></path>
              <path className="opacity-20" d="M0,80 Q10,75 20,60 T40,50 T60,30 T80,40 T100,10 L100,100 L0,100 Z" fill="url(#blue-gradient)"></path>
              <defs>
                <linearGradient id="blue-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0052cc" stopOpacity="0.8"></stop>
                  <stop offset="100%" stopColor="#dae2ff" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
              <div className="border-b border-on-surface w-full h-0"></div>
              <div className="border-b border-on-surface w-full h-0"></div>
              <div className="border-b border-on-surface w-full h-0"></div>
              <div className="border-b border-on-surface w-full h-0"></div>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-body-sm font-body-sm text-on-surface-variant px-2">
            <span>Th 1</span><span>Th 2</span><span>Th 3</span><span>Th 4</span><span>Th 5</span><span>Th 6</span>
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quality Evaluation Table */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Đánh giá Chất lượng Gia sư</h3>
            <button className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1">
              Xem tất cả <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="py-3 px-5 font-label-md text-label-md text-on-surface-variant font-medium">Gia sư</th>
                  <th className="py-3 px-5 font-label-md text-label-md text-on-surface-variant font-medium">Rating</th>
                  <th className="py-3 px-5 font-label-md text-label-md text-on-surface-variant font-medium">Report</th>
                  <th className="py-3 px-5 font-label-md text-label-md text-on-surface-variant font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm">
                <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">EK</div>
                    <span className="font-medium text-on-surface">Elena K.</span>
                  </td>
                  <td className="py-3 px-5"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>star</span> 4.9</span></td>
                  <td className="py-3 px-5 text-on-surface-variant">0</td>
                  <td className="py-3 px-5"><span className="px-2 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-[11px] font-semibold tracking-wide">XUẤT SẮC</span></td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold">MJ</div>
                    <span className="font-medium text-on-surface">Marcus J.</span>
                  </td>
                  <td className="py-3 px-5"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>star</span> 3.2</span></td>
                  <td className="py-3 px-5 text-error font-medium">4</td>
                  <td className="py-3 px-5"><span className="px-2 py-1 bg-error-container text-on-error-container rounded-full text-[11px] font-semibold tracking-wide">CẦN DUYỆT</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Popularity Bar Chart */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">Môn học phổ biến</h3>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-24 font-body-sm text-body-sm text-on-surface-variant truncate">Toán học</div>
              <div className="flex-1 bg-surface-container-high rounded-full h-3 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="w-10 text-right font-label-md text-label-md text-on-surface">85%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 font-body-sm text-body-sm text-on-surface-variant truncate">Tin học</div>
              <div className="flex-1 bg-surface-container-high rounded-full h-3 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="w-10 text-right font-label-md text-label-md text-on-surface">72%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 font-body-sm text-body-sm text-on-surface-variant truncate">Vật lý</div>
              <div className="flex-1 bg-surface-container-high rounded-full h-3 overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="w-10 text-right font-label-md text-label-md text-on-surface">45%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
