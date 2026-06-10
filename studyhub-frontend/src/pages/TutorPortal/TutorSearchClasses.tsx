import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tutorPortalApi, JobPosting, Subject } from '../../services/tutorPortalApi';

const TutorSearchClasses: React.FC = () => {
  const [posts, setPosts] = useState<JobPosting[]>([]);
  const [subjectsList, setSubjectsList] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    subjects: [] as string[],
    learningMode: 'ALL',
    minPrice: '' as string | number,
    maxPrice: '' as string | number,
    sortBy: 'newest'
  });

  useEffect(() => {
    tutorPortalApi.getSubjects().then(setSubjectsList).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await tutorPortalApi.getJobPostings({
          subjects: filters.subjects.length > 0 ? filters.subjects : undefined,
          learningMode: filters.learningMode,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
          sortBy: filters.sortBy
        });
        setPosts(data);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      } finally {
        setLoading(false);
      }
    };
    // Add debounce to prevent too many requests
    const timer = setTimeout(() => {
      fetchPosts();
    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleSubjectChange = (subjectName: string) => {
    setFilters(prev => {
      const isSelected = prev.subjects.includes(subjectName);
      if (isSelected) {
        return { ...prev, subjects: prev.subjects.filter(s => s !== subjectName) };
      } else {
        return { ...prev, subjects: [...prev.subjects, subjectName] };
      }
    });
  };

  const handleClearFilters = () => {
    setFilters({
      subjects: [],
      learningMode: 'ALL',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-gutter flex justify-between items-end animate-slide-up">
        <div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-2">Tìm kiếm lớp học</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Khám phá các cơ hội giảng dạy phù hợp với chuyên môn của bạn.</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-label-md font-label-md text-on-surface-variant">
          <span>Sắp xếp theo:</span>
          <select 
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="bg-surface-container-lowest border border-outline-variant rounded-md py-1.5 pl-3 pr-8 focus:border-primary focus:ring-0 cursor-pointer"
          >
            <option value="newest">Mới nhất</option>
            <option value="highest_price">Học phí cao nhất</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-gutter items-start animate-slide-up stagger-1">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 glass border border-white/20 rounded-2xl p-6 shrink-0 sticky top-[96px] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-headline-sm font-headline-sm text-on-background">Bộ lọc</h3>
            <button onClick={handleClearFilters} className="text-label-sm font-label-sm text-primary hover:underline">Xóa tất cả</button>
          </div>
          {/* Môn học */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3 flex items-center justify-between">
              Môn học
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">keyboard_arrow_up</span>
            </h4>
            <div className="space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar">
              {subjectsList.map(subject => (
                <label key={subject.id} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    checked={filters.subjects.includes(subject.name)}
                    onChange={() => handleSubjectChange(subject.name)}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4 cursor-pointer" 
                    type="checkbox" 
                  />
                  <span className={`text-body-sm transition-colors ${filters.subjects.includes(subject.name) ? 'font-medium text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                    {subject.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* Hình thức */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Hình thức học</h4>
            <div className="flex gap-2">
              <label className="flex-1 text-center cursor-pointer">
                <input 
                  checked={filters.learningMode === 'ALL'}
                  onChange={() => setFilters(prev => ({ ...prev, learningMode: 'ALL' }))}
                  className="peer sr-only" name="format" type="radio" 
                />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Tất cả</div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input 
                  checked={filters.learningMode === 'ONLINE'}
                  onChange={() => setFilters(prev => ({ ...prev, learningMode: 'ONLINE' }))}
                  className="peer sr-only" name="format" type="radio" 
                />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Online</div>
              </label>
              <label className="flex-1 text-center cursor-pointer">
                <input 
                  checked={filters.learningMode === 'OFFLINE'}
                  onChange={() => setFilters(prev => ({ ...prev, learningMode: 'OFFLINE' }))}
                  className="peer sr-only" name="format" type="radio" 
                />
                <div className="px-3 py-2 rounded-lg border border-outline-variant text-body-sm text-on-surface-variant peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed peer-checked:border-primary peer-checked:font-medium transition-all">Offline</div>
              </label>
            </div>
          </div>
          {/* Khoảng học phí */}
          <div className="mb-6 border-b border-outline-variant pb-6">
            <h4 className="text-label-md font-label-md text-on-surface mb-3">Khoảng học phí (VNĐ/ca)</h4>
            <div className="flex items-center gap-2">
              <input 
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                className="w-full bg-surface border border-outline-variant rounded-md py-1.5 px-3 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                placeholder="Tối thiểu" type="number" 
              />
              <span className="text-on-surface-variant">-</span>
              <input 
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full bg-surface border border-outline-variant rounded-md py-1.5 px-3 text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                placeholder="Tối đa" type="number" 
              />
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
                    <p className="text-body-sm font-medium text-on-surface">{post.location}</p>
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
