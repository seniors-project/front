import { httpClient } from '@/lib/httpClient';
import { ResumeResponse } from '@/types/resume';

export const getResumes = async (token: string) => {
  const response = await httpClient.get<ResumeResponse>(
    '/resumes?size=3&lastId=',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
