import React, { useState, useEffect } from 'react';
import { tutorPortalApi, CommissionRecord } from '../../services/tutorPortalApi';

const TutorBilling: React.FC = () => {
  const [invoices, setInvoices] = useState<CommissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'UNPAID' | 'PAID'>('UNPAID');

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const data = await tutorPortalApi.getBilling();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching billing:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBilling();
  }, []);

  const totalUnpaid = invoices.filter(i => i.status === 'UNPAID').reduce((sum, i) => sum + i.platformFeeAmount, 0);
  const unpaidCount = invoices.filter(i => i.status === 'UNPAID').length;
  const paidCount = invoices.filter(i => i.status === 'PAID').length;
  return (
    <div className="max-w-[1440px] mx-auto space-y-gutter pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 animate-slide-up">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Công nợ & Thanh toán</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Quản lý hóa đơn phí nền tảng (10%) hàng tháng.</p>
        </div>
        <div className="bg-primary px-5 py-3 rounded-xl flex items-center gap-4 shadow-md hover:-translate-y-1 transition-transform">
          <div>
            <p className="font-label-sm text-label-sm text-white/80">Tổng nợ cần thanh toán</p>
            <p className="font-headline-md text-headline-md font-bold text-white">{totalUnpaid.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </div>
        </div>
      </div>

      {/* Warning Alert */}
      <div className="glass bg-orange-50/80 border border-orange-200 text-orange-800 p-4 rounded-2xl flex items-start gap-3 mb-6 animate-slide-up stagger-1">
        <span className="material-symbols-outlined text-orange-500 shrink-0">warning</span>
        <div>
          <h4 className="font-label-md text-label-md font-bold mb-1">Lưu ý thanh toán phí</h4>
          <p className="font-body-sm text-body-sm">Theo chính sách của StudyHub, phí hoa hồng nền tảng (10%) sẽ được tính dựa trên số ca thực dạy đã check-in. Vui lòng thanh toán trước ngày mùng 5 hàng tháng để tránh bị khóa tài khoản.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-outline-variant mb-6">
        <button 
          onClick={() => setActiveTab('UNPAID')}
          className={`pb-2 border-b-2 font-label-md text-label-md transition-colors ${activeTab === 'UNPAID' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
        >
          Chưa thanh toán ({unpaidCount})
        </button>
        <button 
          onClick={() => setActiveTab('PAID')}
          className={`pb-2 border-b-2 font-label-md text-label-md transition-colors ${activeTab === 'PAID' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
        >
          Lịch sử thanh toán ({paidCount})
        </button>
      </div>

      {/* Invoices List */}
      <div className="space-y-6 animate-slide-up stagger-2">
        {loading ? (
          <div className="text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
            Đang tải dữ liệu...
          </div>
        ) : invoices.filter(i => i.status === activeTab).length === 0 ? (
          <div className="text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
            Bạn chưa có hóa đơn nào trong mục này.
          </div>
        ) : invoices.filter(i => i.status === activeTab).map((invoice) => (
          <div key={invoice.id} className="glass border border-white/20 rounded-2xl p-0 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex flex-col lg:flex-row">
              {/* Invoice Details */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm rounded-full mb-3 inline-block border border-outline-variant">
                      Hóa đơn: {invoice.id}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{invoice.month}</h3>
                  </div>
                  {invoice.status === 'UNPAID' ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-label-sm font-label-sm rounded-full font-bold">CHƯA THANH TOÁN</span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-label-sm font-label-sm rounded-full font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> ĐÃ THANH TOÁN
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-surface-container-lowest/50 p-4 rounded-xl border border-outline-variant">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Lớp giảng dạy</p>
                    <p className="font-label-md text-label-md text-on-surface">{invoice.className}</p>
                  </div>
                  <div className="bg-surface-container-lowest/50 p-4 rounded-xl border border-outline-variant">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Số ca đã dạy</p>
                    <p className="font-label-md text-label-md text-on-surface">{invoice.totalSessions} ca</p>
                  </div>
                  <div className="bg-surface-container-lowest/50 p-4 rounded-xl border border-outline-variant">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Tổng học phí nhận</p>
                    <p className="font-label-md text-label-md text-on-surface font-bold text-green-600">{invoice.totalRevenue.toLocaleString('vi-VN')}đ</p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Phí phải nộp ({invoice.platformFeePercent}%)</p>
                    <p className="font-label-md text-label-md text-primary font-bold">{invoice.platformFeeAmount.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                  <span>Hạn chót thanh toán: <span className="font-bold text-error">{new Date(invoice.dueDate).toLocaleDateString('vi-VN')}</span></span>
                </div>
              </div>

              {/* QR Code / Payment Action */}
              {invoice.status === 'UNPAID' && invoice.qrCodeUrl && (
                <div className="w-full lg:w-[300px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/20 bg-surface-container/30 p-6 flex flex-col items-center justify-center">
                  <p className="font-label-md text-label-md text-on-surface mb-4 text-center">Quét mã VietQR để thanh toán</p>
                  <div className="w-40 h-40 bg-white p-2 rounded-2xl shadow-sm mb-4 border border-outline-variant flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <img src={invoice.qrCodeUrl} alt="VietQR" className="max-w-full max-h-full object-contain" />
                  </div>
                  <button className="w-full py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 hover:shadow-lg">
                    <span className="material-symbols-outlined text-[18px]">upload</span> Xác nhận đã CK
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorBilling;
