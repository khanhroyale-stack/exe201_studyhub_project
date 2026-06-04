export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  budgetSpentThisMonth: number;
  classesWaiting: number;
}

export interface JobPosting {
  id: string;
  title: string;
  subject: string;
  description: string;
  postedAt: string; // ISO date string
  status: 'RECRUITING' | 'CLOSED' | 'PRIORITY';
  location: string;
  schedule: string;
  tutorGenderPreference: 'MALE' | 'FEMALE' | 'ANY';
  pricePerSession: number;
  applicantsCount: number;
  applicantsAvatars: string[];
  learningMode: 'ONLINE' | 'OFFLINE';
  requirement: string;
}

export interface Applicant {
  id: string;
  jobId: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  tutorTitle: string;
  tutorRating: number;
  tutorReviews: number;
  appliedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface ClassSession {
  id: string;
  className: string;
  tutorName: string;
  tutorAvatar: string;
  schedule: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  nextSessionDate: string;
  progress: number;
}

export interface ParentFeedback {
  id: string;
  classId: string;
  tutorId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
