import { httpClient } from '@/lib/httpClient';

export function chatInquiry(page: number, offset: number) {
  return httpClient.get(`chat/rooms?page=${page}&offset=${offset}`);
}

export function getChatList(token: string) {
  return httpClient.get('chat/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function chatEnter(token: string, id: number) {
  return httpClient.get(`chat/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function setCreateChatRoom(token: string, chatUserId: number) {
  return httpClient.post(
    `chat/rooms`,
    { chatUserId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export function setDeleteChatRoom(token: string, chatRoomId: number) {
  return httpClient.delete(`chat/rooms/${chatRoomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
