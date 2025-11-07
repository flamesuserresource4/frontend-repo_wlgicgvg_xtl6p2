import { useEffect, useState } from 'react';
import { Search, User, Menu, Sun, Moon, ChevronDown, BookOpen, Home as HomeIcon } from 'lucide-react';

export default function Navbar({ onNavigate, onSearch }) {
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  function submit(e) {
    e.preventDefault();
    onSearch?.(query);
    onNavigate('courses');
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-500 to-blue-500 flex items-center justify-center text-white shadow-sm">
            <BookOpen size={18} />
          </div>
          <span className="hidden sm:block">EduVerse</span>
        </button>

        <nav className="hidden md:flex items-center gap-1 ml-2">
          <button onClick={() => onNavigate('home')} className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 flex items-center gap-2">
            <HomeIcon size={16} /> Home
          </button>
          <button onClick={() => onNavigate('courses')} className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">Courses</button>
          <button onClick={() => onNavigate('dashboard')} className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">Dashboard</button>
          <button className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 flex items-center gap-1">
            Categories <ChevronDown size={16} />
          </button>
        </nav>

        <form onSubmit={submit} className="flex-1 hidden md:flex">
          <div className="w-full relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 outline-none text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-violet-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => setDark((d) => !d)} className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            <User size={18} />
          </button>
          <button className="md:hidden h-10 w-10 grid place-items-center rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            <Menu size={18} />
          </button>
        </div>
      </div>

      <form onSubmit={submit} className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to learn today?"
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 outline-none text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-violet-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
        </div>
      </form>
    </header>
  );
}
