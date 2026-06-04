import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path: string) => {
    return isActive(path)
      ? "text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md"
      : "text-on-surface-variant hover:text-primary transition-colors duration-150 font-body-md text-body-md";
  };

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
          <Link to="/" className={getLinkClass('/')}>
            Trang chủ
          </Link>
          <Link to="/classes" className={getLinkClass('/classes')}>
            Tất cả lớp học
          </Link>
          <Link to="/tutors" className={getLinkClass('/tutors')}>
            Gia sư
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link 
          to="/login" 
          className="font-label-md text-label-md text-primary px-6 py-2 rounded-xl hover:bg-primary-container/10 transition-colors"
        >
          Đăng nhập
        </Link>
        <Link 
          to="/register" 
          className="font-label-md text-label-md bg-primary text-on-primary px-6 py-2 rounded-xl hover:bg-primary-container transition-colors shadow-sm"
        >
          Đăng ký
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
