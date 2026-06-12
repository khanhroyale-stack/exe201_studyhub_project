import React from 'react';
import StudyHubLogo from './StudyHubLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant w-full py-16">
      <div className="px-margin-desktop max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="md:w-1/2">
            <StudyHubLogo iconSize={32} textSize="text-xl" noLink />
            <p className="mt-6 text-body-md text-on-surface-variant leading-relaxed max-w-md">
              Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam, mang đến giải pháp học tập cá nhân hóa và chất lượng cao.
            </p>
          </div>
          <div className="md:w-1/2 flex flex-col md:items-end">
            <h4 className="font-label-md text-label-md font-bold text-on-surface mb-6">Liên hệ & Hỗ trợ</h4>
            <ul className="space-y-4 text-body-md text-on-surface-variant flex flex-col md:items-end">
              <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[18px]">public</span> Fanpage</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="#"><span className="material-symbols-outlined text-[18px]">thumb_up</span> Facebook</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2" href="/about-us"><span className="material-symbols-outlined text-[18px]">info</span> Về chúng tôi (About Us)</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-outline-variant">
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">© 2024 StudyHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
