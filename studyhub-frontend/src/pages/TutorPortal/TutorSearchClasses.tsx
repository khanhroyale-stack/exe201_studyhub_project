import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDb } from '../../services/mockDb';
import { UnifiedPost, PostStatus } from '../../types/shared';

const TutorSearchClasses: React.FC = () => {
  const [posts, setPosts] = useState<UnifiedPost[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-gutter flex justify-between items-end animate-slide-up">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-2">Tìm kiếm lớp học</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Khám phá các cơ hội giảng dạy phù hợp với chuyên môn của bạn.</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-label-md font-label-md text-on-surface-variant">
          <span>Sắp xếp theo:</span>
          <select className="bg-surface-container-lowest border border-outline-variant rounded-md py-1.5 pl-3 pr-8 focus:border-primary focus:ring-0 cursor-pointer">
            <option>Mới nhất</option>
            <option>Học phí cao nhất</option>
            <option>Gần tôi nhất</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-gutter items-start animate-slide-up stagger-1">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 glass border border-white/20 rounded-2xl p-6 shrink-0 sticky top-[96px] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-headline-sm font-headline-sm text-on-background">Bộ lọc</h3>
            <button className="text-label-sm font-label-sm text-primary hover:underline">Xóa tất cả</button>
          </div>
          {/* Môn học */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3 flex items-center justify-between">
              Môn học
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">keyboard_arrow_up</span>
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Toán học</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm font-medium text-on-surface group-hover:text-on-surface transition-colors">Tiếng Anh</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Vật lý</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Hóa học</span>
              </label>
              <button className="text-label-sm font-label-sm text-primary mt-1 hover:underline">Xem thêm</button>
            </div>
          </div>
          {/* Hình thức */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Hình thức học</h4>
            <div className="flex gap-2">
              <label className="flex-1 text-center cursor-pointer">
                <input defaultChecked className="peer sr-only" name="format" type="radio" />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Tất cả</div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input className="peer sr-only" name="format" type="radio" />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Online</div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input className="peer sr-only" name="format" type="radio" />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Offline</div>
              </label>
            </div>
          </div>
          {/* Khoảng học phí */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Khoảng học phí (VNĐ/ca)</h4>
            <div className="flex items-center gap-2">
              <input className="w-full bg-surface border border-outline-variant rounded-md py-1.5 px-3 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Tối thiểu" type="text" />
              <span className="text-on-surface-variant">-</span>
              <input className="w-full bg-surface border border-outline-variant rounded-md py-1.5 px-3 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Tối đa" type="text" />
            </div>
          </div>
        </div>
        {/* Class List Grid */}
        <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slide-up stagger-2">
          {loading ? (
            <div className="col-span-1 xl:col-span-2 text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
              Đang tải danh sách lớp học...
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-1 xl:col-span-2 text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
              Hiện tại không có lớp học nào đang tuyển gia sư.
            </div>
          ) : posts.map(post => (
            <div key={post.id} className="glass border border-white/20 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4 pr-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded text-[11px] font-semibold">{post.subject}</span>
                    <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">{post.learningMode === 'ONLINE' ? 'Online' : 'Offline'}</span>
                  </div>
                  <h3 className="text-headline-sm font-headline-sm text-on-background line-clamp-1">{post.title}</h3>
                </div>
              </div>
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">{post.learningMode === 'ONLINE' ? 'laptop_mac' : 'location_on'}</span>
                  <div>
                    <p className="text-body-sm font-medium text-on-surface">
                      {post.learningMode === 'ONLINE' ? 'Học Online' : (post.detailedAddress ? `${post.detailedAddress}, ${post.location}` : post.location)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">calendar_today</span>
                  <p className="text-body-sm font-medium text-on-surface">{post.schedule}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">payments</span>
                  <div>
                    <p className="text-body-sm font-bold text-primary">{post.pricePerSession.toLocaleString()}đ <span className="text-on-surface-variant font-normal text-[13px]">/ ca</span></p>
                  </div>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-4 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={post.parentAvatar} alt={post.parentName} className="w-8 h-8 rounded-full object-cover border border-outline-variant" />
                  <div>
                    <p className="text-[13px] font-medium text-on-surface">{post.parentName}</p>
                  </div>
                </div>
                <Link to={`/tutor/apply-class/${post.id}`} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors shadow-sm">
                  Ứng tuyển ngay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorSearchClasses;
