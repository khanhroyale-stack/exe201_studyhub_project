import React from 'react';

const TutorSettings: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Top App Bar (Contextual Actions) */}
      <header className="h-[72px] glass border-b border-white/20 flex items-center justify-between -mx-4 md:-mx-8 px-4 md:px-8 mb-6 sticky top-0 z-30 animate-slide-up">
        <div className="flex items-center gap-4">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Cập nhật hồ sơ chuyên môn</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full flex items-center gap-1 border border-outline-variant">
            <span className="material-symbols-outlined text-[16px]">edit_document</span>
            Trạng thái: DRAFT
          </span>
          <button className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
            Gửi xét duyệt
          </button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="max-w-[1440px] mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Section 1: Thông tin định danh */}
          <section className="lg:col-span-8 glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up stagger-1 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">1. Thông tin định danh</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Thông tin cơ bản để xác thực danh tính của bạn.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Họ và tên <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface" placeholder="VD: Nguyễn Văn A" type="text" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Ngày sinh <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface" type="date" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface">Địa chỉ thường trú <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" type="text" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface">Số điện thoại liên hệ <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface" placeholder="09xxxxxxxxx" type="tel" />
              </div>
            </div>
          </section>

          {/* Status / Help Card */}
          <aside className="lg:col-span-4 glass border border-primary/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-md hover:-translate-y-1 transition-all duration-300 animate-slide-up stagger-2 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary text-[32px] mb-4">verified_user</span>
              <h4 className="font-headline-sm text-headline-sm text-primary-dark mb-2">Quy trình duyệt hồ sơ</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Hồ sơ của bạn cần được ban quản trị xét duyệt trước khi có thể nhận lớp. Hãy đảm bảo thông tin chính xác và rõ nét.</p>
              <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary">check_circle</span> Thời gian duyệt: 24h - 48h</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary">check_circle</span> Hình ảnh chụp bản gốc, không bị lóa</li>
              </ul>
            </div>
            <button className="mt-6 w-full py-3 bg-surface-container-lowest text-primary font-label-md text-label-md rounded-lg border border-primary hover:bg-surface transition-colors relative z-10 shadow-sm">
              Lưu bản nháp
            </button>
          </aside>

          {/* Section 2: eKYC */}
          <section className="lg:col-span-12 glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 mt-2 animate-slide-up stagger-3">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">id_card</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">2. Xác thực eKYC</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Tải lên hình ảnh Căn cước công dân và ảnh chân dung chụp cùng CCCD.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Front ID */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface text-center">Mặt trước CCCD <span className="text-error">*</span></span>
                <div className="upload-dashed h-48 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-surface-container-low transition-colors group relative overflow-hidden border-2 border-dashed border-outline-variant rounded-xl">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[40px] mb-2 transition-colors">add_photo_alternate</span>
                  <span className="font-body-sm text-body-sm text-outline group-hover:text-primary transition-colors">Kéo thả hoặc nhấn để tải ảnh</span>
                  <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                </div>
              </div>
              {/* Back ID */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface text-center">Mặt sau CCCD <span className="text-error">*</span></span>
                <div className="upload-dashed h-48 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-surface-container-low transition-colors group relative overflow-hidden border-2 border-dashed border-outline-variant rounded-xl">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[40px] mb-2 transition-colors">add_photo_alternate</span>
                  <span className="font-body-sm text-body-sm text-outline group-hover:text-primary transition-colors">Kéo thả hoặc nhấn để tải ảnh</span>
                  <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                </div>
              </div>
              {/* Selfie */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface text-center">Ảnh chân dung <span className="text-error">*</span></span>
                <div className="upload-dashed h-48 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-surface-container-low transition-colors group relative overflow-hidden border-2 border-dashed border-outline-variant rounded-xl">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[40px] mb-2 transition-colors">face</span>
                  <span className="font-body-sm text-body-sm text-outline group-hover:text-primary transition-colors">Kéo thả hoặc nhấn để tải ảnh</span>
                  <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 & 4 Container */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-gutter mt-2 animate-slide-up stagger-4">
            {/* Section 3: Học vấn */}
            <section className="glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">3. Học vấn &amp; Kinh nghiệm</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Thông tin trường học và kinh nghiệm giảng dạy.</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Trường Đại học/Cao đẳng <span className="text-error">*</span></label>
                  <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface" placeholder="VD: Đại học Sư phạm Hà Nội" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface">Chuyên ngành</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface" placeholder="VD: Sư phạm Toán" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface">Số năm kinh nghiệm</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface appearance-none cursor-pointer">
                      <option>Chưa có kinh nghiệm</option>
                      <option>Dưới 1 năm</option>
                      <option>1 - 3 năm</option>
                      <option>Trên 3 năm</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Bằng cấp / Thẻ sinh viên minh chứng <span className="text-error">*</span></label>
                  <div className="border border-outline-variant rounded-lg p-4 bg-surface flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div>
                        <p className="font-label-sm text-label-sm text-on-surface">Chưa có tệp nào được chọn</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">Định dạng JPG, PNG hoặc PDF (Tối đa 5MB)</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface-variant">Tải lên</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Chứng chỉ */}
            <section className="glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-6 border-b border-outline-variant pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined">workspace_premium</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">4. Chứng chỉ (Tùy chọn)</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">IELTS, TOEIC, Giải thưởng quốc gia...</p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors tooltip" title="Thêm chứng chỉ">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
              {/* Empty State for Certifications */}
              <div className="h-[240px] border-2 border-dashed border-outline-variant rounded-xl bg-surface flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-[48px] text-surface-container-highest mb-3">military_tech</span>
                <h5 className="font-label-md text-label-md text-on-surface mb-1">Chưa có chứng chỉ nào</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Thêm các chứng chỉ liên quan để tăng độ uy tín cho hồ sơ của bạn.</p>
                <button className="px-4 py-2 bg-transparent border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span> Thêm mới
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Action Bar (Mobile floating) */}
        <div className="mt-8 mb-4 md:hidden flex flex-col gap-3">
          <button className="w-full py-3 bg-surface-container-highest text-on-surface-variant font-label-md text-label-md rounded-lg border border-outline-variant hover:bg-surface transition-colors">
            Lưu bản nháp
          </button>
          <button className="w-full py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-md">
            Gửi xét duyệt hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorSettings;
