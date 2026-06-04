import React from 'react';
import { Link } from 'react-router-dom';

const TutorApplyClass: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 animate-fade-in">
      <div className="space-y-2 animate-slide-up">
        <h1 className="text-headline-lg md:text-headline-lg font-headline-lg text-on-surface">Ứng tuyển Lớp Toán 11 - Cầu Giấy</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">Vui lòng điền đầy đủ thông tin để phụ huynh có cái nhìn tốt nhất về bạn.</p>
      </div>

      {/* Cover Letter Section */}
      <section className="glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up stagger-1">
        <h2 className="text-headline-sm font-headline-sm text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">edit_document</span>
          Cover Letter (Thư ngỏ)
        </h2>
        <p className="text-body-sm text-on-surface-variant mb-4">Hãy viết một đoạn ngắn giới thiệu bản thân, phương pháp giảng dạy và lý do bạn phù hợp với lớp này.</p>
        <textarea 
          className="w-full h-40 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md p-4 resize-y transition-all outline-none" 
          placeholder="Ví dụ: Chào anh/chị, em là sinh viên năm 3 ĐH Sư Phạm chuyên ngành Toán..."
        ></textarea>
        <div className="flex justify-between items-center mt-2">
          <span className="text-label-sm text-outline">Tối thiểu 100 từ</span>
          <button className="text-primary hover:text-primary/80 font-label-md flex items-center gap-1" type="button">
            <span className="material-symbols-outlined text-sm">magic_button</span> AI Gợi ý
          </button>
        </div>
      </section>

      {/* Profile Confirmation Section */}
      <section className="glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up stagger-2">
        <h2 className="text-headline-sm font-headline-sm text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">account_box</span>
          Xác nhận Hồ sơ (Gửi cho Phụ huynh)
        </h2>
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center font-bold text-xl text-on-primary-container shadow-sm">A</div>
            <div>
              <h3 className="text-body-lg font-bold text-on-surface">Nguyễn Văn A</h3>
              <p className="text-body-md text-on-surface-variant">Sinh viên năm 3 - Đại học Sư Phạm Hà Nội</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-label-sm font-label-sm">Toán học</span>
                <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-label-sm font-label-sm">Vật lý</span>
              </div>
            </div>
            <Link to="/tutor/settings" className="ml-auto text-primary text-label-sm hover:underline">Chỉnh sửa</Link>
          </div>
          <hr className="border-outline-variant" />
          {/* Education & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-label-md font-label-md text-on-surface-variant mb-2 uppercase tracking-wider">Học vấn</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-body-md">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">school</span>
                  <span>Đại học Sư Phạm Hà Nội (Sư phạm Toán) - Điểm tích lũy: 3.6/4.0</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-label-md font-label-md text-on-surface-variant mb-2 uppercase tracking-wider">Kinh nghiệm</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-body-md">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">work_history</span>
                  <span>2 năm gia sư môn Toán cấp 3, học sinh đỗ ĐH Bách Khoa.</span>
                </li>
              </ul>
            </div>
          </div>
          <hr className="border-outline-variant" />
          {/* Certifications */}
          <div>
            <h4 className="text-label-md font-label-md text-on-surface-variant mb-2 uppercase tracking-wider">Chứng chỉ nổi bật</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 border border-outline-variant rounded-lg p-2 bg-surface">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <span className="text-body-sm font-medium">IELTS 7.0</span>
              </div>
              <div className="flex items-center gap-2 border border-outline-variant rounded-lg p-2 bg-surface">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <span className="text-body-sm font-medium">Giải Nhì HSG Toán Tỉnh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment & Action */}
      <section className="glass border border-primary/20 bg-primary/5 rounded-2xl p-6 animate-slide-up stagger-3">
        <h2 className="text-headline-sm font-headline-sm text-on-surface mb-4">Cam kết chất lượng</h2>
        <label className="flex items-start gap-3 cursor-pointer">
          <input className="mt-1 rounded text-primary focus:ring-primary border-outline" type="checkbox" />
          <span className="text-body-md text-on-surface-variant">
            Tôi cam kết những thông tin trên là hoàn toàn chính xác. Tôi đồng ý với các điều khoản của StudyHub về việc duy trì chất lượng giảng dạy và chuẩn mực đạo đức nghề nghiệp.
          </span>
        </label>
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <Link to="/tutor/search-classes" className="px-6 py-3 rounded-xl border border-outline-variant text-body-md font-medium text-on-surface hover:bg-white/50 transition-colors text-center active:scale-95">Hủy</Link>
          <button className="px-6 py-3 bg-primary text-on-primary rounded-xl text-body-md font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95">Gửi hồ sơ ứng tuyển</button>
        </div>
      </section>
    </div>
  );
};

export default TutorApplyClass;
