import React from 'react';
import { NavLink } from 'react-router-dom';
import { CURRENT_PARENT } from '../../constants/mockParentData';

const navGroups = [
  {
    items: [
      { to: '/parent/dashboard', icon: 'dashboard', label: 'Tổng quan' },
    ],
  },
  {
    label: 'Tuyển gia sư',
    items: [
      {
        to: '/parent/posts',
        icon: 'post_add',
        label: 'Bài đăng của tôi',
        sublabel: 'Quản lý & xem ứng viên',
      },
      {
        to: '/parent/classes',
        icon: 'school',
        label: 'Lớp học',
        sublabel: 'Theo dõi lớp đang học',
      },
    ],
  },
  {
    label: 'Tương tác',
    items: [
      {
        to: '/parent/feedback',
        icon: 'rate_review',
        label: 'Phản hồi & Đánh giá',
        sublabel: 'Đánh giá gia sư',
      },
      {
        to: '/parent/messages',
        icon: 'chat',
        label: 'Tin nhắn',
      },
    ],
  },
];

const SideNavBar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-[68px] bottom-0 w-[260px] flex flex-col bg-white border-r border-slate-100 z-30 shadow-[2px_0_20px_rgba(0,0,0,0.04)]">

      {/* ── User Info ── */}
      <div className="px-4 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={CURRENT_PARENT.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-[#0f172a] truncate">{CURRENT_PARENT.name}</p>
            <p className="text-xs text-slate-400 font-medium">Phụ huynh học sinh</p>
          </div>
        </div>

        {/* Quick stat */}
        <div className="mt-3 bg-gradient-to-r from-primary/8 to-indigo-500/8 border border-primary/12 rounded-xl px-3 py-2.5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lớp đang theo</p>
            <p className="text-lg font-extrabold text-primary leading-tight">0{CURRENT_PARENT.classesWaiting}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
        </div>
      </div>

      {/* ── Navigation Groups ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx}>
            {group.label && (
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.12em] px-3 pt-3 pb-1.5">
                {group.label}
              </p>
            )}

            {group.items.map(({ to, icon, label, sublabel }: any) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-[#0f172a]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-primary/10'
                    }`}>
                      <span
                        className={`material-symbols-outlined text-[18px] ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {icon}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <p className={`text-sm font-semibold leading-tight truncate ${isActive ? 'text-white' : ''}`}>
                        {label}
                      </p>
                      {sublabel && (
                        <p className={`text-[10px] leading-tight truncate mt-0.5 ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                          {sublabel}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* ── Bottom: CTA + Settings ── */}
      <div className="px-3 pb-4 pt-3 border-t border-slate-100 space-y-1.5">
        {/* CTA: Đăng bài tìm gia sư */}
        <NavLink
          to="/parent/posts/create"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-primary/8 text-primary border border-primary/20 hover:bg-primary/15'
            }`
          }
        >
          {() => (
            <>
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                add_circle
              </span>
              Đăng tin tìm gia sư
            </>
          )}
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/parent/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-slate-100 text-[#0f172a] font-semibold'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                settings
              </span>
              Cài đặt
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default SideNavBar;
