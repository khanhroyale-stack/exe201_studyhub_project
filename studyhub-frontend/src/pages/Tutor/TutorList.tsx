import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TUTORS } from '../../constants/mockData';

const TutorList: React.FC = () => {
  return (
    <div className="bg-background text-on-surface">
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-primary pt-16 pb-20 px-margin-desktop overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-[-5%] w-[400px] h-[400px] rounded-full bg-white/10 blur-[80px] animate-float" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary-container/20 blur-[100px] animate-float-slow" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto text-center">
            <h1 className="font-headline-xl text-headline-xl text-on-primary mb-4">Bảng tin Gia Sư</h1>
            <p className="font-body-lg text-body-lg text-on-primary-container opacity-90 mb-10 max-w-2xl mx-auto">
              Lướt chọn các bài đăng PR tự giới thiệu từ 5000+ gia sư được xác thực, sẵn sàng đồng hành cùng bạn.
            </p>
            <div className="max-w-3xl mx-auto bg-surface-container-lowest p-2 rounded-xl shadow-lg flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 border-r border-outline-variant md:border-r-0 lg:border-r">
                <span className="material-symbols-outlined text-outline">person</span>
                <input className="w-full border-none focus:ring-0 font-body-md text-on-surface ml-2 outline-none" placeholder="Tên gia sư hoặc từ khóa..." type="text" />
              </div>
              <div className="flex-1 flex items-center px-4">
                <span className="material-symbols-outlined text-outline">book</span>
                <select className="w-full border-none focus:ring-0 font-body-md text-on-surface ml-2 bg-transparent outline-none cursor-pointer">
                  <option>Tất cả môn học</option>
                  <option>Toán học</option>
                  <option>Vật lý</option>
                  <option>Hóa học</option>
                  <option>Tiếng Anh</option>
                </select>
              </div>
              <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label-md flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95">
                <span className="material-symbols-outlined">search</span>
                Tìm kiếm
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 py-10 px-margin-desktop">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-[280px] shrink-0 space-y-8">
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-4">Bộ lọc tìm kiếm</h3>
              <div className="space-y-6">
                {/* Subject */}
                <div>
                  <label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-outline">Môn học</label>
                  <div className="space-y-2">
                    {['Toán học', 'Vật lý', 'Tiếng Anh'].map(subject => (
                      <label key={subject} className="flex items-center gap-3 cursor-pointer group">
                        <input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                        <span className="font-body-md text-body-md group-hover:text-primary transition-colors">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Price Range */}
                <div>
                  <label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-outline">Học phí (VND/giờ)</label>
                  <div className="space-y-4">
                    <input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" max="1000000" min="50000" step="50000" type="range" defaultValue="500000" />
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span>50k</span>
                      <span>1000k</span>
                    </div>
                  </div>
                </div>
                {/* Rating */}
                <div>
                  <label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-outline">Đánh giá</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="border-outline-variant text-primary focus:ring-primary h-5 w-5" name="rating" type="radio" />
                      <span className="flex items-center gap-1 font-body-md text-body-md">
                        4+ <span className="material-symbols-outlined text-orange-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </span>
                    </label>
                  </div>
                </div>
                {/* Teaching Method */}
                <div>
                  <label className="font-label-md text-label-md block mb-3 uppercase tracking-wider text-outline">Hình thức dạy</label>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 rounded-full border border-primary bg-primary-container/10 text-primary font-label-sm">Tất cả</button>
                    <button className="px-4 py-2 rounded-full border border-outline-variant hover:border-primary font-label-sm transition-colors">Online</button>
                    <button className="px-4 py-2 rounded-full border border-outline-variant hover:border-primary font-label-sm transition-colors">Offline</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Ad/CTA */}
            <div className="bg-surface-container rounded-xl p-6 border border-outline-variant">
              <h4 className="font-headline-sm text-headline-sm mb-2">Bạn giỏi kiến thức?</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Đăng ký trở thành gia sư tại StudyHub và tăng thu nhập ngay hôm nay.</p>
              <button className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label-md hover:opacity-90 transition-opacity">Trở thành Gia sư</button>
            </div>
          </aside>

          {/* Tutor Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="font-body-md text-body-md">Tìm thấy <span className="font-bold text-primary">{MOCK_TUTORS.length}</span> gia sư phù hợp</p>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-outline">Sắp xếp theo:</span>
                <select className="bg-transparent border-none font-label-md text-on-surface focus:ring-0 cursor-pointer outline-none">
                  <option>Phổ biến nhất</option>
                  <option>Giá thấp đến cao</option>
                  <option>Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {MOCK_TUTORS.map((tutor) => (
                <div key={tutor.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md">
                  <div className="relative shrink-0">
                    <img alt="Tutor avatar" className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover" src={tutor.avatar} />
                    {tutor.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-4 border-surface-container-lowest">
                        <span className="material-symbols-outlined text-[16px] block" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Tin PR</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">{tutor.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-yellow-800 shrink-0">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-label-sm">{tutor.rating}</span>
                      </div>
                    </div>
                    <p className="font-label-md text-primary mb-3">{tutor.title}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">{tutor.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tutor.tags.map(tag => (
                        <span key={tag} className="bg-primary-container/10 text-primary px-3 py-1 rounded-full font-label-sm">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                      <div>
                        <span className="font-headline-sm text-primary">{tutor.price}</span>
                        <span className="font-body-sm text-outline">/giờ</span>
                      </div>
                      <Link to={`/tutors/${tutor.id}`} className="px-5 py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all">Xem hồ sơ</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-label-md">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-label-md">3</button>
              <span className="mx-1">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-label-md">10</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorList;
