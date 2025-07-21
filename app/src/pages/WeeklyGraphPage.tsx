import { useSleepStore } from '../store/useSleepStore';

export default function WeeklyGraphPage() {
  const { records } = useSleepStore();

  const now = new Date();
  const dayOfWeek = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - dayOfWeek);
  sunday.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });

  return (
    <div>
      <h2>直近一週間の睡眠時間</h2>
      {days.map((d) => {
        const dateStr = d.toISOString().split('T')[0];
        const rec = records.find((r) => r.date === dateStr);
        const val = rec?.duration ?? 0;
        return (
          <div key={dateStr} style={{ margin: '4px 0' }}>
            <div>{dateStr}</div>
            <div
              role="progressbar"
              style={{
                width: `${val * 30}px`,
                height: '20px',
                background: 'skyblue'
              }}
            />
            <span>{val.toFixed(1)}h</span>
          </div>
        );
      })}
    </div>
  );
}
