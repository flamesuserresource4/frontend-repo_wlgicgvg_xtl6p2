import { Settings, LogOut, User, Play, BookOpen } from 'lucide-react';

const enrolled = [
  {
    id: 1,
    title: 'React & TypeScript Bootcamp',
    progress: 0.45,
    instructor: 'Daniel Kim',
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWFjdCUyMCUyNiUyMFR5cGVTY3JpcHQlMjBCb290Y2FtcHxlbnwwfDB8fHwxNzYyNTEwMDkwfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'UI Design with Figma',
    progress: 0.72,
    instructor: 'Sarah Lin',
    image: 'https://images.unsplash.com/photo-1710799885122-428e63eff691?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxVSSUyMERlc2lnbiUyMHdpdGglMjBGaWdtYXxlbnwwfDB8fHwxNzYyNTEwMDg5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Data Analysis with Python',
    progress: 0.18,
    instructor: 'Ravi Patel',
    image: 'https://images.unsplash.com/photo-1758186643041-637f2f7edaed?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxEYXRhJTIwQW5hbHlzaXMlMjB3aXRoJTIwUHl0aG9ufGVufDB8MHx8fDE3NjI1MTAwOTF8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
];

function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-violet-600 to-blue-600" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  );
}

function EnrolledCard({ c, onResume }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="aspect-video overflow-hidden">
        <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="font-semibold text-neutral-900 dark:text-white line-clamp-1">{c.title}</div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">{c.instructor}</div>
        <div className="mt-3">
          <ProgressBar value={c.progress} />
          <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">{Math.round(c.progress * 100)}% complete</div>
        </div>
        <button onClick={() => onResume?.(c)} className="mt-3 w-full h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 text-white font-medium flex items-center justify-center gap-2">
          <Play size={16} /> Resume
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="rounded-2xl p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-fit">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 text-white grid place-items-center">
            <User size={20} />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">Alex Johnson</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Student</div>
          </div>
        </div>
        <nav className="mt-6 grid gap-2">
          <button className="px-3 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center gap-2"><BookOpen size={16} /> My Courses</button>
          <button className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-2"><Settings size={16} /> Settings</button>
          <button className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-2"><LogOut size={16} /> Logout</button>
        </nav>
      </aside>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Enrolled courses</h1>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">Continue where you left off</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolled.map((c) => (
            <EnrolledCard key={c.id} c={c} onResume={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
