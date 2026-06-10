import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { parentPortalApi } from '../../services/parentPortalApi';

const CreateFeedback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { classId, className, tutorName, tutorAvatar } = location.state || {};

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (!classId) {
      alert('Vui lòng chọn lớp học để đánh giá!');
      navigate('/parent/feedback');
    }
  }, [classId, navigate]);

  const tags = ['Nhiệt tình', 'Dễ hiểu', 'Chuyên môn cao'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá!');
      return;
    }
    
    try {
      await parentPortalApi.createFeedback({
        classId,
        rating,
        comment: `${comment} ${selectedTags.length > 0 ? `[Tags: ${selectedTags.join(', ')}]` : ''}`
      });
      alert('Cảm ơn bạn đã gửi đánh giá!');
      navigate('/parent/feedback');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-8 text-center animate-slide-up">
        <nav className="flex items-center justify-center gap-2 text-sm text-on-surface-variant mb-4">
          <Link to="/parent/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-primary font-bold">Feedback</span>
        </nav>
        <h1 className="font-bold text-3xl text-on-surface">Đánh giá ca học</h1>
      </div>

      {/* Feedback Card Container */}
      <div className="glass border border-white/20 rounded-3xl p-8 shadow-xl animate-slide-up stagger-1">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Tutor Info Grid Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-outline-variant">
            <div className="flex items-center gap-4">
              <div className="relative">
                {tutorAvatar ? (
                  <img alt={tutorName} className="w-20 h-20 rounded-full border-2 border-primary/20 object-cover" src={tutorAvatar} />
                ) : (
                  <div className="w-20 h-20 rounded-full border-2 border-primary/20 bg-primary flex items-center justify-center text-white font-bold text-2xl">
                    {tutorName?.charAt(0) || 'G'}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-surface"></div>
              </div>
              <div>
                <h2 className="font-semibold text-xl text-on-surface">{tutorName || 'Gia sư'}</h2>
                <p className="text-primary font-semibold text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  {className || 'Lớp học'}
                </p>
              </div>
            </div>
            <div className="bg-surface-container-low px-6 py-4 rounded-xl border border-outline-variant w-full md:w-auto">
              <p className="font-medium text-xs text-on-surface-variant mb-1 uppercase tracking-wider">Ngày học</p>
              <div className="flex items-center gap-2 text-on-surface font-semibold text-xl">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                15 Tháng 5, 2026
              </div>
            </div>
          </div>

          {/* Interactive Rating Section */}
          <div className="space-y-4">
            <label className="font-semibold text-xl text-on-surface block text-center">Bạn đánh giá thế nào về ca học này?</label>
            <div className="flex justify-center items-center gap-4 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <span 
                    className={`material-symbols-outlined text-[48px] transition-colors duration-200 ${
                      star <= (hoverRating || rating) ? 'text-amber-500' : 'text-outline-variant'
                    }`}
                    style={{ fontVariationSettings: star <= (hoverRating || rating) ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            
            <p className="text-center text-primary font-medium h-6">
              {rating === 1 && "Rất tệ"}
              {rating === 2 && "Tệ"}
              {rating === 3 && "Bình thường"}
              {rating === 4 && "Tốt"}
              {rating === 5 && "Tuyệt vời!"}
            </p>
          </div>

          <div className="space-y-3 group">
            <label htmlFor="reviewText" className="font-semibold text-sm text-on-surface block">Chi tiết đánh giá (Tùy chọn)</label>
            <textarea 
              id="reviewText" 
              className="w-full p-6 rounded-xl border border-outline-variant bg-surface-container-lowest text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none" 
              maxLength={500} 
              placeholder="Hãy chia sẻ cảm nhận của bạn về phương pháp giảng dạy, sự nhiệt tình và hiệu quả của ca học..." 
              rows={6}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-between items-center text-xs text-on-surface-variant">
              <p>Đánh giá của bạn sẽ giúp gia sư cải thiện chất lượng giảng dạy.</p>
              <span className={comment.length >= 500 ? 'text-error font-medium' : ''}>
                {comment.length}/500
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tags.map((tag) => (
              <button 
                key={tag}
                type="button" 
                className={`border px-4 py-2 rounded-full font-medium text-xs transition-all ${
                  selectedTags.includes(tag) 
                  ? 'bg-primary text-on-primary border-primary' 
                  : 'border-outline-variant text-on-surface hover:bg-primary/10 hover:border-primary'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <button 
            type="submit"
            disabled={rating === 0}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              rating === 0 
                ? 'bg-surface-container text-on-surface-variant cursor-not-allowed' 
                : 'bg-primary text-on-primary hover:bg-primary/90 active:scale-95 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="material-symbols-outlined">send</span>
            Gửi đánh giá
          </button>
        </form>
        <div className="m-8 mt-0 flex items-start gap-4 p-6 bg-tertiary-container/10 border border-tertiary-fixed rounded-xl">
          <span className="material-symbols-outlined text-tertiary-fixed-dim">stars</span>
          <div>
            <p className="font-semibold text-sm text-tertiary-container">Đóng góp của bạn giúp ích rất nhiều!</p>
            <p className="font-normal text-sm text-on-tertiary-fixed-variant mt-1">Đánh giá của bạn giúp StudyHub cải thiện chất lượng gia sư và giúp các phụ huynh khác có cái nhìn khách quan hơn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
