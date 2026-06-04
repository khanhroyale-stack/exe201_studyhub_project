import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CLASSES } from '../../constants/mockData';

const ClassList: React.FC = () => {
  return (
    <div className="bg-background text-on-surface">
      <main className="min-h-screen">
        {/* Hero Search Section */}
        <section className="relative bg-primary pt-16 pb-20 px-margin-desktop text-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-[-5%] w-[400px] h-[400px] rounded-full bg-white/10 blur-[80px] animate-float" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary-container/20 blur-[100px] animate-float-slow" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="font-headline-xl text-headline-xl text-on-primary mb-6">Tìm kiếm lớp học phù hợp</h1>
            <div className="relative max-w-2xl mx-auto">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full h-14 pl-12 pr-32 rounded-xl border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-secondary-container shadow-lg font-body-md text-body-md" placeholder="Tìm kiếm theo tên lớp, môn học hoặc từ khóa..." type="text" />
              <button className="absolute right-2 top-2 bottom-2 bg-primary-container text-on-primary px-6 rounded-lg font-label-md hover:bg-primary transition-colors">
                Tìm kiếm
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-primary-fixed font-body-sm">
              <span>Gợi ý:</span>
              <a className="underline hover:text-white" href="#">Luyện thi đại học</a>
              <a className="underline hover:text-white" href="#">Tiếng Anh Giao tiếp</a>
              <a className="underline hover:text-white" href="#">Toán 12</a>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-[1440px] mx-auto px-margin-desktop py-12 flex flex-col md:flex-row gap-gutter">
          {/* Left Sidebar: Filters */}
          <aside className="w-full md:w-[280px] flex-shrink-0">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-sm text-headline-sm">Bộ lọc</h2>
                <button className="text-primary font-label-sm hover:underline">Xóa tất cả</button>
              </div>

              {/* Môn học */}
              <div className="mb-8">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Môn học</h3>
                <div className="space-y-3">
                  {['Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'Tin học'].map(subject => (
                    <label key={subject} className="flex items-center gap-3 cursor-pointer group">
                      <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                      <span className="font-body-md text-body-md group-hover:text-primary">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Học phí */}
              <div className="mb-8">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Học phí (vnđ/ca)</h3>
                <input className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer filter-range" max="1000000" min="50000" step="50000" type="range" defaultValue="500000" />
                <div className="flex justify-between mt-3 font-body-sm text-on-surface-variant">
                  <span>50k</span>
                  <span>1.000k</span>
                </div>
              </div>

              {/* Hình thức học */}
              <div className="mb-8">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Hình thức học</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 px-3 border border-outline-variant rounded-lg font-label-sm hover:border-primary hover:text-primary transition-colors bg-white">Online</button>
                  <button className="py-2 px-3 border border-primary text-primary bg-primary-container/10 rounded-lg font-label-sm">Offline</button>
                </div>
              </div>

              {/* Lớp học */}
              <div className="mb-2">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Lớp học</h3>
                <div className="space-y-3">
                  {['Lớp 10', 'Lớp 11', 'Lớp 12'].map((grade, index) => (
                    <label key={grade} className="flex items-center gap-3 cursor-pointer group">
                      <input defaultChecked={index === 1} className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                      <span className="font-body-md text-body-md group-hover:text-primary">{grade}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content Area: Grid of class cards */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <p className="font-body-md text-body-md text-on-surface-variant">Tìm thấy <span className="font-bold text-on-surface">{MOCK_CLASSES.length}</span> lớp học phù hợp</p>
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-outline">Sắp xếp:</span>
                <select className="bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm px-4 py-2 focus:ring-primary outline-none">
                  <option>Mới nhất</option>
                  <option>Học phí thấp đến cao</option>
                  <option>Học phí cao đến thấp</option>
                  <option>Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {MOCK_CLASSES.map(cls => (
                <div key={cls.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    <img alt={cls.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={cls.image} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{cls.title}</h3>
                      <div className="flex items-center text-tertiary">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="ml-1 font-label-md">{cls.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-on-surface-variant font-body-sm">
                      <span className="material-symbols-outlined text-[18px]">{cls.locationType === 'computer' || cls.locationType === 'videocam' ? 'videocam' : 'location_on'}</span>
                      <span>{cls.location}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-6 p-3 bg-surface-container-low rounded-lg">
                      <img alt="Tutor avatar" className="w-10 h-10 rounded-full object-cover" src={cls.tutorAvatar} />
                      <div>
                        <p className="font-label-md text-label-md">{cls.tutorName}</p>
                        <p className="text-body-sm text-outline">{cls.tutorDesc}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        <span className="block text-outline font-label-sm uppercase tracking-wider">Học phí</span>
                        <span className="font-headline-sm text-primary">{cls.price}<span className="text-body-sm font-normal text-on-surface-variant">/ca</span></span>
                      </div>
                      <Link to={`/classes/${cls.id}`} className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all active:scale-95 text-center">
                        Chi tiết lớp học
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors font-label-md">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors font-label-md">3</button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors font-label-md">12</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassList;
