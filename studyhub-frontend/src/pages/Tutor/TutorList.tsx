import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const mockTutors = [
  {
    id: 1,
    name: "Nguyễn Thu Hà",
    rating: "4.9 (42)",
    title: "Sư phạm Toán - ĐH Sư Phạm HN",
    description: "Chuyên luyện thi Đại học khối A, A1 với hơn 5 năm kinh nghiệm. Phương pháp dạy tư duy mới giúp học sinh nắm vững bản chất...",
    tags: ["Toán học", "Luyện thi ĐH"],
    price: "250k",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAafkUxSEbecZeyzdQ4kmzN35u9l9kBfrGnMtR4KvGn5aE3AkkyKzCmopwLDJyt6vA5xFII7gr2d9puRHlHHXS0mNxWtvWou3c__njVrEXam9r1Q9B9Ws-IDgX6CwJ-zsGG2ug5k-9tSq43nFcfGW_30tLtFkCrrNblJ95WNtZXVDb1IIvpSqbvj24grKEXWt2lj3-o5JpQb6JVmZ2MY3zTQ_fKY_x77NPa8fLMboBFlvvE6SwvxYkdz1uY8OCxlUKqXwLlWWdPVInB"
  },
  {
    id: 2,
    name: "Trần Minh Hoàng",
    rating: "5.0 (28)",
    title: "IELTS 8.5 - ĐH Ngoại Thương",
    description: "Chuyên luyện thi IELTS Speaking & Writing. Cam kết đầu ra 6.5+ cho học sinh mất gốc. Lộ trình học cá nhân hóa...",
    tags: ["Tiếng Anh", "IELTS"],
    price: "400k",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9KPzsinuY3j52v2JxakeiWFDQmXeT12pHJPK441U8QGMNT3kIZ7X_g7hFt7_51HsGK1tYhqDcofz8iS4PDlaZ217KsZYhhbrjXQz_8oJMzXPKOmVkmrPZt7h2GuQWI3L8mmGfBrziDCxVtKbqJFev69rngZHPFOPWYVEbDMXzZ8i4nhWh0Az7vssahwoyBUuUoiyUz_2Rxolt8m2cBW7_XafR5NDrN9IJQ37_HTDLLcWQS5tj6f7kFPN65DWvg1PlUI14h8Xu_qAm"
  },
  {
    id: 3,
    name: "Lê Kim Chi",
    rating: "4.8 (19)",
    title: "Thạc sĩ Vật lý - ĐHQG TP.HCM",
    description: "Giải thích các hiện tượng vật lý khó hiểu một cách đơn giản nhất thông qua thực hành và ví dụ thực tế...",
    tags: ["Vật lý", "Cấp 3"],
    price: "300k",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV8ceA3IBB1SW9rwqVyHnsUFek92-Dl_UGarnIjDhlNa49vTbOdiAsGkFIAuj-gusBJGgZhd2-0rL3jXarbmhMnoSjeipy9H1dzuAmRO8ihfAcwxprldKK4LGxryB74_UQ0of4WJpnKny_K0MZrHS6Swco-g_UxEmlj3keYxukp695awsPFWR88tUppOrgyF3bsO5_Cfx0dk9K58vYcnNvNDb8IYMCQJdvH2VcLAGApN_huyd-n_r40zsqJgtxMSUnc6mLy5RNhcx2"
  },
  {
    id: 4,
    name: "Phạm Quốc Bảo",
    rating: "4.7 (35)",
    title: "Kỹ thuật phần mềm - ĐH Bách Khoa",
    description: "Hướng dẫn lập trình từ cơ bản đến nâng cao (Python, C++, Java). Hỗ trợ làm đồ án và giải các bài tập chuyên sâu...",
    tags: ["Tin học", "Lập trình"],
    price: "350k",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDclWBf8M216xLWZzkpawSUpVNZUoQ--zEcrmQ6M40eyqC6aK8-nQHspZmWXkiu1SHmqVwWfyVSQfuOisZh3svnQR22pQHw-xhuJr1GMm_R3UBzUBtvVLOaQYBYKtML2_fAgj9NrELWkPo7Y5uPvtq5WGvzZiSwOo4vyVW4KPv2dujxkRtceeORXE6baqCzKRaW-3DxUeGl2oxv3wtj5HQPZNb2W3k-Ekfjb7xVITdkjAuATjC_b7yuzofs0zO5YYCStJoWXfqbjMiU"
  }
];

const TutorList: React.FC = () => {
  return (
    <div className="bg-background text-on-surface">
      <Navbar />
      <main className="pt-[72px] min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-primary py-16 px-margin-desktop overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="relative z-10 max-w-[1440px] mx-auto text-center">
            <h1 className="font-headline-xl text-headline-xl text-on-primary mb-4">Tìm Gia Sư Phù Hợp Nhất</h1>
            <p className="font-body-lg text-body-lg text-on-primary-container opacity-90 mb-10 max-w-2xl mx-auto">
              Hơn 5000+ gia sư được xác thực từ các trường đại học hàng đầu, sẵn sàng đồng hành cùng bạn chinh phục mọi môn học.
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
              <p className="font-body-md text-body-md">Tìm thấy <span className="font-bold text-primary">124</span> gia sư phù hợp</p>
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
              {mockTutors.map((tutor) => (
                <div key={tutor.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md">
                  <div className="relative shrink-0">
                    <img alt="Tutor avatar" className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover" src={tutor.avatar} />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-4 border-surface-container-lowest">
                      <span className="material-symbols-outlined text-[16px] block" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{tutor.name}</h3>
                      <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-yellow-800">
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
                      <button className="px-5 py-2 border border-primary text-primary rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all">Xem hồ sơ</button>
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
      <Footer />
    </div>
  );
};

export default TutorList;
