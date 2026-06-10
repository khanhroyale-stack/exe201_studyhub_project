import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tutorPortalApi } from '../../services/tutorPortalApi';
import { ApplicationStatus } from '../../types/shared';

const TutorApplications: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apps = await tutorPortalApi.getApplications();
        setApplications(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="animate-slide-up">
        <h1 className="font-bold text-3xl text-on-surface mb-2">Lớp đã ứng tuyển</h1>
        <p className="font-normal text-base text-on-surface-variant">Theo dõi trạng thái hồ sơ ứng tuyển của bạn tại đây.</p>
      </div>

      <div className="glass rounded-2xl border border-white/20 overflow-hidden animate-slide-up stagger-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Lớp học</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Phụ huynh</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Ngày nộp</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-sm text-on-surface-variant text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">
                    Bạn chưa ứng tuyển lớp học nào.
                  </td>
                </tr>
              ) : applications.map((app) => (
                <tr key={app.id} className="hover:bg-surface-container transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-sm text-on-surface block">{app.tutorTitle}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-normal text-sm text-on-surface">{app.tutorName}</span>
                  </td>
                  <td className="px-6 py-4 font-normal text-sm text-on-surface-variant">
                    {new Date(app.appliedAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    {app.status === ApplicationStatus.PENDING ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        Đang chờ duyệt
                      </span>
                    ) : app.status === ApplicationStatus.ACCEPTED ? (
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Đã được nhận
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
                        Đã từ chối
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {app.status === ApplicationStatus.ACCEPTED ? (
                      <Link to="/tutor/classes" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium text-xs hover:bg-primary/90 transition-colors shadow-sm">
                        Xem lớp học
                      </Link>
                    ) : (
                      <button className="border border-outline-variant text-on-surface-variant px-4 py-2 rounded-lg font-medium text-xs hover:bg-surface-container transition-colors">
                        Chi tiết
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TutorApplications;
