import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tutorApi, Tutor } from '../../services/tutorApi';

const TutorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tutorId = id ? parseInt(id, 10) : 1;
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      setLoading(true);
      try {
        const data = await tutorApi.getTutorById(tutorId);
        setTutor(data);
      } catch (error) {
        console.error('Failed to fetch tutor details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [tutorId]);

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen pt-[72px] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="bg-surface text-on-surface min-h-screen pt-[72px] flex flex-col justify-center items-center">
        <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">person_off</span>
        <p className="text-slate-500 mb-4">Không tìm thấy thông tin gia sư.</p>
        <button onClick={() => navigate('/tutors')} className="text-primary hover:underline">Quay lại danh sách</button>
      </div>
    );
  }

  const tutorTitle = `${tutor.major ? tutor.major + ' - ' : ''}${tutor.universityName || 'Gia sư'}`;

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-surface-container-lowest w-full pt-12 pb-16 border-b border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                <img 
                  className="w-full h-full object-cover" 
                  alt={tutor.fullName}
                  src={tutor.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(tutor.fullName) + '&background=003d9b&color=fff'} 
                />
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">{tutor.fullName}</h1>
                  <div className="flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-md text-label-md">{tutor.averageRating?.toFixed(1) || '0.0'} ({tutor.totalReviews || 0})</span>
                  </div>
                </div>
                <p className="text-primary font-headline-sm text-headline-sm">{tutorTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects?.map((subject, index) => (
                    <span key={index} className="px-4 py-1.5 bg-secondary-container/20 text-on-secondary-container rounded-full font-label-md text-label-md">
                      {subject.name}
                    </span>
                  ))}
                  {tutor.teachingMethod && tutor.teachingMethod !== 'ALL' && (
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full font-label-md text-label-md border border-slate-200">
                      {tutor.teachingMethod}
                    </span>
                  )}
                </div>
                <p className="text-on-surface-variant max-w-3xl font-body-lg text-body-lg whitespace-pre-line">
                  {tutor.introduction || 'Chưa có thông tin giới thiệu.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-6">
          {/* Left Column: Details */}
          <div className="flex-grow space-y-12">


            {/* Education */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">school</span>
                Học vấn & Bằng cấp
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex gap-4">
                  <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant">history_edu</span>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">{tutorTitle}</h3>
                    <p className="text-body-sm text-on-surface-variant">Đã xác thực bằng cấp</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex gap-4">
                  <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant">verified</span>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">Chứng chỉ / CMND</h3>
                    <p className="text-body-sm text-on-surface-variant">Đã xác thực eKYC</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">work</span>
                Kinh nghiệm giảng dạy
              </h2>
              <div className="space-y-4">
                <div className="relative pl-8 border-l-2 border-outline-variant pb-8 last:pb-0 ml-4">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-surface"></div>
                  <h3 className="font-label-md text-label-md text-on-surface">Gia sư trên hệ thống StudyHub</h3>
                  <p className="text-body-sm text-primary mb-2">Đã xác minh</p>
                  <p className="text-on-surface-variant">Giảng dạy tận tâm, có phương pháp sư phạm phù hợp với từng năng lực của học viên.</p>
                </div>
              </div>
            </section>

            {/* Schedule */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                Lịch dạy trống
              </h2>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="p-4 text-left font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">Thời gian</th>
                      <th className="p-4 text-center font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">T2</th>
                      <th className="p-4 text-center font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">T3</th>
                      <th className="p-4 text-center font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">T4</th>
                      <th className="p-4 text-center font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">T5</th>
                      <th className="p-4 text-center font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">T6</th>
                      <th className="p-4 text-center font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">T7</th>
                      <th className="p-4 text-center font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">CN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 font-label-sm text-label-sm text-on-surface">Sáng (08:00 - 11:00)</td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-label-sm text-label-sm text-on-surface">Chiều (14:00 - 17:00)</td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                    </tr>
                    <tr>
                      <td className="p-4 font-label-sm text-label-sm text-on-surface">Tối (19:00 - 21:00)</td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">check</span></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                      <td className="p-2"><div className="w-3 h-3 mx-auto rounded-full bg-primary/20"></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reviews */}
            {tutor.totalReviews > 0 && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">reviews</span>
                    Đánh giá từ học viên
                  </h2>
                  <span className="font-label-md text-label-md text-primary">Xem tất cả ({tutor.totalReviews})</span>
                </div>
                <div className="space-y-6">
                  {/* Just some dummy reviews for now since API might not return reviews list in TutorDTO directly */}
                  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">MT</div>
                        <div>
                          <h4 className="font-label-md text-label-md text-on-surface">Minh Tuấn</h4>
                          <p className="text-label-sm text-on-surface-variant">Lớp 12</p>
                        </div>
                      </div>
                      <div className="flex text-tertiary-container">
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </div>
                    <p className="text-on-surface-variant">Giáo viên giảng dạy rất nhiệt tình và chu đáo, luôn giúp đỡ tôi những phần bài tập khó hiểu.</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky CTA */}
          <aside className="w-full lg:w-[360px] flex-shrink-0">
            <div className="sticky top-[104px] bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm space-y-6">
              {/* Removed Price display */}
              <div className="space-y-4 pt-6 border-t border-outline-variant">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  <span className="text-body-sm font-body-sm">Gia sư đã được xác thực eKYC</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span className="text-body-sm font-body-sm">Phản hồi trong 30 phút</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">videocam</span>
                  <span className="text-body-sm font-body-sm">{tutor.teachingMethod === 'OFFLINE' ? 'Dạy trực tiếp (Offline)' : tutor.teachingMethod === 'ONLINE' ? 'Dạy qua Google Meet / Zoom' : 'Dạy cả Online và Offline'}</span>
                </div>
              </div>
              <button onClick={() => {
                alert('Chuyển hướng đến màn hình Chọn bài đăng để Mời dạy...');
                navigate('/parent/posts');
              }} className="w-full bg-primary text-white py-4 rounded-lg font-headline-sm text-headline-sm hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">person_add</span> Mời dạy
              </button>
              <button onClick={() => navigate('/parent/messages')} className="w-full border border-primary text-primary py-4 rounded-lg font-headline-sm text-headline-sm hover:bg-primary/10 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">chat</span> Nhắn tin
              </button>
              <p className="text-center text-label-sm font-label-sm text-on-surface-variant px-4">
                Tư vấn miễn phí lộ trình học tập và chọn lớp phù hợp.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TutorDetail;
