import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'industry';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'farmer' | 'industry') => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: 'farmer' | 'industry') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize user state immediately from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedUser = localStorage.getItem('agrigrow_user');
        return savedUser ? JSON.parse(savedUser) : null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false); // Start with false since we initialize immediately

  // Debug user state changes
  useEffect(() => {
    console.log('User state changed:', { user, isAuthenticated: !!user });
  }, [user]);

  const login = async (email: string, password: string, role: 'farmer' | 'industry'): Promise<boolean> => {
    console.log('Login attempt:', { email, role });
    setLoading(true);

    try {
      // Simulate API call - shortened for faster response
      console.log('Starting login simulation...');
      await new Promise(resolve => setTimeout(resolve, 300));

      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role
      };

      console.log('Setting user data:', userData);

      // Set localStorage first
      localStorage.setItem('agrigrow_user', JSON.stringify(userData));

      // Then update state immediately
      setUser(userData);
      setLoading(false);

      console.log('Login successful - user state updated');
      console.log('Final auth state:', { user: userData, isAuthenticated: true });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'farmer' | 'industry'): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role
      };
      
      setUser(userData);
      localStorage.setItem('agrigrow_user', JSON.stringify(userData));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrigrow_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
