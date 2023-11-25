import { httpClient } from '@/lib/httpClient';
import axios from 'axios';

export async function getNewsfeedList() {
  const response = await httpClient.get(`posts?page=1&size=4`);
  return response.data;
  
}

export function getNewsfeed(postId: number) {
  return httpClient.get(`posts/${postId}`);
}

export function postNewsfeed() {
  return httpClient.post(`posts`);
}

export function patchNewsfeed(postId: number) {
    return httpClient.patch(`posts/${postId}`);
  }

export function deleteNewsfeed(postId: number) {
  return httpClient.delete(`posts/${postId}`);
}