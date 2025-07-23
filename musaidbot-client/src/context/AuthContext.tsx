// src/context/AuthContext.tsx
import  {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

// --- تعريف نوع المستخدم
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  merchantId: string | null;
  firstLogin: boolean;
      storeName?: string;
    storeLogoUrl?: string;
    storeAvatarUrl?: string; // إذا أردت
}

// --- تعريف الـ Context Type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// --- إنشاء السياق
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  // 1. نقرأ من localStorage قبل أول رندر
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const str = localStorage.getItem("user");
    return str ? JSON.parse(str) : null;
  });

  // 2. دالة تسجيل الدخول
  const login = (userData: User, tokenValue: string) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));

    // توجيه حسب أول دخول
    if (userData.firstLogin) {
      navigate("/onboarding");
    } else {
      navigate("/dashboard");
    }
  };

  // 3. دالة تسجيل الخروج
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// هوك الاستهلاك
export const useAuth = () => useContext(AuthContext);
