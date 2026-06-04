import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const [isOffline, setIsOffline] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      navigate('/parent/posts');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div>
        <h1 className="font-bold text-3xl text-[#191c1e] mb-2">Đăng tin tuyển dụng</h1>
        <p className="font-normal text-base text-[#434654] max-w-2xl">
          Tìm kiếm gia sư phù hợp nhất cho con của bạn bằng cách điền chi tiết yêu cầu bên dưới. Tin tuyển dụng sẽ được hiển thị ngay sau khi phê duyệt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white border border-[#c3c6d6] rounded-xl p-8 shadow-sm">
            {/* Row 1: Subject & Grade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="font-semibold text-sm text-[#191c1e] block">Môn học</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg px-4 py-3 pr-10 focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 outline-none transition-all font-normal text-base">
                    <option disabled selected value="">Chọn môn học</option>
                    <option>Toán học</option>
                    <option>Ngữ văn</option>
                    <option>Tiếng Anh</option>
                    <option>Vật lý</option>
                    <option>Hóa học</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#434654]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>expand_more</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-sm text-[#191c1e] block">Lớp</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg px-4 py-3 pr-10 focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 outline-none transition-all font-normal text-base">
                    <option disabled selected value="">Chọn lớp</option>
                    <optgroup label="Tiểu học">
                      <option>Lớp 1</option><option>Lớp 2</option><option>Lớp 3</option><option>Lớp 4</option><option>Lớp 5</option>
                    </optgroup>
                    <optgroup label="Trung học">
                      <option>Lớp 6</option><option>Lớp 7</option><option>Lớp 8</option><option>Lớp 9</option>
                    </optgroup>
                    <optgroup label="Phổ thông">
                      <option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option>
                    </optgroup>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#434654]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>expand_more</span>
                </div>
              </div>
            </div>

            {/* Row 2: Free Time */}
            <div className="mb-8">
              <label className="font-semibold text-sm text-[#191c1e] block mb-4">Thời gian rảnh (Các buổi trong tuần)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'].map(day => (
                  <label key={day} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input className="peer hidden" type="checkbox" />
                    <div className="w-full py-3 px-1 text-center rounded-lg border border-[#c3c6d6] bg-[#f8f9fb] group-hover:bg-[#edeef0] transition-all peer-checked:bg-[#dae2ff] peer-checked:border-[#003d9b] peer-checked:text-[#001848]">
                      <span className="font-medium text-xs">{day}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Row 3: Format & Location Logic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="font-semibold text-sm text-[#191c1e] block">Hình thức học</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input className="peer hidden" name="format" type="radio" value="online" checked={!isOffline} onChange={() => setIsOffline(false)} />
                    <div className="flex items-center justify-center gap-2 py-3 border border-[#c3c6d6] rounded-lg bg-[#f8f9fb] peer-checked:bg-[#003d9b] peer-checked:text-white peer-checked:border-[#003d9b] transition-all">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>videocam</span>
                      <span className="font-semibold text-sm">Online</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input className="peer hidden" name="format" type="radio" value="offline" checked={isOffline} onChange={() => setIsOffline(true)} />
                    <div className="flex items-center justify-center gap-2 py-3 border border-[#c3c6d6] rounded-lg bg-[#f8f9fb] peer-checked:bg-[#003d9b] peer-checked:text-white peer-checked:border-[#003d9b] transition-all">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>location_on</span>
                      <span className="font-semibold text-sm">Offline</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-sm text-[#191c1e] block">Mức lương đề xuất (VNĐ/buổi)</label>
                <input className="w-full bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg px-4 py-3 focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 outline-none transition-all font-normal text-base" placeholder="Ví dụ: 200,000" type="number" />
              </div>
            </div>

            {/* Hidden Location Fields */}
            {isOffline && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-300">
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-[#191c1e] block">Thành phố</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg px-4 py-3 pr-10 focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 outline-none transition-all font-normal text-base">
                      <option>Hà Nội</option>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Đà Nẵng</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#434654]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-[#191c1e] block">Địa chỉ chi tiết</label>
                  <input className="w-full bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg px-4 py-3 focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 outline-none transition-all font-normal text-base" placeholder="Số nhà, tên đường..." type="text" />
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="space-y-2 mb-10">
              <label className="font-semibold text-sm text-[#191c1e] block">Yêu cầu đặc biệt</label>
              <textarea className="w-full bg-[#f8f9fb] border border-[#c3c6d6] rounded-lg px-4 py-3 focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 outline-none transition-all font-normal text-base resize-none" placeholder="Ví dụ: Cần gia sư nữ, sinh viên trường Ngoại Thương, có kinh nghiệm dạy trẻ tự kỷ..." rows={4}></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button className="w-full md:w-auto px-10 py-4 bg-[#003d9b] text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2" type="submit">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                Đăng tin tuyển dụng
              </button>
            </div>
          </form>
        </div>

        {/* Info Section (Bento Card Style) */}
        <div className="space-y-6">
          {/* Tips Card */}
          <div className="bg-[#003d9b] text-[#c4d2ff] p-8 rounded-xl overflow-hidden relative">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-4 opacity-80" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>tips_and_updates</span>
              <h3 className="font-semibold text-xl mb-2 text-white">Mẹo tìm gia sư</h3>
              <ul className="space-y-3 font-normal text-sm opacity-90">
                <li className="flex gap-2">
                  <span className="material-symbols-outlined text-sm mt-1">check_circle</span>
                  <span>Mô tả chi tiết năng lực học tập hiện tại của học sinh.</span>
                </li>
                <li className="flex gap-2">
                  <span className="material-symbols-outlined text-sm mt-1">check_circle</span>
                  <span>Đặt mức lương cạnh tranh để thu hút gia sư giỏi.</span>
                </li>
                <li className="flex gap-2">
                  <span className="material-symbols-outlined text-sm mt-1">check_circle</span>
                  <span>Xác định rõ mục tiêu cuối cùng (ví dụ: thi đại học).</span>
                </li>
              </ul>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          {/* Statistics Card */}
          <div className="bg-[#f3f4f6] border border-[#c3c6d6] p-6 rounded-xl">
            <h4 className="font-semibold text-sm mb-4 text-[#191c1e]">Thống kê thị trường</h4>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <p className="font-medium text-xs text-[#434654]">Lương trung bình Toán 12</p>
                <p className="font-semibold text-xl text-[#00687b]">250,000đ <span className="text-xs font-normal">/ buổi</span></p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-medium text-xs text-[#434654]">Gia sư đang sẵn sàng</p>
                <p className="font-semibold text-xl text-[#00687b]">1,240+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
