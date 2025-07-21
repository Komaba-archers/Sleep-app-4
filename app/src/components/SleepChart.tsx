import React from 'react';
import type { SleepLog } from '../types/SleepLog';

interface Props {
  logs: SleepLog[];
}

const BAR_WIDTH = 20;
const SCALE = 20; // px per hour

const SleepChart: React.FC<Props> = ({ logs }) => {
  const durations = logs.map((l) =>
    Math.max(0, (l.wakeTime - l.sleepTime) / 3600000)
  );
  const max = Math.max(...durations, 0);
  const height = max * SCALE;

  return (
    <div
      role="group"
      aria-label="睡眠時間グラフ"
      style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height }}
    >
      {durations.map((d, i) => (
        <div
          key={logs[i].id}
          role="progressbar"
          aria-label={`${d.toFixed(1)}h`}
          style={{
            width: BAR_WIDTH,
            height: d * SCALE,
            background: 'skyblue'
          }}
        />
      ))}
    </div>
  );
};

export default SleepChart;
