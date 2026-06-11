import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

interface Subject {
  id: number;
  name: string;
}

interface TutorProfile {
  id: number;
  fullName: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
  avatarUrl: string;
  idCardFrontUrl: string;
  idCardBackUrl: string;
  universityName: string;
  major: string;
  degreeImageUrl: string;
  experienceYears: number;
  certificates: string[];
  introduction: string;
  status: string;
  ekycStatus: string;
  similarityScore: number;
  price: number;
  teachingMethod: string;
  averageRating: number;
  totalReviews: number;
  subjects: Subject[];
}

interface TutorProfileModalProps {
  tutorId: number | string;
  onClose: () => void;
}

const TutorProfileModal: React.FC<TutorProfileModalProps> = ({ tutorId, onClose }) => {
  const { role, userId } = useAuth();
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Booking state
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    subject: '',
    schedule: '',
    learningMode: 'ONLINE',
    address: '',
    pricePerSession: 0,
    parentMessage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!tutorId) return;
    
    setLoading(true);
    fetch(`${BASE_URL}/tutors/${tutorId}`)
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải thông tin gia sư');
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [tutorId]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return alert('Vui lòng đăng nhập để mời dạy!');
    if (!bookingData.subject || !bookingData.schedule || !bookingData.pricePerSession) {
      return alert('Vui lòng điền đầy đủ Môn học, Lịch học và Học phí.');
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentId: userId,
          tutorId: profile?.id,
          ...bookingData
        })
      });
      if (!response.ok) throw new Error('Không thể gửi lời mời');
      alert('Gửi lời mời dạy thành công! Vui lòng chờ gia sư phản hồi.');
      setShowBooking(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest sticky top-0 z-10">
          <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">badge</span>
            Hồ sơ chi tiết Gia sư
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface-container-lowest/50">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error || !profile ? (
            <div className="text-center text-error py-10 flex flex-col items-center">
              <span className="material-symbols-outlined text-5xl mb-2">error</span>
              <p>{error || 'Lỗi tải dữ liệu'}</p>
            </div>
          ) : showBooking ? (
            <form onSubmit={handleBookingSubmit} className="max-w-2xl mx-auto bg-surface p-8 rounded-2xl shadow-sm border border-outline-variant space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">Mời dạy trực tiếp</h3>
                <p className="text-sm text-on-surface-variant">Gửi yêu cầu giảng dạy trực tiếp đến gia sư <b>{profile.fullName}</b></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Môn học cần tìm <span className="text-error">*</span></label>
                  <input type="text" required placeholder="VD: Toán lớp 10" value={bookingData.subject} onChange={e => setBookingData({...bookingData, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Mức học phí / Buổi <span className="text-error">*</span></label>
                  <input type="number" required min="10000" placeholder="VD: 150000" value={bookingData.pricePerSession} onChange={e => setBookingData({...bookingData, pricePerSession: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Lịch học mong muốn <span className="text-error">*</span></label>
                <input type="text" required placeholder="VD: Tối thứ 2, 4, 6 từ 19h-21h" value={bookingData.schedule} onChange={e => setBookingData({...bookingData, schedule: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Hình thức học <span className="text-error">*</span></label>
                  <select value={bookingData.learningMode} onChange={e => setBookingData({...bookingData, learningMode: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                    <option value="ONLINE">Học Trực tuyến (Online)</option>
                    <option value="OFFLINE">Học Trực tiếp (Offline)</option>
                  </select>
                </div>
                {bookingData.learningMode === 'OFFLINE' && (
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-2">Địa chỉ học Offline</label>
                    <input type="text" placeholder="Nhập địa chỉ nhà của bạn" value={bookingData.address} onChange={e => setBookingData({...bookingData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2">Lời nhắn cho gia sư</label>
                <textarea rows={4} placeholder="Mô tả thêm về lực học của học sinh, yêu cầu riêng..." value={bookingData.parentMessage} onChange={e => setBookingData({...bookingData, parentMessage: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? 'Đang gửi...' : 'Xác nhận Gửi lời mời'}
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="flex flex-col md:flex-row gap-6 items-start bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm">
                <div className="relative shrink-0">
                  <img 
                    src={profile.avatarUrl || 'https://via.placeholder.com/150'} 
                    alt="Avatar" 
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-surface-container-high shadow-md" 
                  />
                  {profile.ekycStatus === 'SUCCESS' && (
                    <div className="absolute -bottom-3 -right-3 bg-white rounded-full p-1 shadow-sm">
                      <span className="material-symbols-outlined text-green-500 text-3xl" title="Đã xác thực danh tính">verified</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold text-on-surface mb-2">{profile.fullName}</h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{profile.price?.toLocaleString('vi-VN')}đ <span className="text-sm font-normal text-on-surface-variant">/ buổi</span></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      Sinh viên {profile.universityName}
                    </span>
                    {profile.major && (
                      <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        Ngành: {profile.major}
                      </span>
                    )}
                    {profile.teachingMethod && (
                      <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">{profile.teachingMethod === 'ONLINE' ? 'laptop_mac' : 'location_on'}</span>
                        Dạy: {profile.teachingMethod}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-on-surface-variant text-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400 text-[18px]">star</span>
                      <span className="font-bold text-on-surface">{profile.averageRating ? profile.averageRating.toFixed(1) : 'Chưa có'}</span>
                      <span>({profile.totalReviews || 0} đánh giá)</span>
                    </div>
                    {profile.experienceYears > 0 && (
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                        {profile.experienceYears} năm kinh nghiệm
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thông tin cá nhân */}
                <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm">
                  <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Thông tin liên hệ
                  </h4>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">calendar_month</span>
                      <div>
                        <span className="block text-xs text-on-surface-variant mb-0.5">Ngày sinh</span>
                        <span className="font-medium text-on-surface">{profile.birthDate ? new Date(profile.birthDate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">call</span>
                      <div>
                        <span className="block text-xs text-on-surface-variant mb-0.5">Số điện thoại</span>
                        <span className="font-medium text-on-surface">{profile.phoneNumber || 'Đang ẩn'}</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">location_on</span>
                      <div>
                        <span className="block text-xs text-on-surface-variant mb-0.5">Địa chỉ hiện tại</span>
                        <span className="font-medium text-on-surface">{profile.address || 'Chưa cập nhật'}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Môn học giảng dạy */}
                <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm">
                  <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">library_books</span>
                    Môn học nhận dạy
                  </h4>
                  {profile.subjects && profile.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.subjects.map(sub => (
                        <span key={sub.id} className="border border-primary text-primary px-3 py-1.5 rounded-lg text-sm font-medium">
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-on-surface-variant italic">Chưa đăng ký môn học nào.</p>
                  )}
                </div>
              </div>



              {/* Hình ảnh văn bằng, chứng chỉ */}
              <div className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm">
                <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">military_tech</span>
                  Bằng cấp & Chứng chỉ
                </h4>
                
                <div className="space-y-6">
                  {/* Bằng ĐH */}
                  {profile.degreeImageUrl && (
                    <div>
                      <h5 className="text-xs font-bold text-on-surface-variant mb-2">Bằng Đại học / Thẻ sinh viên</h5>
                      <img src={profile.degreeImageUrl} alt="Degree" className="w-48 h-auto object-cover rounded-xl border border-outline-variant shadow-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.open(profile.degreeImageUrl, '_blank')} />
                    </div>
                  )}

                  {/* Chứng chỉ khác */}
                  {profile.certificates && profile.certificates.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold text-on-surface-variant mb-2">Chứng chỉ khác</h5>
                      <div className="flex flex-wrap gap-4">
                        {profile.certificates.map((cert, idx) => (
                          <img key={idx} src={cert} alt={`Certificate ${idx}`} className="w-32 h-auto object-cover rounded-xl border border-outline-variant shadow-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.open(cert, '_blank')} />
                        ))}
                      </div>
                    </div>
                  )}

                  {!profile.degreeImageUrl && (!profile.certificates || profile.certificates.length === 0) && (
                    <p className="text-sm text-on-surface-variant italic">Gia sư chưa cập nhật hình ảnh bằng cấp, chứng chỉ.</p>
                  )}
                </div>
              </div>
              
              {/* Căn cước công dân (Chỉ hiện nếu đã được xác thực) */}
              {profile.idCardFrontUrl && profile.ekycStatus === 'SUCCESS' && (
                <div className="bg-green-50 p-6 rounded-2xl border border-green-200 shadow-sm">
                  <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                    Xác thực CCCD
                  </h4>
                  <p className="text-xs text-green-700 mb-4">Danh tính của gia sư đã được StudyHub xác thực thành công thông qua Căn cước công dân và Sinh trắc học khuôn mặt.</p>
                  <div className="flex gap-4">
                    <img src={profile.idCardFrontUrl} alt="ID Front" className="w-40 h-auto object-cover rounded-xl border border-green-200 shadow-sm opacity-90 blur-[2px] hover:blur-none transition-all" />
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant bg-surface text-right shrink-0 flex justify-end gap-3">
          <button 
            onClick={() => {
              if (showBooking) setShowBooking(false);
              else onClose();
            }}
            className="px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold rounded-xl transition-colors shadow-sm"
          >
            {showBooking ? 'Hủy' : 'Đóng hồ sơ'}
          </button>
          {!showBooking && role === 'parent' && (
            <button 
              onClick={() => {
                setBookingData(prev => ({ ...prev, pricePerSession: profile?.price || 0 }));
                setShowBooking(true);
              }}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              Mời dạy trực tiếp
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorProfileModal;
