import { httpClient } from '@/lib/httpClient';
import { ResumeResponse } from '@/types/resume';

export const getResumes = async (token: string, lastId?: number) => {
  const response = await httpClient.get<ResumeResponse>(
    `/resumes?size=3&lastId=${lastId ? `${lastId}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
