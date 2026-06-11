import React from 'react';
import { Link } from 'react-router-dom';

const TutorSchedule: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto space-y-gutter">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-gutter rounded-2xl border border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Tuần làm việc mới, Hoàng!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Bạn có 12 ca dạy trong tuần này. Ca tiếp theo bắt đầu sau 2 giờ.</p>
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
              <div className="col-span-1 relative"></div>
              <div className="col-span-1 relative"></div>
              <div className="col-span-1 relative bg-surface-container-lowest border-x border-outline-variant/30"></div>
              <div className="col-span-1 relative"></div>
              <div className="col-span-1 relative"></div>
              <div className="col-span-1 relative"></div>
              <div className="col-span-1 relative"></div>
            </div>
          </div>
        </section>

        {/* Active Classes List */}
        <section className="xl:col-span-1 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col h-full overflow-hidden">
            <div className="p-gutter border-b border-outline-variant bg-surface-container-low">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Lớp đang dạy</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-gutter space-y-4">
              <div className="text-center text-on-surface-variant font-body-sm py-4">Chưa có dữ liệu.</div>
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
