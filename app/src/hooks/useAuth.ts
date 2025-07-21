import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase-config';

export function useAuth(): [User | null, boolean, unknown] {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setLoading(false);
      },
      (e) => {
        setError(e);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return [user, loading, error];
}
