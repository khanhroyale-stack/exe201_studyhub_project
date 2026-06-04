import React from 'react';

const AdminUsers: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto pb-20 animate-fade-in">
      {/* Page Header & Tabs */}
      <div className="mb-8 animate-slide-up">
        <h2 className="font-headline-lg text-headline-lg md:text-headline-xl md:font-headline-xl text-on-surface mb-6">Quản lý Người dùng &amp; eKYC</h2>
        <div className="flex border-b border-outline-variant">
          <button className="px-6 py-3 font-label-md text-label-md text-primary border-b-2 border-primary bg-surface-container-lowest">
            Duyệt hồ sơ Gia sư
          </button>
          <button className="px-6 py-3 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors">
            Quản lý Tài khoản
          </button>
        </div>
      </div>

      {/* Bento Grid Layout for eKYC */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter animate-slide-up stagger-1">
        {/* Left Column: Verification Queue */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="glass border border-white/20 rounded-2xl overflow-hidden flex flex-col h-[800px] shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center sticky top-0">
              <h3 className="font-headline-sm text-headline-sm">Hàng chờ duyệt</h3>
              <span className="bg-surface-container-high px-2 py-1 rounded-full font-label-sm text-label-sm">12 Chờ</span>
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {/* Queue Item 1 (Active) */}
              <div className="p-3 mb-2 rounded-lg bg-primary-fixed border border-primary cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary font-bold">NT</div>
                    <div>
                      <p className="font-label-md text-label-md">Nguyễn Thị Thu</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Toán • Thạc sĩ</p>
                    </div>
                  </div>
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-1 rounded font-label-sm text-label-sm">Chờ duyệt</span>
                </div>
                <p className="font-body-sm text-body-sm text-outline text-right">Đã nộp 2 giờ trước</p>
              </div>
              {/* Queue Item 2 */}
              <div className="p-3 mb-2 rounded-lg bg-surface-container-lowest border border-outline-variant hover:shadow-sm cursor-pointer transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold">TM</div>
                    <div>
                      <p className="font-label-md text-label-md">Trần Minh</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Vật lý • Kỹ sư</p>
                    </div>
                  </div>
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-1 rounded font-label-sm text-label-sm">Chờ duyệt</span>
                </div>
                <p className="font-body-sm text-body-sm text-outline text-right">Đã nộp 5 giờ trước</p>
              </div>
              {/* Queue Item 3 (Rejected) */}
              <div className="p-3 mb-2 rounded-lg bg-surface-container-lowest border border-outline-variant opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold">LA</div>
                    <div>
                      <p className="font-label-md text-label-md">Lê Anh</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Mỹ thuật • Cử nhân</p>
                    </div>
                  </div>
                  <span className="bg-error-container text-on-error-container px-2 py-1 rounded font-label-sm text-label-sm">Bị từ chối</span>
                </div>
                <p className="font-body-sm text-body-sm text-outline text-right">Cập nhật 1 ngày trước</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="xl:col-span-8">
          <div className="glass border border-white/20 rounded-2xl overflow-hidden h-[800px] flex flex-col shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Profile Header */}
            <div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between items-start">
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-surface-variant flex items-center justify-center text-primary font-headline-xl text-headline-xl border-2 border-primary-fixed">
                  NT
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md mb-1">Nguyễn Thị Thu</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-2">thu.nguyen@example.com • 0912 345 678</p>
                  <div className="flex gap-2">
                    <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm">Toán</span>
                    <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm">Khoa học</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-outline rounded-lg font-label-md text-label-md hover:bg-surface-container-highest transition-colors">
                  Yêu cầu thêm
                </button>
                <button className="px-4 py-2 border border-error text-error rounded-lg font-label-md text-label-md hover:bg-error-container transition-colors">
                  Từ chối
                </button>
                <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm">
                  Duyệt hồ sơ
                </button>
              </div>
            </div>
            
            {/* Documents Canvas */}
            <div className="p-6 overflow-y-auto flex-1 bg-surface-container-lowest/50">
              {/* Status Overview */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-outline-variant glass flex items-center gap-3 hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">badge</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline">Xác minh danh tính</p>
                    <p className="font-label-md text-label-md text-tertiary-container">Cần xem xét</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-outline-variant glass flex items-center gap-3 hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">school</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline">Bằng cấp</p>
                    <p className="font-label-md text-label-md text-tertiary-container">Cần xem xét</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-outline-variant glass flex items-center gap-3 hover:-translate-y-1 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-3xl">policy</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline">Lý lịch tư pháp</p>
                    <p className="font-label-md text-label-md text-secondary">Đã vượt qua</p>
                  </div>
                </div>
              </div>

              {/* Document Sections */}
              <div className="space-y-8">
                {/* ID Document */}
                <div>
                  <h4 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">id_card</span> Giấy tờ tuỳ thân
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="aspect-[1.6/1] bg-surface-variant rounded-lg border border-outline-variant relative overflow-hidden group">
                      <div className="absolute inset-0 flex items-center justify-center flex-col text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl mb-2">image</span>
                        <span className="font-body-sm text-body-sm">CCCD_MatTruoc.jpg</span>
                      </div>
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button className="bg-surface-container-lowest px-4 py-2 rounded-full font-label-md text-label-md shadow-sm">Xem toàn màn hình</button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      <div>
                        <p className="font-label-sm text-label-sm text-outline">Loại giấy tờ</p>
                        <p className="font-body-md text-body-md">Căn cước công dân</p>
                      </div>
                      <div>
                        <p className="font-label-sm text-label-sm text-outline">Tên trích xuất</p>
                        <p className="font-body-md text-body-md">Nguyễn Thị Thu</p>
                      </div>
                      <div>
                        <p className="font-label-sm text-label-sm text-outline">Độ chính xác (AI)</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-2 w-32 bg-surface-variant rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-[92%]"></div>
                          </div>
                          <span className="font-label-sm text-label-sm text-secondary">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                <div>
                  <h4 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">workspace_premium</span> Bằng cấp học thuật
                  </h4>
                  <div className="border border-outline-variant rounded-lg p-4 glass">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-outline text-3xl">picture_as_pdf</span>
                        <div>
                          <p className="font-label-md text-label-md">ThacSi_ToanHoc.pdf</p>
                          <p className="font-body-sm text-body-sm text-outline">2.4 MB • Tải lên 24 tháng 10, 2023</p>
                        </div>
                      </div>
                      <button className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">visibility</span> Xem
                      </button>
                    </div>
                    <div className="bg-surface-container/50 p-3 rounded text-body-sm font-body-sm text-on-surface-variant border border-outline-variant border-dashed">
                      <strong>Kiểm tra tự động:</strong> Tên trường khớp. Bằng cấp phù hợp với thông tin khai báo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
