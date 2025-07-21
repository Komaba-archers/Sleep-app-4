import React, { useEffect, useState } from 'react';
import { SleepLog } from '../types/SleepLog';
import SleepChart from './SleepChart';

const STORAGE_KEY = 'sleepLogs';

const SleepLogList: React.FC = () => {
  const [logs, setLogs] = useState<SleepLog[]>([]);

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    const parsed: SleepLog[] = existing ? JSON.parse(existing) : [];
    setLogs(parsed);
  }, []);

  const handleDelete = (id: number) => {
    const newLogs = logs.filter((log) => log.id !== id);
    setLogs(newLogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div className="list-container">
        <h2>睡眠ログ一覧</h2>
        <ul>
          {logs.map((log) => (
            <li key={log.id} className="list-item">
              <div>
                {new Date(log.sleepTime).toLocaleString()} -{' '}
                {new Date(log.wakeTime).toLocaleString()}
              </div>
              {log.memo && <div>メモ: {log.memo}</div>}
              <button onClick={() => handleDelete(log.id)}>削除</button>
            </li>
          ))}
        </ul>
        <SleepChart logs={logs} />
      </div>
    </div>
  );
};

export default SleepLogList;
