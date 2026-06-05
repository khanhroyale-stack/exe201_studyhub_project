import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StudyHubLogo from '../../components/StudyHubLogo';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'parent' | 'tutor' | 'admin'>('parent');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { login, isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'parent') navigate('/parent/dashboard');
      else if (role === 'tutor') navigate('/tutor/dashboard');
      else navigate('/');
    }
  }, [isLoggedIn, role, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(selectedRole);
      if (selectedRole === 'admin') navigate('/admin/dashboard');
      else if (selectedRole === 'parent') navigate('/parent/dashboard');
      else if (selectedRole === 'tutor') navigate('/tutor/dashboard');
      else navigate('/');
    }, 1200);
  };

  const roles = [
    { value: 'parent' as const, label: 'Phụ huynh', icon: 'family_restroom' },
    { value: 'tutor' as const, label: 'Gia sư', icon: 'school' },
    { value: 'admin' as const, label: 'Admin', icon: 'admin_panel_settings' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '460px', animation: 'authFadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
          {/* Logo */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <StudyHubLogo iconSize={44} textSize="text-2xl" showTagline />
          </div>

          {/* Tab switcher */}
          <div style={{
            display: 'flex',
            background: '#f0f4ff',
            borderRadius: '14px',
            padding: '4px',
            marginBottom: '32px',
            gap: '4px',
          }}>
            <Link
              to="/login"
              style={{
                flex: 1, textAlign: 'center', padding: '10px',
                borderRadius: '10px',
                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                background: '#1a3480', color: 'white',
                boxShadow: '0 2px 8px rgba(26,52,128,0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              style={{
                flex: 1, textAlign: 'center', padding: '10px',
                borderRadius: '10px',
                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                color: '#6b7a9a', background: 'transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(26,52,128,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              Đăng ký
            </Link>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.5px' }}>
              Chào mừng trở lại 👋
            </h1>
            <p style={{ color: '#6b7a9a', fontSize: '14px' }}>
              Vui lòng nhập thông tin để truy cập tài khoản của bạn.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '7px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '20px', color: focusedField === 'email' ? '#1a3480' : '#94a3b8',
                  transition: 'color 0.2s',
                }}>mail</span>
                <input
                  id="email" type="email" placeholder="example@email.com" required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: '100%', paddingLeft: '44px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px',
                    border: `2px solid ${focusedField === 'email' ? '#1a3480' : '#e2e8f0'}`,
                    borderRadius: '10px', background: focusedField === 'email' ? '#f8faff' : '#f8fafc',
                    fontSize: '14px', color: '#0f172a', outline: 'none',
                    transition: 'all 0.2s ease', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>Mật khẩu</label>
                <a href="#" style={{ fontSize: '12px', color: '#1a3480', fontWeight: 600, textDecoration: 'none' }}>
                  Quên mật khẩu?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{
                  position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                  fontSize: '20px', color: focusedField === 'password' ? '#1a3480' : '#94a3b8',
                  transition: 'color 0.2s',
                }}>lock</span>
                <input
                  id="password" type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••" required
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: '100%', paddingLeft: '44px', paddingRight: '48px', paddingTop: '12px', paddingBottom: '12px',
                    border: `2px solid ${focusedField === 'password' ? '#1a3480' : '#e2e8f0'}`,
                    borderRadius: '10px', background: focusedField === 'password' ? '#f8faff' : '#f8fafc',
                    fontSize: '14px', color: '#0f172a', outline: 'none',
                    transition: 'all 0.2s ease', boxSizing: 'border-box',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                    color: '#94a3b8', display: 'flex', alignItems: 'center',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '10px' }}>
                Đăng nhập với vai trò
                <span style={{ marginLeft: '6px', fontSize: '11px', color: '#94a3b8', fontWeight: 400 }}>(dùng để test)</span>
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {roles.map(r => (
                  <label key={r.value} style={{ flex: 1 }}>
                    <input type="radio" name="role" value={r.value}
                      checked={selectedRole === r.value}
                      onChange={() => setSelectedRole(r.value)}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                      padding: '10px 8px',
                      border: `2px solid ${selectedRole === r.value ? '#1a3480' : '#e2e8f0'}`,
                      borderRadius: '10px',
                      background: selectedRole === r.value ? '#f0f4ff' : '#f8fafc',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}>
                      <span className="material-symbols-outlined" style={{
                        fontSize: '20px',
                        color: selectedRole === r.value ? '#1a3480' : '#94a3b8',
                      }}>{r.icon}</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: selectedRole === r.value ? '#1a3480' : '#6b7a9a' }}>
                        {r.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Remember Me */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" id="remember" style={{
                width: '16px', height: '16px', accentColor: '#1a3480', cursor: 'pointer',
              }} />
              <span style={{ fontSize: '13px', color: '#6b7a9a' }}>Duy trì đăng nhập</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%', padding: '14px',
                background: isSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #1a3480, #003d9b)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: isSubmitting ? 'none' : '0 4px 16px rgba(26,52,128,0.3)',
                transition: 'all 0.2s ease',
                transform: 'translateY(0)',
              }}
              onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              {isSubmitting ? (
                <>
                  <span style={{
                    width: '16px', height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }} />
                  Đang xử lý...
                </>
              ) : (
                <>
                  ĐĂNG NHẬP
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Hoặc đăng nhập với</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            {/* Social */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Google', icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9bixpw1lySmzeg5opeYCkeOcxGPo8X6A1lI6pl7dlSsyCLfpJFP9XVtUrN1J_PVFG1hM2dhqgrNuvxeXh_djlKHTg5nyY2zCq-ouEC7uIgpwc0bpO5a90spkRYnPFb5dqnP56moMSiptvm-Y4fm0ZwgwFXGBnYUYcVfumRb9RVr_TVZc41xBteCwLj7ajaAJdEp3x7y8K9j1WcSARftUmIVkAJz3E-5Aqx1I7fGiaAh7DnEoHeakI_N1snQkbN2H70K0SHbP_SOtb', isImg: true },
                { label: 'Facebook', icon: 'face_nod', color: '#1877F2', isImg: false },
              ].map(s => (
                <button key={s.label} type="button" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '11px',
                  border: '2px solid #e2e8f0', borderRadius: '10px',
                  background: 'white', fontSize: '13px', fontWeight: 600, color: '#374151',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; (e.currentTarget as HTMLElement).style.borderColor = '#c7d2fe'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'white'; (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; }}
                >
                  {s.isImg ? (
                    <img src={s.icon as string} alt={s.label} style={{ width: '18px', height: '18px' }} />
                  ) : (
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: s.color, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                  )}
                  {s.label}
                </button>
              ))}
            </div>
          </form>

          {/* Footer */}
          <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '12px', color: '#94a3b8' }}>
            © 2024 StudyHub Academic Platform. All rights reserved.
          </p>
        </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes authFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
