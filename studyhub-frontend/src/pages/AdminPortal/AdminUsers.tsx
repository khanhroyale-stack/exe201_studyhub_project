import React, { useState, useEffect } from 'react';


const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ekyc' | 'accounts'>('accounts');
  
  // --- REAL DATA FOR EKYC TAB ---
  const [pendingTutors, setPendingTutors] = useState<any[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<any | null>(null);

  const fetchPendingEkyc = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/ekyc/pending');
      const data = await response.json();
      setPendingTutors(data);
      
      setSelectedTutor((current: any) => {
        if (!current) return data.length > 0 ? data[0] : null;
        const stillExists = data.some((t: any) => t.id === current.id);
        if (!stillExists) return data.length > 0 ? data[0] : null;
        return current;
      });
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu eKYC:", error);
    }
  };

  useEffect(() => {
    if (activeTab === 'ekyc') {
      fetchPendingEkyc();
    }
  }, [activeTab]);

  const handleApprove = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/admin/ekyc/${id}/approve`, { method: 'PUT' });
      alert("Đã duyệt hồ sơ thành công!");
      fetchPendingEkyc();
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/admin/ekyc/${id}/reject`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Hình ảnh CCCD mờ, không rõ nét' })
      });
      alert("Đã từ chối hồ sơ!");
      fetchPendingEkyc();
    } catch (error) {
      console.error("Lỗi khi từ chối eKYC:", error);
    }
  };

  const handleReEvaluateAI = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/ekyc/${id}/re-evaluate`, { method: 'PUT' });
      const data = await response.json();
      if (response.ok) {
        alert(`Quét AI thành công! Độ khớp: ${data.similarityScore}%`);
        fetchPendingEkyc();
        if (selectedTutor?.id === id) {
          setSelectedTutor({...selectedTutor, similarityScore: data.similarityScore});
        }
      } else {
        alert(`Lỗi AI: ${data.error}`);
      }
    } catch (error) {
      console.error("Lỗi khi quét AI:", error);
      alert("Có lỗi xảy ra khi kết nối với AI Face Matching.");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-20 animate-fade-in">
      {/* Page Header & Tabs */}
      <div className="mb-8 animate-slide-up">
        <h2 className="font-headline-lg text-headline-lg md:text-headline-xl md:font-headline-xl text-on-surface mb-6 font-bold text-[#0f172a]">
          Quản lý Người dùng & eKYC
        </h2>
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('ekyc')}
            className={`px-6 py-3 font-semibold text-sm transition-colors relative ${activeTab === 'ekyc' ? 'text-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Duyệt hồ sơ Gia sư
            {activeTab === 'ekyc' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('accounts')}
            className={`px-6 py-3 font-semibold text-sm transition-colors relative ${activeTab === 'accounts' ? 'text-primary' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Quản lý Tài khoản
            {activeTab === 'accounts' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>}
          </button>
        </div>
      </div>

      {/* =========================================================================
                                 TAB: QUẢN LÝ TÀI KHOẢN
      ========================================================================= */}
      {activeTab === 'accounts' && (
        <div className="animate-slide-up stagger-1 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center text-slate-500 py-10">
             Chức năng đang được phát triển... (Dữ liệu Mock)
          </div>
        </div>
      )}

      {/* =========================================================================
                                 TAB: DUYỆT EKYC
      ========================================================================= */}
      {activeTab === 'ekyc' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up stagger-1">
          {/* Left Column: Verification Queue */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col h-[800px] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center sticky top-0">
                <h3 className="font-bold text-lg text-[#0f172a]">Hàng chờ duyệt</h3>
                <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold">{pendingTutors.length} Chờ</span>
              </div>
              <div className="overflow-y-auto flex-1 p-3 space-y-2">
                {pendingTutors.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">Không có hồ sơ nào đang chờ duyệt.</div>
                ) : (
                  pendingTutors.map((tutor) => (
                    <div 
                      key={tutor.id} 
                      onClick={() => setSelectedTutor(tutor)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedTutor?.id === tutor.id ? 'bg-primary/5 border-primary/20' : 'bg-white border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <img src={tutor.avatarUrl || 'https://i.pravatar.cc/150'} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className={`font-bold text-sm ${selectedTutor?.id === tutor.id ? 'text-primary' : 'text-[#0f172a]'}`}>{tutor.fullName}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">{tutor.user?.email}</p>
                          </div>
                        </div>
                        <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase">Chờ duyệt</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed View */}
          <div className="xl:col-span-8">
            {selectedTutor ? (
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden h-[800px] flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                {/* Profile Header */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-5 items-center">
                    <img src={selectedTutor.avatarUrl || 'https://i.pravatar.cc/150'} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover" />
                    <div>
                      <h2 className="font-bold text-xl text-[#0f172a] mb-1">{selectedTutor.fullName}</h2>
                      <p className="text-sm font-medium text-slate-500 mb-2.5">{selectedTutor.user?.email}</p>
                      <div className="flex gap-2">
                        {selectedTutor.subjects?.map((sub: any) => (
                           <span key={sub.id} className="bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-lg text-xs font-bold">{sub.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => handleReject(selectedTutor.id)}
                      className="flex-1 md:flex-none px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors shadow-sm"
                    >
                      Từ chối
                    </button>
                    <button 
                      onClick={() => handleApprove(selectedTutor.id)}
                      className="flex-1 md:flex-none px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/25 active:scale-95"
                    >
                      Duyệt hồ sơ
                    </button>
                  </div>
                </div>
                
                {/* Documents Canvas */}
                <div className="p-6 overflow-y-auto flex-1 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-amber-600">badge</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Xác minh danh tính</p>
                        <p className="text-sm font-bold text-amber-600 mt-0.5">Cần xem xét</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-amber-600">school</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Bằng cấp</p>
                        <p className="text-sm font-bold text-amber-600 mt-0.5">Cần xem xét</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">id_card</span> Giấy tờ tuỳ thân
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-[1.6/1] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 relative overflow-hidden group">
                          {selectedTutor.idCardFrontUrl ? (
                            <img src={selectedTutor.idCardFrontUrl} alt="CCCD" className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400">
                              <span className="material-symbols-outlined text-4xl mb-2">image</span>
                              <span className="text-xs font-medium">Chưa cung cấp</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Loại giấy tờ</p>
                            <p className="text-sm font-semibold text-[#0f172a]">Căn cước công dân</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Tên trên giấy tờ (AI Trích xuất)</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.fullName}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Ngày sinh</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.birthDate || "Chưa cập nhật"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Số điện thoại</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.phoneNumber || "Chưa cập nhật"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Địa chỉ</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.address || "Chưa cập nhật"}</p>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1.5">
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Độ khớp khuôn mặt (AI Matching)</p>
                              <button 
                                onClick={() => handleReEvaluateAI(selectedTutor.id)}
                                className="flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary/80"
                              >
                                <span className="material-symbols-outlined text-[14px]">psychology</span>
                                Quét lại
                              </button>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${selectedTutor.similarityScore > 85 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                  style={{ width: `${selectedTutor.similarityScore || 0}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs font-bold ${selectedTutor.similarityScore > 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {selectedTutor.similarityScore || 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">school</span> Bằng cấp / Chứng chỉ
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-[1.6/1] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 relative overflow-hidden group">
                          {selectedTutor.degreeImageUrl ? (
                            <img src={selectedTutor.degreeImageUrl} alt="Bằng cấp" className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400">
                              <span className="material-symbols-outlined text-4xl mb-2">image</span>
                              <span className="text-xs font-medium">Chưa cung cấp</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-center space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Trường Đại học/Cao đẳng</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.universityName || "Chưa cập nhật"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Chuyên ngành</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.major || "Chưa cập nhật"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Kinh nghiệm</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.experienceYears !== undefined ? `${selectedTutor.experienceYears} năm` : "Chưa cập nhật"}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Giới thiệu bản thân</p>
                            <p className="text-sm font-semibold text-[#0f172a]">{selectedTutor.introduction || "Chưa cập nhật"}</p>
                          </div>

                        </div>
                      </div>
                      
                      {selectedTutor.certificates && selectedTutor.certificates.length > 0 && (
                        <div className="mt-8">
                          <h4 className="font-bold text-[#0f172a] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">workspace_premium</span> Các chứng chỉ khác
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedTutor.certificates.map((cert: string, index: number) => (
                              <div key={index} className="aspect-[1.4/1] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                <img src={cert} alt={`Chứng chỉ ${index + 1}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-2xl h-[800px] flex items-center justify-center text-slate-400 flex-col shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <span className="material-symbols-outlined text-6xl mb-4 text-slate-200">badge</span>
                <p>Chọn một hồ sơ bên trái để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
