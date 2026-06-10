import React, { useEffect, useState } from 'react';
import { parentPortalApi, DashboardStats } from '../../services/parentPortalApi';
import { UnifiedPost } from '../../types/shared';
const CURRENT_PARENT = {
  name: 'Elena',
  avatar: 'https://i.pravatar.cc/150?u=elena'
};

const ParentDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activePostings, setActivePostings] = useState<UnifiedPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await parentPortalApi.getDashboardStats();
        setStats(statsData);
        const postsData = await parentPortalApi.getJobPostings();
        setActivePostings(postsData.filter(p => p.status !== 'CLOSED'));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">


      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up stagger-1">
        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Hồ sơ ứng tuyển</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-3xl text-primary">{stats?.activeApplications || 0}</span>
            <span className="font-medium text-xs text-secondary">+{stats?.newApplicationsToday || 0} hôm nay</span>
          </div>
        </div>
        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Lớp đang đợi</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-3xl text-primary">{stats?.classesWaiting || 0}</span>
            <span className="font-medium text-xs text-outline">Giảm 1</span>
          </div>
        </div>
        <div className="md:col-span-2 p-6 glass border border-white/20 rounded-3xl flex items-center justify-between hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg">
          <div>
            <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Ngân sách đã chi (Tháng này)</span>
            <p className="font-bold text-3xl text-primary mt-1">{(stats?.budgetSpentThisMonth || 0).toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary">trending_up</span>
          </div>
        </div>
      </section>

      {/* Latest Postings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up stagger-2">
        <section className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl text-on-surface">Lớp học mới đăng</h2>
            <a className="font-semibold text-sm text-primary hover:underline" href="#">Xem tất cả</a>
          </div>
          <div className="flex flex-col gap-4">
            {activePostings.map((post, idx) => (
              <div key={post.id} className={`glass border border-white/20 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-slide-up opacity-0 stagger-${(idx % 6) + 1}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-xl text-on-surface">{post.title}</h3>
                    <p className="font-normal text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">schedule</span> Đăng gần đây
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-medium text-xs ${post.status === 'PRIORITY' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                    {post.status === 'PRIORITY' ? 'Ưu tiên' : 'Đang tuyển'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-xl font-medium text-xs">{post.location}</span>
                  <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-xl font-medium text-xs">{post.schedule}</span>
                  <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-xl font-medium text-xs">{post.requirement}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">payments</span>
                    <span className="font-semibold text-xl text-on-surface">{post.pricePerSession.toLocaleString('vi-VN')}đ / ca</span>
                  </div>
                  <div className="flex -space-x-2">
                    {post.applicantsAvatars.map((avatar, idx) => (
                      <img key={idx} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-surface object-cover" src={avatar} />
                    ))}
                    {post.applicantsCount > post.applicantsAvatars.length && (
                      <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                        +{post.applicantsCount - post.applicantsAvatars.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Tutors Sidebar */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl text-on-surface">Gia sư gợi ý</h2>
            <button className="p-1 rounded-full hover:bg-surface-container transition-colors tooltip" title="Làm mới gợi ý">
              <span className="material-symbols-outlined text-on-surface-variant">refresh</span>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-4 glass border border-white/20 rounded-3xl flex gap-4 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-slide-up stagger-3">
              <img alt="Tutor" className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-surface shadow-sm group-hover:border-primary/30 transition-colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK8lhUpNKWMGZdwWdGo_4FXgZVfv-aK31m5zmy7y8iz5aXDOxZWxztDZo4o_BOMqXLIurd0OH9J4k_1g8FSatf8iIppQSW74L8s3wRv2_kyTuBfODLMUlUytLQHza3mGMHWAxV95EG7cBn1ca0ax5WPK72RNEZscgIYi38t-j1-96iByOZpte1JuR9fgKm9nvJaalo1lQnCPtb5AInRo0G8wLhrQes8UdGrCGy8ZTy2QvbpLZWIIbP9T7vlO1lyoxURHsc97jRjRSd" />
              <div className="flex flex-col gap-1 overflow-hidden">
                <h4 className="font-semibold text-sm text-on-surface truncate group-hover:text-primary transition-colors">Trần Minh Anh</h4>
                <p className="font-normal text-sm text-on-surface-variant truncate">ĐH Sư Phạm TP.HCM</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-medium text-xs text-on-surface">4.9 (124)</span>
                </div>
              </div>
            </div>
            <div className="p-4 glass border border-white/20 rounded-3xl flex gap-4 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-slide-up stagger-4">
              <img alt="Tutor" className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-surface shadow-sm group-hover:border-primary/30 transition-colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv5jTZIiacbQcrXMyddJos4A_F0tTGTDrn6nQYU1bvfZBUECqSNuDfuSRVRk6CHmJdNEmn1FTzLeFAZ7AJORoMVX0wf-XoYRY7T-gnwLlIhXdGvNBZr696ICRcbjAXas20ZhL7v0-Xepxv7hnth1b-6nBnmGOrcwl93tKYtdUN7Bbz81fugRnDC3tlmvblwb7p9yOAxsDMGxy4JrMLkPnDaaTC22xHjLj99TuuQZ5M8fLDX3T6HnDx4xN-MFDXzPfIykkhst8bQnNX" />
              <div className="flex flex-col gap-1 overflow-hidden">
                <h4 className="font-semibold text-sm text-on-surface truncate group-hover:text-primary transition-colors">Nguyễn Hoàng Nam</h4>
                <p className="font-normal text-sm text-on-surface-variant truncate">IELTS 8.5 - 5 năm KN</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-medium text-xs text-on-surface">5.0 (86)</span>
                </div>
              </div>
            </div>
            <button className="w-full py-4 glass border border-dashed border-outline-variant rounded-2xl text-on-surface-variant font-semibold text-sm hover:bg-surface-container-high transition-all active:scale-95 animate-slide-up stagger-5">Tìm thêm gia sư</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParentDashboard;
