import React from 'react';
import { MOCK_CLASSES } from '../../constants/mockParentData';

const ClassManagement: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-bold text-3xl text-[#191c1e] mb-2">Quản lý lớp học</h1>
          <p className="font-normal text-base text-[#434654]">Theo dõi tiến độ học tập và đánh giá gia sư cho con em bạn.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#c3c6d6] rounded-lg text-[#191c1e] font-semibold text-sm hover:bg-[#edeef0] transition-colors">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>calendar_today</span>
            Xem theo tháng
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#003d9b] text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>add</span>
            Đăng ký lớp mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Schedule & Sessions (Bento Style) */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          {/* Current Week Grid */}
          <div className="bg-white border border-[#c3c6d6] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl text-[#191c1e]">Lịch học tuần này</h3>
              <div className="flex items-center gap-2 text-[#434654]">
                <span className="material-symbols-outlined cursor-pointer hover:text-[#003d9b]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_left</span>
                <span className="font-semibold text-sm">20 May - 26 May, 2026</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-[#003d9b]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_right</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-[#c3c6d6]">
                <span className="font-medium text-xs text-[#434654]">T2</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold">20</span>
              </div>
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-[#c3c6d6]">
                <span className="font-medium text-xs text-[#434654]">T3</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold">21</span>
              </div>
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-[#c3c6d6] bg-[#003d9b]/10 rounded-t-lg">
                <span className="font-medium text-xs text-[#003d9b]">T4</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold bg-[#003d9b] text-white rounded-full">22</span>
              </div>
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-[#c3c6d6]">
                <span className="font-medium text-xs text-[#434654]">T5</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold">23</span>
              </div>
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-[#c3c6d6]">
                <span className="font-medium text-xs text-[#434654]">T6</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold">24</span>
              </div>
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-[#c3c6d6]">
                <span className="font-medium text-xs text-[#434654]">T7</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold">25</span>
              </div>
              <div className="flex flex-col items-center gap-2 pb-4 border-b border-[#c3c6d6] text-[#ba1a1a]">
                <span className="font-medium text-xs">CN</span>
                <span className="w-8 h-8 flex items-center justify-center font-bold">26</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              {MOCK_CLASSES.map((session) => (
                <div key={session.id} className="flex items-center gap-4 p-4 rounded-lg bg-[#f3f4f6] border border-[#c3c6d6] group hover:shadow-md transition-shadow">
                  <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg text-[#003d9b] shrink-0 ${session.status === 'COMPLETED' ? 'bg-[#e7e8ea]' : 'bg-[#0052cc]/10 border border-[#0052cc]/20'}`}>
                    <span className="font-bold text-sm">18:00</span>
                    <span className="text-[10px]">90 Phút</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[#afecff] text-[#005f71] text-[10px] font-bold rounded uppercase">
                        Học
                      </span>
                      {session.status === 'COMPLETED' ? (
                        <span className="flex items-center gap-1 text-[12px] text-[#434654]">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>done_all</span> Đã dạy
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[12px] text-[#434654] italic">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>schedule</span> Chưa dạy
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-[16px] mb-0.5 text-[#191c1e]">{session.className}</h4>
                    <p className="font-normal text-[13px] text-[#434654]">Gia sư: {session.tutorName}</p>
                  </div>
                  <button 
                    className={`px-4 py-2 font-semibold text-sm rounded-lg transition-opacity ${session.status === 'COMPLETED' ? 'bg-[#ffddb3] text-[#7d5200] hover:opacity-90' : 'border border-[#737685] text-[#737685] cursor-not-allowed'}`}
                    disabled={session.status !== 'COMPLETED'}
                  >
                    Đánh giá
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Stats & Quick Info */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          {/* Stats Card */}
          <div className="bg-[#003d9b] text-white rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 opacity-80">Tổng quan tháng 5</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-bold">12/16</p>
                    <p className="font-normal text-sm opacity-80">Buổi đã hoàn thành</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">75%</p>
                    <div className="w-24 h-1.5 bg-white/20 rounded-full mt-1">
                      <div className="w-[75%] h-full bg-[#50dcff] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>
          
          {/* Tutor Summary */}
          <div className="bg-white border border-[#c3c6d6] rounded-xl p-6">
            <h3 className="font-semibold text-xl mb-4 text-[#191c1e]">Gia sư hiện tại</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img alt="Tutor" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-4y8nsXk8IJLQ-oInrr9sod8-x5tL0dbYwezBTyf6rurKnK98RHOmpL0Vr9iJtiB5hmSwd8KWn-wM4mRkAqNlGSihrdND2hWgL1gFm-H80ZVB-ID9VtvhEbAt0363kSCzNYVD8kkNVgkFg37UP-fiXIR1NK9HkGiRi169DWf_D5Gop1g7cb6NhPbP0XlLlLKMxWFmE-G-36pihHwGmQuuY1qUx_JmX8rmwz9ujBDVwvMVSL_j7vBNlZlUF6dRYL-sV0xiXzPCtzel" />
                <div>
                  <p className="font-semibold text-sm text-[#191c1e]">ThS. Nguyễn Văn An</p>
                  <p className="text-[12px] text-[#434654]">Môn Toán - 4.9 ★</p>
                </div>
                <button className="ml-auto material-symbols-outlined text-[#003d9b]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chat</button>
              </div>
              <div className="flex items-center gap-3">
                <img alt="Tutor" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD4W3LCYuq4kJO0tcpxxsuLRYaXd1HZQ-8U5yvhyxrrYkVh1onmzNifxV3Ew5wKZtuUb4iY0Mle2yeUzzzULZk8bwEwF2rRgKLJtuXGjr-up9XFE5J-77ryUP2APPzBcqTFAN0vpd3nXHx5Mntaknc4nSeQCbfvGNGgvCheV0rCGMqdu6h4x2M7F3QEbglSvN-1ZFSQEy55w3GWwf_Rr-QdIzFR0yea5Gk38qmsQZO8PO5lv45Y8xx6NrhWfkRMUEUMQsylfrJx0H1" />
                <div>
                  <p className="font-semibold text-sm text-[#191c1e]">Lê Minh (IELTS)</p>
                  <p className="text-[12px] text-[#434654]">Tiếng Anh - 5.0 ★</p>
                </div>
                <button className="ml-auto material-symbols-outlined text-[#003d9b]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chat</button>
              </div>
            </div>
            <button className="w-full mt-6 py-2 border border-[#003d9b] text-[#003d9b] font-semibold text-sm rounded-lg hover:bg-[#003d9b]/5 transition-colors">
              Xem tất cả gia sư
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
