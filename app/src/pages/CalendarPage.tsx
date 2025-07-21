import { useSleepStore } from '../store/useSleepStore';

const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

export default function CalendarPage() {
  const { records } = useSleepStore();
  const year = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);

  const renderMonth = (month: number) => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks: Array<Array<number | null>> = [];
    let current: Array<number | null> = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      current.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      current.push(day);
      if (current.length === 7) {
        weeks.push(current);
        current = [];
      }
    }

    if (current.length > 0) {
      while (current.length < 7) current.push(null);
      weeks.push(current);
    }

    return (
      <table
        key={month}
        style={{ borderCollapse: 'collapse', marginBottom: '1rem' }}
      >
        <caption>{month + 1}月</caption>
        <thead>
          <tr>
            {dayNames.map((n) => (
              <th key={n}>{n}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (!day) return <td key={di}></td>;
                const date = new Date(year, month, day);
                const dateStr = date.toISOString().split('T')[0];
                const rec = records.find((r) => r.date === dateStr);
                const star = rec && rec.onSchedule ? '⭐' : '';
                return (
                  <td
                    key={di}
                    style={{ padding: '4px', border: '1px solid gray' }}
                  >
                    <div>{day}</div>
                    <div>{star}</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return <div>{months.map(renderMonth)}</div>;
}
