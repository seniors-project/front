import { httpClient } from '@/lib/httpClient';
import { userValidate } from './auth';
import { postForm } from '../types/newsfeed';

export async function getNewsfeedList() {
  const response = await httpClient.get(`/posts?page=1&size=4`);
  return response.data;
}

export function getNewsfeed(postId: number) {
  return httpClient.get(`posts/${postId}`);
}

export async function postNewsfeed(data: postForm) {
  const formdata = new FormData();

  const response = await httpClient.post('/posts', formdata);

  return response;
}

export function patchNewsfeed(postId: number) {
  return httpClient.patch(`posts/${postId}`);
}

export function deleteNewsfeed(postId: number) {
  return httpClient.delete(`posts/${postId}`);
}
