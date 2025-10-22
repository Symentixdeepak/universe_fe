// Auth API service for external signup endpoint
const API_BASE_URL = 'https://sbvx0z24-3005.inc1.devtunnels.ms/api/v1';

export interface SignupRequest {
  email: string;
  password: string;
  password_confirmation: string;
  full_name: string;
  date_of_birth: string; // YYYY-MM-DD format
  location: string;
  occupation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  date_of_birth: string;
  location: string;
  occupation: string;
}

export interface SignupResponse {
  success: boolean;
  data: {
    tokens: TokenData;
    user: User;
  };
  message: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    tokens: TokenData;
    user: User;
  };
  message: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    tokens: TokenData;
  };
  message: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: any;
}

// Login API call
export async function loginUser(data: LoginRequest): Promise<LoginResponse | ApiError> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.message || `HTTP error! status: ${response.status}`,
        details: responseData,
      };
    }

    return {
      success: true,
      data: responseData.data,
      message: responseData.message || 'Login successful',
    };
  } catch (error) {
    console.error('Login API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Signup API call
export async function signupUser(data: SignupRequest): Promise<SignupResponse | ApiError> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.message || `HTTP error! status: ${response.status}`,
        details: responseData,
      };
    }

    return {
      success: true,
      data: responseData.data,
      message: responseData.message || 'Signup successful',
    };
  } catch (error) {
    console.error('Signup API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Refresh token API call
export async function refreshUserToken(refreshToken: string): Promise<RefreshTokenResponse | ApiError> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.message || `HTTP error! status: ${response.status}`,
        details: responseData,
      };
    }

    return {
      success: true,
      data: responseData.data,
      message: responseData.message || 'Token refreshed successfully',
    };
  } catch (error) {
    console.error('Refresh token API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Helper function to check if token needs refresh (4 hours before expiry)
export function shouldRefreshToken(expiresIn: number, issuedAt: number): boolean {
  const now = Date.now();
  const expiryTime = issuedAt + (expiresIn * 1000);
  const fourHoursInMs = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  
  return (expiryTime - now) <= fourHoursInMs;
}

// Calculate when the token was issued (approximation)
export function getTokenIssuedAt(): number {
  return Date.now();
}