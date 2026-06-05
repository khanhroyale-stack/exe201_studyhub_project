import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDb } from '../../services/mockDb';
import { UnifiedPost, PostStatus } from '../../types/shared';
import { CURRENT_PARENT } from '../../constants/mockParentData';

const CreatePost: React.FC = () => {
  const [isOffline, setIsOffline] = useState(true);
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState('');
  const [req, setReq] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !price) {
      alert('Vui lòng điền đầy đủ môn học và mức lương');
      return;
    }
    
    const newPost: UnifiedPost = {
      id: `jp${Date.now()}`,
      parentId: CURRENT_PARENT.id,
      parentName: CURRENT_PARENT.name,
      parentAvatar: CURRENT_PARENT.avatar,
      title: `Tìm gia sư ${subject}`,
      subject: subject,
      description: req || 'Cần tìm gia sư.',
      postedAt: new Date().toISOString(),
      status: PostStatus.PENDING_APPROVAL,
      location: isOffline ? 'Hà Nội' : 'Học Online',
      schedule: '2 buổi/tuần',
      pricePerSession: parseInt(price, 10) || 0,
      learningMode: isOffline ? 'OFFLINE' : 'ONLINE',
      requirement: req
    };

    const currentPosts = mockDb.getPosts();
    mockDb.savePosts([newPost, ...currentPosts]);

    alert('Đăng tin thành công! Bài đăng của bạn đang chờ Admin duyệt.');
    navigate('/parent/posts');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div>
        <h1 className="font-bold text-3xl text-on-surface mb-2">Đăng tin tuyển dụng</h1>
        <p className="font-normal text-base text-on-surface-variant max-w-2xl">
          Tìm kiếm gia sư phù hợp nhất cho con của bạn bằng cách điền chi tiết yêu cầu bên dưới. Tin tuyển dụng sẽ được hiển thị ngay sau khi phê duyệt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
            {/* Row 1: Subject & Grade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="font-semibold text-sm text-on-surface block">Môn học</label>
                <div className="relative">
                  <select 
                    value={subject} 
                    onChange={e => setSubject(e.target.value)}
                    className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-3 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal text-base"
                  >
                    <option disabled value="">Chọn môn học</option>
                    <option>Toán học</option>
                    <option>Ngữ văn</option>
                    <option>Tiếng Anh</option>
                    <option>Vật lý</option>
                    <option>Hóa học</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>expand_more</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-sm text-on-surface block">Lớp</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-3 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal text-base">
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
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>expand_more</span>
                </div>
              </div>
            </div>

            {/* Row 2: Free Time */}
            <div className="mb-8">
              <label className="font-semibold text-sm text-on-surface block mb-4">Thời gian rảnh (Các ca trong tuần)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'].map(day => (
                  <label key={day} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <input className="peer hidden" type="checkbox" />
                    <div className="w-full py-3 px-1 text-center rounded-lg border border-outline-variant bg-surface group-hover:bg-surface-container transition-all peer-checked:bg-primary-fixed peer-checked:border-primary peer-checked:text-on-primary-fixed">
                      <span className="font-medium text-xs">{day}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Row 3: Format & Location Logic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="font-semibold text-sm text-on-surface block">Hình thức học</label>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input className="peer hidden" name="format" type="radio" value="online" checked={!isOffline} onChange={() => setIsOffline(false)} />
                    <div className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-lg bg-surface peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>videocam</span>
                      <span className="font-semibold text-sm">Online</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input className="peer hidden" name="format" type="radio" value="offline" checked={isOffline} onChange={() => setIsOffline(true)} />
                    <div className="flex items-center justify-center gap-2 py-3 border border-outline-variant rounded-lg bg-surface peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>location_on</span>
                      <span className="font-semibold text-sm">Offline</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-sm text-on-surface block">Mức lương đề xuất (VNĐ/ca)</label>
                <input value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal text-base" placeholder="Ví dụ: 200,000" type="number" />
              </div>
            </div>

            {/* Hidden Location Fields */}
            {isOffline && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-300">
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-on-surface block">Thành phố</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-3 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal text-base">
                      <option>Hà Nội</option>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Đà Nẵng</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-sm text-on-surface block">Địa chỉ chi tiết</label>
                  <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal text-base" placeholder="Số nhà, tên đường..." type="text" />
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="space-y-2 mb-10">
              <label className="font-semibold text-sm text-on-surface block">Yêu cầu đặc biệt</label>
              <textarea value={req} onChange={e => setReq(e.target.value)} className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-normal text-base resize-none" placeholder="Ví dụ: Cần gia sư nữ, sinh viên trường Ngoại Thương, có kinh nghiệm dạy trẻ tự kỷ..." rows={4}></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2" type="submit">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                Đăng tin tuyển dụng
              </button>
            </div>
          </form>
        </div>

        {/* Info Section (Bento Card Style) */}
        <div className="space-y-6">
          {/* Tips Card */}
          <div className="bg-primary text-on-primary-container p-8 rounded-xl overflow-hidden relative">
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
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
            <h4 className="font-semibold text-sm mb-4 text-on-surface">Thống kê thị trường</h4>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <p className="font-medium text-xs text-on-surface-variant">Lương trung bình Toán 12</p>
                <p className="font-semibold text-xl text-secondary">250,000đ <span className="text-xs font-normal">/ ca</span></p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="font-medium text-xs text-on-surface-variant">Gia sư đang sẵn sàng</p>
                <p className="font-semibold text-xl text-secondary">1,240+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
