import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_APPLICANTS, MOCK_JOB_POSTINGS } from '../../constants/mockParentData';

const ApplicantReview: React.FC = () => {
  const currentPost = MOCK_JOB_POSTINGS[0]; // For demonstration, we pick the first post

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Page Header */}
      <div className="animate-slide-up">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <Link className="font-medium text-xs hover:underline hover:text-primary transition-colors" to="/parent/posts">Quay lại danh sách bài đăng</Link>
        </div>
        <h1 className="font-bold text-3xl text-on-surface mb-2">Danh sách ứng tuyển</h1>
        <p className="font-normal text-base text-on-surface-variant">Bài đăng: <span className="font-semibold text-primary">{currentPost.title}</span> • {MOCK_APPLICANTS.length} ứng viên</p>
      </div>

      {/* Bento Grid of Tutor Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slide-up stagger-1">
        {MOCK_APPLICANTS.map((applicant) => (
          <div key={applicant.id} className="glass border border-white/20 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col sm:flex-row gap-6 mb-6 flex-1">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
                <img alt="Gia sư" className="w-full h-full object-cover rounded-full border-4 border-surface shadow-sm group-hover:scale-105 transition-transform duration-300" src={applicant.tutorAvatar} />
                <div className="absolute bottom-1 right-1 bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">VERIFIED</div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-xl text-on-surface mb-1 group-hover:text-primary transition-colors">{applicant.tutorName}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: star <= Math.floor(applicant.tutorRating) ? "'FILL' 1" : (Math.abs(star - applicant.tutorRating - 1) < 0.1 ? "'FILL' 1" : "'FILL' 0") }}>
                            {Math.abs(star - applicant.tutorRating - 1) < 0.1 ? 'star_half' : 'star'}
                          </span>
                        ))}
                      </div>
                      <span className="font-medium text-xs text-on-surface-variant">({applicant.tutorReviews} đánh giá)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-primary">350k</p>
                    <p className="font-medium text-xs text-on-surface-variant">/giờ</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                    <span className="font-normal text-sm">{applicant.tutorTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">history_edu</span>
                    <span className="font-normal text-sm">3 năm kinh nghiệm</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Sư phạm Toán', 'Tâm lý học sinh'].map((tag, idx) => (
                    <span key={idx} className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[12px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-4 border-t border-outline-variant mt-auto">
              {applicant.status === 'PENDING' ? (
                <>
                  <button className="flex-1 py-2.5 border border-outline-variant text-on-surface-variant rounded-xl font-semibold text-sm hover:bg-surface-container transition-colors">
                    Từ chối
                  </button>
                  <button className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all active:scale-95 shadow-sm hover:shadow-md">
                    Chấp nhận
                  </button>
                </>
              ) : (
                <div className="flex-1 text-center py-2.5 font-semibold text-sm text-on-surface-variant bg-surface-container-low rounded-xl">
                  {applicant.status === 'APPROVED' ? 'Đã chấp nhận' : 'Đã từ chối'}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Summary/Empty State Bento Item */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-lg hover:-translate-y-1 transition-transform duration-300 animate-slide-up stagger-2">
          <span className="material-symbols-outlined text-[48px] mb-4 text-white">group_add</span>
          <h3 className="font-semibold text-2xl mb-2 text-white">Đang tìm thêm gia sư?</h3>
          <p className="font-normal text-base text-white/90 mb-6">Chúng tôi tiếp tục gợi ý bài đăng của bạn tới các gia sư xuất sắc nhất trong khu vực.</p>
          <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all active:scale-95">
            Đẩy tin bài đăng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantReview;
