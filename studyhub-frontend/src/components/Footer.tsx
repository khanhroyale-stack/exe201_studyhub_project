import React from 'react';
import StudyHubLogo from './StudyHubLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant w-full py-16">
      <div className="px-margin-desktop max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="md:w-1/2">
            <StudyHubLogo iconSize={36} textSize="text-2xl" noLink />
            <p className="mt-6 text-body-lg text-on-surface-variant leading-relaxed max-w-lg">
              Nền tảng kết nối gia sư và học viên hàng đầu Việt Nam, mang đến giải pháp học tập cá nhân hóa và chất lượng cao.
            </p>
          </div>
          <div className="md:w-1/3">
            <h4 className="font-label-lg text-label-lg font-bold text-on-surface mb-8">Liên kết</h4>
            <ul className="space-y-4 text-body-lg text-on-surface-variant">
              <li>
                <a className="hover:text-primary transition-colors flex items-center gap-2" href="https://www.facebook.com/profile.php?id=61590522654405" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined text-xl">facebook</span>
                  Fanpage Facebook
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors flex items-center gap-2" href="https://www.facebook.com/nguyen.cong.367496?comment_id=Y29tbWVudDoxMjIxMDMzMDUxMjEzNTA3NTVfMTQ4MjA0NjI0NjQwMjU0MA%3D%3D" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined text-xl">contact_support</span>
                  Liên hệ
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors flex items-center gap-2" href="/about-us">
                  <span className="material-symbols-outlined text-xl">info</span>
                  Về chúng tôi (About Us)
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-outline-variant">
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">© 2024 StudyHub. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://www.facebook.com/profile.php?id=61590522654405" target="_blank" rel="noopener noreferrer"><span className="material-symbols-outlined">social_leaderboard</span></a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">language</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
