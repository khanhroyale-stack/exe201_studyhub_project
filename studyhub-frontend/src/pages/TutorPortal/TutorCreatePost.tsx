import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TutorCreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { tutorId } = useAuth();
  const [subjects, setSubjects] = useState<{id: number, name: string}[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    subjectName: 'Toán học',
    locationType: 'Online & Offline',
    location: '', // used as address
    price: '',
    description: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/subjects')
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, subjectName: data[0].name }));
        }
      })
      .catch(err => console.error('Failed to fetch subjects:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorId) {
      alert('Không tìm thấy thông tin gia sư!');
      return;
    }
    
    const priceNum = parseInt(formData.price, 10);
    if (isNaN(priceNum) || priceNum > 1000000 || priceNum < 50000) {
      alert('Học phí phải nằm trong khoảng từ 50,000 đến 1,000,000 VNĐ/ca!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/courses?tutorId=${tutorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Đăng tin thành công! Bài đăng của bạn đang chờ Admin duyệt.');
        navigate('/tutor/dashboard');
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-on-surface mb-2">Tạo tin tìm học viên</h1>
      <p className="text-on-surface-variant mb-8">Điền thông tin chi tiết để phụ huynh và học viên có thể tìm thấy bạn dễ dàng hơn.</p>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-outline-variant flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Tiêu đề tin đăng</label>
          <input required name="title" value={formData.title} onChange={handleChange} type="text" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Ví dụ: Nhận gia sư Toán cấp 2, 3 khu vực Cầu Giấy" />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Môn học</label>
            <select name="subjectName" value={formData.subjectName} onChange={handleChange} className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
              {subjects.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Hình thức dạy</label>
            <select name="locationType" value={formData.locationType} onChange={handleChange} className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary">
              <option value="Online & Offline">Online & Offline</option>
              <option value="Chỉ Online">Chỉ Online</option>
              <option value="Chỉ Offline">Chỉ Offline</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Học phí đề xuất (VNĐ/ca)</label>
          <input required max="1000000" min="50000" name="price" value={formData.price} onChange={handleChange} type="number" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Ví dụ: 200000" />
        </div>

        {(formData.locationType === 'Online & Offline' || formData.locationType === 'Chỉ Offline') && (
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-on-surface">Địa chỉ cụ thể</label>
            <input required name="location" value={formData.location} onChange={handleChange} type="text" className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Ví dụ: 123 Đường ABC, Quận X" />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-on-surface">Giới thiệu chi tiết</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} className="px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary h-32" placeholder="Chia sẻ kinh nghiệm giảng dạy, thành tích học tập và phương pháp dạy của bạn..."></textarea>
        </div>

        <button type="submit" className="mt-4 bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-container transition-colors shadow-sm">
          Đăng tin ngay
        </button>
      </form>
    </div>
  );
};

export default TutorCreatePost;
