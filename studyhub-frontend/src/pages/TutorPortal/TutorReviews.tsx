import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';

interface ReviewDTO {
  id: number;
  parentName: string;
  parentAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  className: string;
}


const TutorReviews: React.FC = () => {
  const { tutorId } = useAuth();
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tutorId) { setLoading(false); return; }
    apiFetch(`/reviews/tutor/${tutorId}`)
      .then(res => res.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [tutorId]);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-20">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="font-bold text-3xl text-on-surface mb-2">Đánh giá từ phụ huynh</h1>
        <p className="font-normal text-base text-on-surface-variant">Các phản hồi từ phụ huynh về chất lượng giảng dạy của bạn.</p>
      </div>

      {/* Summary */}
      {avgRating && (
        <div className="glass border border-white/20 rounded-2xl p-6 flex items-center gap-6 animate-slide-up stagger-1">
          <div className="text-center">
            <p className="text-5xl font-extrabold text-primary">{avgRating}</p>
            <div className="flex items-center gap-0.5 justify-center mt-1">
              {[1,2,3,4,5].map(star => (
                <span key={star} className="material-symbols-outlined text-amber-400 text-[18px]" style={{ fontVariationSettings: star <= Math.round(Number(avgRating)) ? "'FILL' 1" : "'FILL' 0" }}>star</span>
              ))}
            </div>
            <p className="text-xs text-on-surface-variant mt-1">{reviews.length} đánh giá</p>
          </div>
          <div className="flex-1 space-y-2">
            {[5,4,3,2,1].map(star => {
              const count = reviews.filter(r => r.rating === star).length;
              const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-on-surface-variant">{star}</span>
                  <span className="material-symbols-outlined text-amber-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-6 text-on-surface-variant text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 glass border border-outline-variant rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">star_border</span>
          <h2 className="font-bold text-xl text-on-surface mb-2">Chưa có đánh giá nào</h2>
          <p className="text-on-surface-variant text-sm">Hoàn thành các lớp học để nhận đánh giá từ phụ huynh.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, idx) => (
            <div key={review.id} className={`glass border border-white/20 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all animate-slide-up opacity-0 stagger-${(idx % 6) + 1}`}>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={review.parentAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.parentName)}&background=random`}
                  alt={review.parentName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-surface-container-high shrink-0"
                />
                <div className="flex-1">
                  <p className="font-bold text-on-surface">{review.parentName}</p>
                  {review.className && <p className="text-xs text-on-surface-variant">{review.className}</p>}
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1,2,3,4,5].map(star => (
                      <span key={star} className="material-symbols-outlined text-amber-400 text-[16px]" style={{ fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant shrink-0">
                  {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p className="text-sm text-on-surface leading-relaxed italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorReviews;
