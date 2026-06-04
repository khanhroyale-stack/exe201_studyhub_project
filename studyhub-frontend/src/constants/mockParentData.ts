import { Parent, JobPosting, Applicant, ClassSession, ParentFeedback } from '../types/parent';

export const CURRENT_PARENT: Parent = {
  id: 'p1',
  name: 'Tuấn',
  email: 'tuan@example.com',
  phone: '0901234567',
  address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApLOch6r8WelzEKL27hCZ3JHgUEofD-Uf9GYP22XsH7WxUJpK5rcR7fwFB3rXkb2h189KePCbO6XxtHXKdezlzuQElqSx3tuXRq0kEK8XAj9MtdlBeEC_7jps0sh7fV1FZFBQw6czekQCfav5V-bamDLN3aRQeqcbwQ-6NVRtvsLcxU4lTMkXek7GUxVP1jcj2o5gzzefO0vQ3KGvnDObqKWhthZhQ2nz9Zgv4Ivnr9z9yQQKaxDMWmwJIsgsOvRNmH_IOxM_UrGwt',
  budgetSpentThisMonth: 4200000,
  classesWaiting: 2
};

export const MOCK_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'jp1',
    title: 'Toán lớp 12 - Ôn thi THPT Quốc Gia',
    subject: 'Toán học',
    description: 'Cần tìm gia sư có kinh nghiệm luyện thi đại học môn Toán cho học sinh khá.',
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'RECRUITING',
    location: 'Quận 7, TP.HCM',
    schedule: '2 buổi/tuần',
    tutorGenderPreference: 'FEMALE',
    pricePerSession: 500000,
    applicantsCount: 7,
    applicantsAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdO80AanCBBYecr95An9EtrEBZCR1tlKEGwvcLQ_qegi0EWmYqzKzN6rxEQQUNrgu7aDTaABkMQPQhMkzIGCGujXD5532hlf2OQ-uzxsLx7UXbelxALC92XsW8frXTH766BCldQcj1vBXdpv_qurESuQ-WGdvuJ1x67IMAZQyz1TKiXwmT88VSI3Ubk8M8GYptn-gYEbDHR2IwT6lTQTScSovKDXVfm4s-RRu7KAH3sX8rCDHk_DsWKr8f1naWJ0zNFulLWJarg0T0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZJ9ItBYIlmHQYUIQHVCwzbhR1_6sMbrOOiVOi0xdWzRGJ5oBFQJlCmPrsnPx-TEr4mPKwDZXpJk18xH5WBXxA5WunjqgKnS-F3F2ilefKIYV1Z-AqNkawnM3VLxKCnOS4xroinGSA7qWWM14BkayTNw2wkFFFMJWEw0ahRxjRDcKAH05HYFOWryeHORjsXFtlz1V4-Oqib9u_B7eQTpPTm25jWWELj93ERtdRMafvlQHhaA4CFubwZCvE9OwfND5XaHzSdolBijUD'
    ],
    learningMode: 'OFFLINE',
    requirement: 'Sinh viên sư phạm hoặc giáo viên'
  },
  {
    id: 'jp2',
    title: 'Tiếng Anh Giao tiếp - Mất gốc',
    subject: 'Tiếng Anh',
    description: 'Học sinh mất gốc cần cải thiện giao tiếp tiếng Anh cơ bản.',
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'PRIORITY',
    location: 'Học Online',
    schedule: '3 ca/tuần',
    tutorGenderPreference: 'ANY',
    pricePerSession: 350000,
    applicantsCount: 3,
    applicantsAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAR-ItKUI9hfiTdpZcl_RBTR-k-gi1QpPl1ZUaQJyLYchj1uW5Tvu_wY7qfvKahK9IAYgYkCbfQ0bpnkQhUEq_JRmcR1ujgygTtr8V_GD9-6R08Purpzu-90yDT9i2BY4EVD4rSOo0bcNvdgvnl0KzAMVE-n7XHHGD5AtuG-jy4SSIqZPdjFxGjIZJhhu2r0YctmU9QLXl2CR5zpjANjvMG-EzvsVaiKJWl7nOctoB8u8quUcNNWi55Dgya59KOn-AI3gcdUjSsgFPF'
    ],
    learningMode: 'ONLINE',
    requirement: 'IELTS 7.0+'
  }
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'a1',
    jobId: 'jp1',
    tutorId: 't1',
    tutorName: 'Trần Minh Anh',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK8lhUpNKWMGZdwWdGo_4FXgZVfv-aK31m5zmy7y8iz5aXDOxZWxztDZo4o_BOMqXLIurd0OH9J4k_1g8FSatf8iIppQSW74L8s3wRv2_kyTuBfODLMUlUytLQHza3mGMHWAxV95EG7cBn1ca0ax5WPK72RNEZscgIYi38t-j1-96iByOZpte1JuR9fgKm9nvJaalo1lQnCPtb5AInRo0G8wLhrQes8UdGrCGy8ZTy2QvbpLZWIIbP9T7vlO1lyoxURHsc97jRjRSd',
    tutorTitle: 'ĐH Sư Phạm TP.HCM',
    tutorRating: 4.9,
    tutorReviews: 124,
    appliedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    status: 'PENDING'
  },
  {
    id: 'a2',
    jobId: 'jp2',
    tutorId: 't2',
    tutorName: 'Nguyễn Hoàng Nam',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv5jTZIiacbQcrXMyddJos4A_F0tTGTDrn6nQYU1bvfZBUECqSNuDfuSRVRk6CHmJdNEmn1FTzLeFAZ7AJORoMVX0wf-XoYRY7T-gnwLlIhXdGvNBZr696ICRcbjAXas20ZhL7v0-Xepxv7hnth1b-6nBnmGOrcwl93tKYtdUN7Bbz81fugRnDC3tlmvblwb7p9yOAxsDMGxy4JrMLkPnDaaTC22xHjLj99TuuQZ5M8fLDX3T6HnDx4xN-MFDXzPfIykkhst8bQnNX',
    tutorTitle: 'IELTS 8.5 - 5 năm KN',
    tutorRating: 5.0,
    tutorReviews: 86,
    appliedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'PENDING'
  }
];

export const MOCK_CLASSES: ClassSession[] = [
  {
    id: 'c1',
    className: 'Toán lớp 10 - Nâng cao',
    tutorName: 'Lê Thị Thanh',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcyLV-pbCBKDruyPCKCIM4TqRUMe6owsX04_nA7hfv7pkavDnwNb5qh6nKmjn0waHKwRaliXWc7bwcZdJjX7_KOXYpPyx3f7zcV2w3yuFYUc-oA2zb1MCSVTCrkgmFmt_dxPUpoQVOozyI2HLAtv-0s7NyjJK3tcu9VO8-oPwPb8OAGd_JWbWmzlUleayZJrT7fX4p9bgRArPDwTI_9mZHP6xMlK2uJzakJzfSY7-A8CCmnMoZTVWGOf3vVH2xyclpDoC7hf06Qcc',
    schedule: 'Thứ 2, Thứ 4 - 18:00',
    status: 'OFFICIAL',
    nextSessionDate: '2026-06-05T18:00:00Z',
    progress: 40
  },
  {
    id: 'c2',
    className: 'Tiếng Anh Giao tiếp - Lớp 7',
    tutorName: 'Trần Minh Anh',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK8lhUpNKWMGZdwWdGo_4FXgZVfv-aK31m5zmy7y8iz5aXDOxZWxztDZo4o_BOMqXLIurd0OH9J4k_1g8FSatf8iIppQSW74L8s3wRv2_kyTuBfODLMUlUytLQHza3mGMHWAxV95EG7cBn1ca0ax5WPK72RNEZscgIYi38t-j1-96iByOZpte1JuR9fgKm9nvJaalo1lQnCPtb5AInRo0G8wLhrQes8UdGrCGy8ZTy2QvbpLZWIIbP9T7vlO1lyoxURHsc97jRjRSd',
    schedule: 'Thứ 3 - 19:00',
    status: 'TRIAL_WAITING',
    nextSessionDate: '2026-06-10T19:00:00Z',
    progress: 0
  },
  {
    id: 'c3',
    className: 'Vật lý 12 - Luyện thi',
    tutorName: 'Nguyễn Hoàng Nam',
    tutorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv5jTZIiacbQcrXMyddJos4A_F0tTGTDrn6nQYU1bvfZBUECqSNuDfuSRVRk6CHmJdNEmn1FTzLeFAZ7AJORoMVX0wf-XoYRY7T-gnwLlIhXdGvNBZr696ICRcbjAXas20ZhL7v0-Xepxv7hnth1b-6nBnmGOrcwl93tKYtdUN7Bbz81fugRnDC3tlmvblwb7p9yOAxsDMGxy4JrMLkPnDaaTC22xHjLj99TuuQZ5M8fLDX3T6HnDx4xN-MFDXzPfIykkhst8bQnNX',
    schedule: 'Thứ 5, Chủ Nhật - 20:00',
    status: 'TRIAL_PROGRESS',
    nextSessionDate: '2026-06-08T20:00:00Z',
    progress: 10
  }
];

export const MOCK_FEEDBACKS: ParentFeedback[] = [
  {
    id: 'f1',
    classId: 'c1',
    tutorId: 't1',
    rating: 5,
    comment: 'Gia sư rất nhiệt tình, bài giảng sinh động và dễ hiểu. Con tôi đã tiến bộ rõ rệt chỉ sau 5 ca học. Rất hài lòng với chất lượng giảng dạy của thầy.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'f2',
    classId: 'c2',
    tutorId: 't2',
    rating: 4,
    comment: 'Cô giáo giảng bài kỹ, nắm bắt được tâm lý học sinh. Tuy nhiên đôi khi bài tập về nhà hơi nhiều khiến con hơi áp lực. Tổng quan vẫn là một lựa chọn tốt.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  }
];
