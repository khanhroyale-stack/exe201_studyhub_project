import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CLASSES } from '../../constants/mockData';

const STATS = [
  { value: '12,000+', label: 'Lớp đã kết nối', icon: 'school', color: 'bg-primary-fixed text-primary' },
  { value: '3,500+', label: 'Gia sư được xác thực', icon: 'verified', color: 'bg-secondary-fixed text-secondary' },
  { value: '98%', label: 'Tỷ lệ hài lòng', icon: 'thumb_up', color: 'bg-tertiary-fixed text-tertiary' },
  { value: '500+', label: 'Lớp mới mỗi ngày', icon: 'trending_up', color: 'bg-primary-fixed text-primary' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Đăng bài tìm gia sư',
    desc: 'Mô tả môn học, lịch học, học phí mong muốn. Hệ thống sẽ gợi ý các gia sư phù hợp ngay lập tức.',
    icon: 'post_add',
  },
  {
    step: '02',
    title: 'Duyệt & Chọn gia sư',
    desc: 'Xem hồ sơ, bằng cấp đã được xác thực eKYC, đánh giá từ phụ huynh khác rồi mời dạy thử miễn phí.',
    icon: 'person_search',
  },
  {
    step: '03',
    title: 'Học thử & Chốt lớp',
    desc: 'Buổi học thử hoàn toàn miễn phí. Nếu hài lòng mới chính thức chốt lớp, an toàn cho cả hai bên.',
    icon: 'fact_check',
  },
];

const TESTIMONIALS = [
  {
    name: 'Chị Nguyễn Lan Anh',
    role: 'Phụ huynh bé lớp 10',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8IwMybzeHQ58NopJnuBaSr81qhSa0FwewviuCcTnxfaVd0qGAsyeTbDXTyDavvtLVgmoYtYRV7hU5wICafi34zY4XiehqPSqldqT-G3__dLDoyAXSCamO4dOPXbEuPJRw9ILZhXkAtL68Us4oTUj3wcWR6oVZS7mMwweiQSsS-JI8SvPbzPUBTBs5m1piaN0XBmCIgugy1KcEsdHMPHUV0fe3oVsIitdyEJ5OVNTV1mV7R7PAGgFf6LyTlpUTOon0EPnZ34M48tx',
    quote: 'Chỉ trong 2 ngày đăng bài đã có hơn 5 gia sư ứng tuyển. Thầy dạy con tôi bây giờ rất tận tâm và điểm số cải thiện rõ rệt. Cảm ơn StudyHub!',
    stars: 5,
  },
  {
    name: 'Em Trần Hoàng (Gia sư)',
    role: 'Sinh viên ĐH Bách Khoa',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcyLV-pbCBKDruyPCKCIM4TqRUMe6owsX04_nA7hfv7pkavDnwNb5qh6nKmjn0waHKwRaliXWc7bwcZdJjX7_KOXYpPyx3f7zcV2w3yuFYUc-oA2zb1MCSVTCrkgmFmt_dxPUpoQVOozyI2HLAtv-0s7NyjJK3tcu9VO8-oPwPb8OAGd_JWbWmzlUleayZJrT7fX4p9bgRArPDwTI_9mZHP6xMlK2uJzakJzfSY7-A8CCmnMoZTVWGOf3vVH2xyclpDoC7hf06Qcc',
    quote: 'Nhờ StudyHub em đã có thêm thu nhập ổn định từ việc dạy 3 lớp song song. Hệ thống quản lý lịch dạy và tính phí rất minh bạch, em hoàn toàn tin tưởng.',
    stars: 5,
  },
];

const Homepage: React.FC = () => {
  const classesToShow = MOCK_CLASSES.slice(0, 3);

  return (
    <div className="bg-background text-on-background overflow-x-hidden">
      <main>

        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-[750px] flex items-center justify-center overflow-hidden py-24">
          {/* Background */}
          <div className="absolute inset-0 z-0 bg-background">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-secondary-container/10 animate-gradient" />
            
            {/* Decorative Floating Shapes */}
            <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] animate-float" />
            <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] rounded-full bg-secondary-container/20 blur-[80px] animate-float-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-fixed/30 blur-[120px] animate-pulse-ring" />
            
            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgNjEsIDE1NSwgMC4xKSIvPjwvc3ZnPg==')] opacity-50" />
          </div>

          <div className="relative z-10 px-6 md:px-margin-desktop w-full max-w-6xl mx-auto text-center flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/50 rounded-full px-5 py-2.5 mb-8 shadow-sm animate-scale-in">
              <span className="material-symbols-outlined text-primary text-[20px] material-fill">verified</span>
              <span className="text-primary font-label-md text-label-md">Nền tảng eKYC giáo dục tiên phong tại Việt Nam</span>
            </div>

            <h1 className="font-headline-xl text-[56px] leading-[1.1] text-on-surface mb-6 drop-shadow-sm max-w-4xl animate-slide-up opacity-0 stagger-1">
              Tìm <span className="shimmer-text font-bold">gia sư tận tâm</span><br />
              chỉ trong vài phút
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto animate-slide-up opacity-0 stagger-2">
              Kết nối với hàng nghìn gia sư đã được xác thực danh tính và chuyên môn. Học thử miễn phí, an tâm tuyệt đối.
            </p>

            {/* Search Card */}
            <div className="glass p-4 md:p-6 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,61,155,0.15)] border-white/60 text-left w-full max-w-4xl mx-auto animate-slide-up opacity-0 stagger-3">
              <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[22px]">search</span>
                  <input
                    className="w-full bg-transparent border-none pl-12 pr-4 py-4 font-body-md text-body-md focus:ring-0 outline-none placeholder:text-outline-variant"
                    placeholder="Nhập môn học hoặc từ khóa..."
                    type="text"
                  />
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-outline-variant group-focus-within:bg-primary transition-colors md:hidden" />
                </div>
                
                <div className="hidden md:block w-[1px] bg-outline-variant my-2" />
                
                <div className="relative flex-1 group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[22px]">location_on</span>
                  <select className="w-full bg-transparent border-none pl-12 pr-4 py-4 font-body-md text-body-md focus:ring-0 outline-none appearance-none cursor-pointer text-on-surface">
                    <option value="">Khu vực học</option>
                    <option>TP. Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                </div>

                <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold font-body-md shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap">
                  <span className="material-symbols-outlined">search</span>
                  Tìm ngay
                </button>
              </div>
              
              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <span className="font-label-sm text-label-sm text-on-surface-variant/80">Xu hướng:</span>
                {['Toán lớp 10', 'IELTS 6.5', 'Luyện thi Đại học', 'Giao tiếp Tiếng Anh'].map(tag => (
                  <button key={tag} className="px-4 py-1.5 bg-white/60 hover:bg-primary hover:text-on-primary border border-white hover:border-primary rounded-full font-label-sm text-label-sm text-on-surface-variant transition-all shadow-sm">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS SECTION ===== */}
        <section className="px-6 md:px-margin-desktop py-16 max-w-[1440px] mx-auto relative z-10 -mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <div key={idx} className={`glass bg-white/80 border border-white/60 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,61,155,0.08)] hover:-translate-y-2 transition-all duration-500 animate-slide-up opacity-0 stagger-${idx + 2}`}>
                <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center mb-5 rotate-3 hover:rotate-6 transition-transform duration-300 shadow-sm`}>
                  <span className="material-symbols-outlined text-[32px]">{stat.icon}</span>
                </div>
                <p className="font-headline-lg text-headline-lg text-on-surface font-bold mb-1">{stat.value}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="px-6 md:px-margin-desktop py-24 max-w-[1440px] mx-auto overflow-hidden">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-fixed/50 border border-primary/10 text-primary px-4 py-1.5 rounded-full font-label-md text-label-md uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Cách hoạt động
            </div>
            <h2 className="font-headline-xl text-[40px] text-on-surface font-bold leading-tight">Đơn giản · Nhanh chóng · An toàn</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl mx-auto">
              Từ đăng bài đến buổi học đầu tiên, chúng tôi thiết kế quy trình tối ưu nhất để mang lại trải nghiệm tuyệt vời.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Animated Connector Line */}
            <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-0.5 bg-outline-variant/30 z-0 overflow-hidden">
               <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" />
            </div>

            {HOW_IT_WORKS.map((step, idx) => (
              <div key={idx} className={`relative z-10 flex flex-col items-center text-center group animate-slide-up opacity-0 stagger-${idx + 1}`}>
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-surface-container-lowest border-4 border-surface rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,61,155,0.12)] group-hover:scale-110 group-hover:border-primary/20 transition-all duration-500 relative z-10">
                    <span className="material-symbols-outlined text-primary text-[40px] group-hover:scale-110 transition-transform duration-500">{step.icon}</span>
                  </div>
                  <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="absolute -top-3 -right-3 bg-gradient-to-br from-secondary-container to-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md z-20">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CLASS LIST SECTION ===== */}
        <section className="px-6 md:px-margin-desktop py-24 bg-surface-container-lowest relative">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-secondary-fixed/50 border border-secondary/10 text-secondary-fixed-variant px-4 py-1.5 rounded-full font-label-md text-label-md uppercase tracking-widest mb-4">
                  Mới cập nhật
                </div>
                <h2 className="font-headline-xl text-[40px] text-on-surface font-bold">Lớp học nổi bật</h2>
              </div>
              <Link to="/classes" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-all duration-300 group shadow-[0_4px_14px_0_rgba(0,61,155,0.1)] hover:shadow-[0_6px_20px_rgba(0,61,155,0.2)]">
                Xem tất cả
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classesToShow.map((cls, idx) => (
                <div key={cls.id} className={`bg-white rounded-[2rem] border border-outline-variant overflow-hidden group hover:shadow-[0_20px_40px_-15px_rgba(0,61,155,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col animate-slide-up opacity-0 stagger-${idx + 1}`}>
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden bg-surface-container">
                    <img alt={cls.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" src={cls.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-on-surface px-4 py-2 rounded-xl font-label-md text-label-md font-bold shadow-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[18px]">payments</span>
                      {cls.price}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-3 line-clamp-2 group-hover:text-primary transition-colors">{cls.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-8 leading-relaxed opacity-80">{cls.description}</p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{cls.locationType === 'Offline' ? 'location_on' : 'laptop_mac'}</span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface font-medium">{cls.location}</span>
                      </div>
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                          <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                        </div>
                        <span className="font-body-md text-body-md text-on-surface font-medium">{cls.schedule}</span>
                      </div>
                    </div>

                    <Link
                      to={`/classes/${cls.id}`}
                      className="mt-auto block text-center w-full bg-surface-container hover:bg-primary text-on-surface hover:text-on-primary py-4 rounded-xl font-bold font-body-md transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-lg hover:shadow-primary/20"
                    >
                      Chi tiết lớp học
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="px-6 md:px-margin-desktop py-20 max-w-[1440px] mx-auto">
          <div className="text-center mb-14">
            <p className="font-label-md text-label-md text-primary uppercase tracking-widest mb-3">Đánh giá thực tế</p>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Phụ huynh & Gia sư nói gì?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className={`bg-surface-container-lowest border border-outline-variant rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up opacity-0 stagger-${idx + 1} relative`}>
                {/* Quote icon */}
                <span className="material-symbols-outlined text-primary-fixed text-5xl absolute top-6 right-8 opacity-60">format_quote</span>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-tertiary-fixed-dim text-[20px] material-fill">star</span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary-fixed" />
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">{t.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="px-6 md:px-margin-desktop py-24 max-w-[1440px] mx-auto animate-fade-in stagger-3">
          <div className="bg-gradient-to-br from-primary-dark to-primary-light rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            {/* Elaborate Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl animate-float-slow" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-container/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl animate-float" />
              
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="text-center lg:text-left max-w-2xl flex-1 animate-slide-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-secondary-fixed px-4 py-1.5 rounded-full font-label-md text-label-md uppercase tracking-widest mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">stars</span>
                  Dành riêng cho gia sư
                </div>
                <h2 className="font-headline-xl text-[48px] leading-tight text-white mb-6 drop-shadow-md">
                  Biến kiến thức của bạn<br />thành thu nhập bền vững
                </h2>
                <p className="font-body-lg text-body-lg text-white/80 mb-10 leading-relaxed max-w-xl lg:mx-0 mx-auto">
                  Gia nhập mạng lưới 3,500+ gia sư ưu tú. Quản lý lớp học thông minh, thu nhập minh bạch và nhận hỗ trợ 24/7 từ StudyHub.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-xl font-bold font-body-md hover:bg-surface-container-lowest hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">person_add</span>
                    Đăng ký trở thành gia sư
                  </button>
                  <button className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold font-body-md hover:bg-white/10 hover:border-white/60 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
                    Tìm hiểu chính sách
                  </button>
                </div>
              </div>

              {/* Right: Feature Cards */}
              <div className="shrink-0 w-full lg:w-auto flex flex-col gap-4 animate-slide-right">
                {[
                  { icon: 'verified_user', title: 'Hồ sơ chuyên nghiệp', desc: 'Xác thực eKYC nâng cao uy tín' },
                  { icon: 'calendar_clock', title: 'Lịch dạy linh hoạt', desc: 'Hoàn toàn chủ động thời gian' },
                  { icon: 'account_balance_wallet', title: 'Thu nhập minh bạch', desc: 'Thanh toán rõ ràng, nhanh chóng' },
                ].map((feat, i) => (
                  <div key={i} className={`glass bg-white/10 p-5 rounded-2xl flex items-center gap-5 hover:bg-white/15 transition-colors duration-300 border border-white/20 stagger-${i + 1}`}>
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                      <span className="material-symbols-outlined text-white text-[28px] material-fill">{feat.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-white mb-1">{feat.title}</h4>
                      <p className="font-body-sm text-body-sm text-white/70">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Homepage;
