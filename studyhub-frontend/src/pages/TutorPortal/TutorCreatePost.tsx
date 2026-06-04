import React from 'react';

const TutorCreatePost: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-on-surface mb-2">Tạo tin tìm học viên</h1>
      <p className="text-on-surface-variant mb-8">Điền thông tin chi tiết để phụ huynh và học viên có thể tìm thấy bạn dễ dàng hơn.</p>
      
      <form className="bg-white rounded-xl p-8 border border-outline-variant flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Tiêu đề tin đăng</label>
          <input type="text" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Ví dụ: Nhận gia sư Toán cấp 2, 3 khu vực Cầu Giấy" />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Môn học</label>
            <select className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
              <option>Toán học</option>
              <option>Vật lý</option>
              <option>Tiếng Anh</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Hình thức dạy</label>
            <select className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
              <option>Online & Offline</option>
              <option>Chỉ Online</option>
              <option>Chỉ Offline</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Học phí đề xuất (VNĐ/ca)</label>
          <input type="number" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Ví dụ: 200000" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Giới thiệu chi tiết</label>
          <textarea className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary h-32" placeholder="Chia sẻ kinh nghiệm giảng dạy, thành tích học tập và phương pháp dạy của bạn..."></textarea>
        </div>

        <button type="button" className="mt-4 bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-container transition-colors shadow-sm">
          Đăng tin ngay
        </button>
      </form>
    </div>
  );
};

export default TutorCreatePost;
