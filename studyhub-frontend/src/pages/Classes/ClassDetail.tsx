import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_CLASSES } from '../../constants/mockData';

const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const classId = id ? parseInt(id, 10) : 1;

  // Find class details based on ID, fallback to the first mock class if not found
  const currentClass = MOCK_CLASSES.find(c => c.id === classId) || MOCK_CLASSES[0];

  return (
    <div className="bg-background text-on-surface">
      <main className="pt-[104px] pb-20 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto min-h-screen">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-on-surface-variant font-label-sm text-label-sm">
          <Link className="hover:text-primary" to="/classes">Lớp học</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="hover:text-primary cursor-pointer">{currentClass.subject || 'Toán học'}</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-bold">{currentClass.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Section Card */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-[320px] w-full">
                <img className="w-full h-full object-cover" src={currentClass.image} alt={currentClass.title} />
              </div>
              <div className="p-8">
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">{currentClass.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <img alt={currentClass.tutorName} className="w-6 h-6 rounded-full object-cover" src={currentClass.tutorAvatar} />
                    <span className="font-label-md text-label-md font-bold text-on-surface">{currentClass.tutorName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-md text-label-md">{currentClass.rating} (128 đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                    <span className="font-label-md text-label-md">{currentClass.currentStudents || 15}/{currentClass.maxStudents || 20} Học viên</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Description & Requirements */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 space-y-6">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Mô tả lớp học</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {currentClass.description}
                </p>
              </div>
              <hr className="border-outline-variant" />
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Yêu cầu khóa học</h2>
                <ul className="space-y-3">
                  {(currentClass.requirements || []).map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Tutor Profile */}
            <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <img alt={currentClass.tutorName} className="w-32 h-32 rounded-full border-4 border-surface-container-high object-cover" src={currentClass.tutorAvatar} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{currentClass.tutorName}</h3>
                      <p className="text-primary font-label-md text-label-md uppercase tracking-wider">{currentClass.tutorDesc}</p>
                    </div>
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg font-label-md text-label-md hover:bg-primary-container/10 transition-colors">Xem hồ sơ</button>
                  </div>
                  <div className="flex gap-4 mb-4">
                    {currentClass.tutorVerified && (
                      <div className="bg-surface-container-low px-3 py-1 rounded-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <span className="font-label-sm text-label-sm">Đã xác minh</span>
                      </div>
                    )}
                    <div className="bg-surface-container-low px-3 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">history</span>
                      <span className="font-label-sm text-label-sm">{currentClass.tutorExperience || '8 năm kinh nghiệm'}</span>
                    </div>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Với {currentClass.tutorExperience || 'nhiều năm kinh nghiệm'} trong giảng dạy, {currentClass.tutorName} có phương pháp sư phạm hiện đại, giúp học sinh nắm vững cốt lõi bài học, khơi dậy niềm say mê và tăng điểm số đáng kể.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Sticky Card */}
          <div className="lg:col-span-4 sticky top-[96px]">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6">
              <div>
                <span className="text-on-surface-variant font-label-sm text-label-sm block mb-1">Học phí mỗi buổi</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg text-primary">{currentClass.price}</span>
                  <span className="text-on-surface-variant font-body-sm text-body-sm">/ buổi ({currentClass.duration || '120 phút'})</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Lịch học</p>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">{currentClass.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Giờ học</p>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">{currentClass.sessionTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-outline-variant/30">
                  <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">{currentClass.locationType === 'computer' || currentClass.locationType === 'videocam' ? 'computer' : 'location_on'}</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Hình thức</p>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">{currentClass.location}</p>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary-container transition-all active:scale-95">
                Đăng ký ngay
              </button>
              <div className="text-center">
                <p className="font-body-sm text-body-sm text-on-surface-variant">Liên hệ tư vấn miễn phí: <span className="font-bold text-on-surface">1900 8198</span></p>
              </div>
              <div className="pt-4 border-t border-outline-variant space-y-3">
                <div className="flex justify-between font-label-md text-label-md">
                  <span className="text-on-surface-variant">Lộ trình học</span>
                  <span className="text-on-surface">{currentClass.totalSessions || '24 buổi'}</span>
                </div>
                <div className="flex justify-between font-label-md text-label-md">
                  <span className="text-on-surface-variant">Tài liệu tặng kèm</span>
                  <span className="text-on-surface">Sách bài tập + PDF</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h4 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">info</span>
                Chính sách bảo hành
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Hoàn trả học phí nếu học sinh không tiến bộ sau 1 tháng tham gia đầy đủ các buổi học.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassDetail;
