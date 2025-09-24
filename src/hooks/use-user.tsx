'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

// Mock User object
const mockUser: User = {
  uid: 'mock-user-id',
  email: 'test@example.com',
  displayName: 'Mock User',
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  },
  providerData: [],
  providerId: 'password',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'mock-id-token',
  getIdTokenResult: async () => ({
    token: 'mock-id-token',
    expirationTime: new Date().toISOString(),
    authTime: new Date().toISOString(),
    issuedAtTime: new Date().toISOString(),
    signInProvider: null,
    signInSecondFactor: null,
    claims: {},
  }),
  reload: async () => {},
  toJSON: () => ({}),
};


interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = localStorage.getItem('mock-session');
    if (session) {
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== '/login') {
      router.push('/login');
    }
     if (!loading && user && pathname === '/login') {
      router.push('/');
    }
  }, [user, loading, router, pathname]);

  const logout = () => {
    localStorage.removeItem('mock-session');
    setUser(null);
    router.push('/login');
  }

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {loading ? (
          <div className="flex h-screen w-full items-center justify-center">
            Loading...
          </div>
        ) : children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
