import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'client' | 'employee' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('agency_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {
    // Mock login logic
    let newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'employee' ? 'Employee User' : role === 'admin' ? 'Admin User' : 'Client User',
      email,
      role
    };
    
    // For specific requested credentials
    if (role === 'employee' && email === 'EMP001') {
        newUser.name = "John Doe (Employee)";
    }

    setUser(newUser);
    localStorage.setItem('agency_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agency_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
