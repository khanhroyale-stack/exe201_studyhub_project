import React from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_TUTORS } from '../../constants/mockData';

const TutorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tutorId = id ? parseInt(id, 10) : 1;
  const tutor = MOCK_TUTORS.find(t => t.id === tutorId) || MOCK_TUTORS[0];

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
                  alt={tutor.name}
                  src={tutor.avatar} 
                />
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">{tutor.name}</h1>
                  <div className="flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-label-md text-label-md">{tutor.rating}</span>
                  </div>
                </div>
                <p className="text-primary font-headline-sm text-headline-sm">{tutor.title}</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.tags.map((subject, index) => (
                    <span key={index} className="px-4 py-1.5 bg-secondary-container/20 text-on-secondary-container rounded-full font-label-md text-label-md">
                      {subject}
                    </span>
                  ))}
                </div>
                <p className="text-on-surface-variant max-w-3xl font-body-lg text-body-lg">
                  Chào bạn! Tôi là {tutor.name}, với hơn 5 năm kinh nghiệm giảng dạy. Tôi tin rằng mọi học sinh đều có thể chinh phục môn học nếu tìm được phương pháp tiếp cận phù hợp và sự kiên nhẫn từ người thầy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-6">
          {/* Left Column: Details */}
          <div className="flex-grow space-y-12">
            {/* About Me */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">person</span>
                Giới thiệu bản thân
              </h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant space-y-4 text-on-surface-variant">
                <p>Với hơn 5 năm tận tụy với nghề giáo, tôi đã đồng hành cùng hàng trăm học sinh trong các kỳ thi chuyển cấp và ôn thi. Phương pháp dạy của tôi không chỉ dừng lại ở việc truyền đạt công thức, mà là khơi gợi tư duy logic và cách giải quyết vấn đề có hệ thống.</p>
                <p>Tôi đặc biệt chú trọng vào việc xây dựng nền tảng vững chắc trước khi nâng cao, giúp học sinh mất gốc lấy lại tự tin và học sinh khá giỏi đạt được điểm cao trong các kỳ thi quan trọng.</p>
              </div>
            </section>

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
                    <h3 className="font-label-md text-label-md text-on-surface">Thạc sĩ / Cử nhân Sư phạm</h3>
                    <p className="text-body-sm text-on-surface-variant">Đại học Sư phạm | 2018 - 2020</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex gap-4">
                  <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-primary-fixed-variant">verified</span>
                  </div>
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface">Chứng chỉ Nghiệp vụ Sư phạm</h3>
                    <p className="text-body-sm text-on-surface-variant">Bộ Giáo dục & Đào tạo | 2017</p>
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
                  <h3 className="font-label-md text-label-md text-on-surface">Gia sư cao cấp tại StudyHub</h3>
                  <p className="text-body-sm text-primary mb-2">2021 - Hiện tại</p>
                  <p className="text-on-surface-variant">Hỗ trợ học sinh xây dựng lộ trình học tập cá nhân hóa, tỷ lệ học sinh đỗ đạt cao.</p>
                </div>
                <div className="relative pl-8 border-l-2 border-outline-variant pb-8 last:pb-0 ml-4">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-outline-variant border-4 border-surface"></div>
                  <h3 className="font-label-md text-label-md text-on-surface">Giáo viên tự do</h3>
                  <p className="text-body-sm text-primary mb-2">2018 - 2021</p>
                  <p className="text-on-surface-variant">Giảng dạy chương trình phổ thông các cấp, bồi dưỡng học sinh.</p>
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
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">reviews</span>
                  Đánh giá từ học viên
                </h2>
                <span className="font-label-md text-label-md text-primary">Xem tất cả (48)</span>
              </div>
              <div className="space-y-6">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">MT</div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface">Minh Tuấn</h4>
                        <p className="text-label-sm text-on-surface-variant">Lớp 12 - Luyện thi ĐH</p>
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
                  <p className="text-on-surface-variant">Cô dạy rất dễ hiểu, đặc biệt là phần hình học không gian vốn là nỗi khiếp sợ của mình. Nhờ cô mà mình đã tự tin hơn rất nhiều khi làm đề thi thử.</p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">HL</div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface">Hương Ly</h4>
                        <p className="text-label-sm text-on-surface-variant">Lớp 11</p>
                      </div>
                    </div>
                    <div className="flex text-tertiary-container">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant">Phương pháp giảng dạy rất logic và hiện đại. Cô luôn kiên nhẫn giải thích cho đến khi mình hiểu bài mới thôi.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky CTA */}
          <aside className="w-full lg:w-[360px] flex-shrink-0">
            <div className="sticky top-[104px] bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-sm space-y-6">
              <div>
                <p className="text-on-surface-variant text-label-md font-label-md mb-1">Học phí</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-headline-md font-headline-md text-primary">{tutor.price}/h</span>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-outline-variant">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  <span className="text-body-sm font-body-sm">Gia sư đã được xác thực</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span className="text-body-sm font-body-sm">Phản hồi trong 30 phút</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">videocam</span>
                  <span className="text-body-sm font-body-sm">Dạy qua Google Meet / Zoom</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-lg font-headline-sm text-headline-sm hover:bg-primary-container transition-all active:scale-[0.98]">
                Đăng ký học
              </button>
              <button className="w-full border border-primary text-primary py-4 rounded-lg font-headline-sm text-headline-sm hover:bg-primary/10 transition-all">
                Gửi tin nhắn
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
