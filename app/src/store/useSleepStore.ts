import { create } from 'zustand';

const TOLERANCE_MINUTES = 5;

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

interface SleepRecord {
  date: string;
  scheduledBed: string;
  scheduledWake: string;
  actualBed?: string;
  actualWake?: string;
  duration?: number;
  onSchedule?: boolean;
}

interface SleepState {
  bedTime: string;
  wakeTime: string;
  records: SleepRecord[];
  setSchedule: (bed: string, wake: string) => void;
  startSleep: (time: string) => void;
  stopSleep: (time: string) => void;
}

export const useSleepStore = create<SleepState>((set) => ({
  bedTime: '22:00',
  wakeTime: '06:00',
  records: [],
  setSchedule: (bed, wake) => set({ bedTime: bed, wakeTime: wake }),
  startSleep: (time) =>
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      const existing = state.records.find((r) => r.date === today);
      if (existing) {
        return {
          records: state.records.map((r) =>
            r.date === today ? { ...r, actualBed: time } : r
          )
        };
      }
      return {
        records: [
          ...state.records,
          {
            date: today,
            scheduledBed: state.bedTime,
            scheduledWake: state.wakeTime,
            actualBed: time
          }
        ]
      };
    }),
  stopSleep: (time) =>
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      return {
        records: state.records.map((r) => {
          if (r.date !== today) return r;
          const duration =
            r.actualBed && time
              ?
                  Math.abs(
                    new Date(`${today}T${time}`).getTime() -
                      new Date(`${today}T${r.actualBed}`).getTime()
                  ) /
                  3600000
              : r.duration;
          const onSchedule =
            r.actualBed !== undefined &&
            Math.abs(toMinutes(r.actualBed) - toMinutes(r.scheduledBed)) <=
              TOLERANCE_MINUTES &&
            Math.abs(toMinutes(time) - toMinutes(r.scheduledWake)) <=
              TOLERANCE_MINUTES;
          return {
            ...r,
            actualWake: time,
            duration,
            onSchedule
          };
        })
      };
    })
}));
