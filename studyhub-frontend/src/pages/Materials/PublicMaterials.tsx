import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { tutorApi, Subject } from '../../services/tutorApi';
import { useAuth } from '../../context/AuthContext';

interface StudyMaterial {
  id: number;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  subjectId?: number;
  subjectName?: string;
  uploaderName?: string;
  isPublic: boolean;
  uploadedAt: string;
}

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
}

const FILE_TYPE_CONFIG: Record<string, { icon: string; color: string; bg: string; label: string }> = {
  pdf:  { icon: 'picture_as_pdf', color: 'text-red-600',    bg: 'bg-red-50 border-red-100',    label: 'PDF' },
  docx: { icon: 'description',    color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-100',   label: 'Word' },
  doc:  { icon: 'description',    color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-100',   label: 'Word' },
  pptx: { icon: 'slideshow',      color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100', label: 'PowerPoint' },
  ppt:  { icon: 'slideshow',      color: 'text-orange-600', bg: 'bg-orange-50 border-orange-100', label: 'PowerPoint' },
  xlsx: { icon: 'table_chart',    color: 'text-green-600',  bg: 'bg-green-50 border-green-100',  label: 'Excel' },
  xls:  { icon: 'table_chart',    color: 'text-green-600',  bg: 'bg-green-50 border-green-100',  label: 'Excel' },
  png:  { icon: 'image',          color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', label: 'Ảnh' },
  jpg:  { icon: 'image',          color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', label: 'Ảnh' },
  jpeg: { icon: 'image',          color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', label: 'Ảnh' },
};

const getFileConfig = (fileType: string) =>
  FILE_TYPE_CONFIG[fileType?.toLowerCase()] ?? {
    icon: 'insert_drive_file',
    color: 'text-slate-500',
    bg: 'bg-slate-50 border-slate-100',
    label: fileType?.toUpperCase() || 'File',
  };

const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch { return ''; }
};

const FILE_TYPES = [
  { value: 'ALL',  label: 'Tất cả', icon: 'filter_list' },
  { value: 'pdf',  label: 'PDF',    icon: 'picture_as_pdf' },
  { value: 'docx', label: 'Word',   icon: 'description' },
  { value: 'pptx', label: 'PowerPoint', icon: 'slideshow' },
  { value: 'xlsx', label: 'Excel',  icon: 'table_chart' },
];

const PublicMaterials: React.FC = () => {
  const { isLoggedIn, role, userId } = useAuth();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);

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
      
      // Refresh list
      fetchMaterials();
    } catch (err: any) {
      console.error(err);
      setUploadError(err?.response?.data?.error || 'Đã có lỗi xảy ra khi đăng tài liệu');
    } finally {
      setUploading(false);
    }
  };
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [selectedFileType, setSelectedFileType] = useState('ALL');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Load subjects from API
  useEffect(() => {
    tutorApi.getSubjects().then(setSubjects).catch(console.error);
  }, []);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedSubjectId) params.append('subjectId', selectedSubjectId.toString());
      if (selectedFileType !== 'ALL') params.append('fileType', selectedFileType);
      if (searchKeyword) params.append('keyword', searchKeyword);
      params.append('page', page.toString());
      params.append('size', '12');

      const res = await api.get<PageResponse<StudyMaterial>>(`/study-materials/public?${params.toString()}`);
      setMaterials(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch (err) {
      console.error('Failed to fetch materials', err);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSubjectId, selectedFileType, searchKeyword, page]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const handleSearch = () => {
    setSearchKeyword(keyword);
    setPage(0);
  };

  const handleSubjectChange = (id: number | null) => {
    setSelectedSubjectId(id);
    setPage(0);
  };

  const handleFileTypeChange = (type: string) => {
    setSelectedFileType(type);
    setPage(0);
  };

  const handleDownload = (material: StudyMaterial) => {
    window.open(material.fileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#f7f9ff] min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-br from-[#0a2463] via-primary to-indigo-600 pt-[132px] pb-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] animate-float" />
          <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] rounded-full bg-indigo-300/10 blur-[80px] animate-float-slow" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white/90 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            Thư viện học liệu mở
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Tài liệu học tập
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200 mt-1">
              miễn phí & chất lượng
            </span>
          </h1>
          <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Kho tài liệu được chia sẻ bởi các gia sư được xác thực — đa dạng môn học, sẵn sàng tải về.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-10">
            {[
              { icon: 'description', value: `${totalElements}+`, label: 'Tài liệu' },
              { icon: 'school', value: `${subjects.length}+`, label: 'Môn học' },
              { icon: 'download', value: 'Miễn phí', label: 'Tải xuống' },
            ].map(({ icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-white font-extrabold text-2xl mb-0.5">
                  <span className="material-symbols-outlined text-cyan-300 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  {value}
                </div>
                <div className="text-white/60 text-xs font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
              <input
                className="w-full border-none outline-none text-sm placeholder:text-slate-400 text-slate-700 bg-transparent"
                placeholder="Tìm kiếm tài liệu..."
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              {keyword && (
                <button onClick={() => { setKeyword(''); setSearchKeyword(''); setPage(0); }} className="text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* ===== FILE TYPE FILTER PILLS ===== */}
      <div className="border-b border-slate-100 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">Loại file:</span>
          {FILE_TYPES.map(ft => (
            <button
              key={ft.value}
              onClick={() => handleFileTypeChange(ft.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                selectedFileType === ft.value
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'border border-slate-200 text-slate-500 hover:border-primary hover:text-primary bg-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{ft.icon}</span>
              {ft.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 flex flex-col md:flex-row gap-8">

        {/* ── Sidebar: Subject Filter ── */}
        <aside className="w-full md:w-[220px] shrink-0">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 sticky top-24 shadow-sm">
            <h3 className="font-bold text-base text-[#0f172a] flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-[18px]">library_books</span>
              Môn học
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => handleSubjectChange(null)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedSubjectId === null
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
                Tất cả môn học
              </button>
              {subjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSubjectChange(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    selectedSubjectId === s.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main Grid ── */}
        <div className="flex-1">
          {/* Header row */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-slate-500">
                Tìm thấy <span className="font-bold text-primary">{totalElements}</span> tài liệu
                {searchKeyword && <span className="text-slate-400"> cho "<span className="text-slate-700 font-semibold">{searchKeyword}</span>"</span>}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {(searchKeyword || selectedSubjectId || selectedFileType !== 'ALL') && (
                <button
                  onClick={() => {
                    setKeyword(''); setSearchKeyword(''); setSelectedSubjectId(null); setSelectedFileType('ALL'); setPage(0);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 border border-slate-200"
                >
                  <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
                  Xóa bộ lọc
                </button>
              )}
              {isLoggedIn && (role === 'admin' || role === 'tutor') && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#0a2463] text-white rounded-xl text-xs font-bold hover:bg-[#0a2463]/90 transition-all active:scale-95 shadow-sm shadow-[#0a2463]/25 hover:shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">upload</span>
                  Đăng tài liệu
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : materials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-slate-300">search_off</span>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">Chưa có tài liệu nào</h3>
              <p className="text-slate-400 text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {materials.map((m, idx) => {
                const fc = getFileConfig(m.fileType);
                return (
                  <div
                    key={m.id}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-[0_12px_40px_rgba(0,61,155,0.1)] hover:-translate-y-1 transition-all duration-300 group shadow-sm flex flex-col animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {/* Top: Icon + subject badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${fc.bg} shrink-0`}>
                        <span className={`material-symbols-outlined text-[26px] ${fc.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                          {fc.icon}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {m.subjectName && (
                          <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-lg text-[10px] font-bold border border-primary/15">
                            {m.subjectName}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${fc.bg} ${fc.color} border`}>
                          {fc.label}
                        </span>
                      </div>
                    </div>

                    {/* Title + description */}
                    <h3 className="font-bold text-[#0f172a] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-1">
                      {m.title}
                    </h3>
                    {m.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">{m.description}</p>
                    )}

                    {/* Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        {m.uploaderName && (
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">person</span>
                            {m.uploaderName}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {formatDate(m.uploadedAt)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownload(m)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-sm shadow-primary/25 hover:shadow-md"
                      >
                        <span className="material-symbols-outlined text-[15px]">download</span>
                        Tải về
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                    i === page
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'border border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-primary shadow-sm'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== UPLOAD MODAL ===== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fade-in">
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

export default PublicMaterials;
