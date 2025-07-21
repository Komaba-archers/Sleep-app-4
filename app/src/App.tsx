import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import TimeSettingPage from './pages/TimeSettingPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';

function ErrorFallback() {
  return <p role="alert">Something went wrong.</p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Schedule</Link> | <Link to="/calendar">Calendar</Link> |{' '}
        <Link to="/profile">Profile</Link>
      </nav>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<TimeSettingPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
