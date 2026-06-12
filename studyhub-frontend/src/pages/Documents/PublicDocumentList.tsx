import React, { useEffect, useState } from 'react';
import { PublicDocument, documentApi } from '../../services/documentApi';

const PublicDocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<PublicDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await documentApi.getAllDocuments();
      setDocuments(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách tài liệu. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
            Tài liệu <span className="text-primary">Công khai</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Khám phá kho tài liệu học tập đa dạng, được kiểm duyệt và cung cấp hoàn toàn miễn phí bởi đội ngũ StudyHub.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-red-50 text-red-600 rounded-2xl">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <p>{error}</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-300">folder_open</span>
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Chưa có tài liệu nào</h3>
            <p className="text-slate-500">Hệ thống đang cập nhật thêm tài liệu mới.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-red-500 text-[24px]">picture_as_pdf</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2" title={doc.title}>
                  {doc.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  {new Date(doc.uploadedAt).toLocaleDateString('vi-VN')}
                </p>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Xem & Tải xuống
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicDocumentList;
