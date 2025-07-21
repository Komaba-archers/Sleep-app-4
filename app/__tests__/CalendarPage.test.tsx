/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import CalendarPage from '../src/pages/CalendarPage';
import { useSleepStore } from '../src/store/useSleepStore';

beforeEach(() => {
  useSleepStore.setState({
    bedTime: '22:00',
    wakeTime: '06:00',
    records: [
      {
        date: new Date().toISOString().split('T')[0],
        scheduledBed: '22:00',
        scheduledWake: '06:00',
        actualBed: '22:00',
        actualWake: '06:00',
        duration: 8,
        onSchedule: true
      }
    ]
  });
});

test('displays star for on-schedule sleep', () => {
  render(<CalendarPage />);
  expect(screen.getByText('⭐')).toBeInTheDocument();
});
