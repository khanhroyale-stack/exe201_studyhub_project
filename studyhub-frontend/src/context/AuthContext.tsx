import React, { createContext, useContext, useState, useCallback } from 'react';

type Role = 'parent' | 'tutor' | 'admin' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  role: Role;
  name: string | null;
  email: string | null;
  avatar: string | null;
  login: (token: string, role: Role, name: string | null, email: string | null, avatar: string | null) => void;
  logout: () => void;
  updateProfile: (name: string | null, avatar: string | null) => void;
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
  const [name, setName] = useState<string | null>(() => {
    return localStorage.getItem('sh_name') || null;
  });
  const [email, setEmail] = useState<string | null>(() => {
    return localStorage.getItem('sh_email') || null;
  });
  const [avatar, setAvatar] = useState<string | null>(() => {
    return localStorage.getItem('sh_avatar') || null;
  });

  const login = useCallback((token: string, userRole: Role, userName: string | null, userEmail: string | null, userAvatar: string | null) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setName(userName);
    setEmail(userEmail);
    setAvatar(userAvatar);
    localStorage.setItem('sh_logged_in', 'true');
    localStorage.setItem('sh_role', userRole ?? '');
    localStorage.setItem('sh_token', token);
    if (userName) localStorage.setItem('sh_name', userName);
    if (userEmail) localStorage.setItem('sh_email', userEmail);
    if (userAvatar) localStorage.setItem('sh_avatar', userAvatar);
  }, []);

  const updateProfile = useCallback((newName: string | null, newAvatar: string | null) => {
    if (newName) {
      setName(newName);
      localStorage.setItem('sh_name', newName);
    }
    if (newAvatar) {
      setAvatar(newAvatar);
      localStorage.setItem('sh_avatar', newAvatar);
    }
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setRole(null);
    setName(null);
    setEmail(null);
    setAvatar(null);
    localStorage.removeItem('sh_logged_in');
    localStorage.removeItem('sh_role');
    localStorage.removeItem('sh_token');
    localStorage.removeItem('sh_name');
    localStorage.removeItem('sh_email');
    localStorage.removeItem('sh_avatar');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, name, email, avatar, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
