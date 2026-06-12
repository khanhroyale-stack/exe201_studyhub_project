import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-16 text-center animate-fade-in">
        <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-primary/20">
          Về StudyHub
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-background mb-8 leading-tight">
          Sứ mệnh kết nối tri thức <br />
          <span className="text-primary">Nâng tầm giáo dục</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-16">
          StudyHub ra đời với mục tiêu mang đến một nền tảng kết nối gia sư và học viên an toàn, minh bạch và hiệu quả nhất tại Việt Nam. Chúng tôi tin rằng mỗi học sinh đều có tiềm năng phát triển vượt bậc nếu tìm được người hướng dẫn phù hợp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
          <div className="bg-white p-8 rounded-3xl border border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
            </div>
            <h3 className="text-xl font-bold mb-3">An toàn & Xác thực</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Tất cả gia sư đều được xác thực danh tính qua công nghệ eKYC và kiểm duyệt bằng cấp nghiêm ngặt để đảm bảo chất lượng.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl">speed</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Kết nối nhanh chóng</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Hệ thống gợi ý thông minh giúp phụ huynh tìm được gia sư phù hợp với nhu cầu và khu vực chỉ trong vài phút.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-emerald-600 text-3xl">handshake</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Hỗ trợ tận tâm</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Đội ngũ StudyHub luôn đồng hành cùng phụ huynh và gia sư trong suốt quá trình học tập để giải quyết mọi vấn đề.
            </p>
          </div>
        </div>

        <div className="bg-primary text-white rounded-[2.5rem] p-12 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 md:flex items-center justify-between">
            <div className="max-w-xl mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng tham gia?</h2>
              <p className="text-white/80">Cùng chúng tôi tạo nên những giờ học hiệu quả và ý nghĩa.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/register" className="bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-lg">
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
