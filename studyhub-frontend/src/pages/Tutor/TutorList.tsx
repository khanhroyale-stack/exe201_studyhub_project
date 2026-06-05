import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TUTORS } from '../../constants/mockData';
import CustomSelect from '../../components/CustomSelect';

const TutorList: React.FC = () => {
  const [sortBy, setSortBy] = useState('popular');
  return (
    <div className="bg-[#f7f9ff] text-on-surface min-h-screen">
      <div className="h-[68px]" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-br from-[#0a2463] via-primary to-indigo-600 pt-16 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] animate-float" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] rounded-full bg-indigo-300/10 blur-[80px] animate-float-slow" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/90 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
            Bảng tin Gia Sư
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Tìm gia sư hoàn hảo cho bạn
          </h1>
          <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Lướt chọn các bài PR từ 5,000+ gia sư được xác thực eKYC, sẵn sàng đồng hành cùng bạn.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-slate-100">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">person</span>
              <input
                className="w-full border-none outline-none text-sm placeholder:text-slate-400 text-slate-700 bg-transparent"
                placeholder="Tên gia sư hoặc từ khóa..."
                type="text"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">book</span>
              <select className="w-full border-none outline-none text-sm text-slate-600 bg-transparent cursor-pointer">
                <option>Tất cả môn học</option>
                <option>Toán học</option>
                <option>Vật lý</option>
                <option>Hóa học</option>
                <option>Tiếng Anh</option>
              </select>
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-[18px]">search</span>
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 flex flex-col md:flex-row gap-8">

        {/* ── Sidebar Filters ── */}
        <aside className="w-full md:w-[240px] shrink-0">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sticky top-24 shadow-sm space-y-7">
            <h3 className="font-bold text-lg text-[#0f172a] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
              Bộ lọc
            </h3>

            {/* Subject */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Môn học</p>
              <div className="space-y-2.5">
                {['Toán học', 'Vật lý', 'Tiếng Anh'].map(s => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                    <span className="text-sm text-slate-600 group-hover:text-primary transition-colors font-medium">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Học phí (VNĐ/giờ)</p>
              <input className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary" max="1000000" min="50000" step="50000" type="range" defaultValue="500000" />
              <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
                <span>50k</span><span>1,000k</span>
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Đánh giá</p>
              <div className="space-y-2">
                {[5, 4, 3].map(r => (
                  <label key={r} className="flex items-center gap-3 cursor-pointer group">
                    <input className="border-slate-300 text-primary focus:ring-primary h-4 w-4" name="rating" type="radio" />
                    <span className="flex items-center gap-1 text-sm text-slate-600 font-medium">
                      {r}+ <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Teaching method */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Hình thức dạy</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm shadow-primary/25">Tất cả</button>
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:border-primary hover:text-primary text-xs font-medium transition-colors">Online</button>
                <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 hover:border-primary hover:text-primary text-xs font-medium transition-colors">Offline</button>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary/8 to-indigo-500/8 border border-primary/15 rounded-xl p-5">
              <h4 className="font-bold text-[#0f172a] text-sm mb-1.5">Bạn giỏi kiến thức?</h4>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">Đăng ký gia sư tại StudyHub và tăng thu nhập ngay hôm nay.</p>
              <button className="w-full py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25">
                Trở thành Gia sư
              </button>
            </div>
          </div>
        </aside>

        {/* ── Tutor Grid ── */}
        <div className="flex-1">
          {/* Header row */}
          <div className="flex justify-between items-center mb-7">
            <p className="text-sm text-slate-500">
              Tìm thấy <span className="font-bold text-primary">{MOCK_TUTORS.length}</span> gia sư phù hợp
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Sắp xếp:</span>
              <CustomSelect
                options={[
                  { value: 'popular', label: 'Phổ biến nhất' },
                  { value: 'price_asc', label: 'Giá thấp → cao' },
                  { value: 'rating', label: 'Đánh giá cao nhất' },
                ]}
                value={sortBy}
                onChange={setSortBy}
                size="sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MOCK_TUTORS.map((tutor) => (
              <div key={tutor.id} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-[0_12px_40px_rgba(0,61,155,0.1)] hover:-translate-y-1 transition-all duration-300 group shadow-sm flex gap-5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img alt="Tutor" className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white shadow-md" src={tutor.avatar} />
                  {tutor.verified && (
                    <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white shadow-sm">
                      <span className="material-symbols-outlined text-[13px] block" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0">PR</span>
                      <h3 className="font-bold text-[#0f172a] text-base truncate group-hover:text-primary transition-colors">{tutor.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg shrink-0">
                      <span className="material-symbols-outlined text-amber-500 text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="text-xs font-bold text-amber-700">{tutor.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-primary mb-2">{tutor.title}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">{tutor.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tutor.tags.map(tag => (
                      <span key={tag} className="bg-primary/8 text-primary px-2.5 py-1 rounded-lg text-[10px] font-bold border border-primary/15">{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-lg font-extrabold text-primary">{tutor.price}</span>
                      <span className="text-xs text-slate-400 font-medium">/giờ</span>
                    </div>
                    <Link
                      to={`/tutors/${tutor.id}`}
                      className="px-4 py-2 border border-primary text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95 hover:shadow-md hover:shadow-primary/25"
                    >
                      Xem hồ sơ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 shadow-sm" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${n === 1 ? 'bg-primary text-white shadow-md shadow-primary/30' : 'border border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-primary shadow-sm'}`}>
                {n}
              </button>
            ))}
            <span className="text-slate-300 px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors shadow-sm">10</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:border-primary hover:text-primary transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorList;
