import React from 'react';
import { CURRENT_PARENT, MOCK_JOB_POSTINGS } from '../../constants/mockParentData';

const ParentDashboard: React.FC = () => {
  const activePostings = MOCK_JOB_POSTINGS.filter(p => p.status !== 'CLOSED');

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Search & Filter Section */}
      <section className="relative rounded-xl overflow-hidden bg-[#003d9b] p-12 min-h-[300px] flex flex-col justify-center gap-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path className="text-white" d="M0 0 L100 0 L100 100 Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="font-bold text-5xl text-white mb-2">Tìm kiếm gia sư hoàn hảo</h1>
          <p className="font-normal text-lg text-[#b2c5ff] opacity-90 max-w-2xl">Đảm bảo tương lai học tập cho con bạn với đội ngũ gia sư đã được kiểm duyệt chuyên môn cao tại StudyHub.</p>
        </div>
        <div className="relative z-10 w-full max-w-4xl bg-white p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4 gap-3 border-r border-[#c3c6d6]">
            <span className="material-symbols-outlined text-[#737685]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>search</span>
            <input className="w-full border-none outline-none focus:ring-0 text-[#191c1e] font-normal text-base placeholder:text-[#c3c6d6]" placeholder="Môn học, từ khóa..." type="text" />
          </div>
          <div className="flex-1 flex items-center px-4 gap-3 border-r border-[#c3c6d6]">
            <span className="material-symbols-outlined text-[#737685]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>location_on</span>
            <select className="w-full border-none outline-none focus:ring-0 text-[#191c1e] font-normal text-base appearance-none">
              <option>Tất cả khu vực</option>
              <option>Quận 1, TP. HCM</option>
              <option>Cầu Giấy, Hà Nội</option>
            </select>
          </div>
          <button className="bg-[#0052cc] text-white px-8 py-3 rounded-lg font-semibold text-xl hover:brightness-110 transition-all flex items-center gap-2">
            Tìm kiếm
          </button>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 p-6 bg-white border border-[#c3c6d6] rounded-xl flex flex-col gap-2">
          <span className="font-semibold text-sm text-[#434654] uppercase tracking-wider">Hồ sơ ứng tuyển</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-3xl text-[#003d9b]">12</span>
            <span className="font-medium text-xs text-[#00687b]">+3 hôm nay</span>
          </div>
        </div>
        <div className="md:col-span-1 p-6 bg-white border border-[#c3c6d6] rounded-xl flex flex-col gap-2">
          <span className="font-semibold text-sm text-[#434654] uppercase tracking-wider">Lớp đang đợi</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-3xl text-[#003d9b]">0{CURRENT_PARENT.classesWaiting}</span>
            <span className="font-medium text-xs text-[#c3c6d6]">Giảm 1</span>
          </div>
        </div>
        <div className="md:col-span-2 p-6 bg-[#50dcff] text-[#005f71] border border-[#c3c6d6] rounded-xl flex items-center justify-between">
          <div>
            <span className="font-semibold text-sm uppercase tracking-wider opacity-80">Ngân sách đã chi (Tháng này)</span>
            <p className="font-bold text-3xl">{CURRENT_PARENT.budgetSpentThisMonth.toLocaleString('vi-VN')}đ</p>
          </div>
          <div className="w-24 h-12 bg-white/30 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>trending_up</span>
          </div>
        </div>
      </section>

      {/* Latest Postings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl text-[#191c1e]">Lớp học mới đăng</h2>
            <a className="font-semibold text-sm text-[#003d9b] hover:underline" href="#">Xem tất cả</a>
          </div>
          <div className="flex flex-col gap-4">
            {activePostings.map((post) => (
              <div key={post.id} className="bg-white border border-[#c3c6d6] rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-xl text-[#191c1e]">{post.title}</h3>
                    <p className="font-normal text-sm text-[#434654] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>schedule</span> Đăng gần đây
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full font-medium text-xs ${post.status === 'PRIORITY' ? 'bg-[#50dcff] text-[#005f71]' : 'bg-[#dae2ff] text-[#003d9b]'}`}>
                    {post.status === 'PRIORITY' ? 'Ưu tiên' : 'Đang tuyển'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#edeef0] text-[#434654] rounded-lg font-medium text-xs">{post.location}</span>
                  <span className="px-3 py-1 bg-[#edeef0] text-[#434654] rounded-lg font-medium text-xs">{post.schedule}</span>
                  <span className="px-3 py-1 bg-[#edeef0] text-[#434654] rounded-lg font-medium text-xs">{post.requirement}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#c3c6d6]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003d9b]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>payments</span>
                    <span className="font-semibold text-xl text-[#191c1e]">{post.pricePerSession.toLocaleString('vi-VN')}đ / buổi</span>
                  </div>
                  <div className="flex -space-x-2">
                    {post.applicantsAvatars.map((avatar, idx) => (
                      <img key={idx} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" src={avatar} />
                    ))}
                    {post.applicantsCount > post.applicantsAvatars.length && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-[#edeef0] flex items-center justify-center text-[10px] font-bold text-[#434654]">
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
            <h2 className="font-semibold text-xl text-[#191c1e]">Gia sư gợi ý</h2>
            <button className="p-1 rounded-full hover:bg-[#edeef0] transition-colors">
              <span className="material-symbols-outlined text-[#434654]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>refresh</span>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-white border border-[#c3c6d6] rounded-xl flex gap-4 hover:border-[#003d9b] transition-colors cursor-pointer group">
              <img alt="Tutor" className="w-16 h-16 rounded-full object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK8lhUpNKWMGZdwWdGo_4FXgZVfv-aK31m5zmy7y8iz5aXDOxZWxztDZo4o_BOMqXLIurd0OH9J4k_1g8FSatf8iIppQSW74L8s3wRv2_kyTuBfODLMUlUytLQHza3mGMHWAxV95EG7cBn1ca0ax5WPK72RNEZscgIYi38t-j1-96iByOZpte1JuR9fgKm9nvJaalo1lQnCPtb5AInRo0G8wLhrQes8UdGrCGy8ZTy2QvbpLZWIIbP9T7vlO1lyoxURHsc97jRjRSd" />
              <div className="flex flex-col gap-1 overflow-hidden">
                <h4 className="font-semibold text-sm text-[#191c1e] truncate group-hover:text-[#003d9b] transition-colors">Trần Minh Anh</h4>
                <p className="font-normal text-sm text-[#434654] truncate">ĐH Sư Phạm TP.HCM</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#5e3c00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-medium text-xs text-[#191c1e]">4.9 (124)</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white border border-[#c3c6d6] rounded-xl flex gap-4 hover:border-[#003d9b] transition-colors cursor-pointer group">
              <img alt="Tutor" className="w-16 h-16 rounded-full object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv5jTZIiacbQcrXMyddJos4A_F0tTGTDrn6nQYU1bvfZBUECqSNuDfuSRVRk6CHmJdNEmn1FTzLeFAZ7AJORoMVX0wf-XoYRY7T-gnwLlIhXdGvNBZr696ICRcbjAXas20ZhL7v0-Xepxv7hnth1b-6nBnmGOrcwl93tKYtdUN7Bbz81fugRnDC3tlmvblwb7p9yOAxsDMGxy4JrMLkPnDaaTC22xHjLj99TuuQZ5M8fLDX3T6HnDx4xN-MFDXzPfIykkhst8bQnNX" />
              <div className="flex flex-col gap-1 overflow-hidden">
                <h4 className="font-semibold text-sm text-[#191c1e] truncate group-hover:text-[#003d9b] transition-colors">Nguyễn Hoàng Nam</h4>
                <p className="font-normal text-sm text-[#434654] truncate">IELTS 8.5 - 5 năm KN</p>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#5e3c00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-medium text-xs text-[#191c1e]">5.0 (86)</span>
                </div>
              </div>
            </div>
            <button className="w-full py-3 border border-dashed border-[#c3c6d6] rounded-xl text-[#434654] font-semibold text-sm hover:bg-[#edeef0] transition-colors">Tìm thêm gia sư</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParentDashboard;
