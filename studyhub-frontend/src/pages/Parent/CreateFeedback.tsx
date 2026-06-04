import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateFeedback: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingTexts = [
    'Chọn mức độ hài lòng của bạn',
    'Rất không hài lòng',
    'Không hài lòng',
    'Bình thường',
    'Hài lòng',
    'Rất hài lòng'
  ];

  const tags = ['Nhiệt tình', 'Dễ hiểu', 'Chuyên môn cao'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá!');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Cảm ơn bạn đã gửi đánh giá!');
      navigate('/parent/feedback');
    }, 1500);
  };

  return (
    <div className="max-w-[1000px] mx-auto py-8">
      {/* Breadcrumbs & Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-[#434654] font-medium text-xs mb-2">
          <Link to="/parent/classes" className="hover:text-[#003d9b] transition-colors">Classes</Link>
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>chevron_right</span>
          <span className="text-[#003d9b] font-bold">Feedback</span>
        </nav>
        <h1 className="font-bold text-3xl text-[#191c1e]">Đánh giá buổi học</h1>
      </div>

      {/* Feedback Card Container */}
      <div className="bg-white rounded-xl border border-[#c3c6d6] overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          {/* Tutor Info Grid Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#c3c6d6]">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img alt="Nguyễn Văn A Profile" className="w-20 h-20 rounded-full border-2 border-[#003d9b]/20 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzza6qvyD3khNsXliBTJAumKMazYwZaw41JQp2_KHeFGKR_XtnC2LibU6kZEStw7l_D_ZP46m4jbiRlzbWgOWJUx7wlcWj7qiWNji_9xQvZ0_4ansciGcnLePLzBe7zgDgJ5GREyRpzdeZibdbegTJijD9lDOJKdgvzUCmgEBYXK2VUG-o1mxPuTJ2zlmnF5UdIMks56OuCU2acCfnEy0vMaaUWmGfrZ200C6hLjfPJpx2v1eEuaKccb-NaYwvJx6nQFJn9ATTBn9I" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="font-semibold text-xl text-[#191c1e]">Nguyễn Văn A</h2>
                <p className="text-[#003d9b] font-semibold text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>menu_book</span>
                  Toán lớp 12 - Ôn thi THPT
                </p>
              </div>
            </div>
            <div className="bg-[#f3f4f6] px-6 py-4 rounded-xl border border-[#c3c6d6] w-full md:w-auto">
              <p className="font-medium text-xs text-[#434654] mb-1 uppercase tracking-wider">Ngày học</p>
              <div className="flex items-center gap-2 text-[#191c1e] font-semibold text-xl">
                <span className="material-symbols-outlined text-[#003d9b]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>calendar_today</span>
                15 Tháng 5, 2026
              </div>
            </div>
          </div>

          {/* Interactive Rating Section */}
          <div className="space-y-4">
            <label className="font-semibold text-xl text-[#191c1e] block text-center">Bạn đánh giá thế nào về buổi học này?</label>
            <div className="flex justify-center items-center gap-4 py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  type="button" 
                  className="p-1 transition-transform hover:scale-125"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <span 
                    className={`material-symbols-outlined text-[48px] transition-colors ${star <= (hoverRating || rating) ? 'text-[#ffb950]' : 'text-[#c3c6d6]'}`} 
                    style={{ fontVariationSettings: star <= (hoverRating || rating) ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
            <p className={`text-center font-semibold text-sm h-4 ${rating > 0 ? 'text-[#003d9b]' : 'text-[#434654]'}`}>
              {ratingTexts[hoverRating || rating]}
            </p>
          </div>

          {/* Review Section with Bento-like Card */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-xl text-[#191c1e]" htmlFor="reviewText">Nhận xét chi tiết</label>
              <span className={`font-medium text-xs ${comment.length > 450 ? 'text-[#ba1a1a]' : 'text-[#434654]'}`}>
                {comment.length}/500
              </span>
            </div>
            <div className="relative group">
              <textarea 
                id="reviewText" 
                className="w-full p-6 rounded-xl border border-[#c3c6d6] bg-white text-base focus:ring-2 focus:ring-[#003d9b] focus:border-transparent transition-all outline-none resize-none group-hover:border-[#003d9b]/50" 
                maxLength={500} 
                placeholder="Hãy chia sẻ cảm nhận của bạn về phương pháp giảng dạy, sự nhiệt tình và hiệu quả của buổi học..." 
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tags.map((tag) => (
                <button 
                  key={tag}
                  type="button" 
                  className={`border px-4 py-2 rounded-full font-medium text-xs transition-all ${
                    selectedTags.includes(tag) 
                    ? 'bg-[#003d9b] text-white border-[#003d9b]' 
                    : 'border-[#c3c6d6] text-[#191c1e] hover:bg-[#0052cc]/10 hover:border-[#003d9b]'
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-[#c3c6d6]">
            <button 
              type="button" 
              onClick={() => navigate('/parent/feedback')}
              className="w-full sm:w-auto px-8 py-3 rounded-xl border border-[#737685] text-[#191c1e] font-semibold text-sm hover:bg-[#f3f4f6] transition-all active:scale-95"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-3 rounded-xl bg-[#003d9b] text-white font-semibold text-sm shadow-md hover:bg-[#0052cc] hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>progress_activity</span> 
                  Đang gửi...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>send</span>
                  Gửi đánh giá
                </>
              )}
            </button>
          </div>
        </form>

        {/* Encouragement Section */}
        <div className="m-8 mt-0 flex items-start gap-4 p-6 bg-[#ffca81]/10 border border-[#ffddb3] rounded-xl">
          <span className="material-symbols-outlined text-[#ffb950]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>stars</span>
          <div>
            <p className="font-semibold text-sm text-[#7d5200]">Đóng góp của bạn giúp ích rất nhiều!</p>
            <p className="font-normal text-sm text-[#624000] mt-1">Đánh giá của bạn giúp StudyHub cải thiện chất lượng gia sư và giúp các phụ huynh khác có cái nhìn khách quan hơn.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
