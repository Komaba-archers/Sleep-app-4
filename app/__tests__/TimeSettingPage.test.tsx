import { render, screen, fireEvent } from '@testing-library/react';
import TimeSettingPage from '../src/pages/TimeSettingPage';
import { useSleepStore } from '../src/store/useSleepStore';

beforeEach(() => {
  useSleepStore.setState({ bedTime: '22:00', wakeTime: '06:00', records: [] });
});

test('updates schedule', () => {
  render(<TimeSettingPage />);
  fireEvent.change(screen.getByLabelText(/Bed Time/i), { target: { value: '23:00' } });
  fireEvent.change(screen.getByLabelText(/Wake Time/i), { target: { value: '07:00' } });
  fireEvent.submit(screen.getByRole('button', { name: /save/i }).closest('form')!);
  const state = useSleepStore.getState();
  expect(state.bedTime).toBe('23:00');
  expect(state.wakeTime).toBe('07:00');
});

test('start and stop sleep', () => {
  render(<TimeSettingPage />);
  fireEvent.click(screen.getByRole('button', { name: /start sleep/i }));
  fireEvent.click(screen.getByRole('button', { name: /stop sleep/i }));
  const { records } = useSleepStore.getState();
  expect(records[0].duration).toBeGreaterThanOrEqual(0);
});
