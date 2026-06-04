import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';

const ParentLayout: React.FC = () => {
  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen font-sans">
      <TopNavBar />
      <SideNavBar />
      
      {/* Main Content Area */}
      <main className="ml-[280px] mt-[72px] p-8 min-h-[calc(100vh-72px)] pb-24">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer (Shared Component) */}
      <footer className="ml-[280px] w-[calc(100%-280px)] py-12 px-8 flex flex-col items-center gap-6 bg-white border-t border-[#c3c6d6]">
        <div className="flex flex-wrap justify-center gap-8">
          <a className="font-medium text-sm text-[#434654] hover:text-[#003d9b] hover:underline transition-all" href="#">Về chúng tôi</a>
          <a className="font-medium text-sm text-[#434654] hover:text-[#003d9b] hover:underline transition-all" href="#">Điều khoản dịch vụ</a>
          <a className="font-medium text-sm text-[#434654] hover:text-[#003d9b] hover:underline transition-all" href="#">Chính sách bảo mật</a>
          <a className="font-medium text-sm text-[#434654] hover:text-[#003d9b] hover:underline transition-all" href="#">Trung tâm trợ giúp</a>
          <a className="font-medium text-sm text-[#434654] hover:text-[#003d9b] hover:underline transition-all" href="#">Liên hệ</a>
        </div>
        <div className="text-center">
          <span className="font-bold text-xl text-[#191c1e] mb-2 block">StudyHub</span>
          <p className="font-normal text-sm text-[#434654]">© 2026 StudyHub. Nền tảng Gia sư Hàng đầu.</p>
        </div>
      </footer>
    </div>
  );
};

export default ParentLayout;
