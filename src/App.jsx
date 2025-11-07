import { useCallback, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Dashboard from './components/Dashboard';

export default function App() {
  const [route, setRoute] = useState('home');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  const handleOpenCourse = useCallback((course) => {
    setSelected(course);
    setRoute('course');
  }, []);

  const handleEnroll = useCallback((course) => {
    alert(`Enrolled in ${course.title}!`);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar onNavigate={setRoute} onSearch={setSearch} />
      {route === 'home' && (
        <HomePage onOpenCourse={handleOpenCourse} onExplore={() => setRoute('courses')} />
      )}
      {route === 'courses' && <Courses onOpenCourse={handleOpenCourse} />}
      {route === 'course' && (
        <div className="mt-4">
          <CourseDetail course={selected} onBack={() => setRoute('courses')} onEnroll={handleEnroll} />
        </div>
      )}
      {route === 'dashboard' && <Dashboard />}

      <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 py-10 text-center text-sm text-neutral-600 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4">© {new Date().getFullYear()} EduVerse — Learn, build, grow.</div>
      </footer>
    </div>
  );
}
