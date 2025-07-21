import { useSleepStore } from '../store/useSleepStore';

export default function CalendarPage() {
  const { records } = useSleepStore();
  const year = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {days.map((d) => (
            <th key={d}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {months.map((m) => (
          <tr key={m}>
            <th>{m + 1}月</th>
            {days.map((d) => {
              const date = new Date(year, m, d);
              const dateStr = date.toISOString().split('T')[0];
              const rec = records.find((r) => r.date === dateStr);
              const star = rec && rec.onSchedule ? '⭐' : '';
              return (
                <td
                  key={`${m}-${d}`}
                  style={{ padding: '4px', border: '1px solid gray' }}
                >
                  {star}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
