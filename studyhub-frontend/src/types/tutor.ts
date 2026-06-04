export interface TutorDto {
  id: number;
  name: string;
  rating: string;
  title: string;
  description: string;
  tags: string[];
  price: string;
  avatar: string;
  verified?: boolean;
}
