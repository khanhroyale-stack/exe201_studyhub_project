import React, { useState } from 'react';

const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'master-data' | 'moderation' | 'disputes' | 'financial'>('moderation');

  return (
    <div className="max-w-[1440px] mx-auto pb-20 animate-fade-in">
      {/* Page Header & Internal Nav */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant pb-4 mb-8 animate-slide-up">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Nội dung &amp; Điều phối</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Quản lý danh mục, kiểm duyệt bài đăng và xử lý khiếu nại.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mb-6">
          <button 
            onClick={() => setActiveTab('master-data')}
            className={`px-4 py-2 border-b-2 font-label-md text-label-md whitespace-nowrap ${activeTab === 'master-data' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
          >
            Dữ liệu Hệ thống
          </button>
          <button 
            onClick={() => setActiveTab('moderation')}
            className={`px-4 py-2 border-b-2 font-label-md text-label-md whitespace-nowrap ${activeTab === 'moderation' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
          >
            Kiểm duyệt Nội dung
          </button>
          <button 
            onClick={() => setActiveTab('disputes')}
            className={`px-4 py-2 border-b-2 font-label-md text-label-md whitespace-nowrap ${activeTab === 'disputes' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
          >
            Xử lý Khiếu nại
          </button>
        </div>
      </div>

      {/* TAB CONTENT: Master Data */}
      {activeTab === 'master-data' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up stagger-1">
          {/* Subjects */}
          <div className="glass border border-white/20 rounded-2xl flex flex-col h-[500px] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container/30 rounded-t-2xl">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Môn học</h3>
              <button className="text-primary hover:bg-primary-container/20 p-1 rounded-lg transition-colors"><span className="material-symbols-outlined">add</span></button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <ul className="flex flex-col gap-1">
                <li className="flex justify-between items-center p-3 hover:bg-surface-container-low rounded-lg group">
                  <span className="font-body-sm text-body-sm text-on-surface">Toán cao cấp</span>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                    <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button className="text-error hover:text-error/80"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </li>
                <li className="flex justify-between items-center p-3 hover:bg-surface-container-low rounded-lg group">
                  <span className="font-body-sm text-body-sm text-on-surface">Hóa hữu cơ</span>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                    <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button className="text-error hover:text-error/80"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Content Moderation */}
      {activeTab === 'moderation' && (
        <div className="flex flex-col gap-6 animate-slide-up stagger-1">
          <div className="flex justify-between items-center">
            <h2 className="font-headline-md text-headline-md text-on-surface">Bài đăng chờ duyệt</h2>
            <div className="flex gap-2">
              <select className="glass border border-white/20 rounded-xl px-3 py-2 font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                <option>Sắp xếp: Mới nhất</option>
                <option>Sắp xếp: Bị gắn cờ</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Moderation Card 1 */}
            <div className="glass border border-white/20 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 relative group hover:-translate-y-1">
              <div className="absolute top-4 right-4 px-2 py-1 bg-tertiary-container/30 text-tertiary-container font-label-sm text-label-sm rounded-lg flex items-center gap-1 backdrop-blur-sm border border-tertiary-container/20">
                <span className="material-symbols-outlined text-[14px]">flag</span> Bị gắn cờ
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Cần làm hộ bài thi Toán! Trả giá cao</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Đăng bởi: Phụ huynh A • 2 giờ trước</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-primary-container/10 text-primary px-2 py-1 rounded font-label-sm text-label-sm">Toán</span>
                <span className="bg-surface-container-high text-on-surface px-2 py-1 rounded font-label-sm text-label-sm">Cấp 3</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface line-clamp-3">Tôi cần người làm bài kiểm tra cuối kì cho con tôi. Giá bao nhiêu cũng được. Phải chắc chắn được điểm A. Liên hệ ngoài Zalo.</p>
              <div className="mt-auto pt-4 border-t border-outline-variant flex gap-3">
                <button className="flex-1 bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-md text-label-md py-2 rounded-lg transition-colors border border-outline-variant">Xóa &amp; Cảnh cáo</button>
                <button className="flex-1 bg-primary text-on-primary hover:bg-primary/90 font-label-md text-label-md py-2 rounded-lg transition-colors">Duyệt</button>
              </div>
            </div>
            
            {/* Moderation Card 2 */}
            <div className="glass border border-white/20 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Tìm gia sư Sinh học lớp 10 dài hạn</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Đăng bởi: Trần V. • 5 giờ trước</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-primary-container/10 text-primary px-2 py-1 rounded font-label-sm text-label-sm">Sinh học</span>
                <span className="bg-surface-container-high text-on-surface px-2 py-1 rounded font-label-sm text-label-sm">Cấp 3</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface line-clamp-3">Tìm gia sư có thể dạy ôn tập các khái niệm sinh học tế bào vào tối thứ 3 hàng tuần. Ưu tiên sinh viên Y Dược hoặc Sư phạm Sinh.</p>
              <div className="mt-auto pt-4 border-t border-outline-variant flex gap-3">
                <button className="flex-1 bg-surface-container-lowest text-error hover:bg-error-container/20 font-label-md text-label-md py-2 rounded-lg transition-colors border border-error/50">Xóa</button>
                <button className="flex-1 bg-primary text-on-primary hover:bg-primary/90 font-label-md text-label-md py-2 rounded-lg transition-colors">Duyệt bài</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Dispute Handling */}
      {activeTab === 'disputes' && (
        <div className="h-[600px] glass border border-white/20 rounded-2xl overflow-hidden flex shadow-sm animate-slide-up stagger-1">
          {/* Left: Chat Log */}
          <div className="w-1/2 border-r border-outline-variant flex flex-col bg-surface-container/30">
            <div className="p-4 border-b border-outline-variant bg-surface-container/50 flex justify-between items-center">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Khiếu nại: D-8924</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Gia sư: Michael T. vs Phụ huynh: Elena R.</p>
              </div>
              <span className="bg-error-container text-on-error-container px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span> Active
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {/* Message Tutor */}
              <div className="flex gap-3 max-w-[85%] self-start">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center text-on-secondary-container font-label-md">MT</div>
                <div className="bg-surface-container-low p-3 rounded-2xl rounded-tl-none border border-outline-variant">
                  <p className="font-body-sm text-body-sm text-on-surface">Chào Elena, tôi đã chờ trong Zoom 20 phút mà không thấy Liam vào. Theo quy định, ca học này vẫn tính phí.</p>
                  <span className="text-[10px] text-on-surface-variant mt-1 block">12 Th10, 4:25 CH</span>
                </div>
              </div>
              {/* Message Parent */}
              <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center text-on-primary-container font-label-md">ER</div>
                <div className="bg-primary/10 p-3 rounded-2xl rounded-tr-none border border-primary/20">
                  <p className="font-body-sm text-body-sm text-on-surface">Tôi đã nhắn tin trước 1 tiếng là có việc khẩn cấp gia đình. Thật không công bằng khi tính phí cho một trường hợp y tế khẩn cấp.</p>
                  <span className="text-[10px] text-on-surface-variant mt-1 block text-right">12 Th10, 5:10 CH</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Resolution Panel */}
          <div className="w-1/2 flex flex-col bg-surface-container/10">
            <div className="p-6 border-b border-outline-variant">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Tóm tắt sự việc</h3>
              <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
                <ul className="font-body-sm text-body-sm text-on-surface space-y-2 list-disc pl-4">
                  <li><strong>Vấn đề:</strong> Phí huỷ lớp phút chót (200.000đ)</li>
                  <li><strong>Quy định:</strong> Cần báo trước 24h trừ khi có minh chứng y tế.</li>
                  <li><strong>Hệ thống:</strong> Phụ huynh gửi tin nhắn 55 phút trước giờ học.</li>
                </ul>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Quyết định của Admin</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Kết quả xử lý</label>
                  <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Chọn kết quả...</option>
                    <option>Giữ nguyên phí (Trích cho Gia sư)</option>
                    <option>Hoàn tiền (Gia sư mất phí)</option>
                    <option>Hoàn tiền (Nền tảng bù lỗ)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">Ghi chú nội bộ</label>
                  <textarea className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Lý do cho quyết định này..." rows={4}></textarea>
                </div>
              </div>
              <div className="mt-auto pt-4 flex gap-4">
                <button className="flex-1 bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low font-label-md text-label-md py-2.5 rounded-lg transition-colors">Cần thêm thông tin</button>
                <button className="flex-1 bg-primary text-on-primary hover:bg-primary/90 font-label-md text-label-md py-2.5 rounded-lg transition-colors shadow-sm">Thực thi quyết định</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
