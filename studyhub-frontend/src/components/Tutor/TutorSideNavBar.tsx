import React from 'react';
import { NavLink } from 'react-router-dom';
import { CURRENT_TUTOR } from '../../constants/mockTutorData';

const navItems = [
  { to: '/tutor/dashboard', icon: 'dashboard', label: 'Bảng điều khiển' },
  { to: '/tutor/create-post', icon: 'post_add', label: 'Đăng tin mới' },
  { to: '/tutor/classes', icon: 'school', label: 'Quản lý lớp' },
  { to: '/tutor/schedule', icon: 'calendar_month', label: 'Lịch dạy' },
  { to: '/tutor/search-classes', icon: 'search', label: 'Tìm lớp' },
  { to: '/tutor/offers', icon: 'mail', label: 'Lời mời dạy' },
  { to: '/tutor/billing', icon: 'receipt_long', label: 'Thanh toán phí' },
  { to: '/tutor/messages', icon: 'chat', label: 'Tin nhắn' },
  { to: '/tutor/reviews', icon: 'star', label: 'Đánh giá' },
];

const TutorSideNavBar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-[280px] flex flex-col glass border-r border-white/20 z-30 animate-fade-in shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* User Info Card */}
      <div className="px-5 py-5 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <img
            src={CURRENT_TUTOR.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-outline-variant shrink-0"
          />
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-on-surface truncate">{CURRENT_TUTOR.name}</p>
            <p className="text-xs text-on-surface-variant">Gia sư</p>
          </div>
        </div>

        {/* Quick stat */}
        <div className="mt-4 bg-primary-fixed/40 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Số giờ đã dạy</p>
            <p className="text-xl font-bold text-primary">{CURRENT_TUTOR.taughtHours}h</p>
          </div>
          <span className="material-symbols-outlined text-primary text-3xl">timer</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-4 overflow-y-auto">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-2 shadow-sm'
                  : 'text-on-surface-variant hover:bg-white/50 hover:text-primary hover:shadow-sm hover:translate-x-1'
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

      {/* Bottom: Settings */}
      <div className="px-3 py-4 border-t border-outline-variant">
        <NavLink
          to="/tutor/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
              isActive
                ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-white/50 hover:text-primary hover:shadow-sm hover:translate-x-1'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
              >
                settings
              </span>
              <span>Cài đặt</span>
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default TutorSideNavBar;
