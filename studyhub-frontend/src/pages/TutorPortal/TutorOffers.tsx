import React from 'react';
import { MOCK_TUTOR_OFFERS } from '../../constants/mockTutorData';

const TutorOffers: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto space-y-gutter pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Lời mời nhận lớp</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Quản lý các yêu cầu mời dạy trực tiếp từ Phụ huynh.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-outline-variant mb-6">
        <button className="pb-2 border-b-2 border-primary text-primary font-label-md text-label-md">Đang chờ duyệt (1)</button>
        <button className="pb-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">Đã chấp nhận (1)</button>
        <button className="pb-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">Đã từ chối (0)</button>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {MOCK_TUTOR_OFFERS.map((offer, idx) => (
          <div key={offer.id} className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up opacity-0 stagger-${(idx % 6) + 1}`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Parent Info & Message */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={offer.parentAvatar} alt={offer.parentName} className="w-12 h-12 rounded-full object-cover border border-outline-variant" />
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">{offer.parentName}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Gửi {offer.receivedAt}</p>
                    </div>
                  </div>
                  {offer.status === 'PENDING' ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-label-sm font-label-sm rounded-full">Chờ phản hồi</span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-label-sm font-label-sm rounded-full">Đã chấp nhận</span>
                  )}
                </div>
                
                <div className="bg-surface-container rounded-lg p-4 relative">
                  <span className="material-symbols-outlined text-outline-variant absolute top-4 left-4">format_quote</span>
                  <p className="font-body-md text-body-md text-on-surface-variant pl-10 italic">"{offer.message}"</p>
                </div>
              </div>

              {/* Class Details & Actions */}
              <div className="w-full md:w-[320px] shrink-0 border-t md:border-t-0 md:border-l border-outline-variant pt-4 md:pt-0 md:pl-6 space-y-4 flex flex-col justify-between">
                <div>
                  <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3">{offer.className}</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span>{offer.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                      <span className="font-bold text-primary">{offer.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>{offer.mode} - {offer.location}</span>
                    </div>
                  </div>
                </div>

                {offer.status === 'PENDING' && (
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 py-2.5 border border-error text-error font-label-md text-label-md rounded-lg hover:bg-error-container hover:text-on-error-container transition-all active:scale-[0.98]">
                      Từ chối
                    </button>
                    <button className="flex-1 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 transition-all active:scale-[0.98] shadow-sm">
                      Chấp nhận
                    </button>
                  </div>
                )}
                {offer.status === 'ACCEPTED' && (
                  <button className="w-full py-2.5 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span> Nhắn tin
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorOffers;
