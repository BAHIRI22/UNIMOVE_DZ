'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

const stripUndefined = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const result: Record<string, any> = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) result[k] = v;
  });
  return result as Partial<T>;
};

export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '+213' + digits.slice(1);
  }
  if (digits.startsWith('213')) {
    return '+' + digits;
  }
  if (phone.startsWith('+')) {
    return phone;
  }
  return '+213' + digits;
};

export type UserRole = 'student' | 'teacher' | 'administrative' | 'driver' | 'admin' | 'superadmin';
export type VerificationStatus = 'pending' | 'approved' | 'verified' | 'rejected';
export type AccountStatus = 'pending' | 'active' | 'suspended';

export interface User {
  id: string;
  phone: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  role: UserRole;
  university?: string;
  institution: string;
  faculty?: string;
  facultyOrInstitute?: string;
  department?: string;
  speciality?: string;
  academicYear?: string;
  grade?: string;
  email?: string;
  wilaya?: string;
  daira?: string;
  commune?: string;
  departurePoint?: string;
  homePoint: string;
  verificationMethod?: 'university_email' | 'student_card' | 'work_badge' | 'certificate';
  verificationStatus: VerificationStatus;
  verificationDocumentUrl?: string;
  verificationDocumentType?: string;
  verificationDocumentName?: string;
  verificationSubmittedAt?: any;
  accountStatus: AccountStatus;
  verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  adminNote: string;
  cardNumber: string;
  qrCode: string;
  subscription: 'daily' | 'weekly' | 'monthly';
  validUntil: string;
  preferredRoute: string;
  documents?: string[];
  subscriptionStatus?: 'active' | 'inactive';
  subscriptionPlan?: string;
  subscriptionEndDate?: string;
  // Special needs fields
  specialNeeds?: boolean;
  specialNeedsType?: string;
  specialNeedsDocumentUrl?: string;
  specialNeedsDocumentName?: string;
  specialNeedsVerified?: boolean;
  requiresAssistant?: boolean;
  createdAt: string;
  updatedAt?: string;
  isApproved?: boolean;
  firebaseUser?: FirebaseUser;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  findUserByPhone: (phoneNumber: string) => Promise<User | null>;
  loginWithFirebase: (firebaseUser: FirebaseUser, userData?: Partial<User>) => Promise<User | null>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'firebaseUser'>) => Promise<void>;
  createFirestoreUser: (firebaseUser: FirebaseUser, userData: Partial<User>) => Promise<User>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeStoredUser = (data: any, firebaseUser?: FirebaseUser): User => ({
  id: data.id || firebaseUser?.uid || '',
  phone: data.phone || data.phoneNumber || firebaseUser?.phoneNumber || '',
  phoneNumber: data.phoneNumber || data.phone || firebaseUser?.phoneNumber || '',
  firstName: data.firstName || '',
  lastName: data.lastName || '',
  fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
  role: data.role || 'student',
  university: data.university || data.institution || '',
  institution: data.institution || data.university || '',
  faculty: data.faculty || data.facultyOrInstitute || '',
  facultyOrInstitute: data.facultyOrInstitute || data.faculty || '',
  department: data.department || '',
  speciality: data.speciality || '',
  academicYear: data.academicYear || '',
  grade: data.grade || '',
  email: data.email || '',
  wilaya: data.wilaya || '',
  daira: data.daira || '',
  commune: data.commune || '',
  departurePoint: data.departurePoint || data.homePoint || '',
  homePoint: data.homePoint || data.departurePoint || '',
  verificationMethod: data.verificationMethod || 'student_card',
  verificationStatus: data.verificationStatus || 'pending',
  verificationDocumentUrl: data.verificationDocumentUrl || '',
  verificationDocumentType: data.verificationDocumentType || '',
  verificationDocumentName: data.verificationDocumentName || '',
  verificationSubmittedAt: data.verificationSubmittedAt || null,
  accountStatus: data.accountStatus || 'pending',
  verified: data.verified === true ? true : false,
  status: data.status || 'pending',
  adminNote: data.adminNote || '',
  cardNumber: data.cardNumber || `UNIMOVE-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
  qrCode: data.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data.phoneNumber || data.phone || firebaseUser?.phoneNumber || ''}`,
  subscription: data.subscription || 'monthly',
  validUntil: data.validUntil || '',
  preferredRoute: data.preferredRoute || '',
  documents: data.documents || [],
  subscriptionStatus: data.subscriptionStatus || 'inactive',
  subscriptionPlan: data.subscriptionPlan || '',
  subscriptionEndDate: data.subscriptionEndDate || '',
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  isApproved: data.isApproved ?? (data.verified === true),
  firebaseUser,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const findUserByPhone = async (phoneNumber: string): Promise<User | null> => {
    // Build all possible phone formats to search
    const formats = new Set<string>();
    formats.add(phoneNumber);

    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.startsWith('213') && digits.length === 12) {
      formats.add('+' + digits);
      formats.add('0' + digits.slice(3));
    }
    if (digits.startsWith('0') && digits.length === 10) {
      formats.add('+213' + digits.slice(1));
    }
    if (digits.length === 9) {
      formats.add('+213' + digits);
      formats.add('0' + digits);
    }

    const searchFormats = Array.from(formats);

    // Detect demo admin phones (0550000000 or 0658513876)
    const isDemoAdmin =
      digits === '0550000000' || digits === '213550000000' || digits === '550000000' ||
      digits === '0658513876' || digits === '213658513876' || digits === '658513876';
    const isDemoDriver = digits === '0550000001' || digits === '213550000001' || digits === '550000001';

    let foundDoc: { id: string; data: any } | null = null;

    for (const fmt of searchFormats) {
      try {
        let usersQuery = query(collection(db, 'users'), where('phoneNumber', '==', fmt), limit(1));
        let snapshot = await getDocs(usersQuery);
        if (!snapshot.empty) {
          foundDoc = { id: snapshot.docs[0].id, data: snapshot.docs[0].data() };
          // [findUserByPhone] user found (phone hidden)
          break;
        }
        usersQuery = query(collection(db, 'users'), where('phone', '==', fmt), limit(1));
        snapshot = await getDocs(usersQuery);
        if (!snapshot.empty) {
          foundDoc = { id: snapshot.docs[0].id, data: snapshot.docs[0].data() };
          // [findUserByPhone] user found (phone hidden)
          break;
        }
      } catch (error) {
        console.error('Firestore user lookup error');
      }
    }

    // If demo admin phone, force-promote to admin role with verified+approved
    if (isDemoAdmin) {
      const isSecondAdmin = digits === '0658513876' || digits === '213658513876' || digits === '658513876';
      const adminPhone = isSecondAdmin ? '+213658513876' : '+213550000000';
      const adminName = isSecondAdmin
        ? { firstName: 'Admin', lastName: 'Second', fullName: 'Admin Second' }
        : { firstName: 'UNIMOVEDZ', lastName: '', fullName: 'UNIMOVEDZ' };
      const adminCard = isSecondAdmin ? 'UNIMOVE-ADMIN-0002' : 'UNIMOVE-ADMIN-0001';
      try {
        if (foundDoc) {
          const needsUpdate =
            foundDoc.data.role !== 'admin' ||
            foundDoc.data.verified !== true ||
            foundDoc.data.status !== 'approved';
          if (needsUpdate) {
            // [findUserByPhone] auto-promoting demo admin user
            await updateDoc(doc(db, 'users', foundDoc.id), {
              role: 'admin',
              verified: true,
              status: 'approved',
              verificationStatus: 'approved',
              accountStatus: 'active',
              isApproved: true,
              updatedAt: new Date().toISOString(),
            });
            foundDoc.data.role = 'admin';
            foundDoc.data.verified = true;
            foundDoc.data.status = 'approved';
            foundDoc.data.verificationStatus = 'approved';
            foundDoc.data.accountStatus = 'active';
            foundDoc.data.isApproved = true;
          }
        } else {
          // Create demo admin user
          const newId = `phone-${adminPhone.replace(/\D/g, '')}`;
          // [findUserByPhone] auto-creating demo admin user
          const adminData = {
            phone: adminPhone,
            phoneNumber: adminPhone,
            firstName: adminName.firstName,
            lastName: adminName.lastName,
            fullName: adminName.fullName,
            role: 'admin',
            university: 'UNIMOVE-DZ',
            institution: 'UNIMOVE-DZ',
            verificationMethod: 'work_badge',
            verificationStatus: 'approved',
            accountStatus: 'active',
            verified: true,
            status: 'approved',
            isApproved: true,
            adminNote: 'Demo admin user',
            cardNumber: adminCard,
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${adminPhone}`,
            subscription: 'monthly',
            validUntil: '',
            preferredRoute: '',
            homePoint: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', newId), adminData);
          foundDoc = { id: newId, data: adminData };
        }
      } catch (e) {
        console.error('[findUserByPhone] Failed to auto-promote/create demo admin');
      }
    }

    // If demo driver phone, force-promote to driver role
    if (isDemoDriver) {
      const driverPhone = '+213550000001';
      try {
        if (foundDoc) {
          const needsUpdate =
            foundDoc.data.role !== 'driver' ||
            foundDoc.data.verified !== true ||
            foundDoc.data.status !== 'approved';
          if (needsUpdate) {
            // [findUserByPhone] auto-promoting demo driver user
            await updateDoc(doc(db, 'users', foundDoc.id), {
              role: 'driver',
              verified: true,
              status: 'approved',
              verificationStatus: 'approved',
              accountStatus: 'active',
              isApproved: true,
              updatedAt: new Date().toISOString(),
            });
            foundDoc.data.role = 'driver';
            foundDoc.data.verified = true;
            foundDoc.data.status = 'approved';
            foundDoc.data.verificationStatus = 'approved';
            foundDoc.data.accountStatus = 'active';
            foundDoc.data.isApproved = true;
          }
        } else {
          // Create demo driver user
          const newId = `phone-${driverPhone.replace(/\D/g, '')}`;
          // [findUserByPhone] auto-creating demo driver user
          const driverUserData = {
            phone: driverPhone,
            phoneNumber: driverPhone,
            firstName: 'سفيان',
            lastName: 'دراجي',
            fullName: 'سفيان دراجي',
            role: 'driver',
            university: 'UNIMOVE-DZ',
            institution: 'UNIMOVE-DZ',
            verificationStatus: 'approved',
            accountStatus: 'active',
            verified: true,
            status: 'approved',
            isApproved: true,
            cardNumber: 'UNIMOVE-DRV-0001',
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${driverPhone}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', newId), driverUserData);
          foundDoc = { id: newId, data: driverUserData };
        }

        // Also ensure matching document exists in drivers collection
        const driversQuery = query(collection(db, 'drivers'), where('phoneNumber', '==', driverPhone));
        const drvSnapshot = await getDocs(driversQuery);
        if (drvSnapshot.empty) {
          // [findUserByPhone] auto-creating record in drivers collection
          await addDoc(collection(db, 'drivers'), {
            fullName: 'سفيان دراجي',
            phoneNumber: driverPhone,
            email: 'driver.sofiane@unimove.dz',
            licenseNumber: 'DZ-7728-16',
            role: 'driver',
            status: 'active',
            assignedVehicleId: '',
            createdAt: serverTimestamp(),
          });
        }
      } catch (e) {
        console.error('[findUserByPhone] Failed to auto-promote/create demo driver');
      }
    }

    if (foundDoc) {
      return normalizeStoredUser({ id: foundDoc.id, ...foundDoc.data });
    }

    // If not found in users, check drivers collection and auto-create a user record
    for (const fmt of searchFormats) {
      try {
        const drvQuery = query(collection(db, 'drivers'), where('phoneNumber', '==', fmt), limit(1));
        const drvSnap = await getDocs(drvQuery);
        if (!drvSnap.empty) {
          const drvData = drvSnap.docs[0].data();
          const newUserId = `phone-${fmt.replace(/\D/g, '')}`;
          const driverUserData = {
            phone: fmt,
            phoneNumber: fmt,
            firstName: drvData.fullName?.split(' ')[0] || 'Sofiane',
            lastName: drvData.fullName?.split(' ').slice(1).join(' ') || 'Deraji',
            fullName: drvData.fullName || 'سفيان دراجي',
            role: 'driver',
            university: 'UNIMOVE-DZ',
            institution: 'UNIMOVE-DZ',
            verificationStatus: 'approved',
            accountStatus: 'active',
            verified: true,
            status: 'approved',
            isApproved: true,
            cardNumber: `UNIMOVE-DRV-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${fmt}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', newUserId), driverUserData, { merge: true });
          return normalizeStoredUser({ id: newUserId, ...driverUserData });
        }
      } catch (e) {
        console.error('[findUserByPhone] Driver lookup error:', e);
      }
    }

    const localUser = typeof window !== 'undefined' ? localStorage.getItem(`user_${phoneNumber}`) : null;
    return localUser ? normalizeStoredUser(JSON.parse(localUser)) : null;
  };

  useEffect(() => {
    let active = true;
    const initializeAuth = async () => {
      setIsLoading(true);

      // Try to read from localStorage first
      if (typeof window !== 'undefined') {
        const storedPhone = localStorage.getItem('unimove_current_phone');
        const storedUserJson = localStorage.getItem('unimove_current_user');

        // [AuthContext] initializing auth

        let foundPhone = storedPhone;
        if (!foundPhone && storedUserJson) {
          try {
            const parsed = JSON.parse(storedUserJson);
            foundPhone = parsed.phoneNumber || parsed.phone;
          } catch (e) {}
        }

        if (foundPhone) {
          const normalized = normalizePhone(foundPhone);
          // [AuthContext] phone normalized

          try {
            // Use findUserByPhone which now searches multiple formats
            const u = await findUserByPhone(normalized);
            if (u && active) {
              // [AuthContext] user loaded from localStorage
              setUser(u);
              setIsLoading(false);
              return;
            }
          } catch (err) {
            console.error('[AuthContext] Error fetching user during init');
          }
        }
      }

      // Fallback to standard Firebase Auth state changed if not loaded from localStorage
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (!active) return;
        if (firebaseUser?.phoneNumber) {
          const existingUser = await findUserByPhone(firebaseUser.phoneNumber);
          if (existingUser) {
            const normalizedUser = { ...existingUser, firebaseUser };
            setUser(normalizedUser);
            if (typeof window !== 'undefined') {
              localStorage.setItem('unimove_current_phone', firebaseUser.phoneNumber);
              localStorage.setItem('unimove_current_user', JSON.stringify(existingUser));
            }
          } else {
            setUser(null);
          }
        } else {
          // If no firebaseUser and we couldn't load from localStorage above, reset user
          if (typeof window !== 'undefined' && !localStorage.getItem('unimove_current_phone')) {
            const isDev = process.env.NODE_ENV === 'development';
            if (isDev) {
              // [AuthContext] DEV MODE: no Firebase user but skipping reset
            }
            if (!isDev) {
              setUser(null);
            }
          }
        }
        setIsLoading(false);
      });

      return unsubscribe;
    };

    let unsub: any;
    initializeAuth().then((u) => {
      unsub = u;
    });

    return () => {
      active = false;
      if (unsub) unsub();
    };
  }, []);

  useEffect(() => {
    if (user?.id) {
      const sessionKey = 'unimove_welcome_played';
      if (typeof window !== 'undefined' && !sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, 'true');
        import('@/lib/sound').then(({ sound }) => {
          sound.playWelcome();
        });
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = onSnapshot(
      doc(db, 'users', user.id),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser((currentUser) => {
            if (!currentUser) return null;
            const updatedUser = normalizeStoredUser({ ...currentUser, ...data }, currentUser.firebaseUser);
            
            const hasChanges = 
              currentUser.subscriptionStatus !== updatedUser.subscriptionStatus ||
              currentUser.subscriptionPlan !== updatedUser.subscriptionPlan ||
              currentUser.subscriptionEndDate !== updatedUser.subscriptionEndDate ||
              currentUser.verificationStatus !== updatedUser.verificationStatus ||
              currentUser.verified !== updatedUser.verified ||
              currentUser.accountStatus !== updatedUser.accountStatus ||
              currentUser.validUntil !== updatedUser.validUntil ||
              currentUser.specialNeedsVerified !== updatedUser.specialNeedsVerified ||
              currentUser.fullName !== updatedUser.fullName;

            if (hasChanges) {
              if (typeof window !== 'undefined') {
                localStorage.setItem('unimove_current_user', JSON.stringify({ ...updatedUser, firebaseUser: undefined }));
              }
              return updatedUser;
            }
            return currentUser;
          });
        }
      },
      (error) => {
        console.error('[AuthContext] Real-time user sync error:', error);
      }
    );

    return () => unsubscribe();
  }, [user?.id]);

  const loginWithFirebase = async (firebaseUser: FirebaseUser, userData?: Partial<User>) => {
    setIsLoading(true);
    try {
      const phoneNumber = firebaseUser.phoneNumber || userData?.phoneNumber || userData?.phone || '';
      const existingUser = phoneNumber ? await findUserByPhone(phoneNumber) : null;
      if (existingUser) {
        const hydratedUser = { ...existingUser, firebaseUser };
        setUser(hydratedUser);
        if (typeof window !== 'undefined' && phoneNumber) {
          localStorage.setItem('unimove_current_phone', phoneNumber);
          localStorage.setItem('unimove_current_user', JSON.stringify(existingUser));
        }
        // Gentle success chime on successful login
        if (typeof window !== 'undefined') {
          import('@/lib/sound').then(({ sound }) => sound.playSuccess()).catch(() => {});
        }
        return hydratedUser;
      }
      if (userData) {
        const newUser = await createFirestoreUser(firebaseUser, userData);
        if (typeof window !== 'undefined' && phoneNumber) {
          localStorage.setItem('unimove_current_phone', phoneNumber);
          localStorage.setItem('unimove_current_user', JSON.stringify(newUser));
        }
        // Success sound for first-time account creation
        if (typeof window !== 'undefined') {
          import('@/lib/sound').then(({ sound }) => sound.playSuccess()).catch(() => {});
        }
        return newUser;
      }
      setUser(null);
      // Error tone when authentication could not resolve a user
      if (typeof window !== 'undefined') {
        import('@/lib/sound').then(({ sound }) => sound.playError()).catch(() => {});
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createFirestoreUser = async (firebaseUser: FirebaseUser, userData: Partial<User>) => {
    const now = new Date().toISOString();
    const phoneNumber = firebaseUser.phoneNumber || userData.phoneNumber || userData.phone || '';
    const newUser = normalizeStoredUser({
      ...userData,
      id: firebaseUser.uid,
      phone: phoneNumber,
      phoneNumber,
      verificationStatus: 'pending',
      accountStatus: 'pending',
      verified: false,
      status: 'pending',
      subscriptionStatus: 'inactive',
      adminNote: userData.adminNote || '',
      createdAt: now,
      updatedAt: now,
    }, firebaseUser);

    const firestorePayload = stripUndefined({ ...newUser, firebaseUser: undefined });
    await setDoc(doc(db, 'users', firebaseUser.uid), firestorePayload, { merge: true });

    if (typeof window !== 'undefined') {
      localStorage.setItem(`user_${phoneNumber}`, JSON.stringify({ ...newUser, firebaseUser: undefined }));
      localStorage.setItem('unimove_current_phone', phoneNumber);
      localStorage.setItem('unimove_current_user', JSON.stringify({ ...newUser, firebaseUser: undefined }));
    }
    setUser(newUser);
    // Optional soft welcome for successful account creation path
    if (typeof window !== 'undefined') {
      import('@/lib/sound').then(({ sound }) => sound.playSuccess()).catch(() => {});
    }
    return newUser;
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'firebaseUser'>) => {
    const newUser = normalizeStoredUser({ ...userData, id: `user-${Date.now()}` });
    setUser(newUser);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('unimove_current_phone');
      localStorage.removeItem('unimove_current_user');
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key?.startsWith('user_')) {
          localStorage.removeItem(key);
        }
      }
    }
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    const updatedUser = normalizeStoredUser({ ...user, ...userData, updatedAt: new Date().toISOString() }, user.firebaseUser);
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('unimove_current_user', JSON.stringify({ ...updatedUser, firebaseUser: undefined }));
      if (updatedUser.phoneNumber) {
        localStorage.setItem(`user_${updatedUser.phoneNumber}`, JSON.stringify({ ...updatedUser, firebaseUser: undefined }));
      }
      if (updatedUser.phone && updatedUser.phone !== updatedUser.phoneNumber) {
        localStorage.setItem(`user_${updatedUser.phone}`, JSON.stringify({ ...updatedUser, firebaseUser: undefined }));
      }
    }
    updateDoc(doc(db, 'users', updatedUser.id), { ...userData, updatedAt: updatedUser.updatedAt }).catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, findUserByPhone, loginWithFirebase, register, createFirestoreUser, logout, updateUser }}>
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