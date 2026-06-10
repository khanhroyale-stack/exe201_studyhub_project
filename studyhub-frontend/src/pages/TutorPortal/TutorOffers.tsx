import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tutorPortalApi } from '../../services/tutorPortalApi';
import { UnifiedOffer, OfferStatus, ClassStatus, UnifiedClass } from '../../types/shared';

const TutorOffers: React.FC = () => {
  const [offers, setOffers] = useState<UnifiedOffer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const myOffers = await tutorPortalApi.getOffers();
        setOffers(myOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };
    fetchOffers();
  }, []);

  const handleAccept = async (offerId: string) => {
    try {
      // await tutorPortalApi.acceptOffer(offerId);
      setOffers(offers.map(o => o.id === offerId ? { ...o, status: OfferStatus.ACCEPTED } : o));
      alert('Đã chấp nhận lời mời dạy! Bạn có thể xem trong Quản lý lớp.');
      navigate('/tutor/classes');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra.');
    }
  };

  const handleReject = async (offerId: string) => {
    try {
      // await tutorPortalApi.rejectOffer(offerId);
      setOffers(offers.map(o => o.id === offerId ? { ...o, status: OfferStatus.REJECTED } : o));
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra.');
    }
  };

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
        <button className="pb-2 border-b-2 border-primary text-primary font-label-md text-label-md">Tất cả ({offers.length})</button>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.length === 0 ? (
          <div className="text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
            Bạn chưa có lời mời nào.
          </div>
        ) : offers.map((offer, idx) => (
          <div key={offer.id} className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up opacity-0 stagger-${(idx % 6) + 1}`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Parent Info & Message */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={offer.parentAvatar || 'https://i.pravatar.cc/150?u=parent'} alt="Phụ huynh" className="w-12 h-12 rounded-full object-cover border border-outline-variant" />
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">{offer.parentName || 'Phụ huynh'}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Gửi {new Date(offer.receivedAt).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                  {offer.status === OfferStatus.PENDING ? (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-label-sm font-label-sm rounded-full">Chờ phản hồi</span>
                  ) : offer.status === OfferStatus.ACCEPTED ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-label-sm font-label-sm rounded-full">Đã chấp nhận</span>
                  ) : (
                    <span className="px-3 py-1 bg-surface-container-high text-on-surface text-label-sm font-label-sm rounded-full">Đã từ chối</span>
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
                  <h5 className="font-headline-sm text-headline-sm text-on-surface mb-3">{offer.className || 'Không rõ lớp'}</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span>{offer.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                      <span className="font-bold text-primary">{offer.pricePerSession.toLocaleString()}đ/ca</span>
                    </div>
                    <div className="flex items-center gap-2 text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>{offer.learningMode === 'ONLINE' ? 'Online' : 'Offline'} - {offer.location}</span>
                    </div>
                  </div>
                </div>

                {offer.status === OfferStatus.PENDING && (
                  <div className="flex gap-3 pt-4">
                    <button onClick={() => handleReject(offer.id)} className="flex-1 py-2.5 border border-error text-error font-label-md text-label-md rounded-lg hover:bg-error-container hover:text-on-error-container transition-all active:scale-[0.98]">
                      Từ chối
                    </button>
                    <button onClick={() => handleAccept(offer.id)} className="flex-1 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary/90 transition-all active:scale-[0.98] shadow-sm">
                      Chấp nhận
                    </button>
                  </div>
                )}
                {offer.status === OfferStatus.ACCEPTED && (
                  <button onClick={() => navigate('/tutor/messages')} className="w-full py-2.5 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span> Nhắn tin
                  </button>
                )}
                {offer.status === OfferStatus.REJECTED && (
                  <div className="w-full py-2.5 text-center font-label-md text-label-md text-on-surface-variant bg-surface-container-low rounded-lg">
                    Đã từ chối
                  </div>
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
