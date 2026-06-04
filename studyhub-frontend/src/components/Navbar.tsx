import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CURRENT_PARENT } from '../constants/mockParentData';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, role, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    isActive(path)
      ? 'text-primary font-semibold border-b-2 border-primary pb-0.5 text-sm transition-all'
      : 'text-on-surface-variant hover:text-primary font-medium text-sm transition-colors duration-150';

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-[72px] bg-surface-container-lowest border-b border-outline-variant shadow-sm">
      <div className="max-w-[1440px] mx-auto h-full px-6 md:px-8 flex items-center justify-between gap-8">

        {/* ── Left: Logo + Nav links ── */}
        <div className="flex items-center gap-10">
          {/* Logo — always goes to homepage */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="StudyHub - Về trang chủ">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJdvBj1opnzIpKPA5m7lejtn-HWuB9a_1bmsw3W7JAAxZ1zDa9YN7hncSFmJKzd66Pt0w_YjzdCO2E1qf9CxtRQU5MYncCXtnEjKW0ulS4jpl7ypD59LLLItKWdHgHj_1JzJMrNc5TNWHjOafbN9r52-ms0xTv5d9TbgFNMxCsT5t2j4FKxdF9npe5eHdI9gCuq5TP9qIRDGxT-_dZVcPW1sgB-eCLVr8yM-Zd3HAwfrV6pncwVk45a8LBfjcUV2mHxUVBBIwLrKmj"
              alt="StudyHub Icon"
              className="h-9 w-auto object-contain"
            />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAegMx2DkgcnXl20nQkWCmGTJINmVSym9fvmeXdZImRE4PlEQjJqm7yVwH7nzkhLM94kU0dnnWZjV9WOAPuCVlhmMmnGpi6i_7r5mvzsD10o_JYu_52ZwXU-SXKl1DpQGf4yZIzHT5Hp6m6Z17735i2Fo1vu5V0Ip-IesEVSBUogC5TZB1WultCB-dWJkjalsLHbc-DGLePc-GUwKWVLakhvTJSXe8HC8bQ1K189miOlKG1Gcc8qYpvzjWcqK4HBJmNf9XNGq0eVBxZ"
              alt="StudyHub"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkClass('/')}>Trang chủ</Link>
            <Link to="/classes" className={navLinkClass('/classes')}>Tất cả lớp học</Link>
            <Link to="/tutors" className={navLinkClass('/tutors')}>Gia sư</Link>
          </nav>
        </div>

        {/* ── Right: Auth / User area ── */}
        <div className="flex items-center gap-3">

          {/* ══ GUEST: chưa đăng nhập ══ */}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-primary font-semibold text-sm px-5 py-2 rounded-xl border border-primary hover:bg-primary-fixed/30 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-primary text-on-primary px-5 py-2 rounded-xl font-semibold text-sm hover:bg-primary-container transition-colors shadow-sm"
              >
                Đăng ký
              </Link>
            </>
          )}

          {/* ══ LOGGED IN: đã đăng nhập ══ */}
          {isLoggedIn && (
            <>
              {/* Dashboard quick-access (chỉ hiện trên desktop) */}
              {role === 'parent' && (
                <Link
                  to="/parent/dashboard"
                  className={`hidden md:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                    isActive('/parent')
                      ? 'bg-primary text-on-primary'
                      : 'text-primary border border-primary hover:bg-primary-fixed/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>
                  Quản lý
                </Link>
              )}

              {/* Notification Bell */}
              <button
                className="relative p-2 rounded-full hover:bg-surface-container transition-colors"
                aria-label="Thông báo"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
              </button>

              {/* Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 pl-3 border-l border-outline-variant hover:bg-surface-container rounded-xl p-1.5 transition-colors"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-semibold text-on-surface leading-none">{CURRENT_PARENT.name}</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">
                      {role === 'parent' ? 'Phụ huynh' : 'Gia sư'}
                    </p>
                  </div>
                  <img
                    src={CURRENT_PARENT.avatar}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover border-2 border-outline-variant"
                  />
                  <span
                    className={`material-symbols-outlined text-on-surface-variant text-[18px] transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white border border-outline-variant rounded-2xl shadow-xl overflow-hidden z-50">
                    {/* User info */}
                    <div className="px-4 py-3 bg-surface-container-low border-b border-outline-variant">
                      <p className="text-sm font-semibold text-on-surface">{CURRENT_PARENT.name}</p>
                      <p className="text-xs text-on-surface-variant truncate">{CURRENT_PARENT.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                      <Link
                        to="/parent/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">dashboard</span>
                        Dashboard
                      </Link>
                      <Link
                        to="/parent/posts"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">post_add</span>
                        Bài đăng của tôi
                      </Link>
                      <Link
                        to="/parent/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-low transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">settings</span>
                        Cài đặt tài khoản
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-outline-variant py-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/20 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-surface-container transition-colors"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-outline-variant shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-1">
            <Link to="/" className="flex items-center gap-3 py-3 text-sm font-medium text-on-surface border-b border-outline-variant/50">
              <span className="material-symbols-outlined text-[18px] text-primary">home</span>Trang chủ
            </Link>
            <Link to="/classes" className="flex items-center gap-3 py-3 text-sm font-medium text-on-surface border-b border-outline-variant/50">
              <span className="material-symbols-outlined text-[18px] text-primary">school</span>Tất cả lớp học
            </Link>
            <Link to="/tutors" className="flex items-center gap-3 py-3 text-sm font-medium text-on-surface border-b border-outline-variant/50">
              <span className="material-symbols-outlined text-[18px] text-primary">person_search</span>Gia sư
            </Link>

            {/* Mobile: Logged in */}
            {isLoggedIn && role === 'parent' && (
              <>
                <Link to="/parent/dashboard" className="flex items-center gap-3 py-3 text-sm font-medium text-primary border-b border-outline-variant/50">
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>Dashboard quản lý
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-error"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>Đăng xuất
                </button>
              </>
            )}

            {/* Mobile: Guest */}
            {!isLoggedIn && (
              <div className="flex gap-3 mt-3">
                <Link to="/login" className="flex-1 text-center py-2.5 border border-primary text-primary rounded-xl text-sm font-semibold">
                  Đăng nhập
                </Link>
                <Link to="/register" className="flex-1 text-center py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold">
                  Đăng ký
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
