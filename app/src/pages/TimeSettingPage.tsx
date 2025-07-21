import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSleepStore } from '../store/useSleepStore';

export default function TimeSettingPage() {
  const { bedTime, wakeTime, setSchedule, startSleep, stopSleep } =
    useSleepStore();
  const [sleeping, setSleeping] = useState(false);

  const handleSchedule = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const bed = (form.elements.namedItem('bed') as HTMLInputElement).value;
    const wake = (form.elements.namedItem('wake') as HTMLInputElement).value;
    setSchedule(bed, wake);
  };

  const handleStart = () => {
    startSleep(new Date().toTimeString().slice(0, 5));
    setSleeping(true);
  };

  const handleStop = () => {
    stopSleep(new Date().toTimeString().slice(0, 5));
    setSleeping(false);
  };

  return (
    <div>
      <h2>Schedule</h2>
      <form onSubmit={handleSchedule}>
        <label>
          Bed Time
          <input type="time" name="bed" defaultValue={bedTime} />
        </label>
        <label>
          Wake Time
          <input type="time" name="wake" defaultValue={wakeTime} />
        </label>
        <button type="submit">Save</button>
      </form>
      {sleeping ? (
        <button onClick={handleStop}>Stop Sleep</button>
      ) : (
        <button onClick={handleStart}>Start Sleep</button>
      )}
    </div>
  );
}
