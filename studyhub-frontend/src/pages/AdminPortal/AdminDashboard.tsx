import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../utils/api';

interface PendingTutor {
  id: number;
  fullName: string;
  avatarUrl: string;
  user: { email: string };
  subjects: Array<{ id: number; name: string }>;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalCourses: 0,
    successfulConnections: 0,
    pendingApprovals: 0
  });
  const [pendingTutors, setPendingTutors] = useState<PendingTutor[]>([]);
  const [recentEkyc, setRecentEkyc] = useState<PendingTutor[]>([]);

  const fetchData = async () => {
    try {
      // Fetch revenue & metrics
      const revRes = await apiFetch('/admin/reports/revenue');
      const revData = await revRes.json();
      setRevenue(revData.totalPlatformFee);
      setMetrics({
        totalUsers: revData.totalUsers || 0,
        totalCourses: revData.totalCourses || 0,
        successfulConnections: revData.successfulConnections || 0,
        pendingApprovals: revData.pendingApprovals || 0
      });
    } catch (error) {
      console.error('Lỗi khi tải doanh thu:', error);
    }

    try {
      // Fetch pending eKYC
      const ekycRes = await apiFetch('/admin/ekyc/pending');
      const ekycData = await ekycRes.json();
      const list: PendingTutor[] = Array.isArray(ekycData) ? ekycData : [];
      setPendingTutors(list);
      setRecentEkyc(list.slice(0, 5));
    } catch (error) {
      console.error('Lỗi khi tải eKYC:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await apiFetch(`/admin/ekyc/${id}/approve`, { method: 'PUT' });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return (amount / 1000000).toFixed(1) + 'tr';
    else if (amount >= 1000) return (amount / 1000).toFixed(0) + 'k';
    return amount.toString();
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
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
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">group</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>+8.2%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Tổng số người dùng</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">{metrics.totalUsers.toLocaleString()}</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">work</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>+12.4%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Bài đăng tìm gia sư mới</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">{metrics.totalCourses.toLocaleString()}</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container">handshake</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>+5.1%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Kết nối thành công</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">{metrics.successfulConnections.toLocaleString()}</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">payments</span>
            </div>
            <div className="bg-surface-container text-on-surface-variant px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">trending_up</span>+15.3%
            </div>
          </div>
          <h3 className="font-body-sm text-body-sm text-on-surface-variant mb-1">Doanh thu phí nền tảng</h3>
          <div className="font-headline-xl text-headline-xl text-on-surface">
            {revenue !== null ? formatCurrency(revenue) : '0'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left Col: Recent eKYC Activity */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Hồ sơ eKYC gần đây</h3>
            <Link to="/admin/users" className="text-primary font-label-md text-label-md hover:underline">Xem tất cả</Link>
          </div>
          <div className="overflow-x-auto">
            {recentEkyc.length === 0 ? (
              <div className="py-12 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl block mb-3 text-outline-variant">how_to_reg</span>
                <p className="text-sm">Không có hồ sơ nào đang chờ duyệt.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Gia sư</th>
                    <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Email</th>
                    <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Trạng thái</th>
                    <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {recentEkyc.map(tutor => (
                    <tr key={tutor.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={tutor.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.fullName)}&background=random`}
                            alt={tutor.fullName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-body-md text-body-md text-on-surface font-medium">{tutor.fullName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">{tutor.user?.email}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed-variant">Đang duyệt</span>
                      </td>
                      <td className="py-4 px-6 font-body-sm text-body-sm text-on-surface-variant">
                        {tutor.createdAt ? timeAgo(tutor.createdAt) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Col: Pending Approvals */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Cần xử lý</h3>
            <span className="bg-error text-on-error font-label-sm text-label-sm px-2 py-0.5 rounded-full">
              {pendingTutors.length} Chờ duyệt
            </span>
          </div>

          {pendingTutors.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-center text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-4xl block mb-2 text-outline-variant">check_circle</span>
              Không có hồ sơ nào chờ duyệt.
            </div>
          ) : (
            pendingTutors.slice(0, 3).map(tutor => (
              <div key={tutor.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-1.5 transition-all" />
                <div className="flex gap-3 mb-3">
                  <img
                    src={tutor.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.fullName)}&background=random`}
                    alt={tutor.fullName}
                    className="w-10 h-10 rounded-full object-cover border border-outline-variant shrink-0"
                  />
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">{tutor.fullName}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {tutor.subjects?.map((s: any) => s.name).join(', ') || 'Hồ sơ Gia sư'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(tutor.id)}
                    className="flex-1 bg-primary text-on-primary py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-primary/90 transition-colors"
                  >
                    Duyệt
                  </button>
                  <Link
                    to="/admin/users"
                    className="flex-1 border border-outline-variant text-on-surface py-1.5 rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-colors text-center"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
