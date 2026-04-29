export interface Member {
  id: string;
  name: string;
  email: string;
  university: string;
  isReturning: boolean;
  skillLevel: number;
  upi?: string;
  studentId?: string;
  faculty?: string[];
  programme?: string;
  yearLevel?: string;
  excerpt?: string;
  pitch?: string;
  potentialInvolvement?: string;
  discordUser?: string;
}
