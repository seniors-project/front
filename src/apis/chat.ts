import { httpClient } from '@/lib/httpClient';

export function chatInquiry(page: number, offset: number) {
  return httpClient.get(`/rooms?page=${page}&offset=${offset}`);
}

export function getChatList(token: string) {
  return httpClient.get('/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function chatEnter(token: string, id: number) {
  return httpClient.get(`/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function setCreateChatRoom(token: string, chatUserId: number) {
  return httpClient.post(
    `/rooms`,
    { chatUserId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
