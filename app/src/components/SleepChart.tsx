import React from 'react';
import type { SleepLog } from '../types/SleepLog';

interface Props {
  logs: SleepLog[];
}

const BAR_WIDTH = 20;
const SCALE = 20; // px per hour

const SleepChart: React.FC<Props> = ({ logs }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return d;
  });

  const durations = days.map((d) => {
    const dateStr = d.toISOString().split('T')[0];
    const log = logs.find(
      (l) => new Date(l.sleepTime).toISOString().split('T')[0] === dateStr
    );
    return log ? Math.max(0, (log.wakeTime - log.sleepTime) / 3600000) : 0;
  });

  const max = Math.max(...durations, 0);
  const height = max * SCALE;

  return (
    <div
      role="group"
      aria-label="睡眠時間グラフ"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '8px',
        background: '#eee',
        padding: '1rem',
        height
      }}
    >
      {durations.map((d, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div
            role="progressbar"
            aria-label={`${d.toFixed(1)}h`}
            style={{
              width: BAR_WIDTH,
              height: d * SCALE,
              background: 'lightblue',
              margin: '0 auto'
            }}
          />
          <div style={{ fontSize: '0.75rem' }}>{
            `${days[i].getMonth() + 1}/${days[i].getDate()}`
          }</div>
        </div>
      ))}
    </div>
  );
};

export default SleepChart;
