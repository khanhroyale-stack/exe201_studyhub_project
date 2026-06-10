import React, { useState, useEffect } from 'react';

const AdminDashboard: React.FC = () => {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalCourses: 0,
    successfulConnections: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/reports/revenue');
        const data = await response.json();
        setRevenue(data.totalPlatformFee);
        setMetrics({
          totalUsers: data.totalUsers || 0,
          totalCourses: data.totalCourses || 0,
          successfulConnections: data.successfulConnections || 0,
          pendingApprovals: data.pendingApprovals || 0
        });
      } catch (error) {
        console.error("Lỗi khi tải doanh thu:", error);
      }
    };
    fetchRevenue();
    
    // Auto refresh every 5 seconds
    const interval = setInterval(fetchRevenue, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'tr';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toString();
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-20">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-1">Tổng quan</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Real-time metrics and operational status.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-outline text-[18px]">calendar_today</span>
            <span className="font-label-md text-label-md text-on-surface">30 ngày qua</span>
            <span className="material-symbols-outlined text-outline cursor-pointer text-[18px]">keyboard_arrow_down</span>
          </div>
        </div>
      </div>

      {/* High-level Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">group</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>
              +8.2%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Tổng số người dùng</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">{metrics.totalUsers.toLocaleString()}</div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">work</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>
              +12.4%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Bài đăng tìm gia sư mới</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">{metrics.totalCourses.toLocaleString()}</div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container">handshake</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>
              +5.1%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Kết nối thành công</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">{metrics.successfulConnections.toLocaleString()}</div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">payments</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>
              +15.3%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Doanh thu phí nền tảng</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">
            {revenue !== null ? formatCurrency(revenue) : '0'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left Col: Recent Activity */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Hoạt động gần đây</h3>
            <button className="text-primary font-label-md text-label-md hover:underline">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Loại</th>
                  <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Người dùng</th>
                  <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Trạng thái</th>
                  <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">how_to_reg</span>
                      <span className="font-body-md text-body-md text-on-surface font-medium">Nộp hồ sơ eKYC</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">Nguyễn Văn A (Gia sư)</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed-variant">Đang duyệt</span>
                  </td>
                  <td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">10 phút trước</td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-error">gavel</span>
                      <span className="font-body-md text-body-md text-on-surface font-medium">Khiếu nại</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">Lớp #4928 (Toán)</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container">Ưu tiên cao</span>
                  </td>
                  <td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">45 phút trước</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Pending Approvals */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Cần xử lý</h3>
            <span className="bg-error text-on-error font-label-sm text-label-sm px-2 py-0.5 rounded-full">{metrics.pendingApprovals} Chờ duyệt</span>
          </div>

          {/* Approval Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-1.5 transition-all"></div>
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant">
                <span className="material-symbols-outlined text-outline">person</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-on-surface">Trần Thị B</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Hồ sơ Gia sư • Tiếng Anh</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-primary text-on-primary py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-primary-container hover:text-on-primary-container transition-colors">Duyệt</button>
              <button className="flex-1 border border-outline-variant text-on-surface py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-colors">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
