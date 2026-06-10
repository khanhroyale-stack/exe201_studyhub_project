import React, { useState, useEffect } from 'react';
import { tutorPortalApi, Subject, TutorPost } from '../../services/tutorPortalApi';

const TutorCreatePost: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [myPosts, setMyPosts] = useState<TutorPost[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    subjectId: 1,
    teachingMethod: 'ONLINE',
    pricePerSession: 0,
    description: '',
    image: '',
    schedule: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, postsRes] = await Promise.all([
          tutorPortalApi.getSubjects(),
          tutorPortalApi.getMyPosts()
        ]);
        setSubjects(subRes);
        if (subRes.length > 0) setFormData(prev => ({ ...prev, subjectId: subRes[0].id }));
        setMyPosts(postsRes);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      await tutorPortalApi.createCourse(formData);
      setSuccessMsg('Đăng tin tìm học viên thành công!');
      // refresh posts
      const postsRes = await tutorPortalApi.getMyPosts();
      setMyPosts(postsRes);

      setFormData({
        title: '',
        subjectId: subjects.length > 0 ? subjects[0].id : 1,
        teachingMethod: 'ONLINE',
        pricePerSession: 0,
        description: '',
        image: '',
        schedule: '',
        location: ''
      });
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin này không?')) return;
    try {
      await tutorPortalApi.deletePost(id);
      setMyPosts(myPosts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-on-surface mb-2">Tạo tin tìm học viên</h1>
      <p className="text-on-surface-variant mb-8">Điền thông tin chi tiết để phụ huynh và học viên có thể tìm thấy bạn dễ dàng hơn.</p>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-outline-variant flex flex-col gap-6">
        {successMsg && <div className="bg-green-100 text-green-800 p-3 rounded-lg font-medium">{successMsg}</div>}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Tiêu đề tin đăng</label>
          <input required name="title" value={formData.title} onChange={handleChange} type="text" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Ví dụ: Nhận gia sư Toán cấp 2, 3 khu vực Cầu Giấy" />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Môn học</label>
            <select name="subjectId" value={formData.subjectId} onChange={handleChange} className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Hình thức dạy</label>
            <select name="teachingMethod" value={formData.teachingMethod} onChange={handleChange} className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
              <option value="BOTH">Online & Offline</option>
              <option value="ONLINE">Chỉ Online</option>
              <option value="OFFLINE">Chỉ Offline</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Học phí đề xuất (VNĐ/ca)</label>
            <input required name="pricePerSession" value={formData.pricePerSession} onChange={handleChange} type="number" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Ví dụ: 200000" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Lịch học dự kiến</label>
            <input required name="schedule" value={formData.schedule} onChange={handleChange} type="text" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="VD: Tối thứ 2, 4, 6" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Khu vực / Nền tảng (nếu Online)</label>
          <input required name="location" value={formData.location} onChange={handleChange} type="text" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="VD: Quận Cầu Giấy hoặc Google Meet" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Giới thiệu chi tiết</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary h-32" placeholder="Chia sẻ kinh nghiệm giảng dạy, thành tích học tập và phương pháp dạy của bạn..."></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Ảnh mô tả (tùy chọn)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" />
          {formData.image && (
            <img src={formData.image} alt="Preview" className="w-48 h-32 object-cover rounded-xl mt-2 border border-outline-variant" />
          )}
        </div>

        <button type="submit" disabled={loading} className="mt-4 bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-container transition-colors shadow-sm disabled:opacity-50">
          {loading ? 'Đang xử lý...' : 'Đăng tin ngay'}
        </button>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Các tin đã đăng của bạn</h2>
        <div className="space-y-4">
          {myPosts.length === 0 ? (
            <p className="text-on-surface-variant">Bạn chưa đăng tin nào.</p>
          ) : (
            myPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl p-6 border border-outline-variant flex gap-6 items-center">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-32 h-24 object-cover rounded-lg shrink-0" />
                ) : (
                  <div className="w-32 h-24 bg-surface-container rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-outline">image</span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-on-surface mb-1">{post.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2 text-sm">
                    <span className="px-2 py-1 bg-surface-container-high rounded text-on-surface-variant">{post.subjectName}</span>
                    <span className="px-2 py-1 bg-surface-container-high rounded text-on-surface-variant">{post.teachingMethod}</span>
                    <span className="px-2 py-1 bg-primary-container text-on-primary-container rounded font-medium">{post.price}</span>
                  </div>
                  <p className="text-sm text-on-surface-variant">{post.location} • {post.schedule}</p>
                </div>
                <button 
                  onClick={() => handleDeletePost(post.id)}
                  className="w-10 h-10 rounded-full hover:bg-error-container text-error flex items-center justify-center transition-colors"
                  title="Xóa tin này"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorCreatePost;
