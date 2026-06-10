import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface EnrollmentDto {
  id: number;
  courseId: number;
  courseTitle: string;
  courseImage: string;
  courseSchedule: string;
  tutorName: string;
  tutorAvatar: string;
  studentName: string;
  studentGrade: string;
  studentLevel: string;
  notes: string;
  status: string;
  createdAt: string;
}

const ClassManagement: React.FC = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setLoading(false); return; }
    fetch(`http://localhost:8080/api/enrollments/parent/${userId}`)
      .then(res => res.json())
      .then(data => {
        setEnrollments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded uppercase">Chờ duyệt</span>;
      case 'APPROVED':
        return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded uppercase">Đã duyệt</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded uppercase">Bị từ chối</span>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return 'hourglass_empty';
      case 'APPROVED': return 'check_circle';
      case 'REJECTED': return 'cancel';
      default: return 'help';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-500';
      case 'APPROVED': return 'text-green-500';
      case 'REJECTED': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-20 animate-fade-in">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-bold text-3xl text-on-surface mb-2">Quản lý lớp học</h1>
          <p className="font-normal text-base text-on-surface-variant">Theo dõi trạng thái đăng ký lớp học của bạn.</p>
        </div>
        <button
          onClick={() => navigate('/classes')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Đăng ký lớp mới
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : enrollments.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-lowest border border-outline-variant rounded-xl">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 block">school</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2">Chưa có lớp học nào</h2>
          <p className="text-on-surface-variant text-body-md mb-6">Bạn chưa đăng ký tham gia lớp học nào. Khám phá ngay!</p>
          <button
            onClick={() => navigate('/classes')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Tìm lớp học ngay
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{enrollments.filter(e => e.status === 'PENDING').length}</p>
              <p className="text-sm text-yellow-600 font-medium">Chờ duyệt</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{enrollments.filter(e => e.status === 'APPROVED').length}</p>
              <p className="text-sm text-green-600 font-medium">Đã duyệt</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-700">{enrollments.filter(e => e.status === 'REJECTED').length}</p>
              <p className="text-sm text-red-600 font-medium">Bị từ chối</p>
            </div>
          </div>

          {enrollments.map((enrollment, idx) => (
            <div
              key={enrollment.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col md:flex-row gap-5 hover:shadow-md transition-all"
            >
              {/* Thumbnail */}
              <div className="w-full md:w-32 h-24 rounded-xl bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
                {enrollment.courseImage ? (
                  <img src={enrollment.courseImage} alt={enrollment.courseTitle} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-outline-variant">school</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                <div className="flex items-start gap-3 flex-wrap mb-2">
                  {getStatusBadge(enrollment.status)}
                  <span className={`material-symbols-outlined text-[18px] ${getStatusColor(enrollment.status)}`}>{getStatusIcon(enrollment.status)}</span>
                </div>

                <h3 className="font-bold text-lg text-on-surface mb-1 truncate">
                  <Link to={`/classes/${enrollment.courseId}`} className="hover:text-primary transition-colors">{enrollment.courseTitle}</Link>
                </h3>

                {enrollment.tutorName && (
                  <div className="flex items-center gap-2 mb-2">
                    {enrollment.tutorAvatar && (
                      <img src={enrollment.tutorAvatar} alt={enrollment.tutorName} className="w-6 h-6 rounded-full object-cover" />
                    )}
                    <span className="text-sm text-on-surface-variant">Gia sư: <span className="font-medium text-on-surface">{enrollment.tutorName}</span></span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 text-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    Học sinh: <span className="font-medium text-on-surface ml-1">{enrollment.studentName}</span>
                  </span>
                  {enrollment.studentGrade && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      {enrollment.studentGrade}
                    </span>
                  )}
                  {enrollment.studentLevel && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">signal_cellular_alt</span>
                      {enrollment.studentLevel}
                    </span>
                  )}
                  {enrollment.courseSchedule && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {enrollment.courseSchedule}
                    </span>
                  )}
                </div>

                {enrollment.status === 'PENDING' && (
                  <div className="mt-3 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    Yêu cầu đang chờ gia sư xem xét và phê duyệt.
                  </div>
                )}

                {enrollment.status === 'APPROVED' && (
                  <div className="mt-3 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Gia sư đã chấp nhận! Hãy liên hệ để sắp xếp lịch học.
                  </div>
                )}

                {enrollment.status === 'REJECTED' && (
                  <div className="mt-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    Yêu cầu của bạn đã bị từ chối. Hãy tìm lớp học khác phù hợp hơn.
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-2 shrink-0 justify-start md:items-end">
                <Link
                  to={`/classes/${enrollment.courseId}`}
                  className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary/5 transition-colors text-center"
                >
                  Xem lớp
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
