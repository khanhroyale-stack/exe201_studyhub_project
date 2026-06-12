import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { tutorApi, Subject } from '../../services/tutorApi';

interface ClassSessionDTO {
  id: number;
  postId: number;
  parentId: number;
  parentName: string;
  tutorProfileId: number;
  tutorName: string;
  tutorAvatar: string;
  className: string;
  subject: string;
  schedule: string;
  learningMode: string;
  address: string;
  status: string;
  pricePerSession: number;
  progress: number;
  createdAt: string;
}

type TabType = 'active' | 'completed' | 'cancelled';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const STATUS_LABEL: Record<string, string> = {
  TRIAL:     'Chờ học thử',
  CONFIRMED: 'Đang dạy',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy',
  DISBURSED: 'Đã giải ngân',
};

const STATUS_STYLE: Record<string, string> = {
  TRIAL:     'bg-amber-100 text-amber-700',
  CONFIRMED: 'bg-primary-container text-on-primary-container',
  COMPLETED: 'bg-surface-container-highest text-on-surface',
  CANCELLED: 'bg-error-container text-error',
  DISBURSED: 'bg-purple-100 text-purple-700',
};

const TutorClasses: React.FC = () => {
  const { tutorId, userId } = useAuth();
  const [classes, setClasses] = useState<ClassSessionDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [search, setSearch] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Load subjects from API
  useEffect(() => {
    tutorApi.getSubjects().then(setSubjects).catch(console.error);
  }, []);

  // Form upload states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadSubjectId, setUploadSubjectId] = useState('');
  const [uploadFileType, setUploadFileType] = useState('pdf');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const resetUploadForm = () => {
    setUploadTitle('');
    setUploadDescription('');
    setUploadSubjectId('');
    setUploadFileType('pdf');
    setUploadFile(null);
    setUploadError(null);
  };

  const getExpectedExtensions = (type: string) => {
    switch (type) {
      case 'pdf': return ['pdf'];
      case 'docx': return ['doc', 'docx'];
      case 'pptx': return ['ppt', 'pptx'];
      case 'xlsx': return ['xls', 'xlsx'];
      case 'png': return ['png', 'jpg', 'jpeg'];
      default: return [];
    }
  };

  const getAcceptAttribute = (type: string) => {
    switch (type) {
      case 'pdf': return '.pdf';
      case 'docx': return '.doc,.docx';
      case 'pptx': return '.ppt,.pptx';
      case 'xlsx': return '.xls,.xlsx';
      case 'png': return '.png,.jpg,.jpeg';
      default: return '*';
    }
  };

  const handleFileTypeSelectChange = (newType: string) => {
    setUploadFileType(newType);
    if (uploadFile) {
      const ext = uploadFile.name.split('.').pop()?.toLowerCase() || '';
      const allowedExts = getExpectedExtensions(newType);
      if (allowedExts.length > 0 && !allowedExts.includes(ext)) {
        const typeLabels: Record<string, string> = {
          pdf: 'PDF',
          docx: 'Word (.doc, .docx)',
          pptx: 'PowerPoint (.ppt, .pptx)',
          xlsx: 'Excel (.xls, .xlsx)',
          png: 'Ảnh (.png, .jpg, .jpeg)',
        };
        setUploadError(`File đã chọn trước đó không khớp định dạng mới. Vui lòng chọn lại file ${typeLabels[newType] || newType}`);
        setUploadFile(null);
      } else {
        setUploadError(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('Kích thước file không được vượt quá 10MB');
        setUploadFile(null);
        return;
      }

      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const allowedExts = getExpectedExtensions(uploadFileType);
      if (allowedExts.length > 0 && !allowedExts.includes(ext)) {
        const typeLabels: Record<string, string> = {
          pdf: 'PDF',
          docx: 'Word (.doc, .docx)',
          pptx: 'PowerPoint (.ppt, .pptx)',
          xlsx: 'Excel (.xls, .xlsx)',
          png: 'Ảnh (.png, .jpg, .jpeg)',
        };
        setUploadError(`File đã chọn không đúng định dạng. Vui lòng chọn file ${typeLabels[uploadFileType] || uploadFileType}`);
        setUploadFile(null);
        return;
      }

      setUploadError(null);
      setUploadFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle || !uploadSubjectId) {
      setUploadError('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('uploaderId', (userId || '').toString());
      formData.append('subjectId', uploadSubjectId);
      formData.append('title', uploadTitle);
      formData.append('description', uploadDescription);
      formData.append('file', uploadFile);

      await api.post('/study-materials/public', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset and close
      setShowUploadModal(false);
      resetUploadForm();
      
      alert('Đăng tài liệu học tập công khai thành công!');
    } catch (err: any) {
      console.error(err);
      setUploadError(err?.response?.data?.error || 'Đã có lỗi xảy ra khi đăng tài liệu');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!tutorId) { setLoading(false); return; }
    fetch(`${BASE_URL}/class-sessions/tutor/${tutorId}`)
      .then(res => res.json())
      .then(data => {
        setClasses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [tutorId]);

  const activeClasses    = classes.filter(c => ['TRIAL', 'CONFIRMED'].includes(c.status));
  const completedClasses = classes.filter(c => ['COMPLETED', 'DISBURSED'].includes(c.status));
  const cancelledClasses = classes.filter(c => c.status === 'CANCELLED');

  const displayClasses = (
    activeTab === 'active'    ? activeClasses :
    activeTab === 'completed' ? completedClasses :
    cancelledClasses
  ).filter(c =>
    !search || c.className.toLowerCase().includes(search.toLowerCase()) ||
    (c.parentName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-bold text-3xl text-on-surface">Quản lý lớp học</h2>
          <p className="text-on-surface-variant mt-1">Quản lý tiến độ và lịch trình các lớp bạn đang phụ trách.</p>
        </div>
        <div className="flex items-center gap-3 text-slate-800">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/95 transition-all active:scale-[0.98] shadow-sm hover:shadow"
          >
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Đăng tài liệu công khai
          </button>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm lớp học..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-outline-variant rounded-lg bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm w-full md:w-[250px]"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>


          {/* Tabs */}
          <div className="flex gap-4 border-b border-outline-variant mb-6">
            {([
              { key: 'active',    label: `Đang dạy (${activeClasses.length})` },
              { key: 'completed', label: `Đã hoàn thành (${completedClasses.length})` },
              { key: 'cancelled', label: `Đã hủy (${cancelledClasses.length})` },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayClasses.length === 0 ? (
              <div className="col-span-full text-center py-10 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
                {classes.length === 0 ? 'Bạn chưa có lớp học nào.' : 'Không có lớp học nào trong mục này.'}
              </div>
            ) : displayClasses.map((cls, idx) => (
              <div
                key={cls.id}
                className={`border border-outline-variant rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-surface-container-lowest flex flex-col group relative overflow-hidden animate-slide-up opacity-0 stagger-${(idx % 6) + 1}`}
              >
                {/* Mode badge */}
                <div className={`absolute top-0 right-0 ${
                  cls.learningMode === 'ONLINE'
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-tertiary-container text-on-tertiary-container'
                } text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider`}>
                  {cls.learningMode === 'ONLINE' ? '🌐 Online' : '📍 Offline'}
                </div>

                {/* Header */}
                <div className="flex items-start justify-between mb-4 pr-20">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {cls.subject && (
                        <span className="inline-block px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded text-[10px] font-bold uppercase tracking-wider">
                          {cls.subject}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 ${STATUS_STYLE[cls.status] ?? 'bg-surface-container text-on-surface'} text-[10px] font-bold rounded uppercase`}>
                        {STATUS_LABEL[cls.status] ?? cls.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-on-surface line-clamp-1">{cls.className}</h3>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    <span>Phụ huynh: <span className="font-medium text-on-surface">{cls.parentName || '—'}</span></span>
                  </div>
                  {cls.schedule && (
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span>{cls.schedule}</span>
                    </div>
                  )}
                  {cls.pricePerSession && (
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                      <span>{cls.pricePerSession.toLocaleString('vi-VN')}đ/buổi</span>
                    </div>
                  )}
                  {cls.address && (
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span className="truncate">{cls.address}</span>
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-on-surface-variant font-medium">Tiến độ</span>
                    <span className="text-primary font-bold">{cls.progress ?? 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${cls.progress ?? 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-outline-variant flex gap-3">
                  <Link 
                    to={`/tutor/classes/${cls.id}/workspace`}
                    className={`flex-1 text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    cls.status === 'CONFIRMED'
                      ? 'bg-primary text-on-primary hover:bg-primary/90'
                      : 'border border-primary text-primary hover:bg-primary/10'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">play_lesson</span>
                    Không gian Lớp học
                  </Link>

                  <div className="relative group/menu">
                    <button className="w-10 h-10 border border-outline-variant rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                    <div className="absolute bottom-full right-0 mb-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 flex flex-col p-2">
                      <button className="text-left px-4 py-2 hover:bg-surface-container rounded-lg text-sm flex items-center gap-2 text-on-surface">
                        <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                        Xin đổi lịch
                      </button>
                      <button className="text-left px-4 py-2 hover:bg-error-container hover:text-error rounded-lg text-sm flex items-center gap-2 text-error transition-colors mt-1">
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                        Báo hủy lớp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* ===== UPLOAD MODAL ===== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fade-in text-left">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => {
              if (!uploading) {
                setShowUploadModal(false);
                resetUploadForm();
              }
            }}
          />
          
          {/* Modal Content */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 border border-slate-100 transform transition-all animate-scale-up">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">cloud_upload</span>
                Đăng tài liệu học tập mới
              </h3>
              <button 
                type="button"
                onClick={() => {
                  if (!uploading) {
                    setShowUploadModal(false);
                    resetUploadForm();
                  }
                }}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
                disabled={uploading}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {uploadError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {uploadError}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Tiêu đề tài liệu <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đề cương ôn tập Toán cuối kỳ II lớp 9"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm transition-all bg-slate-50 focus:bg-white text-slate-800"
                  disabled={uploading}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Môn học liên quan <span className="text-red-500">*</span></label>
                <select
                  required
                  value={uploadSubjectId}
                  onChange={e => setUploadSubjectId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm transition-all bg-slate-50 focus:bg-white text-slate-800"
                  disabled={uploading}
                >
                  <option value="">-- Chọn môn học --</option>
                  {subjects.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Mô tả ngắn</label>
                <textarea
                  placeholder="Mô tả nội dung tài liệu để người học dễ tìm kiếm..."
                  value={uploadDescription}
                  onChange={e => setUploadDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm transition-all bg-slate-50 focus:bg-white resize-none text-slate-800"
                  disabled={uploading}
                />
              </div>

              {/* File Format Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Định dạng tài liệu <span className="text-red-500">*</span></label>
                <select
                  value={uploadFileType}
                  onChange={e => handleFileTypeSelectChange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-primary text-sm transition-all bg-slate-50 focus:bg-white text-slate-800"
                  disabled={uploading}
                >
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="docx">Word (.doc, .docx)</option>
                  <option value="pptx">PowerPoint (.ppt, .pptx)</option>
                  <option value="xlsx">Excel (.xls, .xlsx)</option>
                  <option value="png">Ảnh (.png, .jpg, .jpeg)</option>
                </select>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">File tài liệu <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-slate-200 hover:border-primary rounded-2xl p-5 text-center bg-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer relative group">
                  <input
                    type="file"
                    required
                    accept={getAcceptAttribute(uploadFileType)}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors mb-2">
                      {uploadFile ? 'insert_drive_file' : 'upload_file'}
                    </span>
                    {uploadFile ? (
                      <div className="text-sm font-bold text-slate-700 max-w-[280px] truncate">
                        {uploadFile.name}
                      </div>
                    ) : (
                      <>
                        <div className="text-sm font-semibold text-slate-600">Kéo thả hoặc click để chọn file</div>
                        <div className="text-xs text-slate-400 mt-1">
                          {uploadFileType === 'pdf' && 'Chỉ chấp nhận file PDF (Tối đa 10MB)'}
                          {uploadFileType === 'docx' && 'Chỉ chấp nhận file Word (.doc, .docx) (Tối đa 10MB)'}
                          {uploadFileType === 'pptx' && 'Chỉ chấp nhận file PowerPoint (.ppt, .pptx) (Tối đa 10MB)'}
                          {uploadFileType === 'xlsx' && 'Chỉ chấp nhận file Excel (.xls, .xlsx) (Tối đa 10MB)'}
                          {uploadFileType === 'png' && 'Chỉ chấp nhận file Ảnh (.png, .jpg, .jpeg) (Tối đa 10MB)'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    resetUploadForm();
                  }}
                  className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                  disabled={uploading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 shadow-md shadow-primary/20"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Đang đăng...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">publish</span>
                      Đăng tài liệu
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorClasses;
