export interface ClassDto {
  id: number;
  title: string;
  rating: string;
  location: string;
  locationType: string; // e.g. 'location_on', 'videocam'
  tutorName: string;
  tutorDesc: string;
  tutorAvatar: string;
  price: string; // e.g. '350.000đ/buổi'
  image: string;
  description?: string;
  schedule?: string; // e.g. '3 buổi/tuần (T2-4-6)'
  requirements?: string[];
  tutorExperience?: string;
  tutorVerified?: boolean;
  duration?: string; // e.g. '120 phút'
  sessionTime?: string; // e.g. '18:30 - 20:30'
  totalSessions?: string; // e.g. '24 buổi'
  maxStudents?: number;
  currentStudents?: number;
  subject?: string;
}
