import { render, screen } from '@testing-library/react';
import WeeklyGraphPage from '../src/pages/WeeklyGraphPage';
import { useSleepStore } from '../src/store/useSleepStore';

describe('WeeklyGraphPage', () => {
  beforeEach(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);
    const records = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      return {
        date: d.toISOString().split('T')[0],
        scheduledBed: '22:00',
        scheduledWake: '06:00',
        actualBed: '22:00',
        actualWake: '06:00',
        duration: 8
      };
    });
    useSleepStore.setState({ bedTime: '22:00', wakeTime: '06:00', records });
  });

  test('renders 7 bars', () => {
    render(<WeeklyGraphPage />);
    expect(screen.getAllByRole('progressbar')).toHaveLength(7);
  });
});
