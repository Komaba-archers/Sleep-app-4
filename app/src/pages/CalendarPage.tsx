import { useSleepStore } from '../store/useSleepStore';

export default function CalendarPage() {
  const { records } = useSleepStore();
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const days = new Array(31).fill(0).map((_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), i + 1);
    return d;
  });

  return (
    <table>
      <tbody>
        <tr>
          {days.map((d) => {
            const dateStr = d.toISOString().split('T')[0];
            const rec = records.find((r) => r.date === dateStr);
            const star = rec && rec.onSchedule ? '⭐' : '';
            return (
              <td key={dateStr} style={{ padding: '4px', border: '1px solid gray' }}>
                {d.getDate()}
                <div>{star}</div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}
