/**
 * StudyHub Brand Logo Component
 * Dùng chung cho Navbar, Login, Register, Footer và mọi nơi cần logo.
 */
import React from 'react';
import { Link } from 'react-router-dom';

// Các URL ảnh gốc của thương hiệu StudyHub
const LOGO_ICON_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJdvBj1opnzIpKPA5m7lejtn-HWuB9a_1bmsw3W7JAAxZ1zDa9YN7hncSFmJKzd66Pt0w_YjzdCO2E1qf9CxtRQU5MYncCXtnEjKW0ulS4jpl7ypD59LLLItKWdHgHj_1JzJMrNc5TNWHjOafbN9r52-ms0xTv5d9TbgFNMxCsT5t2j4FKxdF9npe5eHdI9gCuq5TP9qIRDGxT-_dZVcPW1sgB-eCLVr8yM-Zd3HAwfrV6pncwVk45a8LBfjcUV2mHxUVBBIwLrKmj';

interface LogoProps {
  /** Kích thước icon (default: 36) */
  iconSize?: number;
  /** Cỡ chữ Tailwind cho text (default: 'text-2xl') */
  textSize?: string;
  /** Hiển thị tagline bên dưới (default: false) */
  showTagline?: boolean;
  /** Nếu true, không wrap bằng Link (dùng trong các trang không có router) */
  noLink?: boolean;
  /** CSS class thêm vào wrapper */
  className?: string;
}

export const StudyHubLogo: React.FC<LogoProps> = ({
  iconSize = 36,
  textSize = 'text-2xl',
  showTagline = false,
  noLink = false,
  className = '',
}) => {
  const content = (
    <div className={`flex flex-col items-center gap-0 ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* Brand Icon */}
        <img
          src={LOGO_ICON_URL}
          alt="StudyHub Icon"
          style={{ width: iconSize, height: iconSize }}
          className="object-contain shrink-0"
        />
        {/* Brand Text: "Study" navy + "Hub" teal */}
        <span className={`font-extrabold tracking-tight leading-none ${textSize}`}>
          <span style={{ color: '#1a3480' }}>Study</span>
          <span style={{ color: '#00b8cc' }}>Hub</span>
        </span>
      </div>
      {showTagline && (
        <p className="text-[11px] font-medium tracking-wide mt-1" style={{ color: '#6b7a9a' }}>
          Kết nối tri thức, xây dựng niềm tin
        </p>
      )}
    </div>
  );

  if (noLink) return content;

  return (
    <Link to="/" aria-label="StudyHub - Về trang chủ" className="shrink-0">
      {content}
    </Link>
  );
};

export default StudyHubLogo;
