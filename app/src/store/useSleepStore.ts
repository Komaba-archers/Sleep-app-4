import { create } from 'zustand';

interface SleepRecord {
  date: string;
  scheduledBed: string;
  scheduledWake: string;
  actualBed?: string;
  actualWake?: string;
  duration?: number;
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
        records: state.records.map((r) =>
          r.date === today
            ? {
                ...r,
                actualWake: time,
                duration:
                  r.actualBed && time
                    ? (new Date(`${today}T${time}` as string).getTime() -
                        new Date(`${today}T${r.actualBed}` as string).getTime()) /
                      3600000
                    : r.duration
              }
            : r
        )
      };
    })
}));
