import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useSleepStore } from '../store/useSleepStore';

export default function TimeSettingPage() {
  const { bedTime, wakeTime, setSchedule, startSleep, stopSleep } =
    useSleepStore();
  const [sleeping, setSleeping] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const alarmRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (alarmRef.current) {
        clearTimeout(alarmRef.current);
      }
    };
  }, []);

  const handleSchedule = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const bed = (form.elements.namedItem('bed') as HTMLInputElement).value;
    const wake = (form.elements.namedItem('wake') as HTMLInputElement).value;
    setSchedule(bed, wake);
  };

  const handleStart = () => {
    startSleep(new Date().toTimeString().slice(0, 5));
    setElapsed(0);
    intervalRef.current = window.setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    const now = new Date();
    const [wakeH, wakeM] = wakeTime.split(':').map(Number);
    const wake = new Date();
    wake.setHours(wakeH, wakeM, 0, 0);
    if (wake <= now) {
      wake.setDate(wake.getDate() + 1);
    }
    const timeout = wake.getTime() - now.getTime();
    alarmRef.current = window.setTimeout(() => {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1);
    }, timeout);
    setSleeping(true);
  };

  const handleStop = () => {
    stopSleep(new Date().toTimeString().slice(0, 5));
    if (alarmRef.current) {
      clearTimeout(alarmRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSleeping(false);
  };

  return (
    <div>
      <h2>スケジュール</h2>
      <form onSubmit={handleSchedule}>
        <label>
          就寝時間
          <input type="time" name="bed" defaultValue={bedTime} />
        </label>
        <label>
          起床時間
          <input type="time" name="wake" defaultValue={wakeTime} />
        </label>
        <button type="submit">保存</button>
      </form>
      {sleeping && (
        <p aria-label="経過時間">
          {new Date(elapsed * 1000).toISOString().slice(11, 19)}
        </p>
      )}
      {sleeping ? (
        <button onClick={handleStop}>睡眠停止</button>
      ) : (
        <button onClick={handleStart}>睡眠開始</button>
      )}
    </div>
  );
}
