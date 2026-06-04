import React from 'react';
import { NavLink } from 'react-router-dom';
import { CURRENT_PARENT } from '../../constants/mockParentData';

const SideNavBar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-[280px] flex flex-col py-6 bg-[#f3f4f6] dark:bg-[#d9dadc] border-r border-[#c3c6d6]">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#c3c6d6]">
          <div className="bg-[#dae2ff] text-[#003d9b] w-10 h-10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>school</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-[#191c1e]">Lớp đang theo</p>
            <p className="font-semibold text-xl text-[#003d9b]">0{CURRENT_PARENT.classesWaiting}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-4">
        <NavLink
          to="/parent/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
              isActive
                ? 'border-l-4 border-[#003d9b] bg-[#e7e8ea] font-bold text-[#003d9b]'
                : 'text-[#434654] hover:bg-[#edeef0]'
            }`
          }
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>dashboard</span>
          <span className="font-semibold text-sm">Dashboard</span>
        </NavLink>
        <NavLink
          to="/parent/posts"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
              isActive
                ? 'border-l-4 border-[#003d9b] bg-[#e7e8ea] font-bold text-[#003d9b]'
                : 'text-[#434654] hover:bg-[#edeef0]'
            }`
          }
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>post_add</span>
          <span className="font-semibold text-sm">Quản lý bài đăng</span>
        </NavLink>
        <NavLink
          to="/parent/applicants"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
              isActive
                ? 'border-l-4 border-[#003d9b] bg-[#e7e8ea] font-bold text-[#003d9b]'
                : 'text-[#434654] hover:bg-[#edeef0]'
            }`
          }
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>group</span>
          <span className="font-semibold text-sm">Duyệt ứng tuyển</span>
        </NavLink>
        <NavLink
          to="/parent/classes"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
              isActive
                ? 'border-l-4 border-[#003d9b] bg-[#e7e8ea] font-bold text-[#003d9b]'
                : 'text-[#434654] hover:bg-[#edeef0]'
            }`
          }
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>school</span>
          <span className="font-semibold text-sm">Quản lý lớp học</span>
        </NavLink>
        <NavLink
          to="/parent/feedback"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
              isActive
                ? 'border-l-4 border-[#003d9b] bg-[#e7e8ea] font-bold text-[#003d9b]'
                : 'text-[#434654] hover:bg-[#edeef0]'
            }`
          }
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
          <span className="font-semibold text-sm">Đánh giá & Phản hồi</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideNavBar;
