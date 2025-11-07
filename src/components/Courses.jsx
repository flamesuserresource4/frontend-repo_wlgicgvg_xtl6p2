import { useMemo, useState, useEffect } from 'react';
import { Star, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const allCourses = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: [
    'React & TypeScript Bootcamp',
    'UI Design with Figma',
    'Data Analysis with Python',
    'Next.js Performance Deep Dive',
  ][i % 4],
  instructor: ['Daniel Kim', 'Sarah Lin', 'Ravi Patel', 'Ava Moore'][i % 4],
  rating: 4 + ((i % 5) * 0.2),
  price: [39, 49, 59, 69][i % 4],
  duration: [8, 12, 16, 20][i % 4],
  image: `https://picsum.photos/seed/course-${i}/640/360`,
  description:
    'Learn with hands-on projects and real-world examples to build a job-ready portfolio.',
  category: ['Development', 'Design', 'Data', 'Business'][i % 4],
}));

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < Math.round(value) ? 'currentColor' : 'none'} className={i < Math.round(value) ? '' : 'opacity-40'} />
      ))}
      <span className="ml-1 text-xs text-neutral-600 dark:text-neutral-300">{value.toFixed(1)}</span>
    </div>
  );
}

function CourseCard({ c, onOpen }) {
  return (
    <div onClick={() => onOpen(c)} className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-white line-clamp-1">{c.title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">{c.instructor}</p>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{c.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <Rating value={c.rating} />
          <div className="font-semibold text-neutral-900 dark:text-white">${c.price}</div>
        </div>
      </div>
    </div>
  );
}

export default function Courses({ onOpenCourse }) {
  const [filters, setFilters] = useState({ category: 'All', rating: 0, maxPrice: 100, duration: 'All' });
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const categories = ['All', 'Development', 'Design', 'Data', 'Business'];

  const filtered = useMemo(() => {
    return allCourses
      .filter((c) => (filters.category === 'All' ? true : c.category === filters.category))
      .filter((c) => c.rating >= filters.rating)
      .filter((c) => c.price <= filters.maxPrice)
      .filter((c) => (filters.duration === 'All' ? true : c.duration <= Number(filters.duration)));
  }, [filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'price_low') arr.sort((a, b) => a.price - b.price);
    else if (sort === 'price_high') arr.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paged = useMemo(() => sorted.slice((page - 1) * perPage, page * perPage), [sorted, page]);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
          <Filter size={18} />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-neutral-600 dark:text-neutral-300">Sort by</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2">
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="rounded-2xl p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-fit sticky top-24">
          <div>
            <label className="text-sm text-neutral-600 dark:text-neutral-300">Category</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setFilters((f) => ({ ...f, category: cat }))} className={`px-3 py-2 rounded-lg text-sm border ${filters.category === cat ? 'bg-violet-600 text-white border-violet-600' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-neutral-600 dark:text-neutral-300">Minimum rating</label>
            <input type="range" min="0" max="5" step="0.5" value={filters.rating} onChange={(e) => setFilters((f) => ({ ...f, rating: Number(e.target.value) }))} className="w-full mt-2" />
            <div className="text-sm text-neutral-600 dark:text-neutral-300">{filters.rating}+</div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-neutral-600 dark:text-neutral-300">Max price</label>
            <input type="range" min="0" max="100" step="5" value={filters.maxPrice} onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))} className="w-full mt-2" />
            <div className="text-sm text-neutral-600 dark:text-neutral-300">${filters.maxPrice}</div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-neutral-600 dark:text-neutral-300">Duration</label>
            <select value={filters.duration} onChange={(e) => setFilters((f) => ({ ...f, duration: e.target.value }))} className="mt-2 w-full h-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2">
              <option value="All">All</option>
              <option value="10">Up to 10h</option>
              <option value="15">Up to 15h</option>
              <option value="20">Up to 20h</option>
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paged.map((c) => (
              <CourseCard key={c.id} c={c} onOpen={onOpenCourse} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="h-9 w-9 grid place-items-center rounded-lg border border-neutral-200 dark:border-neutral-800 disabled:opacity-40"><ChevronLeft size={16} /></button>
            <div className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm">
              Page {page} of {totalPages}
            </div>
            <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="h-9 w-9 grid place-items-center rounded-lg border border-neutral-200 dark:border-neutral-800 disabled:opacity-40"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
