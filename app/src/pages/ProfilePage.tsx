import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase-config';

export default function ProfilePage() {
  const [user] = useAuth();
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'profiles', user.uid), { name, icon });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {error && <p role="alert">{error}</p>}
      <input
        aria-label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        aria-label="Icon URL"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
      />
      <button disabled={saving} onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
