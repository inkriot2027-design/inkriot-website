'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { isFirebaseConfigured, auth } from './firebase';

/**
 * AuthProvider — a clean authentication abstraction.
 *
 * If Firebase is configured (env keys present), it wires up real
 * email/password auth via Firebase. Otherwise it runs a local mock
 * that mimics the same interface (sign in / up / out, session in
 * memory + sessionStorage), so the UI, validation, loading and error
 * states are all fully exercised and Firebase can be swapped in later
 * with zero component changes.
 */

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const MOCK_KEY = 'inkriot_mock_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingMock] = useState(!isFirebaseConfigured);

  // ── Bootstrap session ──
  useEffect(() => {
    let unsub = () => {};
    if (isFirebaseConfigured && auth) {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        unsub = onAuthStateChanged(auth, (u) => {
          setUser(u ? { uid: u.uid, email: u.email, name: u.displayName } : null);
          setLoading(false);
        });
      });
    } else {
      try {
        const raw = sessionStorage.getItem(MOCK_KEY);
        setUser(raw ? JSON.parse(raw) : null);
      } catch { /* ignore */ }
      setLoading(false);
    }
    return () => unsub();
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (isFirebaseConfigured && auth) {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return { uid: cred.user.uid, email: cred.user.email };
    }
    // Mock: accept any well-formed credentials.
    await wait(700);
    if (!email || !password || password.length < 6) {
      throw new Error('Invalid email or password (min 6 characters).');
    }
    const mockUser = { uid: 'mock-' + btoa(email).slice(0, 8), email, name: email.split('@')[0] };
    sessionStorage.setItem(MOCK_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  }, []);

  const signUp = useCallback(async (email, password) => {
    if (isFirebaseConfigured && auth) {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      return { uid: cred.user.uid, email: cred.user.email };
    }
    await wait(700);
    if (!email || password.length < 6) throw new Error('Enter a valid email and a 6+ character password.');
    const mockUser = { uid: 'mock-' + btoa(email).slice(0, 8), email, name: email.split('@')[0] };
    sessionStorage.setItem(MOCK_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  }, []);

  const signOut = useCallback(async () => {
    if (isFirebaseConfigured && auth) {
      const { signOut: fbSignOut } = await import('firebase/auth');
      await fbSignOut(auth);
    } else {
      sessionStorage.removeItem(MOCK_KEY);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, usingMock, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
