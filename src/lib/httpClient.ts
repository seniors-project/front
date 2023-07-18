import axios, { InternalAxiosRequestConfig } from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://strangehoon.shop/api',
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return config;

  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});
