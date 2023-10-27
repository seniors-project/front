export interface MeResumeResponse {
  success: boolean;
  code: number;
  message: string;
  data: MeResumeData;
}

export interface MeResumeData {
  id: number;
  introduce: string;
  photoUrl: string;
  occupation: string;
  isOpened: boolean;
  name: string;
  viewCount: number;
  certificates: Certificate[];
  careers: Career[];
  educations: Education[];
}

export interface Education {
  id: number;
  institution: string;
  process: string;
  startedAt: number;
  endedAt: number;
  content: string;
  isProcessed: boolean;
}

export interface Career {
  id: number;
  startedAt: number;
  endedAt: number;
  company: string;
  title: string;
  isAttendanced: boolean;
  content: string;
}

export interface Certificate {
  id: number;
  name: string;
  rating: string;
  issuedYear: number;
  issuedMonth: number;
  isIssued: boolean;
}
