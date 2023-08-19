export interface ResumeResponse {
  success: boolean;
  code: number;
  message: string;
  data: ResumeData;
}

export interface ResumeData {
  content: ResumeItem[];
  pageable: Pageable;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  lastId: number;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ResumeItem {
  id: number;
  introduce: string;
  photoUrl: string;
  occupation: string;
  isOpened: boolean;
  name: string;
  certificates: Certificate[];
  careers: Career[];
  educations: Education[];
  viewCount?: number;
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
