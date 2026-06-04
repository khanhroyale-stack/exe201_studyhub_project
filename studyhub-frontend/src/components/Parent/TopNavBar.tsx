import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CURRENT_PARENT } from '../../constants/mockParentData';

const TopNavBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] z-50 flex items-center justify-between px-8 bg-[#f8f9fb] dark:bg-[#e1e2e4] border-b border-[#c3c6d6] dark:border-[#737685]">
      <div className="flex items-center gap-10">
        <Link to="/parent/home" className="font-headline-md text-headline-md font-bold text-[#003d9b] flex items-center gap-2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmX5r2ITtQMkHposhetc4Bygg8-0TRMYQbwFKkvHZAdcpV69m-8SVL5dZpqp_-Ry6FQJJe1DZOdDFk3rlZXP6hqllDPJ9JiVPrHnEU-wgHkKWELJjtGQR4hOXlGY0q948gN3a-spAAFS7-uumiJ83jH2wjZviXNTcpIDCpKgb_93OPO99m6SPZJ7xFGgFJjuceJ-hPiRccx9WeiPF4HGU1u8qXIrt5isqNX28TSgXx604IvPUF7p9KymiqLZbcPwOa6b-hesCUNG1D"
            alt="StudyHub Icon"
            className="h-8 w-auto"
          />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKHyft3PeGqMnaMevjoDU105oYdejtnzLPaNVVh5pbGJJR0Nx6u7ijGgyCEntAtxSQCnoUP4uTD5CRn5V5x9c403rpWpiicKuODY9isr_rNYaKYDKSuO4tjngSVpoH24JStvfnIQbO3CJpM-bhaGppIsW8TJgOW_cmxWJyy4Z_lHzUVLEalFx93qqjeeZJfkD40Esrcx6WtehojfU7abG6JotBUIna7q_reHF11jgtb1S64Uij3e5WnHUAd3XPHKFBWjdNSpGuo-F4"
            alt="StudyHub"
            className="h-8 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 h-full pt-1">
          <Link to="/parent/home" className="font-semibold text-sm text-[#003d9b] border-b-2 border-[#003d9b] pb-1 h-full flex items-center">
            Trang chủ
          </Link>
          <Link to="/parent/classes" className="font-semibold text-sm text-[#434654] hover:text-[#003d9b] hover:bg-[#f3f4f6] px-2 transition-colors duration-150 flex items-center h-full">
            Tất cả lớp học
          </Link>
          <Link to="/tutors" className="font-semibold text-sm text-[#434654] hover:text-[#003d9b] hover:bg-[#f3f4f6] px-2 transition-colors duration-150 flex items-center h-full">
            Gia sư
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/parent/dashboard" className="bg-[#003d9b] text-white px-5 py-2 rounded-lg font-semibold text-sm active:scale-95 transition-transform">
          Quản lý
        </Link>
        <button className="p-2 rounded-full hover:bg-[#f3f4f6] transition-colors duration-150 relative">
          <span className="material-symbols-outlined text-[#434654]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
        </button>
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 pl-4 border-l border-[#c3c6d6] cursor-pointer hover:bg-[#f3f4f6] p-1 rounded-lg transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="text-right">
              <p className="font-semibold text-sm text-[#191c1e] leading-none">Xin chào {CURRENT_PARENT.name}</p>
              <p className="font-normal text-xs text-[#434654] opacity-70">Phụ huynh</p>
            </div>
            <img
              alt="Phụ huynh"
              className="w-10 h-10 rounded-full object-cover border border-[#c3c6d6]"
              src={CURRENT_PARENT.avatar}
            />
            <span className="material-symbols-outlined text-[#434654] text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>expand_more</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#c3c6d6] rounded-xl shadow-lg overflow-hidden flex flex-col z-50">
              <div className="px-4 py-3 border-b border-[#edeef0]">
                <p className="text-sm font-semibold text-[#191c1e]">{CURRENT_PARENT.name}</p>
                <p className="text-xs text-[#434654] truncate">{CURRENT_PARENT.email}</p>
              </div>
              <button 
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-[#f3f4f6] transition-colors"
                onClick={() => { setIsDropdownOpen(false); navigate('/parent/settings'); }}
              >
                <span className="material-symbols-outlined text-[20px] text-[#434654]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>settings</span>
                <span className="text-sm font-medium text-[#191c1e]">Cài đặt</span>
              </button>
              <button 
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-[#f3f4f6] transition-colors text-[#ba1a1a]"
                onClick={handleLogout}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>logout</span>
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
