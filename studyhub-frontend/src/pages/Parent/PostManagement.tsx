import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_JOB_POSTINGS, MOCK_APPLICANTS } from '../../constants/mockParentData';

const PostManagement: React.FC = () => {
  const totalPosts = MOCK_JOB_POSTINGS.length;
  const activePosts = MOCK_JOB_POSTINGS.filter(p => p.status !== 'CLOSED').length;
  const newApplicants = MOCK_APPLICANTS.filter(a => a.status === 'PENDING').length;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-slide-up">
        <div>
          <h1 className="font-bold text-3xl text-on-surface">Quản lý bài đăng</h1>
          <p className="font-normal text-base text-on-surface-variant mt-2">Theo dõi và quản lý các yêu cầu tìm gia sư của bạn.</p>
        </div>
        <Link to="/parent/posts/create" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>add</span>
          Tạo bài đăng mới
        </Link>
      </div>

      {/* Dashboard Filters & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up stagger-1">
        <div className="glass p-6 rounded-2xl border border-white/20 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">list_alt</span>
          </div>
          <div>
            <p className="font-medium text-xs text-on-surface-variant uppercase">Tổng bài đăng</p>
            <p className="font-bold text-2xl text-on-surface">{totalPosts}</p>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/20 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <div>
            <p className="font-medium text-xs text-on-surface-variant uppercase">Đang tuyển</p>
            <p className="font-bold text-2xl text-on-surface">{activePosts}</p>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/20 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="font-medium text-xs text-on-surface-variant uppercase">Ứng viên mới</p>
            <p className="font-bold text-2xl text-on-surface">{newApplicants}</p>
          </div>
        </div>
      </div>

      {/* List of Postings */}
      <div className="glass rounded-2xl border border-white/20 overflow-hidden animate-slide-up stagger-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Tiêu đề bài đăng</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Môn học</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Ngày đăng</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Ứng viên</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {MOCK_JOB_POSTINGS.map((post) => (
                <tr key={post.id} className={`hover:bg-surface-container transition-colors group ${post.status === 'CLOSED' ? 'opacity-75' : ''}`}>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-sm text-on-surface block">{post.title}</span>
                    <span className="text-[12px] text-on-surface-variant">ID: #{post.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-medium text-xs">
                      {post.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-normal text-sm text-on-surface-variant">
                    {new Date(post.postedAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    {post.status === 'CLOSED' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                        Đã đóng
                      </span>
                    ) : post.status === 'PRIORITY' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                        Ưu tiên
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Đang tuyển
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-on-surface">{post.applicantsCount}</span>
                      <span className="font-normal text-sm text-on-surface-variant">người</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {post.status !== 'CLOSED' ? (
                      <Link to="/parent/applicants" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium text-xs hover:bg-primary/90 transition-colors shadow-sm">
                        Xem ứng viên
                      </Link>
                    ) : (
                      <button className="border border-outline-variant text-on-surface-variant px-4 py-2 rounded-lg font-medium text-xs hover:bg-surface-container transition-colors">
                        Chi tiết
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-6 py-4 glass border-t border-white/20 flex items-center justify-between">
          <span className="font-normal text-sm text-on-surface-variant">Hiển thị 1-{MOCK_JOB_POSTINGS.length} trên {MOCK_JOB_POSTINGS.length} bài đăng</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md border border-outline-variant text-on-surface-variant cursor-not-allowed">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-md bg-primary text-on-primary font-medium text-xs">1</button>
            <button className="p-2 rounded-md border border-outline-variant text-on-surface-variant cursor-not-allowed">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManagement;
