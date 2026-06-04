import React from 'react';
import { CURRENT_PARENT, MOCK_JOB_POSTINGS } from '../../constants/mockParentData';

const ParentDashboard: React.FC = () => {
  const activePostings = MOCK_JOB_POSTINGS.filter(p => p.status !== 'CLOSED');

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Hero Search & Filter Section */}
      <section className="relative rounded-3xl overflow-hidden bg-primary p-12 min-h-[300px] flex flex-col justify-center gap-6 shadow-xl animate-slide-up">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path className="text-white" d="M0 0 L100 0 L100 100 Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="font-bold text-5xl text-on-primary mb-2">Tìm kiếm gia sư hoàn hảo</h1>
          <p className="font-normal text-lg text-primary-fixed opacity-90 max-w-2xl">Đảm bảo tương lai học tập cho con bạn với đội ngũ gia sư đã được kiểm duyệt chuyên môn cao tại StudyHub.</p>
        </div>
        <div className="relative z-10 w-full max-w-4xl bg-surface p-2 rounded-2xl shadow-lg flex flex-col md:flex-row gap-2 border border-outline-variant">
          <div className="flex-1 flex items-center px-4 gap-3 border-r border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input className="w-full bg-transparent border-none outline-none focus:ring-0 text-on-surface font-normal text-base placeholder:text-outline" placeholder="Môn học, từ khóa..." type="text" />
          </div>
          <div className="flex-1 flex items-center px-4 gap-3 border-r border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant">location_on</span>
            <select className="w-full bg-transparent border-none outline-none focus:ring-0 text-on-surface font-normal text-base appearance-none cursor-pointer">
              <option>Tất cả khu vực</option>
              <option>Quận 1, TP. HCM</option>
              <option>Cầu Giấy, Hà Nội</option>
            </select>
          </div>
          <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-semibold text-xl hover:bg-primary-container transition-all flex items-center gap-2 active:scale-95 shadow-md">
            Tìm kiếm
          </button>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up stagger-1">
        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Hồ sơ ứng tuyển</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-3xl text-primary">12</span>
            <span className="font-medium text-xs text-secondary">+3 hôm nay</span>
          </div>
        </div>
        <div className="md:col-span-1 p-6 glass border border-white/20 rounded-3xl flex flex-col gap-2 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg">
          <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Lớp đang đợi</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-3xl text-primary">0{CURRENT_PARENT.classesWaiting}</span>
            <span className="font-medium text-xs text-outline">Giảm 1</span>
          </div>
        </div>
        <div className="md:col-span-2 p-6 glass border border-white/20 rounded-3xl flex items-center justify-between hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg">
          <div>
            <span className="font-semibold text-sm text-on-surface-variant uppercase tracking-wider">Ngân sách đã chi (Tháng này)</span>
            <p className="font-bold text-3xl text-primary mt-1">{CURRENT_PARENT.budgetSpentThisMonth.toLocaleString('vi-VN')}đ</p>
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
