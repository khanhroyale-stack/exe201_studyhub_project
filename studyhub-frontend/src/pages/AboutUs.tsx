import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#f7f9ff] text-on-background min-h-screen">
      <main className="pt-[120px] pb-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-extrabold text-[42px] md:text-[56px] leading-[1.1] text-[#0f172a] mb-6">
            Về StudyHub
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Sứ mệnh của chúng tôi là kết nối tri thức, mang lại cơ hội học tập chất lượng và minh bạch cho học sinh và sinh viên toàn quốc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a] mb-6">Nền tảng eKYC Giáo dục Tiên phong</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              StudyHub tự hào là nền tảng kết nối gia sư tiên phong tại Việt Nam ứng dụng công nghệ eKYC (định danh điện tử) để xác thực hồ sơ và bằng cấp của toàn bộ đội ngũ gia sư.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Chúng tôi hiểu rằng sự an tâm của phụ huynh là yếu tố tiên quyết. Do đó, mọi thông tin trên StudyHub đều được đảm bảo chính xác, giúp phụ huynh và học viên hoàn toàn yên tâm khi lựa chọn người hướng dẫn.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-indigo-500/10 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
            <span className="material-symbols-outlined text-8xl text-primary opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-5xl text-emerald-500 mb-4">auto_stories</span>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Tầm nhìn</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Trở thành nền tảng giáo dục lớn nhất Đông Nam Á, nơi mọi người đều có thể tìm thấy môi trường học tập tốt nhất cho riêng mình.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-5xl text-blue-500 mb-4">handshake</span>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Giá trị cốt lõi</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Tận tâm - Minh bạch - Chất lượng. Chúng tôi đặt học viên làm trung tâm và quyền lợi của người học lên hàng đầu.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-5xl text-purple-500 mb-4">groups</span>
            <h3 className="text-xl font-bold text-[#0f172a] mb-3">Cộng đồng</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Xây dựng cộng đồng học tập văn minh, hỗ trợ lẫn nhau cùng phát triển không chỉ trong học thuật mà còn kỹ năng sống.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
