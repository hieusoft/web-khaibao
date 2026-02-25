import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ProfileData } from '@/types/auth';

// // API Configuration
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ksmatuy.icomm.vn/api';
const API_BASE_URL = 'http://localhost:8069/api';

const ACCESS_TOKEN_KEY = 'accessToken';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

// Flag to prevent multiple simultaneous token refresh attempts
let isRefreshing = false;
let failedRequestsQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];


const processQueue = (token: string | null, error: Error | null = null) => {
  failedRequestsQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token || '');
    }
  });
  failedRequestsQueue = [];
};

// Get tokens from storage
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Refresh token is stored in cookie by backend, no need to get from localStorage
export const getRefreshToken = (): string | null => {
  return null;
};

// Save tokens to storage - only access_token is stored in localStorage
// refresh_token is automatically stored in cookie by the backend
export const saveAccessToken = (accessToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

// Clear tokens from storage
export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

// Get time until token expires (in seconds)
export const getTokenTimeRemaining = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return Math.max(0, payload.exp - currentTime);
  } catch {
    return 0;
  }
};

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh on 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // If error is not 401 or request already retried, reject
    if (!error.response || (error.response as any).status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          resolve: (token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          },
          reject: (err: Error) => {
            reject(err);
          },
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call refresh token endpoint - refresh_token is in cookie automatically
      const response = await apiClient.post(`${API_BASE_URL}/auth/refresh`);

      // Response structure: { success, message, data: { access_token, refresh_token, token_type } }
      const access_token = response.data.data.access_token;

      // Save new access token
      saveAccessToken(access_token);

      // Process queued requests with new token
      processQueue(access_token, null);

      // Update original request with new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
      }

      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh failed, clear tokens and reject all queued requests
      processQueue(null, refreshError as Error);
      clearTokens();

      // Redirect to login
      window.location.href = '/login';

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// API methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

// Profile API
export const profileApi = {
  get: () =>
    apiClient.get<{ success: boolean; data: ProfileData }>('/companies/profile').then((res) => res.data),

  update: (data: Partial<ProfileData>) =>
    apiClient
      .patch<{ success: boolean; message: string; data: ProfileData }>('/companies/profile', data)
      .then((res) => res.data),

  updatePassword: (currentPassword: string, newPassword: string) =>
    apiClient
      .post<{ success: boolean; message: string }>('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      })
      .then((res) => res.data),
};

export const importApi = {
  getAll: (params?: any) =>
    apiClient.get('/purchase/list', { params }).then((res) => res.data),

  getById: (id: string | number) =>
    apiClient.get(`/purchase/${id}`).then((res) => res.data),

  create: (data: any) =>
    apiClient.post('/imports', data).then((res) => res.data),

  update: (id: string | number, data: any) =>
    apiClient.put(`/imports/${id}`, data).then((res) => res.data),

  delete: (id: string | number) =>
    apiClient.delete(`/imports/${id}`).then((res) => res.data),

  uploadFile: (formData: FormData) =>
    apiClient.post('/imports/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data),

  getDocumentStatus: (id: string | number) =>
    apiClient.get(`/import/document/${id}`).then((res) => res.data),
};

export { apiClient };
