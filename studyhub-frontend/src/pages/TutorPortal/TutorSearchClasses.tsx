import React from 'react';
import { Link } from 'react-router-dom';

const TutorSearchClasses: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-gutter flex justify-between items-end animate-slide-up">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-2">Tìm kiếm lớp học</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Khám phá các cơ hội giảng dạy phù hợp với chuyên môn của bạn.</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-label-md font-label-md text-on-surface-variant">
          <span>Sắp xếp theo:</span>
          <select className="bg-surface-container-lowest border border-outline-variant rounded-md py-1.5 pl-3 pr-8 focus:border-primary focus:ring-0 cursor-pointer">
            <option>Mới nhất</option>
            <option>Học phí cao nhất</option>
            <option>Gần tôi nhất</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-gutter items-start animate-slide-up stagger-1">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 glass border border-white/20 rounded-2xl p-6 shrink-0 sticky top-[96px] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-headline-sm font-headline-sm text-on-background">Bộ lọc</h3>
            <button className="text-label-sm font-label-sm text-primary hover:underline">Xóa tất cả</button>
          </div>
          {/* Môn học */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3 flex items-center justify-between">
              Môn học
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">keyboard_arrow_up</span>
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Toán học</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm font-medium text-on-surface group-hover:text-on-surface transition-colors">Tiếng Anh</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Vật lý</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Hóa học</span>
              </label>
              <button className="text-label-sm font-label-sm text-primary mt-1 hover:underline">Xem thêm</button>
            </div>
          </div>
          {/* Hình thức */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Hình thức học</h4>
            <div className="flex gap-2">
              <label className="flex-1 text-center cursor-pointer">
                <input defaultChecked className="peer sr-only" name="format" type="radio" />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Tất cả</div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input className="peer sr-only" name="format" type="radio" />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Online</div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input className="peer sr-only" name="format" type="radio" />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Offline</div>
              </label>
            </div>
          </div>
          {/* Khoảng học phí */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Khoảng học phí (VNĐ/h)</h4>
            <div className="flex items-center gap-2">
              <input className="w-full bg-surface border border-outline-variant rounded-md py-1.5 px-3 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Tối thiểu" type="text" />
              <span className="text-on-surface-variant">-</span>
              <input className="w-full bg-surface border border-outline-variant rounded-md py-1.5 px-3 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Tối đa" type="text" />
            </div>
          </div>
          {/* Rating phụ huynh */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Đánh giá phụ huynh</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded-full border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" name="rating" type="radio" />
                <div className="flex items-center text-tertiary-fixed-dim">
                  <span className="material-symbols-outlined icon-fill text-[18px]">star</span>
                  <span className="material-symbols-outlined icon-fill text-[18px]">star</span>
                  <span className="material-symbols-outlined icon-fill text-[18px]">star</span>
                  <span className="material-symbols-outlined icon-fill text-[18px]">star</span>
                  <span className="material-symbols-outlined text-[18px]">star</span>
                  <span className="ml-2 text-body-sm text-on-surface-variant">Từ 4 sao</span>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input defaultChecked className="rounded-full border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" name="rating" type="radio" />
                <span className="text-body-sm text-on-surface-variant">Tất cả</span>
              </label>
            </div>
          </div>
          {/* Thứ trong tuần */}
          <div>
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Lịch học mong muốn</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full border border-outline-variant text-body-sm cursor-pointer hover:bg-surface-container-high transition-colors">T2</span>
              <span className="px-3 py-1.5 rounded-full border border-primary bg-primary-fixed text-on-primary-fixed font-medium text-body-sm cursor-pointer transition-colors">T3</span>
              <span className="px-3 py-1.5 rounded-full border border-outline-variant text-body-sm cursor-pointer hover:bg-surface-container-high transition-colors">T4</span>
              <span className="px-3 py-1.5 rounded-full border border-primary bg-primary-fixed text-on-primary-fixed font-medium text-body-sm cursor-pointer transition-colors">T5</span>
              <span className="px-3 py-1.5 rounded-full border border-outline-variant text-body-sm cursor-pointer hover:bg-surface-container-high transition-colors">T6</span>
              <span className="px-3 py-1.5 rounded-full border border-outline-variant text-body-sm cursor-pointer hover:bg-surface-container-high transition-colors">T7</span>
              <span className="px-3 py-1.5 rounded-full border border-outline-variant text-body-sm cursor-pointer hover:bg-surface-container-high transition-colors">CN</span>
            </div>
          </div>
        </div>
        {/* Class List Grid */}
        <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slide-up stagger-2">
          {/* Card 1 */}
          <div className="glass border border-white/20 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Mới</div>
            <div className="flex justify-between items-start mb-4 pr-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded text-[11px] font-semibold">Tiếng Anh</span>
                  <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Lớp 10</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-background line-clamp-1">Gia sư Tiếng Anh giao tiếp cơ bản</h3>
              </div>
            </div>
            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">location_on</span>
                <div>
                  <p className="text-body-sm font-medium text-on-surface">Quận 7, TP. Hồ Chí Minh</p>
                  <p className="text-[13px] text-on-surface-variant">Dạy trực tiếp (Offline)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
                <p className="text-body-sm font-medium text-on-surface">2 ca/tuần (Tối T3, T5)</p>
              </div><p className="text-[13px] text-on-surface-variant">19:00 - 21:00</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">payments</span>
                <div>
                  <p className="text-body-sm font-bold text-primary">250.000đ - 300.000đ <span className="text-on-surface-variant font-normal text-[13px]">/ giờ</span></p>
                </div>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-4 mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-sm">P</div>
                <div>
                  <p className="text-[13px] font-medium text-on-surface">Phụ huynh: Chị Mai</p>
                  <div className="flex items-center text-tertiary-fixed-dim">
                    <span className="material-symbols-outlined icon-fill text-[14px]">star</span>
                    <span className="text-[12px] text-on-surface-variant ml-1">4.8 (12 đánh giá)</span>
                  </div>
                </div>
              </div>
              <Link to="/tutor/apply-class" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
                Ứng tuyển ngay
              </Link>
            </div>
          </div>
          {/* Card 2 */}
          <div className="glass border border-white/20 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 pr-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded text-[11px] font-semibold">Toán học</span>
                  <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Luyện thi ĐH</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-background line-clamp-1">Luyện thi Đại học môn Toán khối A</h3>
              </div>
            </div>
            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">laptop_mac</span>
                <div>
                  <p className="text-body-sm font-medium text-on-surface">Học trực tuyến (Online)</p>
                  <p className="text-[13px] text-on-surface-variant">Qua Google Meet / Zoom</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
                <p className="text-body-sm font-medium text-on-surface">3 ca/tuần (T2, T4, T6)</p>
              </div><p className="text-[13px] text-on-surface-variant">18:00 - 20:00</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">payments</span>
                <div>
                  <p className="text-body-sm font-bold text-primary">350.000đ <span className="text-on-surface-variant font-normal text-[13px]">/ giờ</span></p>
                </div>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-4 mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-sm">A</div>
                <div>
                  <p className="text-[13px] font-medium text-on-surface">Phụ huynh: Anh Tuấn</p>
                  <div className="flex items-center text-tertiary-fixed-dim">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="text-[12px] text-on-surface-variant ml-1">Chưa có đánh giá</span>
                  </div>
                </div>
              </div>
              <Link to="/tutor/apply-class" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
                Ứng tuyển ngay
              </Link>
            </div>
          </div>
          {/* Card 3 */}
          <div className="glass border border-white/20 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 pr-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded text-[11px] font-semibold">Vật lý</span>
                  <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Lớp 12</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-background line-clamp-1">Kèm Vật lý 12 bám sát chương trình</h3>
              </div>
            </div>
            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">location_on</span>
                <div>
                  <p className="text-body-sm font-medium text-on-surface">Quận Cầu Giấy, Hà Nội</p>
                  <p className="text-[13px] text-on-surface-variant">Dạy trực tiếp (Offline)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
                <p className="text-body-sm font-medium text-on-surface">1 ca/tuần (Sáng CN)</p>
              </div><p className="text-[13px] text-on-surface-variant">08:00 - 10:00</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">payments</span>
                <div>
                  <p className="text-body-sm font-bold text-primary">200.000đ <span className="text-on-surface-variant font-normal text-[13px]">/ giờ</span></p>
                </div>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-4 mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-sm">H</div>
                <div>
                  <p className="text-[13px] font-medium text-on-surface">Phụ huynh: Cô Hoa</p>
                  <div className="flex items-center text-tertiary-fixed-dim">
                    <span className="material-symbols-outlined icon-fill text-[14px]">star</span>
                    <span className="text-[12px] text-on-surface-variant ml-1">5.0 (3 đánh giá)</span>
                  </div>
                </div>
              </div>
              <Link to="/tutor/apply-class" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
                Ứng tuyển ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSearchClasses;
