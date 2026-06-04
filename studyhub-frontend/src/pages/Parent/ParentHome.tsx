import React from 'react';

import TopNavBar from '../../components/Parent/TopNavBar';

const ParentHome: React.FC = () => {
  return (
    <div className="bg-[#f8f9fb] text-[#191c1e] min-h-screen font-sans">
      <TopNavBar />
      
      <main className="mt-[72px]">
        {/* Hero Section */}
        <section className="relative bg-[#003d9b] py-20 overflow-hidden">
          {/* Abstract Background Decoration */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0052cc] rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00687b] rounded-full blur-3xl -ml-20 -mb-20"></div>
          </div>
          <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
            <h1 className="text-white font-bold text-5xl mb-8 leading-tight">
              Tìm kiếm gia sư hoàn hảo
            </h1>
            <div className="max-w-4xl mx-auto bg-white p-4 rounded-xl shadow-xl flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737685]">book</span>
                <input className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#f3f4f6] border-none focus:ring-2 focus:ring-[#003d9b] font-normal text-base text-[#191c1e]" placeholder="Môn học (Toán, Lý, Tiếng Anh...)" type="text" />
              </div>
              <div className="flex-1 w-full relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737685]">location_on</span>
                <input className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#f3f4f6] border-none focus:ring-2 focus:ring-[#003d9b] font-normal text-base text-[#191c1e]" placeholder="Địa điểm (Quận, Thành phố)" type="text" />
              </div>
              <button className="w-full md:w-auto bg-[#0052cc] text-white px-10 py-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95">
                <span className="material-symbols-outlined">search</span>
                Tìm kiếm
              </button>
            </div>
            <p className="mt-6 text-[#dae2ff] text-base font-normal">Gợi ý phổ biến: Toán lớp 12, IELTS 7.5, Lập trình Python, Guitar cơ bản</p>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-[#f8f9fb]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-[#c3c6d6] flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#0052cc]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#003d9b] text-3xl">school</span>
                </div>
                <h3 className="font-bold text-3xl text-[#003d9b]">12,000+</h3>
                <p className="text-[#434654] font-normal text-base">Lớp học đã kết nối</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-[#c3c6d6] flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#50dcff]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#00687b] text-3xl">verified_user</span>
                </div>
                <h3 className="font-bold text-3xl text-[#00687b]">8,500+</h3>
                <p className="text-[#434654] font-normal text-base">Gia sư xác thực</p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-[#c3c6d6] flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#7d5200]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#5e3c00] text-3xl">sentiment_satisfied</span>
                </div>
                <h3 className="font-bold text-3xl text-[#5e3c00]">98%</h3>
                <p className="text-[#434654] font-normal text-base">Phụ huynh hài lòng</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-[#c3c6d6]">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="text-center">
            <h4 className="font-bold text-[#191c1e] mb-6 text-xl">StudyHub</h4>
            <p className="text-[#434654] font-normal text-sm mb-6">Trải nghiệm nền tảng kết nối giáo dục hàng đầu Việt Nam.</p>
            <p className="text-[#434654] font-normal text-sm">© 2026 StudyHub Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParentHome;
