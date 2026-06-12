import React, { useState, useEffect } from 'react';
import { UnifiedPost } from '../../types/shared';
import { apiFetch } from '../../utils/api';






interface Subject {
  id: number;
  name: string;
}

const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'master-data' | 'moderation'>('moderation');

  // Moderation
  const [pendingPosts, setPendingPosts] = useState<UnifiedPost[]>([]);
  const [pendingCourses, setPendingCourses] = useState<any[]>([]);

  // Master Data
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [savingSubject, setSavingSubject] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);
  const [editingSubjectName, setEditingSubjectName] = useState('');

  useEffect(() => {
    if (activeTab === 'moderation') {
      loadPendingPosts();
      loadPendingCourses();
    } else if (activeTab === 'master-data') {
      loadSubjects();
    }
  }, [activeTab]);

  // ── Moderation ────────────────────────────────────────────
  const loadPendingPosts = async () => {
    try {
      const r = await apiFetch(`/posts/admin/pending`);
      if (r.ok) setPendingPosts(await r.json());
    } catch (error) { console.error(error); }
  };

  const loadPendingCourses = async () => {
    try {
      const r = await apiFetch(`/courses/admin/pending`);
      if (r.ok) setPendingCourses(await r.json());
    } catch (error) { console.error(error); }
  };

  const handleApprove = async (postId: string) => {
    try {
      const r = await apiFetch(`/posts/admin/${postId}/approve`, { method: 'PUT' });
      if (r.ok) loadPendingPosts();
      else alert('Có lỗi xảy ra khi duyệt bài.');
    } catch (error) { console.error(error); }
  };

  const handleReject = async (postId: string) => {
    try {
      const r = await apiFetch(`/posts/admin/${postId}/reject`, { method: 'PUT' });
      if (r.ok) loadPendingPosts();
      else alert('Có lỗi xảy ra khi từ chối bài.');
    } catch (error) { console.error(error); }
  };

  const handleApproveCourse = async (courseId: number) => {
    try {
      const r = await apiFetch(`/courses/admin/${courseId}/approve`, { method: 'PUT' });
      if (r.ok) loadPendingCourses();
      else alert('Có lỗi xảy ra khi duyệt khóa học.');
    } catch (error) { console.error(error); }
  };

  const handleRejectCourse = async (courseId: number) => {
    try {
      const r = await apiFetch(`/courses/admin/${courseId}/reject`, { method: 'PUT' });
      if (r.ok) loadPendingCourses();
      else alert('Có lỗi xảy ra khi từ chối khóa học.');
    } catch (error) { console.error(error); }
  };

  // ── Master Data ────────────────────────────────────────────
  const loadSubjects = async () => {
    try {
      const r = await apiFetch(`/subjects`);
      if (r.ok) setSubjects(await r.json());
    } catch (error) { console.error(error); }
  };

  const handleAddSubject = async () => {
    if (!newSubjectName.trim()) return;
    setSavingSubject(true);
    try {
      const r = await apiFetch(`/subjects`, {
        method: 'POST',
        body: JSON.stringify({ name: newSubjectName.trim() })
      });
      if (r.ok) {
        setNewSubjectName('');
        loadSubjects();
      } else {
        alert('Lỗi khi thêm môn học.');
      }
    } catch (error) { console.error(error); }
    finally { setSavingSubject(false); }
  };

  const handleUpdateSubject = async (id: number) => {
    if (!editingSubjectName.trim()) return;
    try {
      const r = await apiFetch(`/subjects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: editingSubjectName.trim() })
      });
      if (r.ok) {
        setEditingSubjectId(null);
        setEditingSubjectName('');
        loadSubjects();
      } else {
        alert('Lỗi khi cập nhật môn học.');
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteSubject = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa môn học này? Hành động này không thể hoàn tác.')) return;
    try {
      const r = await apiFetch(`/subjects/${id}`, { method: 'DELETE' });
      if (r.ok) loadSubjects();
      else alert('Lỗi khi xóa môn học. Có thể môn học đang được sử dụng.');
    } catch (error) { console.error(error); }
  };

  return (
    <div className="max-w-[1440px] mx-auto pb-20 animate-fade-in">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant pb-4 mb-8 animate-slide-up">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Nội dung & Điều phối</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Quản lý danh mục và kiểm duyệt bài đăng.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mb-6">
          {(['master-data', 'moderation'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 font-label-md text-label-md whitespace-nowrap transition-colors ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab === 'master-data' ? 'Dữ liệu Hệ thống' : 'Kiểm duyệt Nội dung'}
            </button>
          ))}
        </div>
      </div>

      {/* TAB: MASTER DATA */}
      {activeTab === 'master-data' && (
        <div className="space-y-6 animate-slide-up stagger-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden max-w-2xl">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">menu_book</span>
                Quản lý Môn học ({subjects.length})
              </h3>
            </div>
            {/* Add New */}
            <div className="p-4 border-b border-slate-100 flex gap-3">
              <input
                type="text"
                value={newSubjectName}
                onChange={e => setNewSubjectName(e.target.value)}
                placeholder="Tên môn học mới..."
                onKeyDown={e => e.key === 'Enter' && handleAddSubject()}
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
              <button
                onClick={handleAddSubject}
                disabled={savingSubject || !newSubjectName.trim()}
                className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Thêm
              </button>
            </div>
            {/* List */}
            <ul className="divide-y divide-slate-100">
              {subjects.length === 0 ? (
                <li className="py-8 text-center text-slate-400 text-sm">Chưa có môn học nào.</li>
              ) : subjects.map(sub => (
                <li key={sub.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 group transition-colors">
                  {editingSubjectId === sub.id ? (
                    <div className="flex gap-2 flex-1 mr-3">
                      <input
                        type="text"
                        value={editingSubjectName}
                        onChange={e => setEditingSubjectName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleUpdateSubject(sub.id)}
                        className="flex-1 px-3 py-1.5 border border-primary rounded-lg text-sm outline-none"
                        autoFocus
                      />
                      <button onClick={() => handleUpdateSubject(sub.id)} className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg font-semibold">Lưu</button>
                      <button onClick={() => setEditingSubjectId(null)} className="px-3 py-1.5 border border-slate-200 text-xs rounded-lg">Hủy</button>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-700 font-medium">{sub.name}</span>
                  )}
                  {editingSubjectId !== sub.id && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditingSubjectId(sub.id); setEditingSubjectName(sub.name); }}
                        className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                        title="Sửa"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(sub.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB: MODERATION */}
      {activeTab === 'moderation' && (
        <div className="flex flex-col gap-10 animate-slide-up stagger-1">
          {/* Parent Posts */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface">Bài đăng Phụ huynh chờ duyệt ({pendingPosts.length})</h2>
              <button onClick={loadPendingPosts} className="text-primary text-sm flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">refresh</span> Làm mới
              </button>
            </div>
            {pendingPosts.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
                <span className="material-symbols-outlined text-4xl block mb-2 text-outline-variant">check_circle</span>
                Không có bài đăng nào cần duyệt.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pendingPosts.map(post => (
                  <div key={post.id} className="glass border border-white/20 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">{post.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Đăng bởi: {post.parentName}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-primary-container/10 text-primary px-2 py-1 rounded font-label-sm text-label-sm">{post.subject}</span>
                      <span className="bg-surface-container-high text-on-surface px-2 py-1 rounded font-label-sm text-label-sm">{post.learningMode}</span>
                      {post.classLevel && <span className="bg-secondary-container/20 text-secondary px-2 py-1 rounded font-label-sm text-label-sm">{post.classLevel}</span>}
                    </div>
                    {post.description && <p className="font-body-sm text-body-sm text-on-surface line-clamp-3">{post.description}</p>}
                    <div className="mt-auto pt-4 border-t border-outline-variant flex gap-3">
                      <button onClick={() => handleReject(post.id)} className="flex-1 bg-surface-container-lowest text-error hover:bg-error-container/20 font-label-md text-label-md py-2 rounded-lg transition-colors border border-error/50">Từ chối</button>
                      <button onClick={() => handleApprove(post.id)} className="flex-1 bg-primary text-on-primary hover:bg-primary/90 font-label-md text-label-md py-2 rounded-lg transition-colors">Duyệt bài</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tutor Courses */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface">Lớp học Gia sư chờ duyệt ({pendingCourses.length})</h2>
              <button onClick={loadPendingCourses} className="text-primary text-sm flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">refresh</span> Làm mới
              </button>
            </div>
            {pendingCourses.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant">
                <span className="material-symbols-outlined text-4xl block mb-2 text-outline-variant">check_circle</span>
                Không có lớp học nào cần duyệt.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pendingCourses.map(course => (
                  <div key={course.id} className="glass border border-white/20 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface">{course.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Gia sư: {course.tutorName}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-primary-container/10 text-primary px-2 py-1 rounded font-label-sm text-label-sm">{course.subjectName}</span>
                      <span className="bg-surface-container-high text-on-surface px-2 py-1 rounded font-label-sm text-label-sm">{course.locationType}</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface line-clamp-3">{course.description}</p>
                    <p className="font-label-md text-label-md text-primary mt-2">{course.price}đ / ca</p>
                    <div className="mt-auto pt-4 border-t border-outline-variant flex gap-3">
                      <button onClick={() => handleRejectCourse(course.id)} className="flex-1 bg-surface-container-lowest text-error hover:bg-error-container/20 font-label-md text-label-md py-2 rounded-lg transition-colors border border-error/50">Từ chối</button>
                      <button onClick={() => handleApproveCourse(course.id)} className="flex-1 bg-primary text-on-primary hover:bg-primary/90 font-label-md text-label-md py-2 rounded-lg transition-colors">Duyệt</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;