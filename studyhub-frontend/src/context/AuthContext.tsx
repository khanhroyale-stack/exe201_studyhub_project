import React, { createContext, useContext, useState, useCallback } from 'react';

type Role = 'parent' | 'tutor' | 'admin' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Khởi tạo từ localStorage để giữ state qua refresh
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('sh_logged_in') === 'true';
  });
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem('sh_role') as Role) || null;
  });

  const login = useCallback((userRole: Role) => {
    setIsLoggedIn(true);
    setRole(userRole);
    localStorage.setItem('sh_logged_in', 'true');
    localStorage.setItem('sh_role', userRole ?? '');
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem('sh_logged_in');
    localStorage.removeItem('sh_role');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
