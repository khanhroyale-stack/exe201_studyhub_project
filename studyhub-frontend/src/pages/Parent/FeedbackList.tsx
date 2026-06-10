import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parentPortalApi } from '../../services/parentPortalApi';
import { UnifiedClass, ParentFeedback } from '../../types/shared';

const FeedbackList: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<UnifiedClass[]>([]);
  const [feedbacks, setFeedbacks] = useState<ParentFeedback[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesData = await parentPortalApi.getClasses();
        setClasses(classesData);
        
        const feedbackData = await parentPortalApi.getFeedbacks();
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div>
        <h1 className="font-bold text-3xl text-on-surface mb-2">Đánh giá & Phản hồi</h1>
        <p className="font-normal text-lg text-on-surface-variant">Chia sẻ trải nghiệm của bạn để giúp cộng đồng StudyHub phát triển hơn.</p>
      </div>

      {/* Pending Feedback Section */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>pending_actions</span>
          <h2 className="font-semibold text-xl text-on-surface">Lớp học cần đánh giá</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.filter(c => c.status === 'COMPLETED').map((cls) => (
            <div key={cls.id} className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300">
              <div className="flex-grow">
                <span className="font-medium text-xs text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full mb-3 inline-block">Mới hoàn thành</span>
                <h3 className="font-semibold text-xl text-on-surface mb-1">{cls.className}</h3>
                <div className="flex items-center gap-2 text-on-surface-variant mb-4">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>person</span>
                  <span className="font-normal text-base">{cls.tutorName}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant mb-6">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>calendar_today</span>
                  <span className="font-normal text-base">{new Date().toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
              <button 
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:brightness-110 active:scale-95 transition-all"
                onClick={() => navigate('/parent/feedback/create', { state: { classId: cls.id, className: cls.className, tutorName: cls.tutorName, tutorAvatar: cls.tutorAvatar } })}
              >
                Đánh giá ngay
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback History Section */}
      <section>
        <div className="flex items-center gap-2 mb-6 border-t border-outline-variant pt-6">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>history</span>
          <h2 className="font-semibold text-xl text-on-surface">Đánh giá đã gửi</h2>
        </div>
        <div className="space-y-6">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-surface-container-low border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    {feedback.tutorName?.charAt(0) || 'G'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-on-surface">{feedback.tutorName}</h4>
                    <p className="font-normal text-sm text-on-surface-variant">Lớp: {feedback.className}</p>
                  </div>
                </div>
                <div className="flex text-tertiary-fixed-dim">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: star <= feedback.rating ? "'FILL' 1" : "'FILL' 0" }}>
                      star
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:w-3/4">
                <p className="font-normal text-base text-on-surface leading-relaxed italic mb-2">"{feedback.comment}"</p>
                <span className="font-medium text-xs text-outline">Đã gửi vào {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeedbackList;
