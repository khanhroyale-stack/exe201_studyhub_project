import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';

interface ClassSessionDTO {
  id: number;
  className: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  status: string;
  createdAt: string;
}

interface FeedbackDTO {
  id: number;
  tutorName: string;
  tutorAvatar: string;
  className: string;
  rating: number;
  comment: string;
  createdAt: string;
}


const FeedbackList: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [completedClasses, setCompletedClasses] = useState<ClassSessionDTO[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    Promise.all([
      apiFetch(`/class-sessions/parent/${userId}`).then(r => r.json()),
      apiFetch(`/reviews/parent/${userId}`).then(r => r.json()).catch(() => []),
    ]).then(([classData, feedbackData]) => {
      const allClasses: ClassSessionDTO[] = Array.isArray(classData) ? classData : [];
      setCompletedClasses(allClasses.filter(c => c.status === 'COMPLETED'));
      setFeedbacks(Array.isArray(feedbackData) ? feedbackData : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div>
        <h1 className="font-bold text-3xl text-on-surface mb-2">Đánh giá &amp; Phản hồi</h1>
        <p className="font-normal text-lg text-on-surface-variant">Chia sẻ trải nghiệm của bạn để giúp cộng đồng StudyHub phát triển hơn.</p>
      </div>

      {/* Pending Feedback Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>pending_actions</span>
          <h2 className="font-semibold text-xl text-on-surface">Lớp học cần đánh giá ({completedClasses.length})</h2>
        </div>
        {completedClasses.length === 0 ? (
          <div className="text-center py-10 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl block mb-3 text-outline-variant">task_alt</span>
            Không có lớp nào cần đánh giá.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedClasses.map((cls) => (
              <div key={cls.id} className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300">
                <div className="flex-grow">
                  <span className="font-medium text-xs text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full mb-3 inline-block">Mới hoàn thành</span>
                  <h3 className="font-semibold text-xl text-on-surface mb-1">{cls.className}</h3>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-4">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>person</span>
                    <span className="font-normal text-base">{cls.tutorName}</span>
                  </div>
                  {cls.subject && (
                    <div className="flex items-center gap-2 text-on-surface-variant mb-4">
                      <span className="material-symbols-outlined text-[18px]">school</span>
                      <span className="text-sm">{cls.subject}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-on-surface-variant mb-6">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>calendar_today</span>
                    <span className="font-normal text-base">{new Date(cls.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <button
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:brightness-110 active:scale-95 transition-all"
                  onClick={() => navigate('/parent/feedback/create', { state: { classId: cls.id, className: cls.className, tutorName: cls.tutorName } })}
                >
                  Đánh giá ngay
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback History Section */}
      <section>
        <div className="flex items-center gap-2 mb-6 border-t border-outline-variant pt-6">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>history</span>
          <h2 className="font-semibold text-xl text-on-surface">Đánh giá đã gửi ({feedbacks.length})</h2>
        </div>
        {feedbacks.length === 0 ? (
          <div className="text-center py-10 bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl block mb-3 text-outline-variant">rate_review</span>
            Bạn chưa gửi đánh giá nào.
          </div>
        ) : (
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-surface-container-low border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      alt="Tutor Avatar"
                      className="w-12 h-12 rounded-full object-cover border border-outline-variant"
                      src={feedback.tutorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(feedback.tutorName)}&background=random`}
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-on-surface">{feedback.tutorName}</h4>
                      <p className="font-normal text-sm text-on-surface-variant">{feedback.className}</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: star <= feedback.rating ? "'FILL' 1" : "'FILL' 0" }}>
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
        )}
      </section>
    </div>
  );
};

export default FeedbackList;
