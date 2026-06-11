import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ApplicantDTO {
  id: number;
  jobPostingId: number;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorTitle: string;
  tutorRating: number;
  tutorReviews: number;
  message: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const ApplicantReview: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const {  } = useAuth();

  const [applicants, setApplicants] = useState<ApplicantDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    fetch(`${BASE_URL}/posts/${postId}/applicants`)
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải danh sách ứng viên');
        return res.json();
      })
      .then((data: ApplicantDTO[]) => {
        setApplicants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  const handleAccept = async (applicantId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn chấp nhận gia sư này? Các ứng viên khác sẽ bị từ chối tự động.')) return;
    setAccepting(applicantId);
    try {
      const res = await fetch(`${BASE_URL}/class-sessions/accept-applicant/${applicantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.error || 'Có lỗi xảy ra');
      }
      // Cập nhật local state
      setApplicants(prev => prev.map(a => ({
        ...a,
        status: a.id === applicantId ? 'ACCEPTED' : (a.status === 'PENDING' ? 'REJECTED' : a.status),
      })));
      alert('Đã chấp nhận gia sư! Lớp học đã được tạo.');
      navigate('/parent/classes');
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    } finally {
      setAccepting(null);
    }
  };

  const handleReject = async (applicantId: number) => {
    setApplicants(prev => prev.map(a =>
      a.id === applicantId ? { ...a, status: 'REJECTED' } : a
    ));
  };

  const renderStars = (rating: number) => {
    return [1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        className="material-symbols-outlined text-[18px]"
        style={{ fontVariationSettings: star <= Math.round(rating) ? "'FILL' 1" : "'FILL' 0", color: '#f59e0b' }}
      >
        star
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <span className="material-symbols-outlined text-6xl text-error">error</span>
        <p className="text-error font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-primary text-white rounded-xl font-semibold">
          Thử lại
        </button>
      </div>
    );
  }

  const pendingApplicants = applicants.filter(a => a.status === 'PENDING');
  const decidedApplicants = applicants.filter(a => a.status !== 'PENDING');

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Page Header */}
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <Link className="font-medium text-xs hover:underline hover:text-primary transition-colors" to="/parent/posts">
            Quay lại danh sách bài đăng
          </Link>
        </div>
        <h1 className="font-bold text-3xl text-on-surface mb-2">Danh sách ứng tuyển</h1>
        <p className="font-normal text-base text-on-surface-variant">
          Bài đăng #{postId} •{' '}
          <span className="font-semibold text-primary">{pendingApplicants.length} ứng viên đang chờ</span>
          {decidedApplicants.length > 0 && ` • ${decidedApplicants.length} đã xử lý`}
        </p>
      </div>

      {applicants.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest border border-outline-variant rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">group</span>
          <h2 className="font-bold text-xl text-on-surface mb-2">Chưa có ứng viên nào</h2>
          <p className="text-on-surface-variant">Chưa có gia sư nào nộp đơn cho bài đăng này.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slide-up stagger-1">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              className={`glass border rounded-2xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden ${
                applicant.status === 'ACCEPTED'
                  ? 'border-green-400 bg-green-50/30'
                  : applicant.status === 'REJECTED'
                  ? 'border-outline-variant/40 opacity-60'
                  : 'border-white/20'
              }`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 w-full h-1 transition-opacity ${
                applicant.status === 'ACCEPTED' ? 'bg-green-500 opacity-100' :
                applicant.status === 'REJECTED' ? 'opacity-0' :
                'bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100'
              }`}></div>

              {/* Status badge top-right */}
              {applicant.status !== 'PENDING' && (
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold ${
                  applicant.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  {applicant.status === 'ACCEPTED' ? '✓ Đã chấp nhận' : '✕ Đã từ chối'}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-6 mb-6 flex-1">
                {/* Avatar */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
                  {applicant.tutorAvatar ? (
                    <img
                      alt={applicant.tutorName}
                      className="w-full h-full object-cover rounded-full border-4 border-surface shadow-sm group-hover:scale-105 transition-transform duration-300"
                      src={applicant.tutorAvatar}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full border-4 border-surface bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-primary">person</span>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                    VERIFIED
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {applicant.tutorName}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(applicant.tutorRating || 0)}
                    <span className="text-sm text-on-surface-variant ml-1">
                      {applicant.tutorRating ? `${applicant.tutorRating.toFixed(1)}` : 'Chưa có'} 
                      {applicant.tutorReviews ? ` (${applicant.tutorReviews} đánh giá)` : ''}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {applicant.tutorTitle && (
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                        <span className="font-normal text-sm">{applicant.tutorTitle}</span>
                      </div>
                    )}
                    {applicant.message && (
                      <div className="flex items-start gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] mt-0.5">chat</span>
                        <span className="font-normal text-sm italic">"{applicant.message}"</span>
                      </div>
                    )}
                    {applicant.appliedAt && (
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        <span className="font-normal text-sm">
                          Nộp đơn: {new Date(applicant.appliedAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-4 border-t border-outline-variant mt-auto">
                {applicant.status === 'PENDING' ? (
                  <>
                    <button
                      onClick={() => handleReject(applicant.id)}
                      className="flex-1 py-2.5 border border-outline-variant text-on-surface-variant rounded-xl font-semibold text-sm hover:bg-surface-container transition-colors"
                    >
                      Từ chối
                    </button>
                    <button
                      onClick={() => handleAccept(applicant.id)}
                      disabled={accepting !== null}
                      className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all active:scale-95 shadow-sm hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {accepting === applicant.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang xử lý...
                        </>
                      ) : 'Chấp nhận'}
                    </button>
                  </>
                ) : (
                  <div className={`flex-1 text-center py-2.5 font-semibold text-sm rounded-xl ${
                    applicant.status === 'ACCEPTED'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}>
                    {applicant.status === 'ACCEPTED' ? '✓ Đã chấp nhận' : '✕ Đã từ chối'}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-lg hover:-translate-y-1 transition-transform duration-300 animate-slide-up stagger-2">
            <span className="material-symbols-outlined text-[48px] mb-4 text-white">group_add</span>
            <h3 className="font-semibold text-2xl mb-2 text-white">Đang tìm thêm gia sư?</h3>
            <p className="font-normal text-base text-white/90 mb-6">
              Chúng tôi tiếp tục gợi ý bài đăng của bạn tới các gia sư xuất sắc nhất trong khu vực.
            </p>
            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all active:scale-95">
              Đẩy tin bài đăng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantReview;
