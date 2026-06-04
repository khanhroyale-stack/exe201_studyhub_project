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
              <div className="col-span-1 relative">
                {/* Event Card */}
                <div className="absolute top-[10%] left-0 right-0 bg-primary-fixed border border-primary-fixed-dim rounded-lg p-2 shadow-sm">
                  <p className="font-label-sm text-label-sm text-on-primary-fixed-variant font-bold truncate">Toán 10 - Lớp A1</p>
                  <p className="text-[10px] text-on-primary-fixed-variant mt-1">18:00 - 19:30</p>
                </div>
              </div>
              <div className="col-span-1 relative bg-surface-container-lowest border-x border-outline-variant/30">
                {/* Today Highlight Column */}
                <div className="absolute top-[30%] left-0 right-0 bg-secondary-container border border-secondary rounded-lg p-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow group">
                  <p className="font-label-sm text-label-sm text-on-secondary-container font-bold truncate">Vật lý 12 - Luyện thi</p>
                  <p className="text-[10px] text-on-secondary-container mt-1">19:00 - 21:00</p>
                  {/* Hover Action Menu (simulate) */}
                  <div className="hidden group-hover:flex absolute top-full left-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg p-1 z-10 w-32 flex-col gap-1">
                    <button className="text-left px-2 py-1 text-[11px] font-label-sm hover:bg-surface-container rounded text-on-surface w-full">Vào lớp</button>
                    <button className="text-left px-2 py-1 text-[11px] font-label-sm hover:bg-surface-container rounded text-error w-full">Xin nghỉ/Đổi ca</button>
                  </div>
                </div>
              </div>
              <div className="col-span-1 relative"></div>
              <div className="col-span-1 relative">
                <div className="absolute top-[60%] left-0 right-0 bg-tertiary-fixed border border-tertiary-fixed-dim rounded-lg p-2 shadow-sm">
                  <p className="font-label-sm text-label-sm text-on-tertiary-fixed-variant font-bold truncate">Hóa 11 - Cơ bản</p>
                  <p className="text-[10px] text-on-tertiary-fixed-variant mt-1">20:00 - 21:30</p>
                </div>
              </div>
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
              {/* Class Card 1 */}
              <div className="border border-outline-variant rounded-xl p-4 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-shadow duration-150 bg-surface-container-lowest group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-[10px] font-bold uppercase tracking-wider mb-1">Toán Học</span>
                    <h4 className="font-label-md text-label-md text-on-surface">Luyện thi Đại học Khối A</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Học sinh: Nguyễn Văn A</p>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                </div>
                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-on-surface-variant">Tiến độ khóa học</span>
                    <span className="text-primary font-bold">Buổi 3/10</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-primary text-on-primary font-label-sm text-label-sm py-2 rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                    Điểm danh
                  </button>
                </div>
              </div>
              
              {/* Class Card 2 */}
              <div className="border border-outline-variant rounded-xl p-4 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-shadow duration-150 bg-surface-container-lowest">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-2 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded text-[10px] font-bold uppercase tracking-wider mb-1">Vật Lý</span>
                    <h4 className="font-label-md text-label-md text-on-surface">Vật lý 12 Nâng cao</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Học sinh: Trần Thị B</p>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                </div>
                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-on-surface-variant">Tiến độ khóa học</span>
                    <span className="text-primary font-bold">Buổi 8/20</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 border border-outline text-on-surface font-label-sm text-label-sm py-2 rounded-lg hover:bg-surface-container transition-colors">
                    Đổi/Hủy lịch
                  </button>
                  <button className="flex-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm py-2 rounded-lg cursor-not-allowed opacity-50">
                    Đã điểm danh
                  </button>
                </div>
              </div>
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
