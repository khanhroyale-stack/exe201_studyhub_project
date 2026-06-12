import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';

interface ClassSession {
  id: number;
  className: string;
  tutorName: string;
  price: number;
  status: string;
}

const AdminPayouts: React.FC = () => {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchCompletedClasses = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/admin/payment/completed-classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        setError('Không thể tải danh sách lớp.');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedClasses();
  }, []);

  const handleDisburse = async (classId: number) => {
    if (!window.confirm(`Xác nhận đã chuyển lương cho gia sư của lớp #${classId}?`)) return;

    try {
      setProcessingId(classId);
      setError(null);
      setSuccessMsg(null);

      const response = await apiFetch(`/admin/payment/disburse/${classId}`, {
        method: 'POST'
      });

      if (response.ok) {
        setSuccessMsg(`Giải ngân thành công cho Lớp #${classId}`);
        // Xóa lớp đó khỏi danh sách hiển thị
        setClasses(prev => prev.filter(c => c.id !== classId));
      } else {
        const data = await response.json();
        setError(data.error || 'Có lỗi xảy ra khi giải ngân.');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-20">
      <div className="mb-8">
        <h2 className="font-headline-lg text-headline-lg text-on-background mb-1">Quản lý Giải ngân</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Thanh toán lương cho gia sư các lớp đã hoàn thành.</p>
      </div>

      {error && (
        <div className="mb-4 bg-error-container text-on-error-container p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 bg-primary-container text-on-primary-container p-4 rounded-lg text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          {successMsg}
        </div>
      )}

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Danh sách lớp chờ giải ngân</h3>
          <button 
            onClick={fetchCompletedClasses}
            className="flex items-center gap-1 text-primary font-label-md text-label-md hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Làm mới
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tên lớp</th>
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Gia sư</th>
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Số tiền</th>
                <th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                    <div className="w-8 h-8 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : classes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-on-surface-variant font-body-md">
                    Không có lớp học nào đang chờ giải ngân.
                  </td>
                </tr>
              ) : (
                classes.map(c => (
                  <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-6 font-body-sm font-bold text-on-surface">#{c.id}</td>
                    <td className="py-4 px-6 font-body-sm text-on-surface font-medium">{c.className}</td>
                    <td className="py-4 px-6 font-body-sm text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline text-[18px]">person</span>
                        {c.tutorName}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-body-sm text-primary font-bold">
                      {c.price ? c.price.toLocaleString('vi-VN') + ' đ' : 'N/A'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDisburse(c.id)}
                        disabled={processingId === c.id}
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        {processingId === c.id ? (
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        ) : (
                          <span className="material-symbols-outlined text-[16px] mr-1">payments</span>
                        )}
                        Giải ngân
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayouts;
