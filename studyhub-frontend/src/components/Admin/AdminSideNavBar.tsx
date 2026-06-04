import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin/dashboard', icon: 'dashboard', label: 'Tổng quan' },
  { to: '/admin/users', icon: 'manage_accounts', label: 'Người dùng & eKYC' },
  { to: '/admin/content', icon: 'content_paste', label: 'Nội dung & Điều phối' },
  { to: '/admin/reports', icon: 'bar_chart', label: 'Báo cáo & Phân tích' },
];

const AdminSideNavBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-[280px] flex flex-col glass border-r border-white/20 z-30 animate-fade-in shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Admin Info Card */}
      <div className="px-5 py-5 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0 border border-primary-container text-primary">
            <span className="material-symbols-outlined">admin_panel_settings</span>
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-on-surface truncate">Quản trị viên</p>
            <p className="text-xs text-on-surface-variant">System Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
                isActive
                  ? 'bg-primary text-on-primary font-semibold shadow-md translate-x-1'
                  : 'text-on-surface hover:bg-white/50 hover:text-primary hover:shadow-sm hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                >
                  {icon}
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Settings & Logout */}
      <div className="px-3 py-4 border-t border-outline-variant flex flex-col gap-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-medium text-error hover:bg-error-container/20 w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSideNavBar;
