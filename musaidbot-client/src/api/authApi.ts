import axios from 'axios';
import { API_BASE } from '../context/config';

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'MERCHANT' | 'MEMBER';
    merchantId: string|null;
    firstLogin: boolean;
        storeName?: string;
    storeLogoUrl?: string;
    storeAvatarUrl?: string; // إذا أردت
  };
}


// تسجيل الدخول
export const loginAPI = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${API_BASE}/auth/login`, { email, password });
  return res.data;
};

// إنشاء الحساب
// api/authApi.ts
export const signUpAPI = async (
  name: string,
  email: string,
  password: string,
 confirmPassword: string
): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(
    `${API_BASE}/auth/register`,
    { name, email, password, confirmPassword }
  );
  return res.data;
};

