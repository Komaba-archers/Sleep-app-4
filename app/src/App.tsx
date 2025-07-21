import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import TimeSettingPage from './pages/TimeSettingPage';
import CalendarPage from './pages/CalendarPage';
import WeeklyGraphPage from './pages/WeeklyGraphPage';
import ProfilePage from './pages/ProfilePage';

function ErrorFallback() {
  return <p role="alert">エラーが発生しました。</p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">スケジュール</Link> |{' '}
        <Link to="/calendar">カレンダー</Link> |{' '}
        <Link to="/weekly">グラフ</Link> |{' '}
        <Link to="/profile">プロフィール</Link>
      </nav>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<TimeSettingPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/weekly" element={<WeeklyGraphPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
