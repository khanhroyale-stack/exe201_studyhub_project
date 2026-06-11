import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UnifiedPost } from '../../types/shared';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

interface ApplicantDTO {
  id: number;
  jobPostingId: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const TutorSearchClasses: React.FC = () => {
  const { tutorId } = useAuth();
  const [posts, setPosts] = useState<UnifiedPost[]>([]);
  const [myApplications, setMyApplications] = useState<ApplicantDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, appsRes] = await Promise.all([
          fetch(`${BASE_URL}/posts`),
          tutorId ? fetch(`${BASE_URL}/posts/my-applications/${tutorId}`) : Promise.resolve(null)
        ]);

        if (postsRes.ok) {
          const postsData = await postsRes.json();
          // Lọc ra các bài đăng đang tuyển
          setPosts((Array.isArray(postsData) ? postsData : []).filter(p => p.status === 'RECRUITING'));
        }

        if (appsRes && appsRes.ok) {
          const appsData = await appsRes.json();
          setMyApplications(Array.isArray(appsData) ? appsData : []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tutorId]);

  // Helper để lấy trạng thái ứng tuyển của 1 bài đăng
  const getApplicationStatus = (postId: number | string) => {
    const app = myApplications.find(a => a.jobPostingId === Number(postId));
    return app ? app.status : null;
  };

  return (
    <div className="animate-fade-in pb-20">
      <div className="mb-8 flex justify-between items-end animate-slide-up">
        <div>
          <h1 className="text-3xl font-bold text-on-surface mb-2">Tìm kiếm lớp học</h1>
          <p className="text-base font-normal text-on-surface-variant">Khám phá các cơ hội giảng dạy phù hợp với chuyên môn của bạn.</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-on-surface-variant">
          <span>Sắp xếp theo:</span>
          <select className="bg-surface-container-lowest border border-outline-variant rounded-lg py-2 pl-4 pr-10 focus:border-primary focus:ring-0 cursor-pointer outline-none">
            <option>Mới nhất</option>
            <option>Học phí cao nhất</option>
            <option>Gần tôi nhất</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start animate-slide-up stagger-1">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 glass border border-white/20 rounded-2xl p-6 shrink-0 sticky top-[96px] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-on-background">Bộ lọc</h3>
            <button className="text-sm font-medium text-primary hover:underline">Xóa tất cả</button>
          </div>
          {/* Môn học */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-sm font-semibold text-on-surface mb-3 flex items-center justify-between">
              Môn học
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">keyboard_arrow_up</span>
            </h4>
            <div className="space-y-3">
              {['Toán học', 'Tiếng Anh', 'Vật lý', 'Hóa học'].map(subject => (
                <label key={subject} className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" type="checkbox" />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{subject}</span>
                </label>
              ))}
              <button className="text-sm font-medium text-primary mt-2 hover:underline">Xem thêm</button>
            </div>
          </div>
          {/* Hình thức */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-sm font-semibold text-on-surface mb-3">Hình thức học</h4>
            <div className="flex gap-2">
              {['Tất cả', 'Online', 'Offline'].map(format => (
                <label key={format} className="flex-1 text-center cursor-pointer">
                  <input className="peer sr-only" name="format" type="radio" defaultChecked={format === 'Tất cả'} />
                  <div className="px-3 py-2 rounded-lg border border-outline-variant text-xs text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-semibold transition-all">
                    {format}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Class List Grid */}
        <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slide-up stagger-2">
          {loading ? (
            <div className="col-span-1 xl:col-span-2 text-center py-20 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              Đang tải danh sách lớp học...
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-1 xl:col-span-2 text-center py-20 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
              Hiện tại không có lớp học nào đang tuyển gia sư.
            </div>
          ) : (
            posts.map((post) => {
              const status = getApplicationStatus(post.id);
              return (
                <div key={post.id} className="glass border border-white/20 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-primary-fixed text-on-primary-fixed-variant px-2.5 py-1 rounded-md text-xs font-semibold">{post.subject}</span>
                        <span className="bg-surface-container-high text-on-surface px-2.5 py-1 rounded-md text-xs font-medium border border-outline-variant">{post.classLevel}</span>
                        <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-md text-xs font-medium border border-outline-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">{post.learningMode === 'ONLINE' ? 'videocam' : 'location_on'}</span>
                          {post.learningMode === 'ONLINE' ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-on-background line-clamp-2 leading-tight">{post.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6 flex-1 mt-2">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-outline-variant text-[20px] mt-0.5">location_on</span>
                      <div>
                        <p className="text-sm font-medium text-on-surface">
                          {post.learningMode === 'ONLINE' ? 'Học Online' : (post.detailedAddress ? `${post.detailedAddress}, ${post.location}` : post.location)}
                        </p>
                      </div>
                    </div>
                    {post.schedule && (
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-outline-variant text-[20px]">calendar_today</span>
                        <p className="text-sm font-medium text-on-surface">{post.schedule}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-outline-variant text-[20px]">payments</span>
                      <div>
                        <p className="text-sm font-bold text-primary">{post.pricePerSession?.toLocaleString('vi-VN')}đ <span className="text-on-surface-variant font-normal text-xs">/ ca</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-outline-variant pt-5 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg">
                        {post.parentName?.charAt(0) || 'P'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{post.parentName || 'Phụ huynh'}</p>
                        <p className="text-xs text-on-surface-variant">{new Date(post.postedAt).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>

                    {status === 'PENDING' ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-semibold text-sm">
                        <span className="material-symbols-outlined text-[18px]">hourglass_empty</span>
                        Đang chờ duyệt
                      </span>
                    ) : status === 'ACCEPTED' ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold text-sm">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Đã được nhận
                      </span>
                    ) : status === 'REJECTED' ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-highest text-on-surface-variant font-semibold text-sm">
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                        Bị từ chối
                      </span>
                    ) : (
                      <Link to={`/tutor/apply-class/${post.id}`} className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        Ứng tuyển ngay
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorSearchClasses;
