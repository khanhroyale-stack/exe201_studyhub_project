import { UnifiedPost, UnifiedApplication, UnifiedClass, UnifiedOffer, PostStatus, ApplicationStatus, ClassStatus, OfferStatus } from '../types/shared';

// Initial Mock Data
const INITIAL_POSTS: UnifiedPost[] = [
  {
    id: 'jp1',
    parentId: 'p1',
    parentName: 'Tuấn',
    parentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApLOch6r8WelzEKL27hCZ3JHgUEofD-Uf9GYP22XsH7WxUJpK5rcR7fwFB3rXkb2h189KePCbO6XxtHXKdezlzuQElqSx3tuXRq0kEK8XAj9MtdlBeEC_7jps0sh7fV1FZFBQw6czekQCfav5V-bamDLN3aRQeqcbwQ-6NVRtvsLcxU4lTMkXek7GUxVP1jcj2o5gzzefO0vQ3KGvnDObqKWhthZhQ2nz9Zgv4Ivnr9z9yQQKaxDMWmwJIsgsOvRNmH_IOxM_UrGwt',
    title: 'Toán lớp 12 - Ôn thi THPT Quốc Gia',
    subject: 'Toán học',
    description: 'Cần tìm gia sư có kinh nghiệm luyện thi đại học môn Toán cho học sinh khá.',
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: PostStatus.RECRUITING,
    location: 'Quận 7, TP.HCM',
    schedule: '2 buổi/tuần',
    pricePerSession: 500000,
    learningMode: 'OFFLINE',
    requirement: 'Sinh viên sư phạm hoặc giáo viên'
  },
  {
    id: 'jp2',
    parentId: 'p1',
    parentName: 'Tuấn',
    parentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApLOch6r8WelzEKL27hCZ3JHgUEofD-Uf9GYP22XsH7WxUJpK5rcR7fwFB3rXkb2h189KePCbO6XxtHXKdezlzuQElqSx3tuXRq0kEK8XAj9MtdlBeEC_7jps0sh7fV1FZFBQw6czekQCfav5V-bamDLN3aRQeqcbwQ-6NVRtvsLcxU4lTMkXek7GUxVP1jcj2o5gzzefO0vQ3KGvnDObqKWhthZhQ2nz9Zgv4Ivnr9z9yQQKaxDMWmwJIsgsOvRNmH_IOxM_UrGwt',
    title: 'Tiếng Anh Giao tiếp - Mất gốc',
    subject: 'Tiếng Anh',
    description: 'Học sinh mất gốc cần cải thiện giao tiếp tiếng Anh cơ bản.',
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: PostStatus.PENDING_APPROVAL,
    location: 'Học Online',
    schedule: '3 ca/tuần',
    pricePerSession: 350000,
    learningMode: 'ONLINE',
    requirement: 'IELTS 7.0+'
  }
];

const INITIAL_APPS: UnifiedApplication[] = [
  {
    id: 'a1',
    postId: 'jp1',
    tutorId: 't1',
    tutorName: 'Trần Minh Anh',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK8lhUpNKWMGZdwWdGo_4FXgZVfv-aK31m5zmy7y8iz5aXDOxZWxztDZo4o_BOMqXLIurd0OH9J4k_1g8FSatf8iIppQSW74L8s3wRv2_kyTuBfODLMUlUytLQHza3mGMHWAxV95EG7cBn1ca0ax5WPK72RNEZscgIYi38t-j1-96iByOZpte1JuR9fgKm9nvJaalo1lQnCPtb5AInRo0G8wLhrQes8UdGrCGy8ZTy2QvbpLZWIIbP9T7vlO1lyoxURHsc97jRjRSd',
    tutorTitle: 'ĐH Sư Phạm TP.HCM',
    tutorRating: 4.9,
    appliedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: ApplicationStatus.PENDING,
    message: 'Chào anh/chị, em là sinh viên năm cuối Sư phạm Toán, rất mong được đồng hành cùng bé.'
  }
];

const INITIAL_CLASSES: UnifiedClass[] = [
  {
    id: 'c1',
    postId: 'jp0',
    className: 'Toán lớp 10 - Nâng cao',
    parentId: 'p1',
    parentName: 'Tuấn',
    tutorId: 't1',
    tutorName: 'Lê Thị Thanh',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcyLV-pbCBKDruyPCKCIM4TqRUMe6owsX04_nA7hfv7pkavDnwNb5qh6nKmjn0waHKwRaliXWc7bwcZdJjX7_KOXYpPyx3f7zcV2w3yuFYUc-oA2zb1MCSVTCrkgmFmt_dxPUpoQVOozyI2HLAtv-0s7NyjJK3tcu9VO8-oPwPb8OAGd_JWbWmzlUleayZJrT7fX4p9bgRArPDwTI_9mZHP6xMlK2uJzakJzfSY7-A8CCmnMoZTVWGOf3vVH2xyclpDoC7hf06Qcc',
    schedule: 'Thứ 2, Thứ 4 - 18:00',
    status: ClassStatus.OFFICIAL,
    progress: 40,
    pricePerSession: 300000,
    learningMode: 'ONLINE'
  }
];

const INITIAL_OFFERS: UnifiedOffer[] = [
  {
    id: 'off1',
    tutorId: 't1',
    parentId: 'p1',
    parentName: 'Tuấn',
    parentAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApLOch6r8WelzEKL27hCZ3JHgUEofD-Uf9GYP22XsH7WxUJpK5rcR7fwFB3rXkb2h189KePCbO6XxtHXKdezlzuQElqSx3tuXRq0kEK8XAj9MtdlBeEC_7jps0sh7fV1FZFBQw6czekQCfav5V-bamDLN3aRQeqcbwQ-6NVRtvsLcxU4lTMkXek7GUxVP1jcj2o5gzzefO0vQ3KGvnDObqKWhthZhQ2nz9Zgv4Ivnr9z9yQQKaxDMWmwJIsgsOvRNmH_IOxM_UrGwt',
    className: 'Luyện thi Đại học môn Hóa',
    schedule: 'T2, T4 (19:30 - 21:00)',
    pricePerSession: 300000,
    learningMode: 'OFFLINE',
    location: 'Quận 7, TP.HCM',
    message: 'Chào bạn, mình thấy profile của bạn rất phù hợp với bé nhà mình đang học lớp 12.',
    status: OfferStatus.PENDING,
    receivedAt: new Date().toISOString()
  }
];

export const mockDb = {
  // Posts
  getPosts: (): UnifiedPost[] => {
    const data = localStorage.getItem('mockDb_posts');
    return data ? JSON.parse(data) : INITIAL_POSTS;
  },
  savePosts: (posts: UnifiedPost[]) => {
    localStorage.setItem('mockDb_posts', JSON.stringify(posts));
  },
  
  // Applications
  getApplications: (): UnifiedApplication[] => {
    const data = localStorage.getItem('mockDb_apps');
    return data ? JSON.parse(data) : INITIAL_APPS;
  },
  saveApplications: (apps: UnifiedApplication[]) => {
    localStorage.setItem('mockDb_apps', JSON.stringify(apps));
  },

  // Classes
  getClasses: (): UnifiedClass[] => {
    const data = localStorage.getItem('mockDb_classes');
    return data ? JSON.parse(data) : INITIAL_CLASSES;
  },
  saveClasses: (classes: UnifiedClass[]) => {
    localStorage.setItem('mockDb_classes', JSON.stringify(classes));
  },

  // Offers
  getOffers: (): UnifiedOffer[] => {
    const data = localStorage.getItem('mockDb_offers');
    return data ? JSON.parse(data) : INITIAL_OFFERS;
  },
  saveOffers: (offers: UnifiedOffer[]) => {
    localStorage.setItem('mockDb_offers', JSON.stringify(offers));
  }
};
