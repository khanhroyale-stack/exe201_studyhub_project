import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { UnifiedPost, PostStatus } from '../../types/shared';

const PostManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'recruiting' | 'completed'>('all');
  const [posts, setPosts] = useState<UnifiedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tạm hardcode id = 1
    api.get('/job-postings/parent/1')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return post.status === PostStatus.PENDING_APPROVAL;
    if (activeTab === 'recruiting') return post.status === PostStatus.RECRUITING;
    if (activeTab === 'completed') return post.status === PostStatus.CLOSED;
    return true;
  });

  const totalPosts = posts.length;
  const activePosts = posts.filter(p => p.status === PostStatus.RECRUITING).length;
  const pendingApprovalPosts = posts.filter(p => p.status === PostStatus.PENDING_APPROVAL).length;

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up stagger-1">
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
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined">hourglass_empty</span>
          </div>
          <div>
            <p className="font-medium text-xs text-on-surface-variant uppercase">Chờ duyệt</p>
            <p className="font-bold text-2xl text-on-surface">{pendingApprovalPosts}</p>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/20 flex items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="font-medium text-xs text-on-surface-variant uppercase">Ứng viên mới</p>
            <p className="font-bold text-2xl text-on-surface">0</p>
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-on-surface-variant">Đang tải...</td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className={`hover:bg-surface-container transition-colors group ${post.status === PostStatus.CLOSED ? 'opacity-75' : ''}`}>
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
                      {post.status === PostStatus.CLOSED ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                          Đã đóng
                        </span>
                      ) : post.status === PostStatus.PENDING_APPROVAL ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-medium text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                          Chờ duyệt
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
                        <span className="font-semibold text-sm text-on-surface">{post.applicantsCount || 0}</span>
                        <span className="font-normal text-sm text-on-surface-variant">người</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {post.status === PostStatus.RECRUITING ? (
                        <Link to={`/parent/posts/${post.id}/applicants`} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium text-xs hover:bg-primary/90 transition-colors shadow-sm">
                          Xem ứng viên
                        </Link>
                      ) : (
                        <button className="border border-outline-variant text-on-surface-variant px-4 py-2 rounded-lg font-medium text-xs hover:bg-surface-container transition-colors">
                          Chi tiết
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-6 py-4 glass border-t border-white/20 flex items-center justify-between">
          <span className="font-normal text-sm text-on-surface-variant">Hiển thị 1-{posts.length} trên {posts.length} bài đăng</span>
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
