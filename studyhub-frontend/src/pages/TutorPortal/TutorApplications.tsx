import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ApplicantDTO {
  id: number;
  jobPostingId: number;
  tutorId: string;
  tutorName: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  appliedAt: string;
  // Thông tin bài đăng
  postTitle: string;
  postSubject: string;
  postClassLevel: string;
  postSchedule: string;
  postPricePerSession: number;
  postLearningMode: string;
  postStatus: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const TutorApplications: React.FC = () => {
  const { tutorId } = useAuth();
  const [applications, setApplications] = useState<ApplicantDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tutorId) return;

    fetch(`${BASE_URL}/posts/my-applications/${tutorId}`)
      .then(res => res.json())
      .then((data: ApplicantDTO[]) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [tutorId]);

  return (
    <div className="flex flex-col gap-8 animate-fade-in pb-20">
      <div className="animate-slide-up">
        <h1 className="font-bold text-3xl text-on-surface mb-2">Lớp đã ứng tuyển</h1>
        <p className="font-normal text-base text-on-surface-variant">Theo dõi trạng thái hồ sơ ứng tuyển của bạn tại đây.</p>
      </div>

      <div className="glass rounded-2xl border border-white/20 overflow-hidden animate-slide-up stagger-1">
        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            Bạn chưa ứng tuyển lớp học nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                  <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Lớp học</th>
                  <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Chi tiết</th>
                  <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Ngày nộp</th>
                  <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Trạng thái</th>
                  <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-container transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-sm text-on-surface block">{app.postTitle || `Bài đăng #${app.jobPostingId}`}</span>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary-container text-on-primary-container font-medium text-xs rounded">
                        {app.postSubject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">payments</span> {app.postPricePerSession?.toLocaleString('vi-VN')}đ/ca</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">{app.postLearningMode === 'ONLINE' ? 'laptop_mac' : 'location_on'}</span> {app.postLearningMode === 'ONLINE' ? 'Online' : 'Offline'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-normal text-sm text-on-surface-variant">
                      {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('vi-VN') : ''}
                    </td>
                    <td className="px-6 py-4">
                      {app.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-medium text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          Đang chờ duyệt
                        </span>
                      ) : app.status === 'ACCEPTED' ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-medium text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Đã được nhận
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                          Đã bị từ chối
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {app.status === 'ACCEPTED' ? (
                        <Link to="/tutor/classes" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium text-xs hover:bg-primary/90 transition-colors shadow-sm">
                          Vào lớp học
                        </Link>
                      ) : (
                        <span className="text-on-surface-variant text-xs italic">
                          {app.postStatus === 'CLOSED' ? 'Bài đăng đã đóng' : 'Chưa có thao tác'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorApplications;
