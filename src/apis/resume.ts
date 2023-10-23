import { httpClient } from '@/lib/httpClient';
import { ResumeResponse } from '@/types/resume';
import { ResumeForm } from '@/types/resumeForm';
import { MeResumeResponse } from '@/types/meResume';

export const getResumes = async (lastId?: number) => {
  const response = await httpClient.get<ResumeResponse>(
    `/resumes?size=3&lastId=${lastId ? `${lastId}` : ''}`,
  );
  return response.data;
};

export const postResume = async (data: ResumeForm) => {
  const { image, ...rest } = data;

  const formdata = new FormData();
  formdata.append('image', image);
  formdata.append(
    'data',
    new Blob([JSON.stringify(rest)], { type: 'application/json' }),
  );

  const response = await httpClient.post<ResumeForm>('/resumes', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const getMeResume = async () => {
  const response = await httpClient.get<MeResumeResponse>('/resumes/mine');

  return response.data;
};
