import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [role, setRole] = useState<'student' | 'tutor'>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Yêu cầu đăng ký đã được gửi! Vui lòng kiểm tra email để xác thực.');
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen text-on-surface">
      <main className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center p-4 md:p-8 relative">
        {/* Background Decoration Elements */}
        <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none"></div>

        {/* Auth Layout Wrapper */}
        <div className="flex w-full max-w-[1200px] overflow-hidden rounded-xl bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant mx-auto my-12">
          {/* Left Side: Side Navigation */}
          <aside className="hidden md:flex flex-col w-sidebar-width bg-surface-container-low border-r border-outline-variant py-8">
            <div className="px-8 mb-10">
              <div className="flex items-center gap-3 mb-2">
                <img alt="StudyHub Icon" className="w-10 h-10 rounded-lg object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyaSaOGQaDZXEQ0lLBqNlJh5HEVfK2xOw6Yuk87CB66PTHRrvaLoyeOMmasB35QWtLaltFl1PuU1mZjvbvjJzz1foXhkC5PTslY4GDTv7_NiqT61UHZdx059SZcgx1b_uD6hzsAsxCd4N2buxYQzI5KdOeOs4YnK13JaKFWlEbtVrtJ2tI4sG51oYm78fvGxArgcKYfXxWCwEstazVJItyG9neQwwuRMIk7cOg_fWS4rrV6ZVA41pliWrZl7jzI87FnDGoZhksp0ai" />
                <span className="font-headline-sm text-headline-sm font-bold text-primary">StudyHub</span>
              </div>
              <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">Academic Excellence</p>
            </div>
            <nav className="flex-1 space-y-1">
              <Link to="/login" className="flex items-center gap-3 px-8 py-4 text-on-surface-variant font-medium hover:bg-surface-container transition-all duration-150 cursor-pointer active:scale-95 group">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">login</span>
                <span className="font-label-md text-label-md">Login</span>
              </Link>
              <Link to="/register" className="flex items-center gap-3 px-8 py-4 border-l-4 border-primary text-primary font-bold bg-surface-container-high cursor-pointer active:scale-95">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
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

          {/* Right Side: Registration Form Canvas */}
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 md:px-12 bg-white">
            <div className="w-full max-w-[480px]">
              {/* Branding & Header */}
              <div className="flex flex-col items-center mb-10 text-center">
                <img alt="StudyHub Logo" className="h-10 mb-6 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUfTkws765waZziUHBQjWYQQrNEZElvZQgtBKdR1Ev5WmX-yTiodory7RHbyrAL8tFdf5t1nLLeq4n5DGLl2JmqS-lmubZFEbp9vRfhgAtZ_gTmjTmJkrgmajSPptnhDNklisWGG-c-Z-4AWT8DyXWjCiD0iniDRTe1spKI-DDxW9fy1sXjN-kVBlWs_YKnZ9YQBnQRX9s9nODPOYYw1a9UivWknHX093NiCVRqMUko9pxD2D_f4ZBWLrYvc7Vo0bPpewU6Gkn5Bka" />
                <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Tạo tài khoản mới</h1>
                <p className="text-body-md text-on-surface-variant">Tham gia cộng đồng học thuật StudyHub ngay hôm nay.</p>
              </div>

              {/* Registration Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Role Selection Chips */}
                <div className="space-y-3">
                  <label className="font-label-md text-label-md text-on-surface block">Bạn tham gia với vai trò?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label 
                      className={`relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low group ${role === 'student' ? 'border-primary bg-primary-fixed/30' : 'border-outline-variant'}`}
                    >
                      <input 
                        checked={role === 'student'} 
                        onChange={() => setRole('student')}
                        className="sr-only" 
                        name="role" 
                        type="radio" 
                        value="student" 
                      />
                      <div className="flex flex-col items-center gap-2">
                        <span className={`material-symbols-outlined text-primary ${role === 'student' ? 'font-bold' : ''}`} style={role === 'student' ? { fontVariationSettings: "'FILL' 1" } : {}}>school</span>
                        <span className="font-label-md text-label-md">Học viên</span>
                      </div>
                    </label>
                    <label 
                      className={`relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-surface-container-low group ${role === 'tutor' ? 'border-primary bg-primary-fixed/30' : 'border-outline-variant'}`}
                    >
                      <input 
                        checked={role === 'tutor'} 
                        onChange={() => setRole('tutor')}
                        className="sr-only" 
                        name="role" 
                        type="radio" 
                        value="tutor" 
                      />
                      <div className="flex flex-col items-center gap-2">
                        <span className={`material-symbols-outlined text-primary ${role === 'tutor' ? 'font-bold' : ''}`} style={role === 'tutor' ? { fontVariationSettings: "'FILL' 1" } : {}}>history_edu</span>
                        <span className="font-label-md text-label-md">Gia sư</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface block" htmlFor="fullName">Họ và tên</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">person</span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" id="fullName" placeholder="Nhập họ và tên của bạn" required type="text" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface block" htmlFor="email">Email</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">mail</span>
                    <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" id="email" placeholder="example@gmail.com" required type="email" />
                  </div>
                </div>

                {/* Password Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface block" htmlFor="password">Mật khẩu</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">lock</span>
                      <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" id="password" placeholder="••••••••" required type="password" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface block" htmlFor="confirmPassword">Xác nhận</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">lock_reset</span>
                      <input className="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant bg-surface text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" id="confirmPassword" placeholder="••••••••" required type="password" />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 py-2">
                  <input className="mt-1 rounded border-outline-variant text-primary focus:ring-primary-container h-4 w-4" id="terms" required type="checkbox" />
                  <label className="text-body-sm text-on-surface-variant" htmlFor="terms">
                    Tôi đồng ý với <a className="text-primary font-semibold hover:underline" href="#">Điều khoản dịch vụ</a> và <a className="text-primary font-semibold hover:underline" href="#">Chính sách bảo mật</a> của StudyHub.
                  </label>
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
                    "ĐĂNG KÝ"
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <div className="mt-8 text-center">
                <p className="text-body-md text-on-surface-variant">
                  Đã có tài khoản? 
                  <Link to="/login" className="text-primary font-bold hover:underline ml-1">Đăng nhập ngay</Link>
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

export default Register;
