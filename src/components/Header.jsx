import { useState } from 'react';
import { Plane, LogIn, Menu, X } from 'lucide-react';

export default function Header({ goAdmin }) {
  const [open, setOpen] = useState(false);

  const NavLinks = ({ onClick }) => (
    <>
      <a href="#destinations" onClick={onClick} className="block px-3 py-2 text-slate-700 hover:text-slate-900">Направления</a>
      <a href="#how"          onClick={onClick} className="block px-3 py-2 text-slate-700 hover:text-slate-900">Как это работает</a>
      <a href="#reviews"      onClick={onClick} className="block px-3 py-2 text-slate-700 hover:text-slate-900">Отзывы</a>
      <a href="#contacts"     onClick={onClick} className="block px-3 py-2 text-slate-700 hover:text-slate-900">Контакты</a>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-30 backdrop-blur bg-white/70 shadow">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow">
            <Plane />
          </div>
          <div className="text-xl font-extrabold tracking-tight">RKT Tour</div>
          <span className="ml-2 hidden md:inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">Лучший отдых</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
          <button
            onClick={goAdmin}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50"
          >
            <LogIn className="size-4" /> Вход для менеджера
          </button>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-300 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Открыть меню"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="container py-2">
            <NavLinks onClick={() => setOpen(false)} />
            <button
              onClick={() => { setOpen(false); goAdmin(); }}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 font-semibold text-white"
            >
              <LogIn className="size-4" /> Вход для менеджера
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
