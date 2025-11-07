import { Star, PlayCircle } from 'lucide-react';

const categories = [
  { name: 'Design', color: 'from-pink-500 to-violet-500' },
  { name: 'Development', color: 'from-blue-500 to-cyan-500' },
  { name: 'Marketing', color: 'from-amber-500 to-orange-500' },
  { name: 'Business', color: 'from-emerald-500 to-teal-500' },
];

const trending = [
  {
    id: 1,
    title: 'Modern UI Design with Figma',
    instructor: 'Sarah Lin',
    rating: 4.8,
    price: 49.0,
    image: 'https://images.unsplash.com/photo-1710799885122-428e63eff691?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxVSSUyMERlc2lnbiUyMHdpdGglMjBGaWdtYXxlbnwwfDB8fHwxNzYyNTEwMDg5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'React & TypeScript Bootcamp',
    instructor: 'Daniel Kim',
    rating: 4.7,
    price: 59.0,
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Digital Marketing Mastery',
    instructor: 'Amelia Gray',
    rating: 4.6,
    price: 39.0,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    instructor: 'Ravi Patel',
    rating: 4.9,
    price: 69.0,
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1200&auto=format&fit=crop',
  },
];

function CourseCard({ course, onOpen }) {
  return (
    <div onClick={() => onOpen(course)} className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button className="absolute bottom-3 left-3 px-2.5 py-1.5 text-xs rounded-full bg-white/90 dark:bg-neutral-900/80 backdrop-blur border border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5">
          <PlayCircle size={14} /> Preview
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1 text-neutral-900 dark:text-white">{course.title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">{course.instructor}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-sm text-neutral-600 dark:text-neutral-300">{course.rating}</span>
          </div>
          <div className="font-semibold text-neutral-900 dark:text-white">${course.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ onOpenCourse, onExplore }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-white to-blue-100 dark:from-violet-950 dark:via-neutral-950 dark:to-blue-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Learn anything. Build your future.</h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300 max-w-xl">Thousands of expert-led courses to level up your skills with hands-on projects and community support.</p>
            <div className="mt-6">
              <div className="relative">
                <input placeholder="What do you want to learn today?" className="w-full h-12 pl-4 pr-32 rounded-2xl bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm outline-none focus:ring-2 focus:ring-violet-500" />
                <button onClick={onExplore} className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 text-white text-sm font-medium shadow-md hover:brightness-110">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Featured categories</h2>
          <button onClick={onExplore} className="text-sm text-violet-600 dark:text-violet-400 font-medium">View all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((c) => (
            <button key={c.name} onClick={onExplore} className={`rounded-2xl p-4 text-left bg-gradient-to-tr ${c.color} text-white shadow-sm hover:shadow-md transition-shadow`}>
              <div className="text-sm opacity-90">Category</div>
              <div className="text-lg font-semibold">{c.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Trending courses</h2>
          <button onClick={onExplore} className="text-sm text-violet-600 dark:text-violet-400 font-medium">See more</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((course) => (
            <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />
          ))}
        </div>
      </section>
    </div>
  );
}
