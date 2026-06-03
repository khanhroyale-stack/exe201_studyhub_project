import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center h-[72px] px-margin-desktop">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-3 h-10">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJdvBj1opnzIpKPA5m7lejtn-HWuB9a_1bmsw3W7JAAxZ1zDa9YN7hncSFmJKzd66Pt0w_YjzdCO2E1qf9CxtRQU5MYncCXtnEjKW0ulS4jpl7ypD59LLLItKWdHgHj_1JzJMrNc5TNWHjOafbN9r52-ms0xTv5d9TbgFNMxCsT5t2j4FKxdF9npe5eHdI9gCuq5TP9qIRDGxT-_dZVcPW1sgB-eCLVr8yM-Zd3HAwfrV6pncwVk45a8LBfjcUV2mHxUVBBIwLrKmj" 
            alt="StudyHub Icon" 
            className="h-full w-auto object-contain" 
          />
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAegMx2DkgcnXl20nQkWCmGTJINmVSym9fvmeXdZImRE4PlEQjJqm7yVwH7nzkhLM94kU0dnnWZjV9WOAPuCVlhmMmnGpi6i_7r5mvzsD10o_JYu_52ZwXU-SXKl1DpQGf4yZIzHT5Hp6m6Z17735i2Fo1vu5V0Ip-IesEVSBUogC5TZB1WultCB-dWJkjalsLHbc-DGLePc-GUwKWVLakhvTJSXe8HC8bQ1K189miOlKG1Gcc8qYpvzjWcqK4HBJmNf9XNGq0eVBxZ" 
            alt="StudyHub" 
            className="h-8 w-auto object-contain" 
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md">
            Trang chủ
          </Link>
          <Link to="/classes" className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-md text-body-md">
            Tất cả lớp học
          </Link>
          <Link to="/tutors" className="text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-md text-body-md">
            Gia sư
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors">
            notifications
          </button>
          <div className="relative profile-container pl-4 border-l border-outline-variant group">
            <button className="flex items-center gap-3 focus:outline-none py-1">
              <div className="text-right hidden sm:block">
                <p className="font-label-md text-label-md text-on-surface">Xin chào user</p>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Học viên</p>
              </div>
              <div className="relative">
                <img 
                  alt="User avatar" 
                  className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVrQCmAU2xy3qlNwmHieo5ZgnOlM9Xb0jL8YxyKab4JKq-_HxvuYQ-Gw7UweQATYpeE6NllbIgWWX7O69Ufo4yBE2xQzV7J3e2MIy3TxUlG86o4R6DrCnCPrFJZKrjOJnDfO3gqeMhjx4BtNA4oHnd4SF0xtvwzVwSPiiiwi2FAjfjxP7kbcwPZwC79vjkKGwvIp358oAprX-CSoiQ36dVkP3hALlOcIjX4Ob2BvD4NKX8IzucjzigGar8X5j6hoSk1R5QaHd50KbA" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">keyboard_arrow_down</span>
            </button>
            {/* Profile Dropdown */}
            <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-50 hidden group-hover:block">
              <div className="p-2">
                <a className="flex items-center gap-3 px-3 py-2 text-body-sm text-on-surface hover:bg-surface-container-low rounded-lg transition-colors" href="#">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
                  Cài đặt
                </a>
                <a className="flex items-center gap-3 px-3 py-2 text-body-sm text-error hover:bg-error-container/10 rounded-lg transition-colors" href="#">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                  Đăng xuất
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
