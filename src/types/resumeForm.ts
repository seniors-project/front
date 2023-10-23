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
  startedAt: number | null;
  endedAt: number | null;
  company: string;
  title: string;
  isAttendanced: boolean;
  content: string;
}

export interface ResumeFormEducation {
  institution: string;
  process: string;
  startedAt: number | null;
  endedAt: number | null;
  content: string;
  isProcessed: boolean;
}

export interface ResumeFormCertificate {
  name: string;
  rating: string;
  issuedYear: number | null;
  issuedMonth: number | null;
  isIssued: boolean;
}
