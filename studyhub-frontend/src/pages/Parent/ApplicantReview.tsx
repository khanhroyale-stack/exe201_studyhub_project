import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_APPLICANTS, MOCK_JOB_POSTINGS } from '../../constants/mockParentData';

const ApplicantReview: React.FC = () => {
  const currentPost = MOCK_JOB_POSTINGS[0]; // For demonstration, we pick the first post

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-[#434654] mb-2">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>arrow_back</span>
          <Link className="font-medium text-xs hover:underline" to="/parent/posts">Quay lại danh sách bài đăng</Link>
        </div>
        <h1 className="font-bold text-3xl text-[#191c1e] mb-2">Danh sách ứng tuyển</h1>
        <p className="font-normal text-base text-[#434654]">Bài đăng: <span className="font-semibold text-[#003d9b]">{currentPost.title}</span> • {MOCK_APPLICANTS.length} ứng viên</p>
      </div>

      {/* Bento Grid of Tutor Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {MOCK_APPLICANTS.map((applicant) => (
          <div key={applicant.id} className="bg-white border border-[#c3c6d6] rounded-xl p-6 hover:shadow-md transition-all duration-300 group flex flex-col h-full">
            <div className="flex flex-col sm:flex-row gap-6 mb-6 flex-1">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
                <img alt="Gia sư" className="w-full h-full object-cover rounded-full border-2 border-[#edeef0]" src={applicant.tutorAvatar} />
                <div className="absolute bottom-1 right-1 bg-[#00687b] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">VERIFIED</div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-xl text-[#191c1e] mb-1">{applicant.tutorName}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-[#7d5200]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: star <= Math.floor(applicant.tutorRating) ? "'FILL' 1" : (Math.abs(star - applicant.tutorRating - 1) < 0.1 ? "'FILL' 1" : "'FILL' 0") }}>
                            {Math.abs(star - applicant.tutorRating - 1) < 0.1 ? 'star_half' : 'star'}
                          </span>
                        ))}
                      </div>
                      <span className="font-medium text-xs text-[#434654]">({applicant.tutorReviews} đánh giá)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-xl text-[#003d9b]">350k</p>
                    <p className="font-medium text-xs text-[#434654]">/giờ</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[#434654]">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>school</span>
                    <span className="font-normal text-sm">{applicant.tutorTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#434654]">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>history_edu</span>
                    <span className="font-normal text-sm">3 năm kinh nghiệm</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Sư phạm Toán', 'Tâm lý học sinh'].map((tag, idx) => (
                    <span key={idx} className="bg-[#dae2ff] text-[#001848] px-3 py-1 rounded-full text-[12px] font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 border-t border-[#c3c6d6] mt-auto">
              {applicant.status === 'PENDING' ? (
                <>
                  <button className="flex-1 py-2.5 border border-[#737685] text-[#191c1e] rounded-lg font-semibold text-sm hover:bg-[#f3f4f6] transition-colors">
                    Từ chối
                  </button>
                  <button className="flex-1 py-2.5 bg-[#003d9b] text-white rounded-lg font-semibold text-sm hover:bg-[#0052cc] transition-transform active:scale-95 shadow-sm">
                    Chấp nhận
                  </button>
                </>
              ) : (
                <div className="flex-1 text-center py-2.5 font-semibold text-sm text-[#434654] bg-[#f8f9fb] rounded-lg">
                  {applicant.status === 'APPROVED' ? 'Đã chấp nhận' : 'Đã từ chối'}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Summary/Empty State Bento Item */}
        <div className="bg-[#0052cc] text-[#c4d2ff] rounded-xl p-8 flex flex-col justify-center items-center text-center">
          <span className="material-symbols-outlined text-[48px] mb-4 text-white" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>group_add</span>
          <h3 className="font-semibold text-2xl mb-2 text-white">Đang tìm thêm gia sư?</h3>
          <p className="font-normal text-base opacity-90 mb-6 text-white">Chúng tôi tiếp tục gợi ý bài đăng của bạn tới các gia sư xuất sắc nhất trong khu vực.</p>
          <button className="bg-white text-[#003d9b] px-8 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition-all active:scale-95">
            Đẩy tin bài đăng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantReview;
