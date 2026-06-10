import React, { useState, useEffect } from 'react';
import { tutorPortalApi, Review } from '../../services/tutorPortalApi';

const TutorReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await tutorPortalApi.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`material-symbols-outlined text-[18px] ${i < rating ? 'text-orange-400' : 'text-outline-variant'}`}>
        star
      </span>
    ));
  };

  return (
    <div className="max-w-[1440px] mx-auto space-y-gutter pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Đánh giá từ phụ huynh</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Phản hồi của học sinh và phụ huynh về các lớp bạn đã dạy.</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex flex-col items-center justify-center shrink-0">
          <p className="font-display-lg text-[48px] font-bold text-primary mb-2">{averageRating}</p>
          <div className="flex gap-1 mb-2">
            {renderStars(Math.round(Number(averageRating)))}
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant">Trên tổng số {reviews.length} đánh giá</p>
        </div>
        
        {/* Rating bars */}
        <div className="flex-1 w-full space-y-2 border-l border-outline-variant pl-8">
          {[5, 4, 3, 2, 1].map(star => {
            const count = reviews.filter(r => r.rating === star).length;
            const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-on-surface-variant w-4">{star}</span>
                <span className="material-symbols-outlined text-[16px] text-orange-400">star</span>
                <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: `${percent}%` }}></div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
            Đang tải đánh giá...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
            Bạn chưa có đánh giá nào.
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex gap-4 hover:shadow-sm transition-shadow">
              <img src={review.parentAvatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-label-lg text-label-lg text-on-surface font-bold">{review.parentName}</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Lớp: {review.className}</p>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex gap-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="font-body-md text-body-md text-on-surface">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TutorReviews;
