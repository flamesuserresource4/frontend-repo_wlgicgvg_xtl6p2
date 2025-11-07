import { useState } from 'react';
import { Star, Heart, ChevronDown, CheckCircle2, PlayCircle } from 'lucide-react';

export default function CourseDetail({ course, onBack, onEnroll }) {
  const [open, setOpen] = useState({ m1: true, m2: false, m3: false });

  const c =
    course || {
      title: 'React & TypeScript Bootcamp',
      instructor: 'Daniel Kim',
      rating: 4.8,
      price: 59,
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
      description:
        'Master React and TypeScript by building production-grade apps with modern tooling and patterns.',
    };

  return (
    <div className="pb-16">
      {/* Banner */}
      <div className="relative">
        <div className="h-64 sm:h-80 w-full overflow-hidden">
          <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">{c.title}</h1>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">by {c.instructor}</div>
                <div className="mt-2 flex items-center gap-2 text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{c.rating} • 12,345 ratings</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onEnroll?.(c)} className="h-11 px-5 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 text-white font-medium shadow-md hover:brightness-110">Enroll for ${c.price}</button>
                <button className="h-11 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-2"><Heart size={18} /> Add to Wishlist</button>
                <button onClick={onBack} className="h-11 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6">
          <section className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">About this course</h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{c.description}</p>
          </section>

          <section className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Syllabus</h2>
            <div className="mt-3 divide-y divide-neutral-200 dark:divide-neutral-800">
              {[
                { id: 'm1', title: 'Getting Started', lessons: 6 },
                { id: 'm2', title: 'Advanced Patterns', lessons: 8 },
                { id: 'm3', title: 'Deployment & Best Practices', lessons: 5 },
              ].map((m) => (
                <div key={m.id}>
                  <button onClick={() => setOpen((o) => ({ ...o, [m.id]: !o[m.id] }))} className="w-full py-3 flex items-center justify-between">
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">{m.title}</div>
                    <ChevronDown className={`transition-transform ${open[m.id] ? 'rotate-180' : ''}`} size={18} />
                  </button>
                  {open[m.id] && (
                    <div className="pb-3 grid gap-2">
                      {Array.from({ length: m.lessons }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                          <CheckCircle2 className="text-emerald-500" size={16} /> Lesson {i + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Student reviews</h2>
            <div className="mt-3 grid gap-4">
              {[
                { name: 'Alex', rating: 5, text: 'Super clear and practical. Loved the projects!' },
                { name: 'Priya', rating: 4, text: 'Great pace and explanations. Highly recommend.' },
              ].map((r, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-neutral-800 dark:text-neutral-200">{r.name}</div>
                    <div className="text-amber-500 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} fill={i < r.rating ? 'currentColor' : 'none'} className={i < r.rating ? '' : 'opacity-40'} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar card */}
        <aside className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-fit sticky top-24">
          <div className="aspect-video overflow-hidden">
            <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-5 space-y-3">
            <div className="text-3xl font-bold">${c.price}</div>
            <button onClick={() => onEnroll?.(c)} className="w-full h-11 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 text-white font-medium shadow hover:brightness-110">Enroll now</button>
            <button className="w-full h-11 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center gap-2">
              <PlayCircle size={18} /> Watch preview
            </button>
            <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
              <li>Lifetime access</li>
              <li>Certificate of completion</li>
              <li>Assignments & projects</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Related */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Related courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="aspect-video overflow-hidden">
                <img src={`https://picsum.photos/seed/related-${i}/640/360`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="font-semibold">Advanced React Patterns</div>
                <div className="text-sm text-neutral-500">Ava Moore</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
