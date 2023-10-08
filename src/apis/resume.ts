import { httpClient } from '@/lib/httpClient';
import { ResumeResponse } from '@/types/resume';
import { ResumeForm } from '@/types/resumeForm';
import { MeResumeResponse } from '@/types/meResume';

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

export const postResume = async (token: string, data: ResumeForm) => {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, (data as any)[key]);
  }

  const response = await httpClient.post<ResumeForm>('/resumes', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const getMeResume = async (token: string) => {
  const response = await httpClient.get<MeResumeResponse>('/resumes/mine', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
