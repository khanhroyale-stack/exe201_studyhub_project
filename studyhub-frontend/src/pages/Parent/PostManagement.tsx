import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_JOB_POSTINGS, MOCK_APPLICANTS } from '../../constants/mockParentData';

const PostManagement: React.FC = () => {
  const totalPosts = MOCK_JOB_POSTINGS.length;
  const activePosts = MOCK_JOB_POSTINGS.filter(p => p.status !== 'CLOSED').length;
  const newApplicants = MOCK_APPLICANTS.filter(a => a.status === 'PENDING').length;

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-bold text-3xl text-[#191c1e]">Quản lý bài đăng</h1>
          <p className="font-normal text-base text-[#434654] mt-2">Theo dõi và quản lý các yêu cầu tìm gia sư của bạn.</p>
        </div>
        <Link to="/parent/create-post" className="bg-[#003d9b] text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>add</span>
          Tạo bài đăng mới
        </Link>
      </div>

      {/* Dashboard Filters & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#c3c6d6] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#dae2ff] rounded-full flex items-center justify-center text-[#003d9b]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>list_alt</span>
          </div>
          <div>
            <p className="font-medium text-xs text-[#434654] uppercase">Tổng bài đăng</p>
            <p className="font-bold text-2xl text-[#191c1e]">{totalPosts}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#c3c6d6] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#afecff] rounded-full flex items-center justify-center text-[#00687b]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>pending_actions</span>
          </div>
          <div>
            <p className="font-medium text-xs text-[#434654] uppercase">Đang tuyển</p>
            <p className="font-bold text-2xl text-[#191c1e]">{activePosts}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-[#c3c6d6] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ffddb3] rounded-full flex items-center justify-center text-[#5e3c00]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>group</span>
          </div>
          <div>
            <p className="font-medium text-xs text-[#434654] uppercase">Ứng viên mới</p>
            <p className="font-bold text-2xl text-[#191c1e]">{newApplicants}</p>
          </div>
        </div>
      </div>

      {/* List of Postings */}
      <div className="bg-white rounded-xl border border-[#c3c6d6] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f3f4f6] border-b border-[#c3c6d6]">
                <th className="px-6 py-4 font-semibold text-sm text-[#434654]">Tiêu đề bài đăng</th>
                <th className="px-6 py-4 font-semibold text-sm text-[#434654]">Môn học</th>
                <th className="px-6 py-4 font-semibold text-sm text-[#434654]">Ngày đăng</th>
                <th className="px-6 py-4 font-semibold text-sm text-[#434654]">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-sm text-[#434654]">Ứng viên</th>
                <th className="px-6 py-4 font-semibold text-sm text-[#434654] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d6]">
              {MOCK_JOB_POSTINGS.map((post) => (
                <tr key={post.id} className={`hover:bg-[#f8f9fb] transition-colors group ${post.status === 'CLOSED' ? 'opacity-75' : ''}`}>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-sm text-[#191c1e] block">{post.title}</span>
                    <span className="text-[12px] text-[#434654]">ID: #{post.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dae2ff] text-[#003d9b] font-medium text-xs">
                      {post.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-normal text-sm text-[#434654]">
                    {new Date(post.postedAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    {post.status === 'CLOSED' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e1e2e4] text-[#434654] font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#737685]"></span>
                        Đã đóng
                      </span>
                    ) : post.status === 'PRIORITY' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#50dcff] text-[#005f71] font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00687b]"></span>
                        Ưu tiên
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#afecff] text-[#004e5d] font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00687b]"></span>
                        Đang tuyển
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#191c1e]">{post.applicantsCount}</span>
                      <span className="font-normal text-sm text-[#434654]">người</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {post.status !== 'CLOSED' ? (
                      <Link to="/parent/applicants" className="bg-[#003d9b] text-white px-4 py-2 rounded-lg font-medium text-xs hover:bg-[#0052cc] transition-colors shadow-sm">
                        Xem ứng viên
                      </Link>
                    ) : (
                      <button className="border border-[#c3c6d6] text-[#434654] px-4 py-2 rounded-lg font-medium text-xs hover:bg-[#edeef0] transition-colors">
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
        <div className="px-6 py-4 bg-white flex items-center justify-between border-t border-[#c3c6d6]">
          <span className="font-normal text-sm text-[#434654]">Hiển thị 1-{MOCK_JOB_POSTINGS.length} trên {MOCK_JOB_POSTINGS.length} bài đăng</span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md border border-[#c3c6d6] text-[#c3c6d6] cursor-not-allowed">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-md bg-[#003d9b] text-white font-medium text-xs">1</button>
            <button className="p-2 rounded-md border border-[#c3c6d6] text-[#c3c6d6] cursor-not-allowed">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManagement;
