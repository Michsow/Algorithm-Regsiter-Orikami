export interface Patient {
  _id?: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  status: string;
  created: string;
  assessments?: number;
}