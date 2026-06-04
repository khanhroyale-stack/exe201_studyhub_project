import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Đăng nhập thành công!');
    }, 1200);
  };

  return (
    <div className="bg-background min-h-screen text-on-surface">
      <main className="pt-[72px] min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Background Decoration Elements */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none"></div>

        {/* Auth Layout Wrapper */}
        <div className="flex w-full max-w-[1200px] overflow-hidden rounded-xl bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant mx-auto my-8">
          {/* Left Side: Side Navigation */}
          <aside className="hidden md:flex flex-col w-sidebar-width bg-surface-container-low border-r border-outline-variant py-8">
            <div className="px-8 mb-10">
              <div className="flex items-center gap-3 mb-2">
                <img alt="StudyHub Icon" className="w-10 h-10 rounded-lg object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBleFcGALxq9pNYKNMz5XTpFora2DXBV6ivifWStVIZ8XBfWbZeDK6H59NRyplgNKkhblKgKyycUGwrbcn7su58vwAB0GJz6LVHts5bw6eddUeHG5vXnrmUIaXKlK7zq-6Xv3Yknk5zEzNDEPEZoV_0KVlVeirFJkwHl2uiAWp8VK2CWH9xiqF9XRGf5vXbW_SEgl_7nedG3uoBoRxIYlHVeAcngh-w2r-lG4M41pYMxD8JtaOlrVpBMdZqMeFAs7SlwlZA0Pr2ArmU" />
                <span className="font-headline-sm text-headline-sm font-bold text-primary">StudyHub</span>
              </div>
              <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Academic Excellence</p>
            </div>
            <nav className="flex-1 space-y-1">
              <Link to="/login" className="flex items-center gap-3 px-8 py-4 border-l-4 border-primary text-primary font-bold bg-surface-container-high cursor-pointer active:scale-95 group">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
                <span className="font-label-md text-label-md">Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-3 px-8 py-4 text-on-surface-variant font-medium hover:bg-surface-container transition-all duration-150 cursor-pointer active:scale-95 group">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">person_add</span>
                <span className="font-label-md text-label-md">Register</span>
              </Link>
            </nav>
            <div className="px-8 mt-auto">
              <div className="p-4 rounded-lg bg-primary-fixed text-on-primary-fixed-variant">
                <p className="font-label-sm text-label-sm mb-1">Cần hỗ trợ?</p>
                <p className="text-body-sm text-xs">Liên hệ đội ngũ chăm sóc khách hàng của chúng tôi.</p>
              </div>
            </div>
          </aside>

          {/* Right Side: Login Form Canvas */}
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 md:px-12 bg-white">
            <div className="w-full max-w-[480px]">
              {/* Branding & Header */}
              <div className="flex flex-col items-center mb-10 text-center">
                <img alt="StudyHub Logo" className="h-10 mb-6 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfeD-vXrpa8SM408LattqGa1Lr2YBtOUfzjBAOG1FqK2tf5Da8xIu7sgBCxE3GH5I92--VrcZFqCXoTryA9BZqjYfjD-b-A7gUf6Vf6sJ-tbqJ5esW28snglwQxkprXstRXvIGUk-x42Vfzve9fCLr3W1-8RjdVxtcznIWyNvi1fnsICVE6GZGEe5N1DxPx1bmSl6ET3P7_-uQRG6KWYe777v2635IdqSA49Jswb1cm2EEsxFxsW82M-x_JDqc-P9pbVvKl7nLEBrs" />
                <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Chào mừng trở lại</h1>
                <p className="text-body-md text-on-surface-variant">Vui lòng nhập thông tin để truy cập tài khoản của bạn.</p>
              </div>

              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface block" htmlFor="email">Email học viên</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">mail</span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" id="email" placeholder="example@email.com" required type="email" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-label-md text-on-surface block" htmlFor="password">Mật khẩu</label>
                    <a className="text-primary font-label-sm text-label-sm hover:underline" href="#">Quên mật khẩu?</a>
                  </div>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">lock</span>
                    <input 
                      className="w-full pl-12 pr-12 py-3 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" 
                      id="password" 
                      placeholder="••••••••" 
                      required 
                      type={showPassword ? "text" : "password"} 
                    />
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface focus:outline-none" 
                      onClick={() => setShowPassword(!showPassword)} 
                      type="button"
                    >
                      <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-3">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary-container h-4 w-4" id="remember" type="checkbox" />
                  <label className="text-body-sm text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Duy trì đăng nhập</label>
                </div>

                {/* Submit Button */}
                <button 
                  className="w-full bg-primary-container text-on-primary py-4 rounded-lg font-label-md text-label-md shadow-[0px_4px_12px_rgba(0,61,155,0.2)] hover:bg-primary transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> 
                      Đang xử lý...
                    </span>
                  ) : (
                    <>
                      ĐĂNG NHẬP
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-outline-variant"></div>
                  <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline">Hoặc đăng nhập với</span>
                  <div className="flex-grow border-t border-outline-variant"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors font-label-sm text-label-sm" type="button">
                    <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9bixpw1lySmzeg5opeYCkeOcxGPo8X6A1lI6pl7dlSsyCLfpJFP9XVtUrN1J_PVFG1hM2dhqgrNuvxeXh_djlKHTg5nyY2zCq-ouEC7uIgpwc0bpO5a90spkRYnPFb5dqnP56moMSiptvm-Y4fm0ZwgwFXGBnYUYcVfumRb9RVr_TVZc41xBteCwLj7ajaAJdEp3x7y8K9j1WcSARftUmIVkAJz3E-5Aqx1I7fGiaAh7DnEoHeakI_N1snQkbN2H70K0SHbP_SOtb" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors font-label-sm text-label-sm" type="button">
                    <span className="material-symbols-outlined text-[#1877F2]" style={{ fontVariationSettings: "'FILL' 1" }}>face_nod</span>
                    Facebook
                  </button>
                </div>
              </form>

              {/* Redirect to Register */}
              <div className="mt-8 text-center">
                <p className="text-body-md text-on-surface-variant">
                  Chưa có tài khoản? 
                  <Link to="/register" className="text-primary font-bold hover:underline ml-1">Đăng ký ngay</Link>
                </p>
              </div>
            </div>

            {/* Footer Small */}
            <footer className="mt-auto pt-12 text-center">
              <p className="text-label-sm font-label-sm text-outline">© 2024 StudyHub Academic Platform. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
