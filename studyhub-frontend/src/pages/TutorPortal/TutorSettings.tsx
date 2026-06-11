import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TutorSettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tutorId = id || localStorage.getItem('sh_tutor_id') || '1'; // fallback to 1 if not found

  const { updateProfile } = useAuth();

  const [idCardFront, setIdCardFront] = useState<string | null>(null);
  const [idCardBack, setIdCardBack] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [ekycScore, setEkycScore] = useState<number | null>(null);
  const [ekycError, setEkycError] = useState<string | null>(null);
  const [profileStatus, setProfileStatus] = useState<string>('NOT_STARTED');
  const [fullName, setFullName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [universityName, setUniversityName] = useState<string>('');
  const [major, setMajor] = useState<string>('');
  const [experienceYears, setExperienceYears] = useState<string>('Chưa có kinh nghiệm');

  // Thêm state cho phần Bằng cấp và Chứng chỉ
  const [degreeFile, setDegreeFile] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [degreeFileUrl, setDegreeFileUrl] = useState<string | null>(null);
  const [certificateUrls, setCertificateUrls] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const isReadOnly = profileStatus === 'PROCESSING' || (profileStatus === 'SUCCESS' && !isEditing);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/tutors/${tutorId}`);
        if (response.ok) {
          const data = await response.json();
          setProfileStatus(data.ekycStatus);
          if (data.fullName) setFullName(data.fullName);
          if (data.avatarUrl) setAvatar(data.avatarUrl);
          if (data.idCardFrontUrl) setIdCardFront(data.idCardFrontUrl);
          if (data.idCardBackUrl) setIdCardBack(data.idCardBackUrl);
          if (data.similarityScore) setEkycScore(data.similarityScore);
          if (data.birthDate) setBirthDate(data.birthDate);
          if (data.address) setAddress(data.address);
          if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
          if (data.universityName) setUniversityName(data.universityName);
          if (data.major) setMajor(data.major);
          if (data.experienceYears !== undefined) {
            if (data.experienceYears === 0) setExperienceYears('Dưới 1 năm');
            else if (data.experienceYears === 2) setExperienceYears('1 - 3 năm');
            else if (data.experienceYears >= 4) setExperienceYears('Trên 3 năm');
          }
          if (data.degreeImageUrl) {
            setDegreeFileUrl(data.degreeImageUrl);
          }
          if (data.certificates && data.certificates.length > 0) {
            setCertificateUrls(data.certificates);
          }

          if (data.ekycStatus === 'SUCCESS') {
            updateProfile(data.fullName, data.avatarUrl);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin gia sư:", error);
      }
    };
    fetchProfile();
  }, [tutorId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Clear value to allow selecting same file again
    e.target.value = '';
  };

  const handleRemoveImage = (setter: React.Dispatch<React.SetStateAction<string | null>>, isEkycFactor: boolean) => {
    setter(null);
    if (isEkycFactor) {
      setEkycScore(null);
      setEkycError(null);
    }
  };

  const handleDegreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setDegreeFile(e.target.files[0]);
    }
  };

  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCertificates((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const removeCertificate = (index: number) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const verifyScore = async () => {
      if (idCardFront && avatar) {
        setIsVerifying(true);
        setEkycScore(null);
        setEkycError(null);
        try {
          const response = await fetch(`http://localhost:8080/api/v1/tutors/verify-ekyc`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              avatarUrl: avatar,
              idCardFrontUrl: idCardFront
            })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Lỗi hệ thống');
          }
          if (data.score !== undefined && data.score !== null) {
            setEkycScore(Number(data.score));
          }
        } catch (error: any) {
          console.error("Lỗi xác thực eKYC:", error);
          setEkycError(error.message);
        } finally {
          setIsVerifying(false);
        }
      }
    };

    verifyScore();
  }, [idCardFront, avatar]);

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  const submitEkyc = async () => {
    if (!idCardFront || !avatar || !idCardBack) {
      alert('Vui lòng tải lên đầy đủ ảnh (Mặt trước, mặt sau CCCD và ảnh chân dung).');
      return;
    }
    
    setIsSubmitting(true);
    try {
      let degreeImageUrl = degreeFileUrl;
      if (degreeFile) {
        degreeImageUrl = await toBase64(degreeFile);
      }
      
      const combinedCertificates = [...certificateUrls];
      for (const file of certificates) {
        combinedCertificates.push(await toBase64(file));
      }

      const response = await fetch(`http://localhost:8080/api/v1/tutors/${tutorId}/ekyc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avatarUrl: avatar,
          idCardFrontUrl: idCardFront,
          idCardBackUrl: idCardBack,
          fullName,
          birthDate,
          address,
          phoneNumber,
          universityName,
          major,
          experienceYears,
          degreeImageUrl,
          certificates: combinedCertificates
        })
      });

      const data = await response.json();
      if (data.score !== undefined && data.score !== null) {
        setEkycScore(Number(data.score));
      }
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Có lỗi xảy ra');
      }

      alert('Thành công: ' + data.message);
      setProfileStatus('PROCESSING');
      setIsEditing(false);
    } catch (error: any) {
      alert('Thất bại: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="animate-fade-in">
      {/* Top App Bar (Contextual Actions) */}
      <header className="h-[72px] glass border-b border-white/20 flex items-center justify-between -mx-4 md:-mx-8 px-4 md:px-8 mb-6 sticky top-0 z-30 animate-slide-up">
        <div className="flex items-center gap-4">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Cập nhật hồ sơ chuyên môn</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 font-label-sm text-label-sm rounded-full flex items-center gap-1 border ${profileStatus === 'PROCESSING' ? 'bg-secondary-container text-on-secondary-container border-secondary' : profileStatus === 'SUCCESS' ? 'bg-primary-container text-on-primary-container border-primary' : 'bg-surface-container-high text-on-surface-variant border-outline-variant'}`}>
            <span className="material-symbols-outlined text-[16px]">
              {profileStatus === 'PROCESSING' ? 'hourglass_empty' : profileStatus === 'SUCCESS' ? 'check_circle' : 'edit_document'}
            </span>
            Trạng thái: {profileStatus === 'PROCESSING' ? 'ĐANG CHỜ DUYỆT' : profileStatus === 'SUCCESS' ? 'ĐÃ DUYỆT' : 'BẢN NHÁP'}
          </span>
          {profileStatus === 'SUCCESS' && !isEditing && (
            <button className="px-4 py-2 bg-secondary text-on-secondary font-label-md text-label-md rounded-lg hover:bg-secondary-fixed transition-colors shadow-sm flex items-center gap-2" onClick={() => setIsEditing(true)}>
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Chỉnh sửa
            </button>
          )}
          {!isReadOnly && (
            <button className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm" onClick={submitEkyc} disabled={isSubmitting}>
              {isSubmitting ? 'Đang gửi...' : 'Gửi xét duyệt'}
            </button>
          )}
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="max-w-[1440px] mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Section 1: Thông tin định danh */}
          <section className="lg:col-span-8 glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up stagger-1 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">1. Thông tin định danh</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Thông tin cơ bản để xác thực danh tính của bạn.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Họ và tên <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface disabled:opacity-70 disabled:bg-surface-container" placeholder="VD: Nguyễn Văn A" type="text" value={fullName} onChange={e => setFullName(e.target.value)} disabled={isReadOnly} />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Ngày sinh <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface disabled:opacity-70 disabled:bg-surface-container" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} disabled={isReadOnly} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface">Địa chỉ thường trú <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface disabled:opacity-70 disabled:bg-surface-container" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" type="text" value={address} onChange={e => setAddress(e.target.value)} disabled={isReadOnly} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface">Số điện thoại liên hệ <span className="text-error">*</span></label>
                <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface disabled:opacity-70 disabled:bg-surface-container" placeholder="09xxxxxxxxx" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} disabled={isReadOnly} />
              </div>
            </div>
          </section>

          {/* Status / Help Card */}
          <aside className="lg:col-span-4 glass border border-primary/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-md hover:-translate-y-1 transition-all duration-300 animate-slide-up stagger-2 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary text-[32px] mb-4">verified_user</span>
              <h4 className="font-headline-sm text-headline-sm text-primary-dark mb-2">Quy trình duyệt hồ sơ</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Hồ sơ của bạn cần được ban quản trị xét duyệt trước khi có thể nhận lớp. Hãy đảm bảo thông tin chính xác và rõ nét.</p>
              <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary">check_circle</span> Thời gian duyệt: 24h - 48h</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary">check_circle</span> Hình ảnh chụp bản gốc, không bị lóa</li>
              </ul>
            </div>
            <button className="mt-6 w-full py-3 bg-surface-container-lowest text-primary font-label-md text-label-md rounded-lg border border-primary hover:bg-surface transition-colors relative z-10 shadow-sm">
              Lưu bản nháp
            </button>
          </aside>

          {/* Section 2: eKYC */}
          <section className="lg:col-span-12 glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 mt-2 animate-slide-up stagger-3">
            <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">id_card</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">2. Xác thực eKYC</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Tải lên hình ảnh Căn cước công dân và ảnh chân dung chụp cùng CCCD.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Front ID */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface text-center">Mặt trước CCCD <span className="text-error">*</span></span>
                <div className="upload-dashed h-48 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-surface-container-low transition-colors group relative overflow-hidden border-2 border-dashed border-outline-variant rounded-xl">
                  {idCardFront ? (
                    <>
                      <img src={idCardFront} alt="Mặt trước CCCD" className="absolute inset-0 w-full h-full object-cover" />
                      {!isReadOnly && (
                        <button 
                          onClick={() => handleRemoveImage(setIdCardFront, true)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                          title="Xóa ảnh"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[40px] mb-2 transition-colors">add_photo_alternate</span>
                      <span className="font-body-sm text-body-sm text-outline group-hover:text-primary transition-colors">Kéo thả hoặc nhấn để tải ảnh</span>
                      {!isReadOnly && <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" onChange={(e) => handleImageChange(e, setIdCardFront)} />}
                    </>
                  )}
                </div>
              </div>
              {/* Back ID */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface text-center">Mặt sau CCCD <span className="text-error">*</span></span>
                <div className="upload-dashed h-48 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-surface-container-low transition-colors group relative overflow-hidden border-2 border-dashed border-outline-variant rounded-xl">
                  {idCardBack ? (
                    <>
                      <img src={idCardBack} alt="Mặt sau CCCD" className="absolute inset-0 w-full h-full object-cover" />
                      {!isReadOnly && (
                        <button 
                          onClick={() => handleRemoveImage(setIdCardBack, false)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                          title="Xóa ảnh"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[40px] mb-2 transition-colors">add_photo_alternate</span>
                      <span className="font-body-sm text-body-sm text-outline group-hover:text-primary transition-colors">Kéo thả hoặc nhấn để tải ảnh</span>
                      {!isReadOnly && <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" onChange={(e) => handleImageChange(e, setIdCardBack)} />}
                    </>
                  )}
                </div>
              </div>
              {/* Selfie */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface text-center">Ảnh chân dung <span className="text-error">*</span></span>
                <div className="upload-dashed h-48 flex flex-col items-center justify-center cursor-pointer bg-surface hover:bg-surface-container-low transition-colors group relative overflow-hidden border-2 border-dashed border-outline-variant rounded-xl">
                  {avatar ? (
                    <>
                      <img src={avatar} alt="Ảnh chân dung" className="absolute inset-0 w-full h-full object-cover" />
                      {!isReadOnly && (
                        <button 
                          onClick={() => handleRemoveImage(setAvatar, true)}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
                          title="Xóa ảnh"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-[40px] mb-2 transition-colors">face</span>
                      <span className="font-body-sm text-body-sm text-outline group-hover:text-primary transition-colors">Kéo thả hoặc nhấn để tải ảnh</span>
                      {!isReadOnly && <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" type="file" onChange={(e) => handleImageChange(e, setAvatar)} />}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            {(isVerifying || ekycScore !== null || ekycError !== null) && (
              <div className="mt-6 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest animate-fade-in">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-md text-label-md text-on-surface">Độ khớp khuôn mặt (Face Match)</span>
                  {ekycScore !== null && !isVerifying && !ekycError && (
                    <span className={`font-label-lg text-label-lg ${ekycScore >= 90 ? 'text-primary' : 'text-error'}`}>
                      {ekycScore.toFixed(1)}%
                    </span>
                  )}
                  {isVerifying && (
                    <span className="font-label-lg text-label-lg text-on-surface-variant animate-pulse">
                      Đang phân tích...
                    </span>
                  )}
                </div>
                {!ekycError && (
                  <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden relative">
                    {isVerifying ? (
                      <div className="absolute top-0 left-0 h-full bg-primary animate-pulse w-full opacity-50"></div>
                    ) : (
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${ekycScore && ekycScore >= 90 ? 'bg-primary' : 'bg-error'}`} 
                        style={{ width: `${ekycScore || 0}%` }}
                      ></div>
                    )}
                  </div>
                )}
                {!isVerifying && ekycError && (
                  <p className="mt-2 text-error font-body-sm text-body-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    {ekycError}
                  </p>
                )}
                {!isVerifying && ekycScore !== null && ekycScore < 90 && !ekycError && (
                  <p className="mt-2 text-error font-body-sm text-body-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    Khuôn mặt không đủ độ khớp (dưới 90%). Vui lòng tải lại ảnh.
                  </p>
                )}
                {!isVerifying && ekycScore !== null && ekycScore >= 90 && !ekycError && (
                  <p className="mt-2 text-primary font-body-sm text-body-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Độ khớp khuôn mặt đạt chuẩn! Bạn có thể gửi hồ sơ.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Section 3 & 4 Container */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-gutter mt-2 animate-slide-up stagger-4">
            {/* Section 3: Học vấn */}
            <section className="glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-outline-variant pb-4">
                <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">3. Học vấn &amp; Kinh nghiệm</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Thông tin trường học và kinh nghiệm giảng dạy.</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Trường Đại học/Cao đẳng <span className="text-error">*</span></label>
                  <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface disabled:opacity-70 disabled:bg-surface-container" placeholder="VD: Đại học Sư phạm Hà Nội" type="text" value={universityName} onChange={e => setUniversityName(e.target.value)} disabled={isReadOnly} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface">Chuyên ngành</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface disabled:opacity-70 disabled:bg-surface-container" placeholder="VD: Sư phạm Toán" type="text" value={major} onChange={e => setMajor(e.target.value)} disabled={isReadOnly} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-label-md text-on-surface">Số năm kinh nghiệm</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-body-md text-on-surface appearance-none cursor-pointer disabled:opacity-70 disabled:bg-surface-container" value={experienceYears} onChange={e => setExperienceYears(e.target.value)} disabled={isReadOnly}>
                      <option>Chưa có kinh nghiệm</option>
                      <option>Dưới 1 năm</option>
                      <option>1 - 3 năm</option>
                      <option>Trên 3 năm</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface">Bằng cấp / Thẻ sinh viên minh chứng <span className="text-error">*</span></label>
                  <div className="border border-outline-variant rounded-lg p-4 bg-surface flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded bg-surface-container flex shrink-0 items-center justify-center text-outline">
                        <span className="material-symbols-outlined">{(degreeFile || degreeFileUrl) ? 'draft' : 'description'}</span>
                      </div>
                      <div className="truncate pr-4">
                        <p className="font-label-sm text-label-sm text-on-surface truncate">
                          {degreeFile ? degreeFile.name : degreeFileUrl ? 'Đã tải lên tệp minh chứng' : 'Chưa có tệp nào được chọn'}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                          {degreeFile ? `${(degreeFile.size / 1024 / 1024).toFixed(2)} MB` : degreeFileUrl ? 'Đã lưu' : 'Định dạng JPG, PNG hoặc PDF (Tối đa 5MB)'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {(degreeFile || degreeFileUrl) && !isReadOnly && (
                        <button onClick={() => { setDegreeFile(null); setDegreeFileUrl(null); }} className="px-3 py-1.5 border border-error text-error rounded hover:bg-error-container transition-colors font-label-sm text-label-sm">Xóa</button>
                      )}
                      {!isReadOnly && (
                        <label className="px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface-variant cursor-pointer">
                          {(degreeFile || degreeFileUrl) ? 'Đổi tệp' : 'Tải lên'}
                          <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleDegreeChange} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Chứng chỉ */}
            <section className="glass border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6 border-b border-outline-variant pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <span className="material-symbols-outlined">workspace_premium</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">4. Chứng chỉ (Tùy chọn)</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">IELTS, TOEIC, Giải thưởng quốc gia...</p>
                  </div>
                </div>
                {!isReadOnly && (
                  <label className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors cursor-pointer tooltip" title="Thêm chứng chỉ">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <input type="file" multiple className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleCertificatesChange} />
                  </label>
                )}
              </div>
              
              {(certificates.length === 0 && certificateUrls.length === 0) ? (
                <div className="h-[240px] border-2 border-dashed border-outline-variant rounded-xl bg-surface flex flex-col items-center justify-center p-6 text-center">
                  <span className="material-symbols-outlined text-[48px] text-surface-container-highest mb-3">military_tech</span>
                  <h5 className="font-label-md text-label-md text-on-surface mb-1">Chưa có chứng chỉ nào</h5>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Thêm các chứng chỉ liên quan để tăng độ uy tín cho hồ sơ của bạn.</p>
                  {!isReadOnly && (
                    <label className="px-4 py-2 bg-transparent border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-2 cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">add_circle</span> Thêm mới
                      <input type="file" multiple className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleCertificatesChange} />
                    </label>
                  )}
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-2 space-y-3" style={{ maxHeight: '240px' }}>
                  {certificateUrls.map((_, index) => (
                    <div key={`url-${index}`} className="flex items-center justify-between p-3 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container-lowest transition-colors animate-slide-up">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                        <div className="truncate">
                          <p className="font-label-sm text-label-sm text-on-surface truncate">Chứng chỉ đã lưu {index + 1}</p>
                          <p className="font-body-sm text-[11px] text-on-surface-variant">Đã lưu trên hệ thống</p>
                        </div>
                      </div>
                      {!isReadOnly && (
                        <button onClick={() => setCertificateUrls(prev => prev.filter((_, i) => i !== index))} className="w-8 h-8 rounded-full hover:bg-error-container text-outline hover:text-error flex items-center justify-center transition-colors shrink-0" title="Xóa chứng chỉ">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                  {certificates.map((cert, index) => (
                    <div key={`file-${index}`} className="flex items-center justify-between p-3 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container-lowest transition-colors animate-slide-up">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                        <div className="truncate">
                          <p className="font-label-sm text-label-sm text-on-surface truncate">{cert.name}</p>
                          <p className="font-body-sm text-[11px] text-on-surface-variant">{(cert.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      {!isReadOnly && (
                        <button onClick={() => removeCertificate(index)} className="w-8 h-8 rounded-full hover:bg-error-container text-outline hover:text-error flex items-center justify-center transition-colors shrink-0" title="Xóa chứng chỉ">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Bottom Action Bar (Mobile floating) */}
        <div className="mt-8 mb-4 md:hidden flex flex-col gap-3">
          {profileStatus === 'SUCCESS' && !isEditing && (
            <button className="w-full py-3 bg-secondary text-on-secondary font-label-md text-label-md rounded-lg hover:bg-secondary-fixed transition-colors shadow-md flex items-center justify-center gap-2" onClick={() => setIsEditing(true)}>
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Chỉnh sửa hồ sơ
            </button>
          )}
          {!isReadOnly && (
            <button className="w-full py-3 bg-surface-container-highest text-on-surface-variant font-label-md text-label-md rounded-lg border border-outline-variant hover:bg-surface transition-colors">
              Lưu bản nháp
            </button>
          )}
          {!isReadOnly && (
            <button className="w-full py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-md" onClick={submitEkyc} disabled={isSubmitting}>
              {isSubmitting ? 'Đang gửi...' : 'Gửi xét duyệt hồ sơ'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorSettings;
