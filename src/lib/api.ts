import { toast } from 'react-hot-toast';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

// Request configuration interface
export interface RequestConfig extends RequestInit {
  showToast?: boolean;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      showSuccessToast = false,
      showErrorToast = true,
      ...requestConfig
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    
    // Default headers
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...requestConfig.headers,
    };

    try {
      const response = await fetch(url, {
        ...requestConfig,
        headers: defaultHeaders,
      });

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message: data.message || 'An error occurred',
          status: response.status,
          details: data,
        };

        if (showErrorToast) {
          toast.error(error.message);
        }

        throw error;
      }

      if (showSuccessToast && data.message) {
        toast.success(data.message);
      }

      return {
        data: data.data || data,
        message: data.message,
        status: response.status,
      };
    } catch (error) {
      const apiError = error as ApiError;
      
      if (showErrorToast && apiError.message) {
        toast.error(apiError.message);
      }

      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  // POST request
  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  // Upload file
  async upload<T>(
    endpoint: string,
    file: File,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    // Remove Content-Type header for FormData uploads
    const { headers = {}, ...restConfig } = config || {};
    const uploadHeaders = { ...headers } as Record<string, string>;
    delete uploadHeaders['Content-Type'];

    return this.request<T>(endpoint, {
      ...restConfig,
      method: 'POST',
      body: formData,
      headers: uploadHeaders,
    });
  }
}

// Create and export the API service instance
export const apiService = new ApiService(API_BASE_URL);

// Export the class for creating additional instances if needed
export { ApiService };