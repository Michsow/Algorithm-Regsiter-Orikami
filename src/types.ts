export interface Patient {
  _id?: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  status: string;
  created: string;
  assessments?: number;
}

export interface Result {
  _id?: string;
  Patients_ID: string;
  Created_date: string;
  Algorithm_ID: string;
  Assessor: string;
  Assessment_Status: string;
  Risk_Level: string;
  Probability: number | string;
}