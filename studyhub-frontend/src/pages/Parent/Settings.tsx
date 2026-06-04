import React, { useState } from 'react';
import { CURRENT_PARENT } from '../../constants/mockParentData';

const Settings: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [avatar, setAvatar] = useState(CURRENT_PARENT.avatar);
  const [fullName, setFullName] = useState(CURRENT_PARENT.name);
  const [phone, setPhone] = useState(CURRENT_PARENT.phone);
  const [address, setAddress] = useState(CURRENT_PARENT.address);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumbs / Title */}
      <div className="mb-8">
        <h2 className="font-bold text-3xl text-[#191c1e] mb-2">Quản lý hồ sơ</h2>
        <p className="text-[#434654] text-base font-normal">Cập nhật thông tin cá nhân của bạn để có trải nghiệm tốt nhất.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Avatar Management */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#c3c6d6] rounded-xl p-6 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#e7e8ea] shadow-sm mb-4">
                <img alt="Current Avatar" className="w-full h-full object-cover" src={avatar} />
              </div>
              <label className="absolute bottom-4 right-0 bg-[#003d9b] text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-105 transition-transform active:scale-95" htmlFor="avatar-upload">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>photo_camera</span>
                <input accept="image/*" className="hidden" id="avatar-upload" type="file" onChange={handleAvatarChange} />
              </label>
            </div>
            <h3 className="font-semibold text-xl mt-2 text-[#191c1e]">{fullName}</h3>
            <p className="text-[#434654] text-sm font-normal">Phụ huynh học sinh</p>

            <div className="w-full mt-6 pt-6 border-t border-[#c3c6d6] text-left space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003d9b] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>verified_user</span>
                <span className="text-sm font-medium text-[#191c1e]">Tài khoản đã xác minh</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#434654] text-sm" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>calendar_month</span>
                <span className="text-sm text-[#434654]">Tham gia từ tháng 10, 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#c3c6d6] rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#c3c6d6] flex justify-between items-center bg-[#f3f4f6]/30">
              <h3 className="font-semibold text-xl text-[#191c1e]">Thông tin cá nhân</h3>
              <span className="text-sm font-semibold text-[#003d9b] bg-[#0052cc]/10 px-2 py-1 rounded">Chỉnh sửa</span>
            </div>
            <form className="p-8 space-y-6" onSubmit={handleSaveProfile}>
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block font-semibold text-sm text-[#434654]" htmlFor="fullname">Họ và tên</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737685] text-sm">person</span>
                  <input 
                    className="w-full pl-10 pr-4 py-3 bg-[#f8f9fb] rounded-lg border border-[#c3c6d6] focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all outline-none text-base text-[#191c1e]" 
                    id="fullname" 
                    placeholder="Nhập họ và tên đầy đủ" 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-semibold text-sm text-[#434654]" htmlFor="phone">Số điện thoại</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737685] text-sm">call</span>
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-[#f8f9fb] rounded-lg border border-[#c3c6d6] focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all outline-none text-base text-[#191c1e]" 
                      id="phone" 
                      placeholder="0xxx xxx xxx" 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-semibold text-sm text-[#434654]" htmlFor="email">Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737685] text-sm">mail</span>
                    <input 
                      className="w-full pl-10 pr-4 py-3 bg-[#f3f4f6]/50 rounded-lg border border-[#c3c6d6] cursor-not-allowed text-[#737685] text-base" 
                      id="email" 
                      readOnly 
                      title="Email cannot be changed" 
                      type="email" 
                      value={CURRENT_PARENT.email} 
                    />
                  </div>
                  <p className="text-[10px] text-[#737685] italic mt-1">Vui lòng liên hệ hỗ trợ để đổi email</p>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block font-semibold text-sm text-[#434654]" htmlFor="address">Địa chỉ học tập</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-4 text-[#737685] text-sm">location_on</span>
                  <textarea 
                    className="w-full pl-10 pr-4 py-3 bg-[#f8f9fb] rounded-lg border border-[#c3c6d6] focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all outline-none text-base text-[#191c1e]" 
                    id="address" 
                    placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố" 
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <p className="text-xs font-medium text-[#737685] flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Địa chỉ này giúp gia sư xác định khu vực giảng dạy phù hợp.
                </p>
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t border-[#c3c6d6] flex items-center justify-end gap-4">
                <button className="px-6 py-2.5 rounded-full font-semibold text-sm text-[#434654] hover:bg-[#e7e8ea] transition-colors active:scale-95" type="button">Hủy</button>
                <button className="px-8 py-2.5 rounded-full font-semibold text-sm bg-[#003d9b] text-white shadow-md hover:opacity-90 transition-all active:scale-95" type="submit">Lưu thay đổi</button>
              </div>
            </form>
          </div>

          <div className="bg-white border border-[#c3c6d6] rounded-xl overflow-hidden shadow-sm mt-8">
            <div className="p-6 border-b border-[#c3c6d6] flex justify-between items-center bg-[#f3f4f6]/30">
              <h3 className="font-semibold text-xl text-[#191c1e]">Đổi mật khẩu</h3>
            </div>
            <form className="p-8 space-y-6" onSubmit={handleSavePassword}>
              <div className="space-y-2">
                <label className="block font-semibold text-sm text-[#434654]" htmlFor="current-password">Mật khẩu hiện tại</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737685] text-sm">lock</span>
                  <input className="w-full pl-10 pr-4 py-3 bg-[#f8f9fb] rounded-lg border border-[#c3c6d6] focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all outline-none text-base text-[#191c1e]" id="current-password" placeholder="••••••••" type="password" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-semibold text-sm text-[#434654]" htmlFor="new-password">Mật khẩu mới</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737685] text-sm">password</span>
                    <input className="w-full pl-10 pr-4 py-3 bg-[#f8f9fb] rounded-lg border border-[#c3c6d6] focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all outline-none text-base text-[#191c1e]" id="new-password" placeholder="••••••••" type="password" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-semibold text-sm text-[#434654]" htmlFor="confirm-password">Xác nhận mật khẩu mới</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737685] text-sm">verified</span>
                    <input className="w-full pl-10 pr-4 py-3 bg-[#f8f9fb] rounded-lg border border-[#c3c6d6] focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/20 transition-all outline-none text-base text-[#191c1e]" id="confirm-password" placeholder="••••••••" type="password" required />
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[#c3c6d6] flex items-center justify-end">
                <button className="px-8 py-2.5 rounded-full font-semibold text-sm bg-[#003d9b] text-white shadow-md hover:opacity-90 transition-all active:scale-95" type="submit">Cập nhật mật khẩu</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[#191c1e] text-white py-3 px-6 rounded-lg shadow-xl transition-all duration-300 flex items-center gap-3 z-[60]">
          <span className="material-symbols-outlined text-green-400">check_circle</span>
          <span className="font-semibold text-sm">Đã cập nhật hồ sơ thành công!</span>
        </div>
      )}
    </div>
  );
};

export default Settings;
