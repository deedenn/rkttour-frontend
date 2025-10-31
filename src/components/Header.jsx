import { Plane, LogIn } from 'lucide-react';

export default function Header({ goAdmin }) {
  return (
    <div className="fixed inset-x-0 top-0 z-30 backdrop-blur bg-white/70 shadow">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow">
            <Plane />
          </div>
          <div className="text-xl font-extrabold tracking-tight">RKT Tour</div>
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">Лучший отдых</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#destinations" className="text-slate-700 hover:text-slate-900">Направления</a>
          <a href="#how" className="text-slate-700 hover:text-slate-900">Как это работает</a>
          <a href="#reviews" className="text-slate-700 hover:text-slate-900">Отзывы</a>
          <a href="#contacts" className="text-slate-700 hover:text-slate-900">Контакты</a>
          <button onClick={goAdmin} className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50">
            <LogIn className="size-4" /> Вход для менеджера
          </button>
        </div>
      </div>
    </div>
  );
}
