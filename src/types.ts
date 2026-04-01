export interface Patient {
  _id?: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  status: string;
  doctor: string;
  Created: string;
  Assessments?: number;
}