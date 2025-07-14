import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "manager" | "staff";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users for demo
  const mockUsers: Record<string, { password: string; user: User }> = {
    "admin@company.com": {
      password: "admin123",
      user: {
        id: "1",
        email: "admin@company.com",
        name: "Sarah Johnson",
        role: "admin",
        department: "Administration",
      },
    },
    "manager@company.com": {
      password: "manager123",
      user: {
        id: "2",
        email: "manager@company.com",
        name: "Mike Chen",
        role: "manager",
        department: "Operations",
      },
    },
    "staff@company.com": {
      password: "staff123",
      user: {
        id: "3",
        email: "staff@company.com",
        name: "Emily Davis",
        role: "staff",
        department: "Sales",
      },
    },
  };

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem("currentUser", JSON.stringify(mockUser.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
