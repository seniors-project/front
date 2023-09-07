export interface ResumeForm {
  introduce: string;
  image: File;
  occupation: string;
  isOpened: boolean;
  name: string;
  certificateList: ResumeFormCertificate[];
  educationList: ResumeFormEducation[];
  careerList: ResumeFormCareer[];
}

export interface ResumeFormCareer {
  startedAt: number;
  endedAt: number;
  company: string;
  title: string;
  isAttendanced: boolean;
  content: string;
}

export interface ResumeFormEducation {
  institution: string;
  process: string;
  startedAt: number;
  endedAt: number;
  content: string;
  isProcessed: boolean;
}

export interface ResumeFormCertificate {
  name: string;
  rating: string;
  issuedYear: number;
  issuedMonth: number;
  isIssued: boolean;
}
