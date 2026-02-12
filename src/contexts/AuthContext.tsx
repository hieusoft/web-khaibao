import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials, LoginResponse, TokenPayload, ProfileData } from '@/types/auth';
import { api, getAccessToken, saveAccessToken, clearTokens, isTokenExpired, profileApi } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  profile: ProfileData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isProfileLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  fetchProfile: () => Promise<ProfileData | null>;
  updateProfile: (data: Partial<ProfileData>) => Promise<ProfileData>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token refresh interval (check every 5 minutes)
const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000;

// Create user from API response and token payload
const createUserFromResponse = (data: LoginResponse['data'], accessToken: string): User => {
  const payload = JSON.parse(atob(accessToken.split('.')[1])) as TokenPayload;

  return {
    id: payload.uid,
    username: payload.login,
    name: data.company_name || 'User',
    role: payload.type || 'user',
    company_id: data.company_id,
    company_name: data.company_name,
    tax_code: data.tax_code,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  // Initialize auth state from stored tokens
  const initializeAuth = useCallback(async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    // Check if access token is expired
    if (isTokenExpired(accessToken)) {
      // Try to refresh the token
      try {
        await doRefreshToken();
      } catch {
        // Refresh failed, clear tokens
        clearTokens();
        setUser(null);
      }
    } else {
      // Token is valid, decode and set user
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1])) as TokenPayload;
        setUser({
          id: payload.uid,
          username: payload.login,
          name: payload.login,
          role: payload.type || 'user',
        });
      } catch {
        clearTokens();
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();

    // Set up periodic token refresh check
    const intervalId = setInterval(() => {
      const accessToken = getAccessToken();
      if (accessToken && isTokenExpired(accessToken)) {
        doRefreshToken().catch(() => {
          // Silent fail, logout will be triggered by interceptor
        });
      }
    }, TOKEN_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [initializeAuth]);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    const { data } = response;
    
    // Save access token to localStorage
    saveAccessToken(data.access_token);
    
    // Create user from response
    const userData = createUserFromResponse(data, data.access_token);
    setUser(userData);
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    const response = await api.post<LoginResponse>('/auth/register', credentials);
    const { data } = response;
    
    // Save access token to localStorage
    saveAccessToken(data.access_token);
    
    // Create user from response
    const userData = createUserFromResponse(data, data.access_token);
    setUser(userData);
  };

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    setProfile(null);
    // Optional: Call logout API endpoint
    // await api.post('/auth/logout');
  }, []);

  const doRefreshToken = useCallback(async (): Promise<void> => {
    const response = await api.post<LoginResponse>('/auth/refresh');
    const { data } = response;
    
    // Save new access token
    saveAccessToken(data.access_token);
    
    // Update user
    const userData = createUserFromResponse(data, data.access_token);
    setUser(userData);
  }, []);

  const fetchProfile = useCallback(async (): Promise<ProfileData | null> => {
    setIsProfileLoading(true);
    try {
      const response = await profileApi.get();
      if (response.success && response.data) {
        setProfile(response.data);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return null;
    } finally {
      setIsProfileLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<ProfileData>): Promise<ProfileData> => {
    const response = await profileApi.update(data);
    if (response.success && response.data) {
      setProfile(response.data);
      return response.data;
    }
    throw new Error(response.message || 'Failed to update profile');
  }, []);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<void> => {
    const response = await profileApi.updatePassword(currentPassword, newPassword);
    if (!response.success) {
      throw new Error(response.message || 'Failed to update password');
    }
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    isProfileLoading,
    login,
    register,
    logout,
    refreshToken: doRefreshToken,
    fetchProfile,
    updateProfile,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
