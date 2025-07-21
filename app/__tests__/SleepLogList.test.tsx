/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import SleepLogList from '../src/components/SleepLogList';
import type { SleepLog } from '../src/types/SleepLog';

describe('SleepLogList', () => {
  const logs: SleepLog[] = [
    {
      id: 1,
      sleepTime: new Date('2024-01-01T22:00:00').getTime(),
      wakeTime: new Date('2024-01-02T06:00:00').getTime(),
      memo: 'good'
    },
    {
      id: 2,
      sleepTime: new Date('2024-01-02T23:00:00').getTime(),
      wakeTime: new Date('2024-01-03T07:00:00').getTime()
    }
  ];

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-03'));
    localStorage.setItem('sleepLogs', JSON.stringify(logs));
  });

  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
  });

  test('renders logs and bars', async () => {
    render(<SleepLogList />);
    expect(await screen.findAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('progressbar')).toHaveLength(7);
    expect(screen.getAllByText('睡眠時間: 8.0h')).toHaveLength(2);
  });

  test('deletes a log', async () => {
    render(<SleepLogList />);
    const delButtons = await screen.findAllByRole('button', { name: '削除' });
    fireEvent.click(delButtons[0]);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
