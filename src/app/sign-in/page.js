'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import GradientWaves from '@/components/reactbits/GradientWaves';
import { GradientText } from '@/components/reactbits/TextEffects';
import styles from './sign-in.module.css';

export default function SignInPage() {
  const { user, loading, usingMock, signIn, signUp, signOut } = useAuth();
  const [mode, setMode] = useState('in'); // 'in' | 'up'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'in') await signIn(email, password);
      else await signUp(email, password);
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.page}>
      <GradientWaves colors={['#f5f4f0', '#2b4cff', '#7a90ff']} opacity={0.4} />
      <div className={styles.card}>
        {loading ? (
          <p className={styles.loadingText}>Loading…</p>
        ) : user ? (
          <div className={styles.signedIn}>
            <p className="eyebrow">Signed in</p>
            <h1 className={styles.hi}>Hey, {user.name || user.email} 👋</h1>
            <p className="muted">You’re signed in to the INKRIOT client area.</p>
            <button className={styles.primary} onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Client Area</p>
            <h1 className={styles.title}>{mode === 'in' ? <>Welcome <GradientText>back.</GradientText></> : <>Create <GradientText>account.</GradientText></>}</h1>

            <form onSubmit={submit} className={styles.form} noValidate>
              <label className={styles.field}>
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" autoComplete="email" />
              </label>
              <label className={styles.field}>
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" autoComplete={mode === 'in' ? 'current-password' : 'new-password'} minLength={6} />
              </label>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.primary} disabled={busy}>
                {busy ? 'Please wait…' : mode === 'in' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <p className={styles.switch}>
              {mode === 'in' ? "Don't have an account?" : 'Already have one?'}{' '}
              <button onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setError(''); }}>
                {mode === 'in' ? 'Create one' : 'Sign in'}
              </button>
            </p>

            {usingMock && (
              <p className={styles.note}>
                Demo mode — Firebase isn’t configured, so any valid email + 6-character password works.
                Add Firebase keys to <code>.env.local</code> for real authentication.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
