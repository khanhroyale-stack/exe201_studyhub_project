import React from 'react';
import { NavLink } from 'react-router-dom';
import { CURRENT_PARENT } from '../../constants/mockParentData';

const navItems = [
  { to: '/parent/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/parent/posts', icon: 'post_add', label: 'Quản lý bài đăng' },
  { to: '/parent/applicants', icon: 'group', label: 'Duyệt ứng tuyển' },
  { to: '/parent/classes', icon: 'school', label: 'Quản lý lớp học' },
  { to: '/parent/feedback', icon: 'star', label: 'Đánh giá & Phản hồi' },
];

const SideNavBar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-[280px] flex flex-col bg-white border-r border-outline-variant z-30">
      {/* User Info Card */}
      <div className="px-5 py-5 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <img
            src={CURRENT_PARENT.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-outline-variant shrink-0"
          />
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-on-surface truncate">{CURRENT_PARENT.name}</p>
            <p className="text-xs text-on-surface-variant">Phụ huynh học sinh</p>
          </div>
        </div>

        {/* Quick stat */}
        <div className="mt-4 bg-primary-fixed/40 rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Lớp đang theo</p>
            <p className="text-xl font-bold text-primary">0{CURRENT_PARENT.classesWaiting}</p>
          </div>
          <span className="material-symbols-outlined text-primary text-3xl">school</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-4 overflow-y-auto">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium ${
                isActive
                  ? 'bg-primary-fixed/50 text-primary font-semibold border-l-4 border-primary pl-2'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
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
          to="/parent/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
              isActive
                ? 'bg-primary-fixed/50 text-primary font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
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

export default SideNavBar;
