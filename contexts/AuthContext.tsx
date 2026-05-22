'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut 
} from 'firebase/auth';

export type UserRole = 'student' | 'teacher' | 'admin' | 'driver';

export interface User {
  id: string;
  phone: string;
  fullName: string;
  role: UserRole;
  institution: string;
  faculty: string;
  cardNumber: string;
  qrCode: string;
  subscription: 'daily' | 'weekly' | 'monthly';
  validUntil: string;
  homePoint: string;
  preferredRoute: string;
  email?: string;
  documents?: string[];
  createdAt: string;
  isApproved?: boolean;
  firebaseUser?: FirebaseUser;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithFirebase: (firebaseUser: FirebaseUser, userData?: Partial<User>) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'firebaseUser'>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in with Firebase
        // Try to get user data from localStorage or create new user
        const storedUserData = localStorage.getItem(`user_${firebaseUser.phoneNumber}`);
        
        if (storedUserData) {
          const userData: User = JSON.parse(storedUserData);
          setUser({ ...userData, firebaseUser });
        } else {
          // Create new user with minimal data
          const newUser: User = {
            id: firebaseUser.uid,
            phone: firebaseUser.phoneNumber || '',
            fullName: '',
            role: 'student',
            institution: '',
            faculty: '',
            cardNumber: '',
            qrCode: '',
            subscription: 'daily',
            validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            homePoint: '',
            preferredRoute: '',
            createdAt: new Date().toISOString(),
            isApproved: false,
            firebaseUser,
          };
          setUser(newUser);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithFirebase = async (firebaseUser: FirebaseUser, userData?: Partial<User>) => {
    setIsLoading(true);
    try {
      // Check if user exists in localStorage
      const storedUserData = localStorage.getItem(`user_${firebaseUser.phoneNumber}`);
      
      if (storedUserData) {
        const existingUser: User = JSON.parse(storedUserData);
        setUser({ ...existingUser, firebaseUser });
      } else if (userData) {
        // Create new user with provided data
        const newUser: User = {
          id: firebaseUser.uid,
          phone: firebaseUser.phoneNumber || '',
          fullName: userData.fullName || '',
          role: userData.role || 'student',
          institution: userData.institution || '',
          faculty: userData.faculty || '',
          cardNumber: userData.cardNumber || `UNIMOVE-2026-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
          qrCode: userData.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${firebaseUser.phoneNumber}`,
          subscription: userData.subscription || 'daily',
          validUntil: userData.validUntil || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          homePoint: userData.homePoint || '',
          preferredRoute: userData.preferredRoute || '',
          email: userData.email,
          documents: userData.documents,
          createdAt: new Date().toISOString(),
          isApproved: false,
          firebaseUser,
        };
        
        // Save to localStorage
        localStorage.setItem(`user_${firebaseUser.phoneNumber}`, JSON.stringify(newUser));
        setUser(newUser);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'firebaseUser'>) => {
    setIsLoading(true);
    try {
      // This will be called after Firebase auth is successful
      // The actual user creation is handled in loginWithFirebase
      // This function is kept for backward compatibility
      const newUser: User = {
        ...userData,
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        isApproved: false,
      };
      
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      if (user?.phone) {
        localStorage.removeItem(`user_${user.phone}`);
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if Firebase logout fails
      if (user?.phone) {
        localStorage.removeItem(`user_${user.phone}`);
      }
      setUser(null);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      if (user.phone) {
        localStorage.setItem(`user_${user.phone}`, JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithFirebase,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
