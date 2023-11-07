import { httpClient } from '@/lib/httpClient';

export function chatInquiry(page: number, offset: number) {
  return httpClient.get(`chat/rooms?page=${page}&offset=${offset}`);
}

export async function getChatList() {
  const response = await httpClient.get('chat/rooms');
  return response;
}

export function chatEnter(id: number) {
  return httpClient.get(`chat/rooms/${id}`);
}

export function setCreateChatRoom(chatUserId: number) {
  return httpClient.post(`chat/rooms`, { chatUserId });
}

export function setDeleteChatRoom(chatRoomId: number) {
  return httpClient.delete(`chat/rooms/${chatRoomId}`);
}
