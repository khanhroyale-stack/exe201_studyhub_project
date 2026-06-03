import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant w-full py-16">
      <div className="px-margin-desktop max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <span className="font-headline-sm text-headline-sm font-bold text-primary">StudyHub</span>
            <p className="mt-6 text-body-md text-on-surface-variant leading-relaxed">Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam, mang đến giải pháp học tập cá nhân hóa và chất lượng cao.</p>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold text-on-surface mb-8">Môn học</h4>
            <ul className="space-y-4 text-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Toán học</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Vật lý</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Hóa học</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Tiếng Anh</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Tin học</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold text-on-surface mb-8">Liên kết</h4>
            <ul className="space-y-4 text-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Về chúng tôi</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Quy trình làm việc</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Chính sách bảo mật</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Điều khoản sử dụng</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold text-on-surface mb-8">Tải ứng dụng</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant cursor-pointer hover:border-primary transition-all group">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">phone_iphone</span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant opacity-70">App Store</p>
                  <p className="text-sm font-bold text-on-surface">StudyHub Mobile</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-outline-variant cursor-pointer hover:border-primary transition-all group">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">ad_units</span>
                <div>
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant opacity-70">Google Play</p>
                  <p className="text-sm font-bold text-on-surface">StudyHub Android</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-outline-variant">
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">© 2024 StudyHub. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">language</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
