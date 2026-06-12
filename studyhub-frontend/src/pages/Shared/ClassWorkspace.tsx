import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';


const ClassWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { role, userId } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'DASHBOARD'); // DASHBOARD, LOGS, BILLING
  const [session, setSession] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [meetingLink, setMeetingLink] = useState('');
  const [editingLink, setEditingLink] = useState(false);

  const [address, setAddress] = useState('');
  const [editingAddress, setEditingAddress] = useState(false);

  // Thêm Log State
  const [showLogForm, setShowLogForm] = useState(false);
  const [newLog, setNewLog] = useState({ title: '', content: '', tutorFeedback: '', status: 'PRESENT' });

  // Thêm Material State
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [uploadingMaterial, setUploadingMaterial] = useState(false);

  // Payment State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [transactionCode, setTransactionCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('PENDING');

  useEffect(() => {
    if (!showPaymentModal || !transactionCode || paymentStatus === 'SUCCESS') return;

    const interval = setInterval(async () => {
      try {
        const res = await apiFetch(`/payment/status/${transactionCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'SUCCESS') {
            setPaymentStatus('SUCCESS');
            setSession((prev: any) => ({ ...prev, status: 'CONFIRMED' }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [showPaymentModal, transactionCode, paymentStatus]);

  const handleConfirmHire = async () => {
    try {
      const res = await apiFetch(`/payment/confirm-hire/${id}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setQrUrl(data.qrUrl);
          setTransactionCode(data.transactionCode);
          setPaymentStatus('PENDING');
          setShowPaymentModal(true);
        }
      } else {
        alert('Có lỗi xảy ra khi tạo giao dịch thanh toán.');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await apiFetch(`/class-sessions/${id}`);
      if (!res.ok) throw new Error('Không tìm thấy lớp học');
      const data = await res.json();
      setSession(data);
      setMeetingLink(data.meetingLink || '');
      setAddress(data.address || '');

      const logRes = await apiFetch(`/lesson-logs/class/${id}`);
      if (logRes.ok) {
        setLogs(await logRes.json());
      }

      const matRes = await apiFetch(`/study-materials/class/${id}`);
      if (matRes.ok) {
        setMaterials(await matRes.json());
      }
    } catch (err) {
      console.error(err);
      navigate(role === 'parent' ? '/parent/classes' : '/tutor/classes');
    } finally {
      setLoading(false);
    }
  };

  const saveMeetingLink = async () => {
    try {
      const res = await apiFetch(`/class-sessions/${id}/meeting-link`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: meetingLink })
      });
      if (res.ok) {
        setEditingLink(false);
        fetchData();
      }
    } catch (err) {
      alert('Lỗi lưu link');
    }
  };

  const saveAddress = async () => {
    try {
      const res = await apiFetch(`/class-sessions/${id}/address`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: address })
      });
      if (res.ok) {
        setEditingAddress(false);
        fetchData();
      }
    } catch (err) {
      alert('Lỗi lưu địa chỉ');
    }
  };

  const submitLog = async () => {
    try {
      const payload = {
        ...newLog,
        scheduledDate: new Date().toISOString()
      };
      const res = await apiFetch(`/lesson-logs/class/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowLogForm(false);
        setNewLog({ title: '', content: '', tutorFeedback: '', status: 'PRESENT' });
        fetchData();
      }
    } catch (err) {
      alert('Lỗi thêm nhật ký');
    }
  };

  const submitMaterial = async () => {
    if (!materialTitle || !materialFile || !userId) {
      alert('Vui lòng nhập tên tài liệu và chọn file đính kèm');
      return;
    }

    setUploadingMaterial(true);
    const formData = new FormData();
    formData.append('uploaderId', userId.toString());
    formData.append('title', materialTitle);
    formData.append('file', materialFile);

    try {
      const res = await apiFetch(`/study-materials/class/${id}`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
         const error = await res.json();
         throw new Error(error.error || 'Lỗi server');
      }
      setShowMaterialForm(false);
      setMaterialTitle('');
      setMaterialFile(null);
      fetchData(); // Reload materials
      alert('Đã tải lên tài liệu thành công!');
    } catch (err: any) {
      alert('Lỗi upload file: ' + err.message);
    } finally {
      setUploadingMaterial(false);
    }
  };


  if (loading) return <div className="p-8 text-center">Đang tải...</div>;
  if (!session) return null;

  const isTutor = role === 'tutor';
  const isParent = role === 'parent';

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-3xl p-6 md:p-8 border border-outline-variant shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-4xl text-primary">school</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-on-surface mb-1">{session.className}</h1>
            <p className="text-sm font-medium text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">menu_book</span> Môn: {session.subject}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider 
            ${session.status === 'TRIAL' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-green-100 text-green-800 border border-green-200'}
          `}>
            {session.status === 'TRIAL' ? 'Đang học thử' : 'Chính thức'}
          </span>
          <p className="text-sm font-bold text-primary">{session.pricePerSession?.toLocaleString('vi-VN')}đ / buổi</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant overflow-x-auto hide-scrollbar">
        {['DASHBOARD', 'LOGS', 'MATERIALS', 'BILLING'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest'
            }`}
          >
            {tab === 'DASHBOARD' ? 'Tổng quan' : tab === 'LOGS' ? 'Nhật ký giảng dạy' : tab === 'MATERIALS' ? 'Tài liệu học tập' : 'Học phí'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'DASHBOARD' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Learning Mode */}
              <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm">
                <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  Khu vực học tập ({session.learningMode})
                </h3>

                {(session.learningMode === 'ONLINE' || session.learningMode === 'BOTH') && (
                  <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <h4 className="text-sm font-bold text-primary mb-2">Học Online (Google Meet / Zoom)</h4>
                    {isTutor ? (
                      editingLink ? (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={meetingLink} 
                            onChange={e => setMeetingLink(e.target.value)} 
                            placeholder="Dán link Google Meet vào đây..."
                            className="flex-1 px-4 py-2 text-sm border border-outline-variant rounded-lg focus:border-primary outline-none"
                          />
                          <button onClick={saveMeetingLink} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90">Lưu</button>
                          <button onClick={() => setEditingLink(false)} className="px-4 py-2 border border-outline-variant text-sm font-medium rounded-lg">Hủy</button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <a href={session.meetingLink || '#'} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium text-sm truncate max-w-[70%]">
                            {session.meetingLink || 'Chưa cập nhật link'}
                          </a>
                          <button onClick={() => setEditingLink(true)} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20">Cập nhật Link</button>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center gap-4">
                        {session.meetingLink ? (
                          <a href={session.meetingLink} target="_blank" rel="noreferrer" className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow hover:bg-primary/90 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">video_camera_front</span> Tham gia phòng học
                          </a>
                        ) : (
                          <p className="text-sm text-on-surface-variant italic">Gia sư chưa cập nhật link phòng học.</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {(session.learningMode === 'OFFLINE' || session.learningMode === 'BOTH') && (
                  <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant">
                    <h4 className="text-sm font-bold text-on-surface mb-2">Học Offline tại nhà</h4>
                    {isParent ? (
                      editingAddress ? (
                        <div className="flex flex-col gap-2 mb-3">
                          <input 
                            type="text" 
                            value={address} 
                            onChange={e => setAddress(e.target.value)} 
                            placeholder="Nhập địa chỉ nhà chi tiết..."
                            className="w-full px-4 py-2 text-sm border border-outline-variant rounded-lg focus:border-primary outline-none"
                          />
                          <div className="flex gap-2">
                            <button onClick={saveAddress} className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90">Lưu</button>
                            <button onClick={() => setEditingAddress(false)} className="px-4 py-1.5 border border-outline-variant text-sm font-medium rounded-lg">Hủy</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-on-surface-variant truncate max-w-[70%]">{session.address || 'Chưa có địa chỉ cụ thể'}</p>
                          <button onClick={() => setEditingAddress(true)} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 shrink-0">Cập nhật Địa chỉ</button>
                        </div>
                      )
                    ) : (
                      <p className="text-sm text-on-surface-variant mb-3">{session.address || 'Phụ huynh chưa cung cấp địa chỉ cụ thể'}</p>
                    )}
                    
                    {session.address && (
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(session.address)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                      >
                        <span className="material-symbols-outlined text-[16px]">map</span> Xem trên bản đồ
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm">
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Lịch học cố định</h3>
                <div className="flex items-center gap-3 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  <span className="font-medium">{session.schedule}</span>
                </div>
              </div>

              <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm">
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Người đồng hành</h3>
                {isTutor ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">face</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-on-surface">{session.parentName}</p>
                      <p className="text-xs text-on-surface-variant">Phụ huynh</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <img src={session.tutorAvatar || 'https://via.placeholder.com/150'} alt="tutor" className="w-12 h-12 rounded-full object-cover shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-on-surface">{session.tutorName}</p>
                      <p className="text-xs text-on-surface-variant">Gia sư</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LOGS TAB */}
        {activeTab === 'LOGS' && (
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history_edu</span>
                Tiến độ học tập ({logs.length} buổi)
              </h3>
              {isTutor && !showLogForm && (
                <button onClick={() => setShowLogForm(true)} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow hover:bg-primary/90 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add</span> Thêm nhật ký
                </button>
              )}
            </div>

            {showLogForm && (
              <div className="mb-8 p-6 bg-surface-container-lowest rounded-2xl border border-primary/20 shadow-inner">
                <h4 className="font-bold text-on-surface mb-4">Thêm nhật ký buổi học mới</h4>
                <div className="space-y-4">
                  <input type="text" placeholder="Tiêu đề bài học (Ví dụ: Ôn tập Hình học không gian)" className="w-full p-3 border border-outline-variant rounded-xl text-sm" value={newLog.title} onChange={e => setNewLog({...newLog, title: e.target.value})} />
                  <textarea placeholder="Nội dung đã dạy..." className="w-full p-3 border border-outline-variant rounded-xl text-sm h-24" value={newLog.content} onChange={e => setNewLog({...newLog, content: e.target.value})}></textarea>
                  <textarea placeholder="Nhận xét về học sinh (Thái độ, điểm cần cải thiện)..." className="w-full p-3 border border-outline-variant rounded-xl text-sm h-24" value={newLog.tutorFeedback} onChange={e => setNewLog({...newLog, tutorFeedback: e.target.value})}></textarea>
                  <div className="flex justify-end gap-3 mt-4">
                    <button onClick={() => setShowLogForm(false)} className="px-5 py-2.5 text-sm font-medium border border-outline-variant rounded-xl hover:bg-surface-container">Hủy</button>
                    <button onClick={submitLog} className="px-5 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 shadow">Lưu nhật ký</button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {logs.length === 0 ? (
                <p className="text-center text-sm text-on-surface-variant italic py-8">Chưa có nhật ký buổi học nào.</p>
              ) : (
                <div className="relative border-l-2 border-primary/20 ml-3 md:ml-4 space-y-8 pb-4">
                  {logs.map((log, index) => (
                    <div key={log.id} className="relative pl-6 md:pl-8">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                          <h4 className="font-bold text-on-surface text-base">Buổi {logs.length - index}: {log.title}</h4>
                          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg w-fit">
                            {new Date(log.scheduledDate).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-semibold text-on-surface-variant block mb-1">Nội dung:</span>
                            <p className="text-on-surface leading-relaxed">{log.content}</p>
                          </div>
                          <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                            <span className="font-semibold text-amber-800 block mb-1 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">feedback</span> Nhận xét:
                            </span>
                            <p className="text-amber-900 leading-relaxed italic">{log.tutorFeedback}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MATERIALS TAB */}
        {activeTab === 'MATERIALS' && (
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">folder_open</span>
                Tài liệu học tập ({materials.length} file)
              </h3>
              {!showMaterialForm && (
                <button onClick={() => setShowMaterialForm(true)} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow hover:bg-primary/90 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">upload_file</span> Tải lên tài liệu
                </button>
              )}
            </div>

            {showMaterialForm && (
              <div className="mb-8 p-6 bg-surface-container-lowest rounded-2xl border border-primary/20 shadow-inner">
                <h4 className="font-bold text-on-surface mb-4">Tải lên tài liệu mới</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Tên tài liệu <span className="text-error">*</span></label>
                    <input type="text" placeholder="VD: Đề cương ôn tập HK1 Toán 12" className="w-full p-3 border border-outline-variant rounded-xl text-sm outline-none focus:border-primary" value={materialTitle} onChange={e => setMaterialTitle(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">File đính kèm (PDF, DOCX, PNG...) <span className="text-error">*</span></label>
                    <input type="file" className="w-full p-3 border border-outline-variant rounded-xl text-sm outline-none focus:border-primary" onChange={e => setMaterialFile(e.target.files ? e.target.files[0] : null)} />
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button onClick={() => setShowMaterialForm(false)} className="px-5 py-2.5 text-sm font-medium border border-outline-variant rounded-xl hover:bg-surface-container" disabled={uploadingMaterial}>Hủy</button>
                    <button onClick={submitMaterial} className="px-5 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary/90 shadow flex items-center gap-2" disabled={uploadingMaterial}>
                      {uploadingMaterial && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
                      {uploadingMaterial ? 'Đang tải lên...' : 'Xác nhận tải lên'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.length === 0 ? (
                <div className="col-span-2 text-center text-sm text-on-surface-variant italic py-8 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-lowest">
                  Chưa có tài liệu nào được chia sẻ trong lớp này.
                </div>
              ) : (
                materials.map((mat) => (
                  <div key={mat.id} className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-12 h-12 rounded-lg bg-primary-container text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl">
                          {mat.fileType === 'pdf' ? 'picture_as_pdf' : mat.fileType === 'docx' || mat.fileType === 'doc' ? 'description' : 'insert_drive_file'}
                        </span>
                      </div>
                      <div className="truncate">
                        <h4 className="font-bold text-sm text-on-surface truncate" title={mat.title}>{mat.title}</h4>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[14px]">account_circle</span> {mat.uploaderName}
                          <span className="mx-1">•</span>
                          {new Date(mat.uploadedAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <a href={mat.fileUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full hover:bg-primary/10 text-primary flex items-center justify-center transition-colors tooltip" title="Xem file">
                        <span className="material-symbols-outlined">download</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* BILLING TAB */}
        {activeTab === 'BILLING' && (
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              Quản lý học phí
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant text-center">
                <p className="text-sm font-medium text-on-surface-variant mb-2">Số buổi đã dạy</p>
                <p className="text-3xl font-bold text-on-surface">{logs.length}</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant text-center">
                <p className="text-sm font-medium text-on-surface-variant mb-2">Học phí / Buổi</p>
                <p className="text-xl font-bold text-on-surface">{session.pricePerSession?.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 text-center shadow-inner">
                <p className="text-sm font-bold text-primary mb-2">Tạm tính cần thanh toán</p>
                <p className="text-3xl font-black text-primary">{(logs.length * (session.pricePerSession || 0)).toLocaleString('vi-VN')}đ</p>
              </div>
            </div>

            <div className="text-center p-6 bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant text-sm text-on-surface-variant">
              {session.status === 'TRIAL' ? (
                isParent ? (
                  <div className="space-y-4">
                    <p className="font-medium text-on-surface">Sau khi hoàn thành học thử, hãy Xác nhận thuê gia sư và thanh toán để tiếp tục quá trình học tập chính thức.</p>
                    <button 
                      onClick={handleConfirmHire}
                      className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-sm hover:bg-primary/90 flex items-center justify-center gap-2 mx-auto"
                    >
                      <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                      Xác nhận thuê & Thanh toán
                    </button>
                  </div>
                ) : (
                  <p>Lớp học đang trong thời gian học thử. Phụ huynh sẽ tiến hành thanh toán sau khi chốt thuê.</p>
                )
              ) : session.status === 'PENDING_PAYMENT' ? (
                <div className="space-y-4">
                  <p className="font-bold text-amber-600">Đang chờ phụ huynh thanh toán học phí...</p>
                  {isParent && (
                    <button 
                      onClick={handleConfirmHire}
                      className="px-6 py-2 border border-primary text-primary rounded-xl font-bold hover:bg-primary/10 transition-colors"
                    >
                      Mở lại mã QR thanh toán
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-green-600 font-bold flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-green-600">verified</span>
                  Đã thanh toán thành công. Lớp học chính thức diễn ra!
                </p>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
              <h3 className="text-xl font-bold text-on-surface">Thanh toán & Chốt thuê</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              {paymentStatus === 'SUCCESS' ? (
                <div className="text-center space-y-4 py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h4 className="text-2xl font-black text-on-surface">Thanh toán thành công!</h4>
                  <p className="text-on-surface-variant">Cảm ơn bạn đã lựa chọn gia sư của StudyHub. Lớp học đã được chuyển sang trạng thái Chính thức.</p>
                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow hover:bg-primary/90 w-full"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <p className="text-on-surface-variant text-sm mb-1">Quét mã VietQR bằng App ngân hàng để thanh toán</p>
                    <p className="text-primary font-black text-2xl">{session.pricePerSession?.toLocaleString('vi-VN')}đ</p>

                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-inner border border-outline-variant mb-6 relative">
                    <img src={qrUrl} alt="VietQR" className="w-64 h-64 object-contain" />
                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center pointer-events-none rounded-2xl opacity-0 transition-opacity"></div>
                  </div>
                  
                  <div className="w-full bg-surface-container-lowest p-4 rounded-xl border border-outline-variant space-y-2 text-sm text-left mb-6">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Nội dung chuyển khoản:</span>
                      <span className="font-bold text-on-surface select-all">{transactionCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Trạng thái:</span>
                      <span className="font-bold text-amber-600 flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></span>
                        Đang chờ thanh toán...
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-center text-on-surface-variant/70">
                    Hệ thống đang liên tục kiểm tra tài khoản (Polling).<br/>Cửa sổ này sẽ tự động chuyển sang Thành công khi nhận được tiền.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClassWorkspace;
