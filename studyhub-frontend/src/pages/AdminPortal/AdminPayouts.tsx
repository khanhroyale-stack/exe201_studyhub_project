import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface ClassSessionDetail {
  id: number;
  className: string;
  tutorName: string;
  tutorAvatar?: string;
  price: number;
  pricePerSession: number;
  status: string;
  // Tutor bank info (if available)
  bankAccountNumber?: string;
  bankName?: string;
  bankAccountName?: string;
}

const AdminPayouts: React.FC = () => {
  const [classes, setClasses] = useState<ClassSessionDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Simulate payment test
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simTxCode, setSimTxCode] = useState('');
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<string | null>(null);

  const fetchCompletedClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/admin/payment/completed-classes');
      if (response.ok) {
        const data = await response.json();
        setClasses(Array.isArray(data) ? data : []);
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
    if (false && !window.confirm(`Xác nhận đã chuyển lương cho gia sư của lớp #${classId}?`)) return;

    try {
      setProcessingId(classId);
      setError(null);
      setSuccessMsg(null);

      const response = await fetch(`http://localhost:8080/api/admin/payment/disburse/${classId}`, {
        method: 'POST'
      });

      if (response.ok) {
        setSuccessMsg(`✅ Giải ngân thành công cho Lớp #${classId}`);
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

  const handleSimulate = async () => {
    if (!simTxCode.trim()) {
      setSimResult('Vui lòng nhập mã giao dịch!');
      return;
    }
    setSimulating(true);
    setSimResult(null);
    try {
      const res = await api.post(`/payment/simulate?transactionCode=${simTxCode.trim()}`);
      const data = res.data;
      if (data.success) {
        setSimResult(`✅ ${data.message} | Class ID: ${data.classId} | Status: ${data.newClassStatus}`);
        setSimTxCode('');
      } else {
        setSimResult(`ℹ️ ${data.message}`);
      }
    } catch (err: any) {
      setSimResult(`❌ Lỗi: ${err?.response?.data?.error || err.message}`);
    } finally {
      setSimulating(false);
    }
  };

  const totalPending = classes.reduce((sum, c) => sum + (c.price || 0), 0);
  const tutorPayout = totalPending * 0.80;

  return (
    <div className="max-w-[1440px] mx-auto pb-20 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl text-on-background mb-1">Quản lý Giải ngân</h2>
          <p className="text-sm text-on-surface-variant">Thanh toán lương cho gia sư các lớp đã hoàn thành.</p>
        </div>
        <button
          onClick={() => setShowSimulateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 text-amber-700 rounded-xl text-sm font-bold hover:bg-amber-200 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">bug_report</span>
          Test: Mô phỏng thanh toán
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 text-center">
          <p className="text-2xl font-black text-on-surface">{classes.length}</p>
          <p className="text-sm font-medium text-on-surface-variant mt-1">Lớp chờ giải ngân</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 text-center">
          <p className="text-xl font-black text-primary">{totalPending.toLocaleString('vi-VN')}đ</p>
          <p className="text-sm font-medium text-on-surface-variant mt-1">Tổng học phí thu</p>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center">
          <p className="text-xl font-black text-primary">{tutorPayout.toLocaleString('vi-VN')}đ</p>
          <p className="text-sm font-medium text-primary/70 mt-1">Tổng cần chuyển cho gia sư (80%)</p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl text-sm border border-error/20">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-primary-container text-on-primary-container p-4 rounded-xl text-sm font-medium flex items-center gap-2 border border-primary/20">
          <span className="material-symbols-outlined">check_circle</span>
          {successMsg}
        </div>
      )}

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
          <h3 className="font-bold text-base text-on-surface">Danh sách lớp chờ giải ngân</h3>
          <button 
            onClick={fetchCompletedClasses}
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Làm mới
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="py-3 px-5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Lớp học</th>
                <th className="py-3 px-5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Gia sư</th>
                <th className="py-3 px-5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Học phí thu</th>
                <th className="py-3 px-5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Giải ngân (80%)</th>
                <th className="py-3 px-5 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-on-surface-variant">
                    <div className="w-8 h-8 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </td>
                </tr>
              ) : classes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-on-surface-variant text-sm italic">
                    Không có lớp học nào đang chờ giải ngân.
                  </td>
                </tr>
              ) : (
                classes.map(c => {
                  const tutorPay = (c.price || 0) * 0.80;
                  return (
                    <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-4 px-5">
                        <div>
                          <p className="font-bold text-sm text-on-surface">#{c.id} — {c.className}</p>
                          <p className="text-xs text-on-surface-variant">{c.pricePerSession?.toLocaleString('vi-VN')}đ/buổi</p>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden shrink-0">
                            {c.tutorAvatar ? (
                              <img src={c.tutorAvatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-on-surface">{c.tutorName}</p>
                            {c.bankAccountNumber ? (
                              <p className="text-xs text-on-surface-variant">{c.bankName}: <span className="font-mono font-bold">{c.bankAccountNumber}</span></p>
                            ) : (
                              <p className="text-xs text-amber-600 italic">Chưa có STK ngân hàng</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="font-bold text-sm text-on-surface">{(c.price || 0).toLocaleString('vi-VN')}đ</span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="font-bold text-sm text-primary">{tutorPay.toLocaleString('vi-VN')}đ</span>
                        <p className="text-xs text-on-surface-variant">Platform giữ 20%: {((c.price || 0) * 0.2).toLocaleString('vi-VN')}đ</p>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => handleDisburse(c.id)}
                          disabled={processingId === c.id}
                          className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-sm"
                        >
                          {processingId === c.id ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></span>
                          ) : (
                            <span className="material-symbols-outlined text-[16px]">payments</span>
                          )}
                          Xác nhận giải ngân
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulate Payment Modal */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-amber-200">
            <div className="px-6 py-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
              <h3 className="font-bold text-amber-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600">bug_report</span>
                Test: Mô phỏng thanh toán thành công
              </h3>
              <button onClick={() => { setShowSimulateModal(false); setSimResult(null); setSimTxCode(''); }} className="text-amber-600 hover:text-amber-800">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 bg-amber-50 border border-amber-200 p-3 rounded-xl">
                ⚠️ Chức năng này CHỈ DÙNG cho testing/demo đồ án. Nhập mã giao dịch (transactionCode) được tạo khi phụ huynh bấm "Xác nhận thuê & Thanh toán" để mô phỏng ngân hàng xác nhận chuyển tiền thành công.
              </p>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Mã giao dịch (transactionCode)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: SH123456789"
                  value={simTxCode}
                  onChange={e => setSimTxCode(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-amber-400 text-sm font-mono"
                />
              </div>
              {simResult && (
                <div className={`p-3 rounded-xl text-sm font-medium ${simResult.startsWith('✅') ? 'bg-green-50 border border-green-200 text-green-800' : simResult.startsWith('ℹ️') ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                  {simResult}
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowSimulateModal(false); setSimResult(null); setSimTxCode(''); }}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Đóng
                </button>
                <button
                  onClick={handleSimulate}
                  disabled={simulating}
                  className="flex-1 px-4 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {simulating ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Đang xử lý...</>
                  ) : (
                    <><span className="material-symbols-outlined text-[16px]">bolt</span> Mô phỏng thành công</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayouts;

